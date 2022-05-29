<template>
  <div class="col-trend me-4">
    <!-- 張貼文章 -->
    <div class="post-article">
      <h2 class="mt-3">修改個人資料</h2>
    </div>

    <div class="row-button px-3 mt-4">
      <button
        @click="changeTabs('name')"
        :class="tabsState === 'name' ? 'active' : '' "
        class="px-4 pt-2 pb-2"
      >
        暱稱修改
      </button>
      <button
        @click="changeTabs('password')"
        :class="tabsState === 'password' ? 'active' : ''"
        class="px-4 pt-2 pb-2"
      >
        重設密碼
      </button>
    </div>
    <div class="card">
      <div class="card-user">
        <template v-if="tabsState === 'name'">
          <div class="card-user-icon-block mt-3 mx-auto">
            <div class="card-user-icon-img mx-auto">
              <img :src="userUrl ? userUrl : fromData.image"/>
            </div>
            <label class="card-user-icon-label mt-3">
              上傳大頭貼
                <input ref="fileInput" type="file" @input="fileReader">
            </label>
          </div>
          <div class="mt-2">
            <label class="card-post-label" for="name">暱稱</label>
            <input class="card-post-input p-3 mt-1" id="name" v-model="fromData.name" type="text" placeholder="輸入暱稱">
            <div v-if="state.name" class="wrong-msg mt-1">
              <span>{{ state.name }}</span>
            </div>
          </div>
          <div class="mt-3">
            <label class="card-user-label mb-1">性別</label>
            <input class="me-2" id="male" type="radio" name="sex" value="male" v-model="fromData.sex">
            <label class="card-post-label me-3" for="male">男性</label>
            <input class="me-2" id="female" type="radio" name="sex" value="female" v-model="fromData.sex">
            <label class="card-post-label me-2" for="female">女性</label>
          </div>
          <button :disabled="isLoad" class="card-post-button mt-4 mx-auto" @click="patchUserData()">
            更改暱稱
            <div class="spinner-border spinner-border-sm" role="status" v-if="isLoad">
              <span class="visually-hidden">Loading...</span>
            </div>
          </button>
        </template>
        <template v-else>
          <div class="mt-2">
            <label class="card-post-label" for="name">輸入新密碼</label>
            <input class="card-post-input p-3 mt-1" id="name" v-model="fromData.password" type="password" placeholder="輸入密碼">
            <div v-if="state.password" class="wrong-msg mt-1">
              <span>{{ state.password }}</span>
            </div>
          </div>
          <div class="mt-2">
            <label class="card-post-label" for="name">再次輸入新密碼</label>
            <input class="card-post-input p-3 mt-1" id="name" v-model="fromData.confirmPassword" type="password" placeholder="輸入密碼">
            <div v-if="state.confirmPassword" class="wrong-msg mt-1">
              <span>{{ state.confirmPassword }}</span>
            </div>
          </div>
          <button :disabled="isLoad" class="card-post-button mt-4 mx-auto" @click="changePassword()">
            更改密碼
            <div class="spinner-border spinner-border-sm" role="status" v-if="isLoad">
              <span class="visually-hidden">Loading...</span>
            </div>
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
      isPost: false,
      tabsState: 'name', // name or passwoed
      userUrl: null,
      fromData: {
        name: this.$store.state.userInfo.name,
        sex: this.$store.state.userInfo.sex,
        image: this.$store.state.userInfo.image,
        password: null,
        confirmPassword: null
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
      if (this.fromData.password !== this.fromData.confirmPassword) {
        this.state.password = '請輸入相同密碼'
        this.state.confirmPassword = '請輸入相同密碼'
        return
      }
      if (!this.fromData.password || !this.fromData.confirmPassword) {
        this.state.password = '不得為空'
        this.state.confirmPassword = '不得為空'
        return
      }
      const data = this.fromData
      console.log(this.fromData, 'fromData')
      this.axios.post('http://127.0.0.1:3005/users/updatePassword', data)
        .then((response) => {
          console.log(response, 'changePassword')
          this.getUserData()
          this.isLoad = false
          alert('傳送成功')
        })
        .catch((error) => {
          console.log(error, 'changePassword')
          this.isLoad = false
          alert('傳送失敗')
        })
    },
    patchUserData () {
      if (!this.fromData.name) {
        this.state.name = '不得為空'
        return
      }
      const data = this.fromData
      console.log(this.fromData, 'fromData')
      this.axios.patch('http://127.0.0.1:3005/users/updateProfile', data)
        .then((response) => {
          console.log(response, 'patchUserData')
          this.getUserData()
          this.isLoad = false
          alert('傳送成功')
        })
        .catch((error) => {
          console.log(error, 'patchUserData')
          this.isLoad = false
          alert('傳送失敗')
        })
    },
    getUserData () {
      this.axios.get('http://127.0.0.1:3005/users/profile')
        .then((response) => {
          console.log(response, 'router')
          this.$store.commit('setUserInfo', response.data.data.user)
        })
        .catch((error) => {
          alert('token過期，請先登入')
          console.log(error, 'error')
        })
    },
    changeTabs (str) {
      this.tabsState = str
    },
    change () {
      this.isPost = !this.isPost
      console.log(this.isPost, 'asdasd')
    },
    fileReader () {
      // 解析上傳的檔案，讓 <img> 能即時顯示上傳的圖片
      console.log(this.$refs.fileInput)
      if (this.$refs.fileInput.files[0].type !== 'image/jpeg' && this.$refs.fileInput.files[0].type !== 'image/png') {
        alert('僅支援 jpg、png 檔，請重新上傳！')
        // return
      }
      const formData = new FormData()
      formData.append('file-to-upload', this.$refs.fileInput.files[0])
      this.axios.post('http://127.0.0.1:3005/upload', formData)
        .then((response) => {
          console.log(response, 'filterasd')
          this.userUrl = response.data.imgUrl
          this.fromData.image = response.data.imgUrl
        })
        .catch((error) => {
          console.log(error, 'filter')
        })
    }
  },
  mounted () {
    console.log(this.$store.state.userInfo, 'mounted')
  }
}
</script>

<style lang="scss" scoped>
.col-trend {
  width: 533px;
}
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
  // background: black;
  // color: white;
  border-radius: 8px;
  border: 2px solid black;
  border-bottom: 0;
}
.nav-link:hover {
  border: 2px solid black;
  border-bottom: 0;
}
.card {
  // height: 330px;
  border-radius: 8px;
  border: 2px solid black;
  box-shadow: 0px 3px 0px #000400;
  padding: 24px;
}

// .card-user {
//   height: 45px;
//   display: flex;
// }
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
    width: 1px;
    height: 1px;
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
