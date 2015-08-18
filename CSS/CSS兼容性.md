# CSS兼容性 

### 一. IE6双倍边距
当块级元素有float和margin属性时，水平方向的margin值会翻倍。  
**解决方法：**将元素设置为行内元素即可解决。

### 二. Chrome最小字体
Chrome浏览器支持的最小字体为12px，小于12px的文本将以12px显示。
**解决方法：**加入以下代码：  

    html {
        -webkit-text-size-adjust: none;
    }
    
### 三. 渐进增强和优雅降级
**渐进增强：**针对低版本浏览器构建页面，再针对高级浏览器添加交互效果。
**优雅降级：**针对最新版本的浏览器设计网站，在开发后期对低版本浏览器进行适配。


### 四. CSS识别不同版本IE浏览器：
    .class {  
        background: #fff;      /*所有识别*/  
        .background: #fff;     /*IE6,7,8识别*/  
        +background: #fff;     /*IE6,7识别*/  
        _background: #fff;     /*IE6识别*/  
    }