<template>
  <div class="home-top-nav">
    <van-icon name="wap-nav" size="0.8rem"/>
    <div class="nav-list">
      <span>我的</span>
      <span class="active">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <van-icon name="search" size="0.7rem"/>
  </div>
</template>

<script>
  export default { name: 'TopNav' } 
</script>


<style lang="scss" scoped>
  .home-top-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .nav-list {
      span {
        padding: 0 10px;
        font-size: 18px;
        &.active {
          font-weight: bold;
          color: #dd001b;
        }
      }
    }
  }
</style>

