<template>
  <div class="LogisticsItem">
    <div class="title-wrapper" :class="classPrefix && `${classPrefix}-wrapper`">
      <span class="circle" :class="classPrefix && `${classPrefix}-circle`"/>
      <span class="title">{{ title }}</span>
    </div>
    <p class="detail">{{ address }}</p>
    <p class="detail">{{ personalInfo }}</p>
  </div>
</template>

<script>
export default {
  name: 'LogisticsItem',
  props: ['classPrefix', 'title', 'address', 'personalInfo']
}
</script>

<style lang="scss" scoped>
.LogisticsItem {
  padding-top: 30px;

  > .title-wrapper {
    display: flex;
    align-items: center;
    font-size: 32px;
    line-height: 44px;

    > .circle {
      width: 16px;
      height: 16px;
      border-radius: 50%;
    }

    > .title {
      padding-left: 16px;
    }
  }

  > .detail {
    padding-left: 32px;
    padding-top: 10px;
    font-size: 26px;
    line-height: 36px;
    color: #333333;
  }
}
</style>
