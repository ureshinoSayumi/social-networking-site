<template>
  <nav class="footer menu">
    <!-- <img src="https://upload.cc/i1/2020/09/08/Yvtk7u.jpg" alt=""> -->
    <!-- <ul class="menuUl">
      <li><a href="">食品</a></li>
      <li><a href="">美妝</a></li>
      <li><a href="">價格</a></li>
      <li><a href="">優惠卷</a></li>
    </ul> -->
    <h2 class="menuH2">menu</h2>
  </nav>
</template>
<style lang="scss" scoped>
.footer{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  color: #969696;
  text-align: center;
  height: 58px;
}

.menu{
  background: black;
  display: flex;
  justify-content: space-between;
}
.menu img{
  width: 300px;
}
.menuUl{
  display: flex;
}
.menuUl a{
  display: block;
  color: white;
  padding: 20px;
  text-decoration: none;
}
.menu h2{
  color: white;
  padding: 18px;
  display: none;
}
</style>
