<template>
  <div class="friend">
    <span
        style="display: inline-block;width: 100%;color: #cccccc;text-align: left;margin-left: 8px;">{{listName}}</span>
    <friend-cell v-for="friend in listArr" :friend="friend" :key="friend.id"></friend-cell>
  </div>
</template>
<script>
	import FriendCell from './FriendCell'

	export default {
		props: {
			friendGroup: Object
		},
		components: {
			FriendCell
		},
		data() {
			return {
				listName: this.friendGroup.fzGroupname,
				listArr: this.friendGroup.users,
			}
		},
		methods: {
			hello: function () {
				console.log('hello world!')
			},
			ttt: function () {

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
