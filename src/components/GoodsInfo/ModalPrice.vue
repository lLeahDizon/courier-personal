<template>
  <van-popup v-model="visible" class="modal-wrapper" round position="bottom" get-container="#app" @close="onClose">
    <header>
      <span class="title">物品价值</span>
      <Icon name="certification-close" @click="onClose"/>
    </header>
    <div class="price" @click="showKeyBoard=true">{{ price || '请输入物品金额，最高10000' }}</div>
    <div v-if="insurancePrice >= 0" class="desc-price">保费：<span class="money">{{ insurancePrice }}元</span></div>
    <div class="agreement-wrapper">
      <Icon :name="agreementSelected ? 'login-select' : 'login-default'" @click="selectAgreement"/>
      我已阅读并同意<a @click="onClickAgreement">《保价协议》</a>
    </div>
    <p class="title">保价说明</p>
    <p class="desc" v-html="desc.replace(/\n/g, '</br>')"/>
    <button class="btn" @click="onOk">确定</button>
    <van-number-keyboard
      :show="showKeyBoard"
      theme="custom"
      :extra-key="['00', '.']"
      close-button-text="完成"
      @blur="showKeyBoard = false"
      @input="onInput"
      @delete="onDelete"
    />
  </van-popup>
</template>

<script>
import {insuranceAmount} from '@/service'
import {$error, $loading} from '@/utils'

const desc = '1、当发生物品损坏或丢失，根据您的投保情况进行处理；\n' +
  '2、您提供的物品信息及价值凭证等，赔偿金额不超出您选择的保价最高金额；\n' +
  '3、保价期间为达人取件成功后到订单配送完成；\n' +
  '4、对于易损、易坏、贵重物品请妥善包装；\n' +
  '5、配送物品最高保价1万元。\n'

export default {
  props: ['show'],
  data() {
    return {
      desc,
      visible: false,
      showKeyBoard: false,
      agreementSelected: true,
      price: '',
      insurancePrice: 0
    }
  },
  watch: {
    show(val) {
      this.visible = val
    },
    async showKeyBoard(val) {
      if (!val) {
        const loading = $loading()
        try {
          this.insurancePrice = await insuranceAmount(this.price)
        } catch (e) {
          $error(e)
        } finally {
          loading.clear()
        }
      }
    }
  },
  methods: {
    onClose() {
      this.price = ''
      this.insurancePrice = 0
      this.$emit('update:show', false)
    },
    onOk() {
      if (!this.agreementSelected) {
        return $error('请勾选《保价协议》')
      }
      this.$emit('onChange', {price: this.price, insurancePrice: Number(this.insurancePrice)})
      this.onClose()
    },
    selectAgreement() {
      this.agreementSelected = !this.agreementSelected
    },
    onClickAgreement() {
      console.log('---onClickAgreement')
    },
    onInput(val) {
      this.price = this.price + val
      if (Number(this.price) > 10000) {
        this.price = '10000'
      }
    },
    onDelete() {
      if (this.price.length > 0) {
        this.price = this.price.substr(0, this.price.length - 1)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.modal-wrapper {
  padding: 30px 40px 40px;
  width: 100%;

  header {
    display: flex;
    justify-content: space-between;

    .icon {
      font-size: 30px;
    }
  }

  .title {
    font-size: 36px;
    font-weight: bold;
    color: #333333;
    line-height: 50px;
  }

  .price {
    background: rgba(18, 160, 255, 0.07);
    border-radius: 20px;
    padding: 50px 24px;
    font-size: 44px;
    font-weight: bold;
    color: #12A0FF;
    line-height: 62px;
    margin-top: 30px;
  }

  .desc-price {
    margin-top: 10px;
    background: url("~@/assets/icons/info-modal-desc.png") no-repeat;
    background-size: 100% auto;
    padding: 34px 0 20px 24px;
    font-size: 36px;
    color: #333333;
    line-height: 50px;

    .money {
      color: #F12323;
    }
  }

  .agreement-wrapper {
    display: flex;
    align-items: center;
    padding-top: 12px;
    padding-bottom: 78px;
    font-size: 26px;
    color: #666666;
    line-height: 31px;

    .icon {
      margin-right: 8px;
      font-size: 30px;
    }

    a {
      color: #12a0ff;
    }
  }

  .desc {
    padding-top: 16px;
    padding-bottom: 60px;
    font-size: 26px;
    color: #666666;
    line-height: 44px;
  }

  .btn {
    background: #12A0FF;
    border-radius: 50px;
    font-size: 36px;
    color: #FFFFFF;
    line-height: 43px;
    padding: 20px 0;
    width: 100%;
  }
}
</style>
