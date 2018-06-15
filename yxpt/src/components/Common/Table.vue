<template>
   <div>
        <Table :columns="columns"  
               :data="columsData"
               :stripe = 'false'
               :border = 'false'
               @on-row-click = "handleSignal"
               @on-row-dblclick = "handleSelectionMsg" 
               :row-class-name="tableRowClassName"
               :no-filtered-data-text="filterString">
        </Table>
        <Page :total="totalNum" size="small" show-total></Page>
   </div>
           
</template>
<script>
    export default {
        props:['columns','columsData','totalNum','srcLink'],  
        data () {
            return {
                currentPage4:1,
                currentSelectIndex:0,
                filterString:''         
            }
        },
        methods:{
            handleSelectionMsg (row, event, column) { 
                //发起诊断端  跳转页面 diamsg/2 info    
                //发起之后的操作  跳转页面  case iraid
                var self = this,path;
                if (row.ic_id === undefined) { //我的诊室
                     path =row.ID 
                     self.$router.push({path:this.srcLink+path})
                } else {  //我的申请
                     path = row.ic_id   
                     self.$router.push({path:this.srcLink+path}) 
                }
                 //if  image 跳转到内页 iraId
                if (row.iraId != undefined) {
                    const goImageUrl ={
                        url:'/ids-server/user/v1/report/gate',
                        method:'post',
                        data:{
                          iraId:  row.iraId
                        }
                    }
                    self.http(goImageUrl).then((res)=>{
                        var imageData = res.data.data
                        if (imageData.code === 101 ) {
                            //进入待诊断页面
                            self.$router.push({path:'/report/'+row.iraId})
                         }else if (imageData.code === 102){
                            self.$router.push({path:'/report/'+row.iraId})
                            //进入可查看的页面
                         }else if (imageData.code === 104)   {
                            //进入审核报告模式成功
                            self.$router.push({path:'/report/'+row.iraId})
                         } else if (imageData.code === 103) {
                            //无权限查看
                            self.$Message.warning('无权限查看')
                         }
                        
                    },(error)=>{

                    })
                   
                }
               
               
            },
            tableRowClassName (row,index) {
                if (row.ID === undefined) {
                    if (row.applyNo === this.currentSelectIndex ) {
                        return 'demo-table-info-row';
                    }   
                } else {
                    if (row.ID === this.currentSelectIndex) {
                        return 'demo-table-info-row';
                    }    
                }
            },
            handleSignal(row, rowIndex){
                console.log(row.ID )
                if (row.ID === undefined) {
                    this.currentSelectIndex = row.applyNo  
                    this.$store.commit('selectIndex',{ID:row.applyNo})
                } else {
                    this.currentSelectIndex = row.ID
                    this.$store.commit('selectIndex',{ID:row.ID})
                }  
                this.$emit('sharePatient',row) 
                console.log(row)
                
           }
        }
    }
</script>
<style lang="less">
 .ivu-table .demo-table-info-row td {
     background-color: @table-select-bg;
  }
  .ivu-table-filter-list-single li:nth-child(1){
      display:none;
  }
</style>