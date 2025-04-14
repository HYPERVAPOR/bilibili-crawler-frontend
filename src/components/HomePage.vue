<template>
    <div class="home-page">
        <TagSelector @tag-change="handleTagSelectorChange" />
        <ContentTags @print-tags="printSelectedTags" />
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
        };
    },
    methods: {
        handleTagSelectorChange(tags) {
            this.tagSelectorTags = tags;
        },
        async printSelectedTags() {
            this.videos = [];
            this.isLoading = true;
            try {
                // 发送 POST 请求
                const response = await axios.post('http://47.109.190.32:3001/api/scrape', {
                    tags: this.tagSelectorTags
                });

                // 遍历响应中的每个对象的 result 数组，并将其扁平化加入到 this.videos 中
                response.data.forEach(item => {
                    if (Array.isArray(item.result)) {
                        this.videos.push(...item.result);
                    }
                });
            } catch (error) {
                console.error('请求失败:', error);
            } finally {
                this.isLoading = false; // 确保无论请求成功或失败都停止加载状态
            }
        }

    }
};
</script>
<style>
.home-page {
    background-color: #111519;
    color: #D9F2FF;
    padding: 20px;
    min-height: 100vh;
    margin-top: 100px;

}
</style>