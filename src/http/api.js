import {get, post} from './request';

// 登录接口
export const Login = _params => post('/user/login', _params)