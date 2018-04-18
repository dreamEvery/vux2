<template>
  <div class="standby">
    <p class="prompt">
      <img src="../assets/img/map/Load-page_img_Written-words.png" alt="">
    </p>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .standby {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    background-image: url("../assets/img/map/Load-page_img_Sign-in.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .standby .prompt{position: absolute;width: 2rem;height: 0.3rem;top: 4.8rem;left: 3rem;}
</style>
