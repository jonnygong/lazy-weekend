<template>
  <div>
    <mt-header title="个人资料" class="label">
      <router-link to="/home" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="save" slot="right">保存</mt-button>
    </mt-header>

    <div class="personal">
      <img :src="testList.img" alt=""/>
      <h2>{{ testList.name }}</h2>
      <ul>
        <li>
          <p>性别</p>
        </li>
        <li>
          <input type="radio" name="sex" />男
          <input type="radio" name="sex" />女</li>
      </ul>
      <ul>
        <li>
          <p>当前状态</p>
        </li>
        <li>
          <input type="radio" name="status" />为人父母</li>
        <li>
          <input type="radio" name="status" />恋爱中/已婚</li>
        <li>
          <input type="radio" name="status" />单身生活</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
          testList: {
              name: '无人及你.',
              img: 'https://img.qianduanmei.com/2017/03/17/0019_line_logo.jpg',
              sex: 1,
              status: 2
          },
          sex: ''

        }
    }
}
</script>

<style lang="scss">
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
    img {
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
          vertical-align:middle;
          margin: 0.5rem 0.5rem;
        }
      }

    }
  }

</style>
