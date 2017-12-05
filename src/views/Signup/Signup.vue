<template>
  <div>
    <mt-header title="注册" class="label">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>

    <div class="signup">
      <input type="text" placeholder="请输入手机号"/>
      <input type="text" placeholder="请输入密码"/>
      <input type="text" placeholder="请再次输入密码"/>
      <mt-button plain size="large" class="sub" @click="getListData">注册</mt-button>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
         
        }
    },
    methods: {
      async getListData() {
      // if (this.email.trim() === '' || this.password === '') {
      //   this.message = '用户名或密码不能为空'
      // } else {
        const res = await this.$http.post('userSignup', {
            email: 'gjn1',
            password: 'gjn1'
          })
          if(res === null) return
          console.log(result)
      //   this.$router.go(-1)
      // }
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
      background:#FFF;
      margin:0.5rem 0;
      padding:0.3rem;
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
