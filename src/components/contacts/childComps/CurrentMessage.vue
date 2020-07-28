<!-- 右侧框：具体信息显示 -->
<template>
  <div :is="currentView" :user-message="friend" :group-message="groud"></div>
</template>

<script>
  import GroupMessage from "@/components/contacts/childComps/GroupMessage";
  import FriendMessage from "@/components/contacts/childComps/FriendMessage";
  import DefaultMessage from "@/components/contacts/childComps/DefaultMessage";

  export default {
    name:'CurrentMessage',
    props:{

    },
    components: {
      GroupMessage,
      FriendMessage,
      DefaultMessage,
    },
    data() {
      return {
        friend: {},
        groud: {},
        currentView: 'defaultMessage'
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

</style>