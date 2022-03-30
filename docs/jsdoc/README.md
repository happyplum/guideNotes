# JSDoc

## 命令名描述

-   @param @argument 指定参数名和说明来描述一个函数参数
-   @returns 描述函数的返回值
-   @author 指示代码的作者
-   @deprecated 指示一个函数已经废弃，而且在将来的代码版本中将彻底删除。要避免使用这段代码
-   @see 创建一个 HTML 链接，指向指定类的描述
-   @version 指定发布版本
-   @requires 创建一个 HTML 链接，指向这个类所需的指定类
-   @throws @exception 描述函数可能抛出的异常的类型
-   {@link} 创建一个 HTML 链接，指向指定的类。这与@see 很类似，但{@link}能嵌在注释文本中
-   @fileoverview 这是一个特殊的标记。如果在文件的第一个文档块中使用这个标记，则指定该文档块的余下部分将用来提供这个文件的概述
-   @class 提供类的有关信息，用在构造函数的文档中
-   @constructor 明确一个函数是某个类的构造函数
-   @type 指定函数的返回类型
-   @extends 指示一个类派生了另一个类。JSDoc 通常自己就可以检测出这种信息，不过，在某些情况下则必须使用这个标记
-   @private 指示一个类或函数是私有的。私有类和函数不会出现在 HTML 文档中，除非运行 JSDoc 时提供了–private 命令行选项
-   @final 指示一个值是常量值。要记住 JavaScript 无法真正保证一个值是常量
-   @ignore JSDoc 忽略有这个标记的函数

## 例子 1：

```js
/**
 * @fileOverview 简单的方法标注示例
 * @author <a href="https://happyplum.github.io/guideNotes/jsdoc/">test</a>
 * @version 0.1
 */
/**
 * @description 加法运算
 * @param {Num} num1 加数
 * @param {Num} num2 被加数
 * @return {Num} result 结果
 */
function add(num1, num2) {
	return num1 + num2;
}
/**
* @description 减法运算
* @param {Num} num1 减数
* @param {Num} num2 被减数
* @return {Num} result 结果
*/
function minus(num1,num2){
    return num1 – num2;
}
```

## 例子 2：

```js
/**
 * @fileOverview 简单的类对象标注示例
 * @author <a href="https://happyplum.github.io/guideNotes/jsdoc/">test</a>
 * @version 0.1
 */
/**
 * @author test
 * @constructor Person
 * @description 一个Person类
 * @see The <a href="#">test</a >.
 * @example new Parent(“张三",15);
 * @since version 0.1
 * @param {String} username 姓名
 * @param {Num} age 年龄
 */
function Person(username, age) {
	/**
	 * @description {Sting} 姓名
	 * @field
	 */
	this.username = username;
	/**
	 * @description {Num} 年龄
	 * @field
	 */
	this.age = age;
	/**
	 * @description 弹出say内容
	 * @param {String} content 内容
	 */
	this.say = function (content) {
		alert(this.username + " say :" + content);
	};
	/**
	 * @description 返回json格式的对象
	 * @return {String} json格式
	 * @see Person#say
	 */
	this.getJson = function () {
		return "{name:" + this.username + ",age" + this.age + "}";
	};
}
```
