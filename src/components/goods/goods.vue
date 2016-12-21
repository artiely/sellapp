<template>
  <div id="goods">
    <div id="foods">
      <div class="menu-wrap" ref="menuWrap">
        <ul class="scroller">
          <li class="item" v-for="(name,index) in goods" v-if="goods[0].name" :class="{'current':currentIndex===index}" @click="selectMenu(index ,$event)">
            <div class="item-span">
              <span class="text">
                <span class="icon" v-show="name.type>0" :class="classMap[name.type]"></span>
                  {{name.name}}
              </span>
            </div>
          </li>
        </ul>
      </div>
      <div class="foods-wrap" ref="foodWrap">
        <ul class="scroller">
          <li v-for="name in goods" v-if="goods[0].name" class="list-hook">
            <div class="title">
              {{name.name}}
            </div>
            <ul>
              <li v-for="item in name.foods" class="foods-list">
                <div class="clear">
                  <div class="pic fl">
                    <img :src="item.icon">
                  </div>
                  <div class="content">
                    <h1 class="name">{{item.name}}</h1>
                    <p class="des">{{item.description}}</p>
                    <span class="sellCount">月售{{item.sellCount}}套</span>
                    <span class="rating">好评率{{item.rating}}%</span>
                    <div>
                      <span class="price"><span class="rmb">¥</span>{{item.price}}</span>
                      <span v-if="item.oldPrice" class="oldPricewrap"><span class="rmb">¥</span><span class="oldprice">{{item.oldPrice}}</span></span>
                    </div>
                    <div class="cartcontrolbox">
                      <Cartcontrol :food="item"></Cartcontrol>
                    </div>

                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <ShopCart :seller="seller" :select-foods="selectFoods"></ShopCart>
    <!--<div id="shop-cart">-->
      <!--<div class="cart">-->
        <!--<i class="iconfont icon-gouwuche"></i>-->
        <!--<span class="Badges">0</span>-->
      <!--</div>-->
      <!--<div class="count">-->
       <!--¥0-->
      <!--</div>-->
      <!--<div class="text-info">-->
        <!--另需配送费4元-->
      <!--</div>-->
      <!--<div class="pay">-->
        <!--¥{{minprice}}元起送-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import  Bscroll from 'better-scroll'
  import  ShopCart from 'components/shopcart/Shopcart.vue'
  import  Cartcontrol from 'components/cartcontrol/cartcontrol.vue'

  const ERR_OK = 0;
  export default{
    props:{
      seller:{
        type:Object
      }
    },
    data(){
      return {
        goods: [],
        listHeight: [],// list-hook 每个区间的高度 是一个递增的数组
        scrollY: 0  //需要跟踪的list-hook 的滚动高度

      }
    },
    mounted () {
      this.classMap = ["decrease", "discount", "guarantee", "invoice", "special"];
      this.$http.get('api/goods').then((response) => {
        if (response.body.errno === ERR_OK) {
          this.goods = response.body.data;
          this.$nextTick(() => {
            // DOM 更新循环之后执行才可以获取DOM的高度 初始化滚动 $nextTick 是vue的实例方法
            this._initBscroll();
            // 计算每个list-hook 的高度
            this._calculateHeight()
          })
        }
      }, (response) => {
        alert("数据读取失败！")
      })
    },
    computed: {
        /*当前滚动到的序列*/
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if ( !height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0
      },
      selectFoods(){
        var foods=[];
        this.goods.forEach((good) =>{
            good.foods.forEach((food) => {
                if(food.count){
                    foods.push(food)
                }
            })
        })
        return foods
      }

    },
    methods: {
        /*当前选择的菜单*/
      selectMenu (index,event) {
          if(!event._constructed){
              return //阻止浏览器默认派发的事件
          }
          let foodList = this.$refs.foodWrap.getElementsByClassName("list-hook");
          let el = foodList[index];
          /*
           * scrollToElement iscroll 的滚动到某个位置的接口
           * */
          this.foodScroll.scrollToElement(el,300);
      },
      // 初始化左右的滚动
      _initBscroll () {
        this.menuScroll = new Bscroll(this.$refs.menuWrap, {
            click:true
        });
        this.foodScroll = new Bscroll(this.$refs.foodWrap, {
          click:true,
          probeType: 3 //https://github.com/cubiq/iscroll 查看参数详情（ scroll在滚动的时候 实时告诉我们滚动的位置）
        });

        /*
         *foodScroll上监听滚动并获取位置
         * @ pos 位置
         * */
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y)) ;// 数据scrollY实时更新为pos.y 先取整在取绝对值 => 正整数
        })
      },
      _calculateHeight () {
        let foodList = this.$refs.foodWrap.getElementsByClassName("list-hook");
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height)
        }
      }
    },
    components: {ShopCart,Cartcontrol}
  }
