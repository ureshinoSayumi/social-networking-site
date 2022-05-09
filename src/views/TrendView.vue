<template>
  <div class="trend-container">
    <TrendWallView
      :postData="allPost"
      :loading="loading"
      @get-all-data="getAllPost"
    >
    </TrendWallView>
  </div>
</template>
<script>
import TrendWallView from '../components/TrendWallView.vue'

export default {
  components: {
    TrendWallView
  },
  data () {
    return {
      name: 'TenndView',
      allPost: [],
      loading: null
    }
  },
  methods: {
    getAllPost (sort = '-createdAt', search = '') {
      this.loading = true
      const filter = {
        sort: `?dateSort=${sort}`,
        search: `&content=${search}`
      }
      this.axios.get(`https://stark-beach-75369.herokuapp.com/posts${filter.sort}${filter.search}`)
        .then((response) => {
          console.log(response, 'getAllPost')
          this.allPost = response.data.data
          this.loading = false
          console.log('this.loading')
        })
        .catch((error) => {
          this.loading = false
          console.log(error, 'getAllPost')
        })
    }
  },
  mounted () {
    this.getAllPost()
  }
}
</script>

<style lang="scss" scoped>
</style>
