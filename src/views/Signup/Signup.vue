<template>
  <div>
    <mt-header title="注册" class="label">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>

    <div class="signup">
      <input type="text" placeholder="请输入邮箱地址" v-model="formData.email"/>
      <input type="password" placeholder="请输入密码" v-model="formData.password"/>
      <input type="password" placeholder="请再次输入密码" v-model="formData.repassword"/>
      <mt-button plain size="large" class="sub" @click.native="handleReg">注册</mt-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formData: {
          email: 'test@test.com',
          password: '123456',
          repassword: '123456'
        }
      }
    },
    methods: {
      async handleReg() {
        if (this.formData.email.trim() === '' || this.formData.password.trim() === '' || this.formData.repassword.trim() === '') {
          this.$toast('用户名或密码不能为空')
        } else if (this.formData.password.trim() !== this.formData.repassword.trim()) {
          this.$toast('两次输入的密码不相同')
        } else {
          const res = await this.$http.post('userSignup', {
            email: this.formData.email,
            password: this.formData.password,
            repassword: this.formData.repassword
          })
          if (res === null) return
          sessionStorage.setItem('JWT_TOKEN', res.data.token)
          sessionStorage.setItem('IS_LOGIN', true)
          this.$router.push({name: 'Home'})
          this.$toast(res.errmsg)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .label {
    background-color: #fff;
    color: #3c424a;
  }

  .signup {
    width: 90%;
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    margin: 1rem auto;
    input {

      width: 97%;
      height: 2.3rem;
      /*margin: 1rem auto;*/
      /*border:1px solid #CCC;*/
      border-radius: 0.5rem;
      background: #FFF;
      margin: 0.5rem 0;
      padding: 0.3rem;
      text-indent: 0.5rem;
      &:first-child {
        margin-top: 1rem;
      }
    }
    .sub {
      margin-top: 1rem;
    }
  }
</style>
