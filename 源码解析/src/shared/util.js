/* @flow */
//暴露一些公用方法
// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining

//快速判断是否是Undefined
export function isUndef(v: any): boolean %checks {
  return v === undefined || v === null
}

//快速判断不是undefined
export function isDef(v: any): boolean %checks {
  return v !== undefined && v !== null
}

export function isTrue(v: any): boolean %checks {
  return v === true
}

export function isFalse(v: any): boolean %checks {
  return v === false
}

/**
 * 判断是都是原始类型
 */
export function isPrimitive(value: any): boolean %checks {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 * 判断是都是Object类型
 */
export function isObject(obj: mixed): boolean %checks {
  return obj !== null && typeof obj === 'object'
}

const _toString = Object.prototype.toString

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 * Object.prototype.toString判断判断是否是Object类型
 */
export function isPlainObject(obj: any): boolean {
  return _toString.call(obj) === '[object Object]'
}

/**
 * Object.prototype.toString判断判断是否是RegExp类型
 */
export function isRegExp(v: any): boolean {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
export function isValidArrayIndex(val: any): boolean {
  //parseFloat() 函数可解析一个字符串,并返回一个浮点数
  const n = parseFloat(val)
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 * 接收任何类型的参数并转化为字符串返回
 */
export function toString(val: any): string {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2) //将对象转换成json字符串，并缩进2个空格
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 * 接收任何类型的参数并转化为Number返回
 */
export function toNumber(val: string): number | string {
  const n = parseFloat(val)
  /**
   * 如果传入的字符串不能转换成数字，则返回原字符串
   * isNaN : 判断是否是非数字
   */
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 * 将字符串以逗号隔开生成一个对象。返回一个函数，判断这个函数接受的参数是否在对象中
 */
export function makeMap(
  str: string,
  expectsLowerCase?: boolean
): (key: string) => true | void {
  const map = Object.create(null)
  const list: Array<string> = str.split(',')
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase
    ? val => map[val.toLowerCase()]
    : val => map[val]
}

/**
 * Check if a tag is a built-in tag.
 * 查询是否是嵌套标签slot,component
 */
export const isBuiltInTag = makeMap('slot,component', true)

/**
 * Check if a attribute is a reserved attribute.
 * 查询是否是嵌套标签key,ref,slot,is
 */
export const isReservedAttribute = makeMap('key,ref,slot,is')

/**
 * Remove an item from an array
 * 从数组arr中移除item
 */
export function remove(arr: Array<any>, item: any): Array<any> | void {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 * 判断key是否是obj的属性(非继承)
 */
const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn(obj: Object | Array<*>, key: string): boolean {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
export function cached<F: Function>(fn: F): F {
  const cache = Object.create(null)
  return (function cachedFn(str: string) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }: any)
}

/**
 * Camelize a hyphen-delimited string.
 * 将 ‘-’ 字符形式的字符串转换成驼峰形式
 * \w匹配字母或数字或下划线或汉字
 */
const camelizeRE = /-(\w)/g
export const camelize = cached((str: string): string => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
})

/**
 * Capitalize a string.
 * 将传入的字符串以首字母大写的形式返回
 */
export const capitalize = cached((str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
})

/**
 * Hyphenate a camelCase string.
 */
const hyphenateRE = /([^-])([A-Z])/g
export const hyphenate = cached((str: string): string => {
  return str
    .replace(hyphenateRE, '$1,$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
})

/**
 * Simple bind, faster than native
 * 待解
 */
export function bind(fn: Function, ctx: Object): Function {
  function boundFn(a) {
    const l: number = arguments.length
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 * 将类似数组对象转换成真实数组
 * 类似数组对象：let a = {0: 1, 1: 2, 2: 3, length: 3}
 */
export function toArray(list: any, start?: number): Array<any> {
  start = start || 0
  let i = list.length - start
  const ret: Array<any> = new Array(i)
  while (i--) {
    ret[i] = list[i + start]
  }
  return ret
}

/**
 * Mix properties into target object.
 * 浅拷贝，用于对象之间的属性拷贝
 */
export function extend(to: Object, _from: ?Object): Object {
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 * 将数组中的多个对象整合到一个对象中
 */
export function toObject(arr: Array<any>): Object {
  const res = {}
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i])
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
export function noop(a?: any, b?: any, c?: any) { }

/**
 * Always return false.
 */
export const no = (a?: any, b?: any, c?: any) => false

/**
 * Return same value
 */
export const identity = (_: any) => _

/**
 * Generate a static keys string from compiler modules.
 * 从编译器模块中生成一个静态的字符串密钥
 * reduce: 计算数组元素相加后的总和
 * concat: 用于连接两个或多个数组
 */
export function genStaticKeys(modules: Array<ModuleOptions>): string {
  return modules.reduce((keys, m) => {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
export function looseEqual(a: any, b: any): boolean {
  if (a === b) return true
  const isObjectA = isObject(a)
  const isObjectB = isObject(b)
  if (isObjectA && isObjectB) {
    try {
      const isArrayA = Array.isArray(a)
      const isArrayB = Array.isArray(b)
      /**
       * 若数组中有对象，递归判断
       * a,b为数组
       * every: 测试数组中的项是否满足某一条件,当所有项全部满足时返回true
       */
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every((e, i) => {
          return looseEqual(e, b[i])
        })
        //Object.keys：以数组的方式返回Object中的所有属性名
      } else if (!isArrayA && !isArrayB) {
        const keysA = Object.keys(a)
        const keysB = Object.keys(b)
        return keysA.length === keysB.length && keysA.every(key => {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

export function looseIndexOf(arr: Array<mixed>, val: mixed): number {
  for (let i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) return i
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
export function once(fn: Function): Function {
  let called = false
  return function () {
    if (!called) {
      called = true
      fn.apply(this, arguments)
    }
  }
}
