<template>
  <Card>
    <div class="item-wrapper">
      <span>配送距离</span>
      <span>120km</span>
    </div>
    <div class="item-wrapper">
      <span>物品信息</span>
      <span>￥120</span>
    </div>
    <div class="item-wrapper">
      <span>期望取件时间</span>
      <span>￥120</span>
    </div>
    <div class="item-wrapper">
      <span>期望送达时间</span>
      <span>￥120</span>
    </div>
    <div class="item-wrapper">
      <span>保价</span>
      <span>￥120</span>
    </div>
  </Card>
</template>

<script>
import Card from '@/components/Card'
export default {
  components: {Card},
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
.item-wrapper {
  display: flex;
  justify-content: space-between;
  padding: 30px 0;
  border-bottom: 1px solid #e6e6e6;
  font-size: 32px;
  line-height: 44px;
  color: #333333;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
    border: none;
  }
}
</style>
