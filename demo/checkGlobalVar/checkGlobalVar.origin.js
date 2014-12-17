(function(topWindow, document){
    var iframeWindow;
    var whiteList = [/*'jQuery', '$', ...*/];
    var ret = [];
    function checkGlobalVar() {
        var iframe = document.createElement('iframe'), i, originValue;
        document.body.appendChild(iframe);
        iframeWindow = iframe.contentWindow;
        for(i in topWindow) {
            if(!(i in iframeWindow) && !~whiteList.indexOf(i)) {
                originValue = topWindow[i];
                topWindow[i] = '耗子么么哒'; // 写一个不可能是系统预设的值
                if(topWindow[i] === '耗子么么哒') {
                    iframeWindow.console.info(i); // 防止重写了topWindow的console
                    ret.push(i);
                }
                topWindow[i] = originValue;
            }
        }
        iframeWindow.console.warn('共找到'  + ret.length + '个全局变量;');
        document.body.removeChild(iframe); // 干完坏事会死灭迹
        iframeWindow = null;
    }
    setTimeout(function(){
        if(!document.body) {
            alert('页面还没加载完！');
            return;
        }
        checkGlobalVar();
    }, 1000);
})(top, document);