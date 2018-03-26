<template>
  <div class="manage">
    <div class="header">
      <mheader></mheader>
      <x-header>报价管理</x-header>
      <tab :line-width=2 active-color='#33b7f7' v-model="index" custom-bar-width="60px" class="tab">
        <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in item" @click="demo2 = item" :key="index" @on-item-click="switchTabItem">{{item}}</tab-item>
      </tab>
    </div>
    <div class="main_man">
      <scroll class="wrapper" :data="list" @pullingUp="pullingUp" @scrollEnd="scrollEnd" @scroll="scroll">
        <div class="list-out">
          <div class="list dis-fl" v-for="item in list" @click="detail(item.purchaseId, item.quotationId)">
            <div class="flex-1">
              <div class="name text-overflow">{{item.title}}</div>
              <div class="adress">
                <span class="pull-left">{{item.totalQuantity}}千克</span>
                <span class="pull-right">{{item.address}}</span>
              </div>
              <div class="time col-a3">{{item.publishData}}</div>
            </div>
            <div class="right">
              <div class="text-center" v-show="item.quotationStatus === 0">
                <span class="status col-pri">已报价</span>
                <button class="quote quoted" @click.stop="cancleQuote(item.quotationId)">取消报价</button>
              </div>
              <div class="text-center" v-show="item.quotationStatus === 1">
                <span class="status col-green">已中标</span>
                <button class="quote end" @click.stop="delQuote(item.quotationId)">删除</button>
              </div>
              <div class="text-center" v-show="item.quotationStatus === 3">
                <span class="status col-a3">已失效</span>
                <button class="quote end" @click.stop="delQuote(item.quotationId)">删除</button>
              </div>
              <div class="text-center" v-show="item.quotationStatus === 7">
                <span class="status">未中标</span>
                <button class="quote end" @click.stop="delQuote(item.quotationId)">删除</button>
              </div>
            </div>
          </div>
          <!-- <div class="list dis-fl">
            <div class="flex-1">
              <div class="name text-overflow">卡UN更舒适的环境爱迪生</div>
              <div class="adress">
                <span class="pull-left">100千克</span>
                <span class="pull-right">辽宁/沈阳</span>
              </div>
              <div class="time col-a3">2018-01-08&nbsp;20:08</div>
            </div>
            <div class="right">
              <div class="text-center">
                <span class="status">已中标</span>
                <button class="quote end">已截止</button>
              </div>
            </div>
          </div> -->
        </div>
      </scroll>
    </div>
    <div class="switch dis-fl">
      <router-link :to="{ path: 'man_purchase' }" class="switch_item curr flex-1">求购管理</router-link>
      <router-link :to="{ path: 'man_quote' }" class="switch_item  flex-1">报价管理</router-link>
    </div>
  </div>
</template>

