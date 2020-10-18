/*主信息栏（含信息列表及具体聊天界面） 
###### Fri Jul 24 11:46:52 CST 2020
 */
<template>
  <div>
    <!--        中间栏-->
    <div class="fl wp30 hInherit" style="background-color: rgb(233,233,233)">
      <!--搜索栏-->
      <search></search>
      
      <!--            聊天各种对话信息栏-->
      <div id="chatSlider" style="height: 430px;width: 100%;overflow: scroll;">
        <!--                好友聊天对话单元 -->
        <div @click="changeChat($event)" :id="item.id" style="width: 100%;height: 75px;position: relative;"
             v-for="item of userMessage" :key="item.id">
          <img :src="baseurl + item.avatar" width="60"
               style="position: absolute;left: 10px;top: 10px;"
               alt="加载失败">
					<!-- 红点 -->
          <span
              style="position: absolute;
                          background-color: red;
                          border-radius: 6px;
                          top: 8px;
                          left: 66px;
                          width: 12px;height: 12px;"></span>
          <span style="position: absolute;top: 10px;left: 75px;color: black">{{item.username}}</span>
          <span style="position: absolute;bottom: 10px;left: 75px;color: #cccccc">{{item.sign}}</span>
          <span style="position: absolute;color: #cccccc;top: 10px;right: 30px">11:22</span>
        </div>
        <!--                群组对话单元-->
        <div @click="changeGroupChat($event)" :id="item.group_id" style="width: 100%;height: 75px;position: relative;"
             v-for="item of groupMessage" :key="item.group_id+1">
          <img :src="baseurl + item.avatar" width="60"
               style="position: absolute;left: 10px;top: 10px;"
               alt="加载失败2">
          <span
              style="position: absolute;
                          background-color: red;
                          border-radius: 6px;
                          top: 8px;
                          left: 66px;
                          width: 12px;height: 12px;"></span>
          <span style="position: absolute;top: 10px;left: 75px;color: black">{{item.groupname}}</span>
          <span style="position: absolute;bottom: 10px;left: 75px;color: #cccccc">{{item.notice}}</span>
          <span style="position: absolute;color: #cccccc;top: 10px;right: 30px">11:22</span>
        </div>
      </div>
    </div>
    <!--        聊天框-->
    <div class="fl wp63 hInherit">
      <!--            聊天框头-->
			<top-name>
				<div slot="left">
					<h4>{{topname}}</h4>
				</div>
				<div slot="right">
					<span id="icon-my-gengduo" class="iconfont icon-gengduo1"></span>
				</div>
			</top-name>
      <!--            聊天对话框-->
      <div class="chatContext"
           style="width: 100%;
                height: 300px;
                background-color: rgb(245,245,245);
                overflow: scroll;
                border-top: #cccccc;">
        <chat-module v-for="(item,index) in sendAndReceivedMessage"
                     v-show="!isGroupChat"
                     :id-label="idLabel"
                     :chat-message="item"
                     :key="index"></chat-module>
        <chat-group-module
            v-for="(item,index) of sendAndReceivedGroupMessage"
            v-show="isGroupChat"
            :id-group-label="idGroupLabel"
            :group-message="item"
            :key="index+'-only'"
        >

        </chat-group-module>
      </div>
      <!--            聊天发送框-->
      <div style="width: 100%;height: 100px;background-color: rgb(255,255,255);border-top: #cccccc;">
                <textarea placeholder="输入要发送的信息" v-model="sendMessageToWS.dataMap.context" id="txt1" cols="30" rows="10"
                          style="width: 100%;height: 70%;border: none;outline: none"></textarea>
        <button @click="sendMsg"
                style="background-color: rgb(245,245,245);position: absolute;right: 20px;bottom: 3px;padding:0px 10px 0px 10px;height: 20px">
          发送(S)
        </button>
      </div>
    </div>
  </div>
