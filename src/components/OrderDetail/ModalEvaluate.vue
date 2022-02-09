<template>
  <van-popup v-model="visible" class="modal-wrapper" round get-container="#app">
    <p class="title">感谢您的评价</p>
    <Icon :name="evaluate.iconActive"/>
    <p class="desc">{{ evaluate.title }}</p>
  </van-popup>
</template>

<script>
export default {
  name: 'ModalEvaluate',
  props: ['show', 'evaluate'],
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
  width: 580px;
  color: #333333;
  padding: 36px 0 48px;

  .icon {
    font-size: 96px;
  }

  > .title {
    font-weight: bold;
    font-size: 36px;
    line-height: 50px;
    padding-bottom: 48px;
  }

  > .desc {
    line-height: 36px;
    color: #888888;
    font-size: 26px;
    padding-top: 16px;
  }
}
</style>
