<template>
  <div class="icon-nav">
    <div class="icon-nav-item" v-for="(item,index) in iconNavList" :key="index">
      <van-icon 
        :name="item.icon" 
        :size="item.size || size" 
        :color="item.color || iconColor"
        :style="item.style || ''"
      />
      <span :style="{color: textColor, 'font-size': textSize}">{{ item.title || '' }}</span>
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
    },
    textSize: {
      type: String,
      default: '14px'
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
      padding: 5px;
    }
  }
</style>



