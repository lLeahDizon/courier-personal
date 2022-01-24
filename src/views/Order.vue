<template>
  <Layout class-prefix="layout">
    <Tabs @click="checkTab"/>
    <OrderCard/>
  </Layout>
</template>

<script>
import Tabs from '@/components/Order/Tabs'
import OrderCard from '@/components/Order/OrderCard'
import {$error, $loading} from '@/utils'
import {orderList} from '@/service'

export default {
  components: {OrderCard, Tabs},
  data() {
    return {
      orderStatus: 0,
      current: 0,
      size: 15
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      const loading = $loading()
      try {
        const data = await orderList({
          orderStatus: this.orderStatus,
          current: this.current,
          size: this.size
        })
        console.log(data)
      } catch (e) {
        $error(e)
      } finally {
        loading.clear()
      }
    },
    checkTab(value) {
      if (this.orderStatus !== value) {
        this.orderStatus = value
        this.init()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .layout-content {
  position: relative;
  background: #f7f7f7;
  padding: 122px 30px 138px;
}
</style>
