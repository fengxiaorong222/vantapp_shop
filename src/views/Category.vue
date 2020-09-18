<template>
  <div>
    <van-search v-model="searchData" placeholder="商品搜索共239万款好物" input-align="center" />
    <van-tree-select
      @click-nav="changeRight"
      height="calc(100vh - 104px)"
      :items="items"
      :main-active-index.sync="activeIndex"
    >
      <template #content>
        <van-grid :column-num="3">
          <van-grid-item v-for="item in subCategoryList" :key="item.id" :icon="item.wap_banner_url" :text="item.name" />
        </van-grid>
      </template>
    </van-tree-select>
    <tab-btn></tab-btn>
  </div>
</template>
<script>
import tabBtn from "../components/tabBtn";
import axios from "axios";
import api from "../assets/config/api.js";

export default {
  data() {
    return {
      searchData: "",
      data: {},
      //用户点击左侧栏改变activeIndex
      activeIndex: 0,
      //右侧数据
      subCategoryList:[]
    };
  },
  async mounted() {
    let res = await axios.get(api.CatalogList);
    this.data = res.data.data;
    //第一次进入页面时右侧默认显示第一项
    this.subCategoryList=this.data.currentCategory.subCategoryList
    console.log(this.data)
  },
  computed: {
    //   左侧栏数据
    items: function () {
      // [{ text: "分组 1" }, { text: "分组 2" }]
      if (this.data.categoryList == undefined) {
        return [];
      } else {
        let arr = [];
        this.data.categoryList.forEach((item) => {
          item.text = item.name;
          arr.push(item);
        });
        return arr;
      }
    }
  },
  methods: {
    //点击左侧标签栏
    changeRight(index) {
      this.activeIndex = index;
    //   console.log(index, this.subCategoryList);
    },
  },
  components: {
    tabBtn,
  },
  watch:{
      //用户点击右侧栏改变activeInex,通过监听activeIndex的变化进行右侧数据的修改
          // 右侧数据
    activeIndex:async function () {
      if (this.items.length != 0) {
        //当前点击右侧栏的id
        let id=this.items[this.activeIndex].id
        //请求接口CatalogCurrent获取对应右侧栏的数据，需要传递id
        // let res=await axios.get(api.CatalogCurrent?id=)
        let res=await axios.get(api.CatalogCurrent,{params:{id}})
        this.subCategoryList=res.data.data.currentCategory.subCategoryList
      }else{
          this.subCategoryList=[]
      }
    }
  }
};
</script>
<style lang="sass" scoped>

</style>