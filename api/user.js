import request from '@/api/request';
import Qs from 'qs'

// 获取用户基本信息
export function getUserMessage() {
  return request({
    url: '/app-api/member/user/get',
    method: 'get'
  })
};

// 修改用户信息
export function updateUserMessage(data) {
  return request({
    url: '/app-api/member/user/update',
    method: 'post',
		data
  })
};


// 获取用户房间
export function getUserRoom() {
  return request({
    url: '/app-api/member/room/get',
    method: 'get'
  })
};

// 获取用户房间列表
export function getUserRoomList() {
  return request({
    url: '/app-api/member/room/list',
    method: 'get'
  })
};

// 创建用户房间
export function createUserRoom(data) {
  return request({
    url: '/app-api/member/room/create',
    method: 'post',
		data
  })
};

// 更新用户房间
export function updateUserRoom(data) {
  return request({
    url: '/app-api/member/room/update',
    method: 'put',
		data
  })
};

// 删除用户房间
export function deleteUserRoom() {
  return request({
    url: '/app-api/member/room/delete',
    method: 'delete'
  })
};

// 获取用户家庭
export function getUserFamily() {
  return request({
    url: '/app-api/member/family/get',
    method: 'get'
  })
};

// 获取用户家庭列表
export function getUserFamilyList() {
  return request({
    url: '/app-api/member/family/list',
    method: 'get'
  })
};

// 创建用户家庭
export function createUserFamily(data) {
  return request({
    url: '/app-api/member/family/create',
    method: 'post',
		data
  })
};

// 更新用户家庭
export function updateUserFamily(data) {
  return request({
    url: '/app-api/member/family/update',
    method: 'put',
		data
  })
};

// 删除用户家庭
export function deleteUserFamily() {
  return request({
    url: '/app-api/member/family/delete',
    method: 'delete'
  })
};

// 新增手机号
export function addMobile() {
  return request({
    url: '/app-api/member/family/add-mobile',
    method: 'post'
  })
};

// 修改手机号
export function uodateMobile() {
  return request({
    url: '/app-api/member/family/update-mobile',
    method: 'put'
  })
};

// 删除手机号
export function deleteMobile() {
  return request({
    url: '/app-api/member/family/delete-mobile',
    method: 'delete'
  })
};

// 获取用户设备数量
export function getUserDeviceCount() {
  return request({
    url: '/app-api/member/device-user/device-count',
    method: 'get'
  })
};

// 获取用户设备信息
export function getUserDeviceMessage() {
  return request({
    url: '/app-api/member/device-user/devices',
    method: 'get'
  })
};

// 获取用户设备和房间列表
export function getUserRoomDevices() {
  return request({
    url: '/app-api/member/device-user/room-devices',
    method: 'get'
  })
};

// 创建设备和用户绑定
export function createUserDeviceBind() {
  return request({
    url: '/app-api/member/device-user/create',
    method: 'post'
  })
};

// 更新设备和用户绑定
export function updateUserDeviceBind() {
  return request({
    url: '/app-api/member/device-user/update',
    method: 'put'
  })
};

// 删除设备和用户绑定
export function deleteUserDeviceBind() {
  return request({
    url: '/app-api/member/device-user/delete',
    method: 'delete'
  })
};

// 获取设备和用户绑定
export function getUserDeviceBind() {
  return request({
    url: '/app-api/member/device-user/get',
    method: 'get'
  })
};