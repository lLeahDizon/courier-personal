<template>
  <div class="address-wrapper">
    <div class="top-fixed">
      <input id="tipinput" v-model="searchValue" placeholder="请输入地址" type="text">
      <Icon name="certification-close" @click="searchValue=''"/>
    </div>
    <div id="container"></div>
    <div class="bottom-fixed">
      <div class="top">请确认发件地址是否准确，如不准确可拖动地图进行调整</div>
      <div class="bottom">
        <div v-if="searchValue" class="desc">
          <div class="circle blue"></div>
          从&nbsp;<span class="blue">{{ searchValue }}</span>&nbsp;发件
        </div>
        <button class="btn" @click="onSubmit">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'
import {mapActions} from 'vuex'
import {$error} from '@/utils'

export default {
  name: 'AddressConfirm',
  data() {
    return {
      searchValue: '',
      district: '',
      lng: '',
      lat: '',
      map: null
    }
  },
  beforeCreate() {
    AMapLoader.load({
      key: '47b0234461b5db55416a5722594e35f3',
      plugins: ['AMap.Autocomplete', 'AMap.PlaceSearch']
    }).then(AMap => {
      this.$nextTick(() => this.initAMap(AMap))
    }).catch(e => {
      console.error(e)
    })
  },
  methods: {
    ...mapActions(['setAddressInfo']),
    initAMap(AMap) {
      this.map = new AMap.Map('container', {
        viewMode: '3D',
        resizeEnable: true,
        zoom: 12,
        zooms: [2, 22]
      })
      const autoComplete = new AMap.Autocomplete({input: 'tipinput', city: '全国'})
      const placeSearch = new AMap.PlaceSearch({city: '全国'})
      AMap.event.addListener(autoComplete, 'select', (e) => {
        //TODO 针对选中的poi实现自己的功能
        console.log('---select')
        console.log(e.poi)
        this.searchValue = e.poi.address + e.poi.name
        if (!e.poi.location) {
          this.lng = ''
          this.lat = ''
          this.district = ''
        } else {
          this.lng = e.poi.location.lng
          this.lat = e.poi.location.lat
          this.district = e.poi.district
          placeSearch.search(e.poi.address + e.poi.name)
        }
      })
    },
    onSubmit() {
      if (!this.lng || !this.lat) {
        return $error('当前选择地点错误或范围较大，请重新选择')
      }
      this.setAddressInfo({
        searchValue: this.searchValue,
        lng: this.lng,
        lat: this.lat,
        district: this.district
      })
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.address-wrapper {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  position: absolute;

  > .top-fixed {
    position: fixed;
    z-index: 3;
    top: 24px;
    left: 30px;
    right: 30px;
    padding: 20px;
    box-shadow: 0 2px 20px 0 rgba(51, 51, 51, 0.05);
    border-radius: 40px;
    background: white;
    display: flex;
    align-items: center;

    #tipinput {
      flex-grow: 1;
      font-size: 28px;
      line-height: 40px;
    }

    #tipinput::-webkit-input-placeholder {
      color: #aaaaaa;
    }

    #tipinput::-moz-placeholder {
      color: #aaaaaa;
    }

    #tipinput:-moz-placeholder {
      color: #aaaaaa;
    }

    #tipinput:-ms-input-placeholder {
      color: #aaaaaa;
    }

    .icon {
      font-size: 28px;
    }
  }

  > .bottom-fixed {
    position: fixed;
    z-index: 2;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;

    > .top {
      background: #FFF8EB;
      border-radius: 40px 40px 0 0;
      padding: 20px 40px;
      font-size: 26px;
      color: #FF8133;
      line-height: 37px;
    }

    > .bottom {
      padding: 40px;
      border-radius: 40px 40px 0 0;

      > .desc {
        display: flex;
        align-items: center;
        font-size: 36px;
        color: #333333;
        line-height: 50px;
        padding-bottom: 40px;

        > .circle {
          width: 16px;
          height: 16px;
          margin-right: 16px;
          border-radius: 50%;

          &.blue {
            background: #12a0ff;
          }

          &.yellow {
            background: #ffbc45;
          }
        }

        > .address {
          font-weight: Medium;
        }

        > .blue {
          color: #12a0ff;
        }

        > .yellow {
          color: #ffbc45;
        }
      }

      > .btn {
        width: 100%;
        padding: 20px 0;
        background: #12A0FF;
        border-radius: 50px;
        font-size: 36px;
        color: #FFFFFF;
        line-height: 43px;
      }
    }
  }

  #container {
    position: absolute;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
}
</style>