</script>
<style lang='less'>
  @import "../../assets/css/tool.less";

  #foods {
    position: absolute;
    top: 174px;
    bottom: 48px;
    width: 100%;
    overflow: hidden;
    display: flex;
    .menu-wrap {
      background: #f3f5f7;
      flex: 0 0 80px;
      width: 80px;
      .item {
        width: 80px;
        height: 54px;
        line-height: 1;
        font-size: 12px;
        display: table;
        &.current {
          position: relative;
          margin-top: -1px;
          background: #fff;
          .item-span {
            .border-1px(rgba(0, 0, 0, 0));
            .text{
              font-weight: 700;
            }
          }
        }
        .item-span {
          width: 56px;
          height: 54px;
          line-height: 14px;
          display: table;
          margin-left: 12px;
          .border-1px(rgba(7, 17, 27, .1));
          .text {
            width: 56px;
            display: table-cell;
            vertical-align: middle;
            .icon {
              width: 12px;
              height: 12px;
              vertical-align: top;
              display: inline-block;
              background-size: 100%;
              &.decrease {
                background-image: url(decrease_4@3x.png);
              }
              &.discount {
                background-image: url(discount_4@3x.png);
              }
              &.guarantee {
                background-image: url(guarantee_4@3x.png);
              }
              &.invoice {
                background-image: url(invoice_4@3x.png);
              }
              &.special {
                background-image: url(special_4@3x.png);
              }
            }
          }
        }
      }
    }
    .foods-wrap {
      flex: 1;
      .title {
        width: 100%;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        text-indent: 14px;
        color: rgba(147, 153, 159, 1);
        background: #f3f5f7;
      }
      .foods-list {
        width: 100%;
        .border-1px(rgba(7, 17, 27, .1));
        &:last-child {
          .border-1px(rgba(255, 255, 255, 0));
        }
        .clear {
          padding: 18px;
          display: flex;
        }
        .pic {
          flex: 0 0 57px;
          width: 57px;
          height: 57px;
          border-radius: 2px;
          overflow: hidden;
          margin-right: 10px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .content {
          flex: 1;
          position: relative;
          .cartcontrolbox{
            position: absolute;
            bottom:-10px;
            right: 0;
          }
        }
        .name {
          font-size: 14px;
          font-weight: 700;
          color: rgb(7, 17, 27);
          line-height: 14px;
          vertical-align: top;
        }
        .des, .sellCount, .rating {
          font-size: 10px;
          color: rgb(147, 153, 159);
          line-height: 10px;
        }
        .des {
          line-height: 12px;
          margin-top: 8px;
        }
        .price {
          font-size: 14px;
          font-weight: 700;
          margin-top: 8px;
          color: rgb(240, 20, 20);
          margin-right: 4px;
        }
        .oldPricewrap {
          color: rgb(147, 153, 159);
        }
        .oldprice {
          font-size: 12px;
          font-weight: 700;
          margin-top: 8px;
          color: rgb(147, 153, 159);
          text-decoration: line-through;
        }
        .rmb {
          font-weight: 200;
          font-size: 10px;
          margin-right: 2px;
        }
      }
    }
  }


</style>
