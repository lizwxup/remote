<template>
   <!-- <Card :bordered="false" class="b_card"> -->
        <div class="b_phone"> 
            <div class="content">
                 <label for="" class="font-14">手机号</label>
                 <Input v-model="phone"   size="large" placeholder="请输入手机号" ></Input>
            </div>
            <div class="content">
                <label for="" class="font-14">验证码</label>
                <Input v-model="sms" placeholder="请输入验证码"  @on-focus = 'smsFocus' :icon="iconError" size="large"  style="width:70%"></Input>
                <Button type="primary" class="sms"   @click="getSms" :disabled='disabledStyle' >{{getSmsMsg}}<span v-if="getSmsMsg!=='获取验证码'">s</span></Button>
            </div>
            <div class="sms-tip font-12" v-show="tipFlag">验证码不能为空</div>
            <Button type="primary" class="b_succ font-16" @click="getSmsSubmit">{{label}}</Button>
        </div>
    
</template>
<script>
    //flag 标记 flag = 1  忘记密码  flag = 2 绑定手机
    export default {
        props:['label','flag'],
        data () {
            return {
                phone:'',
                sms:'',
                getSmsMsg:'获取验证码',
                disabledStyle:false,
                iconError:'',
                tipFlag:false
            }
        },
        methods:{
            //获取验证码
            getSms () {
              var that = this,url
               const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (that.phone === '' ) {
                    that.$Message.warning('请输入手机号');
                } else if (myreg.test(that.phone)) {
                    if (that.flag === 2 ) {
                       url='/ums-server/security/login/sms?phoneNum=';
                    } else {
                        url= '/ums-server/v1/pwd/sms?phoneNum='
                    }
                    const bindPhoneModule = {  
                        getBindPhone:{
                            url:url+that.phone, 
                            method:'get'
                        } 
                    }
                    that.http(bindPhoneModule.getBindPhone).then((res)=>{  
                        if (res.data.code === 1) {
                             that.getSmsMsg = 60
                             that.disabledStyle = true
                            var timer = setInterval(function(){
                                    that.getSetTimeout()
                                    if( that.getSmsMsg<=0){
                                        clearInterval(timer);
                                        that.disabledStyle = false
                                        that.getSmsMsg = '获取短信验证码'
                                    }
                            },1000)
                        } else {
                           that.$Message.warning(res.data.msg);
                        }         
                        },(error)=>{  
                        console.log(error)   
                   }) 
                } else {
                  that.$Message.warning('手机号有误');
                } 
            },
            smsFocus () {
                var that =this
                that.iconError ='';
                that.tipFlag = false;
            },
            getSetTimeout () {
                var that = this
                that.getSmsMsg--
            },
            //进行下一步
            getSmsSubmit () {
                var that = this
                that.iconError ='';
                that.tipFlag = false;
                    if (that.sms === '') {
                        that.iconError ='close-circled';
                        that.tipFlag = true
                    } else {
                        if (that.flag === 2) {
                            const getBindSus={
                                url:'/ums-server/security/login/sms', 
                                method:'post',
                                data:{
                                    phoneNum:that.phone,
                                    code:that.sms
                                }
                            }
                            that.http(getBindSus).then((res)=>{  
                                if (res.data.code === 1) {
                                    that.$router.push('/index')
                                } else {
                                    that.$Message.warning(res.data.msg);
                                }         
                                },(error)=>{  
                                console.log(error)   
                            })
                        }else if (that.flag === 1) {  //忘记密码
                            const getBindSus={
                                url:'/ums-server/v1/pwd/sms', 
                                method:'post',
                                data:{
                                    phoneNum:that.phone,
                                    code:that.sms
                                }
                            }
                            that.http(getBindSus).then((res)=>{  
                                if (res.data.code === 1) {
                                    window.sessionStorage.setItem('secretkey',res.data.data)
                                    that.$emit('currentStep',2)
                                } else {
                                    that.$Message.warning(res.data.msg); 
                                }         
                                },(error)=>{  
                                console.log(error)   
                            })
                }
                    }
            }
        },
        mounted() {
           // console.log(this)
        }
    }
</script>
<style lang="less">
  .b_phone{
        width:40%;margin:50px auto;padding-bottom:40px;
        div.content{
            display:flex;
            justify-center:space-between;
            margin:20px 0px;
          .sms{
            height:36px;
            width:30%;
          }
        }
        label{
            width:65px;
            height:40px;
            line-height:40px;
        }   
    }
    .ivu-icon-close-circled,.sms-tip{
        color:@red;
    }
    .sms-tip{
        margin:-10px 0 10px 55px;
    }
</style>