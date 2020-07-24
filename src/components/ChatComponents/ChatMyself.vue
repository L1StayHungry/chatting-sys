<template>
  <div>
    <!--                自己发信息过去的块级元素-->
    <div name="user2" style="position: relative;" class="div1">
      <img :src="'http://localhost:8080'+msg.avatar" alt="无法显示" width="30"
           style="float:right;margin-right: 10px;margin-top: 10px;">
      <span style="position: absolute;
                        color: #cccccc;
                        top: 5px;
                        right: 45px;">{{msg.username}}</span>
      <span class="textTest2"
            style="float: right;
                          background-color: white;
                          padding: 5px;
                          text-align: left;
                          border-radius: 2px;
                          word-wrap: break-word;
                          max-width: 200px;
                          margin-right: 5px;
                          margin-top: 25px;">{{msg.context}}</span>
      <span style="
                        position: absolute;
                        width: 8px;
                        height: 8px;
                        transform: rotate(45deg);
                        right: 43px;
                        top: 28px;
                        background-color: white;
                        "></span>
      <div class="clear"></div>
    </div>
  </div>

</template>
<script>
	export default {
		props: {
			userSendMessage: Object,
		},
		data() {
			return {}
		},
		methods: {},
		computed: {
			msg: function () {
				return this.userSendMessage
			}
		},
		mounted() {

		},
		created() {

		}
	}
</script>
<style>
  .clear {
    clear: both;
  }
</style>
