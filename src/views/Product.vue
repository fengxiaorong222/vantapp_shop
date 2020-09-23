<template>
  <div id="product">
    <van-nav-bar title="商品" left-text="返回" left-arrow @click-left="topLeft_return" />
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="item in images" :key="item.id">
        <img class="swipeImg" v-lazy="item.img_url" />
      </van-swipe-item>
    </van-swipe>
    <div class="info">
      <span>30天无忧退货</span>
      <span>48小时快速退款</span>
      <span>满88元免邮费</span>
    </div>
    <div class="proInfo">
      <h3 class="title">{{info.name}}</h3>
      <p class="brief">{{info.goods_brief}}</p>
      <p class="price">￥{{info.retail_price}}</p>
    </div>
    <van-cell value="请选择规格数量" is-link />
    <!-- 商品参数 -->
    <div class="proParams">
      <h3>商品参数</h3>
      <div class="proItem" v-for="item in attribute" :key="item.name">
        <span class="title">{{item.name}}</span>
        <span class="value">{{item.value}}</span>
      </div>
    </div>
    <!-- 商品详情 -->
    <div class="proDetail" v-html="info.goods_desc"></div>
    <!-- 购物车导航 -->
    <van-goods-action>
      <van-goods-action-icon
        to="/buycart"
        :info="$store.state.cartTotal.goodsCount==0?'':$store.state.cartTotal.goodsCount"
        icon="cart-o"
        text="购物车"
      />
      <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
      <van-goods-action-button type="warning" text="加入购物车" @click="IsShowSku" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
    <!-- 选择商品规格 -->
    <van-sku
      v-model="showSku"
      :sku="sku"
      :goods="goods"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    />
  </div>
</template>
<script>
let sku = {
  // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
  // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
  tree: [],
  // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
  list: [
    {
      id: 2259, // skuId
      s_1: 1, // 规格类目 k_s 为 s1 的对应规格值 id
      s_2: 4, // 规格类目 k_s 为 s2 的对应规格值 id

      price: 100, // 价格（单位分）
      stock_num: 110, // 当前 sku 组合对应的库存
    },
    {
      id: 2259, // skuId
      s_1: 2, // 规格类目 k_s 为 s1 的对应规格值 id
      s_2: 3, // 规格类目 k_s 为 s2 的对应规格值 id

      price: 100, // 价格（单位分）
      stock_num: 110, // 当前 sku 组合对应的库存
    },
    {
      id: 2259, // skuId
      s_1: 2, // 规格类目 k_s 为 s1 的对应规格值 id
      s_2: 4, // 规格类目 k_s 为 s2 的对应规格值 id

      price: 100, // 价格（单位分）
      stock_num: 110, // 当前 sku 组合对应的库存
    },
  ],
  price: "0", // 默认价格（单位元）
  stock_num: 0, // 商品总库存
  collection_id: 0, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
  none_sku: false, // 是否无规格商品
  hide_stock: false, // 是否隐藏剩余库存
};

let goods = {
  title: "测试商品",
  // 默认商品 sku 缩略图
  picture: "https://img.yzcdn.cn/1.jpg",
};

import axios from "axios";
import api from "../assets/config/api";
export default {
  props: ["id"],
  data() {
    return {
      data: {},
      info: {}, //商品信息
      attribute: {}, //商品参数
      showSku: false, //加入购物车页面显示隐藏
      sku, //库存保有单位
      goods,
    };
  },
  computed: {
    images: function () {
      if (this.data.gallery == undefined) {
        return [];
      } else {
        return this.data.gallery;
      }
    },
  },
  methods: {
    //返回到上一个页面
    topLeft_return: function () {
      this.$router.go(-1);
    },
    //购物车显示隐藏
    IsShowSku: function () {
      this.showSku = true;
    },
    // 选择商品规格并加入购物车
    onAddCartClicked: async function (skuData) {
      this.showSku = false;
      //获取选中的商品提交到后端购物车api里
      console.log(skuData);
      let chooseContent =
        skuData.selectedSkuComb["s_1"] + "_" + skuData.selectedSkuComb["s_2"];

      let resultPro = this.data.productList.filter((item, index) => {
        if (item.goods_specification_ids == chooseContent) {
          return true;
        } else {
          return false;
        }
      });
      let cartRes = await axios.post(api.CartAdd, {
        goodsId: resultPro[0].goods_id,
        number: skuData.selectedNum,
        productId: resultPro[0].id,
      });
      let data = cartRes.data.data;

      this.$store.commit("setCartList", data.cartList);
      this.$store.commit("setcartTotal", data.cartTotal);
    },
    // 立即购买,将当前内容提交到订单页
    onBuyClicked: function () {
      console.log("购买中。。。");
    },
  },
  async mounted() {
    this.$store.dispatch("getCart");
    console.log(this.id);
    let res = await axios.get(api.GoodsDetail, { params: { id: this.id } });
    this.data = res.data.data;
    this.info = this.data.info;
    this.attribute = this.data.attribute;
    //购物车
    this.goods.title = this.info.name; //商品标题
    this.goods.picture = this.info.primary_pic_url; //商品图
    this.sku.price = this.info.retail_price; //价格
    this.sku.stock_num = this.info.goods_number; //库存
    // this.sku.collection_id=this.productList
    // 商品选项
    let tree = []; //选项
    this.data.specificationList.forEach((item, index) => {
      let arr = [];
      item.valueList.forEach((product, i) => {
        arr.push({
          id: product.id, // skuValueId：规格值 id
          name: product.value, // skuValueName：规格值名称
        });
      });
      tree.push({
        k: item.name, // skuKeyName：规格类目名称
        v: arr,
        k_s: "s_" + item.specification_id, // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
      });
    });

    this.sku.tree = tree;

    console.log(res.data.data);
  },
};
</script>
<style lang="less">
#product {
  .swipeImg {
    width: 100%;
  }
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

  .proInfo {
    .title {
      font-weight: 500;
      padding: 10px 0px 5px;
    }
    .brief {
      font-size: 12px;
      color: #999;
      padding: 3px;
    }
    .price {
      font-size: 16px;
      color: red;
      padding: 5px;
    }
  }
  .proParams {
    padding-bottom: 20px;
    h3 {
      padding: 10px 0;
    }
    .proItem {
      width: 90%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      height: 24px;
      color: #999;
      font-size: 12px;
      line-height: 24px;
      background: #efefef;
      text-align: left;
      .title {
        width: 45px;
        padding: 0 10px;
        border-right: 1px solid #ccc;
      }
      .value {
        width: 260px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .proDetail {
    width: 100%;
    img {
      width: 100%;
    }
    p {
      margin: 0;
      padding: 0;
      display: flex;
    }
  }
}
</style>
