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
            <!-- 视频内容 -->
            <div class="video-gallery" v-if="videoList.length > 0">
                <div class="common-list">
                    <div class="common-item" v-for="(video, index) in videoList" :key="video.aweme_id || index"
                        @mouseover="hoveredIndex = index" @mouseleave="hoveredIndex = null">
                        <a :href="getVideoProperty(video, 'link')" target="_blank" class="content-link">
                            <div class="cover-container">
                                <img :src="getVideoProperty(video, 'cover')" :alt="getVideoProperty(video, 'title')"
                                    class="content-cover" />
                            </div>
                            <div class="info-container">
                                <img :src="getLogoSrc(video.source)" class="platform-logo" />
                                <h3 class="content-title">{{ getVideoProperty(video, 'title') }}</h3>
                                <p class="content-author">{{ getVideoProperty(video, 'author') || '未知作者' }}</p>
                                <div class="meta-container">
                                    <span class="duration">{{ formatDuration(getVideoProperty(video, 'duration'))
                                    }}</span>
                                    <span class="views">{{ formatViews(getVideoProperty(video, 'views')) }}</span>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <!-- 知乎内容 -->
            <div class="zhihu-gallery" v-if="zhihuList.length > 0">
                <div class="common-list">
                    <div class="common-item" v-for="(zhihu, index) in zhihuList" :key="zhihu.id || index"
                        @mouseover="hoveredIndex = index" @mouseleave="hoveredIndex = null">
                        <a :href="getZhihuProperty(zhihu, 'link')" target="_blank" class="content-link">
                            <div class="info-container full-width">
                                <img :src="getLogoSrc(zhihu.source)" class="platform-logo" />
                                <h3 class="content-title">{{ getZhihuProperty(zhihu, 'title') }}</h3>
                                <p class="content-desc">{{ getZhihuProperty(zhihu, 'desc') }}</p>
                                <div class="meta-container">
                                    <span class="comments">{{ formatComments(getZhihuProperty(zhihu, 'comments'))
                                    }}</span>
                                    <span class="time">{{ formatTimeZhihu(getZhihuProperty(zhihu, 'time')) }}</span>
                                    <span class="likes">{{ formatLikes(getZhihuProperty(zhihu, 'likes')) }}</span>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <!-- 小红书内容 -->
            <div class="xhs-gallery" v-if="xhsList.length > 0">
                <div class="common-list">
                    <div class="common-item" v-for="(xhs, index) in xhsList" :key="xhs.id || index"
                        @mouseover="hoveredIndex = index" @mouseleave="hoveredIndex = null">
                        <a :href="getXhsProperty(xhs, 'link')" target="_blank" class="content-link">
                            <div class="cover-container">
                                <img :src="getXhsProperty(xhs, 'cover')" :alt="getXhsProperty(xhs, 'title')"
                                    class="content-cover" />
                            </div>
                            <div class="info-container">
                                <img :src="getLogoSrc(xhs.source)" class="platform-logo" />
                                <h3 class="content-title">{{ getXhsProperty(xhs, 'title') }}</h3>
                                <p class="content-author">{{ getXhsProperty(xhs, 'author') || '未知作者' }}</p>
                                <p class="content-desc">{{ getXhsProperty(xhs, 'desc') }}</p>
                                <div class="meta-container">
                                    <span class="comments">{{ formatComments(getXhsProperty(xhs, 'comments'))
                                    }}</span>
                                    <span class="time">{{ formatTimeXhs(getXhsProperty(xhs, 'time')) }}</span>
                                    <span class="likes">{{ formatLikes(getXhsProperty(xhs, 'likes')) }}</span>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <!-- 空状态 -->
            <div v-if="!videoList.length && !zhihuList.length && !xhsList.length" class="empty-state">
                <p>请选择标签</p>
            </div>

        </template>
    </div>
