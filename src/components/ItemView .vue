<template>
  <ul class="col-items">
    <li>
      <button class="button mb-4" @click="changeState()">張貼動態</button>
    </li>
    <li class="col-item-item mb-4">
      <div class="card-user-icon">
        <img v-if="$store.state.userInfo" :src="$store.state.userInfo.image" alt="">
        <span v-if="$store.state.userInfo" class="ms-3">{{ $store.state.userInfo.name }}</span>
      </div>
    </li>
    <li class="col-item-item mb-4">
      <router-link to="/likes" class="card-user-icon">
        <div class="card-user-icon-border">
          <i class="bi bi-bell" style="font-size: 1.5rem;"></i>
        </div>
        <span class="ms-3">追蹤名單</span>
      </router-link>
    </li>
    <li class="col-item-item mb-4">
      <router-link to="/likes" class="card-user-icon">
        <div class="card-user-icon-border">
          <i class="bi bi-bell" style="font-size: 1.5rem;"></i>
        </div>
        <span class="ms-3">我按讚的文章</span>
      </router-link>
    </li>
  </ul>
</template>
<script>
export default {
  emits: ['get-all-data', 'change-state'],
  data () {
    return {
      test2: false
    }
  },
  methods: {
    changeState () {
      this.$emit('change-state')
      // 切換葉千
      this.$store.state.switch = !this.$store.state.switch
      console.log(this.$store.state.switch, 'asd')
      // this.$store.commit('setSwitch', '')
    },
    getAllData (sort, search) {
      this.$emit('get-all-data', sort, search)
    },
    test () {
      console.log(this.$store.state.userInfo._id)
    }
  },
  mounted () {
    // console.log(this.$store.state.userInfo._id, 'ItemView ')
  },
  watch: {
    // postData () {
    //   this.propsPostData = this.postData
    // }
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
</style>
