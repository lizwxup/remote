<template>
    <div class="time-border">
         <Card :bordered="false" >
              <Row>
               <Col span="8">
                    <RadioGroup v-model="date" style="float:left;" @on-change="changeDate" >
                        <Radio label="today" style="margin-left:20px;">
                            <span>今天</span>
                        </Radio>
                        <Radio label="yest"  >
                            <span>昨天</span>
                        </Radio>
                        <Radio label="week">
                            <span>一周内</span>
                        </Radio>
                        <Radio label="dateRange" style="margin-right:15px;" >      
                              <DatePicker   @on-change="changeDateRange"  format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px">
                         </DatePicker>
                        </Radio>
                        <Icon type="refresh" size="20" class="time-loop"  color="#4f91ff" @click="refreshData"></Icon>
                    </RadioGroup>
               </Col>
               <Col span="7" offset="9">
                    <Input v-model="searchVal" icon="search" placeholder="姓名,标识号,检查类型,医院名称" color="#4f91ff" class="search-hos" style="width: 250px"  @on-enter="enterSearch" @on-click="searchMsg"></Input>
                    <Button type="info" icon="ios-printer-outline" style="margin-left:10px;" color="#4f91ff"  size="small" class="search-printer">打印</Button>
                    <Button type="info" icon="ios-cloud-download-outline" size="small" color="#4f91ff"  class="search-printer">导出</Button>
                    <Button type="info" icon="ios-redo" size="small" color="#4f91ff" class="search-printer" @click="shareMsg" >分享</Button>
              
               </Col>     
            </Row>
        </Card>
        <!--分享-->
        <Modal
        title="分享"
        v-model="share"
        width="400px"
        class-name="vertical-center-modal">
       <div>
             <ul class="s-desc" >
                <li>姓名:<span v-if="typeSel===1" >{{shareCont.patientName}}</span>
                        <span v-if="typeSel===2" >{{shareCont.patient_name}}</span></li>
                <li>性别:<span v-if="shareCont.gender === 1">女</span>
                        <span v-if="shareCont.gender === 2">男</span>
                        <span v-if="shareCont.gender === 3">未知</span>
                </li>
                <li>年龄:<span>{{shareCont.age}}</span></li>
                <li>设备:<span v-if="typeSel===1">{{shareCont.modalityName}}</span>
                        <span v-if="typeSel===2" v-for="item in shareCont.modality">{{item}}</span></li>
             </ul>
             <div class="s-content">
                <img :src="qrCode" alt="">
                <p>扫描上方二维码，即可分享影像报告</p>
             </div>
       </div>
       
    </Modal>
        
    </div>
    
</template>
<script>
import qrCode from  '../../../static/img/ercode.png'
    export default {
        //type： 1 影像大厅  2 我的申请  
        // shareCont : 分享的内容
        props:['typeSel','shareCont'],
        data () {
            return {
                date:'yest',
                startData:new Date().getTime()-3600 * 1000 * 24 ,
                endData:new Date().getTime(),
                searchVal:'',
                share:false,
                qrCode,
            }
        },
        methods:{
            shareMsg () {
                if (this.$store.state.currentSelectIndex === 0) {
                    this.$Message.warning('请选择要分享的信息');
                    this.share = false
                } else {
                    this.share = true
                }
            },
            //获取时间返回的数据
            changeDateRange (name){
                new Date(name[0]).getTime()
                new Date(name[1]).getTime()
                this.startData =  new Date(name[0]).getTime() 
                this.endData =  new Date(name[1]).getTime() 
                this.$store.state.startTime =  this.startData
                this.$store.state.endTime =  this.endData
                this.searchAjaxData(this.startData, this.endData,'')
            },
            //过滤时间
            changeDate  (name){
                const date = new Date();
                let timeStamp,endTim;
               if (name === 'today'){       
                     timeStamp = new Date(new Date(new Date().toLocaleDateString()).getTime()).getTime()
                     endTim = new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1;
                     this.startData=timeStamp      
                     this.endData=endTim
               } else if (name === 'week') {    
                     timeStamp =  date.getTime() - 3600 * 1000 * 24 * 7;
                     this.startData=timeStamp      
                     this.endData=new Date().getTime()
               } else if (name === 'yest') {
                     timeStamp = date.getTime() - 3600 * 1000 * 24 ; 
                     this.startData=timeStamp      
                     this.endData=new Date().getTime()
               } 
               this.$store.state.startTime =  this.startData
               this.$store.state.endTime =  this.endData
               console.log(this.$store.state.startTime )
               this.searchAjaxData(this.startData, this.endData,'')
            },
            enterSearch(){
                var _this = this
                if (  _this.searchVal ===  '') {
                     _this.searchVal = ''
                     _this.searchAjaxData(_this.startData,_this.endData,_this.searchVal )
                } else {
                    _this.searchMsg ()
                }
            },
            searchMsg () {
                var _this = this
                if (_this.searchVal === '') {
                    _this.$Message.warning('请输入分享的信息');
                } else {
                    _this.searchAjaxData(_this.startData,_this.endData,_this.searchVal)
                }
            },
            searchAjaxData(startTime,endTime,content) {
                var self = this
                if (self.typeSel === 1 ) {
                      const imageCloudUrl = {
                        url:'/ids-server/user/v1/report/square?startTime='+startTime+'&endTime='+endTime+'&content='+content+'&pageNum=1&pageSize=10',
                        method:"get"
                }
                self.http(imageCloudUrl).then((resp)=>{
                    self.$emit('imageDataSearchEvent',resp.data.data)   
                })    
                } else if (self.typeSel=== 2) {
                   const applyUrl = {
                        url:'/cs-server/v1/cs/case/myApply?startData='+startTime+'&endData='+endTime+'&value='+content+'&pageNum=1&pageSize=10',
                        method:"get"
                   }
                   self.http(applyUrl).then((resp)=>{
                      self.$emit('imageDataSearchEvent',resp.data.data)   
                   })  
                } 
            },
            refreshData () {
                var self = this
                self.searchAjaxData(self.startData,self.endData,'')
            }
        },
       mounted(){
            this.$store.state.startTime =  this.startData
            this.$store.state.endTime =  this.endData
           //console.log(this.sharePatientCont)
       }
    }
</script>
<style lang="less">
    .time-border{
        margin:10px 0 10px 0;
    }
    .search-printer{
        i{
            color:@iconColor
        }
        &:hover{
            color:@default-color;
        }
        color:@default-color;
        font-weight:bold;
     }
    .search-hos{
        i{
            color:@iconColor 
        }
        .ivu-input{
            background:@default-input-bg;
            color:@ccc-color;
            border:0px; 
            border-radius:5px;
        }
    }
    .s-desc{
        display:flex;
        justify-content:space-between;
        span{
          color:@black-color;
          font-weight:bold;
        }
    }
    .s-content{
        text-align:center;
        margin-top:20px;
        p{
            margin-top:10px;  
        }
  
    }
    .time-loop{
       margin-left:5px;height:20px;vertical-align:middle     
    }
</style>