</template>
<script>
import { videoPropertyMapping, zhihuPropertyMapping, xhsPropertyMapping } from '@/utils/PropertyMapping';
import dayjs from 'dayjs';
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
            return this.processedVideos.filter(v => ['dy', 'bili'].includes(v.source));
        },
        zhihuList() {
            return this.processedVideos.filter(v => v.source === 'zhihu');
        },
        xhsList() {
            return this.processedVideos.filter(v => v.source === 'xhs');
        }
    },
    watch: {
        videos: {
            immediate: true,
            handler(newVideos) {
                this.processedVideos = [...newVideos];
            }
        }
    },
    methods: {
        // 属性获取方法
        getVideoProperty(video, prop) {
            const mapping = videoPropertyMapping[video.source];
            if (mapping && mapping[prop]) {
                return eval(mapping[prop]);
            }
            return null; // 或者可以返回一个默认值
        },

        getZhihuProperty(item, prop) {
            const mapping = zhihuPropertyMapping.zhihu;
            if (mapping && mapping[prop]) {
                return eval(mapping[prop]);
            }
            return null; // 或者可以返回一个默认值
        },

        getXhsProperty(item, prop) {
            const mapping = xhsPropertyMapping.xhs;
            if (mapping && mapping[prop]) {
                return eval(mapping[prop]);
            }
            return null; // 或者可以返回一个默认值
        },
        // 通用格式方法
        formatTimeZhihu(time) {
            return dayjs(time).format('YYYY-MM-DD HH:mm');
        },
        formatTimeXhs(timestamp) {
            return dayjs(timestamp).format('YYYY-MM-DD HH:mm');
        },
        formatComments(count) {
            return count > 10000 ? `${(count / 10000).toFixed(1)}万评论` : `${count} 评论`;
        },
        formatLikes(count) {
            return count > 10000 ? `${(count / 10000).toFixed(1)}万赞` : `${count} 赞`;
        },
        // 视频特有格式方法
        formatDuration(duration) {
            if (typeof duration === 'string') {
                if (/^\d{1,2}:\d{2}$/.test(duration)) return duration;
                if (/^\d{1,2}:\d{2}:\d{2}$/.test(duration)) {
                    const parts = duration.split(':');
                    return parts.map(p => p.padStart(2, '0')).join(':');
                }
            }
            const totalSeconds = Math.floor(duration / 1000);
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            return [hours, minutes, seconds]
                .filter((v, i) => v > 0 || i > 0)
                .map(v => v.toString().padStart(2, '0'))
                .join(':');
        },
        formatViews(views) {
            return views > 10000 ? `${(views / 10000).toFixed(1)}万播放` : `${views} 播放`;
        },
        // 平台图标
        getLogoSrc(source) {
            const logos = {
                'bili': '/assets/Bilibili_logo.svg',
                'dy': '/assets/Douyin_logo.svg',
                'zhihu': '/assets/Zhihu_logo.svg',
                'xhs': '/assets/Xiaohongshu logo - Brandlogos.net.svg'
            };
            return logos[source] || '/assets/default_logo.png';
        }
    }
};
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
    background: #1c1c1c;
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

.full-width {
    width: 100%;
}

/* 平台图标 */
.platform-logo {
    position: absolute;
    top: 24px;
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
    /* 上下为0，左右为自动，以实现居中 */
    line-height: 1.4;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    width: 80%;
    /* 设置宽度为父元素的50% */
    max-width: 100%;
    /* 确保不会超出父元素的宽度 */
    text-align: center;
    /* 可选：如果需要文本内容居中 */
}

.content-author {
    color: #888;
    font-size: 14px;
    margin: 0 0 12px 0;
}

.content-desc {
    color: #666;
    font-size: 14px;
    margin: 0 0 20px 0;
    line-height: 1.6;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

.meta-container {
    display: flex;
    gap: 20px;
    font-size: 13px;
    color: #666;
    margin-top: auto;
    align-items: center;
    /* 添加这一行 */
}

.meta-container span {
    padding: 0;
    /* 添加这一行 */
    margin: 0;
    /* 添加这一行 */
    font-family: Arial, sans-serif;
    /* 确保字体一致 */
    font-weight: normal;
    /* 确保字体粗细一致 */
}

/* 响应式设计 */
@media (max-width: 768px) {
    .common-item {
        flex-direction: column;
        min-height: auto;
    }

    .cover-container {
        flex-basis: 200px;
        width: 100%;
    }

    .info-container {
        padding: 16px;
    }

    .content-title {
        font-size: 16px;
        padding-right: 40px;
    }

    .content-desc {
        font-size: 13px;
    }

    .platform-logo {
        width: 32px;
        height: 18px;
        top: 16px;
        right: 16px;
    }
}

/* 骨架屏样式 */
.skeleton-loader {
    display: grid;
    gap: 24px;

}

.skeleton-item {
    position: relative;
    border-radius: 12px;
    background: #1c1c1c;
    display: flex;
    min-height: 180px;
    overflow: hidden;
}

.skeleton-cover {
    flex: 0 0 320px;
    height: 180px;
    background: #2a2a2a;
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
    background: #2a2a2a;
    position: absolute;
    right: 24px;
    top: 20px;
}

.skeleton-title {
    width: 70%;
    height: 24px;
    background: #2a2a2a;
    margin-top: 8px;
}

.skeleton-author {
    width: 40%;
    height: 16px;
    background: #2a2a2a;
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
    color: #666;
}

.video-gallery {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}
</style>
