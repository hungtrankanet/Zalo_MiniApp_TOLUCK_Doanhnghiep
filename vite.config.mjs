import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import zaloMiniApp from "zmp-vite-plugin";

export default defineConfig({
  root: "./",
  base: "",
  plugins: [react(), zaloMiniApp()],
  build: {
    outDir: "www",
    emptyOutDir: true,
  },
});
