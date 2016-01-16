!function(e,t,r){"use strict";function n(e,r,n){return{restrict:"ECA",terminal:!0,priority:400,transclude:"element",link:function(a,o,i,c,s){function u(){p&&(n.cancel(p),p=null),h&&(h.$destroy(),h=null),$&&(p=n.leave($),p.then(function(){p=null}),$=null)}function l(){var i=e.current&&e.current.locals;if(t.isDefined(i&&i.$template)){var i=a.$new(),c=e.current;$=s(i,function(e){n.enter(e,null,$||o).then(function(){!t.isDefined(f)||f&&!a.$eval(f)||r()}),u()}),h=c.scope=i,h.$emit("$viewContentLoaded"),h.$eval(d)}else u()}var h,$,p,f=i.autoscroll,d=i.onload||"";a.$on("$routeChangeSuccess",l),l()}}}function a(e,t,r){return{restrict:"ECA",priority:-400,link:function(n,a){var o=r.current,i=o.locals;a.html(i.$template);var c=e(a.contents());o.controller&&(i.$scope=n,i=t(o.controller,i),o.controllerAs&&(n[o.controllerAs]=i),a.data("$ngControllerController",i),a.children().data("$ngControllerController",i)),c(n)}}}e=t.module("ngRoute",["ng"]).provider("$route",function(){function e(e,r){return t.extend(Object.create(e),r)}function r(e,t){var r=t.caseInsensitiveMatch,n={originalPath:e,regexp:e},a=n.keys=[];return e=e.replace(/([().])/g,"\\$1").replace(/(\/)?:(\w+)([\?\*])?/g,function(e,t,r,n){return e="?"===n?n:null,n="*"===n?n:null,a.push({name:r,optional:!!e}),t=t||"",""+(e?"":t)+"(?:"+(e?t:"")+(n&&"(.+?)"||"([^/]+)")+(e||"")+")"+(e||"")}).replace(/([\/$\*])/g,"\\$1"),n.regexp=new RegExp("^"+e+"$",r?"i":""),n}var n={};this.when=function(e,a){var o=t.copy(a);if(t.isUndefined(o.reloadOnSearch)&&(o.reloadOnSearch=!0),t.isUndefined(o.caseInsensitiveMatch)&&(o.caseInsensitiveMatch=this.caseInsensitiveMatch),n[e]=t.extend(o,e&&r(e,o)),e){var i="/"==e[e.length-1]?e.substr(0,e.length-1):e+"/";n[i]=t.extend({redirectTo:e},r(i,o))}return this},this.caseInsensitiveMatch=!1,this.otherwise=function(e){return"string"==typeof e&&(e={redirectTo:e}),this.when(null,e),this},this.$get=["$rootScope","$location","$routeParams","$q","$injector","$templateRequest","$sce",function(r,a,i,c,s,u,l){function h(e){var n=g.current;(v=(d=p())&&n&&d.$$route===n.$$route&&t.equals(d.pathParams,n.pathParams)&&!d.reloadOnSearch&&!m)||!n&&!d||r.$broadcast("$routeChangeStart",d,n).defaultPrevented&&e&&e.preventDefault()}function $(){var e=g.current,n=d;v?(e.params=n.params,t.copy(e.params,i),r.$broadcast("$routeUpdate",e)):(n||e)&&(m=!1,(g.current=n)&&n.redirectTo&&(t.isString(n.redirectTo)?a.path(f(n.redirectTo,n.params)).search(n.params).replace():a.url(n.redirectTo(n.pathParams,a.path(),a.search())).replace()),c.when(n).then(function(){if(n){var e,r,a=t.extend({},n.resolve);return t.forEach(a,function(e,r){a[r]=t.isString(e)?s.get(e):s.invoke(e,null,null,r)}),t.isDefined(e=n.template)?t.isFunction(e)&&(e=e(n.params)):t.isDefined(r=n.templateUrl)&&(t.isFunction(r)&&(r=r(n.params)),r=l.getTrustedResourceUrl(r),t.isDefined(r)&&(n.loadedTemplateUrl=r,e=u(r))),t.isDefined(e)&&(a.$template=e),c.all(a)}}).then(function(a){n==g.current&&(n&&(n.locals=a,t.copy(n.params,i)),r.$broadcast("$routeChangeSuccess",n,e))},function(t){n==g.current&&r.$broadcast("$routeChangeError",n,e,t)}))}function p(){var r,o;return t.forEach(n,function(n,i){var c;if(c=!o){var s=a.path();c=n.keys;var u={};if(n.regexp)if(s=n.regexp.exec(s)){for(var l=1,h=s.length;h>l;++l){var $=c[l-1],p=s[l];$&&p&&(u[$.name]=p)}c=u}else c=null;else c=null;c=r=c}c&&(o=e(n,{params:t.extend({},a.search(),r),pathParams:r}),o.$$route=n)}),o||n[null]&&e(n[null],{params:{},pathParams:{}})}function f(e,r){var n=[];return t.forEach((e||"").split(":"),function(e,t){if(0===t)n.push(e);else{var a=e.match(/(\w+)(?:[?*])?(.*)/),o=a[1];n.push(r[o]),n.push(a[2]||""),delete r[o]}}),n.join("")}var d,v,m=!1,g={routes:n,reload:function(){m=!0,r.$evalAsync(function(){h(),$()})},updateParams:function(e){if(!this.current||!this.current.$$route)throw o("norout");var r={},n=this;t.forEach(Object.keys(e),function(t){n.current.pathParams[t]||(r[t]=e[t])}),e=t.extend({},this.current.params,e),a.path(f(this.current.$$route.originalPath,e)),a.search(t.extend({},a.search(),r))}};return r.$on("$locationChangeStart",h),r.$on("$locationChangeSuccess",$),g}]});var o=t.$$minErr("ngRoute");e.provider("$routeParams",function(){this.$get=function(){return{}}}),e.directive("ngView",n),e.directive("ngView",a),n.$inject=["$route","$anchorScroll","$animate"],a.$inject=["$compile","$controller","$route"]}(window,window.angular);