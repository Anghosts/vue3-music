// 获取滚动条到顶部的距离

export default function getScrollTop() {
    let scrollPos;

    if (window.pageYOffset) {
        scrollPos = window.pageYOffset;
    } else if (document.compatMode && document.compatMode != 'BackCompat') {
        scrollPos = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollPos = document.body.scrollTop;
    }
    return scrollPos ? parseInt(scrollPos.toFixed(0)) : 0;
};

