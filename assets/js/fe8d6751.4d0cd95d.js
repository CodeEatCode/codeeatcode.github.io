"use strict";(self.webpackChunkcodeeatcode_github_io=self.webpackChunkcodeeatcode_github_io||[]).push([[254],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return g}});var o=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=o.createContext({}),c=function(e){var t=o.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},u=function(e){var t=c(e.components);return o.createElement(l.Provider,{value:t},e.children)},h={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},p=o.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=c(n),g=a,d=p["".concat(l,".").concat(g)]||p[g]||h[g]||i;return n?o.createElement(d,r(r({ref:t},u),{},{components:n})):o.createElement(d,r({ref:t},u))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,r=new Array(i);r[0]=p;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,r[1]=s;for(var c=2;c<i;c++)r[c]=n[c];return o.createElement.apply(null,r)}return o.createElement.apply(null,n)}p.displayName="MDXCreateElement"},3690:function(e,t,n){n.r(t),n.d(t,{assets:function(){return u},contentTitle:function(){return l},default:function(){return g},frontMatter:function(){return s},metadata:function(){return c},toc:function(){return h}});var o=n(7462),a=n(3366),i=(n(7294),n(3905)),r=["components"],s={title:"Journey To The Centre Of The Stack",slug:"journey-to-the-centre-of-the-stack",description:"Journey to the Centre of the stack - Dockerising the legacy",date:"2020-11-30 11:00:00 +0000",modified:new Date("2022-05-19T11:13:39.080Z"),keywords:["docker","legacy-software","modernisation","containerization","containerization"],tags:["docker","legacy-software","modernisation","containerization","containerization"]},l=void 0,c={permalink:"/journey-to-the-centre-of-the-stack",source:"@site/blog/Journey To The Centre Of The Stack.md",title:"Journey To The Centre Of The Stack",description:"Journey to the Centre of the stack - Dockerising the legacy",date:"2020-11-30T11:00:00.000Z",formattedDate:"November 30, 2020",tags:[{label:"docker",permalink:"/tags/docker"},{label:"legacy-software",permalink:"/tags/legacy-software"},{label:"modernisation",permalink:"/tags/modernisation"},{label:"containerization",permalink:"/tags/containerization"}],readingTime:5.225,truncated:!0,authors:[],frontMatter:{title:"Journey To The Centre Of The Stack",slug:"journey-to-the-centre-of-the-stack",description:"Journey to the Centre of the stack - Dockerising the legacy",date:"2020-11-30 11:00:00 +0000",modified:"2022-05-19T11:13:39.080Z",keywords:["docker","legacy-software","modernisation","containerization","containerization"],tags:["docker","legacy-software","modernisation","containerization","containerization"]},prevItem:{title:"Establishing A Walking Skeleton For Projects",permalink:"/establishing-a-walking-skeleton-for-projects"},nextItem:{title:"JSON Web Tokens",permalink:"/JSON-WEB-TOKEN"}},u={authorsImageUrls:[]},h=[{value:"Dockerising the legacy",id:"dockerising-the-legacy",level:4},{value:"Legacy Stack",id:"legacy-stack",level:2},{value:"Doing the dirty work",id:"doing-the-dirty-work",level:2},{value:"Environment Variables",id:"environment-variables",level:2},{value:"File paths",id:"file-paths",level:2},{value:"Extract secrets",id:"extract-secrets",level:2},{value:"Logging mechanism",id:"logging-mechanism",level:2},{value:"Language versions",id:"language-versions",level:2},{value:"Web Server",id:"web-server",level:2},{value:"Session storage paths",id:"session-storage-paths",level:2},{value:"Access to other web services",id:"access-to-other-web-services",level:2},{value:"How to test changes as you refactor?",id:"how-to-test-changes-as-you-refactor",level:2},{value:"Reverse Proxying",id:"reverse-proxying",level:2},{value:"SSL Termination",id:"ssl-termination",level:2},{value:"Cronjobs",id:"cronjobs",level:2},{value:"File permissions",id:"file-permissions",level:2},{value:"Summary",id:"summary",level:2}],p={toc:h};function g(e){var t=e.components,n=(0,a.Z)(e,r);return(0,i.kt)("wrapper",(0,o.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h4",{id:"dockerising-the-legacy"},"Dockerising the legacy"),(0,i.kt)("p",null,"Making changes to application infrastructure can be daunting at the best of times so when it was decided that we move to the world of containers, I took on a task I didn\u2019t know the depth of, so I am going to share my experience of getting my hands dirty."),(0,i.kt)("p",null,"At the time, I was new to docker but very interested in the technology, as technology folks, we all love a shiny new toy to play with. Apart from that the advantages and thus the reasons for so are listed as follows in no particular order:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Introducing speedier changes and testing ideas faster"),(0,i.kt)("li",{parentName:"ul"},"Infrastructure as code"),(0,i.kt)("li",{parentName:"ul"},"Simplify application/tech stack"),(0,i.kt)("li",{parentName:"ul"},"Be cloud-friendly")),(0,i.kt)("h2",{id:"legacy-stack"},"Legacy Stack"),(0,i.kt)("p",null,"Where working with the difficulty of releasing changes in the current environment that are potentially outdated, have no tests and no real dependency management, installing the dependencies and developing newer features can be a considerable effort."),(0,i.kt)("p",null,"The monster you could be working with may consist of the spaghetti of many applications running outdated technology."),(0,i.kt)("h2",{id:"doing-the-dirty-work"},"Doing the dirty work"),(0,i.kt)("p",null,"I would, of course, start with looking at the stack diagram of sorts or create one if there\u2019s isn\u2019t one already and identify common things between the applications. If you have more than one application that shares a lot of common things such as language, set of libraries, webserver and OS, then extract this to a base image that each application can build on and extend."),(0,i.kt)("p",null,"For example, what tripped me when I tested one of the apps where file upload functionality failed because the file size was larger than the one allowed. So take care to look through configs of environments & language etc."),(0,i.kt)("h2",{id:"environment-variables"},"Environment Variables"),(0,i.kt)("p",null,"These will be your friend when dockerising an application so I would identify various things such as follows"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"File storage paths e.g. for static assets"),(0,i.kt)("li",{parentName:"ul"},"URLs"),(0,i.kt)("li",{parentName:"ul"},"Secrets")),(0,i.kt)("p",null,"Furthermore, environment variables helped me greatly in maintaining compatibility via feature flags as I wanted to maintain compatibility between the current environment and the potential new docker environment."),(0,i.kt)("h2",{id:"file-paths"},"File paths"),(0,i.kt)("p",null,"Extract these paths across the applications and move to constants or move them to environment variables. So if you have a path dependency on e.g. ",(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("em",{parentName:"strong"},"/tmp"))," this could be moved to an environment variable named ",(0,i.kt)("strong",{parentName:"p"},"TMP_PATH,")," making it configurable which can be supplied when the container is run."),(0,i.kt)("p",null,"In reality, you\u2019ll likely be running multiple instances of the same container so changing this in favour of persistent storage via Kubernetes or Docker volumes would be better to allow access to any stored files to any multiple running instances. If you have the option, move files to S3 buckets or similar e.g. Min.io."),(0,i.kt)("h2",{id:"extract-secrets"},"Extract secrets"),(0,i.kt)("p",null,"Extract any secrets e.g. API Keys to Docker/Kubernetes secrets, these could be stored in your favourite secrets management solution. Although initially, you may not have an established secrets management solution, so moving these to environment variables temporarily would allow you to get on with the job at hand."),(0,i.kt)("h2",{id:"logging-mechanism"},"Logging mechanism"),(0,i.kt)("p",null,"If you\u2019re dockerising a legacy application then you\u2019ll likely more than one process doing some important work e.g. Apache/Nginx logs, application logs, cron logs. These may also be writing to multiple different log files."),(0,i.kt)("p",null,"In suggested practice, it\u2019s best to write to the standard output stream to see a combined view although you\u2019ll want to differentiate between logs of different kinds. This can be done with a centralised logging solution for later."),(0,i.kt)("h2",{id:"language-versions"},"Language versions"),(0,i.kt)("p",null,"This applies to any language but picking a ready-built official Docker image will go a long way to simplifying your life. Failing that, if nothing is available then look to build the language from the source on the closest os version. It should minimise any compatibility differences."),(0,i.kt)("h2",{id:"web-server"},"Web Server"),(0,i.kt)("p",null,"Keep to the same web server and the same version where possible."),(0,i.kt)("h2",{id:"session-storage-paths"},"Session storage paths"),(0,i.kt)("p",null,"Try to opt for a unified storage for sessions for example Database backed sessions otherwise try to go for a unified file path using persistent storage mounts."),(0,i.kt)("h2",{id:"access-to-other-web-services"},"Access to other web services"),(0,i.kt)("p",null,"Be mindful of how your application talks to another in your network. Whether this is via DNS or by hardcoded IP, you\u2019ll want to change this to access this service by service name. The address should be extracted to an environment variable also to allow for configuration."),(0,i.kt)("h2",{id:"how-to-test-changes-as-you-refactor"},"How to test changes as you refactor?"),(0,i.kt)("p",null,"If you\u2019re lucky enough to have various types of tests for your application then keep running tests every so often while you make changes. Either run these locally or if you have a CI server setup to build your image and test on every push then that\u2019s great."),(0,i.kt)("p",null,"Failing that, test the area/feature you\u2019re refactoring by running the application with some dummy data."),(0,i.kt)("h2",{id:"reverse-proxying"},"Reverse Proxying"),(0,i.kt)("p",null,"Use a reverse proxy such as Nginx/HA Proxy/Traefik to act as an ingress controller for requests."),(0,i.kt)("h2",{id:"ssl-termination"},"SSL Termination"),(0,i.kt)("p",null,"Important to figure this one when you consider yourself done with Dockerisation, as this may not be your biggest problem initially where you run one container in isolation."),(0,i.kt)("p",null,"One gotcha with this will be when, say, you go to production where your ingress is using a reverse proxy or a load balancer then if your application sets secure cookies, they may not be transmitted to the browser to be stored if you\u2019re not using SSL with your app."),(0,i.kt)("p",null,(0,i.kt)("img",{parentName:"p",src:"https://www.nginx.com/wp-content/uploads/2014/04/nginx-decrypts-https-traffic.png",alt:"SSL Termination Nginx"})),(0,i.kt)("p",null,"Shamelessly borrowed from ",(0,i.kt)("a",{parentName:"p",href:"https://www.nginx.com/blog/nginx-ssl/"},"https://www.nginx.com/blog/nginx-ssl/")),(0,i.kt)("h2",{id:"cronjobs"},"Cronjobs"),(0,i.kt)("p",null,"If you plan on using Kubernetes then it allows you to schedule workloads that can be scheduled using a cronjob like syntax. Please see more details here: ",(0,i.kt)("a",{parentName:"p",href:"https://www.nginx.com/blog/nginx-ssl/"},"https://kubernetes.io/docs/tasks/job/automated-tasks-with-cron-jobs/")),(0,i.kt)("h2",{id:"file-permissions"},"File permissions"),(0,i.kt)("p",null,"Container\u2019s file permissions get copied from the host machine\u2019s file system while building images so be mindful when building them on environments implementing the least privilege principle on the filesystem."),(0,i.kt)("p",null,"So when you COPY or ADD files, you can use the following"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"COPY [--chown=<user>:<group>] <src>... <dest>\n")),(0,i.kt)("h2",{id:"summary"},"Summary"),(0,i.kt)("p",null,"I may have glossed over a few things but I would like to say that no matter how much I share, your own journey will give you a great bit of experience and hope I\u2019ve shared some gotchas that may be of some help. So dive right in but with some consideration :-)"),(0,i.kt)("p",null,"Thanks for sticking with me."))}g.isMDXComponent=!0}}]);