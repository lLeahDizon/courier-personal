<template>
  <div class="CertificationResult-wrapper">
    <Icon name="result-fail"/>
    <p class="title">认证未通过</p>
    <p class="desc">请重新认证或咨询客服</p>
    <button class="btn">重新认证</button>
    <button class="btn outline">咨询客服</button>
  </div>
</template>

<script>
export default {
  name: 'Certification'
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
