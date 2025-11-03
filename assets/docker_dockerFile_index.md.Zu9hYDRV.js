import{_ as s,c as n,o as p,ae as e}from"./chunks/framework.QHFhIKkZ.js";const u=JSON.parse('{"title":"dockerFile","description":"","frontmatter":{},"headers":[],"relativePath":"docker/dockerFile/index.md","filePath":"docker/dockerFile/index.md"}'),t={name:"docker/dockerFile/index.md"};function l(i,a,o,c,m,r){return p(),n("div",null,[...a[0]||(a[0]=[e(`<h1 id="dockerfile" tabindex="-1">dockerFile <a class="header-anchor" href="#dockerfile" aria-label="Permalink to &quot;dockerFile&quot;">​</a></h1><p>用于快速生成 docker 容器的文件，并且使用 dockerFile 打包分块可以明显提高容器下载速度</p><h1 id="自用" tabindex="-1">自用 <a class="header-anchor" href="#自用" aria-label="Permalink to &quot;自用&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>FROM node:slim</span></span>
<span class="line"><span></span></span>
<span class="line"><span># add yrm and pm2</span></span>
<span class="line"><span>RUN apt-get update &amp;&amp; apt-get install -y sshpass openssl ssh git &amp;&amp; rm -rf /var/lib/apt/lists/* &amp;&amp; apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false</span></span>
<span class="line"><span>RUN npm install -g yrm pm2 &amp;&amp; npm cache clean --force</span></span>
<span class="line"><span></span></span>
<span class="line"><span>CMD [ &quot;bash&quot; ]</span></span></code></pre></div><p>比较简单，在 node:slim 的基础上增加 sshpass 和 yrm 工具</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>FROM node:slim</span></span>
<span class="line"><span></span></span>
<span class="line"><span># add yrm &amp; pm2 &amp; git</span></span>
<span class="line"><span>RUN apt-get update &amp;&amp; apt-get install -y sshpass openssl ssh git &amp;&amp; rm -rf /var/lib/apt/lists/* &amp;&amp; apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false</span></span>
<span class="line"><span>RUN npm install -g yrm pm2 &amp;&amp; npm cache clean --force</span></span>
<span class="line"><span></span></span>
<span class="line"><span># install deno</span></span>
<span class="line"><span>RUN apt-get update &amp;&amp; apt-get install -y curl ca-certificates unzip &amp;&amp; rm -rf /var/lib/apt/lists/* &amp;&amp; apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false</span></span>
<span class="line"><span>RUN set -ex &amp;&amp; curl -fsSLO &quot;https://deno.land/install.sh&quot; &amp;&amp; /bin/bash install.sh</span></span>
<span class="line"><span>ENV DENO_INSTALL=&quot;/root/.deno&quot;</span></span>
<span class="line"><span>ENV PATH=&quot;$DENO_INSTALL/bin:$PATH&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>CMD [ &quot;bash&quot; ]</span></span></code></pre></div><p>打包 deno 用的镜像</p>`,7)])])}const h=s(t,[["render",l]]);export{u as __pageData,h as default};
