import{_ as e,c as s,o as l,a2 as i}from"./chunks/framework.Cj42D_MX.js";const m=JSON.parse('{"title":"fnm 笔记--node 版本切换器","description":"","frontmatter":{"sidebar":"auto"},"headers":[],"relativePath":"notes/fnm/index.md","filePath":"notes/fnm/index.md"}'),t={name:"notes/fnm/index.md"},a=i('<h1 id="fnm-笔记-node-版本切换器" tabindex="-1">fnm 笔记--node 版本切换器 <a class="header-anchor" href="#fnm-笔记-node-版本切换器" aria-label="Permalink to &quot;fnm 笔记--node 版本切换器&quot;">​</a></h1><h2 id="下载地址" tabindex="-1">下载地址 <a class="header-anchor" href="#下载地址" aria-label="Permalink to &quot;下载地址&quot;">​</a></h2><p><a href="https://github.com/Schniz/fnm" target="_blank" rel="noreferrer">https://github.com/Schniz/fnm</a></p><h2 id="windows-说明" tabindex="-1">windows 说明 <a class="header-anchor" href="#windows-说明" aria-label="Permalink to &quot;windows 说明&quot;">​</a></h2><p>安装完毕后 powershell 需要设置 ps 脚本，配置 profile.ps1</p><p>关于 profile.ps1 定位</p><p>在 powershell 界面输入已下变量进行输出</p><div class="language-powershell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">$profile</span></span></code></pre></div><p>关于其他文件定位的变量,参考官网[<a href="https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_profiles?view=powershell-7.4" target="_blank" rel="noreferrer">https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_profiles?view=powershell-7.4</a>]</p><ul><li>Current User, Current Host - $PROFILE</li><li>Current User, Current Host - $PROFILE.CurrentUserCurrentHost</li><li>Current User, All Hosts - $PROFILE.CurrentUserAllHosts</li><li>All Users, Current Host - $PROFILE.AllUsersCurrentHost</li><li>All Users, All Hosts - $PROFILE.AllUsersAllHosts</li></ul><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>windows 下如果你安装过 powershell 可能会存在两个版本 一个版本是 windows powershell,另一个可能是 powershellv7 版本，两个版本的 profile 文件是不一样的，所以需要定位一下</p></div><h2 id="powershell-命令" tabindex="-1">powershell 命令 <a class="header-anchor" href="#powershell-命令" aria-label="Permalink to &quot;powershell 命令&quot;">​</a></h2><p>使用以下命令即可每次打开时候自动使 fnm 生效</p><div class="language-powershell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">fnm env </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">use-on</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">cd </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Out-String</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Invoke-Expression</span></span></code></pre></div>',14),r=[a];function o(n,p,h,d,c,u){return l(),s("div",null,r)}const f=e(t,[["render",o]]);export{m as __pageData,f as default};
