<template>
    <div>
        <logo-web-site />
        <div style="width:50%;margin:20px auto;">
            <div class="f-pass font-14">绑定手机号</div>
            <get-sms :label = 'labelMsg' :flag= '2'/>  
        </div>
         
    </div>
</template>
<script>
  import LogoWebSite from './Common/LogoWebSite.vue'
  import GetSms from './Common/getSms.vue'
  import http from "../utils/https.js";  
  export default {
      data () {
          return {
            phone:'',
            sms:'',
            labelMsg:'绑定'
          }
      },
      methods:{
            
      },
      components:{
          LogoWebSite,
          GetSms
      }
  }
</script>
<style lang="less">
    .f-pass{
        height:40px;line-height:40px;
        background:@default-color;
        color:#fff;  
        border-radius: 5px 5px 0 0;
        padding-left:15px;
    }
</style>