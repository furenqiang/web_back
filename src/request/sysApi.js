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
//统计近七天每天请求所用时长
export const countTimeByParams = (params) => {
     return get(sysApi+"sysLog/countTimeByParams",params.data);
}
//统计近七天每天异常个数
export const countExceptByParams = (params) => {
     return get(sysApi+"sysExceptionLog/countExceptByParams",params.data);
}
//统计异常TOP3
export const countExceptTop3 = (params) => {
     return get(sysApi+"sysExceptionLog/countExceptTop3",params.data);
}
//左侧菜单树
export const getMenuTree = (params) => {
     return get(sysApi+"sysMenu/getMenuTree",params.data);
}
//删除菜单
export const deleteMenu = (params) => {
     return post(sysApi+"sysMenu/deleteMenu",params.data);
}
//修改菜单
export const updateMenu = (params) => {
     return post(sysApi+"sysMenu/updateMenu",params.data);
}
//添加菜单
export const addMenu = (params) => {
     return post(sysApi+"sysMenu/addMenu",params.data);
}

