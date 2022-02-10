<template>
  <article v-if="info" class="orderDetail">
    <p class="status">{{ orderStatus[info.transportSheetStatus].name }}</p>
    <OrderInfo :info="info"/>
    <template v-if="![0,40].includes(info.transportSheetStatus)">
      <LogisticsInfo v-if="info.nodeInfoList && info.nodeInfoList.length" :info="info"/>
      <BaseInfo :time="info.payTime" :number="info.orderNum"/>
      <Evaluate
        v-if="info.transportSheetStatus === 30 && !info.commentLevel"
        :transport-sheet-id="info.transportSheetId"
        @showModal="showModal"
      />
    </template>
    <ModalEvaluate :show.sync="modalEvaluateVisible" :evaluate="evaluate"/>
    <ModalResult :show="showDialog" :pay-result="payResult" :order-id="orderId"/>
  </article>
</template>

<script>
import OrderInfo from '@/components/OrderDetail/OrderInfo'
import LogisticsInfo from '@/components/OrderDetail/LogisticsInfo'
import BaseInfo from '@/components/OrderDetail/BaseInfo'
import Evaluate from '@/components/OrderDetail/Evaluate'
import ModalEvaluate from '@/components/OrderDetail/ModalEvaluate'
import {$error, $loading, getBrowserType} from '@/utils'
import {orderDetail, orderPay} from '@/service'
import orderStatus from '@/constants/orderStatus'
import ModalResult from '@/components/OrderConfirm/ModalResult'
import {initWeChatEnv} from '@/utils/weixin'

export default {
  components: {ModalResult, ModalEvaluate, Evaluate, BaseInfo, LogisticsInfo, OrderInfo},
  data() {
    const {id} = this.$route.params
    return {
      orderId: +id,
      showDialog: false,
      payResult: false,
      orderStatus,
      info: undefined,
      modalEvaluateVisible: false,
      evaluate: {}
    }
  },
  created() {
    const browserType = getBrowserType()
    if (browserType.weChat) {
      initWeChatEnv()
    }
    this.init()
  },
  methods: {
    async init() {
      const loading = $loading()
      const {id} = this.$route.params
      const {toPay = 'false'} = this.$route.query
      try {
        this.info = await orderDetail(id)
        JSON.parse(toPay) && await this.onClickPay(id)
      } catch (e) {
        $error(e)
      } finally {
        loading.clear()
      }
    },
    async onClickPay(orderId) {
      const loading = $loading()
      try {
        // 支付
        const obj = await orderPay(orderId)
        if (obj) {
          obj.package = obj.packageStr
          const req = JSON.parse(JSON.stringify(obj))
          delete req.packageStr
          console.log('---onClickPay')
          console.log(req)
          wx.chooseWXPay({
            ...req,
            success: res => {
              // 支付成功后的回调函数
              console.log('---success')
              console.log(res)
              this.payResult = true
              this.showDialog = true
            },
            cancel: err => {
              console.log('---cancel')
              console.log(err)
              this.$router.back()
            },
            fail: res => {
              console.log('---fail')
              console.log(res)
              this.payResult = false
              this.showDialog = true
            }
          })
        }
      } catch (e) {
        $error(e)
      } finally {
        loading.clear()
      }
    },
    showModal(evaluate) {
      this.modalEvaluateVisible = true
      this.evaluate = evaluate
      this.init()
    }
  }
}
</script>

<style lang="scss" scoped>
.orderDetail {
  padding: 40px 30px 50px;
  background: #f7f7f7;
  min-height: 100vh;

  > .status {
    font-size: 44px;
    line-height: 62px;
    color: #333333;
    font-weight: bold;
    padding-bottom: 30px;
  }
}
</style>
