<template>
    <div class="tag-selector">
        <div class="categories">
            <div v-for="(category, index) in categories" :key="index" class="category">
                <h3>{{ category.name }}</h3>
                <div class="tags">
                    <span v-for="tag in category.tags" :key="tag" class="tag"
                        :class="{ selected: selectedTags.includes(tag) }" @click="toggleTag(tag)">
                        {{ tag }}
                    </span>
                </div>
            </div>
        </div>

        <div class="custom-tags">
            <h3>自定义 🔧</h3>
            <div class="tags custom-tags-content">
                <span v-for="(tag, index) in customTags" :key="tag" class="tag"
                    :class="{ selected: selectedTags.includes(tag) }" @click="removeCustomTag(index)">
                    {{ tag }}
                </span>
                <div class="input-wrapper">
                    <span v-if="!isInputVisible" class="add-tag" @click="showInput">+</span>
                    <input v-if="isInputVisible" ref="tagInput" v-model="newTag" @keyup.enter="addCustomTag"
                        @blur="hideInput" placeholder="输入自定义标签" :class="{ active: isInputVisible }" />
                </div>
                <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
            </div>
        </div>
        <hr class="divider" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            categories: [
                {
                    name: '科技 💻',
                    tags: ['人工智能', '区块链', '编程', '大语言模型']
                },
                {
                    name: '求职 👔',
                    tags: ['面试经验', '刷题技巧', '实习内推', 'offer爆料']
                },
                {
                    name: '娱乐 🎮',
                    tags: ['游戏', '宠物', '动漫', '影视', '体育', '美食']
                },
                {
                    name: '艺术 🎨',
                    tags: ['音乐', '电影', '吉他', '风景', '摄影', '美术']
                }
            ],
            selectedTags: [],
            customTags: [],
            newTag: '',
            isInputVisible: false,
            errorMessage: ''
        };
    },
    methods: {
        toggleTag(tag) {
            const index = this.selectedTags.indexOf(tag);
            if (index === -1) {
                this.selectedTags.push(tag);
            } else {
                this.selectedTags.splice(index, 1);
            }
            this.$emit('tag-change', this.selectedTags);
        },
        showInput() {
            this.isInputVisible = true;
            this.$nextTick(() => {
                this.$refs.tagInput.focus();
            });
        },
        hideInput() {
            this.isInputVisible = false;
            this.newTag = '';
            this.errorMessage = '';
        },
        addCustomTag() {
            this.errorMessage = '';
            if (this.newTag.length > 50) {
                this.errorMessage = '输入长度不能超过50个字符';
                return;
            }
            const filteredTag = this.filterInput(this.newTag);
            if (filteredTag && !this.customTags.includes(filteredTag)) {
                this.customTags.push(filteredTag);
                this.selectedTags.push(filteredTag);
                this.hideInput();
            }
            this.$emit('tag-change', this.selectedTags);
        },
        removeCustomTag(index) {
            const tagToRemove = this.customTags[index];
            this.customTags.splice(index, 1);
            const selectedIndex = this.selectedTags.indexOf(tagToRemove);
            if (selectedIndex !== -1) {
                this.selectedTags.splice(selectedIndex, 1);
            }
            this.$emit('tag-change', this.selectedTags);
        },
        filterInput(input) {
            return input.replace(/[<>;'"`]/g, '');
        }
    }
};
</script>

<style>
.tag-selector {
    padding: 0px;
    border-radius: 0px;
}

.categories {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    width: 85%;
    margin: 0 auto;
}

.category {
    padding: 15px;
    border-radius: 0px;
    margin: 0;
    flex-grow: 1;
    flex-basis: 0;
}

h3 {
    color: #fff;
    margin-bottom: 10px;
}

.tags {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 5px;
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
    height: 40px;
}

.tag:hover {
    transform: scale(1.05);
    background-color: #414141;
}

.tag.selected {
    background-color: #aa1e67;
    border: 2px solid #d5006d;
    box-shadow: 0 0 10px rgba(213, 0, 109, 0.7);
}

.tag.selected:hover {
    box-shadow: 0 0 15px rgba(213, 0, 109, 0.9);
}

.custom-tags {
    position: relative;
    margin-top: 20px;
    padding: 15px;
}

.custom-tags-content {
    width: 85%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}

.add-tag {
    background-color: #333;
    color: #fff;
    padding: 0 20px;
    border-radius: 20px;
    cursor: pointer;
    font-size: 20px;
    transition: all 0.3s ease;
    height: 40px;
    /* 设置与.tag相同的高度 */
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.add-tag:hover {
    background-color: #444;
    transform: scale(1.05);
}

.input-wrapper {
    display: flex;
    align-items: center;
}

input {
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    background-color: #333;
    color: #fff;
    transition: all 0.3s ease;
    height: 40px;
    /* 设置与.tag相同的高度 */
    width: 0;
    opacity: 0;
}

input.active {
    width: 150px;
    opacity: 1;
    padding: 10px 20px;
}

input:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgb(146, 4, 70);
}

.error-message {
    color: #ff4444;
    font-size: 12px;
    margin-left: 10px;
    height: 40px;
    /* 与.tag和输入框保持一致 */
    display: inline-flex;
    align-items: center;
}

.divider {
    border: none;
    height: 1px;
    background-color: rgb(79, 79, 79);
    width: 80%;
    margin: 20px auto;
}
</style>
