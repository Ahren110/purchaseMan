<template>
  <div>
    <div class="header">
      <mheader></mheader>
      <x-header>报价详情</x-header>
    </div>
    <div class="main">
      <div class="contain">
        <div class="section">
          <p class="name text-overflow-1">{{quotationInfo.quotationCompany}}</p>
          <div class="dis-fl border-1 item">
            <span class="left">单价</span>
            <span class="flex-1">{{quotationInfo.price}}{{quotationInfo.currency}}</span>
          </div>
          <div class="dis-fl border-1 item">
            <span class="left">最小量</span>
            <span class="flex-1">{{quotationInfo.mixNum}}{{quotationInfo.unit}}</span>
          </div>
          <div class="dis-fl border-1 item">
            <span class="left">最大量</span>
            <span class="flex-1">{{quotationInfo.maxNum}}{{quotationInfo.unit}}</span>
          </div>
          <div class="dis-fl border-1 item">
            <span class="left">联系人</span>
            <span class="flex-1">{{quotationInfo.quotationName}}</span>
          </div>
          <div class="dis-fl border-1 item">
            <span class="left">联系电话</span>
            <span class="flex-1">{{quotationInfo.quotationPhone}}</span>
          </div>
          <div class="dis-fl border-1 item">
            <span class="left">报价时间</span>
            <span class="flex-1">{{quotationInfo.createdTime}}</span>
          </div>
          <div class="dis-fl border-1 item">
            <span class="left">附件</span>
            <!-- <span class="flex-1"><a :href="quotationInfo.quotationEnclosure"></span> -->
            <a :href="quotationInfo.quotationEnclosure" class="col-pri" download="附件" v-show="quotationInfo.quotationEnclosure">下载附件</a>&nbsp;{{'(' + fileType + ')'}}
          </div>
          <div class="dis-fl border-1 item">
            <span class="left">报价补充</span>
            <span class="flex-1 textMore">{{quotationInfo.quotationSupplement}}</span>
          </div>
          <!-- <div class="fi">

          </div> -->
          <div class="dis-fl border-1 item">
            <span class="left">中标数量</span>
            <span class="flex-1 textMore">{{quotationInfo.allocateQuota}}&nbsp;{{quotationInfo.unit}}</span>
          </div>
          <div class="dis-fl border-1 item">
            <span class="left">中标金额</span>
            <span class="flex-1 textMore">{{quotationInfo.totalAmount}}&nbsp;元</span>
          </div>
        </div>
        <div class="section">
          <div class="dis-fl title">
            <p class="name">求购产品信息</p>
            <span v-show="purchaseInfo.status === 3">已过期</span>
          </div>

          <div class="dis-fl border-1 item">
            <span class="left">品名</span>
            <span class="flex-1">{{purchaseInfo.title}}</span>
          </div>
          <div class="dis-fl border-1 item">
            <span class="left">规格</span>
            <span class="flex-1">{{purchaseInfo.specifications}}</span>
          </div>
          <div class="dis-fl border-1 item">
            <span class="left">采购数量</span>
            <span class="flex-1">{{purchaseInfo.purchaseNum}}</span>
          </div>
          <div class="dis-fl border-1 item">
            <span class="left">发布时间</span>
            <span class="flex-1">{{purchaseInfo.purchaseStart}}</span>
          </div>
          <div class="dis-fl border-1 item">
            <span class="left">报价截至</span>
            <span class="flex-1">{{purchaseInfo.purchaseEnd}}</span>
          </div>
          <div class="dis-fl border-1 item">
            <span class="left">收货日期</span>
            <span class="flex-1">{{purchaseInfo.data}}</span>
          </div>
          <div class="dis-fl border-1 item">
            <span class="left">求购单号</span>
            <span class="flex-1">{{purchaseInfo.purchaseNumber}}</span>
          </div>
          <div class="dis-fl border-1 item">
            <span class="left">收货地址</span>
            <span class="flex-1">{{purchaseInfo.address}}</span>
          </div>
          <div class="dis-fl border-1 item">
            <span class="left">求购企业</span>
            <span class="flex-1">{{purchaseInfo.purchaseCompany}}</span>
          </div>
          <div class="dis-fl item">
            <span class="left">商品备注</span>
            <span class="flex-1 textMore">{{purchaseInfo.remark}}</span>
          </div>
        </div>
        <div class="model" v-show="quotationInfo.status === 3"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import Mheader from '@/components/base/mc-header'
  import { XHeader, numberComma } from 'vux'
  export default {
    components: {
      Mheader,
      XHeader
    },
    data () {
      return {
        quotationInfo: {},
        purchaseInfo: {},
        fileType: ''
      }
    },
    created () {
      const params = this.$route.query
      this.$http.get(this.$root.urlPath.MJK + '/wap/purchaseManage/getQuotationDetails', {params: params}).then(function (res) {
        if (res.body.success) {
          this.quotationInfo = res.body.data.quotationInfo
          this.purchaseInfo = res.body.data.purchaseInfo
          const urlStr = this.quotationInfo.quotationEnclosure
          const idx = this.quotationInfo.quotationEnclosure.lastIndexOf('.')
          this.fileType = urlStr.substring(idx, urlStr.length)
          this.quotationInfo.allocateQuota = numberComma(this.quotationInfo.allocateQuota, 3)
          this.quotationInfo.totalAmount = numberComma(this.quotationInfo.totalAmount ? this.quotationInfo.totalAmount.toFixed(2) : 0, 3)
          this.purchaseInfo.purchaseNum = numberComma(this.purchaseInfo.purchaseNum, 3)
        }
      })
    },
    methods: {

    }
  }
</script>

<style scope>
  @import '../../common/styles/comm';
  @import '../../common/styles/main';
  .main{
    padding-top: 76px
  }
  .contain{
    padding: 0.1rem;
    background: #eeeeee;
    color: #333;
  }
  .section{
    padding: 0.25rem;
    background: #fff;
    border-radius: 8px;
    font-size: 0.14rem;
  }
  .title{
    justify-content: space-between
  }
  .section .name{
    font-size: 0.16rem;
  }
  .section .item{
    color: #555;
    margin-top: 0.05rem;
    padding: 0.03rem 0;
  }
  .section .left{
    width: 0.85rem;
  }
  .section+.section{
    margin-top: 0.1rem;
  }
  .model{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, .5)
  }
  .textMore{
    word-break:break-all;
  }
</style>
