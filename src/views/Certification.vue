<template>
  <div class="certification-wrapper">
    <h1 class="title">为保证您的账户安全</h1>
    <p class="desc">请先完成实名认证哦~</p>
    <input v-model="name" placeholder="请输入真实姓名">
    <div class="input" :class="{'placeholder':!id}" @click="show=true">
      {{ id || '请输入15位或18位身份证号' }}
      <van-icon v-if="showClear" name="clear" color="#aaaaaa"  @click.stop="clearText"/>
    </div>
    <van-uploader v-model="fileList" class="upload" :max-count="1" deletable :after-read="afterRead"/>
    <div class="tips-wrapper">
      <div v-for="(item, index) in tips" :key="index" class="tips">
        <Icon name="login-default"/>
        {{ item }}
      </div>
    </div>
    <div class="btn-wrapper">
      <button class="btn" @click="showModal">开始认证</button>
      <van-checkbox v-model="agreementSelected">勾选即代表您同意<a @click="onClickAgreement">《环球旅递隐私政策》</a></van-checkbox>
    </div>
    <van-number-keyboard
      :show="show"
      extra-key="X"
      close-button-text="完成"
      @blur="show = false"
      @input="onInput"
      @delete="onDelete"
    />
    <ModalTips :show.sync="showDialog" :name="name" @onSubmit="onSubmit"/>
  </div>
</template>

<script>
import ModalTips from '@/components/Certification/ModalTips'
import {$error, $loading} from '@/utils'
import {fileUpload, userVerify} from '@/service'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'Certification',
  components: {ModalTips},
  data() {
    return {
      tips: ['不要佩戴眼镜', '不要遮挡脸部', '不仰头俯视', '周围环境光线明亮'],
      fileList: [],
      name: '',
      id: '',
      faceImgUrl: '',
      agreementSelected: true,
      show: false,
      showClear: false,
      showDialog: false
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  watch: {
    id(val) {
      this.showClear = !!val
    }
  },
  methods: {
    ...mapActions(['setUserInfo']),
    onClickAgreement() {
      this.$router.push({name: 'agreement'})
    },
    clearText() {
      this.id = ''
      this.showClear = false
    },
    showModal() {
      if (!this.name) {
        return $error('请输入姓名')
      }
      if (![15, 18].includes(this.id.length)) {
        return $error('请输入正确的身份证号')
      }
      if (!this.agreementSelected) {
        return $error('请勾选《环球旅递隐私政策》')
      }
      if (!this.faceImgUrl) {
        return $error('请上传认证照片')
      }
      this.showDialog = true
    },
    async onSubmit() {
      const loading = $loading()
      try {
        const data = await userVerify({
          idCard: this.id,
          realName: this.name,
          faceImgUrl: this.faceImgUrl
        })
        if (data) {
          this.setUserInfo({...this.userInfo, verifyStatus: 1})
        }
        this.$router.replace({
          name: 'certificationResult',
          query: {
            result: data
          }
        })
      } catch (e) {
        $error(e)
      } finally {
        loading.clear()
      }
    },
    afterRead(file) {
      this.compressImage(file.file, async file => {
        const loading = $loading()
        try {
          let params = new FormData()
          params.append('file', file)
          const result = await fileUpload(params)
          this.faceImgUrl = `https://huanqiulvdi.oss-accelerate.aliyuncs.com/${result}`
        } catch (e) {
          $error(e)
        } finally {
          loading.clear()
        }
      })
    },
    compressImage(file, success) {
      // 图片小于1M不压缩
      if (file.size < Math.pow(1024, 2)) {
        return success(file)
      }
      const name = file.name //文件名
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = e => {
        const src = e.target.result

        const img = new Image()
        img.src = src
        img.onload = () => {
          const loading = $loading()
          const w = img.width
          const h = img.height
          const quality = 0.8  // 默认图片质量为0.92
          // 生成canvas
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          // 创建属性节点
          const anw = document.createAttribute('width')
          anw.nodeValue = w
          const anh = document.createAttribute('height')
          anh.nodeValue = h
          canvas.setAttributeNode(anw)
          canvas.setAttributeNode(anh)

          // 铺底色 PNG转JPEG时透明区域会变黑色
          ctx.fillStyle = '#fff'
          ctx.fillRect(0, 0, w, h)

          ctx.drawImage(img, 0, 0, w, h)
          // quality值越小，所绘制出的图像越模糊
          const base64 = canvas.toDataURL('image/jpeg', quality) // 图片格式jpeg或webp可以选0-1质量区间

          // 去掉url的头，并转换为byte
          const bytes = window.atob(base64.split(',')[1])
          // 处理异常,将ascii码小于0的转换为大于0
          // eslint-disable-next-line no-undef
          const ab = new ArrayBuffer(bytes.length)
          // eslint-disable-next-line no-undef
          const ia = new Uint8Array(ab)
          for (let i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i)
          }
          file = new Blob([ab], {type: 'image/jpeg'})
          file.name = name

          loading.clear()

          success(file)
        }
        img.onerror = e => {
          $error(e)
        }
      }
      reader.onerror = e => {
        $error(e)
      }
    },
    onInput(value) {
      if (this.id.length < 18) {
        this.id += value
      }
    },
    onDelete() {
      if (this.id) {
        this.id = this.id.substr(0, this.id.length - 1)
      }
    },
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

  .input {
    font-size: 36px;
    line-height: 50px;
    padding: 60px 0 24px;
    width: 100%;
    border-bottom: 1px solid #E6E6E6;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &.placeholder {
      color: #aaaaaa;
    }
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
    border-bottom: 1px solid #E6E6E6;
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
