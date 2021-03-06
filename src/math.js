'use strict'
/* global define */

// --------------------------------------
//                  math
// --------------------------------------
const math = Object.create(Math)

// get the data type
math.type = function (t) {
  return Object.prototype.toString.call(t).slice(8, -1)
}

// parametric formatting
math.arg = function (...arg) {
  return [].concat(...arg).map(n => +n)
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

// multiplication
math.mcl = function (...arg) {
  arg = this.arg(...arg)
  return arg.reduce((n, m) => n * m)
}

// number base conversion
math.hex = function (num, from = 16, to = 10) {
  num = String(num)
  return parseInt(num, from).toString(to)
}

// Random Numbers with Range (Will be abandoned)
math.rand = function (from = 0, to = 1, decimal = 17) {
  const dVal = this.abs(to - from)
  return +(Math.random() * dVal + this.min(from, to)).toFixed(decimal)
}

// Random Numbers with Range (random will replace rand)
math.random = function (...arg) {
  arg = this.arg(...arg)

  if (!arg.length) {
    arg = [0, 1, 17]
  } else if (arg.length === 1) {
    arg = [0, 1].concat(arg)
  } else if (arg.length === 2) {
    arg = arg.concat(17)
  }

  const from = arg[0]
  const to = arg[1]
  const decimal = arg[2]
  const dVal = this.abs(to - from)

  return +(Math.random() * dVal + this.min(from, to)).toFixed(decimal)
}

// math.min support array parameters
math.min = function (...arg) {
  arg = this.arg(...arg)
  return Math.min(...arg)
}

// math.max support array parameters
math.max = function (...arg) {
  arg = this.arg(...arg)
  return Math.max(...arg)
}

// Round up the number of reserved digits
math.ceil = function (num, decimal = 0) {
  const mu = 10 ** decimal
  return Math.ceil(num * mu) / mu
}

// Round down the number of reserved digits
math.floor = function (num, decimal = 0) {
  const mu = 10 ** decimal
  return Math.floor(num * mu) / mu
}

// Rounding the number of reserved digits
math.round = function (num, decimal = 0) {
  const mu = 10 ** decimal
  return Math.round(num * mu) / mu
}

// Returns the number of specified ranges
math.range = function (...arg) {
  return new math.Range(...arg)
}

// 人民币大写，转自：http://outofmemory.cn/code-snippet/177/javascript-jiang-renminbi-jine-switch-daxie
math.RMB = function (rmb) {
  const fraction = ['角', '分']
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  const unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']]

  let s = fraction.map((n, i) => (digit[Math.floor(Math.abs(rmb) * 10 * 10 ** i) % 10] + n).replace(/零./, '')).join('') || '整'

  let rmbInt = ~~Math.abs(rmb)

  for (let i = 0; i < unit[0].length && rmbInt > 0; i++) {
    let p = ''
    for (let j = 0; j < unit[1].length && rmbInt > 0; j++) {
      p = digit[rmbInt % 10] + unit[1][j] + p
      rmbInt = Math.floor(rmbInt / 10)
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
  }

  return (rmb < 0 ? '负' : '') + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整')
}

// --------------------------------------
//              math.Range
// --------------------------------------
math.Range = function (...arg) {
  this.r = (arg.length ? math.arg(...arg) : [0, 1]).sort((n, m) => n - m)
}

math.Range.prototype.in = function (num) {
  const s = this.r.slice(0, 1)[0]
  const e = this.r.slice(-1)[0]
  return Math.max(s, Math.min(num, e))
}

math.Range.prototype.rand = function (num = 17) {
  const s = this.r.slice(0, 1)[0]
  const e = this.r.slice(-1)[0]
  return math.random(s, e, num)
}

// --------------------------------------
//              export
// --------------------------------------
;((out) => {
  if (typeof define === 'function') {
    define(() => out)
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = out
  }
})(math)
