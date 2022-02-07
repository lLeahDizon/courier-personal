<template>
  <Card>
    <p v-if="time" class="item">支付时间：{{ time }}</p>
    <p v-if="number" class="item">订单编号：{{ number }}</p>
  </Card>
</template>

<script>
import Card from '@/components/Card'

export default {
  name: 'BaseInfo',
  components: {Card},
  props: ['time', 'number']
}
</script>

<style lang="scss" scoped>
.item {
  font-size: 26px;
  color: #666666;
  line-height: 36px;

  &:not(:last-child) {
    padding-bottom: 20px;
  }
}
</style>
