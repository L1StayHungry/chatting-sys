<template>
  <div class="friend">
    <span
        style="display: inline-block;width: 100%;color: #cccccc;text-align: left;margin-left: 8px;">{{listName}}</span>
    <left-list-cell @transferMsg="ttt" v-for="friend in listArr" :friend="friend" :key="friend.id"></left-list-cell>
  </div>
</template>
<script>
	import LeftListCell from "./LeftListCell";

	export default {
		props: {
			friendGroup: Object
		},
		components: {
			LeftListCell
		},
		data() {
			return {
				listName: this.friendGroup.groupname,
				listArr: this.friendGroup.list
			}
		},
		methods: {
			hello: function () {
				console.log('hello world!')
			},
			ttt: function (id) {
        this.$emit('transferMsg1',id)
			}
		},
		computed: {}
	}
</script>
<style scoped>
  .friend {
    position: relative;
    width: 100%;
    border-bottom: 1px solid #cccccc;
  }
</style>
