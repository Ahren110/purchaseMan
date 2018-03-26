<template>
  <div class="manage">
    <div class="header">
      <mheader></mheader>
      <x-header>求购单管理</x-header>
      <tab :line-width=2 active-color='#33b7f7' v-model="index" custom-bar-width="60px" class="tab">
        <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in item" @click="demo2 = item" :key="index" @on-item-click="switchTabItem">{{item}}</tab-item>
      </tab>
    </div>
    <div class="main_man">
      <!-- <div class="wrapper" ref="wrapper"> -->
      <scroll class="wrapper" :data="list" @pullingUp="pullingUp" @scrollEnd="scrollEnd" @scroll="scroll">
        <div class="list-out">
          <div class="list dis-fl" v-for="item in list" @click="detail(item.purchaseId, item.purchaseStatus, item.suppliersNum)">
            <div class="flex-1">
              <div class="name text-overflow">{{item.title}}</div>
              <div class="adress">
                <span class="pull-left">{{item.purchaseNum}}{{item.unit}}</span>
                <span class="pull-right">{{item.address}}</span>
              </div>
              <div class="time col-a3">{{item.publishData}}</div>
            </div>
            <div class="right">
              <div class="text-center" v-if="item.purchaseStatus === 5">
                <span class="status col-pri">待报价</span>
              </div>
              <div class="text-center" v-if="item.purchaseStatus === 7">
                <span class="status col-pri">待确认</span>
                <span class="member">{{item.suppliersNum}}家报价</span>
              </div>
              <div class="text-center" v-if="item.purchaseStatus === 6">
                <span class="status col-green">已完成</span>
                <button class="quote end" @click.stop="delPurchase(item.purchaseId)">删除</button>
              </div>
              <div class="text-center" v-if="item.purchaseStatus === 3">
                <span class="status col-a3">已过期</span>
                <button class="quote end" @click.stop="delPurchase(item.purchaseId)">删除</button>
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
          </div>
          <div class="list dis-fl">
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
          </div>
          <div class="list dis-fl">
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
      <!-- </div> -->
    </div>
    <div class="switch dis-fl">
      <router-link :to="{ path: 'man_purchase' }" class="switch_item curr flex-1">求购管理</router-link>
      <router-link :to="{ path: 'man_quote' }" class="switch_item flex-1">报价管理</router-link>
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
        item: ['全部', '待报价', '待确认', '已完成'],
        demo2: '',
        index: 0,
        params: {
          publisherId: '',
          purchaseStatus: '',
          lg: '0',
          pageNum: 1,
          numPerPage: 10
        },
        list: [],
        isScroll: false
        // list2: [
        //   {
        //     address: '北京市北京市',
        //     publishData: '2018-01-26',
        //     purchaseId: '893573820764393472',
        //     purchaseNum: 500,
        //     purchaseStatus: 5,
        //     suppliersNum: 3,
        //     title: '测试',
        //     unit: '个'
        //   }
        // ]
      }
    },
    created () {
      this.getList()
    },
    mounted () {

    },
    methods: {
      getList () {
        this.$vux.loading.show({
          text: 'loading'
        })
        const params = this.params
        this.$http.get(this.$root.urlPath.MJK + '/wap/purchaseManage/getPurchaserManageList', {params: params}).then(function (res) {
          if (res.body.success) {
            this.$vux.loading.hide()
            if (!res.body.data.list > 0) {
              this.isScroll = true
              return
            }
            // this.list =
            this.list = this.list.concat(res.body.data.list)
          }
        }, function () {
          this.$vux.loading.hide()
        })
      },
      switchTabItem (index) {
        if (index === 0) {
          this.params.purchaseStatus = ''
        }
        if (index === 1) {
          this.params.purchaseStatus = 5
        }
        if (index === 2) {
          this.params.purchaseStatus = 7
        }
        if (index === 3) {
          this.params.purchaseStatus = 6
        }
        this.isScroll = false
        this.params.pageNum = 1
        this.list = []
        this.getList()
      },
      delPurchase (id) {
        var _this = this
        _this.$vux.confirm.show({
          content: '是否删除该求购单？',
          onCancel () {

          },
          onConfirm () {
            _this.$http.get(_this.$root.urlPath.MJK + '/wap/purchaseManage/deletePurchase?purchaseId=' + id).then(function (res) {
              if (res.body.success) {
                _this.list.forEach((item, index) => {
                  if (item.purchaseId === id) {
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
      detail (id, status, num) {
        if (status === 7) {
          this.$router.push({path: 'allot', query: {purchaseId: id, status: status}})
        } else {
          this.$router.push({path: 'enquiry', query: {purchaseId: id, status: status}})
        }
      },
      pullingUp () {
        if (this.isScroll) {
          return
        }
        this.params.pageNum++
        this.getList()
        // this.list = this.list.concat(this.list2)
      },
      scroll (pos) {
        console.log(pos)
      },
      scrollEnd (pos) {
        // console.log(pos)
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
    font-size: 16px
  }
  .manage .list-out{
    padding: 0.09rem 0.06rem;
    background: #eeeeee;
  }
  .manage .list{
    border-radius: 5px;
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
    display: block;
    margin-bottom: 0.05rem;
    font-size: 0.16rem;
  }
  .manage .list .adress {
    font-size: 0.14rem;
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
  .manage .member{
    display: block;
    height: 0.26rem;
    color: #FAC77C;
    font-size: 0.14rem
  }
  .manage .done {
    color: #fff;
    background: #1593ff
  }
  .manage .end{
    border: 1px solid #959595;
    color: #959595;
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
    background: #00a5f5 ;
    color: #fff
  }
  .switch .curr{
    background: #32b16c ;
    color: #fff;
  }

</style>
