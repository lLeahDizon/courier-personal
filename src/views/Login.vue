<template>
  <div class="login-wrapper">
    <img src="@/assets/icons/login-bg.png" alt="">
    <div class="btn-wrapper">
      <button class="btn" @click="onClickLogin">
        <Icon name="login-wx"/>
        微信账号登录
      </button>
    </div>
    <div class="agreement-wrapper">
      <Icon :name="agreementSelected ? 'login-select' : 'login-default'" @click="selectAgreement"/>
      登陆即代表您同意<a @click="onClickAgreement">《环球旅递隐私政策》</a>
    </div>
  </div>
</template>

<script>
import {handleLogin} from '@/utils/weixin'
import {$error} from '@/utils'

export default {
  data() {
    return {
      agreementSelected: false
    }
  },
  methods: {
    selectAgreement() {
      this.agreementSelected = !this.agreementSelected
    },
    onClickAgreement() {
      this.$router.push({name: 'agreement'})
    },
    onClickLogin() {
      if (!this.agreementSelected) {
        return $error('请勾选《环球旅递隐私政策》')
      }
      handleLogin()
    }
  }
}
</script>

<style lang="scss" scoped>
.login-wrapper {
  min-height: 100vh;

  > img {
    width: 100%;
  }

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background: #28c445;
    border-radius: 50px;
    padding: 20px 0;
    font-size: 36px;
    line-height: 42px;
    color: white;

    > .icon {
      font-size: 50px;
      margin-right: 16px;
    }

    &-wrapper {
      padding: 60px 60px 40px;
    }
  }

  > .agreement-wrapper {
    padding: 0 60px;
    font-size: 26px;
    color: #666666;
    line-height: 32px;
    display: flex;
    align-items: center;

    > .icon {
      font-size: 30px;
      margin-right: 8px;
    }

    > a {
      color: #12a0ff;
    }
  }
}
</style>
