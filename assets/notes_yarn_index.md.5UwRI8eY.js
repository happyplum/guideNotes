import{_ as a,c as s,o as n,a2 as e}from"./chunks/framework.Cj42D_MX.js";const _=JSON.parse('{"title":"yarn 笔记","description":"","frontmatter":{"sidebar":"auto"},"headers":[],"relativePath":"notes/yarn/index.md","filePath":"notes/yarn/index.md"}'),i={name:"notes/yarn/index.md"},t=e(`<h1 id="yarn-笔记" tabindex="-1">yarn 笔记 <a class="header-anchor" href="#yarn-笔记" aria-label="Permalink to &quot;yarn 笔记&quot;">​</a></h1><h2 id="关于依赖固化以及依赖版本不一致" tabindex="-1">关于依赖固化以及依赖版本不一致 <a class="header-anchor" href="#关于依赖固化以及依赖版本不一致" aria-label="Permalink to &quot;关于依赖固化以及依赖版本不一致&quot;">​</a></h2><p>在开发中会碰到 packages.json 因为设置了^导致 install 了有兼容性的版本 自己的项目还好管理，但是碰到依赖的项目中的 packages.json 就没办法被管理了</p><p>这时候就需要将依赖进行固化，可以从 yarn.lock 文件查看当前的安装版本</p><h2 id="依赖固化" tabindex="-1">依赖固化 <a class="header-anchor" href="#依赖固化" aria-label="Permalink to &quot;依赖固化&quot;">​</a></h2><p>packages.json 中可以设置 resolutions 属性来进行固化，配置和 dependencies 中类似，直接使用&quot;包:version&quot;</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;resolutions&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;vue&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;3.3.4&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div>`,7),o=[t];function l(r,p,h,d,c,k){return n(),s("div",null,o)}const E=a(i,[["render",l]]);export{_ as __pageData,E as default};