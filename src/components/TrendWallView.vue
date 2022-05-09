<template>
  <div class="trend-container">
    <div class="col-trend me-3">
      <!-- menu -->
      <div class="row-menu" v-if="!isPost">
        <div class="col-select">
          <select class="select" v-model="filter" @change="getAllData(filter, searchPost)">
            <option value="-createdAt">最新貼文</option>
            <option value="createdAt">最舊貼文</option>
          </select>
        </div>
        <div class="col-serch-input">
          <input class="serch-input" v-model="searchPost" type="text" placeholder="搜尋貼文">
          <button class="serch-button" @click="getAllData(filter, searchPost)">
            <i class="bi bi-search" style="font-size: 1.7rem;"></i>
          </button>
        </div>
      </div>
      <!-- 張貼文章 -->
      <div class="post-article" v-if="isPost">
        <h2 class="mt-3">張貼動態</h2>
      </div>
      <!-- 動態牆卡 -->
      <div class="lodingBlock mt-3">
        <div class="spinner-border mx-auto"
          style="font-size: 0.5rem;" role="status" v-if="loading">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <template v-if="!isPost">
        <div class="card mt-3" v-for="post in propsPostData" :key="post.id">
          <div class="card-user">
            <div class="card-user-icon">
              <img src="https://upload.cc/i1/2022/04/20/d2R8pW.png" alt="">
            </div>
            <div class="card-user-text ms-3">
              <p class="card-user-name">{{ post.user.name }}</p>
              <p class="card-user-date">{{ post.createdAt }}</p>
            </div>
          </div>
          <div class="card-content mt-4">
            <div class="card-content-text">{{ post.content }}</div>
            <div class="mt-3">
              <img class="card-content-img" :src="post.image" alt="">
            </div>
          </div>
          <!-- 讚數 -->
          <div class="card-good-block mt-3">
            <div class="card-good-icon">
              <i class="bi bi-hand-thumbs-up" style="font-size: 1rem;"></i>
            </div>
            <p class="card-good-text ms-2">{{ post.likes }}</p>
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
      <!-- 如果沒有貼文 -->
      <div class="card mt-3" v-if="propsPostData.length == 0 && !isPost && !loading">
        <div class="card-stand">
          <!-- <i class="bi bi-circle-fill" style="font-size: 0.4rem;"></i>
          <i class="bi bi-circle-fill ms-1" style="font-size: 0.4rem;"></i>
          <i class="bi bi-circle-fill ms-1" style="font-size: 0.4rem;"></i> -->
        </div>
        <div class="card-stand-block mx-auto">
          <p class="card-stand-p mt-4 mb-2">目前尚無動態，新增一則貼文吧！</p>
        </div>
      </div>
      <!-- 新增貼文 -->
      <div class="card mt-3" v-if="isPost">
        <label class="card-post-label" for="story">貼文內容:</label>
        <textarea class="card-post-text p-3 mt-1" v-model="fromData.content" id="story" name="story" rows="5" cols="50">目前尚無動態，新增一則貼文吧！</textarea>
        <input class="card-post-input p-3 mt-3" v-model="fromData.image" type="text" placeholder="上傳圖片">
        <button class="card-post-button mt-4 mx-auto" @click="postPost()" v-if="!isLoad">送出貼文</button>
        <div class="spinner-border mx-auto mt-3" style="font-size: 0.5rem;" role="status" v-if="isLoad">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
    <ul class="col-items">
      <li>
        <button class="button mb-4" @click="isPost = !isPost">張貼動態</button>
      </li>
      <li class="col-item-item mb-4">
        <div class="card-user-icon">
          <img src="https://upload.cc/i1/2022/04/20/d2R8pW.png" alt="">
          <span class="ms-3">邊緣小傑</span>
        </div>
      </li>
      <li class="col-item-item mb-4">
        <div class="card-user-icon">
          <div class="card-user-icon-border">
            <i class="bi bi-bell" style="font-size: 1.5rem;"></i>
          </div>
          <span class="ms-3">追蹤名單</span>
        </div>
      </li>
      <li class="col-item-item mb-4">
        <div class="card-user-icon">
          <div class="card-user-icon-border">
            <i class="bi bi-hand-thumbs-up" style="font-size: 1.5rem;"></i>
          </div>
          <span class="ms-3">我按讚的文章</span>
        </div>
      </li>
    </ul>
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
      filter: '-createdAt',
      searchPost: '',
      testt: '',
      name: 'TenndView',
      propsPostData: [],
      isPost: false,
      fromData: {
        user: '6277990dd44862af1949fb5b',
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
      this.axios.post('https://stark-beach-75369.herokuapp.com/posts', data)
        .then((response) => {
          console.log(response, 'post')
          this.fromData = {
            user: '6277990dd44862af1949fb5b',
            content: null,
            image: null
          }
          this.getAllData(this.filter, this.searchPost)
          this.isLoad = false
          alert('傳送成功')
        })
        .catch((error) => {
          console.log(error, 'post')
          this.isLoad = false
          alert('傳送失敗')
        })
    }
  },
  mounted () {
    console.log('mounted')
  },
  watch: {
    postData () {
      this.propsPostData = this.postData
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
.col-trend {
  width: 533px;
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
.post-article {
  height: 64px;
  border: 2px solid black;
  // display: flex;
  // justify-content: center
  // align-items: center;
  h2 {
    text-align: center;
    font: normal normal bold 20px/24px Azeret Mono;
    letter-spacing: 0px;
    color: #000400;
  }
}
.row-menu {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .col-select {
    width: 156px;
  }
  .col-serch-input {
    border: 2px solid black;
    width: 365px;
    display: flex;
  }
  .serch-input {
    width: 100%;
    padding: 0px 16px;
    border: 0;
    border-right: 2px solid black;
  }
  .serch-button {
    // width: 46px;
    // min-width: 42px;
    border: 0;
    color: #FFFFFF;
    background: #03438D;
  }
  .serch-button-icon {
    background: #FFFFFF;
  }
}
.select {
  width: 100%;
  padding: 11px 16px;
  border: 2px solid black;
  font: normal normal normal 16px/19px Azeret Mono;
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
  border-radius: 0.5rem;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}
.card-good-block {
  display: flex;
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
  // width: 485px;
  // height: 104px;
  /* UI Properties */
  border-radius: 12px;
}
.card-message-block {
  display: flex;
  padding: 16px;
  background: #faf9f7;
}

.buttonTest {
  width: 100px;
  padding: 10px;
}
.selectTest {
  width: 100px;
  padding: 10px;
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
.card-stand-input {
  border: 0;
}
.card-stand-p {
  color: #9B9893;
}
.card-post-text {
  // text-align: center;
  display: block;
  width: 100%;
  border: 2px solid black;
  color: #9B9893;
}
.card-post-text:focus {
  color: black;
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
.card-post-button {
  display:block;
  background: #A8B0B9 0% 0% no-repeat padding-box;
  border: 2px solid #000400;
  border-radius: 8px;
  padding: 16px 130px;
}
.card-post-button:hover {
  color: black;
  background: #EEC32A 0% 0% no-repeat padding-box;
}
// item
.col-items {
  // width: 257px;
  height: 336px;
  border: 2px solid black;
  padding: 32px 24px;
}
.lodingBlock {
  display: flex;
}
</style>
