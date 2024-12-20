# SASS

## 关于 SASS@1 迁移^SASS@2

### @import 作废需要进行替换

1.正常使用`@use`进行替换
需要注意的是 `@use`不能工作在嵌套环境中，并且请置顶

例

```scss
@import "@/css/vars.scss";
```

```scss
@use "@/css/vars.scss";
```

2.关于嵌套环境
可以引入 `sass:meta` 使用 `load-css` 进行引入

例

```scss
#xxx:deep() {
  width: 100%;
  height: 100%;
  overflow: hidden;
  @import "./css/public.scss";
}
```

```scss
@use "sass:meta";
#xxx:deep() {
  @include meta.load-css("./css/public.scss");
  width: 100%;
  height: 100%;
  overflow: hidden;
}
```

3.关于命名空间重复
区别于 import，use 会使用 scss 的文件名注册命名空间来方便对象格式引用，如 index.scss 就会注册 index 的空间，你可以在下面使用 index.xxx 来使用 index 下的样式

这时候就要注册别名

例

```scss
// 关于antdv的全局样式修改
@import "@/css/polyfill/antdesgin/index.scss";

// 关于子项目劫持的全局样式修改
@import "@/css/polyfill/subapp/index.scss";
```

```scss
// 关于antdv的全局样式修改
@use "@/css/polyfill/antdesgin/index.scss" as antdesgin-index;

// 关于子项目劫持的全局样式修改
@use "@/css/polyfill/subapp/index.scss" as subapp-index;
```
