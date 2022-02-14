<template>
  <van-popup v-model="visible" class="modal-wrapper" round position="bottom" get-container="#app" @close="onClose">
    <header>
      <span class="title">物品类型</span>
      <div class="tips" @click="onClickTips">禁寄物品
        <Icon name="tips"/>
      </div>
    </header>
    <div class="type-wrapper">
      <div v-for="item in TYPE_LIST"
           :key="item.id"
           class="type"
           :class="{'active':selectList.map(val => val.id).includes(item.id)}"
           @click="onSelectType(item)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="title">
      物品重量
    </div>
    <div class="weight-wrapper">
      <van-stepper v-model="weight" class="weight" step="1" min="0.1" max="9999"/>
      公斤
    </div>
    <div class="title">
      物品件数
    </div>
    <div class="weight-wrapper">
      <van-stepper v-model="number" integer class="weight" step="1" min="1" max="9999"/>
      件
    </div>
    <p class="desc">注：可能会存在实际重量增加、物品超件等情况，实际以达人收取确定为准，可能会影响收费。<a @click="onClickDesc">了解计费规则＞</a></p>
    <button class="btn" @click="onNext">下一步</button>
  </van-popup>
</template>

<script>
import {$error} from '@/utils'

const TYPE_LIST = [
  {
    id: 1,
    name: '手机数码'
  },
  {
    id: 2,
    name: '证件'
  },
  {
    id: 3,
    name: '美食'
  },
  {
    id: 4,
    name: '合同文件'
  },
  {
    id: 5,
    name: '鲜花'
  },
  {
    id: 6,
    name: '灯具'
  },
  {
    id: 7,
    name: '奶粉'
  },
  {
    id: 8,
    name: '茶叶'
  },
  {
    id: 9,
    name: '绿植'
  },
  {
    id: 10,
    name: '护肤品'
  },
  {
    id: 11,
    name: '食品'
  },
  {
    id: 12,
    name: '生鲜'
  },
  {
    id: 13,
    name: '其他'
  }
]

export default {
  props: ['show'],
  data() {
    return {
      TYPE_LIST,
      selectList: [],
      weight: 0.1,
      number: 1,
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
    onNext() {
      if (!this.selectList.length) {
        return $error('请选择物品类型')
      }
      if (Number(this.weight) > 20) {
        this.$emit('showModalCustom')
      }
      this.$emit('onNext', {
        itemDescription: this.selectList.map(item => item.name).join('、'),
        weight: this.weight,
        number: this.number,
        itemList: this.selectList.map(item => item.id)
      })
      this.onClose()
    },
    onClickDesc() {
      this.$emit('showModalRules')
    },
    onClickTips() {
      this.$emit('showModalTips')
    },
    onSelectType(val) {
      const hasSelectList = this.selectList.filter(item => item.id !== val.id)
      if (hasSelectList.length === this.selectList.length) {
        hasSelectList.push(val)
      }
      this.selectList = hasSelectList
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-wrapper {
  padding: 30px 40px 40px;
  width: 100%;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .tips {
      font-size: 28px;
      color: #666666;
      line-height: 40px;

      .icon {
        margin-left: 10px;
      }
    }
  }

  .title {
    font-size: 36px;
    font-weight: bold;
    color: #333333;
    line-height: 50px;
  }

  .type-wrapper {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 48px;

    .type {
      width: 208px;
      margin-top: 24px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 32px;
      border: 1px solid #E6E6E6;
      padding: 12px;
      text-align: center;
      font-size: 28px;
      color: #333333;
      line-height: 40px;

      &:not(:nth-child(3n)) {
        margin-right: 23px;
      }

      &.active {
        border: 1px solid #12A0FF;
        background: rgba(18, 160, 255, 0.1);
        color: #12A0FF;
      }
    }
  }

  .weight-wrapper {
    display: flex;
    align-items: center;
    padding-top: 24px;
    padding-bottom: 24px;
    font-size: 28px;
    color: #AAAAAA;
    line-height: 40px;

    .weight {
      margin-right: 16px;
    }
  }

  .desc {
    font-size: 26px;
    color: #999999;
    line-height: 37px;
    padding: 24px 0 60px;

    a {
      color: #12a0ff;
    }
  }

  .btn {
    background: #12A0FF;
    border-radius: 50px;
    font-size: 36px;
    color: #FFFFFF;
    line-height: 43px;
    padding: 20px 0;
    width: 100%;
  }
}
</style>
