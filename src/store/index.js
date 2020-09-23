import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import api from '../assets/config/api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartTotal:{
      checkedGoodsAmount:0,
      checkedGoodsCount: 0,
      goodsAmount: 0,
      goodsCount: 0
    },
    cartList:[]

  },
  mutations: {
    setCartList:function(state,cartList){
      state.cartList=cartList
    },
    setcartTotal:function(state,cartTotal){
      state.cartTotal=cartTotal
    }
  },
  actions: {
      getCart:async function(content){
        let cartRes = await axios.post(api.CartList);
        console.log(cartRes.data)
        content.commit('setCartList',cartRes.data.data.cartList)
        content.commit('setcartTotal',cartRes.data.data.cartTotal)
      }
  },
  modules: {
  }
})
