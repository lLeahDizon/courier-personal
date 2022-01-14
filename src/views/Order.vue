<template>
  <Layout class-prefix="layout">
    <Tabs @click="checkTab"/>
    <OrderCard/>
    <OrderCard/>
  </Layout>
</template>

<script>
import Tabs from '@/components/Order/Tabs'
import OrderCard from '@/components/Order/OrderCard'

export default {
  components: {OrderCard, Tabs},
  data() {
    return {
      activeTab: 1,
    }
  },
  methods: {
    checkTab(value) {
      this.activeTab = value
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
