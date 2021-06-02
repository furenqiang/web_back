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

//获取销量省份数据
export const getProvinceData = (params) => {
     return get(oneMapApi+params.data,null);
}

//获取销量rank数据
export const getRankData = (params) => {
     return get(oneMapApi+"/rank",params.data);
}

//获取销量hot数据
export const getHotData = (params) => {
     return get(oneMapApi+"/hotproduct",params.data);
}

//获取销量stock数据
export const getStockData = (params) => {
     return get(oneMapApi+"/stock",params.data);
}

