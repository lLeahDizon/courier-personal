<template>
  <nav>
    <router-link v-for="(item,index) in navList" :key="index" :to="item.to" class="item" active-class="selected">
      <Icon :name="item.icon+($route.name === item.value ? 'selected' : 'default')"/>
      <span>{{ item.title }}</span>
    </router-link>
  </nav>
</template>

<script>
import navList from '@/constants/navList'
// todo 首页 svg 缺少
export default {
  name: 'Nav',
  data () {
    return {
      navList,
      activeIcon: 'home-default'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

nav {
  display: flex;
  flex-direction: row;
  font-size: 20px;
  padding: 10px 0;
  color: #A0A2A3;

  > .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 33.33333%;

    span{
      line-height: 28px;
    }

    .icon {
      width: 54px;
      height: 54px;
      margin-bottom: 4px;
    }
  }

  > .item.selected{
    color: #12a0ff;
  }
}
</style>
