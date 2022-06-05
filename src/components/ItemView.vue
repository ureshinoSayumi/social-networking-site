<template>
  <ul class="col-items">
    <li>
      <button class="button mb-4" @click="changeState()">
        <template v-if="$store.state.switch">回到貼文</template>
        <template v-else>張貼動態</template>
      </button>
    </li>
    <li class="col-item-item mb-4">
      <router-link v-if="$store.state.userInfo" :to="`/user/${$store.state.userInfo._id}`" class="card-user-icon">
        <img v-if="$store.state.userInfo.image" :src="$store.state.userInfo.image" alt="">
        <img v-else src="https://upload.cc/i1/2022/05/31/dVpHNT.png" alt="">
        <span class="ms-3">{{ $store.state.userInfo.name }}</span>
      </router-link>
    </li>
    <li class="col-item-item mb-4">
      <router-link to="/following" class="card-user-icon">
        <div class="card-user-icon-border">
          <i class="bi bi-bell" style="font-size: 1.5rem;"></i>
        </div>
        <span class="ms-3">追蹤名單</span>
      </router-link>
    </li>
    <li class="col-item-item mb-4">
      <router-link to="/likes" class="card-user-icon">
        <div class="card-user-icon-border">
          <i class="bi bi-hand-thumbs-up" style="font-size: 1.5rem;"></i>
        </div>
        <span class="ms-3">我按讚的文章</span>
      </router-link>
    </li>
  </ul>
  <ul class="col-items-RWD">
    <router-link v-if="$store.state.userInfo" :to="`/user/${$store.state.userInfo._id}`" class="card-user-icon">
      <div class="card-user-icon-border">
        <i class="bi bi-house-door" style="font-size: 1.5rem;"></i>
      </div>
    </router-link>
    <router-link to="/following" class="card-user-icon">
      <div class="card-user-icon-border">
        <i class="bi bi-bell" style="font-size: 1.5rem;"></i>
      </div>
    </router-link>
    <router-link to="/likes" class="card-user-icon">
      <div class="card-user-icon-border">
        <i class="bi bi-hand-thumbs-up" style="font-size: 1.5rem;"></i>
      </div>
    </router-link>
    <div class="card-user-icon">
      <div class="card-user-icon-border blue" @click="changeState()">
        <i class="bi bi-plus-lg" style="font-size: 1.5rem;"></i>
      </div>
    </div>
  </ul>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    changeState () {
      // this.$emit('change-state')
      this.$store.state.switch = !this.$store.state.switch
      if (this.$route.name !== 'post' || this.$route.name !== 'posts') {
        this.$router.push('/posts')
      }
    }
  },
  mounted () {
  },
  watch: {
  }
}
</script>

<style lang="scss" scoped>
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
  background: #EEC32A 0% 0% no-repeat padding-box;
  color: black;
}
.col-items {
  // width: 257px;
  height: 336px;
  border: 2px solid black;
  padding: 32px 24px;
}
.card-user-icon {
  img {
    border-radius: 50%;
    overflow: hidden;
    height: 45px;
    width: 45px;
  }
  text-decoration:none;
  color: black;
  font: normal normal bold 16px/24px Noto Sans TC;
  display: flex;
  align-items: center;
}
.card-user-icon:hover {
  cursor: pointer;
  opacity: .5;
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
.col-items-RWD {
  display: none;
}
@media (max-width:768px){
  .col-items {
    display: none;
  }
  .col-items-RWD {
    display: flex;
    justify-content: space-around;
    padding: 0;
    position:fixed;
    top: 90%;
    left: 50%;
    width: 360px;
    margin-left:-180px;
    // margin-top:-180px;
    height: 65px;
    background: #EFECE7 0% 0% no-repeat padding-box;
    border: 3px solid #000400;
    border-radius: 32px;
    opacity: 1;
  }
  .card-user-icon-border {
    background: #FFFFFF 0% 0% no-repeat padding-box;
  }
  .blue {
    color: white;
    background: #03438D 0% 0% no-repeat padding-box;
  }
}
</style>
