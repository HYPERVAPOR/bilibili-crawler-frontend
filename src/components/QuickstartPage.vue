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
            if (!response.ok) {
                throw new Error('无法获取 Markdown 文件');
            }
            const markdown = await response.text();

            // 解析导航结构
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
                        const childId = slugify(token.text);
                        currentSection.children.push({
                            id: childId,
                            title: token.text
                        });
                    }
                }
            });

            this.sections = sections;

            // 生成HTML内容时，为每个标题添加 ID
            marked.setOptions({
                headerIds: true,
                slugify
            });
            this.markdownContent = marked(markdown).replace(/<h([1-2])>(.*?)<\/h\1>/g, (match, depth, title) => {
                const id = slugify(title);
                return `<h${depth} id="${id}">${title}</h${depth}>`;
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
    background-color: #202020;
    color: #ffffff;
    min-height: 100vh;
    padding: 30px 0;
    margin-top: 100px;
}

.sidebar {
    position: fixed;
    /* 固定在页面 */
    top: 120px;
    /* 距离顶部的距离 */
    left: 0;
    /* 靠左对齐 */
    width: 260px;
    height: 75%;
    /* 高度为视口高度减去上下的padding */
    overflow-y: auto;
    /* 超出部分可滚动 */
    border-right: 1px solid rgb(79, 79, 79);
    padding: 0 30px;
    flex-shrink: 0;
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

.content {
    flex: 1;
    margin-left: 280px;
    /* 给内容留出空间 */
    padding: 0 40px;
    text-align: left;
    max-width: 800px;
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
