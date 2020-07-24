<template>
  <div class="firendMsg">
    <div style="height: 40%;position: relative;border-bottom: 1px solid #cccccc">
      <span style="position: absolute;left: 20px;top: 80px;font-size: 20px"><strong>{{userMsg.name}}</strong></span>
      <span style="position: absolute;left: 20px;top: 110px;color: #cccccc">{{userMsg.sign}}</span>
      <img :src="img" alt="无法显示" width="30" style="font-size: 4px;position: absolute;right: 50px;top: 80px">
    </div>
    <div style="height: 30%;position: relative;border-bottom: 1px solid #cccccc">
            <span style="position: absolute;left: 20px;top: 20px">
                <span style="display: inline-block;margin-right: 20px;color: #cccccc">备注</span>
                <span>备注</span>
            </span>
      <span style="position: absolute;left: 20px;top: 60px">
                <span style="display: inline-block;margin-right: 20px;color: #cccccc">微信号</span>
                <span>{{userMsg.id}}</span>
            </span>
      <span style="position: absolute;left: 20px;top: 100px">
                <span style="display: inline-block;margin-right: 20px;color: #cccccc">来源</span>
                <span>{通过搜索添加的}}</span>
            </span>
    </div>
    <div style="height: 30%;position: relative">
      <button style="position: absolute;top: 30px;width: 50px;height: 30px;background-color: green;outline: none">发送
      </button>
    </div>
  </div>
</template>
<script>
	export default {
		props: {
			userMessage: Object
		},
		data() {
			return {
				userMsg: {
					name: this.userMessage.username,
					sign: this.userMessage.sign,
					alias: '',
					id: this.userMessage.id,
					resource: '',
					avatar: this.userMessage.avatar
				}
			}
		},
		computed: {
			img: function () {
				console.log(this.userMsg.avatar)
				return 'http://localhost:8080' + this.userMessage.avatar

			}
		}
	}
</script>
<style scoped>
  .firendMsg {
    height: 100%;
    width: 100%;
  }
</style>
