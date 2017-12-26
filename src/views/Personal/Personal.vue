<template>
  <div>
    <mt-header title="个人资料" class="label">
      <router-link to="/home" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="save" slot="right" @click="editUserInfo()">保存</mt-button>
    </mt-header>

    <div class="personal" :model="formData">
      <!-- <img :src="formData.cover" alt=""/> -->
      <avatar class="avatar" :size="160" :username="formData.name"></avatar>
      <h2><input type="text" :value="formData.name"></h2>
      <ul>
        <li>
          <p>性别</p>
        </li>
        <li>
          <input type="radio" name="sex" v-model="formData.sex" :value="1" />男
          <input type="radio" name="sex" v-model="formData.sex" :value="2" />女
          </li>
      </ul>
      <ul>
        <li>
          <p>当前状态</p>
        </li>
        <li>
          <input type="radio" name="life_status" v-model="formData.life_status" :value="1" />为人父母</li>
        <li>
          <input type="radio" name="life_status" v-model="formData.life_status" :value="2" />恋爱中/已婚</li>
        <li>
          <input type="radio" name="life_status" v-model="formData.life_status" :value="3" />单身生活</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Avatar from 'vue-avatar'

export default {
  data() {
    return {
      userList: {
        // name: "无人及你.",
        // img: "https://img.qianduanmei.com/2017/03/17/0019_line_logo.jpg",
        // sex: 1,
        // status: 2
      },
      sex: "",
      life_status: "",
      formData: {
        name: '',
        cover: '',
        sex: '',
        life_status: '',
      },
      cover: ''
    };
  },
  methods: {
    async getUserList() {
      let params = {};
      const res = await this.$http.get("userInfo", params);
      if (res === null) return;
      // this.userList = res.data;
      // this.sex = res.data.sex;
      // this.life_status = res.data.life_status;
       this.formData = Object.assign({}, res.data);
    },
    async editUserInfo() {
      let params = Object.assign({}, this.formData);

      const res = await this.$http.post(`userUpdate`, params);

      if (res === null) return;
      this.getUserList();
      // this.$message({
      //   message: "喜欢成功",
      //   type: "success"
      // });
    },
    // async onUpload() {
    //   let params = {
    //     cover
    //   }

    //   const res = await this.$http.post(`userUpdate`, params);

    //   if (res === null) return;
    //   this.getUserList();
    //   // this.$message({
    //   //   message: "喜欢成功",
    //   //   type: "success"
    //   // });
    // },
    
  },
   components: {
    Avatar
  },

  mounted() {
    this.getUserList();
  }
};
</script>

<style lang="scss" scoped>
.label {
  background-color: #fff;
  color: #3c424a;
}
.personal {
  width: 20rem;
  margin: 5rem auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  img, .avatar {
    width: 13rem;
    height: 13rem;
    margin: 0 auto;
    border-radius: 13rem;
  }
  h2 {
    font-size: 18px;
    text-align: center;
    margin: 1rem auto;
    font-weight: inherit;
    input {
      text-align: center;
      background-color: #f2f2f2;
    }
  }
  ul {
    margin: 0 auto;
    wdith: 5rem;

    li {
      line-height: 22px;
      font-size: 16px;
      p {
        text-align: center;
        color: #333;
        font-size: 12px;
        margin: 2rem 0 1rem 0;
      }
      input {
        width: 2rem;
        height: 2rem;
        border: 1px solid #ccc;
        border-radius: 100%;
        box-shadow: 0 0 1px #ccc;
        background: rgb(255, 255, 255);
        vertical-align: middle;
        margin: 0.5rem 0.5rem;
      }
    }
  }
}
</style>
