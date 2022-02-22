<template>
  <van-popup v-model="visible" class="modal-wrapper" round :close-on-click-overlay="false" get-container="#app">
    <Icon name="certification-close" @click="onClose"/>
    <p class="title">实名认证</p>
    <p class="content"><span>为营造安全优质的服务和资金安全</span><span>请先完成</span></p>
    <button class="btn" @click="onCertificate">去认证</button>
  </van-popup>
</template>

<script>
import {userDetectAuth, userExistPhone} from '@/service'
import {$error, $loading} from '@/utils'
import {VERIFY_KEY} from '@/constants'

export default {
  name: 'modalCertification',
  props: ['show'],
  data() {
    return {
      visible: false
    }
  },
  watch: {
    show(val) {
      this.visible = val
    }
  },
  methods: {
    onClose() {
      this.$emit('update:show', false)
    },
    async onCertificate() {
      const loading = $loading()
      try {
        const isExist = await userExistPhone()
        this.onClose()
        if (isExist) {
          const {url} = await userDetectAuth()
          localStorage.setItem(VERIFY_KEY, VERIFY_KEY)
          location.replace(url)
        } else {
          this.$router.push({name: 'certification'})
        }
      } catch (e) {
        $error(e)
      } finally {
        loading.clear()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-wrapper {
  text-align: center;
  width: 580px;
  color: #333333;
  padding: 36px 80px 40px;

  .icon {
    position: absolute;
    font-size: 30px;
    right: 24px;
    top: 24px;
  }

  > .title {
    font-size: 36px;
    line-height: 50px;
    font-weight: bold;
  }

  > .content {
    display: flex;
    flex-direction: column;
    padding: 40px 0 60px;
    font-size: 28px;
    line-height: 40px;
  }

  > .btn {
    background: #12A0FF;
    border-radius: 50px;
    padding: 20px 0;
    width: 100%;
    font-size: 36px;
    line-height: 44px;
    color: white;
  }
}
</style>
