import Vue from 'vue'
import Vuex from 'vuex'
import http from "../utils/https.js"; 
Vue.use(Vuex)

const store  = new Vuex.Store({
    //定义的状态  性别
      state: {
            sexList: [{value: 1,label: '男'},
                    {value: 2,label: '女'},
                    {value: 3,label: '未知'}],
            marriageList: [{value: 1,label: '未婚'},
                        {value: 2,label: '已婚'},
                        {value: 3,label: '离异'}], 
            yesOrNo:[{value:2,label:'是'},{value:1,label:'否'}],
            getParts:[],  //类似于获取数据内容
            getModality:[],
            currentSelectIndex:0,
            imageCloudData:[],
            startTime:1,
            endTime:2
     },
     mutations:{
        getParts(state,playload){//改变state
            state.getParts=playload.res
        },
        getModality(state,playload) {
            state.getModality=playload.res
        },
        selectIndex(state,playload) {
            state.currentSelectIndex = playload.ic_id
        }
     },
     actions:{  
         //检查部位
         getParts({commit}){
            var  getLogin={
                url:'/eds-server/v1/dict/exam/part', 
                method:'get'
            }
           http(getLogin).then((response)=>{
                commit('getParts',{res:response.data.data})
           },(error)=>{
                console.log(error)
           })
         },
         //获取类型
         getModality({commit}){
            const modalityUrl  = {
                url:'/eds-server/v1/dict/exam/modality',
                method:'get'
            }
            http(modalityUrl).then((resp)=>{ 
               commit('getModality',{res:resp.data.data})
            },(error)=>{
            })
         } 
     }
})

export default store