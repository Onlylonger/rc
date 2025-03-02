import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "output",
  },
  resolve: {
    alias: {
      "@shilong/rc": resolve(__dirname, "./src/shared/main.ts"),
    },
  },
  // css: {
  //   postcss: "./postcss.config.js",
  // },
});
