import {get,post} from './http'

let sysApi="/sysApi/"

export const getUserListByParams = (params) => {
     return get(sysApi+params.url,params.data);
}
export const login = (params) => {
     return post(sysApi+params.url,params.data);
}

export const test = (params) => {
     return get(sysApi+params.url,params.data);
}