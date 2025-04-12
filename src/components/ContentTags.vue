<template>
    <div class="content-source">
        <button @click="emitPrintTags" class="align-button">
            <img src="@/assets/icons8-refresh-512.png" alt="刷新" class="refresh-icon rotate"
                :class="{ active: isActive }" />
            <span>换一换</span>
        </button>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

// 添加旋转效果的状态
const isActive = ref(false);
const emit = defineEmits(['print-tags']);

const emitPrintTags = () => {
    isActive.value = true; // 设置为 true 以触发旋转
    emit('print-tags');

    // 添加一个定时器，在旋转动画结束后移除 active 类
    setTimeout(() => {
        isActive.value = false; // 移除 active 类
    }, 500); // 500ms 与 CSS 中的旋转时间一致
};
</script>

<style scoped>
.align-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.refresh-icon {
    width: 20px;
    margin-right: 8px;
}

.content-source {
    padding: 20px;
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
}

button:hover {
    background-color: rgba(255, 255, 255, 0);
    transform: scale(1.05);
}

button:active {
    transform: scale(0.95);
}

/* 为图标添加旋转动画 */
.rotate {
    transition: transform 0.5s ease;
}

.rotate.active {
    animation: spin 0.5s forwards;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>
