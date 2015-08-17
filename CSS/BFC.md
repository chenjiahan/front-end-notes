# BFC

### 一. 介绍
块级格式上下文(Block Formatting Context)是网页CSS盒子的一部分，并用于决定块盒子的布局。

### 二. 生成
一个BFC就是一个HTML盒子，它至少满足以下条件之一:  
* 根元素  
* float的值不为none  
* position值为absolute或fixed  
* display的值为inline-block、table-cell、table-captain、flex或inline-flex  
* overflow的值不为visible  

### 三. 布局规则
* 内部的Box会在垂直方向，一个接一个地放置。
* Box垂直方向的距离由margin决定，属于同一个BFC的两个相邻Box的margin会发生重叠。
* 每个元素的margin box的左边，与包含块border box的左边相接触，即使存在浮动也是如此。
* BFC的区域不会与float box重叠。
* BFC就是页面上一个隔离的独立容器，容易里面的子元素不会影响到外面的元素，反之也如此。
* 计算BFC的高度时，浮动元素也参与计算。
