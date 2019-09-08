import axios from '@/libs/api.request'
import qs from 'qs'

let dataPost = (url,params)=>{
   return axios.request({
     url: url,
     method: 'post',
     data:qs.stringify(params)
   })
}
// 分类相关
// 创建分类
export const createKind = (params)=>{
   return dataPost('/category/add',params)
}
// 分类编辑
export const editKind = (params)=>{
  return dataPost('/category/edit',params)
}
// 分类列表
export  const kindList = (params)=>{
  return dataPost('/category/list',params)
}
// 删除分类
export  const deleteKind = (params)=>{
  return dataPost('/category/delete',params)
}
//预览分类
export const viewCategory = (params)=>{
  return dataPost('/category/view',params)
}

// 链接相关
//  创建或者编辑链接
export const addEditLink = (params)=>{
  return dataPost('/link/add',params)
}

export const getTableData = () => {
  return axios.request({
    url: 'get_table_data',
    method: 'get'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}

export const uploadImg = formData => {
  return axios.request({
    url: 'image/upload',
    data: formData
  })
}

export const getOrgData = () => {
  return axios.request({
    url: 'get_org_data',
    method: 'get'
  })
}

export const getTreeSelectData = () => {
  return axios.request({
    url: 'get_tree_select_data',
    method: 'get'
  })
}

export const test = (params)=> {
  return axios.request({
    url:'/login/simulated',
    method: 'post',
    data:params
  })
}
