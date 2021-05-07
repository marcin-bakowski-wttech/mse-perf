/*! Picturefill - v2.3.1 - 2015-04-09
* http://scottjehl.github.io/picturefill
* Copyright (c) 2015 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT *//*!matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license*/
window.matchMedia || (window.matchMedia = function () {
    "use strict";
    var e = window.styleMedia || window.media;
    if (!e) {
        var t = document.createElement("style"), r = document.getElementsByTagName("script")[0], n = null;
        t.type = "text/css", t.id = "matchmediajs-test", r.parentNode.insertBefore(t, r), n = "getComputedStyle" in window && window.getComputedStyle(t, null) || t.currentStyle, e = {
            matchMedium: function (e) {
                var r = "@media " + e + "{ #matchmediajs-test { width: 1px; } }";
                return t.styleSheet ? t.styleSheet.cssText = r : t.textContent = r, "1px" === n.width
            }
        }
    }
    return function (t) {
        return {matches: e.matchMedium(t || "all"), media: t || "all"}
    }
}()), function (e, t, r) {
    "use strict";

    function n(t) {
        "object" == typeof module && "object" == typeof module.exports ? module.exports = t : "function" == typeof define && define.amd && define("picturefill", function () {
            return t
        }), "object" == typeof e && (e.picturefill = t)
    }

    function i(e) {
        for (var t, r, n, i, a, c = e || {}, l = 0, u = (t = c.elements || s.getAllElements()).length; l < u; l++) if (r = t[l], n = r.parentNode, i = void 0, a = void 0, "IMG" === r.nodeName.toUpperCase() && (r[s.ns] || (r[s.ns] = {}), c.reevaluate || !r[s.ns].evaluated)) {
            if (n && "PICTURE" === n.nodeName.toUpperCase()) {
                if (s.removeVideoShim(n), !1 === (i = s.getMatch(r, n))) continue
            } else i = void 0;
            (n && "PICTURE" === n.nodeName.toUpperCase() || !s.sizesSupported && r.srcset && o.test(r.srcset)) && s.dodgeSrcset(r), i ? (a = s.processSourceSet(i), s.applyBestCandidate(a, r)) : (a = s.processSourceSet(r), (void 0 === r.srcset || r[s.ns].srcset) && s.applyBestCandidate(a, r)), r[s.ns].evaluated = !0
        }
    }

    if (e.HTMLPictureElement) n(function () {
    }); else {
        t.createElement("picture");
        var s = e.picturefill || {}, o = /\s+\+?\d+(e\d+)?w/;
        s.ns = "picturefill", s.srcsetSupported = "srcset" in r, s.sizesSupported = "sizes" in r, s.curSrcSupported = "currentSrc" in r, s.trim = function (e) {
            return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
        }, s.makeUrl = function () {
            var e = t.createElement("a");
            return function (t) {
                return e.href = t, e.href
            }
        }(), s.restrictsMixedContent = function () {
            return "https:" === e.location.protocol
        }, s.matchesMedia = function (t) {
            return e.matchMedia && e.matchMedia(t).matches
        }, s.getDpr = function () {
            return e.devicePixelRatio || 1
        }, s.getWidthFromLength = function (e) {
            var r;
            if (!e || e.indexOf("%") > -1 != !1 || !(parseFloat(e) > 0 || e.indexOf("calc(") > -1)) return !1;
            e = e.replace("vw", "%"), s.lengthEl || (s.lengthEl = t.createElement("div"), s.lengthEl.style.cssText = "border:0;display:block;font-size:1em;left:0;margin:0;padding:0;position:absolute;visibility:hidden", s.lengthEl.className = "helper-from-picturefill-js"), s.lengthEl.style.width = "0px";
            try {
                s.lengthEl.style.width = e
            } catch (e) {
            }
            return t.body.appendChild(s.lengthEl), (r = s.lengthEl.offsetWidth) <= 0 && (r = !1), t.body.removeChild(s.lengthEl), r
        }, s.detectTypeSupport = function (t, r) {
            var n = new e.Image;
            return n.onerror = function () {
                s.types[t] = !1, i()
            }, n.onload = function () {
                s.types[t] = 1 === n.width, i()
            }, n.src = r, "pending"
        }, s.types = s.types || {}, s.initTypeDetects = function () {
            s.types["image/jpeg"] = !0, s.types["image/gif"] = !0, s.types["image/png"] = !0, s.types["image/svg+xml"] = t.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1"), s.types["image/webp"] = s.detectTypeSupport("image/webp", "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=")
        }, s.verifyTypeSupport = function (e) {
            var t = e.getAttribute("type");
            if (null === t || "" === t) return !0;
            var r = s.types[t];
            return "string" == typeof r && "pending" !== r ? (s.types[t] = s.detectTypeSupport(t, r), "pending") : "function" == typeof r ? (r(), "pending") : r
        }, s.parseSize = function (e) {
            var t = /(\([^)]+\))?\s*(.+)/g.exec(e);
            return {media: t && t[1], length: t && t[2]}
        }, s.findWidthFromSourceSize = function (r) {
            for (var n, i = s.trim(r).split(/\s*,\s*/), o = 0, a = i.length; o < a; o++) {
                var c = i[o], l = s.parseSize(c), u = l.length, d = l.media;
                if (u && ((!d || s.matchesMedia(d)) && (n = s.getWidthFromLength(u)))) break
            }
            return n || Math.max(e.innerWidth || 0, t.documentElement.clientWidth)
        }, s.parseSrcset = function (e) {
            for (var t = []; "" !== e;) {
                var r, n = (e = e.replace(/^\s+/g, "")).search(/\s/g), i = null;
                if (-1 !== n) {
                    if ("," !== (r = e.slice(0, n)).slice(-1) && "" !== r || (r = r.replace(/,+$/, ""), i = ""), e = e.slice(n + 1), null === i) {
                        var s = e.indexOf(",");
                        -1 !== s ? (i = e.slice(0, s), e = e.slice(s + 1)) : (i = e, e = "")
                    }
                } else r = e, e = "";
                (r || i) && t.push({url: r, descriptor: i})
            }
            return t
        }, s.parseDescriptor = function (e, t) {
            var r, n = t || "100vw", i = e && e.replace(/(^\s+|\s+$)/g, ""), o = s.findWidthFromSourceSize(n);
            if (i) for (var a = i.split(" "), c = a.length - 1; c >= 0; c--) {
                var l = a[c], u = l && l.slice(l.length - 1);
                if ("h" !== u && "w" !== u || s.sizesSupported) {
                    if ("x" === u) {
                        var d = l && parseFloat(l, 10);
                        r = d && !isNaN(d) ? d : 1
                    }
                } else r = parseFloat(parseInt(l, 10) / o)
            }
            return r || 1
        }, s.getCandidatesFromSourceSet = function (e, t) {
            for (var r = s.parseSrcset(e), n = [], i = 0, o = r.length; i < o; i++) {
                var a = r[i];
                n.push({url: a.url, resolution: s.parseDescriptor(a.descriptor, t)})
            }
            return n
        }, s.dodgeSrcset = function (e) {
            e.srcset && (e[s.ns].srcset = e.srcset, e.srcset = "", e.setAttribute("data-pfsrcset", e[s.ns].srcset))
        }, s.processSourceSet = function (e) {
            var t = e.getAttribute("srcset"), r = e.getAttribute("sizes"), n = [];
            return "IMG" === e.nodeName.toUpperCase() && e[s.ns] && e[s.ns].srcset && (t = e[s.ns].srcset), t && (n = s.getCandidatesFromSourceSet(t, r)), n
        }, s.backfaceVisibilityFix = function (e) {
            var t = e.style || {}, r = "webkitBackfaceVisibility" in t, n = t.zoom;
            r && (t.zoom = ".999", r = e.offsetWidth, t.zoom = n)
        }, s.setIntrinsicSize = function () {
            var r = {}, n = function (e, t, r) {
            };
            return function (i, o) {
                var a;
                i[s.ns] && !e.pfStopIntrinsicSize && (void 0 === i[s.ns].dims && (i[s.ns].dims = i.getAttribute("width") || i.getAttribute("height")), i[s.ns].dims || (o.url in r ? n(0, r[o.url], o.resolution) : ((a = t.createElement("img")).onload = function () {
                    if (r[o.url] = a.width, !r[o.url]) try {
                        t.body.appendChild(a), r[o.url] = a.width || a.offsetWidth, t.body.removeChild(a)
                    } catch (e) {
                    }
                    i.src === o.url && n(0, r[o.url], o.resolution), i = null, a.onload = null, a = null
                }, a.src = o.url)))
            }
        }(), s.applyBestCandidate = function (e, t) {
            var r, n, i;
            e.sort(s.ascendingSort), i = e[(n = e.length) - 1];
            for (var o = 0; o < n; o++) if ((r = e[o]).resolution >= s.getDpr()) {
                i = r;
                break
            }
            i && (i.url = s.makeUrl(i.url), t.src !== i.url && (s.restrictsMixedContent() && "http:" === i.url.substr(0, "http:".length).toLowerCase() ? void 0 !== window.console && console.warn("Blocked mixed content image " + i.url) : (t.src = i.url, s.curSrcSupported || (t.currentSrc = t.src), s.backfaceVisibilityFix(t))), s.setIntrinsicSize(t, i))
        }, s.ascendingSort = function (e, t) {
            return e.resolution - t.resolution
        }, s.removeVideoShim = function (e) {
            var t = e.getElementsByTagName("video");
            if (t.length) {
                for (var r = t[0], n = r.getElementsByTagName("source"); n.length;) e.insertBefore(n[0], r);
                r.parentNode.removeChild(r)
            }
        }, s.getAllElements = function () {
            for (var e = [], r = t.getElementsByTagName("img"), n = 0, i = r.length; n < i; n++) {
                var o = r[n];
                ("PICTURE" === o.parentNode.nodeName.toUpperCase() || null !== o.getAttribute("srcset") || o[s.ns] && null !== o[s.ns].srcset) && e.push(o)
            }
            return e
        }, s.getMatch = function (e, t) {
            for (var r, n = t.childNodes, i = 0, o = n.length; i < o; i++) {
                var a = n[i];
                if (1 === a.nodeType) {
                    if (a === e) return r;
                    if ("SOURCE" === a.nodeName.toUpperCase()) {
                        null !== a.getAttribute("src") && void 0 !== typeof console && console.warn("The `src` attribute is invalid on `picture` `source` element; instead, use `srcset`.");
                        var c = a.getAttribute("media");
                        if (a.getAttribute("srcset") && (!c || s.matchesMedia(c))) {
                            var l = s.verifyTypeSupport(a);
                            if (!0 === l) {
                                r = a;
                                break
                            }
                            if ("pending" === l) return !1
                        }
                    }
                }
            }
            return r
        }, function () {
            function r() {
                clearTimeout(n), n = setTimeout(a, 60)
            }

            s.initTypeDetects(), i();
            var n, o = setInterval(function () {
                i(), /^loaded|^i|^c/.test(t.readyState) && clearInterval(o)
            }, 250), a = function () {
                i({reevaluate: !0})
            };
            e.addEventListener ? e.addEventListener("resize", r, !1) : e.attachEvent && e.attachEvent("onresize", r)
        }(), i._ = s, n(i)
    }
}(window, window.document, new window.Image);