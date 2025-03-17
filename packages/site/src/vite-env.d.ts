/// <reference types="vite/client" />

declare module "virtual:scan-list" {
  interface FileNode {
    name: string;
    type: "file" | "directory";
    path: string;
    ext?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    frontmatter?: Record<string, any>;
    content?: string;
    children?: FileNode[];
  }

  const data: FileNode[];
  export default data;
}
