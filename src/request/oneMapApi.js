import {get} from './http'

let oneMapApi="/oneMapApi/api"
//获取商家seller数据
export const getSellerData = (params) => {
     return get(oneMapApi+"/seller",params.data);
}

//获取销量trend数据
export const getTrendData = (params) => {
     return get(oneMapApi+"/trend",params.data);
}

//获取销量china.json数据
export const getChainJson = (params) => {
     return get(oneMapApi+"/echartsMapData/china",params.data);
}

//获取销量map数据
export const getMapData = (params) => {
     return get(oneMapApi+"/map",params.data);
}

//获取销量map数据
export const getProvinceData = (params) => {//
     return get(oneMapApi+params.data,null);
}

