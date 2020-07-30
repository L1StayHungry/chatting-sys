<template>
  <div class="friendCell">
    <img :src="img" alt="无法显示"  width="50px">
    <div class="label">
      <div class="user_name">申请人ID: {{messageId}}</div>
      <div class="user_extand"> {{extand}} </div>
    </div>

    <!-- 是否同意添加此好友 -->
    <div class="ifAgree"  >
      <el-button-group ref="finishAgree" v-show="!ifHandle">
        <el-button  type="primary" 
                    size="mini" 
                    style="background-color: red;border-color: rgb(245,245,245)"
                    @click="agree()"
        >同意</el-button>
        <el-button  type="primary" 
                    size="mini" 
                    style="background-color: rgb(148, 105, 105);border-color: rgb(245,245,245)"
                    @click="refuesd()"
        >拒绝</el-button>
      </el-button-group>

      <span v-show="ifHandle">{{handleResult}}</span>
    </div>

    <!-- 若同意，设置备注信息 -->
      <el-dialog
        width="500px"
        title="设置备注信息"
        :visible.sync="innerVisible"
        center
        append-to-body>

        <!-- 设置好友分组 -->
        <div class="this_position" >
          <span style="width:100px">
            好友分组:
          </span>
          <el-select v-model="value" style="width:300px" placeholder="请选择好友分组">
            <el-option
              v-for="item in fzMessage"
              :key="item.fzId"
              :label="item.fzGroupname"
              :value="item.fzId">
            </el-option>
          </el-select>
        </div>
        
        <!-- 好友昵称 -->
        <div class="this_position" >
          <span style="width:100px">
            设置昵称:
          </span>
          <el-input v-model="nickname" style="width:300px" placeholder="请设置好友昵称"></el-input>
        </div>

        <!-- 备注 -->
        <div class="this_position" >
          <span style="width:100px">
            填写备注:
          </span>
          <el-input v-model="mine_extand" style="width:300px" placeholder="请输入备注"></el-input>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="agreeAddFriend()">确 定</el-button>
        </span>
      </el-dialog>
    
  </div>
</template>

<script>
	export default {
    name:'newFriendCell',
		props: {
      request_msg: Object
      // {
      //       "type": "checkAddFriend",      //消息类型，代表的是申请添加好友
      //       "dataMap": {
      //           "fzid": "1",        //分组id
      //           "avatar": "/images/boy-10.png",   //申请人头像 （渲染重点）
      //           "friendid": "3",       //添加好友的id
      //           "nickname": "小君君",  //你给好友起的昵称，也就是备注
      //           "userid":"2",       //申请人id
      //       },
      //       "extand": "我是XX,快点同意我好友",         //添加附加信息  （渲染重点）
      //       "sendtime":"Jul 22, 2020 10:03:41 AM"   //消息时间

      // }
		},
		data() {
			return {
				messageId: this.request_msg.dataMap.userid,
        extand: this.request_msg.extand,
        ifHandle :false,
        handleResult:'已添加',

        innerVisible: false,

        fzMessage:[],//好友分组种类
        value:'1',//选择的好友分组种类，fzid
        nickname:'',
        mine_extand:'',
			}
		},
		methods: {
      agree(){
        this.getFZmessage();
        this.innerVisible = true;

        this.ifHandle = true;
      },
      refuesd(){
        this.refuesdAddFriend();

        this.handleResult = '已拒绝';
        this.ifHandle = true;
      },

       // 获取存储在vuex中的用户好友分组信息     
      getFZmessage(){
        let fzMessage = this.$store.getters.userInfoFriend;

        // console.log(fzMessage);
        this.fzMessage = [];

        // 默认分组为第一个fzid
        this.value = fzMessage[0].fzId;

        for(let item of fzMessage){
          let item_fz = {};
          item_fz.fzGroupname=item.fzGroupname,
          item_fz.fzId=item.fzId,

          this.fzMessage.push(item_fz);
        }
      },

      // 正式同意添加好友的请求
      agreeAddFriend(){
        this.innerVisible = false;
        
        let responseData = {         
          type: "agreeAddFriend",      //消息类型，代表的是同意添加好友
          dataMap: {
            fzid : '',        //与上面接收到的消息相同就行
            myfzid: '',        //你把好友添加为哪个分组   （重点）
            userid:'',       //跟上消息一样就行，这个id是申请人的id,并非自己的id
            friendid: '',       //同上面一样就行，这个是实际上本人的id
            nickname: '',  //你给好友起的昵称，也就是备注 （重点）
          },
          extand: '',         //添加附加信息    
          sendtime:"Jul 22, 2020 10:03:41 AM"   //消息时间
        }

        responseData.dataMap.fzid = this.request_msg.dataMap.fzid;
        responseData.dataMap.myfzid = this.value;
        responseData.dataMap.userid = this.request_msg.dataMap.userid;
        responseData.dataMap.friendid = this.request_msg.dataMap.friendid;
        responseData.dataMap.nickname = this.nickname;
        responseData.extand = this.mine_extand;

        let ws = this.$store.state.ws;
        
        this.$store.state.ws.send(JSON.stringify(responseData))
        this.$bus.$emit('updateFriendList');
        console.log('为啥');
        
        
      },
      // 拒绝好友申请
      refuesdAddFriend(){
        this.innerVisible = false;
        let responseData = {         
          type: "refuseAddFriend",      //消息类型，代表的是拒绝添加好友
          dataMap: {
            fzid : '',        //与上面接收到的消息相同就行
            userid:'',         //这个是实际上本人的id
          },
          extand: '',         //添加附加信息    
          sendtime:"Jul 22, 2020 10:03:41 AM"   //消息时间
        }

        responseData.dataMap.fzid = this.request_msg.dataMap.fzid;
        responseData.dataMap.userid = this.request_msg.dataMap.friendid;
        responseData.dataMap.nickname = this.nickname;
        responseData.extand = '';

        let ws = this.$store.state.ws;
        
        this.$store.state.ws.send(JSON.stringify(responseData))
      }
    },
		computed: {
			img: function () {
				return 'http://localhost:8080/' + this.request_msg.dataMap.avatar
			}
		},
		mounted() {

		}
	}
</script>

<style scoped>
  .friendCell {
    position: relative;
    left: 50%;
    width: 80%;
    text-align: left;
    -webkit-transform: translate(-50%,0);
            transform: translate(-50%,0);
    height: 50px;
    padding:10px 50px;
    border-bottom: 1px solid rgb(148, 105, 105)
  }

  .label{
    display:inline-block;
    margin-left: 20px;
    position: relative;
    top: -14px;
    left: 0;
  }

  .user_name{
    font-size: 15px;
    margin-bottom: 5px;
  }

  .user_extand{
    font-size: 8px;
    color: rgb(61, 97, 61)
  }

  .ifAgree{
    float: right;
    -webkit-transform: translate(0,50%);
            transform: translate(0,50%);
  }

  .this_position{
    margin: 10px;
  }
</style>
