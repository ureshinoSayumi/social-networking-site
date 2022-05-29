<template>
  <div class="col-trend me-4">
    <div class="likes-title">
      <h2 class="mt-3">我按讚的貼文</h2>
    </div>
    <div class="likes-block border-radius mt-3"
      v-for="like in allLikes" :key="like._id">
      <div class="content">
        <img class="mt-1" :src="like.user.image" alt="">
        <div class="user ms-3">
          <p class="name">{{ like.user.name }}</p>
          <p class="date">發文時間 {{ formatDate(like.createdAt) }}</p>
        </div>
        <div class="like-block ms-5" @click="clearLike(like)">
          <i class="bi bi-hand-thumbs-up icon ms-1"></i>
          <p class="text">取消</p>
        </div>
        <div class="like-block ms-4">
          <router-link :to="`/post/${like._id}`" href="#">
            <i class="bi bi-arrow-right-circle icon ms-1"></i>
            <p class="text">查看</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      data: ['s'],
      allLikes: []
    }
  },
  methods: {
    getUserLike () {
      this.axios.get('http://127.0.0.1:3005/users/getLikeList')
        .then((response) => {
          console.log(response, 'getUserLike')
          this.allLikes = response.data.likeList
        })
        .catch((error) => {
          alert('token過期，請先登入')
          console.log(error, 'error')
        })
    },
    clearLike (like) {
      console.log(like._id)
      this.axios.delete(`http://127.0.0.1:3005/post/${like._id}/deleteLikes`)
        .then((response) => {
          console.log(response, 'post')
          this.getUserLike()
          alert('收回成功')
        })
        .catch((error) => {
          console.log(error, 'post')
          alert('收回失敗')
        })
    },
    formatDate (dateStr) {
      const date = new Date()
      const formattedDate = `${date.getFullYear(dateStr)}-${(date.getMonth(dateStr) + 1)}-${date.getDate(dateStr)} ${date.getHours(dateStr)}:${date.getMinutes(dateStr)}:${date.getSeconds(dateStr)}`
      console.log(formattedDate, 'formattedDate')
      return formattedDate
    }
  },
  mounted () {
    this.getUserLike()
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
.likes-title {
  height: 64px;
  border: 2px solid black;
  box-shadow: 0px 3px 0px #000400;
  h2 {
    text-align: center;
    font: normal normal bold 20px/24px Azeret Mono;
    letter-spacing: 0px;
    color: #000400;
  }
}
.likes-block {
  height: 77px;
  border: 2px solid black;
  box-shadow: 0px 3px 0px #000400;
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    display: flex;
    // justify-content: space-between;
    img {
      border-radius: 50%;
      overflow: hidden;
      height: 40px;
      width: 40px;
    }
    .user {
      width: 290px;
    }
    .icon {
      font-size: 1.2rem;
    }
    .like-block:hover {
      opacity: .5;
      cursor: pointer;
    }
  }
}
.border-radius {
   border-radius: 8px;
}
.text {
  font: normal normal bold 14px/20px Noto Sans TC;
  letter-spacing: 0px;
  color: #000400;
  opacity: 1;
}
.name {
  font: normal normal bold 16px/24px Noto Sans TC;
}
.date {
  font-size: 13px;
  color: #9B9893;
}
// .card-user-icon {
//   img {
//   }
//   text-decoration:none;
//   color: black;
//   font: normal normal bold 16px/24px Noto Sans TC;
//   display: flex;
//   align-items: center;
// }
// .card-user-icon:hover {
//   cursor: pointer;
//   opacity: .5;
// }
</style>
