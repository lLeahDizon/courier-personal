<template>
  <!-- todo 根据状态展示 -->
  <Card>
    <p class="title">物流记录</p>
    <template>
      <LogisticsItem class-prefix="took" title="揽件" address="地址" personnel-info="接单员"/>
      <LogisticsItem class-prefix="delivery" title="送达" address="地址" personnel-info="收货人"/>
    </template>
    <p class="wait">等待收件中，请稍后</p>
  </Card>
</template>

<script>
import Card from '@/components/Card'
import LogisticsItem from '@/components/OrderDetail/LogisticsItem'

export default {
  name: 'LogisticsInfo',
  components: {LogisticsItem, Card}
}
</script>

<style lang="scss" scoped>
::v-deep .took-wrapper {
  color: #12a0ff;

  > .took-circle {
    background: #12a0ff;
  }
}

::v-deep .delivery-wrapper {
  color: #ffbc45;

  > .delivery-circle {
    background: #ffbc45;
  }
}

.title {
  font-size: 32px;
  color: #666666;
  line-height: 44px;
}

.wait {
  font-size: 32px;
  line-height: 44px;
  color: #12a0ff;
  text-align: center;
  padding-top: 66px;
  padding-bottom: 50px;
}
</style>
