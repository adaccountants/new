import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  server: {
    host: true,
    port: 8080,
    warmup: {
      clientFiles: [
        "./src/routes/index.tsx",
        "./src/routes/about.tsx",
        "./src/routes/services.tsx",
        "./src/routes/careers.tsx",
        "./src/routes/blog.tsx",
        "./src/routes/contact.tsx",
        "./src/components/site/SiteShell.tsx",
        "./src/components/site/Hero.tsx",
      ],
    },
  },
  optimizeDeps: {
    include: ["framer-motion", "@tanstack/react-router", "@tanstack/react-query"],
  },
  resolve: {
    alias: {
      "@": path.resolve(root, "src"),
    },
  },
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart({
      srcDirectory: "src",
      server: { entry: "server" },
    }),
    viteReact(),
    nitro(),
  ],
});
