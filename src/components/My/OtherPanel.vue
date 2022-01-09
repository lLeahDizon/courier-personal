<template>
  <div class="otherPanel">
    <div v-for="(item, index) in menuList" :key="index" @click="item.event">
      <div>
        <Icon :name="item.icon"/>
        <span>{{ item.title }}</span>
      </div>
      <Icon/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [
        {
          icon: 'my-other',
          title: '其他功能入口',
          event: this.handle2Other
        },
        {
          icon: 'my-custom',
          title: '联系客服',
          event: this.handle2Custom
        },
        {
          icon: 'my-about',
          title: '关于环球旅递',
          event: this.handle2About
        }
      ]
    }
  },
  methods: {
    handle2Other() {
      console.log('---handle2Other')
    },
    handle2Custom() {
      console.log('---handle2Other')
    },
    handle2About() {
      console.log('---handle2Other')
    }
  }
}
</script>

<style lang="scss" scoped>
.otherPanel {
  margin-top: 30px;
  background: white;
  box-shadow: 0 4px 20px 0 rgba(51, 51, 51, 0.05);
  border-radius: 20px;
}
</style>
