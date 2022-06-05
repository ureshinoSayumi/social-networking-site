<template>
  <div>
    <!-- 張貼文章 -->
    <div class="post-article">
      <h2 class="mt-3">修改個人資料</h2>
    </div>

    <div class="row-button px-3 mt-4">
      <button :class="tabsState === 'name' ? 'active' : '' " class="px-4 pt-2 pb-2"
         @click="changeTabs('name')" >
        暱稱修改
      </button>
      <button :class="tabsState === 'password' ? 'active' : ''" class="px-4 pt-2 pb-2"
        @click="changeTabs('password')">
        重設密碼
      </button>
    </div>
    <div class="card">
      <div class="card-user">
        <template v-if="tabsState === 'name'">
          <div class="card-user-icon-block mt-3 mx-auto">
            <div class="card-user-icon-img mx-auto">
              <img v-if="fromData.image" :src="userUrl ? userUrl : fromData.image" alt="">
              <img v-else src="https://upload.cc/i1/2022/05/31/dVpHNT.png" alt="">
            </div>
            <label class="card-user-icon-label mt-3">
              上傳大頭貼
              <div v-if="isLoad" class="spinner-border spinner-border-sm" role="status"></div>
              <input v-if="!isLoad" ref="fileInput" type="file" @input="fileReader">
            </label>
          </div>
          <div class="mt-2">
            <label class="card-post-label" for="name">暱稱</label>
            <input class="card-post-input p-3 mt-1" id="name" v-model="fromData.name" type="text" placeholder="輸入暱稱"
              @input="formatVerify()">
            <div v-if="state.name" class="wrong-msg mt-1">
              <span>{{ errorMessage.name }}</span>
            </div>
          </div>
          <div class="mt-3">
            <label class="card-user-label mb-1">性別</label>
            <input class="me-2" id="male" type="radio" name="sex" value="male" v-model="fromData.sex">
            <label class="card-post-label me-3" for="male">男性</label>
            <input class="me-2" id="female" type="radio" name="sex" value="female" v-model="fromData.sex">
            <label class="card-post-label me-3" for="female">女性</label>
            <input class="me-2" id="other" type="radio" name="sex" value="other" v-model="fromData.sex">
            <label class="card-post-label me-3" for="other">其他</label>
          </div>
          <div class="mt-3">
            <label class="card-user-label mb-1">權限</label>
            <input class="me-2" id="GM" type="radio" name="auth" value="1" v-model="fromData.auth">
            <label class="card-post-label me-3" for="GM">最高權限</label>
          </div>
          <button :disabled="isLoad" class="card-post-button mt-4 mx-auto" @click="patchUserData()">
            更改暱稱
          </button>
        </template>
        <template v-else>
          <div class="mt-2">
            <label class="card-post-label" for="name">輸入新密碼</label>
            <input class="card-post-input p-3 mt-1" id="password" v-model="fromData.password" type="password" placeholder="輸入密碼"
              @input="formatVerify(true)">
            <div v-if="state.password" class="wrong-msg mt-1">
              <span>{{ errorMessage.password }}</span>
            </div>
          </div>
          <div class="mt-2">
            <label class="card-post-label" for="name">再次輸入新密碼</label>
            <input class="card-post-input p-3 mt-1" id="confirmPassword" v-model="fromData.confirmPassword" type="password" placeholder="再次輸入新密碼"
              @input="formatVerify(true)" @keyup.enter="changePassword()">
            <div v-if="state.confirmPassword" class="wrong-msg mt-1">
              <span>{{ errorMessage.confirmPassword }}</span>
            </div>
          </div>
          <button :disabled="isLoad" class="card-post-button mt-4 mx-auto" @click="changePassword()">
            更改密碼
            <div v-if="isLoad" class="spinner-border spinner-border-sm" role="status"></div>
          </button>
        </template>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      isLoad: false,
      tabsState: 'name', // name or passwoed
      userUrl: null,
      fromData: {
        name: this.$store.state.userInfo.name,
        sex: this.$store.state.userInfo.sex,
        image: this.$store.state.userInfo.image,
        password: '',
        confirmPassword: '',
        auth: ''
      },
      errorMessage: {
        name: null,
        passWord: null,
        confirmPassword: null,
        changeError: null
      },
      state: {
        name: null,
        sex: null,
        image: null,
        password: null,
        confirmPassword: null
      }
    }
  },
  methods: {
    changePassword () {
      if (!this.formatVerify()) return
      this.isLoad = true
      const data = this.fromData
      console.log(this.fromData, 'fromData')
      this.axios.post(`${process.env.VUE_APP_API}users/updatePassword`, data)
        .then(() => {
          this.getUserData()
          this.fromData = {
            name: this.$store.state.userInfo.name,
            sex: this.$store.state.userInfo.sex,
            image: this.$store.state.userInfo.image,
            password: '',
            confirmPassword: '',
            auth: ''
          }
          this.isLoad = false
          alert('修改成功')
        })
        .catch((errr) => {
          this.isLoad = false
          alert('修改失敗')
        })
    },
    patchUserData () {
      if (!this.formatVerify()) return
      this.isLoad = true
      const data = this.fromData
      this.axios.patch(`${process.env.VUE_APP_API}users/updateProfile`, data)
        .then(() => {
          this.getUserData()
          this.fromData.password = ''
          this.fromData.confirmPassword = ''
          this.isLoad = false
          alert('修改成功')
        })
        .catch(() => {
          this.isLoad = false
          alert('修改失敗')
        })
    },
    getUserData () {
      this.axios.get(`${process.env.VUE_APP_API}users/profile`)
        .then((response) => {
          this.$store.commit('setUserInfo', response.data.data.user)
        })
        .catch(() => {
          alert('token過期，請先登入')
        })
    },
    changeTabs (str) {
      this.tabsState = str
    },
    fileReader () {
      this.isLoad = true
      if (this.$refs.fileInput.files[0].type !== 'image/jpeg' && this.$refs.fileInput.files[0].type !== 'image/png') {
        alert('僅支援 jpg、png 檔，請重新上傳！')
        // return
      }
      const formData = new FormData()
      formData.append('file-to-upload', this.$refs.fileInput.files[0])
      this.axios.post(`${process.env.VUE_APP_API}upload`, formData)
        .then((response) => {
          console.log(response, 'filterasd')
          this.userUrl = response.data.imgUrl
          this.fromData.image = response.data.imgUrl
          this.isLoad = false
        })
        .catch(() => {
          alert('上傳失敗')
        })
    },
    formatVerify (singUp) {
      /* eslint-disable no-useless-escape */
      /* eslint-disable no-unneeded-ternary */
      const regExpPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
      const error = []

      for (const i in this.state) {
        this.state[i] = false
      }
      if (this.fromData.name.length < 2) {
        this.state.name = true
        this.errorMessage.name = '暱稱至少 2 個字元以上'
        error.push('name')
      }
      if (!regExpPassword.test(this.fromData.password) && singUp) {
        this.errorMessage.password = '密碼需至少 8 碼以上，並中英混合'
        this.state.password = true
        error.push('signUpError')
      }
      if ((this.fromData.confirmPassword !== this.fromData.password || !this.fromData.confirmPassword) && singUp) {
        this.errorMessage.confirmPassword = '與密碼不同'
        this.state.confirmPassword = true
        error.push('confirmPassword')
      }
      return error.length === 0
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
// 張貼文章
.post-article {
  height: 64px;
  border: 2px solid black;
  h2 {
    text-align: center;
    font: normal normal bold 20px/24px Azeret Mono;
    letter-spacing: 0px;
    color: #000400;
  }
}
p {
  margin: 0;
}
.nav-link.active {
  background: black;
  color: white;
  border-radius: 8px;
  border: 2px solid black;
}
.nav-link {
  border-radius: 8px;
  border: 2px solid black;
  border-bottom: 0;
}
.nav-link:hover {
  border: 2px solid black;
  border-bottom: 0;
}
.card {
  border-radius: 8px;
  border: 2px solid black;
  box-shadow: 0px 3px 0px #000400;
  padding: 24px;
}
.card-user-icon-block {
  width: 128px;
}
.card-user-icon-img {
  img {
    height: 100%;
    width: 100%;
  }
  height: 107px;
  width: 107px;
  border-radius:50%;
  // border: 1px solid black;
  overflow: hidden;
}
.card-user-icon-label {
  display: block;
  width: 100%;
  padding: 3px 6px;
  text-align: center;
  font: normal normal normal 16px/24px Noto Sans TC;
  letter-spacing: 0px;
  color: #FFFFFF;
  background: #000400 0% 0% no-repeat padding-box;
  border: 0;
  input {
    width: 0px;
    height: 0px;
  }
}
.card-post-text {
  // text-align: center;
  display: block;
  width: 100%;
  border: 2px solid black;
  color: #9B9893;
}
.card-post-label {
  font: normal normal normal 16px/24px Noto Sans TC;
  color: #000400;
}
.card-post-input {
  display: block;
  width: 100%;
  border: 2px solid black;
}
.card-user-label {
  display: block;
  font: normal normal normal 16px/24px Noto Sans TC;
  color: #000400;
}
.card-post-button {
  display:block;
  background: #03438D  0% 0% no-repeat padding-box;
  border: 2px solid #000400;
  color: #FFFFFF;
  border-radius: 8px;
  padding: 16px 130px;
}
.card-post-button:hover {
  color: black;
  background: #EEC32A 0% 0% no-repeat padding-box;
}

.card-user {
  margin: 0px 70px;
}
.row-button {
  button {
    background: #FFFFFF;
    border: 2px solid black;
    border-bottom: 0;
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
  }
  .active {
    background: #000400;
    color: #FFFFFF;
  }
}
/* 錯誤訊息 */
.wrong-msg {
  font: 14px 'Noto Sans TC';
  color: #F57375;
  text-align: center;
}
</style>
