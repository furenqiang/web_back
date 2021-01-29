import axios from 'axios'; // 引入axios
import router from "../router/index";
import QS from 'qs';
import {Message} from 'element-ui'
import store from '../store/index'

//1、我们的项目环境可能有开发环境、测试环境和生产环境。我们通过node的环境变量来匹配我们的默认的接口url前缀
// if (process.env.NODE_ENV == 'dev') {    
//   axios.defaults.baseURL = 'http://localhost:10002';
// } else if (process.env.NODE_ENV == 'test') {    
//   axios.defaults.baseURL = 'http://localhost:10002';
// } else if (process.env.NODE_ENV == 'pro') {    
//   axios.defaults.baseURL = 'http://localhost:10002';
// }

/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function get(url, params){    
  return new Promise((resolve, reject) =>{        
      axios.get(url, {            
          params: params        
      })        
      .then(res => {            
          resolve(res.data);        
      })        
      .catch(err => {            
          reject(err.data)        
      })    
  });
}
/** 
* post方法，对应post请求 
* @param {String} url [请求的url地址] 
* @param {Object} params [请求时携带的参数] 
*/
export function post(url, params) {    
  return new Promise((resolve, reject) => {         
      axios.post(url, QS.stringify(params))        
      .then(res => {            
          resolve(res.data);        
      })        
      .catch(err => {            
          reject(err.data)        
      })    
  });
}

  //3、post请求的时候，我们需要加上一个请求头，所以可以在这里进行一个默认的设置，即设置post的请求头为application/x-www-form-urlencoded;charset=UTF-8
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

  //4、拦截器，拦截请求发送前
  axios.interceptors.request.use(config=>{
    //console.log("request success");
    return config;//一定要返回config
  },err=>{
    //console.log("requset error");
    return err;
  })

  //5、拦截器，拦截请求后
  axios.interceptors.response.use(response=>{
  if(response.data.code===400||
    response.data.code===404||
    response.data.code===203||
    response.data.code===500){
      Message({
        message: response.data.message,
        type: 'error'
      });
  }else if(response.data.code===403){
    router.push({path: '/login'});
    store.commit({
      type:'changeLoginShow',
      show:true
    })
    Message({
      message: response.data.message,
      type: 'error'
    });
  }
    //console.log("response success");
    return response;
  },err=>{
    // 如果请求为非200否者默认统一处理
  if (err.response.status != 200) {
    Message({
      message: "网络异常",
      type: 'error'
    });
  }
    //console.log("response error");
    return err;
  })


