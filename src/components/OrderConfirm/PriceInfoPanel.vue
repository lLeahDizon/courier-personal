<template>
  <Card>
    <div class="item-wrapper">
      <span>配送价</span>
      <span>￥{{ transportAmount }}</span>
    </div>
    <div class="item-wrapper">
      <span>保价费</span>
      <span>￥{{ insuredAmount }}</span>
    </div>
    <div class="item-wrapper">小计&nbsp;<span class="total">￥{{ allAmount }}</span></div>
  </Card>
</template>

<script>
import Card from '@/components/Card'

export default {
  components: {Card},
  props: ['transportAmount', 'insuredAmount', 'allAmount'],
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";

.item-wrapper {
  display: flex;
  font-size: 32px;
  line-height: 44px;
  color: #333333;
  justify-content: flex-end;
  padding: 30px 0 0;

  &:first-child {
    padding-top: 0;
  }

  &:not(:last-child) {
    justify-content: space-between;
    padding-bottom: 30px;
    @include border-1px(#e6e6e6, 0, bottom);
  }

  .total {
    color: #F12323;
  }
}
</style>
