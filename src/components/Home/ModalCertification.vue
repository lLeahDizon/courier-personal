<template>
  <van-popup v-model="visible" class="modal-wrapper" round :close-on-click-overlay="false" get-container="#app">
    123123
  </van-popup>
</template>

<script>
export default {
  name: 'modalCertification',
  props: ['show'],
  data() {
    return {
      visible: true
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
  width: 650px;
  height: 932px;
}
</style>
