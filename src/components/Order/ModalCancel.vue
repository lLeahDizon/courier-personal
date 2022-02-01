<template>
  <van-popup
    v-model="visible"
    class="modal-wrapper"
    round
    :close-on-click-overlay="false"
    get-container="#app">
    确认继续取消订单吗？
    <div class="btn-wrapper">
      <button class="btn" @click="onClose">取消</button>
      <button class="btn outline" @click="onCancel">确认</button>
    </div>
  </van-popup>
</template>

<script>
export default {
  name: 'modalCancel',
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
    onCancel() {
      this.onClose()
      this.$emit('onClickCancel')
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-wrapper {
  text-align: center;
  width: 580px;
  color: #333333;
  padding: 48px 30px;
  font-size: 32px;
  line-height: 44px;

  .btn {
    border-radius: 50px;
    border: 1px solid #DDDDDD;
    width: 248px;
    padding: 20px;
    font-size: 36px;
    color: #333333;
    line-height: 44px;

    &-wrapper {
      padding-top: 56px;
      display: flex;
      justify-content: space-between;
    }

    &.outline {
      border: 1px solid #12A0FF;
      color: #12A0FF;
    }
  }
}
</style>
