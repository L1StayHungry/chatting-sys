<!-- 右边部分 好友或群聊名称
     插槽
 -->
<template>
  <div class="top_name">
    <div class="left"><slot name="left"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>

  export default {
    name:'TopName',
  }
</script>

<style scoped>
  .top_name{
    height: 50px;
    /* 上下居中，撑起div */
    line-height: 50px;
    text-align: left;
    display:flex;

    border-bottom: 1px solid #cccccc;

  }

  .left{
    padding-left: 30px;
    width: 70%;
  }

  .right{
    /* width: 20%; */
    /* position: relative; */
    flex: 1;
    /* float:right; */
  }
</style>