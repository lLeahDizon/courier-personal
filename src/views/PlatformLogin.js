import {userDoAuthorize} from '@/service'
import {$error, structureQs} from '@/utils'
import {mapActions} from 'vuex'

export default {
  async created() {
    let {code} = this.$route.query
    const {VUE_APP_BASE_NAME} = process.env
    const href = decodeURIComponent(structureQs().from || '')
    if (code) {
      try {
        // 更新 userInfo
        const data = await userDoAuthorize(code instanceof Array ? code[0] : code)
        this.setUserInfo(data)
        location.replace('/' + VUE_APP_BASE_NAME + href)
      } catch (e) {
        $error(e)
      }
    }
  },
  methods: {
    ...mapActions(['setUserInfo'])
  },
  render() {
    return ''
  }
}
