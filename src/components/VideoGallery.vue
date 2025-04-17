<template>
    <!-- 加载状态 -->
    <div class="video-gallery">
        <div class="gallery-container" v-if="isLoading">
            <div class="skeleton-loader">
                <div v-for="i in 4" :key="i" class="skeleton-item">
                    <div class="skeleton-cover shimmer"></div>
                    <div class="skeleton-info">
                        <div class="skeleton-logo shimmer"></div>
                        <div class="skeleton-title shimmer"></div>
                        <div class="skeleton-author shimmer"></div>
                        <div class="skeleton-meta">
                            <div class="skeleton-duration shimmer"></div>
                            <div class="skeleton-views shimmer"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 内容展示 -->
        <template v-else>
            <div class="video-gallery" v-if="videoList.length > 0">
                <div class="common-list">
                    <div class="common-item" v-for="(video, index) in videoList" :key="video.aweme_id || index"
                        @mouseover="hoveredIndex = index" @mouseleave="hoveredIndex = null">
                        <a :href="video.link" target="_blank" class="content-link">
                            <div class="cover-container">
                                <img :src="video.cover" :alt="video.title" class="content-cover" />
                            </div>
                            <div class="info-container">
                                <img src="@/assets/Bilibili_logo.svg" class="platform-logo" />
                                <h3 class="content-title">{{ video.title }}</h3>
                                <p class="content-author">{{ video.author || '未知作者' }}</p>
                                <div class="meta-container">
                                    <span class="duration">{{ video.duration }} </span>
                                    <span class="views">{{ video.views }} 播放</span>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div v-if="!videoList.length" class="empty-state">
                <p>请选择标签</p>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    props: {
        videos: {
            type: Array,
            default: () => [],
        },
        isLoading: Boolean
    },
    data() {
        return {
            hoveredIndex: null,
            processedVideos: []
        };
    },
    computed: {
        videoList() {
            return this.processedVideos;
        },
    },
    watch: {
        videos: {
            immediate: true,
            handler(newVideos) {
                this.processedVideos = newVideos;
            }
        }
    }
}
</script>

<style scoped>
/* 通用样式 */
.common-list {
    display: grid;
    gap: 24px;
}

.common-item {
    position: relative;
    border-radius: 12px;
    transition: transform 0.3s, box-shadow 0.3s;
    background: #181D24;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    display: flex;
    min-height: 180px;
    overflow: hidden;
}

.common-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.content-link {
    display: flex;
    flex-grow: 1;
    text-decoration: none;
    color: #fff;
}

/* 封面样式 */
.cover-container {
    flex: 0 0 320px;
    position: relative;
    background: #000;
}

.content-cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.95;
}

/* 信息容器 */
.info-container {
    position: relative;
    flex: 1;
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
}

/* 平台图标 */
.platform-logo {
    position: absolute;
    top: 150px;
    right: 24px;
    width: 44px;
    height: 24px;
    opacity: 0.7;
    transition: opacity 0.2s;
}

.common-item:hover .platform-logo {
    opacity: 1;
}

/* 文本内容 */
.content-title {
    font-size: 18px;
    margin: 0 auto 12px auto;
    line-height: 1.4;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    width: 80%;
    max-width: 100%;
    text-align: center;
}

.content-author {
    color: #B6AEA2;
    font-size: 14px;
    margin: 0 0 12px 0;
}

.meta-container {
    display: flex;
    gap: 20px;
    font-size: 13px;
    color: #B6AEA2;
    margin-top: auto;
    align-items: center;
    line-height: 0px;
}

/* 骨架屏样式 */
.skeleton-loader {
    display: grid;
    gap: 24px;
}

.skeleton-item {
    position: relative;
    border-radius: 12px;
    background: #181D24;
    display: flex;
    min-height: 180px;
    overflow: hidden;
}

.skeleton-cover {
    flex: 0 0 320px;
    height: 180px;
    background: #27303b;
}

.skeleton-info {
    flex: 1;
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.skeleton-logo {
    width: 44px;
    height: 24px;
    background: #27303b;
    position: absolute;
    right: 24px;
    top: 20px;
}

.skeleton-title {
    width: 70%;
    height: 24px;
    background: #27303b;
    margin-top: 8px;
}

.skeleton-author {
    width: 40%;
    height: 16px;
    background: #27303b
}

.skeleton-meta {
    display: flex;
    justify-content: space-between;
    margin-top: auto;
}

.shimmer {
    animation: shimmer 1.5s infinite;
    border-radius: 4px;
}

@keyframes shimmer {
    0% {
        opacity: 0.9;
    }

    50% {
        opacity: 0.5;
    }

    100% {
        opacity: 0.9;
    }
}

.empty-state {
    text-align: center;
    padding: 40px;
    color: #111519
}

.video-gallery {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}
</style>
