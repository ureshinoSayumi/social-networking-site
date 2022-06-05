<template>
  <div>
    <FrontNavbar></FrontNavbar>
    <div :class="$route.name === 'login' ? '' : 'trend-container'">
      <div :class="$route.name === 'login' ? '' : 'col-trend'">
        <router-view/>
      </div>
      <ItemView
        v-if="$route.name !== 'login'"
      >
      </ItemView>
    </div>
  </div>
</template>
<script>
import FrontNavbar from './components/FrontNavbar.vue'
import ItemView from './components/ItemView.vue'

export default {
  components: {
    FrontNavbar,
    ItemView
    // FooterNavbar
  }
}
</script>
<style lang="scss">
// @import "~bootstrap/scss/bootstrap";
// @import "./assets/stylesheets/all";
@import url('https://fonts.googleapis.com/css2?family=Azeret+Mono&family=Noto+Sans+TC:wght@400;700&display=swap');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  padding-bottom: 100px;
}
html {
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
  min-height: 100%;
  position: relative;
}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
// 排版
.trend-container {
  max-width: 870px;
  margin: auto;
  margin-top: 49px;
  display: flex;
  justify-content: space-between;
}
.col-trend {
  width: 533px;
  margin-right: 1.5rem
}
@media (max-width:768px){
  .trend-container {
    padding: 0px 12px;
  }
  .col-trend {
    margin: auto;
  }
}
</style>