</template>
<script>
	import ChatMyself from "./ChatComponents/ChatMyself";
	import ChatOthers from "./ChatComponents/ChatOthers";
	import Test from "./ChatComponents/Test";
	import ChatModule from "./ChatComponents/ChatModule";
	import ChatGroupModule from './ChatComponents/ChatGroupModule';
	import LeftList from "./AddGroupComponents/LeftList";
	import RightCell from "./AddGroupComponents/RightCell";

	import {getUserAndGroupMessage} from '@/http/api'

	import TopName from "@/components/commen/right_part/TopName";
	import Search from "@/components/commen/search/Search"
	
	export default {
		components: {
			ChatOthers,
			ChatMyself,
			Test,
			ChatModule,
			ChatGroupModule,
			LeftList,
			RightCell,
			TopName,//右上侧用户名/群聊名
			Search,//搜索框
		},
		props: {},
		computed: {
			topname(){
				// return this.isGroupChat?this.toGroupMessage.groupname:this.toUserMessage.username
				return this.toUserMessage.username;
			}
		},
		data() {
			return {
				ws: null,
				baseurl : this.$store.state.BASEURL,
				sendMessageToWS: {
					type: 'singleChat',
					dataMap: {
						fromid: '',
						toid: '',
						context: ''
					},
					extand: '',
					sendtime: ''
				},
				sendMessage: {
					avatar: '',
					username: '',
					context: ''
				},
				receivedMessage: {
					type: '',
					id: '',
					context: '',
					avatar: '',
					username: '',
					sendtime: ''
				},
				userMessage: [       //存储所有的用户对话信息
					{
						id: '',
						username: '',
						sign: '',
						avatar: ''
					}
				],
				groupMessage: [      //存储所有的群组对话信息
					{
						id: '',
						groupname: '',
						notice: '',
						avatar: '',
						user_id: ''
					}
				],
				toUserMessage: {     //要发送信息的用户
					id: '',
					username: '',
					sign: '',
					avatar: ''
				},
				myMessage: {
					id: Number,
					username: String,
					sign: String,
					status: String,
					avatar: String,
					sex: Number
				},
				sendAndReceivedMessage: [
					// {
					//     messageType:Boolean,
					//     id:Number,
					//     username:String,
					//     context:String
					//      avatar:String
					//      toId:String
					// }
				],
				idLabel: "2",    //记录正在与哪个好友聊天
				idGroupLabel: "",
				sendGroupMessage: {
					type: 'groupChat',
					dataMap: {
						fromid: '',
						groupid: '',
						context: ''
					},
					extend: '',
					sendtime: ''
				},
				receivedGroupMessage: {
					type: 'groupChat',
					dataMap: {
						fromid: '',
						groupid: '',
						context: ''
					},
					extand: '',
					sendtime: ''
				},
				sendAndReceivedGroupMessage: [
					// {
					//     messageType:Boolean, //true 自己发送  false 他人发送的
					//     id:String, //发送者的id
					//     username:String,
					//     groupId:String,  //发送到群的id
					//     groupName:String,
					//     context:String,
					//     avatar:String
					// }
				],
				isGroupChat: Boolean,
				groupMemberMessage: [],
				searchName: '',
				friends: [],
				friendsNotGroup: [],
				elDialogVisiable: false,
				hasSelectedFriends: []
			}
		},
		methods: {
			sendMsg: function () {
				let ws = this.$store.state.ws;
				// let ws = this.ws;
				if (!this.isGroupChat) {
					//发送到服务端//单聊发送
					this.sendMessageToWS.extand = '1'
					let time = new Date()
					let timeArr = time.toString().split(' ')
					/*
                    * 字符串存储格式  Sat Jul 18 2020 13:35:45 GMT+0800 (中国标准时间)
                    * 时间格式  Wed Jul 15 15:13:23 CST 2020
                    * */
					this.sendMessageToWS.sendtime = timeArr[0] + ' ' + timeArr[1] + ' ' + timeArr[2]
						+ ' ' + timeArr[4] + ' CST ' + timeArr[3]
					this.sendMessageToWS.sendtime = 'Jul 18, 2020 1:45:47 PM'
					// this.sendMessageToWS.sendtime = new Date().toString().replace('+',' ').replace(' (中国标准时间)','')
					ws.send(JSON.stringify(this.sendMessageToWS))

					//本地聊天框渲染
					let message = new Object()
					message.messageType = true
					message.id = sessionStorage.getItem('userId')
					message.username = this.myMessage.username
					message.context = this.sendMessageToWS.dataMap.context
					message.avatar = this.myMessage.avatar
					message.toId = this.sendMessageToWS.dataMap.toid
					this.sendAndReceivedMessage = this.sendAndReceivedMessage.concat(message)

				} else {  //多聊发送
					this.sendMessageToWS.type = 'groupChat';
					this.sendGroupMessage.dataMap.context = this.sendMessageToWS.dataMap.context
					ws.send(JSON.stringify(this.sendGroupMessage))

					//本地聊天框渲染
					let message = new Object()
					message.messageType = true
					message.id = sessionStorage.getItem('userId')
					message.context = this.sendGroupMessage.dataMap.context
					message.avatar = this.myMessage.avatar
					message.username = this.myMessage.username
					message.groupId = this.sendGroupMessage.dataMap.groupid
					this.sendAndReceivedGroupMessage = this.sendAndReceivedGroupMessage.concat(message)

					console.log(this.sendAndReceivedGroupMessage)
				}
				this.sendMessageToWS.dataMap.context = ''
			},
			this_getUserAndGroupMessage(){
				getUserAndGroupMessage( sessionStorage.getItem('userId') ).then(res => {
					let dataJson = JSON.parse(res.data);
					if (dataJson.code == 0) {
						//获取用户信息
						for (let item of dataJson.data.friend) {
							// .concat 连接两数组
							this.userMessage = this.userMessage.concat(item.list)

							for (let f of item.list) {
								// console.log('friends+'+f);
								this.friendsNotGroup = this.friendsNotGroup.concat(f)
							}
						}
						//获取群组信息
						for (let item of dataJson.data.group) {
							// console.log('groupMessage')
							// console.log(item)
							this.groupMessage = this.groupMessage.concat(item)
						}
						//删除第一个模板元素
						this.userMessage.shift()
						this.groupMessage.shift()
						// console.log('好有对象'+this.userMessage)
						//获取本人信息
						this.myMessage = dataJson.data.mine
					}
				})
			},
			changeChat: function (event) {
				this.isGroupChat = false
				//  更新发送的用户信息
				let id = event.currentTarget.id         //好友列表的用户id
				for (let item of this.userMessage) {
					//初始化receivedMessage
					if (item.id == id) {
						this.toUserMessage = item
					}

				}
				//存储本人信息
				this.sendMessage.username = this.myMessage.username
				this.sendMessage.avatar = this.myMessage.avatar
				//  更新发送信息的配置
				this.sendMessageToWS.dataMap.toid = id
				this.sendMessageToWS.dataMap.fromid = sessionStorage.getItem('userId')
				//读取并渲染存储在sendAndReceivedMessage的信息
				this.idLabel = id
			},
			changeGroupChat: function (event) {
				//获取聊天组的id
				this.isGroupChat = true;
				let id = event.currentTarget.id;
				console.log(id);
				
				//  获取群组成员信息
				let url = 'http://localhost:8080/user/mermber?groupid=' + id
				$.get(url, (data, status) => {
					let dataObject = data.data
					console.log(dataObject);
					
					this.groupMemberMessage = dataObject.data.list
				})
				this.idGroupLabel = id //设置id
				//获取点击后的群id 初始化发送群组数据
				for (let item of this.groupMessage) {
					if (item.group_id == id) {
						this.toUserMessage = {
							id: '',
							username: '',
							sign: '',
							avatar: ''
						}
						this.toUserMessage.username = item.groupname
						this.sendGroupMessage.dataMap.fromid = sessionStorage.getItem('userId')
						this.sendGroupMessage.dataMap.groupid = id
						this.sendGroupMessage.extend = '1'
						this.sendGroupMessage.sendtime = 'Jul 18, 2020 1:45:47 PM'
					}
				}
				// console.log(this.sendGroupMessage)
			},

			getMsg: function (id) {  //获取到子组件传来的信息
				let isHas = false
				let ob = this.friendsNotGroup
				for (let index in this.hasSelectedFriends) {
					if (this.hasSelectedFriends[index].id == id) {
						//删除该用户
						isHas = true;
						this.hasSelectedFriends.splice(index, 1)
					}
				}
				if (isHas == false) {
					//添加该用户
					for (let index in this.friendsNotGroup) {
						if (ob[index].id == id) {
							this.hasSelectedFriends.push(ob[index])
						}
					}
				}
			},

			// 接收到单聊信息
			updateSendAndReceivedMessage_singleChat(msg){
				let received_msg = {}
				received_msg.id = msg.dataMap.fromid;
				for (let item of this.userMessage) {
					if (item.id == received_msg.id) {
						received_msg.username = item.username
						received_msg.context = msg.dataMap.context
						received_msg.messageType = false
						received_msg.avatar = item.avatar
					}
					this.sendAndReceivedMessage = this.sendAndReceivedMessage.concat(received_msg)
				}
			},
			// 接收到群聊信息
			updateSendAndReceivedMessage_groudChat(msg){
				let received_msg = {}
        received_msg.messageType = false
        received_msg.id = msg.dataMap.fromid
        received_msg.groupId = msg.dataMap.groupid
        received_msg.context = msg.dataMap.context
        window.console.log(this.groupMemberMessage)
        for (let item of this.groupMemberMessage) {
          if (parseInt(item.id) == parseInt(received_msg.id)) {
            received_msg.username = item.username
            received_msg.avatar = item.avatar
            window.console.log('进入遍历群成员')
          }
        }
        this.sendAndReceivedGroupMessage = this.sendAndReceivedGroupMessage.concat(received_msg)
			}
		},
		watch: {
			receiveMessage: function (nval, oval) {

			},
			sendMessage: function (nval, oval) {

			},
		},
		mounted() {
			
			// this.wsConnect();
			this.$bus.$on('get_a_singleChat',(msg)=>{
				this.updateSendAndReceivedMessage_singleChat(msg);
			});
			this.$bus.$on('get_a_groudChat',(msg)=>{
				this.updateSendAndReceivedMessage_groudChat(msg);
			});
			this.this_getUserAndGroupMessage();
		}
	}
</script>
<style scoped>
  #icon-my-jia {
    position: absolute;
    right: 5%;
    top: 33%;
    padding: 1px;
    background-color: rgb(219, 219, 219);
    border-radius: 3px;
  }

  #icon-my-jia:hover {
    background-color: rgb(200, 200, 200);
    cursor: pointer;
  }

  #icon-my-gengduo {
    position: absolute;
    right: 20px;
    top: 0px;
    font-size: 40px;
  }

  #icon-my-gengduo:hover {
    cursor: pointer;
  }


  .hInherit {
    height: inherit;
  }

  .fl {
    float: left;
  }

  ul li {
    cursor: pointer;
  }

  #chatSlider div:hover {
    background-color: rgb(220, 220, 220);
    cursor: pointer;
  }

  #div1 {
    width: 63%;
    height: 300px;
    float: left;
  }

  #div2 {
    width: 45%;
    height: 300px;
    float: right;
    border: 1px solid red;
    position: relative;
	}
	
	.top_name{
		background-color: rgb(245, 245, 245)
	}

  .clear {
    clear: both;
  }
</style>
