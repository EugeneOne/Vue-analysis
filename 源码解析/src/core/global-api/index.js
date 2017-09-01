/* @flow */

import config from '../config'
import { initUse } from './use'
import { initMixin } from './mixin'
import { initExtend } from './extend'
import { initAssetRegisters } from './assets'
import { set, del } from '../observer/index'
import { ASSET_TYPES } from 'shared/constants'
import builtInComponents from '../components/index'

import {
  warn,
  extend,
  nextTick,
  mergeOptions,
  defineReactive
} from '../util/index'

/**
 * 初始化vue全局配置
 */ 
export function initGlobalAPI (Vue: GlobalAPI) {
  // config
  const configDef = {}
  configDef.get = () => config
  if (process.env.NODE_ENV !== 'production') {
    // 不可直接给vue.config赋值，否则会warn提醒
    configDef.set = () => {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }
  Object.defineProperty(Vue, 'config', configDef)

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  // 这些不是公用api，慎用
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive
  }
  /**
   * https://cn.vuejs.org/v2/api/?#Vue-set-target-key-value
   * 用于设置对象的属性（不可添加根级属性）
   */ 
  Vue.set = set
  /**
   * https://cn.vuejs.org/v2/api/?#Vue-delete-target-key
   * 删除对象的属性
   */ 
  Vue.delete = del
  /**
   * https://cn.vuejs.org/v2/api/?#Vue-nextTick-callback-context
   * DOM更行后执行回调
   */ 
  Vue.nextTick = nextTick

  Vue.options = Object.create(null)
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue

  extend(Vue.options.components, builtInComponents)

  initUse(Vue)
  initMixin(Vue)
  initExtend(Vue)
  initAssetRegisters(Vue)
}
