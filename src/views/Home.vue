<template>
  <Layout class-prefix="layout">
    <div class="card">
      <Tabs @click="checkTab"/>
      <Online v-if="activeTab === 1"/>
      <Phone v-else/>
    </div>
    <ModalCertification :show="showDialog"/>
  </Layout>
</template>

<script>
import Tabs from '@/components/Home/Tabs'
import Online from '@/components/Home/Online'
import Phone from '@/components/Home/Phone'
import ModalCertification from '@/components/Home/ModalCertification'
import {userDoAuthorize} from '@/service'
import {mapActions} from 'vuex'
import {$error} from '@/utils'

export default {
  components: {ModalCertification, Phone, Online, Tabs},
  data() {
    return {
      activeTab: 1,
      showDialog: false
    }
  },
  async created() {
    let {code} = this.$route.query
    if (code) {
      try {
        // 更新 userInfo
        const data = await userDoAuthorize(code instanceof Array ? code[0] : code)
        console.log('---获取用户信息')
        console.log(data)
        this.setUserInfo(data)
      } catch (e) {
        $error(e)
      }
    }
  },
  methods: {
    ...mapActions(['setUserInfo']),
    checkTab(value) {
      this.activeTab = value
      this.showDialog = true
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
