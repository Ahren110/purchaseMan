<template>
  <div class="dis-fl head" v-show="notInapp">
    <div class="logo-out">
      <a href="http://www.miningcircle.com"><img class="logo" src="~@/common/img/logo.png" alt=""></a>
    </div>
    <div class="nav">
      <a href="http://trade.miningcircle.com/purchase">首页</a>
      <span class="line">|</span>
      <a v-show="!username" href="http://member.miningcircle.com/login?redirectTo=http://trade.miningcircle.com">登录</a>
      <a href="" class="username">{{username}}</a>
      <span class="line">|</span>
      <span v-show="username" @click="delCookie('MC_UID', '', '-1')" class="out">退出</span>
      <span v-show="username" class="line">|</span>
      <a href="http://member.miningcircle.com/reg">注册</a>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        username: '',
        notInapp: true
      }
    },
    created () {
      let userAgent = navigator.userAgent.toLowerCase() // 获取userAgent
      let isInapp = userAgent.indexOf('/mcapp') >= 0 // 判断是否从app打开
      if (isInapp) {
        this.notInapp = false
      }
      const timeNow = new Date().getTime()
      this.$http.get(this.$root.urlPath.MJK + '/wap/purchase/getUserInfo?t=' + timeNow).then(function (res) {
        if (res.body.success) {
          this.username = res.body.data.userName
        }
      })
    },
    methods: {
      delCookie (cname, cvalue, exdays) {
        var d = new Date()
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
        var expires = 'expires=' + d.toUTCString()
        console.info(cname + '=' + cvalue + '; ' + expires)
        document.cookie = cname + '=' + cvalue + '; ' + expires + '; path=/;domain=.miningcircle.com'
        this.$router.go(0)
        this.$router.push('/')
      }
    }
  }
</script>
<style>
  .head{
    height: 30px;
    line-height: 30px;
    padding: 0.03rem 0.12rem;
    justify-content: space-between;
    align-items: center
  }
  .logo-out{
    overflow: hidden;
    width: 0.51rem;
  }
  .logo-out img{
    float: left;
    max-width: 100%;
  }
  .head .nav{
    line-height: 1.6
  }
  .head .line {
    padding: 0 0.06rem;
  }
  .head a, .head .out{
    color: #08c;
    font-size: 0.14rem;
  }
  .nav a, .nav span{
    float: left;
  }
  .username{
    display: inline-block;
    max-width: 0.6rem;
    overflow: hidden;
    white-space: nowrap;
  }
</style>
