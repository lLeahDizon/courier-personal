<template>
  <Card>
    <p class="title">物流记录</p>
    <p v-if="info.transportSheetStatus === 10" class="wait">等待收件中，请稍后</p>
    <template v-else>
      <LogisticsItem v-if="[20, 30].includes(info.transportSheetStatus)" class-prefix="took" title="揽件" address="地址" personnel-info="接单员"/>
      <LogisticsItem v-if="info.transportSheetStatus === 30" class-prefix="delivery" title="送达" address="地址" personnel-info="收货人"/>
    </template>
  </Card>
</template>

<script>
import Card from '@/components/Card'
import LogisticsItem from '@/components/OrderDetail/LogisticsItem'

export default {
  name: 'LogisticsInfo',
  components: {LogisticsItem, Card},
  props: ['info']
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