<script>
  import Scroll from '@/components/base/scroll'
  import Mheader from '@/components/base/mc-header'
  import { Tab, TabItem, XHeader } from 'vux'

  export default {
    components: {
      Mheader,
      Tab,
      TabItem,
      XHeader,
      Scroll
    },
    data () {
      return {
        item: ['全部', '已报价', '已中标', '未中标'],
        demo2: '',
        index: 0,
        list: [],
        isScroll: false,
        params: {
          suppliersId: '',
          quotationStatus: '',
          pageNum: 1,
          numPerPage: 10
        }
      }
    },
    created () {
      this.getList()
    },
    methods: {
      getList () {
        this.$vux.loading.show({
          text: 'loading'
        })
        const params = this.params
        this.$http.get(this.$root.urlPath.MJK + '/wap/purchaseManage/getQuotationManageList', {params: params}).then(function (res) {
          if (res.body.success) {
            this.$vux.loading.hide()
            if (!res.body.data.list > 0) {
              this.isScroll = true
              return
            }
            this.list = this.list.concat(res.body.data.list)
          }
        }, function () {
          this.$vux.loading.hide()
        })
      },
      switchTabItem (index) {
        if (index === 0) {
          this.params.quotationStatus = ''
        }
        if (index === 1) {
          this.params.quotationStatus = 0
        }
        if (index === 2) {
          this.params.quotationStatus = 1
        }
        if (index === 3) {
          this.params.quotationStatus = 7
        }
        this.list = []
        this.params.pageNum = 1
        this.getList()
      },
      detail (id, status) {
        this.$router.push({path: 'quote_detail', query: {purchaseId: id, quotationId: status}})
      },
      cancleQuote (quoId) {
        const params = {
          suppliersId: this.params.suppliersId,
          quotationId: quoId
        }
        var _this = this
        _this.$vux.confirm.show({
          content: '是否取消该报价单？',
          onCancel () {
          },
          onConfirm () {
            _this.$http.get(_this.$root.urlPath.MJK + '/wap/purchaseManage/cancelQuotation', {params: params}).then(function (res) {
              if (res.body.success) {
                _this.$vux.toast.show({
                  text: '取消成功'
                })
                _this.list = []
                _this.params.pageNum = 1
                _this.getList()
              }
            })
          }
        })
      },
      delQuote (id) {
        var _this = this
        _this.$vux.confirm.show({
          content: '是否删除该报价单？',
          onCancel () {
          },
          onConfirm () {
            _this.$http.get(_this.$root.urlPath.MJK + '/wap/purchaseManage/deleteQuotation?quotationId=' + id).then(function (res) {
              if (res.body.success) {
                _this.list.forEach((item, index) => {
                  if (item.quotationId === id) {
                    _this.list.splice(index, 1)
                  }
                })
                _this.$vux.toast.show({
                  text: '删除成功'
                })
              }
            })
          }
        })
      },
      pullingUp () {
        if (this.isScroll) {
          return
        }
        this.params.pageNum++
        this.getList()
      },
      scroll (pos) {
        // console.log(pos)
      },
      scrollEnd (pos) {
        console.log(pos)
      }
    }
  }
</script>

<style scope>
  @import '../../common/styles/comm';
  @import '../../common/styles/main';
  .main_man{
    position: fixed;
    top: 120px;
    bottom: 50px;
    width: 100%;
    /* padding-top: 120px */
  }
  .wrapper{
    width: 100%;
    height: 100%;
  }
  .manage .tab .vux-tab-item{
    font-size: 0.16rem
  }
  .manage .list-out{
    padding: 0.09rem 0.06rem;
    background: #eeeeee;
  }
  .manage .list{
    padding: 0.1rem;
    border-radius: 5px;
    font-size: 14px
  }
  .manage .list{
    align-items: center;
    padding: 0.10rem 0.1rem;
    background: #fff;
  }
  .manage .list+.list{
    margin-top: 0.06rem;
  }
  .manage .list .name{
    width: 2.5rem;
    font-size: 0.16rem;
    margin-bottom: 0.05rem;
    overflow: hidden;
  }
  .manage .list .right{
    width: 0.73rem;
  }
  .manage .list .right .status{
    display: inline-block;
    margin-bottom: 0.05rem;
    font-size: 0.14rem;
  }
  .manage .list .adress {
    padding-top: .02rem;
    padding-right: 0.4rem;
    overflow: hidden;
  }
  .manage .list .time{
    padding-top: .03rem
  }
  .manage .quote {
    width: 0.68rem;
    height: 0.26rem;
    /* border: 1px solid #1593ff; */
    color: #1593ff;
    font-size: 0.14rem;
    border-radius: 0.04rem;
    background: #fff
  }
  .manage .quoted{
    border: 1px solid #1593ff
  }
  .manage .done {
    color: #22ad38;
    background: #fff;
    border: 1px solid #22ad38
  }
  .manage .end{
    border: 1px solid #bfbfbf;
    color: #bfbfbf;
    background:  #fff
  }
    .switch{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  .switch_item{
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    background: #00a5f5;
    color: #fff
  }
  .switch .curr{
    background: #32b16c;
    color: #fff;
  }
</style>
