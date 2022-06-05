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
                <input @input="formatVerify(true)" v-model="user.name" type="text" placeholder="Name">
                <div v-if="state.name" class="wrong-msg mt-1">
                  <span>{{ errorMessage.name }}</span>
                </div>
              </div>
              <div class="mb-3">
                <input @input="formatVerify()" @keyup.enter="login" v-model="user.email" type="text" placeholder="Email">
                <div v-if="state.email" class="wrong-msg mt-1">
                  <span>{{ errorMessage.email }}</span>
                </div>
              </div>
              <div class="mb-3">
                <input @input="formatVerify()" @keyup.enter="login" v-model="user.password" type="password" name="" id=" " placeholder="Password">
                <div v-if="state.password" class="wrong-msg mt-1">
                  <span>{{ errorMessage.password }}</span>
                </div>
              </div>
              <div class="mb-3" v-if="isRegister">
                <input @input="formatVerify(true)" v-model="user.confirmPassword" type="password" placeholder="再次輸入密碼">
                <div v-if="state.confirmPassword" class="wrong-msg mt-1">
                  <span>{{ errorMessage.confirmPassword }}</span>
                </div>
              </div>
            </div>
            <div v-if="errorMessage.loginError" class="wrong-msg">
              <span>{{ errorMessage.loginError }}</span>
            </div>
            <div class="btn-block">
              <div class="save-passWord-block">
                <input placeholder="記住我" class="me-2 mt-1" id="male" type="checkbox" value="true" v-model="savePassWord">
                <label class="card-post-label me-3" for="male">記住我</label>
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
      errorMessage: {
        name: null,
        email: null,
        passWord: null,
        signUpError: null,
        confirmPassword: null,
        loginError: null
      },
      state: {
        name: false,
        email: false,
        passWord: false,
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
    formatVerify (singUp) {
      const error = []
      /* eslint-disable no-useless-escape */
      /* eslint-disable no-unneeded-ternary */
      const regExpEmail = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
      const regExpPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
      for (const i in this.state) {
        this.state[i] = false
      }
      if (this.user.name.length < 2 && singUp) {
        this.state.name = true
        this.errorMessage.name = '暱稱至少 2 個字元以上'
        error.push('name')
      }
      if (!regExpEmail.test(this.user.email)) {
        this.errorMessage.email = 'Email 格式錯誤'
        this.state.email = true
        error.push('email')
      }
      if (!this.user.email) {
        this.errorMessage.email = 'Email 未輸入'
        this.state.email = true
        error.push('email2')
      }
      if (!regExpPassword.test(this.user.password)) {
        this.errorMessage.password = '密碼需至少 8 碼以上，並中英混合'
        this.state.password = true
        error.push('signUpError')
      }
      if ((this.user.confirmPassword !== this.user.password || !this.user.confirmPassword) && singUp) {
        this.errorMessage.confirmPassword = '與密碼不同'
        this.state.confirmPassword = true
        error.push('confirmPassword')
      }
      return error.length === 0
    },
    login () {
      if (!this.formatVerify()) return
      this.loading = true
      console.log(this.user)
      this.axios.post(`${process.env.VUE_APP_API}users/sign_in`, this.user)
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
          this.errorMessage.loginError = error.response.data.message
          console.log(error.response, 'getAllPost')
        })
    },
    singUp () {
      if (!this.formatVerify(true)) return
      this.loading = true
      this.axios.post(`${process.env.VUE_APP_API}user/sign_up`, this.user)
        .then((response) => {
          localStorage.setItem('test-token', response.data.user.token)
          console.log(response, 'user')
          this.$router.push('/posts')
          this.loading = false
        })
        .catch((error) => {
          this.loading = false
          this.errorMessage.loginError = error.response.data.message
          console.log(error.response, 'getAllPost')
        })
    },
    checkButton () {
      this.isRegister = !this.isRegister
      this.user = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
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
