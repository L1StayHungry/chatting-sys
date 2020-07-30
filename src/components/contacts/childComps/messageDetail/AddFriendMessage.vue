<!-- 默认的信息框 -->
<template>
  <div class="defaultDetail hInherit">
    <top-name>
      <div slot="left">
        <h4>新的朋友</h4>
      </div>
    </top-name>

    <new-friend-cell v-for="(item,index) in msg" 
                    :key="index" 
                    :request_msg=item>
    </new-friend-cell>
  </div>
</template>

<script>
  import TopName from "@/components/commen/right_part/TopName"
  import NewFriendCell from "@/components/contacts/childComps/newFriendCell"
  
  export default {
    name:'AddFriendMessage',
    props:{
      msg:Array,
    },
    components: {
      TopName,
      NewFriendCell
    },
    data() {
      return {
        msg_demo:[
          {
            "type": "checkAddFriend",      //消息类型，代表的是申请添加好友
            "dataMap": {
                "fzid": "1",        //分组id
                "avatar": "/images/boy-10.png",   //申请人头像 （渲染重点）
                "friendid": "3",       //添加好友的id
                "nickname": "小君君",  //你给好友起的昵称，也就是备注
                "userid":"2",       //申请人id
            },
            "extand": "我是XX,快点同意我好友",         //添加附加信息  （渲染重点）
            "sendtime":"Jul 22, 2020 10:03:41 AM"   //消息时间

          }
        ]
      }
    },
    computed: {},
    watch: {},
    methods: {},
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
  .defaultDetail{
    background-color: rgb(245, 245, 245);
  }
  .detail{
    height: 50px;
    justify-content:center;
    align-items:center;
    display:-webkit-flex;
    border-bottom:1px solid rgb(181, 204, 204);
  }
</style>