<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script> 
import logo from '../static/img/logo.png'
export default {
  name: 'App',
  data () {
    return {
      logo
    }
  }
}
</script>

<style lang="less">
@import './mythemes/index.less';
@import './mythemes/commonMain.less';
@import '../static/style/commonMain.less';
@import '../static/style/commonStyle.less';
body{
  margin:0;
  background:#f3f6ff;
}
.ivu-layout{
  background:#eef5ff;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-family:'Microsoft yahei'
}
.ivu-layout-sider-trigger,.ivu-layout-sider{
    background:#fff;
}
.ivu-menu-submenu-title,.ivu-menu-item{
  font-weight: bold;font-size: 15px;color: #b7b7b7;
}
.ivu-steps-horizontal .ivu-steps-content{
  margin-top:10px;
  padding-left:0px !important;
}
input:-webkit-autofill {
    background-color: #FAFFBD;
    background-image: none;
    color: #000;
}
</style>
