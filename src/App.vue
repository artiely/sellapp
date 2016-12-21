<template>
    <div id="app">
        <HeaderComponent :seller="seller"></HeaderComponent>

      <div class="nav">
        <!-- 使用 router-link 组件来导航. -->
        <!-- 通过传入 `to` 属性指定链接. -->
        <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
        <router-link to="/goods">商品</router-link>
        <router-link to="/ratings">评价</router-link>
        <router-link to="/seller">商家</router-link>
      </div>
      <!-- 路由出口 -->
      <!-- 路由匹配到的组件将渲染在这里  seller数据再次传递给路由在传递给子组件-->
      <router-view :seller="seller"></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
import HeaderComponent from 'components/header/header.vue'

const ERR_OK = 0 ;
export default {
  name: 'app',
  components: {
    HeaderComponent
  },
  data(){
     return{
     seller:{}
     }
  },
  mounted(){
          this.classMap=["decrease","discount","guarantee","invoice","special"]
          this.$http.get('api/seller').then( (response) => {
            if( response.body.errno === ERR_OK){
                this.seller=response.body.data
            }
          },(response) => {
            alert("数据读取失败！")
          })
        }

}

</script>

<style lang="less">
    @import "assets/css/reset.css";
    @import url('assets/css/tool.less');

    .nav{
      height:40px;
      line-height: 40px;
      width: 100%;
      display: flex;
      .border-1px(rgba(7,17,27,.1));
      a{
        display: block;
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: rgb(77,85,93);
        font-weight:700;
        &.router-link-active{
          color:rgb(240,20,20)
        }
      }

    }

</style>
