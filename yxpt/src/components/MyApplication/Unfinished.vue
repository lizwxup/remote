
<template>
    <div class="layout" :style="{padding:diaFlag === 'dia'?'0px':'20px'}">
        <Layout :style="{minHeight: '100vh'}">
            <div >
                <Content >
                    <Tabs :animated="false" class="default-body-bg">
                        <TabPane label="申请单">
                            <Card style="margin-top: 10px">
                                <div style="width: 100%">
                                    <!--<div style="height: 20px;margin-top: 10px;float: left;width: 5px;margin-right: 10px;" class="defaultBg"></div>-->
                                    <div style="line-height: 40px;font-size: 14px;" class="defaultColor">患者信息</div>

                                    <div style="margin-top: 10px">
                                        <table width="100%" class="CSSearchTbl" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td class="tdRight">姓名:</td>
                                                <td class="tdLeft"><Input   :disabled="disabled" v-model="diagnosisData.name"  class="inputStyle s_parts"></Input></td>
                                                <td class="tdRight">性别:</td>
                                                <td class="tdLeft">
                                                    <Select v-model="selSex"  :disabled="disabled" style="width:150px">
                                                        <Option v-for="item in gendarList" :value="item.value" :key="item.value" >{{ item.label}}</Option>
                                                    </Select>
                                                </td>
                                                <td class="tdRight">年龄:</td>
                                                <td class="tdLeft">
                                                    <!--<Select v-model="selAge" style="width:90px">
                                                        <Option v-for="item in ageList" v-model="item.value" :key="item.value">{{ item.label}}</Option>
                                                    </Select> -->
                                                      <InputNumber v-model="age" :disabled="disabled" class="numberAge"></InputNumber>
                                                    <Select v-model="selTimeType"  :disabled="disabled" style="width:60px">
                                                        <Option v-for="item in timeTypeList" :disabled="disabled" :value="item.value" :key="item.value">{{ item.label}}</Option>
                                                    </Select>
                                                </td>
                                                <td class="tdRight">门诊号:</td>
                                                <td class="tdLeft"><Input v-model="diagnosisData.clinic_no"  :disabled="disabled" class="inputStyle s_parts"></Input></td>
                                                <td class="tdRight">住院号:</td>
                                                <td class="tdLeft"><Input v-model="diagnosisData.hospital_no"  :disabled="disabled" class="inputStyle s_parts"></Input></td>
                                            </tr>
                                            <tr>
                                                <td class="tdRight">床位号:</td>
                                                <td class="tdLeft"><Input v-model="diagnosisData.bed_no"   :disabled="disabled" class="inputStyle s_parts"></Input></td>
                                                <td class="tdRight">科室:</td>
                                                <td class="tdLeft"><Input  v-model="diagnosisData.udt_id"  :disabled="disabled" class="inputStyle s_parts"></Input></td>
                                                <td class="tdRight">患者来源:</td>
                                                <td class="tdLeft">
                                                    <Select v-model="selSource"  :disabled="disabled" style="width:150px">
                                                        <Option v-for="item in sourceList" :value="item.value" :key="item.value">{{ item.label}}</Option>
                                                    </Select>
                                                </td>
                                                <td class="tdRight">是否急诊:</td>
                                                <td class="tdLeft">
                                                    <Select v-model="selIsEmergency" :disabled="disabled" style="width:150px">
                                                        <Option v-for="item in yesOrNo" :value="item.value" :key="item.value">{{ item.label}}</Option>
                                                    </Select>
                                                </td>
                                                <td class="tdRight">检查日期:</td>
                                                <td class="tdLeft">
                                                    <Col span="12">
                                                    <DatePicker type="date" :disabled="disabled" v-model="checkTime"  placeholder="Select date" class="date" ></DatePicker>
                                                    </Col>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="tdRight">身高:</td>
                                                <td class="tdLeft"><Input class="s_parts"  :disabled="disabled" v-model="diagnosisData.stature"style="width: 120px"></Input><span>&nbsp&nbspcm</span></td>
                                                <td class="tdRight">体重:</td>
                                                <td class="tdLeft"><Input class="s_parts"  :disabled="disabled"  v-model="diagnosisData.weight" style="width: 120px"></Input><span>&nbsp&nbspkg</span></td>
                                                <td class="tdRight">婚姻状况:</td>
                                                <td class="tdLeft">
                                                    <Select v-model="selMarriage"  :disabled="disabled" style="width:150px">
                                                        <Option v-for="item in marriageList" :value="item.value" :key="item.value">{{item.label}}</Option>
                                                    </Select>
                                                </td>
                                                <td class="tdRight">联系方式:</td>
                                                <td class="tdLeft"><Input  :disabled="disabled"  v-model="diagnosisData.mobile" class="inputStyle s_parts"></Input></td>
                                                <td class="tdRight" v-if="diaFlag === 'dia'">身份证号:</td>
                                                <td class="tdLeft" v-if="diaFlag === 'dia'"><Input  :disabled="disabled" class="inputStyle s_parts" v-model="diagnosisData.id_card"></Input></td>
                                            </tr>
                                            <tr v-if="diaFlag === 'dia'">
                                                <td class="tdRight">家庭地址:</td>
                                                <td class="tdLeft"><Input v-model="diagnosisData.family_address"  :disabled="disabled" class="s_parts"></Input></td>
                                                  
                                            </tr>
                                        </table>
                                    </div>

                                </div>
                            </Card >
                            <Card style="margin-top: 10px">
                                <div style="width: 100%;">
                                    <!--<div style="height: 20px;margin-top: 10px;float: left;width: 5px;margin-right: 10px;" class="defaultBg"></div>-->
                                    <div style="line-height: 40px;font-size: 14px;" class="defaultColor">检查类型</div>

                                    <div style="margin-top: 10px">
                                        
                                         <ul v-for="(item,index) in itemList"
                                                :key="index" 
                                                class="partsmethods">
                                                <li>设备:{{item.emy_name}}</li>
                                                <li>部位:{{item.ep_name}} </li>
                                                <li style="width:18%">检查方法: {{item.em_name}}</li><!--设备id-->
                                                <!--<li>增强：<span v-if="item.is_enhance === 1 ">否</span><span v-else>是</span></li>-->
                                                <Button  v-if="diaFlag === 'dia'" style="padding:3px;" @click="deleteMethods(index)">删除</Button>
                                          </ul> 
                                          <table width="100%" class="CSSearchTbl" cellpadding="0" cellspacing="0">
                                            <tr v-if="checkEquip && diaFlag === 'dia' ">
                                                <td class="tdRight">检查设备:</td>
                                                <td class="tdLeft">
                                                    <Select v-model="selCheckType"  :disabled="disabled" style="width:150px" @on-change="checkTypeChange">
                                                        <Option v-for="item in Modality"   v-model="item.name" :key="item.name">{{ item.name}}</Option>
                                                    </Select>
                                                    <span v-for="item in dicomModality"  class="font-14" style="color:#ccc">{{item}}</span>
                                                </td>
                                                <td class="tdRight">检查部位:</td>
                                                <td class="tdLeft">
                                                    <Select v-model="selCheckBody"  :disabled="disabled" style="width:150px" @on-change="checkpartsChange">
                                                        <Option v-for="item in checkBodyList" v-model="item.name" :key="item.name">{{ item.name}}</Option>
                                                    </Select>
                                                    <span v-for="item in dicomPart">{{item}}</span>
                                                </td>
                                                <td class="tdRight">检查方法:</td>
                                                <td class="tdLeft">
                                                    <Select v-model="selCheckItem"  :disabled="disabled" style="width:150px" @on-change="checkMethodsChange">
                                                        <Option v-for="item in checkItemList" v-model="item.name" :key="item.name">{{ item.name}}</Option>
                                                    </Select>
                                                  
                                                </td>                                               
                                            </tr>
                                                                           
                                        </table>
                                          <Button   v-if="!checkEquip && diaFlag === 'dia'" @click="addParts" style="margin-left:20px;">增加部位</Button>
                                          <Button   v-if="checkEquip && diaFlag === 'dia' " @click="addSelectParts" style="margin-left:20px;">确定添加信息</Button>
                                    </div>
                                </div>
                            </Card>
                            <Card style="margin-top: 10px">
                             <div style="width: 100%;">
                                <div style="line-height: 40px;font-size: 14px;" class="defaultColor">检查信息</div>
                                 <table width="100%" class="CSSearchTbl" cellpadding="0" cellspacing="0">
                                 <tr>
                                    <td class="tdRight">发起医师:</td>
                                    <td class="tdLeft"><Input :disabled="disabled"  class="inputStyle s_parts"></Input></td>
                                    <td class="tdRight">技师:</td>
                                    <td class="tdLeft"><Input :disabled="disabled"  v-model="diagnosisData.technician"  class="inputStyle s_parts"></Input></td>
                                    <td class="tdRight">检查号:</td>
                                    <td class="tdLeft"><Input :disabled="disabled"  v-model="diagnosisData.exam_no" class="inputStyle s_parts"></Input></td>
                                    <td class="tdRight">影像号:</td>
                                    <td class="tdLeft"><Input :disabled="disabled"  v-model="diagnosisData.film_no" class="inputStyle s_parts"></Input></td>
                                    <td class="tdRight">是否增强:</td>
                                    <td class="tdLeft">
                                        <Select v-model="selIsBigger"  :disabled="disabled" style="width:150px">
                                            <Option v-for="item in yesOrNo" v-model="item.value" :key="item.value">{{ item.label}}</Option>
                                        </Select>
                                    </td>
                                  </tr>
                                  </table>
                               </div>
                            </Card>
                            <Card style="margin-top: 10px">
                                <div style="width: 100%;">
                                    <!--<div style="height: 20px;margin-top: 10px;float: left;width: 5px;margin-right: 10px;" class="defaultBg"></div>-->
                                    <div style="line-height: 40px;font-size: 14px;" class="defaultColor">其他信息</div>
                                    <tr>
                                        <td class="tdRight">主诉:</td>
                                        <td class="tdLeft"><Input  :disabled="disabled"   v-model="diagnosisData.complained" type="textarea" placeholder="请输入主诉" class="other_parts"/></td>
                                    </tr>
                                    <tr>
                                        <td class="tdRight">病史:</td>
                                        <td class="tdLeft"><Input  :disabled="disabled"  type="textarea"  v-model="diagnosisData.medical_history" placeholder="请输入病史" class="other_parts"/></td>
                                    </tr>
                                    <tr>
                                        <td class="tdRight">其他说明:</td>
                                        <td class="tdLeft"><Input  :disabled="disabled"  type="textarea" v-model="diagnosisData.clinicalImpression" placeholder="请输入内容" class="other_parts"/></td>
                                    </tr>
                                    <tr v-if="diaFlag === 'dia'" class="imgScan">
                                        <td class="tdRight">附件:</td>
                                        <Upload action="http://49.4.9.162:8080/upload-server/v1/upload/cass/attachment"
                                                :show-upload-list="false"
                                                :data="caseIdNum"
                                                :on-success="handleSuccess"
                                                 multiple
                                                :format="['jpg','jpeg','png','dcm']"
                                                :headers="header"
                                                :max-size="10240"
                                                :name="attachName" 
                                                :on-exceeded-size="handleMaxSize">
                                            <Button type="ghost" >点击上传（图片不超过10M）</Button>
                                        </Upload>
                                         <Modal title="图片预览" v-model="visible" style="height:100%;">
                                            <img :src="imgName" v-if="visible" style="width: 100%">
                                        </Modal>
                                    </tr>
                                    <tr v-if="diaFlag === 'dia'">
                                        <td class="tdRight"></td>
                                        <td class="tdLeft">
                                           <div class="otherMoreUpload" style="position:relative;"
                                                v-if="dcmImg.length!=0" v-for="item in dcmImg " :key="item.key"  >
                                                <img :src="item.path" width="120px" height="120px" @click="handleView(item.path)"/>
                                                <span class="con-close" @click="closeImg(item.icea_id)">X</span>
                                            </div> 
                                       </td>
                                    </tr>
                                    <tr v-if="diaFlag != 'dia'">
                                         <td class="tdRight">附件:</td>
                                         <td class="tdLeft">
                                           <div class="otherMoreUpload" style="position:relative;"
                                                 v-if="dcmImg.length!=0"   v-for="item in dcmImg " :key="item.key"  >
                                                <img :src="item.path" width="120px" height="120px" @click="handleView(item.path)"/>
                                            </div>
                                       </td>
                                    </tr>
                                   <tr v-if="diagnosisData.isReject != 1">
                                        <td class="tdRight" style="color: red">驳回原因:</td>
                                        <td class="tdLeft"><Input  style="color: red;" v-model="diagnosisData.rejectReason" type="textarea" :disabled="disabled" placeholder="驳回原因" class="other_parts"/></td>
                                    </tr>
                                    <div v-if="diagnosisData.isReject != 1" style="text-align: center;margin-top: 20px;width: 100%;padding:10px;">
                                        <td class="tdRight">驳回医生:</td>
                                        <td class="tdLeft"><Input v-model="diagnosisData.rejectDoctor"  :disabled="disabled" class="inputStyle s_parts"></Input></td>
                                        <td class="tdRight">驳回时间:</td>
                                        <td class="tdLeft"><Input v-model="diagnosisData.rejectTime" :disabled="disabled" class="inputStyle s_parts"></Input></td>
                                    </div>
                                </div>
                                <div style="text-align: center;margin-top: 20px;width: 100%">
                                    <Button type="primary" v-if="diaFlag === 'dia'" @click="goToDiagnosis(1)">发起诊断</Button>
                                    <Button type="primary" v-if="diaFlag !='dia'" @click="goBack">返回</Button>
                                    <Button type="primary" v-if="diaFlag === 'dia'" @click="cancelMsg = true">取消</Button>
                                    <Button type="primary" v-if="diaFlag === 'dia'" @click="goToDiagnosis(0)">保存</Button>
                                </div>
                            </Card>
                        </TabPane>
                        <TabPane label="影像浏览">影像浏览</TabPane>
                    </Tabs>
                     <Modal
                        v-model="cancelMsg"
                        title="提示"
                        @on-ok="cancelOk"
                        @on-cancel="cancelMsg=false">
                       取消后当前信息不会被保留，您确定要取消吗？
                    </Modal>
                    
                </Content>
            </div>
        </Layout>
    </div>
