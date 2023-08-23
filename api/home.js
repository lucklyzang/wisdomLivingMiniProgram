import request from '@/api/request';
import Qs from 'qs'

// 获取首页配置
export function getHomePage() {
  return request({
    url: '/app-api/member/home-page/get',
    method: 'get'
  })
};

// 获取首页配置列表
export function getHomePageList() {
  return request({
    url: '/app-api/member/home-page/list',
    method: 'get'
  })
};

// 删除首页数据卡片
export function deleteHomePage() {
  return request({
    url: '/app-api/member/home-page/delete',
    method: 'delete'
  })
};

// 创建首页数据卡片
export function createHomePage() {
  return request({
    url: '/app-api/member/home-page/create',
    method: 'post'
  })
};

// 保存或更新首页数据卡片
export function saveOrUpdateHomePage() {
  return request({
    url: '/app-api/member/home-page/saveOrUpdate',
    method: 'put'
  })
};

// 首页数据卡片绑定设备
export function homePageBindDevice() {
  return request({
    url: '/app-api/member/home-page/bind-device',
    method: 'put'
  })
};