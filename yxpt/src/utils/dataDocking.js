import http from "./https.js"; 
export default {
    $filterParts :function (value) {
        return value
    },
    //设备
    $allCheckType:function(){
        var   modalityData = []
        const modalityUrl  = {
                url:'/eds-server/v1/dict/exam/modality',
                method:'get'
            }
        http(modalityUrl).then((resp)=>{ 
            modalityData = resp.data.data 
        },(error)=>{
        })
       return modalityData
    }
}