import { defineConfig } from "vitepress";
export default defineConfig({
  lang: "zh-CN",
  title: "PlumNotes",
  description: "李振宇的个人笔记",
  base: "/guideNotes/",
  head: [["link", { rel: "icon", href: "/icon.png" }]],
  markdown: {
    lineNumbers: false,
    emoji: {
      defs: {
        "": "",
      },
    },
  },
  themeConfig: {
    i18nRouting: false,
    lastUpdatedText: "最后更新时间",
    nav: [
      {
        text: "前端基础笔记",
        items: [
          {
            text: "JavaScript",
            items: [
              { text: "base", link: "/javascript/base/" },
              { text: "note", link: "/javascript/note/" },
            ],
          },
          // {
          //   text: "Vue",
          //   items: [
          //     {
          //       text: "Vue2",
          //       link: "/vue/vue2/",
          //     },
          //     {
          //       text: "Vue3",
          //       link: "/vue/vue3/",
          //     },
          //   ],
          // },
          // {
          //   text: "React",
          //   items: [
          //     {
          //       text: "React",
          //       link: "/react/React/",
          //     },
          //   ],
          // },
          {
            text: "CSS",
            items: [{ text: "sass", link: "/css/sass/" }],
          },
        ],
      },
      {
        text: "前端开发笔记",
        items: [
          {
            text: "TypeScript",
            items: [
              { text: "base", link: "/typescript/base/" },
              { text: "utility", link: "/typescript/utility/" },
              { text: "ts.config", link: "/typescript/tsconfig/" },
            ],
          },
          {
            text: "JSDoc",
            link: "/jsdoc/",
          },
          {
            text: "移动端",
            items: [
              {
                text: "ReactNative",
                link: "/react/reactnative/",
              },
            ],
          },
          {
            text: "Electron",
            items: [
              {
                text: "vite/Vue3",
                link: "/electron/vite_vue3/",
              },
            ],
          },
        ],
      },
      {
        text: "后端开发笔记",
        items: [
          {
            text: "Deno",
            items: [
              { text: "base", link: "/deno/base" },
              { text: "dockerfile", link: "/deno/dockerfile" },
              { text: "runner", link: "/deno/gitlabrunner" },
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
            items: [{ text: "cli", link: "/tools/cli/" }],
          },
          {
            text: "Format",
            items: [{ text: "prettier", link: "/format/prettier/" }],
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
          {
            text: "yarn",
            link: "/notes/yarn/",
          },
          {
            text: "packages",
            link: "/notes/packages/",
          },
        ],
      },
      {
        text: "脚本",
        items: [
          {
            text: "PowerShell",
            link: "/script/powershell/",
          },
        ],
      },
      {
        text: "AI",
        items: [
          {
            text: "模型",
            link: "/ai/model/",
          },
          {
            text: "失败记录",
            link: "/ai/failed/",
          },
          {
            text: "minimind",
            link: "/ai/minimind/",
          },
        ],
      },
      {
        text: "个人",
        items: [
          {
            text: "nas/sPC",
            items: [
              { text: "nastools", link: "/nastools/" },
              { text: "trueNas", link: "/nastools/trueNas/" },
            ],
          },
          {
            text: "docker",
            items: [
              { text: "docker", link: "/docker/" },
              { text: "dockerFile", link: "/docker/dockerFile/" },
            ],
          },
          {
            text: "gitlab",
            items: [
              { text: "gitlab", link: "/gitlab/gitlab/" },
              { text: "gitlabCI", link: "/gitlab/gitlabCI/" },
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
