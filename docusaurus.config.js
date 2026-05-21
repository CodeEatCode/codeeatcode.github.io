// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes: prismThemes} = require("prism-react-renderer");

/** @type {() => Promise<import('@docusaurus/types').Config>} */
module.exports = async function () {
    const remarkD2 = (await import("remark-d2")).default;

    return {
        title: "Works in Prod",
        tagline: "Vibe-posted. Fact-checked. Mostly.",
        url: "https://works-in-prod.github.io",
        baseUrl: "/",
        headTags: [
            { tagName: "link", attributes: { rel: "preconnect", href: "https://fonts.googleapis.com" } },
            { tagName: "link", attributes: { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "anonymous" } },
            { tagName: "link", attributes: { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap" } },
        ],
        onBrokenLinks: "throw",
        markdown: {
            hooks: {
                onBrokenMarkdownLinks: "warn",
            },
        },
        favicon: "img/logo.gif",

        organizationName: "works-in-prod",
        projectName: "works-in-prod.github.io",
        trailingSlash: true,
        i18n: {
            defaultLocale: "en",
            locales: ["en"],
        },
        plugins: [
            [
                "@docusaurus/plugin-content-blog",
                ({
                    showReadingTime: true,
                    routeBasePath: "/",
                    postsPerPage: 10,
                    blogSidebarCount: "ALL",
                    remarkPlugins: [remarkD2],
                }),
            ],
        ],
        themes: [
            [
                "@docusaurus/theme-classic",
                {
                    customCss: require.resolve("./src/css/custom.css"),
                },
            ],
        ],

        themeConfig:
            /** @type {import('@docusaurus/types').ThemeConfig} */
            ({
                metadata: [
                    {
                        name: "keywords",
                        content:
                            "coding, technology, programming, software development, blog, blog with code, coding blog, programming blog, software development blog",
                    },
                    {
                        name: "title",
                        content: "Works in Prod",
                    },
                    {
                        name: "description",
                        content: "Vibe-posted. Fact-checked. Mostly.",
                    },
                    {
                        name: "google-site-verification",
                        content: "4wtMRQYF-x9ALzRmResSAiLkmCMznEP-QzhS4rjsewQ",
                    },
                ],
                colorMode: {
                    defaultMode: "light",
                    disableSwitch: false,
                    respectPrefersColorScheme: true,
                },
                navbar: {
                    title: "Works in Prod",
                    logo: {
                        alt: "Works in Prod",
                        src: "img/logo.gif",
                    },
                    items: [
                        {
                            type: "html",
                            position: "left",
                            value: '<span class="navbar__tagline">Vibe-posted. Fact-checked. Mostly.</span>',
                        },
                        {
                            type: "dropdown",
                            label: "GitHub",
                            position: "right",
                            items: [
                                {
                                    href: "https://github.com/ambersariya",
                                    label: "GitHub Personal",
                                },
                                {
                                    href: "https://github.com/works-in-prod",
                                    label: "GitHub Org",
                                },
                            ],
                        },
                    ],
                },
                footer: {
                    style: "dark",
                    links: [
                        {
                            title: "Find Me",
                            items: [
                                {
                                    label: "Twitter",
                                    href: "https://twitter.com/_ambersariya",
                                },
                                {
                                    label: "LinkedIn",
                                    href: "https://www.linkedin.com/in/danish-javed/",
                                },
                            ],
                        },
                    ],
                    copyright: `Copyright © ${new Date().getFullYear()} Works in Prod`,
                },
                prism: {
                    theme: prismThemes.github,
                    darkTheme: prismThemes.dracula,
                },
            }),
    };
};
