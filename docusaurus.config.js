// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: "Code Eat Code",
    tagline: "It's a Code eat Code world",
    url: "https://codeeatcode.github.io",
    baseUrl: "/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    favicon: "img/favicon.ico",

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
    // plugins: [MyPlugin],
    presets: [
        [
            "classic",
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: false,
                blog: {
                    showReadingTime: true,
                    routeBasePath: "/",
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    // editUrl: "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
                    postsPerPage: 10,
                    blogSidebarTitle: "All posts",
                    blogSidebarCount: "ALL",
                },
                theme: {
                    customCss: require.resolve("./src/css/custom.css"),
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            respectPrefersColorScheme: false,
            navbar: {
                title: "Code Eat Code",
                logo: {
                    alt: "Code Eat Ccode",
                    src: "img/logo.svg",
                },
                items: [
                    // { to: "/blog", label: "Blog", position: "left" },
                    {
                        href: "https://github.com/ambersariya",
                        label: "GitHub Personal",
                        position: "right",
                    },
                    {
                        href: "https://github.com/codeeatcode",
                        label: "GitHub Org",
                        position: "right",
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
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
        }),
};

module.exports = config;
