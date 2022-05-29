<template>
  <div>
    <!-- 動態牆卡 -->
    <div class="lodingBlock mt-3">
      <div class="spinner-border mx-auto"
        style="font-size: 0.5rem;" role="status" v-if="loading">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <template v-if="!isPost">
      <div class="card mt-3" v-for="post in postData" :key="post._id">
        <div class="card-user">
          <div class="card-user-icon">
            <router-link :to="`/user/${post.user._id}`" href="#">
              <img :src="post.user.image" alt="">
            </router-link>
          </div>
          <div class="card-user-text ms-3">
            <p class="card-user-name">{{ post.user.name }}</p>
            <p class="card-user-date">{{ formatDate(post.createdAt) }}</p>
          </div>
        </div>
        <div class="card-content mt-4">
          <div class="card-content-text">{{ post.content }}</div>
          <div class="mt-3">
            <img v-if="post.image" class="card-content-img" :src="post.image" alt="">
          </div>
        </div>
        <!-- 讚數 -->
        <div class="card-good-block mt-3">
          <div class="card-good-icon">
            <i class="bi bi-hand-thumbs-up like"
              @click="setLike(post)"></i>
          </div>
          <p v-for="lilke in post.likes" :key="lilke.id"
            class="card-good-text ms-2">{{ lilke.name }}</p>
        </div>
        <!-- 使用者留言欄位 -->
        <div class="card-user-input-black mt-3" v-if="false">
          <div class="card-user-input-img">
            <img src="https://upload.cc/i1/2022/04/20/d2R8pW.png" alt="">
          </div>
          <div class="card-user-input">
            <input type="text" placeholder="留言...">
            <button class="card-user-input-button">留言</button>
          </div>
        </div>
        <!-- 留言資訊 -->
        <div class="card-message mt-3" v-if="false">
          <div class="card-message-block">
            <div class="card-user-input-img">
              <img src="https://upload.cc/i1/2022/04/20/d2R8pW.png" alt="">
            </div>
            <div class="card-user-text ms-2">
              <p class="card-user-name">小結</p>
              <p class="card-user-date">2022/01/10 12:00</p>
              <p class="card-user-name mt-1">真的～我已經準備冬眠了</p>
            </div>
          </div>
        </div>
        <!-- 留言資訊 -->
        <div class="card-message mt-3" v-if="false">
          <div class="card-message-block">
            <div class="card-user-input-img">
              <img src="https://upload.cc/i1/2022/04/20/d2R8pW.png" alt="">
            </div>
            <div class="card-user-text ms-2">
              <p class="card-user-name">小結</p>
              <p class="card-user-date">2022/01/10 12:00</p>
              <p class="card-user-name mt-1">真的～我已經準備冬眠了</p>
            </div>
          </div>
        </div>
      </div>
    </template>
    <!-- 留言資訊 -->
    <div class="card mt-3" v-if="false">
      <div class="card-user">
        <div class="card-user-icon">
          <img src="https://upload.cc/i1/2022/04/20/d2R8pW.png" alt="">
        </div>
        <div class="card-user-text ms-3">
          <p class="card-user-name">小結</p>
          <p class="card-user-date">2022/01/10 12:00</p>
        </div>
      </div>
      <div class="card-content mt-4">
        <div class="card-content-text">外面看起來就超冷.... 我決定回被窩繼續睡....</div>
        <div class="mt-3">
          <img class="card-content-img" src="https://upload.cc/i1/2022/04/20/RcuBde.png" alt="">
        </div>
      </div>
      <!-- 讚數 -->
      <div class="card-good-block mt-3">
        <div class="card-good-icon">
          <i class="bi bi-hand-thumbs-up" style="font-size: 1rem;"></i>
        </div>
        <p class="card-good-text ms-2">12</p>
      </div>
      <!-- 使用者留言欄位 -->
      <div class="card-user-input-black mt-3">
        <div class="card-user-input-img">
          <img src="https://upload.cc/i1/2022/04/20/d2R8pW.png" alt="">
        </div>
        <div class="card-user-input">
          <input type="text" placeholder="留言...">
          <button class="card-user-input-button">留言</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    postData: {
      type: Object,
      default () { return {} }
    },
    loading: {
      type: Boolean
    }
  },
  emits: ['get-all-data'],
  data () {
    return {
      isLoad: false,
      name: 'TenndView',
      propsPostData: [],
      isPost: false,
      fromData: {
        user: this.$store.state.userInfo._id,
        content: null,
        image: null
      }
      // postData: [],
    }
  },
  methods: {
    getAllData (sort, search) {
      this.$emit('get-all-data', sort, search)
    },
    postPost () {
      this.isLoad = true
      const data = this.fromData
      console.log(this.fromData, 'fromData')
      this.axios.post('http://127.0.0.1:3005/', data)
        .then((response) => {
          console.log(response, 'post')
          this.getAllData()
          this.isLoad = false
          alert('傳送成功')
        })
        .catch((error) => {
          console.log(error, 'post')
          this.isLoad = false
          alert('傳送失敗')
        })
    },
    setLike (post) {
      console.log(post)
      const isLike = post.likes.find((item) => item.name === this.$store.state.userInfo.name)
      if (isLike) {
        this.clearLike(post)
        console.log('asd')
        return
      }

      console.log(post)
      console.log(`http://127.0.0.1:3005/post/${post._id}/likes`)
      this.axios.post(`http://127.0.0.1:3005/post/${post._id}/likes`)
        .then((response) => {
          console.log(response, 'post')
          this.getAllData()
          this.isLoad = false
          alert('按讚成功')
        })
        .catch((error) => {
          console.log(error, 'post')
          this.isLoad = false
          alert('按讚失敗')
        })
    },
    clearLike (post) {
      console.log(post._id)
      this.axios.delete(`http://127.0.0.1:3005/post/${post._id}/deleteLikes`)
        .then((response) => {
          console.log(response, 'post')
          this.getAllData(this.filter, this.searchPost)
          this.isLoad = false
          alert('收回成功')
        })
        .catch((error) => {
          console.log(error, 'post')
          this.isLoad = false
          alert('收回失敗')
        })
    },
    formatDate (str) {
      // const dateStr = new Date(str)
      const date = new Date(str)
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      // console.log(formattedDate, 'formattedDate')
      return formattedDate
    }
  },
  mounted () {
    // console.log('this.propsPostData')
  },
  watch: {
    postData () {
      // console.log(this.postData, 'watch Te')
      this.propsPostData = this.postData
      console.log(this.postData, 'this.propsPostData')
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}

.button {
  height: 54px;
  width: 261px;
  background: #03438D 0% 0% no-repeat padding-box;
  box-shadow: -2px 2px 0px #000400;
  border: 2px solid #000400;
  border-radius: 8px;
  font: normal normal bold 16px/19px Azeret Mono;
  letter-spacing: 0px;
  color: #FFFFFF;
}
.button:hover {
  color: black;
  background: #EEC32A 0% 0% no-repeat padding-box;
}
.trend-container {
  max-width: 860px;
  margin: auto;
  margin-top: 49px;
  display: flex;
  justify-content: center;
}
.card {
  // height: 330px;
  border-radius: 8px;
  border: 2px solid black;
  box-shadow: 0px 3px 0px #000400;
  padding: 24px;
}
.card-user {
  height: 45px;
  display: flex;
  // margin-bottom: 16px;
}
.card-user-icon {
  img {
    border-radius: 50%;
    overflow: hidden;
    height: 45px;
    width: 45px;
  }
  font: normal normal bold 16px/24px Noto Sans TC;
  display: flex;
  align-items: center;
}
.card-user-icon-border {
  width: 45px;
  height: 45px;
  border-radius: 99em;
  border: 2px solid black;
  background: #E2EDFA 0% 0% no-repeat padding-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-user-name {
  font: normal normal bold 16px/24px Noto Sans TC;
}
.card-user-date {
  font-size: 13px;
  color: #9B9893;
}
.card-content-text {
  p {
    font: normal normal normal 16px/24px Noto Sans TC;
  }
}
.card-content-img {
  max-width: 100%;
  height: auto;
  // border-radius: 0.5rem;
  border: 2px solid #000400;
  border-radius: 8px;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}
.card-good-block {
  display: flex;
}
.like {
  font-size: 1.2rem;
}
.like:hover {
  opacity: .5;
  cursor: pointer;
}
.card-good-text{
  text-align: left;
  font: normal normal normal 16px/27px Baloo Da 2;
  letter-spacing: 0px;
  color: #000400;
  opacity: 1;
}
.card-user-input-black {
  display: flex;
  justify-content: space-between;
}
.card-user-input-img {
  img {
    height: 40px;
    width: 40px;
  }
}
.card-user-input {
  border: 2px solid black;
  input {
    padding-left: 10px;
    width: 300px;
    border: 0;
    border-right: 2px solid black;
  }
  .card-user-input-button {
    width: 128px;
    background: #03438D 0% 0% no-repeat padding-box;
    border: 0;
    text-align: center;
    font: normal normal normal 16px/19px Azeret Mono;
    letter-spacing: 0px;
    color: #FFFFFF;
  }
  .card-user-input-button:hover {
    color: black;
    background: #EEC32A 0% 0% no-repeat padding-box;
  }
  display: flex;
}
// 留言資訊
.card-message {
  border-radius: 12px;
}
.card-message-block {
  display: flex;
  padding: 16px;
  background: #faf9f7;
}
// 無貼文
.card-stand {
  height: 25px;
  border-bottom: 2px solid black;
}
.card-stand-block {
  // border: 0;
  // text-align: center;
  // margin: auto;
  font: normal normal normal 16px/24px Noto Sans TC;
}
.card-stand-p {
  color: #9B9893;
}

.lodingBlock {
  display: flex;
}
</style>
