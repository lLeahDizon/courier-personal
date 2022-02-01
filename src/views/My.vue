<template>
  <Layout class-prefix="layout">
    <base-info @showDialog="showDialog"/>
    <option-panel/>
    <other-panel/>
    <ModalCertification :show.sync="DialogVisible"/>
  </Layout>
</template>

<script>
import BaseInfo from '@/components/My/BaseInfo'
import OptionPanel from '@/components/My/OptionPanel'
import OtherPanel from '@/components/My/OtherPanel'
import ModalCertification from '@/components/Home/ModalCertification'

export default {
  components: {ModalCertification, OtherPanel, OptionPanel, BaseInfo},
  data() {
    return {
      DialogVisible: false
    }
  },
  methods: {
    showDialog() {
      this.DialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .layout-content {
  padding: 40px 30px;
  background: #f7f7f7;
}
</style>
