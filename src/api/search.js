import request from "@/utils/request";

// 关键词搜索
export function getSearchList(kw) {
  return request({
    url: '/cloudsearch?keywords=' + kw
  })
}