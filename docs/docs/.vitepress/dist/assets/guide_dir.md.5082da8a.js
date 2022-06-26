import{_ as e,c as n,o as s,a}from"./app.bffc389d.js";const _='{"title":"\u672C\u5730\u5B89\u88C5","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u672C\u5730\u5B89\u88C5","slug":"\u672C\u5730\u5B89\u88C5"},{"level":2,"title":"\u76EE\u5F55\u7ED3\u6784","slug":"\u76EE\u5F55\u7ED3\u6784"},{"level":2,"title":"\u5B89\u88C5","slug":"\u5B89\u88C5"},{"level":2,"title":"\u5176\u4ED6\u60C5\u51B5","slug":"\u5176\u4ED6\u60C5\u51B5"}],"relativePath":"guide/dir.md","lastUpdated":1646469685347}',t={},o=a(`<h2 id="\u672C\u5730\u5B89\u88C5" tabindex="-1">\u672C\u5730\u5B89\u88C5 <a class="header-anchor" href="#\u672C\u5730\u5B89\u88C5" aria-hidden="true">#</a></h2><ol><li><p>gitlab\u79C1\u6709\u4ED3\u5E93\uFF1A<a href="https://gitlab.com/peterroe/second_class_front_weapp/-/tree/master" target="_blank" rel="noopener noreferrer">https://gitlab.com/peterroe/second_class_front_weapp/-/tree/master</a></p></li><li><p>\u786E\u4FDD\u81EA\u5DF1\u662F\u8FD9\u4E2A\u79C1\u6709\u4ED3\u5E93\u7684\u6210\u5458\uFF0C\u5982\u82E5\u6CA1\u6709\uFF0C\u627E\u7BA1\u7406\u5458\u6DFB\u52A0\uFF08\u6797\u8212\u6052\uFF09</p></li><li><p>\u7136\u540E\uFF0C\u672C\u5730\u514B\u9686\u8BE5\u4ED3\u5E93\u7684 <strong>master\u5206\u652F</strong></p></li></ol><div class="language-shell"><pre><code>$ <span class="token function">git</span> clone -b master git@gitlab.com:peterroe/second_class_front_weapp.git
</code></pre></div><ol start="4"><li>\u4F60\u5C06\u4F1A\u5F97\u5230\u5982\u4E0B\u76EE\u5F55\u7ED3\u6784</li></ol><h2 id="\u76EE\u5F55\u7ED3\u6784" tabindex="-1">\u76EE\u5F55\u7ED3\u6784 <a class="header-anchor" href="#\u76EE\u5F55\u7ED3\u6784" aria-hidden="true">#</a></h2><div class="language-shell {}"><pre><code>\u251C\u2500 colorui      <span class="token comment"># colorUI\u7684css\u6587\u4EF6</span>
\u251C\u2500 component    <span class="token comment"># \u5F00\u53D1\u8005\u5C01\u88C5\u7684\u7EC4\u4EF6\u6587\u4EF6\u5939</span>
\u251C\u2500 config       <span class="token comment"># \u817E\u8BAF\u4F4D\u7F6E\u670D\u52A1\u793A\u4F8B</span>
\u251C\u2500 docs         <span class="token comment"># \u6B64\u6587\u6863\u7684\u4ED3\u5E93</span>
\u251C\u2500 font         <span class="token comment"># icon\u56FE\u6807</span>
\u251C\u2500 images       <span class="token comment"># \u56FE\u7247\u6587\u4EF6\u5939</span>
\u251C\u2500 js           <span class="token comment"># \u5C01\u88C5\u7684\u767B\u5F55\u548C\u8BF7\u6C42\u7684\u811A\u672C\u6587\u4EF6</span>
\u251C\u2500 pages        <span class="token comment"># \u9875\u9762\u6587\u4EF6\u5939</span>
\u251C\u2500 utils        <span class="token comment"># \u5C01\u88C5\u7684js\u5DE5\u5177\u811A\u672C</span>
\u251C\u2500 .gitignore           <span class="token comment"># git\u63D0\u4EA4\u65F6\u5FFD\u7565\u63D0\u4EA4\u7684\u6587\u4EF6</span>
\u251C\u2500 .prettierignore      <span class="token comment"># \u4E0D\u7528\u7BA1</span>
\u251C\u2500 app.js               <span class="token comment"># \u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u76F8\u5173\u5168\u5C40\u811A\u672C</span>
\u251C\u2500 app.json             <span class="token comment"># \u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u76F8\u5173\u5168\u5C40\u914D\u7F6E</span>
\u251C\u2500 app.wxss             <span class="token comment"># \u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u76F8\u5173\u5168\u5C40\u6837\u5F0F</span>
\u251C\u2500 fide.project.config.json        <span class="token comment"># \u4E0D\u7528\u7BA1</span>
\u251C\u2500 package-lock.json    <span class="token comment"># \u4E0D\u7528\u7BA1</span>
\u251C\u2500 package.json         <span class="token comment"># \u4E0D\u7528\u7BA1</span>
\u251C\u2500 project.config.json  <span class="token comment"># \u53EF\u4EE5\u4E0D\u7528\u7BA1</span>
\u251C\u2500 README.md            <span class="token comment"># readme\u6587\u6863</span>
\u251C\u2500 sitemap.json        <span class="token comment"># \u6253\u5305\u65F6\u5019\u7684\u914D\u7F6E</span>
</code></pre></div><h2 id="\u5B89\u88C5" tabindex="-1">\u5B89\u88C5 <a class="header-anchor" href="#\u5B89\u88C5" aria-hidden="true">#</a></h2><p><em>\u7528\u5FAE\u4FE1\u5F00\u53D1\u8005\u5DE5\u5177\u8FDB\u884C\u5F00\u53D1</em></p><p>\u91C7\u7528 <strong>npm</strong> \u5B89\u88C5\uFF0C\u5BF9\u7248\u672C\u65E0\u9700\u6C42\uFF0C\u8FD9\u91CC\u6211\u4F7F\u7528\u7684\u662F<code>8.3.1</code></p><p>\u6267\u884C\uFF1A</p><div class="language-shell"><pre><code>$ <span class="token function">npm</span> i
</code></pre></div><p>\u5B89\u88C5\u5B8C\u6210\u540E\u53EF\u80FD\u4F1A\u4EA7\u751F\u4E00\u4E9B\u8FC7\u671F\u8B66\u544A\uFF0C\u4F46\u662F\u6CA1\u62A5\u9519\u5C31\u884C</p><p>\u7136\u540E\u6267\u884C\u4E0B\u56FE\u7684\u64CD\u4F5C\uFF0C\u6784\u5EFA<code>npm</code>:</p><p><img src="https://img-blog.csdnimg.cn/701600821bc741d6ac0af2ba48f9d639.png" alt="img"></p><p>\u5F85\u6784\u5EFA\u5B8C\u6210\u4E4B\u540E\uFF0C\u53EF\u4EE5\u770B\u5230\u5C0F\u7A0B\u5E8F\u6210\u529F\u8FD0\u884C\uFF0C\u5982\u679C\u52A0\u8F7D\u5931\u8D25\uFF0C\u53EF\u4EE5\u50CF\u4E0B\u56FE\u90A3\u6837\u70B9\u51FB\u53F3\u4E0A\u89D2\u7684\u6309\u94AE\uFF0C\u5F39\u51FA\u9884\u89C8\u7A97\u53E3(\u53EF\u80FD\u89E3\u51B3\u8FD9\u4E2A\u95EE\u9898)\uFF1A</p><p><img src="https://img-blog.csdnimg.cn/36ae57ef1d1c46e0ab957d153a3e4989.png" alt="img"></p><h2 id="\u5176\u4ED6\u60C5\u51B5" tabindex="-1">\u5176\u4ED6\u60C5\u51B5 <a class="header-anchor" href="#\u5176\u4ED6\u60C5\u51B5" aria-hidden="true">#</a></h2><p>\u5982\u679C\u9047\u5230\u4E86\u67D0\u4E9B\u95EE\u9898\u4F60\u53EF\u80FD\u9700\u8981\u8FDB\u884C\u8FD9\u4E9B\u64CD\u4F5C\uFF1A</p><ul><li>\u786E\u8BA4\u5FAE\u4FE1\u5F00\u53D1\u8005\u5DE5\u5177\u5DF2\u7ECF\u767B\u5F55\uFF0C\u5E76\u4E14\u5728\u5C0F\u7A0B\u5E8F\u540E\u53F0\u628A\u4F60\u52A0\u5165\u4E86\u5F00\u53D1\u8005</li><li>\u786E\u8BA4\u57FA\u7840\u5E93\u7248\u672C</li><li>\u4EE5\u53CA\u4E0B\u9762\u76F8\u5173\u7684\u914D\u7F6E\uFF08\u53EF\u4EE5\u548C\u6211\u7684\u4FDD\u6301\u4E00\u81F4\uFF09</li></ul><p><img src="https://img-blog.csdnimg.cn/d38deb7da47146b98a80101d109e1c4e.png" alt="img"></p><p>\u66F4\u591A\u95EE\u9898\u8BF7\u8054\u7CFB\u539F\u5F00\u53D1\u8005</p>`,21),p=[o];function c(l,i,r,m,d,g){return s(),n("div",null,p)}var k=e(t,[["render",c]]);export{_ as __pageData,k as default};