<template>
  <article class="orderDetail">
    <p class="status">状态</p>
    <OrderInfo/>
    <LogisticsInfo/>
    <BaseInfo/>
    <Evaluate/>
  </article>
</template>

<script>
import OrderInfo from '@/components/OrderDetail/OrderInfo'
import LogisticsInfo from '@/components/OrderDetail/LogisticsInfo'
import BaseInfo from '@/components/OrderDetail/BaseInfo'
import Evaluate from '@/components/OrderDetail/Evaluate'

export default {
  name: 'OrderDetail',
  components: {Evaluate, BaseInfo, LogisticsInfo, OrderInfo}
}
</script>

<style lang="scss" scoped>
.orderDetail {
  padding: 40px 30px;
  background: #f7f7f7;
  min-height: 100vh;

  > .status {
    font-size: 44px;
    line-height: 62px;
    color: #333333;
    font-weight: bold;
    padding-bottom: 30px;
  }
}
</style>
