<template>
  <div class="row-menu" v-if="!isPost">
    <div class="col-select">
      <select class="select" v-model="filter" @change="getAllData(filter, searchPost)">
        <option value="-createdAt">最新貼文</option>
        <option value="createdAt">最舊貼文</option>
      </select>
    </div>
    <div class="col-serch-input ms-3">
      <input class="serch-input" v-model="searchPost" type="text" placeholder="搜尋貼文">
      <button class="serch-button" @click="getAllData(filter, searchPost)">
        <i class="bi bi-search" style="font-size: 1.7rem;"></i>
      </button>
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
      filter: '-createdAt',
      searchPost: '',
      testt: '',
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
      this.axios.post('https://stark-beach-75369.herokuapp.com/posts', data)
        .then((response) => {
          console.log(response, 'post')
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
    console.log(this.$store.state.userInfo._id, 'mounted')
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
