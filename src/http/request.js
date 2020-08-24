import Axios from 'axios'
import QS from 'qs';
import { reject } from 'q';

export const instance = Axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000,
  })

//   export function get(url, params){    
//     return new Promise((resolve, reject) =>{        
//         axios.get(url, {            
//             params: params        
//         }).then(res => {
//             resolve(res.data);
//         }).catch(err =>{
//             reject(err.data)        
//     })    
// });}

  // get方法封装
  export function get (url,params = {}) {
    return new Promise((resolve, reject) => {
      instance({
        url,
        method: 'get',
        params
      })
    })
      .then(res => {
        console.log('这里是封装的get请求的resolve');
        resolve(res.data)
      })
      .catch(err => {
        console.log('这里是封装的get请求的reject');
        reject(err.data)
      })
  }

  // post请求封装
  export function post (url,data) {
    return new Promise((resolve, reject) => {
      instance({
        url,
        data: QS.stringify(data),
        method: 'post'
      })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err.data)
        })
    })
  }

