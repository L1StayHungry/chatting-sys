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

    /* 阴影 */
    box-shadow: 0 1px 1px rgba(39, 12, 12, 0.2)
  }

  .left{
    margin-left: 30px;
  }

  .right{
    float:right;
  }
</style>