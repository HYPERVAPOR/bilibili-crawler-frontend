<template>
    <div class="content-source">
        <div class="header-container">
            <h2>内容来源 🔗</h2>
            <div class="tooltip-container">
                <img src="@/assets/question-mark-in-a-circle-svgrepo-com.svg" alt="Question Mark Icon" class="icon" />
                <span class="tooltip-text">
                    · 目前仅能无限制地爬取b站内容。<br>
                    · 关于其他平台的内容爬取流程，请点击导航栏的“开始”查看详细信息
                </span>
            </div>

        </div>
        <div class="tag-container">
            <div v-for="(tag, index) in tags" :key="index" :class="{ 'selected': selectedTags.includes(tag.name) }"
                @click="toggleTag(tag.name)" class="tag">
                <img :src="tag.logo" alt="tag.name" class="tag-logo" />
                <span>{{ tag.name }}</span>
            </div>



        </div>
        <button @click="emitPrintTags" class="align-button">
            <img src="@/assets/icons8-refresh-512.png" alt="刷新" class="refresh-icon rotate"
                :class="{ active: isActive }" />
            <span>换一换</span>
        </button>

    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

// 标签与对应的实际传递名称的映射
const tagMap = {
    '哔哩哔哩': 'bili',
    '抖音': 'dy',
    '小红书': 'xhs',
    '知乎': 'zhihu',
    // 'Leetcode': 'leetcode',
    // '牛客网': 'newcoder'
};

const tags = [
    { name: '哔哩哔哩', logo: require('@/assets/Bilibili_logo.svg') },
    { name: '抖音', logo: require('@/assets/Douyin_logo.svg') },
    { name: '小红书', logo: require('@/assets/Xiaohongshu logo - Brandlogos.net.svg') },
    { name: '知乎', logo: require('@/assets/Zhihu_logo.svg') },
    // { name: 'Leetcode', logo: require('@/assets/LeetCode_Logo_black_with_text.svg') },
    // { name: '牛客网', logo: require('@/assets/newcoder.png') }
];

const selectedTags = ref(['哔哩哔哩']);
const emit = defineEmits(['tag-change', 'print-tags']);

const toggleTag = (tagName) => {
    const index = selectedTags.value.indexOf(tagName);
    if (index > -1) {
        selectedTags.value.splice(index, 1);
    } else {
        selectedTags.value.push(tagName);
    }
    emit('tag-change', selectedTags.value.map(tag => tagMap[tag])); // 传递映射后的名称
};

// 添加旋转效果的状态
const isActive = ref(false);

const emitPrintTags = () => {
    isActive.value = true; // 设置为 true 以触发旋转
    // 手动触发 tag-change 事件更新父组件数据
    emit('tag-change', selectedTags.value.map(tag => tagMap[tag])); // 传递映射后的名称
    emit('print-tags');

    // 添加一个定时器，在旋转动画结束后移除 active 类
    setTimeout(() => {
        isActive.value = false; // 移除 active 类
    }, 500); // 500ms 与 CSS 中的旋转时间一致
};
</script>


<style scoped>
.quickstart-link {
    color: rgb(194, 0, 113);
    /* 设置链接颜色 */
    text-decoration: underline;
    /* 添加下划线 */
    cursor: pointer;
    /* 鼠标悬停时显示手形光标 */
}

.quickstart-link:hover {
    color: rgb(249, 76, 209);
    /* 悬停时改变颜色 */
}

.align-button {
    display: flex;
    /* 使用 flexbox 布局 */
    align-items: center;
    /* 垂直方向居中对齐 */
    justify-content: center;
    /* 水平方向居中对齐 */
    width: 100%;
    /* 可选：使按钮宽度为父容器的100% */
}

.refresh-icon {
    margin-right: 8px;
    /* 图片与文字之间的间距 */
}

.header-container {
    display: flex;
    align-items: center;
    justify-content: center;
    /* 水平居中对齐 */
    /* 垂直居中对齐 */
}

.tooltip-container {
    position: relative;
    margin-left: 10px;
    display: inline-block;
}

.icon {
    width: 20px;
    /* 可以根据需要调整大小 */
    height: 20px;
    /* 可以根据需要调整大小 */
}

.tooltip-text {
    visibility: hidden;
    width: 120px;
    background-color: rgb(24, 24, 24);
    color: #bababa;
    text-align: center;
    border-radius: 20px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    /* 调整气泡位置 */
    left: 50%;

    /* 调整气泡居中 */
    opacity: 0;
    transition: all 0.3s;
    font-size: x-small;
}

.tooltip-container:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
}

.tooltip-text:hover {
    visibility: visible;
    opacity: 1;
}

.content-source {
    padding: 20px;
}

h2 {
    font-size: 24px;
    margin-bottom: 15px;
}

.tag-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    width: 85%;
    margin: 0 auto;
}

.tag {
    display: flex;
    align-items: center;
    padding: 15px 12px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    background-color: #2a2a2a;
    /* 添加透明边框以便于选中时的变化 */
}

.tag:hover {
    transform: scale(1.05);
    background-color: #414141;
}

.tag.selected {
    background-color: #aa1e67;
    border: 2px solid #d5006d;
    /* 紫红色边框 */
    box-shadow: 0 0 10px rgba(213, 0, 109, 0.7);
    /* 发光效果 */
}

.tag.selected:hover {

    box-shadow: 0 0 15px rgba(213, 0, 109, 0.9);
    /* 增强的发光效果 */
}

.tag-logo {
    height: 20px;
    margin-right: 8px;
    object-fit: contain;
}

.refresh-icon {
    width: 30px;
    /* 根据需要设置宽度 */
    height: auto;
    /* 保持图像比例 */
}

button {

    margin-top: 15px;
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    background-color: #ffffff00;
    color: #8a939d;
    font-size: 15px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    /* 添加 transform 的过渡效果 */
}

button:hover {
    background-color: rgba(255, 255, 255, 0);
    /* 悬停时背景色变化 */
    transform: scale(1.05);
    /* 悬停时放大按钮 */
}

button:active {
    transform: scale(0.95);
    /* 点击时缩小按钮 */
}

/* 为图标添加旋转动画 */
.rotate {
    transition: transform 0.5s ease;
    /* 旋转过渡效果 */
}

.rotate.active {
    animation: spin 0.5s forwards;
    /* 旋转动画 */
}

@keyframes spin {
    from {
        transform: rotate(0deg);
        /* 起始位置 */
    }

    to {
        transform: rotate(360deg);
        /* 结束位置 */
    }
}
</style>