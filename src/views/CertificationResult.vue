<template>
  <div class="CertificationResult-wrapper">
    <Icon :name="'result-'+ (result ? 'success' : 'fail')"/>
    <template v-if="result">
      <p class="title">恭喜！认证成功</p>
      <p class="desc">快去开启愉快的速递之旅吧</p>
      <button class="btn" @click="onBack">返回（{{ timeLeave }}s）</button>
    </template>
    <template v-else>
      <p class="title">认证未通过</p>
      <p class="desc">请重新认证或咨询客服</p>
      <button class="btn" @click="onVerify">重新认证</button>
      <button class="btn outline" @click="clickPhone">咨询客服</button>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Certification',
  data() {
    const {result = 'false'} = this.$route.query
    return {
      result: JSON.parse(result),
      timeLeave: 3,
      leaveTime: undefined
    }
  },
  created() {
    if (this.result) {
      this.calcTime()
    }
  },
  beforeDestroy () {
    clearTimeout(this.leaveTime)
  },
  methods: {
    onVerify() {
      this.$router.replace({name: 'certification'})
    },
    clickPhone() {
      window.location.href = 'tel:4000129068'
    },
    calcTime() {
      this.leaveTime = setTimeout(() => {
        this.timeLeave -= 1
        if (this.timeLeave > 0) {
          this.calcTime()
        } else {
          clearTimeout(this.leaveTime)
          this.onBack()
        }
      }, 1000)
    },
    onBack() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.CertificationResult-wrapper {
  padding: 72px 60px;
  text-align: center;

  > .title {
    padding-top: 48px;
    padding-bottom: 12px;
    font-size: 36px;
    color: #333333;
    line-height: 50px;
  }

  > .desc {
    padding-bottom: 100px;
    font-size: 26px;
    color: #999999;
    line-height: 44px;
  }

  > .icon {
    font-size: 108px;
  }

  > .btn {
    border-radius: 50px;
    border: 1px solid #12A0FF;
    background: #12a0ff;
    width: 100%;
    margin-bottom: 30px;
    padding: 20px 0;
    font-size: 36px;
    color: #FFFFFF;
    line-height: 50px;

    &.outline {
      background: white;
      color: #12a0ff;
    }
  }
}
</style>
