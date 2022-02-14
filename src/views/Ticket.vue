<template>
  <div class="ticket-wrapper">
    <div class="ticket">
      <p class="title">您已成功下单</p>
      <p class="btn" @click="onClick">点击继续＞</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ticket',
  mounted() {
    const mchData = {action: 'onIframeReady', displayStyle: 'SHOW_CUSTOM_PAGE'}
    const postData = JSON.stringify(mchData)
    parent.postMessage(postData, 'https://payapp.weixin.qq.com')
  },
  methods: {
    onClick() {
      const {VUE_APP_DOMAIN, VUE_APP_BASE_NAME} = process.env
      const mchData = {
        action: 'jumpOut',
        jumpOutUrl: `${VUE_APP_DOMAIN}${VUE_APP_BASE_NAME}/order` //跳转的页面
      }
      const pData = JSON.stringify(mchData)
      parent.postMessage(pData, 'https://payapp.weixin.qq.com')
    }
  }
}
</script>

<style lang="scss" scoped>
.ticket-wrapper {
  display: flex;
  justify-content: center;
  padding-top: 40px;

  .ticket {
    width: 660px;
    height: 400px;
    background: url("~@/assets/icons/ticket.png") no-repeat;
    background-size: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 160px;
    padding-bottom: 62px;

    .title {
      font-size: 44px;
      font-weight: bold;
      color: #000000;
      line-height: 62px;
      padding-bottom: 66px;
    }

    .btn {
      font-size: 36px;
      color: #12A0FF;
      line-height: 50px;
    }
  }
}
</style>
