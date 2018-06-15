<template>
    <div style="padding:10px;">
        <Tabs :animated="false">
            <TabPane label="申请单">
              <application></application>
            </TabPane>
            <TabPane label="报告单">
                  <Layout>
                    <Sider hide-trigger class="Tree" id="Tree">
                       <Tree :data="reportData" :render="renderContent"></Tree>
                    </Sider>
                    <Layout>
                        <Content>
                            <Card class="Card">
                                <h4>患者信息</h4>
                                <table width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td class="tab_title">姓　　名：</td>
                                        <td class="tab_inp">
                                            <Input v-model="name" readonly class="Input">
                                            </Input>
                                        </td>
                                        <td class="tab_title">性　　别：</td>
                                        <td class="tab_inp">
                                            <Input v-model="sex" readonly class="Input">
                                            </Input>
                                        </td>
                                        <td class="tab_title">年　　龄：</td>
                                        <td class="tab_inp">
                                            <Input v-model="age" readonly class="Input">
                                            </Input>
                                        </td>
                                        <td class="tab_title">检查日期：</td>
                                        <td class="tab_inp">
                                            <Input v-model="addtime" readonly class="Input">
                                            </Input>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="tab_title">检查设备：</td>
                                        <td class="tab_inp">
                                            <Input v-model="equipment" readonly class="Input">
                                            </Input>
                                        </td>
                                        <td class="tab_title">检查部位：</td>
                                        <td class="tab_inp">
                                            <Input v-model="checkpoint" readonly class="Input">
                                            </Input>
                                        </td>
                                        <td class="tab_title">检查项目：</td>
                                        <td class="tab_inp">
                                            <Input v-model="insproject" readonly class="Input">
                                            </Input>
                                        </td>
                                        <td class="tab_title">
                                            <Checkbox v-model="single" disabled >是否增强</Checkbox>
                                        </td>
                                        <td class="tab_inp"></td>
                                    </tr>
                                </table>
                            </Card>
                            <Card class="Card" style="margin-top:15px;">
                                <h4>影像所见</h4>
                                <br>
                                <Input v-model="image" type="textarea" :rows="5" style="width:100%;">

                                </Input>
                            </Card>
                            <Card class="Card" style="margin-top:15px;">
                                <h4>印象</h4>
                                <br>
                                <Input v-model="diagnostic" type="textarea" :rows="5" style="width:100%;">

                                </Input>
                            </Card>
                            <Card class="Card" style="margin-top:15px;">
                                <h4><span class="spa"><Checkbox v-model="singleBg">阳性</Checkbox></span>报告信息</h4>
                                <br>
                                <table width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td class="tab_title">报告时间：</td>
                                        <td class="tab_inp"><Input v-model="reptime" readonly class="Input">

                                            </Input></td>
                                        <td class="tab_title">报告医生：</td>
                                        <td class="tab_inp"><Input v-model="repdoctor" readonly class="Input">

                                            </Input></td>
                                        <td class="tab_title">审核医生：</td>
                                        <td class="tab_inp"><Input v-model="reviewdoctor" readonly class="Input">
                                    </Input></td>
                                    </tr>
                                </table>
                            </Card>
                            <div class="btnitem">
                                <Button @click="modal1 = true">报告历史</Button>
                                  <Modal v-model="modal1" width="600">
                                    <p slot="header" style="color:#f60;text-align:left">
                                        <span>请选择报告模板的插入方式</span>
                                    </p>
                                    <div>
                                          <h4 style="padding-bottom:5px;">检查设备/部位/方法</h4>
                                          <Input v-model="repPart" disabled class="Input">

                                        </Input>
                                          <h4 style="padding-bottom:5px; padding-top:10px;">影像所见</h4>
                                          <Input v-model="image2" disabled type="textarea" :rows="3" style="width:100%;"></Input>
                                          <h4 style="padding-bottom:5px; padding-top:10px;">印象</h4>
                                          <Input v-model="diagnostic2" disabled type="textarea" :rows="3" style="width:100%;"></Input>
                                    </div>
                                    <div slot="footer">
                                        <Button type="success" class="ivu-btn ivu-btn-success" @click="del('1')">覆盖</Button>
                                        <Button type="success" class="ivu-btn ivu-btn-success" @click="del('2')">追加</Button>
                                        <Button @click="modal1= false">取消</Button>
                                    </div>
                                </Modal>
                                <i-button>报告打印</i-button>
                                <span class="spa">
                                    <i-button type="success">&nbsp;&nbsp;&nbsp;&nbsp;保　存&nbsp;&nbsp;&nbsp;&nbsp;</i-button>
                                    <i-button type="error">&nbsp;&nbsp;&nbsp;&nbsp;取　消&nbsp;&nbsp;&nbsp;&nbsp;</i-button>
                                </span>
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </TabPane>
            <TabPane label="影响浏览">标签三的内容</TabPane>
        </Tabs>
    </div>
