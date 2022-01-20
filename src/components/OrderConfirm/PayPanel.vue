<template>
  <Card>
    <div class="pay-wrapper">
      <span class="title">支付方式</span>
      <div class="right">
        <Icon name="pay-wx"/>
        微信支付
      </div>
    </div>
  </Card>
</template>

<script>
import Card from '@/components/Card'

export default {
  components: {Card}
}
</script>

<style lang="scss" scoped>
.pay-wrapper {
  display: flex;
  justify-content: space-between;

  > .title {
    font-size: 32px;
    color: #333333;
    line-height: 45px;
  }

  > .right {
    display: flex;
    align-items: center;
    font-size: 32px;
    color: #333333;
    line-height: 45px;

    .icon {
      width: 34px;
      height: 30px;
      margin-right: 8px;
    }
  }
}
</style>
