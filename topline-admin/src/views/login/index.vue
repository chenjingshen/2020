<template>
  <div class="login-wrap">
    <div class="login-form">
      <div class="logo"><img src="./img/login_logo.png" alt="" /></div>
      <div class="form">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item prop="mobile">
            <el-input
              v-model="ruleForm.mobile"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-row>
              <el-col :span="13">
                <el-input
                  v-model="ruleForm.code"
                  placeholder="验证码"
                ></el-input>
              </el-col>
              <el-col :span="9" :offset="2"
                ><el-button
                  class="getCodeBtn"
                  @click="getCode"
                  :disabled="sec != 60"
                  >{{
                    sec == 60 ? "获取验证码" : "还有" + sec + "秒"
                  }}</el-button
                ></el-col
              >
            </el-row>
          </el-form-item>
          <el-form-item prop="agree"
            ><el-checkbox v-model="ruleForm.agree"></el-checkbox
            ><span>
              我已阅读并同意<a href="#">用户协议</a>和<a href="#"
                >隐私条款</a
              ></span
            >
          </el-form-item>
          <el-form-item
            ><el-button
              type="primary"
              class="btnLogin"
              @click="doLogin('ruleForm')"
              >登 录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      ruleForm: { mobile: "18801185985", code: "", agree: false },
      //   验证码倒计时
      sec: 60,
      rules: {
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "请输入11位正确的长度", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { len: 6, message: "请输入6位验证码", trigger: "blur" }
        ],
        // 这个代表值需需要有true，部位true就匹配不通过
        agree: [{ pattern: /true/, message: "请勾选同意", trigger: "change" }]
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    //   点击获取验证码
    getCode() {
      if (this.ruleForm.mobile == "") {
        this.$message({
          showClose: true,
          message: "请输入手机号",
          type: "error"
        });
        return;
      }
      let timerID = setInterval(() => {
        this.sec--;
        // 假设三秒后返回验证码
        if (this.sec == 57) {
          this.ruleForm.code = "246810";
        }
        // 判断是否到0，到0就停止计时器
        if (this.sec == 0) {
          clearInterval(timerID);
          this.sec = 60;
        }
      }, 1000);
    },
    doLogin(formName) {
      // 找到这个表单并调用validate方法（此方法是验证这个表单内所有元素是否全部通过规则）
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 能来到这里，就代表规则全部通过，此时发请求才比较合理
          axios
            .post("http://ttapi.research.itcast.cn/mp/v1_0/authorizations", {
              mobile: this.ruleForm.mobile,
              code: this.ruleForm.code
            })
            .then(res => {
              console.log(res);
              if (res.data.data) {
                this.$message({
                  message: "登录成功！",
                  type: "success"
                });

                // 发请求给服务器，让服务气判断账号密码是否正确，如果正确就跳转到home页面
                this.$router.push("/home");
              } else {
                // 如果错误提示错误信息并不跳转
                this.$message({
                  message: "账号或密码错误！",
                  type: "error"
                });
              }
            })
            // 发请求出现错误就触发
            .catch(() => {
              this.$message({
                message: "账号或密码错误！",
                type: "error"
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.login-wrap {
  height: 100%;
  background: url("./img/login_bg.jpg") no-repeat center / cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    width: 300px;
    background-color: #ffffff;
    padding: 50px;
    .logo {
      text-align: center;
      margin-bottom: 30px;
      img {
        width: 150px;
      }
    }
    .form {
      .getCodeBtn {
        width: 100%;
      }
      .btnLogin {
        width: 100%;
      }
    }
  }
}
</style>
