<template>
  <div class="info-wrapper">
    <div @click="onClickAddress" class="item">
      <div class="left">
        <Icon name="address"/>
        <span class="title">{{ address || '请填写地址' }}</span>
      </div>
      <Icon name="my-right"/>
    </div>
    <div class="item">
      <div class="left">
        <Icon name="address-number"/>
        <input v-model="number" placeholder="请输入楼号,单元,门牌号(选填项)">
      </div>
    </div>
    <div class="item">
      <div class="left">
        <Icon name="address-person"/>
        <input v-model="name" placeholder="联系人姓名(必填)">
      </div>
    </div>
    <div class="item">
      <div class="left">
        <Icon name="address-tel"/>
        <input v-model="tel" type="tel" placeholder="联系电话(必填)">
      </div>
    </div>
    <div class="btn-wrapper">
      <button class="btn" @click="onSubmit">下一步</button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import {$error} from '@/utils'

export default {
  name: 'ExpressInfo',
  data() {
    const {address, district, lng, lat, number, name, tel} = this.$route.query
    return {
      address: address || '',
      district: district || '',
      lng: lng || '',
      lat: lat || '',
      number: number || '',
      name: name || '',
      tel: tel || ''
    }
  },
  computed: {
    ...mapGetters(['addressInfo', 'orderInfo'])
  },
  created() {
    // isEdit 通过缓存读取
    if (this.addressInfo.searchValue) {
      this.address = this.addressInfo.searchValue
      this.lng = this.addressInfo.lng
      this.lat = this.addressInfo.lat
      this.district = this.addressInfo.district
      this.number = this.addressInfo.number
      this.setAddressInfo({})
    }
  },
  methods: {
    ...mapActions(['setAddressInfo', 'setOrderInfo']),
    onClickAddress() {
      this.$router.push({name: 'addressConfirm'})
    },
    onSubmit() {
      if (!this.address) {
        return $error('请填写地址')
      }
      if (!this.name.trim()) {
        return $error('请填写联系人姓名')
      }
      if (!this.tel.trim()) {
        return $error('请填写联系电话')
      }
      if (!this.tel.trim().match(/^1[0-9]{10}$/)) {
        return $error('请填写正确的联系电话')
      }
      const {type, isEdit = 'false'} = this.$route.query
      let toSend = false
      let toReceipt = false
      switch (type) {
        case 'send':
          if (!this.orderInfo.receiptDetailAddress) {
            toReceipt = true
          }
          this.setOrderInfo({
            ...this.orderInfo,
            deliverDistrict: this.district,
            // todo 详细地址最后需要和 number 进行拼接传递
            deliverDetailAddress: this.address,
            deliverLatitude: this.lat,
            deliverLongitude: this.lng,
            deliverName: this.name.trim(),
            deliverPhone: this.tel.trim(),
            deliverNumber: this.number.trim()
          })
          break
        case 'receipt':
          if (!this.orderInfo.deliverDetailAddress) {
            toSend = true
          }
          this.setOrderInfo({
            ...this.orderInfo,
            receiptDistrict: this.district,
            receiptDetailAddress: this.address,
            receiptLatitude: this.lat,
            receiptLongitude: this.lng,
            receiptName: this.name.trim(),
            receiptPhone: this.tel.trim(),
            receiptNumber: this.number.trim()
          })
          break
      }
      // isEdit 存入 localStorage
      if (JSON.parse(isEdit)) {
        this.$router.go(-1)
      } else {
        if (toSend)
          this.$router.push({name: 'senderInfo', query: {type: 'send'}})
        else if (toReceipt)
          this.$router.push({name: 'receiptInfo', query: {type: 'receipt'}})
        else
          this.$router.replace({name: 'goodsInfo'})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.info-wrapper {
  position: relative;
  padding: 24px 30px;

  > .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 36px 0;
    border-bottom: 1px solid #e6e6e6;

    > .left {
      display: flex;
      align-items: center;
      flex-grow: 1;

      > .icon {
        font-size: 40px;
        margin-right: 20px;
      }

      > .title {
        font-size: 36px;
        line-height: 50px;
        color: #333333;
        font-weight: bold;
      }

      input {
        width: 100%;
        font-size: 30px;
        line-height: 42px;
        color: #333333;
      }
    }

    > .icon {
      width: 14px;
      height: 24px;
    }
  }

  .btn {
    width: 100%;
    background: #12a0ff;
    padding: 20px 0;
    border-radius: 50px;
    font-size: 36px;
    line-height: 44px;
    color: white;

    &-wrapper {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 0 30px 40px;
    }
  }
}
</style>
