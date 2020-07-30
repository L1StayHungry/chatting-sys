<!-- 右侧框：具体信息显示 -->
<template>
  <div :is="currentView" :user-message="friend" :group-message="groud" :msg="received_addFriendMessage"></div>
</template>

<script>
  import GroupMessage from "./GroupMessage";
  import FriendMessage from "./FriendMessage";
  import AddFriendMessage from "./AddFriendMessage";
  import DefaultMessage from "./DefaultMessage";

  export default {
    name:'CurrentMessage',
    props:{

    },
    components: {
      GroupMessage,
      FriendMessage,
      AddFriendMessage,
      DefaultMessage,
    },
    data() {
      return {
        friend: {},
        groud: {},
        received_addFriendMessage: [],

        currentView: 'AddFriendMessage'
      }
    },
    computed: {},
    watch: {},
    methods: {
    },
    created() {},
    mounted() {
      this.$bus.$on('showFriendDetail',(friend) =>{
        console.log('监听到用户点击查看个人信息');
        
        this.friend=friend;
        
        this.currentView = FriendMessage;
      })

      this.$bus.$on('showGroupDetail',(groud) =>{
        console.log('监听到用户点击查看群组信息');
        
        this.groud=groud;
        
        this.currentView = GroupMessage;
      })

      this.$bus.$on('showNewFriend',(received_addFriendMessage)=>{
        this.received_addFriendMessage = received_addFriendMessage;

        this.currentView = AddFriendMessage;
      })
    },
  }
</script>

<style scoped>

</style>