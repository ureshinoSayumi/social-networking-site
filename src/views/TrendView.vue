<template>
  <div>
    <!-- 搜尋 -->
    <div class="row-menu" v-if="!$store.state.switch">
      <div class="col-select">
        <select class="select" v-model="filter" @change="getAllPost(filter, searchPost)">
          <option class="option" value="">最新貼文</option>
          <option value="asc">最舊貼文</option>
        </select>
      </div>
      <div class="col-serch-input">
        <input class="serch-input" v-model="searchPost" type="text" placeholder="搜尋貼文">
        <button class="serch-button" @click="getAllPost(filter, searchPost)">
          <i class="bi bi-search" style="font-size: 1.7rem;"></i>
        </button>
      </div>
    </div>
    <!-- 動態牆 -->
    <TrendWallView
      v-if="!$store.state.switch"
      :postData="allPost"
      :loading="loading"
      @get-all-post="getAllPost"
    >
    </TrendWallView>
    <!-- 送出貼文 -->
    <SendPostView
      v-if="$store.state.switch"
      @get-all-post="getAllPost"
    >
    </SendPostView>
    <!-- 如果沒有貼文 -->
    <div class="card mt-3" v-if="!allPost.length">
      <div class="card-stand">
      </div>
      <div class="card-stand-block mx-auto">
        <p class="card-stand-p mt-4 mb-2">目前尚無動態，新增一則貼文吧！</p>
      </div>
    </div>
  </div>
</template>
<script>
import TrendWallView from '../components/TrendWallView.vue'
import SendPostView from '../components/SendPostView.vue'

export default {
  components: {
    TrendWallView,
    SendPostView
  },
  data () {
    return {
      name: 'TenndView',
      // 輸入框
      searchPost: '',
      // select
      filter: '',
      allPost: [],
      loading: null,
      page: 2,
      scrollEvent: null
    }
  },
  methods: {
    getAllPost (sort = '-createdAt', search = '', page = 1, scroll = false) {
      if (this.loading) return
      this.loading = true
      const filter = {
        sort: `?timeSort=${sort}`,
        search: `&q=${search}`,
        page: `&page=${page}`
      }
      this.axios.get(`${process.env.VUE_APP_API}posts${filter.sort}${filter.search}${filter.page}`)
        .then((response) => {
          if (scroll) {
            if (!response.data.data.length) {
              window.removeEventListener('scroll', this.scrollEvent)
            }
            this.page += 1
            const temp = this.allPost.concat(response.data.data)
            this.allPost = temp
          } else {
            this.allPost = response.data.data
            this.page = 2
          }
          this.loading = false
        })
        .catch((error) => {
          this.loading = false
          console.log(error, 'getAllPost')
        })
    },
    getPost () {
      this.loading = true
      this.axios.get(`${process.env.VUE_APP_API}posts/${this.$route.params.id}`)
        .then((response) => {
          this.allPost = response.data.data
          this.loading = false
        })
        .catch((error) => {
          this.loading = false
          console.log(error, 'getAllPost')
        })
    },
    buildThrottle () {
      function throttle (fn, delay) {
        let last = 0
        return function (...args) {
          const now = Date.now()
          if (now - last > delay) {
            last = now
            fn.apply(this, args)
          }
        }
      }
      const throttleTask = throttle(this.getAllPost, 1000)
      this.scrollEvent = () => {
        const isBottom = window.scrollY + window.innerHeight >= document.body.offsetHeight - 100
        if (isBottom) {
          throttleTask(this.filter, this.searchPost, this.page, true)
        }
      }
    },
    buildScrollEvent () {
      this.buildThrottle()
      window.addEventListener('scroll', this.scrollEvent)
    }
  },
  mounted () {
    if (this.$route.params.id) {
      this.getPost()
    } else {
      this.getAllPost()
    }
    this.buildScrollEvent()
  },
  beforeUnmount () {
    window.removeEventListener('scroll', this.scrollEvent)
  }
}
</script>

<style lang="scss" scoped>
// menu
.row-menu {
  width: 100%;
  display: flex;
  justify-content: space-between
}
.col-select {
  width: 156px;
  margin-right: 12px;
}
.col-serch-input {
  border: 2px solid black;
  border-right: 0;
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
  border: 0;
  color: #FFFFFF;
  background: #03438D;
}
.select {
  width: 100%;
  padding: 11px 16px;
  border: 2px solid black;
  background: white;
  font: normal normal normal 16px/19px Azeret Mono;
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
// 如果沒有貼文
.card {
  border-radius: 8px;
  border: 2px solid black;
  box-shadow: 0px 3px 0px #000400;
  padding: 24px;
}
.card-stand {
  height: 25px;
  border-bottom: 2px solid black;
}
.card-stand-block {
  font: normal normal normal 16px/24px Noto Sans TC;
}
.card-stand-p {
  color: #9B9893;
}
@media (max-width:768px){
  .row-menu {
    flex-direction: column;
  }
  .col-select {
    width: 100%;
  }
  .col-serch-input {
    width: 100%;
    margin-top: 1rem;
  }
}
</style>
