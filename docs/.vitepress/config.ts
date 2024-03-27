import { defineConfig } from "vitepress";
export default defineConfig({
  lang: "zh-CN",
  title: "PlumNotes",
  description: "李振宇的个人笔记",
  base: "/guideNotes/",
  head: [["link", { rel: "icon", href: "/icon.png" }]],
  markdown: {
    lineNumbers: false,
  },
  themeConfig: {
    i18nRouting: false,
    lastUpdatedText: "最后更新时间",
    nav: [
      {
        text: "前端开发笔记",
        items: [
          {
            text: "JavaScript",
            link: "/javascript/",
          },
          {
            text: "TypeScript",
            items: [
              { text: "TypeScript", link: "/typescript/typescript/" },
              { text: "ts.config", link: "/typescript/tsconfig/" },
            ],
          },
        ],
      },
      {
        text: "前端开发笔记2",
        items: [
          {
            text: "JSDoc",
            link: "/jsdoc/",
          },
          {
            text: "Vue",
            items: [
              {
                text: "Vue2",
                link: "/vue/vue2/",
              },
              {
                text: "Vue3",
                link: "/vue/vue3/",
              },
            ],
          },
          {
            text: "React",
            items: [
              {
                text: "ReactNative",
                link: "/react/reactnative/",
              },
            ],
          },
        ],
      },
      {
        text: "脚手架",
        items: [
          {
            text: "Vite",
            items: [
              { text: "cli迁移", link: "/vuecli/vite/cli2vite/" },
              {
                text: "vit.config笔记",
                link: "/vuecli/vite/config/",
              },
            ],
          },
          {
            text: "工具",
            items: [{ text: "自定义工具", link: "/tools/cli/" }],
          },
        ],
      },
      {
        text: "工具",
        items: [
          {
            text: "打包相关",
            items: [
              {
                text: "Rollup",
                link: "/builde/rollup/",
              },
              {
                text: "Webpack",
                link: "/builde/webpack/",
              },
            ],
          },
          {
            text: "git",
            link: "/notes/git/",
          },
          {
            text: "fnm",
            link: "/notes/fnm/",
          },
        ],
      },
      {
        text: "个人",
        items: [
          {
            text: "nas/sPC",
            link: "/nastools/",
          },
          {
            text: "docker",
            link: "/docker/",
          },
          {
            text: "gitlab",
            items: [
              { text: "gitlab", link: "/gitlab/gitlab/" },
              { text: "gitlabRunner", link: "/gitlab/gitlabrunner/" },
            ],
          },
          {
            text: "视频编码",
            items: [{ text: "ffmpeg", link: "/videoencodes/ffmpeg/" }],
          },
        ],
      },
    ],
  },
});
