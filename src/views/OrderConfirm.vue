<template>
  <div class="OrderConfirm-wrapper">
    <BaseInfoPanel/>
    <GoodsInfoPanel/>
    <PriceInfoPanel/>
    <PayPanel/>
    <footer>
      <button class="btn">马上结算</button>
      <p class="total">合计：<span class="price">￥369.00</span></p>
    </footer>
    <ModalResult :show="showDialog"/>
  </div>
</template>

<script>
import BaseInfoPanel from '@/components/OrderConfirm/BaseInfoPanel'
import GoodsInfoPanel from '@/components/OrderConfirm/GoodsInfoPanel'
import PayPanel from '@/components/OrderConfirm/PayPanel'
import PriceInfoPanel from '@/components/OrderConfirm/PriceInfoPanel'
import ModalResult from '@/components/OrderConfirm/ModalResult'

export default {
  components: {ModalResult, PriceInfoPanel, PayPanel, GoodsInfoPanel, BaseInfoPanel},
  data() {
    return {
      showDialog: false
    }
  }
}
</script>

<style lang="scss" scoped>
.OrderConfirm-wrapper {
  position: relative;
  padding: 40px 40px 148px;
  background: #f7f7f7;
  min-height: 100vh;

  > footer {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    position: fixed;
    background: white;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 18px 30px;

    > .btn {
      background: #12A0FF;
      border-radius: 37px;
      padding: 16px 44px;
      font-size: 28px;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 40px;
    }

    > .total {
      padding-right: 40px;
      font-size: 32px;
      color: #333333;
      line-height: 44px;

      > .price {
        color: #F12323;
      }
    }
  }
}
</style>
