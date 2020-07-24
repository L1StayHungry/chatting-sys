<template>
  <div class="friendCell">
    <img :src="img" alt="找不到图片" style="position: absolute;left: 10px;top: 10px;font-size: 3px" width="30">
    <span style="position: absolute;left: 45px;top: 6px;">{{groupName}}</span>
    <span style="position: absolute;left: 45px;top: 30px;font-size: 8px;color: green"> {{notice}} </span>
  </div>
</template>
<script>
	export default {
		props: {
			group: Object
		},
		data() {
			return {
				groupName: this.group.groupname,
			}
		},
		methods: {},
		computed: {
			img: function () {
				return 'http://localhost:8080' + this.group.avatar
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
