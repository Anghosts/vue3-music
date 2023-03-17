// 获取滚动条到顶部的距离

export default function getScrollTop(dom) {
    let scrollPos;

    if (dom.pageYOffset) {
        scrollPos = dom.pageYOffset;
    } else if (dom.compatMode && dom.compatMode != 'BackCompat') {
        scrollPos = dom.scrollTop;
    } else if (dom.body) {
        scrollPos = dom.scrollTop;
    }
    return scrollPos ? parseInt(scrollPos.toFixed(0)) : 0;
};