</template>
<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
    export default {
        props:['diaFlag'],
        data () {
            return {
                selSex: 0,
                visible:false,
                imgName: '',
                caseIdNum:{
                    caseId:2
                },
                age:2,
                disabled:true,
                cancelMsg:false,
                attachName:'attachment',
                header:{
                     systemId:'2',
                     platform:'2',
                     uuid:window.sessionStorage.getItem('uuid'),
                     token:window.sessionStorage.getItem('token')
                },
                diagnosisData:{
                    name:'1'
                },
                dcmImg:[],
                ageList: [
                    {
                        value: '001',
                        label: '1'
                    },
                    {
                        value: '002',
                        label: '2'
                    },
                    {
                        value: '003',
                        label: '3'
                    },
                    {
                        value: '004',
                        label: '4'
                    }
                ],
                selAge: '001',
                timeTypeList: [
                    {
                        value: 1,
                        label: '岁'
                    },
                    {
                        value: 2,
                        label: '月'
                    },
                    {
                        value: 3,
                        label: '天'
                    },
                    {
                        value: 4,
                        label: '时'
                    }
                ],
                dicomModality:[],
                dicomPart:[],
                selTimeType: '1',
                sourceList: [
                    {
                        value:1,
                        label: '门诊'
                    },
                    {
                        value: 2,
                        label: '体检'
                    },
                    {
                        value: 3,
                        label: '住院'
                    },
                    {
                        value: 4,
                        label: '转院'
                    }
                ],
                selSource: '1',
                selIsEmergency: '1',
                selMarriage: '1',
                checkTime:"",
                selCheckType: '001',
                checkBodyList: [],
                modalityId:'',
                partId:'',
                itemList:[],
                methodsId:[],
                selCheckBody: '',
                checkItemList: [],
                selCheckItem: '',
                selIsBigger: '1',
                checkEquip:false
            }
        },
        methods:{
              ...mapActions({//触发异步操作
                  getData:'getParts',
                  getModalityUrl:"getModality"
              }),
              // getData:function () {
                //    this.$store.dispatch('getNavs')
                // 
                cancelOk () {
                    this.$router.push('/index/diagnosis')
                },
                closeImg (iceaId) {
                    //console.log('关闭图片')
                    var  self = this
                    const closeImgUrl = {
                        url:'/cs-server/v1/cs/case',
                        method:'delete'
                    }
                    var deleteParams = {
                        caseId:this.caseIdNum.caseId,
                        iceaId:iceaId
                    }
                    this.http(closeImgUrl,deleteParams).then((res)=>{
                       if (res.data.code != 1) {
                            alert(res.data.msg)
                       } else {
                          self.getDiagnosisData()
                       }
                    },(error)=>{
                        console.log(error)
                    })
                },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
                handleView (name) {
                    this.imgName = name;
                    this.visible = true;
                },  
                handleSuccess (res, file) {
                    var attachMent = {}
                    attachMent.path = res.data.path
                    attachMent.icea_id = res.data.icea_id
                    this.dcmImg.push(attachMent)
                },
                handleMaxSize () {
                    this.$Notice.warning({
                    title: '超出了最大的限度',
                    desc: '文件' + file.name + '不能超过10M'
                 });
                }, 
                getDiagnosisData () {
                    var self = this,diagnosisData,diaParams;
                    console.log(self.$route)
                    if (self.$route.name === 'diamsg') { 
                        diagnosisData = {
                            url:'/cs-server/v1/cs/case/noApply/info',  //发起诊断 caseId
                            method:'get'
                        }
                        diaParams ={
                            caseId:this.$route.params.id
                        }
                    } else {
                        diagnosisData = {
                            url:'/cs-server/v1/cs/case',  //我的申请  报告大厅 iraID
                            method:'get'
                        }
                        diaParams = {
                           iraId: this.$route.params.id
                        }
                    }                
                    this.http(diagnosisData,diaParams).then((res)=>{
                       var allData = res.data.data ;
                        self.diagnosisData = allData.caseInfo
                        self.dcmImg=allData.attachmentList
                        self.dicomModality = allData.modality
                        self.dicomPart = allData.part
                        self.itemList =  allData.itemList
                        self.itemList.forEach(function(item,index){
                           self.methodsId.push(item.ei_id)
                        })
                        self.selMarriage =allData.caseInfo.marital_status
                        self.selSex =  allData.caseInfo.gender
                        self.selIsEmergency = allData.caseInfo.patient_type
                        self.checkTime =self.dateTransfer.transDate(allData.caseInfo.exam_time)
                        self.age =allData.caseInfo.age
                        self.selTimeType = allData.caseInfo.age_unit
                        self.selSource = allData.caseInfo.patient_source
                        self.diagnosisData.rejectDoctor = allData.rejectDoctor
                        self.diagnosisData.rejectReason = allData.rejectReason
                        self.diagnosisData.rejectTime = self.dateTransfer.transDate(allData.rejectTime)
                        self.diagnosisData.isReject = allData.isReject
                    },(error)=>{

                    })
                 },
                 checkTypeChange(name){
                     var _this = this
                     this.$store.state.getModality.forEach(function(item,index){
                        if (name === item.name ) {
                             _this.modalityId = item.id
                             _this.selCheckBody = ''
                             _this.selCheckItem = ''
                             _this.getModalityParts(_this.modalityId)
                        }
                    })
                 },
                 checkpartsChange(name){
                    var _this = this
                    _this.checkBodyList.forEach(function(item,index){
                         if (name===item.name) {
                            _this.partId = item.id   
                            _this.selCheckItem = '' 
                            _this.getDiagnosisDataMethods(_this.modalityId, _this.partId)                   
                         }  
                    })      
                 },  
                 checkMethodsChange(name) {
                     var _this = this
                    _this.checkItemList.forEach(function(item,index){
                         if (name===item.name) {
                            _this.methodsId.push(item.edId)          
                         } 
                       console.log(_this.methodsId) 
                    })  
                 },
                 addSelectParts(name){
                    if (this.selCheckItem === '') {
                         this.$Message.warning('请选择内容');
                         return false;
                    }
                    var _this = this
                    if (_this.itemList[0].emy_id != _this.modalityId){  //总体的设备
                         _this.methodsId = []
                         _this.itemList = []
                         _this.checkItemList.forEach(function(item,index){
                         if (_this.selCheckItem===item.name) {
                             _this.methodsId.push(item.edId)  
                         } 
                     })
                    }
                    var obj={
                        em_id:_this.methodsId,
                        em_name:_this.selCheckItem,
                        emy_id: _this.modalityId,
                        emy_name:_this.selCheckType,
                        ep_id: _this.partId,
                        ep_name:_this.selCheckBody
                    }
                    _this.itemList.push(obj)
                    _this.checkEquip = false
                 },
                 getModalityParts(modalityId){
                    var self = this
                    const mPartsUrl =  {
                        url:'/eds-server/v1/dict/exam/modality/part',
                        method:'get'
                    } 
                    this.http(mPartsUrl,{'modalityId':modalityId}).then((res)=>{
                        self.checkBodyList = res.data.data
                    })
                 },
                 getDiagnosisDataMethods(modalityId,partId){
                    var self = this
                    const mPartsUrl =  {
                        url:'/eds-server/v1/dict/exam/modality/part/method',
                        method:'get'
                    } 
                    this.http(mPartsUrl,{'modalityId':modalityId,'partId':partId}).then((res)=>{
                        self.checkItemList = res.data.data
                    })
                 },
                 //删除部位
                 deleteMethods(index){
                     this.itemList.splice(index,1);
                     var self = this
                     this.itemList.forEach(function(item,index){
                        self.methodsId.push(item.ei_id)  
                     })
                 },
                 addParts(){
                    this.checkEquip = true
                 },
                 goBack(){
                    this.$router.push('/index/apply')
                 },
                 goToDiagnosis ( isApply) {
                    var self = this
                    const goToDiasUrl =  {
                        url:'/cs-server/v1/cs/case',
                        method:'put'
                    }
                   var submitDiasMsgParams={
                      'caseId':self.caseIdNum.caseId,
                      'patientName':self.diagnosisData.name,
                      'gender':self.selSex,
                      'age':self.diagnosisData.age,
                      'ageUnit':self.diagnosisData.age_unit,
                      'mobile':self.diagnosisData.mobile,
                      'examTime':new Date(self.checkTime).getTime(),
                      'stature':self.diagnosisData.stature,
                      'weight':self.diagnosisData.weight,
                      'maritalStatus':self.diagnosisData.marital_status,
                      'patientSource':self.diagnosisData.patient_source,
                      'patientType':self.diagnosisData.patient_type,
                      'idCard':self.diagnosisData.id_card,
                      'clinicNo':self.diagnosisData.clinic_no,
                      'hospitalNo':self.diagnosisData.hospital_no,
                      'bedNo':self.diagnosisData.bed_no,
                      'familyAddress':self.diagnosisData.family_address,
                      'itemId':Array.from(new Set(self.methodsId)),
                      'isEnhance':self.selIsBigger,
                      'technician':self.diagnosisData.technician,
                      'examNo':self.diagnosisData.exam_no,
                      'filmNo':self.diagnosisData.film_no,
                      'deptId':self.diagnosisData.udt_id,
                      'complained':self.diagnosisData.complained,
                      'medicalHistory':self.diagnosisData.medical_history,
                      'clinicalImpression':self.diagnosisData.clinicalImpression,
                      'isApply':isApply
                    }
                    self.http(goToDiasUrl,submitDiasMsgParams).then((res)=>{
                        if (res.data.code === 1) {
                            self.$router.push('/report/'+self.caseIdNum.caseId)
                        }
                    })
                 } 
        },
        mounted(){
            this.caseIdNum.caseId = this.$route.params.id
            this.getModalityUrl()
            this.getModalityParts()
            this.getDiagnosisDataMethods()
            if (this.diaFlag === 'dia') {
                this.disabled = false
            } else {
                this.disabled =true
            }
        },
        computed: {
            gendarList () {
                return this.$store.state.sexList
            },
            marriageList() {
                 return this.$store.state.marriageList
            },
            yesOrNo (){
                 return this.$store.state.yesOrNo
            },
            Modality(){
                return this.$store.state.getModality
            }
        },
        created() {
             this.getData()
             this.getDiagnosisData()
            
        }

    }

