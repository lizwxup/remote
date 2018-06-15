<template>
    <div>
        <logo-web-site/>
            <div class="login">  
                <div style="display:flex;">
                    <div style="width:65%;height:400px;"></div>
                    <div style="width:300px;margin-left:30px;background:#fff;height:320px;margin-top:40px;padding-left:30px;border-radius:5px;">
                        <h3 class="defaultColor font-16"> 用户登录</h3>
                        <Input v-model="account"   size="large"  icon="checkmark-circled" placeholder="请输入账号" class="account_phone"></Input>
                           <!-- <div style="color:red;font-size:12px;" v-show="phone">账号不能为空、账号不存在或格式不正确</div> -->
                        <Input v-model="password"   size="large"  type="password" placeholder="请输入密码"  class="account_phone" ></Input>
                            
                        <div style="display:flex;justify-content:space-between;line-height:40px;width:90%;margin-top:30px;">
                            <div><Checkbox v-model="checked" type="primary">自动登录</Checkbox></div>
                            <div><router-link to='/fgpass'>忘记密码？</router-link></div>
                        </div>
                        <Button type="primary"  @click="loadToIndex" class="l_submit">登录</Button>
                        <div style="color:red;font-size:12px;" v-show="passwordVali"><Icon type="close-circled"></Icon>{{msgTip}}</div>
                </div>
                </div>        
            </div>
    </div>  
</template>
<script>
    import ApiSetting from '../utils/api.js'
    import LogoWebSite from './Common/LogoWebSite.vue'
    export default{
        data () {
            return {
                account:'',
                password:'',
                checked:true,
                phone:false,
                passwordVali:false,
                getPublicKey:'',
                msgTip:'密码不能为空'
            }
        },
        methods:{
            loadToIndex () {
                var self = this
                if (this.account === '') {
                  this.phone = true              
                }else if (this.password === '') {
                    this.passwordVali = true            
                }else {
                    var pas = '123'
                    var newPas = '123'
                     var encrypt = new JSEncrypt();
						 encrypt.setPublicKey(self.getPublicKey);
					 var dataKey = encrypt.encrypt(self.password);
						// dataPassword = encodeURI(dataKey).replace(/\+/g, '%2B')
                        // console.log(dataPassword)
                        const serviceModule = {  
                                getLogin:{
                                    url:'/ums-server/v1/user/login', 
                                    method:'post',
                                    data:{
                                        account:this.account,
                                        password:dataKey
                                    }
                                } 
                         }
                        self.http(serviceModule.getLogin).then((res)=>{  
                            if (res.data.code === 1) {
                                var resData = res.data.data
                                    window.sessionStorage.setItem('uuid',resData.userInfo.uuId)
                                    window.sessionStorage.setItem('nickname',resData.userInfo.nickname)
                                    window.sessionStorage.setItem('token',res.data.token)
                                    if (resData.userInfo.phone ==="") {
                                        self.$router.push('/bphone')
                                    } else {
                                        self.$router.push('/index/image')
                                    }
                            } else {
                                this.passwordVali = true        
                                self.msgTip = res.data.msg
                            }         
                            },(error)=>{  
                            console.log(error)   
                        })  
                      }
                    }
        },
        created() {
          console.log('content')      
        },
        mounted(){
            //获取公钥
            var self = this 
            self.loadToIndex()
            self.http(ApiSetting.getLocation).then((res)=>{            
               self.getPublicKey = res.data.data
            },(error)=>{  
               console.log(error)   
            })  
       },
       components:{
           LogoWebSite
       } 
    }
</script>
<style lang="less">
   .login{
        width:70%;
        background:@ccc-color;
        margin:0px auto;
        h3{
            margin-top:50px;
        }
        .ivu-icon-checkmark-circled{
           color:@green-color;
        }
        .l_submit{
            width:90%;
        }
    }
    .account_phone{
        margin-top:20px;
        width:90%;
    }
</style>