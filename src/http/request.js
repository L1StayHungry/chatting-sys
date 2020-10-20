import Axios from 'axios'
import QS from 'qs';

export const instance = Axios.create({
    baseURL: 'http://localhost:8080',
    // baseURL: 'http://106.52.153.159:8080',
    timeout: 10000,
  })

  // get方法封装
  export function get (url,params = {}) {
    return new Promise((resolve, reject) => {
      instance({
        url,
        method: 'get',
        params: params,
        headers : {
          // 'Content-Type': 'application/json;charset=UTF-8'
        }
      })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err.data)
        })
    })
  }

  // post请求封装
  export function post (url,data) {
    return new Promise((resolve, reject) => {
      instance({
        url,
        data: QS.stringify(data),
        method: 'post',
        headers : {
          // 'Content-Type': 'application/json;charset=UTF-8',
          // 'Access-Control-Allow-Origin':'*',
        }
      })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err.data)
        })
    })
  }

