import request from "@/utils/request";
import useType from '@/utils/userType';

// 获取轮播图数据
export function getBanner() {
  return request({
    method: 'GET',
    url: '/banner?type=' + useType
  })
}

// 获取推荐歌单数据
export function getPlayList() {
  return request({
    method: 'GET',
    url: '/personalized?limit=10'
  })
}