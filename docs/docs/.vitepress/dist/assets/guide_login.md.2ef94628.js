import{_ as n,c as s,o as a,a as t}from"./app.bffc389d.js";const m='{"title":"\u539F\u751F\u5FAE\u4FE1/\u4F01\u4E1A\u5FAE\u4FE1","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u539F\u751F\u5FAE\u4FE1/\u4F01\u4E1A\u5FAE\u4FE1","slug":"\u539F\u751F\u5FAE\u4FE1-\u4F01\u4E1A\u5FAE\u4FE1"},{"level":2,"title":"\u767B\u5F55\u7684\u4E0D\u540C","slug":"\u767B\u5F55\u7684\u4E0D\u540C"}],"relativePath":"guide/login.md","lastUpdated":1646469685348}',p={},o=t(`<h2 id="\u539F\u751F\u5FAE\u4FE1-\u4F01\u4E1A\u5FAE\u4FE1" tabindex="-1">\u539F\u751F\u5FAE\u4FE1/\u4F01\u4E1A\u5FAE\u4FE1 <a class="header-anchor" href="#\u539F\u751F\u5FAE\u4FE1-\u4F01\u4E1A\u5FAE\u4FE1" aria-hidden="true">#</a></h2><p>\u5C0F\u7A0B\u5E8F\u53EF\u4EE5\u540C\u65F6\u8FD0\u884C\u5728<strong>\u5FAE\u4FE1</strong>\u4E0A\u548C<strong>\u4F01\u4E1A\u5FAE\u4FE1</strong>\u4E0A\uFF0C\u4F46\u662F\u8FD9\u4E24\u4E2A\u5E73\u53F0\u5BF9\u5C0F\u7A0B\u5E8F\u8C03\u7528\u7684<code>API</code>\u652F\u6301\u5EA6\u662F\u4E0D\u4E00\u6837\u7684\uFF08tip\uFF1A\u539F\u751F\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u652F\u6301\u6240\u6709\uFF0C\u4F01\u4E1A\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u652F\u6301\u90E8\u5206\uFF09</p><p><a href="https://developer.work.weixin.qq.com/document/path/91503" target="_blank" rel="noopener noreferrer">https://developer.work.weixin.qq.com/document/path/91503</a></p><p>\u4F8B\u5982\uFF1A</p><p><img src="https://img-blog.csdnimg.cn/e812dfcd6a844db8b510baaffa001c48.png" alt="img"></p><p>\u7B80\u800C\u8A00\u4E4B\u5C31\u662F\u5982\u679C\u4F60\u60F3\u8981\u7684\u4F60\u7684\u5C0F\u7A0B\u5E8F\u540C\u65F6\u80FD\u591F\u5728\u4E24\u4E2A\u73AF\u5883\u8FD0\u884C\uFF0C\u53EA\u80FD\u91C7\u7528\u5B83\u4EEC\u90FD\u652F\u6301\u7684<code>API</code>\uFF0C\u800C\u6211\u4EEC\u8FD9\u4E2A\u5C0F\u7A0B\u5E8F\u4E5F\u662F\u8FD9\u4E48\u505A\u7684</p><h2 id="\u767B\u5F55\u7684\u4E0D\u540C" tabindex="-1">\u767B\u5F55\u7684\u4E0D\u540C <a class="header-anchor" href="#\u767B\u5F55\u7684\u4E0D\u540C" aria-hidden="true">#</a></h2><p>\u8FD0\u884C\u5728\u4E0D\u4E00\u6837\u7684\u73AF\u5883\uFF0C\u81EA\u7136\u4E5F\u662F\u6709\u4E0D\u540C\u7684\u767B\u5F55\u6D41\u7A0B\uFF0C\u4E0B\u9762\u89E3\u91CA\u5C0F\u7A0B\u5E8F\u7684\u767B\u5F55\u6D41\u7A0B\u8C03\u7528\uFF1A</p><ol><li>\u5148\u5728<code>app.js</code>\u4E2D\u6CE8\u518Clogin\u51FD\u6570</li></ol><div class="language-js"><pre><code><span class="token keyword">let</span> login <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;./js/login.js&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//login\u6765\u81EA\u8BE5\u6587\u4EF6</span>

<span class="token function">App</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token function">getToken</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token function">login</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre></div><p>\u7136\u540E\u5728<code>pages/index/index.js</code>\u4E2D\u5C31\u53EF\u4EE5\u8C03\u7528\uFF1A</p><div class="language-js"><pre><code><span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">getApp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//...</span>
<span class="token keyword">async</span> <span class="token function">onLoad</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">await</span> app<span class="token punctuation">.</span><span class="token function">getToken</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//\u7B49\u5F85\u83B7\u53D6token</span>
<span class="token punctuation">}</span>
</code></pre></div><p>\u4E0A\u9762\u7684\u4EE3\u7801\u5C31\u662F\u8C03\u7528\u51FD\u6570\uFF0C\u771F\u6B63\u7684\u6838\u5FC3\u8FD8\u662F\u5728<code>/js/login.js</code>\u6587\u4EF6\uFF0C\u6211\u4EEC\u6765\u770B\u770B\uFF1A</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> baseUrl <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./http.js&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">reLogin</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  wx<span class="token punctuation">.</span><span class="token function">getSystemInfo</span><span class="token punctuation">(</span><span class="token punctuation">{</span>        <span class="token comment">//\u83B7\u53D6\u7CFB\u7EDF\u4FE1\u606F</span>
    <span class="token function-variable function">success</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>environment <span class="token operator">&amp;&amp;</span> e<span class="token punctuation">.</span>environment <span class="token operator">==</span> <span class="token string">&quot;wxwork&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//\u4F01\u4E1A\u5FAE\u4FE1\u73AF\u5883\u4E0B\u8FDB\u884C\u7684\u64CD\u4F5C</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">//\u666E\u901A\u5FAE\u4FE1\u73AF\u5883\u4E0B\u8FDB\u884C\u7684\u64CD\u4F5C</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> reLogin<span class="token punctuation">;</span>
</code></pre></div><p>\u5148\u6765\u770B\u770B\u4F01\u4E1A\u5FAE\u4FE1\u73AF\u5883\u4E0B\u8FDB\u884C\u7684\u64CD\u4F5C\u7684\u4EE3\u7801\uFF0C\u539F\u751F\u5FAE\u4FE1\u73AF\u5883\u4E0B\u540C\u7406\uFF1A</p><div class="language-js"><pre><code><span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>environment <span class="token operator">&amp;&amp;</span> e<span class="token punctuation">.</span>environment <span class="token operator">==</span> <span class="token string">&quot;wxwork&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    wx<span class="token punctuation">.</span>qy<span class="token punctuation">.</span><span class="token function">login</span><span class="token punctuation">(</span><span class="token punctuation">{</span>   <span class="token comment">//\u8C03\u7528\u4F01\u4E1A\u5FAE\u4FE1\u767B\u5F55API</span>
        <span class="token function-variable function">success</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;\u767B\u5F55\u8BF7\u6C42\u53D1\u9001\u6210\u529F\uFF1A&quot;</span><span class="token punctuation">,</span> res<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>res<span class="token punctuation">.</span>code<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//\u53D1\u8D77\u7F51\u7EDC\u8BF7\u6C42</span>
            wx<span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>baseUrl<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/MpLoginByCode/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>res<span class="token punctuation">.</span>code<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
                <span class="token function-variable function">success</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;\u540E\u7AEF\u6362\u53D6token\u8BF7\u6C42\u53D1\u9001\u6210\u529F\uFF1A&quot;</span><span class="token punctuation">,</span> res<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    res<span class="token punctuation">.</span>data<span class="token punctuation">.</span>data <span class="token operator">&amp;&amp;</span> wx<span class="token punctuation">.</span><span class="token function">setStorageSync</span><span class="token punctuation">(</span><span class="token string">&quot;token&quot;</span><span class="token punctuation">,</span> res<span class="token punctuation">.</span>data<span class="token punctuation">.</span>data<span class="token punctuation">.</span>token<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//\u5B58\u50A8Token</span>
                    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token function-variable function">fail</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>    <span class="token comment">//\u5B66\u6821\u6709\u4E00\u53F0DNS\u670D\u52A1\u5668\u6709\u95EE\u9898\uFF0C\u67D0\u4E9B\u7528\u6237\u53EF\u80FD\u4F1A\u5BFC\u81F4\u9519\u8BEF</span>
                    wx<span class="token punctuation">.</span><span class="token function">showModal</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                        <span class="token literal-property property">content</span><span class="token operator">:</span> <span class="token string">&#39;\u83B7\u53D6\u8FD0\u8425\u5546\u670D\u52A1\u5931\u8D25\uFF0C\u8BF7\u5C1D\u8BD5\u8FDE\u63A5\u6821\u56ED\u7F51\u540E\u91CD\u542F\uFF01&#39;</span><span class="token punctuation">,</span>
                    <span class="token punctuation">}</span><span class="token punctuation">)</span>
                    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;\u540E\u7AEF\u6362\u53D6token\u8BF7\u6C42\u53D1\u9001\u5931\u8D25\uFF1A&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token function">reject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;\u767B\u5F55\u5931\u8D25\uFF01&quot;</span> <span class="token operator">+</span> res<span class="token punctuation">.</span>errMsg<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">reject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div>`,16),c=[o];function e(u,l,i,k,r,d){return a(),s("div",null,c)}var f=n(p,[["render",e]]);export{m as __pageData,f as default};