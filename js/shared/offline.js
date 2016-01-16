(function(){var n,e,t,i,r,o,u;i=function(n,e){var t,i,r,o;r=[];for(i in e.prototype)try{o=e.prototype[i],null==n[i]&&"function"!=typeof o?r.push(n[i]=o):r.push(void 0)}catch(u){t=u}return r},n={},null==n.options&&(n.options={}),t={checks:{xhr:{url:function(){return"/favicon.ico?_="+Math.floor(1e9*Math.random())},timeout:5e3},image:{url:function(){return"/favicon.ico?_="+Math.floor(1e9*Math.random())}},active:"xhr"},checkOnLoad:!1,interceptRequests:!0,reconnect:!0},r=function(n,e){var t,i,r,o,u,f;for(t=n,f=e.split("."),i=r=0,o=f.length;o>r&&(u=f[i],t=t[u],"object"==typeof t);i=++r);return i===f.length-1?t:void 0},n.getOption=function(e){var i,o;return o=null!=(i=r(n.options,e))?i:r(t,e),"function"==typeof o?o():o},"function"==typeof window.addEventListener&&window.addEventListener("online",function(){return setTimeout(n.confirmUp,100)},!1),"function"==typeof window.addEventListener&&window.addEventListener("offline",function(){return n.confirmDown()},!1),n.state="up",n.markUp=function(){return n.trigger("confirmed-up"),"up"!==n.state?(n.state="up",n.trigger("up")):void 0},n.markDown=function(){return n.trigger("confirmed-down"),"down"!==n.state?(n.state="down",n.trigger("down")):void 0},o={},n.on=function(e,t,i){var r,u,f,c,l;if(u=e.split(" "),u.length>1){for(l=[],f=0,c=u.length;c>f;f++)r=u[f],l.push(n.on(r,t,i));return l}return null==o[e]&&(o[e]=[]),o[e].push([i,t])},n.off=function(n,e){var t,i,r,u,f;if(null!=o[n]){if(e){for(r=0,f=[];r<o[n].length;)u=o[n][r],i=u[0],t=u[1],t===e?f.push(o[n].splice(r,1)):f.push(r++);return f}return o[n]=[]}},n.trigger=function(n){var e,t,i,r,u,f,c;if(null!=o[n]){for(u=o[n],c=[],i=0,r=u.length;r>i;i++)f=u[i],e=f[0],t=f[1],c.push(t.call(e));return c}},e=function(n,e,t){var i,r,o,u,f;return f=function(){return n.status&&n.status<12e3?e():t()},null===n.onprogress?(i=n.onerror,n.onerror=function(){return t(),"function"==typeof i?i.apply(null,arguments):void 0},u=n.ontimeout,n.ontimeout=function(){return t(),"function"==typeof u?u.apply(null,arguments):void 0},r=n.onload,n.onload=function(){return f(),"function"==typeof r?r.apply(null,arguments):void 0}):(o=n.onreadystatechange,n.onreadystatechange=function(){return 4===n.readyState?f():0===n.readyState&&t(),"function"==typeof o?o.apply(null,arguments):void 0})},n.checks={},n.checks.xhr=function(){var t,i;i=new XMLHttpRequest,i.offline=!1,i.open("HEAD",n.getOption("checks.xhr.url"),!0),null!=i.timeout&&(i.timeout=n.getOption("checks.xhr.timeout")),e(i,n.markUp,n.markDown);try{i.send()}catch(r){t=r,n.markDown()}return i},n.checks.image=function(){var e;return e=document.createElement("img"),e.onerror=n.markDown,e.onload=n.markUp,void(e.src=n.getOption("checks.image.url"))},n.checks.down=n.markDown,n.checks.up=n.markUp,n.check=function(){return n.trigger("checking"),n.checks[n.getOption("checks.active")]()},n.confirmUp=n.confirmDown=n.check,n.onXHR=function(n){var e,t,r;return r=function(e,t){var i;return i=e.open,e.open=function(r,o,u,f,c){return n({type:r,url:o,async:u,flags:t,user:f,password:c,xhr:e}),i.apply(e,arguments)}},t=window.XMLHttpRequest,window.XMLHttpRequest=function(n){var e,i,o;return o=new t(n),r(o,n),i=o.setRequestHeader,o.headers={},o.setRequestHeader=function(n,e){return o.headers[n]=e,i.call(o,n,e)},e=o.overrideMimeType,o.overrideMimeType=function(n){return o.mimeType=n,e.call(o,n)},o},i(window.XMLHttpRequest,t),null!=window.XDomainRequest?(e=window.XDomainRequest,window.XDomainRequest=function(){var n;return n=new e,r(n),n},i(window.XDomainRequest,e)):void 0},u=function(){return n.getOption("interceptRequests")&&n.onXHR(function(t){var i;return i=t.xhr,i.offline!==!1?e(i,n.markUp,n.confirmDown):void 0}),n.getOption("checkOnLoad")?n.check():void 0},setTimeout(u,0),window.Offline=n}).call(this),function(){var n,e,t,i,r,o,u,f,c;if(!window.Offline)throw new Error("Offline Reconnect brought in without offline.js");i=Offline.reconnect={},o=null,r=function(){var n;return null!=i.state&&"inactive"!==i.state&&Offline.trigger("reconnect:stopped"),i.state="inactive",i.remaining=i.delay=null!=(n=Offline.getOption("reconnect.initialDelay"))?n:3},e=function(){var n,e;return n=null!=(e=Offline.getOption("reconnect.delay"))?e:Math.min(Math.ceil(1.5*i.delay),3600),i.remaining=i.delay=n},u=function(){return"connecting"!==i.state?(i.remaining-=1,Offline.trigger("reconnect:tick"),0===i.remaining?f():void 0):void 0},f=function(){return"waiting"===i.state?(Offline.trigger("reconnect:connecting"),i.state="connecting",Offline.check()):void 0},n=function(){return Offline.getOption("reconnect")?(r(),i.state="waiting",Offline.trigger("reconnect:started"),o=setInterval(u,1e3)):void 0},c=function(){return null!=o&&clearInterval(o),r()},t=function(){return Offline.getOption("reconnect")&&"connecting"===i.state?(Offline.trigger("reconnect:failure"),i.state="waiting",e()):void 0},i.tryNow=f,r(),Offline.on("down",n),Offline.on("confirmed-down",t),Offline.on("up",c)}.call(this),function(){var n,e,t,i,r,o;if(!window.Offline)throw new Error("Requests module brought in without offline.js");t=[],o=!1,i=function(n){return Offline.trigger("requests:capture"),"down"!==Offline.state&&(o=!0),t.push(n)},r=function(n){var e,t,i,r,o,u,f,c,l;l=n.xhr,u=n.url,o=n.type,f=n.user,i=n.password,e=n.body,l.abort(),l.open(o,u,!0,f,i),r=l.headers;for(t in r)c=r[t],l.setRequestHeader(t,c);return l.mimeType&&l.overrideMimeType(l.mimeType),l.send(e)},n=function(){return t=[]},e=function(){var e,i,o,u,f,c;for(Offline.trigger("requests:flush"),f={},e=0,o=t.length;o>e;e++)u=t[e],c=u.url.replace(/(\?|&)_=[0-9]+/,function(n,e){return"?"===e?e:""}),f[u.type.toUpperCase()+" - "+c]=u;for(i in f)u=f[i],r(u);return n()},setTimeout(function(){return Offline.getOption("requests")!==!1?(Offline.on("confirmed-up",function(){return o?(o=!1,n()):void 0}),Offline.on("up",e),Offline.on("down",function(){return o=!1}),Offline.onXHR(function(n){var e,t,r,o,u;return u=n.xhr,r=n.async,u.offline!==!1&&(o=function(){return i(n)},t=u.send,u.send=function(e){return n.body=e,t.apply(u,arguments)},r)?null===u.onprogress?(u.addEventListener("error",o,!1),u.addEventListener("timeout",o,!1)):(e=u.onreadystatechange,u.onreadystatechange=function(){return 0===u.readyState?o():4===u.readyState&&(0===u.status||u.status>=12e3)&&o(),"function"==typeof e?e.apply(null,arguments):void 0}):void 0}),Offline.requests={flush:e,clear:n}):void 0},0)}.call(this),function(){var n,e,t,i,r;if(!Offline)throw new Error("Offline simulate brought in without offline.js");for(i=["up","down"],e=0,t=i.length;t>e;e++)r=i[e],(document.querySelector("script[data-simulate='"+r+"']")||localStorage.OFFLINE_SIMULATE===r)&&(null==Offline.options&&(Offline.options={}),null==(n=Offline.options).checks&&(n.checks={}),Offline.options.checks.active=r)}.call(this),function(){var n,e,t,i,r,o,u,f,c,l,a,s,d;if(!window.Offline)throw new Error("Offline UI brought in without offline.js");e='<div class="offline-ui"><div class="offline-ui-content"></div></div>',n='<a href class="offline-ui-retry"></a>',o=function(n){var e;return e=document.createElement("div"),e.innerHTML=n,e.children[0]},u=r=null,i=function(n){return a(n),u.className+=" "+n},a=function(n){return u.className=u.className.replace(new RegExp("(^| )"+n.split(" ").join("|")+"( |$)","gi")," ")},c={},f=function(n,e){return i(n),null!=c[n]&&clearTimeout(c[n]),c[n]=setTimeout(function(){return a(n),delete c[n]},1e3*e)},d=function(n){var e,t,i,r;i={day:86400,hour:3600,minute:60,second:1};for(t in i)if(e=i[t],n>=e)return r=Math.floor(n/e),[r,t];return["now",""]},s=function(){var t,f;return u=o(e),document.body.appendChild(u),null!=Offline.reconnect&&Offline.getOption("reconnect")&&(u.appendChild(o(n)),t=u.querySelector(".offline-ui-retry"),f=function(n){return n.preventDefault(),Offline.reconnect.tryNow()},null!=t.addEventListener?t.addEventListener("click",f,!1):t.attachEvent("click",f)),i("offline-ui-"+Offline.state),r=u.querySelector(".offline-ui-content")},l=function(){return s(),Offline.on("up",function(){return a("offline-ui-down"),i("offline-ui-up"),f("offline-ui-up-2s",2),f("offline-ui-up-5s",5)}),Offline.on("down",function(){return a("offline-ui-up"),i("offline-ui-down"),f("offline-ui-down-2s",2),f("offline-ui-down-5s",5)}),Offline.on("reconnect:connecting",function(){return i("offline-ui-connecting"),a("offline-ui-waiting")}),Offline.on("reconnect:tick",function(){var n,e,t;return i("offline-ui-waiting"),a("offline-ui-connecting"),n=d(Offline.reconnect.remaining),e=n[0],t=n[1],r.setAttribute("data-retry-in-value",e),r.setAttribute("data-retry-in-unit",t)}),Offline.on("reconnect:stopped",function(){return a("offline-ui-connecting offline-ui-waiting"),r.setAttribute("data-retry-in-value",null),r.setAttribute("data-retry-in-unit",null)}),Offline.on("reconnect:failure",function(){return f("offline-ui-reconnect-failed-2s",2),f("offline-ui-reconnect-failed-5s",5)}),Offline.on("reconnect:success",function(){return f("offline-ui-reconnect-succeeded-2s",2),f("offline-ui-reconnect-succeeded-5s",5)})},"complete"===document.readyState?l():null!=document.addEventListener?document.addEventListener("DOMContentLoaded",l,!1):(t=document.onreadystatechange,document.onreadystatechange=function(){return"complete"===document.readyState&&l(),"function"==typeof t?t.apply(null,arguments):void 0})}.call(this);