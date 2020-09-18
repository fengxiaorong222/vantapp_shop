<template>
  <van-tabbar v-model="TabActive">
    <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
    <van-tabbar-item icon="medal-o">专题</van-tabbar-item>
    <van-tabbar-item icon="apps-o" to="/category">分类</van-tabbar-item>
    <van-tabbar-item icon="shopping-cart-o">购物车</van-tabbar-item>
    <van-tabbar-item icon="user-o">我的</van-tabbar-item>
  </van-tabbar>
</template>
<script>
export default {
  data() {
    return {
      TabActive: 0,
    };
  },
  mounted() {
    switch (this.$route.path) {
      case "/category":
        this.TabActive = 2;
        break;
      case "/":
        this.TabActive = 0;
        break;
      default:
        this.TabActive = 0;
    }
  },
};
</script>