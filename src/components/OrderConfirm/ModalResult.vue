<template>
  <van-popup v-model="visible" class="modal-wrapper" round :close-on-click-overlay="false" get-container="#app">
    <Icon name="certification-close" @click="onClose"/>
    <Icon class="result-icon" name="result-fail"/>
    <p class="title">订单发布成功</p>
    <p class="desc">感谢您使用环球旅递</p>
    <p class="desc">我们将在90分钟内上门取件！</p>
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
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-wrapper {
  text-align: center;
  min-width: 580px;
  padding: 48px 0;

  .icon {
    font-size: 30px;
    position: absolute;
    right: 24px;
    top: 24px;
  }

  > .result-icon {
    position: relative;
    font-size: 108px;
    right: auto;
    top: auto;
  }

  > .title {
    padding-top: 20px;
    padding-bottom: 40px;
    font-size: 36px;
    font-weight: 500;
    color: #333333;
    line-height: 50px;
  }

  > .desc {
    font-size: 28px;
    color: #333333;
    line-height: 40px;
  }
}
</style>
