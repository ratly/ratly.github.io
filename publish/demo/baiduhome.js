! function() {
    function e(e, t, r) {
        var a = r ? e + t + "@" + r : e + t + "";
        return a
    }

    function t(e) {
        var t = this,
            r = e;
        t.conf = {};
        for (var a in r) t.conf[a] = r[a];
        switch (n && (t.speed = {
            tag: "index",
            start: (new Date).getTime()
        }), t.exeCodeQueue = [], t.pubVersion = {}, t.conf.type) {
            case "index":
                t.init = t.indexInit;
                break;
            case "search":
                t.init = t.searchInit
        }
        return t.init(), t
    }
    var r = window.B || {};
    r.indexStyles = [document.getElementById("spa_index_style")], r.searchStyles = [], window.addEventListener("load", function() {
        r.windowLoaded = !0
    }, !1);
    var a = !1,
        o = !1,
        i = document.getElementById("commonBase"),
        n = !!i.getAttribute("data-pagetimer");
    t.prototype = {
        indexInit: function() {
            var e, t, r = this;
            return r.prefix = i.getAttribute("data-lsprefix"), e = document.querySelector("body").getAttribute("data-version").split(","), e.forEach(function(e) {
                t = e.split("@"), r.pubVersion[t[0]] = t[1], r.exeCodeQueue.push(t[0])
            }), r.compareVersion(), r
        },
        searchInit: function() {
            var e = this;
            return e.prefix = "search_ls_", e.chgVersion = 1, r.chgParam(e.conf.query), e
        },
        compareVersion: function() {
            var t, a = this,
                o = "";
            a.chgVersion = 0, a.requestStr = "";
            for (var i in a.pubVersion) t = a.pubVersion[i], o = e(a.prefix, i, t), r.lsSupport ? localStorage.getItem(o) || (t = 0, a.chgVersion = 1) : (t = 0, a.chgVersion = 1), a.requestStr += "," + i + "@" + t;
            return a.requestStr = a.requestStr.substr(1), a
        },
        executeCode: function(t) {
            var a, i, n = this;
            switch (n.conf.type) {
                case "index":
                    n.lsCode = t ? t : {};
                    break;
                case "search":
                    if (n.searchJSDone) {
                        n.exeCodeQueue = [];
                        break
                    }
                    if (n.exeCodeQueue = [], n.lsCode = t.lscode ? t.lscode : "", n.lsCode)
                        for (var s in n.lsCode) n.exeCodeQueue.push(s);
                    else
                        for (var s in localStorage) 0 == s.indexOf(n.prefix) && n.exeCodeQueue.push(s)
            }
            return n.exeCodeQueue.forEach(function(t) {
                if (n.lsCode && n.lsCode[t] && n.lsCode[t].data ? (i = t, a = n.lsCode[t].data) : r.lsSupport && (i = e(n.prefix, t, n.pubVersion[t]), a = localStorage.getItem(i)), !a) return n.expireCookie({
                    key: "lsv",
                    val: ""
                }), location.href = n.redirectURL(), !1;
                if (!o || !n.lsCode[t].widget) {
                    var s; - 1 != i.indexOf("js") && (s = document.createElement("script"), s.id = n.prefix + t, s.type = "text/javascript", "search_ls_js_btm" === s.id ? window.addEventListener("deal-btm", function() {
                        document.body.appendChild(s), window.removeEventListener(arguments.callee)
                    }, !1) : document.body.appendChild(s)), -1 != i.indexOf("css") && (s = document.createElement("style"), s.id = n.prefix + t, s.id.match(/^index_(?:plus_)?ls/) ? r.indexStyles.push(s) : r.searchStyles.push(s), s.type = "text/css", "search_ls_css_btm" === s.id ? window.addEventListener("deal-btm", function() {
                        document.body.appendChild(s), window.removeEventListener(arguments.callee)
                    }, !1) : document.head.appendChild(s)), s.className = i, s.innerHTML = a
                }
            }), n.setExecuteTag(), n
        },
        setExecuteTag: function() {
            var e = this;
            switch (e.conf.type) {
                case "index":
                    o = !0;
                    break;
                case "search":
                    a = !0
            }
            return e
        },
        jsonpRequest: function(e) {
            var t, a = this;
            if (a.chgVersion) {
                switch (t = document.createElement("script"), t.type = "text/javascript", a.conf.type) {
                    case "index":
                        t.src = "/?action=static&ms=1&" + ("index_ls_" == a.prefix ? "cl=1&" : "") + "version=" + a.requestStr + "&callback=B.getCode&r=" + Math.floor(1e3 * Math.random());
                        break;
                    case "search":
                        a.urlParamsUpdate();
                        var o = a.conf.query,
                            n = "/s?word=" + encodeURIComponent(o) + "&mod=0&callback=B.getCode&at=3&" + a.urlParam;
                        a.conf.sa && (n += "&sa=" + a.conf.sa);
                        var s = i.getAttribute("data-logid");
                        s && (n += "&isid=" + s), a.jumpURL = t.src = n
                }
                if ("search" === a.conf.type && "undefined" != typeof r.prefetch) {
                    var o = a.conf.query,
                        c = r.prefetch.search({
                            word: o,
                            params: r.prefetch.buildSearchParams(o, {}),
                            type: "ajax"
                        }, function(e) {
                            r.getCode(e, a.speed, c)
                        });
                    a.speed && (a.speed.cacheStatus = c.cacheStatus), a.cacheObj = c
                } else a.scLoaded = !1, t.onload = function() {
                    clearTimeout(t.scId), a.scLoaded = !0
                }, t.onerror = function() {
                    location.href = a.redirectURL()
                }, t.src && document.body.appendChild(t), t.scId = setTimeout(function() {
                    a.scLoaded || (location.href = a.redirectURL())
                }, 3e4)
            } else a.executeCode(), "index" === a.conf.type && a.clearLocal();
            return a
        },
        saveCode: function() {
            var t, a, o = this;
            if (r.lsSupport) switch (o.conf.type) {
                case "index":
                    for (var i in o.lsCode) t = e(o.prefix, i, o.lsCode[i].version), localStorage.setItem(t, o.lsCode[i].data);
                    break;
                case "search":
                    for (var i in o.lsCode) t = e(o.prefix, i), !!o.lsCode[i].data && localStorage.setItem(t, o.lsCode[i].data), a = o.lsCode[i] ? o.lsCode[i].version : "";
                    !!a && o.setCookie({
                        key: "lsv",
                        val: a
                    })
            }
            return o
        },
        setCookie: function(e) {
            var t = this,
                r = e.key,
                a = e.val,
                o = new Date;
            return o.setTime(o.getTime() + 6048e5), document.cookie = r + "=" + a + ";domain=" + document.domain + ";path=/;expires=" + o.toGMTString() + ";", document.cookie = r + "=" + a + ";domain=.m.baidu.com;path=/;expires=" + o.toGMTString() + ";", t
        },
        expireCookie: function(e) {
            var t = this,
                r = e.key,
                a = e.val,
                o = new Date;
            return o.setTime(o.getTime() - 1), document.cookie = r + "=" + a + ";domain=" + document.domain + ";path=/;expires=" + o.toGMTString() + ";", document.cookie = r + "=" + a + ";domain=.m.baidu.com;path=/;expires=" + (new Date).toGMTString() + ";", t
        },
        redirectURL: function() {
            var e = this;
            return e.jumpURL.replace("&mod=0", "").replace("&callback=B.getCode", "").replace("&at=3", "")
        },
        clearLocal: function() {
            if (r.lsSupport) {
                var e, t = this;
                for (var a in localStorage) 0 == a.indexOf(t.prefix) && (e = a.replace(t.prefix, "").split("@"), !!t.pubVersion[e[0]] && t.pubVersion[e[0]] != e[1] && localStorage.removeItem(a))
            }
            return t
        },
        urlParamsUpdate: function() {
            var e = this;
            e.urlParam = "", e.urlParam = i.getAttribute("data-prepath").replace(/#/g, "&"), e.urlParam += "&rn=10&wpo=base", "from pu ss st sa rq dit ms".split(" ").forEach(function(t) {
                var r = i.getAttribute("data-" + t);
                r && "0" !== r && (e.urlParam += "&" + t + "=" + r)
            });
            var t = (new Date).getTime().toString();
            return e.urlParam += "&ts=" + t.substr(-7), e
        }
    }, r.localStore = function(e) {
        var o = e || {};
        o.type = o.type ? o.type : "index";
        var i = new t(o);
        return r.getCode = function(e, t, o) {
            switch (i.conf.type) {
                case "index":
                    !!e && i.executeCode(e).saveCode().clearLocal();
                    break;
                case "search":
                    try {
                        if (o = o || i.cacheObj) {
                            var n = (o.word, o.item);
                            1 == n.params.mod && r.prefetch.confirm(o), r.prefetch.isid = o.data.logid
                        }
                        t = t || i.speed, t && (t.executeCode = (new Date).getTime()), !!e && !a && i.executeCode(e).saveCode(), t && (t.afterExecuteCode = (new Date).getTime()), $("body").trigger("singleRender", [e.html, t, i.jumpURL]), i.speed = !1, i.jumpURL = ""
                    } catch (s) {
                        i.expireCookie({
                            key: "lsv",
                            val: ""
                        }), location.href = i.redirectURL()
                    }
            }
        }, i.jsonpRequest(), i
    }, window.B = r
}();;