<template>
  <div class="OrderConfirm-wrapper">
    <BaseInfoPanel :info="info"/>
    <GoodsInfoPanel :info="info"/>
    <PriceInfoPanel
      :transport-amount="itemDetail.transportAmount"
      :insured-amount="itemDetail.insuredAmount"
      :all-amount="itemDetail.allAmount"
    />
    <PayPanel/>
    <footer>
      <button class="btn" @click="onClickPay">马上结算</button>
      <p class="total">合计：<span class="price">￥{{ itemDetail.realAmount }}</span></p>
    </footer>
    <ModalResult :show="showDialog" :pay-result="payResult" :order-id="orderId"/>
  </div>
</template>

<script>
import BaseInfoPanel from '@/components/OrderConfirm/BaseInfoPanel'
import GoodsInfoPanel from '@/components/OrderConfirm/GoodsInfoPanel'
import PayPanel from '@/components/OrderConfirm/PayPanel'
import PriceInfoPanel from '@/components/OrderConfirm/PriceInfoPanel'
import ModalResult from '@/components/OrderConfirm/ModalResult'
import {$error, $loading, getBrowserType, handlePay} from '@/utils'
import {initWeChatEnv} from '@/utils/weixin'
import {orderConfirmInfo, orderCreate} from '@/service'
import {ORDER_INFO_KEY} from '@/constants'

export default {
  components: {ModalResult, PriceInfoPanel, PayPanel, GoodsInfoPanel, BaseInfoPanel},
  created() {
    this.info = JSON.parse(localStorage.getItem(ORDER_INFO_KEY))
    const browserType = getBrowserType()
    if (browserType.weChat) {
      initWeChatEnv()
    }
    this.init()
  },
  data() {
    return {
      showDialog: false,
      payResult: false,
      orderId: 0,
      info: {},
      itemDetail: {}
    }
  },
  methods: {
    async init() {
      const loading = $loading()
      try {
        const {itemDetail} = await orderConfirmInfo({
          ...this.info,
          deliverDetailAddress: this.info.deliverDetailAddress + this.info.deliverNumber,
          receiptDetailAddress: this.info.receiptDetailAddress + this.info.receiptNumber
        })
        this.itemDetail = itemDetail
      } catch (e) {
        $error(e)
      } finally {
        loading.clear()
      }
    },
    async onClickPay() {
      try {
        // 新订单需要创建订单
        this.orderId = await orderCreate()
        await handlePay(this.orderId, res => {
          // 支付成功后的回调函数
          console.log('---success')
          console.log(res)
          this.payResult = true
          this.showDialog = true
        }, err => {
          console.log('---cancel')
          console.log(err)
          this.$router.replace({name: 'order'})
        }, res => {
          console.log('---fail')
          console.log(res)
          this.payResult = false
          this.showDialog = true
        })
      } catch (e) {
        $error(e)
      }
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
