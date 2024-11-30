// 判断一个值是否为复杂数据类型（对象或函数，且不为 null）
const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && obj !== null

// 深拷贝函数，支持循环引用处理，利用 WeakMap 来记录已经拷贝过的对象
export function cloneDeep(obj, hash = new WeakMap()) {
  // 如果对象是 Date 类型，直接返回一个新的 Date 实例
  if (obj.constructor === Date) {
    return new Date(obj)
  }
  // 如果对象是 RegExp 类型，直接返回一个新的 RegExp 实例
  if (obj.constructor === RegExp) {
    return new RegExp(obj)
  }
  // 如果当前对象已经被拷贝过，直接返回 WeakMap 中存储的克隆对象，防止循环引用
  if (hash.has(obj)) {
    return hash.get(obj)
  }

  // 获取对象的所有属性描述符
  const allDesc = Object.getOwnPropertyDescriptors(obj)
  // 创建一个新对象，其原型与当前对象一致，同时拷贝属性描述符
  const cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc)

  // 将当前对象与克隆对象存储到 WeakMap 中，用于循环引用处理
  hash.set(obj, allDesc)

  // 遍历对象的所有键，包括 Symbol 类型的键
  for (const key of Reflect.ownKeys(obj)) {
    // 如果键的值是复杂数据类型（但不是函数），递归进行深拷贝；否则直接赋值
    cloneObj[key] = (isComplexDataType(obj[key])) && typeof obj[key] !== 'function' ? cloneDeep(obj[key], hash) : obj[key]
  }

  // 返回深拷贝的对象
  return cloneObj
}
