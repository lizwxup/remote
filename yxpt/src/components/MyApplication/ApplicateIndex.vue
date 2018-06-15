<template>
    <div class="layout"> 
        <search-time  v-on:imageDataSearchEvent = "showSearchApply"  :typeSel ="2" :shareCont="shareApplyCont"></search-time>         
        <Card>
        <table-cont :columns="applicateTitle"   v-on:sharePatient="getPatientAppplyDetail"  :columsData="applicateData"  :totalNum = "applicateTotle" :srcLink="detailSrc"></table-cont>
        </Card>
    </div>
</template>
<script>
import SearchTime from '../Common/SearchTime.vue'
import Format from '../../utils/dateFormat.js'
import TableCont from '../Common/table.vue'
    export default {
        data () {
            return {
                  detailSrc:'/apply/',
                  partsAll:'',
                  shareApplyCont:{},
                  applicateTitle: [
                  {
                        title: '标识号',
                        key: 'applyNo'
                  },
                  {
                        title: '姓名',
                        key: 'patient_name'
                  },
                 {
                        title: '性别',
                        key: 'gender',
                        render:(h,params)=>{
                           return h('div', [
                             h('span',  this.common.$gender(params.row.gender)),
                            ]);
                        } 

                 },
                 {
                        title: '年龄',
                        key: 'age',
                        render:(h,params)=>{
                            var unit= this.common.$age(params.row.age_unit)
                           return h('div', [
                             h('span', params.row.age+unit),
                            ]);
                        }   
                 },
                 {
                        title: '患者来源',
                        key: 'patient_source',
                        render: (h, params) => {
                           var sourceDesc,sourceType,patientType,patientSource =params.row.patient_source ;
                            if (patientSource === 1) {
                                 sourceType = 'warning'
                            } else if (patientSource === 2) {
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
                                }, this.common.$patientSources(patientSource,params.row.patient_type)),
                            ]);
                        }
                 },
                 {
                        title: '检查类型',
                        key: 'modality',
                        render: (h, params) => {
                        var itemData = []
                        params.row.modality.map(function(item){
                            itemData.push(item) 
                        })
                         return h('div', [
                            h('span', itemData.join('/')),
                        ]);
                        },
                        filters: [],
                        filterMultiple: false,
                        filterRemote:(value,row)=>{  
                            var self = this
                            self.applicateDate(1,10,self.$store.state.startTime,self.$store.state.endTime ,'',value[0],'','','')
                        }
                 },
                 {
                        title: '检查部位',
                        key: 'part',
                        render: (h, params) => {
                            var itemData = []
                            params.row.part.map(function(item){
                                itemData.push(item) 
                            })
                            return h('div', [
                                h('span', itemData.join('/')),
                            ]);
                        }, 
                       filters: [],
                       filterMultiple: false,
                       filterMethod (value, row) {
                           console.log(this.partsAll)
                       }
                 },
                 {
                        title: '报告状态',
                        key: 'report_status',
                        render: (h, params) => {
                            var sourceDesc,statusType;
                            if (params.row.report_status === 1 ) {
                                 sourceDesc = '未完成'
                                 statusType = 'green'   
                            } else if (params.row.report_status === 2 ) {
                                 sourceDesc = '已完成'
                                 statusType = '#8f7ee6'   
                            }else if (params.row.report_status === 3) {
                                 sourceDesc = '已打印'
                                 statusType = '#797979'   
                            }else if (params.row.report_status === 4) {
                                 sourceDesc = '已驳回'
                                 statusType = '#000'  
                            }
                            return h('div', [
                                h('Button', {
                                    props:{
                                        size: 'small'
                                    },
                                    style:{
                                        background:statusType,
                                        borderColor:statusType,
                                        color:'#fff'
                                    }
                                }, sourceDesc),
                            ]);
                        },
                        filters: [
                            {
                                label: '未完成',
                                value: 1
                            },
                            {
                                label: '已完成',
                                value: 2
                            },
                            {
                                 label: '已打印',
                                value: 3
                            },
                            {   
                                 label: '已驳回',
                                value: 4
                            }
                        ],
                       filterMultiple: false,
                       filterRemote: (value, row) =>{ 
                         var self = this
                          self.applicateDate(1,10, self.$store.state.startTime, self.$store.state.endTime ,value[0])
                        }
                 },
                 {
                        title: '检查日期',
                        key: 'exam_time',
                        render: (h, params) => {
                             return h('div', [
                            h('span', this.dateTransfer.transferDate(params.row.exam_time)),
                        ]);
                    }
                 },
                   {
                        title: '申请日期',
                        key: 'apply_time',
                        render: (h, params) => {
                         return h('div', [
                            h('span', this.dateTransfer.transferDate(params.row.apply_time)),
                        ]);
                    }
                 }
               

                ],
                 applicateData:[],
                 applicateTotle:1,
            };
        },
        components:{
            TableCont,
            SearchTime
        },
        methods:{
            applicateDate (num,numPage,startTime,endTime,reportData) {
                var self = this
                var appliSrc = {
                    url:'/cs-server/v1/cs/case/myApply',
                    method:'get'
                }
                var appliTime = {
                    pageNum:num,
                    pageSize:numPage,
                    startData:startTime,
                    endData:endTime,
                    reportStatus:reportData
                }
                self.http(appliSrc,appliTime).then((res)=>{
                    self.applicateData = res.data.data.list
                    self.applicateTotle = res.data.data.total
                },(error)=>{

                })
            },
            showSearchApply (cont) {
                var _this = this;
                _this.applicateData = cont   
            },
            getPatientAppplyDetail(contMsg){
                this.shareApplyCont = contMsg.list
                this.applicateTotle =  contMsg.total
            },
        },
        mounted() {
            this.applicateDate(1,10,new Date().getTime()-3600 * 1000 * 24,new Date().getTime(),'')
            this.partsAll = this.$store.state.getParts
            this.common.$transferFilterLabel(this.applicateTitle,this.$store.state.getParts,'6')  
            this.common.$transferFilterLabel(this.applicateTitle,this.$store.state.getModality,'5') 
            this.dock.$filterParts('content')
        }
    }
</script>
<style lang="less">
    
</style>