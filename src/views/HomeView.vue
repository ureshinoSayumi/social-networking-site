<template>
  <div class="containers">
    <h1>home</h1>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  data () {
    return {
      loginError: false,
      isSignup: false
    }
  },
  methods: {
    login () {
      this.loginError = !this.loginError
    },
    signup () {
      this.isSignup = !this.isSignup
    }
  }
  // components: {
  //   HelloWorld
  // }
}
</script>
<style lang="scss" scoped>

</style>
