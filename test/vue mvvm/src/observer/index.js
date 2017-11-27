import Dep from './dep'

export default class Observer {
  constructor(value) {
    this.data = value;
    this.walk(value)
  }

  walk(value) {
    Object.keys(value).forEach((key) => {
      this.covert(key, this.data[key])
    })
  }
  covert(key, val) {
    this.defineReactive(this.data, key, val)
  }

  defineReactive(data, key, val) {

    var dep = new Dep();
    //var childOb = observer(val)
    observer(data[key]);
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get() {
        if (Dep.target) {
          dep.addSubs(Dep.target)
        }
        return val
      },
      set(newVal) {
        console.log("newVal:", newVal)
        if (val == newVal) {
          return;
        }
        val = newVal;
        dep.notify();
      }
    })
  }
}

export function observer(value) {
  if (typeof value !== 'object' || !value) {
    return;
  }
  new Observer(value);
}