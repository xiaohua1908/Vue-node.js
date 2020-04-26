<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent="Login">
        <el-form-item label="用户名">
          <el-input type="text" v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      model: {username:'',password:''}
    };
  },
  methods: {
    async Login() {
      if (this.model.username.trim() == "") {
        this.$message({
          type: "error",
          message: "用户名不能为空，请重新输入"
        });
      } else {
        const res = await this.$http.post("login", this.model);
        localStorage.token = res.data.token;
        //    sessionStorage.token = res.data.token;
        this.$router.push("/");
        this.$message({
          type: "success",
          message: "登录成功"
        });
      }
    }
  }
};
</script>

<style scoped>
.login-card {
  width: 30rem;
  margin: 5rem auto;
}
</style>