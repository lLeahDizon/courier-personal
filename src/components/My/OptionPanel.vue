<template>
  <div class="optionPanel">
    <div v-for="(item, index) in menuList" :key="index" class="optionItem" @click="item.event">
      <Icon :name="item.icon"/>
      <span class="title">{{ item.title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [
        {
          icon: 'my-order',
          title: '我的订单',
          event: this.handle2Order
        },
        {
          icon: 'my-address',
          title: '地址信息',
          event: this.handle2Address
        },
        {
          icon: 'my-invoice',
          title: '申请发票',
          event: this.handle2Invoice
        }
      ]
    }
  },
  methods: {
    handle2Order() {
      this.$router.push({name: 'order'})
    },
    handle2Address() {
      console.log('---handle2Address')
    },
    handle2Invoice() {
      console.log('---handle2Invoice')
    }
  }
}
</script>

<style lang="scss" scoped>
.optionPanel {
  background: white;
  box-shadow: 0 4px 20px 0 rgba(51, 51, 51, 0.05);
  border-radius: 20px;
  padding: 40px 56px;
  display: flex;
  justify-content: space-between;

  > .optionItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 64px;

    > .title {
      padding-top: 16px;
      font-size: 28px;
      color: #888888;
      line-height: 38px;
    }
  }
}
</style>
