<template>
  <div class="friend">
    <span style="display: inline-block;width: 100%;color: #cccccc;text-align: left;margin-left: 8px;">群组</span>
    <group-cell v-for="group in listArr" :group="group" :key="group.id"></group-cell>
  </div>
</template>
<script>
	import GroupCell from './GroupCell'

	export default {
		props: {
			friendGroup: Array
		},
		components: {
			GroupCell
		},
		data() {
			return {}
		},
		methods: {},
		computed: {
			listArr: function () {
				return this.friendGroup
			}

		}
	}
</script>
<style scoped>
  .friend {
    position: relative;
    width: 100%;
    border-bottom: 1px solid #cccccc;
  }
</style>
