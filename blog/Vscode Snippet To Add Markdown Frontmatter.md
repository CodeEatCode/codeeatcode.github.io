---
modified: 2022-05-19T11:46:52.000Z
date: 2022-05-19T11:46:52.000Z
title: Vscode Snippet To Add Markdown Frontmatter
slug: vscode-snippet-to-add-markdown-frontmatter
draft: false
---

1. Click on settings for VSCode
2. Click on "User Snippets
3. Click on "New Global Snippets File..."
4. Add the following JSON which will be limited to markdown files only

```json
{
    "Add Docusaurus blog frontmatter": {
        "body": [
            "---",
            "draft: true",
            "modified: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE}T${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND}.000Z",
            "date: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE}T${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND}.000Z",
            "title: ${TM_FILENAME_BASE/(\\w.*)/${1:/capitalized}/}",
            "slug: ${TM_FILENAME_BASE/([\\w-]+$)|([\\w-]+)|([-\\s]+)|([^\\w]+)/${1:/downcase}${2:/downcase}${2:+-}/gm}",
            "---"
        ],
        "description": "Create Blogpost Frontmatter",
        "scope": "markdown,mdx,md",
        "prefix": ["blog", "draft blog", "frontmatter", "add frontmatter"]
    }
}
```
