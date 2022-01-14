<template>
  <Card>
    <div class="head">
      <span class="number">订单编号：</span>
      <span :class="orderStatus[0].className">{{ orderStatus[0].name }}</span>
    </div>
    <div class="time">
      <Icon name="order-time"/>
      2021-12-20 09:26
    </div>
    <div class="address">
      <span class="circle send"/>
      <span class="content">余杭区仓前街道XX路69号</span>
    </div>
    <div class="address">
      <span class="circle receipt"/>
      <span class="content">余杭区仓前街道XX路69号</span>
    </div>
    <div class="footer">
      <template>
        <button class="button cancel" @click="onClickCancel">取消订单</button>
        <button class="button pay" @click="onClickPay">去支付</button>
      </template>
      <button class="button detail" @click="onClickDetail">查看详情</button>
    </div>
  </Card>
</template>

<script>
import orderStatus from '@/constants/orderStatus'
import Card from '@/components/Card'

export default {
  props: ['info'],
  components: {Card},
  data() {
    return {
      orderStatus
    }
  },
  methods: {
    onClickCancel() {
      console.log('---onClickCancel')
    },
    onClickPay() {
      console.log('---onClickPay')
    },
    onClickDetail() {
      console.log('---onClickDetail')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

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
</style>
