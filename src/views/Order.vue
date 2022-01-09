<template>
  <Layout class-prefix="layout">
    <Tabs @click="checkTab"/>
    <Card/>
    <Card/>
  </Layout>
</template>

<script>
import Tabs from '@/components/Order/Tabs'
import Card from '@/components/Order/Card'

export default {
  components: {Card, Tabs},
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
