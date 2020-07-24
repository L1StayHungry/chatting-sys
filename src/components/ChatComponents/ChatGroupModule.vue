<template>
  <div>
    <!--        群聊渲染框-->
    <!--                别人发信息过来的块级元素-->
    <div name="user1" style="position: relative;width: 100%;" class="div2"
         v-show="!storeGroupMessage.messageType && IdGroupLabel == storeGroupMessage.groupId">
      <img style="display: inline-block;float:left;margin-right: 0;margin-top: 5px"
           :src="'http://localhost:8080'+storeGroupMessage.avatar" alt="无法显示" width="30">
      <span style="float: left;margin-left: 12px;margin-top: 1px;color: #cccccc">{{storeGroupMessage.username}}</span>
      <span class="textTest1"
            style="font-size: 14px;
                           float: left;
                           margin-left: -35px;
                           margin-top: 20px;
                           background-color: white;
                           padding: 5px;
                           max-width: 200px;
                           text-align: left;
                           border-radius: 2px;
                           word-wrap: break-word;">{{storeGroupMessage.context}}</span>
      <span style="display: inline-block;
                    width: 8px;
                    height: 8px;
                    transform: rotate(45deg);
                    position: absolute;
                    left: 35px;
                    top: 25px;
                    background-color: white"></span>
      <div class="clear"></div>
    </div>
    <!--                自己发信息过去的块级元素-->
    <div name="user2" style="position: relative;" class="div1"
         v-show="storeGroupMessage.messageType && storeGroupMessage.groupId == IdGroupLabel">
      <img :src="'http://localhost:8080'+storeGroupMessage.avatar" alt="无法显示" width="30"
           style="float:right;margin-right: 10px;margin-top: 10px;">
      <span style="position: absolute;
                        color: #cccccc;
                        top: 5px;
                        right: 45px;">{{storeGroupMessage.username}}</span>
      <span class="textTest2"
            style="float: right;
                          background-color: white;
                          padding: 5px;
                          text-align: left;
                          border-radius: 2px;
                          word-wrap: break-word;
                          max-width: 200px;
                          margin-right: 5px;
                          margin-top: 25px;">{{storeGroupMessage.context}}</span>
      <span style="
                        position: absolute;
                        width: 8px;
                        height: 8px;
                        transform: rotate(45deg);
                        right: 43px;
                        top: 28px;
                        background-color: white;
                        "></span>
      <div class="clear"></div>
    </div>

  </div>
</template>
<script>
	export default {
		props: {
			groupMessage: Object,   //记录 群聊的 聊天信息
			IdGroupLabel: String
		},
		components: {},
		data() {
			return {
				// sendAndReceivedGroupMessage:{
				//     messageType:Boolean, //true 自己发送  false 他人发送的
				//     id:String, //发送者的id
				//
				//     groupId:String,  //发送到群的id
				//     groupName:String,
				//     context:String,
				//     avatar:String
				// }
			}
		},
		methods: {},
		computed: {
			storeGroupMessage: function () {
				return this.groupMessage
			}
		},
		watch: {},
		mounted() {
		}
	}
</script>
<style>

</style>
