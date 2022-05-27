var re=Object.defineProperty;var W=Object.getOwnPropertySymbols;var ie=Object.prototype.hasOwnProperty,le=Object.prototype.propertyIsEnumerable;var G=(d,e,r)=>e in d?re(d,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):d[e]=r,I=(d,e)=>{for(var r in e||(e={}))ie.call(e,r)&&G(d,r,e[r]);if(W)for(var r of W(e))le.call(e,r)&&G(d,r,e[r]);return d};const oe=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))a(c);new MutationObserver(c=>{for(const f of c)if(f.type==="childList")for(const p of f.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&a(p)}).observe(document,{childList:!0,subtree:!0});function r(c){const f={};return c.integrity&&(f.integrity=c.integrity),c.referrerpolicy&&(f.referrerPolicy=c.referrerpolicy),c.crossorigin==="use-credentials"?f.credentials="include":c.crossorigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function a(c){if(c.ep)return;c.ep=!0;const f=r(c);fetch(c.href,f)}};oe();class Y{constructor(e,r){this.nav=e,this.options={animate:!0,duration:300,useArrowKeys:!0,closeOnBlur:!0,bodyClass:"a11y-nav-menu-open"},this.controls=this.getControls(),this.menus=this.controls.map(a=>a.menu),this.focusables=this.getFocusables(),this.options=I(I({},this.options),r),this.onButtonClick=this.onButtonClick.bind(this),this.onButtonKeyDown=this.onButtonKeyDown.bind(this),this.onFocusableKeyDown=this.onFocusableKeyDown.bind(this),this.onBlur=this.onBlur.bind(this),this.init()}init(){this.controls.forEach(e=>{e.menu.el.classList.add("a11y-nav-menu"),e.menu.el.setAttribute("tabindex","-1"),e.el.addEventListener("click",this.onButtonClick),e.el.addEventListener("keydown",this.onButtonKeyDown),e.el.getAttribute("aria-expanded")==="true"&&this.openMenu(e.menu)}),this.focusables.forEach(e=>{e.addEventListener("keydown",this.onFocusableKeyDown)}),this.options.closeOnBlur&&this.nav.addEventListener("focusout",this.onBlur)}onButtonClick(e){const r=e.currentTarget,a=this.controls.find(f=>f.el===r),c=(a==null?void 0:a.el.getAttribute("aria-expanded"))==="true";a!=null&&a.menu&&this.toggleMenu(a.menu,!c)}onButtonKeyDown(e){var c;const r=this.getControlFromEl(e.target);if(!r)return;const a=r.el.getAttribute("aria-expanded")==="true";if(e.key==="Escape")if(a)this.closeMenu(r.menu);else{const f=r.el.closest(".a11y-nav-active");if(f){const p=this.getMenuFromEl(f);p?(p.control.el.focus(),this.closeMenu(p)):(this.focusables[0].focus(),this.closeAllMenus())}else this.focusables[0].focus(),this.closeAllMenus()}else if(e.key==="ArrowDown"&&a)e.preventDefault(),(c=r.menu.el.querySelector("a, button"))==null||c.focus();else{const f=this.focusables.filter(o=>this.getMenuDepthFromEl(o)===this.getMenuDepthFromEl(r.el)),p=f.findIndex(o=>o===r.el);this.options.useArrowKeys&&this.controlFocusByKey(e,f.map(o=>o),p)}}onFocusableKeyDown(e){const r=e.target,a=this.getFocusableFromEl(r);if(a){if(this.controls.find(p=>p.el===a))return;if(e.key==="Escape"){const p=a.closest(".a11y-nav-active");if(p){const o=this.getMenuFromEl(p);o?(o.control.el.focus(),this.closeMenu(o)):(this.focusables[0].focus(),this.closeAllMenus())}else this.focusables[0].focus(),this.closeAllMenus()}}else return;const c=this.focusables.filter(p=>this.getMenuDepthFromEl(p)===this.getMenuDepthFromEl(a)),f=c.findIndex(p=>p===a);this.options.useArrowKeys&&this.controlFocusByKey(e,c.map(p=>p),f)}onBlur(e){!this.nav.contains(e.relatedTarget)&&!!this.nav.querySelector(".a11y-nav-active")&&this.closeAllMenus()}controlFocusByKey(e,r,a){switch(e.key){case"ArrowUp":case"ArrowLeft":if(e.preventDefault(),a>-1){const c=Math.max(0,a-1);r[c].focus()}break;case"ArrowDown":case"ArrowRight":if(e.preventDefault(),a>-1){const c=Math.min(r.length-1,a+1);r[c].focus()}break}}toggleMenu(e,r){r?this.openMenu(e):this.closeMenu(e)}openMenu(e){var r;this.menus.forEach(a=>{a!==e&&this.getMenuDepthFromEl(a.el)===this.getMenuDepthFromEl(e.el)&&this.closeMenu(a)}),e.el.classList.add("a11y-nav-active"),e.control.el.setAttribute("aria-expanded","true"),(r=e.el.parentElement)==null||r.classList.add("a11y-nav-child-open"),typeof this.options.bodyClass=="string"&&this.options.bodyClass.length>0&&document.body.classList.add(this.options.bodyClass),this.options.animate&&e.el.classList.add("a11y-nav-animate-in")}closeMenu(e){var r;e.el.querySelectorAll(".a11y-nav-menu").forEach(a=>{const c=this.getMenuFromEl(a);c&&this.closeMenu(c)}),typeof this.options.bodyClass=="string"&&document.body.classList.remove(this.options.bodyClass),e.control.el.setAttribute("aria-expanded","false"),this.options.animate?(e.el.classList.remove("a11y-nav-animate-in"),e.el.classList.add("a11y-nav-animate-out"),setTimeout(()=>{var a;e.el.classList.remove("a11y-nav-active"),e.el.classList.remove("a11y-nav-animate-out"),(a=e.el.parentElement)==null||a.classList.remove("a11y-nav-child-open")},this.options.duration)):(e.el.classList.remove("a11y-nav-active"),(r=e.el.parentElement)==null||r.classList.remove("a11y-nav-child-open"))}closeAllMenus(){this.menus.forEach(e=>{this.closeMenu(e)})}getMenuDepthFromEl(e){let r=0,a=e.parentElement;for(;a&&a!==this.nav;)(a.classList.contains("a11y-nav-menu")||a===this.nav)&&r++,a=a.parentElement;return r}getMenuFromEl(e){var r;return(r=this.menus.find(a=>a.el===e))!=null?r:null}getControlFromEl(e){var r;return(r=this.controls.find(a=>a.el===e))!=null?r:null}getFocusableFromEl(e){var r;return(r=this.focusables.find(a=>a===e))!=null?r:null}getControls(){return Array.from(this.nav.querySelectorAll("button[aria-expanded][aria-controls]")).map(e=>{const r=e.getAttribute("aria-controls"),a=document.getElementById(r!=null?r:"");if(a){const c={el:e,menu:{el:a,id:a.id,hadTabIndex:a.hasAttribute("tabindex")}};return c.menu.control=c,c}else return null}).flatMap(e=>e?[e]:[])}getFocusables(){return Array.from(this.nav.querySelectorAll("a, button"))}destroy(){this.closeAllMenus(),this.controls.forEach(e=>{e.menu.el.classList.remove("a11y-nav-menu"),e.menu.hadTabIndex||e.menu.el.removeAttribute("tabindex"),e.el.removeEventListener("click",this.onButtonClick),e.el.removeEventListener("keydown",this.onButtonKeyDown)}),this.focusables.forEach(e=>{e.removeEventListener("keydown",this.onFocusableKeyDown)}),this.nav.removeEventListener("focusout",this.onBlur)}}var H=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},J={exports:{}};(function(d){var e=typeof window!="undefined"?window:typeof WorkerGlobalScope!="undefined"&&self instanceof WorkerGlobalScope?self:{};/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */var r=function(a){var c=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,f=0,p={},o={manual:a.Prism&&a.Prism.manual,disableWorkerMessageHandler:a.Prism&&a.Prism.disableWorkerMessageHandler,util:{encode:function n(t){return t instanceof x?new x(t.type,n(t.content),t.alias):Array.isArray(t)?t.map(n):t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(n){return Object.prototype.toString.call(n).slice(8,-1)},objId:function(n){return n.__id||Object.defineProperty(n,"__id",{value:++f}),n.__id},clone:function n(t,s){s=s||{};var i,l;switch(o.util.type(t)){case"Object":if(l=o.util.objId(t),s[l])return s[l];i={},s[l]=i;for(var u in t)t.hasOwnProperty(u)&&(i[u]=n(t[u],s));return i;case"Array":return l=o.util.objId(t),s[l]?s[l]:(i=[],s[l]=i,t.forEach(function(h,g){i[g]=n(h,s)}),i);default:return t}},getLanguage:function(n){for(;n;){var t=c.exec(n.className);if(t)return t[1].toLowerCase();n=n.parentElement}return"none"},setLanguage:function(n,t){n.className=n.className.replace(RegExp(c,"gi"),""),n.classList.add("language-"+t)},currentScript:function(){if(typeof document=="undefined")return null;if("currentScript"in document&&1<2)return document.currentScript;try{throw new Error}catch(i){var n=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(i.stack)||[])[1];if(n){var t=document.getElementsByTagName("script");for(var s in t)if(t[s].src==n)return t[s]}return null}},isActive:function(n,t,s){for(var i="no-"+t;n;){var l=n.classList;if(l.contains(t))return!0;if(l.contains(i))return!1;n=n.parentElement}return!!s}},languages:{plain:p,plaintext:p,text:p,txt:p,extend:function(n,t){var s=o.util.clone(o.languages[n]);for(var i in t)s[i]=t[i];return s},insertBefore:function(n,t,s,i){i=i||o.languages;var l=i[n],u={};for(var h in l)if(l.hasOwnProperty(h)){if(h==t)for(var g in s)s.hasOwnProperty(g)&&(u[g]=s[g]);s.hasOwnProperty(h)||(u[h]=l[h])}var m=i[n];return i[n]=u,o.languages.DFS(o.languages,function(v,w){w===m&&v!=n&&(this[v]=u)}),u},DFS:function n(t,s,i,l){l=l||{};var u=o.util.objId;for(var h in t)if(t.hasOwnProperty(h)){s.call(t,h,t[h],i||h);var g=t[h],m=o.util.type(g);m==="Object"&&!l[u(g)]?(l[u(g)]=!0,n(g,s,null,l)):m==="Array"&&!l[u(g)]&&(l[u(g)]=!0,n(g,s,h,l))}}},plugins:{},highlightAll:function(n,t){o.highlightAllUnder(document,n,t)},highlightAllUnder:function(n,t,s){var i={callback:s,container:n,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};o.hooks.run("before-highlightall",i),i.elements=Array.prototype.slice.apply(i.container.querySelectorAll(i.selector)),o.hooks.run("before-all-elements-highlight",i);for(var l=0,u;u=i.elements[l++];)o.highlightElement(u,t===!0,i.callback)},highlightElement:function(n,t,s){var i=o.util.getLanguage(n),l=o.languages[i];o.util.setLanguage(n,i);var u=n.parentElement;u&&u.nodeName.toLowerCase()==="pre"&&o.util.setLanguage(u,i);var h=n.textContent,g={element:n,language:i,grammar:l,code:h};function m(w){g.highlightedCode=w,o.hooks.run("before-insert",g),g.element.innerHTML=g.highlightedCode,o.hooks.run("after-highlight",g),o.hooks.run("complete",g),s&&s.call(g.element)}if(o.hooks.run("before-sanity-check",g),u=g.element.parentElement,u&&u.nodeName.toLowerCase()==="pre"&&!u.hasAttribute("tabindex")&&u.setAttribute("tabindex","0"),!g.code){o.hooks.run("complete",g),s&&s.call(g.element);return}if(o.hooks.run("before-highlight",g),!g.grammar){m(o.util.encode(g.code));return}if(t&&a.Worker){var v=new Worker(o.filename);v.onmessage=function(w){m(w.data)},v.postMessage(JSON.stringify({language:g.language,code:g.code,immediateClose:!0}))}else m(o.highlight(g.code,g.grammar,g.language))},highlight:function(n,t,s){var i={code:n,grammar:t,language:s};if(o.hooks.run("before-tokenize",i),!i.grammar)throw new Error('The language "'+i.language+'" has no grammar.');return i.tokens=o.tokenize(i.code,i.grammar),o.hooks.run("after-tokenize",i),x.stringify(o.util.encode(i.tokens),i.language)},tokenize:function(n,t){var s=t.rest;if(s){for(var i in s)t[i]=s[i];delete t.rest}var l=new Q;return $(l,l.head,n),T(n,l,t,l.head,0),ee(l)},hooks:{all:{},add:function(n,t){var s=o.hooks.all;s[n]=s[n]||[],s[n].push(t)},run:function(n,t){var s=o.hooks.all[n];if(!(!s||!s.length))for(var i=0,l;l=s[i++];)l(t)}},Token:x};a.Prism=o;function x(n,t,s,i){this.type=n,this.content=t,this.alias=s,this.length=(i||"").length|0}x.stringify=function n(t,s){if(typeof t=="string")return t;if(Array.isArray(t)){var i="";return t.forEach(function(m){i+=n(m,s)}),i}var l={type:t.type,content:n(t.content,s),tag:"span",classes:["token",t.type],attributes:{},language:s},u=t.alias;u&&(Array.isArray(u)?Array.prototype.push.apply(l.classes,u):l.classes.push(u)),o.hooks.run("wrap",l);var h="";for(var g in l.attributes)h+=" "+g+'="'+(l.attributes[g]||"").replace(/"/g,"&quot;")+'"';return"<"+l.tag+' class="'+l.classes.join(" ")+'"'+h+">"+l.content+"</"+l.tag+">"};function z(n,t,s,i){n.lastIndex=t;var l=n.exec(s);if(l&&i&&l[1]){var u=l[1].length;l.index+=u,l[0]=l[0].slice(u)}return l}function T(n,t,s,i,l,u){for(var h in s)if(!(!s.hasOwnProperty(h)||!s[h])){var g=s[h];g=Array.isArray(g)?g:[g];for(var m=0;m<g.length;++m){if(u&&u.cause==h+","+m)return;var v=g[m],w=v.inside,q=!!v.lookbehind,j=!!v.greedy,te=v.alias;if(j&&!v.pattern.global){var ne=v.pattern.toString().match(/[imsuy]*$/)[0];v.pattern=RegExp(v.pattern.source,ne+"g")}for(var R=v.pattern||v,y=i.next,F=l;y!==t.tail&&!(u&&F>=u.reach);F+=y.value.length,y=y.next){var k=y.value;if(t.length>n.length)return;if(!(k instanceof x)){var M=1,b;if(j){if(b=z(R,F,n,q),!b||b.index>=n.length)break;var C=b.index,ae=b.index+b[0].length,A=F;for(A+=y.value.length;C>=A;)y=y.next,A+=y.value.length;if(A-=y.value.length,F=A,y.value instanceof x)continue;for(var P=y;P!==t.tail&&(A<ae||typeof P.value=="string");P=P.next)M++,A+=P.value.length;M--,k=n.slice(F,A),b.index-=F}else if(b=z(R,0,k,q),!b)continue;var C=b.index,S=b[0],B=k.slice(0,C),Z=k.slice(C+S.length),_=F+k.length;u&&_>u.reach&&(u.reach=_);var L=y.prev;B&&(L=$(t,L,B),F+=B.length),V(t,L,M);var se=new x(h,w?o.tokenize(S,w):S,te,S);if(y=$(t,L,se),Z&&$(t,y,Z),M>1){var O={cause:h+","+m,reach:_};T(n,t,s,y.prev,F,O),u&&O.reach>u.reach&&(u.reach=O.reach)}}}}}}function Q(){var n={value:null,prev:null,next:null},t={value:null,prev:n,next:null};n.next=t,this.head=n,this.tail=t,this.length=0}function $(n,t,s){var i=t.next,l={value:s,prev:t,next:i};return t.next=l,i.prev=l,n.length++,l}function V(n,t,s){for(var i=t.next,l=0;l<s&&i!==n.tail;l++)i=i.next;t.next=i,i.prev=t,n.length-=l}function ee(n){for(var t=[],s=n.head.next;s!==n.tail;)t.push(s.value),s=s.next;return t}if(!a.document)return a.addEventListener&&(o.disableWorkerMessageHandler||a.addEventListener("message",function(n){var t=JSON.parse(n.data),s=t.language,i=t.code,l=t.immediateClose;a.postMessage(o.highlight(i,o.languages[s],s)),l&&a.close()},!1)),o;var E=o.util.currentScript();E&&(o.filename=E.src,E.hasAttribute("data-manual")&&(o.manual=!0));function D(){o.manual||o.highlightAll()}if(!o.manual){var K=document.readyState;K==="loading"||K==="interactive"&&E&&E.defer?document.addEventListener("DOMContentLoaded",D):window.requestAnimationFrame?window.requestAnimationFrame(D):window.setTimeout(D,16)}return o}(e);d.exports&&(d.exports=r),typeof H!="undefined"&&(H.Prism=r)})(J);var X=J.exports;Prism.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]};Prism.languages.markup.tag.inside["attr-value"].inside.entity=Prism.languages.markup.entity;Prism.languages.markup.doctype.inside["internal-subset"].inside=Prism.languages.markup;Prism.hooks.add("wrap",function(d){d.type==="entity"&&(d.attributes.title=d.content.replace(/&amp;/,"&"))});Object.defineProperty(Prism.languages.markup.tag,"addInlined",{value:function(e,r){var a={};a["language-"+r]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:Prism.languages[r]},a.cdata=/^<!\[CDATA\[|\]\]>$/i;var c={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:a}};c["language-"+r]={pattern:/[\s\S]+/,inside:Prism.languages[r]};var f={};f[e]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return e}),"i"),lookbehind:!0,greedy:!0,inside:c},Prism.languages.insertBefore("markup","cdata",f)}});Object.defineProperty(Prism.languages.markup.tag,"addAttribute",{value:function(d,e){Prism.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+d+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[e,"language-"+e],inside:Prism.languages[e]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}});Prism.languages.html=Prism.languages.markup;Prism.languages.mathml=Prism.languages.markup;Prism.languages.svg=Prism.languages.markup;Prism.languages.xml=Prism.languages.extend("markup",{});Prism.languages.ssml=Prism.languages.xml;Prism.languages.atom=Prism.languages.xml;Prism.languages.rss=Prism.languages.xml;(function(d){var e=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;d.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:/@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+e.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+e.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+e.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:e,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},d.languages.css.atrule.inside.rest=d.languages.css;var r=d.languages.markup;r&&(r.tag.addInlined("style","css"),r.tag.addAttribute("style","css"))})(Prism);Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/};Prism.languages.javascript=Prism.languages.extend("clike",{"class-name":[Prism.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/});Prism.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:Prism.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:Prism.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/});Prism.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}});Prism.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}});Prism.languages.markup&&(Prism.languages.markup.tag.addInlined("script","javascript"),Prism.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript"));Prism.languages.js=Prism.languages.javascript;(function(){typeof Prism=="undefined"||typeof document=="undefined"||(Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Prism.plugins.UnescapedMarkup=!0,Prism.hooks.add("before-highlightall",function(d){d.selector+=', [class*="lang-"] script[type="text/plain"], [class*="language-"] script[type="text/plain"], script[type="text/plain"][class*="lang-"], script[type="text/plain"][class*="language-"]'}),Prism.hooks.add("before-sanity-check",function(d){var e=d.element;if(e.matches('script[type="text/plain"]')){var r=document.createElement("code"),a=document.createElement("pre");a.className=r.className=e.className;var c=e.dataset;Object.keys(c||{}).forEach(function(p){Object.prototype.hasOwnProperty.call(c,p)&&(a.dataset[p]=c[p])}),r.textContent=d.code=d.code.replace(/&lt;\/script(?:>|&gt;)/gi,"<\/script>"),a.appendChild(r),e.parentNode.replaceChild(a,e),d.element=r;return}if(!d.code){var f=e.childNodes;f.length===1&&f[0].nodeName=="#comment"&&(e.textContent=d.code=f[0].textContent)}}))})();X.manual=!0;X.highlightAll();const N=document.querySelector(".main-nav"),U=document.querySelector(".rail-nav");N&&new Y(N);U&&new Y(U);
