<template>
  <div class="GoodsInfo-wrapper">
    <header v-if="distance">
      <h1 class="title">发件距离</h1>
      <p class="desc">根据您当前的收发件信息，距离约为 <span class="number">{{ distance }}km</span></p>
      <p v-if="desc" class="desc time">预计 <span class="number">{{ desc }}小时内</span> 送达</p>
    </header>
    <InfoItem title="物品信息" placeholder="请选择物品信息" :content="goodsInfo" @click="modalTypeVisible=true"/>
    <InfoItem
      title="期望取件时间"
      desc="注意：成功提交订单后，在90分钟以内上门"
      placeholder="请选择取件时间"
      :content="deliverDateTimeStr"
      @click="showTimeModal('send')"/>
    <InfoItem
      title="期望送达时间"
      :desc="'注意：取件后，将于'+desc+'小时送达。'"
      placeholder="请选择送达时间"
      :content="receiptDateTimeStr"
      @click="showTimeModal('receipt')"/>
    <InfoItem :is-required="false" title="物品报价" placeholder="可选择报价赔付" :content="itemAmount"
              @click="modalPriceVisible=true"/>
    <div class="btn-wrapper">
      <button class="btn" @click="onSubmit">确认发布订单</button>
    </div>
    <ModalType :show.sync="modalTypeVisible" @onNext="changeGoodsType"/>
    <ModalTips :show.sync="modalTipsVisible"/>
    <!--  todo 缺少客服微信  -->
    <ModalPrice :show.sync="modalPriceVisible" @onChange="changeGoodsPrice"/>
    <van-popup v-model="showTime" round position="bottom">
      <van-picker
        show-toolbar
        title="请选择时间"
        :columns="columns"
        @change="onChangeTime"
        @cancel="onCloseTimeModal"
        @confirm="onConfirmTimeModal"/>
    </van-popup>
  </div>
</template>

<script>
import InfoItem from '@/components/InfoItem'
import ModalType from '@/components/GoodsInfo/ModalType'
import ModalTips from '@/components/GoodsInfo/ModalTips'
import ModalPrice from '@/components/GoodsInfo/ModalPrice'
import {$error, CoolWPDistance, getSpaceTime, getTimeArea} from '@/utils'
import {mapActions, mapGetters} from 'vuex'
import dayjs from 'dayjs'
import {ORDER_INFO_KEY} from '@/constants'

const timeArr = getTimeArea()
const timeList = {'今天': getSpaceTime(), '明天': timeArr, '后天': timeArr}
const initColumns = [
  {
    values: Object.keys(timeList),
    defaultIndex: 0
  },
  {
    values: timeList['今天'],
    defaultIndex: 0
  }
]

export default {
  components: {ModalPrice, ModalTips, ModalType, InfoItem},
  data() {
    return {
      goodsInfo: '',
      distance: '',
      desc: '',
      receiptDateTimeStr: '',
      receiptDateTime: '',
      deliverDateTimeStr: '',
      deliverDateTime: '',
      itemAmount: '',
      itemDescription: '',
      itemList: [],
      weight: '',
      modalTypeVisible: false,
      modalTipsVisible: false,
      modalPriceVisible: false,
      showTime: false,
      currentTime: '',
      columns: initColumns
    }
  },
  created() {
    const {
      distance,
      desc
    } = CoolWPDistance(this.orderInfo.deliverLongitude, this.orderInfo.deliverLatitude, this.orderInfo.receiptLongitude, this.orderInfo.receiptLatitude)
    console.log(desc)
    this.distance = distance
    this.desc = desc
  },
  computed: {
    ...mapGetters(['orderInfo'])
  },
  watch: {
    showTime(val) {
      if (!val) {
        this.columns = initColumns
      }
    }
  },
  methods: {
    ...mapActions(['setOrderInfo']),
    onCloseTimeModal() {
      this.showTime = false
    },
    onConfirmTimeModal(values, index) {
      switch (this.currentTime) {
        case 'send':
          this.deliverDateTimeStr = values.join(' ')
          this.deliverDateTime = dayjs().add(index[0], 'day').format('YYYY-MM-DD') + ' ' + values[1].split('-')[0] + ':00'
          break
        case 'receipt':
          this.receiptDateTimeStr = values.join(' ')
          this.receiptDateTime = dayjs().add(index[0], 'day').format('YYYY-MM-DD') + ' ' + values[1].split('-')[0] + ':00'
          break
      }
      this.onCloseTimeModal()
    },
    showTimeModal(currentTime) {
      this.showTime = true
      this.currentTime = currentTime
    },
    onChangeTime(picker, values) {
      picker.setColumnValues(1, timeList[values[0]])
    },
    changeGoodsType({itemDescription, itemList, weight}) {
      this.itemList = itemList
      this.itemDescription = itemDescription
      this.goodsInfo = `${itemDescription}，${weight}公斤`
    },
    changeGoodsPrice(val) {
      this.itemAmount = val
    },
    onSubmit() {
      if (!this.itemList.length) {
        return $error('请选择物品信息')
      }
      if (!this.deliverDateTime) {
        return $error('请选择期望取件时间')
      }
      if (!this.receiptDateTime) {
        return $error('请选择期望送达时间')
      }
      this.setOrderInfo({
        ...this.orderInfo,
        distance: this.distance,
        itemDescription: this.itemDescription,
        weight: this.weight,
        itemAmount: this.itemAmount,
        itemList: this.itemList,
        receiptDateTime: this.receiptDateTime,
        deliverDateTime: this.deliverDateTime
      })
      localStorage.setItem(ORDER_INFO_KEY, JSON.stringify(this.orderInfo))
      this.$router.push({name: 'orderConfirm'})
    }
  }
}
</script>

<style lang="scss" scoped>
.GoodsInfo-wrapper {
  padding: 0 30px;

  header {
    padding: 40px 0;
    border-bottom: 1px solid #e6e6e6;

    > .title {
      font-size: 32px;
      color: #333333;
      line-height: 44px;
      padding-bottom: 16px;
    }

    > .desc {
      font-size: 28px;
      color: #666666;
      line-height: 40px;

      &.time {
        padding-top: 10px;
      }

      > .number {
        font-size: 36px;
        line-height: 40px;
        color: #12a0ff;
      }
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
