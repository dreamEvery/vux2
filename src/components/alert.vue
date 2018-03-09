<template>
  <div class="Alert">
    <alert v-model="show" title="123123" @on-show="onShow" @on-hide="onHide">撒打算的</alert>
    <button @click="switch1">开关</button>
  </div>
</template>
<script>
  import { Alert } from 'vux'
  export default {
    components: {
      Alert
    },
    data () {
      return {
        show: true
      }
    },
    mounted () {
    },
    methods: {
      onShow: () => {
        console.log('onShow')
      },
      onHide: () => {
        this.show = false
      },
      switch1: () => {
        this.$vux.alert()
        this.show = !this.show
        console.log(this.show)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
