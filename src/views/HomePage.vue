<template>
  <div class="homePage">
    <!--左侧导航栏-->
    <main-tab-bar></main-tab-bar>

    <!-- keepalive保存路由状态 -->
    <keep-alive>
      <!-- 中、右侧信息栏 -->
      <router-view></router-view>
    </keep-alive>
    
  </div>
</template>
<script>
  import MainTabBar from "@/components/commen/mainTabBar/MainTabBar"
  import { wsConnect } from "@/common/wsConnect"

	export default {
    name:'HomePage',
		components:{
      MainTabBar,
    },
    methods:{
    },
    mounted(){
      setTimeout(() => {
          this.$store.state.ws = wsConnect(this.$store.state.ws);
      }, 1000);
    }
	}
</script>
<style scoped>
  .homePage {
    width: 800px;
    height: 500px;
    /* float: left; */
    position: absolute;

    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    /* border: 1px solid #cccccc; */
  }
</style>
