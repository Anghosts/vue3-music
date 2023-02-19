import request from '@/utils/request';

// 获取歌单详情数据
export function getPlayListDetail(id) {
  return request({
    url: '/playlist/detail?id=' + id
  })
}

// 获取歌单全部歌曲信息
export function getAllMusic(id, limit=10, offset=0) {
  return request({
    url: '/playlist/track/all',
    params: {
      id, limit, offset
    }
  })
}