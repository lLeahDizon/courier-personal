<template>
  <div class="card-wrapper" :class="classPrefix && `${classPrefix}-wrapper`">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['classPrefix']
}
</script>

<style lang="scss" scoped>
.card-wrapper {
  border-radius: 20px;
  background: #FFFFFF;
  box-shadow: 0 2px 20px 0 rgba(51, 51, 51, 0.1);
  padding: 20px 24px 30px 18px;

  &:not(:last-child) {
    margin-bottom: 30px;
  }
}
</style>
