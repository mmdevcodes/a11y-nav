import { defineConfig } from "vite";
import { prismjsPlugin } from "vite-plugin-prismjs";

export default defineConfig({
  base: "/a11y-nav/",
  build: {
    outDir: "web",
  },
  plugins: [
    prismjsPlugin({
      languages: ["html", "css", "javascript"],
      theme: "okaidia",
      css: true,
      plugins: ["unescaped-markup"],
    }),
  ],
});
