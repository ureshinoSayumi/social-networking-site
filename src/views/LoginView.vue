<template>
  <div class="containers">
    <main class="row mt-3">
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
              <div class="mb-3" v-if="isRegister">
                <input v-model="user.name" type="text" placeholder="Name">
                <div v-if="state.name" class="wrong-msg mt-1">
                  <span>暱稱至少 2 個字元以上</span>
                </div>
              </div>
              <div class="mb-3">
                <input v-model="user.email" type="text" placeholder="Email">
                <div v-if="state.email" class="wrong-msg mt-1">
                  <span>帳號已被註冊，請替換新的 Email！</span>
                </div>
              </div>
              <div class="mb-3">
                <input @keyup.enter="login" v-model="user.password" type="password" name="" id=" " placeholder="Password">
                <div v-if="state.password" class="wrong-msg mt-1">
                  <span>密碼需至少 8 碼以上，並中英混合</span>
                </div>
              </div>
              <div class="mb-3" v-if="isRegister">
                <input v-model="user.confirmPassword" type="password" placeholder="再次輸入密碼">
                <div v-if="state.confirmPassword" class="wrong-msg mt-1">
                  <span>與密碼不同</span>
                </div>
              </div>
            </div>
            <div v-if="state.loginError" class="wrong-msg">
              <span>帳號或密碼錯誤，請重新輸入！</span>
            </div>
            <div class="btn-block">
              <div class="save-passWord-block">
                <input placeholder="是否記憶帳密" class="me-2 mt-1" id="male" type="checkbox" value="true" v-model="savePassWord">
                <label class="card-post-label me-3" for="male">是否記憶帳密</label>
              </div>
              <template v-if="isRegister">
                <button @click="singUp" type="button" class="btn-login" :class="isSignup ? 'btn-error' : '' ">
                  <div class="spinner-border spinner-border-sm" role="status" v-if="loading">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  註冊
                </button>
                <button @click="checkButton" type="button" class="btn-signup" >登入</button>
              </template>
              <template v-else>
                <button @click="login" type="button" class="btn-login" :class="isRegister ? 'btn-error' : '' ">
                  <div class="spinner-border spinner-border-sm" role="status" v-if="loading">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  登入
                </button>
                <button @click="checkButton" type="button" class="btn-signup" :class="isRegister ? 'btn-login' : 'btn-signup'">
                  註冊帳號
                </button>
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
      state: {
        name: false,
        email: false,
        passWord: false,
        loginError: false,
        signUpError: false,
        confirmPassword: false
      },
      loading: false,
      isRegister: false,
      isSignup: false,
      user: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      savePassWord: true
    }
  },
  methods: {
    formatVerify () {
      const error = []
      /* eslint-disable no-useless-escape */
      /* eslint-disable no-unneeded-ternary */
      const regExpEmail = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
      if (!regExpEmail.test(this.user.email)) {
        this.state.email = true
        error.push('email')
      }
      if (this.user.password.length < 8) {
        this.state.password = true
        error.push('signUpError')
      }
      if (!this.user.name) {
        this.state.name = true
        error.push('name')
      }
      if (this.user.confirmPassword !== this.user.password) {
        this.state.confirmPassword = true
        error.push('confirmPassword')
      }
      return error.length === 0
    },
    login () {
      // if (!this.formatVerify()) {
      //   console.log('認證不過')
      //   return
      // }
      this.loading = true
      console.log(this.user)
      this.axios.post('http://127.0.0.1:3005/sing_in', this.user)
        .then((response) => {
          localStorage.setItem('test-token', response.data.user.token)
          console.log(response, 'user')
          this.$router.push('/posts')
          this.loading = false
          if (this.savePassWord) {
            localStorage.setItem('tempPassWord', JSON.stringify(this.user))
          } else {
            localStorage.setItem('tempPassWord', '')
          }
        })
        .catch((error) => {
          this.loading = false
          console.log(error.message, 'getAllPost')
        })
    },
    singUp () {
      if (!this.formatVerify()) {
        console.log('認證不過')
        return
      }
      this.loading = true
      this.axios.post('http://127.0.0.1:3005/sing_up', this.user)
        .then((response) => {
          localStorage.setItem('test-token', response.data.user.token)
          console.log(response, 'user')
          this.$router.push('/posts')
          this.loading = false
          // this.$router.push('/trend')
        })
        .catch((error) => {
          this.loading = false
          console.log(error, 'getAllPost')
        })
    },
    checkButton () {
      this.isRegister = !this.isRegister
      for (const i in this.state) {
        this.state[i] = false
      }
    }
  },
  async mounted () {
    console.log(localStorage.getItem('tempPassWord'))
    if (localStorage.getItem('tempPassWord')) {
      this.user = JSON.parse(localStorage.getItem('tempPassWord'))
    }
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
    width: 100%;
    padding: 16px 24px 16px;
    // margin-bottom: 16px;
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
  text-align: center;
}

/* 登入與註冊按鈕 */
.btn-block {
  display: flex;
  flex-direction: column;
}
.save-passWord-block {
  display: flex;
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
  border-radius: 8px;
  padding: 16px 0;
  background: none;
  border: none;
  cursor: pointer;
  font-size: Azeret Mono;
}
</style>
