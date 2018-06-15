<template>
    <div class="layout"> 
        <search-time :onSelect="selected"   v-on:imageDataSearchEvent = "showSearchCont" :typeSel="1" :shareCont="sharePatientCont"></search-time>     
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
                        key: 'applyNo',
                        width:180
                  },
                  {
                        title: '姓名',
                        key: 'patientName',
                        width:180
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
                            var sourceDesc,statusImgType ;
                            if (params.row.lifeStatus === 1) {
                                 sourceDesc = '待诊断'
                                 statusImgType = '#e24125'   
                            } else if (params.row.lifeStatus === 2 ) {
                                 sourceDesc = '写报告中'
                                 statusImgType = '#4d8fff'   
                            }else if (params.row.lifeStatus === 3) {
                                  sourceDesc = '待审核'
                                  statusImgType = '#ffaa1c'
                            }else if (params.row.lifeStatus === 4) {
                                 sourceDesc = '审核中'
                                 statusImgType = '#4d8fff'
                            }else if (params.row.lifeStatus === 5) {
                                 sourceDesc = '审核完成'
                                  statusImgType = '#8f7ee6'
                            }else if (params.row.lifeStatus === 6) {
                                 sourceDesc = '二级审核未完成'
                                  statusImgType ='green'  
                            }else if (params.row.lifeStatus === 7) {
                                 sourceDesc = '二级审核中'
                                 statusImgType = '#4d8fff'   
                            }else if (params.row.lifeStatus === 8) {
                                 sourceDesc = '二级审核完成'
                                 statusImgType = '#8f7ee6'  
                            }else if (params.row.lifeStatus === 9) {
                                 sourceDesc = '已打印'
                                 statusImgType = '#797979'   
                            }else if (params.row.lifeStatus === 10) {
                                 sourceDesc = '已驳回'
                                 statusImgType = '#000'  
                            }
                             return h('div', [
                                h('Button', {
                                    props: {
                                        size: 'small'
                                    },
                                    style:{
                                        background:statusImgType,
                                        borderColor:statusImgType,
                                        color:'#fff'
                                    }
                                }, sourceDesc),
                            ]);
                        },
                        filters: [
                            {
                                label: '待诊断',
                                value: 1
                            },
                            {
                                label: '写报告中',
                                value: 2
                            },
                            {
                                 label: '待审核',
                                value: 3
                            },
                            {   
                                 label: '审核中',
                                value: 4
                            },
                            {   
                                 label: '审核完成',
                                 value: 5
                            },
                            {   
                                 label: '二级审核未完成',
                                 value: 6
                            },
                            {   
                                 label: '二级审核中',
                                 value: 7
                            },
                            {   
                                 label: '二级审核完成',
                                 value: 8
                            },
                            {   
                                 label: '已打印',
                                 value: 9
                            },
                            {   
                                 label: '已驳回',
                                 value: 10
                            }
                        ],
                       filterMultiple: false,
                       filterRemote: (value, row) =>{ 
                        var self = this
                        self.getImageCloudData(1,10, self.$store.state.startTime , self.$store.state.endTime ,'','',value[0],'')
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
                        width:180,
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
            showSearchCont (contImageData) {
                var _this = this;
                console.log(contImageData)
                _this.imageData = contImageData.list  
                _this.totalNum =  contImageData.total
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
                    self.totalNum  = res.data.total; 
                   console.log(res)
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