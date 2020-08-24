<!-- 左侧主菜单 -->
<template>
  <div class="fl wp7 hInherit relative" style="background-color: rgb(42,42,42);">
    <ul id="ul1">
      <!-- 个人头像 -->
      <li style="margin-top:20px"><a><img width="40px" :src="get_user_avatar" alt="无法显示" style="font-size: 4px"></a></li>

      <li style="margin-top:20px">
        <a @click="toChatList()">
          <span class="iconfont icon-liaotian"></span>
        </a>
      </li>

      <li style="margin-top:20px">
        <a @click="toFriendList()">
          <span class="iconfont icon-yonghu"></span>
        </a>
      </li>
      <li style="margin-top:20px">
        <a @click="toOther()"><span class="iconfont icon-shoucang"></span>
        </a>
      </li>
      <li style="margin-top:20px">
        <a @click="chat()"></a>
        <span class="iconfont icon-wenjian"></span></li>
      <li style="margin-top:20px">
        <span class="iconfont icon-kanyikan"></span></li>
    </ul>

    <ul style="margin-top:40px">

      <li style="margin-top:80px">
        <a @click="chat()">
          <span class="iconfont icon-shouji"></span>
        </a>
      </li>

      <li style="margin-top:20px">
        <a href="#" @click="chat()">
          <span class="iconfont icon-gengduo"></span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>

  export default {
    name:'MainTabBar',
    data() {
			return {
				mine: {
					id: Number,
					username: String,
					sign: String,
					status: String,
					avatar: String,
					sex: Number
				}
			}
		},
		computed: {
			get_user_avatar: function () {
				// console.log(this.mine.avatar)
				return 'http://localhost:8080' + this.mine.avatar
			}
		},
		methods: {
			chat: function () {
			},
			toImgMessage: function () {

			},
			toChatList: function () {
				this.$router.push({path: '/homePage/ChatList'})
			},
			toFriendList: function () {
				this.$router.push({path: '/homePage/FriendList'})
			},
			toOther: function () {

			},
			getUserMessage: function () {
        
        // this.mine = this.$store.getters.userInfoMine;
				let url = 'http://localhost:8080/user/mine?userid=' + sessionStorage.getItem('userId')
        // console.log(sessionStorage.getItem('userId'));
        
        $.get(url, (data, status) => {
          let dataJson = data.data;
          dataJson = JSON.parse(dataJson);
          // console.log(dataJson.data);
          
					if (dataJson.code == 0) {
            // this.mine = data.data.mineResult.mine
						this.$store.commit('setUserInfo',dataJson.data)
            // console.log(this.$store.state.userInfo);
            this.mine = this.$store.getters.userInfoMine;
					}
				})
			}
		},
		mounted() {
      this.getUserMessage()
    },
  }
</script>

<style scoped>

</style>