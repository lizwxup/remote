<template>
    <div class="layout"> 
        <search-time :onSelect="selected"   v-on:imageDataSearchEvent = "showSearchCont"  :type="1" :shareCont="sharePatientCont"></search-time>     
        <Card>
            <table-cont :columns="imageTitle" :columsData="imageData"   
            :totalNum = "totalNum" 
            :srcLink="detailSrc"
            v-on:sharePatient="getPatientDetail"></table-cont>
        </Card>
    </div>
</template>
<script>
import TableCont from '../Common/table.vue'
import Format from '../../utils/dateFormat.js'
import SearchTime from '../Common/SearchTime.vue'
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
    export default {
        data () {
            return {
                  detailSrc:'/detail/',
                  totalNum:1,
                  selected:false,
                  sharePatientCont:{},
                  imageTitle: [
                  {
                        title: '标识号',
                        key: 'applyNo'
                  },
                  {
                        title: '姓名',
                        key: 'patientName'
                  },
                 {
                        title: '性别',
                        key: 'gender',
                        render:(h,params)=>{
                          return h('div', [
                             h('span', {
                                }, this.common.$gender(params.row.gender)),
                            ]);
                        }   
                 },
                 {
                        title: '年龄',
                        key: 'age',
                        render:(h,params)=>{
                          var unit= this.common.$age(params.row.ageUnit)
                           return h('div', [
                             h('span', params.row.age+unit),
                            ]);
                        }     
                 },
                 {
                        title: '患者来源',
                        key: 'patientSource',
                        render: (h, params) => {
                            var sourceDesc,sourceType,patientType,patientSource = params.row.patientSource  ;
                            if (patientSource === 1) {
                                 sourceType = 'warning'
                            }else if (patientSource === 2) {
                                 sourceType = 'primary'
                            }else if (patientSource === 3) {
                                 sourceType = 'success'
                            }else if (patientSource === 4) {
                                 sourceType = 'content'
                            }
                             return h('div', [
                                h('Button', {
                                    props: {
                                        type: sourceType,
                                        size: 'small'
                                    },
                                }, this.common.$patientSources(patientSource,params.row.patientType)),
                            ]);
                        }
                    },
                    {
                        title: '检查类型',
                        key: 'modalityName',
                        filters: [],
                        filterMultiple: false,
                        filterRemote:(value,row)=>{  
                            var self = this
                            self.getImageCloudData(1,10,self.$store.state.startTime,self.$store.state.endTime ,'',value[0],'','','')
                        }
                 },
                 {
                    title: '检查部位',
                    key: 'parts',
                    render: (h, params) => {
                        var itemData = []
                        params.row.parts.map(function(item){
                            itemData.push(item.partName) 
                        })
                        return h('div', [
                            h('span', itemData.join('/')),
                        ]);
                    }, 
                    filters:[],
                    filterMultiple:false,
                    filterRemote: (value, row) =>{ 
                       var self = this
                        self.getImageCloudData(1,10, self.$store.state.startTime , self.$store.state.endTime ,value[0],'','','','')
                    }
                 },
                 {
                        title: '报告状态',
                        key: 'lifeStatus',
                        render: (h, params) => {
                            var sourceDesc,statusType ;
                            if (params.row.lifeStatus === 1) {
                                 sourceDesc = '待诊断'
                                 statusType = 'error'   
                            } else if (params.row.lifeStatus === 2 || params.row.lifeStatus === 7) {
                                 sourceDesc = '操作中'
                                 statusType = 'primary'   
                            }else if (params.row.lifeStatus === 3) {
                                  sourceDesc = '待审核'
                                  statusType = 'warning'
                            }else if (params.row.lifeStatus === 4) {
                                 sourceDesc = '审核中'
                                 statusType = 'warning'
                            }else if (params.row.lifeStatus === 5 || params.row.lifeStatus === 8) {
                                 sourceDesc = '审核完成'
                                  statusType = 'success'
                            }else if (params.row.lifeStatus === 6) {
                                 sourceDesc = '超时'
                            }else if (params.row.lifeStatus === 9) {
                                 sourceDesc = '已打印'
                                 statusType = 'content'   
                            }else if (params.row.lifeStatus === 10) {
                                 sourceDesc = '驳回'
                                 statusType = 'content'  
                            }
                             return h('div', [
                                h('Button', {
                                    props: {
                                        type: statusType,
                                        size: 'small'
                                    },
                                }, sourceDesc),
                            ]);
                        },
                        filters: [
                            {
                                label: '待诊断',
                                value: 1
                            },
                            {
                                label: '待审核',
                                value: 3
                            },
                            {
                                 label: '已完成',
                                value: 5
                            },
                            {   
                                 label: '已打印',
                                value: 4
                            },
                            {   
                                 label: '操作中',
                                 value: 2
                            }
                        ],
                       filterMultiple: false,
                       filterMethod (value, row) {
                            if (value === 1) {
                                return row.lifeStatus === 1
                            } else if (value === 2) {
                                return row.lifeStatus ===2
                            }else if (value === 3) {
                                return row.lifeStatus ===3
                            }else if (value === 4) {
                                return row.lifeStatus ===4
                            }else if (value === 5) {
                                return row.lifeStatus ===5
                            }
                        }
                 },
                 {
                       title: '检查日期',
                       key: 'examTime',
                       render: (h, params) => {
                        return h('div', [
                            h('span', this.dateTransfer.transferDate(params.row.examTime)),
                        ]);
                    }
                 },
                 {
                        title: '申请日期',
                        key: 'applyTime',
                        render: (h, params) => {
                        return h('div',[
                            h('span',this.dateTransfer.transferDate(params.row.applyTime)),
                        ]);
                    }
                 },
                 {
                        title: '医院',
                        key: 'oName'
                 }
                ],
                 imageData:[],
                 getParts:[]
            };
        },
        mounted(){
            var self = this,flag = false;
            self.getPartsUrl()
            self.getModalityUrl()
              this.$nextTick(function () {
                 this.common.$transferFilterLabel(this.imageTitle,this.$store.state.getModality,'5')
                  this.common.$transferFilterLabel(this.imageTitle,this.$store.state.getParts,'6')
            })
        },
        updated: function () {
            this.$nextTick(function () {
                 this.common.$transferFilterLabel(this.imageTitle,this.$store.state.getModality,'5')
                 this.common.$transferFilterLabel(this.imageTitle,this.$store.state.getParts,'6')
            })
        },
        methods:{
            ...mapActions({//触发异步操作
                getPartsUrl:'getParts',
                getModalityUrl:"getModality"
            }),
            //   getPartsUrl(val){
            //         return this.$store.dispatch('getParts')
            //  },
             //搜索内容
            showSearchCont (contData) {
                var _this = this;
                console.log(contData)
                _this.imageData = contData   
            },
            getPatientDetail(contMsg){
                this.sharePatientCont = contMsg
            },
            //获取数据影像大厅的数据列表
            getImageCloudData (num,numPage,startTime,endTime,part,modality,status,content) {
                var self = this;
                const imageUrlPart = {
                    url:'/ids-server/user/v1/report/square',
                    method:'get'
                }
                var params = {
                    'pageNum':num,
                    'pageSize':numPage,
                    'startTime':startTime,
                    'endTime':endTime,
                    'part':part,
                    'modality':modality,
                    'status':status,
                }
               self.http(imageUrlPart,params).then((res)=>{
                    var resData = res.data.data;
                    self.imageData = resData.list;
                    self.totalNum  = resData.total; 
                },(error)=>{
                    alert('错误')
                })
              //return  self.imageData
            }
        },
        watch:{
            imageCloudData: function(a, b) {  
                console.log("监听数据a&&b：" + a);  
            }  
        },
        computed:{
            imageCloudData() {  
                return this.$store.state.imageCloudData;  
            }         
        },
        created(){
            var self = this,flag = false;
            this.getImageCloudData (1,10,new Date().getTime()-3600 * 1000 * 24,new Date().getTime(),'','','','')      
        },
        components:{
            TableCont,
            SearchTime
        }
    }
</script>
<style lang="less">
    
</style>