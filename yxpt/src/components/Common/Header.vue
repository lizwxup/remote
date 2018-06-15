 <template> 
    <div :style="{background: '#fff',height:'60px', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"> 
            <Row>
                <Col span="20" offset="19" style="display:flex;" class="header-tip">
                    <div>
                        <Badge  count="9" overflow-count="999">
                            <Icon type="ios-bell-outline" size="30" color="#4f91ff"></Icon>
                        </Badge>
                      <p class="defaultColor">消息中心</p>
                    </div>
                    <div class="defaultBg">
                      <Icon type="ios-person-outline" size="30"  color="#fff"></Icon>
                      <p class="defaultColor defaultWhite">{{nickName}}</p>
                    </div>
                    <div  @click="muliPlat = true">
                         <Icon type="iphone" size="30"  color="#4f91ff"></Icon>
                         <p class="defaultColor">多平台登录</p>
                    </div>
                    <div @click="logout">
                       <Icon type="android-exit" size="30"  color="#4f91ff"></Icon>
                       <p class="defaultColor">退出</p>
                    </div>
                </Col>
             </Row>
             <!--多平台登录-->
              <Modal
                v-model="muliPlat"
                title="多平台登录"
                class-name="vertical-center-modal"
                width ="400px" >
                <div class="muti" >
                    <ul>
                        <li class="defaultColor font-14" @click="tabWeb('1')" :class="{hover:hover}">苹果(手机)</li>
                        <li class="defaultColor font-14" @click="tabWeb('2')" :class="{hover:!hover}">网页浏览器</li>
                    </ul>
                    <div v-if="mutiTab">
                        <img :src="qrCode" alt="">
                        <p>您可扫描二维码或进入App Store 下载</p>
                    </div>
                </div>
                    <div v-if="!mutiTab" style="display:flex;justify-content:space-between;height:100px; margin:0 auto;width:80%;align-items: center;">
                        <img :src="logo" alt="" width="50%" height="40px">
                        <p class="font-16 defaultColor">www.baidu.com</p>
                    </div>
                    <p v-if="!mutiTab" style="text-align:center;margin-top:20px">可点击通过浏览器访问</p>
            </Modal>
    </div>      
</template>
<script>
import qrCode from  '../../../static/img/ercode.png'
import logo from  '../../../static/img/logo.png'
    export default {
        data () {
            return {
                muliPlat:false,
                qrCode,
                logo,
                mutiTab:true,
                hover:true,
                nickName:''
            }
        },
        methods:{
            logout () {
                const self = this
                var logout = {
                    url:'/ums-server/v1/logout',
                    method:'post'
                }
                this.http(logout).then((res)=>{
                    if (res.data.code === 1 ) {
                        window.localStorage.removeItem('token')
                        window.localStorage.removeItem('uuid')
                        self.$router.push('/login')
                    } else {

                    }
                },(error)=>{

                })
            },
            tabWeb (index) {
                if (index === '1' ) {
                    this.mutiTab = true
                     this.hover = true
                } else {
                    this.mutiTab = false
                    this.hover = false
                }
            }
        },
        mounted(){
            this.nickName = window.sessionStorage.getItem('nickname')
        }
    }
</script>
 <style lang="less">
    .header-tip{
        margin-top:7.5px;
      div{
        width: 80px;
        text-align: center;
         &:nth-child(2){
           margin:-7.5px 0 -7.5px 0;
           i{
               margin-top:7.5px;
           }
         }
        p{
            font-weight:bold;
        }
      }
    }
    // .vertical-center-modal{
    //     height:250px;
    // }
    // .ivu-modal-content{
    //     height:250px;
    // }
    .muti{
        width:60%;margin:0 auto;
        //height:190px;
        ul{
            display:flex;
            justify-content:space-between;
            li{
                border:1px solid @white-color;
                padding: 3px 10px;
                border-radius: 5px;
            }
            li.hover{
                border:1px solid @default-color;
                padding: 3px 10px;
                border-radius: 5px;
            }
        }
        div{
            text-align:center;
            margin-top:20px;
            p{
                margin-left:15px;
            }
        }
    }
    .vertical-center-modal .ivu-modal-footer{
        display:none
    }
    .vertical-center-modal .ivu-modal-body{
        height:207px;
    }
 </style>