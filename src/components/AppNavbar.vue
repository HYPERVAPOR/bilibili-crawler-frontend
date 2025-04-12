<template>
    <nav>
        <div class="logo" @click="goHome">
            <img src="@/assets/crawler.png" alt="My Logo" />
        </div>
        <div class="nav-buttons" ref="navButtons">
            <button ref="homeBtn" @click="goHome" :class="{ active: currentPage === 'Home' }">首页</button>
            <button ref="quickstartBtn" @click="goTo('Quickstart')"
                :class="{ active: currentPage === 'Quickstart' }">开始</button>
            <div class="underline" :style="{
                width: underlineStyle.width + 'px',
                left: underlineStyle.left + 'px'
            }"></div>
        </div>
        <a href="https://github.com/HYPERVAPOR/bilibili-crawler" target="_blank" rel="noopener noreferrer"
            class="github-button">
            <img src="@/assets/github-mark-white.svg" alt="GitHub" />
        </a>
    </nav>
</template>

<script>
import { nextTick } from 'vue';

export default {
    name: 'AppNavbar',
    data() {
        return {
            currentPage: 'Home',
            underlineStyle: {
                width: 0,
                left: 0
            }
        };
    },
    watch: {
        // 监听路由变化
        '$route': {
            handler(to) {
                // 根据路由名称设置当前页面
                this.currentPage = to.name === 'Quickstart' ? 'Quickstart' : 'Home';
                // 更新下划线位置
                this.updateUnderline();
            },
            immediate: true // 立即执行以检测初始路由
        }
    },
    mounted() {
        // 保留窗口大小变化的监听
        window.addEventListener('resize', this.updateUnderline);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.updateUnderline);
    },
    methods: {
        goHome() {
            this.currentPage = 'Home';
            this.$router.push({ name: 'Home' });
            this.updateUnderline();
        },
        goTo(page) {
            this.currentPage = page;
            this.$router.push({ name: page });
            this.updateUnderline();
        },
        updateUnderline() {
            nextTick(() => {
                let target = null;
                if (this.currentPage === 'Home') {
                    target = this.$refs.homeBtn;
                } else if (this.currentPage === 'Quickstart') {
                    target = this.$refs.quickstartBtn;
                }

                if (target) {
                    const navButtons = this.$refs.navButtons;
                    const rect = target.getBoundingClientRect();
                    const containerRect = navButtons.getBoundingClientRect();

                    this.underlineStyle = {
                        width: rect.width * 0.2,
                        left: rect.left - containerRect.left + rect.width * 0.4
                    };
                }
            });
        }
    }
};
</script>

<style>
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background: linear-gradient(to right, #232323, #000);
    color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    position: fixed;
    /* 设置为固定定位 */
    top: 0;
    /* 距离顶部0 */
    left: 0;
    /* 距离左侧0 */
    width: 100%;
    /* 宽度占满 */
    z-index: 1000;
    /* 确保在其他内容之上 */
}

.logo img {
    height: 70px;
    cursor: pointer;
}

.nav-buttons {
    position: relative;
    display: flex;
    gap: 5px;
}

.nav-buttons button {
    position: relative;
    padding: 8px 18px;
    font-size: 20px;
    color: white;
    background: transparent;
    border: none;
    border-radius: 20px;
    cursor: pointer;
}

.nav-buttons button:hover {
    background: #282828;
}

/* 下划线元素 */
.underline {
    position: absolute;
    bottom: -10px;
    height: 3px;
    background-color: #ff0084;
    border-radius: 2px;
    transition: all 0.3s ease;
}

.github-button {
    margin-left: 20px;
}

.github-button img {
    height: 40px;
}
</style>