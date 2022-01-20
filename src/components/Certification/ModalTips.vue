<template>
  <van-popup v-model="visible" class="modal-wrapper" round :close-on-click-overlay="false" get-container="#app">
    <Icon name="certification-close" @click="onClose"/>
    <h1 class="title">实名认证</h1>
    <p class="desc">人脸识别验证您的身份信息，请确保为&nbsp;<span class="name">王小</span>&nbsp;本人操作</p>
    <button class="btn" @click="onCertificate">确认</button>
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
    onCertificate() {
      this.onClose()
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-wrapper {
  padding: 36px 80px 40px;
  text-align: center;
  min-width: 580px;

  > .icon {
    position: absolute;
    top: 24px;
    right: 24px;
    font-size: 30px;
  }

  > .title {
    font-size: 36px;
    font-weight: 500;
    color: #333333;
    line-height: 50px;
  }

  > .desc {
    padding: 40px 0 60px;
    color: #333333;
    font-size: 28px;
    line-height: 40px;

    > .name {
      font-weight: bold;
    }
  }

  > .btn {
    background: #12a0ff;
    border-radius: 50px;
    width: 100%;
    padding: 20px 0;
    font-size: 36px;
    color: #FFFFFF;
    line-height: 42px;
  }
}
</style>
