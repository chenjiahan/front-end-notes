//快速排序

var quickSort = function(arr) {
    if(arr.length <= 1) {
        return arr;
    }
    var left = [];
    var right = [];
    var equal = [];
    var midIndex = Math.floor(arr.length / 2);
    var mid = arr[midIndex];

    for(var i = 0; i < arr.length; i++) {
        if(arr[i] < mid) {
            left.push(arr[i]);
        } else if(arr[i] > mid) {
            right.push(arr[i]);
        } else {
            equal.push(arr[i]);
        }
    }
    return quickSort(left).concat(equal,quickSort(right));
}

var arr = [144,43,214245,2147,22,22,257,9785,43,2112];
console.log(quickSort(arr));