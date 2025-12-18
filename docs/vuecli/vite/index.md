# vite

## 全局导入多个模块

```js
const locales = import.meta.glob("./*.json", options);
```

```js
{
    options：{
        eager:true, // 代表是否直接直接全载入，否则是动态加载
        base:'.', //加载时候的基本路径
    }
}
```
