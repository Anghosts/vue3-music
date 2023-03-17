<template>
  <div class="user-container">
    <Login v-if="!store.isLogin"/>
    <UserDetail v-else/>
  </div>
</template>

<script>
  import { useUser } from '@/store/user';
  import { getLoginStatus } from '@/api/user'
  import Login from './Login.vue';
  import UserDetail from './UserDetail.vue';

  export default {
    name: 'User',
    components: {
      Login,
      UserDetail
    },
    setup() {
      const store = useUser();

      // 判断登录状态
      isLogin();
      async function isLogin() {
        let {data: {profile}} = await getLoginStatus();
        store.isLogin = profile ? true : false;
      }

      return {
        store
      }
    }
  }

</script>

<style lang="scss" scoped>
.user-container {
  padding: 10px;
  padding-bottom: 68px;
  text-align: center;
}

</style>
