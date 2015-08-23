/**
 * 获取地址栏URL参数
 * @param name
 * @returns result | null
 */
function getUrlParam(name) {
    //构造正则表达式对象
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");

    //匹配目标参数
    var r = decodeURI(window.location.search).substr(1).match(reg);

    //返回参数值
    return r === null ? r : r[2];
}