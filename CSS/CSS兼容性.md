# CSS兼容性 

### IE6双倍边距 
当块级元素有float和margin属性时，水平方向的margin值会翻倍。将元素设置为行内元素即可解决。

### CSS识别不同版本IE浏览器：
    .class {  
        background: #fff;      /*所有识别*/  
        .background: #fff;     /*IE6,7,8识别*/  
        +background: #fff;     /*IE6,7识别*/  
        _background: #fff;     /*IE6识别*/  
    }