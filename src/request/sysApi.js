import {get,post} from './http'

let sysApi="/sysApi/"
//获取用户列表
export const getUserListByParams = (params) => {
     return get(sysApi+"sysUser/getUserListByParams",params.data);
}
//登录
export const login = (params) => {
     return post(sysApi+"login",params.data);
}
//测试登录状态
export const test = (params) => {
     return get(sysApi+"test/testHttp",params.data);
}
//退出登录
export const logout = (params) => {
     return get(sysApi+"logout",params.data);
}
//修改用户信息
export const updateUser = (params) => {
     return post(sysApi+"sysUser/updateUser",params.data);
}
//注册用户信息
export const register = (params) => {
     return post(sysApi+"sysUser/register",params.data);
}
//删除（停用）用户
export const deleteUser = (params) => {
     return post(sysApi+"sysUser/deleteUser",params.data);
}
//查询操作日志
export const getLogListByParams = (params) => {
     return get(sysApi+"sysLog/getLogListByParams",params.data);
}
//查询异常日志
export const getExceptionLogListByParams = (params) => {
     return get(sysApi+"sysExceptionLog/getExceptionLogListByParams",params.data);
}
