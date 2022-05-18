"use strict";(self.webpackChunkcodeeatcode_github_io=self.webpackChunkcodeeatcode_github_io||[]).push([[861],{3905:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return b}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},g={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,s=u(e,["components","mdxType","originalType","parentName"]),p=c(n),b=o,m=p["".concat(l,".").concat(b)]||p[b]||g[b]||a;return n?r.createElement(m,i(i({ref:t},s),{},{components:n})):r.createElement(m,i({ref:t},s))}));function b(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=p;var u={};for(var l in t)hasOwnProperty.call(t,l)&&(u[l]=t[l]);u.originalType=e,u.mdxType="string"==typeof e?e:o,i[1]=u;for(var c=2;c<a;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},8743:function(e,t,n){n.r(t),n.d(t,{assets:function(){return s},contentTitle:function(){return l},default:function(){return b},frontMatter:function(){return u},metadata:function(){return c},toc:function(){return g}});var r=n(7462),o=n(3366),a=(n(7294),n(3905)),i=["components"],u={slug:"publish-docusaurus-github-blog.md",title:"Publish Docusaurus blog on Github Pages",tags:["docusaurus","blog","how-to"],modified:new Date("2022-05-18T12:01:57.389Z"),date:new Date("2022-05-18T11:27:11.104Z")},l="Publish Docusaurus blog on Github Pages",c={permalink:"/blog/publish-docusaurus-github-blog.md",source:"@site/blog/Publish Docusaurus blog on Github Pages.md",title:"Publish Docusaurus blog on Github Pages",description:"1. Create a repo with your username:",date:"2022-05-18T11:27:11.104Z",formattedDate:"May 18, 2022",tags:[{label:"docusaurus",permalink:"/blog/tags/docusaurus"},{label:"blog",permalink:"/blog/tags/blog"},{label:"how-to",permalink:"/blog/tags/how-to"}],readingTime:.515,truncated:!1,authors:[],frontMatter:{slug:"publish-docusaurus-github-blog.md",title:"Publish Docusaurus blog on Github Pages",tags:["docusaurus","blog","how-to"],modified:"2022-05-18T12:01:57.389Z",date:"2022-05-18T11:27:11.104Z"},nextItem:{title:"Establishing A Walking Skeleton For Projects",permalink:"/blog/establishing-a-walking-skeleton-for-projects"}},s={authorsImageUrls:[]},g=[],p={toc:g};function b(e){var t=e.components,n=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Create a repo with your username:")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Show me the code:"))),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'npx create-docusaurus@latest codeeatcode.github.io classic --typescript\ncd codeeatcode.github.io/\ncode .\nll\nls\ngit init\ngit commit -am "starting docusaurus blog"\ngit add .\ngit commit -am "starting docusaurus blog"\ngit branch -M main\ngit remote add origin git@github.com:CodeEatCode/codeeatcode.github.io.\ngit push -u origin main\ngit config\ngit config --local\ngit config --local --list\ngit config user.name "Code Eat Code"\ngit config --local --list\ngit config user.email 1080238+ambersariya@users.noreply.github.com\ngit push -u origin main\ngit config --local user.email 1080238+ambersariya@users.noreply.github.\ngit push -u origin main\ngit commit --amend --reset-author\ngit push -u origin main\n')))}b.isMDXComponent=!0}}]);