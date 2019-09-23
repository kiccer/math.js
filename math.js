/* global define */
const math = Object.create(Math)

// get the data type
math.type = function (t) {
  return Object.prototype.toString.call(t).slice(8, -1)
}

// parametric formatting
math.arg = function (...arg) {
  return arg.map(n => this.type(n) === 'Array' ? n : [n])
    .reduce((n, m) => n.concat(m))
    .map(n => +n)
}

// array summation
math.sum = function (...arg) {
  arg = this.arg(...arg)
  return arg.reduce((n, m) => n + m)
}

// average value
math.avg = function (...arg) {
  arg = this.arg(...arg)
  return this.sum(...arg) / arg.length
}

;((out) => {
  if (typeof define === 'function') {
    define(() => out)
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = out
  }
})(math)
