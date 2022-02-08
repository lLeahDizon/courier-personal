<template>
  <article class="orderDetail">
    <p class="status">{{ orderStatus[info.transportSheetStatus].name }}</p>
    <OrderInfo :info="info"/>
    <template v-if="![0,40].includes(info.transportSheetStatus)">
      <LogisticsInfo v-if="info.nodeInfoList && info.nodeInfoList.length" :info="info"/>
      <BaseInfo :time="info.payTime" :number="info.orderNum"/>
      <Evaluate v-if="info.transportSheetStatus === 30"/>
    </template>
    <ModalEvaluate :evaluate="evaluate"/>
  </article>
</template>

<script>
import OrderInfo from '@/components/OrderDetail/OrderInfo'
import LogisticsInfo from '@/components/OrderDetail/LogisticsInfo'
import BaseInfo from '@/components/OrderDetail/BaseInfo'
import Evaluate from '@/components/OrderDetail/Evaluate'
import ModalEvaluate from '@/components/OrderDetail/ModalEvaluate'
import {$error, $loading} from '@/utils'
import {orderDetail} from '@/service'
import orderStatus from '@/constants/orderStatus'

export default {
  name: 'OrderDetail',
  components: {ModalEvaluate, Evaluate, BaseInfo, LogisticsInfo, OrderInfo},
  data() {
    return {
      orderStatus,
      info: {},
      evaluate: {
        type: 1,
        icon: 'evaluate-bad',
        title: '很糟糕'
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      const loading = $loading()
      const {id} = this.$route.params
      try {
        this.info = await orderDetail(id)
      } catch (e) {
        $error(e)
      } finally {
        loading.clear()
      }
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
