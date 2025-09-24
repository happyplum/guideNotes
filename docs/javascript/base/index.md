# javascript

## 闭包（Closure）

### 概念本质

> 闭包是函数 + 其词法作用域的组合。即使函数在其词法作用域外被调用，它依然能访问其定义时的作用域中的变量。

换句话说：函数记住了它出生时的环境。

### 工作原理

JavaScript 的作用域是词法作用域（Lexical Scope），即函数的作用域在编写代码时就已确定（不是运行时）。

当一个内部函数被返回或传递到外部时，JavaScript 引擎会保留该函数能访问的所有外部变量的引用，防止它们被垃圾回收 —— 这就是闭包。

```js
function outer() {
  let count = 0;
  return function inner() {
    count++;
    console.log(count);
  };
}

const counter = outer(); // outer 执行完毕，但 count 未被销毁
counter(); // 1
counter(); // 2 —— 闭包让 inner 记住了 count！
```

### 循环中的闭包陷阱

```js
// ❌ 错误写法
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 输出 3, 3, 3
}

// ✅ 正确写法1：用 let（块级作用域）
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 0, 1, 2
}

// ✅ 正确写法2：用闭包包裹
for (var i = 0; i < 3; i++) {
  (function (j) {
    setTimeout(() => console.log(j), 100);
  })(i);
}
```

### 关于闭包的内存泄露

这是一个非常经典的前端面试题

**为什么可能造成内存泄漏？**
闭包会保持对外部变量的引用，阻止垃圾回收机制释放这些变量。当这些引用不再需要但仍然存在时，就会造成内存泄漏。

常见的内存泄漏场景:

1. 循环引用（DOM + JavaScript）

```js
// 问题代码
function createHandler() {
  const element = document.getElementById("myButton");
  const largeData = new Array(1000000).fill("data");

  element.onclick = function () {
    console.log(largeData.length); // 闭包引用了largeData
  };
}

// 即使element被移除，largeData仍无法被回收
```

```js
// 正确做法
function createHandler() {
  const element = document.getElementById("myButton");
  const largeData = new Array(1000000).fill("data");

  const handler = function () {
    console.log(largeData.length);
    // 使用完后手动清理
    element.onclick = null;
    // 或者将largeData设为null
  };

  element.onclick = handler;
}
```

2. 定时器中的闭包

```js
// 问题代码
function startTimer() {
  const hugeArray = new Array(1000000).fill("data");

  setInterval(() => {
    console.log("Timer running");
    // 这个回调函数形成了闭包，引用了hugeArray
  }, 1000);
}

// 定时器永远不会停止，hugeArray永远无法被回收
```

```js
// 正确做法
function startTimer() {
  const hugeArray = new Array(1000000).fill("data");
  const timerId = setInterval(() => {
    console.log("Timer running");
  }, 1000);

  // 提供清理方法
  return () => {
    clearInterval(timerId);
    // hugeArray现在可以被回收了
  };
}

const cleanup = startTimer();
// 在适当时候调用 cleanup();
```

3. 事件监听器未移除

```js
// 问题代码
class Component {
  constructor() {
    this.data = new Array(1000000).fill("data");
    this.attachEvent();
  }

  attachEvent() {
    document.addEventListener("click", () => {
      // 闭包引用了this.data
      console.log(this.data.length);
    });
  }
}

// 组件销毁时没有移除事件监听器
```

```js
// 使用WeakMap存储不需要强引用的数据
const elementData = new WeakMap();

function attachHandler(element) {
  const largeData = new Array(1000000).fill("data");
  elementData.set(element, largeData);

  element.onclick = function () {
    const data = elementData.get(element);
    console.log(data?.length);
  };
}

// 当element被垃圾回收时，对应的largeData也会被自动清理
```

## 构造器/构造函数（Constructor）

用于创建对象，是面向对象编程的基础

> constructor 是一种用于创建和初始化 class 对象实例的特殊方法。(MDN)
> 构造器是一个特殊的函数，用于创建和初始化对象实例。它通常与 new 关键字一起使用。

构造函数（ES5 风格）

```js
// 构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayHello = function () {
    console.log(`Hello, I'm ${this.name}`);
  };
}

// 使用 new 关键字创建实例
const person1 = new Person("Alice", 25);
const person2 = new Person("Bob", 30);

console.log(person1.name); // 'Alice'
person1.sayHello(); // 'Hello, I'm Alice'
```

类构造器（ES6+ 风格）

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    console.log(`Hello, I'm ${this.name}`);
  }
}

const person = new Person("Charlie", 28);
```

### new关键字

当我们使用**new**操作符为**构造函数**创建**实例**时，发生了下面**4**件事：

1.创建一个新对象.

2.为新对象添加属性\_\_proto\_\_，将该属性链接至构造函数的原型对象.

3.执行构造函数，this被绑定在新对象上.

4.确保返回一个对象.

new的手动实现

```js
// 定义构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// 手动实现new:
// constructor: 构造函数
// ...args: 构造函数参数
function myNew(constructor, ...args) {
  // 1. 创建一个新对象
  const obj = {};
  // 2. 为新对象添加属性__proto__，将该属性链接至构造函数的原型对象
  obj.__proto__ = constructor.prototype;
  // 3. 执行构造函数，this被绑定在新对象上
  const res = constructor.call(obj, ...args);
  // 4. 确保返回一个对象
  return res instanceof Object ? res : obj;
}

