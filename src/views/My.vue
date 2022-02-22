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
import {$error} from '@/utils'
import {userVerify} from '@/service'
import {mapActions, mapGetters} from 'vuex'
import {USER_INFO_KEY, VERIFY_KEY} from '@/constants'

export default {
  components: {ModalCertification, OtherPanel, OptionPanel, BaseInfo},
  data() {
    return {
      DialogVisible: false
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  async created() {
    try {
      if (localStorage.getItem(VERIFY_KEY)) {
        localStorage.removeItem(VERIFY_KEY)
        const verifyStatus = await userVerify()
        this.setUserInfo({...JSON.parse(localStorage.getItem(USER_INFO_KEY)), verifyStatus: verifyStatus ? 1 : 0})
      }
    } catch (e) {
      $error(e)
    }
  },
  methods: {
    ...mapActions(['setUserInfo']),
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
