import {get,post} from './http'

let sysApi="/sysApi/"
//获取用户列表
export const getUserListByParams = (params) => {
     return get(sysApi+params.url,params.data);
}
//登录
export const login = (params) => {
     return post(sysApi+params.url,params.data);
}
//测试登录状态
export const test = (params) => {
     return get(sysApi+params.url,params.data);
}
//退出登录
export const logout = (params) => {
     return get(sysApi+params.url,params.data);
}
//修改用户信息
export const updateUser = (params) => {
     return post(sysApi+params.url,params.data);
}
