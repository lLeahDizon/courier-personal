<template>
  <article class="orderDetail">
    <p class="status">状态</p>
    <OrderInfo/>
    <LogisticsInfo/>
    <BaseInfo/>
    <Evaluate/>
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

export default {
  name: 'OrderDetail',
  components: {ModalEvaluate, Evaluate, BaseInfo, LogisticsInfo, OrderInfo},
  data() {
    return {
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
      console.log('---init')
      const loading = $loading()
      const {id} = this.$route.params
      try {
        const data = await orderDetail(id)
        console.log(data)
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
