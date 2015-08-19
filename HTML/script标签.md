# script标签

### 一. 基本特性
* script标签会组织文档渲染，相关脚本会立即下载并执行。
* 脚本执行顺序和script标签出现的顺序一致。
* document.currentScript可以获得当前正在运行的脚本。

### 二. async属性
* async属性是HTML5的新特性，IE10+版本兼容。
* 异步脚本会在页面的load事件前执行，但可能会在DOMContentLoad事件触发之前或之后执行。
* 异步脚本之间执行顺序与标签顺序无关。

### 三. defer属性
* 所有浏览器都支持defer属性，但chrome和firefox下只支持外部脚本。
* defer会让脚本延迟到文档解析完毕，在DOMContentLoaded之前执行。
* 带defer的标签保持彼此之间的执行顺序。