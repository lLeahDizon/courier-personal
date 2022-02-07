<template>
  <Card>
    <div class="top">
      <UserInfo :name="info.deliverName" :address="info.deliverAddress"/>
      <Icon name="order-detail-to"/>
      <UserInfo :name="info.receiptName" :address="info.receiptAddress"/>
    </div>
    <div v-if="info.transportSheetStatus !== 40" class="price-wrapper">
      {{ info.transportSheetStatus === 0 ? orderStatus[info.transportSheetStatus].name : '实际支付' }}：<span class="price">{{ info.realAmount }}</span>元
    </div>
  </Card>
</template>

<script>
import Card from '@/components/Card'
import UserInfo from '@/components/OrderDetail/UserInfo'
import orderStatus from '@/constants/orderStatus'

export default {
  name: 'OrderInfo',
  props: ['info'],
  components: {UserInfo, Card},
  data() {
    return {
      orderStatus
    }
  }
}
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 30px;

  .icon {
    font-size: 48px;
  }
}

.price-wrapper {
  font-size: 26px;
  color: #666666;
  line-height: 36px;

  > .price {
    font-size: 36px;
    color: #f12323;
  }
}
</style>
