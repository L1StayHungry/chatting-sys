<!-- 添加好友 -->
<template>
  <div class="addFriend">
    <span class="instructions"
        style="">添加好友</span>
    <div class="addFriendCell" @click="addFriend">
      <img src="@/assets/imgs/addpeople.svg" 
           alt="无法显示" 
           style="position: absolute;left: 10px;top: 10px; background-color: #ecc00b;" width="30">
      <span class="redpoint" v-show="ifRedPoint"></span>
    <span style="position: absolute;left: 45px;top: 12px;">新的朋友</span>
    </div>

    <!-- 弹窗：查找好友并提交好友申请 -->
    <el-dialog
      title="添加好友"
      :visible.sync="addFriendVisible"
      :append-to-body='true'
      width="50%"
      :destroy-on-close='true'>

      <div class="search_input">
        <div class="input">
          <el-input v-model="searchId" placeholder="请输入用户id"></el-input>
        </div>
        <div class="search">
          <el-button type="primary" @click="searchFriend()">查 找</el-button>
        </div>
      </div>
      
      <el-card class="friendMessage" v-show="isHaveFriendMessage">
        <div slot="header" class="clearfix">
          <span>查找结果:</span>
          <el-button style="float: right; padding: 3px 0" 
                      type="text" 
                      @click="setSendMessage()">
                      发送好友请求
          </el-button>
        </div>

        <div>
          <div style="display: inline-block; margin-right: 10px;">
            <img :src="avatar" alt="无法显示" width="40px" style="font-size: 4px;">
          </div>
          <div style="display: inline-block;">
            <div>
              <span style="font-size: 16px; inline-size:18px;">用户名:{{username}}</span>
            </div>
            <div>
              <span style="">个性签名:{{user_sign}}</span>
            </div>
          </div>
          
        </div>
      </el-card>

      <!-- 设置备注信息 -->
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
          <el-input v-model="extand" style="width:300px" placeholder="请输入备注"></el-input>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="sendAddNewFriendRequest()">确 定</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    name:'AddNewFriend',
    components: {

    },
    data() {
      return {
        addFriendVisible: false,
        innerVisible: false,
        ifRedPoint: false,
        searchId:'',

        newFriendResult:{},
        ifHaveFriendMessage: false,

        fzMessage:[],//好友分组种类
        value:'1',//选择的好友分组种类，fzid
        nickname:'',
        extand:'',

        sendAddFriendData:{
          type: 'addFriend',      //消息类型，代表的是申请添加好友
          dataMap: {
              fzid: '',        //分组id
              avatar: '',   //申请人头像 （渲染重点）
              friendid: '',       //添加好友的id
              nickname: '',  //你给好友起的昵称，也就是备注
              userid:'',       //申请人id
          },
          extand: '',         //添加附加信息  （渲染重点）
          sendtime:'',   //消息时间
        },

        received_addFriendMessage:[]
      }
    },
    computed: {
      isHaveFriendMessage(){
        return this.ifHaveFriendMessage;
      },
      avatar(){
        return 'http://localhost:8080' + this.newFriendResult.avatar;
      },
      username(){
        return this.newFriendResult.username;
      },
      user_sign(){
        return this.newFriendResult.sign;
      }
    },
    watch: {},
    methods: {
      // 0.点击添加好友
      addFriend(){
        if(this.ifRedPoint){
          this.ifRedPoint = false;
          this.$bus.$emit('showNewFriend',this.received_addFriendMessage)
        }else{
          this.addFriendVisible = true;
          console.log('查看好友申请');
        }
      },
      // 1.查找好友
      searchFriend(){
        let url =
        "http://localhost:8080/user/queryUserById?id=" +this.searchId;
        $.get(url, (searchResult, status) => {
          // let searchResult = data.data;
          if (searchResult.code == 100) {
            this.$message.error('用户id不存在，请重新输入');
            this.ifHaveFriendMessage = false;
          }else if(searchResult.code == 200){
            this.newFriendResult = searchResult.data;
            this.ifHaveFriendMessage = true;
            // console.log(this.newFriendResult);  
          }
        });
      },

      // 2.获取存储在vuex中的用户好友分组信息     
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

      // 3.准备添加好友，先设置备注信息
      setSendMessage(){
        this.getFZmessage();
        this.innerVisible = true;
      },

      // 4.正式发送请求
      sendAddNewFriendRequest(){     
        this.addFriendVisible = false;
        this.innerVisible = false;

        // 获取本用户id以及头像
        let mine = this.$store.getters.userInfoMine;
        this.sendAddFriendData.type = 'addFriend';
        this.sendAddFriendData.dataMap.fzid= this.value;        //分组id
        this.sendAddFriendData.dataMap.avatar= mine.avatar,   //申请人头像 （渲染重点）
        this.sendAddFriendData.dataMap.friendid= this.newFriendResult.id;       //添加好友的id
        this.sendAddFriendData.dataMap.nickname= this.nickname,  //你给好友起的昵称，也就是备注
        this.sendAddFriendData.dataMap.userid= mine.id,       //申请人id         
        this.sendAddFriendData.extand= this.extand,         //添加附加信息  （渲染重点）
				this.sendAddFriendData.sendtime = 'Jul 18, 2020 1:45:47 PM'

        this.$message({
          message: '已发送好友请求,请等待好友通过验证',
          type: 'success'
        });

        let ws = this.$store.state.ws;
        console.log(this.sendAddFriendData);
        
        // console.log(ws);
        this.$store.state.ws.send(JSON.stringify(this.sendAddFriendData))
        
      },
    },
    created() {},
    mounted() {
      this.$bus.$on('get_a_addFriend_request',(msg)=>{
        this.ifRedPoint = true;
        this.received_addFriendMessage.push(msg);
      })
    },
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

  .search_input{
    width: 100%;
    overflow:hidden
  }

  .input{
    width: 50%;
    float: left;
  }

  .search{
    float:right;
  }

  .friendMessage{
    width: 100%;
    margin-top: 30px;
  }

  .this_position{
    margin: 10px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .redpoint{
    position: absolute;
    background-color: red;
    border-radius: 6px;
    top: 5px;
    left: 35px;
    width: 10px;height: 10px;
  }
</style>