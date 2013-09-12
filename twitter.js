(function (e, t) {
    function y(e) {
        for (var t = 1, n; n = arguments[t]; t++)
            for (var r in n) e[r] = n[r];
        return e
    }

    function b(e) {
        return Array.prototype.slice.call(e)
    }

    function E(e, t) {
        for (var n = 0, r; r = e[n]; n++)
            if (t == r) return n;
        return -1
    }

    function S() {
        var e = b(arguments),
            t = [];
        for (var n = 0, r = e.length; n < r; n++) e[n].length > 0 && t.push(e[n].replace(/\/$/, ""));
        return t.join("/")
    }

    function x(e, t, n) {
        var r = t.split("/"),
            i = e;
        while (r.length > 1) {
            var s = r.shift();
            i = i[s] = i[s] || {}
        }
        i[r[0]] = n
    }

    function T() {}

    function N(e, t) {
        this.id = this.path = e, this.force = !! t
    }

    function C(e, t) {
        this.id = e, this.body = t, typeof t == "undefined" && (this.path = this.resolvePath(e))
    }

    function k(e, t) {
        this.deps = e, this.collectResults = t, this.deps.length == 0 && this.complete()
    }

    function L(e, t) {
        this.deps = e, this.collectResults = t
    }

    function A() {
        for (var e in r)
            if (r[e].readyState == "interactive") return c[r[e].id]
    }

    function O(e, t) {
        var r;
        return !e && n && (r = l || A()), r ? (delete c[r.scriptId], r.body = t, r.execute()) : (f = r = new C(e, t), a[r.id] = r), r
    }

    function M() {
        var e = b(arguments),
            t, n;
        return typeof e[0] == "string" && (t = e.shift()), n = e.shift(), O(t, n)
    }

    function _(e, t) {
        var n = t.id || "",
            r = n.split("/");
        r.pop();
        var i = r.join("/");
        return e.replace(/^\./, i)
    }

    function D(e, t) {
        function r(e) {
            return C.exports[_(e, t)]
        }
        var n = [];
        for (var i = 0, s = e.length; i < s; i++) {
            if (e[i] == "require") {
                n.push(r);
                continue
            }
            if (e[i] == "exports") {
                t.exports = t.exports || {}, n.push(t.exports);
                continue
            }
            n.push(r(e[i]))
        }
        return n
    }

    function P() {
        var e = b(arguments),
            t = [],
            n, r;
        return typeof e[0] == "string" && (n = e.shift()), w(e[0]) && (t = e.shift()), r = e.shift(), O(n, function (e) {
            function s() {
                var i = D(b(t), n),
                    s;
                typeof r == "function" ? s = r.apply(n, i) : s = r, typeof s == "undefined" && (s = n.exports), e(s)
            }
            var n = this,
                i = [];
            for (var o = 0, u = t.length; o < u; o++) {
                var a = t[o];
                E(["require", "exports"], a) == -1 && i.push(_(a, n))
            }
            i.length > 0 ? H.apply(this, i.concat(s)) : s()
        })
    }

    function H() {
        var e = b(arguments),
            t, n;
        typeof e[e.length - 1] == "function" && (t = e.pop()), typeof e[e.length - 1] == "boolean" && (n = e.pop());
        var r = new k(B(e, n), n);
        return t && r.then(t), r
    }

    function B(e, t) {
        var n = [];
        for (var r = 0, i; i = e[r]; r++) typeof i == "string" && (i = j(i)), w(i) && (i = new L(B(i, t), t)), n.push(i);
        return n
    }

    function j(e) {
        var t, n;
        for (var r = 0, i; i = H.matchers[r]; r++) {
            var s = i[0],
                o = i[1];
            if (t = e.match(s)) return o(e)
        }
        throw new Error(e + " was not recognised by loader")
    }

    function I() {
        return e.using = h, e.provide = p, e.define = d, e.loadrunner = v, F
    }

    function q(e) {
        for (var t = 0; t < H.bundles.length; t++)
            for (var n in H.bundles[t])
                if (n != e && E(H.bundles[t][n], e) > -1) return n
    }
    var n = e.attachEvent && !e.opera,
        r = t.getElementsByTagName("script"),
        i = 0,
        s, o = t.createElement("script"),
        u = {}, a = {}, f, l, c = {}, h = e.using,
        p = e.provide,
        d = e.define,
        v = e.loadrunner;
    for (var m = 0, g; g = r[m]; m++)
        if (g.src.match(/loadrunner\.js(\?|#|$)/)) {
            s = g;
            break
        }
    var w = Array.isArray || function (e) {
            return e.constructor == Array
        };
    T.prototype.then = function (t) {
        var n = this;
        return this.started || (this.started = !0, this.start()), this.completed ? t.apply(e, this.results) : (this.callbacks = this.callbacks || [], this.callbacks.push(t)), this
    }, T.prototype.start = function () {}, T.prototype.complete = function () {
        if (!this.completed) {
            this.results = b(arguments), this.completed = !0;
            if (this.callbacks)
                for (var t = 0, n; n = this.callbacks[t]; t++) n.apply(e, this.results)
        }
    }, N.loaded = [], N.prototype = new T, N.prototype.start = function () {
        var e = this,
            t, n, r;
        return (r = a[this.id]) ? (r.then(function () {
            e.complete()
        }), this) : ((t = u[this.id]) ? t.then(function () {
            e.loaded()
        }) : !this.force && E(N.loaded, this.id) > -1 ? this.loaded() : (n = q(this.id)) ? H(n, function () {
            e.loaded()
        }) : this.load(), this)
    }, N.prototype.load = function () {
        var t = this;
        u[this.id] = t;
        var n = o.cloneNode(!1);
        this.scriptId = n.id = "LR" + ++i, n.type = "text/javascript", n.async = !0, n.onerror = function () {
            throw new Error(t.path + " not loaded")
        }, n.onreadystatechange = n.onload = function (n) {
            n = e.event || n;
            if (n.type == "load" || E(["loaded", "complete"], this.readyState) > -1) this.onreadystatechange = null, t.loaded()
        }, n.src = this.path, l = this, r[0].parentNode.insertBefore(n, r[0]), l = null, c[n.id] = this
    }, N.prototype.loaded = function () {
        this.complete()
    }, N.prototype.complete = function () {
        E(N.loaded, this.id) == -1 && N.loaded.push(this.id), delete u[this.id], T.prototype.complete.apply(this, arguments)
    }, C.exports = {}, C.prototype = new N, C.prototype.resolvePath = function (e) {
        return S(H.path, e + ".js")
    }, C.prototype.start = function () {
        var e, t, n = this,
            r;
        this.body ? this.execute() : (e = C.exports[this.id]) ? this.exp(e) : (t = a[this.id]) ? t.then(function (e) {
            n.exp(e)
        }) : (bundle = q(this.id)) ? H(bundle, function () {
            n.start()
        }) : (a[this.id] = this, this.load())
    }, C.prototype.loaded = function () {
        var e, t, r = this;
        n ? (t = C.exports[this.id]) ? this.exp(t) : (e = a[this.id]) && e.then(function (e) {
            r.exp(e)
        }) : (e = f, f = null, e.id = e.id || this.id, e.then(function (e) {
            r.exp(e)
        }))
    }, C.prototype.complete = function () {
        delete a[this.id], N.prototype.complete.apply(this, arguments)
    }, C.prototype.execute = function () {
        var e = this;
        typeof this.body == "object" ? this.exp(this.body) : typeof this.body == "function" && this.body.apply(window, [
            function (t) {
                e.exp(t)
            }
        ])
    }, C.prototype.exp = function (e) {
        this.complete(this.exports = C.exports[this.id] = e || {})
    }, k.prototype = new T, k.prototype.start = function () {
        function t() {
            var t = [];
            e.collectResults && (t[0] = {});
            for (var n = 0, r; r = e.deps[n]; n++) {
                if (!r.completed) return;
                r.results.length > 0 && (e.collectResults ? r instanceof L ? y(t[0], r.results[0]) : x(t[0], r.id, r.results[0]) : t = t.concat(r.results))
            }
            e.complete.apply(e, t)
        }
        var e = this;
        for (var n = 0, r; r = this.deps[n]; n++) r.then(t);
        return this
    }, L.prototype = new T, L.prototype.start = function () {
        var e = this,
            t = 0,
            n = [];
        return e.collectResults && (n[0] = {}),
        function r() {
            var i = e.deps[t++];
            i ? i.then(function (t) {
                i.results.length > 0 && (e.collectResults ? i instanceof L ? y(n[0], i.results[0]) : x(n[0], i.id, i.results[0]) : n.push(i.results[0])), r()
            }) : e.complete.apply(e, n)
        }(), this
    }, P.amd = {};
    var F = function (e) {
        return e(H, M, F, define)
    };
    F.Script = N, F.Module = C, F.Collection = k, F.Sequence = L, F.Dependency = T, F.noConflict = I, e.loadrunner = F, e.using = H, e.provide = M, e.define = P, H.path = "", H.matchers = [], H.matchers.add = function (e, t) {
        this.unshift([e, t])
    }, H.matchers.add(/(^script!|\.js$)/, function (e) {
        var t = new N(e.replace(/^\$/, H.path.replace(/\/$/, "") + "/").replace(/^script!/, ""), !1);
        return t.id = e, t
    }), H.matchers.add(/^[a-zA-Z0-9_\-\/]+$/, function (e) {
        return new C(e)
    }), H.bundles = [], s && (H.path = s.getAttribute("data-path") || s.src.split(/loadrunner\.js/)[0] || "", (main = s.getAttribute("data-main")) && H.apply(e, main.split(/\s*,\s*/)).then(function () {}))
})(this, document);
window.__twttrlr = loadrunner.noConflict();
__twttrlr(function (using, provide, loadrunner, define) {
    provide("util/util", function (e) {
        function t(e) {
            var t = 1,
                n, r;
            for (; n = arguments[t]; t++)
                for (r in n)
                    if (!n.hasOwnProperty || n.hasOwnProperty(r)) e[r] = n[r];
            return e
        }

        function n(e) {
            for (var t in e) e.hasOwnProperty(t) && (l(e[t]) && (n(e[t]), c(e[t]) && delete e[t]), (e[t] === undefined || e[t] === null || e[t] === "") && delete e[t]);
            return e
        }

        function r(e, t) {
            var n = 0,
                r;
            for (; r = e[n]; n++)
                if (t == r) return n;
            return -1
        }

        function i(e, t) {
            if (!e) return null;
            if (e.filter) return e.filter.apply(e, [t]);
            if (!t) return e;
            var n = [],
                r = 0,
                i;
            for (; i = e[r]; r++) t(i) && n.push(i);
            return n
        }

        function s(e, t) {
            if (!e) return null;
            if (e.map) return e.map.apply(e, [t]);
            if (!t) return e;
            var n = [],
                r = 0,
                i;
            for (; i = e[r]; r++) n.push(t(i));
            return n
        }

        function o(e) {
            return e && e.replace(/(^\s+|\s+$)/g, "")
        }

        function u(e) {
            return {}.toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
        }

        function a(e) {
            return e && String(e).toLowerCase().indexOf("[native code]") > -1
        }

        function f(e, t) {
            if (e.contains) return e.contains(t);
            var n = t.parentNode;
            while (n) {
                if (n === e) return !0;
                n = n.parentNode
            }
            return !1
        }

        function l(e) {
            return e === Object(e)
        }

        function c(e) {
            if (!l(e)) return !1;
            if (Object.keys) return !Object.keys(e).length;
            for (var t in e)
                if (e.hasOwnProperty(t)) return !1;
            return !0
        }
        e({
            aug: t,
            compact: n,
            containsElement: f,
            filter: i,
            map: s,
            trim: o,
            indexOf: r,
            isNative: a,
            isObject: l,
            isEmptyObject: c,
            toType: u
        })
    });
    provide("util/events", function (e) {
        using("util/util", function (t) {
            function r() {
                this.completed = !1, this.callbacks = []
            }
            var n = {
                bind: function (e, t) {
                    return this._handlers = this._handlers || {}, this._handlers[e] = this._handlers[e] || [], this._handlers[e].push(t)
                },
                unbind: function (e, n) {
                    if (!this._handlers[e]) return;
                    if (n) {
                        var r = t.indexOf(this._handlers[e], n);
                        r >= 0 && this._handlers[e].splice(r, 1)
                    } else this._handlers[e] = []
                },
                trigger: function (e, t) {
                    var n = this._handlers && this._handlers[e];
                    t.type = e;
                    if (n)
                        for (var r = 0, i; i = n[r]; r++) i.call(this, t)
                }
            };
            r.prototype.addCallback = function (e) {
                this.completed ? e.apply(this, this.results) : this.callbacks.push(e)
            }, r.prototype.complete = function () {
                this.results = makeArray(arguments), this.completed = !0;
                for (var e = 0, t; t = this.callbacks[e]; e++) t.apply(this, this.results)
            }, e({
                Emitter: n,
                Promise: r
            })
        })
    });
    provide("util/querystring", function (e) {
        function t(e) {
            return encodeURIComponent(e).replace(/\+/g, "%2B")
        }

        function n(e) {
            return decodeURIComponent(e)
        }

        function r(e) {
            var n = [],
                r;
            for (r in e) e[r] !== null && typeof e[r] != "undefined" && n.push(t(r) + "=" + t(e[r]));
            return n.sort().join("&")
        }

        function i(e) {
            var t = {}, r, i, s, o;
            if (e) {
                r = e.split("&");
                for (o = 0; s = r[o]; o++) i = s.split("="), i.length == 2 && (t[n(i[0])] = n(i[1]))
            }
            return t
        }

        function s(e, t) {
            var n = r(t);
            return n.length > 0 ? e.indexOf("?") >= 0 ? e + "&" + r(t) : e + "?" + r(t) : e
        }

        function o(e) {
            var t = e && e.split("?");
            return t.length == 2 ? i(t[1]) : {}
        }
        e({
            url: s,
            decodeURL: o,
            decode: i,
            encode: r,
            encodePart: t,
            decodePart: n
        })
    });
    provide("util/twitter", function (e) {
        using("util/querystring", function (t) {
            function o(e) {
                return typeof e == "string" && n.test(e) && RegExp.$1.length <= 20
            }

            function u(e) {
                if (o(e)) return RegExp.$1
            }

            function a(e) {
                var n = t.decodeURL(e);
                n.screen_name = u(e);
                if (n.screen_name) return t.url("https://twitter.com/intent/user", n)
            }

            function f(e) {
                return typeof e == "string" && s.test(e)
            }

            function l(e, t) {
                t = t === undefined ? !0 : t;
                if (f(e)) return (t ? "#" : "") + RegExp.$1
            }

            function c(e) {
                return typeof e == "string" && r.test(e)
            }

            function h(e) {
                return c(e) && RegExp.$1
            }

            function p(e) {
                return i.test(e)
            }
            var n = /(?:^|(?:https?\:)?\/\/(?:www\.)?twitter\.com(?:\:\d+)?(?:\/intent\/(?:follow|user)\/?\?screen_name=|(?:\/#!)?\/))@?([\w]+)(?:\?|&|$)/i,
                r = /(?:^|(?:https?\:)?\/\/(?:www\.)?twitter\.com(?:\:\d+)?\/(?:#!\/)?[\w_]+\/status(?:es)?\/)(\d+)/i,
                i = /^http(s?):\/\/((www\.)?)twitter\.com\//,
                s = /^#?([^.,<>!\s\/#\-\(\)\'\"]+)$/;
            e({
                isHashTag: f,
                hashTag: l,
                isScreenName: o,
                screenName: u,
                isStatus: c,
                status: h,
                intentForProfileURL: a,
                isTwitterURL: p,
                regexen: {
                    profile: n
                }
            })
        })
    });
    provide("util/uri", function (e) {
        using("util/querystring", "util/util", "util/twitter", function (t, n, r) {
            function i(e, t) {
                var n, r;
                return t = t || location, /^https?:\/\//.test(e) ? e : /^\/\//.test(e) ? t.protocol + e : (n = t.host + (t.port.length ? ":" + t.port : ""), e.indexOf("/") !== 0 && (r = t.pathname.split("/"), r.pop(), r.push(e), e = "/" + r.join("/")), [t.protocol, "//", n, e].join(""))
            }

            function s() {
                var e = document.getElementsByTagName("link"),
                    t = 0,
                    n;
                for (; n = e[t]; t++)
                    if (n.rel == "canonical") return i(n.href)
            }

            function o() {
                var e = document.getElementsByTagName("a"),
                    t = document.getElementsByTagName("link"),
                    n = [e, t],
                    i, s, o = 0,
                    u = 0,
                    a = /\bme\b/,
                    f;
                for (; i = n[o]; o++)
                    for (u = 0; s = i[u]; u++)
                        if (a.test(s.rel) && (f = r.screenName(s.href))) return f
            }
            e({
                absolutize: i,
                getCanonicalURL: s,
                getScreenNameFromPage: o
            })
        })
    });
    provide("util/typevalidator", function (e) {
        using("util/util", function (t) {
            function n(e) {
                return e !== undefined && e !== null && e !== ""
            }

            function r(e) {
                return s(e) && e % 1 === 0
            }

            function i(e) {
                return s(e) && !r(e)
            }

            function s(e) {
                return n(e) && !isNaN(e)
            }

            function o(e) {
                return n(e) && t.toType(e) == "array"
            }

            function u(e) {
                if (!n(e)) return !1;
                switch (e) {
                case "on":
                case "ON":
                case "true":
                case "TRUE":
                    return !0;
                case "off":
                case "OFF":
                case "false":
                case "FALSE":
                    return !1;
                default:
                    return !!e
                }
            }

            function a(e) {
                if (s(e)) return e
            }

            function f(e) {
                if (i(e)) return e
            }

            function l(e) {
                if (r(e)) return e
            }
            e({
                hasValue: n,
                isInt: r,
                isFloat: i,
                isNumber: s,
                isArray: o,
                asInt: l,
                asFloat: f,
                asNumber: a,
                asBoolean: u
            })
        })
    });
    provide("tfw/util/globals", function (e) {
        using("util/typevalidator", function (t) {
            function r() {
                var e = document.getElementsByTagName("meta"),
                    t, r, i = 0;
                n = {};
                for (; t = e[i]; i++) {
                    if (!/^twitter:/.test(t.name)) continue;
                    r = t.name.replace(/^twitter:/, ""), n[r] = t.content
                }
            }

            function i(e) {
                return n[e]
            }

            function s(e) {
                return t.asBoolean(e) && (n.dnt = !0), t.asBoolean(n.dnt)
            }
            var n;
            r(), e({
                init: r,
                val: i,
                dnt: s
            })
        })
    });
    provide("util/logger", function (e) {
        function n(e) {
            window[t] && window[t].log && window[t].log(e)
        }

        function r(e) {
            window[t] && window[t].warn && window[t].warn(e)
        }

        function i(e) {
            window[t] && window[t].error && window[t].error(e)
        }
        var t = ["con", "sole"].join("");
        e({
            info: n,
            warn: r,
            error: i
        })
    });
    provide("util/domready", function (e) {
        function l() {
            t = 1;
            for (var e = 0, r = n.length; e < r; e++) n[e]()
        }
        var t = 0,
            n = [],
            r, i, s = !1,
            o = document.createElement("a"),
            u = "DOMContentLoaded",
            a = "addEventListener",
            f = "onreadystatechange";
        /^loade|c/.test(document.readyState) && (t = 1), document[a] && document[a](u, i = function () {
            document.removeEventListener(u, i, s), l()
        }, s), o.doScroll && document.attachEvent(f, r = function () {
            /^c/.test(document.readyState) && (document.detachEvent(f, r), l())
        });
        var c = o.doScroll ? function (e) {
                self != top ? t ? e() : n.push(e) : ! function () {
                    try {
                        o.doScroll("left")
                    } catch (t) {
                        return setTimeout(function () {
                            c(e)
                        }, 50)
                    }
                    e()
                }()
            } : function (e) {
                t ? e() : n.push(e)
            };
        e(c)
    });
    provide("util/env", function (e) {
        using("util/domready", "util/typevalidator", "util/logger", "tfw/util/globals", function (t, n, r, i) {
            function f() {
                return window.devicePixelRatio ? window.devicePixelRatio >= 1.5 : window.matchMedia ? window.matchMedia("only screen and (min-resolution: 144dpi)").matches : !1
            }

            function l() {
                return /MSIE \d/.test(s)
            }

            function c() {
                return /MSIE 6/.test(s)
            }

            function h() {
                return /MSIE 7/.test(s)
            }

            function p() {
                return o
            }

            function d() {
                return "ontouchstart" in window || /Opera Mini/.test(s) || navigator.msMaxTouchPoints > 0
            }

            function v() {
                var e = document.body.style;
                return e.transition !== undefined || e.webkitTransition !== undefined || e.mozTransition !== undefined || e.oTransition !== undefined || e.msTransition !== undefined
            }
            var s = window.navigator.userAgent,
                o = !1,
                u = !1,
                a = "twitter-csp-test";
            window.twttr = window.twttr || {}, twttr.verifyCSP = function (e) {
                var t = document.getElementById(a);
                u = !0, o = !! e, t && t.parentNode.removeChild(t)
            }, t(function () {
                var e;
                if (c() || h()) return o = !1;
                if (n.asBoolean(i.val("widgets:csp"))) return o = !0;
                e = document.createElement("script"), e.id = a, e.text = "twttr.verifyCSP(false);", document.body.appendChild(e), window.setTimeout(function () {
                    if (u) return;
                    r.warn('TWITTER: Content Security Policy restrictions may be applied to your site. Add <meta name="twitter:widgets:csp" content="on"> to supress this warning.'), r.warn("TWITTER: Please note: Not all embedded timeline and embedded Tweet functionality is supported when CSP is applied.")
                }, 5e3)
            }), e({
                retina: f,
                anyIE: l,
                ie6: c,
                ie7: h,
                cspEnabled: p,
                touch: d,
                cssTransitions: v
            })
        })
    });
    provide("dom/delegate", function (e) {
        using("util/env", function (t) {
            function i(e) {
                var t = e.getAttribute("data-twitter-event-id");
                return t ? t : (e.setAttribute("data-twitter-event-id", ++r), r)
            }

            function s(e, t, n) {
                var r = 0,
                    i = e && e.length || 0;
                for (r = 0; r < i; r++) e[r].call(t, n)
            }

            function o(e, t, n) {
                var r = n || e.target || e.srcElement,
                    i = r.className.split(" "),
                    u = 0,
                    a, f = i.length;
                for (; u < f; u++) s(t["." + i[u]], r, e);
                s(t[r.tagName], r, e);
                if (e.cease) return;
                r !== this && o.call(this, e, t, r.parentElement || r.parentNode)
            }

            function u(e, t, n) {
                if (e.addEventListener) {
                    e.addEventListener(t, function (r) {
                        o.call(e, r, n[t])
                    }, !1);
                    return
                }
                e.attachEvent && e.attachEvent("on" + t, function () {
                    o.call(e, e.ownerDocument.parentWindow.event, n[t])
                })
            }

            function a(e, t, r, s) {
                var o = i(e);
                n[o] = n[o] || {}, n[o][t] || (n[o][t] = {}, u(e, t, n[o])), n[o][t][r] = n[o][t][r] || [], n[o][t][r].push(s)
            }

            function f(e, t, n) {
                e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent("on" + t, function () {
                    n(window.event)
                })
            }

            function l(e, t, r) {
                var s = i(t),
                    u = n[s] && n[s];
                o.call(t, {
                    target: r
                }, u[e])
            }

            function c(e) {
                return p(e), h(e), !1
            }

            function h(e) {
                e && e.preventDefault ? e.preventDefault() : e.returnValue = !1
            }

            function p(e) {
                e && (e.cease = !0) && e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
            }
            var n = {}, r = -1;
            e({
                stop: c,
                stopPropagation: p,
                preventDefault: h,
                delegate: a,
                on: f,
                simulate: l
            })
        })
    });
    provide("tfw/util/article", function (e) {
        using("dom/delegate", "tfw/util/globals", "util/uri", function (t, n, r) {
            function o() {
                i = r.getCanonicalURL() || "" + document.location;
                if (!window.top.postMessage) return;
                if (window == window.top) {
                    t.on(window, "message", function (e) {
                        var t;
                        if (e.data && e.data[0] != "{") return;
                        try {
                            t = JSON.parse(e.data)
                        } catch (r) {}
                        t && t.name == "twttr:private:requestArticleUrl" && e.source.postMessage(JSON.stringify({
                            name: "twttr:private:provideArticleUrl",
                            data: {
                                url: i,
                                dnt: n.dnt()
                            }
                        }), "*")
                    });
                    return
                }
                t.on(window, "message", function (e) {
                    var t;
                    if (e.data && e.data[0] != "{") return;
                    try {
                        t = JSON.parse(e.data)
                    } catch (r) {}
                    t && t.name == "twttr:private:provideArticleUrl" && (i = t.data && t.data.url, n.dnt(t.data.dnt), s = document.location.href)
                }), window.top.postMessage(JSON.stringify({
                    name: "twttr:private:requestArticleUrl"
                }), "*")
            }
            var i, s = "";
            o(), e({
                url: function () {
                    return i
                },
                frameUrl: function () {
                    return s
                }
            })
        })
    });
    provide("util/iframe", function (e) {
        e(function (e) {
            var t = (e.replace && e.replace.ownerDocument || document).createElement("div"),
                n, r, i;
            t.innerHTML = "<iframe allowtransparency='true' frameBorder='0' scrolling='no'></iframe>", n = t.firstChild, n.src = e.url, n.className = e.className || "";
            if (e.css)
                for (r in e.css) e.css.hasOwnProperty(r) && (n.style[r] = e.css[r]);
            if (e.attributes)
                for (i in e.attributes) e.attributes.hasOwnProperty(i) && n.setAttribute(i, e.attributes[i]);
            return e.replace ? e.replace.parentNode.replaceChild(n, e.replace) : e.insertTarget && e.insertTarget.appendChild(n), n
        })
    });
    provide("dom/get", function (e) {
        using("util/util", function (t) {
            function n(e, n, r, i) {
                var s, o, u = [],
                    a, f, l, c, h, p;
                n = n || document;
                if (t.isNative(n.getElementsByClassName)) return u = t.filter(n.getElementsByClassName(e), function (e) {
                    return !r || e.tagName.toLowerCase() == r.toLowerCase()
                }), [].slice.call(u, 0, i || u.length);
                a = e.split(" "), c = a.length, s = n.getElementsByTagName(r || "*"), p = s.length;
                for (l = 0; l < c && p > 0; l++) {
                    u = [], f = a[l];
                    for (h = 0; h < p; h++) {
                        o = s[h], ~t.indexOf(o.className.split(" "), f) && u.push(o);
                        if (l + 1 == c && u.length === i) break
                    }
                    s = u, p = s.length
                }
                return u
            }

            function r(e, t, r) {
                return n(e, t, r, 1)[0]
            }

            function i(e, n, r) {
                var s = n && n.parentNode,
                    o;
                if (!s || s === r) return;
                return s.tagName == e ? s : (o = s.className.split(" "), 0 === e.indexOf(".") && ~t.indexOf(o, e.slice(1)) ? s : i(e, s, r))
            }
            e({
                all: n,
                one: r,
                ancestor: i
            })
        })
    });
    provide("tfw/widget/base", function (e) {
        using("util/util", "util/domready", "dom/get", "tfw/util/globals", "util/querystring", "util/iframe", "util/typevalidator", function (t, n, r, i, s, o, u) {
            function p(e) {
                var t;
                if (!e) return;
                e.ownerDocument ? (this.srcEl = e, this.classAttr = e.className.split(" ")) : (this.srcOb = e, this.classAttr = []), t = this.params(), this.id = v(), this.setLanguage(), this.related = t.related || this.dataAttr("related"), this.partner = t.partner || this.dataAttr("partner") || i.val("partner"), this.dnt = t.dnt || this.dataAttr("dnt") || i.dnt() || "", this.styleAttr = [], this.targetEl = e.targetEl
            }

            function d() {
                var e = 0,
                    t;
                for (; t = c[e]; e++) t.call()
            }

            function v() {
                return this.srcEl && this.srcEl.id || "twitter-widget-" + a++
            }

            function m(e) {
                if (!e) return;
                return e.lang ? e.lang : m(e.parentNode)
            }
            var a = 0,
                f, l = {
                    list: [],
                    byId: {}
                }, c = [],
                h = {
                    ar: {
                        "%{followers_count} followers": "Ø¹Ø¯Ø¯ Ø§Ù„Ù…ØªØ§Ø¨Ø¹ÙŠÙ† %{followers_count}",
                        "100K+": "+100 Ø£Ù„Ù",
                        "10k unit": "10 Ø¢Ù„Ø§Ù ÙˆØ­Ø¯Ø©",
                        Follow: "ØªØ§Ø¨ÙØ¹",
                        "Follow %{screen_name}": "ØªØ§Ø¨ÙØ¹ %{screen_name}",
                        K: "Ø£Ù„Ù",
                        M: "Ù…Ù„ÙŠÙˆÙ†",
                        Tweet: "ØºØ±ÙÙ‘Ø¯",
                        "Tweet %{hashtag}": "ØºØ±ÙÙ‘Ø¯ %{hashtag}",
                        "Tweet to %{name}": "ØºØ±ÙÙ‘Ø¯ Ù„Ù€ %{name}",
                        "Twitter Stream": "Ø®Ø·Ù‘ ØªÙˆÙŠØªØ± Ø§Ù„Ø²Ù…Ù†ÙŠÙ‘"
                    },
                    da: {
                        "%{followers_count} followers": "%{followers_count} fÃ¸lgere",
                        "10k unit": "10k enhed",
                        Follow: "FÃ¸lg",
                        "Follow %{screen_name}": "FÃ¸lg %{screen_name}",
                        "Tweet to %{name}": "Tweet til %{name}",
                        "Twitter Stream": "Twitter-strÃ¸m"
                    },
                    de: {
                        "%{followers_count} followers": "%{followers_count} Follower",
                        "100K+": "100Tsd+",
                        "10k unit": "10tsd-Einheit",
                        Follow: "Folgen",
                        "Follow %{screen_name}": "%{screen_name} folgen",
                        K: "Tsd",
                        Tweet: "Twittern",
                        "Tweet to %{name}": "Tweet an %{name}"
                    },
                    es: {
                        "%{followers_count} followers": "%{followers_count} seguidores",
                        "10k unit": "10k unidad",
                        Follow: "Seguir",
                        "Follow %{screen_name}": "Seguir a %{screen_name}",
                        Tweet: "Twittear",
                        "Tweet %{hashtag}": "Twittear %{hashtag}",
                        "Tweet to %{name}": "Twittear a %{name}",
                        "Twitter Stream": "CronologÃ­a de Twitter"
                    },
                    fa: {
                        "%{followers_count} followers": "%{followers_count} Ø¯Ù†Ø¨Ø§Ù„â€ŒÚ©Ù†Ù†Ø¯Ù‡",
                        "100K+": ">Û±Û°Û°Ù‡Ø²Ø§Ø±",
                        "10k unit": "Û±Û°Ù‡Ø²Ø§Ø± ÙˆØ§Ø­Ø¯",
                        Follow: "Ø¯Ù†Ø¨Ø§Ù„ Ú©Ø±Ø¯Ù†",
                        "Follow %{screen_name}": "Ø¯Ù†Ø¨Ø§Ù„ Ú©Ø±Ø¯Ù† %{screen_name}",
                        K: "Ù‡Ø²Ø§Ø±",
                        M: "Ù…ÛŒÙ„ÛŒÙˆÙ†",
                        Tweet: "ØªÙˆÛŒÛŒØª",
                        "Tweet %{hashtag}": "ØªÙˆÛŒÛŒØª Ú©Ø±Ø¯Ù† %{hashtag}",
                        "Tweet to %{name}": "Ø¨Ù‡ %{name} ØªÙˆÛŒÛŒØª Ú©Ù†ÛŒØ¯",
                        "Twitter Stream": "Ø¬Ø±ÛŒØ§Ù† ØªÙˆÛŒÛŒØªâ€ŒÙ‡Ø§"
                    },
                    fi: {
                        "%{followers_count} followers": "%{followers_count} seuraajaa",
                        "100K+": "100 000+",
                        "10k unit": "10 000 yksikkÃ¶Ã¤",
                        Follow: "Seuraa",
                        "Follow %{screen_name}": "Seuraa kÃ¤yttÃ¤jÃ¤Ã¤ %{screen_name}",
                        K: "tuhatta",
                        M: "milj.",
                        Tweet: "Twiittaa",
                        "Tweet %{hashtag}": "Twiittaa %{hashtag}",
                        "Tweet to %{name}": "Twiittaa kÃ¤yttÃ¤jÃ¤lle %{name}",
                        "Twitter Stream": "Twitter-virta"
                    },
                    fil: {
                        "%{followers_count} followers": "%{followers_count} mga tagasunod",
                        "10k unit": "10k yunit",
                        Follow: "Sundan",
                        "Follow %{screen_name}": "Sundan si %{screen_name}",
                        Tweet: "I-tweet",
                        "Tweet %{hashtag}": "I-tweet ang %{hashtag}",
                        "Tweet to %{name}": "Mag-Tweet kay %{name}",
                        "Twitter Stream": "Stream ng Twitter"
                    },
                    fr: {
                        "%{followers_count} followers": "%{followers_count} abonnÃ©s",
                        "10k unit": "unitÃ© de 10k",
                        Follow: "Suivre",
                        "Follow %{screen_name}": "Suivre %{screen_name}",
                        Tweet: "Tweeter",
                        "Tweet %{hashtag}": "Tweeter %{hashtag}",
                        "Tweet to %{name}": "Tweeter Ã  %{name}",
                        "Twitter Stream": "Flux Twitter"
                    },
                    he: {
                        "%{followers_count} followers": "%{followers_count} ×¢×•×§×‘×™×",
                        "100K+": "×ž××•×ª ××œ×¤×™×",
                        "10k unit": "×¢×©×¨×•×ª ××œ×¤×™×",
                        Follow: "×ž×¢×§×‘",
                        "Follow %{screen_name}": "×œ×¢×§×•×‘ ××—×¨ %{screen_name}",
                        K: "××œ×£",
                        M: "×ž×™×œ×™×•×Ÿ",
                        Tweet: "×¦×™×•×¥",
                        "Tweet %{hashtag}": "×¦×™×™×¦×• %{hashtag}",
                        "Tweet to %{name}": "×¦×™×•×¥ ××œ %{name}",
                        "Twitter Stream": "×”×ª×–×¨×™× ×©×œ ×˜×•×•×™×˜×¨"
                    },
                    hi: {
                        "%{followers_count} followers": "%{followers_count} à¤«à¤¼à¥‰à¤²à¥‹à¤…à¤°à¥à¤¸",
                        "100K+": "1 à¤²à¤¾à¤–+",
                        "10k unit": "10 à¤¹à¤œà¤¾à¤° à¤‡à¤•à¤¾à¤ˆà¤¯à¤¾à¤‚",
                        Follow: "à¤«à¤¼à¥‰à¤²à¥‹",
                        "Follow %{screen_name}": "%{screen_name} à¤•à¥‹ à¤«à¤¼à¥‰à¤²à¥‹ à¤•à¤°à¥‡à¤‚",
                        K: "à¤¹à¤œà¤¾à¤°",
                        M: "à¤®à¤¿à¤²à¤¿à¤¯à¤¨",
                        Tweet: "à¤Ÿà¥à¤µà¥€à¤Ÿ",
                        "Tweet %{hashtag}": "à¤Ÿà¥à¤µà¥€à¤Ÿ %{hashtag}",
                        "Tweet to %{name}": "%{name} à¤•à¥‹ à¤Ÿà¥à¤µà¥€à¤Ÿ à¤•à¤°à¥‡à¤‚",
                        "Twitter Stream": "à¤Ÿà¥à¤µà¤¿à¤Ÿà¤° à¤¸à¥à¤Ÿà¥à¤°à¥€à¤®"
                    },
                    hu: {
                        "%{followers_count} followers": "%{followers_count} kÃ¶vetÅ‘",
                        "100K+": "100E+",
                        "10k unit": "10E+",
                        Follow: "KÃ¶vetÃ©s",
                        "Follow %{screen_name}": "%{screen_name} kÃ¶vetÃ©se",
                        K: "E",
                        "Tweet %{hashtag}": "%{hashtag} tweetelÃ©se",
                        "Tweet to %{name}": "Tweet kÃ¼ldÃ©se neki: %{name}",
                        "Twitter Stream": "Twitter HÃ­rfolyam"
                    },
                    id: {
                        "%{followers_count} followers": "%{followers_count} pengikut",
                        "100K+": "100 ribu+",
                        "10k unit": "10 ribu unit",
                        Follow: "Ikuti",
                        "Follow %{screen_name}": "Ikuti %{screen_name}",
                        K: "&nbsp;ribu",
                        M: "&nbsp;juta",
                        "Tweet to %{name}": "Tweet ke %{name}",
                        "Twitter Stream": "Aliran Twitter"
                    },
                    it: {
                        "%{followers_count} followers": "%{followers_count} follower",
                        "10k unit": "10k unitÃ ",
                        Follow: "Segui",
                        "Follow %{screen_name}": "Segui %{screen_name}",
                        "Tweet %{hashtag}": "Twitta %{hashtag}",
                        "Tweet to %{name}": "Twitta a %{name}"
                    },
                    ja: {
                        "%{followers_count} followers": "%{followers_count}äººã®ãƒ•ã‚©ãƒ­ãƒ¯ãƒ¼",
                        "100K+": "100Kä»¥ä¸Š",
                        "10k unit": "ä¸‡",
                        Follow: "ãƒ•ã‚©ãƒ­ãƒ¼ã™ã‚‹",
                        "Follow %{screen_name}": "%{screen_name}ã•ã‚“ã‚’ãƒ•ã‚©ãƒ­ãƒ¼",
                        Tweet: "ãƒ„ã‚¤ãƒ¼ãƒˆ",
                        "Tweet %{hashtag}": "%{hashtag} ã‚’ãƒ„ã‚¤ãƒ¼ãƒˆã™ã‚‹",
                        "Tweet to %{name}": "%{name}ã•ã‚“ã¸ãƒ„ã‚¤ãƒ¼ãƒˆã™ã‚‹",
                        "Twitter Stream": "Twitterã‚¹ãƒˆãƒªãƒ¼ãƒ "
                    },
                    ko: {
                        "%{followers_count} followers": "%{followers_count}ëª…ì˜ íŒ”ë¡œì›Œ",
                        "100K+": "100ë§Œ ì´ìƒ",
                        "10k unit": "ë§Œ ë‹¨ìœ„",
                        Follow: "íŒ”ë¡œìš°",
                        "Follow %{screen_name}": "%{screen_name} ë‹˜ íŒ”ë¡œìš°í•˜ê¸°",
                        K: "ì²œ",
                        M: "ë°±ë§Œ",
                        Tweet: "íŠ¸ìœ—",
                        "Tweet %{hashtag}": "%{hashtag} ê´€ë ¨ íŠ¸ìœ—í•˜ê¸°",
                        "Tweet to %{name}": "%{name}ë‹˜ì—ê²Œ íŠ¸ìœ—í•˜ê¸°",
                        "Twitter Stream": "íŠ¸ìœ„í„° ìŠ¤íŠ¸ë¦¼"
                    },
                    msa: {
                        "%{followers_count} followers": "%{followers_count} pengikut",
                        "100K+": "100 ribu+",
                        "10k unit": "10 ribu unit",
                        Follow: "Ikut",
                        "Follow %{screen_name}": "Ikut %{screen_name}",
                        K: "ribu",
                        M: "juta",
                        "Tweet to %{name}": "Tweet kepada %{name}",
                        "Twitter Stream": "Strim Twitter"
                    },
                    nl: {
                        "%{followers_count} followers": "%{followers_count} volgers",
                        "100K+": "100k+",
                        "10k unit": "10k-eenheid",
                        Follow: "Volgen",
                        "Follow %{screen_name}": "%{screen_name} volgen",
                        K: "k",
                        M: " mln.",
                        Tweet: "Tweeten",
                        "Tweet %{hashtag}": "%{hashtag} tweeten",
                        "Tweet to %{name}": "Tweeten naar %{name}"
                    },
                    no: {
                        "%{followers_count} followers": "%{followers_count} fÃ¸lgere",
                        "100K+": "100 K+",
                        "10k unit": "10 K-enhet",
                        Follow: "FÃ¸lg",
                        "Follow %{screen_name}": "FÃ¸lg %{screen_name}",
                        "Tweet to %{name}": "Send en tweet til %{name}",
                        "Twitter Stream": "Twitter-strÃ¸m"
                    },
                    pl: {
                        "%{followers_count} followers": "%{followers_count} obserwujÄ…cych",
                        "100K+": "100 tys.+",
                        "10k unit": "10 tys.",
                        Follow: "Obserwuj",
                        "Follow %{screen_name}": "Obserwuj %{screen_name}",
                        K: "tys.",
                        M: "mln",
                        Tweet: "Tweetnij",
                        "Tweet %{hashtag}": "Tweetnij %{hashtag}",
                        "Tweet to %{name}": "Tweetnij do %{name}",
                        "Twitter Stream": "StrumieÅ„ Twittera"
                    },
                    pt: {
                        "%{followers_count} followers": "%{followers_count} seguidores",
                        "100K+": "+100 mil",
                        "10k unit": "10 mil unidades",
                        Follow: "Seguir",
                        "Follow %{screen_name}": "Seguir %{screen_name}",
                        K: "Mil",
                        Tweet: "Tweetar",
                        "Tweet %{hashtag}": "Tweetar %{hashtag}",
                        "Tweet to %{name}": "Tweetar para %{name}",
                        "Twitter Stream": "TransmissÃµes do Twitter"
                    },
                    ru: {
                        "%{followers_count} followers": "Ð§Ð¸Ñ‚Ð°Ñ‚ÐµÐ»Ð¸: %{followers_count} ",
                        "100K+": "100 Ñ‚Ñ‹Ñ.+",
                        "10k unit": "Ð±Ð»Ð¾Ðº 10k",
                        Follow: "Ð§Ð¸Ñ‚Ð°Ñ‚ÑŒ",
                        "Follow %{screen_name}": "Ð§Ð¸Ñ‚Ð°Ñ‚ÑŒ %{screen_name}",
                        K: "Ñ‚Ñ‹Ñ.",
                        M: "Ð¼Ð»Ð½.",
                        Tweet: "Ð¢Ð²Ð¸Ñ‚Ð½ÑƒÑ‚ÑŒ",
                        "Tweet %{hashtag}": "Ð¢Ð²Ð¸Ñ‚Ð½ÑƒÑ‚ÑŒ %{hashtag}",
                        "Tweet to %{name}": "Ð¢Ð²Ð¸Ñ‚Ð½ÑƒÑ‚ÑŒ %{name}",
                        "Twitter Stream": "ÐŸÐ¾Ñ‚Ð¾Ðº Ð² Ð¢Ð²Ð¸Ñ‚Ñ‚ÐµÑ€Ðµ"
                    },
                    sv: {
                        "%{followers_count} followers": "%{followers_count} fÃ¶ljare",
                        "10k unit": "10k",
                        Follow: "FÃ¶lj",
                        "Follow %{screen_name}": "FÃ¶lj %{screen_name}",
                        Tweet: "Tweeta",
                        "Tweet %{hashtag}": "Tweeta %{hashtag}",
                        "Tweet to %{name}": "Tweeta till %{name}",
                        "Twitter Stream": "TwitterflÃ¶de"
                    },
                    th: {
                        "%{followers_count} followers": "%{followers_count} à¸œà¸¹à¹‰à¸•à¸´à¸”à¸•à¸²à¸¡",
                        "100K+": "100à¸žà¸±à¸™+",
                        "10k unit": "à¸«à¸™à¹ˆà¸§à¸¢ 10à¸žà¸±à¸™",
                        Follow: "à¸•à¸´à¸”à¸•à¸²à¸¡",
                        "Follow %{screen_name}": "à¸•à¸´à¸”à¸•à¸²à¸¡ %{screen_name}",
                        K: "à¸žà¸±à¸™",
                        M: "à¸¥à¹‰à¸²à¸™",
                        Tweet: "à¸—à¸§à¸µà¸•",
                        "Tweet %{hashtag}": "à¸—à¸§à¸µà¸• %{hashtag}",
                        "Tweet to %{name}": "à¸—à¸§à¸µà¸•à¸–à¸¶à¸‡ %{name}",
                        "Twitter Stream": "à¸—à¸§à¸´à¸•à¹€à¸•à¸­à¸£à¹Œà¸ªà¸•à¸£à¸µà¸¡"
                    },
                    tr: {
                        "%{followers_count} followers": "%{followers_count} takipÃ§i",
                        "100K+": "+100 bin",
                        "10k unit": "10 bin birim",
                        Follow: "Takip et",
                        "Follow %{screen_name}": "Takip et: %{screen_name}",
                        K: "bin",
                        M: "milyon",
                        Tweet: "Tweetle",
                        "Tweet %{hashtag}": "Tweetle: %{hashtag}",
                        "Tweet to %{name}": "Tweetle: %{name}",
                        "Twitter Stream": "Twitter AkÄ±ÅŸÄ±"
                    },
                    ur: {
                        "%{followers_count} followers": "%{followers_count} ÙØ§Ù„ÙˆØ±Ø²",
                        "100K+": "Ø§ÛŒÚ© Ù„Ø§Ú©Ú¾ Ø³Û’ Ø²ÛŒØ§Ø¯Û",
                        "10k unit": "Ø¯Ø³ ÛØ²Ø§Ø± ÛŒÙˆÙ†Ù¹",
                        Follow: "ÙØ§Ù„Ùˆ Ú©Ø±ÛŒÚº",
                        "Follow %{screen_name}": "%{screen_name} Ú©Ùˆ ÙØ§Ù„Ùˆ Ú©Ø±ÛŒÚº",
                        K: "ÛØ²Ø§Ø±",
                        M: "Ù…Ù„ÛŒÙ†",
                        Tweet: "Ù¹ÙˆÛŒÙ¹ Ú©Ø±ÛŒÚº",
                        "Tweet %{hashtag}": "%{hashtag} Ù¹ÙˆÛŒÙ¹ Ú©Ø±ÛŒÚº",
                        "Tweet to %{name}": "%{name} Ú©Ùˆ Ù¹ÙˆÛŒÙ¹ Ú©Ø±ÛŒÚº",
                        "Twitter Stream": "Ù¹ÙˆØ¦Ù¹Ø± Ø³Ù¹Ø±ÛŒÙ…"
                    },
                    "zh-cn": {
                        "%{followers_count} followers": "%{followers_count} å…³æ³¨è€…",
                        "100K+": "10ä¸‡+",
                        "10k unit": "1ä¸‡å•å…ƒ",
                        Follow: "å…³æ³¨",
                        "Follow %{screen_name}": "å…³æ³¨ %{screen_name}",
                        K: "åƒ",
                        M: "ç™¾ä¸‡",
                        Tweet: "å‘æŽ¨",
                        "Tweet %{hashtag}": "ä»¥ %{hashtag} å‘æŽ¨",
                        "Tweet to %{name}": "å‘æŽ¨ç»™ %{name}",
                        "Twitter Stream": "Twitter ä¿¡æ¯æµ"
                    },
                    "zh-tw": {
                        "%{followers_count} followers": "%{followers_count} ä½è·Ÿéš¨è€…",
                        "100K+": "è¶…éŽåè¬",
                        "10k unit": "1è¬ å–®ä½",
                        Follow: "è·Ÿéš¨",
                        "Follow %{screen_name}": "è·Ÿéš¨ %{screen_name}",
                        K: "åƒ",
                        M: "ç™¾è¬",
                        Tweet: "æŽ¨æ–‡",
                        "Tweet %{hashtag}": "æŽ¨æ–‡%{hashtag}",
                        "Tweet to %{name}": "æŽ¨æ–‡çµ¦%{name}",
                        "Twitter Stream": "Twitter è³‡è¨Šæµ"
                    }
                };
            t.aug(p.prototype, {
                setLanguage: function (e) {
                    var t;
                    e || (e = this.params().lang || this.dataAttr("lang") || m(this.srcEl)), e = e && e.toLowerCase();
                    if (!e) return this.lang = "en";
                    if (h[e]) return this.lang = e;
                    t = e.replace(/[\-_].*/, "");
                    if (h[t]) return this.lang = t;
                    this.lang = "en"
                },
                _: function (e, t) {
                    var n = this.lang;
                    t = t || {};
                    if (!n || !h.hasOwnProperty(n)) n = this.lang = "en";
                    return e = h[n] && h[n][e] || e, this.ringo(e, t, /%\{([\w_]+)\}/g)
                },
                ringo: function (e, t, n) {
                    return n = n || /\{\{([\w_]+)\}\}/g, e.replace(n, function (e, n) {
                        return t[n] !== undefined ? t[n] : e
                    })
                },
                add: function (e) {
                    l.list.push(this), l.byId[this.id] = e
                },
                create: function (e, t, n) {
                    return n["data-twttr-rendered"] = !0, o({
                        url: e,
                        css: t,
                        className: this.classAttr.join(" "),
                        id: this.id,
                        attributes: n,
                        replace: this.srcEl,
                        insertTarget: this.targetEl
                    })
                },
                params: function () {
                    var e, t;
                    return this.srcOb ? t = this.srcOb : (e = this.srcEl && this.srcEl.href && this.srcEl.href.split("?")[1], t = e ? s.decode(e) : {}), this.params = function () {
                        return t
                    }, t
                },
                dataAttr: function (e) {
                    return this.srcEl && this.srcEl.getAttribute("data-" + e)
                },
                attr: function (e) {
                    return this.srcEl && this.srcEl.getAttribute(e)
                },
                styles: {
                    base: [
                        ["font", "normal normal normal 11px/18px 'Helvetica Neue', Arial, sans-serif"],
                        ["margin", "0"],
                        ["padding", "0"],
                        ["whiteSpace", "nowrap"]
                    ],
                    button: [
                        ["fontWeight", "bold"],
                        ["textShadow", "0 1px 0 rgba(255,255,255,.5)"]
                    ],
                    large: [
                        ["fontSize", "13px"],
                        ["lineHeight", "26px"]
                    ],
                    vbubble: [
                        ["fontSize", "16px"]
                    ]
                },
                width: function () {
                    throw new Error(name + " not implemented")
                },
                height: function () {
                    return this.size == "m" ? 20 : 28
                },
                minWidth: function () {},
                maxWidth: function () {},
                minHeight: function () {},
                maxHeight: function () {},
                dimensions: function () {
                    function e(e) {
                        switch (typeof e) {
                        case "string":
                            return e;
                        case "undefined":
                            return;
                        default:
                            return e + "px"
                        }
                    }
                    var t, n = {
                            width: this.width(),
                            height: this.height()
                        };
                    this.minWidth() && (n["min-width"] = this.minWidth()), this.maxWidth() && (n["max-width"] = this.maxWidth()), this.minHeight() && (n["min-height"] = this.minHeight()), this.maxHeight() && (n["max-height"] = this.maxHeight());
                    for (t in n) n[t] = e(n[t]);
                    return n
                },
                generateId: v
            }), p.afterLoad = function (e) {
                c.push(e)
            }, p.init = function (e) {
                f = e
            }, p.find = function (e) {
                return e && l.byId[e] ? l.byId[e].element : null
            }, p.embed = function (e) {
                var t = f.widgets,
                    n, i, s = 0,
                    o, a, c, h, p;
                u.isArray(e) || (e = [e || document]);
                for (; i = e[s]; s++)
                    for (a in t)
                        if (t.hasOwnProperty(a)) {
                            a.match(/\./) ? (c = a.split("."), n = r.all(c[1], i, c[0])) : n = i.getElementsByTagName(a);
                            for (h = 0; p = n[h]; h++) {
                                if (p.getAttribute("data-twttr-rendered")) continue;
                                p.setAttribute("data-twttr-rendered", "true"), o = new t[a](p), l.list.push(o), l.byId[o.id] = o, o.render(f)
                            }
                        }
                d()
            }, e(p)
        })
    });
    provide("tfw/widget/intent", function (e) {
        using("tfw/widget/base", "util/util", "util/querystring", "util/uri", function (t, n, r, i) {
            function h(e) {
                var t = Math.round(l / 2 - u / 2),
                    n = 0;
                f > a && (n = Math.round(f / 2 - a / 2)), window.open(e, undefined, [o, "width=" + u, "height=" + a, "left=" + t, "top=" + n].join(","))
            }

            function p(e, t) {
                using("tfw/hub/client", function (n) {
                    n.openIntent(e, t)
                })
            }

            function d(e) {
                var t = "original_referer=" + location.href;
                return [e, t].join(e.indexOf("?") == -1 ? "?" : "&")
            }

            function v(e) {
                var t, r, i, o;
                e = e || window.event, t = e.target || e.srcElement;
                if (e.altKey || e.metaKey || e.shiftKey) return;
                while (t) {
                    if (~n.indexOf(["A", "AREA"], t.nodeName)) break;
                    t = t.parentNode
                }
                t && t.href && (r = t.href.match(s), r && (o = d(t.href), o = o.replace(/^http[:]/, "https:"), o = o.replace(/^\/\//, "https://"), m(o, t), e.returnValue = !1, e.preventDefault && e.preventDefault()))
            }

            function m(e, t) {
                if (twttr.events.hub && t) {
                    var n = new g(c.generateId(), t);
                    c.add(n), p(e, t), twttr.events.trigger("click", {
                        target: t,
                        region: "intent",
                        type: "click",
                        data: {}
                    })
                } else h(e)
            }

            function g(e, t) {
                this.id = e, this.element = this.srcEl = t
            }

            function y(e) {
                this.srcEl = [], this.element = e
            }
            var s = /twitter\.com(\:\d{2,4})?\/intent\/(\w+)/,
                o = "scrollbars=yes,resizable=yes,toolbar=no,location=yes",
                u = 550,
                a = 520,
                f = screen.height,
                l = screen.width,
                c;
            y.prototype = new t, n.aug(y.prototype, {
                render: function (e) {
                    c = this, window.__twitterIntentHandler || (document.addEventListener ? document.addEventListener("click", v, !1) : document.attachEvent && document.attachEvent("onclick", v), window.__twitterIntentHandler = !0)
                }
            }), y.open = m, e(y)
        })
    });
    provide("dom/classname", function (e) {
        function t(e, t) {
            e.classList ? e.classList.add(t) : s(t).test(e.className) || (e.className += " " + t)
        }

        function n(e, t) {
            e.classList ? e.classList.remove(t) : e.className = e.className.replace(s(t), " ")
        }

        function r(e, r, o) {
            e.classList && i(e, r) ? (n(e, r), t(e, o)) : e.className = e.className.replace(s(r), o)
        }

        function i(e, t) {
            return e.classList ? e.classList.contains(t) : s(t).test(e.className)
        }

        function s(e) {
            return new RegExp("\\b" + e + "\\b", "g")
        }
        e({
            add: t,
            remove: n,
            replace: r,
            present: i
        })
    });
    provide("util/throttle", function (e) {
        function t(e, t, n) {
            function o() {
                var n = +(new Date);
                window.clearTimeout(s);
                if (n - i > t) {
                    i = n, e.call(r);
                    return
                }
                s = window.setTimeout(o, t)
            }
            var r = n || this,
                i = 0,
                s;
            return o
        }
        e(t)
    });
    provide("util/insert", function (e) {
        e(function (e, t) {
            if (t) {
                if (!t.parentNode) return t;
                t.parentNode.replaceChild(e, t), delete t
            } else document.body.insertBefore(e, document.body.firstChild);
            return e
        })
    });
    provide("util/css", function (e) {
        using("util/util", function (t) {
            e({
                sanitize: function (e, n, r) {
                    var i = /^[\w ,%\/"'\-_#]+$/,
                        s = e && t.map(e.split(";"), function (e) {
                            return t.map(e.split(":").slice(0, 2), function (e) {
                                return t.trim(e)
                            })
                        }),
                        o = 0,
                        u, a = [],
                        f = r ? "!important" : "";
                    n = n || /^(font|text\-|letter\-|color|line\-)[\w\-]*$/;
                    for (; s && (u = s[o]); o++) u[0].match(n) && u[1].match(i) && a.push(u.join(":") + f);
                    return a.join(";")
                }
            })
        })
    });
    provide("tfw/util/params", function (e) {
        using("util/querystring", "util/twitter", function (t, n) {
            e(function (e, r) {
                return function (i) {
                    var s, o = "data-tw-params",
                        u, a = i.innerHTML;
                    if (!i) return;
                    if (!n.isTwitterURL(i.href)) return;
                    if (i.getAttribute(o)) return;
                    i.setAttribute(o, !0);
                    if (typeof r == "function") {
                        s = r.call(this, i);
                        for (u in s) s.hasOwnProperty(u) && (e[u] = s[u])
                    }
                    i.href = t.url(i.href, e), i.innerHTML = a
                }
            })
        })
    });
    provide("$xd/json2.js", function (exports) {
        window.JSON || (window.JSON = {}),
        function () {
            function f(e) {
                return e < 10 ? "0" + e : e
            }

            function quote(e) {
                return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function (e) {
                    var t = meta[e];
                    return typeof t == "string" ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                }) + '"' : '"' + e + '"'
            }

            function str(e, t) {
                var n, r, i, s, o = gap,
                    u, a = t[e];
                a && typeof a == "object" && typeof a.toJSON == "function" && (a = a.toJSON(e)), typeof rep == "function" && (a = rep.call(t, e, a));
                switch (typeof a) {
                case "string":
                    return quote(a);
                case "number":
                    return isFinite(a) ? String(a) : "null";
                case "boolean":
                case "null":
                    return String(a);
                case "object":
                    if (!a) return "null";
                    gap += indent, u = [];
                    if (Object.prototype.toString.apply(a) === "[object Array]") {
                        s = a.length;
                        for (n = 0; n < s; n += 1) u[n] = str(n, a) || "null";
                        return i = u.length === 0 ? "[]" : gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + o + "]" : "[" + u.join(",") + "]", gap = o, i
                    }
                    if (rep && typeof rep == "object") {
                        s = rep.length;
                        for (n = 0; n < s; n += 1) r = rep[n], typeof r == "string" && (i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i))
                    } else
                        for (r in a) Object.hasOwnProperty.call(a, r) && (i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i));
                    return i = u.length === 0 ? "{}" : gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + o + "}" : "{" + u.join(",") + "}", gap = o, i
                }
            }
            typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function (e) {
                return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
            }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (e) {
                return this.valueOf()
            });
            var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                gap, indent, meta = {
                    "\b": "\\b",
                    "	": "\\t",
                    "\n": "\\n",
                    "\f": "\\f",
                    "\r": "\\r",
                    '"': '\\"',
                    "\\": "\\\\"
                }, rep;
            typeof JSON.stringify != "function" && (JSON.stringify = function (e, t, n) {
                var r;
                gap = "", indent = "";
                if (typeof n == "number")
                    for (r = 0; r < n; r += 1) indent += " ";
                else typeof n == "string" && (indent = n);
                rep = t;
                if (!t || typeof t == "function" || typeof t == "object" && typeof t.length == "number") return str("", {
                    "": e
                });
                throw new Error("JSON.stringify")
            }), typeof JSON.parse != "function" && (JSON.parse = function (text, reviver) {
                function walk(e, t) {
                    var n, r, i = e[t];
                    if (i && typeof i == "object")
                        for (n in i) Object.hasOwnProperty.call(i, n) && (r = walk(i, n), r !== undefined ? i[n] = r : delete i[n]);
                    return reviver.call(e, t, i)
                }
                var j;
                cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (e) {
                    return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                }));
                if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), typeof reviver == "function" ? walk({
                    "": j
                }, "") : j;
                throw new SyntaxError("JSON.parse")
            })
        }();
        exports();
        loadrunner.Script.loaded.push("$xd/json2.js")
    });
    provide("util/params", function (e) {
        using("util/querystring", function (t) {
            var n = function (e) {
                var n = e.search.substr(1);
                return t.decode(n)
            }, r = function (e) {
                    var n = e.href,
                        r = n.indexOf("#"),
                        i = r < 0 ? "" : n.substring(r + 1);
                    return t.decode(i)
                }, i = function (e) {
                    var t = {}, i = n(e),
                        s = r(e);
                    for (var o in i) i.hasOwnProperty(o) && (t[o] = i[o]);
                    for (var o in s) s.hasOwnProperty(o) && (t[o] = s[o]);
                    return t
                };
            e({
                combined: i,
                fromQuery: n,
                fromFragment: r
            })
        })
    });
    provide("tfw/util/env", function (e) {
        using("util/params", function (t) {
            function r() {
                var e = 36e5,
                    r = t.combined(document.location)._;
                return n !== undefined ? n : (n = !1, r && /^\d+$/.test(r) && (n = +(new Date) - parseInt(r) < e), n)
            }
            var n;
            e({
                isDynamicWidget: r
            })
        })
    });
    provide("util/decider", function (e) {
        function n(e) {
            var n = t[e] || !1;
            if (!n) return !1;
            if (n === !0 || n === 100) return !0;
            var r = Math.random() * 100,
                i = n >= r;
            return t[e] = i, i
        }
        var t = {
            force_new_cookie: 100,
            rufous_pixel: 100,
            decider_fixture: 12.34
        };
        e({
            isAvailable: n
        })
    });
    provide("dom/cookie", function (e) {
        using("util/util", function (t) {
            e(function (e, n, r) {
                var i = t.aug({}, r);
                if (arguments.length > 1 && String(n) !== "[object Object]") {
                    if (n === null || n === undefined) i.expires = -1;
                    if (typeof i.expires == "number") {
                        var s = i.expires,
                            o = new Date((new Date).getTime() + s * 60 * 1e3);
                        i.expires = o
                    }
                    return n = String(n), document.cookie = [encodeURIComponent(e), "=", i.raw ? n : encodeURIComponent(n), i.expires ? "; expires=" + i.expires.toUTCString() : "", i.path ? "; path=" + i.path : "", i.domain ? "; domain=" + i.domain : "", i.secure ? "; secure" : ""].join("")
                }
                i = n || {};
                var u, a = i.raw ? function (e) {
                        return e
                    } : decodeURIComponent;
                return (u = (new RegExp("(?:^|; )" + encodeURIComponent(e) + "=([^;]*)")).exec(document.cookie)) ? a(u[1]) : null
            })
        })
    });
    provide("util/donottrack", function (e) {
        using("dom/cookie", function (t) {
            e(function (e) {
                var n = /\.(gov|mil)(:\d+)?$/i,
                    r = /https?:\/\/([^\/]+).*/i;
                return e = e || document.referrer, e = r.test(e) && r.exec(e)[1], t("dnt") ? !0 : n.test(document.location.host) ? !0 : e && n.test(e) ? !0 : document.navigator ? document.navigator["doNotTrack"] == 1 : navigator ? navigator["doNotTrack"] == 1 || navigator["msDoNotTrack"] == 1 : !1
            })
        })
    });
    provide("tfw/util/guest_cookie", function (e) {
        using("dom/cookie", "util/donottrack", "util/decider", function (t, n, r) {
            function s() {
                var e = t(i) || !1;
                if (!e) return;
                e.match(/^v3\:/) || o()
            }

            function o() {
                t(i) && t(i, null, {
                    domain: ".twitter.com",
                    path: "/"
                })
            }

            function u() {
                n() && o()
            }
            var i = "pid";
            e({
                set: u,
                destroy: o,
                forceNewCookie: s,
                guest_id_cookie: i
            })
        })
    });
    provide("dom/sandbox", function (e) {
        using("util/domready", "util/env", function (t, n) {
            function i(e, t) {
                var n, r, i;
                if (e.name) {
                    try {
                        i = document.createElement('<iframe name="' + e.name + '"></iframe>')
                    } catch (s) {
                        i = document.createElement("iframe"), i.name = e.name
                    }
                    delete e.name
                } else i = document.createElement("iframe");
                e.id && (i.id = e.id, delete e.id);
                for (n in e) e.hasOwnProperty(n) && i.setAttribute(n, e[n]);
                i.allowtransparency = "true", i.scrolling = "no", i.setAttribute("frameBorder", 0), i.setAttribute("allowTransparency", !0);
                for (r in t || {}) t.hasOwnProperty(r) && (i.style[r] = t[r]);
                return i
            }

            function s(e, t, n, r) {
                var s;
                this.attrs = t || {}, this.styles = n || {}, this.appender = r, this.onReady = e, this.sandbox = {}, s = i(this.attrs, this.styles), s.onreadystatechange = s.onload = this.getCallback(this.onLoad), this.sandbox.frame = s, r ? r(s) : document.body.appendChild(s)
            }

            function o(e, n, r, i) {
                t(function () {
                    new s(e, n, r, i)
                })
            }
            var r = 0;
            window.twttr = window.twttr || {}, window.twttr.sandbox || (window.twttr.sandbox = {}), s.prototype.getCallback = function (e) {
                var t = this,
                    n = !1;
                return function () {
                    n || (n = !0, e.call(t))
                }
            }, s.prototype.registerCallback = function (e) {
                var t = "cb" + r++;
                return window.twttr.sandbox[t] = e, t
            }, s.prototype.onLoad = function () {
                try {
                    this.sandbox.frame.contentWindow.document
                } catch (e) {
                    this.setDocDomain();
                    return
                }
                this.sandbox.win = this.sandbox.frame.contentWindow, this.sandbox.doc = this.sandbox.frame.contentWindow.document, this.writeStandardsDoc(), this.sandbox.body = this.sandbox.frame.contentWindow.document.body, this.onReady(this.sandbox)
            }, s.prototype.setDocDomain = function () {
                var e, t = this.registerCallback(this.getCallback(this.onLoad));
                e = ["javascript:", 'document.write("");', "try { window.parent.document; }", "catch (e) {", 'document.domain="' + document.domain + '";', "}", 'window.parent.twttr.sandbox["' + t + '"]();'].join(""), this.sandbox.frame.parentNode.removeChild(this.sandbox.frame), this.sandbox.frame = null, this.sandbox.frame = i(this.attrs, this.styles), this.sandbox.frame.src = e, this.appender ? this.appender(this.sandbox.frame) : document.body.appendChild(this.sandbox.frame)
            }, s.prototype.writeStandardsDoc = function () {
                if (!n.anyIE() || n.cspEnabled()) return;
                var e = ["<!DOCTYPE html>", "<html>", "<head>", "<scr", "ipt>", "try { window.parent.document; }", 'catch (e) {document.domain="' + document.domain + '";}', "</scr", "ipt>", "</head>", "<body></body>", "</html>"].join("");
                this.sandbox.doc.write(e), this.sandbox.doc.close()
            }, e(o)
        })
    });
    provide("tfw/util/tracking", function (e) {
        using("dom/cookie", "dom/delegate", "dom/sandbox", "util/donottrack", "tfw/util/guest_cookie", "tfw/util/env", "util/util", "$xd/json2.js", function (t, n, r, i, s, o, u) {
            function E() {
                y = document.getElementById("rufous-sandbox");
                if (y) {
                    g = y.contentWindow.document, m = g.body;
                    return
                }
                r(function (e) {
                    y = e.frame, g = e.doc, m = e.doc.body, h = _(), p = D();
                    while (d[0]) C.apply(this, d.shift());
                    v && k()
                }, {
                    id: "rufous-sandbox"
                }, {
                    display: "none"
                })
            }

            function S(e, t, n, r) {
                var i = !u.isObject(e),
                    s = t ? !u.isObject(t) : !1,
                    o, a;
                if (i || s) return;
                if (/Firefox/.test(navigator.userAgent)) return;
                o = A(e), a = O(t, !! n, !! r), N(o, a, !0)
            }

            function x(e, n, r, a) {
                var l = f[n],
                    c, h, p = s.guest_id_cookie;
                if (!l) return;
                e = e || {}, a = !! a, r = !! r, h = e.original_redirect_referrer || document.referrer, a = a || i(h), c = u.aug({}, e), r || (T(c, "referrer", h), T(c, "widget", +o.isDynamicWidget()), T(c, "hask", + !! t("k")), T(c, "li", + !! t("twid")), T(c, p, t(p) || "")), a && (T(c, "dnt", 1), H(c)), P(l + "?" + M(c))
            }

            function T(e, t, n) {
                var r = a + t;
                if (!e) return;
                return e[r] = n, e
            }

            function N(e, t, n) {
                var r, i, s, o, a = b + "?";
                if (!u.isObject(e) || !u.isObject(t)) return;
                s = u.aug({}, t, {
                    event_namespace: e
                }), n ? (a += M({
                    l: B(s)
                }), P(a)) : (r = h.firstChild, r.value = +r.value || +s.dnt, o = B(s), i = g.createElement("input"), i.type = "hidden", i.name = "l", i.value = o, h.appendChild(i))
            }

            function C(e, t, n, r) {
                var i = !u.isObject(e),
                    s = t ? !u.isObject(t) : !1,
                    o, a;
                if (i || s) return;
                if (!m || !h) {
                    d.push([e, t, n, r]);
                    return
                }
                o = A(e), a = O(t, !! n, !! r), N(o, a)
            }

            function k() {
                var e;
                if (!h) {
                    v = !0;
                    return
                }
                if (h.children.length <= 1) return;
                m.appendChild(h), m.appendChild(p), e = L(h, p), n.on(p, "load", function () {
                    window.setTimeout(e, 0)
                }), h.submit(), h = _(), p = D()
            }

            function L(e, t) {
                return function () {
                    var n = e.parentNode;
                    if (!n) return;
                    n.removeChild(e), n.removeChild(t)
                }
            }

            function A(e) {
                return u.aug({
                    client: "tfw"
                }, e || {})
            }

            function O(e, t, n) {
                var r = {
                    _category_: "tfw_client_event"
                }, s, o;
                return t = !! t, n = !! n, s = u.aug(r, e || {}), o = s.widget_origin || document.referrer, s.format_version = 1, s.dnt = n = n || i(o), s.triggered_on = s.triggered_on || +(new Date), t || (s.widget_origin = o), n && H(s), s
            }

            function M(e) {
                var t = [],
                    n, r, i;
                for (n in e) e.hasOwnProperty(n) && (r = encodeURIComponent(n), i = encodeURIComponent(e[n]), i = i.replace(/'/g, "%27"), t.push(r + "=" + i));
                return t.join("&")
            }

            function _() {
                var e = g.createElement("form"),
                    t = g.createElement("input"),
                    n = g.createElement("input");
                return c++, e.action = b, e.method = "POST", e.target = "rufous-frame-" + c, e.id = "rufous-form-" + c, t.type = "hidden", t.name = "dnt", t.value = 0, n.type = "hidden", n.name = "tfw_redirect", n.value = w, e.appendChild(t), e.appendChild(n), e
            }

            function D() {
                var e, t = "rufous-frame-" + c;
                try {
                    e = g.createElement("<iframe name=" + t + ">")
                } catch (n) {
                    e = g.createElement("iframe"), e.name = t
                }
                return e.id = t, e.style.display = "none", e.width = 0, e.height = 0, e.border = 0, e
            }

            function P(e) {
                var t = document.createElement("img");
                t.src = e, t.alt = "", t.style.position = "absolute", t.style.height = "1px", t.style.width = "1px", t.style.top = "-9999px", t.style.left = "-9999px", document.body.appendChild(t)
            }

            function H(e) {
                var t;
                for (t in e)~ u.indexOf(l, t) && delete e[t]
            }

            function B(e) {
                var t = Array.prototype.toJSON,
                    n;
                return delete Array.prototype.toJSON, n = JSON.stringify(e), t && (Array.prototype.toJSON = t), n
            }
            var a = "twttr_",
                f = {
                    tweetbutton: "//p.twitter.com/t.gif",
                    followbutton: "//p.twitter.com/f.gif",
                    tweetembed: "//p.twitter.com/e.gif"
                }, l = ["hask", "li", "logged_in", "pid", "user_id", s.guest_id_cookie, a + "hask", a + "li", a + s.guest_id_cookie],
                c = 0,
                h, p, d = [],
                v, m, g, y, b = "https://twitter.com/i/jot",
                w = "https://platform.twitter.com/jot.html";
            s.forceNewCookie(), e({
                enqueue: C,
                flush: k,
                initPostLogging: E,
                addPixel: S,
                addLegacyPixel: x,
                addVar: T
            })
        })
    });
    provide("tfw/util/data", function (e) {
        using("util/logger", "util/util", "util/querystring", function (t, n, r) {
            function c(e, t) {
                return e == {}.toString.call(t).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
            }

            function h(e) {
                return function (n) {
                    n.error ? e.error && e.error(n) : n.headers && n.headers.status != 200 ? (e.error && e.error(n), t.warn(n.headers.message)) : e.success && e.success(n), e.complete && e.complete(n), p(e)
                }
            }

            function p(e) {
                var t = e.script;
                t && (t.onload = t.onreadystatechange = null, t.parentNode && t.parentNode.removeChild(t), e.script = undefined, t = undefined), e.callbackName && twttr.tfw.callbacks[e.callbackName] && delete twttr.tfw.callbacks[e.callbackName]
            }

            function d(e) {
                var t = {};
                return e.success && c("function", e.success) && (t.success = e.success), e.error && c("function", e.error) && (t.error = e.error), e.complete && c("function", e.complete) && (t.complete = e.complete), t
            }

            function v(e, t, n) {
                var r = e.length,
                    i = {}, s = 0;
                return function (o) {
                    var u, a = [],
                        f = [],
                        l = [],
                        c, h;
                    u = n(o), i[u] = o;
                    if (++s === r) {
                        for (c = 0; c < r; c++) h = i[e[c]], a.push(h), h.error ? l.push(h) : f.push(h);
                        t.error && l.length > 0 && t.error(l), t.success && f.length > 0 && t.success(f), t.complete && t.complete(a)
                    }
                }
            }
            window.twttr = window.twttr || {}, twttr.tfw = twttr.tfw || {}, twttr.tfw.callbacks = twttr.tfw.callbacks || {};
            var i = "twttr.tfw.callbacks",
                s = twttr.tfw.callbacks,
                o = "cb",
                u = 0,
                a = !1,
                f = {}, l = {
                    userLookup: "//api.twitter.com/1/users/lookup.json",
                    userShow: "//cdn.api.twitter.com/1/users/show.json",
                    status: "//cdn.api.twitter.com/1/statuses/show.json",
                    tweets: "//syndication.twimg.com/tweets.json",
                    count: "//cdn.api.twitter.com/1/urls/count.json",
                    friendship: "//cdn.api.twitter.com/1/friendships/exists.json",
                    timeline: "//cdn.syndication.twimg.com/widgets/timelines/",
                    timelinePoll: "//syndication.twimg.com/widgets/timelines/paged/",
                    timelinePreview: "//syndication.twimg.com/widgets/timelines/preview/"
                };
            twttr.widgets && twttr.widgets.endpoints && n.aug(l, twttr.widgets.endpoints), f.jsonp = function (e, t, n) {
                var f = n || o + u,
                    l = i + "." + f,
                    c = document.createElement("script"),
                    p = {
                        callback: l,
                        suppress_response_codes: !0
                    };
                s[f] = h(t);
                if (a || !/^https?\:$/.test(window.location.protocol)) e = e.replace(/^\/\//, "https://");
                c.src = r.url(e, p), c.async = "async", document.body.appendChild(c), t.script = c, t.callbackName = f, n || u++
            }, f.config = function (e) {
                if (e.forceSSL === !0 || e.forceSSL === !1) a = e.forceSSL
            }, f.user = function () {
                var e, t = {}, n, i, s;
                arguments.length === 1 ? (e = arguments[0].screenName, t = d(arguments[0])) : (e = arguments[0], t.success = arguments[1]), n = c("array", e) ? l.userLookup : l.userShow, e = c("array", e) ? e.join(",") : e, i = {
                    screen_name: e
                }, s = r.url(n, i), this.jsonp(s, t)
            }, f.userById = function (e) {
                var t, n = {}, i, s, o;
                arguments.length === 1 ? (t = e.ids, n = d(e)) : (t = e, n.success = arguments[1]), i = c("array", t) ? l.userLookup : l.userShow, t = c("array", t) ? t.join(",") : t, s = {
                    user_id: t
                }, o = r.url(i, s), this.jsonp(o, n)
            }, f.status = function () {
                var e, t = {}, n, i, s, o;
                arguments.length === 1 ? (e = arguments[0].id, t = d(arguments[0])) : (e = arguments[0], t.success = arguments[1]);
                if (!c("array", e)) n = {
                    id: e,
                    include_entities: !0
                }, i = r.url(l.status, n), this.jsonp(i, t);
                else {
                    s = v(e, t, function (e) {
                        return e.error ? e.request.split("id=")[1].split("&")[0] : e.id_str
                    });
                    for (o = 0; o < e.length; o++) n = {
                        id: e[o],
                        include_entities: !0
                    }, i = r.url(l.status, n), this.jsonp(i, {
                        success: s,
                        error: s
                    })
                }
            }, f.tweets = function (e) {
                var t = arguments[0],
                    n = d(t),
                    i = {
                        ids: e.ids.join(","),
                        lang: e.lang
                    }, s = r.url(l.tweets, i);
                this.jsonp(s, n)
            }, f.count = function () {
                var e = "",
                    t, n, i = {};
                arguments.length === 1 ? (e = arguments[0].url, i = d(arguments[0])) : arguments.length === 2 && (e = arguments[0], i.success = arguments[1]), n = {
                    url: e
                }, t = r.url(l.count, n), this.jsonp(t, i)
            }, f.friendshipExists = function (e) {
                var t = d(e),
                    n = {
                        screen_name_a: e.screenNameA,
                        screen_name_b: e.screenNameB
                    }, i = r.url(l.friendship, n);
                this.jsonp(i, t)
            }, f.timeline = function (e) {
                var t = arguments[0],
                    i = d(t),
                    s, o = 9e5,
                    u = Math.floor(+(new Date) / o),
                    a = {
                        lang: e.lang,
                        t: u,
                        domain: window.location.host,
                        dnt: e.dnt,
                        override_type: e.overrideType,
                        override_id: e.overrideId,
                        override_name: e.overrideName,
                        override_owner_id: e.overrideOwnerId,
                        override_owner_name: e.overrideOwnerName,
                        with_replies: e.withReplies
                    };
                n.compact(a), s = r.url(l.timeline + e.id, a), this.jsonp(s, i, "tl_" + e.id + "_" + e.instanceId)
            }, f.timelinePoll = function (e) {
                var t = arguments[0],
                    i = d(t),
                    s = {
                        lang: e.lang,
                        since_id: e.sinceId,
                        max_id: e.maxId,
                        domain: window.location.host,
                        dnt: e.dnt,
                        override_type: e.overrideType,
                        override_id: e.overrideId,
                        override_name: e.overrideName,
                        override_owner_id: e.overrideOwnerId,
                        override_owner_name: e.overrideOwnerName,
                        with_replies: e.withReplies
                    }, o;
                n.compact(s), o = r.url(l.timelinePoll + e.id, s), this.jsonp(o, i, "tlPoll_" + e.id + "_" + e.instanceId + "_" + (e.sinceId || e.maxId))
            }, f.timelinePreview = function (e) {
                var t = arguments[0],
                    n = d(t),
                    i = e.params,
                    s = r.url(l.timelinePreview, i);
                this.jsonp(s, n)
            }, e(f)
        })
    });
    provide("anim/transition", function (e) {
        function t(e, t) {
            var n;
            return t = t || window, n = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.msRequestAnimationFrame || t.oRequestAnimationFrame || function (n) {
                t.setTimeout(function () {
                    e(+(new Date))
                }, 1e3 / 60)
            }, n(e)
        }

        function n(e, t) {
            return Math.sin(Math.PI / 2 * t) * e
        }

        function r(e, n, r, i, s) {
            function a() {
                var u = +(new Date),
                    f = u - o,
                    l = Math.min(f / r, 1),
                    c = i ? i(n, l) : n * l;
                e(c);
                if (l == 1) return;
                t(a, s)
            }
            var o = +(new Date),
                u;
            t(a)
        }
        e({
            animate: r,
            requestAnimationFrame: t,
            easeOut: n
        })
    });
    provide("util/datetime", function (e) {
        using("util/util", function (t) {
            function h(e) {
                return e < 10 ? "0" + e : e
            }

            function p(e) {
                function i(e, n) {
                    return t && t[e] && (e = t[e]), e.replace(/%\{([\w_]+)\}/g, function (e, t) {
                        return n[t] !== undefined ? n[t] : e
                    })
                }
                var t = e && e.phrases,
                    n = e && e.months || s,
                    r = e && e.formats || o;
                this.timeAgo = function (e) {
                    var t = p.parseDate(e),
                        s = +(new Date),
                        o = s - t,
                        h;
                    return t ? isNaN(o) || o < u * 2 ? i("now") : o < a ? (h = Math.floor(o / u), i(r.abbr, {
                        number: h,
                        symbol: i(c, {
                            abbr: i("s"),
                            expanded: h > 1 ? i("seconds") : i("second")
                        })
                    })) : o < f ? (h = Math.floor(o / a), i(r.abbr, {
                        number: h,
                        symbol: i(c, {
                            abbr: i("m"),
                            expanded: h > 1 ? i("minutes") : i("minute")
                        })
                    })) : o < l ? (h = Math.floor(o / f), i(r.abbr, {
                        number: h,
                        symbol: i(c, {
                            abbr: i("h"),
                            expanded: h > 1 ? i("hours") : i("hour")
                        })
                    })) : o < l * 365 ? i(r.shortdate, {
                        day: t.getDate(),
                        month: i(n[t.getMonth()])
                    }) : i(r.longdate, {
                        day: t.getDate(),
                        month: i(n[t.getMonth()]),
                        year: t.getFullYear().toString().slice(2)
                    }) : ""
                }, this.localTimeStamp = function (e) {
                    var t = p.parseDate(e),
                        s = t && t.getHours();
                    return t ? i(r.full, {
                        day: t.getDate(),
                        month: i(n[t.getMonth()]),
                        year: t.getFullYear(),
                        hours24: h(s),
                        hours12: s < 13 ? s ? s : "12" : s - 12,
                        minutes: h(t.getMinutes()),
                        seconds: h(t.getSeconds()),
                        amPm: s < 12 ? i("AM") : i("PM")
                    }) : ""
                }
            }
            var n = /(\d{4})-?(\d{2})-?(\d{2})T(\d{2}):?(\d{2}):?(\d{2})(Z|[\+\-]\d{2}:?\d{2})/,
                r = /[a-z]{3,4} ([a-z]{3}) (\d{1,2}) (\d{1,2}):(\d{2}):(\d{2}) ([\+\-]\d{2}:?\d{2}) (\d{4})/i,
                i = /^\d+$/,
                s = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                o = {
                    abbr: "%{number}%{symbol}",
                    shortdate: "%{day} %{month}",
                    longdate: "%{day} %{month} %{year}",
                    full: "%{hours12}:%{minutes} %{amPm} - %{day} %{month} %{year}"
                }, u = 1e3,
                a = u * 60,
                f = a * 60,
                l = f * 24,
                c = '<abbr title="%{expanded}">%{abbr}</abbr>';
            p.parseDate = function (e) {
                var o = e || "",
                    u = o.toString(),
                    a, f;
                return a = function () {
                    var e;
                    if (i.test(u)) return parseInt(u, 10);
                    if (e = u.match(r)) return Date.UTC(e[7], t.indexOf(s, e[1]), e[2], e[3], e[4], e[5]);
                    if (e = u.match(n)) return Date.UTC(e[1], e[2] - 1, e[3], e[4], e[5], e[6])
                }(), a ? (f = new Date(a), !isNaN(f.getTime()) && f) : !1
            }, e(p)
        })
    });
    provide("tfw/util/assets", function (e) {
        using("util/env", function (t) {
            function r(e, r) {
                var i = n[e],
                    s;
                return t.retina() ? s = "2x" : t.ie6() || t.ie7() ? s = "gif" : s = "default", r && (s += ".rtl"), i[s]
            }
            var n = {
                "embed/timeline.css": {
                    "default": "embed/timeline.4c7bdf7c22f411f2ff2324c8d6b08523.default.css",
                    "2x": "embed/timeline.4c7bdf7c22f411f2ff2324c8d6b08523.2x.css",
                    gif: "embed/timeline.4c7bdf7c22f411f2ff2324c8d6b08523.gif.css",
                    "default.rtl": "embed/timeline.4c7bdf7c22f411f2ff2324c8d6b08523.default.rtl.css",
                    "2x.rtl": "embed/timeline.4c7bdf7c22f411f2ff2324c8d6b08523.2x.rtl.css",
                    "gif.rtl": "embed/timeline.4c7bdf7c22f411f2ff2324c8d6b08523.gif.rtl.css"
                }
            };
            e(r)
        })
    });
    provide("tfw/widget/syndicatedbase", function (e) {
        using("tfw/widget/base", "tfw/widget/intent", "tfw/util/assets", "tfw/util/globals", "dom/classname", "dom/delegate", "dom/sandbox", "util/env", "util/twitter", "util/util", function (t, n, r, i, s, o, u, a, f, l) {
            function y() {
                v = E.VALID_COLOR.test(i.val("widgets:link-color")) && RegExp.$1, g = E.VALID_COLOR.test(i.val("widgets:border-color")) && RegExp.$1, m = i.val("widgets:theme")
            }

            function b(e, t, n) {
                var r;
                n = n || document;
                if (n.getElementById(e)) return;
                r = n.createElement("link"), r.id = e, r.rel = "stylesheet", r.type = "text/css", r.href = twttr.widgets.config.assetUrl() + "/" + t, n.getElementsByTagName("head")[0].appendChild(r)
            }

            function w(e) {
                b("twitter-widget-css", r("embed/timeline.css"), e)
            }

            function E(e) {
                if (!e) return;
                var n, r, i = this;
                this.sandboxReadyCallbacks = [], t.apply(this, [e]), n = this.params(), this.targetEl = this.srcEl && this.srcEl.parentNode || n.targetEl || document.body, this.containerWidth = this.targetEl && this.targetEl.offsetWidth, r = n.width || this.attr("width") || this.containerWidth || this.dimensions.DEFAULT_WIDTH, this.height = E.VALID_UNIT.test(n.height || this.attr("height")) && RegExp.$1, this.width = Math.max(this.dimensions.MIN_WIDTH, Math.min(E.VALID_UNIT.test(r) ? RegExp.$1 : this.dimensions.DEFAULT_WIDTH, this.dimensions.DEFAULT_WIDTH)), this.narrow = n.narrow || this.width <= this.dimensions.NARROW_WIDTH, this.narrow && this.classAttr.push("var-narrow"), E.VALID_COLOR.test(n.linkColor || this.dataAttr("link-color")) ? this.linkColor = RegExp.$1 : this.linkColor = v, E.VALID_COLOR.test(n.borderColor || this.dataAttr("border-color")) ? this.borderColor = RegExp.$1 : this.borderColor = g, this.theme = n.theme || this.attr("data-theme") || m, this.theme = /(dark|light)/.test(this.theme) ? this.theme : "", this.classAttr.push(a.touch() ? "is-touch" : "not-touch"), u(function (e) {
                    i.sandboxReady = !0, i.setupSandbox.call(i, e)
                }, {
                    "class": this.renderedClassNames,
                    id: this.id
                }, {
                    width: "1px",
                    height: "1px",
                    border: "none",
                    position: "absolute"
                }, function (e) {
                    i.srcEl ? i.targetEl.insertBefore(e, i.srcEl) : i.targetEl.appendChild(e)
                })
            }
            var c = [".customisable", ".customisable:link", ".customisable:visited", ".customisable:hover", ".customisable:focus", ".customisable:active", ".customisable-highlight:hover", ".customisable-highlight:focus", "a:hover .customisable-highlight", "a:focus .customisable-highlight"],
                h = ["a:hover .ic-mask", "a:focus .ic-mask"],
                p = [".customisable-border"],
                d = [".timeline-header h1.summary", ".timeline-header h1.summary a:link", ".timeline-header h1.summary a:visited"],
                v, m, g;
            E.prototype = new t, l.aug(E.prototype, {
                setupSandbox: function (e) {
                    var t = e.doc,
                        n = t.createElement("base"),
                        r = t.createElement("style"),
                        i = t.getElementsByTagName("head")[0],
                        s = "body{display:none}",
                        o = this,
                        u;
                    this.sandbox = e, e.frame.title = this.a11yTitle, w(e.doc), n.target = "_blank", i.appendChild(n), a.cspEnabled() || (r.type = "text/css", r.styleSheet ? r.styleSheet.cssText = s : r.appendChild(t.createTextNode(s)), i.appendChild(r)), this.handleResize && window.addEventListener ? window.addEventListener("resize", function () {
                        o.handleResize()
                    }, !0) : document.body.attachEvent("onresize", function () {
                        o.handleResize()
                    }), e.win.onresize = function () {
                        o.handleResize && o.handleResize()
                    }, this.frameIsReady = !0;
                    for (; u = this.sandboxReadyCallbacks.shift();) u.fn.apply(u.context, u.args)
                },
                callsWhenSandboxReady: function (e) {
                    var t = this;
                    return function () {
                        var n = [],
                            r = arguments.length,
                            i = 0;
                        for (; i < r; i++) n.push(arguments[i]);
                        t.callIfSandboxReady(e, t, n)
                    }
                },
                callIfSandboxReady: function (e, t, n) {
                    n = n || [], t.frameIsReady ? e.apply(t, [!1].concat(n)) : t.sandboxReadyCallbacks.push({
                        fn: e,
                        context: t,
                        args: [!0].concat(n)
                    })
                },
                contentWidth: function () {
                    var e = this.dimensions,
                        t = this.chromeless && this.narrow ? e.NARROW_MEDIA_PADDING_CL : this.chromeless ? e.WIDE_MEDIA_PADDING_CL : this.narrow ? e.NARROW_MEDIA_PADDING : e.WIDE_MEDIA_PADDING;
                    return this.width - t
                },
                addSiteStyles: function () {
                    var e = this,
                        t = this.sandbox.doc,
                        n = this.id + "-styles",
                        r, i = function (t) {
                            return (e.theme == "dark" ? ".thm-dark " : "") + t
                        }, s = [];
                    if (a.cspEnabled()) return;
                    if (t.getElementById(n)) return;
                    this.headingStyle && s.push(l.map(d, i).join(",") + "{" + this.headingStyle + "}"), this.linkColor && (s.push(l.map(c, i).join(",") + "{color:" + this.linkColor + "}"), s.push(l.map(h, i).join(",") + "{background-color:" + this.linkColor + "}")), this.borderColor && s.push(l.map(p, i).concat(this.theme == "dark" ? [".thm-dark.customisable-border"] : []).join(",") + "{border-color:" + this.borderColor + "}");
                    if (!s.length) return;
                    r = t.createElement("style"), r.id = n, r.type = "text/css", r.styleSheet ? r.styleSheet.cssText = s.join("") : r.appendChild(t.createTextNode(s.join(""))), t.getElementsByTagName("head")[0].appendChild(r)

                },
                bindIntentHandlers: function () {
                    var e = this,
                        t = this.element;
                    o.delegate(t, "click", ".profile", function (t) {
                        var r;
                        e.addUrlParams(this), r = f.intentForProfileURL(this.href);
                        if (t.altKey || t.metaKey || t.shiftKey) return;
                        r && (n.open(r, e.sandbox.frame), o.preventDefault(t))
                    }), o.delegate(t, "click", ".web-intent", function (t) {
                        e.addUrlParams(this);
                        if (t.altKey || t.metaKey || t.shiftKey) return;
                        n.open(this.href, e.sandbox.frame), o.preventDefault(t)
                    })
                }
            }), E.VALID_UNIT = /^([0-9]+)( ?px)?$/, E.VALID_COLOR = /^(#(?:[0-9a-f]{3}|[0-9a-f]{6}))$/i, E.retinize = function (e) {
                if (!a.retina()) return;
                var t = e.getElementsByTagName("IMG"),
                    n, r, i = 0,
                    s = t.length;
                for (; i < s; i++) n = t[i], r = n.getAttribute("data-src-2x"), r && (n.src = r)
            }, E.scaleDimensions = function (e, t, n, r) {
                return t > e && t > r ? (e *= r / t, t = r) : e > n && (t *= n / e, e = n, t > r && (e *= r / t, t = r)), {
                    width: Math.ceil(e),
                    height: Math.ceil(t)
                }
            }, E.constrainMedia = function (e, t) {
                var n = e.getElementsByTagName("IMG"),
                    r = e.getElementsByTagName("IFRAME"),
                    i, s, o, u = 0,
                    a = 0,
                    f;
                for (; i = [n, r][a]; a++)
                    if (i.length)
                        for (f = 0; s = i[f]; f++) o = E.scaleDimensions(s.getAttribute("width") || s.width, s.getAttribute("height") || s.height, t, 375), o.width > 0 && (s.width = o.width), o.height > 0 && (s.height = o.height), u = o.height > u ? o.height : u;
                return u
            }, y(), e(E)
        })
    });
    provide("tfw/widget/timeline", function (e) {
        using("tfw/widget/syndicatedbase", "util/datetime", "anim/transition", "tfw/util/article", "tfw/util/data", "tfw/util/tracking", "tfw/util/params", "util/css", "util/env", "util/iframe", "util/insert", "util/throttle", "util/twitter", "util/querystring", "util/typevalidator", "util/util", "dom/delegate", "dom/classname", "dom/get", function (t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b) {
            function I(e) {
                if (!e) return;
                var n, r, i, s, o, u, f;
                this.a11yTitle = this._("Twitter Timeline Widget"), t.apply(this, [e]), n = this.params(), r = (n.chrome || this.dataAttr("chrome") || "").split(" "), this.preview = n.previewParams, this.widgetId = n.widgetId || this.dataAttr("widget-id"), this.instanceId = ++F, (s = n.screenName || this.dataAttr("screen-name")) || (o = n.userId || this.dataAttr("user-id")) ? this.override = {
                    overrideType: "user",
                    overrideId: o,
                    overrideName: s,
                    withReplies: v.asBoolean(n.showReplies || this.dataAttr("show-replies")) ? "true" : "false"
                } : (s = n.favoritesScreenName || this.dataAttr("favorites-screen-name")) || (o = n.favoritesUserId || this.dataAttr("favorites-user-id")) ? this.override = {
                    overrideType: "favorites",
                    overrideId: o,
                    overrideName: s
                } : ((s = n.listOwnerScreenName || this.dataAttr("list-owner-screen-name")) || (o = n.listOwnerId || this.dataAttr("list-owner-id"))) && ((u = n.listId || this.dataAttr("list-id")) || (f = n.listSlug || this.dataAttr("list-slug"))) ? this.override = {
                    overrideType: "list",
                    overrideOwnerId: o,
                    overrideOwnerName: s,
                    overrideId: u,
                    overrideName: f
                } : this.override = {}, this.tweetLimit = v.asInt(n.tweetLimit || this.dataAttr("tweet-limit")), this.staticTimeline = this.tweetLimit > 0, r.length && (i = ~m.indexOf(r, "none"), this.chromeless = i || ~m.indexOf(r, "transparent"), this.headerless = i || ~m.indexOf(r, "noheader"), this.footerless = i || ~m.indexOf(r, "nofooter"), this.borderless = i || ~m.indexOf(r, "noborders"), this.noscrollbar = ~m.indexOf(r, "noscrollbar")), this.headingStyle = a.sanitize(n.headingStyle || this.dataAttr("heading-style"), undefined, !0), this.classAttr.push("twitter-timeline-rendered"), this.ariaPolite = n.ariaPolite || this.dataAttr("aria-polite")
            }

            function q(e, n) {
                var r = e.ownerDocument,
                    i = b.one(O, e, "DIV"),
                    s = i && i.children[0],
                    o = s && s.getAttribute("data-expanded-media"),
                    u, a = 0,
                    f = b.one(M, e, "A"),
                    l = f && f.getElementsByTagName("B")[0],
                    c = l && (l.innerText || l.textContent),
                    h;
                if (!l) return;
                l.innerHTML = f.getAttribute("data-toggled-text"), f.setAttribute("data-toggled-text", c);
                if (y.present(e, A)) {
                    y.remove(e, A);
                    if (!i) return;
                    i.style.cssText = "", s.innerHTML = "";
                    return
                }
                o && (u = r.createElement("DIV"), u.innerHTML = o, t.retinize(u), a = t.constrainMedia(u, n), s.appendChild(u)), i && (h = Math.max(s.offsetHeight, a), i.style.cssText = "height:" + h + "px"), y.add(e, A)
            }
            var w = "1.0",
                E = {
                    CLIENT_SIDE_USER: 0,
                    CLIENT_SIDE_APP: 2
                }, S = "timeline",
                x = "new-tweets-bar",
                T = "timeline-header",
                N = "timeline-footer",
                C = "stream",
                k = "h-feed",
                L = "tweet",
                A = "expanded",
                O = "detail-expander",
                M = "expand",
                _ = "permalink",
                D = "twitter-follow-button",
                P = "no-more-pane",
                H = "pending-scroll-in",
                B = "pending-new-tweet",
                j = "show-new-tweet",
                F = 0;
            I.prototype = new t, m.aug(I.prototype, {
                renderedClassNames: "twitter-timeline twitter-timeline-rendered",
                dimensions: {
         DEFAULT_HEIGHT: "600",
            DEFAULT_WIDTH: "100", // modify this to be 100 - like 100%
            NARROW_WIDTH: "100", // modify this to be 100 - like 100%
            MIN_WIDTH: "100", // modify this to be 100 - like 100%
            MIN_HEIGHT: "200", 
            WIDE_MEDIA_PADDING: 81,
            NARROW_MEDIA_PADDING: 16,
            WIDE_MEDIA_PADDING_CL: 60,
            NARROW_MEDIA_PADDING_CL: 12 },
                create: function (e) {
                    var n = this.sandbox.doc.createElement("div"),
                        r, s = this,
                        u, a, f, l = [],
                        c, h;
                    n.innerHTML = e.body, r = n.children[0] || !1;
                    if (!r) return;
                    this.reconfigure(e.config), this.discardStaticOverflow(r), this.augmentWidgets(r), t.retinize(r), t.constrainMedia(r, this.contentWidth()), this.searchQuery = r.getAttribute("data-search-query"), this.profileId = r.getAttribute("data-profile-id"), c = this.getTweetDetails(n);
                    for (h in c) c.hasOwnProperty(h) && l.push(h);
                    return o.enqueue({
                        page: "timeline",
                        component: "timeline",
                        element: "initial",
                        action: l.length ? "results" : "no_results"
                    }, {
                        widget_id: this.widgetId,
                        widget_origin: i.url(),
                        item_ids: l,
                        item_details: c,
                        client_version: w,
                        message: this.partner,
                        query: this.searchQuery,
                        profile_id: this.profileId
                    }, !0, this.dnt), o.flush(), this.ariaPolite == "assertive" && (a = b.one(x, r, "DIV"), a.setAttribute("aria-polite", "assertive")), r.id = this.id, r.className += " " + this.classAttr.join(" "), r.lang = this.lang, twttr.widgets.load(r), f = function () {
                        s.sandbox.body.appendChild(r), s.staticTimeline ? s.sandbox.win.setTimeout(function () {
                            s.sandbox.frame.height = s.height = r.offsetHeight
                        }, 500) : s.sandbox.win.setTimeout(function () {
                            var e = b.one(T, r, "DIV"),
                                t = b.one(N, r, "DIV"),
                                n = b.one(C, r, "DIV");
                            t ? u = e.offsetHeight + t.offsetHeight : u = e.offsetHeight, n.style.cssText = "height:" + (s.height - u - 2) + "px", s.noscrollbar && s.hideStreamScrollBar()
                        }, 500), s.sandbox.frame.style.cssText = "", s.sandbox.frame.width = s.width, s.sandbox.frame.height = s.height, s.sandbox.frame.style.border = "none", s.sandbox.frame.style.maxWidth = "100%", s.sandbox.frame.style.minWidth = s.dimensions.MIN_WIDTH + "px"
                    }, this.callsWhenSandboxReady(f)(), this.srcEl && this.srcEl.parentNode && this.srcEl.parentNode.removeChild(this.srcEl), r
                },
                render: function (e, t) {
                    function u() {
                        r.success = function (e) {
                            n.element = n.create(e), n.readTranslations(), n.bindInteractions(), t && t(n.sandbox.frame);
                            return
                        }, r.error = function (e) {
                            e && e.headers && t && t(e.headers.status)
                        }, r.params = n.preview, s.timelinePreview(r);
                        return
                    }

                    function a() {
                        o.initPostLogging(), s.timeline(m.aug({
                            id: n.widgetId,
                            instanceId: n.instanceId,
                            dnt: n.dnt,
                            lang: n.lang,
                            success: function (e) {
                                n.element = n.create(e), n.readTranslations(), n.bindInteractions(), e.headers.xPolling && /\d/.test(e.headers.xPolling) && (n.pollInterval = e.headers.xPolling * 1e3), n.updateTimeStamps(), n.staticTimeline || n.schedulePolling(), t && t(n.sandbox.frame);
                                return
                            },
                            error: function (e) {
                                e && e.headers && t && t(e.headers.status)
                            }
                        }, n.override))
                    }
                    var n = this,
                        r = {}, i;
                    if (!this.preview && !this.widgetId) {
                        t && t(400);
                        return
                    }
                    i = this.preview ? u : a, this.sandboxReady ? i() : window.setTimeout(i, 0)
                },
                reconfigure: function (e) {
                    this.lang = e.lang, this.theme || (this.theme = e.theme), this.theme == "dark" && this.classAttr.push("thm-dark"), this.chromeless && this.classAttr.push("var-chromeless"), this.borderless && this.classAttr.push("var-borderless"), this.headerless && this.classAttr.push("var-headerless"), this.footerless && this.classAttr.push("var-footerless"), this.staticTimeline && this.classAttr.push("var-static"), !this.linkColor && e.linkColor && t.VALID_COLOR.test(e.linkColor) && (this.linkColor = RegExp.$1), this.addSiteStyles(), !this.height && t.VALID_UNIT.test(e.height) && (this.height = RegExp.$1), this.height = Math.max(this.dimensions.MIN_HEIGHT, this.height ? this.height : this.dimensions.DEFAULT_HEIGHT), this.preview && this.classAttr.push("var-preview"), this.narrow = this.width <= this.dimensions.NARROW_WIDTH, this.narrow && this.classAttr.push("var-narrow")
                },
                getTweetDetails: function (e) {
                    var t = b.one(k, e),
                        n, r = {}, i, s, o, u, a = {
                            TWEET: 0,
                            RETWEET: 10
                        }, f = 0;
                    n = t && t.children || [];
                    for (; i = n[f]; f++) s = b.one(_, i, "A"), o = i.getAttribute("data-rendered-tweet-id") || p.status(s.href), u = i.getAttribute("data-tweet-id"), o === u ? r[o] = {
                        item_type: a.TWEET
                    } : r[o] = {
                        item_type: a.RETWEET,
                        target_type: a.TWEET,
                        target_id: u
                    };
                    return r
                },
                bindInteractions: function () {
                    var e = this,
                        t = this.element,
                        n = !0;
                    this.bindIntentHandlers(), g.delegate(t, "click", ".load-tweets", function (t) {
                        n && (n = !1, e.forceLoad(), g.stop(t))
                    }), g.delegate(t, "click", ".display-sensitive-image", function (n) {
                        e.showNSFW(b.ancestor("." + L, this, t)), g.stop(n)
                    }), g.delegate(t, "mouseover", "." + S, function () {
                        e.mouseOver = !0
                    }), g.delegate(t, "mouseout", "." + S, function () {
                        e.mouseOver = !1
                    }), g.delegate(t, "mouseover", "." + x, function () {
                        e.mouseOverNotifier = !0
                    }), g.delegate(t, "mouseout", "." + x, function () {
                        e.mouseOverNotifier = !1, window.setTimeout(function () {
                            e.hideNewTweetNotifier()
                        }, 3e3)
                    });
                    if (this.staticTimeline) return;
                    g.delegate(t, "click", "." + M, function (n) {
                        if (n.altKey || n.metaKey || n.shiftKey) return;
                        q(b.ancestor("." + L, this, t), e.contentWidth()), g.stop(n)
                    }), g.delegate(t, "click", "A", function (e) {
                        g.stopPropagation(e)
                    }), g.delegate(t, "click", ".with-expansion", function (t) {
                        q(this, e.contentWidth()), g.stop(t)
                    }), g.delegate(t, "click", ".load-more", function () {
                        e.loadMore()
                    }), g.delegate(t, "click", "." + x, function () {
                        e.scrollToTop(), e.hideNewTweetNotifier(!0)
                    })
                },
                scrollToTop: function () {
                    var e = b.one(C, this.element, "DIV");
                    e.scrollTop = 0, e.focus()
                },
                update: function () {
                    var e = this,
                        t = b.one(L, this.element, "LI"),
                        n = t && t.getAttribute("data-tweet-id");
                    this.updateTimeStamps(), this.requestTweets(n, !0, function (t) {
                        t.childNodes.length > 0 && e.insertNewTweets(t)
                    })
                },
                loadMore: function () {
                    var e = this,
                        t = b.all(L, this.element, "LI").pop(),
                        n = t && t.getAttribute("data-tweet-id");
                    this.requestTweets(n, !1, function (t) {
                        var r = b.one(P, e.element, "P"),
                            i = t.childNodes[0];
                        r.style.cssText = "", i && i.getAttribute("data-tweet-id") == n && t.removeChild(i);
                        if (t.childNodes.length > 0) {
                            e.appendTweets(t);
                            return
                        }
                        y.add(e.element, "no-more"), r.focus()
                    })
                },
                forceLoad: function () {
                    var e = this,
                        t = !! b.all(k, this.element, "OL").length;
                    this.requestTweets(1, !0, function (n) {
                        n.childNodes.length && (e[t ? "insertNewTweets" : "appendTweets"](n), y.add(e.element, "has-tweets"))
                    })
                },
                schedulePolling: function (e) {
                    var t = this;
                    if (this.pollInterval === null) return;
                    e = twttr.widgets.poll || e || this.pollInterval || 1e4, e > -1 && window.setTimeout(function () {
                        this.isUpdating || t.update(), t.schedulePolling()
                    }, e)
                },
                requestTweets: function (e, n, r) {
                    var u = this,
                        a = {
                            id: this.widgetId,
                            instanceId: this.instanceId,
                            screenName: this.widgetScreenName,
                            userId: this.widgetUserId,
                            withReplies: this.widgetShowReplies,
                            dnt: this.dnt,
                            lang: this.lang
                        };
                    a[n ? "sinceId" : "maxId"] = e, a.complete = function () {
                        this.isUpdating = !1
                    }, a.error = function (e) {
                        if (e && e.headers) {
                            if (e.headers.status == "404") {
                                u.pollInterval = null;
                                return
                            }
                            if (e.headers.status == "503") {
                                u.pollInterval *= 1.5;
                                return
                            }
                        }
                    }, a.success = function (e) {
                        var s = u.sandbox.doc.createDocumentFragment(),
                            a = u.sandbox.doc.createElement("div"),
                            f = [],
                            l, c;
                        e && e.headers && e.headers.xPolling && /\d+/.test(e.headers.xPolling) && (u.pollInterval = e.headers.xPolling * 1e3);
                        if (e && e.body !== undefined) {
                            a.innerHTML = e.body;
                            if (a.children[0] && a.children[0].tagName != "LI") return;
                            l = u.getTweetDetails(a);
                            for (c in l) l.hasOwnProperty(c) && f.push(c);
                            f.length && (o.enqueue({
                                page: "timeline",
                                component: "timeline",
                                element: n ? "newer" : "older",
                                action: "results"
                            }, {
                                widget_id: u.widgetId,
                                widget_origin: i.url(),
                                item_ids: f,
                                item_details: l,
                                client_version: w,
                                message: u.partner,
                                query: u.searchQuery,
                                profile_id: u.profileId,
                                event_initiator: n ? E.CLIENT_SIDE_APP : E.CLIENT_SIDE_USER
                            }, !0, u.dnt), o.flush()), t.retinize(a), t.constrainMedia(a, u.contentWidth());
                            while (a.children[0]) s.appendChild(a.children[0]);
                            r(s)
                        }
                    }, s.timelinePoll(m.aug(a, this.override))
                },
                insertNewTweets: function (e) {
                    var t = this,
                        n = b.one(C, this.element, "DIV"),
                        i = b.one(k, n, "OL"),
                        s = i.offsetHeight,
                        o;
                    this.updateTimeStamps(), i.insertBefore(e, i.firstChild), o = i.offsetHeight - s;
                    if (n.scrollTop > 40 || this.mouseIsOver()) {
                        n.scrollTop = n.scrollTop + o, this.showNewTweetNotifier();
                        return
                    }
                    y.remove(this.element, H), i.style.cssText = "margin-top: -" + o + "px", window.setTimeout(function () {
                        n.scrollTop = 0, y.add(t.element, H), f.cssTransitions() ? i.style.cssText = "" : r.animate(function (e) {
                            e < o ? i.style.cssText = "margin-top: -" + (o - e) + "px" : i.style.cssText = ""
                        }, o, 500, r.easeOut)
                    }, 500), this.gcTweets(50)
                },
                appendTweets: function (e) {
                    var t = b.one(C, this.element, "DIV"),
                        n = b.one(k, t, "OL");
                    this.updateTimeStamps(), n.appendChild(e)
                },
                gcTweets: function (e) {
                    var t = b.one(k, this.element, "OL"),
                        n = t.children.length,
                        r;
                    e = e || 50;
                    for (; n > e && (r = t.children[n - 1]); n--) t.removeChild(r)
                },
                showNewTweetNotifier: function () {
                    var e = this,
                        t = b.one(x, this.element, "DIV"),
                        n = t.children[0];
                    t.style.cssText = "", y.add(this.element, B), t.removeChild(n), t.appendChild(n), y.replace(this.element, B, j), this.newNoticeDisplayTime = +(new Date), window.setTimeout(function () {
                        e.hideNewTweetNotifier()
                    }, 5e3)
                },
                hideNewTweetNotifier: function (e) {
                    var t = this;
                    if (!e && this.mouseOverNotifier) return;
                    y.replace(this.element, j, B), window.setTimeout(function () {
                        y.remove(t.element, B)
                    }, 500)
                },
                augmentWidgets: function (e) {
                    var t = b.all(D, e, "A"),
                        n = 0,
                        r;
                    for (; r = t[n]; n++) r.setAttribute("data-related", this.related), r.setAttribute("data-partner", this.partner), r.setAttribute("data-dnt", this.dnt), r.setAttribute("data-search-query", this.searchQuery), r.setAttribute("data-profile-id", this.profileId), this.width < 250 && r.setAttribute("data-show-screen-name", "false")
                },
                discardStaticOverflow: function (e) {
                    var t = b.one(k, e, "OL"),
                        n;
                    if (this.staticTimeline) {
                        this.height = 0;
                        while (n = t.children[this.tweetLimit]) t.removeChild(n)
                    }
                },
                hideStreamScrollBar: function () {
                    var e = b.one(C, this.element, "DIV"),
                        t = b.one(k, this.element, "OL"),
                        n;
                    e.style.width = "", n = this.element.offsetWidth - t.offsetWidth, n > 0 && (e.style.width = this.element.offsetWidth + n + "px")
                },
                readTranslations: function () {
                    var e = this.element,
                        t = "data-dt-";
                    this.datetime = new n(m.compact({
                        phrases: {
                            now: e.getAttribute(t + "now"),
                            s: e.getAttribute(t + "s"),
                            m: e.getAttribute(t + "m"),
                            h: e.getAttribute(t + "h"),
                            second: e.getAttribute(t + "second"),
                            seconds: e.getAttribute(t + "seconds"),
                            minute: e.getAttribute(t + "minute"),
                            minutes: e.getAttribute(t + "minutes"),
                            hour: e.getAttribute(t + "hour"),
                            hours: e.getAttribute(t + "hours")
                        },
                        months: e.getAttribute(t + "months").split("|"),
                        formats: {
                            abbr: e.getAttribute(t + "abbr"),
                            shortdate: e.getAttribute(t + "short"),
                            longdate: e.getAttribute(t + "long")
                        }
                    }))
                },
                updateTimeStamps: function () {
                    var e = b.all(_, this.element, "A"),
                        t, n, r = 0,
                        i, s;
                    for (; t = e[r]; r++) {
                        i = t.getAttribute("data-datetime"), s = i && this.datetime.timeAgo(i, this.i18n), n = t.getElementsByTagName("TIME")[0];
                        if (!s) continue;
                        if (n && n.innerHTML) {
                            n.innerHTML = s;
                            continue
                        }
                        t.innerHTML = s
                    }
                },
                mouseIsOver: function () {
                    return this.mouseOver
                },
                addUrlParams: function (e) {
                    var t = this,
                        n = {
                            tw_w: this.widgetId,
                            related: this.related,
                            partner: this.partner,
                            query: this.searchQuery,
                            profile_id: this.profileId,
                            original_referer: i.url(),
                            tw_p: "embeddedtimeline"
                        };
                    return this.addUrlParams = u(n, function (e) {
                        var n = b.ancestor("." + L, e, t.element);
                        return n && {
                            tw_i: n.getAttribute("data-tweet-id")
                        }
                    }), this.addUrlParams(e)
                },
                showNSFW: function (e) {
                    var n = b.one("nsfw", e, "DIV"),
                        r, i, s = 0,
                        o, u, a, l;
                    if (!n) return;
                    i = t.scaleDimensions(n.getAttribute("data-width"), n.getAttribute("data-height"), this.contentWidth(), n.getAttribute("data-height")), r = !! (u = n.getAttribute("data-player")), r ? a = this.sandbox.doc.createElement("iframe") : (a = this.sandbox.doc.createElement("img"), u = n.getAttribute(f.retina() ? "data-image-2x" : "data-image"), a.alt = n.getAttribute("data-alt"), l = this.sandbox.doc.createElement("a"), l.href = n.getAttribute("data-href"), l.appendChild(a)), a.title = n.getAttribute("data-title"), a.src = u, a.width = i.width, a.height = i.height, o = b.ancestor("." + O, n, e), s = i.height - n.offsetHeight, n.parentNode.replaceChild(r ? a : l, n), o.style.cssText = "height:" + (o.offsetHeight + s) + "px"
                },
                handleResize: function () {
                    this.handleResize = h(function () {
                        var e = Math.min(this.dimensions.DEFAULT_WIDTH, Math.max(this.dimensions.MIN_WIDTH, this.sandbox.frame.offsetWidth));
                        if (!this.element) return;
                        e < this.dimensions.NARROW_WIDTH ? (this.narrow = !0, y.add(this.element, "var-narrow")) : (this.narrow = !1, y.remove(this.element, "var-narrow")), this.noscrollbar && this.hideStreamScrollBar()
                    }, 50, this), this.handleResize()
                }
            }), e(I)
        })
    });
    provide("tfw/widget/embed", function (e) {
        using("tfw/widget/base", "tfw/widget/syndicatedbase", "util/datetime", "tfw/util/params", "dom/classname", "dom/get", "util/env", "util/util", "util/throttle", "util/twitter", "tfw/util/article", "tfw/util/data", "tfw/util/tracking", function (t, n, r, i, s, o, u, a, f, l, c, h, p) {
            function g(e, t, n) {
                var r = o.one("subject", e, "BLOCKQUOTE"),
                    i = o.one("reply", e, "BLOCKQUOTE"),
                    s = r && r.getAttribute("data-tweet-id"),
                    u = i && i.getAttribute("data-tweet-id"),
                    a = {}, f = {};
                if (!s) return;
                a[s] = {
                    item_type: 0
                }, p.enqueue({
                    page: "tweet",
                    section: "subject",
                    component: "tweet",
                    action: "results"
                }, {
                    client_version: d,
                    widget_origin: c.url(),
                    widget_frame: c.frameUrl(),
                    message: t,
                    item_ids: [s],
                    item_details: a
                }, !0, n);
                if (!u) return;
                f[u] = {
                    item_type: 0
                }, p.enqueue({
                    page: "tweet",
                    section: "conversation",
                    component: "tweet",
                    action: "results"
                }, {
                    client_version: d,
                    widget_origin: c.url(),
                    widget_frame: c.frameUrl(),
                    message: t,
                    item_ids: [u],
                    item_details: f,
                    associations: {
                        4: {
                            association_id: s,
                            association_type: 4
                        }
                    }
                }, !0, n)
            }

            function y(e, t, n) {
                var r = {};
                if (!e) return;
                r[e] = {
                    item_type: 0
                }, p.enqueue({
                    page: "tweet",
                    section: "subject",
                    component: "rawembedcode",
                    action: "no_results"
                }, {
                    client_version: d,
                    widget_origin: c.url(),
                    widget_frame: c.frameUrl(),
                    message: t,
                    item_ids: [e],
                    item_details: r
                }, !0, n)
            }

            function b(e, t, n, r, i) {
                m[e] = m[e] || [], m[e].push({
                    s: n,
                    f: r,
                    r: i,
                    lang: t
                })
            }

            function w(e) {
                if (!e) return;
                var t, r, i;
                this.a11yTitle = this._("Embedded Tweet"), n.apply(this, [e]), t = this.params(), r = this.srcEl && this.srcEl.getElementsByTagName("A"), i = r && r[r.length - 1], this.hideThread = (t.conversation || this.dataAttr("conversation")) == "none" || ~a.indexOf(this.classAttr, "tw-hide-thread"), this.hideCard = (t.cards || this.dataAttr("cards")) == "hidden" || ~a.indexOf(this.classAttr, "tw-hide-media");
                if ((t.align || this.attr("align")) == "left" || ~a.indexOf(this.classAttr, "tw-align-left")) this.align = "left";
                else if ((t.align || this.attr("align")) == "right" || ~a.indexOf(this.classAttr, "tw-align-right")) this.align = "right";
                else if ((t.align || this.attr("align")) == "center" || ~a.indexOf(this.classAttr, "tw-align-center")) this.align = "center", this.containerWidth > this.dimensions.MIN_WIDTH * (1 / .7) && this.width > this.containerWidth * .7 && (this.width = this.containerWidth * .7);
                this.narrow = t.narrow || this.width <= this.dimensions.NARROW_WIDTH, this.narrow && this.classAttr.push("var-narrow"), this.tweetId = t.tweetId || i && l.status(i.href)
            }
            var d = "2.0",
                v = "tweetembed",
                m = {};
            w.prototype = new n, a.aug(w.prototype, {
                renderedClassNames: "twitter-tweet twitter-tweet-rendered",
                dimensions: {
                    DEFAULT_HEIGHT: "0",
                    DEFAULT_WIDTH: "500",
                    NARROW_WIDTH: "350",
                    MIN_WIDTH: "220",
                    MIN_HEIGHT: "0",
                    WIDE_MEDIA_PADDING: 32,
                    NARROW_MEDIA_PADDING: 32
                },
                create: function (e) {
                    var t = this.sandbox.doc.createElement("div"),
                        r, i = this.sandbox.frame,
                        s = i.style;
                    t.innerHTML = e, r = t.children[0] || !1;
                    if (!r) return;
                    return this.theme == "dark" && this.classAttr.push("thm-dark"), this.linkColor && this.addSiteStyles(), this.augmentWidgets(r), n.retinize(r), n.constrainMedia(r, this.contentWidth()), r.id = this.id, r.className += " " + this.classAttr.join(" "), r.lang = this.lang, twttr.widgets.load(r), this.sandbox.body.appendChild(r), s.cssText = "", i.width = this.width, i.height = 0, s.display = "block", s.border = "none", s.maxWidth = "99%", s.minWidth = this.dimensions.MIN_WIDTH + "px", s.padding = "0", g(r, this.partner, this.dnt), r
                },
                render: function (e, t) {
                    var n = this,
                        r = "",
                        i = this.tweetId,
                        s, o, u;
                    if (!i) return;
                    this.hideCard && (r += "c"), this.hideThread && (r += "t"), r && (i += "-" + r), u = this.callsWhenSandboxReady(function (e) {
                        function r() {
                            var e = n.sandbox.frame,
                                t = e.style;
                            n.srcEl && n.srcEl.parentNode && n.srcEl.parentNode.removeChild(n.srcEl), t.borderRadius = "5px", t.margin = "10px 0", t.border = "#ddd 1px solid", t.borderTopColor = "#eee", t.borderBottomColor = "#bbb", t.boxShadow = "0 1px 3px rgba(0,0,0,0.15)", n.align == "center" ? (t.margin = "7px auto", t.float = "none") : n.align && (n.width == n.dimensions.DEFAULT_WIDTH && (e.width = n.dimensions.NARROW_WIDTH), t.float = n.align), n.handleResize()
                        }
                        var t;
                        if ((!window.getComputedStyle || n.sandbox.win.getComputedStyle(n.sandbox.body, null).display !== "none") && n.element.offsetHeight) return r();
                        t = window.setInterval(function () {
                            (!window.getComputedStyle || n.sandbox.win.getComputedStyle(n.sandbox.body, null).display !== "none") && n.element.offsetHeight && (window.clearInterval(t), r())
                        }, 100)
                    }), s = this.callsWhenSandboxReady(function (e, r) {
                        n.element = n.create(r), n.readTimestampTranslations(), n.updateTimeStamps(), n.bindIntentHandlers(), t && t(n.sandbox.frame)
                    }), o = this.callsWhenSandboxReady(function (e) {
                        y(n.tweetId, n.partner, n.dnt)
                    }), b(i, this.lang, s, o, u)
                },
                augmentWidgets: function (e) {
                    var t = o.all("twitter-follow-button", e, "A"),
                        n, r = 0;
                    for (; n = t[r]; r++) n.setAttribute("data-related", this.related), n.setAttribute("data-partner", this.partner), n.setAttribute("data-dnt", this.dnt), n.setAttribute("data-show-screen-name", "false")
                },
                addUrlParams: function (e) {
                    var t = this,
                        n = {
                            related: this.related,
                            partner: this.partner,
                            original_referer: c.url(),
                            tw_p: v
                        };
                    return this.addUrlParams = i(n, function (e) {
                        var n = o.ancestor(".tweet", e, t.element);
                        return {
                            tw_i: n.getAttribute("data-tweet-id")
                        }
                    }), this.addUrlParams(e)
                },
                handleResize: function () {
                    this.handleResize = f(function () {
                        var e = this,
                            t = Math.min(this.dimensions.DEFAULT_WIDTH, Math.max(this.dimensions.MIN_WIDTH, this.sandbox.frame.offsetWidth));
                        if (!this.element) return;
                        t < this.dimensions.NARROW_WIDTH ? (this.narrow = !0, s.add(this.element, "var-narrow")) : (this.narrow = !1, s.remove(this.element, "var-narrow")), window.setTimeout(function () {
                            e.sandbox.frame.height = e.height = e.element.offsetHeight
                        }, 0)
                    }, 50, this), this.handleResize()
                },
                readTimestampTranslations: function () {
                    var e = this.element,
                        t = "data-dt-",
                        n = e.getAttribute(t + "months") || "";
                    this.datetime = new r(a.compact({
                        phrases: {
                            AM: e.getAttribute(t + "am"),
                            PM: e.getAttribute(t + "pm")
                        },
                        months: n.split("|"),
                        formats: {
                            full: e.getAttribute(t + "full")
                        }
                    }))
                },
                updateTimeStamps: function () {
                    var e = o.one("long-permalink", this.element, "A"),
                        t = e.getAttribute("data-datetime"),
                        n = t && this.datetime.localTimeStamp(t),
                        r = e.getElementsByTagName("TIME")[0];
                    if (!n) return;
                    if (r && r.innerHTML) {
                        r.innerHTML = n;
                        return
                    }
                    e.innerHTML = n
                }
            }), w.fetchAndRender = function () {
                var e = m,
                    t = [],
                    n, r;
                m = {};
                if (e.keys) t = e.keys();
                else
                    for (n in e) e.hasOwnProperty(n) && t.push(n); if (!t.length) return;
                p.initPostLogging(), r = e[t[0]][0].lang, h.tweets({
                    ids: t.sort(),
                    lang: r,
                    complete: function (t) {
                        var n, r, i, s, o, u, a = [];
                        for (n in t)
                            if (t.hasOwnProperty(n)) {
                                o = e[n] && e[n];
                                for (i = 0; o.length && (s = o[i]); i++) s.s && (s.s.call(this, t[n]), s.r && a.push(s.r));
                                delete e[n]
                            }
                        for (i = 0; u = a[i]; i++) u.call(this);
                        for (r in e)
                            if (e.hasOwnProperty(r)) {
                                o = e[r];
                                for (i = 0; o.length && (s = o[i]); i++) s.f && s.f.call(this, t[n])
                            }
                        p.flush()
                    }
                })
            }, t.afterLoad(w.fetchAndRender), e(w)
        })
    });
    provide("dom/textsize", function (e) {
        function n(e, t, n) {
            var r = [],
                i = 0,
                s;
            for (; s = n[i]; i++) r.push(s[0]), r.push(s[1]);
            return e + t + r.join(":")
        }

        function r(e) {
            var t = e || "";
            return t.replace(/([A-Z])/g, function (e) {
                return "-" + e.toLowerCase()
            })
        }
        var t = {};
        e(function (e, i, s) {
            var o = document.createElement("span"),
                u = {}, a = "",
                f, l = 0,
                c = 0,
                h = [];
            s = s || [], i = i || "", a = n(e, i, s);
            if (t[a]) return t[a];
            o.className = i + " twitter-measurement";
            try {
                for (; f = s[l]; l++) o.style[f[0]] = f[1]
            } catch (p) {
                for (; f = s[c]; c++) h.push(r(f[0]) + ":" + f[1]);
                o.setAttribute("style", h.join(";") + ";")
            }
            return o.innerHTML = e, document.body.appendChild(o), u.width = o.clientWidth || o.offsetWidth, u.height = o.clientHeight || o.offsetHeight, document.body.removeChild(o), delete o, t[a] = u
        })
    });
    provide("tfw/widget/tweetbase", function (e) {
        using("util/util", "tfw/widget/base", "util/querystring", "util/twitter", "util/uri", function (t, n, r, i, s) {
            function a(e) {
                if (!e) return;
                var t;
                n.apply(this, [e]), t = this.params(), this.text = t.text || this.dataAttr("text"), this.text && /\+/.test(this.text) && !/ /.test(this.text) && (this.text = this.text.replace(/\+/g, " ")), this.align = t.align || this.dataAttr("align") || "", this.via = t.via || this.dataAttr("via"), this.placeid = t.placeid || this.dataAttr("placeid"), this.hashtags = t.hashtags || this.dataAttr("hashtags"), this.screen_name = i.screenName(t.screen_name || t.screenName || this.dataAttr("button-screen-name")), this.url = t.url || this.dataAttr("url")
            }
            var o = document.title,
                u = encodeURI(location.href);
            a.prototype = new n, t.aug(a.prototype, {
                parameters: function () {
                    var e = {
                        text: this.text,
                        url: this.url,
                        related: this.related,
                        lang: this.lang,
                        placeid: this.placeid,
                        original_referer: location.href,
                        id: this.id,
                        screen_name: this.screen_name,
                        hashtags: this.hashtags,
                        partner: this.partner,
                        dnt: this.dnt,
                        _: +(new Date)
                    };
                    return t.compact(e), r.encode(e)
                }
            }), e(a)
        })
    });
    provide("tfw/widget/tweetbutton", function (e) {
        using("tfw/widget/tweetbase", "util/util", "util/querystring", "util/uri", "util/twitter", "dom/textsize", function (t, n, r, i, s, o) {
            var u = document.title,
                a = encodeURI(location.href),
                f = ["vertical", "horizontal", "none"],
                l = function (e) {
                    t.apply(this, [e]);
                    var r = this.params(),
                        o = r.count || this.dataAttr("count"),
                        l = r.size || this.dataAttr("size"),
                        c = i.getScreenNameFromPage();
                    if (r.type == "hashtag" || ~n.indexOf(this.classAttr, "twitter-hashtag-button")) this.type = "hashtag";
                    else if (r.type == "mention" || ~n.indexOf(this.classAttr, "twitter-mention-button")) this.type = "mention";
                    this.counturl = r.counturl || this.dataAttr("counturl"), this.searchlink = r.searchlink || this.dataAttr("searchlink"), this.button_hashtag = s.hashTag(r.button_hashtag || r.hashtag || this.dataAttr("button-hashtag"), !1), this.size = l == "large" ? "l" : "m", this.type ? (this.count = "none", c && (this.related = this.related ? c + "," + this.related : c)) : (this.text = this.text || u, this.url = this.url || i.getCanonicalURL() || a, this.count = ~n.indexOf(f, o) ? o : "horizontal", this.count = this.count == "vertical" && this.size == "l" ? "none" : this.count, this.via = this.via || c)
                };
            l.prototype = new t, n.aug(l.prototype, {
                parameters: function () {
                    var e = {
                        text: this.text,
                        url: this.url,
                        via: this.via,
                        related: this.related,
                        count: this.count,
                        lang: this.lang,
                        counturl: this.counturl,
                        searchlink: this.searchlink,
                        placeid: this.placeid,
                        original_referer: location.href,
                        id: this.id,
                        size: this.size,
                        type: this.type,
                        screen_name: this.screen_name,
                        button_hashtag: this.button_hashtag,
                        hashtags: this.hashtags,
                        align: this.align,
                        partner: this.partner,
                        dnt: this.dnt,
                        _: +(new Date)
                    };
                    return n.compact(e), r.encode(e)
                },
                height: function () {
                    return this.count == "vertical" ? 62 : this.size == "m" ? 20 : 28
                },
                width: function () {
                    var e = {
                        ver: 8,
                        cnt: 14,
                        btn: 24,
                        xlcnt: 18,
                        xlbtn: 38
                    }, t = this.count == "vertical",
                        r = this.type == "hashtag" && this.button_hashtag ? "Tweet %{hashtag}" : this.type == "mention" && this.screen_name ? "Tweet to %{name}" : "Tweet",
                        i = this._(r, {
                            name: "@" + this.screen_name,
                            hashtag: "#" + this.button_hashtag
                        }),
                        s = this._("K"),
                        u = this._("100K+"),
                        a = (t ? "8888" : "88888") + s,
                        f = 0,
                        l = 0,
                        c = 0,
                        h = 0,
                        p = this.styles.base,
                        d = p;
                    return~ n.indexOf(["ja", "ko"], this.lang) ? a += this._("10k unit") : a = a.length > u.length ? a : u, t ? (d = p.concat(this.styles.vbubble), h = e.ver, c = e.btn) : this.size == "l" ? (p = d = p.concat(this.styles.large), c = e.xlbtn, h = e.xlcnt) : (c = e.btn, h = e.cnt), this.count != "none" && (l = o(a, "", d).width + h), f = o(i, "", p.concat(this.styles.button)).width + c, t ? f > l ? f : l : this.calculatedWidth = f + l
                },
                render: function (e, t) {
                    var n = twttr.widgets.config.assetUrl() + "/widgets/tweet_button.1378768434.html#" + this.parameters();
                    this.count && this.classAttr.push("twitter-count-" + this.count), this.element = this.create(n, this.dimensions(), {
                        title: this._("Twitter Tweet Button")
                    }), t && t(this.element)
                }
            }), e(l)
        })
    });
    provide("tfw/widget/follow", function (e) {
        using("util/util", "tfw/widget/base", "util/querystring", "util/uri", "util/twitter", "dom/textsize", function (t, n, r, i, s, o) {
            function u(e) {
                if (!e) return;
                var t, r, i, o, u;
                n.apply(this, [e]), t = this.params(), r = t.size || this.dataAttr("size"), i = t.showScreenName || this.dataAttr("show-screen-name"), u = t.count || this.dataAttr("count"), this.classAttr.push("twitter-follow-button"), this.showScreenName = i != "false", this.showCount = t.showCount !== !1 && this.dataAttr("show-count") != "false", u == "none" && (this.showCount = !1), this.explicitWidth = t.width || this.dataAttr("width") || "", this.screenName = t.screen_name || t.screenName || s.screenName(this.attr("href")), this.preview = t.preview || this.dataAttr("preview") || "", this.align = t.align || this.dataAttr("align") || "", this.size = r == "large" ? "l" : "m"
            }
            u.prototype = new n, t.aug(u.prototype, {
                parameters: function () {
                    var e = {
                        screen_name: this.screenName,
                        lang: this.lang,
                        show_count: this.showCount,
                        show_screen_name: this.showScreenName,
                        align: this.align,
                        id: this.id,
                        preview: this.preview,
                        size: this.size,
                        partner: this.partner,
                        dnt: this.dnt,
                        _: +(new Date)
                    };
                    return t.compact(e), r.encode(e)
                },
                render: function (e, t) {
                    if (!this.screenName) return;
                    var n = twttr.widgets.config.assetUrl() + "/widgets/follow_button.1378768434.html#" + this.parameters();
                    this.element = this.create(n, this.dimensions(), {
                        title: this._("Twitter Follow Button")
                    }), t && t(this.element)
                },
                width: function () {
                    if (this.calculatedWidth) return this.calculatedWidth;
                    if (this.explicitWidth) return this.explicitWidth;
                    var e = {
                        cnt: 13,
                        btn: 24,
                        xlcnt: 22,
                        xlbtn: 38
                    }, n = this.showScreenName ? "Follow %{screen_name}" : "Follow",
                        r = this._(n, {
                            screen_name: "@" + this.screenName
                        }),
                        i = ~t.indexOf(["ja", "ko"], this.lang) ? this._("10k unit") : this._("M"),
                        s = this._("%{followers_count} followers", {
                            followers_count: "88888" + i
                        }),
                        u = 0,
                        a = 0,
                        f, l, c = this.styles.base;
                    return this.size == "l" ? (c = c.concat(this.styles.large), f = e.xlbtn, l = e.xlcnt) : (f = e.btn, l = e.cnt), this.showCount && (a = o(s, "", c).width + l), u = o(r, "", c.concat(this.styles.button)).width + f, this.calculatedWidth = u + a
                }
            }), e(u)
        })
    });
    ! function () {
        window.twttr = window.twttr || {}, twttr.host = twttr.host || "platform.twitter.com", using("util/domready", "util/env", function (e, t) {
            function n(e) {
                return (e || !/^http\:$/.test(window.location.protocol)) && !twttr.ignoreSSL ? "https" : "http"
            }
            if (t.ie6()) return;
            if (twttr.widgets && twttr.widgets.loaded) return twttr.widgets.load(), !1;
            if (twttr.init) return !1;
            twttr.init = !0, twttr._e = twttr._e || [], twttr.ready = twttr.ready || function (e) {
                twttr.widgets && twttr.widgets.loaded ? e(twttr) : twttr._e.push(e)
            }, using.path.length || (using.path = n() + "://" + twttr.host + "/js"), twttr.ignoreSSL = twttr.ignoreSSL || !1;
            var r = [];
            twttr.events = {
                bind: function (e, t) {
                    return r.push([e, t])
                }
            }, e(function () {
                using("tfw/widget/base", "tfw/widget/follow", "tfw/widget/tweetbutton", "tfw/widget/embed", "tfw/widget/timeline", "tfw/widget/intent", "tfw/util/article", "util/events", "util/util", function (e, t, i, s, o, u, a, f, l) {
                    function m(e) {
                        var t = twttr.host;
                        return n(e) == "https" && twttr.secureHost && (t = twttr.secureHost), n(e) + "://" + t
                    }

                    function g() {
                        using("tfw/hub/client", function (e) {
                            twttr.events.hub = e.init(p), e.init(p, !0)
                        })
                    }
                    var c, h, p = {
                            widgets: {
                                "a.twitter-share-button": i,
                                "a.twitter-mention-button": i,
                                "a.twitter-hashtag-button": i,
                                "a.twitter-follow-button": t,
                                "blockquote.twitter-tweet": s,
                                "a.twitter-timeline": o,
                                body: u
                            }
                        }, d = twttr.events && twttr.events.hub ? twttr.events : {}, v;
                    p.assetUrl = m, twttr.widgets = twttr.widgets || {}, l.aug(twttr.widgets, {
                        config: {
                            assetUrl: m
                        },
                        load: function (t) {
                            e.init(p), e.embed(t), twttr.widgets.loaded = !0
                        },
                        createShareButton: function (e, t, n, r) {
                            if (!e || !t) return n && n(!1);
                            r = l.aug({}, r || {}, {
                                url: e,
                                targetEl: t
                            }), (new i(r)).render(p, n)
                        },
                        createHashtagButton: function (e, t, n, r) {
                            if (!e || !t) return n && n(!1);
                            r = l.aug({}, r || {}, {
                                hashtag: e,
                                targetEl: t,
                                type: "hashtag"
                            }), (new i(r)).render(p, n)
                        },
                        createMentionButton: function (e, t, n, r) {
                            if (!e || !t) return n && n(!1);
                            r = l.aug({}, r || {}, {
                                screenName: e,
                                targetEl: t,
                                type: "mention"
                            }), (new i(r)).render(p, n)
                        },
                        createFollowButton: function (e, n, r, i) {
                            if (!e || !n) return r && r(!1);
                            i = l.aug({}, i || {}, {
                                screenName: e,
                                targetEl: n
                            }), (new t(i)).render(p, r)
                        },
                        createTweet: function (e, t, n, r) {
                            if (!e || !t) return n && n(!1);
                            r = l.aug({}, r || {}, {
                                tweetId: e,
                                targetEl: t
                            }), (new s(r)).render(p, n), s.fetchAndRender()
                        },
                        createTimeline: function (e, t, n, r) {
                            if (!e || !t) return n && n(!1);
                            r = l.aug({}, r || {}, {
                                widgetId: e,
                                targetEl: t
                            }), (new o(r)).render(p, n)
                        }
                    }), l.aug(twttr.events, d, f.Emitter), v = twttr.events.bind, twttr.events.bind = function (e, t) {
                        g(), this.bind = v, this.bind(e, t)
                    };
                    for (c = 0; h = r[c]; c++) twttr.events.bind(h[0], h[1]);
                    for (c = 0; h = twttr._e[c]; c++) h(twttr);
                    twttr.ready = function (e) {
                        e(twttr)
                    }, /twitter\.com(\:\d+)?$/.test(document.location.host) && (twttr.widgets.createTimelinePreview = function (e, t, n) {
                        if (!p || !t) return n && n(!1);
                        (new o({
                            previewParams: e,
                            targetEl: t,
                            linkColor: e.link_color,
                            theme: e.theme,
                            height: e.height
                        })).render(p, n)
                    }), twttr.widgets.createTweetEmbed = twttr.widgets.createTweet, twttr.widgets.load()
                })
            })
        })
    }()
});
