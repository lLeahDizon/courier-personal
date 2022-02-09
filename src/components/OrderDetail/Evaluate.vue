<template>
  <Card>
    <div class="Evaluate-content">
      <span class="title">您对本次寄件服务还满意吗?</span>
      <div class="evaluate-list">
        <div
          v-for="(item, index) in evaluateList"
          :key="index"
          class="evaluate-item"
          @click="onClickItem(item)">
          <Icon :name="item.icon"/>
          <span class="title">{{ item.title }}</span>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
import Card from '@/components/Card'
import evaluateList from '@/constants/evaluateList'
import {commentAdd} from '@/service'
import {$error, $loading} from '@/utils'

export default {
  name: 'Evaluate',
  components: {Card},
  props: ['transportSheetId'],
  data() {
    return {evaluateList}
  },
  methods: {
    async onClickItem(item) {
      const loading = $loading()
      try {
        await commentAdd({
          score: item.type,
          transportSheetId: this.transportSheetId
        })
        this.$emit('showModal', item)
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
.Evaluate-content {
  padding-top: 2px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;

  > .title {
    font-size: 36px;
    color: #333333;
    line-height: 50px;
  }

  > .evaluate-list {
    padding-top: 80px;
    display: flex;
    width: 100%;
    justify-content: space-evenly;

    > .evaluate-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 26px;
      color: #888888;
      line-height: 36px;

      .icon {
        font-size: 96px;
      }

      > .title {
        padding-top: 16px;
      }
    }
  }
}
</style>
