<template>
  <i class="iconfont" :class="name" :style="{fontSize: size, color}"></i>
</template>

<script>
  export default {
    name: 'BaseIcon',
    props: {
      size: {
        type: String,
        default: '0.7rem'
      },
      color: {
        type: String,
        default: '#000',
      },
      name: {
        type: String,
        default: ''
      }
    }
  }

</script>

<style lang="scss" scoped>

</style>
