<template>
  <div class="inputPanel" :class="classPrefix && `${classPrefix}-wrapper`" @click="onClick">
    <div class="circle" :class="classPrefix && `${classPrefix}-circle`"/>
    <div class="content" :class="classPrefix && `${classPrefix}-input`">
      {{ placeholder }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['classPrefix', 'placeholder'],
  methods: {
    onClick() {
      this.$emit('goToInfo')
    }
  }
}
</script>

<style lang="scss" scoped>
.inputPanel {
  display: flex;
  align-items: center;
  padding: 50px 20px;
  background: #f5f5f5;
  border-radius: 20px;

  .circle {
    min-width: 16px;
    min-height: 16px;
    border-radius: 50%;
  }

  .content {
    background: transparent;
    border: none;
    font-size: 38px;
    line-height: 54px;
    padding-left: 24px;
    color: #666;
  }
}
</style>
