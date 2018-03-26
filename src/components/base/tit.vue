<template>
  <div class="title"><img class="back" src="~@/common/img/back.png" @click="back" alt=""><slot></slot></div>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    methods: {
      back () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .title{
     position: relative;
     background: #00a5f5;
     font-size: 0.16rem;
     padding: 0.1rem;
     text-align: center;
     color: #fff
   }
   .title .back{
     position: absolute;
     width: 0.3rem;
     height: 0.3rem;
     left: 0.12rem;
     top: 0.07rem;
   }
</style>
