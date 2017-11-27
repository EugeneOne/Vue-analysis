import {observe} from '../observe/index.js'
import Compile from '../compiler'

export default class Vue{
    constructor(option) {
        this.$options = option;
        var data = this.$data = option.data;
        
        Object.keys(data).forEach((key) => {
            this._proxy(key)
        })
        if(data) {
            observe(data, this)
        } else {
            observe(this.$data = {}, true)
        }
        
        this.$compile = new Compile(this.$options.el || document.body, this)
    }

    // vm.data.xxx ——> vm.xxx
    _proxy(key) {
        let self = this;
        Object.defineProperty(self, key, {
            enumerable: true,
            configurable: false,
            get() {
                return self.$data[key]
            },
            set(newVal) {
                self.$data[key] = newVal;
            }
        })
    }
}