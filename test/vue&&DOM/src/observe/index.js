import Dep from './dep'

export default class Observe{
    constructor(val) {
        this.data = val;
        this.walk(val)
    }
    walk(val) {
        Object.keys(val).forEach((key) => {
            this.defineReactive(this.data, key, val[key])
        })
    }
    convert(key, val) {
        this.defineReactive(this.data, key, val);
    }
    defineReactive(data, key, val) {
        console.log("defineReactive",data, key, val)
        let dep = new Dep();
        let childObj = observe(val);

        Object.defineProperty(data, key, {
            configurable: false,
            enumerable: true,
            get: function () {
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
            set: function (newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                // 新的值是object的话，进行监听
                childObj = observe(newVal);
                // 通知订阅者
                dep.notify();
            }   
        })
    }
}

export function observe(val) {
    if(!val || typeof val !== 'object') {
        return;
    }
    console.log(val)
    return new Observe(val)
}