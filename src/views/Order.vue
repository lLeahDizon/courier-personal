<template>
  <Layout class-prefix="layout">
    <Tabs/>
    <ScrollList/>
  </Layout>
</template>

<script>
import Tabs from '@/components/Order/Tabs'
import ScrollList from '@/components/Order/ScrollList'

export default {
  components: {ScrollList, Tabs}
}
</script>

<style lang="scss" scoped>
::v-deep .layout-content {
  position: relative;
  background: #f7f7f7;
  padding: 122px 30px 138px;
}
</style>
