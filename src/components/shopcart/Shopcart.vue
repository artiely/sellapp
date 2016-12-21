<template>
  <div id="shopcart">
    <div class="cart" :class="{'hightlight':totalCount>0 }">
      <i class="iconfont icon-gouwuche"></i>
      <span class="Badges">{{totalCount}}</span>
    </div>
    <div class="count" :class="{'has':totalCount>0}">
      ¥{{totalPrice}}
    </div>
    <div class="text-info">
      另需配送费{{seller.deliveryPrice}}元
    </div>
    <div class="pay" :class="{'go':totalPrice>=seller.minPrice}">
      <span v-show="totalPrice<=0">{{seller.minPrice}}元起送</span>
      <span v-show="totalPrice<seller.minPrice&&totalPrice>0">还差{{seller.minPrice-totalPrice}}元起送</span>
      <span v-show="totalPrice>=seller.minPrice">去结算</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    name: "shopcart",
    /*
     * 接收父组件传递过来的数据
     * 需要指定type
     *
     */
    props: {
      seller: {
        type: Object
      },
      selectFoods: {
        type: Array,
        default(){
          return [
            {
              price:10,
              count:1
            }
          ]
        }
      }
    },

    computed: {
      totalPrice(){
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total
      },
      totalCount(){
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count
        });
        return count
      }
    }
  }
</script>
<style lang='less'>
  #shopcart {
    height: 48px;
    width: 100%;
    background: #141d27;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 9;
    font-size: 0;
    .cart {
      height: 44px;
      width: 44px;
      background: #2b343c;
      border-radius: 50%;
      position: absolute;
      left: 18px;
      bottom: 0;
      z-index: 10;
      border: 6px solid #141d27;
      &.hightlight {
        background: rgb(0, 160, 228);
        .icon-gouwuche {
          color: #fff;
        }
      }
      .icon-gouwuche {
        text-align: center;
        line-height: 44px;
        font-size: 22px;
        color: rgba(255, 255, 255, .4);
        display: block;
      }
      .Badges {
        display: block;
        height: 16px;
        width: 24px;
        border-radius: 8px;
        background: red;
        color: #fff;
        position: absolute;
        top: -5px;
        right: -12px;
        font-size: 9px;
        font-weight: 700;
        text-align: center;
        line-height: 16px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, .4);
      }
    }
    .count {
      display: inline-block;
      height: 100%;
      line-height: 48px;
      font-size: 16px;
      font-weight: 700;
      color: rgba(255, 255, 255, .4);
      padding-left: 80px;
      &.has{
        color:#fff;
      }
    }
    .text-info {
      display: inline-block;
      height: 25px;
      border-left: 1px solid rgba(255, 255, 255, .1);
      margin-left: 12px;
      padding-left: 12px;
      color: rgba(255, 255, 255, .4);
      font-size: 16px;
      line-height: 25px;
      font-weight: 700;
    }
    .pay {
      height: 48px;
      width: 105px;
      position: absolute;
      top: 0;
      right: 0;
      background: #2b343c;
      font-weight: 700;
      text-align: center;
      line-height: 48px;
      font-size: 12px;
      color: rgba(255, 255, 255, .4);
      &.go{
        background: green;
        color: #fff;
      }
    }
  }
</style>
