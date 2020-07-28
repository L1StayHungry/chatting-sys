<!--搜索栏-->
<template>
      <div class="search">
        <div class="left">
          <el-input
          type="text"
          size="mini"
          class="search_input"
          placeholder="未开发"
        ></el-input>
        </div>

        <div class="right">
          <span @click="searchClick"
            id="icon-my-jia"
            class="iconfont icon-jia jiahao"
          ></span>
        </div>
      </div>
</template>

<script>

  export default {
    name:'Search',
    props:{

    },
    components: {

    },
    data() {
      return {}
    },
    computed: {},
    watch: {},
    methods: {
      searchClick() {},
    },
    created() {},
    mounted() {},
    beforeCreate() {},
    beforeMount() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {},
    activated() {},
  }
</script>

<style scoped>
  .search{
    position: relative;
    height: 50px;
    width: 100%;
    
    border-bottom: 1px solid #cccccc;
    margin-bottom: 20px;

    display: flex;
  }

  .left{
    flex:3;
  }
  .right{
    flex:1;
  }

  .search_input{
    display: inline-block;
    font-size: 12px;
    width: 90%;
    position: relative;
    vertical-align: middle;
    /* left: 50%; */
    margin-left: 10px;
    top: 11px;

    background-color: rgb(219,219,219);
  }

  .jiahao{
    display: inline-block;
    position: relative;

    top: 10px; 
  }

  #icon-my-jia {
    padding: 1px;
    background-color: rgb(219, 219, 219);
    border-radius: 5px;
  }

  #icon-my-jia:hover {
    background-color: rgb(200, 200, 200);
    cursor: pointer;
  }
</style>