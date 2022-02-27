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
      <van-image v-for="(item,index) in info.imgUrlList" :key="index" lazy-load :src="item">
        <template v-slot:error>正在加载</template>
      </van-image>
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
  padding-top: 30px;

  ::v-deep .van-image {
    width: 160px;
    height: 160px;
    margin-right: 20px;
  }
}
</style>
