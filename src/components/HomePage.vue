<template>
    <div class="home-page">
        <TagSelector @tag-change="handleTagSelectorChange" />
        <ContentTags @tag-change="handleContentTagsChange" @print-tags="printSelectedTags" />
        <!-- 传递 videos 和 isLoading 数据给 VideoGallery 组件 -->
        <VideoGallery :videos="videos" :isLoading="isLoading" />
    </div>
</template>

<script>
import TagSelector from './TagSelector.vue';
import ContentTags from './ContentTags.vue';
import VideoGallery from './VideoGallery.vue';
import axios from 'axios';

export default {
    name: "HomePage",
    components: {
        TagSelector,
        ContentTags,
        VideoGallery
    },
    data() {
        return {
            tagSelectorTags: [],
            contentTagsTags: [],
            videos: [], // 存储从后端获取的视频数据
            isLoading: false,
            xhs_base_url: 'https://www.xiaohongshu.com/explore/' // 定义 xhs_base_url
        };
    },
    methods: {
        handleTagSelectorChange(tags) {
            this.tagSelectorTags = tags;
        },
        handleContentTagsChange(tags) {
            this.contentTagsTags = tags;
        },
        async printSelectedTags() {
            this.videos = [];
            this.isLoading = true;

            // 转换 tagSelectorTags 为字符串
            const keywords = this.tagSelectorTags.join(',');

            // 逐个发送 POST 请求
            for (const platform of this.contentTagsTags) {
                try {
                    const response = await axios.post('http://127.0.0.1:5000/start_crawler', {
                        PLATFORM: platform,
                        KEYWORDS: keywords
                    });

                    // 提取响应中的结果并添加 source 和 link 字段
                    const newVideos = response.data.results.map(video => {
                        const videoData = {
                            ...video,
                            source: platform // 添加 source 字段
                        };

                        // 如果平台为 'xhs'，添加 link 属性
                        if (platform === 'xhs') {
                            videoData.link = `${this.xhs_base_url}${video.note_id}?xsec_token=${video.xsec_token}`;
                        }

                        return videoData;
                    });

                    // 更新视频数据
                    this.videos = [...this.videos, ...newVideos];
                } catch (error) {
                    console.error(`请求 ${platform} 失败:`, error);
                }
            }

            this.isLoading = false;
        }
    }
};
</script>
<style>
.home-page {
    background-color: #202020;
    /* 深色背景 */
    color: #ffffff;
    /* 白色字体 */
    padding: 20px;
    min-height: 100vh;
    /* 使页面至少占满视口高度 */
    margin-top: 100px;

}
</style>