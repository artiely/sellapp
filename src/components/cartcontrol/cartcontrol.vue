<template>
  <div class="cartcontrol">
    <transition name="fademove">
      <div class="cart-cut " @click="cutCount" v-show="food.count>0">
        <transition name="scroll">
          <div class="inner iconfont icon-anonymous-iconfont" v-show="food.count>0"></div>
          <!--条件渲染 （使用 v-if）
条件展示 （使用 v-show）外层动画和内层动画都得加上v-show才有都有效果这里至少花费我2个小时-->
        </transition>
      </div>
    </transition>

    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add" @click="addCount">
      <div class="inner iconfont icon-jia1"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  export default{
    props: {
      food: {
        type: Object,

      }
    },

    methods: {
      addCount(event){
        if (!event._constructed) {
          return; //阻止浏览器默认派发的事件
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }

      },
      cutCount(event){
        if (!event._constructed) {
          return
        }
        this.food.count--
      }
    },
    data(){
      return {
        msg: ''
      }
    }
  }
</script>
<style lang='less'>
  .fademove-enter-active, .fademove-leave-active {
    transition: all .5s
  }

  .fademove-enter, .fademove-leave-active {
    opacity: 0;
    transform: translate3D(24px, 0, 0);
  }

  .scroll-enter-active, .scroll-leave-active {
    transition: all .5s;
  }

  .scroll-enter, .scroll-leave-active {
    transform: rotate(180deg);
  }

  .cartcontrol {
    font-size: 0;
    .cart-cut, .cart-add {
      display: inline-block;
      cursor: pointer;
      vertical-align: top;
      .inner {
        padding: 5px;
        width: 24px;
        height: 24px;
        font-size: 24px;
        color: #0AA4EA;
      }
    }
    .cart-count {
      display: inline-block;
      font-size: 10px;
      width: 24px;
      text-align: center;
      height: 24px;
      padding: 5px 0;
      line-height: 24px;
      vertical-align: top;
    }
  }
</style>
