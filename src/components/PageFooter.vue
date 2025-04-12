<template>
    <footer class="footer">
        <div class="footer-content">
            <p class="copyright">© 2025 Better Surf. 开源项目，MIT 许可证.</p>
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
    /* 深色背景 */
    color: #838383;
    /* 白色文字 */
    padding: 20px;
    text-align: left;
    /* 修改为左对齐 */
}

.footer-content {
    max-width: 1200px;
    margin: 0 auto;
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
