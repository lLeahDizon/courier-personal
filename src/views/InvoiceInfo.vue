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
        <OrderCard :info="item"/>
      </div>
    </van-list>
    <div v-else class="empty-wrapper">
      <img src='@/assets/icons/empty.png' alt="">
      暂无可开票订单~
    </div>
  </van-pull-refresh>
</template>

<script>
export default {
  name: 'InvoiceInfo'
}
</script>

<style lang="scss" scoped>

</style>
