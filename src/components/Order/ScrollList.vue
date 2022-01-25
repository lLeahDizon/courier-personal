<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-if="records.length"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="fetchList"
    >
      <div v-for="(item,index) in records" :key="index">
        <OrderCard/>
      </div>
    </van-list>
    <div v-else class="empty-wrapper">
      <img src='@/assets/icons/empty.png' alt="">
      暂无订单~
    </div>
  </van-pull-refresh>
</template>

<script>
import OrderCard from '@/components/Order/OrderCard'
import {$error, eventBus} from '@/utils'
import {orderList} from '@/service'

export default {
  components: {OrderCard},
  data() {
    return {
      records: [],
      orderStatus: 0,
      current: 0,
      size: 15,
      // 上拉加载是否失效
      refreshing: false,
      loading: false,
      error: false,
      finished: false
    }
  },
  created() {
    this.init()
  },
  mounted() {
    eventBus.$on('refreshOrder', this.init)
  },
  methods: {
    async init() {
      try {
        await this.fetchList()
      } catch (e) {
        $error(e)
      }
    },
    async fetchList() {
      if (this.refreshing) {
        this.records = []
        this.current = 0
        this.refreshing = false
      }
      try {
        const data = {
          orderStatus: this.orderStatus,
          size: this.size,
          current: this.current * this.size
        }
        let {records, total} = await orderList(data)
        records = records.map(item => {
          return {
            ...item,
            moreDown: true
          }
        })
        this.records = this.records.concat(records)
        this.loading = false
        this.current += 1
        if (this.records.length >= total) {
          this.finished = true
        }
      } catch (error) {
        await Promise.reject(error)
      }
    },
    refreshOrder(value) {
      if (this.orderStatus !== value) {
        this.records = []
        this.current = 0
        this.orderStatus = value
        this.refreshing = false
        this.loading = true
        this.init()
      }
    },
    onRefresh() {
      this.finished = false
      this.loading = true
      this.fetchList()
    }
  }
}
</script>

<style lang="scss" scoped>
.empty-wrapper {
  display: flex;
  flex-direction: column;
  padding-top: 200px;
  align-items: center;
  font-size: 28px;
  color: #999999;
  line-height: 40px;

  img {
    width: 200px;
    height: 200px;
    margin-bottom: 20px;
  }
}
</style>
