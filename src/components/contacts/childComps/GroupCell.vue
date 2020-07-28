<template>
  <div class="friendCell" @click="showGroupDetail">
    <img :src="avatar" alt="找不到图片" style="position: absolute;left: 10px;top: 10px;font-size: 3px" width="30">
    <span style="position: absolute;left: 45px;top: 6px;">{{groudname}}</span>
    <span style="position: absolute;left: 45px;top: 30px;font-size: 8px;color: green"> {{notice}} </span>
  </div>
</template>
<script>
	export default {
		props: {
			group: {}
			/* {
          "group_id": 12,
          "groupname": "群组二",
          "avatar": "/images/boy-15.png",
          "notice": null,
          "user_id": 2,
          "approve": null
        } */
		},
		data() {
			return {
			}
		},
		methods: {
			showGroupDetail(){
				this.$bus.$emit('showGroupDetail',this.group)
			}
		},
		computed: {
			avatar() {
				return 'http://localhost:8080' + this.group.avatar
			},
			groudname(){
				return this.group.groupname
			},
			notice: function () {
				if (this.group.length > 6)
					return this.group.notice.substring(0, 6) + '...'
				else
					return this.group.notice;
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
  }
</style>
