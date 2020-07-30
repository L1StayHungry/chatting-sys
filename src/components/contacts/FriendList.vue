/* 通讯录功能组件 */
<template>
  <div>
    <!--中间框-->
    <div class="friendList">
      <!--搜索栏-->
      <search></search>

      <!--通讯录（群聊、好友分组列表）-->
      <scroll	class="content"
							ref="scroll"
							@scroll="contentScroll"
							:pull-up-load="true"
							:data="[]"
							:probe-type="3"
               v-if="reFresh"
							>
				<!-- :pull-down-refresh="true" -->
        <div>
          <add-friend></add-friend>
          <group :friend-group="groups"></group>
          <friend
            v-for="friend in friends"
            :friend-group="friend"
            :key="friend.id"
            :conpoment-change="changeComponent"
          ></friend>
        </div>
      </scroll>
    </div>


    <!--        右侧框-->
    <div class="fl" style="width: 63%;height: 500px;">
      <current-message></current-message>
      <!-- <component :is="GroupMessage" :group-message="singleGroup"></component> -->
    </div>

  </div>
</template>


<script>
import Search from "@/components/commen/search/Search"

import Scroll from "@/components/commen/scroll/Scroll";

import AddFriend from "@/components/contacts/childComps/addNewFriend/AddNewFriend"
import Friend from "@/components/contacts/childComps/Friend";
import Group from "@/components/contacts/childComps/Group";
import CurrentMessage from "@/components/contacts/childComps/messageDetail/CurrentMessage";

export default {
  components: {
    //搜索框
    Search,

    // 中部列表
    Scroll,
    AddFriend,
    Friend,
    Group,

    // 右侧详情信息
    CurrentMessage,
  },
  data() {
    return {
      reFresh:true,
      friends: [],//好友信息列表
      singleGroup: [
        {
          id: "",
          username: "",
          sign: "",
          avatar: "",
          sex: "",
          status: ""
        }
      ],
      groups: [],//群聊信息列表
      componentChange: "FriendMessage"
    };
  },
  methods: {
    getFriendMessage: function() {
      let url =
        "http://localhost:8080/user/mine?userid=" +
        sessionStorage.getItem("userId");
      $.get(url, (data, status) => {
        let dataJson = data.data;
        if (dataJson.code == 0) {
          this.friends = dataJson.mineResult.friend;
          this.groups = dataJson.mineResult.group;
        }
      });
    },
    changeComponent: function(arg1) {
      this.singleFriend = arg1;
    },
		contentScroll(){},
  },
  computed: {},
  mounted() {
    this.getFriendMessage();
    this.$bus.$on('updateFriendList',()=>{
      window.location.reload(true)
      // window.reload();
      // this.reFresh= false;
      // this.$nextTick(()=>{
      //   this.reFresh = true
      // })
    });
  },
};
</script>
<style scoped>
  .friendList{
    float: left;
    position: relative;
    width: 30%;
    height: Inherit; 
    background-color: rgb(233,233,233);
  }

	.content {
		position: relative;
		bottom: 0;
		left: 0;
		right: 0;	
		top: 0;
		height: 430px;
		overflow: hidden;
	}
</style>
