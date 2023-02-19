<template>
  <div class="icon-nav">
    <div class="icon-nav-item" v-for="item in iconNavList" :key="item.title">
      <van-icon 
        :name="item.icon" 
        :size="item.size || size" 
        :color="item.color || iconColor"
      />
      <span :style="{color: textColor}">{{ item.title }}</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'IconNav',
  props: {
    iconNavList: {
      type: Array,
      default: []
    },
    textColor: {
      type: String,
      default: '#000'
    },
    iconColor: {
      type: String,
      default: '#fff'
    },
    size: {
      type: String,
      default: '0.7rem'
    }
  }
}

</script>

<style lang="scss" scoped>
  .icon-nav {
    display: flex;
    justify-content: space-between;
    .icon-nav-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      >span {
        font-size: 14px;
      }
    }
  }
</style>



