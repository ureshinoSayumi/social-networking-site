<template>
  <div class="containers">
    <main class="row">
      <div class="col">
        <img class="mainImg" src="https://upload.cc/i1/2022/04/11/Qq25Hw.png" alt="">
      </div>
      <div class="col">
         <div class="login-block">
            <div class="login-title">
              <img src="https://upload.cc/i1/2022/04/11/3rEBmZ.png" alt="">
              <p v-if="isSignup" class="text">註冊</p>
              <p v-else class="text">到原宇宙展開全新社交圈</p>
            </div>
            <div class="login-input">
              <input type="text" placeholder="Name">
              <div class="wrong-msg">
                <span>暱稱至少 2 個字元以上</span>
              </div>
              <input type="text" placeholder="Email">
              <div class="wrong-msg">
                <span>帳號已被註冊，請替換新的 Email！</span>
              </div>
              <input type="password" name="" id=" " placeholder="Password">
              <div class="wrong-msg">
                <span>密碼需至少 8 碼以上，並中英混合</span>
              </div>
            </div>
            <div v-if="loginError" class="wrong-msg">
              <span>帳號或密碼錯誤，請重新輸入！</span>
            </div>
            <div class="btn-block">
              <template v-if="isSignup">
                <button @click="signup" type="button" class="btn-login" :class="isSignup ? 'btn-error' : '' ">註冊</button>
                <button @click="login" type="button" class="btn-signup" >登入</button>
              </template>
              <template v-else>
                <button @click="login" type="button" class="btn-login" :class="loginError ? 'btn-error' : '' ">登入</button>
                <button @click="signup" type="button" class="btn-signup">註冊帳號</button>
              </template>
            </div>
         </div>
      </div>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  data () {
    return {
      loginError: false,
      isSignup: false
    }
  },
  methods: {
    login () {
      this.loginError = !this.loginError
    },
    signup () {
      this.isSignup = !this.isSignup
    }
  },
  async mounted () {
    // this.axios.get('https://calm-dawn-74154.herokuapp.com/todos')
    //   .then((response) => {
    //     console.log(response, 'asdf')
    //   })
    //   .catch((error) => {
    //     console.log(error, 'error')
    //   })
  }
}
</script>
<style lang="scss" scoped>
.containers {
  width: 100%;
  // margin-top: 300px;
  // height: 100vh;
  // max-width: 1440px;
  // max-height: 960px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.row {
  background-color: #EFECE7;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  // width: 870px;
  padding: 70px 24px;
  box-shadow: -8px 8px 0px #00040029;
}
.col {
  margin: 0 24px;
}
.login-block {
  width: 374px;
}
.login-title {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 36px;
}
.text {
  font: 24px 'Helvetica Neue', sans-serif;
  font-weight: 700;
}
.login-input {
  display: flex;
  flex-direction: column;
  /* 帳號密碼輸入框 */
  input {
    padding: 16px 24px 16px;
    margin-bottom: 16px;
    border: 2px solid #000400;
    outline: none;
    font: Azeret Mono;
  }
}

.login-input input::placeholder {
  color: #9B9893;
}
/* 錯誤訊息 */
.wrong-msg {
  font: 14px 'Noto Sans TC';
  color: #F57375;
  margin: 16px 0 0 0;
  text-align: center;
}

/* 登入與註冊按鈕 */
.btn-block {
  display: flex;
  flex-direction: column;
}

.btn-login {
  color: #fff;
  background: #03438D;
  box-shadow: -2px 2px 0px #000400;
  border: 2px solid #000400;
  border-radius: 8px;
  padding: 16px 0;
  margin: 16px 0;
  cursor: pointer;
  font-size: bold Azeret Mono;
}
.btn-error {
  background: #A8B0B9;
  border: 2px solid #808080;
  box-shadow: none;
}

.btn-signup {
  background: none;
  border: none;
  cursor: pointer;
  font-size: Azeret Mono;
}
</style>
