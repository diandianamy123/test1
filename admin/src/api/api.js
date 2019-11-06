import Axios from '@/libs/axios.js'

// 登录
export const login = (data) => {
    return Axios.request({
        method: "post",
        url: '/web/user/adminLogin',
        data: data
    })
}

// 菜单列表
export const menuList = () => {
    return Axios.request({
        method: "post",
        url: "/admin/authmenu/list.htm",
        data: {}
    })
}

// 首页数据
export const home = () => {
    return Axios.request({
        method: "post",
        url: "/admin/statistics/indexStatistics.htm",
        data: {}
    })
}

// 新增角色
export const addRole = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/authrole/add.htm",
        data: data
    })
}

// 修改角色
export const modifyRole = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/authrole/update.htm",
        data: data
    })
}

// 删除角色
export const deleteRole = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/authrole/delete.htm",
        data: data
    })
}

// 角色列表
export const roleList = () => {
    return Axios.request({
        method: "post",
        url: "/admin/authrole/list.htm",
        data: {}
    })
}

// 角色详情
export const roleDetails = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/authrole/read.htm",
        data: data
    })
}

// 轮播图新增
export const imgAdd = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/contentplayimage/add.htm",
        data: data
    })
}

// 轮播图修改
export const imgModify = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/contentplayimage/update.htm",
        data: data
    })
}

// 轮播图删除
export const imgDelete = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/contentplayimage/delete.htm",
        data: data
    })
}

// 轮播图列表
export const imgList = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/contentplayimage/list.htm",
        data: data
    })
}

// 轮播图详情
export const imgListDetails = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/contentplayimage/read.htm",
        data: data
    })
}

// 平台公告新增
export const platformAdd = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/contentinfo/add.htm",
        data: data
    })
}

// 平台公告修改
export const platformModify = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/contentinfo/update.htm",
        data: data
    })
}

// 平台公告删除
export const platformDelete = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/contentinfo/delete.htm",
        data: data
    })
}

// 平台公告列表
export const platformList = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/contentinfo/page.htm",
        data: data
    })
}

// 平台公告详情
export const platformDetails = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/contentinfo/read.htm",
        data: data
    })
}

// 用户等级配置新增
export const merchantAdd = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/configuserlevel/add.htm",
        data: data
    })
}

// 用户等级配置修改
export const merchantModify = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/configuserlevel/update.htm",
        data: data
    })
}

// 用户等级配置删除
export const merchantDelete = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/configuserlevel/delete.htm",
        data: data
    })
}

// 用户等级配置列表
export const merchantList = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/configuserlevel/list.htm",
        data: data
    })
}

// 用户等级配置详情
export const merchantDetails = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/configuserlevel/read.htm",
        data: data
    })
}

// 资产明细列表
export const asssetsList = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/useraccount/page.htm",
        data: data
    })
}

// 资产明细统计
export const asssetsTotal = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/useraccount/page/statistics",
        data: data
    })
}

// 资产明细导出
export const asssetsExport = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/user/exportAccount.htm",
        data: data
    })
}

// 出金审核
export const cashExamine = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/usercharge/outApply",
        data: data
    })
}

// 版本新增
export const editionAdd = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/configversion/add.htm",
        data: data
    })
}

// 版本修改
export const editionModify = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/configversion/update.htm",
        data: data
    })
}

// 版本删除
export const editionDelete = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/configversion/delete.htm",
        data: data
    })
}

// 版本列表
export const editionList = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/configversion/list.htm",
        data: data
    })
}

// 版本列表详情
export const editionDetails = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/configversion/read.htm",
        data: data
    })
}

// 修改密码
export const modifyPassword = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/authuser/updatePwd",
        data: data
    })
}

// 新增用户
export const addUser = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/authuser/add.htm",
        data: data
    })
}

// 修改用户
export const modifyUser = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/authuser/update.htm",
        data: data
    })
}

// 删除用户
export const deleteUser = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/authuser/delete.htm",
        data: data
    })
}

// 用户列表
export const userList = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/authuser/list.htm",
        data: data
    })
}

// 用户详情
export const userDetailes = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/authuser/read.htm",
        data: data
    })
}

//系统配置 获取系统配置
export const getConfig = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/config/getConfig",
        timeout: 60000,
        data: data
    })
}

//系统配置 修改系统配置
export const updateConfig = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/config/updateConfig",
        data: data
    })
}

// 问题反馈列表
export const feedbackList = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/userfeedback/page.htm",
        data: data
    })
}

// 问题反馈详情
export const readfeedback = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/userfeedback/read.htm",
        data: data
    })
}

// 资产明细列表
export const accountPage = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/user/accountPage.htm",
        data: data
    })
}

// 客户列表
export const customerList = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/user/userPage.htm",
        data: data
    })
}

// 我的团队列表
export const myTeamList = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/user/myTeamPage.htm",
        data: data
    })
}

// 充值记录列表
export const rechargeList = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/user/rechargePage.htm",
        data: data
    })
}

// 买币记录列表
export const buyCoinList = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/user/buyCoinPage.htm",
        data: data
    })
}

// 提币列表
export const withdrawalAddressList = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/useraddress/page.htm",
        data: data
    })
}

// 提币/现申请列表
export const withdrawalCashList = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/useraccountapply/page.htm",
        data: data
    })
}

// 提币/现申请审核
export const withdrawalCashExamine = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/useraccountapply/apply.htm",
        data: data
    })
}

// 充值套餐获取
export const getProduct = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/product/read.htm",
        data: data
    })
}

// 充值套餐修改
export const updateProduct = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/product/update.htm",
        data: data
    })
}
//客户列表 资金密码重置
export const updateFunPw = (data) => {
    return Axios.request({
        method: "post",
        url: "/admin/user/updateFundPw.htm",
        data: data
    })
}

