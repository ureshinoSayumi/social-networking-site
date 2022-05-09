<template>
  <nav class="menu">
    <div class="menu-container">
      <div class="menu-logo mt-2">
        <h2 class="menu-logo">MetaWall</h2>
      </div>
      <div class="menu-user mt-2">
        <div class="menu-user-icon">
          <img src="https://upload.cc/i1/2022/04/20/d2R8pW.png" alt="">
        </div>
        <div class="menu-user-name mt-2 ms-2">
          <h2>Member</h2>
        </div>
      </div>
      <!--<ul class="menuUl" :class="isShow">
        <li><router-link to="/trend2">動態牆2</router-link></li>
        <li><router-link to="/trend">動態牆</router-link></li>
        <li><router-link to="/login">登入</router-link></li>
        <li><a href="">價格</a></li>
        <li><a href="">優惠卷</a></li>
      </ul>-->
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
    }
  },
  mounted () {
    console.log(this.isShow)
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Azeret+Mono&family=Noto+Sans+TC:wght@400;500;700&family=Paytone+One&display=swap');

// body {
//   line-height: 1;
//   max-width: 1024px;
//   margin: auto;
// }
.menu {
  height: 58px;
  border-bottom: 2px solid black;
  img {
    width: 300px;
  }
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
  h2 {
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
.card {
  width: 25%;
  img {
    width: 100%;
  }
}
.menu-user {
  display: flex;
}
.menu-user-icon {
  img {
    height: 30px;
    width: 30px;
  }
  font: normal normal bold 16px/24px Noto Sans TC;
  display: flex;
  align-items: center;
}
@media (max-width:768px){
  .card{
    width: 50%;
  }
  .menu h2{
    display: block;
  }
  .menuUl{
    flex-direction: column;
    text-align: center;
    overflow: hidden;
    transition:  2.3s;
    max-height: 0px;
    position: absolute;
    top:62.3px;
    right: 0;
    left: 0;
    background: cornflowerblue;
  }
  .show {
    max-height: 500px;
  }
}
</style>
