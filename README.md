#特性
+ 方便使用，可使用自定义属性 data-ripple 来实例化插件
+ 可自定义水波纹的标签及其Class Name
+ 同时支持 jQuery 和 Zepto 库


#兼容性
+ Chrome、Firefox 22+、Opera 9+、Safari、IE10+
+ Android 2.3+
+ iOS 8+


#示例
查看效果，请点击→：[demo示例](http://sufangyu.github.io/project/ripple/dist/demos/ripple.html)

![效果预览](http://7xp00j.com1.z0.glb.clouddn.com/20161009214850.jpg)

#使用说明
**1、引入 CSS 文件**
``` html
<link rel="stylesheet" href="../css/ripple.css" />
```

**2、引入 JS 文件**
```js
<script src="../js/zepto.min.js"></script>
<script src="../js/ripple.js"></script>
```

**3、HTML 结构**
```html
<button class="ripple-wrapper">水波纹按钮</button>
```
注：Class Name "ripple-wrapper" 为必须的。

**4、实例化**
```js
$(document).ready(function() {
    $('.ripple-wrapper').ripple();
});
```

# 参数
| 选项            | 类型    |  默认值  |  说明  |
| :--------       | :-----  | :----    | :----  |
|tagName    | string      | 'span'  | 水波纹标签名称 |
|className     | string      | 'ripple'  | 水波纹标签的 Class Name |




