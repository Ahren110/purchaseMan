<template>
  <div class="allot">
    <div class="header">
      <mheader></mheader>
      <x-header>分配求购额度</x-header>
    </div>
    <div class="main">
      <div class="detail">
        <div class="dis-fl just-b">
          <p class="num">编号：<span>{{info.purchaseNo}}</span></p>
          <button class="look" @click="Detail">查看详情</button>
        </div>
        <div class="dis-fl name">
          <p class="text-overflow">{{info.title}}</p>

        </div>
        <div class="dis-fl time1">
          <div>{{info.totalQuantity}}{{info.unit}}</div>
          <div>发布日期：{{info.beginTime}}</div>
        </div>
        <div class="dis-fl time2">
          <div>辽宁/沈阳收货</div>
          <div>报价截止：{{info.endTime}}</div>
        </div>
      </div>
      <div class="sec-cen">
        <div class="section">
          <div class="tit">分配总计</div>
          <div class="dis-fl total">
            <div>总数：{{SumShow}}吨</div>
            <div class="price">总价：{{TotalShow}}&nbsp;(RMB)</div>
          </div>
        </div>
        <div class="section2">
          <div class="tit tit2">供应商报价</div>
        </div>
        <div class="purList">
          <div class="list" v-for="(item, index) in info.list">
            <div class="dis-fl align-c">
              <p class="name text-overflow">{{item.suppliersName}}</p>
              <div class="flex-1 text-center">
                <button class="lookQuote" @click="quoteDetail(item.quotationId)">查看详情</button>
              </div>
            </div>

            <div class="dis-fl just-b">
              <div>可供 {{item.minQuantity}}~{{item.maxQuantity}} {{item.unit}}</div>
              <div class="price">{{item.price}}&nbsp;RMB</div>
            </div>
            <div class="dis-fl just-b">
              <div class="col-pri" @click="showRemark(item.remark)">报价补充</div>
              <div class="input">
                <!-- <label class="dis-fl">
                  <span>分配</span>
                  <group>
                    <x-number :value="10" fillable :min="0" :max="parseFloat(item.maxQuantity)" v-model="arrVal[index]" :width="'80px'" @on-change="changNum(item.minQuantity, arrVal[index], index)"></x-number>
                  </group>
                </label> -->
                <label>
                  <span>分配</span>
                  <input v-model="arrVal[index]" type="tel" @input="changeNum(item.minQuantity, item.maxQuantity, arrVal[index], index)" @blur="blur(item.minQuantity, arrVal[index], index)">
                </label>
              </div>
            </div>
            <div class="dis-fl time">
              <div>2018-01-08</div>
              <div class="right">小计{{arrVal[index] * item.price}}</div>
            </div>
          </div>
          <!-- <div class="list">
            <p class="name">啥刚到家啊实打实计划发展有限公司</p>
            <div class="dis-fl just-b">
              <div>可供100~1000吨</div>
              <div class="price">RMB&nbsp;500000.00</div>
            </div>
            <div class="dis-fl just-b">
              <div class="col-pri" @click="showRemark">报价补充</div>
              <div class="input">
                <label>
                  <span>分配</span>
                  <input type="number">
                </label>
              </div>
            </div>
            <div class="dis-fl time">
              <div>2018-01-08</div>
              <div class="right">小计1000000088.00</div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <div class="fixed">
      <button @click="submit">提交</button>
    </div>
    <div class="remark_layer" v-show="show_remark" @click="showRemark">
      <div class="tran-center content" @click.stop>
        <p class="tit col-pri">报价补充</p>
        <div class="text">{{text}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  // import Vue from 'vue'
  import Mheader from '@/components/base/mc-header'
  import { XHeader, Group, XNumber, numberComma } from 'vux'
  export default {
    components: {
      Mheader,
      XHeader,
      XNumber,
      Group
    },
    data () {
      return {
        info: {},
        show_remark: false,
        text: '',
        query: {},
        arrPrice: [], // 价格列表
        arrVal: [], // 分配列表
        totalSum: 0, // 总分配
        totalPrice: [], // 分配总价列表
        Total: 0, // 总计
        TotalShow: 0, // 价格三位分隔符展示
        SumShow: 0 // 总分配三位分隔符展示
      }
    },
    created () {
      this.query = this.$route.query
      const params = {
        purchaseId: this.query.purchaseId,
        pageNum: 1,
        numPerPage: 10
      }
      this.$http.get(this.$root.urlPath.MJK + '/wap/purchaseManage/getQuotationList', {params: params}).then(function (res) {
        if (res.body.success) {
          this.info = res.body.data
          for (let index = 0; index < this.info.list.length; index++) {
            this.arrVal[index] = ''
            this.arrPrice[index] = this.info.list[index].price
          }
          console.log(this.arrVal)
        }
      })
    },
    computed: {
    },
    methods: {
      Detail () {
        window.location.href = 'http://trade.miningcircle.com/detail?id=' + this.query.purchaseId
      },
      quoteDetail (quoteId) {
        this.$router.push({path: 'quote_detail', query: {purchaseId: this.query.purchaseId, quotationId: quoteId}})
      },
      showRemark (text) {
        this.text = text
        this.show_remark = !this.show_remark
      },
      changeNum (min, max, val, index) {
        if (val > parseFloat(max)) {
          this.$set(this.arrVal, index, parseFloat(max))
        }
      },
      blur (min, val, index) {
        if (val < parseFloat(min)) {
          this.$set(this.arrVal, index, 0)
        }
      },
      sum () {
        var s = 0
        for (let index = 0; index < this.arrVal.length; index++) {
          if (this.arrVal[index]) {
            s += parseFloat(this.arrVal[index])
          }
        }
        return s
      },
      submit () {
        var _this = this
        if (this.totalSum <= 0) {
          return
        }
        const list = []
        for (let index = 0; index < this.arrVal.length; index++) {
          if (parseFloat(this.arrVal[index]) > 0) {
            const itemList = {
              quotationId: this.info.list[index].quotationId,
              purchaseId: this.query.purchaseId,
              quotationStatus: 1,
              selectNum: this.arrVal[index],
              selectAmount: this.totalPrice[index]
            }
            list[index] = itemList
          }
        }
        const data = {
          purchaseId: this.query.purchaseId,
          totalPrices: this.Total,
          totalQuantity: this.totalSum,
          purchaseStatus: 6,
          data: JSON.stringify(list)
        }
        const params = data
        console.log(params)
        this.$vux.confirm.show({
          title: '提示',
          content: '确认提交？',
          onCancel () {
          },
          onConfirm () {
            _this.$http.post(_this.$root.urlPath.MJK + '/wap/purchaseManage/saveSelectedQuotationList', params).then(function (res) {
              if (res.body.success) {
                _this.$vux.confirm.show({
                  title: '提示',
                  cancelText: '返回首页',
                  confirmText: '查看详情',
                  content: '恭喜您求购成功!',
                  onCancel () {
                    window.location.href = 'http://trade.miningcircle.com/purchase'
                  },
                  onConfirm () {
                    _this.query.status = 6
                    _this.$router.push({path: 'enquiry', query: _this.query})
                  }
                })
              }
            })
          }
        })
      }
    },
    watch: {
      arrVal: {
        handler: function (newVal) {
          const totalSum = this.sum()
          console.log(totalSum)
          this.totalSum = totalSum
          this.SumShow = numberComma(totalSum, 3)
          var total = 0
          var _this = this
          newVal.forEach((item, index) => {
            if (!parseFloat(item)) {
              item = 0
            }
            _this.totalPrice[index] = parseFloat(item) * this.arrPrice[index]
            total += _this.totalPrice[index]
          })
          this.Total = total
          this.TotalShow = numberComma(total.toFixed(2), 3)
        },
        deep: true
      }
    }
  }
</script>

<style>
  @import '../../common/styles/comm';
  @import '../../common/styles/main';
  .main{
    padding: 76px 0 50px;
  }
  .allot{
    color: #333;
  }
  .detail{
    font-size: 0.14rem;
    padding: 0.1rem 0.2rem;
  }
  .detail .name{
    justify-content: space-between;
    margin-top: 0.05rem;
  }
  .detail .name p{
    width: 70%;
  }
  .align-c{
    align-items: center
  }
  .look{
    display: inline-block;
    padding: 0.03rem 0.1rem;
    border: 1px solid #22ad38;
    background: #fff;
    border-radius: 3px;
    color: #22ad38;
    font-size: 0.14rem
  }
  .lookQuote{
    display: inline-block;
    padding: 0.02rem 0.06rem;
    border: 1px solid #22ad38;
    background: #fff;
    border-radius: 3px;
    color: #22ad38;
    font-size: 0.1rem
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
    border-radius: 5px 5px 0 0;
  }
  .sec-cen .tit2{
    margin:  0 0.15rem;
    padding: 0.1rem 0 0.1rem 25px;
    background: url(../../common/img/icon2.png) left center no-repeat;
  }
  .purList .list{
    padding: 0.1rem 0.15rem;
    background: #fff;
    font-size: 0.14rem;
  }
  .allot .list+.list{
    margin-top: 0.03rem;
  }
  .allot .list .name{
    width: 80%;
    font-size: 0.16rem;
  }
  .allot .list .price{
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
  .allot .list .time{
    margin-top: 0.03rem;
    justify-content: space-between;
    color: #d0d0d0;
  }
  .allot .list .right{
    color: #ff0000;
  }
  .fixed{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  .fixed button{
    display: inline-block;
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: #fff;
    font-size: 0.18rem;
    background: #1594ff;
    border: 1px solid #1594ff;
  }
  .remark_layer{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999999;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5)
  }
  .remark_layer .content{
    width: 280px;
    height: 280px;
    background: #fff;
    border-radius: 5px;
    padding: 10px 15px;
    text-align: center
  }
  .remark_layer .tit{
    font-size: 18px;
    padding-bottom: 5px
  }
  .remark_layer .text{
    height: 220px;
    padding: 5px;
    border: 1px solid #d0d0d0;
    overflow: scroll;
    font-size: 16px;
    text-align: left;
  }
  .purList .list .weui-cells{
    margin-top: 0;
  }
  .purList .list .weui-cell{
    padding: 0
  }
  .purList .list .vux-number-selector{
    height: 22px;
  }
  .purList .list .weui-cells:after, .purList .list .weui-cells:before{
    display: none;
  }
</style>
