/**
 * Created by v_zhaoxiaoqiang on 2014/11/1.
 */
var splitCode = '******------******';
var renderer = new marked.Renderer();
var escapeMap = {
    "<": "&#60;",
    ">": "&#62;",
    '"': "&#34;",
    "'": "&#39;",
    "&": "&#38;"
};
var option = {
    renderer: renderer
};

// 转换“代码”，格式中的左边是蓝边的样式是用code块生成的
function switchCode(value) {
    return '<div class="pre">' + marked(value) + '</div>';
}
renderer.code = function (code, language) {
    var array = code.split(splitCode);
    if (array[0]) {
        array[0] = switchCode(array[0]);
    }
    return array.reduce(function (previousValue, currentItem) {
        return previousValue + switchCode(currentItem);
    });
};

// xss 转码
function escapeHTML(content) {
    return content.replace(/&(?![\w#]+;)|[<>"']/g, function (s) {
        return escapeMap[s];
    });
}

// 转换入口
function doSwitch(inputValue) {
    inputValue = escapeHTML(inputValue);
    return marked(inputValue, option);
}