<template>
  <div id="rightCell">
    <img :src="img" alt="1" width="30">
    <span id="span1">{{friendObj.username}}</span>
    <span id="span2" @click="deleteFriend">删除</span>
    <div class="clear"></div>
  </div>
</template>
<script>
	export default {
		props: {
			friendObj:Object
    },
		components: {},
		data() {
			return {}
		},
		methods: {
			deleteFriend:function () {
        this.$emit('deleteGroupFriend',this.friendObj.id)
			}
    },
		computed: {
			img: function () {
				return 'http://localhost:8080/' + this.friendObj.avatar
			}
    },
		mounted() {
		}
	}
</script>
<style scoped>
  #rightCell {
    width: 100%;
    height: 50px;
    position: relative;
    border: 1px solid red;
  }
  .clear {
    clear: both;
  }
  div img{
    position: absolute;
    left: 0px;
    top: 10px;
  }
  #span1{
    position: absolute;
    left: 40px;
    top: 20px;
  }
  #span2{
    position: absolute;
    right: 20px;
    top: 20px;
  }
  #span2:hover{
    cursor: pointer;
    color: rgb(222,222,222);
  }
</style>
