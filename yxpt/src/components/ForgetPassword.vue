<template>
    <div>
        <logo-web-site />
        <div class="fg_pass">
        <div  class="f-pass font-14">忘记密码</div>
           <div>
                <ul class="fg-step" v-if="currentStep !=3" >
                    <li v-for="item in stepRadiusData" 
                    :style="{width:item.radius+'px',height:item.radius+'px',
                            background:currentStep === 1?item.color:'#4f91ff',borderRadius:'50%'}">
                        <div v-if="item.content!= ''">
                            <p>{{item.content}}</p>
                            <p :style="{color:currentStep === 1?item.color:'#4f91ff',width:'60px',marginLeft:'-15px'}" 
                                v-if="item.content ==='1'">验证手机号</p>
                            <p :style="{color:currentStep === 1?item.color:'#4f91ff',width:'60px',marginLeft:'-15px'}"
                                v-if="item.content==='2'">重置密码</p>
                        </div>
                     </li>
                   </li>       
                </ul>
           </div>
           <get-sms :label='labelMsg'  :flag = '1'   v-on:currentStep = 'fgNext'   v-if="currentStep === 1"></get-sms>
           <div class="fg_pass_sure" v-if="currentStep === 2" style="margin-top:50px;padding-bottom:40px;">
                <div>
                    <label for="" class="font-14">新密码：</label>
                    <Input v-model="password"  :maxlength = '18' type="password" size="large" placeholder="6~18位数字或字母组合" ></Input>
                </div>
                <div style="margin:20px 0;">
                    <label for="" class="font-14">确认密码：</label>
                    <Input v-model="rpassword"  @on-focus = 'pasFocus' :maxlength = '18'   :icon="iconErrorPas" type="password" size="large"  placeholder="请再次输入密码" ></Input>
                </div>
                <div class="tip-error" style="margin-left:80px;line-height:20px;" v-show="tipFlagAdd">两次输入的密码不一致</div>
                <Button type="primary" class="b_succ" @click="getComplete">完成</Button> 
           </div>
           <div class="" v-if="currentStep === 3" style="margin-top:50px;padding-bottom:40px;height:295px;">
                <div style="height: 42px;margin: 127px auto;width: 195px;">
                    <p class="defaultColor font-16">新密码设置成功！</p>
                    <p style="margin-top:10px;">请牢记并保存你的密码  <router-link to="/">重新登录</router-link></p>
                </div>
                
           </div>   
        </div>
         
    </div>
</template>
<script>
    import LogoWebSite from './Common/LogoWebSite.vue'
    import getSms from './Common/getSms.vue'
    import ApiSetting from '../utils/api.js'
    export default{
        data () {
            return {
                labelMsg:'下一步',
                password:'',
                rpassword:'',
                currentStep:1,
                getPublicKey:'',
                tipFlagAdd:false,
                iconErrorPas:'',
                stepRadiusData:[
                  {content:'',radius:5,color:'#4f91ff'},
                  {content:'',radius:8,color:'#4f91ff'},
                  {content:'1',radius:25,color:'#4f91ff'},
                  {content:'',radius:5,color:'#4f91ff'},
                  {content:'',radius:8,color:'#4f91ff'},
                  {content:'',radius:10,color:'#8c8f94'},
                  {content:'',radius:5,color:'#8c8f94'},
                  {content:'',radius:8,color:'#8c8f94'},
                  {content:'2',radius:25,color:'#8c8f94'},
                  {content:'',radius:5,color:'#8c8f94'},
                  {content:'',radius:8,color:'#8c8f94'}
                ]
            }
        },
        methods:{
            fgNext (data) {
                this.currentStep = data     
            },
            pasFocus(){
                this.tipFlagAdd = false,
                this.iconErrorPas = ''
            },
            //完成修改密码的接口
            getComplete () {
                var that = this
               if (this.password === '' || this.rpassword === '') {
                   that.$Message.warning('请输入新密码');
               } else if (this.password != this.rpassword) {
                   that.$Message.warning('两次输入密码不一致');
                   that.tipFlagAdd = true
                   that.iconErrorPas = 'close-circled';
               } else if (this.password.length < 6 || this.password.length>18) {
                    that.$Message.warning('密码长度必须介于6~16之间！');
               }else {
                   var encrypt = new JSEncrypt();
					   encrypt.setPublicKey(that.getPublicKey);         
				   var dataKey = encrypt.encrypt(that.password);
					// dataPassword = encodeURI(dataKey).replace(/\+/g, '%2B')
                   const passwordModifySuc = {
                            url:'/ums-server/v1/pwd/sms/reset', 
                            method:'post',
                            data:{
                                secretkey:window.sessionStorage.getItem('secretkey'),
                                newPwd:dataKey
                         }
                   }
                    that.http(passwordModifySuc).then(function(res){
                        if (res.data.code === 1 ) {
                            that.$router.push('/') 
                        } else {
                            that.$Message.warning(res.data.data.msg);   
                        }
                        },(error)=>{  
                        console.log(error)   
                    })
               }    
            }
        },
        components:{
            LogoWebSite,
            getSms
        },
         mounted(){
            //获取公钥
            var self = this    
            self.http(ApiSetting.getLocation).then((res)=>{            
               self.getPublicKey = res.data.data
            },(error)=>{  
               console.log(error)   
            })  
       },
    }
</script>


<style lang="less">
    .fg-step{
        width:30%;
        margin:30px auto;
        height:40px;
        display:flex;
        justify-content: space-between;
        align-items: center;
    }
    .fg-step li{
        list-style:none;
        margin:20px 7px 20px 7px;
        text-align:center;
        line-height:25px;
        color:#fff;
    }
    .f-pass{
        height:40px;line-height:40px;
        background:@default-color;
        color:#fff;  
        border-radius: 5px 5px 0 0;
        padding-left:15px;
    }
    .fg_pass{
        width:50%;
        margin:20px auto;
        background:#fff;
        .fg_pass_step{
            width:25%;
            margin:20px auto;
            margin-bottom:20px;
        }
    }
    .fg_pass_sure{
         width:40%;margin:0 auto;        
     div{
        display:flex;
        justify-content:space-between;
        line-height:40px;
        height:40px;
        margin:0 auto;
        label{
            width:100px;
        }
    }
     }
     .fg_pass .ivu-card-body{
        padding:0px 0px 10px 0px;
     }
</style>