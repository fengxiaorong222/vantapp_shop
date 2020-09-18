<template>
  <div id="home" class="home">
    <van-search v-model="searchData" placeholder="商品搜索共239万款好物" input-align="center" />
    <!-- 主页轮播图 -->
    <van-swipe :autoplay="3000" width="375" height="200">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img class="swiperimg" v-lazy="image.image_url" />
      </van-swipe-item>
    </van-swipe>
    <!-- 轮播图下标 -->
    <van-grid :column-num="5">
      <!-- 图片链接失效:icon="item.icon_url" -->
      <van-grid-item v-for="(item,index) in channel" :key="index" :text="item.name" />
    </van-grid>
    <!-- 品牌制造商直供板块 -->
    <div class="brandlist">
      <van-panel title="品牌制造商直供">
        <van-grid :column-num="2">
          <van-grid-item v-for="(item,index) in brandList" :key="index">
            <van-image fit="cover" lazy-load :src="item.new_pic_url" />
            <h4 class="title">{{item.name}}</h4>
            <p class="price">￥{{item.floor_price}}</p>
          </van-grid-item>
        </van-grid>
      </van-panel>
    </div>
    <!-- 新品首发 -->
    <div class="newlist">
      <van-panel title="新品首发">
        <van-grid :column-num="2">
          <van-grid-item v-for="(item,index) in newGoodsList" :key="index">
            <van-image fit="cover" lazy-load :src="item.list_pic_url" />
            <h4 class="title van-ellipsis">{{item.name}}</h4>
            <p class="price van-ellipsis">￥{{item.retail_price}}</p>
          </van-grid-item>
        </van-grid>
      </van-panel>
    </div>
    <!-- 人气面板 -->
    <div class="hotlist">
      <van-panel title="人气推荐">
        <van-card
          v-for="(item,index) in hotGoodsList"
          :key="index"
          :price="item.retail_price"
          :desc="item.goods_brief"
          :title="item.name"
          :thumb="item.list_pic_url"
        />
      </van-panel>
    </div>
    <div style="height:50px"></div>
    <!-- 底部导航栏 -->
    <tab-btn></tab-btn>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import api from "../assets/config/api";
import tabBtn from "../components/tabBtn"

export default {
  name: "home",
  data() {
    return {
      searchData: "",
      data: {}
    };
  },
  computed: {
    //首页轮播图
    images: function () {
      if (typeof this.data.banner == "object") {
        return this.data.banner;
      } else {
        return [];
      }
    },
    //轮播图下面的宫格
    channel: function () {
      if (typeof this.data.channel == "object") {
        return this.data.channel;
      } else {
        return {};
      }
    },
    // 品牌制造商直供板块
    brandList: function () {
      if (typeof this.data.brandList == "object") {
        return this.data.brandList;
      } else {
        return [];
      }
    },

    // 新品首发
    newGoodsList: function () {
      if (typeof this.data.newGoodsList == "object") {
        return this.data.newGoodsList;
      } else {
        return [];
      }
    },
    // 人气商品
    hotGoodsList: function () {
      if (typeof this.data.hotGoodsList == "object") {
        return this.data.hotGoodsList;
      } else {
        return [];
      }
    },
  },
  components:{
      tabBtn
    }
  ,
  async mounted() {
    let res = await axios.get(api.IndexUrl);
    // console.log(res.data.data);
    this.data = res.data.data;
  }
};
</script>


<style lang="less">
#home {
  .swiperimg {
    width: 375px;
    height: 200px;
  }
  .brandlist {
    position: relative;
    .van-grid-item__content {
      padding: 0;
    }
    .van-image {
      border: 1px solid #ffffff;
    }
    .title {
      position: absolute;
      left: 20px;
      top: 10px;
    }
    .price {
      position: absolute;
      left: 20px;
      top: 30px;
    }
  }
  .newlist {
    position: relative;
    .van-grid-item__content {
      padding: 0;
    }
    .van-image {
      border: 1px solid #ffffff;
    }
    .title {
      width: 90%;
    }
    .price {
      color: red;
      width: 90%;
    }
  }
  .hotlist {
    .van-card__price {
      color: red;
    }
    .van-card__content {
      justify-content: center;
      text-align: left;
    }
    .van-card__title {
      font-weight: 900;
      color: #333;
      font-size: 14px;
      padding: 5px 0;
    }
  }
}
</style>