var uid = 0;
export default class Dep{
    constructor() {
        this.id = uid++;
        this.subs = []
    }
    notify() {
        this.subs.forEach(function (sub) {
            sub.update();
        });
    }
    addSub(value) {
        this.subs.push(value);
    }
    depend() {
        console.log("depend")
        Dep.target.addDep(this)
    }
}

Dep.target = null;