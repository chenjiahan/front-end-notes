//数组去重

var arr = [1,1,0,1,2,3,4,5,6,7,8,4,9,0,2];

//遍历数组，indexOf判断重复项
Array.prototype.unique1 = function() {
    var result = [];
    for(var i = 0; i < this.length; i++) {
        if(result.indexOf(this[i]) === -1) {
            result.push(this[i]);
        }
    }
    return result;
}
console.log(arr.unique1());

//哈希
Array.prototype.unique2 = function() {
    var hash = [];
    var result = [];
    for(var i = 0; i < this.length; i++) {
        if(hash[this[i]] === undefined) {
            hash[this[i]] = true;
            result.push(this[i]);
        }
    }
    return result;
}
console.log(arr.unique2());

//排序后判断相邻元素是否重复
Array.prototype.unique3 = function() {
    this.sort();
    var result = [];
    result.push(this[0]);
    for(var i = 1; i < this.length; i++) {
        if(this[i] !== this[i - 1]) {
            result.push(this[i]);
        }
    }
    return result;
}
console.log(arr.unique3());


//使用Array自带的filter方法
var result = arr.filter(function(value,index){
    return arr.indexOf(value) === index
});
console.log(result);