<template>
  <van-popup v-model="visible" round :close-on-click-overlay="false" get-container="#app">
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

</style>
