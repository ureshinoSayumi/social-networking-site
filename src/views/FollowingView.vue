<template>
  <div>
    <div class="following-title">
      <h2 class="mt-3">追蹤名單</h2>
    </div>
    <div class="following-block border-radius mt-3"
      v-for="following in allFollowing" :key="following._id">
      <div class="content">
        <router-link class="ms-3" :to="`/user/${following.user._id}`" href="#">
          <img v-if="following.user.image" class="mt-1" :src="following.user.image" alt="">
          <img v-else class="mt-1" src="https://upload.cc/i1/2022/05/31/dVpHNT.png" alt="">
        </router-link>
        <div class="ms-3">
          <router-link :to="`/user/${following.user._id}`" href="#">
            <p class="name">{{ following.user.name }}</p>
          </router-link>
          <p class="date">發文時間 {{ formatDate(following.createdAt) }}</p>
        </div>
        <div class="ms-auto">
          <button @click="unfollow(following.user)" class="follow-unfollow me-3">
            取消追蹤
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      allFollowing: []
    }
  },
  methods: {
    getFollowing () {
      this.axios.get(`${process.env.VUE_APP_API}users/following`)
        .then((response) => {
          console.log(response, 'following')
          this.allFollowing = response.data.data
        })
        .catch((error) => {
          alert('token過期，請先登入')
          console.log(error, 'error')
        })
    },
    unfollow (user) {
      this.axios.delete(`${process.env.VUE_APP_API}users/${user._id}/unfollow`)
        .then((response) => {
          this.getFollowing()
          console.log(response, 'unfollow')
        })
        .catch((error) => {
          console.log(error, 'unfollow')
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
    this.getFollowing()
  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
a {
  text-decoration: none;
  color: #000000;
}
.following-title {
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
.following-block {
  height: 77px;
  border: 2px solid black;
  box-shadow: 0px 3px 0px #000400;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    text-decoration:none
  }
}
.content {
  width: 100%;
  display: flex;
  // justify-content: space-between;
  img {
    border-radius: 50%;
    overflow: hidden;
    height: 40px;
    width: 40px;
  }
  .user-block {
    display: flex;
  }
  .icon {
    font-size: 1.2rem;
  }
}

.follow-unfollow {
  display: inline-block;
  background: #EFECE7 0% 0% no-repeat padding-box;
  border: 2px solid #000400;
  border-radius: 8px;
  box-shadow: 0px 2px 0px #000400;
  padding: 6px 32px;
  font: normal normal bold 16px/24px Noto Sans TC;
}
.follow-unfollow:hover {
  opacity: .5;
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
</style>
