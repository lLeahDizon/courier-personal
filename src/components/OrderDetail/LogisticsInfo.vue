<template>
  <Card>
    <p class="title">物流记录</p>
    <p v-if="info.transportSheetStatus === 10" class="wait">等待收件中，请稍后</p>
    <template v-else>
      <template v-if="[20, 30].includes(info.transportSheetStatus)">
        <LogisticsItem
          v-for="(item, index) in tookList"
          :key="index"
          class-prefix="took"
          :title="'揽件 '+item.nodeCreateTime"
          :address="item.dockingAddress"
          :personal-info="'接单员:'+item.driverName+' '+item.userPhone"/>
      </template>
      <LogisticsItem
        v-if="info.transportSheetStatus === 30"
        class-prefix="delivery"
        :title="'送达 '+deliveryItem.nodeCreateTime"
        :address="deliveryItem.dockingAddress"
        :personal-info="'收货人:'+deliveryItem.driverName+' '+deliveryItem.userPhone"/>
    </template>
  </Card>
</template>

<script>
import Card from '@/components/Card'
import LogisticsItem from '@/components/OrderDetail/LogisticsItem'

export default {
  name: 'LogisticsInfo',
  components: {LogisticsItem, Card},
  props: ['info'],
  data() {
    const list = JSON.parse(JSON.stringify(this.info.nodeInfoList))
    let deliveryItem = undefined
    if (this.info.transportSheetStatus === 30) {
      deliveryItem = list.pop()
    }
    return {
      tookList: list,
      deliveryItem
    }
  }
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
