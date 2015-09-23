# Ajax

### 一. XMLHttpRequest
* xhr对象用于与服务器交换数据。
* xhr对象可以在不重新加载页面的情况下更新网页。

### 二. 创建xhr对象的方法
* 现代浏览器：new XMLHttpRequest();
* IE5和IE6:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;new ActiveXObject("Microsoft.XMLHTTP");

### 三. 原生Ajax实现方法
    function ajax(conf) {
    
        var url = conf.url;
        var data = conf.data;
        var success = conf.success;
        var type = conf.type ? conf.type.toLowerCase() : 'get';
        var dataType = conf['dataType'] ? conf['dataType'].toLowerCase() : 'json';
    
        var params = [];
        for(var name in data) {
            if (data.hasOwnProperty(name)) {
                params.push(encodeURIComponent(name) + "=" + encodeURIComponent(conf.data[name]));
            }
        }
        data = params.join( "&" );
    
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200 && success) {
                if (dataType === "text") {
                    success(xhr.responseText);
                } else if (dataType === "xml") {
                    success(xhr.responseXML);
                } else if (dataType === "json") {
                    success(JSON.parse(xhr.responseText));
                }
            }
        };
    
        if (type === 'get') {
            xhr.open(type, url + '?' + data, true);
            xhr.setRequestHeader("If-Modified-Since","0");
            xhr.send(null);
        } else if (type === "post") {
            xhr.open(type, url, true);
            xhr.setRequestHeader("If-Modified-Since","0");
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhr.send(data);
        }
    }