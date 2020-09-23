<template>
  <div id="buycart">
    <h1>购物车</h1>
    <div class="info">
      <span>30天无忧退货</span>
      <span>48小时快速退款</span>
      <span>满88元免邮费</span>
    </div>

    <div class="list">
      <div class="cartitem" v-for="item in cartList" :key="item.id">
        <van-checkbox @change="checkEvent($event,item)" v-model="item.checked"></van-checkbox>
        <van-image fit="cover" width="70" height="70" :src="item.list_pic_url" />
        <div class="proBreif">
          <div class="title">
            <span>{{item.goods_name}}</span>
            <span class="num">X{{item.number}}</span>
          </div>
          <p class="brief">{{item.goods_specifition_name_value}}</p>
          <p class="price">￥{{item.retail_price}}</p>
        </div>
      </div>
    </div>

    <!-- <tab-btn> -->
    <van-submit-bar suffix-label="编辑" :price="cartTotal.checkedGoodsAmount*100" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checkedAll">全选</van-checkbox>
    </van-submit-bar>
    <!-- </tab-btn> -->
  </div>
</template>
<script>
import tabBtn from "../components/tabBtn";
import { mapState } from "vuex";
import axios from "axios";
import api from "../assets/config/api";

let mapSteateObj = mapState(["cartTotal", "cartList"]);
export default {
  data() {
    return {
      checked: true,
    };
  },
  methods: {
    onSubmit: function () {},
    checkEvent: async function (event, item) {
      console.log(event, item);
      let res = await axios.post(api.CartChecked, {
        isChecked: Number(event),
        productIds: item.product_id,
      });
      let data = res.data.data;

      this.$store.commit("setCartList", data.cartList);
      this.$store.commit("setcartTotal", data.cartTotal);
      this.$forceUpdate()
    },
  },

  components: {
    tabBtn,
  },
  computed: {
    ...mapSteateObj,
    checkedAll: {
      set(val) {
        console.log(val, "设置全选");
      },
      get() {
        if (this.cartTotal.goodsCount == this.cartTotal.checkedGoodsCount) {
          return true;
        } else {
          false;
        }
      },
    },
  },
  mounted() {
    console.log(this.cartList);
    this.$store.dispatch("getCart");
  },
};
</script>
<style lang="less">
#buycart {
  .info {
    display: flex;
    justify-content: space-around;
    font-size: 12px;
    height: 24px;
    line-height: 24px;
    color: #999;
    background: #efefef;

    span {
      position: relative;
    }
    span::before {
      content: "";
      display: block;
      position: absolute;
      left: -10px;
      top: 8px;
      width: 4px;
      height: 4px;
      border-radius: 2px;
      border: 1px solid red;
    }
  }
  .cartitem {
    padding: 0 5px;
    display: flex;
    align-items: center;
    padding: 10px 5px;
    .van-checkbox {
      padding: 0 5px;
    }
    .van-image {
      background: #efefef;
    }
    .proBreif {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      height: 70px;
      padding: 0 10px;
      .title {
        width: 100%;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
      }
      .brief {
        color: #999;
        font-size: 12px;
      }
     
    }
  }
}
</style>