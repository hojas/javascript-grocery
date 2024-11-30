import chalk from 'chalk'

console.log(chalk.blue('----- inheritance -----'))

/**
 * 1. Prototype Inheritance
 * 1. 原型继承
 *
 * Problem: Shared properties between instances of different constructors.
 * 问题：不同构造函数的实例共享属性。
 */
{
  function Parent1() {
    this.name = 'parent1'
    this.list = [1, 2, 3]
  }

  function Child1() {
    this.name = 'child1'
  }

  Child1.prototype = new Parent1()

  const s1 = new Child1()
  const s2 = new Child1()
  s1.list.push(4)
  console.log(s1.list) // [1, 2, 3, 4]
  console.log(s2.list) // [1, 2, 3, 4]
}

/**
 * 2. Constructor Inheritance
 * 2. 构造函数继承
 *
 * Problem: prototype of parent are not inherited.
 * 问题：父类的原型不会被继承。
 */
{
  function Parent2() {
    this.name = 'parent2'
  }

  Parent2.prototype.x = 'x'
  Parent2.prototype.getName = function () {
    return this.name
  }

  function Child2() {
    Parent2.call(this)
    this.type = 'child2'
  }

  const child = new Child2()
  console.log(child) // { name: 'parent2', type: 'child2' }
  console.log(child.x) // undefined
  try {
    console.log(child.getName()) // Uncaught TypeError: child.getName is not a function
  }
  catch (e) {
    console.error(e)
  }
}

/**
 * 3. Composition Inheritance
 * 3. 组合继承
 *
 * Problem: Parent constructor called twice.
 * 问题：父类的构造函数被调用两次。
 */
{
  function Parent3() {
    this.name = 'parent3'
    this.list = [1, 2, 3]
  }

  Parent3.prototype.getName = function () {
    return this.name
  }

  function Child3() {
    // call Parent3 second time
    Parent3.call(this)
    this.type = 'child3'
  }

  // call Parent3 first time
  Child3.prototype = new Parent3()
  Child3.prototype.constructor = Child3

  const s1 = new Child3()
  const s2 = new Child3()
  s1.list.push(4)
  console.log(s1.list) // [1, 2, 3, 4]
  console.log(s2.list) // [1, 2, 3]
  console.log(s1.getName()) // parent3
  console.log(s2.getName()) // parent3
}

/**
 * 4. Prototype-based Inheritance
 * 4. 原型式继承
 *
 * Problem: Shared reference type properties between instances of different constructors.
 * 问题：不同构造函数的实例共享引用类型属性。
 */
{
  const parent = {
    name: 'parent',
    list: [1, 2, 3],
    getName() {
      return this.name
    },
  }

  const s1 = Object.create(parent)
  s1.name = 'Tom'
  s1.list.push(4)

  const s2 = Object.create(parent)
  s2.list.push(5)

  console.log(s1.name) // Tom
  console.log(s1.name === s1.getName()) // true
  console.log(s2.name) // parent
  console.log(s1.list) // [1, 2, 3, 4, 5]
  console.log(s2.list) // [1, 2, 3, 4, 5]
}

/**
 * 5. Parasitic Inheritance
 * 5. 寄生式继承
 */
{
  const parent = {
    name: 'parent',
    list: [1, 2, 3],
    getName() {
      return this.name
    },
  }

  function clone(original) {
    const obj = Object.create(original)
    obj.getList = function () {
      return this.list
    }
    return obj
  }

  const child = clone(parent)
  console.log(child.getName()) // parent
  console.log(child.getList()) // [1, 2, 3]
}

/**
 * 6. Parasitic Combination Inheritance
 * 6. 寄生组合式继承
 */
{
  function clone2(Parent, Child) {
    Child.prototype = Object.create(Parent.prototype)
    Child.prototype.constructor = Child
  }

  function Parent6() {
    this.name = 'parent6'
    this.list = [1, 2, 3]
  }

  Parent6.prototype.getName = function () {
    return this.name
  }

  function Child6() {
    Parent6.call(this)
    this.friend = 'Tom'
  }

  clone2(Parent6, Child6)

  Child6.prototype.getFriend = function () {
    return this.friend
  }

  const s1 = new Child6()
  console.log(s1) // { name: 'parent6', list: [4, 5, 6] }
  console.log(s1.getName()) // parent6
  console.log(s1.getFriend()) // Tom
}

/**
 * 7. class Inheritance
 * 7. 类继承
 */
{
  class Parent {
    constructor(name) {
      this.name = name
    }

    getName() {
      return this.name
    }
  }

  class Child extends Parent {
    constructor(name, age) {
      super(name)
      this.age = age
    }
  }

  const s = new Child('Jack', 20)
  console.log(s.getName()) // Jack
}

console.log(chalk.blue('----- inheritance end -----'))
