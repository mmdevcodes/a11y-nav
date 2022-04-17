import { defineConfig } from "vite";
import prismjs from "vite-plugin-prismjs";

export default defineConfig({
  base: "/a11y-nav/",
  build: {
    outDir: "web",
  },
  plugins: [
    prismjs({
      languages: ["html", "css", "javascript"],
      theme: "okaidia",
      css: true,
      plugins: ["unescaped-markup"],
    }),
  ],
});
