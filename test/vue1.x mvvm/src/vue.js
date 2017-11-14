import Oberver from './observer'
import Vue from './instance/vue'

var v = new Vue({
  data: {
    a: 1,
    b:2
  }
})

v.$watch('a', () => {console.log('赋值成功')})

setTimeout(() => {
  v.a = 2;
  console.log(v.a)
},1000)