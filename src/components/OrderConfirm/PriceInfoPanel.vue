<template>
  <Card>
    <div class="item-wrapper">
      <span>配送价</span>
      <span>￥120</span>
    </div>
    <div class="item-wrapper">
      <span>保价费</span>
      <span>￥120</span>
    </div>
    <div class="item-wrapper">小计&nbsp;<span class="total">￥369.00</span></div>
  </Card>
</template>

<script>
import Card from '@/components/Card'

export default {
  components: {Card}
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
    justify-content: flex-end;
    padding-bottom: 0;
    border: none;
  }

  .total {
    color: #F12323;
  }
}
</style>
