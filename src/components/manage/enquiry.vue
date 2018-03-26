<template>
  <div class="allot">
    <div class="header">
      <mheader></mheader>
      <x-header>我的询价</x-header>
    </div>
    <div class="main">
      <div class="detail">
        <div class="dis-fl just-b">
          <p class="num">编号：<span>{{info.purchaseNumber}}</span></p>
          <p class="status col-green" v-if="info.status === 6">已完成</p>
          <p class="status" v-if="info.status === 5">待报价</p>
          <p class="status col-a3" v-if="info.status === 3">已过期</p>
        </div>
        <div class="dis-fl name">
          <p class="text-overflow">{{info.title}}</p>
          <button class="look" @click="sellAgain" v-if="info.status === 3">再来一单</button>
          <button class="look" @click="Detail" v-else>查看详情</button>

        </div>
        <div class="dis-fl time1">
          <div>{{info.totalQuantity}}{{info.unit}}</div>
          <div>发布日期：{{info.beginTime}}</div>
        </div>
        <div class="dis-fl time2">
          <div>{{info.address}}</div>
          <div>报价截止：{{info.endTime}}</div>
        </div>
      </div>
      <div class="sec-cen">
        <div class="section">
          <div class="tit">分配总计</div>
          <div class="dis-fl total">
            <div>总数：{{info.totalNum}}{{info.unit}}</div>
            <div class="price">总价：{{info.totalAmount}}&nbsp;(RMB)</div>
          </div>
        </div>
        <div class="section2">
          <div class="tit tit2">供应商报价</div>
          <divider v-show="!list">暂无报价商</divider>
        </div>
        <div class="purList">
          <div class="list" v-for="item in list">
            <p class="name text-overflow">{{item.quotationCompany}}</p>
            <div class="dis-fl just-b">
              <div class="price">{{item.price}}/{{item.unit}}</div>
              <div>数量&nbsp;{{item.selectNum}}&nbsp;{{item.unit}}</div>
            </div>
            <!-- <div class="dis-fl just-b">
              <div class="col-pri">报价补充</div>
              <div class="input">
                <label>
                  <span>分配</span>
                  <input type="number">
                </label>
              </div>
            </div> -->
            <div class="dis-fl time">
              <div>{{item.createdTime}}</div>
              <div class="right">小计{{item.selectAmount}}</div>
            </div>
          </div>
          <!-- <div class="list">
            <p class="name">啥刚到家啊实打实计划发展有限公司</p>
            <div class="dis-fl just-b">
              <div class="price">RMB&nbsp;500000.00&nbsp;/千克</div>
              <div>数量&nbsp;1000&nbsp;千克</div>
            </div>
            <div class="dis-fl time">
              <div>2018-01-08</div>
              <div class="right">小计1000000088.00</div>
            </div>
          </div> -->

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Mheader from '@/components/base/mc-header'
  import { XHeader, Divider, numberComma } from 'vux'
  export default {
    data () {
      return {
        info: {},
        query: {},
        list: []
      }
    },
    components: {
      Mheader,
      XHeader,
      Divider
    },
    created () {
      this.query = this.$route.query
      const params = this.$route.query
      this.$http.get(this.$root.urlPath.MJK + '/wap/purchaseManage/getPurchaseAchieveDetails', {params: params}).then(function (res) {
        if (res.body.success) {
          this.info = res.body.data
          if (res.body.data.list.length > 0) {
            res.body.data.list.forEach(element => {
              element.selectAmount = numberComma(element.selectAmount, 3)
            })
          }
          this.info.totalNum = numberComma(this.info.totalNum, 3)
          this.info.totalAmount = numberComma(this.info.totalAmount, 3)
          this.list = res.body.data.list
        }
      })
    },
    methods: {
      Detail () {
        window.location.href = 'http://trade.miningcircle.com/detail?id=' + this.query.purchaseId
      },
      sellAgain () {
        window.location.href = 'http://trade.miningcircle.com/sell?id=' + this.query.purchaseId
        //   this.$router.push({path: 'sell', query: {purchaseId: this.id, unit: this.Info.unit, max: this.Info.totalQuantity}})
      }
    }
  }
</script>

<style>
  @import '../../common/styles/comm';
  @import '../../common/styles/main';
  .allot .main{
    padding: 76px 0 0 0;
  }
  .allot{
    color: #333;
  }
  .detail{
    font-size: 0.14rem;
    padding: 0.1rem 0.2rem;
  }
  .detail .status{
    width: 0.75rem;
    text-align: center;
    font-size: 0.16rem;
  }
  .detail .name{
    justify-content: space-between;
    margin-top: 0.05rem;
  }
  .detail .name p{
    width: 70%;
  }
  .look{
    display: inline-block;
    padding: 0.03rem 0.1rem;
    border: 1px solid #22ad38;
    background: #fff;
    border-radius: 3px;
    color: #22ad38;
  }
  .detail .num {
    font-size: 0.16rem;
    font-weight: bolder;
  }
  .detail .time1, .detail .time2{
    margin-top: 0.03rem;
    justify-content: space-between
  }
  .sec-cen{
    padding: 0.1rem 0.05rem;
    background: #e3e3e3;
  }
  .section{
    padding: 0.1rem 0.15rem;
    background: #fff;
    border-radius: 5px;
    font-size: 0.14rem
  }
  .sec-cen .tit{
    color: #00a5f5;
    padding-left: 25px;
    font-size: 0.16rem;
    font-weight: bolder;
    background: url(../../common/img/icon1.png) left center no-repeat;
  }
  .sec-cen .total{
    justify-content: space-between;
    margin-top: 0.1rem;
  }
  .total .price{
    color: #ff0000;
  }
  .section2{
    margin-top: 0.1rem;
    background: #fff;
    border-radius: 5px;
  }
  .sec-cen .tit2{
    margin:  0 0.15rem;
    padding: 0.1rem 0 0.1rem 25px;
    background: url(../../common/img/icon2.png) left center no-repeat;
  }
  .purList .list{
    padding: 0.1rem 0.15rem;
    background: #fff;
    margin-top: 0.03rem;
    font-size: 0.14rem;
  }
  .list .name{
    width: 80%;
    font-size: 0.16rem;
  }
  .list .price{
    color: #f8b551;
  }
  .just-b{
    justify-content: space-between;
    margin-top: 0.03rem;
  }
  .just-b .input input{
    width: 0.7rem;
    height: 0.22rem;
    font-size: 0.14rem;
    padding: 0 0.05rem
  }
  .list .time{
    margin-top: 0.03rem;
    justify-content: space-between;
    color: #d0d0d0;
  }
  .list .time .right{
    color: #ff0000;
  }
  .detail .list .right{
    color: #ff0000;
  }
</style>