</template>
<script>
import Application from '../MyApplication/ApplyContent.vue'
export default {
  data() {
    return {
      reportData:[
        { title: "公共模板",
          expand: true,
          children:[]
        }],
      value:"",
      name: '姓名',
      sex: '性别',
      age: '年龄',
      addtime: '检查日期',
      single:true,
      equipment: '检查设备',
      equipmentId:1,
      checkpoint: '检查部位',
      insproject: '检查项目',
      image: '影像所见',
      diagnostic: '诊断意见',
      singleBg: '',
      repPart:'',
      reptime:'报告时间',
      repdoctor:'报告医生',
      reviewdoctor:'审核医生',
      modal1: false,
      image2: "",
      diagnostic2: "",
      insproject: "",
      UserCont:{},
      userContList:[],
      equipmentId:1,
      expandPartId:[]
    };
  },
  methods: {
     del(id) {
       var self = this
       if (id === '1') {  //覆盖
           self.image   = self.image2
           self.diagnostic = self.diagnostic2
       }else {  //追加
           self.image   = self.image+self.image2
           self.diagnostic =  self.image+self.diagnostic2
       }
      this.modal1 = false  
    },
    renderContent (h,{ root, node, data }) {
        return h('span', {
                  style: {
                        display: 'inline-block',
                        width: '100%'
                    }
                }, [
                    h('span', [
                        h('Icon', {
                            props: {
                                type: 'ios-paper-outline'
                            },
                            style: {
                                marginRight: '8px'
                            }
                        }),
                        h('span', {
                           on: {
                              click: () => {
                                if (data.children === undefined ) {
                                    this.getDetailMessage(data)
                                 }
                             }
                            }
                        },data.title)
                    ]),
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight:'32px'
                        }
                    })
                ]);
    },
    getDetailMessage(data){
      var self = this
      self.modal1 = true
      self.repPart =data.modalityName+'/'+data.partName+'/'+data.methodName
      self.image2 = data.impression
      self.diagnostic2  = data.findings
    },
    getReportInformation(){
        var self = this;
        const getPersonInformation={
            url:'/ids-server/user/v1/report/?iraId='+self.$route.params.id,  ///ids-server/user/v1/report/?iraId=1  
            method:'get'
        };
        self.http(getPersonInformation).then((res)=>{
            var self = this;

            if (res.data.code === 1)
            {
                self.name =  res.data.data.name;
                if(res.data.data.gender == 1)
                {
                    self.sex =  '男'
                }else if(res.data.data.gender == 2)
                {
                    self.sex =  '女'
                }else
                {
                    self.sex =  '未知'
                }
                self.age = res.data.data.age
                if(res.data.data.ageUnit ==1)
                {
                    self.age = self.age +'岁'
                }else if(res.data.data.ageUnit ==2)
                {
                    self.age = self.age +'月'
                }else if(res.data.data.ageUnit ==3)
                {
                    self.age = self.age +'天'
                }else if(res.data.data.ageUnit ==4)
                {
                    self.age = self.age +'时'
                }


                self.addtime = self.timestampToTime(res.data.data.examTime)


                var checkList =  res.data.data.itemList;
                
               
                self.equipment=checkList[0].emy_name;
                self.equipmentId=checkList[0].emy_id;
                for(var i = 0;i<checkList.length;i++)
                {
                     self.expandPartId.push(checkList[i].ep_id)
                    if(i==0)
                    {
                        self.checkpoint = checkList[i].ep_name;
                        self.insproject = checkList[i].em_name;
                    }else
                    {
                        self.checkpoint = self.checkpoint +'/' + checkList[i].ep_name
                        self.insproject = self.insproject +'/' + checkList[i].em_name;

                    }
                }
                if(checkList[0].is_enhance == 2)
                {
                    self.single = true;
                }else
                {
                    self.single = false;
                }
                self.image =  res.data.data.findings+'sssssss'
                self.diagnostic =  res.data.data.impression
                if(res.data.data.reportTime == 0)
                {
                    self.reptime = ''
                }else
                {
                    self.reptime = self.timestampToTime(res.data.data.reportTime)
                }
                self.repdoctor =  res.data.data.reportDoctor;
                self.reviewdoctor = res.data.data.auditDoctor;
                if( res.data.data.isPositive == 2)
                {
                    self.singleBg = true;
                }else
                {
                    self.singleBg = false;
                }
                self.getTemplateData()
            } else {
                this.$Message.error(res.data.msg);
            }
        },(error)=>{
            console.log(error)
        });

    },
    getTemplateData(){
        var self = this
            const getTemplateUrl={
            url:'/rts-server/user/report/template?modalityId='+ self.equipmentId,
            method:'get'
        }
        self.http(getTemplateUrl).then(function(res){
            self.reportData.forEach(function(report,index){
                res.data.data.forEach(function(item,index){
                var obj={}
                if (self.contains(self.expandPartId,item.partId)) {
                      obj.expand = true
                }else {
                      obj.expand = false
                 }
                obj.partId = item.partId
                obj.title = item.title
                obj.children =  item.children
                report.children.push(obj)
                })
            }) 
        },(error)=>{
    })
    },
      //时间戳转换日期时间
      timestampToTime(timestamp) {
          var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
          var D = date.getDate() + ' ';
          var h = date.getHours() + ':';
          var m = date.getMinutes() + ':';
          var s = date.getSeconds();
          // return Y + M + D + h + m + s;//年月日时分秒
          return Y + M + D; //年月日
      },
     contains(arr, obj) {
        var i = arr.length;
        while (i--) {
            if (arr[i] === obj) {
            return true;
         }
        }
        return false;
    }
  },
  mounted() {
    this.getReportInformation(); 
    document.getElementById("Tree").style.height =document.documentElement.clientHeight - 70 + "px";
  },
  components:{
    Application
  }
};


</script>
<style lang="less">
    .Tree {
        background: #f8f8f9;
        overflow-y: auto;
    }
    .Card {
        margin: 0 10px;
        h4 {
            color: @default-color;
        }
        .tab_title{
            width: 5%;
            height: 50px;
            text-align: right;
        }
        .tab_inp{
            width: 20%;
            text-align: left;
            .Input {
            width: 70%;
            }
        }
    }
    .btnitem{
      margin: 15px 10px;
    }
    .spa{
        float: right;
    }
</style>
