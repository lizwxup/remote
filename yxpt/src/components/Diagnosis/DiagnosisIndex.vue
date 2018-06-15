<template>
     <div class="layout">
     <Card>
        <table-cont :columns="diagnosisTitle" :columsData="diagnosisData" :totalNum = 'totalData' :srcLink="diamsg"></table-cont>
     </Card>
        
    </div>
</template>
<script>
    import TableCont from '../Common/table.vue'
    export default {
        data () {
            return {
                isCollapsed:false,
                diagnosisData:[],
                totalData:1,
                diamsg:'/diamsg/',
                diagnosisTitle: [
                  {
                        title: '序号',
                        key: 'ic_id'
                  },
                  {
                        title: '姓名',
                        key: 'patient_name'
                  },
                 {
                        title: '性别',
                        key: 'gender',
                        render: (h, params) => {
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
                        title: '检查类型',
                        key: 'modality',
                        render: (h, params) => {
                           var itemData = ''
                            params.row.modality.map(function(item){
                               itemData = item 
                            })
                            return h('div', [
                                h('span', itemData),
                            ]);
                        }
                 },
                 {
                        title: '检查部位',
                        key: 'part',
                         render: (h, params) => {
                           var itemData = ''
                            params.row.part.map(function(item){
                               itemData = item 
                            })
                            return h('div', [
                                h('span', itemData),
                            ]);
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
                        title: '医院',
                        key: 'hospital'
                 },
                  {
                        title: '报告状态',
                        key: 'status',
                        render: (h, params) => {      
                              return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                }, '未发起'),
                            ]);
                       
                        }
                 },
                ]
            }
        },
        mounted(){
            var self = this
             const  diagnosisData = {
                 url:'/cs-server/v1/cs/case/noApply?pageNum='+1+'&pageSize='+10,
                 method:'get'
             }
             self.http(diagnosisData).then((res)=>{
                 if (res.data.code === 1) {
                    self.diagnosisData =res.data.data.list
                    self.totalData = res.data.data.total
                 } else {
                    self.$Message.warning(res.data.msg);   
                 }
                
            },(error)=>{  
               console.log(error)   
            })  
        },
        components:{
            TableCont
        }
    } 
</script>
