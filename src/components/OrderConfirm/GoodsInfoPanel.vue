<template>
  <Card>
    <div class="item-wrapper">
      <span>配送距离</span>
      <span>{{ info.distance }}km</span>
    </div>
    <div class="item-wrapper">
      <span>物品信息</span>
      <span>{{ info.itemDescription }}，{{ info.weight }}公斤</span>
    </div>
    <div class="item-wrapper">
      <span>期望取件时间</span>
      <span>{{ info.deliverDateTimeStr }}</span>
    </div>
    <div class="item-wrapper">
      <span>期望送达时间</span>
      <span>{{ info.receiptDateTimeStr }}</span>
    </div>
    <div class="item-wrapper">
      <span>保价</span>
      <span>￥{{ info.insurancePrice || 0 }}</span>
    </div>
    <div class="img-wrapper">
      <img v-for="(item,index) in info.imgUrlList" :key="index" :src="item" alt="">
    </div>
  </Card>
</template>

<script>
import Card from '@/components/Card'

export default {
  components: {Card},
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";

.item-wrapper {
  display: flex;
  justify-content: space-between;
  padding: 30px 0;
  font-size: 32px;
  line-height: 44px;
  color: #333333;
  @include border-1px(#e6e6e6, 0, bottom);

  &:first-child {
    padding-top: 0;
  }
}

.img-wrapper {
  img {
    width: 160px;
    height: 160px;
    margin-right: 20px;
    margin-top: 30px;
  }
}
</style>
