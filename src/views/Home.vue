<template>
  <Layout class-prefix="layout">
    <div class="card">
      <Tabs @click="checkTab"/>
      <Online v-if="activeTab === 1" @showDialog="showDialog"/>
      <Phone v-else @showDialog="showDialog"/>
    </div>
    <ModalCertification :show.sync="DialogVisible"/>
  </Layout>
</template>

<script>
import Tabs from '@/components/Home/Tabs'
import Online from '@/components/Home/Online'
import Phone from '@/components/Home/Phone'
import ModalCertification from '@/components/Home/ModalCertification'

export default {
  components: {ModalCertification, Phone, Online, Tabs},
  data() {
    return {
      activeTab: 1,
      DialogVisible: false
    }
  },
  methods: {
    checkTab(value) {
      this.activeTab = value
    },
    showDialog() {
      this.DialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

::v-deep .layout-content {
  background: url("~@/assets/icons/home-bg.png") no-repeat;
  background-size: 100% auto;
  padding: 275px 60px 0;
}

.card {
  @extend %outerShadow;
  border-radius: 20px;
  width: 100%;
  padding: 30px 36px 80px;
  background: white;
}
</style>
