<template>
  <Layout class-prefix="layout">
    <base-info/>
    <option-panel/>
    <other-panel/>
  </Layout>
</template>

<script>
import BaseInfo from '@/components/My/baseInfo'
import OptionPanel from '@/components/My/optionPanel'
import OtherPanel from '@/components/My/otherPanel'

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
