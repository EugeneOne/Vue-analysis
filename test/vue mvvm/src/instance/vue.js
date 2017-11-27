import Watcher from '../watcher'
import { observer } from '../observer'

export default class Vue {
    constructor(option) {
        this.$option = option;
        var data = this._data = option.data;
        Object.keys(data).forEach((key) => {
            this._proxy(key)
        })
        observer(data)
    }
    $watch(expFn, cb) {
        new Watcher(this, expFn, cb)
    }
    // vm.data.xx ——> vm.xxx
    _proxy(key) {
        let self = this;
        Object.defineProperty(self, key, {
            configurable: false,
            enumerable: true,
            get() {
                return self._data[key];
            },
            set(newValue) {
                self._data[key] = newValue;
            }
        })
    }
}