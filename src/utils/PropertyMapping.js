//PropertyMapping.js
const videoPropertyMapping = {
  dy: {
    title: "video.desc",
    cover: "video.video.cover.url_list[0]",
    duration: "video.video.duration",
    views: "video.statistics.share_count",
    author: "video.author.nickname",
    link: "video.share_info.share_url",
  },
  bili: {
    title: "video.title",
    cover: "video.cover",
    duration: "video.duration",
    views: "video.views",
    author: "video.author",
    link: "video.link",
  },
};

const zhihuPropertyMapping = {
  zhihu: {
    title: "item.title",
    comments: "item.comment_count",
    time: "item.created_time",
    desc: "item.desc",
    likes: "item.voteup_count",
    link: "item.content_url",
  },
};

const xhsPropertyMapping = {
  xhs: {
    title: "item.title",
    cover: "item.image_list[0].url_default",
    comments: "item.interact_info.comment_count",
    time: "item.last_update_time",
    desc: "item.desc",
    likes: "item.interact_info.liked_count",
    link: "item.link",
    author: "item.user.nickname",
  },
};

export { videoPropertyMapping, zhihuPropertyMapping, xhsPropertyMapping };
