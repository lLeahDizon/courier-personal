<template>
  <div class="GoodsInfo-wrapper">
    <header v-if="distance">
      <h1 class="title">发件距离</h1>
      <p class="desc">根据您当前的收发件信息，距离约为 <span class="number">{{ distance }}km</span></p>
      <p class="desc time">预计 <span class="number">{{ desc }}小时内</span> 送达</p>
    </header>
    <InfoItem title="物品信息" placeholder="请选择物品信息" :content="goodsInfo" @click="modalTypeVisible=true"/>
    <InfoItem title="期望取件时间" desc="注意：成功提交订单后，在90分钟以内上门" placeholder="请选择取件时间" :content="receiptDateTime"/>
    <InfoItem title="期望送达时间" :desc="'注意：取件后，将于'+desc+'小时送达。'" placeholder="请选择送达时间" :content="deliverDateTime"/>
    <InfoItem :is-required="false" title="物品报价" placeholder="可选择报价赔付" :content="itemAmount"
              @click="modalPriceVisible=true"/>
    <div class="btn-wrapper">
      <button class="btn" @click="onSubmit">确认发布订单</button>
    </div>
    <ModalType :show.sync="modalTypeVisible" @onNext="changeGoodsType"/>
    <ModalTips :show.sync="modalTipsVisible"/>
    <!--  todo 缺少客服微信  -->
    <ModalPrice :show.sync="modalPriceVisible" @onChange="changeGoodsPrice"/>
  </div>
</template>

<script>
import InfoItem from '@/components/InfoItem'
import ModalType from '@/components/GoodsInfo/ModalType'
import ModalTips from '@/components/GoodsInfo/ModalTips'
import ModalPrice from '@/components/GoodsInfo/ModalPrice'
import {orderConfirmInfo} from '@/service'
import {$error, $loading, CoolWPDistance} from '@/utils'
import {mapGetters} from 'vuex'

export default {
  components: {ModalPrice, ModalTips, ModalType, InfoItem},
  data() {
    return {
      goodsInfo: '',
      distance: '',
      desc: '',
      receiptDateTime: '',
      deliverDateTime: '',
      itemAmount: '',
      itemDescription: '',
      weight: '',
      modalTypeVisible: false,
      modalTipsVisible: false,
      modalPriceVisible: false
    }
  },
  created() {
    const {
      distance,
      desc
    } = CoolWPDistance(this.orderInfo.deliverLongitude, this.orderInfo.deliverLatitude, this.orderInfo.receiptLongitude, this.orderInfo.receiptLatitude)
    this.distance = distance
    this.desc = desc
  },
  computed: {
    ...mapGetters(['orderInfo'])
  },
  methods: {
    changeGoodsType({itemDescription, itemList, weight}) {
      console.log('---changeGoodsType')
      console.log(itemList)
      this.goodsInfo = `${itemDescription}，${weight}公斤`
    },
    changeGoodsPrice(val) {
      this.itemAmount = val
    },
    async onSubmit() {
      const loading = $loading()
      try {
        const data = {
          itemDescription: this.itemDescription,
          weight: this.weight,
          itemAmount: this.itemAmount,
          receiptDateTime: this.receiptDateTime,
          deliverDateTime: this.deliverDateTime,
        }
        await orderConfirmInfo(data)
      } catch (e) {
        $error(e)
      } finally {
        loading.clear()
      }
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
