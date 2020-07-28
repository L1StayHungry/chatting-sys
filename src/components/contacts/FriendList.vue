/* 通讯录功能组件 */
<template>
  <div>
    <!--中间框-->
    <div class="fl wp35 hInherit" style="background-color: rgb(233,233,233)">
      <!--搜索栏-->
      <div id="search" style="position: relative;height: 100px;width: 100%;">
        <el-input
          type="text"
          style="width: 200px;
                          position: absolute;
                          left: 45%;top: 50%;
                          background-color: rgb(219,219,219);
                          transform: translate(-50%,-50%);"
          placeholder="未开发"
        ></el-input>
        <span
          @click="searchClick"
          style="position: absolute;right: 5%;top: 30%;font-size: 40px;
                        padding: 5px;
                        background-color: rgb(219,219,219);"
        >+</span>
      </div>
      <!--通讯录（群聊、好友分组列表）-->
      <scroll	class="content"
							ref="scroll"
							@scroll="contentScroll"
							:pull-up-load="true"
							:data="[]"
							:probe-type="3"
							>
				<!-- :pull-down-refresh="true" -->
        <div>
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
    <div class="fl" style="width: 400px;height: 500px;">
      <current-message></current-message>
      <!-- <component :is="GroupMessage" :group-message="singleGroup"></component> -->
    </div>
  </div>
</template>
<script>
import Scroll from "@/components/commen/scroll/Scroll";

import Friend from "@/components/contacts/childComps/Friend";
import Group from "@/components/contacts/childComps/Group";
import CurrentMessage from "@/components/contacts/childComps/CurrentMessage";

export default {
  components: {
    // 中部列表
    Scroll,
    Friend,
    Group,

    // 左侧详情信息
    CurrentMessage,
  },
  data() {
    return {
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
		searchClick() {},
		contentScroll(){},
  },
  computed: {},
  mounted() {
    this.getFriendMessage();
  }
};
</script>
<style scoped>
	.content {
		position: relative;
		bottom: 0;
		left: 0;
		right: 0;	
		top: 0;
		height: 400px;
		overflow: hidden;
	}
</style>
