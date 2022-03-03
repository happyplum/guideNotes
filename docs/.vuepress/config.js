module.exports = {
	title: "PlumNotes",
	description: "李振宇的个人笔记",
	base: "/guideNotes/",
	head: [["link", { rel: "icon", href: "/icon.png" }]],
	port: 3000,
	markdown: {
		lineNumbers: false,
	},
	themeConfig: {
		lastUpdated: "最后更新时间",
		sidebar: "auto",
		repo: "https://github.com/happyplum/guideNotes",
		repoLabel: "Github",
		nav: [
			{
				text: "测试测试",
				link: "/notes/",
			},
			{
				text: "打包工具",
				items: [
					{
						text: "Rollup",
						link: "/rollup/",
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
