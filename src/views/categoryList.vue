<template>
  <div id="categoryList">
    <van-tabs v-model="tabActive">
      <van-tab v-for="item in categoryList" :key="item.id" :title="item.name">
        <h3>{{item.name}}</h3>
        <p>{{item.front_name}}</p>

        <van-grid :border="true" :column-num="2">
          <van-grid-item :to="'/product/'+item.id"  v-for="item in goodsList" :key="item.id">
            <van-image width="100" height="100" :src="item.list_pic_url" />
            <h4 class="van-ellipsis">{{item.name}}</h4>
            <p class="van-ellipsis price">￥{{item.retail_price}}</p>
          </van-grid-item>
        </van-grid>
      </van-tab>
    </van-tabs>
  </div>
</template> 

<script>
import axios from "axios";
import api from "../assets/config/api.js";
export default {
  props: ["id"],
  data() {
    return {
      data: {},
      tabActive: 0,
      //标签栏
      categoryList: [],
      //产品数据
      goodsList: [],
    };
  },
  async mounted() {
    console.log(this.id);
    //获取标签栏数据
    let res = await axios.get(api.GoodsCategory, { params: { id: this.id } });
    this.categoryList = res.data.data.brotherCategory;
    //第一次进入时产品的数据
    this.getlist(this.id, 1, 20);
  },
  watch: {
    /* 
      通过监听tabActive，判断选择的是哪一个标签栏，请求该标签栏的数据
      根据tabActive的改变，请求不同的数据
      */
    tabActive: async function (index) {
      // console.log(index);
      let categoryId = this.categoryList[index].id;
      let page = 1;
      let size = 20;
      //获取数据
      this.getlist(categoryId, page, size);
    },
  },
  methods: {
    //获取产品标签栏对应数据
    async getlist(cid, page, size) {
      let res = await axios.get(api.GoodsList, {
        params: { categoryId: cid, page, size },
      });
      // console.log(res.data.data.data);
      this.goodsList = res.data.data.data;
    },
  },
};
</script>
<style lang="less">
#categoryList {
  .van-ellipsis {
    width: 100%;
    font-weight: 500;
    font-size: 14px;
    padding: 0 10px;
  }
  .van-grid-item {
    overflow: hidden;
    box-sizing: border-box;
  }
  .price {
    color: red;
  }
}
</style>