import {get,post} from './http'

let oneMapApi="/oneMapApi/"
//获取用户列表
export const getSellerData = (params) => {
     return get(oneMapApi+"api/seller",params.data);
}