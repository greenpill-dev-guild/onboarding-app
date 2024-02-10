/// <reference types="vitest" />
import { defineConfig } from "vite";

import svgr from "vite-plugin-svgr";
import mkcert from "vite-plugin-mkcert";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/__tests__/setup.ts",
    css: true,
  },
  define: {
    global: "globalThis",
  },
  resolve: {
    /**
     * Polyfills nodejs imports
     * @see https://vitejs.dev/config/shared-options.html#resolve-alias
     */
    alias: {
      process: "process/browser",
      util: "util",
    },
  },
  plugins: [
    react(),
    mkcert(),
    //@ts-ignore
    svgr({
      svgrOptions: {
        namedExport: "RC",
      },
    }),
    VitePWA({
      includeAssets: [
        "assets/favicon.ico",
        "assets/logo-64.png",
        "assets/logo-310.png",
        "assets/waves.png",
        "assets/world.png",
        "assets/profile.png",
      ],
      injectRegister: "auto",
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      manifest: {
        name: "Greenpill",
        short_name: "Greenpill",
        icons: [
          {
            src: "assets/logo-64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "assets/logo-310.png",
            sizes: "192X192",
            type: "image/png",
          },
          {
            src: "assets/logo-310.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        start_url: "/",
        scope: "/",
        display: "fullscreen",
        orientation: "portrait-primary",
        theme_color: "#e9e3dd",
        background_color: "#191c1c",
        shortcuts: [
          {
            name: "Hypercerts",
            description: "View your hypercerts and attestations",
            url: "/hypercerts",
            icons: [
              {
                src: "assets/waves.png",
                sizes: "64x64",
                type: "image/png",
              },
            ],
          },
          {
            name: "Mint",
            description: "Mint a new hypercert",
            url: "/mint",
            icons: [
              {
                src: "assets/world.png",
                sizes: "64x64",
                type: "image/png",
              },
            ],
          },
          {
            name: "Profile",
            description: "View accomplishments and stats",
            url: "/profile",
            icons: [
              {
                src: "assets/profile.png",
                sizes: "64x64",
                type: "image/png",
              },
            ],
          },
        ],
        related_applications: [
          {
            platform: "webapp",
            url: "https://localhost:5173/manifest.webmanifest",
          },
        ],
        categories: ["entertainment", "music", "social"],
      },
    }),
  ],
  server: {
    port: 3001,
  },
});
