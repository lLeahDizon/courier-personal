<template>
  <div class="GoodsInfo-wrapper">
    <header v-if="distance >= 0">
      <h1 class="title">发件距离</h1>
      <p class="desc">根据您当前的收发件信息，距离约为 <span class="number">{{ distance }}km</span></p>
      <p v-if="desc" class="desc time">预计 <span class="number">{{ desc }}小时内</span> 送达</p>
    </header>
    <InfoItem
      title="物品信息"
      placeholder="请选择物品信息"
      :content="itemList.length?`${itemDescription}，${weight}公斤，${number}件`:''"
      @click="modalTypeVisible=true"/>
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
    <InfoItem
      :is-required="false"
      title="物品保价"
      placeholder="可选择报价赔付"
      :content="insurancePrice >= 0 ? (insurancePrice === 0 ? '未保价0元' : `已保价¥${insurancePrice}`) :''"
      @click="modalPriceVisible=true"/>
    <div class="title">物品图片</div>
    <van-uploader
      v-model="fileList"
      class="upload"
      multiple
      :max-count="6"
      deletable
      accept="image/*"
      :after-read="afterRead"/>
    <div class="btn-wrapper">
      <button class="btn" @click="onSubmit">确认发布订单</button>
    </div>
    <ModalType
      :show.sync="modalTypeVisible"
      @showModalTips="modalTipsVisible=true"
      @showModalRules="modalRulesVisible=true"
      @showModalCustom="modalCustomVisible=true"
      @onNext="changeGoodsType"/>
    <ModalTips :show.sync="modalTipsVisible"/>
    <ModalRules :show.sync="modalRulesVisible"/>
    <ModalCustom :show.sync="modalCustomVisible"/>
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
import {$error, $loading, CoolWPDistance, getSpaceTime, getTimeArea} from '@/utils'
import {mapActions, mapGetters} from 'vuex'
import dayjs from 'dayjs'
import {ORDER_INFO_KEY} from '@/constants'
import ModalRules from '@/components/GoodsInfo/ModalRules'
import ModalCustom from '@/components/GoodsInfo/ModalCustom'
import {fileUpload} from '@/service'

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
  components: {ModalCustom, ModalRules, ModalPrice, ModalTips, ModalType, InfoItem},
  data() {
    return {
      fileList: [],
      imgUrlList: [],
      distance: 0,
      desc: '',
      receiptDateTimeStr: '',
      receiptDateTime: '',
      deliverDateTimeStr: '',
      deliverDateTime: '',
      itemAmount: '',
      insurancePrice: undefined,
      itemDescription: '',
      itemList: [],
      weight: '',
      number: '',
      modalTypeVisible: false,
      modalTipsVisible: false,
      modalRulesVisible: false,
      modalPriceVisible: false,
      modalCustomVisible: false,
      showTime: false,
      currentTime: '',
      columns: initColumns
    }
  },
  created() {
    const {
      distance,
      desc
    } = CoolWPDistance(Number(this.orderInfo.deliverLongitude), Number(this.orderInfo.deliverLatitude), Number(this.orderInfo.receiptLongitude), Number(this.orderInfo.receiptLatitude))
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
    changeGoodsType({itemDescription, itemList, weight, number}) {
      this.itemList = itemList
      this.itemDescription = itemDescription
      this.weight = weight
      this.number = number
    },
    changeGoodsPrice({price, insurancePrice}) {
      this.itemAmount = price
      this.insurancePrice = insurancePrice
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
        number: this.number,
        itemAmount: this.itemAmount,
        insurancePrice: this.insurancePrice,
        itemList: this.itemList,
        receiptDateTimeStr: this.receiptDateTimeStr,
        receiptDateTime: this.receiptDateTime,
        deliverDateTimeStr: this.deliverDateTimeStr,
        deliverDateTime: this.deliverDateTime,
        imgUrlList: this.imgUrlList
      })
      localStorage.setItem(ORDER_INFO_KEY, JSON.stringify({
        ...this.orderInfo,
        distance: this.distance,
        itemDescription: this.itemDescription,
        weight: this.weight,
        number: this.number,
        itemAmount: this.itemAmount,
        insurancePrice: this.insurancePrice,
        itemList: this.itemList,
        receiptDateTimeStr: this.receiptDateTimeStr,
        receiptDateTime: this.receiptDateTime,
        deliverDateTimeStr: this.deliverDateTimeStr,
        deliverDateTime: this.deliverDateTime,
        imgUrlList: this.imgUrlList
      }))
      this.$router.replace({name: 'orderConfirm'})
    },
    async afterRead(file) {
      const loading = $loading()
      try {
        const newFileList = []
        file.forEach(item => this.compressImage(item.file, newFile => {
          newFileList.push(newFile)
        }))
        for (let i = 0; i < newFileList.length; i++) {
          const params = new FormData()
          params.append('file', newFileList[i])
          const result = await fileUpload(params)
          this.imgUrlList.push(`https://huanqiulvdi.oss-accelerate.aliyuncs.com/${result}`)
        }
        console.log('---imgUrlList')
        console.log(this.imgUrlList)
      } catch (e) {
        $error(e)
      } finally {
        loading.clear()
      }
    },
    compressImage(file, success) {
      // 图片小于1M不压缩
      if (file.size < Math.pow(1024, 2) * 2) {
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
          const quality = 0.2  // 默认图片质量为0.92
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

          console.log(`原图${(src.length / 1024).toFixed(2)}kb`, `新图${(base64.length / 1024).toFixed(2)}kb`)

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
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";

.GoodsInfo-wrapper {
  padding: 0 30px;

  header {
    padding: 40px 0;
    @include border-1px(#e6e6e6, 0, bottom);

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

  > .title {
    padding-top: 30px;
    font-size: 32px;
    line-height: 44px;
    color: #333333;
  }

  > .upload {
    margin-top: 30px;
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
