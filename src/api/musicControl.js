import request from "@/utils/request";

// 获取新音乐
export function getNewMusic(limit) {
  return request({
    url: '/personalized/newsong?limit=' + limit
  })
}