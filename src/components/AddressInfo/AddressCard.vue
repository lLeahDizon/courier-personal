<template>
  <div class="box-wrapper">
    <Card class-prefix="AddressCard">
      <div class="top">
        <span>詹金傲</span>
        <span class="tel">18844113113</span>
      </div>
      <div class="bottom">
        <div class="left">浙江省杭州市余杭区五常街道余杭塘路余杭塘路余杭塘路余杭塘路1005某某小区19幢802</div>
        <div class="right">编辑</div>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/Card'

export default {
  props: ['info'],
  components: {Card},
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
@import "~@/styles/mixins.scss";

.box-wrapper {
  margin-bottom: 24px;

  ::v-deep .AddressCard-wrapper {
    padding: 24px;
    box-shadow: none;
  }

  .top {
    display: flex;
    align-items: baseline;
    font-size: 32px;
    font-weight: bold;
    color: #333333;
    line-height: 44px;

    > .tel {
      padding-left: 20px;
      font-size: 26px;
      font-weight: normal;
      color: #888888;
      line-height: 37px;
    }
  }

  .bottom {
    display: flex;
    padding-top: 16px;
    color: #333333;

    > .left {
      padding-right: 24px;
      font-size: 28px;
      line-height: 40px;
    }

    > .right {
      display: flex;
      align-items: center;
      padding-left: 24px;
      min-width: 80px;
      font-size: 26px;
      line-height: 37px;
      @include border-1px($color: #E6E6E6, $direction: left);
    }
  }
}
</style>
