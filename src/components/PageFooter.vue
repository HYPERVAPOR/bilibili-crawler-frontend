<template>
    <footer class="footer">
        <div class="footer-content">
            <p class="copyright">© 2025 bilibili-crawler. 开源项目，MIT 许可证.</p>
            <div class="contact-info">
                <p>邮箱: <a :href="'mailto:' + email">{{ email }}</a></p>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    data() {
        return {
            email: 'liuzhening_roeh@163.com' // 替换为你的邮箱
        };
    }
};
</script>

<style scoped>
.footer {
    background: #272727;
    color: #838383;
    padding: 20px;
    text-align: left;
    position: fixed;
    /* 固定定位 */
    bottom: 0;
    /* 距离底部0 */
    left: 0;
    /* 距离左边0 */
    width: 100%;
    /* 宽度为100% */
    margin: 0;
    /* 确保没有外边距 */
    box-sizing: border-box;
    /* 包含内边距和边框在内的宽度计算 */
}

.footer-content {
    max-width: 1200px;
    margin: 0;
    /* 确保没有外边距 */
    padding: 0 20px;
    /* 添加内边距以保持内容与边缘的距离 */
}

.copyright {
    margin: 0;
    font-size: 14px;
}

.contact-info p {
    margin: 5px 0;
    font-size: 14px;
}

.contact-info a {
    color: #838383;
    /* 链接颜色 */
    text-decoration: none;
}

.contact-info a:hover {
    text-decoration: underline;
    /* 鼠标悬停效果 */
}
</style>
