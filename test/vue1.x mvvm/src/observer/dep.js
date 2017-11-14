export default class Dep{
  constructor() {
    this.subs = ""
  }
  notify() {
    this.subs.update();
  }
  addSubs(value) {
    this.subs = value
  }
}

Dep.target = null;