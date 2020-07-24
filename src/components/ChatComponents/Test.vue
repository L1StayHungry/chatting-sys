<template>
  <!--                别人发信息过来的块级元素-->
  <div name="user1" style="position: relative;width: 100%;border: 1px solid red" class="div2">
    <img style="display: inline-block;position: absolute;left: 0;top: 5px" src="../../assets/imgs/test1.jpg" alt="无法显示"
         width="30">
    <span style="position: absolute;left: 40px;top: 1px;color: #cccccc">userName</span>
    <span class="textTest1"
          style="font-size: 14px;
                           position: absolute;
                           left: 40px;
                           top: 20px;
                           background-color: white;
                           padding: 5px;
                           max-width: 200px;
                           text-align: left;
                           border-radius: 2px;
                           word-wrap: break-word;">卧槽，各位大佬带带我，我是垃圾，谢谢啦，一下但事实上所所所所所所所</span>
    <span style="display: inline-block;
                    width: 8px;
                    height: 8px;
                    transform: rotate(45deg);
                    position: absolute;
                    left: 35px;
                    top: 25px;
                    background-color: white"></span>
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
