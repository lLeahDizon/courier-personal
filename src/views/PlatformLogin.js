import {userDoAuthorize} from '@/service'
import {$error} from '@/utils'
import {mapActions} from 'vuex'

export default {
  async created() {
    let {code} = this.$route.query
    if (code) {
      try {
        // 更新 userInfo
        const data = await userDoAuthorize(code instanceof Array ? code[0] : code)
        this.setUserInfo(data)
        this.$router.replace({name: 'home'})
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
