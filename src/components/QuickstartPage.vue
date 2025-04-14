<template>
    <div class="quickstart-page">
        <div class="sidebar">
            <h2>导航</h2>
            <ul>
                <li v-for="section in sections" :key="section.id">
                    <div class="section-header" @click="toggleSection(section)">
                        <span>{{ section.title }}</span>
                        <span class="toggle-icon">{{ section.isExpanded ? '−' : '+' }}</span>
                    </div>
                    <ul v-show="section.isExpanded" class="sub-sections">
                        <li v-for="child in section.children" :key="child.id">
                            <a :href="'#' + child.id" @click.prevent="scrollTo(child.id)">{{ child.title }}</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="content" v-html="markdownContent"></div>
    </div>
</template>

<script>
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

const slugify = (text) =>
    text.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\u4e00-\u9fff-]+/g, '');

export default {
    data() {
        return {
            markdownContent: '',
            sections: []
        };
    },
    async mounted() {
        try {
            const response = await fetch('quickstart.md');
            if (!response.ok) throw new Error('无法获取 Markdown 文件');
            const markdown = await response.text();
            marked.setOptions({
                headerIds: true,
                slugify,
                highlight: (code, lang) => {
                    console.log('Highlighting:', lang);
                    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                    return hljs.highlight(code, { language }).value;
                }
            });

            const tokens = marked.lexer(markdown);
            let currentSection = null;
            const sections = [];
            tokens.forEach(token => {
                if (token.type === 'heading') {
                    if (token.depth === 1) {
                        currentSection = {
                            id: slugify(token.text),
                            title: token.text,
                            children: [],
                            isExpanded: false
                        };
                        sections.push(currentSection);
                    } else if (token.depth === 2 && currentSection) {
                        currentSection.children.push({
                            id: slugify(token.text),
                            title: token.text
                        });
                    }
                }
            });

            this.sections = sections;
            this.markdownContent = marked(markdown);

            this.$nextTick(() => {
                document.querySelectorAll('pre code').forEach((block) => {
                    hljs.highlightElement(block);
                });
            });

        } catch (error) {
            console.error('加载 Markdown 文件时出错:', error);
        }
    },
    methods: {
        toggleSection(section) {
            section.isExpanded = !section.isExpanded;
        },
        scrollTo(id) {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    }
};
</script>

<style>
.quickstart-page {
    display: flex;
    background-color: #111519;
    color: #D9F2FF;
    min-height: 100vh;
    padding: 30px 0;
    margin-top: 100px;
}

.sidebar {
    position: fixed;
    top: 120px;
    left: 0;
    width: 260px;
    height: 75%;
    overflow-y: auto;
    border-right: 1px solid rgb(79, 79, 79);
    padding: 0 30px;
    flex-shrink: 0;
}

.content {
    flex: 1;
    margin-left: 280px;
    padding: 0 40px;
    text-align: left;
    max-width: 800px;
    line-height: 2;
}

.content pre {
    background-color: #181D24;
    padding: 16px;
    border-radius: 3px;
    overflow-x: auto;
    margin: 1em 0;
}

.content pre code {
    padding: 0;
    background-color: transparent;
    color: inherit;
    font-family: 'Consolas', 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.5;
}

@media screen and (max-width: 768px) {
    .quickstart-page {
        flex-direction: column;
        margin-top: 80px;
        padding: 15px 0;
    }

    .sidebar {
        position: static;
        width: 100%;
        height: auto;
        padding: 0 20px;
        border-right: none;
        border-bottom: 1px solid rgb(79, 79, 79);
    }

    .sidebar h2 {
        font-size: 1.2em;
        padding: 15px 0;
    }

    .content {
        margin-left: 0;
        padding: 20px;
        max-width: 100%;
    }

    .section-header {
        padding: 12px 8px;
    }

    .sub-sections a {
        padding: 10px 16px;
        font-size: 0.9em;
    }

    .toggle-icon {
        font-size: 1.1em;
    }
}

.sidebar h2 {
    font-size: 1.4em;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgb(79, 79, 79);
}

.sidebar ul {
    list-style: none;
    padding: 0;
}

.section-header {
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background-color 0.2s;
}

.section-header:hover {
    background-color: rgba(255, 255, 255, 0.05);
}

.toggle-icon {
    font-size: 1.2em;
    margin-left: 10px;
}

.sub-sections {
    padding-left: 20px;
    margin: 5px 0;
}

.sub-sections a {
    display: block;
    padding: 6px 16px;
    color: #aaa;
    font-size: 0.95em;
    text-decoration: none;
    border-radius: 4px;
    transition: all 0.2s;
}

.sub-sections a:hover {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.05);
}

.content h1 {
    font-size: 2em;
    margin: 1.5em 0 1em;
    padding-bottom: 0.5em;
    border-bottom: 1px solid rgb(79, 79, 79);
}

.content h2 {
    font-size: 1.6em;
    margin: 1.2em 0 0.8em;
    color: #68c4ff;
}
</style>
