// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import i18n from '@/locale'
import config from '@/config'
import installPlugin from '@/plugin'
import './index.less'

import md5 from 'js-md5'
import Public from "@/libs/public"

Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})

/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)

/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false

/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
Vue.prototype.$md5 = md5
Vue.prototype.$public = Public

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
