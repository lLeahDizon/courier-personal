<template>
  <van-popup
    round
    v-model="visible"
    class="modal-wrapper"
    position="bottom"
    get-container="#app"
    @close="onClose">
    <header>
      <span class="title">计费规则</span>
      <Icon name="certification-close" @click="onClose"/>
    </header>
    <div class="content-wrapper">
      <table>
        <tr>
          <th>距离</th>
          <th>重量</th>
          <th>价格</th>
        </tr>
        <tr v-for="(item, index) in dataList" :key="index">
          <td>{{ item.distance }}</td>
          <td>{{ item.weight }}</td>
          <td class="price">{{ item.price }}</td>
        </tr>
      </table>
      <div v-for="(item,index) in ruleList" :key="index" class="rule-wrapper">
        <div class="circle">{{ index + 1 }}</div>
        <div class="rule">
          <span v-html="item.content.replace(/\n/g, '</br>')"/>
          <span v-if="item.desc" class="desc" v-html="item.desc.replace(/\n/g, '</br>')"/>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script>
import ruleList from '@/constants/ruleList'

const dataList = [
  {
    distance: '0-300km',
    weight: '5kg',
    price: '269元'
  },
  {
    distance: '300-500km',
    weight: '5kg',
    price: '398元'
  },
  {
    distance: '500-700km',
    weight: '5kg',
    price: '688元'
  },
  {
    distance: '700-1200km',
    weight: '5kg',
    price: '898元'
  },
  {
    distance: '1200km以上',
    weight: '5kg',
    price: '1200元'
  }
]

export default {
  props: ['show'],
  data() {
    return {
      dataList,
      ruleList,
      visible: false
    }
  },
  watch: {
    show(val) {
      this.visible = val
    }
  },
  methods: {
    onClose() {
      this.$emit('update:show', false)
    },
  }
}
</script>

<style lang="scss" scoped>
.modal-wrapper {
  padding: 30px 40px 40px;
  width: 100%;
  max-height: 70vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 24px;

    .title {
      font-size: 36px;
      font-weight: bold;
      color: #333333;
      line-height: 50px;
    }

    .icon {
      font-size: 30px;
    }
  }

  .content-wrapper {
    overflow-y: scroll;

    table {
      width: 100%;
      background: #F7F7F7;
      border-radius: 20px;
      padding-top: 24px;

      tr {
        display: flex;
        padding-bottom: 30px;

        th {
          width: 33.33%;
          font-size: 26px;
          color: #666666;
          line-height: 38px;
        }

        td {
          width: 33.33%;
          text-align: center;
          font-size: 26px;
          color: #333333;
          line-height: 38px;

          &.price {
            color: #12a0ff;
          }
        }
      }
    }

    .rule-wrapper {
      display: flex;
      padding-top: 30px;
      align-items: baseline;

      > .circle {
        flex-grow: 1;
        border: 2px solid #E6E6E6;
        padding: 2px 0;
        font-size: 26px;
        color: #333333;
        line-height: 36px;
        border-radius: 50%;
        max-width: 40px;
        min-width: 40px;
        max-height: 40px;
        min-height: 40px;
        text-align: center;
      }

      > .rule {
        display: flex;
        flex-direction: column;
        padding-left: 16px;
        font-size: 26px;
        color: #333333;
        line-height: 38px;

        > .desc {
          padding-top: 10px;
          color: #12a0ff;
        }
      }
    }
  }
}
</style>
