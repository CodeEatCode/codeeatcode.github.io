"use strict";(self.webpackChunkcodeeatcode_github_io=self.webpackChunkcodeeatcode_github_io||[]).push([[52],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return f}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),d=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=d(e.components);return r.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},s=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),s=d(n),f=o,m=s["".concat(l,".").concat(f)]||s[f]||u[f]||a;return n?r.createElement(m,i(i({ref:t},p),{},{components:n})):r.createElement(m,i({ref:t},p))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=s;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:o,i[1]=c;for(var d=2;d<a;d++)i[d]=n[d];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}s.displayName="MDXCreateElement"},3959:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return l},default:function(){return f},frontMatter:function(){return c},metadata:function(){return d},toc:function(){return u}});var r=n(7462),o=n(3366),a=(n(7294),n(3905)),i=["components"],c={modified:new Date("2022-05-19T11:46:52.000Z"),date:new Date("2022-05-19T11:46:52.000Z"),title:"Vscode Snippet To Add Markdown Frontmatter",slug:"vscode-snippet-to-add-markdown-frontmatter",draft:!1},l=void 0,d={permalink:"/vscode-snippet-to-add-markdown-frontmatter",source:"@site/blog/Vscode Snippet To Add Markdown Frontmatter.md",title:"Vscode Snippet To Add Markdown Frontmatter",description:"1. Click on settings for VSCode",date:"2022-05-19T11:46:52.000Z",formattedDate:"May 19, 2022",tags:[],readingTime:.345,truncated:!1,authors:[],frontMatter:{modified:"2022-05-19T11:46:52.000Z",date:"2022-05-19T11:46:52.000Z",title:"Vscode Snippet To Add Markdown Frontmatter",slug:"vscode-snippet-to-add-markdown-frontmatter",draft:!1},nextItem:{title:"Establishing A Walking Skeleton For Projects",permalink:"/establishing-a-walking-skeleton-for-projects"}},p={authorsImageUrls:[]},u=[],s={toc:u};function f(e){var t=e.components,n=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"Click on settings for VSCode"),(0,a.kt)("li",{parentName:"ol"},'Click on "User Snippets'),(0,a.kt)("li",{parentName:"ol"},'Click on "New Global Snippets File..."'),(0,a.kt)("li",{parentName:"ol"},"Add the following JSON which will be limited to markdown files only")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n    "Add Docusaurus blog frontmatter": {\n        "body": [\n            "---",\n            "draft: true",\n            "modified: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE}T${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND}.000Z",\n            "date: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE}T${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND}.000Z",\n            "title: ${TM_FILENAME_BASE/(\\\\w.*)/${1:/capitalized}/}",\n            "slug: ${TM_FILENAME_BASE/([\\\\w-]+$)|([\\\\w-]+)|([-\\\\s]+)|([^\\\\w]+)/${1:/downcase}${2:/downcase}${2:+-}/gm}",\n            "---"\n        ],\n        "description": "Create Blogpost Frontmatter",\n        "scope": "markdown,mdx,md",\n        "prefix": ["blog", "draft blog", "frontmatter", "add frontmatter"]\n    }\n}\n')))}f.isMDXComponent=!0}}]);