const usr1 = myNew(Person, "Jack", 18);
const usr2 = new Person("Jack", 18);
```

## 原型链（Prototype Chain）

### 概念本质

> JavaScript 中对象通过 \_\_proto\_\_（或 Object.getPrototypeOf）链接到其构造函数的 prototype 对象，形成一条链，用于属性和方法的查找 —— 这就是原型链。

> js的继承主要依赖原型链来实现

所有对象都有原型（除了 Object.prototype），原型链的终点是 null。

### 工作原理

构造函数、prototype、实例、proto 的关系：

```js
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  console.log(`Hello, I'm ${this.name}`);
};

const p1 = new Person("Alice");

p1.__proto__ === Person.prototype; // true
Person.prototype.__proto__ === Object.prototype; //true
Object.prototype.__proto__ === null; // true
```

属性查找机制：1.自身属性 → 2.prototype → 3.prototype.prototype → ... → Object.prototype → null

原型链是 JS 实现继承的机制，但不是“类继承”，是“委托继承”。

只有构造函数（或 class） 才有意义的 prototype，箭头函数、普通函数调用没有。

prototype 是构造函数的属性；\_\_proto\_\_ 是实例对象的属性（非标准，推荐用 Object.getPrototypeOf）

### 实际示例

基础原型链

```js
function Animal(name) {
  this.name = name;
}
Animal.prototype.eat = function () {
  console.log("eating");
};

function Dog(name, breed) {
  Animal.call(this, name); // 借用构造函数
  this.breed = breed;
}
Dog.prototype = Object.create(Animal.prototype); // 建立原型链
Dog.prototype.constructor = Dog; // 普通函数无prototype,修复构造函数指向
Dog.prototype.bark = function () {
  console.log("woof!");
};

const dog = new Dog("Buddy", "Golden");
dog.eat(); // 继承自Animal
dog.bark(); // 本身的函数
```

instanceof 原理

```js
function myInstanceof(left, right) {
  let proto = Object.getPrototypeOf(left);
  while (proto) {
    if (proto === right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}

console.log(myInstanceof(dog, Dog)); // true
console.log(myInstanceof(dog, Animal)); // true
```

## 生成器（Generator）

用于生成序列，提供了一种优雅的迭代和控制流方式

> Generator 对象由生成器函数返回并且它符合可迭代协议和迭代器协议。(MDN)
> 构造函数并不是全局可用的,构造器的实例必须从生成器函数返回
> 生成器是一种特殊的函数，可以暂停和恢复执行，主要用于生成一个 **Generator** 迭代器对象。

定义生成器函数

```js
// 生成器函数 - 注意 function* 语法
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

// 调用生成器函数返回迭代器对象
const generator = numberGenerator();

console.log(generator.next()); // { value: 1, done: false }
console.log(generator.next()); // { value: 2, done: false }
console.log(generator.next()); // { value: 3, done: false }
console.log(generator.next()); // { value: undefined, done: true }
```

## 浏览器渲染过程

> 浏览器将 HTML、CSS、JavaScript 转换为用户可见页面的过程，涉及多个阶段：解析、样式计算、布局、绘制、合成。

工作原理:

网络阶段

1. DNS解析
2. TCP三次握手/四次挥手 + (TLS四次握手)
3. 请求/获取数据

绘制阶段

1. 构建 DOM 树
2. 构建 CSSOM 树
3. 构建渲染树（Render Tree）
4. 布局（Layout / Reflow）
5. 绘制（Paint）
6. 合成（Composite）

### 关于阻塞

```html
<head>
  <link rel="stylesheet" href="heavy.css" />
  <!-- 阻塞渲染 -->
</head>
<body>
  <div>Hello</div>
  <script src="app.js"></script>
  <!-- 阻塞 HTML 解析 -->
</body>
```

```html
<link
  rel="stylesheet"
  href="critical.css"
  media="print"
  onload="this.media='all'"
/>
<!-- 异步加载 CSS -->
<script defer src="app.js"></script>
<!-- defer 不阻塞解析 -->
```

script 可以增加 async 或 defer 进行异步加载
:::tip
async
对于普通脚本，如果存在 async 属性，那么普通脚本会被并行请求，并尽快解析和执行。
对于模块脚本，如果存在 async 属性，那么脚本及其所有依赖都会在延缓队列中执行，因此它们会被并行请求，并尽快解析和执行。
:::
:::tip
defer
这个布尔属性的设置是为了向浏览器表明，该脚本是要在文档被解析后，但在触发 DOMContentLoaded 事件之前执行的
:::

link可以通过media="print"来进行异步加载
:::tip
media 属性中提供媒体类型或查询；然后，只有在媒体条件为真时，才会加载此资源。
:::

### 触发重排 vs 重绘

```js
// ❌ 触发重排（影响布局）
element.style.width = "200px";
element.style.height = "100px";

// ✅ 触发重绘（不影响布局，仅样式）
element.style.color = "red";
element.style.backgroundColor = "blue";

// ✅ 最佳：使用 transform/opacity → 合成层，不触发重排重绘
element.style.transform = "translateX(100px)";
```
