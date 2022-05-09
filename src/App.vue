<template>
  <FrontNavbar></FrontNavbar>
  <router-view/>
</template>
<script>
import FrontNavbar from './components/FrontNavbar.vue'

export default {
  components: {
    FrontNavbar
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
// 通用class
// .py-4 {
//   padding-top: 1rem;
//   padding-bottom: 1rem;
// }
// .px-6 {
//   padding-left: 1.5rem;
//   padding-right: 1.5rem;
// }
// .mr-2 {
//   margin-right: 0.5rem;
// }
// .mr-4 {
//   margin-right: 1rem;
// }
// .mr-4 {
//   margin-right: 1rem;
// }
// .ml-2 {
//   margin-left: 0.5rem;
// }
// .ml-4 {
//   margin-left: 1rem;
// }
// .ml-6 {
//   margin-left: 1.5rem;
// }
// .mt-4 {
//   margin-top: 1rem;
// }
// .mb-4 {
//   margin-bottom: 1rem;
// }
// .mb-5 {
//   margin-bottom: 1.5rem;
// }
// .mb-6 {
//   margin-bottom: 1.5rem;
// }
// .mb-8 {
//   margin-bottom: 2rem;
// }
// .mt-1 {
//   margin-top: 0.25rem;
// }
// .mt-2 {
//   margin-top: 0.5rem;
// }
</style>
