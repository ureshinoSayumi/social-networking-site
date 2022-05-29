<template>
    <div class="col-trend me-4">
      <!-- 搜尋 -->
      <div class="row-menu" v-if="!$store.state.switch">
        <div class="col-select">
          <select class="select" v-model="filter" @change="getAllPost(filter, searchPost)">
            <option value="">最新貼文</option>
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
        @get-all-data="getAllPost"
      >
      </TrendWallView>
      <!-- 送出貼文 -->
      <SendPostView
        v-if="$store.state.switch"
        @get-all-data="getAllPost"
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
    <!-- 右側工具 -->
    <!--<ItemView
      v-if="false"
      @change-state="change"
    >
    </ItemView> -->
    <!-- <ul class="col-items">
      <li>
        <button class="button mb-4" @click="isPost = !isPost">張貼動態</button>
      </li>
      <li class="col-item-item mb-4">
        <div class="card-user-icon">
          <img src="https://upload.cc/i1/2022/04/20/d2R8pW.png" alt="">
          <span class="ms-3">{{ $store.state.userInfo.name }}</span>
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
    </ul> -->
</template>
<script>
import TrendWallView from '../components/TrendWallView.vue'
import SendPostView from '../components/SendPostView.vue'
// import ItemView from '../components/ItemView .vue'

export default {
  components: {
    TrendWallView,
    SendPostView
    // ItemView
  },
  data () {
    return {
      name: 'TenndView',
      // 輸入框
      searchPost: '',
      // select
      filter: '',
      allPost: [],
      loading: null
    }
  },
  methods: {
    getAllPost (sort = '-createdAt', search = '') {
      this.loading = true
      const filter = {
        sort: `?timeSort=${sort}`,
        search: `&q=${search}`
      }
      console.log(`http://127.0.0.1:3005/posts${filter.sort}${filter.search}`)
      this.axios.get(`http://127.0.0.1:3005/posts${filter.sort}${filter.search}`)
        .then((response) => {
          this.allPost = response.data.data
          this.loading = false
          console.log('this.loading')
        })
        .catch((error) => {
          this.loading = false
          console.log(error, 'getAllPost')
        })
    },
    getPost () {
      this.loading = true
      console.log(`http://127.0.0.1:3005/user/${this.$route.params.id}`)
      this.axios.get(`http://127.0.0.1:3005/user/${this.$route.params.id}`)
        .then((response) => {
          this.allPost = response.data.data
          this.loading = false
          console.log(response, 'this.loading')
        })
        .catch((error) => {
          this.loading = false
          console.log(error, 'getAllPost')
        })
    }
  },
  mounted () {
    // /user/6284acfbb7bb2d7a226ec064
    console.log(this.$route.params.id, ' this.$route.params;')
    if (this.$route.params.id) {
      this.getPost()
    } else {
      this.getAllPost()
    }
  },
  watch: {
    $route () {
      console.log(this.$route.params, 'watch Te')
      if (this.$route.params.id) {
        this.getPost()
      } else {
        this.getAllPost()
      }
      // this.propsPostData = this.postData
    }
  }
}
</script>

<style lang="scss" scoped>
.trend-container {
  max-width: 870px;
  margin: auto;
  margin-top: 49px;
  display: flex;
  justify-content: space-between;
}
.col-trend {
  width: 533px;
}
// menu
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
.col-items {
  // width: 257px;
  height: 336px;
  border: 2px solid black;
  padding: 32px 24px;
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
  // border: 0;
  // text-align: center;
  // margin: auto;
  font: normal normal normal 16px/24px Noto Sans TC;
}
.card-stand-p {
  color: #9B9893;
}
</style>
