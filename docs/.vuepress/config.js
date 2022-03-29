const { removePlugin, PLUGINS } = require("@vuepress/markdown");
module.exports = {
	title: "PlumNotes",
	description: "李振宇的个人笔记",
	base: "/guideNotes/",
	head: [["link", { rel: "icon", href: "/icon.png" }]],
	port: 3000,
	markdown: {
		lineNumbers: false,
		chainMarkdown(config) {
			removePlugin(config, PLUGINS.EMOJI);
		},
	},
	themeConfig: {
		lastUpdated: "最后更新时间",
		sidebar: "auto",
		repo: "https://github.com/happyplum/guideNotes",
		repoLabel: "Github",
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
						link: "/typescript/",
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
				],
			},
			{
				text: "脚手架",
				items: [
					{
						text: "VueCLI",
						link: "/vuecli/vuecli/",
					},
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
				],
			},
			{
				text: "打包工具",
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
				text: "个人",
				items: [
					{
						text: "docker",
						link: "/docker/",
					},
					{
						text: "nas/sPC",
						link: "/nastools/",
					},
					{
						text: "视频编码",
						items: [{ text: "ffmpeg", link: "/videoencodes/ffmpeg/" }],
					},
				],
			},
		],
		sidebar: {},
	},
	configureWebpack: {
		resolve: {
			alias: {
				"@images": "../images",
			},
		},
	},
};
