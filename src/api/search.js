import request from "@/utils/request";

// 关键词搜索
export function getSearchList(kw, limit=30) {
  return request({
    url: '/cloudsearch?keywords=' + kw + '&limit=' + limit
  })
}