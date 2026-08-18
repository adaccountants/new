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
    strictPort: true,
    allowedHosts: true,
    warmup: {
      clientFiles: [
        "./src/routes/index.tsx",
        "./src/routes/about.tsx",
        "./src/routes/services/index.tsx",
        "./src/routes/careers.tsx",
        "./src/routes/blog.tsx",
        "./src/routes/contact.tsx",
        "./src/components/site/SiteShell.tsx",
        "./src/components/site/Hero.tsx",
      ],
    },
  },
  preview: {
    port: 8080,
    strictPort: true,
    headers: {
      // Same policy as vercel.json, without upgrade-insecure-requests (breaks local http).
      "Content-Security-Policy":
        "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://bglpwknowjvhuyykuuww.supabase.co; font-src 'self'; connect-src 'self' https://bglpwknowjvhuyykuuww.supabase.co wss://bglpwknowjvhuyykuuww.supabase.co; media-src 'self' https://bglpwknowjvhuyykuuww.supabase.co; frame-src 'none'",
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
