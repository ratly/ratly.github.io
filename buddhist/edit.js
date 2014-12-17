/**
 * Created by v_zhaoxiaoqiang on 2014/10/27.
 */
window.onload = function () {
    var inputDom = document.getElementById('input');
    var outputDom = document.getElementById('output');
    var outputBtn = document.getElementById('outputBtn');
    var copyBtn = document.getElementById('copyBtn');
    var clearBtn = document.getElementById('clearBtn');

    // 动态输出
    inputDom.onkeyup = function () {
        // 实施草稿
        var draft = inputDom.value;
        outputDom.innerHTML = doSwitch(escapeHTML(inputDom.value));
        localStorage.setItem('draft', inputDom.value);
    };

    // 清除输入的内容
    clearBtn.onclick = function () {
        inputDom.value = '';
        outputDom.innerHTML = '';
        localStorage.setItem('draft', '');
    };

    // 初始化复制功能
    var clip = null;
    clip = new ZeroClipboard.Client();
    clip.setHandCursor(true);
    clip.addEventListener('load', function (client) {
        debugstr("Flash movie loaded and ready.");
    });
    clip.addEventListener('mouseOver', function (client) {
        // update the text on mouse over
        clip.setText(href);
    });
    clip.addEventListener('complete', function (client, text) {
        var href = document.location.href;
        href = href.replace('edit.html', 'view.html');
        // 走本地存储
        //localStorage.setItem('content', inputDom.value);
        // 如果走url，释放下面代码
        href += '?' + inputDom.value;
        href = href.replace('\n', '\\n');
        clip.setText(href);
    });
    clip.glue('copyBtn');

    function debugstr(msg) {
        console.log(msg);
    }

    // 从草稿中写入（刷新后任然可以将保留内容输入）
    inputDom.value = localStorage.getItem('draft');
    // 默认运行一次
    outputDom.innerHTML = doSwitch(inputDom.value);
};
