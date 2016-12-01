/**
 * Created by Administrator on 2016/12/1 0001.
 */


import Goods from 'components/goods/goods.vue'
import Seller from 'components/seller/seller.vue'
import Ratings from 'components/ratings/ratings.vue'

//把路由作为一个对象导出
export  default {
  mode:'history',
  routes : [
    { path: '/', component: Goods },
    { path: '/goods', component: Goods },
    { path: '/seller', component: Seller },
    { path: '/ratings', component: Ratings }
  ]
}
