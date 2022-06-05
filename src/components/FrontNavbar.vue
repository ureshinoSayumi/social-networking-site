<template>
  <nav class="menu">
    <div class="menu-container">
      <div class="menu-logo mt-2">
        <router-link class="menu-logo" to="/posts" href="#">MetaWall</router-link>
      </div>
      <div v-if="$store.state.userInfo" class="menu-user mt-2">
        <div class="menu-user-icon">
          <img v-if="$store.state.userInfo.image" :src="$store.state.userInfo.image" alt="">
          <img v-else src="https://upload.cc/i1/2022/05/31/dVpHNT.png" alt="">
        </div>
        <div class="menu-user-name mt-2 ms-2">
          <div class="dropdown">
            <h2 class="dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">Member</h2>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><router-link :to="`/user/${$store.state.userInfo._id}`" class="dropdown-item">我的貼文牆</router-link></li>
              <li><router-link to="/user" class="dropdown-item" href="#">修改個人資料</router-link></li>
              <li><router-link @click="loginOut" to="/login" class="dropdown-item" href="#">登出</router-link></li>
            </ul>
          </div>
        </div>
      </div>
      <h2 @click="showMenu" class="menuH2">menu</h2>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      isShow: ''
    }
  },
  methods: {
    showMenu () {
      this.isShow = this.isShow === 'show' ? '' : 'show'
      console.log(this.isShow)
    },
    loginOut () {
      localStorage.setItem('test-token', '')
      this.$store.commit('setUserInfo', null)
    }
  },
  mounted () {
    console.log(this.isShow)
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Azeret+Mono&family=Noto+Sans+TC:wght@400;500;700&family=Paytone+One&display=swap');

.menu {
  height: 58px;
  border-bottom: 2px solid black;
}
.menu-container {
  max-width: 870px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.menuH2 {
  color: white;
  padding: 18px;
  display: none;
}
.menu-logo {
  display:flex;
  align-items: center;
  justify-content: center;
  a {
    text-decoration:none;
    text-align: center;
    font-family: 'Paytone One', sans-serif;
    font: normal normal normal 26px/36px Paytone One;
    letter-spacing: 0px;
    color: #000400;
  }
}
.menu-user-name {
  border-bottom: 2px solid #000400;
  h2 {
    text-align: left;
    font: normal normal bold 16px/19px Azeret Mono;
    letter-spacing: 0px;
    color: #000400;
  }
}
.menuUl {
  display: flex;
  a {
    display: block;
    color: black;
    padding: 20px;
    text-decoration: none;
  }
}
.flex {
  display: flex;
  flex-wrap: wrap;
}
.menu-user {
  display: flex;
}
.menu-user-icon {
  img {
    border-radius: 50%;
    overflow: hidden;
    height: 30px;
    width: 30px;
  }
  font: normal normal bold 16px/24px Noto Sans TC;
  display: flex;
  align-items: center;
}
@media (max-width:768px){
  .menu {
    padding-left: 12px;
    padding-right: 12px;
  }
}
</style>
