---
sidebar: auto
---

# TypeScript

::: tip
本笔记主要记录一些 ts 的扩展功能笔记
详细可以查看 typescript[https://www.typescriptlang.org/docs/handbook/utility-types.html]
:::

## Parameters<Type>

根据函数的传参生成一个元组型 Type

```ts
type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;
```

例

```ts
declare function f1(arg: { a: number; b: string }): void;
type T1 = Parameters<typeof f1>;
type T1 = [
  arg: {
    a: number;
    b: string;
  },
];
```

## ReturnType<Type>

根据函数的返回值生成一个类型 Type

```ts
declare function f1(): { a: number; b: string };
type T1 = ReturnType<typeof f1>;
type T1 = {
  a: number;
  b: string;
};
```

## Partial<Type>

根据类型 Type 生成一个可选属性的新类型

```ts
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

例

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
type TodoPreview = Partial<Todo>;

const todo1: TodoPreview = {
  description: "clear clutter",
  completed: false,
};
```

## Pick<Type, Keys>

从类型 Type 中根据 Keys 所选属性构造一个新的类型

```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

例

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
type TodoPreview = Pick<Todo, "title" | "completed">;
const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
const todo: TodoPreview;
```

## Omit<Type, Keys>

从类型 Type 中根据 keys 剔除所选属性构造一个新的类型，和 Pick 相反

```ts
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

例

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
type TodoPreview = Omit<Todo, "description">;
const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
const todo: TodoPreview;
```

## Exclude<UnionType, ExcludedUnion>

针对联合类型的排除，进行联合类型的排除构建一个新的联合类型

```ts
type Exclude<T, U> = T extends U ? never : T;
```

例

```ts
// 直接排除某个值
type T0 = Exclude<"a" | "b" | "c", "a">;
type T0 = "b" | "c";
// 通过联合类型排除
type T1 = Exclude<"a" | "b" | "c", "a" | "b">;
type T1 = "c";
// 关于一些自动转换排除
type T2 = Exclude<string | number | (() => void), Function>;
type T2 = string | number;
// 没看懂，应该是根据联合类型中的匹配去排除
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; x: number }
  | { kind: "triangle"; x: number; y: number };
type T3 = Exclude<Shape, { kind: "circle" }>;
type T3 =
  | {
      kind: "square";
      x: number;
    }
  | {
      kind: "triangle";
      x: number;
      y: number;
    };
```

## Extract<Type, Union>

针对联合类型的提取，根据联合类型中的匹配去提取构建一个新的联合类型,和 Exclude 相反

```ts
type Extract<T, U> = T extends U ? T : never;
```

例

```ts
// 取交集
type T0 = Extract<"a" | "b" | "c", "a" | "f">;
type T0 = "a";
type T1 = Extract<string | number | (() => void), Function>;
type T1 = () => void;
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; x: number }
  | { kind: "triangle"; x: number; y: number };
type T2 = Extract<Shape, { kind: "circle" }>;
type T2 = {
  kind: "circle";
  radius: number;
};
```
