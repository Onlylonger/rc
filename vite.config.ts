import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "output",
  },
  resolve: {
    alias: {
      "@shilong/rc": resolve(__dirname, "./src/shared/main.ts"),
    },
  },
});
