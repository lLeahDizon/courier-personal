<template>
  <Card>
    <div class="top">
      <UserInfo/>
      <Icon name="order-detail-to"/>
      <UserInfo/>
    </div>
    <div class="price-wrapper">
      实际支付：<span class="price">269</span>元
    </div>
  </Card>
</template>

<script>
import Card from '@/components/Card'
import UserInfo from '@/components/OrderDetail/UserInfo'

export default {
  name: 'OrderInfo',
  components: {UserInfo, Card}
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
