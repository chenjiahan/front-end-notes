##### 一. XMLHttpRequest
* xhr对象用于与服务器交换数据。
* xhr对象可以在不重新加载页面的情况下更新网页。

##### 二. 创建xhr对象的方法
* 现代浏览器：new XMLHttpRequest();
* IE5和IE6:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;new ActiveXObject("Microsoft.XMLHTTP");

##### 三. 原生Ajax实现方法

    function ajax(conf) {
        var type = conf.type;
        var url = conf.url;
        var dataType = conf.dataType;
        var success = conf.success;
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        var s = [];
        for(var i in conf.data) {
            if(conf.data[i] !== undefined || conf.data[i] !== null) {
                s[s.length] = encodeURIComponent(i) + "=" + encodeURIComponent(conf.data[i]);
            } else {
                s[s.length] = encodeURIComponent(i) + "=";
            }
        }
        var data = s.join( "&" );
        if (dataType == null){
            dataType = "json";
        }
        if (type == "GET" || type == "get" || type == null) {
            xhr.open(type, url + '?' + data, true);
            xhr.setRequestHeader("If-Modified-Since","0");
            xhr.send(null);
        } else if (type == "POST" || type == "post") {
            xhr.open(type, url, true);
            xhr.setRequestHeader("If-Modified-Since","0");
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhr.send(data);
        }
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                if(dataType == "text" || dataType=="TEXT") {
                    if (success != null){
                        success(xhr.responseText);
                    }
                } else if(dataType=="xml" || dataType=="XML") {
                    if (success != null){
                        success(xhr.responseXML);
                    }
                } else if(dataType=="json" || dataType=="JSON") {
                    if (success != null){
                        success(eval("("+xhr.responseText+")"));
                    }
                }
            }
        };
    }