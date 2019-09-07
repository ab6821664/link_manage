import axios from '@/libs/api.request'
import qs from 'qs'

// 登录
export const login = (data) => {
  console.log(data)
  return axios.request({
    url: '/login/login',
    data:qs.stringify(data),
    method: 'post'
  })
}

// 注册
export const register = (params) =>{
    return axios.request({
      url:'/login/register',
      data:qs.stringify(params),
      method:'post'
    })
}

// 获取邮箱验证码
export const emailCode= (params)=>{
  return axios.request({
    url:'/code/email',
    data:qs.stringify(params),
    method:'post'
  })
}

// 忘记密码 修改密码
export const changePassword = (params)=>{
  return axios.request({
    url:'/login/forget',
    method:'post',
    data:qs.stringify(params)
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: 'get_info',
    params: {
      token
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}

export const getUnreadCount = () => {
  return axios.request({
    url: 'message/count',
    method: 'get'
  })
}

export const getMessage = () => {
  return axios.request({
    url: 'message/init',
    method: 'get'
  })
}

export const getContentByMsgId = msg_id => {
  return axios.request({
    url: 'message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const hasRead = msg_id => {
  return axios.request({
    url: 'message/has_read',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return axios.request({
    url: 'message/remove_readed',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const restoreTrash = msg_id => {
  return axios.request({
    url: 'message/restore',
    method: 'post',
    data: {
      msg_id
    }
  })
}
