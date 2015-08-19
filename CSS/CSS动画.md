# CSS动画(Animation)

### 一. 简介
在CSS3中，使用@keyframes（关键帧）可以创建动画效果。

### 二. 基本语法
    /*webkit内核下需要加-webkit-前缀*/
    @keyframes name {
        0% {
            style1;
        }
        n% {
            style2;
        }
        100% {
            style3;
        }
    }

    .class {
        animation-name: name;
        animation-duration: 3s;
        animation-delay: 1s;
        animation-fill-mode: both;
        animation-direction: alternate;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
    }

值|描述
---|---
animation-name|规定需要绑定到选择器的 keyframe 名称（必须）
animation-duration|规定完成动画所花费的时间（必须）
animation-delay|规定在动画开始之前的延迟, 负值则跳过相应时长的动画
animation-fill-mode|规定对象动画时间外的状态
animation-direction|规定是否应该轮流反向播放动画
animation-iteration-count|规定动画应该播放的次数
animation-timing-function|规定动画的速度曲线

### 三. 性能优化
* 使用translate3d开启GPU加速
* 减少gradients和box-shadow的使用
* 尽可能让元素不在文档流中（fixed和absolute），减少重排

### 四. CSS动画与JS动画比较
**CSS动画**：  
优点：适合小而独立的UI元素，以及简单的过渡效果；移动端开发时性能更高。  
缺点：不适合开发复杂的动画，在低版本浏览器上兼容性较差。
  
**JS动画**：  
优点：可以精确控制动画的位置，实现一些更高级的效果，如弹跳，倒回等。  
缺点：使用起来比较复杂, 需要使用第三方库。  