<template>
  <div class="certification-wrapper">
    <h1 class="title">为保证您的账户安全</h1>
    <p class="desc">请先完成实名认证哦~</p>
    <input v-model="phone" type="tel" placeholder="请输入绑定的手机号">
    <div class="input-wrapper">
      <input v-model="code" type="number" placeholder="请输入验证码">
      <div class="code" @click="sendCode">{{ showTime ? `重新获取${time}S` : '发送验证码' }}</div>
    </div>
    <div class="btn-wrapper">
      <button class="btn" @click="showModal">开始认证</button>
      <van-checkbox v-model="agreementSelected">勾选即代表您同意<a @click="onClickAgreement">《环球旅递隐私政策》</a></van-checkbox>
    </div>
  </div>
</template>

<script>
import {$error, $loading} from '@/utils'
import {userSendCode, userDetectAuth, userBindPhone} from '@/service'
import {mapActions, mapGetters} from 'vuex'
import {VERIFY_KEY} from '@/constants'

export default {
  name: 'Certification',
  data() {
    return {
      phone: '',
      code: '',
      time: 60,
      timeId: undefined,
      showTime: false,
      agreementSelected: true
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  beforeDestroy() {
    clearTimeout(this.timeId)
  },
  methods: {
    ...mapActions(['setUserInfo']),
    async toAuth() {
      const loading = $loading()
      try {
        await userBindPhone({code: this.code, phone: this.phone})
        const {url} = await userDetectAuth()
        localStorage.setItem(VERIFY_KEY, VERIFY_KEY)
        location.replace(url)
      } catch (e) {
        $error(e)
      } finally {
        loading.clear()
      }
    },
    async sendCode() {
      if (this.showTime) { return }
      if (!this.phone.trim().match(/^1[0-9]{10}$/)) {
        return $error('请填写正确的联系电话')
      }
      const loading = $loading()
      try {
        await userSendCode(this.phone)
        this.showTime = true
        this.setTimeId()
      } catch (e) {
        $error(e)
      } finally {
        loading.clear()
      }
    },
    setTimeId() {
      if (this.time > 0) {
        this.timeId = setTimeout(() => {
          this.time = this.time - 1
          this.setTimeId()
        }, 1000)
      } else {
        this.showTime = false
        clearTimeout(this.timeId)
      }
    },
    onClickAgreement() {
      this.$router.push({name: 'agreement'})
    },
    showModal() {
      if (!this.phone.trim().match(/^1[0-9]{10}$/)) {
        return $error('请填写正确的联系电话')
      }
      if (!this.code) {
        return $error('请填写验证码')
      }
      if (!this.agreementSelected) {
        return $error('请勾选《环球旅递隐私政策》')
      }
      this.toAuth()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";

.certification-wrapper {
  position: relative;
  padding: 80px 60px 0;

  .btn {
    background: #12a0ff;
    border-radius: 50px;
    padding: 20px 0;
    font-size: 36px;
    line-height: 48px;
    color: white;
    width: 100%;

    &-wrapper {
      position: fixed;
      left: 60px;
      right: 60px;
      bottom: 48px;

      ::v-deep .van-checkbox {
        display: flex;
        align-items: center;
        padding-top: 40px;
      }

      ::v-deep .van-checkbox__icon {
        font-size: 30px;
      }

      ::v-deep .van-checkbox__label {
        font-size: 26px;
        line-height: 34px;
        color: #666666;

        a {
          color: #12a0ff;
        }
      }
    }
  }

  > .title {
    font-size: 48px;
    color: #333333;
    line-height: 68px;
    font-weight: bold;
  }

  > .desc {
    padding: 16px 0 40px;
    font-size: 28px;
    color: #333333;
    line-height: 40px;
  }

  > input {
    font-size: 34px;
    line-height: 48px;
    padding: 60px 0 24px;
    width: 100%;
    border-bottom: 1px solid #E6E6E6;
  }

  .input-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 24px 0;
    border-bottom: 1px solid #E6E6E6;
    font-size: 34px;
    line-height: 48px;

    .code {
      color: #12A0FF;
    }
  }

  input::-webkit-input-placeholder {
    color: #aaaaaa;
  }

  input::-moz-placeholder {
    color: #aaaaaa;
  }

  input:-moz-placeholder {
    color: #aaaaaa;
  }

  input:-ms-input-placeholder {
    color: #aaaaaa;
  }
}
</style>
