"use strict";(self.webpackChunkcodeeatcode_github_io=self.webpackChunkcodeeatcode_github_io||[]).push([[450],{6029:function(e){e.exports=JSON.parse('{"blogPosts":[{"id":"vscode-snippet-to-add-markdown-frontmatter","metadata":{"permalink":"/vscode-snippet-to-add-markdown-frontmatter","source":"@site/blog/Vscode Snippet To Add Markdown Frontmatter.md","title":"Vscode Snippet To Add Markdown Frontmatter","description":"1. Click on settings for VSCode","date":"2022-05-19T11:46:52.000Z","formattedDate":"May 19, 2022","tags":[],"readingTime":0.345,"truncated":false,"authors":[],"frontMatter":{"modified":"2022-05-19T11:46:52.000Z","date":"2022-05-19T11:46:52.000Z","title":"Vscode Snippet To Add Markdown Frontmatter","slug":"vscode-snippet-to-add-markdown-frontmatter","draft":false},"nextItem":{"title":"Establishing A Walking Skeleton For Projects","permalink":"/establishing-a-walking-skeleton-for-projects"}},"content":"1. Click on settings for VSCode\\n2. Click on \\"User Snippets\\n3. Click on \\"New Global Snippets File...\\"\\n4. Add the following JSON which will be limited to markdown files only\\n\\n```json\\n{\\n    \\"Add Docusaurus blog frontmatter\\": {\\n        \\"body\\": [\\n            \\"---\\",\\n            \\"draft: true\\",\\n            \\"modified: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE}T${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND}.000Z\\",\\n            \\"date: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE}T${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND}.000Z\\",\\n            \\"title: ${TM_FILENAME_BASE/(\\\\\\\\w.*)/${1:/capitalized}/}\\",\\n            \\"slug: ${TM_FILENAME_BASE/([\\\\\\\\w-]+$)|([\\\\\\\\w-]+)|([-\\\\\\\\s]+)|([^\\\\\\\\w]+)/${1:/downcase}${2:/downcase}${2:+-}/gm}\\",\\n            \\"---\\"\\n        ],\\n        \\"description\\": \\"Create Blogpost Frontmatter\\",\\n        \\"scope\\": \\"markdown,mdx,md\\",\\n        \\"prefix\\": [\\"blog\\", \\"draft blog\\", \\"frontmatter\\", \\"add frontmatter\\"]\\n    }\\n}\\n```"},{"id":"establishing-a-walking-skeleton-for-projects","metadata":{"permalink":"/establishing-a-walking-skeleton-for-projects","source":"@site/blog/Establishing A Walking Skeleton For Projects.md","title":"Establishing A Walking Skeleton For Projects","description":"I\'ve been reading the excellent book Growing Object-Oriented Software, Guided By Tests and there\'s so much that resonated with me about starting work on a new project.","date":"2021-09-16T11:56:19.338Z","formattedDate":"September 16, 2021","tags":[],"readingTime":1.225,"truncated":false,"authors":[],"frontMatter":{"title":"Establishing A Walking Skeleton For Projects","slug":"establishing-a-walking-skeleton-for-projects","date":"2021-09-16T11:56:19.338Z","modified":"2022-05-18T13:29:31.906Z"},"prevItem":{"title":"Vscode Snippet To Add Markdown Frontmatter","permalink":"/vscode-snippet-to-add-markdown-frontmatter"},"nextItem":{"title":"Journey To The Centre Of The Stack","permalink":"/journey-to-the-centre-of-the-stack"}},"content":"I\'ve been reading the excellent book [Growing Object-Oriented Software, Guided By Tests](https://www.goodreads.com/en/book/show/4268826-growing-object-oriented-software-guided-by-tests \\"Growing Object-Oriented Software, Guided By Tests\\") and there\'s so much that resonated with me about starting work on a new project.\\n\\nAs with anything new, give developers some shiny new something to work on and there\'s always the temptation to dive right in and get started with code. This often means that you\'re starting from the inside-out of a problem space and often some operational details are overlooked. When we\'re done solving that problem, trying to release that or to push that to production is often a problem nobody had perceived.\\n\\nI recently experienced this on a project where we\'d resorted to creating the application locally to put that online later. We had an idea of things like tech limitations and choices at the time, and deferring that decision seemed right, but it later came to bite us when we wanted to release the first feature.\\n\\nWe had roadblocks after one another, these came in the form of security policies, technology choices and release process already in place and trying something new. This whole thing cost us a couple of months of back and forth between dev/ops/admin folks.\\n\\nSo if I could tell my past self, I would say, release early and release often even if it means releasing the project skeleton in a hello world state.\\n\\nIn the context of the book I\'ve been reading, establishing a walking skeleton is hugely important."},{"id":"journey-to-the-centre-of-the-stack","metadata":{"permalink":"/journey-to-the-centre-of-the-stack","source":"@site/blog/Journey To The Centre Of The Stack.md","title":"Journey To The Centre Of The Stack","description":"Journey to the Centre of the stack - Dockerising the legacy","date":"2020-11-30T11:00:00.000Z","formattedDate":"November 30, 2020","tags":[],"readingTime":5.225,"truncated":true,"authors":[],"frontMatter":{"title":"Journey To The Centre Of The Stack","slug":"journey-to-the-centre-of-the-stack","description":"Journey to the Centre of the stack - Dockerising the legacy","date":"2020-11-30 11:00:00 +0000","modified":"2022-05-18T14:10:07.754Z","keywords":["docker","legacy-software","modernisation","containesization","containezization"]},"prevItem":{"title":"Establishing A Walking Skeleton For Projects","permalink":"/establishing-a-walking-skeleton-for-projects"},"nextItem":{"title":"JSON Web Tokens","permalink":"/JSON-WEB-TOKEN"}},"content":"#### Dockerising the legacy\\n\\n\x3c!--truncate--\x3e\\n\\nMaking changes to application infrastructure can be daunting at the best of times so when it was decided that we move to the world of containers, I took on a task I didn\u2019t know the depth of, so I am going to share my experience of getting my hands dirty.\\n\\nAt the time, I was new to docker but very interested in the technology, as technology folks, we all love a shiny new toy to play with. Apart from that the advantages and thus the reasons for so are listed as follows in no particular order:\\n\\n- Introducing speedier changes and testing ideas faster\\n- Infrastructure as code\\n- Simplify application/tech stack\\n- Be cloud-friendly\\n\\n## Legacy Stack\\n\\nWhere working with the difficulty of releasing changes in the current environment that are potentially outdated, have no tests and no real dependency management, installing the dependencies and developing newer features can be a considerable effort.\\n\\nThe monster you could be working with may consist of the spaghetti of many applications running outdated technology.\\n\\n## Doing the dirty work\\n\\nI would, of course, start with looking at the stack diagram of sorts or create one if there\u2019s isn\u2019t one already and identify common things between the applications. If you have more than one application that shares a lot of common things such as language, set of libraries, webserver and OS, then extract this to a base image that each application can build on and extend.\\n\\nFor example, what tripped me when I tested one of the apps where file upload functionality failed because the file size was larger than the one allowed. So take care to look through configs of environments & language etc.\\n\\n## Environment Variables\\n\\nThese will be your friend when dockerising an application so I would identify various things such as follows\\n\\n- File storage paths e.g. for static assets\\n- URLs\\n- Secrets\\n\\nFurthermore, environment variables helped me greatly in maintaining compatibility via feature flags as I wanted to maintain compatibility between the current environment and the potential new docker environment.\\n\\n## File paths\\n\\nExtract these paths across the applications and move to constants or move them to environment variables. So if you have a path dependency on e.g. **_/tmp_** this could be moved to an environment variable named **TMP_PATH,** making it configurable which can be supplied when the container is run.\\n\\nIn reality, you\u2019ll likely be running multiple instances of the same container so changing this in favour of persistent storage via Kubernetes or Docker volumes would be better to allow access to any stored files to any multiple running instances. If you have the option, move files to S3 buckets or similar e.g. Min.io.\\n\\n## Extract secrets\\n\\nExtract any secrets e.g. API Keys to Docker/Kubernetes secrets, these could be stored in your favourite secrets management solution. Although initially, you may not have an established secrets management solution, so moving these to environment variables temporarily would allow you to get on with the job at hand.\\n\\n## Logging mechanism\\n\\nIf you\u2019re dockerising a legacy application then you\u2019ll likely more than one process doing some important work e.g. Apache/Nginx logs, application logs, cron logs. These may also be writing to multiple different log files.\\n\\nIn suggested practice, it\u2019s best to write to the standard output stream to see a combined view although you\u2019ll want to differentiate between logs of different kinds. This can be done with a centralised logging solution for later.\\n\\n## Language versions\\n\\nThis applies to any language but picking a ready-built official Docker image will go a long way to simplifying your life. Failing that, if nothing is available then look to build the language from the source on the closest os version. It should minimise any compatibility differences.\\n\\n## Web Server\\n\\nKeep to the same web server and the same version where possible.\\n\\n## Session storage paths\\n\\nTry to opt for a unified storage for sessions for example Database backed sessions otherwise try to go for a unified file path using persistent storage mounts.\\n\\n## Access to other web services\\n\\nBe mindful of how your application talks to another in your network. Whether this is via DNS or by hardcoded IP, you\u2019ll want to change this to access this service by service name. The address should be extracted to an environment variable also to allow for configuration.\\n\\n## How to test changes as you refactor?\\n\\nIf you\u2019re lucky enough to have various types of tests for your application then keep running tests every so often while you make changes. Either run these locally or if you have a CI server setup to build your image and test on every push then that\u2019s great.\\n\\nFailing that, test the area/feature you\u2019re refactoring by running the application with some dummy data.\\n\\n## Reverse Proxying\\n\\nUse a reverse proxy such as Nginx/HA Proxy/Traefik to act as an ingress controller for requests.\\n\\n## SSL Termination\\n\\nImportant to figure this one when you consider yourself done with Dockerisation, as this may not be your biggest problem initially where you run one container in isolation.\\n\\nOne gotcha with this will be when, say, you go to production where your ingress is using a reverse proxy or a load balancer then if your application sets secure cookies, they may not be transmitted to the browser to be stored if you\u2019re not using SSL with your app.\\n\\n![SSL Termination Nginx](https://www.nginx.com/wp-content/uploads/2014/04/nginx-decrypts-https-traffic.png)\\n\\nShamelessly borrowed from [https://www.nginx.com/blog/nginx-ssl/](https://www.nginx.com/blog/nginx-ssl/)\\n\\n## Cronjobs\\n\\nIf you plan on using Kubernetes then it allows you to schedule workloads that can be scheduled using a cronjob like syntax. Please see more details here: [https://kubernetes.io/docs/tasks/job/automated-tasks-with-cron-jobs/](https://www.nginx.com/blog/nginx-ssl/)\\n\\n## File permissions\\n\\nContainer\u2019s file permissions get copied from the host machine\u2019s file system while building images so be mindful when building them on environments implementing the least privilege principle on the filesystem.\\n\\nSo when you COPY or ADD files, you can use the following\\n\\n    COPY [--chown=<user>:<group>] <src>... <dest>\\n\\n## Summary\\n\\nI may have glossed over a few things but I would like to say that no matter how much I share, your own journey will give you a great bit of experience and hope I\u2019ve shared some gotchas that may be of some help. So dive right in but with some consideration :-)\\n\\nThanks for sticking with me."},{"id":"JSON-WEB-TOKEN","metadata":{"permalink":"/JSON-WEB-TOKEN","source":"@site/blog/JSON Web Tokens.md","title":"JSON Web Tokens","description":"Repost from https://medium.com/@ambersariya/jwt-json-web-token-cd90ef7a7a66","date":"2017-02-28T11:45:44.128Z","formattedDate":"February 28, 2017","tags":[],"readingTime":4.995,"truncated":false,"authors":[],"frontMatter":{"title":"JSON Web Tokens","slug":"JSON-WEB-TOKEN","description":"Repost from https://medium.com/@ambersariya/jwt-json-web-token-cd90ef7a7a66","modified":"2022-05-18T14:41:38.500Z","date":"2017-02-28T11:45:44.128Z"},"prevItem":{"title":"Journey To The Centre Of The Stack","permalink":"/journey-to-the-centre-of-the-stack"},"nextItem":{"title":"Blogging Like a Hacker","permalink":"/blogging-like-a-hacker"}},"content":"## What is it?\\n\\n> _JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties. The claims in a JWT are encoded as a JSON object that is used as the payload of a JSON Web Signature (JWS) structure or as the plaintext of a JSON Web Encryption (JWE) structure, enabling the claims to be digitally signed or integrity protected with a Message Authentication Code (MAC) and/or encrypted._\\n\\nJSON Web Tokens are an open, industry-standard [**RFC 7519**](https://tools.ietf.org/html/rfc7519) method for representing claims securely between two parties. See here: [https://jwt.io](https://jwt.io \\"https://jwt.io\\")\\n\\nIn this context, \\"claim\\" can be something like a \\"command\\", a one-time authorization, or basically any other scenario that you can word as:\\n\\n> _Hello Server B, Server A told me that I could \\"**claim goes here**\\", and here\u2019s the (cryptographic) proof._\\n\\nBefore we dive into this further, I\u2019d like to define some terms we use in the realm of authentication.\\n\\n> **_Authentication_** _\u2014 Proving who you are_\\n>\\n> **_Authorization_** _\u2014 Being granted access to resources_\\n>\\n> **_Token_** _\u2014 medium used to persist authentication and get authorization_\\n\\n## So, what does It Look Like?\\n\\nWell, it looks like another confusing looking string\\n\\n    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ\\n\\nUpon closer inspections, you\u2019ll see that this JWT consist of three parts separated by dots (`.`), which are:\\n\\n- Header\\n- Payload\\n- Signature\\n\\n    Header.Payload.Signature\\n\\nSo, let\u2019s break it down a little:\\n\\n```js\\n// header\\n    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\\n// payload\\n    .eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9\\n// signature\\n    .TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ\\n```\\n\\n### Header\\n\\n\\n```json title=\\"HS256 indicates that this token is signed using HMAC-SHA256.\\"\\n{\\n    \\"alg\\": \\"HS256\\",\\n    \\"typ\\": \\"JWT\\"\\n}\\n```\\n\\n### Claims/Payload\\n\\n```json title=\\"The payload contains the claims that we wish to make\\"\\n{ \\"sub\\": \\"1234567890\\", \\"name\\": \\"John Doe\\", \\"admin\\": true}\\n```\\n\\n### Signature\\n\\nWe use the following formula to calcalate signature\\n\\n```js\\nHMACSHA256(encodeBase64(header) + \\".\\" + encodeBase64(payload), secret)\\n```\\n\\nThis then gives us something like:\\n\\n```\\nthiseyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJbkFzIjoiYWRtaW4iLCJpYXQiOjE0MjI3Nzk2Mzh9.gzSraSYS8EXBxLN_oWnFSRgCzcmJmMjLiuyu5CSpyHI\\n```\\n\\nLet\u2019s expand on the claims section of JWT. The following claims are part of the RFC document:\\n\\n**iss**: who is the issuer of this token auth.example.com\\n**sub**: what is the subject of this token e.g. auth\\n**aud**: who can use this token e.g [\'client1.example.com\',\'client2.example.com\']\\n**exp**: Defines the expiration time as unix timestamp e.g. 1488192525\\n**nbf**: define how long after the issued token was generated we can use it e.g. 300 seconds (5 minutes)\\n**iat**: issued at is a unix timestamp e.g. 1488192525\\n**jti**: JWT ID unique id. This can be used to prevent a token from being replayed e.g. \\"xa443D\\"\\n\\nThe key names are case sensitive and have been kept small to keep the JSON payload compact.\\n\\n## How does the Authentication Flow work?\\n\\nIn authentication, when the user successfully logs in using their credentials, a JSON Web Token will be returned and must be saved locally (typically in local storage, but cookies can be also used), instead of the traditional approach of creating a session in the server and returning a cookie.\\n\\n```json title=\\"POST /login\\"\\n{\\n    email: \\"username@example-domain.com\\"\\n    password: \\"5\xa3cUr3PA$$W0rd!\\"\\n}\\n```\\n\\n```json title=\\"Response 201 Created\\"\\n{\\n    token: \\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ\\"\\n}\\n```\\n\\nAny subsequent calls to the API would typically send the Authorization header using the Bearer schema.\\n\\n```js\\nAuthorization: \\"Bearer myToken\\"\\n```\\n\\nTherefore the content of the header should look like the following.\\n\\n```js title=\\"GET /\\"\\n# Headers\\nAuthorization: \\"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ\\"\\n```\\n\\nThis is a stateless authentication mechanism as the user state is never saved in the server memory. The server\u2019s protected routes will check for a valid JWT in the Authorization header, and if there is, the user will be allowed.\\n\\n- signature valid?\\n- client allowed? aud- expected issuer? iss- can this token be used? nbf\\n\\nAs JWTs are self-contained, all the necessary information is there, reducing the need of going back and forward to the database. This allows us to fully rely on data APIs that are stateless and even make requests to downstream services. It doesn\u2019t matter which domains are serving the APIs, as Cross-Origin Resource Sharing (CORS) won\u2019t be an issue as it doesn\u2019t use cookies.\\n\\n## Making a case for JWT\\n\\n- **Portability**: they work across many different platforms, having implementations in various programming languages.\\n- **Compact**: Because of its size, it can be sent through an URL, POST parameter, or inside an HTTP header. Additionally, due to its size its transmission is fast.\\n- **Self-contained:** The payload contains all the required information about the user, to avoid querying the database more than once.\\n- **Control:** Allows fine grained control over types of permissions. You can specify detailed access control information within _the token itself_ as part of its payload. For instance, in the same way that you can create AWS security policies with very specific permissions, you can limit the token to only give read/write access to a single resource. In contrast, API Keys tend to have a coarse all-or-nothing access.\\n\\n## Problems with JWT\\n\\n- Cannot be used in place of Sessions & Cookies. If we want to use them in such a manner, then stick with Sessions and Cookies.\\n- Data goes stale. For instance, an admin with a JWT token has had their access revoked but the token will keep on working because it was generated and verified correctly with the secret key.\\n- There\u2019s a critical vulnerability when using Asymmetric keys. The attackers know which algorithm was used to generate the token. This is open to abuse from the attackers. The server should already know which algorithm was used to generate/verify the integrity of this token.\\n\\n## Conclusion\\n\\nJSON Web Tokens offer many advantages but not without having some drawbacks. If you work on an extremely large-scale application, sessions could be the appropriate choice. It is completely reasonable to combine sessions and JWT \u2014 they each have their own purpose, and sometimes you need both. Just don\u2019t use JWT for _persistent_ data.\\n\\n---\\n\\n## Further Reading\\n\\nThanks to the following:\\n\\n- [https://tools.ietf.org/html/rfc7519](https://tools.ietf.org/html/rfc7519 \\"https://tools.ietf.org/html/rfc7519\\")\\n- [http://self-issued.info/docs/draft-ietf-oauth-json-web-token.html#RegisteredClaimName](http://self-issued.info/docs/draft-ietf-oauth-json-web-token.html#RegisteredClaimName \\"http://self-issued.info/docs/draft-ietf-oauth-json-web-token.html#RegisteredClaimName\\")\\n- [https://auth0.com/blog/critical-vulnerabilities-in-json-web-token-libraries/](https://auth0.com/blog/critical-vulnerabilities-in-json-web-token-libraries/ \\"https://auth0.com/blog/critical-vulnerabilities-in-json-web-token-libraries/\\")\\n- [https://auth0.com/learn/json-web-tokens/](https://auth0.com/learn/json-web-tokens/ \\"https://auth0.com/learn/json-web-tokens/\\")\\n- [https://www.slideshare.net/lcobucci/jwt-to-authentication-and-beyond](https://www.slideshare.net/lcobucci/jwt-to-authentication-and-beyond \\"https://www.slideshare.net/lcobucci/jwt-to-authentication-and-beyond\\")\\n- [https://www.slideshare.net/a_z_e_t/javascript-object-signing-encryption](https://www.slideshare.net/a_z_e_t/javascript-object-signing-encryption \\"https://www.slideshare.net/a_z_e_t/javascript-object-signing-encryption\\")\\n- [http://christhorntonsf.com/secure-your-apis-with-jwt/](http://christhorntonsf.com/secure-your-apis-with-jwt/ \\"http://christhorntonsf.com/secure-your-apis-with-jwt/\\")\\n- [http://cryto.net/\\\\~joepie91/blog/2016/06/13/stop-using-jwt-for-sessions/](http://cryto.net/~joepie91/blog/2016/06/13/stop-using-jwt-for-sessions/ \\"http://cryto.net/~joepie91/blog/2016/06/13/stop-using-jwt-for-sessions/\\")"},{"id":"blogging-like-a-hacker","metadata":{"permalink":"/blogging-like-a-hacker","source":"@site/blog/Blogging Like a Hacker.md","title":"Blogging Like a Hacker","description":"First post","date":"2017-01-29T02:01:12.000Z","formattedDate":"January 29, 2017","tags":[],"readingTime":0.53,"truncated":false,"authors":[],"frontMatter":{"title":"Blogging Like a Hacker","slug":"blogging-like-a-hacker","description":"First post","date":"2017-01-29T02:01:12.000Z","modified":"2022-05-18T12:01:34.181Z"},"prevItem":{"title":"JSON Web Tokens","permalink":"/JSON-WEB-TOKEN"}},"content":"Hello World :earth_asia:\\n\\nThis is my first post, hoping there\'s a lot more I can write, but for now, this is me getting started with blogging.\\n\\nI am an experienced Software Developer from the UK. I started my first fulltime job in 2011, I never thought to share my thoughts & experience. Through this blog, I am hoping to channel my thoughts and hopefully pay forward the knowledge in the same way I\'ve found to be useful from other bloggers.\\n\\nFor now, I have a lot to learn about GitHub pages but I shall be adding more content over the coming future.\\n\\nStay tuned. :warning: :construction:"}]}')}}]);