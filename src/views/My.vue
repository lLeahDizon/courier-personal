<template>
  <Layout class-prefix="layout">
    <base-info/>
    <option-panel/>
    <other-panel/>
  </Layout>
</template>

<script>
import BaseInfo from '@/components/My/BaseInfo'
import OptionPanel from '@/components/My/OptionPanel'
import OtherPanel from '@/components/My/OtherPanel'

export default {
  components: {OtherPanel, OptionPanel, BaseInfo}
}
</script>

<style lang="scss" scoped>
::v-deep .layout-content {
  padding: 40px 30px;
  background: #f7f7f7;
}
</style>
