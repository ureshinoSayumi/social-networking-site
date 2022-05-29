<template>
  <div>
    <!-- 張貼文章 -->
    <div class="post-article">
      <h2 class="mt-3">張貼動態</h2>
    </div>
    <div class="card mt-3">
      <label class="card-post-label" for="story">貼文內容:</label>
      <textarea class="card-post-text p-3 mt-1" v-model="fromData.content" id="story" name="story" rows="5" cols="50">目前尚無動態，新增一則貼文吧！</textarea>
      <label class="card-post-input mt-3">
        上傳圖片
        <input ref="fileInput" type="file" @input="fileReader">
        <div v-if="isLoad" class="spinner-border spinner-border-sm" role="status" ></div>
      </label>
      <img v-if="fromData.image" class="card-content-img mt-3" :src="fromData.image" alt="">
      <button :disabled="isLoad" class="card-post-button mt-4 mx-auto" @click="postPost()">
        送出貼文
        <div class="spinner-border spinner-border-sm" role="status" v-if="isLoad"></div>
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
      // console.log('asd')
      this.isLoad = true
      const data = this.fromData
      console.log(this.fromData, 'fromData')
      this.axios.post('http://127.0.0.1:3005/post', data)
        .then((response) => {
          console.log(response, 'post')
          this.isLoad = false
          this.fromData.content = null
          this.fromData.image = null
          this.getAllData()
          alert('傳送成功')
          this.$store.state.switch = false
        })
        .catch((error) => {
          console.log(error, 'post')
          this.isLoad = false
          alert('傳送失敗')
        })
    },
    fileReader () {
      // 解析上傳的檔案，讓 <img> 能即時顯示上傳的圖片
      this.isLoad = true
      if (this.$refs.fileInput.files[0].type !== 'image/jpeg' && this.$refs.fileInput.files[0].type !== 'image/png') {
        alert('僅支援 jpg、png 檔，請重新上傳！')
      }
      const formData = new FormData()
      formData.append('file-to-upload', this.$refs.fileInput.files[0])
      this.axios.post('http://127.0.0.1:3005/upload', formData)
        .then((response) => {
          console.log(response, 'filterasd')
          this.fromData.image = response.data.imgUrl
          this.isLoad = false
        })
        .catch((error) => {
          console.log(error, 'filter')
        })
    }
  },
  mounted () {
    console.log(this.$store.state.userInfo._id, 'mounted')
  },
  watch: {
    // postData () {
    //   this.propsPostData = this.postData
    // }
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
  width: 128px;
  padding: 3px 6px;
  border-radius: 4px;
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
.card-content-img {
  max-width: 100%;
  height: auto;
  // border-radius: 0.5rem;
  border: 2px solid #000400;
  border-radius: 8px;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}
</style>
