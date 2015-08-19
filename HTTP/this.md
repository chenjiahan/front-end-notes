# this

### 一. 概述
this是JavaScript语言的一个关键字，它代表函数运行时，自动生成的一个内部对象，只能在函数内部使用。随着函数使用场合的不同，this的值会发生变化，但this总是指向调用函数的那个对象。

### 情况一. 纯粹的函数调用
这是函数最通常用法，属于全局性调用，因此this就代表全局对象Global。

    var x = 1;
    function test(){
        this.x = 0;
    }
    test();
    alert(x); //0

### 情况二. 作为对象方法的调用
函数可以作为某个对象的方法调用，此时this指向上级对象。  

    function test(){
        alert(this.x);
    }
    var o = {};
    o.x = 1;
    o.m = test;
    o.m(); // 1
    
### 情况三. 作为构造函数调用
通过构造函数生成新对象时，this指向这个新对象。

    function test(){
        this.x = 1;
    }
    var o = new test();
    alert(o.x); // 1
    
### 情况四. call或apply调用
通过call或apply调用时, this指向apply的第一次参数。

    var x = 0;
    function test(){
        alert(this.x);
    }
    var o = {};
    o.x = 1;
    o.m = test;
    o.m.apply();  //0
    o.m.apply(o); //1
    
    