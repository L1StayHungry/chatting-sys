<template>
  <div>
    <!--        中间框-->
    <div class="fl wp35 hInherit" style="background-color: rgb(233,233,233)">
      <!--            搜索栏-->
      <div id="search"
           style="position: relative;height: 100px;width: 100%;">
        <el-input type="text"
                  style="width: 200px;
                          position: absolute;
                          left: 45%;top: 50%;
                          background-color: rgb(219,219,219);
                          transform: translate(-50%,-50%);"
                  placeholder="未开发"></el-input>
        <span @click=""
              style="position: absolute;right: 5%;top: 30%;font-size: 40px;
                        padding: 5px;
                        background-color: rgb(219,219,219);">+</span>
      </div>
      <!--            用户列表-->
      <div style="height: 400px">
        <!--&lt;!&ndash;                添加好友&ndash;&gt;-->
        <!--                <friend></friend>-->
        <!--&lt;!&ndash;                公众号&ndash;&gt;-->
        <!--                <friend></friend>-->
        <!--&lt;!&ndash;                群聊&ndash;&gt;-->
        <!--                <friend></friend>-->
        <!--                好友组-->
        <group :friend-group="groups"></group>
        <friend v-for="friend in friends" :friend-group="friend" :key="friend.id"
                :conpoment-change="changeComponent"></friend>
      </div>

    </div>
    <!--        右侧框-->
    <div class="fl" style="width: 400px;height: 500px;">
      <!--            <component is="FriendMessage" :user-message="singleFriend"></component>-->
      <component is="GroupMessage" :group-message="singleGroup"></component>
    </div>
  </div>
</template>
<script>
	import Friend from './FriendComponents/Friend'
	import Group from "./FriendComponents/Group"
	import GroupMessage from './FriendComponents/GroupMessage'
	import FriendMessage from './FriendComponents/FriendMessage'

	export default {
		components: {
			Friend,
			Group,
			GroupMessage,
			FriendMessage
		},
		data() {
			return {
				friends: [],
				singleFriend: {
					avatar: '/images/boy-03.png',
					id: 1,
					sign: '人生自古税务司',
					username: '小华'
				},
				singleGroup: [
					{
						id: '',
						username: '',
						sign: '',
						avatar: '',
						sex: '',
						status: ''
					}
				],
				groups: [],
				componentChange: 'FriendMessage'
			}
		},
		methods: {
			getFriendMessage: function () {
				let url = 'http://localhost:8080/user/mine?userid=' + sessionStorage.getItem('userId')
				$.get(url, (data, status) => {
					let dataJson = JSON.parse(data)
					if (dataJson.code == 0) {
						this.friends = dataJson.data.friend
						this.groups = dataJson.data.group
					}
				})
			},
			changeComponent: function (arg1) {
				this.singleFriend = arg1
			}
		},
		computed: {},
		mounted() {
			this.getFriendMessage();
		}
	}
</script>
<style>

</style>
