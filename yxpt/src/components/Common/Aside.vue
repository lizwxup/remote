<template>
       <div>
           <div><img :src="logo"  alt="" width="200px" height="55px"></div>
            <div v-for="(itemAside,index) in asideArr"  :key="index" >
                  <Menu active-name="1-1"  width="auto" :class="menuitemClasses" @on-select="navigateTo">
                 <MenuItem  v-if="itemAside.childern.length === 0"   :name="itemAside.key"> 
                    <Icon type="ios-navigate"></Icon>
                    <span>{{itemAside.title}}</span>
                 </MenuItem>
                <Submenu   v-if="itemAside.childern.length !== 0" :name="itemAside.key">
                    <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                        {{itemAside.title}}
                    </template>
                    <MenuItem  v-for="(item,index1) in itemAside.childern" :key="index1" :name="item.key">{{item.child}}</MenuItem>
                </Submenu>
                </Menu>    
            </div>
       </div>
</template>
<script>
   import logo from '../../../static/img/logo.png'
   export default {
       data () {
           return {
               height:{
                   height:'900px'
               },
               logo,
               asideArr:[],
               isCollapsed: false
           }
       },
       methods:{
            navigateTo (name) {
                var self = this
                self.$router.push(name)
            }
       },
       computed: {
            menuitemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
       mounted () {
             var self = this
             let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
             self.height.height = h-87 +'px'
             this.axios.get('../../static/data/aside.json').then(res=>{
                  self.asideArr = res.data
             })

       },

   }   
</script>
<style lang="less">
   .layout-con{
        height: 100%;
        width: 100%;
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>