<!-- 添加好友 -->
<template>
  <div class="addFriend">
    <span class="instructions"
        style="">添加好友</span>
    <div class="addFriendCell" @click="addNewFriend()">
      <img src="@/assets/imgs/addpeople.svg" alt="无法显示" style="position: absolute;left: 10px;top: 10px; background-color: #ecc00b;" width="30">
    <span style="position: absolute;left: 45px;top: 12px;">新的朋友</span>
    </div>
  </div>
</template>

<script>

  export default {
    name:'',
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
      addNewFriend(){
        alert("添加好友");
      }
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
  .instructions{
    display: inline-block;
    width: 100%;
    color: #cccccc;
    text-align: left;
    margin-left: 8px;
  }

  .addFriendCell {
    position: relative;
    height: 50px;
  }

  .addFriendCell:hover {
    background-color: #cccccc;
  }
</style>