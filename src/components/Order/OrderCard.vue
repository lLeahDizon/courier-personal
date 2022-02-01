<template>
  <div class="box-wrapper">
    <Card class-prefix="OrderCard">
      <div class="head">
        <span class="number">订单编号：{{ info.orderNum }}</span>
        <span :class="orderStatus[info.transportSheetStatus].className">
          {{ orderStatus[info.transportSheetStatus].name }}
        </span>
      </div>
      <div class="time">
        <Icon name="order-time"/>
        {{ info.createTime }}
      </div>
      <div class="address">
        <span class="circle send"/>
        <span class="content">{{ info.deliverAddress }}</span>
      </div>
      <div class="address">
        <span class="circle receipt"/>
        <span class="content">{{ info.recipientAddress }}</span>
      </div>
      <div class="footer">
        <template v-if="info.transportSheetStatus">
          <button class="button cancel" @click="modalCancelVisible=true">取消订单</button>
          <button class="button pay" @click="onClickPay">去支付</button>
        </template>
        <button v-else class="button detail" @click="onClickDetail">查看详情</button>
      </div>
    </Card>
    <ModalCancel :show.sync="modalCancelVisible" @onClickCancel="onClickCancel"/>
  </div>
</template>

<script>
import orderStatus from '@/constants/orderStatus'
import Card from '@/components/Card'
import {$error, $loading} from '@/utils'
import {orderCancel} from '@/service'
import ModalCancel from '@/components/Order/ModalCancel'

export default {
  props: ['info'],
  components: {ModalCancel, Card},
  data() {
    return {
      orderStatus,
      modalCancelVisible: false
    }
  },
  methods: {
    async onClickCancel() {
      const loading = $loading()
      try {
        await orderCancel(this.info.orderId)
        // todo 成功则刷新页面
        location.reload()
      } catch (e) {
        $error(e)
      } finally {
        loading.clear()
      }
    },
    onClickPay() {
      console.log('---onClickPay')
    },
    onClickDetail() {
      this.$router.push({name: 'orderDetail', params: {id: this.info.orderId}})
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.box-wrapper {
  margin-bottom: 30px;

  ::v-deep .OrderCard-wrapper {
    padding: 20px 24px 30px 18px;
  }

  .head {
    padding-left: 6px;
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    line-height: 40px;

    .number {
      color: #666666;
    }

    .red {
      color: #f12323;
    }

    .blue {
      color: #12A0FF;
    }

    .black {
      color: #333333;
    }

    .gray {
      color: #999999;
    }
  }

  .time {
    display: flex;
    align-items: center;
    padding-top: 30px;
    font-size: 28px;
    line-height: 40px;
    color: #888888;

    .icon {
      margin-right: 18px;
    }
  }

  .address {
    display: flex;
    align-items: center;
    line-height: 46px;
    padding-left: 6px;
    padding-top: 16px;
    color: #333333;
    font-size: 32px;

    .circle {
      min-width: 16px;
      min-height: 16px;
      border-radius: 50%;
    }

    .content {
      padding-left: 24px;
    }

    .send {
      background: $color-send;
    }

    .receipt {
      background: $color-receipt;
    }
  }

  .footer {
    padding-top: 40px;
    display: flex;
    justify-content: flex-end;

    > .button {
      border: 1px solid transparent;
      border-radius: 28px;
      background: transparent;
      width: 160px;
      padding: 8px 0;
      font-size: 28px;
      line-height: 40px;
      margin-left: 20px;

      &.cancel {
        color: #666666;
        border-color: #666666;
      }

      &.detail {
        color: $color-send;
        border-color: $color-send;
      }

      &.pay {
        color: white;
        background: $color-send;
        border-color: $color-send;
      }
    }
  }
}
</style>
