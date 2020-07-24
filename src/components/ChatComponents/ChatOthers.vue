<template>
  <!--                别人发信息过来的块级元素-->
  <div name="user1" style="position: relative;width: 100%;" class="div2">
    <img style="display: inline-block;float:left;margin-right: 0;margin-top: 5px"
         :src="'http://localhost:8080'+msg.avatar" alt="无法显示" width="30">
    <span style="float: left;margin-left: 12px;margin-top: 1px;color: #cccccc">{{msg.username}}</span>
    <span class="textTest1"
          style="font-size: 14px;
                           float: left;
                           margin-left: -35px;
                           margin-top: 20px;
                           background-color: white;
                           padding: 5px;
                           max-width: 200px;
                           text-align: left;
                           border-radius: 2px;
                           word-wrap: break-word;">{{msg.context}}</span>
    <span style="display: inline-block;
                    width: 8px;
                    height: 8px;
                    transform: rotate(45deg);
                    position: absolute;
                    left: 35px;
                    top: 25px;
                    background-color: white"></span>
    <div class="clear"></div>
  </div>
</template>
<script>
	export default {
		props: {
			userGetMessage: Object
		},
		data() {
			return {}
		},
		methods: {
			// adjustHeight:function () {
			//     document.querySelector('.div2').style.height =
			//         18 + document.querySelector('.textTest1').offsetHeight +'px'
			// }
		},
		computed: {
			msg: function () {
				return this.userGetMessage;
			}
		},
		watch: {},
		mounted() {

		},
		beforeUpdate() {

		}
	}
</script>
<style>
  .div2:after {
    content: '';
    clear: both;
  }

  .clear {
    clear: both;
  }
</style>
