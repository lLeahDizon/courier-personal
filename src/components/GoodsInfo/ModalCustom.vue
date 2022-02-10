<template>
  <van-popup
    round
    v-model="visible"
    class="modal-wrapper"
    position="bottom"
    get-container="#app"
    @close="onClose">
    <header>
      <Icon name="certification-close" @click="onClose"/>
    </header>
    <div class="content-wrapper">
      <p>如需寄送&nbsp;<span class="high-light">超过20公斤</span>&nbsp;的物品，</p>
      <p>请先咨询客服获取保价！</p>
      <img src="@/assets/icons/qr-code.png" alt="" @click="previewImg">
      <span>长按二维码联系客服</span>
      <button class="btn" @click="onClose">我知道了</button>
    </div>
  </van-popup>
</template>

<script>
export default {
  props: ['show'],
  data() {
    return {
      visible: false
    }
  },
  watch: {
    show(val) {
      this.visible = val
    }
  },
  methods: {
    onClose() {
      this.$emit('update:show', false)
    },
    previewImg() {
      // todo 缺少预览二维码
      console.log('---previewImg')
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-wrapper {
  padding: 30px 40px 40px;
  width: 100%;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 54px;

    .icon {
      font-size: 30px;
    }
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      font-size: 34px;
      color: #333333;
      line-height: 56px;

      > .high-light {
        color: #12a0ff;
      }
    }

    img {
      width: 384px;
      height: 384px;
      margin-top: 60px;
    }

    span {
      padding-top: 20px;
      padding-bottom: 124px;
      font-size: 28px;
      color: #666666;
      line-height: 40px;
    }

    .btn {
      width: 100%;
      background: #12A0FF;
      border-radius: 50px;
      padding: 20px 0;
      font-size: 36px;
      color: #FFFFFF;
      line-height: 44px;
    }
  }
}
</style>
