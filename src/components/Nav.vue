<template>
  <nav>
    <router-link to="">
      <Icon/>
      首页
    </router-link>
    <router-link to="">
      <Icon/>
      订单
    </router-link>
    <router-link to="">
      <Icon/>
      我的
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'Nav'
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
</style>
