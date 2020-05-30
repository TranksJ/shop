<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像 -->
      <div class="avatar_box">
        <img src="../assets/logo.png"
             alt />
      </div>
      <!-- 输入框表单 -->
      <el-form :model="from"
               :rules="rules"
               label-width="0px"
               class="login_form"
               ref="loginForm">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user-solid"
                    v-model="from.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input type="password"
                    prefix-icon="el-icon-s-cooperation"
                    v-model="from.password"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary"
                     @click="subbtn('loginForm')">登录</el-button>
          <el-button type="info"
                     @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      from: {
        username: 'admin',
        password: '123456'
      },
      // 表单校验规则
      rules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: '' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 重置表单
    resetForm (e) {
      this.$refs[e].resetFields()
    },
    subbtn (e) {
      // 点击提交按钮 校验表单
      this.$refs[e].validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('login.php', { username: this.from.username, password: this.from.password })
        if (res.status !== '200') return this.$message.error({ message: '登录失败', duration: 1500 })
        this.$message.success({ message: '登录成功', duration: 1500 })
        window.sessionStorage.setItem('token', res.token)
        this.$router.push('/home')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login_container {
  background-color: pink;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  // 绝对居中
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.login_form {
  // 底部对齐
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
</style>
