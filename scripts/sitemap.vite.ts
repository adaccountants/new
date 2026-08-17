import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

/** Minimal Vite config for the sitemap generator — do not load the app/Nitro plugins. */
export default defineConfig({
  plugins: [tsconfigPaths()],
});
