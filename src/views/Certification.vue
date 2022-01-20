<template>
  <div class="certification-wrapper">
    <h1 class="title">为保证您的账户安全</h1>
    <p class="desc">请先完成实名认证哦~</p>
    <input placeholder="请输入真是姓名">
    <input placeholder="请输入15位或18位身份证号">
    <van-uploader v-model="fileList" class="upload" :max-count="1" deletable/>
    <div class="tips-wrapper">
      <div v-for="(item, index) in tips" :key="index" class="tips">
        <Icon name="login-default"/>
        {{ item }}
      </div>
    </div>
    <div class="btn-wrapper">
      <button class="btn">开始认证</button>
      <van-checkbox v-model="agreementSelected">勾选即代表您同意<a>《环球旅递隐私政策》</a></van-checkbox>
    </div>
    <ModalTips :show="showDialog"/>
  </div>
</template>

<script>
import ModalTips from '@/components/Certification/ModalTips'

export default {
  name: 'Certification',
  components: {ModalTips},
  data() {
    return {
      tips: ['不要佩戴眼镜', '不要遮挡脸部', '不仰头俯视', '周围环境光线明亮'],
      fileList: [],
      agreementSelected: false,
      showDialog: true
    }
  }
}
</script>

<style lang="scss" scoped>
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

  > .upload {
    padding-top: 60px;
  }

  > .tips-wrapper {
    display: flex;
    flex-wrap: wrap;
    padding-top: 16px;

    > .tips {
      display: flex;
      align-items: center;
      padding-right: 20px;
      line-height: 32px;
      font-size: 24px;
      padding-bottom: 10px;
      color: #888888;

      > .icon {
        margin-right: 4px;
      }
    }
  }

  > input {
    font-size: 36px;
    line-height: 50px;
    padding: 60px 0 24px;
    width: 100%;
    border-bottom: 1px solid #e6e6e6;
  }

  > input::-webkit-input-placeholder {
    color: #aaaaaa;
  }

  > input::-moz-placeholder {
    color: #aaaaaa;
  }

  > input:-moz-placeholder {
    color: #aaaaaa;
  }

  > input:-ms-input-placeholder {
    color: #aaaaaa;
  }
}
</style>
