import request from "@/utils/request";

// 二维码登录

// 1.生成Key
export function getQrKey() {
  return request({
    url: '/login/qr/key'
  })
}

// 2.二维码生成
export function getQrData(key) {
  return request({
    url: '/login/qr/create?qrimg=true&key=' + key
  })
}

// 3.检测扫码状态
export function getQrStatus(key) {
  return request({
    url: '/login/qr/check?key=' + key
  })
}

// 获取登录状态
export function getLoginStatus() {
  return request({
    url: '/login/status?cookie='
  })
}

// 登录后，获取账号信息
export function getAccountInfo() {
  return request({
    url: '/user/account?cookie='
  })
}

// 登录后，获取用户信息：歌单，收藏，mv, dj 数量
export function getUserInfo() {
  return request({
    url: '/user/subcount?cookie='
  })
}

// 获取用户详情
export function getUserDetail(uid) {
  return request({
    url: '/user/detail?uid=' + uid
  })
}

//获取喜欢音乐列表
export function getLikeMusicList(uid) {
  return request({
    url: '/likelist?uid=' + uid + '&cookie='
  })
}

// 获取用户歌单
export function getUserPlaylist(uid,limit=30,offset=0) {
  return request({
    url: '/user/playlist',
    params: {
      uid,
      limit,
      offset,
      cookie: 'ture'
    }
  })
}

// 退出登录
export function logout() {
  return request({
    url: '/logout?cookie='
  })
}