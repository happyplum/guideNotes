---
sidebar: auto
---

# TypeScript

::: tip
本笔记主要记录一些 ts 的常用功能
:::

## 基本类型

### 布尔值

```ts
let isDone: boolean = false;
```

### 数字

```ts
let decLiteral: number = 6; //十进制
let hexLiteral: number = 0xf00d; //十六进制
let binaryLiteral: number = 0b1010; //二进制
let octalLiteral: number = 0o744; //八进制
let notANumber: number = NaN; //NaN
let infinityNumber: number = Infinity; //Infinity
```

### 字符串

```ts
let name: string = "a";
let name: string = "b";
let name: string = `c`;
```

### 数组

```ts
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3];
```

### 元组 Tuple

```ts
let x: [string, number];
x = ["hello", 10]; // OK
x = [10, "hello"]; // Error
```

### 枚举

```ts
enum Color {
  //default 0 start
  Red = 2, //2
  Green, //3
  Blue, //4
}
let c: Color = Color.Green;
c = "gray"; //Error: string 不能赋值给 `Color` 类型
```

### Any 一把梭

```ts
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
```

### Void 无返回

```ts
function warnUser(): void {
  console.log("This is my warning message");
  //known return
}
```

### Null 和 Undefined

```ts
let u: undefined = undefined;
let n: null = null;
```

:::tip

- 默认情况下 null 和 undefined 是所有类型的子类型。
- 可以将 null 和 undefined 赋值给 number 类型，但是不能将 number 赋值给 null 和 undefined
- 但是实际上未定义的 number 我们会使用 NaN 来定义
  :::

### Never

- 一个从来不会有返回值的函数(如：如果函数内含有 while(true) {})
- 一个总是会抛出错误的函数(如：function foo() { throw new Error('Not Implemented') }，foo 的返回类型是 never)

```ts
function error(message: string): never {
  throw new Error(message);
}
```

::: tip 那么和 Void 有什么区别？

<details>
<summary>点击查看详细内容</summary>
- Void 表示没有任何类型，可以赋值为 null 和 undefined,哪怕没有 return 的函数也会返回个 undefined
- Never 表示一个不存在的值，不能赋值为 null 和 undefined,在函数上表示这个函数不会有任何返回
</details>
  :::

### Object

平时怎么定义对象？

```ts
let o: Record<string, any>;
```

关于 Record 的定义

```ts
type Record<K extends string, T> = {
  [P in K]: T;
};
```

:::tip
为什么不使用`let o:object`?

<details>
<summary>点击查看详细内容</summary>
因为object表示一个非原始类型的值,这会导致他无法控制任何键和值，和any并没有太大区别
</details>
:::

### 字面量

字面量常用于代表一个准确的变量

```ts
let a: "a" = "a";
let b: 1 = 1;
let c: true = true;
```

但是我们经常把他用于联合类型中

```ts
type Direction = "North" | "South" | "East" | "West";
let d: Direction;
d = "North"; //ok
d = "Center"; //error
```

## 类型断言

```ts
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
//or
let strLength: number = (<string>someValue).length;
```

## 类型别名

```ts
type StringOrNumber = string | number;
let myFavoriteNumber: StringOrNumber = "seven";
let myFavoriteNumber2: StringOrNumber2 = 123;

type Person = {
  age: number;
  name: string;
};
const person: Person = {
  age: 18,
  name: "llo",
};
```

## interface

interface 的优势就是可以进行合并

```ts
interface Person {
  name: string;
}
interface Person {
  age: number;
}
const person: Person = {
  age: 18,
  name: "llo",
};
```

我基本用在内置的 window 变量上注册新的自定义属性

```ts
interface Window {
  getDictByLookUpName: (string) => LookUpName[];
  filterDictByLookUpNameAndValue: (string, any) => LookUpName;
  APP: any;
  echarts: any;
}
```

## 只读 Readonly

Readonly 只能适用于数组，元组，对象

```ts
type Foo = {
  bar: number;
  bas: number;
};
type FooReadonly = Readonly<Foo>;
const foo: Foo = { bar: 123, bas: 456 };
const fooReadonly: FooReadonly = { bar: 123, bas: 456 };
//or
const fooReadonly = { bar: 123, bas: 456 } as const;

foo.bar = 456; // ok
fooReadonly.bar = 456; // Error: bar 属性只读
```

```ts
type Foo = {
  bar: number;
  readonly bas: number;
};
const fa: Foo = { bar: 1, bas: 2 };
fa.bar = 1;
fa.bas = 2; // Error: Cannot assign to 'bas' because it is a read-only property.

class A {
  foo: number;
  readonly foa: number;
}
const ca: A = { foo: 1, foa: 2 };
ca.foo = 1;
ca.foa = 2; // Error: Cannot assign to 'foa' because it is a read-only property.
```

:::tip
readonly 和 Readonly 有什么区别？

<details>
<summary>点击查看详细内容</summary>
<p>readonly 是一个关键字，用于对某个键值类型声明的定义</p>
<p>Readonly 是一个工具类型，类似 Record</p>
</details>
:::

## 常用关键字

### typeof

用于获取类型，可以是类，接口，组件等

```ts
//类型判断
const a = 1;
typeof a; // "number"

//赋值建立类型
const p = { x: 1, y: 2 };
type P = typeof p; // { x: number; y: number; }

//获取对象
type Point = { x: number; y: number };
const p: Point = { x: 1, y: 2 };
typeof p; // Point

//获取组件
import Compose from "@/compose";
typeof Compose; // ComposeType{props,emits....}

//变态的使用方法,用于快速建立值的联合类型
const p = { x: "1", y: 2 };
type P = typeof p; // { x: number; y: number; }
type VALUE = P[keyof P]; // "1" | 2
```

### keyof

用于获取 Object 的 key 值

```ts
type Point = { x: number; y: number };
type P = keyof Point; // "x" | "y" 返回了字面量的联合类型
```

```tip
keyof,typeof可以组合使用
```

### instanceof

用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上

```ts
function Person(name) {
  this.name = name;
}

let person = new Person("Alice");

console.log(person instanceof Person); // true
console.log(person instanceof Object); // true
```

### in

用于检查一个属性是否存在于指定的对象中

```ts
let person = {
  name: "Alice",
  age: 25,
};

console.log("name" in person); // true
console.log("gender" in person); // false
```

### declare

declare 只用于 d.ts 的声明文件，用于标注全局声明
:::tip
d.ts 是声明文件，在 ts 的 include 中配置加载
:::

```ts
// 针对 namespace global 的增加定义
declare global {
  namespace NodeJS {
    interface Global {
      echarts: any;
    }
  }
  namespace JSX {
    // tslint:disable no-empty-interface
    type Element = VNode;
    // tslint:disable no-empty-interface
    type ElementClass = ComponentRenderProxy;
    interface ElementAttributesProperty {
      $props: any; // specify the property name to use
    }
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
```

## 函数

### 定义函数

```ts
function add(a: number, b: number): number;
```

### 函数重载&方法重载

一般只要在函数和方法前面定义好函数重载，就可以在函数和方法中定义具体实现

```ts
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: number | string, b: number | string): number | string;

###

class A {
  add(a: number, b: number): number;
  add(a: string, b: string): string;
  add(a: number | string, b: number | string): number | string;
}
```
