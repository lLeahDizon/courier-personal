<template>
  <label class="inputPanel" :class="classPrefix && `${classPrefix}-wrapper`">
    <span class="circle" :class="classPrefix && `${classPrefix}-circle`"/>
    <input :value="value" class="content" :class="classPrefix && `${classPrefix}-input`" :placeholder="placeholder" @input="onValueChanged($event.target.value)">
  </label>
</template>

<script>
export default {
  props: ['classPrefix', 'placeholder','value'],
  methods: {
    onValueChanged(value) {
      this.$emit('update:value', value)
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
