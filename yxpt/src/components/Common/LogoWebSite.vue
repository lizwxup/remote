<template>
    <div class="back_logo">
            <div class="back_logo_top">
                <div>
                    <img :src="logo" width="200px" height="55px">
                </div>
                <div class="defaultColor font-14">
                    <span>官方网站</span>
                    <span>400-200-2000</span>
                </div>    
            </div>
        </div>
</template>
<script>
    import logo from '../../../static/img/logo.png'
    export default {
        data () {
            return {
                logo
            }
        }
    }
</script>
<style lang="less">
   @background:#fff;
   .back_logo{
        height:65px;
        text-align:left;
        background:@background;
        .back_logo_top{
            width:70%;
            margin:0 auto;
            line-height:65px;
            display:flex;
            height:65px;
            justify-content:space-between;
            div:nth-child(2){
                margin-right:8%;
                span{
                    margin-right:100px;
                }
            }
        }
   }
</style>