// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes: prismThemes} = require("prism-react-renderer");

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: "Code Eat Code",
    tagline: "It's a Code eat Code world",
    url: "https://codeeatcode.github.io",
    baseUrl: "/",
    onBrokenLinks: "throw",
    markdown: {
        hooks: {
            onBrokenMarkdownLinks: "warn",
        },
    },
    favicon: "img/logo.gif",

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: "codeeatcode", // Usually your GitHub org/user name.
    projectName: "codeeatcode.github.io", // Usually your repo name.
    trailingSlash: true,
    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
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
                    content: "Code Eat Code",
                },
                {
                    name: "description",
                    content: "It's a Code eat Code world",
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
                title: "Code Eat Code",
                logo: {
                    alt: "Code Eat Ccode",
                    src: "img/logo.gif",
                },
                items: [
                    // { to: "/blog", label: "Blog", position: "left" },
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
                                href: "https://github.com/codeeatcode",
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
                copyright: `Copyright © ${new Date().getFullYear()} Code Eat Code blog built with Docusaurus.`,
            },
            prism: {
                theme: prismThemes.github,
                darkTheme: prismThemes.dracula,
            },
        }),
};

module.exports = config;
