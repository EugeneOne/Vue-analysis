import Dep from './observer/dep'

export default class Watcher {
    constructor(vm, expFn, cb) {
        this.vm = vm;
        this.expFn = expFn;
        this.cb = cb;
        this.value = this.get();
    }
    get() {
        Dep.target = this;
        var value = this.vm._data[this.expFn];
        Dep.target = null;
        return value;
    }
    update() {
        this.run();
    }
    run() {
        let self = this;
        var value = this.get();
        var oldVal = this.value;
        if( value != oldVal) {
            this.value = value;
            this.cb.call(self.vm)
        }
    }
}