</script>
<style lang="less">
    .tdRight
    {
        text-align: right;
        padding: 10px;
        width:5%;
    }
    .tdLeft
    {
        text-align: left;
        padding: 10px;
    }
    .inputStyle
    {
        width: 150px;
    }
    .s_parts .ivu-input
    {
        background-color:@default-input-bg;
        border: none;
        border-radius:0;
    }

    .other_parts  textarea.ivu-input
    {
        background-color:@default-input-bg;
        border: none;
        border-radius:0;
        height: 100px;
        width: 700px;
    }
    .date  .ivu-input
    {
        background-color:@default-input-bg;
        width: 150px;
    }
    .ivu-select-selection,.numberAge .ivu-input-number-input-wrap input{
        background-color: @default-input-bg;
    }
    .reportListBG
    {
        width: 600px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 30px;
        padding: 40px;
        text-align: center;
        border-width: 1px;
        border-color: black;
        border-style: solid;
        background-color: white;
    }
    .line
    {
        width: 100%;
        height: 1px;
        background-color: grey;
        margin-top: 15px;
        margin-bottom: 10px;
        clear:both
    }
    .ivu-tabs-nav-scroll
    {
        background-color: white;
    }
    .otherMore
    {
        width: 120px;
        height: 120px;
        background: url(../../assets/logo.png) no-repeat center;
        background-size:100%;
        display:inline-block;
        margin-right:10px;
    }
   .otherMoreUpload
    {
        background-size:100%;
        display:inline-block;
        margin-right:10px;
        img{
            border-radius:10px;
        }
    }
    .upload{
        padding: 5px 10px;
        border: none;
        border-radius: 5px;
    }
    .con-close{
        color:@red;
        position:absolute;
        right:5px;
        top:-1px;
        font-weight:bold;
        cursor:pointer;
    }
    .imgScan .ivu-modal-content{
        height:100%;
        width:100%;
    }
    .partsmethods{
        width:60%;
        margin-left:20px;
        li{
            display:inline-block;
            width:10%;
            margin-bottom:10px;
        }
    }
</style>