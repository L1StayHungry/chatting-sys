<template>
  <div>
    <!--        单聊渲染-->
    <!--                别人发信息过来的块级元素-->
    <div name="user1" style="position: relative;width: 100%;" class="div2"
         v-show="!storeMessage.messageType && IdLabel == storeMessage.id">
      <img style="display: inline-block;float:left;margin-right: 0;margin-top: 5px"
           :src="'http://localhost:8080'+storeMessage.avatar" alt="无法显示" width="30">
      <span style="float: left;margin-left: 12px;margin-top: 1px;color: #cccccc">{{storeMessage.username}}</span>
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
                           word-wrap: break-word;">{{storeMessage.context}}</span>
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
         v-show="storeMessage.messageType && storeMessage.toId == IdLabel">
      <img :src="'http://localhost:8080'+storeMessage.avatar" alt="无法显示" width="30"
           style="float:right;margin-right: 10px;margin-top: 10px;">
      <span style="position: absolute;
                        color: #cccccc;
                        top: 5px;
                        right: 45px;">{{storeMessage.username}}</span>
      <span class="textTest2"
            style="float: right;
                          background-color: white;
                          padding: 5px;
                          text-align: left;
                          border-radius: 2px;
                          word-wrap: break-word;
                          max-width: 200px;
                          margin-right: 5px;
                          margin-top: 25px;">{{storeMessage.context}}</span>
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
			ChatMessage: Object,  //  记录单人聊天的 聊天信息
			IdLabel: String //标记与某个人id的聊天  保证在正确的聊天框里面渲染正确的对话（就是不会把A与B的对话  渲染到A与C的对话里面）
		},
		components: {},
		data() {
			return {
				// storeMessage:{
				//     messageType:Boolean,   //true：自己发送的  false：好友发送的
				//     id:Number,             //  自己的id
				//     username:String,
				//     context:String
				//      toId:sting              //发送到的id  如果是 则渲染
				//      avatar:String
				// }
			}
		},
		methods: {},
		computed: {
			storeMessage: function () {
				return this.ChatMessage
			}
		},
		mounted() {

		}
	}
</script>
<style>

</style>
