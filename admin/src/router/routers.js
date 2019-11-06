import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '*',
    name: 'login',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/home/home.vue')
      }
    ]
  },
  {
    path: "/system-manager",
    name: "system-manager",
    component: Main,
    meta: {
      title: "系统配置",
      icon: "ios-settings",
      access: ["系统配置", "用户协议", "关于我们", "奖励规则", "充值规则", "返佣规则", "版本管理", "其他配置", "用户等级配置"],
      showAlways: true
    },
    children: [
      {
        path: "my-agreement",
        name: "my-agreement",
        meta: {
          title: "用户协议",
          access: ["用户协议"]
        },
        component: () => import("@/view/system-manager/my-agreement.vue")
      },
      {
        path: "about-us",
        name: "about-us",
        meta: {
          title: "关于我们",
          access: ["关于我们"]
        },
        component: () => import("@/view/system-manager/about-us.vue")
      },
      /* {
        path: "award-rules",
        name: "award-rules",
        meta: {
          title: "奖励规则",
          access: ["奖励规则"]
        },
        component: () => import("@/view/system-manager/award-rules.vue")
      },
      {
        path: "recharge-rules",
        name: "recharge-rules",
        meta: {
          title: "充值规则",
          access: ["充值规则"]
        },
        component: () => import("@/view/system-manager/recharge-rules.vue")
      },
      {
        path: "commission-rules",
        name: "commission-rules",
        meta: {
          title: "返佣规则",
          access: ["返佣规则"]
        },
        component: () => import("@/view/system-manager/commission-rules.vue")
      }, */
      {
        path: "edition-list",
        name: "edition-list",
        meta: {
          title: "版本管理",
          access: ["版本管理"]
        },
        component: () => import("@/view/edition/edition.vue")
      },
      {
        path: "other-config",
        name: "other-config",
        meta: {
          title: "其他配置",
          access: ["其他配置"]
        },
        component: () => import("@/view/system-manager/other-config.vue")
      },
      {
        path: "merchant",
        name: "merchant",
        meta: {
          title: "用户等级配置",
          access: ["用户等级配置"]
        },
        component: () => import("@/view/system-manager/merchant.vue")
      },
    ]
  },
  {
    path: "/power",
    name: "power",
    component: Main,
    meta: {
      title: "权限管理",
      icon: "ios-lock",
      access: ["权限管理", "角色管理", "用户管理"],
      showAlways: true
    },
    children: [
      {
        path: "role",
        name: "role",
        meta: {
          title: "角色管理",
          access: ["角色管理"]
        },
        component: () => import("@/view/power/role.vue")
      },
      {
        path: "admin-list",
        name: "admin-list",
        meta: {
          title: "用户管理",
          access: ["用户管理"]
        },
        component: () => import("@/view/power/admin-list.vue")
      }
    ]
  },
  {
    path: "/add-role-href",
    name: "add-role-href",
    component: Main,
    meta: {
      hideInMenu: true
    },
    children: [
      {
        path: "add-role",
        name: "add-role",
        meta: {
          title: "新增角色"
        },
        component: () => import("@/view/power/add-role.vue")
      }
    ]
  },
  {
    path: "/edit-role-href",
    name: "edit-role-href",
    component: Main,
    meta: {
      hideInMenu: true,
    },
    children: [
      {
        path: 'edit-role',
        name: 'edit-role',
        meta: {
          title: "修改角色"
        },
        component: () => import('@/view/power/edit-role.vue')
      }
    ]
  },
  {
    path: "/content-manager",
    name: "content-manager",
    component: Main,
    meta: {
      title: "内容管理",
      icon: "ios-paper",
      access: ["内容管理", "轮播图", "平台公告", "问题反馈"],
      showAlways: true
    },
    children: [
      {
        path: "banner",
        name: "banner",
        meta: {
          title: "轮播图",
          access: ["轮播图"]
        },
        component: () => import("@/view/content-manager/banner.vue")
      },
      {
        path: "platform-info",
        name: "platform-info",
        meta: {
          title: "平台公告",
          access: ["平台公告"]
        },
        component: () => import("@/view/content-manager/platform-info.vue")
      },
      {
        path: "feedback",
        name: "feedback",
        meta: {
          title: "问题反馈",
          access: ["问题反馈"]
        },
        component: () => import("@/view/content-manager/feedback.vue")
      },
    ]
  },
  {
    path: "/platform-manager",
    name: "platform-manager",
    component: Main,
    meta: {
      hideInMenu: true
    },
    children: [
      {
        path: "platform-add",
        name: "platform-add",
        meta: {
          title: "平台公告新增"
        },
        component: () => import("@/view/content-manager/platform-add.vue")
      }
    ]
  },
  {
    path: "/platform-manager",
    name: "platform-manager",
    component: Main,
    meta: {
      hideInMenu: true
    },
    children: [
      {
        path: "platform-edit",
        name: "platform-edit",
        meta: {
          title: "平台公告修改"
        },
        component: () => import("@/view/content-manager/platform-edit.vue")
      }
    ]
  },
  {
    path: "/notice-manager",
    name: "notice-manager",
    component: Main,
    meta: {
      hideInMenu: true
    },
    children: [
      {
        path: "n-manager",
        name: "n-manager",
        meta: {
          title: "平台公告编辑"
        },
        component: () => import("@/view/content-manager/notice-manager.vue")
      }
    ]
  },
  {
    path: "/customer",
    name: "customer",
    component: Main,
    meta: {
      title: "客户管理",
      icon: "md-person",
      access: ["客户管理", "客户列表", "资产明细", "我的团队", "充值记录", "买币记录"],
      showAlways: true
    },
    children: [
      {
        path: "customer-list",
        name: "customer-list",
        meta: {
          title: "客户列表",
          access: ["客户列表"]
        },
        component: () => import("@/view/customer/customer-list.vue")
      },
      {
        path: "asset-details",
        name: "asset-details",
        meta: {
          title: "资产明细",
          access: ["资产明细"]
        },
        component: () => import("@/view/customer/asset-details.vue")
      },
      {
        path: "my-team",
        name: "my-team",
        meta: {
          title: "我的团队",
          access: ["我的团队"]
        },
        component: () => import("@/view/customer/my-team.vue")
      },
      {
        path: "recharge-record",
        name: "recharge-record",
        meta: {
          title: "充值记录",
          access: ["充值记录"]
        },
        component: () => import("@/view/customer/recharge-record.vue")
      },
      {
        path: "buy-record",
        name: "buy-record",
        meta: {
          title: "买币记录",
          access: ["买币记录"]
        },
        component: () => import("@/view/customer/buy-record.vue")
      },
    ]
  },
  {
    path: "/drawing",
    name: "drawing",
    component: Main,
    meta: {
      title: "提款管理",
      icon: "md-briefcase",
      access: ["提款管理", "提币地址管理", "提币申请", "提现申请"],
      showAlways: true
    },
    children: [
      {
        path: "withdrawal-address",
        name: "withdrawal-address",
        meta: {
          title: "提币地址管理",
          access: ["提币地址管理"]
        },
        component: () => import("@/view/drawing/withdrawal-address.vue")
      },
      {
        path: "withdrawal-application",
        name: "withdrawal-application",
        meta: {
          title: "提币申请",
          access: ["提币申请"]
        },
        component: () => import("@/view/drawing/withdrawal-application.vue")
      },
      {
        path: "cash-application",
        name: "cash-application",
        meta: {
          title: "提现申请",
          access: ["提现申请"]
        },
        component: () => import("@/view/drawing/cash-application.vue")
      },
    ]
  },
  {
    path: "/recharge-package-management",
    name: "recharge-package-management",
    component: Main,
    meta: {
      hideInBread: true,
      access: ["充值套餐管理"]
    },
    children: [
      {
        path: "r-p-m",
        name: "r-p-m",
        meta: {
          title: "充值套餐管理",
          icon: "logo-yen",
          access: ["充值套餐管理"]
        },
        component: () => import("@/view/recharge-package-management/recharge-package-management.vue")
      }
    ]
  },
  /* {
    path: "/modify-password",
    name: "modify-password",
    component: Main,
    meta: {
      hideInBread: true,
      // access: ["修改密码"]
    },
    children: [
      {
        path: "m-password",
        name: "m-password",
        meta: {
          title: "修改密码",
          icon: "ios-key",
          // access: ["修改密码"]
        },
        component: () => import("@/view/modify-password/modify-password.vue")
      }
    ]
  }, */
]
