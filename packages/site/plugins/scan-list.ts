// vite-plugin-scan-list.js
import path from "path";
import matter from "gray-matter"; // 需要安装 gray-matter
import { Plugin } from "vite";
import { readdirSync, readFileSync, statSync } from "fs";

type FileItem = Omit<DirectoryItem, "children"> & {
  ext: string;
  frontmatter: {
    [key: string]: unknown;
  };
  createTime: number;
  updateTime: number;
  content?: string;
};

interface DirectoryItem {
  name: string;
  type: "file" | "directory";
  path: string;
  children: FileItem[];
}

export const scanList: (options?: {
  targetDir?: string;
  virtualModuleId?: string;
  extensions?: string[];
  cacheTTL?: number; // 3秒缓存
  sortBy?: string;
  sortOrder?: string;
  includeContent?: boolean;
}) => Plugin = (options = {}) => {
  const {
    targetDir = "src/pages/blog-detail",
    virtualModuleId = "virtual:scan-list",
    extensions = [".md", ".mdx"],
    cacheTTL = 3000, // 3秒缓存
  } = options;

  let cache: DirectoryItem[] | null = null;
  let lastScan = 0;

  // 带缓存的异步扫描
  function scanDirWithCache(dir: string) {
    const now = Date.now();
    if (cache && now - lastScan < cacheTTL) {
      return cache;
    }

    const rawData = scanDir(dir);
    const processedData = processSort(rawData);
    cache = processedData;
    lastScan = now;
    return processedData;
  }

  function scanDir(dir: string) {
    try {
      const entries = readdirSync(dir, { withFileTypes: true });

      const list = [];

      for (const file of entries) {
        if (file.name.startsWith(".")) return;
        if (file.isDirectory()) {
          const filePath = path.join(file.parentPath, file.name);

          const mdList = readdirSync(filePath, {
            withFileTypes: true,
          })
            .filter(
              (v) => v.isFile() && extensions.includes(path.extname(v.name)),
            )
            .map((v) => {
              const vPath = path.join(v.parentPath, v.name);
              const content = readFileSync(vPath, "utf-8");
              const { data: frontmatter } = matter(content);
              const stats = statSync(vPath);
              return {
                name: v.name,
                type: "file" as const,
                path: vPath,
                ext: path.extname(v.name),
                frontmatter,
                createTime: stats.birthtimeMs,
                updateTime: stats.mtimeMs,
                content: options.includeContent ? content : undefined,
              };
            });

          list.push({
            name: file.name,
            type: "directory" as const,
            path: filePath,
            children: mdList,
          });
        }
      }

      console.log(list);
      return list;
    } catch (error) {
      console.error(`Scan error in ${dir}:`, error);
      return [];
    }
  }

  function processSort(nodes: DirectoryItem[] = []) {
    return nodes
      .map((node) => {
        return {
          ...node,
          children: node.children.sort((a, b) => b.createTime - a.createTime),
        };
      })
      .sort((a, b) => {
        const aMatch = a.name.match(/\d+/) ?? ["0"];
        const bMatch = b.name.match(/\d+/) ?? ["0"];
        const numA = parseInt(aMatch[0], 10);
        const numB = parseInt(bMatch[0], 10);
        return numB - numA;
      });
  }

  return {
    name: "vite-plugin-scan-list",

    // 热更新处理
    configureServer(server) {
      const watcher = server.watcher.add(path.resolve(targetDir));

      const handleChange = async (changedPath: string) => {
        if (!extensions.includes(path.extname(changedPath))) return;

        cache = null; // 清空缓存
        const mod = server.moduleGraph.getModuleById(virtualModuleId);
        if (mod) {
          server.moduleGraph.invalidateModule(mod);
        }
      };

      watcher.on("change", handleChange);
      watcher.on("add", handleChange);
      watcher.on("unlink", handleChange);
    },

    // 虚拟模块处理
    resolveId(id) {
      return id === virtualModuleId ? virtualModuleId : null;
    },

    async load(id) {
      if (id === virtualModuleId) {
        console.time();

        const absoluteDir = path.resolve(process.cwd(), targetDir);
        const dirData = scanDirWithCache(absoluteDir);
        console.timeEnd();
        return `export default ${JSON.stringify(dirData.filter(Boolean))}`;
      }
    },

    // 在插件中增加构建钩子
    buildStart() {
      if (process.env.NODE_ENV === "production") {
        cache = null; // 强制重新生成
      }
    },
  };
};
