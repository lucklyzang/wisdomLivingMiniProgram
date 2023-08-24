import request from '@/api/request';
import Qs from 'qs'

// 获取设备通知
export function getDeviceInform() {
  return request({
    url: '/app-api/member/device-notice/get',
    method: 'get'
  })
};

// 获取设备通知列表
export function getDeviceInformList() {
  return request({
    url: '/app-api/member/device-notice/list',
    method: 'get'
  })
};

// 删除设备通知
export function deleteDeviceInformList() {
  return request({
    url: '/app-api/member/device-notice/delete',
    method: 'delete'
  })
};

// 查询未读消息数量
export function getDeviceInformUnread() {
  return request({
    url: '/app-api/member/device-notice/unRead',
    method: 'get'
  })
};

// 创建设备通知
export function createDeviceInform() {
  return request({
    url: '/app-api/member/device-notice/create',
    method: 'post'
  })
};

// 更新设备通知设备通知
export function updateDeviceInform() {
  return request({
    url: '/app-api/member/device-notice/update',
    method: 'put'
  })
};

// 获得人体监测雷达设置
export function getDetectionAlarmSettings() {
  return request({
    url: '/app-api/member/detection-alarm-settings/get',
    method: 'get'
  })
};

// 更新人体监测雷达设置
export function updateDetectionAlarmSettings() {
  return request({
    url: '/app-api/member/detection-alarm-settings/update',
    method: 'put'
  })
};

// 删除人体监测雷达设置
export function deleteDetectionAlarmSettings() {
  return request({
    url: '/app-api/member/detection-alarm-settings/delete',
    method: 'delete'
  })
};

// 获得人员存在感知雷达设置
export function getExistAlarmSettings() {
  return request({
    url: '/app-api/member/exist-alarm-settings/get',
    method: 'get'
  })
};

// 更新人员存在感知雷达设置
export function updateExistAlarmSettings() {
  return request({
    url: '/app-api/member/exist-alarm-settings/update',
    method: 'put'
  })
};

// 删除人员存在感知雷达设置
export function deleteExistAlarmSettings() {
  return request({
    url: '/app-api/member/exist-alarm-settings/delete',
    method: 'delete'
  })
};

// 获得跌倒监测雷达设置
export function getFallAlarmSettings(data) {
  return request({
    url: '/app-api/member/fall-alarm-settings/get',
    method: 'get',
		params
  })
};

// 更新跌倒监测雷达设置
export function updateFallAlarmSettings(data) {
  return request({
    url: '/app-api/member/fall-alarm-settings/update',
    method: 'put',
		data
  })
};

// 删除跌倒监测雷达设置
export function deleteFallAlarmSettings(data) {
  return request({
    url: '/app-api/member/fall-alarm-settings/delete',
    method: 'delete',
		params: data
  })
};

// 获得体征检测雷达设置
export function getHealthAlarmSettings() {
  return request({
    url: '/app-api/member/health-alarm-settings/get',
    method: 'get'
  })
};

// 更新体征检测雷达设置
export function updateHealthAlarmSettings() {
  return request({
    url: '/app-api/member/health-alarm-settings/update',
    method: 'put'
  })
};

// 删除体征检测雷达设置
export function deleteHealthAlarmSettings() {
  return request({
    url: '/app-api/member/health-alarm-settings/delete',
    method: 'delete'
  })
};