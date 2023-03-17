import request from "@/utils/request";

// 获取音乐歌词
export function getMusicLyric(id) {
  return request({
    url: '/lyric?id=' + id
  })
}