import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tailwindcss from "@tailwindcss/vite";
// import { analyzer } from "vite-bundle-analyzer";
import { dependencies } from "./package.json";
import { muteWarningsPlugin } from "./plugins/mute-warnings";

export default defineConfig({
  plugins: [
    dts({
      outDir: resolve(__dirname, "dist/es"),
      tsconfigPath: resolve(__dirname, "./tsconfig.json"),
    }),
    tailwindcss(),
    // https://github.com/vitejs/vite/issues/15012#issuecomment-1825035992
    // https://github.com/evanw/esbuild/issues/3548
    muteWarningsPlugin(["SOURCEMAP_ERROR", "MODULE_LEVEL_DIRECTIVE"]),
    // analyzer(),
  ],
  build: {
    copyPublicDir: false,
    minify: false,
    cssMinify: false,
    rollupOptions: {
      input: resolve(__dirname, "./src/main.ts"),
      external: [...Object.keys(dependencies), "react/jsx-runtime"],
      output: [
        {
          format: "es",
          preserveModules: true,
          entryFileNames: "[name].js",
          dir: "dist/es",
          assetFileNames: "[name][extname]",
        },
      ],
      preserveEntrySignatures: "allow-extension",
      jsx: {
        mode: "automatic",
      },
    },
  },
  css: {},
});
