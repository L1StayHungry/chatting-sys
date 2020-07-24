<template>
  <div class="friendCell" @click="chooseFriend">
    <img :src="img" alt="无法显示" style="position: absolute;left: 10px;top: 10px;" width="30">
    <span style="position: absolute;left: 45px;top: 6px;">{{messageName}}</span>
    <span style="position: absolute;left: 45px;top: 30px;font-size: 8px;color: green"> {{sign}} </span>
    <span class="iconfont" id="icon-span1">{{yesOrNot ? '&#xe6a8;' : '&#xe789;'}}</span>
  </div>
</template>
<script>
	export default {
		props: {
			friend: Object
		},
		data() {
			return {
				messageName: this.friend.username,
				sign: this.friend.sign,
        yesOrNot:false
			}
		},
		methods: {
			chooseFriend:function () {
        this.yesOrNot = !this.yesOrNot
        this.$emit('transferMsg',this.friend.id)
			}
    },
		computed: {
			img: function () {
				return 'http://localhost:8080/' + this.friend.avatar
			}
		},
		mounted() {

		}
	}
</script>
<style scoped>
  .friendCell {
    position: relative;
    height: 50px;
  }

  .friendCell:hover {
    background-color: #cccccc;
    cursor: pointer;
  }
  #icon-span1 {
    position: absolute;
    right: 20px;
    top: 10px;
  }
</style>
