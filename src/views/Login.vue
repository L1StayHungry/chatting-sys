<template>
  <div style="width: inherit;height: inherit;">
    <div  class="login" style="">
      <h1 style="position: absolute;left: 20px;top:20px;">登录界面</h1>
      <el-input type="input" placeholder="输入邮箱" v-model="user.email" style="width: 200px;
            position: absolute;left: 20px;top: 120px;">
      </el-input>
      <el-input type="password" placeholder="输入密码" v-model="user.pass" style="width: 200px;
            position: absolute;left: 20px;top: 170px;"></el-input>
      <span class="span_1" @click="registerVisible = true">注册账号</span>
      <el-button type="success" @click="login" style="position: absolute;left: 20px;top: 220px;">登录</el-button>
    </div>
    <!--        弹出注册框-->

    <el-dialog title="注册账号" :visible.sync="registerVisible">
      <el-form :model="registerUserMessage">
        <el-form-item label="账户" :label-width="formLabelWidth">
          <el-input v-model="registerUserMessage.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="registerUserMessage.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input v-model="registerUserMessage.confirmPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址" :label-width="formLabelWidth">
          <el-input v-model="registerUserMessage.email" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="registerVisible = false">取 消</el-button>
        <el-button type="primary" @click="registerSuccess">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
	import { Login } from '@/http/api'

	export default {
		data() {
			return {
				user: {
					email:'',
					pass: '',
				},
				registerUserMessage: {
					userName: '',
					password: '',
					confirmPassword: '',
					email: ''
				},
				registerVisible: false,
				formLabelWidth: '120px'
			}
		},
		methods: {
			login: function () {
				if (this.user.email == '' || this.user.password == '') {
					alert('输入完整的邮箱和密码');
					return;
				}
				// $.post(this.url, this.user, (data, status) => {
					
				// 	if (data.code == 200) {
				// 		let thisdata = data.data;
				// 		sessionStorage.setItem('isLogin', '1')
				// 		sessionStorage.setItem('userId', thisdata.id)
				// 		sessionStorage.setItem('userEmail', this.user.email)
				// 		this.$router.push('/homePage');
				// 	} else {
				// 		sessionStorage.setItem('isLogin', '0')
				// 		alert('密码错误')
				// 	}
				// })
				Login(this.user).then(res => {
						if (res.code == 200) {
							let thisdata = res.data;
							sessionStorage.setItem('isLogin', '1')
							sessionStorage.setItem('userId', thisdata.id)
							sessionStorage.setItem('userEmail', this.user.email)
							this.$router.push('/homePage');
						} else {
							sessionStorage.setItem('isLogin', '0')
							alert('密码错误')
						}
				})
			},
			registerSuccess: function () {
				let registerUrl = 'http://localhost:8080/register'
				if (this.registerUserMessage.userName == '') {
					alert('输入用户昵称');
					return;
				}
				if (this.registerUserMessage.password == '' || this.registerUserMessage.confirmPassword == '') {
					alert('密码不能为空')
					return;
				}
				if (this.registerUserMessage.password != this.registerUserMessage.password) {
					alert('密码不一致')
					return;
				}
				$.post(registerUrl, this.registerUserMessage, (data, status) => {
					if (data == 1) {
						alert('注册成功')
					} else {
						alert('注册失败')
					}
				})
				this.registerVisible = false
			}
		}
	}
</script>

<style scoped>
	.login{
		background-color: #cccccc;
		width: 300px;
		height: 400px;

		/* border: 1px solid #cccccc; */
		position: absolute;

		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
  .span_1 {
    color: #2b0606;
    position: absolute;
    left: 150px;
    top: 220px;
  }

  .span_1:hover {
    color: #2c3e50;
    cursor: pointer;
  }
</style>
