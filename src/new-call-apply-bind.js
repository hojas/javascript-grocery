/**
 * new
 */
function myNew(Constructor, ...args) {
  if (typeof Constructor !== 'function') {
    throw new TypeError('fn must be a function')
  }

  const obj = Object.create(Constructor.prototype)
  const res = Constructor.apply(obj, args)

  return res instanceof Object ? res : obj
}

/**
 * apply
 */
Function.prototype.myApply = function (context, args) {
  context = context || globalThis

  const fnKey = Symbol('fnKey')
  context[fnKey] = this

  const res = context[fnKey](...(args || []))
  Reflect.deleteProperty(context, fnKey)
  return res
}

/**
 * call
 */
Function.prototype.myCall = function (context, ...args) {
  context = context || globalThis

  const fnKey = Symbol('fnKey')
  context[fnKey] = this

  const res = context[fnKey](...args)
  Reflect.deleteProperty(context, fnKey)
  return res
}

/**
 * bind
 */
Function.prototype.myBind = function (context, ...args) {
  const fn = this

  return function (...innerArgs) {
    context = context || globalThis

    const fnKey = Symbol('fnKey')
    context[fnKey] = fn

    const res = context[fnKey](...args, ...innerArgs)
    Reflect.deleteProperty(context, fnKey)
    return res
  }
}
