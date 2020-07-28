<template>
  <div class="w800 h500 fl relative homePage" style="background-color: #ffffff;border: 1px solid #cccccc">
    <!--左侧导航栏-->
    <main-tab-bar></main-tab-bar>

    <!-- 中、右侧信息栏 -->
    <router-view></router-view>
  </div>
</template>
<script>
  import MainTabBar from "@/components/commen/mainTabBar/MainTabBar"

	export default {
    name:'HomePage',
		components:{
      MainTabBar,
    }
	}
</script>
<style>
</style>
