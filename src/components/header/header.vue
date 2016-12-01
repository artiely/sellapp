<template>
  <div id="header">
    <div class="bg-img"><img :src="seller.avatar"></div>
    <div class="tophead">
      <div class="avatar">
        <img v-if="seller" :src="seller.avatar">
      </div>
      <div class="seller-info">
        <h1 class="title"><span class="brand"></span>{{seller.name}}</h1>
        <div class="description"><span :class=""></span>{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div class="supports" v-if="seller.supports"><span :class="classMap[seller.supports[0].type]" class="icon"></span>{{seller.supports[0].description}}</div>
      </div>
      <div class="supports-num" v-if="seller.supports" @click="show">
        {{seller.supports.length}}个<span class="iconfont icon-jiantouyoujiantou icon"></span>
      </div>
    </div>
    <div class="notice" @click="show">
      <div class="icon-wrap">
        <span class="notic-icon"></span>
      </div>

      <span class="text">{{seller.bulletin}}</span>
      <span class="iconfont icon-jiantouyoujiantou icon"></span>
    </div >
    <div class="seller_description" v-if="showorhide">
      <div class="main-wrap clear">
        <div class="main-description">
          <h1 class="name">{{seller.name}}</h1>
          <div class="title">
            <span class="line"></span>
            <span class="text">优惠信息</span>
            <span class="line"></span>
          </div>
          <ul class="supports-list" v-if="seller.supports">
            <li v-for="item in seller.supports" class="item">
              <span :class="classMap[item.type]" class="icon"></span> <span class="text">{{item.description}}</span>
            </li>
          </ul>
          <div class="title">
            <span class="line"></span>
            <span class="text">商家公告</span>
            <span class="line"></span>
          </div>
          <p class="bulletin" v-if="seller.bulletin">{{seller.bulletin}}</p>
        </div>
      </div>
        <div class="footer-close">
          <i class="iconfont icon-x"  @click="hide"></i>
        </div>
    </div>

  </div>
</template>

<script type='text/ecmascript-6'>
    export default{
        name: 'header',

      /*
       * 接收父组件传递过来的数据
       * 需要指定type
       *
       */
        props:{
          seller:{
            type:Object
          }
        },
        data(){
            return{
                msg:'hello vue',
                showorhide:false
            }
        },
      /*
       * 这是一个className的映射，
       * 对应到数据seller.supports[0].type
       * 取出来的type对应classMap的序列
       * */
        mounted(){
          this.classMap=["decrease","discount","guarantee","invoice","special"]

        },
        methods:{
          hide(){
            this.showorhide =false
          },
          show(){
            this.showorhide =true
          }
        }
    }

</script>
<style lang="less">
  @import url('../../assets/css/tool.less');
  #header {
    position: relative;
    background: rgba(0,0,0,.5);
    width: 100%;
    font-size: 0;
    .bg-img{
      position: absolute;
      top:0;
      left:0;
      z-index: -1;
      width: 100%;
      height: 100%;
      overflow: hidden;
      img{
        width: 100%;
        height:100%;
        filter: blur(10px);
      }
    }
    .tophead{
      padding: 24px 12px 18px 24px;
      position: relative;
    }
    .avatar {
      width: 64px;
      height: 64px;
      display: inline-block;
      overflow: hidden;
      border-radius: 2px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .seller-info{
      vertical-align: top;
      display: inline-block;
      padding-left: 16px;
      .title{
        line-height:18px;
        font-size: 16px;
        font-weight:700;
        color: #fff;
        .brand{
          height:18px;
          width: 30px;
          display: inline-block;
          background-size:100%;
          background-image: url(brand@2x.png);
          vertical-align: middle;
          margin-right: 6px;
        }
      }
      .description,.supports{
        font-size: 12px;
        line-height:12px;
        color: #fff;
      }
      .description{
        margin-top: 8px;
      }
      .supports{
        margin-top: 10px;
        font-size: 10px;
        line-height:12px;
        .icon{
          width: 12px;
          height:12px;
          vertical-align: top;
          display: inline-block;
          background-size:100%;
          margin-right: 4px;
          &.decrease{
            background-image:url(decrease_1@2x.png);
          }
          &.discount{
            background-image:url(discount_1@2x.png);
          }
          &.guarantee{
            background-image:url(guarantee_1@2x.png);
          }
          &.invoice{
            background-image:url(invoice_1@2x.png);
          }
          &.special{
            background-image:url(special_1@2x.png);
          }
        }

      }
    }
    .supports-num{
      width: 40px;
      height: 24px;
      line-height:24px;
      font-size: 12px;
      text-align: center;
      color: #fff;
      border-radius: 6px;
      background: rgba(0,0,0,.2);
      position: absolute;
      bottom:18px;
      right:12px;
      .icon{
        font-size: 5px;
      }
    }
    .notice{
      width: 100%;
      height:28px;
      display: flex;
      line-height:28px;
      background: rgba(7,17,27,.2);
      .icon-wrap{
        flex: 0 0 38px;
      }
      .notic-icon{
        width: 22px;
        height:12px;
        line-height:28px;
        background: url("bulletin@3x.png");
        background-size:100%;
        margin-left: 12px;
        margin-right: 4px;
        float: left;
        margin-top: 8px;
      }
      .text{
        flex: 1;
        height:100%;
        vertical-align: middle;
        .textover(1);
        font-size: 10px;
        color: #fff;
      }
      .icon{
        flex: 0 0 12px;
        font-size: 5px;
        color: #fff;
        line-height:28px;
        vertical-align: top;
        float: right;
        padding-right: 12px;
      }
    }
    .seller_description{
      position: fixed;
      top:0;
      left:0;
      width: 100%;
      height:100%;
      background: rgba(7,17,27,.8);
      color: #fff;
      font-size: 12px;
      overflow: auto;
      .main-wrap{
        min-height: 100%;
      }
      .main-description{
        overflow: auto;
        padding-bottom: 69px;
        width: 80%;
        margin: 0 auto;
        color: #fff;
        .title{
            width: 100%;
            height: 14px;
            line-height: 14px;
            display: flex;
            vertical-align: middle;
            margin-top: 28px;
            margin-bottom: 24px;
            .line{
              height:7px;
              flex:1;
              border-bottom: 2px solid rgba(255,255,255,.2);
              vertical-align: middle;
            }
          .text{
            padding: 0 12px;
            font-size: 14px;
            font-weight: 700;
          }
        }
        .supports-list{
          .item{
            margin-bottom: 12px;
          }
          .icon{
            width: 16px;
            height:16px;
            display: inline-block;
            background-size:100%;
            &.decrease{
              background-image:url(decrease_1@2x.png);
            }
            &.discount{
              background-image:url(discount_1@2x.png);
            }
            &.guarantee{
              background-image:url(guarantee_1@2x.png);
            }
            &.invoice{
              background-image:url(invoice_1@2x.png);
            }
            &.special{
              background-image:url(special_1@2x.png);
            }
          }
          .text{
            vertical-align: top;
            font-size: 12px;
            line-height: 16px;
            margin-left: 6px;
          }
        }
        .name{
          font-size: 18px;
          font-weight:700;
          padding-top: 64px;
          text-align: center;
        }
        .bulletin{
          font-size: 12px;
          line-height: 24px;
        }
      }
      .footer-close{
        position: relative;
        margin-top: -69px;
        width: 100%;
        height: 69px;
        line-height: 69px;
        text-align: center;
        clear: both;
        .icon-x{
          font-size: 30px;
          color: rgba(255,255,255,.5);
        }
      }
    }
  }
</style>
