<template>
    <div style="padding:0 20px 0px 20px;overflow:hidden;" class="dia-content">
        <header-top></header-top>
        <msg-content :diaFlag="diaContent"></msg-content>
    </div>
</template>
<script>
import HeaderTop from '../Common/Header.vue' 
import msgContent from '../MyApplication/Unfinished.vue'
   export default {
        data () {
           return {
               diaContent:'dia'
           }
        },
        methods:{

        },
        components:{
            HeaderTop,
            msgContent
        }

    }
</script>
<style lang="less">
   .dia-content .ivu-tabs-nav-scroll{
       display:none;
   }
</style>