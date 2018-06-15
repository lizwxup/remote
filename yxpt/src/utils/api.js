const globalUrl = 'http://49.4.9.162:8080/ums-server'
const serviceModule = {  
  getLocation: {  
    url:'/ums-server/v1/encrypt/key',  
    method: 'get'
  },
  getLogin:{
    url:'/v1/admin/login', 
    method:'post',
    data:{
        account:'1',
        password:'2'
    }
  } 
}  
const ApiSetting = {...serviceModule }  
   
export default ApiSetting