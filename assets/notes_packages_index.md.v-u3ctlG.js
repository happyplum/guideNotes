import{_ as a,c as t,o as s,ae as r}from"./chunks/framework.QHFhIKkZ.js";const l=JSON.parse('{"title":"packages 笔记","description":"","frontmatter":{"sidebar":"auto"},"headers":[],"relativePath":"notes/packages/index.md","filePath":"notes/packages/index.md"}'),n={name:"notes/packages/index.md"};function o(i,e,h,p,c,d){return s(),t("div",null,[...e[0]||(e[0]=[r(`<h1 id="packages-笔记" tabindex="-1">packages 笔记 <a class="header-anchor" href="#packages-笔记" aria-label="Permalink to &quot;packages 笔记&quot;">​</a></h1><h2 id="关于版本号" tabindex="-1">关于版本号 <a class="header-anchor" href="#关于版本号" aria-label="Permalink to &quot;关于版本号&quot;">​</a></h2><p>&quot;element-ui&quot;: &quot;^2.15.1&quot;, 版本号： 2.15.1 对应 x.y.z z ：表示一些小的bugfix, 更改z的号；(修复补丁-z)（~符号) y ：表示一些大的版本更改，比如一些API的变化；(次要更新-y)(^符号) x ：表示一些设计的变动及模块的重构之类的，会升级x版本号；(重大更新-x)</p><h2 id="packages符号记录" tabindex="-1">packages符号记录 <a class="header-anchor" href="#packages符号记录" aria-label="Permalink to &quot;packages符号记录&quot;">​</a></h2><p>~ 2.15.1 =&gt; 2.15.x 2.15.x =&gt; 2.15.x 2.15.0 =&gt; 2.15.x ^ 2.15.1 =&gt; 2.x.x 2.15.x =&gt; 2.x.x 2.15.0 =&gt; 2.x.x latest 最新版本 2.15.1 直接精确版本</p><h2 id="关于npm-check-update的tags" tabindex="-1">关于npm-check-update的tags <a class="header-anchor" href="#关于npm-check-update的tags" aria-label="Permalink to &quot;关于npm-check-update的tags&quot;">​</a></h2><pre><code>┌──────────┬──────────────────────────────────────────────────────────────────────────────────────────────┐
│ greatest │ Upgrade to the highest version number published, regardless of release date or tag. Includes │
├──────────┼──────────────────────────────────────────────────────────────────────────────────────────────┤
│   latest │ Upgrade to whatever the package&#39;s &quot;latest&quot; git tag points to. Excludes prereleases unless    │
│          │ --pre is specified.                                                                          │
├──────────┼──────────────────────────────────────────────────────────────────────────────────────────────┤
│    minor │ Upgrade to the highest minor version without bumping the major version.                      │
├──────────┼──────────────────────────────────────────────────────────────────────────────────────────────┤
│   newest │ Upgrade to the version with the most recent publish date, even if there are other version    │
│          │ numbers that are higher. Includes prereleases.                                               │
├──────────┼──────────────────────────────────────────────────────────────────────────────────────────────┤
│    patch │ Upgrade to the highest patch version without bumping the minor or major versions.            │
├──────────┼──────────────────────────────────────────────────────────────────────────────────────────────┤
│   semver │ Upgrade to the highest version within the semver range specified in your package.json.       │
├──────────┼──────────────────────────────────────────────────────────────────────────────────────────────┤
│   @[tag] │ Upgrade to the version published to a specific tag, e.g. &#39;next&#39; or &#39;beta&#39;.                   │
└──────────┴──────────────────────────────────────────────────────────────────────────────────────────────┘
</code></pre>`,7)])])}const u=a(n,[["render",o]]);export{l as __pageData,u as default};
