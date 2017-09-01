// Observer  defineReactive  observe

export default class Observer {
    constructor(value) {
        this.value = value
        this.walk(value)
    }
    walk(value) {
        Object.keys(value).forEach(key => this.convert(key, this.value[key]))
    }
    convert(key, value) {
        defineReactive(this.obj, key, value)
    }
}

export function defineReactive(obj, key, val) {
    var dep = new Dep()
    var childOb = isObject(val)
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: () => val,
        set: (newValue) => {
            var value = val
            if(newValue === val) {
                return 
            }
            val = newValue
            childOb = isObject(newValue)
            dep.notiyf()
        }
    })
}

export function isObject(obj) {
    if(!obj || typeof obj !== 'object') {
        return 
    }
    return new Observer(obj)
}