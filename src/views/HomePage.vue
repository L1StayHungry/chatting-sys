<template>
  <div class="w800 h500 fl relative homePage" style="background-color: #ffffff;border: 1px solid #cccccc">
    <!--        左侧栏-->
    <div class="fl wp15 hInherit relative" style="background-color: rgb(42,42,42);">
      <ul id="ul1">
        <li style="margin-top:20px"><a><img width="60" :src="img" alt="无法显示" style="font-size: 4px"></a></li>

        <li style="margin-top:20px">
          <a @click="toChatList()">
            <span class="iconfont icon-liaotian"></span>
          </a>
        </li>

        <li style="margin-top:20px">
          <a @click="toFriendList">
            <span class="iconfont icon-yonghu"></span>
          </a>
        </li>
        <li style="margin-top:20px">
          <a @click="toOther"><span class="iconfont icon-shoucang"></span>
          </a>
        </li>
        <li style="margin-top:20px">
          <span class="iconfont icon-wenjian"></span></li>
        <li style="margin-top:20px">
          <span class="iconfont icon-kanyikan"></span></li>
      </ul>

      <ul style="margin-top:40px">

        <li style="margin-top:80px">
          <a @click="chat">
            <span class="iconfont icon-shouji"></span>
          </a>
        </li>

        <li style="margin-top:20px">
          <a href="#" @click="chat">
            <span class="iconfont icon-gengduo"></span>
          </a>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
	export default {
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
			img: function () {
				console.log(this.mine.avatar)
				return 'http://localhost:8080' + this.mine.avatar
			}
		},
		methods: {
			chat: function () {

			},
			toImgMessage: function () {

			},
			toChatList: function () {
				this.$router.push('/homePage/ChatList')
			},
			toFriendList: function () {
				this.$router.push({path: '/homePage/FriendList'})
			},
			toOther: function () {

			},
			getUserMessage: function () {
				let url = 'http://localhost:8080/user/mine?userid=' + sessionStorage.getItem('userId')
				$.get(url, (data, status) => {
					let dataJson = JSON.parse(data)
					if (dataJson.code == 0) {
						this.mine = dataJson.data.mine
					}
				})
			}
		},
		mounted() {
			this.getUserMessage()
		}
	}
</script>
<style>
  .test1 {
    font-size: 14px;
    max-width: 50px;
  }

  .wp15 {
    width: 15%;
  }

  .wp35 {
    width: 35%;
  }

  .wp50 {
    width: 50%;
  }

  .hInherit {
    height: inherit;
  }

  .w800 {
    width: 800px;
  }

  .h500 {
    height: 500px;
  }

  .border {
    border: 1px solid red;
  }

  .fl {
    float: left;
  }

  .relative {
    position: relative;
  }

  .absolute {
    position: absolute;
  }

  .homePage {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  ul li {
    cursor: pointer;
  }

  #chatSlider div:hover {
    background-color: rgb(220, 220, 220);
    cursor: pointer;
  }
</style>
