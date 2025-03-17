import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { scanList } from "./plugins/scan-list";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      enforce: "pre",
      ...mdx({
        remarkPlugins: [remarkFrontmatter, remarkGfm],
        /* jsxImportSource: …, otherOptions… */
      }),
    },
    react(),
    tailwindcss(),
    scanList(),
  ],
  build: {
    outDir: "output",
  },
});
