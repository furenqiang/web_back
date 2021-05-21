import {get,post} from './http'

let oneMapApi="/oneMapApi/"
//获取商家seller数据
export const getSellerData = (params) => {
     return get(oneMapApi+"api/seller",params.data);
}

//获取销量trend数据
export const getTrendData = (params) => {
     return get(oneMapApi+"api/trend",params.data);
}

//获取销量trend数据
export const getChainJson = (params) => {
     return get(oneMapApi+"api/echartsMapData/china",params.data);
}

