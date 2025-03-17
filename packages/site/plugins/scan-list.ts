// vite-plugin-scan-list.js
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter"; // 需要安装 gray-matter
import { Plugin } from "vite";

export const scanList: (options?: {
  targetDir?: string;
  virtualModuleId?: string;
  extensions?: string[];
  cacheTTL?: number; // 3秒缓存
  sortBy?: string;
  sortOrder?: string;
}) => Plugin = (options = {}) => {
  const {
    targetDir = "src/pages/blog-detail",
    virtualModuleId = "virtual:scan-list",
    extensions = [".md", ".mdx"],
    cacheTTL = 3000, // 3秒缓存
    // 新增排序配置
    sortBy = "createTime", // 可选: 'createTime' | 'updateTime' | 'frontmatter.date'
    sortOrder = "desc", // 可选: 'asc' | 'desc'
  } = options;

  let cache = null;
  let lastScan = 0;

  // 带缓存的异步扫描
  async function scanDirWithCache(dir) {
    const now = Date.now();
    if (cache && now - lastScan < cacheTTL) {
      return cache;
    }

    const rawData = await scanDir(dir);
    const processedData = processSort(rawData);
    cache = processedData;
    lastScan = now;
    return processedData;
  }

  // 递归扫描目录（异步版本）
  async function scanDir(dir: string) {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });

      return Promise.all(
        entries.map(async (entry) => {
          if (entry.name.startsWith(".")) return null; // 忽略隐藏文件

          const entryPath = path.join(dir, entry.name);
          const isTargetExt = extensions.includes(path.extname(entry.name));

          // 在路径处理中添加校验
          if (!entryPath.startsWith(process.cwd())) {
            throw new Error("非法路径访问");
          }

          if (entry.isDirectory()) {
            return {
              name: entry.name,
              type: "directory",
              path: entryPath,
              children: await scanDir(entryPath),
            };
          } else if (entry.isFile() && isTargetExt) {
            const content = await fs.readFile(entryPath, "utf-8");
            const { data: frontmatter } = matter(content);
            const stats = await fs.stat(entryPath);

            return {
              name: entry.name,
              type: "file",
              path: entryPath,
              ext: path.extname(entry.name),
              frontmatter,
              createTime: stats.birthtimeMs,
              updateTime: stats.mtimeMs,
              content: options.includeContent ? content : undefined,
            };
          }
          return null;
        }),
      );
    } catch (error) {
      console.error(`Scan error in ${dir}:`, error);
      return [];
    }
  }

  // 递归排序处理器（新增核心功能）
  function processSort(nodes) {
    const sortFn = (a, b) => {
      let valueA, valueB;

      switch (sortBy) {
        case "createTime":
          valueA = a.createTime;
          valueB = b.createTime;
          break;
        case "updateTime":
          valueA = a.updateTime;
          valueB = b.updateTime;
          break;
        case "frontmatter.date":
          valueA = new Date(a.frontmatter?.date || 0);
          valueB = new Date(b.frontmatter?.date || 0);
          break;
        default:
          valueA = valueB = 0;
      }

      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    };

    return nodes
      .filter(Boolean)
      .map((node) => {
        if (node.children) {
          return {
            ...node,
            children: processSort(node.children),
          };
        }
        return node;
      })
      .sort((a, b) => {
        if (a.type === "directory" && b.type !== "directory") return -1;
        if (b.type === "directory" && a.type !== "directory") return 1;
        return sortFn(a, b);
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
        const absoluteDir = path.resolve(process.cwd(), targetDir);
        const dirData = await scanDirWithCache(absoluteDir);
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
