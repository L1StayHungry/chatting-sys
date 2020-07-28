<template>
  <div class="groupMessage">
    <top-name>
      <div slot="left">
        <h4>{{groupname}}</h4>
      </div>
    </top-name>
    <div style="height: 300px;width: 300px;margin-left: 50px;overflow: scroll;text-align: left">
      <div class="userMessageId" style="display: inline-block;width: 100px;height: 100px;position: relative;">
        <img src="@/assets/imgs/test1.jpg" width="60" alt="无法显示"
             style="font-size: 4px;position: absolute;left: 20px;top: 5px">
        <span style="width: 100%;position: absolute;left: 0px;bottom: 5px;text-align: center">用户名</span>
      </div>
    </div>
    <div style="height: 100px;">
       <el-button type="success" style="margin-top: 20px">发送</el-button>
    </div>
  </div>
</template>
<script>
  import TopName from "@/components/commen/right_part/TopName"

	export default {
		props: {
			groupMessage: Array
    },
    components:{
      TopName,
    },
    computed:{
      groupname(){
        return this.groupMessage.groupname;
      }
    },
		data() {
			return {}
		}
	}
</script>
<style>
  .groupMessage {
    height: 500px;
    width: 100%;
    background-color: rgb(245, 245, 245);
  }

  .userMessageId:hover {
    background-color: green;
  }
</style>
