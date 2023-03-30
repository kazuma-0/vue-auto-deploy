!function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).neo4j = t()
}(this, function () {
    "use strict";
    var r = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

    function U(e) {
        return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
    }

    var D, L, B = {}, F = {}, e = {}, t = {}, n = r && r.__extends || (D = function (e, t) {
            return (D = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
            })(e, t)
        }, function (e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

            function r() {
                this.constructor = e
            }

            D(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
        }),
        W = (Object.defineProperty(t, "__esModule", {value: !0}), t.PROTOCOL_ERROR = t.SESSION_EXPIRED = t.SERVICE_UNAVAILABLE = t.Neo4jError = t.isRetriableError = t.newError = void 0, "ServiceUnavailable"),
        z = (t.SERVICE_UNAVAILABLE = W, "SessionExpired"),
        q = (t.SESSION_EXPIRED = z, t.PROTOCOL_ERROR = "ProtocolError", L = Error, n(V, L), V.isRetriable = function (e) {
            return null != e && e instanceof V && e.retriable
        }, V);

    function V(e, t, r) {
        e = L.call(this, e, null != r ? {cause: r} : void 0) || this;
        return e.constructor = V, e.__proto__ = V.prototype, e.code = t, e.name = "Neo4jError", e.retriable = (r = t) === W || r === z || "Neo.ClientError.Security.AuthorizationExpired" === r || function (e) {
            return !0 === (null == e ? void 0 : e.includes("TransientError"))
        }(r), e
    }

    t.Neo4jError = q, t.newError = function (e, t, r) {
        return new q(e, null != t ? t : "N/A", r)
    };
    n = q.isRetriable;
    t.isRetriableError = n;
    var n = {},
        H = (Object.defineProperty(n, "__esModule", {value: !0}), n.toString = n.toNumber = n.inSafeRange = n.isInt = n.int = void 0, t),
        Y = new Map, o = (d.prototype.inSafeRange = function () {
            return this.greaterThanOrEqual(d.MIN_SAFE_VALUE) && this.lessThanOrEqual(d.MAX_SAFE_VALUE)
        }, d.prototype.toInt = function () {
            return this.low
        }, d.prototype.toNumber = function () {
            return this.high * K + (this.low >>> 0)
        }, d.prototype.toBigInt = function () {
            var e;
            return this.isZero() ? BigInt(0) : this.isPositive() ? BigInt(this.high >>> 0) * BigInt(K) + BigInt(this.low >>> 0) : (e = this.negate(), BigInt(-1) * (BigInt(e.high >>> 0) * BigInt(K) + BigInt(e.low >>> 0)))
        }, d.prototype.toNumberOrInfinity = function () {
            return this.lessThan(d.MIN_SAFE_VALUE) ? Number.NEGATIVE_INFINITY : this.greaterThan(d.MAX_SAFE_VALUE) ? Number.POSITIVE_INFINITY : this.toNumber()
        }, d.prototype.toString = function (e) {
            if ((e = null != e ? e : 10) < 2 || 36 < e) throw RangeError("radix out of range: " + e.toString());
            if (this.isZero()) return "0";
            var t, r, n;
            if (this.isNegative()) return this.equals(d.MIN_VALUE) ? (t = d.fromNumber(e), n = (r = this.div(t)).multiply(t).subtract(this), r.toString(e) + n.toInt().toString(e)) : "-" + this.negate().toString(e);
            for (var o = d.fromNumber(Math.pow(e, 6)), i = (n = this, ""); ;) {
                var u = n.div(o), a = (n.subtract(u.multiply(o)).toInt() >>> 0).toString(e);
                if ((n = u).isZero()) return a + i;
                for (; a.length < 6;) a = "0" + a;
                i = "" + a + i
            }
        }, d.prototype.valueOf = function () {
            return this.toBigInt()
        }, d.prototype.getHighBits = function () {
            return this.high
        }, d.prototype.getLowBits = function () {
            return this.low
        }, d.prototype.getNumBitsAbs = function () {
            if (this.isNegative()) return this.equals(d.MIN_VALUE) ? 64 : this.negate().getNumBitsAbs();
            for (var e = 0 !== this.high ? this.high : this.low, t = 0, t = 31; 0 < t && 0 == (e & 1 << t); t--) ;
            return 0 !== this.high ? t + 33 : t + 1
        }, d.prototype.isZero = function () {
            return 0 === this.high && 0 === this.low
        }, d.prototype.isNegative = function () {
            return this.high < 0
        }, d.prototype.isPositive = function () {
            return 0 <= this.high
        }, d.prototype.isOdd = function () {
            return 1 == (1 & this.low)
        }, d.prototype.isEven = function () {
            return 0 == (1 & this.low)
        }, d.prototype.equals = function (e) {
            e = d.fromValue(e);
            return this.high === e.high && this.low === e.low
        }, d.prototype.notEquals = function (e) {
            return !this.equals(e)
        }, d.prototype.lessThan = function (e) {
            return this.compare(e) < 0
        }, d.prototype.lessThanOrEqual = function (e) {
            return this.compare(e) <= 0
        }, d.prototype.greaterThan = function (e) {
            return 0 < this.compare(e)
        }, d.prototype.greaterThanOrEqual = function (e) {
            return 0 <= this.compare(e)
        }, d.prototype.compare = function (e) {
            e = d.fromValue(e);
            if (this.equals(e)) return 0;
            var t = this.isNegative(), r = e.isNegative();
            return t && !r || (t || !r) && this.subtract(e).isNegative() ? -1 : 1
        }, d.prototype.negate = function () {
            return this.equals(d.MIN_VALUE) ? d.MIN_VALUE : this.not().add(d.ONE)
        }, d.prototype.add = function (e) {
            var e = d.fromValue(e), t = this.high >>> 16, r = 65535 & this.high, n = this.low >>> 16, o = 65535 & this.low,
                i = e.high >>> 16, u = 65535 & e.high, a = e.low >>> 16, s = 0, c = 0, l = 0, f = 0;
            return c += (l = l + ((f += o + (65535 & e.low)) >>> 16) + (n + a)) >>> 16, d.fromBits((l &= 65535) << 16 | (f &= 65535), ((s += (c += r + u) >>> 16) + (t + i) & 65535) << 16 | (c &= 65535))
        }, d.prototype.subtract = function (e) {
            e = d.fromValue(e);
            return this.add(e.negate())
        }, d.prototype.multiply = function (e) {
            if (this.isZero()) return d.ZERO;
            e = d.fromValue(e);
            if (e.isZero()) return d.ZERO;
            if (this.equals(d.MIN_VALUE)) return e.isOdd() ? d.MIN_VALUE : d.ZERO;
            if (e.equals(d.MIN_VALUE)) return this.isOdd() ? d.MIN_VALUE : d.ZERO;
            if (this.isNegative()) return e.isNegative() ? this.negate().multiply(e.negate()) : this.negate().multiply(e).negate();
            if (e.isNegative()) return this.multiply(e.negate()).negate();
            if (this.lessThan(Z) && e.lessThan(Z)) return d.fromNumber(this.toNumber() * e.toNumber());
            var t = this.high >>> 16, r = 65535 & this.high, n = this.low >>> 16, o = 65535 & this.low, i = e.high >>> 16,
                u = 65535 & e.high, a = e.low >>> 16, e = 65535 & e.low, s = 0, c = 0, l = 0,
                f = (f = 0) + ((c = c + ((l += o * e) >>> 16) + n * e) >>> 16) + ((c = (c & 65535) + o * a) >>> 16);
            return d.fromBits((c &= 65535) << 16 | (l &= 65535), ((s += (f += r * e) >>> 16) + ((f = (f & 65535) + n * a) >>> 16) + ((f = (f & 65535) + o * u) >>> 16) + (t * e + r * a + n * u + o * i) & 65535) << 16 | (f &= 65535))
        }, d.prototype.div = function (e) {
            var t, r, n, o = d.fromValue(e);
            if (o.isZero()) throw(0, H.newError)("division by zero");
            if (this.isZero()) return d.ZERO;
            {
                if (this.equals(d.MIN_VALUE)) return o.equals(d.ONE) || o.equals(d.NEG_ONE) ? d.MIN_VALUE : o.equals(d.MIN_VALUE) ? d.ONE : (n = this.shiftRight(1).div(o).shiftLeft(1)).equals(d.ZERO) ? o.isNegative() ? d.ONE : d.NEG_ONE : (t = this.subtract(o.multiply(n)), n.add(t.div(o)));
                if (o.equals(d.MIN_VALUE)) return d.ZERO
            }
            if (this.isNegative()) return o.isNegative() ? this.negate().div(o.negate()) : this.negate().div(o).negate();
            if (o.isNegative()) return this.div(o.negate()).negate();
            for (r = d.ZERO, t = this; t.greaterThanOrEqual(o);) {
                n = Math.max(1, Math.floor(t.toNumber() / o.toNumber()));
                for (var i = Math.ceil(Math.log(n) / Math.LN2), u = i <= 48 ? 1 : Math.pow(2, i - 48), a = d.fromNumber(n), s = a.multiply(o); s.isNegative() || s.greaterThan(t);) s = (a = d.fromNumber(n -= u)).multiply(o);
                a.isZero() && (a = d.ONE), r = r.add(a), t = t.subtract(s)
            }
            return r
        }, d.prototype.modulo = function (e) {
            e = d.fromValue(e);
            return this.subtract(this.div(e).multiply(e))
        }, d.prototype.not = function () {
            return d.fromBits(~this.low, ~this.high)
        }, d.prototype.and = function (e) {
            e = d.fromValue(e);
            return d.fromBits(this.low & e.low, this.high & e.high)
        }, d.prototype.or = function (e) {
            e = d.fromValue(e);
            return d.fromBits(this.low | e.low, this.high | e.high)
        }, d.prototype.xor = function (e) {
            e = d.fromValue(e);
            return d.fromBits(this.low ^ e.low, this.high ^ e.high)
        }, d.prototype.shiftLeft = function (e) {
            e = d.toNumber(e);
            return 0 == (e &= 63) ? d.ZERO : e < 32 ? d.fromBits(this.low << e, this.high << e | this.low >>> 32 - e) : d.fromBits(0, this.low << e - 32)
        }, d.prototype.shiftRight = function (e) {
            var t = d.toNumber(e);
            return 0 == (t &= 63) ? d.ZERO : e < 32 ? d.fromBits(this.low >>> t | this.high << 32 - t, this.high >> t) : d.fromBits(this.high >> t - 32, 0 <= this.high ? 0 : -1)
        }, d.isInteger = function (e) {
            return !0 === (null == e ? void 0 : e.__isInteger__)
        }, d.fromInt = function (e) {
            if (-128 <= (e |= 0) && e < 128 && null != (t = Y.get(e))) return t;
            var t = new d(e, e < 0 ? -1 : 0);
            return -128 <= e && e < 128 && Y.set(e, t), t
        }, d.fromBits = function (e, t) {
            return new d(e, t)
        }, d.fromNumber = function (e) {
            return isNaN(e) || !isFinite(e) ? d.ZERO : e <= -G ? d.MIN_VALUE : G <= e + 1 ? d.MAX_VALUE : e < 0 ? d.fromNumber(-e).negate() : new d(e % K | 0, e / K | 0)
        }, d.fromString = function (e, t, r) {
            var n = (void 0 === r ? {} : r).strictStringValidation;
            if (0 === e.length) throw(0, H.newError)("number format error: empty string");
            if ("NaN" === e || "Infinity" === e || "+Infinity" === e || "-Infinity" === e) return d.ZERO;
            if ((t = null != t ? t : 10) < 2 || 36 < t) throw(0, H.newError)("radix out of range: " + t.toString());
            if (0 < (r = e.indexOf("-"))) throw(0, H.newError)('number format error: interior "-" character: ' + e);
            if (0 === r) return d.fromString(e.substring(1), t).negate();
            for (var o, i, u = d.fromNumber(Math.pow(t, 8)), a = d.ZERO, s = 0; s < e.length; s += 8) {
                var c, l = Math.min(8, e.length - s), f = e.substring(s, s + l), p = parseInt(f, t);
                if (!0 === n && (o = f, c = p, i = t, Number.isNaN(o) || Number.isNaN(c) || function (e, t, r) {
                    e = e.toString(t), t = Math.max(r - e.length, 0), r = "0".repeat(t);
                    return "".concat(r).concat(e)
                }(c, i, o.length) !== o.toLowerCase())) throw(0, H.newError)('number format error: "'.concat(f, '" is NaN in radix ').concat(t, ": ").concat(e));
                a = l < 8 ? (c = d.fromNumber(Math.pow(t, l)), a.multiply(c).add(d.fromNumber(p))) : (a = a.multiply(u)).add(d.fromNumber(p))
            }
            return a
        }, d.fromValue = function (e, t) {
            return void 0 === t && (t = {}), e instanceof d ? e : "number" == typeof e ? d.fromNumber(e) : "string" == typeof e ? d.fromString(e, void 0, t) : "bigint" == typeof e ? d.fromString(e.toString()) : new d(e.low, e.high)
        }, d.toNumber = function (e) {
            switch (typeof e) {
                case"number":
                    return e;
                case"bigint":
                    return Number(e);
                default:
                    return d.fromValue(e).toNumber()
            }
        }, d.toString = function (e, t) {
            return d.fromValue(e).toString(t)
        }, d.inSafeRange = function (e) {
            return d.fromValue(e).inSafeRange()
        }, d.ZERO = d.fromInt(0), d.ONE = d.fromInt(1), d.NEG_ONE = d.fromInt(-1), d.MAX_VALUE = d.fromBits(-1, 2147483647), d.MIN_VALUE = d.fromBits(0, -2147483648), d.MIN_SAFE_VALUE = d.fromBits(1, -2097152), d.MAX_SAFE_VALUE = d.fromBits(-1, 2097151), d.__isInteger__ = !0, d);

    function d(e, t) {
        this.low = null != e ? e : 0, this.high = null != t ? t : 0
    }

    Object.defineProperty(o.prototype, "__isInteger__", {value: !0, enumerable: !1, configurable: !1});
    var K = 4294967296, G = K * K / 2, Z = o.fromInt(1 << 24), i = o.fromValue, i = (n.int = i, o.isInteger),
        i = (n.isInt = i, o.inSafeRange), i = (n.inSafeRange = i, o.toNumber), i = (n.toNumber = i, o.toString),
        i = (n.toString = i, n.default = o, {}), o = {}, u = {}, a = {}, s = {},
        Q = (Object.defineProperty(s, "__esModule", {value: !0}), s.getBrokenObjectReason = s.isBrokenObject = s.createBrokenObject = void 0, "__isBrokenObject__"),
        X = "__reason__";
    s.createBrokenObject = function (r, e) {
        function n() {
            throw r
        }

        return void 0 === e && (e = {}), new Proxy(e, {
            get: function (e, t) {
                return t === Q || (t === X ? r : void ("toJSON" !== t && n()))
            },
            set: n,
            apply: n,
            construct: n,
            defineProperty: n,
            deleteProperty: n,
            getOwnPropertyDescriptor: n,
            getPrototypeOf: n,
            has: n,
            isExtensible: n,
            ownKeys: n,
            preventExtensions: n,
            setPrototypeOf: n
        })
    }, s.isBrokenObject = function (e) {
        return null !== e && "object" == typeof e && !0 === e[Q]
    }, s.getBrokenObjectReason = function (e) {
        return e[X]
    }, Object.defineProperty(a, "__esModule", {value: !0}), a.stringify = void 0;
    var J = s;
    a.stringify = function (e) {
        return JSON.stringify(e, function (e, t) {
            return (0, J.isBrokenObject)(t) ? {
                __isBrokenObject__: !0,
                __reason__: (0, J.getBrokenObjectReason)(t)
            } : "bigint" == typeof t ? "".concat(t, "n") : t
        })
    }, Object.defineProperty(u, "__esModule", {value: !0}), u.ENCRYPTION_OFF = u.ENCRYPTION_ON = u.validateQueryAndParameters = u.assertValidDate = u.assertNumberOrInteger = u.assertNumber = u.assertString = u.assertObject = u.isString = u.isObject = u.isEmptyObjectOrNull = void 0;
    var c, $, ee, te, re, ne, oe = n, ie = a;
    u.ENCRYPTION_ON = "ENCRYPTION_ON";

    function ue(e) {
        return "object" == typeof e && !Array.isArray(e) && null !== e
    }

    function ae(e, t) {
        if (se(e)) return e;
        throw new TypeError((0, ie.stringify)(t) + " expected to be string but was: " + (0, ie.stringify)(e))
    }

    function se(e) {
        return "[object String]" === Object.prototype.toString.call(e)
    }

    function ce(e, t) {
        this._minNumber = e, this._maxNumber = t, this._minInteger = (0, te.int)(e), this._maxInteger = (0, te.int)(t)
    }

    function le(e, t, r) {
        e = (0, te.int)(e), t = (0, te.int)(t), r = (0, te.int)(r);
        var n = e.multiply(365);
        return n = (n = (n = e.greaterThanOrEqual(0) ? n.add(e.add(3).div(4).subtract(e.add(99).div(100)).add(e.add(399).div(400))) : n.subtract(e.div(-4).subtract(e.div(-100)).add(e.div(-400)))).add(t.multiply(367).subtract(362).div(12))).add(r.subtract(1)), t.greaterThan(2) && (n = n.subtract(1), function (e) {
            if ((e = (0, te.int)(e)).modulo(4).equals(0)) return !e.modulo(100).equals(0) || !!e.modulo(400).equals(0)
        }(e) || (n = n.subtract(1))), n.subtract(c.DAYS_0000_TO_1970)
    }

    function fe(e, t, r) {
        if ((0, ne.assertNumberOrInteger)(e, r), t.contains(e)) return e;
        throw(0, re.newError)("".concat(r, " is expected to be in range ").concat(t.toString(), " but was: ").concat(e.toString()))
    }

    function pe(e, t) {
        e = (0, te.int)(e), t = (0, te.int)(t);
        var r = e.div(t);
        return r = e.isPositive() !== t.isPositive() && r.multiply(t).notEquals(e) ? r.subtract(1) : r
    }

    function de(e, t) {
        return e = (0, te.int)(e), t = (0, te.int)(t), e.subtract(pe(e, t).multiply(t))
    }

    function he(e) {
        return (e = (0, te.int)(e)).equals(0) ? "" : "." + be(e, 9)
    }

    function be(e, t, r) {
        var n = (e = (0, te.int)(e)).isNegative(), o = (e = n ? e.negate() : e).toString();
        if (null != t) for (; o.length < t;) o = "0" + o;
        return n ? "-" + o : !0 === (null == r ? void 0 : r.usePositiveSign) ? "+" + o : o
    }

    u.ENCRYPTION_OFF = "ENCRYPTION_OFF", u.isEmptyObjectOrNull = function (e) {
        if (null === e) return !0;
        if (!ue(e)) return !1;
        for (var t in e) if (void 0 !== e[t]) return !1;
        return !0
    }, u.isObject = ue, u.validateQueryAndParameters = function (e, t, r) {
        var n = "", t = null != t ? t : {}, r = null != (r = null == r ? void 0 : r.skipAsserts) && r;
        if ("string" == typeof e ? n = e : e instanceof String ? n = e.toString() : "object" == typeof e && null != e.text && (n = e.text, t = null != (e = e.parameters) ? e : {}), !r) {
            e = n;
            if (ae(e, "Cypher query"), 0 === e.trim().length) throw new TypeError("Cypher query is expected to be a non-empty string.");
            r = t;
            if (!ue(r)) throw e = null != r.constructor ? " " + r.constructor.name : "", new TypeError("Query parameters are expected to either be undefined/null or an object, given:".concat(e, " ").concat(JSON.stringify(r)))
        }
        return {validatedQuery: n, params: t}
    }, u.assertObject = function (e, t) {
        if (ue(e)) return e;
        throw new TypeError(t + " expected to be an object but was: " + (0, ie.stringify)(e))
    }, u.assertString = ae, u.assertNumber = function (e, t) {
        if ("number" != typeof e) throw new TypeError(t + " expected to be a number but was: " + (0, ie.stringify)(e));
        return e
    }, u.assertNumberOrInteger = function (e, t) {
        if ("number" == typeof e || "bigint" == typeof e || (0, oe.isInt)(e)) return e;
        throw new TypeError(t + " expected to be either a number or an Integer object but was: " + (0, ie.stringify)(e))
    }, u.assertValidDate = function (e, t) {
        if ("[object Date]" !== Object.prototype.toString.call(e)) throw new TypeError(t + " expected to be a standard JavaScript Date but was: " + (0, ie.stringify)(e));
        if (Number.isNaN(e.getTime())) throw new TypeError(t + " expected to be valid JavaScript Date but its time was NaN: " + (0, ie.stringify)(e));
        return e
    }, u.isString = se, c = o, $ = r && r.__createBinding || (Object.create ? function (e, t, r, n) {
        void 0 === n && (n = r);
        var o = Object.getOwnPropertyDescriptor(t, r);
        o && ("get" in o ? t.__esModule : !o.writable && !o.configurable) || (o = {
            enumerable: !0, get: function () {
                return t[r]
            }
        }), Object.defineProperty(e, n, o)
    } : function (e, t, r, n) {
        e[n = void 0 === n ? r : n] = t[r]
    }), ee = r && r.__setModuleDefault || (Object.create ? function (e, t) {
        Object.defineProperty(e, "default", {enumerable: !0, value: t})
    } : function (e, t) {
        e.default = t
    }), l = r && r.__importStar || function (e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) "default" !== r && Object.prototype.hasOwnProperty.call(e, r) && $(t, e, r);
        return ee(t, e), t
    }, Object.defineProperty(c, "__esModule", {value: !0}), c.floorMod = c.floorDiv = c.assertValidZoneId = c.assertValidNanosecond = c.assertValidSecond = c.assertValidMinute = c.assertValidHour = c.assertValidDay = c.assertValidMonth = c.assertValidYear = c.timeZoneOffsetInSeconds = c.totalNanoseconds = c.newDate = c.toStandardDate = c.isoStringToStandardDate = c.dateToIsoString = c.timeZoneOffsetToIsoString = c.timeToIsoString = c.durationToIsoString = c.dateToEpochDay = c.localDateTimeToEpochSecond = c.localTimeToNanoOfDay = c.normalizeNanosecondsForDuration = c.normalizeSecondsForDuration = c.SECONDS_PER_DAY = c.DAYS_PER_400_YEAR_CYCLE = c.DAYS_0000_TO_1970 = c.NANOS_PER_HOUR = c.NANOS_PER_MINUTE = c.NANOS_PER_MILLISECOND = c.NANOS_PER_SECOND = c.SECONDS_PER_HOUR = c.SECONDS_PER_MINUTE = c.MINUTES_PER_HOUR = c.NANOSECOND_OF_SECOND_RANGE = c.SECOND_OF_MINUTE_RANGE = c.MINUTE_OF_HOUR_RANGE = c.HOUR_OF_DAY_RANGE = c.DAY_OF_MONTH_RANGE = c.MONTH_OF_YEAR_RANGE = c.YEAR_RANGE = void 0, te = l(n), re = t, ne = u, ce.prototype.contains = function (e) {
        var t;
        return (0, te.isInt)(e) && e instanceof te.default ? e.greaterThanOrEqual(this._minInteger) && e.lessThanOrEqual(this._maxInteger) : "bigint" == typeof e ? (t = (0, te.int)(e)).greaterThanOrEqual(this._minInteger) && t.lessThanOrEqual(this._maxInteger) : e >= this._minNumber && e <= this._maxNumber
    }, ce.prototype.toString = function () {
        return "[".concat(this._minNumber, ", ").concat(this._maxNumber, "]")
    }, l = ce, c.YEAR_RANGE = new l(-999999999, 999999999), c.MONTH_OF_YEAR_RANGE = new l(1, 12), c.DAY_OF_MONTH_RANGE = new l(1, 31), c.HOUR_OF_DAY_RANGE = new l(0, 23), c.MINUTE_OF_HOUR_RANGE = new l(0, 59), c.SECOND_OF_MINUTE_RANGE = new l(0, 59), c.NANOSECOND_OF_SECOND_RANGE = new l(0, 999999999), c.MINUTES_PER_HOUR = 60, c.SECONDS_PER_MINUTE = 60, c.SECONDS_PER_HOUR = c.SECONDS_PER_MINUTE * c.MINUTES_PER_HOUR, c.NANOS_PER_SECOND = 1e9, c.NANOS_PER_MILLISECOND = 1e6, c.NANOS_PER_MINUTE = c.NANOS_PER_SECOND * c.SECONDS_PER_MINUTE, c.NANOS_PER_HOUR = c.NANOS_PER_MINUTE * c.MINUTES_PER_HOUR, c.DAYS_0000_TO_1970 = 719528, c.DAYS_PER_400_YEAR_CYCLE = 146097, c.SECONDS_PER_DAY = 86400, c.normalizeSecondsForDuration = function (e, t) {
        return (0, te.int)(e).add(pe(t, c.NANOS_PER_SECOND))
    }, c.normalizeNanosecondsForDuration = function (e) {
        return de(e, c.NANOS_PER_SECOND)
    }, c.localTimeToNanoOfDay = function (e, t, r, n) {
        return e = (0, te.int)(e), t = (0, te.int)(t), r = (0, te.int)(r), n = (0, te.int)(n), (e = (e = (e = e.multiply(c.NANOS_PER_HOUR)).add(t.multiply(c.NANOS_PER_MINUTE))).add(r.multiply(c.NANOS_PER_SECOND))).add(n)
    }, c.localDateTimeToEpochSecond = function (e, t, r, n, o, i, u) {
        return e = le(e, t, r), t = function (e, t, r) {
            e = (0, te.int)(e), t = (0, te.int)(t), r = (0, te.int)(r);
            e = e.multiply(c.SECONDS_PER_HOUR);
            return (e = e.add(t.multiply(c.SECONDS_PER_MINUTE))).add(r)
        }(n, o, i), e.multiply(c.SECONDS_PER_DAY).add(t)
    }, c.dateToEpochDay = le, c.durationToIsoString = function (e, t, r, n) {
        return e = be(e), t = be(t), r = function (e, t) {
            e = (0, te.int)(e), t = (0, te.int)(t);
            var r, n = e.isNegative(), o = t.greaterThan(0);
            e = n && o ? e.equals(-1) ? "-0" : e.add(1).toString() : e.toString();
            o && (r = he((n ? t.negate().add(2 * c.NANOS_PER_SECOND) : t.add(c.NANOS_PER_SECOND)).modulo(c.NANOS_PER_SECOND)));
            return null != r ? e + r : e
        }(r, n), "P".concat(e, "M").concat(t, "DT").concat(r, "S")
    }, c.timeToIsoString = function (e, t, r, n) {
        return e = be(e, 2), t = be(t, 2), r = be(r, 2), n = he(n), "".concat(e, ":").concat(t, ":").concat(r).concat(n)
    }, c.timeZoneOffsetToIsoString = function (e) {
        if ((e = (0, te.int)(e)).equals(0)) return "Z";
        var t = (r = e.isNegative()) ? "-" : "+", r = be((e = r ? e.multiply(-1) : e).div(c.SECONDS_PER_HOUR), 2),
            n = be(e.div(c.SECONDS_PER_MINUTE).modulo(c.MINUTES_PER_HOUR), 2);
        return null != (e = (e = e.modulo(c.SECONDS_PER_MINUTE)).equals(0) ? null : be(e, 2)) ? "".concat(t).concat(r, ":").concat(n, ":").concat(e) : "".concat(t).concat(r, ":").concat(n)
    }, c.dateToIsoString = function (e, t, r) {
        return e = function (e) {
            e = (0, te.int)(e);
            if (e.isNegative() || e.greaterThan(9999)) return be(e, 6, {usePositiveSign: !0});
            return be(e, 4)
        }(e), t = be(t, 2), r = be(r, 2), "".concat(e, "-").concat(t, "-").concat(r)
    }, c.isoStringToStandardDate = function (e) {
        return new Date(e)
    }, c.toStandardDate = function (e) {
        return new Date(e)
    }, c.newDate = function (e) {
        return new Date(e)
    }, c.totalNanoseconds = function (e, t) {
        return t = null != t ? t : 0, e = e.getMilliseconds() * c.NANOS_PER_MILLISECOND, t instanceof te.default ? t.add(e) : "bigint" == typeof t ? t + BigInt(e) : t + e
    }, c.timeZoneOffsetInSeconds = function (e) {
        var t = e.getSeconds() >= e.getUTCSeconds() ? e.getSeconds() - e.getUTCSeconds() : e.getSeconds() - e.getUTCSeconds() + 60;
        return 0 === (e = e.getTimezoneOffset()) ? 0 + t : -1 * e * c.SECONDS_PER_MINUTE + t
    }, c.assertValidYear = function (e) {
        return fe(e, c.YEAR_RANGE, "Year")
    }, c.assertValidMonth = function (e) {
        return fe(e, c.MONTH_OF_YEAR_RANGE, "Month")
    }, c.assertValidDay = function (e) {
        return fe(e, c.DAY_OF_MONTH_RANGE, "Day")
    }, c.assertValidHour = function (e) {
        return fe(e, c.HOUR_OF_DAY_RANGE, "Hour")
    }, c.assertValidMinute = function (e) {
        return fe(e, c.MINUTE_OF_HOUR_RANGE, "Minute")
    }, c.assertValidSecond = function (e) {
        return fe(e, c.SECOND_OF_MINUTE_RANGE, "Second")
    }, c.assertValidNanosecond = function (e) {
        return fe(e, c.NANOSECOND_OF_SECOND_RANGE, "Nanosecond")
    }, c.assertValidZoneId = function (t, r) {
        try {
            Intl.DateTimeFormat(void 0, {timeZone: r})
        } catch (e) {
            throw(0, re.newError)("".concat(t, ' is expected to be a valid ZoneId but was: "').concat(r, '"'))
        }
    }, c.floorDiv = pe, c.floorMod = de;
    var ye = r && r.__createBinding || (Object.create ? function (e, t, r, n) {
            void 0 === n && (n = r);
            var o = Object.getOwnPropertyDescriptor(t, r);
            o && ("get" in o ? t.__esModule : !o.writable && !o.configurable) || (o = {
                enumerable: !0, get: function () {
                    return t[r]
                }
            }), Object.defineProperty(e, n, o)
        } : function (e, t, r, n) {
            e[n = void 0 === n ? r : n] = t[r]
        }), _e = r && r.__setModuleDefault || (Object.create ? function (e, t) {
            Object.defineProperty(e, "default", {enumerable: !0, value: t})
        } : function (e, t) {
            e.default = t
        }), l = r && r.__importStar || function (e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e) for (var r in e) "default" !== r && Object.prototype.hasOwnProperty.call(e, r) && ye(t, e, r);
            return _e(t, e), t
        }, ve = r && r.__read || function (e, t) {
            var r = "function" == typeof Symbol && e[Symbol.iterator];
            if (!r) return e;
            var n, o, i = r.call(e), u = [];
            try {
                for (; (void 0 === t || 0 < t--) && !(n = i.next()).done;) u.push(n.value)
            } catch (e) {
                o = {error: e}
            } finally {
                try {
                    n && !n.done && (r = i.return) && r.call(i)
                } finally {
                    if (o) throw o.error
                }
            }
            return u
        },
        f = (Object.defineProperty(i, "__esModule", {value: !0}), i.isDateTime = i.DateTime = i.isLocalDateTime = i.LocalDateTime = i.isDate = i.Date = i.isTime = i.Time = i.isLocalTime = i.LocalTime = i.isDuration = i.Duration = void 0, l(o)),
        me = u, ge = t, Oe = l(n), l = {value: !0, enumerable: !1, configurable: !1, writable: !1},
        we = "__isDuration__", Ee = "__isLocalTime__", Pe = "__isTime__", Se = "__isDate__", Te = "__isLocalDateTime__",
        je = "__isDateTime__", p = (Ce.prototype.toString = function () {
            return f.durationToIsoString(this.months, this.days, this.seconds, this.nanoseconds)
        }, Ce);

    function Ce(e, t, r, n) {
        this.months = (0, me.assertNumberOrInteger)(e, "Months"), this.days = (0, me.assertNumberOrInteger)(t, "Days"), (0, me.assertNumberOrInteger)(r, "Seconds"), (0, me.assertNumberOrInteger)(n, "Nanoseconds"), this.seconds = f.normalizeSecondsForDuration(r, n), this.nanoseconds = f.normalizeNanosecondsForDuration(n), Object.freeze(this)
    }

    i.Duration = p, Object.defineProperty(p.prototype, we, l), i.isDuration = function (e) {
        return xe(e, we)
    };
    Ie.fromStandardDate = function (e, t) {
        Ue(e, t);
        t = f.totalNanoseconds(e, t);
        return new Ie(e.getHours(), e.getMinutes(), e.getSeconds(), t instanceof Oe.default ? t.toInt() : "bigint" == typeof t ? (0, Oe.int)(t).toInt() : t)
    }, Ie.prototype.toString = function () {
        return f.timeToIsoString(this.hour, this.minute, this.second, this.nanosecond)
    };
    p = Ie;

    function Ie(e, t, r, n) {
        this.hour = f.assertValidHour(e), this.minute = f.assertValidMinute(t), this.second = f.assertValidSecond(r), this.nanosecond = f.assertValidNanosecond(n), Object.freeze(this)
    }

    i.LocalTime = p, Object.defineProperty(p.prototype, Ee, l), i.isLocalTime = function (e) {
        return xe(e, Ee)
    };
    Re.fromStandardDate = function (e, t) {
        return Ue(e, t), new Re(e.getHours(), e.getMinutes(), e.getSeconds(), (0, Oe.toNumber)(f.totalNanoseconds(e, t)), f.timeZoneOffsetInSeconds(e))
    }, Re.prototype.toString = function () {
        return f.timeToIsoString(this.hour, this.minute, this.second, this.nanosecond) + f.timeZoneOffsetToIsoString(this.timeZoneOffsetSeconds)
    };
    p = Re;

    function Re(e, t, r, n, o) {
        this.hour = f.assertValidHour(e), this.minute = f.assertValidMinute(t), this.second = f.assertValidSecond(r), this.nanosecond = f.assertValidNanosecond(n), this.timeZoneOffsetSeconds = (0, me.assertNumberOrInteger)(o, "Time zone offset in seconds"), Object.freeze(this)
    }

    i.Time = p, Object.defineProperty(p.prototype, Pe, l), i.isTime = function (e) {
        return xe(e, Pe)
    };
    ke.fromStandardDate = function (e) {
        return Ue(e), new ke(e.getFullYear(), e.getMonth() + 1, e.getDate())
    }, ke.prototype.toStandardDate = function () {
        return f.isoStringToStandardDate(this.toString())
    }, ke.prototype.toString = function () {
        return f.dateToIsoString(this.year, this.month, this.day)
    };
    p = ke;

    function ke(e, t, r) {
        this.year = f.assertValidYear(e), this.month = f.assertValidMonth(t), this.day = f.assertValidDay(r), Object.freeze(this)
    }

    i.Date = p, Object.defineProperty(p.prototype, Se, l), i.isDate = function (e) {
        return xe(e, Se)
    };
    Ae.fromStandardDate = function (e, t) {
        return Ue(e, t), new Ae(e.getFullYear(), e.getMonth() + 1, e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), (0, Oe.toNumber)(f.totalNanoseconds(e, t)))
    }, Ae.prototype.toStandardDate = function () {
        return f.isoStringToStandardDate(this.toString())
    }, Ae.prototype.toString = function () {
        return Ne(this.year, this.month, this.day, this.hour, this.minute, this.second, this.nanosecond)
    };
    p = Ae;

    function Ae(e, t, r, n, o, i, u) {
        this.year = f.assertValidYear(e), this.month = f.assertValidMonth(t), this.day = f.assertValidDay(r), this.hour = f.assertValidHour(n), this.minute = f.assertValidMinute(o), this.second = f.assertValidSecond(i), this.nanosecond = f.assertValidNanosecond(u), Object.freeze(this)
    }

    i.LocalDateTime = p, Object.defineProperty(p.prototype, Te, l), i.isLocalDateTime = function (e) {
        return xe(e, Te)
    };
    Me.fromStandardDate = function (e, t) {
        return Ue(e, t), new Me(e.getFullYear(), e.getMonth() + 1, e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), (0, Oe.toNumber)(f.totalNanoseconds(e, t)), f.timeZoneOffsetInSeconds(e), null)
    }, Me.prototype.toStandardDate = function () {
        return f.toStandardDate(this._toUTC())
    }, Me.prototype.toString = function () {
        var e;
        return Ne(this.year, this.month, this.day, this.hour, this.minute, this.second, this.nanosecond) + (null != this.timeZoneOffsetSeconds ? f.timeZoneOffsetToIsoString(null != (e = this.timeZoneOffsetSeconds) ? e : 0) : "") + (null != this.timeZoneId ? "[".concat(this.timeZoneId, "]") : "")
    }, Me.prototype._toUTC = function () {
        if (void 0 === this.timeZoneOffsetSeconds) throw new Error("Requires DateTime created with time zone offset");
        var e = f.localDateTimeToEpochSecond(this.year, this.month, this.day, this.hour, this.minute, this.second, this.nanosecond).subtract(null != (e = this.timeZoneOffsetSeconds) ? e : 0);
        return (0, Oe.int)(e).multiply(1e3).add((0, Oe.int)(this.nanosecond).div(1e6)).toNumber()
    };
    p = Me;

    function Me(e, t, r, n, o, i, u, a, s) {
        this.year = f.assertValidYear(e), this.month = f.assertValidMonth(t), this.day = f.assertValidDay(r), this.hour = f.assertValidHour(n), this.minute = f.assertValidMinute(o), this.second = f.assertValidSecond(i), this.nanosecond = f.assertValidNanosecond(u);
        e = ve(function (e, t) {
            var r = null != e, n = null != t && "" !== t;
            if (!r && !n) throw(0, ge.newError)("Unable to create DateTime without either time zone offset or id. Please specify either of them. Given offset: ".concat(e, " and id: ").concat(t));
            var o = [void 0, void 0];
            r && ((0, me.assertNumberOrInteger)(e, "Time zone offset in seconds"), o[0] = e);
            n && ((0, me.assertString)(t, "Time zone ID"), f.assertValidZoneId("Time zone ID", t), o[1] = t);
            return o
        }(a, s), 2), t = e[0], r = e[1];
        this.timeZoneOffsetSeconds = t, this.timeZoneId = null != r ? r : void 0, Object.freeze(this)
    }

    function xe(e, t) {
        return null != e && !0 === e[t]
    }

    function Ne(e, t, r, n, o, i, u) {
        return f.dateToIsoString(e, t, r) + "T" + f.timeToIsoString(n, o, i, u)
    }

    function Ue(e, t) {
        (0, me.assertValidDate)(e, "Standard date"), null != t && (0, me.assertNumberOrInteger)(t, "Nanosecond")
    }

    i.DateTime = p, Object.defineProperty(p.prototype, je, l), i.isDateTime = function (e) {
        return xe(e, je)
    };
    var p = {},
        De = (Object.defineProperty(p, "__esModule", {value: !0}), p.isPathSegment = p.PathSegment = p.isPath = p.Path = p.isUnboundRelationship = p.UnboundRelationship = p.isRelationship = p.Relationship = p.isNode = p.Node = void 0, a),
        l = {value: !0, enumerable: !1, configurable: !1, writable: !1}, Le = "__isNode__", Be = "__isRelationship__",
        Fe = "__isUnboundRelationship__", We = "__isPath__", ze = "__isPathSegment__";

    function qe(e, t) {
        return null != e && !0 === e[t]
    }

    Ve.prototype.toString = function () {
        for (var e = "(" + this.elementId, t = 0; t < this.labels.length; t++) e += ":" + this.labels[t];
        var r = Object.keys(this.properties);
        if (0 < r.length) {
            e += " {";
            for (t = 0; t < r.length; t++) 0 < t && (e += ","), e += r[t] + ":" + (0, De.stringify)(this.properties[r[t]]);
            e += "}"
        }
        return e += ")"
    };
    var h = Ve;

    function Ve(e, t, r, n) {
        this.identity = e, this.labels = t, this.properties = r, this.elementId = Qe(n, function () {
            return e.toString()
        })
    }

    p.Node = h, Object.defineProperty(h.prototype, Le, l), p.isNode = function (e) {
        return qe(e, Le)
    };
    Ye.prototype.toString = function () {
        var e = "(" + this.startNodeElementId + ")-[:" + this.type, t = Object.keys(this.properties);
        if (0 < t.length) {
            e += " {";
            for (var r = 0; r < t.length; r++) 0 < r && (e += ","), e += t[r] + ":" + (0, De.stringify)(this.properties[t[r]]);
            e += "}"
        }
        return e += "]->(" + this.endNodeElementId + ")"
    };
    var He = Ye;

    function Ye(e, t, r, n, o, i, u, a) {
        this.identity = e, this.start = t, this.end = r, this.type = n, this.properties = o, this.elementId = Qe(i, function () {
            return e.toString()
        }), this.startNodeElementId = Qe(u, function () {
            return t.toString()
        }), this.endNodeElementId = Qe(a, function () {
            return r.toString()
        })
    }

    p.Relationship = He, Object.defineProperty(He.prototype, Be, l), p.isRelationship = function (e) {
        return qe(e, Be)
    };
    Ke.prototype.bind = function (e, t) {
        return new He(this.identity, e, t, this.type, this.properties, this.elementId)
    }, Ke.prototype.bindTo = function (e, t) {
        return new He(this.identity, e.identity, t.identity, this.type, this.properties, this.elementId, e.elementId, t.elementId)
    }, Ke.prototype.toString = function () {
        var e = "-[:" + this.type, t = Object.keys(this.properties);
        if (0 < t.length) {
            e += " {";
            for (var r = 0; r < t.length; r++) 0 < r && (e += ","), e += t[r] + ":" + (0, De.stringify)(this.properties[t[r]]);
            e += "}"
        }
        return e += "]->"
    };
    h = Ke;

    function Ke(e, t, r, n) {
        this.identity = e, this.type = t, this.properties = r, this.elementId = Qe(n, function () {
            return e.toString()
        })
    }

    p.UnboundRelationship = h, Object.defineProperty(h.prototype, Fe, l), p.isUnboundRelationship = function (e) {
        return qe(e, Fe)
    };

    function Ge(e, t, r) {
        this.start = e, this.relationship = t, this.end = r
    }

    p.PathSegment = Ge, Object.defineProperty(Ge.prototype, ze, l), p.isPathSegment = function (e) {
        return qe(e, ze)
    };

    function Ze(e, t, r) {
        this.start = e, this.end = t, this.segments = r, this.length = r.length
    }

    function Qe(e, t) {
        return null == e ? t() : e
    }

    p.Path = Ze, Object.defineProperty(Ze.prototype, We, l), p.isPath = function (e) {
        return qe(e, We)
    };
    var h = {}, Xe = r && r.__generator || function (n, o) {
        var i, u, a, s = {
            label: 0, sent: function () {
                if (1 & a[0]) throw a[1];
                return a[1]
            }, trys: [], ops: []
        }, c = {next: e(0), throw: e(1), return: e(2)};
        return "function" == typeof Symbol && (c[Symbol.iterator] = function () {
            return this
        }), c;

        function e(r) {
            return function (e) {
                var t = [r, e];
                if (i) throw new TypeError("Generator is already executing.");
                for (; s = c && t[c = 0] ? 0 : s;) try {
                    if (i = 1, u && (a = 2 & t[0] ? u.return : t[0] ? u.throw || ((a = u.return) && a.call(u), 0) : u.next) && !(a = a.call(u, t[1])).done) return a;
                    switch (u = 0, (t = a ? [2 & t[0], a.value] : t)[0]) {
                        case 0:
                        case 1:
                            a = t;
                            break;
                        case 4:
                            return s.label++, {value: t[1], done: !1};
                        case 5:
                            s.label++, u = t[1], t = [0];
                            continue;
                        case 7:
                            t = s.ops.pop(), s.trys.pop();
                            continue;
                        default:
                            if (!(a = 0 < (a = s.trys).length && a[a.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                s = 0;
                                continue
                            }
                            if (3 === t[0] && (!a || t[1] > a[0] && t[1] < a[3])) {
                                s.label = t[1];
                                break
                            }
                            if (6 === t[0] && s.label < a[1]) {
                                s.label = a[1], a = t;
                                break
                            }
                            if (a && s.label < a[2]) {
                                s.label = a[2], s.ops.push(t);
                                break
                            }
                            a[2] && s.ops.pop(), s.trys.pop();
                            continue
                    }
                    t = o.call(n, s)
                } catch (e) {
                    t = [6, e], u = 0
                } finally {
                    i = a = 0
                }
                if (5 & t[0]) throw t[1];
                return {value: t[0] ? t[1] : void 0, done: !0}
            }
        }
    }, Je = r && r.__values || function (e) {
        var t = "function" == typeof Symbol && Symbol.iterator, r = t && e[t], n = 0;
        if (r) return r.call(e);
        if (e && "number" == typeof e.length) return {
            next: function () {
                return {value: (e = e && n >= e.length ? void 0 : e) && e[n++], done: !e}
            }
        };
        throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
    }, $e = r && r.__read || function (e, t) {
        var r = "function" == typeof Symbol && e[Symbol.iterator];
        if (!r) return e;
        var n, o, i = r.call(e), u = [];
        try {
            for (; (void 0 === t || 0 < t--) && !(n = i.next()).done;) u.push(n.value)
        } catch (e) {
            o = {error: e}
        } finally {
            try {
                n && !n.done && (r = i.return) && r.call(i)
            } finally {
                if (o) throw o.error
            }
        }
        return u
    }, et = (Object.defineProperty(h, "__esModule", {value: !0}), t);

    function tt(e, t, r) {
        var n;
        this.keys = e, this.length = e.length, this._fields = t, this._fieldLookup = null != r ? r : (n = {}, e.forEach(function (e, t) {
            n[e] = t
        }), n)
    }

    tt.prototype.forEach = function (e) {
        var t, r;
        try {
            for (var n = Je(this.entries()), o = n.next(); !o.done; o = n.next()) {
                var i = $e(o.value, 2), u = i[0];
                e(i[1], u, this)
            }
        } catch (e) {
            t = {error: e}
        } finally {
            try {
                o && !o.done && (r = n.return) && r.call(n)
            } finally {
                if (t) throw t.error
            }
        }
    }, tt.prototype.map = function (e) {
        var t, r, n = [];
        try {
            for (var o = Je(this.entries()), i = o.next(); !i.done; i = o.next()) {
                var u = $e(i.value, 2), a = u[0], s = u[1];
                n.push(e(s, a, this))
            }
        } catch (e) {
            t = {error: e}
        } finally {
            try {
                i && !i.done && (r = o.return) && r.call(o)
            } finally {
                if (t) throw t.error
            }
        }
        return n
    }, tt.prototype.entries = function () {
        var t;
        return Xe(this, function (e) {
            switch (e.label) {
                case 0:
                    t = 0, e.label = 1;
                case 1:
                    return t < this.keys.length ? [4, [this.keys[t], this._fields[t]]] : [3, 4];
                case 2:
                    e.sent(), e.label = 3;
                case 3:
                    return t++, [3, 1];
                case 4:
                    return [2]
            }
        })
    }, tt.prototype.values = function () {
        var t;
        return Xe(this, function (e) {
            switch (e.label) {
                case 0:
                    t = 0, e.label = 1;
                case 1:
                    return t < this.keys.length ? [4, this._fields[t]] : [3, 4];
                case 2:
                    e.sent(), e.label = 3;
                case 3:
                    return t++, [3, 1];
                case 4:
                    return [2]
            }
        })
    }, tt.prototype[Symbol.iterator] = function () {
        var t;
        return Xe(this, function (e) {
            switch (e.label) {
                case 0:
                    t = 0, e.label = 1;
                case 1:
                    return t < this.keys.length ? [4, this._fields[t]] : [3, 4];
                case 2:
                    e.sent(), e.label = 3;
                case 3:
                    return t++, [3, 1];
                case 4:
                    return [2]
            }
        })
    }, tt.prototype.toObject = function () {
        var t, e, r = {};
        try {
            for (var n = Je(this.entries()), o = n.next(); !o.done; o = n.next()) {
                var i = $e(o.value, 2), u = i[0], a = i[1];
                r[u] = a
            }
        } catch (e) {
            t = {error: e}
        } finally {
            try {
                o && !o.done && (e = n.return) && e.call(n)
            } finally {
                if (t) throw t.error
            }
        }
        return r
    }, tt.prototype.get = function (e) {
        var t;
        if ("number" != typeof e) {
            if (void 0 === (t = this._fieldLookup[e])) throw(0, et.newError)("This record has no field with key '".concat(e.toString(), "', available keys are: [") + this.keys.toString() + "].")
        } else t = e;
        if (t > this._fields.length - 1 || t < 0) throw(0, et.newError)("This record has no field with index '" + t.toString() + "'. Remember that indexes start at `0`, and make sure your query returns records in the shape you meant it to.");
        return this._fields[t]
    }, tt.prototype.has = function (e) {
        return "number" == typeof e ? 0 <= e && e < this._fields.length : void 0 !== this._fieldLookup[e]
    }, h.default = tt;
    var l = {}, rt = (Object.defineProperty(l, "__esModule", {value: !0}), l.isPoint = l.Point = void 0, u),
        nt = "__isPoint__", b = (ot.prototype.toString = function () {
            return null == this.z || isNaN(this.z) ? "Point{srid=".concat(it(this.srid), ", x=").concat(it(this.x), ", y=").concat(it(this.y), "}") : "Point{srid=".concat(it(this.srid), ", x=").concat(it(this.x), ", y=").concat(it(this.y), ", z=").concat(it(this.z), "}")
        }, ot);

    function ot(e, t, r, n) {
        this.srid = (0, rt.assertNumberOrInteger)(e, "SRID"), this.x = (0, rt.assertNumber)(t, "X coordinate"), this.y = (0, rt.assertNumber)(r, "Y coordinate"), this.z = null == n ? n : (0, rt.assertNumber)(n, "Z coordinate"), Object.freeze(this)
    }

    function it(e) {
        return Number.isInteger(e) ? e.toString() + ".0" : e.toString()
    }

    l.Point = b, Object.defineProperty(b.prototype, nt, {
        value: !0,
        enumerable: !1,
        configurable: !1,
        writable: !1
    }), l.isPoint = function (e) {
        return null != e && !0 === e[nt]
    };
    var b = {}, ut = r && r.__createBinding || (Object.create ? function (e, t, r, n) {
            void 0 === n && (n = r);
            var o = Object.getOwnPropertyDescriptor(t, r);
            o && ("get" in o ? t.__esModule : !o.writable && !o.configurable) || (o = {
                enumerable: !0, get: function () {
                    return t[r]
                }
            }), Object.defineProperty(e, n, o)
        } : function (e, t, r, n) {
            e[n = void 0 === n ? r : n] = t[r]
        }), at = r && r.__setModuleDefault || (Object.create ? function (e, t) {
            Object.defineProperty(e, "default", {enumerable: !0, value: t})
        } : function (e, t) {
            e.default = t
        }), st = r && r.__importStar || function (e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e) for (var r in e) "default" !== r && Object.prototype.hasOwnProperty.call(e, r) && ut(t, e, r);
            return at(t, e), t
        },
        ct = (Object.defineProperty(b, "__esModule", {value: !0}), b.Stats = b.QueryStatistics = b.ProfiledPlan = b.Plan = b.Notification = b.ServerInfo = b.queryType = void 0, st(n)),
        st = (lt.prototype._buildNotifications = function (e) {
            return null == e ? [] : e.map(function (e) {
                return new yt(e)
            })
        }, lt.prototype.hasPlan = function () {
            return this.plan instanceof ft
        }, lt.prototype.hasProfile = function () {
            return this.profile instanceof pt
        }, lt);

    function lt(e, t, r, n) {
        this.query = {
            text: e,
            parameters: t
        }, this.queryType = r.type, this.counters = new ht(null != (e = r.stats) ? e : {}), this.updateStatistics = this.counters, this.plan = (null != r.plan || null != r.profile) && new ft(null != (t = r.plan) ? t : r.profile), this.profile = null != r.profile && new pt(r.profile), this.notifications = this._buildNotifications(r.notifications), this.server = new vt(r.server, n), this.resultConsumedAfter = r.result_consumed_after, this.resultAvailableAfter = r.result_available_after, this.database = {name: null != (e = r.db) ? e : null}
    }

    var ft = function t(e) {
        this.operatorType = e.operatorType, this.identifiers = e.identifiers, this.arguments = e.args, this.children = null != e.children ? e.children.map(function (e) {
            return new t(e)
        }) : []
    }, pt = (b.Plan = ft, dt.prototype.hasPageCacheStats = function () {
        return 0 < this.pageCacheMisses || 0 < this.pageCacheHits || 0 < this.pageCacheHitRatio
    }, dt);

    function dt(e) {
        this.operatorType = e.operatorType, this.identifiers = e.identifiers, this.arguments = e.args, this.dbHits = gt("dbHits", e), this.rows = gt("rows", e), this.pageCacheMisses = gt("pageCacheMisses", e), this.pageCacheHits = gt("pageCacheHits", e), this.pageCacheHitRatio = gt("pageCacheHitRatio", e), this.time = gt("time", e), this.children = null != e.children ? e.children.map(function (e) {
            return new dt(e)
        }) : []
    }

    b.ProfiledPlan = pt;
    b.Stats = function () {
        this.nodesCreated = 0, this.nodesDeleted = 0, this.relationshipsCreated = 0, this.relationshipsDeleted = 0, this.propertiesSet = 0, this.labelsAdded = 0, this.labelsRemoved = 0, this.indexesAdded = 0, this.indexesRemoved = 0, this.constraintsAdded = 0, this.constraintsRemoved = 0
    }, bt.prototype.containsUpdates = function () {
        var r = this;
        return void 0 !== this._containsUpdates ? this._containsUpdates : 0 < Object.keys(this._stats).reduce(function (e, t) {
            return e + r._stats[t]
        }, 0)
    }, bt.prototype.updates = function () {
        return this._stats
    }, bt.prototype.containsSystemUpdates = function () {
        return void 0 !== this._containsSystemUpdates ? this._containsSystemUpdates : 0 < this._systemUpdates
    }, bt.prototype.systemUpdates = function () {
        return this._systemUpdates
    };
    var ht = bt;

    function bt(r) {
        var n = this;
        this._stats = {
            nodesCreated: 0,
            nodesDeleted: 0,
            relationshipsCreated: 0,
            relationshipsDeleted: 0,
            propertiesSet: 0,
            labelsAdded: 0,
            labelsRemoved: 0,
            indexesAdded: 0,
            indexesRemoved: 0,
            constraintsAdded: 0,
            constraintsRemoved: 0
        }, this._systemUpdates = 0, Object.keys(r).forEach(function (e) {
            var t = e.replace(/(-\w)/g, function (e) {
                return e[1].toUpperCase()
            });
            t in n._stats ? n._stats[t] = mt(r[e]) : "systemUpdates" === t ? n._systemUpdates = mt(r[e]) : "containsSystemUpdates" === t ? n._containsSystemUpdates = r[e] : "containsUpdates" === t && (n._containsUpdates = r[e])
        }), this._stats = Object.freeze(this._stats)
    }

    b.QueryStatistics = ht;
    _t._constructPosition = function (e) {
        return null == e ? {} : {offset: mt(e.offset), line: mt(e.line), column: mt(e.column)}
    };
    var yt = _t;

    function _t(e) {
        this.code = e.code, this.title = e.title, this.description = e.description, this.severity = e.severity, this.position = _t._constructPosition(e.position)
    }

    b.Notification = yt;
    var vt = function (e, t) {
        null != e && (this.address = e.address, this.agent = e.version), this.protocolVersion = t
    };

    function mt(e) {
        return e instanceof ct.default ? e.toInt() : "bigint" == typeof e ? (0, ct.int)(e).toInt() : e
    }

    function gt(e, t, r) {
        return void 0 === r && (r = 0), !1 !== t && e in t ? mt(t[e]) : r
    }

    b.ServerInfo = vt;
    b.queryType = {READ_ONLY: "r", READ_WRITE: "rw", WRITE_ONLY: "w", SCHEMA_WRITE: "s"}, b.default = st;
    var st = {}, y = {}, _ = {},
        v = (Object.defineProperty(_, "__esModule", {value: !0}), _.FailedObserver = _.CompletedObserver = void 0, Ot.prototype.subscribe = function (e) {
            Et(e, e.onKeys, []), Et(e, e.onCompleted, {})
        }, Ot.prototype.cancel = function () {
        }, Ot.prototype.pause = function () {
        }, Ot.prototype.resume = function () {
        }, Ot.prototype.prepareToHandleSingleResponse = function () {
        }, Ot.prototype.markCompleted = function () {
        }, Ot.prototype.onError = function (e) {
            throw Error("CompletedObserver not supposed to call onError")
        }, Ot);

    function Ot() {
    }

    function wt(e) {
        var t = e.error, e = e.onError;
        this._error = t, this._beforeError = e, this._observers = [], this.onError(t)
    }

    function Et(e, t, r) {
        null != t && t.bind(e)(r)
    }

    _.CompletedObserver = v, wt.prototype.subscribe = function (e) {
        Et(e, e.onError, this._error), this._observers.push(e)
    }, wt.prototype.onError = function (t) {
        Et(this, this._beforeError, t), this._observers.forEach(function (e) {
            return Et(e, e.onError, t)
        })
    }, wt.prototype.cancel = function () {
    }, wt.prototype.pause = function () {
    }, wt.prototype.resume = function () {
    }, wt.prototype.markCompleted = function () {
    }, wt.prototype.prepareToHandleSingleResponse = function () {
    }, _.FailedObserver = wt;
    var v = {}, Pt = r && r.__createBinding || (Object.create ? function (e, t, r, n) {
            void 0 === n && (n = r);
            var o = Object.getOwnPropertyDescriptor(t, r);
            o && ("get" in o ? t.__esModule : !o.writable && !o.configurable) || (o = {
                enumerable: !0, get: function () {
                    return t[r]
                }
            }), Object.defineProperty(e, n, o)
        } : function (e, t, r, n) {
            e[n = void 0 === n ? r : n] = t[r]
        }), St = r && r.__setModuleDefault || (Object.create ? function (e, t) {
            Object.defineProperty(e, "default", {enumerable: !0, value: t})
        } : function (e, t) {
            e.default = t
        }), m = r && r.__importStar || function (e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e) for (var r in e) "default" !== r && Object.prototype.hasOwnProperty.call(e, r) && Pt(t, e, r);
            return St(t, e), t
        }, Tt = r && r.__read || function (e, t) {
            var r = "function" == typeof Symbol && e[Symbol.iterator];
            if (!r) return e;
            var n, o, i = r.call(e), u = [];
            try {
                for (; (void 0 === t || 0 < t--) && !(n = i.next()).done;) u.push(n.value)
            } catch (e) {
                o = {error: e}
            } finally {
                try {
                    n && !n.done && (r = i.return) && r.call(i)
                } finally {
                    if (o) throw o.error
                }
            }
            return u
        }, jt = r && r.__spreadArray || function (e, t, r) {
            if (r || 2 === arguments.length) for (var n, o = 0, i = t.length; o < i; o++) !n && o in t || ((n = n || Array.prototype.slice.call(t, 0, o))[o] = t[o]);
            return e.concat(n || Array.prototype.slice.call(t))
        }, Ct = (Object.defineProperty(v, "__esModule", {value: !0}), v.Bookmarks = void 0, m(u)),
        m = (It.empty = function () {
            return Rt
        }, It.prototype.isEmpty = function () {
            return 0 === this._values.length
        }, It.prototype.values = function () {
            return this._values
        }, It.prototype[Symbol.iterator] = function () {
            return this._values[Symbol.iterator]()
        }, It.prototype.asBeginTransactionParameters = function () {
            var e;
            return this.isEmpty() ? {} : ((e = {}).bookmarks = this._values, e)
        }, It);

    function It(e) {
        this._values = function (e) {
            if (null == e || "" === e) return [];
            if (Ct.isString(e)) return [e];
            if (Array.isArray(e)) {
                for (var t = new Set, r = function r(e) {
                    return e.reduce(function (e, t) {
                        return Array.isArray(t) ? e.concat(r(t)) : e.concat(t)
                    }, [])
                }(e), n = 0; n < r.length; n++) {
                    var o = r[n];
                    if (null != o) {
                        if (!Ct.isString(o)) throw new TypeError("Bookmark value should be a string, given: '".concat(o, "'"));
                        t.add(o)
                    }
                }
                return jt([], Tt(t), !1)
            }
            throw new TypeError("Bookmarks should either be a string or a string array, given: '".concat(e, "'"))
        }(e)
    }

    var Rt = new (v.Bookmarks = m)(null);
    var kt, m = {},
        g = (Object.defineProperty(m, "__esModule", {value: !0}), m.BOLT_PROTOCOL_V5_0 = m.BOLT_PROTOCOL_V4_4 = m.BOLT_PROTOCOL_V4_3 = m.BOLT_PROTOCOL_V4_2 = m.BOLT_PROTOCOL_V4_1 = m.BOLT_PROTOCOL_V4_0 = m.BOLT_PROTOCOL_V3 = m.BOLT_PROTOCOL_V2 = m.BOLT_PROTOCOL_V1 = m.DEFAULT_POOL_MAX_SIZE = m.DEFAULT_POOL_ACQUISITION_TIMEOUT = m.DEFAULT_CONNECTION_TIMEOUT_MILLIS = m.ACCESS_MODE_WRITE = m.ACCESS_MODE_READ = m.FETCH_ALL = void 0, m.FETCH_ALL = -1, m.DEFAULT_POOL_ACQUISITION_TIMEOUT = 6e4, m.DEFAULT_POOL_MAX_SIZE = 100, m.DEFAULT_CONNECTION_TIMEOUT_MILLIS = 3e4, m.ACCESS_MODE_READ = "READ", m.ACCESS_MODE_WRITE = "WRITE", m.BOLT_PROTOCOL_V1 = 1, m.BOLT_PROTOCOL_V2 = 2, m.BOLT_PROTOCOL_V3 = 3, m.BOLT_PROTOCOL_V4_0 = 4, m.BOLT_PROTOCOL_V4_1 = 4.1, m.BOLT_PROTOCOL_V4_2 = 4.2, m.BOLT_PROTOCOL_V4_3 = 4.3, m.BOLT_PROTOCOL_V4_4 = 4.4, m.BOLT_PROTOCOL_V5_0 = 5, {}),
        O = r && r.__extends || (kt = function (e, t) {
            return (kt = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
            })(e, t)
        }, function (e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

            function r() {
                this.constructor = e
            }

            kt(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
        }), At = r && r.__awaiter || function (e, u, a, s) {
            return new (a = a || Promise)(function (r, t) {
                function n(e) {
                    try {
                        i(s.next(e))
                    } catch (e) {
                        t(e)
                    }
                }

                function o(e) {
                    try {
                        i(s.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }

                function i(e) {
                    var t;
                    e.done ? r(e.value) : ((t = e.value) instanceof a ? t : new a(function (e) {
                        e(t)
                    })).then(n, o)
                }

                i((s = s.apply(e, u || [])).next())
            })
        }, Mt = r && r.__generator || function (n, o) {
            var i, u, a, s = {
                label: 0, sent: function () {
                    if (1 & a[0]) throw a[1];
                    return a[1]
                }, trys: [], ops: []
            }, c = {next: e(0), throw: e(1), return: e(2)};
            return "function" == typeof Symbol && (c[Symbol.iterator] = function () {
                return this
            }), c;

            function e(r) {
                return function (e) {
                    var t = [r, e];
                    if (i) throw new TypeError("Generator is already executing.");
                    for (; s = c && t[c = 0] ? 0 : s;) try {
                        if (i = 1, u && (a = 2 & t[0] ? u.return : t[0] ? u.throw || ((a = u.return) && a.call(u), 0) : u.next) && !(a = a.call(u, t[1])).done) return a;
                        switch (u = 0, (t = a ? [2 & t[0], a.value] : t)[0]) {
                            case 0:
                            case 1:
                                a = t;
                                break;
                            case 4:
                                return s.label++, {value: t[1], done: !1};
                            case 5:
                                s.label++, u = t[1], t = [0];
                                continue;
                            case 7:
                                t = s.ops.pop(), s.trys.pop();
                                continue;
                            default:
                                if (!(a = 0 < (a = s.trys).length && a[a.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                    s = 0;
                                    continue
                                }
                                if (3 === t[0] && (!a || t[1] > a[0] && t[1] < a[3])) {
                                    s.label = t[1];
                                    break
                                }
                                if (6 === t[0] && s.label < a[1]) {
                                    s.label = a[1], a = t;
                                    break
                                }
                                if (a && s.label < a[2]) {
                                    s.label = a[2], s.ops.push(t);
                                    break
                                }
                                a[2] && s.ops.pop(), s.trys.pop();
                                continue
                        }
                        t = o.call(n, s)
                    } catch (e) {
                        t = [6, e], u = 0
                    } finally {
                        i = a = 0
                    }
                    if (5 & t[0]) throw t[1];
                    return {value: t[0] ? t[1] : void 0, done: !0}
                }
            }
        },
        xt = (Object.defineProperty(g, "__esModule", {value: !0}), g.EMPTY_CONNECTION_HOLDER = g.ReadOnlyConnectionHolder = g.ConnectionHolder = void 0, t),
        Nt = u, Ut = m, Dt = v, w = (Lt.prototype.mode = function () {
            return this._mode
        }, Lt.prototype.database = function () {
            return this._database
        }, Lt.prototype.setDatabase = function (e) {
            this._database = e
        }, Lt.prototype.bookmarks = function () {
            return this._bookmarks
        }, Lt.prototype.connectionProvider = function () {
            return this._connectionProvider
        }, Lt.prototype.referenceCount = function () {
            return this._referenceCount
        }, Lt.prototype.initializeConnection = function () {
            return 0 !== this._referenceCount || null == this._connectionProvider ? (this._referenceCount++, !1) : (this._connectionPromise = this._createConnectionPromise(this._connectionProvider), this._referenceCount++, !0)
        }, Lt.prototype._createConnectionPromise = function (o) {
            return At(this, void 0, void 0, function () {
                var t, r, n;
                return Mt(this, function (e) {
                    switch (e.label) {
                        case 0:
                            return r = (t = o).acquireConnection, n = {
                                accessMode: this._mode,
                                database: this._database
                            }, [4, this._getBookmarks()];
                        case 1:
                            return [4, r.apply(t, [(n.bookmarks = e.sent(), n.impersonatedUser = this._impersonatedUser, n.onDatabaseNameResolved = this._onDatabaseNameResolved, n)])];
                        case 2:
                            return [2, e.sent()]
                    }
                })
            })
        }, Lt.prototype._getBookmarks = function () {
            return At(this, void 0, void 0, function () {
                return Mt(this, function (e) {
                    switch (e.label) {
                        case 0:
                            return [4, this._getConnectionAcquistionBookmarks()];
                        case 1:
                            return [2, e.sent()]
                    }
                })
            })
        }, Lt.prototype.getConnection = function () {
            return this._connectionPromise
        }, Lt.prototype.releaseConnection = function () {
            return 0 === this._referenceCount ? this._connectionPromise : (this._referenceCount--, 0 === this._referenceCount ? this._releaseConnection() : this._connectionPromise)
        }, Lt.prototype.close = function (e) {
            return 0 === this._referenceCount ? this._connectionPromise : (this._referenceCount = 0, this._releaseConnection(e))
        }, Lt.prototype._releaseConnection = function (t) {
            return this._connectionPromise = this._connectionPromise.then(function (e) {
                return null != e ? e.isOpen() && (e.hasOngoingObservableRequests() || !0 === t) ? e.resetAndFlush().catch(qt).then(function () {
                    return e._release().then(function () {
                        return null
                    })
                }) : e._release().then(function () {
                    return null
                }) : Promise.resolve(null)
            }).catch(qt), this._connectionPromise
        }, Lt);

    function Lt(e) {
        var e = void 0 === e ? {} : e, t = e.mode, t = void 0 === t ? Ut.ACCESS_MODE_WRITE : t, r = e.database,
            r = void 0 === r ? "" : r, n = e.bookmarks, o = e.connectionProvider, i = e.impersonatedUser,
            u = e.onDatabaseNameResolved, e = e.getConnectionAcquistionBookmarks;
        this._mode = t, this._database = null != r ? (0, Nt.assertString)(r, "database") : "", this._bookmarks = null != n ? n : Dt.Bookmarks.empty(), this._connectionProvider = o, this._impersonatedUser = i, this._referenceCount = 0, this._connectionPromise = Promise.resolve(null), this._onDatabaseNameResolved = u, this._getConnectionAcquistionBookmarks = null != e ? e : function () {
            return Promise.resolve(Dt.Bookmarks.empty())
        }
    }

    g.ConnectionHolder = w;
    O(Wt, Bt = w), Wt.prototype.initializeConnection = function () {
        return 0 !== this._connectionHolder.referenceCount()
    }, Wt.prototype.getConnection = function () {
        return this._connectionHolder.getConnection()
    }, Wt.prototype.releaseConnection = function () {
        return this._connectionHolder.getConnection().catch(function () {
            return Promise.resolve(null)
        })
    }, Wt.prototype.close = function () {
        return this._connectionHolder.getConnection().catch(function () {
            return Promise.resolve(null)
        })
    };
    var Bt, Ft, E = Wt;

    function Wt(e) {
        var t = Bt.call(this, {
            mode: e.mode(),
            database: e.database(),
            bookmarks: e.bookmarks(),
            getConnectionAcquistionBookmarks: e._getConnectionAcquistionBookmarks,
            connectionProvider: e.connectionProvider()
        }) || this;
        return t._connectionHolder = e, t
    }

    function zt() {
        return null !== Ft && Ft.apply(this, arguments) || this
    }

    g.ReadOnlyConnectionHolder = E, g.default = E, O(zt, Ft = w), zt.prototype.mode = function () {
    }, zt.prototype.database = function () {
    }, zt.prototype.initializeConnection = function () {
        return !0
    }, zt.prototype.getConnection = function () {
        return At(this, void 0, void 0, function () {
            return Mt(this, function (e) {
                switch (e.label) {
                    case 0:
                        return [4, Promise.reject((0, xt.newError)("This connection holder does not serve connections"))];
                    case 1:
                        return [2, e.sent()]
                }
            })
        })
    }, zt.prototype.releaseConnection = function () {
        return At(this, void 0, void 0, function () {
            return Mt(this, function (e) {
                switch (e.label) {
                    case 0:
                        return [4, Promise.resolve(null)];
                    case 1:
                        return [2, e.sent()]
                }
            })
        })
    }, zt.prototype.close = function () {
        return At(this, void 0, void 0, function () {
            return Mt(this, function (e) {
                switch (e.label) {
                    case 0:
                        return [4, Promise.resolve(null)];
                    case 1:
                        return [2, e.sent()]
                }
            })
        })
    };
    E = new zt;

    function qt(e) {
        return null
    }

    g.EMPTY_CONNECTION_HOLDER = E;
    var O = {}, Vt = r && r.__createBinding || (Object.create ? function (e, t, r, n) {
            void 0 === n && (n = r);
            var o = Object.getOwnPropertyDescriptor(t, r);
            o && ("get" in o ? t.__esModule : !o.writable && !o.configurable) || (o = {
                enumerable: !0, get: function () {
                    return t[r]
                }
            }), Object.defineProperty(e, n, o)
        } : function (e, t, r, n) {
            e[n = void 0 === n ? r : n] = t[r]
        }), Ht = r && r.__setModuleDefault || (Object.create ? function (e, t) {
            Object.defineProperty(e, "default", {enumerable: !0, value: t})
        } : function (e, t) {
            e.default = t
        }), w = r && r.__importStar || function (e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e) for (var r in e) "default" !== r && Object.prototype.hasOwnProperty.call(e, r) && Vt(t, e, r);
            return Ht(t, e), t
        }, Yt = (Object.defineProperty(O, "__esModule", {value: !0}), O.TxConfig = void 0, w(u)), Kt = t, Gt = n,
        E = (Zt.empty = function () {
            return Qt
        }, Zt.prototype.isEmpty = function () {
            return Object.values(this).every(function (e) {
                return null == e
            })
        }, Zt);

    function Zt(e) {
        var t;
        null != (t = e) && Yt.assertObject(t, "Transaction config"), this.timeout = function (e) {
            if (Yt.isObject(e) && null != e.timeout) {
                Yt.assertNumberOrInteger(e.timeout, "Transaction timeout");
                e = (0, Gt.int)(e.timeout);
                if (e.isNegative()) throw(0, Kt.newError)("Transaction timeout should not be negative");
                return e
            }
            return null
        }(e), this.metadata = function (e) {
            if (Yt.isObject(e) && null != e.metadata) {
                e = e.metadata;
                if (Yt.assertObject(e, "config.metadata"), 0 !== Object.keys(e).length) return e
            }
            return null
        }(e)
    }

    var Qt = new (O.TxConfig = E)({});
    var w = {}, Xt = r && r.__awaiter || function (e, u, a, s) {
        return new (a = a || Promise)(function (r, t) {
            function n(e) {
                try {
                    i(s.next(e))
                } catch (e) {
                    t(e)
                }
            }

            function o(e) {
                try {
                    i(s.throw(e))
                } catch (e) {
                    t(e)
                }
            }

            function i(e) {
                var t;
                e.done ? r(e.value) : ((t = e.value) instanceof a ? t : new a(function (e) {
                    e(t)
                })).then(n, o)
            }

            i((s = s.apply(e, u || [])).next())
        })
    }, Jt = r && r.__generator || function (n, o) {
        var i, u, a, s = {
            label: 0, sent: function () {
                if (1 & a[0]) throw a[1];
                return a[1]
            }, trys: [], ops: []
        }, c = {next: e(0), throw: e(1), return: e(2)};
        return "function" == typeof Symbol && (c[Symbol.iterator] = function () {
            return this
        }), c;

        function e(r) {
            return function (e) {
                var t = [r, e];
                if (i) throw new TypeError("Generator is already executing.");
                for (; s = c && t[c = 0] ? 0 : s;) try {
                    if (i = 1, u && (a = 2 & t[0] ? u.return : t[0] ? u.throw || ((a = u.return) && a.call(u), 0) : u.next) && !(a = a.call(u, t[1])).done) return a;
                    switch (u = 0, (t = a ? [2 & t[0], a.value] : t)[0]) {
                        case 0:
                        case 1:
                            a = t;
                            break;
                        case 4:
                            return s.label++, {value: t[1], done: !1};
                        case 5:
                            s.label++, u = t[1], t = [0];
                            continue;
                        case 7:
                            t = s.ops.pop(), s.trys.pop();
                            continue;
                        default:
                            if (!(a = 0 < (a = s.trys).length && a[a.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                s = 0;
                                continue
                            }
                            if (3 === t[0] && (!a || t[1] > a[0] && t[1] < a[3])) {
                                s.label = t[1];
                                break
                            }
                            if (6 === t[0] && s.label < a[1]) {
                                s.label = a[1], a = t;
                                break
                            }
                            if (a && s.label < a[2]) {
                                s.label = a[2], s.ops.push(t);
                                break
                            }
                            a[2] && s.ops.pop(), s.trys.pop();
                            continue
                    }
                    t = o.call(n, s)
                } catch (e) {
                    t = [6, e], u = 0
                } finally {
                    i = a = 0
                }
                if (5 & t[0]) throw t[1];
                return {value: t[0] ? t[1] : void 0, done: !0}
            }
        }
    }, $t = (Object.defineProperty(w, "__esModule", {value: !0}), w.TransactionExecutor = void 0, t);

    function er(e, t, r, n) {
        this._maxRetryTimeMs = tr(e, 3e4), this._initialRetryDelayMs = tr(t, 1e3), this._multiplier = tr(r, 2), this._jitterFactor = tr(n, .2), this._inFlightTimeoutIds = [], this._verifyAfterConstruction()
    }

    function tr(e, t) {
        return null != e ? e : t
    }

    er.prototype.execute = function (n, o, i) {
        var u = this;
        return new Promise(function (e, t) {
            u._executeTransactionInsidePromise(n, o, e, t, i).catch(t)
        }).catch(function (e) {
            var t = Date.now(), r = u._initialRetryDelayMs;
            return u._retryTransactionPromise(n, o, e, t, r, i)
        })
    }, er.prototype.close = function () {
        this._inFlightTimeoutIds.forEach(function (e) {
            return clearTimeout(e)
        }), this._inFlightTimeoutIds = []
    }, er.prototype._retryTransactionPromise = function (o, i, e, r, u, a) {
        var s = this;
        return Date.now() - r > this._maxRetryTimeMs || !(0, $t.isRetriableError)(e) ? Promise.reject(e) : new Promise(function (e, t) {
            var r = s._computeDelayWithJitter(u), n = setTimeout(function () {
                s._inFlightTimeoutIds = s._inFlightTimeoutIds.filter(function (e) {
                    return e !== n
                }), s._executeTransactionInsidePromise(o, i, e, t, a).catch(t)
            }, r);
            s._inFlightTimeoutIds.push(n)
        }).catch(function (e) {
            var t = u * s._multiplier;
            return s._retryTransactionPromise(o, i, e, r, t, a)
        })
    }, er.prototype._executeTransactionInsidePromise = function (o, i, u, a, s) {
        return Xt(this, void 0, void 0, function () {
            var t, r, n = this;
            return Jt(this, function (e) {
                switch (e.label) {
                    case 0:
                        return e.trys.push([0, 2, , 3]), [4, o()];
                    case 1:
                        return t = e.sent(), [3, 3];
                    case 2:
                        return r = e.sent(), a(r), [2];
                    case 3:
                        return r = (null != s ? s : function (e) {
                            return e
                        })(t), this._safeExecuteTransactionWork(r, i).then(function (e) {
                            return n._handleTransactionWorkSuccess(e, t, u, a)
                        }).catch(function (e) {
                            return n._handleTransactionWorkFailure(e, t, a)
                        }), [2]
                }
            })
        })
    }, er.prototype._safeExecuteTransactionWork = function (e, t) {
        try {
            var r = t(e);
            return Promise.resolve(r)
        } catch (e) {
            return Promise.reject(e)
        }
    }, er.prototype._handleTransactionWorkSuccess = function (e, t, r, n) {
        t.isOpen() ? t.commit().then(function () {
            r(e)
        }).catch(function (e) {
            n(e)
        }) : r(e)
    }, er.prototype._handleTransactionWorkFailure = function (e, t, r) {
        t.isOpen() ? t.rollback().catch(function (e) {
        }).then(function () {
            return r(e)
        }).catch(r) : r(e)
    }, er.prototype._computeDelayWithJitter = function (e) {
        var t = e * this._jitterFactor, r = e - t, e = e + t;
        return Math.random() * (e - r) + r
    }, er.prototype._verifyAfterConstruction = function () {
        if (this._maxRetryTimeMs < 0) throw(0, $t.newError)("Max retry time should be >= 0: " + this._maxRetryTimeMs.toString());
        if (this._initialRetryDelayMs < 0) throw(0, $t.newError)("Initial retry delay should >= 0: " + this._initialRetryDelayMs.toString());
        if (this._multiplier < 1) throw(0, $t.newError)("Multiplier should be >= 1.0: " + this._multiplier.toString());
        if (this._jitterFactor < 0 || 1 < this._jitterFactor) throw(0, $t.newError)("Jitter factor should be in [0.0, 1.0]: " + this._jitterFactor.toFixed())
    }, w.TransactionExecutor = er;
    var rr, nr, E = {}, P = r && r.__extends || (rr = function (e, t) {
            return (rr = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
            })(e, t)
        }, function (e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

            function r() {
                this.constructor = e
            }

            rr(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
        }), or = (Object.defineProperty(E, "__esModule", {value: !0}), E.Logger = void 0, t), ir = "error", ur = "warn",
        ar = "info", sr = "debug", cr = ((lr = {})[ir] = 0, lr[ur] = 1, lr[ar] = 2, lr[sr] = 3, lr),
        lr = (fr.create = function (e) {
            return null != (null == e ? void 0 : e.logging) ? new fr(function (e) {
                if (null == (null == e ? void 0 : e.level)) return "info";
                var e = e.level, t = cr[e];
                if (null != t || 0 === t) return e;
                throw(0, or.newError)("Illegal logging level: ".concat(e, ". Supported levels are: ").concat(Object.keys(cr).toString()))
            }(e = e.logging), function (e) {
                if (null != (null == e ? void 0 : e.logger)) {
                    var t = e.logger;
                    if (null != t && "function" == typeof t) return t
                }
                throw(0, or.newError)("Illegal logger function: ".concat(null != (e = null == (t = null == e ? void 0 : e.logger) ? void 0 : t.toString()) ? e : "undefined"))
            }(e)) : this.noOp()
        }, fr.noOp = function () {
            return dr
        }, fr.prototype.isErrorEnabled = function () {
            return hr(this._level, ir)
        }, fr.prototype.error = function (e) {
            this.isErrorEnabled() && this._loggerFunction(ir, e)
        }, fr.prototype.isWarnEnabled = function () {
            return hr(this._level, ur)
        }, fr.prototype.warn = function (e) {
            this.isWarnEnabled() && this._loggerFunction(ur, e)
        }, fr.prototype.isInfoEnabled = function () {
            return hr(this._level, ar)
        }, fr.prototype.info = function (e) {
            this.isInfoEnabled() && this._loggerFunction(ar, e)
        }, fr.prototype.isDebugEnabled = function () {
            return hr(this._level, sr)
        }, fr.prototype.debug = function (e) {
            this.isDebugEnabled() && this._loggerFunction(sr, e)
        }, fr);

    function fr(e, t) {
        this._level = e, this._loggerFunction = t
    }

    function pr() {
        return nr.call(this, ar, function (e, t) {
        }) || this
    }

    E.Logger = lr, P(pr, nr = lr), pr.prototype.isErrorEnabled = function () {
        return !1
    }, pr.prototype.error = function (e) {
    }, pr.prototype.isWarnEnabled = function () {
        return !1
    }, pr.prototype.warn = function (e) {
    }, pr.prototype.isInfoEnabled = function () {
        return !1
    }, pr.prototype.info = function (e) {
    }, pr.prototype.isDebugEnabled = function () {
        return !1
    }, pr.prototype.debug = function (e) {
    };
    var dr = new pr;

    function hr(e, t) {
        return cr[e] >= cr[t]
    }

    var P = {}, br = r && r.__assign || function () {
            return (br = Object.assign || function (e) {
                for (var t, r = 1, n = arguments.length; r < n; r++) for (var o in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }).apply(this, arguments)
        }, yr = r && r.__read || function (e, t) {
            var r = "function" == typeof Symbol && e[Symbol.iterator];
            if (!r) return e;
            var n, o, i = r.call(e), u = [];
            try {
                for (; (void 0 === t || 0 < t--) && !(n = i.next()).done;) u.push(n.value)
            } catch (e) {
                o = {error: e}
            } finally {
                try {
                    n && !n.done && (r = i.return) && r.call(i)
                } finally {
                    if (o) throw o.error
                }
            }
            return u
        },
        _r = (Object.defineProperty(P, "__esModule", {value: !0}), P.Url = P.formatIPv6Address = P.formatIPv4Address = P.defaultPortForScheme = P.parseDatabaseUrl = void 0, u),
        vr = 7687, mr = 7474, gr = 7473, Or = function (e, t, r, n, o) {
            this.scheme = e, this.host = t, this.port = r, this.hostAndPort = n, this.query = o
        };

    function wr(e, t, r) {
        if ("" === (e = (null != e ? e : "").trim())) throw new Error("Illegal empty ".concat(t, " in URL query '").concat(r, "'"));
        return e
    }

    function Er(e) {
        var t = "[" === e.charAt(0), r = "]" === e.charAt(e.length - 1);
        if (t || r) {
            if (t && r) return e;
            throw new Error("Illegal IPv6 address ".concat(e))
        }
        return "[".concat(e, "]")
    }

    function Pr(e) {
        return "http" === e ? mr : "https" === e ? gr : vr
    }

    P.Url = Or, P.parseDatabaseUrl = function (e) {
        (0, _r.assertString)(e, "URL");
        var t, r = function (e) {
            function u(e, t) {
                t = e.indexOf(t);
                return 0 <= t ? [e.substring(0, t), e[t], e.substring(t + 1)] : [e, "", ""]
            }

            function t(e) {
                var t, r = {},
                    n = ((t = "@") === (t = 0 <= (t = (o = e).lastIndexOf(t)) ? [o.substring(0, t), o[t], o.substring(t + 1)] : ["", "", o])[1] && (r.userInfo = decodeURIComponent(t[0]), e = t[2]), yr((o = "]", n = u(n = e, i = "["), [(i = u(n[2], o))[0], i[2]]), 2)),
                    o = n[0], i = n[1];
                return "" !== o ? (r.host = o, t = u(i, ":")) : (t = u(e, ":"), r.host = t[0]), ":" === t[1] && (r.port = t[2]), r
            }

            var r, n = {};
            ":" === (r = u(e, ":"))[1] && (n.scheme = decodeURIComponent(r[0]), e = r[2]);
            "#" === (r = u(e, "#"))[1] && (n.fragment = decodeURIComponent(r[2]), e = r[0]);
            "?" === (r = u(e, "?"))[1] && (n.query = r[2], e = r[0]);
            e.startsWith("//") ? (r = u(e.substr(2), "/"), (n = br(br({}, n), t(r[0]))).path = r[1] + r[2]) : n.path = e;
            return n
        }((n = (n = (n = e).trim()).includes("://") ? {schemeMissing: !1, url: n} : {
            schemeMissing: !0,
            url: "none://".concat(n)
        }).url), n = n.schemeMissing ? null : function (e) {
            if (null == e) return null;
            ":" === (e = e.trim()).charAt(e.length - 1) && (e = e.substring(0, e.length - 1));
            return e
        }(r.scheme), o = function (e) {
            if (null != e) return e.trim();
            throw new Error("Unable to extract host from null or undefined URL")
        }(r.host), i = function (e) {
            if ("" !== e && null != e) return e.includes(":") ? Er(e) : e;
            throw new Error("Illegal host ".concat(e))
        }(o), u = function (e, t) {
            e = "string" == typeof e ? parseInt(e, 10) : e;
            return null == e || isNaN(e) ? Pr(t) : e
        }(r.port, n), i = "".concat(i, ":").concat(u), r = function (e, r) {
            var e = null != e ? function (e) {
                "?" === (null == (e = (null != e ? e : "").trim()) ? void 0 : e.charAt(0)) && (e = e.substring(1, e.length));
                return e
            }(e) : null, n = {};
            null != e && e.split("&").forEach(function (e) {
                e = e.split("=");
                if (2 !== e.length) throw new Error("Invalid parameters: '".concat(e.toString(), "' in URL '").concat(r, "'."));
                var t = wr(e[0], "key", r), e = wr(e[1], "value", r);
                if (void 0 !== n[t]) throw new Error("Duplicated query parameters with key '".concat(t, "' in URL '").concat(r, "'"));
                n[t] = e
            });
            return n
        }(null != (t = r.query) ? t : "string" == typeof (t = r.resourceName) ? yr(t.split("?"), 2)[1] : null, e);
        return new Or(n, o, u, i, r)
    }, P.formatIPv4Address = function (e, t) {
        return "".concat(e, ":").concat(t)
    }, P.formatIPv6Address = function (e, t) {
        return e = Er(e), "".concat(e, ":").concat(t)
    }, P.defaultPortForScheme = Pr;
    var lr = {}, Sr = r && r.__createBinding || (Object.create ? function (e, t, r, n) {
        void 0 === n && (n = r);
        var o = Object.getOwnPropertyDescriptor(t, r);
        o && ("get" in o ? t.__esModule : !o.writable && !o.configurable) || (o = {
            enumerable: !0, get: function () {
                return t[r]
            }
        }), Object.defineProperty(e, n, o)
    } : function (e, t, r, n) {
        e[n = void 0 === n ? r : n] = t[r]
    }), Tr = r && r.__setModuleDefault || (Object.create ? function (e, t) {
        Object.defineProperty(e, "default", {enumerable: !0, value: t})
    } : function (e, t) {
        e.default = t
    }), jr = r && r.__importStar || function (e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) "default" !== r && Object.prototype.hasOwnProperty.call(e, r) && Sr(t, e, r);
        return Tr(t, e), t
    }, Cr = (Object.defineProperty(lr, "__esModule", {value: !0}), lr.ServerAddress = void 0, u), Ir = jr(P);

    function Rr(e, t, r, n) {
        this._host = (0, Cr.assertString)(e, "host"), this._resolved = null != t ? (0, Cr.assertString)(t, "resolved") : null, this._port = (0, Cr.assertNumber)(r, "port"), this._hostPort = n, this._stringValue = null != t ? "".concat(n, "(").concat(t, ")") : "".concat(n)
    }

    Rr.prototype.host = function () {
        return this._host
    }, Rr.prototype.resolvedHost = function () {
        return null != this._resolved ? this._resolved : this._host
    }, Rr.prototype.port = function () {
        return this._port
    }, Rr.prototype.resolveWith = function (e) {
        return new Rr(this._host, e, this._port, this._hostPort)
    }, Rr.prototype.asHostPort = function () {
        return this._hostPort
    }, Rr.prototype.asKey = function () {
        return this._hostPort
    }, Rr.prototype.toString = function () {
        return this._stringValue
    }, Rr.fromUrl = function (e) {
        e = Ir.parseDatabaseUrl(e);
        return new Rr(e.host, null, e.port, e.hostAndPort)
    }, lr.ServerAddress = Rr;
    var jr = {}, kr = {};

    function Ar() {
    }

    Object.defineProperty(kr, "__esModule", {value: !0}), Ar.prototype.resolve = function () {
        throw new Error("Abstract function")
    }, Ar.prototype._resolveToItself = function (e) {
        return Promise.resolve([e])
    }, kr.default = Ar;
    var Mr = {}, xr = (Object.defineProperty(Mr, "__esModule", {value: !0}), lr);

    function Nr(e) {
        return Promise.resolve([e])
    }

    function Ur(e) {
        this._resolverFunction = null != e ? e : Nr
    }

    Ur.prototype.resolve = function (t) {
        var r = this;
        return new Promise(function (e) {
            return e(r._resolverFunction(t.asHostPort()))
        }).then(function (e) {
            if (Array.isArray(e)) return e.map(function (e) {
                return xr.ServerAddress.fromUrl(e)
            });
            throw new TypeError("Configured resolver function should either return an array of addresses or a Promise resolved with an array of addresses." + "Each address is '<host>:<port>'. Got: ".concat(e))
        })
    }, Mr.default = Ur;

    function Dr(e) {
        console.log("Uncaught error when processing result: " + e)
    }

    function Lr(e) {
    }

    function Br(e) {
    }

    var S = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        },
        kr = (Object.defineProperty(jr, "__esModule", {value: !0}), jr.ConfiguredCustomResolver = jr.BaseHostNameResolver = void 0, S(kr)),
        kr = (jr.BaseHostNameResolver = kr.default, S(Mr)),
        Fr = (jr.ConfiguredCustomResolver = kr.default, r && r.__createBinding || (Object.create ? function (e, t, r, n) {
            void 0 === n && (n = r);
            var o = Object.getOwnPropertyDescriptor(t, r);
            o && ("get" in o ? t.__esModule : !o.writable && !o.configurable) || (o = {
                enumerable: !0,
                get: function () {
                    return t[r]
                }
            }), Object.defineProperty(e, n, o)
        } : function (e, t, r, n) {
            e[n = void 0 === n ? r : n] = t[r]
        })), Wr = r && r.__setModuleDefault || (Object.create ? function (e, t) {
            Object.defineProperty(e, "default", {enumerable: !0, value: t})
        } : function (e, t) {
            e.default = t
        }), S = r && r.__importStar || function (e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e) for (var r in e) "default" !== r && Object.prototype.hasOwnProperty.call(e, r) && Fr(t, e, r);
            return Wr(t, e), t
        },
        kr = (Object.defineProperty(y, "__esModule", {value: !0}), y.objectUtil = y.resolver = y.serverAddress = y.urlUtil = y.logger = y.transactionExecutor = y.txConfig = y.connectionHolder = y.constants = y.bookmarks = y.observer = y.temporalUtil = y.util = void 0, S(u)),
        kr = (y.util = kr, S(o)), o = (y.temporalUtil = kr, S(_)), kr = (y.observer = o, S(v)),
        o = (y.bookmarks = kr, S(m)), kr = (y.constants = o, S(g)), o = (y.connectionHolder = kr, S(O)),
        kr = (y.txConfig = o, S(w)), o = (y.transactionExecutor = kr, S(E)), kr = (y.logger = o, S(P)),
        o = (y.urlUtil = kr, S(lr)), P = (y.serverAddress = o, S(jr)), kr = (y.resolver = P, S(s)),
        zr = (y.objectUtil = kr, r && r.__awaiter || function (e, u, a, s) {
            return new (a = a || Promise)(function (r, t) {
                function n(e) {
                    try {
                        i(s.next(e))
                    } catch (e) {
                        t(e)
                    }
                }

                function o(e) {
                    try {
                        i(s.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }

                function i(e) {
                    var t;
                    e.done ? r(e.value) : ((t = e.value) instanceof a ? t : new a(function (e) {
                        e(t)
                    })).then(n, o)
                }

                i((s = s.apply(e, u || [])).next())
            })
        }), qr = r && r.__generator || function (n, o) {
            var i, u, a, s = {
                label: 0, sent: function () {
                    if (1 & a[0]) throw a[1];
                    return a[1]
                }, trys: [], ops: []
            }, c = {next: e(0), throw: e(1), return: e(2)};
            return "function" == typeof Symbol && (c[Symbol.iterator] = function () {
                return this
            }), c;

            function e(r) {
                return function (e) {
                    var t = [r, e];
                    if (i) throw new TypeError("Generator is already executing.");
                    for (; s = c && t[c = 0] ? 0 : s;) try {
                        if (i = 1, u && (a = 2 & t[0] ? u.return : t[0] ? u.throw || ((a = u.return) && a.call(u), 0) : u.next) && !(a = a.call(u, t[1])).done) return a;
                        switch (u = 0, (t = a ? [2 & t[0], a.value] : t)[0]) {
                            case 0:
                            case 1:
                                a = t;
                                break;
                            case 4:
                                return s.label++, {value: t[1], done: !1};
                            case 5:
                                s.label++, u = t[1], t = [0];
                                continue;
                            case 7:
                                t = s.ops.pop(), s.trys.pop();
                                continue;
                            default:
                                if (!(a = 0 < (a = s.trys).length && a[a.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                    s = 0;
                                    continue
                                }
                                if (3 === t[0] && (!a || t[1] > a[0] && t[1] < a[3])) {
                                    s.label = t[1];
                                    break
                                }
                                if (6 === t[0] && s.label < a[1]) {
                                    s.label = a[1], a = t;
                                    break
                                }
                                if (a && s.label < a[2]) {
                                    s.label = a[2], s.ops.push(t);
                                    break
                                }
                                a[2] && s.ops.pop(), s.trys.pop();
                                continue
                        }
                        t = o.call(n, s)
                    } catch (e) {
                        t = [6, e], u = 0
                    } finally {
                        i = a = 0
                    }
                    if (5 & t[0]) throw t[1];
                    return {value: t[0] ? t[1] : void 0, done: !0}
                }
            }
        }, lr = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        }, Vr = (Object.defineProperty(st, "__esModule", {value: !0}), lr(b)), Hr = y, Yr = t,
        Kr = Hr.connectionHolder.EMPTY_CONNECTION_HOLDER;

    function Gr(e, t, r, n, o) {
        var i;
        void 0 === o && (o = {
            high: Number.MAX_VALUE,
            low: Number.MAX_VALUE
        }), this._stack = null == (i = new Error("")).stack ? null : i.stack.replace(/^Error(\n\r)*/, ""), this._streamObserverPromise = e, this._p = null, this._query = t, this._parameters = null != r ? r : {}, this._connectionHolder = null != n ? n : Kr, this._keys = null, this._summary = null, this._error = null, this._watermarks = o
    }

    Gr.prototype.keys = function () {
        var n = this;
        return null !== this._keys ? Promise.resolve(this._keys) : null !== this._error ? Promise.reject(this._error) : new Promise(function (t, r) {
            n._streamObserverPromise.then(function (e) {
                return e.subscribe(n._decorateObserver({
                    onKeys: function (e) {
                        return t(e)
                    }, onError: function (e) {
                        return r(e)
                    }
                }))
            }).catch(r)
        })
    }, Gr.prototype.summary = function () {
        var n = this;
        return null !== this._summary ? Promise.resolve(this._summary) : null !== this._error ? Promise.reject(this._error) : new Promise(function (t, r) {
            n._streamObserverPromise.then(function (e) {
                e.cancel(), e.subscribe(n._decorateObserver({
                    onCompleted: function (e) {
                        return t(e)
                    }, onError: function (e) {
                        return r(e)
                    }
                }))
            }).catch(r)
        })
    }, Gr.prototype._getOrCreatePromise = function () {
        var e = this;
        return null == this._p && (this._p = new Promise(function (t, r) {
            var n = [];
            e.subscribe({
                onNext: function (e) {
                    n.push(e)
                }, onCompleted: function (e) {
                    t({records: n, summary: e})
                }, onError: function (e) {
                    r(e)
                }
            })
        })), this._p
    }, Gr.prototype[Symbol.asyncIterator] = function () {
        var e, n = this;
        if (!this.isOpen()) return e = (0, Yr.newError)("Result is already consumed"), {
            next: function () {
                return Promise.reject(e)
            }, peek: function () {
                return Promise.reject(e)
            }
        };

        function o() {
            return zr(n, void 0, void 0, function () {
                var t;
                return qr(this, function (e) {
                    switch (e.label) {
                        case 0:
                            return void 0 !== u.queuedObserver ? [3, 2] : (u.queuedObserver = this._createQueuedResultObserver(r), t = u, [4, this._subscribe(u.queuedObserver, !0).catch(function () {
                            })]);
                        case 1:
                            t.streaming = e.sent(), r(), e.label = 2;
                        case 2:
                            return [2, u.queuedObserver]
                    }
                })
            })
        }

        function i(e) {
            if (void 0 === e) throw(0, Yr.newError)("InvalidState: Result stream finished without Summary", Yr.PROTOCOL_ERROR);
            return 1
        }

        var u = {paused: !0, firstRun: !0, finished: !1}, r = function () {
            var e, t;
            null != u.streaming && (e = (t = null != (t = null == (t = u.queuedObserver) ? void 0 : t.size) ? t : 0) >= n._watermarks.high, t = t <= n._watermarks.low, e && !u.paused ? (u.paused = !0, u.streaming.pause()) : (t && u.paused || u.firstRun && !e) && (u.firstRun = !1, u.paused = !1, u.streaming.resume()))
        };
        return {
            next: function () {
                return zr(n, void 0, void 0, function () {
                    var t;
                    return qr(this, function (e) {
                        switch (e.label) {
                            case 0:
                                return u.finished && i(u.summary) ? [2, {done: !0, value: u.summary}] : [4, o()];
                            case 1:
                                return [4, e.sent().dequeue()];
                            case 2:
                                return !0 === (t = e.sent()).done && (u.finished = t.done, u.summary = t.value), [2, t]
                        }
                    })
                })
            }, return: function (r) {
                return zr(n, void 0, void 0, function () {
                    var t;
                    return qr(this, function (e) {
                        switch (e.label) {
                            case 0:
                                return u.finished && i(u.summary) ? [2, {
                                    done: !0,
                                    value: null != r ? r : u.summary
                                }] : (null != (t = u.streaming) && t.cancel(), [4, o()]);
                            case 1:
                                return [4, e.sent().dequeueUntilDone()];
                            case 2:
                                return t = e.sent(), u.finished = !0, t.value = null != r ? r : t.value, u.summary = t.value, [2, t]
                        }
                    })
                })
            }, peek: function () {
                return zr(n, void 0, void 0, function () {
                    return qr(this, function (e) {
                        switch (e.label) {
                            case 0:
                                return u.finished && i(u.summary) ? [2, {done: !0, value: u.summary}] : [4, o()];
                            case 1:
                                return [4, e.sent().head()];
                            case 2:
                                return [2, e.sent()]
                        }
                    })
                })
            }
        }
    }, Gr.prototype.then = function (e, t) {
        return this._getOrCreatePromise().then(e, t)
    }, Gr.prototype.catch = function (e) {
        return this._getOrCreatePromise().catch(e)
    }, Gr.prototype.finally = function (e) {
        return this._getOrCreatePromise().finally(e)
    }, Gr.prototype.subscribe = function (e) {
        this._subscribe(e).catch(function () {
        })
    }, Gr.prototype.isOpen = function () {
        return null === this._summary && null === this._error
    }, Gr.prototype._subscribe = function (e, t) {
        void 0 === t && (t = !1);
        var r = this._decorateObserver(e);
        return this._streamObserverPromise.then(function (e) {
            return t && e.pause(), e.subscribe(r), e
        }).catch(function (e) {
            return null != r.onError && r.onError(e), Promise.reject(e)
        })
    }, Gr.prototype._decorateObserver = function (n) {
        var e, o = this, t = null != (e = n.onCompleted) ? e : Lr, i = null != (e = n.onError) ? e : Dr,
            r = null != (e = n.onKeys) ? e : Br;
        return {
            onNext: null != n.onNext ? n.onNext.bind(n) : void 0, onKeys: function (e) {
                return o._keys = e, r.call(n, e)
            }, onCompleted: function (e) {
                o._releaseConnectionAndGetSummary(e).then(function (e) {
                    return null !== o._summary ? t.call(n, o._summary) : (o._summary = e, t.call(n, e))
                }).catch(i)
            }, onError: function (r) {
                o._connectionHolder.releaseConnection().then(function () {
                    var e, t;
                    e = r, null != (t = o._stack) && (e.stack = e.toString() + "\n" + t), o._error = r, i.call(n, r)
                }).catch(i)
            }
        }
    }, Gr.prototype._cancel = function () {
        null === this._summary && null === this._error && this._streamObserverPromise.then(function (e) {
            return e.cancel()
        }).catch(function () {
        })
    }, Gr.prototype._releaseConnectionAndGetSummary = function (t) {
        var e = Hr.util.validateQueryAndParameters(this._query, this._parameters, {skipAsserts: !0}),
            r = e.validatedQuery, n = e.params, o = this._connectionHolder;
        return o.getConnection().then(function (t) {
            return o.releaseConnection().then(function () {
                var e;
                return null == (e = null == t ? void 0 : t.protocol()) ? void 0 : e.version
            })
        }, function (e) {
        }).then(function (e) {
            return new Vr.default(r, n, t, e)
        })
    }, Gr.prototype._createQueuedResultObserver = function (n) {
        var e = this;

        function o() {
            var r = {};
            return r.promise = new Promise(function (e, t) {
                r.resolve = e, r.reject = t
            }), r
        }

        function i(e) {
            return e instanceof Error
        }

        function r() {
            var r;
            return zr(this, void 0, void 0, function () {
                var t;
                return qr(this, function (e) {
                    switch (e.label) {
                        case 0:
                            if (0 < u.length) {
                                if (t = null != (r = u.shift()) ? r : (0, Yr.newError)("Unexpected empty buffer", Yr.PROTOCOL_ERROR), n(), i(t)) throw t;
                                return [2, t]
                            }
                            return a.resolvable = o(), [4, a.resolvable.promise];
                        case 1:
                            return [2, e.sent()]
                    }
                })
            })
        }

        var u = [], a = {resolvable: null}, t = {
            onNext: function (e) {
                t._push({done: !1, value: e})
            }, onCompleted: function (e) {
                t._push({done: !0, value: e})
            }, onError: function (e) {
                t._push(e)
            }, _push: function (e) {
                var t;
                null !== a.resolvable ? (t = a.resolvable, a.resolvable = null, i(e) ? t.reject(e) : t.resolve(e)) : (u.push(e), n())
            }, dequeue: r, dequeueUntilDone: function () {
                return zr(e, void 0, void 0, function () {
                    var t;
                    return qr(this, function (e) {
                        switch (e.label) {
                            case 0:
                                return [4, r()];
                            case 1:
                                return !0 === (t = e.sent()).done ? [2, t] : [3, 0];
                            case 2:
                                return [2]
                        }
                    })
                })
            }, head: function () {
                return zr(e, void 0, void 0, function () {
                    var t, r;
                    return qr(this, function (e) {
                        switch (e.label) {
                            case 0:
                                if (0 < u.length) {
                                    if (i(t = u[0])) throw t;
                                    return [2, t]
                                }
                                a.resolvable = o(), e.label = 1;
                            case 1:
                                return e.trys.push([1, 3, 4, 5]), [4, a.resolvable.promise];
                            case 2:
                                return t = e.sent(), u.unshift(t), [2, t];
                            case 3:
                                throw r = e.sent(), u.unshift(r), r;
                            case 4:
                                return n(), [7];
                            case 5:
                                return [2]
                        }
                    })
                })
            }, get size() {
                return u.length
            }
        };
        return t
    }, st.default = Gr;
    o = {};
    Object.defineProperty(o, "__esModule", {value: !0});
    o.default = function (e, t, r) {
        this.keys = e, this.records = t, this.summary = r
    };
    jr = {};

    function Zr() {
    }

    Object.defineProperty(jr, "__esModule", {value: !0}), Zr.prototype.acquireConnection = function (e) {
        throw Error("Not implemented")
    }, Zr.prototype.supportsMultiDb = function () {
        throw Error("Not implemented")
    }, Zr.prototype.supportsTransactionConfig = function () {
        throw Error("Not implemented")
    }, Zr.prototype.supportsUserImpersonation = function () {
        throw Error("Not implemented")
    }, Zr.prototype.verifyConnectivityAndGetServerInfo = function (e) {
        throw Error("Not implemented")
    }, Zr.prototype.getNegotiatedProtocolVersion = function () {
        throw Error("Not Implemented")
    }, Zr.prototype.close = function () {
        throw Error("Not implemented")
    }, jr.default = Zr;
    P = {};

    function Qr() {
    }

    Object.defineProperty(P, "__esModule", {value: !0}), Object.defineProperty(Qr.prototype, "id", {
        get: function () {
            return ""
        }, enumerable: !1, configurable: !0
    }), Object.defineProperty(Qr.prototype, "databaseId", {
        get: function () {
            return ""
        }, enumerable: !1, configurable: !0
    }), Object.defineProperty(Qr.prototype, "server", {
        get: function () {
            return {}
        }, enumerable: !1, configurable: !0
    }), Object.defineProperty(Qr.prototype, "address", {
        get: function () {
        }, enumerable: !1, configurable: !0
    }), Object.defineProperty(Qr.prototype, "version", {
        get: function () {
        }, enumerable: !1, configurable: !0
    }), Qr.prototype.isOpen = function () {
        return !1
    }, Qr.prototype.protocol = function () {
        throw Error("Not implemented")
    }, Qr.prototype.connect = function (e, t) {
        throw Error("Not implemented")
    }, Qr.prototype.write = function (e, t, r) {
        throw Error("Not implemented")
    }, Qr.prototype.resetAndFlush = function () {
        throw Error("Not implemented")
    }, Qr.prototype.hasOngoingObservableRequests = function () {
        throw Error("Not implemented")
    }, Qr.prototype.close = function () {
        throw Error("Not implemented")
    }, Qr.prototype._release = function () {
        return Promise.resolve()
    }, P.default = Qr;
    var S = {}, Xr = r && r.__awaiter || function (e, u, a, s) {
            return new (a = a || Promise)(function (r, t) {
                function n(e) {
                    try {
                        i(s.next(e))
                    } catch (e) {
                        t(e)
                    }
                }

                function o(e) {
                    try {
                        i(s.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }

                function i(e) {
                    var t;
                    e.done ? r(e.value) : ((t = e.value) instanceof a ? t : new a(function (e) {
                        e(t)
                    })).then(n, o)
                }

                i((s = s.apply(e, u || [])).next())
            })
        }, Jr = r && r.__generator || function (n, o) {
            var i, u, a, s = {
                label: 0, sent: function () {
                    if (1 & a[0]) throw a[1];
                    return a[1]
                }, trys: [], ops: []
            }, c = {next: e(0), throw: e(1), return: e(2)};
            return "function" == typeof Symbol && (c[Symbol.iterator] = function () {
                return this
            }), c;

            function e(r) {
                return function (e) {
                    var t = [r, e];
                    if (i) throw new TypeError("Generator is already executing.");
                    for (; s = c && t[c = 0] ? 0 : s;) try {
                        if (i = 1, u && (a = 2 & t[0] ? u.return : t[0] ? u.throw || ((a = u.return) && a.call(u), 0) : u.next) && !(a = a.call(u, t[1])).done) return a;
                        switch (u = 0, (t = a ? [2 & t[0], a.value] : t)[0]) {
                            case 0:
                            case 1:
                                a = t;
                                break;
                            case 4:
                                return s.label++, {value: t[1], done: !1};
                            case 5:
                                s.label++, u = t[1], t = [0];
                                continue;
                            case 7:
                                t = s.ops.pop(), s.trys.pop();
                                continue;
                            default:
                                if (!(a = 0 < (a = s.trys).length && a[a.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                    s = 0;
                                    continue
                                }
                                if (3 === t[0] && (!a || t[1] > a[0] && t[1] < a[3])) {
                                    s.label = t[1];
                                    break
                                }
                                if (6 === t[0] && s.label < a[1]) {
                                    s.label = a[1], a = t;
                                    break
                                }
                                if (a && s.label < a[2]) {
                                    s.label = a[2], s.ops.push(t);
                                    break
                                }
                                a[2] && s.ops.pop(), s.trys.pop();
                                continue
                        }
                        t = o.call(n, s)
                    } catch (e) {
                        t = [6, e], u = 0
                    } finally {
                        i = a = 0
                    }
                    if (5 & t[0]) throw t[1];
                    return {value: t[0] ? t[1] : void 0, done: !0}
                }
            }
        }, s = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        }, $r = (Object.defineProperty(S, "__esModule", {value: !0}), u), en = g, tn = v, rn = O, nn = _, on = t,
        un = s(st);

    function an(e) {
        var t = e.connectionHolder, r = e.onClose, n = e.onBookmarks, o = e.onConnection, i = e.reactive,
            u = e.fetchSize, a = e.impersonatedUser, s = e.highRecordWatermark, e = e.lowRecordWatermark, c = this;
        this._connectionHolder = t, this._reactive = i, this._state = sn.ACTIVE, this._onClose = r, this._onBookmarks = n, this._onConnection = o, this._onError = this._onErrorCallback.bind(this), this._fetchSize = u, this._onComplete = this._onCompleteCallback.bind(this), this._results = [], this._impersonatedUser = a, this._lowRecordWatermak = e, this._highRecordWatermark = s, this._bookmarks = tn.Bookmarks.empty(), this._acceptActive = function () {
        }, this._activePromise = new Promise(function (e, t) {
            c._acceptActive = e
        })
    }

    an.prototype._begin = function (o, i, u) {
        var t = this;
        this._connectionHolder.getConnection().then(function (n) {
            return Xr(t, void 0, void 0, function () {
                var t, r = this;
                return Jr(this, function (e) {
                    switch (e.label) {
                        case 0:
                            return (this._onConnection(), null == n) ? [3, 2] : (t = this, [4, o()]);
                        case 1:
                            return t._bookmarks = e.sent(), [2, n.protocol().beginTransaction({
                                bookmarks: this._bookmarks,
                                txConfig: i,
                                mode: this._connectionHolder.mode(),
                                database: this._connectionHolder.database(),
                                impersonatedUser: this._impersonatedUser,
                                beforeError: function (e) {
                                    return null != u && u.onError(e), r._onError(e)
                                },
                                afterComplete: function (e) {
                                    return null != u && u.onComplete(e), r._onComplete(e)
                                }
                            })];
                        case 2:
                            throw(0, on.newError)("No connection available")
                    }
                })
            })
        }).catch(function (e) {
            null != u && u.onError(e), t._onError(e).catch(function () {
            })
        }).finally(function () {
            return t._acceptActive()
        })
    }, an.prototype.run = function (e, t) {
        e = (0, $r.validateQueryAndParameters)(e, t), t = e.validatedQuery, e = e.params, t = this._state.run(t, e, {
            connectionHolder: this._connectionHolder,
            onError: this._onError,
            onComplete: this._onComplete,
            onConnection: this._onConnection,
            reactive: this._reactive,
            fetchSize: this._fetchSize,
            highRecordWatermark: this._highRecordWatermark,
            lowRecordWatermark: this._lowRecordWatermak,
            preparationJob: this._activePromise
        });
        return this._results.push(t), t
    }, an.prototype.commit = function () {
        var t = this, r = this._state.commit({
            connectionHolder: this._connectionHolder,
            onError: this._onError,
            onComplete: function (e) {
                return t._onCompleteCallback(e, t._bookmarks)
            },
            onConnection: this._onConnection,
            pendingResults: this._results,
            preparationJob: this._activePromise
        });
        return this._state = r.state, this._onClose(), new Promise(function (e, t) {
            r.result.subscribe({
                onCompleted: function () {
                    return e()
                }, onError: function (e) {
                    return t(e)
                }
            })
        })
    }, an.prototype.rollback = function () {
        var r = this._state.rollback({
            connectionHolder: this._connectionHolder,
            onError: this._onError,
            onComplete: this._onComplete,
            onConnection: this._onConnection,
            pendingResults: this._results,
            preparationJob: this._activePromise
        });
        return this._state = r.state, this._onClose(), new Promise(function (e, t) {
            r.result.subscribe({
                onCompleted: function () {
                    return e()
                }, onError: function (e) {
                    return t(e)
                }
            })
        })
    }, an.prototype.isOpen = function () {
        return this._state === sn.ACTIVE
    }, an.prototype.close = function () {
        return Xr(this, void 0, void 0, function () {
            return Jr(this, function (e) {
                switch (e.label) {
                    case 0:
                        return this.isOpen() ? [4, this.rollback()] : [3, 2];
                    case 1:
                        e.sent(), e.label = 2;
                    case 2:
                        return [2]
                }
            })
        })
    }, an.prototype._onErrorCallback = function () {
        return this._state = sn.FAILED, this._onClose(), this._connectionHolder.releaseConnection()
    }, an.prototype._onCompleteCallback = function (e, t) {
        this._onBookmarks(new tn.Bookmarks(null == e ? void 0 : e.bookmark), null != t ? t : tn.Bookmarks.empty(), null == e ? void 0 : e.db)
    };
    var sn = {
        ACTIVE: {
            commit: function (e) {
                return {
                    result: cn(!0, e.connectionHolder, e.onError, e.onComplete, e.onConnection, e.pendingResults, e.preparationJob),
                    state: sn.SUCCEEDED
                }
            }, rollback: function (e) {
                return {
                    result: cn(!1, e.connectionHolder, e.onError, e.onComplete, e.onConnection, e.pendingResults, e.preparationJob),
                    state: sn.ROLLED_BACK
                }
            }, run: function (t, r, e) {
                var n = e.connectionHolder, o = e.onError, i = e.onComplete, u = e.onConnection, a = e.reactive,
                    s = e.fetchSize, c = e.highRecordWatermark, l = e.lowRecordWatermark, e = e.preparationJob,
                    f = null != e ? e : Promise.resolve();
                return ln(n.getConnection().then(function (e) {
                    return f.then(function () {
                        return e
                    })
                }).then(function (e) {
                    if (u(), null != e) return e.protocol().run(t, r, {
                        bookmarks: tn.Bookmarks.empty(),
                        txConfig: rn.TxConfig.empty(),
                        beforeError: o,
                        afterComplete: i,
                        reactive: a,
                        fetchSize: s,
                        highRecordWatermark: c,
                        lowRecordWatermark: l
                    });
                    throw(0, on.newError)("No connection available")
                }).catch(function (e) {
                    return new nn.FailedObserver({error: e, onError: o})
                }), t, r, n, c, l)
            }
        }, FAILED: {
            commit: function (e) {
                var t = e.connectionHolder, r = e.onError;
                return e.onComplete, {
                    result: ln(new nn.FailedObserver({
                        error: (0, on.newError)("Cannot commit this transaction, because it has been rolled back either because of an error or explicit termination."),
                        onError: r
                    }), "COMMIT", {}, t, 0, 0), state: sn.FAILED
                }
            }, rollback: function (e) {
                var t = e.connectionHolder;
                return e.onError, e.onComplete, {
                    result: ln(new nn.CompletedObserver, "ROLLBACK", {}, t, 0, 0),
                    state: sn.FAILED
                }
            }, run: function (e, t, r) {
                var n = r.connectionHolder, o = r.onError;
                return r.onComplete, ln(new nn.FailedObserver({
                    error: (0, on.newError)("Cannot run query in this transaction, because it has been rolled back either because of an error or explicit termination."),
                    onError: o
                }), e, t, n, 0, 0)
            }
        }, SUCCEEDED: {
            commit: function (e) {
                var t = e.connectionHolder, r = e.onError;
                return e.onComplete, {
                    result: ln(new nn.FailedObserver({
                        error: (0, on.newError)("Cannot commit this transaction, because it has already been committed."),
                        onError: r
                    }), "COMMIT", {}, en.EMPTY_CONNECTION_HOLDER, 0, 0), state: sn.SUCCEEDED, connectionHolder: t
                }
            }, rollback: function (e) {
                var t = e.connectionHolder, r = e.onError;
                return e.onComplete, {
                    result: ln(new nn.FailedObserver({
                        error: (0, on.newError)("Cannot rollback this transaction, because it has already been committed."),
                        onError: r
                    }), "ROLLBACK", {}, en.EMPTY_CONNECTION_HOLDER, 0, 0), state: sn.SUCCEEDED, connectionHolder: t
                }
            }, run: function (e, t, r) {
                var n = r.connectionHolder, o = r.onError;
                return r.onComplete, ln(new nn.FailedObserver({
                    error: (0, on.newError)("Cannot run query in this transaction, because it has already been committed."),
                    onError: o
                }), e, t, n, 0, 0)
            }
        }, ROLLED_BACK: {
            commit: function (e) {
                var t = e.connectionHolder, r = e.onError;
                return e.onComplete, {
                    result: ln(new nn.FailedObserver({
                        error: (0, on.newError)("Cannot commit this transaction, because it has already been rolled back."),
                        onError: r
                    }), "COMMIT", {}, t, 0, 0), state: sn.ROLLED_BACK
                }
            }, rollback: function (e) {
                var t = e.connectionHolder;
                return e.onError, e.onComplete, {
                    result: ln(new nn.FailedObserver({error: (0, on.newError)("Cannot rollback this transaction, because it has already been rolled back.")}), "ROLLBACK", {}, t, 0, 0),
                    state: sn.ROLLED_BACK
                }
            }, run: function (e, t, r) {
                var n = r.connectionHolder, o = r.onError;
                return r.onComplete, ln(new nn.FailedObserver({
                    error: (0, on.newError)("Cannot run query in this transaction, because it has already been rolled back."),
                    onError: o
                }), e, t, n, 0, 0)
            }
        }
    };

    function cn(r, e, n, o, i, u, t) {
        var a = null != t ? t : Promise.resolve(), t = e.getConnection().then(function (e) {
            return a.then(function () {
                return e
            })
        }).then(function (t) {
            return i(), u.forEach(function (e) {
                return e._cancel()
            }), Promise.all(u.map(function (e) {
                return e.summary()
            })).then(function (e) {
                if (null != t) return r ? t.protocol().commitTransaction({
                    beforeError: n,
                    afterComplete: o
                }) : t.protocol().rollbackTransaction({beforeError: n, afterComplete: o});
                throw(0, on.newError)("No connection available")
            })
        }).catch(function (e) {
            return new nn.FailedObserver({error: e, onError: n})
        });
        return new un.default(t, r ? "COMMIT" : "ROLLBACK", {}, e, {high: Number.MAX_VALUE, low: Number.MAX_VALUE})
    }

    function ln(e, t, r, n, o, i) {
        return void 0 === n && (n = en.EMPTY_CONNECTION_HOLDER), new un.default(Promise.resolve(e), t, r, new en.ReadOnlyConnectionHolder(null != n ? n : en.EMPTY_CONNECTION_HOLDER), {
            low: i,
            high: o
        })
    }

    S.default = an;
    kr = {};

    function fn(e) {
        e = e.run;
        this._run = e
    }

    Object.defineProperty(kr, "__esModule", {value: !0}), fn.fromTransaction = function (e) {
        return new fn({run: e.run.bind(e)})
    }, fn.prototype.run = function (e, t) {
        return this._run(e, t)
    }, kr.default = fn;
    var pn, dn, hn, lr = {}, s = r && r.__extends || (pn = function (e, t) {
            return (pn = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
            })(e, t)
        }, function (e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

            function r() {
                this.constructor = e
            }

            pn(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
        }), bn = r && r.__assign || function () {
            return (bn = Object.assign || function (e) {
                for (var t, r = 1, n = arguments.length; r < n; r++) for (var o in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }).apply(this, arguments)
        }, yn = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        }, yn = (Object.defineProperty(lr, "__esModule", {value: !0}), yn(S)),
        yn = (hn = yn.default, s(_n, hn), _n.prototype.then = function (e, t) {
            return this._getOrCreateBeginPromise().then(e, t)
        }, _n.prototype.catch = function (e) {
            return this._getOrCreateBeginPromise().catch(e)
        }, _n.prototype.finally = function (e) {
            return this._getOrCreateBeginPromise().finally(e)
        }, _n.prototype._getOrCreateBeginPromise = function () {
            var r = this;
            return null == this._beginPromise && (this._beginPromise = new Promise(function (e, t) {
                r._resolve = e, r._reject = t, null != r._beginError && t(r._beginError), null != r._beginMetadata && e(r._toTransaction())
            })), this._beginPromise
        }, _n.prototype._toTransaction = function () {
            return bn(bn({}, this), {
                run: hn.prototype.run.bind(this),
                commit: hn.prototype.commit.bind(this),
                rollback: hn.prototype.rollback.bind(this),
                close: hn.prototype.close.bind(this),
                isOpen: hn.prototype.isOpen.bind(this),
                _begin: this._begin.bind(this)
            })
        }, _n.prototype._begin = function (e, t) {
            return hn.prototype._begin.call(this, e, t, {
                onError: this._onBeginError.bind(this),
                onComplete: this._onBeginMetadata.bind(this)
            })
        }, _n.prototype._onBeginError = function (e) {
            this._beginError = e, null != this._reject && this._reject(e)
        }, _n.prototype._onBeginMetadata = function (e) {
            this._beginMetadata = null != e ? e : {}, null != this._resolve && this._resolve(this._toTransaction())
        }, _n);

    function _n(e) {
        var t = e.connectionHolder, r = e.onClose, n = e.onBookmarks, o = e.onConnection, i = e.reactive,
            u = e.fetchSize, a = e.impersonatedUser, s = e.highRecordWatermark, e = e.lowRecordWatermark,
            t = hn.call(this, {
                connectionHolder: t,
                onClose: r,
                onBookmarks: n,
                onConnection: o,
                reactive: i,
                fetchSize: u,
                impersonatedUser: a,
                highRecordWatermark: s,
                lowRecordWatermark: e
            }) || this;
        return t[dn] = "TransactionPromise", t
    }

    dn = Symbol.toStringTag, lr.default = yn;
    var s = {}, vn = r && r.__awaiter || function (e, u, a, s) {
            return new (a = a || Promise)(function (r, t) {
                function n(e) {
                    try {
                        i(s.next(e))
                    } catch (e) {
                        t(e)
                    }
                }

                function o(e) {
                    try {
                        i(s.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }

                function i(e) {
                    var t;
                    e.done ? r(e.value) : ((t = e.value) instanceof a ? t : new a(function (e) {
                        e(t)
                    })).then(n, o)
                }

                i((s = s.apply(e, u || [])).next())
            })
        }, mn = r && r.__generator || function (n, o) {
            var i, u, a, s = {
                label: 0, sent: function () {
                    if (1 & a[0]) throw a[1];
                    return a[1]
                }, trys: [], ops: []
            }, c = {next: e(0), throw: e(1), return: e(2)};
            return "function" == typeof Symbol && (c[Symbol.iterator] = function () {
                return this
            }), c;

            function e(r) {
                return function (e) {
                    var t = [r, e];
                    if (i) throw new TypeError("Generator is already executing.");
                    for (; s = c && t[c = 0] ? 0 : s;) try {
                        if (i = 1, u && (a = 2 & t[0] ? u.return : t[0] ? u.throw || ((a = u.return) && a.call(u), 0) : u.next) && !(a = a.call(u, t[1])).done) return a;
                        switch (u = 0, (t = a ? [2 & t[0], a.value] : t)[0]) {
                            case 0:
                            case 1:
                                a = t;
                                break;
                            case 4:
                                return s.label++, {value: t[1], done: !1};
                            case 5:
                                s.label++, u = t[1], t = [0];
                                continue;
                            case 7:
                                t = s.ops.pop(), s.trys.pop();
                                continue;
                            default:
                                if (!(a = 0 < (a = s.trys).length && a[a.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                    s = 0;
                                    continue
                                }
                                if (3 === t[0] && (!a || t[1] > a[0] && t[1] < a[3])) {
                                    s.label = t[1];
                                    break
                                }
                                if (6 === t[0] && s.label < a[1]) {
                                    s.label = a[1], a = t;
                                    break
                                }
                                if (a && s.label < a[2]) {
                                    s.label = a[2], s.ops.push(t);
                                    break
                                }
                                a[2] && s.ops.pop(), s.trys.pop();
                                continue
                        }
                        t = o.call(n, s)
                    } catch (e) {
                        t = [6, e], u = 0
                    } finally {
                        i = a = 0
                    }
                    if (5 & t[0]) throw t[1];
                    return {value: t[0] ? t[1] : void 0, done: !0}
                }
            }
        }, gn = r && r.__read || function (e, t) {
            var r = "function" == typeof Symbol && e[Symbol.iterator];
            if (!r) return e;
            var n, o, i = r.call(e), u = [];
            try {
                for (; (void 0 === t || 0 < t--) && !(n = i.next()).done;) u.push(n.value)
            } catch (e) {
                o = {error: e}
            } finally {
                try {
                    n && !n.done && (r = i.return) && r.call(i)
                } finally {
                    if (o) throw o.error
                }
            }
            return u
        }, On = r && r.__spreadArray || function (e, t, r) {
            if (r || 2 === arguments.length) for (var n, o = 0, i = t.length; o < i; o++) !n && o in t || ((n = n || Array.prototype.slice.call(t, 0, o))[o] = t[o]);
            return e.concat(n || Array.prototype.slice.call(t))
        }, yn = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        }, wn = (Object.defineProperty(s, "__esModule", {value: !0}), _), En = u, Pn = m, Sn = t, Tn = yn(st), jn = g,
        Cn = w, In = v, Rn = O, kn = yn(lr), An = yn(kr);

    function Mn(e) {
        var t = e.mode, r = e.connectionProvider, n = e.bookmarks, o = e.database, i = e.config, u = e.reactive,
            a = e.fetchSize, s = e.impersonatedUser, e = e.bookmarkManager,
            t = (this._mode = t, this._database = o, this._reactive = u, this._fetchSize = a, this._onDatabaseNameResolved = this._onDatabaseNameResolved.bind(this), this._getConnectionAcquistionBookmarks = this._getConnectionAcquistionBookmarks.bind(this), this._readConnectionHolder = new jn.ConnectionHolder({
                mode: Pn.ACCESS_MODE_READ,
                database: o,
                bookmarks: n,
                connectionProvider: r,
                impersonatedUser: s,
                onDatabaseNameResolved: this._onDatabaseNameResolved,
                getConnectionAcquistionBookmarks: this._getConnectionAcquistionBookmarks
            }), this._writeConnectionHolder = new jn.ConnectionHolder({
                mode: Pn.ACCESS_MODE_WRITE,
                database: o,
                bookmarks: n,
                connectionProvider: r,
                impersonatedUser: s,
                onDatabaseNameResolved: this._onDatabaseNameResolved,
                getConnectionAcquistionBookmarks: this._getConnectionAcquistionBookmarks
            }), this._open = !0, this._hasTx = !1, this._impersonatedUser = s, this._lastBookmarks = null != n ? n : In.Bookmarks.empty(), this._configuredBookmarks = this._lastBookmarks, this._transactionExecutor = function (e) {
                e = null != (e = null == e ? void 0 : e.maxTransactionRetryTime) ? e : null;
                return new Cn.TransactionExecutor(e)
            }(i), this._databaseNameResolved = "" !== this._database, this._calculateWatermaks());
        this._lowRecordWatermark = t.low, this._highRecordWatermark = t.high, this._results = [], this._bookmarkManager = e
    }

    Mn.prototype.run = function (e, t, r) {
        var o = this, e = (0, En.validateQueryAndParameters)(e, t), i = e.validatedQuery, u = e.params,
            a = null != r ? new Rn.TxConfig(r) : Rn.TxConfig.empty(), t = this._run(i, u, function (n) {
                return vn(o, void 0, void 0, function () {
                    var t, r = this;
                    return mn(this, function (e) {
                        switch (e.label) {
                            case 0:
                                return [4, this._bookmarks()];
                            case 1:
                                return t = e.sent(), this._assertSessionIsOpen(), [2, n.protocol().run(i, u, {
                                    bookmarks: t,
                                    txConfig: a,
                                    mode: this._mode,
                                    database: this._database,
                                    impersonatedUser: this._impersonatedUser,
                                    afterComplete: function (e) {
                                        return r._onCompleteCallback(e, t)
                                    },
                                    reactive: this._reactive,
                                    fetchSize: this._fetchSize,
                                    lowRecordWatermark: this._lowRecordWatermark,
                                    highRecordWatermark: this._highRecordWatermark
                                })]
                        }
                    })
                })
            });
        return this._results.push(t), t
    }, Mn.prototype._run = function (e, t, r) {
        var n = this._connectionHolderWithMode(this._mode),
            o = this._open ? !this._hasTx && n.initializeConnection() ? n.getConnection().then(function (e) {
                return r(e)
            }).catch(function (e) {
                return Promise.resolve(new wn.FailedObserver({error: e}))
            }) : Promise.resolve(new wn.FailedObserver({error: (0, Sn.newError)("Queries cannot be run directly on a session with an open transaction; either run from within the transaction or use a different session.")})) : Promise.resolve(new wn.FailedObserver({error: (0, Sn.newError)("Cannot run query in a closed session.")})),
            i = {high: this._highRecordWatermark, low: this._lowRecordWatermark};
        return new Tn.default(o, e, t, n, i)
    }, Mn.prototype._acquireConnection = function (t) {
        var e = this, r = this._connectionHolderWithMode(this._mode),
            n = this._open ? !this._hasTx && r.initializeConnection() ? r.getConnection().then(function (e) {
                return t(e)
            }).then(function (t) {
                return vn(e, void 0, void 0, function () {
                    return mn(this, function (e) {
                        switch (e.label) {
                            case 0:
                                return [4, r.releaseConnection()];
                            case 1:
                                return e.sent(), [2, t]
                        }
                    })
                })
            }) : Promise.reject((0, Sn.newError)("Queries cannot be run directly on a session with an open transaction; either run from within the transaction or use a different session.")) : Promise.reject((0, Sn.newError)("Cannot run query in a closed session."));
        return n
    }, Mn.prototype.beginTransaction = function (e) {
        var t = Rn.TxConfig.empty();
        return null != e && (t = new Rn.TxConfig(e)), this._beginTransaction(this._mode, t)
    }, Mn.prototype._beginTransaction = function (e, t) {
        var n = this;
        if (!this._open) throw(0, Sn.newError)("Cannot begin a transaction on a closed session.");
        if (this._hasTx) throw(0, Sn.newError)("You cannot begin a transaction on a session with an open transaction; either run from within the transaction or use a different session.");
        e = Mn._validateSessionMode(e), e = this._connectionHolderWithMode(e), e.initializeConnection(), this._hasTx = !0, e = new kn.default({
            connectionHolder: e,
            impersonatedUser: this._impersonatedUser,
            onClose: this._transactionClosed.bind(this),
            onBookmarks: function (e, t, r) {
                return n._updateBookmarks(e, t, r)
            },
            onConnection: this._assertSessionIsOpen.bind(this),
            reactive: this._reactive,
            fetchSize: this._fetchSize,
            lowRecordWatermark: this._lowRecordWatermark,
            highRecordWatermark: this._highRecordWatermark
        });
        return e._begin(function () {
            return n._bookmarks()
        }, t), e
    }, Mn.prototype._assertSessionIsOpen = function () {
        if (!this._open) throw(0, Sn.newError)("You cannot run more transactions on a closed session.")
    }, Mn.prototype._transactionClosed = function () {
        this._hasTx = !1
    }, Mn.prototype.lastBookmark = function () {
        return this.lastBookmarks()
    }, Mn.prototype.lastBookmarks = function () {
        return this._lastBookmarks.values()
    }, Mn.prototype._bookmarks = function () {
        var r;
        return vn(this, void 0, void 0, function () {
            var t;
            return mn(this, function (e) {
                switch (e.label) {
                    case 0:
                        return [4, null == (r = this._bookmarkManager) ? void 0 : r.getBookmarks()];
                    case 1:
                        return void 0 === (t = e.sent()) ? [2, this._lastBookmarks] : [2, new In.Bookmarks(On(On([], gn(t), !1), gn(this._configuredBookmarks), !1))]
                }
            })
        })
    }, Mn.prototype.readTransaction = function (e, t) {
        t = new Rn.TxConfig(t);
        return this._runTransaction(Pn.ACCESS_MODE_READ, t, e)
    }, Mn.prototype.writeTransaction = function (e, t) {
        t = new Rn.TxConfig(t);
        return this._runTransaction(Pn.ACCESS_MODE_WRITE, t, e)
    }, Mn.prototype._runTransaction = function (e, t, r) {
        var n = this;
        return this._transactionExecutor.execute(function () {
            return n._beginTransaction(e, t)
        }, r)
    }, Mn.prototype.executeRead = function (e, t) {
        t = new Rn.TxConfig(t);
        return this._executeInTransaction(Pn.ACCESS_MODE_READ, t, e)
    }, Mn.prototype.executeWrite = function (e, t) {
        t = new Rn.TxConfig(t);
        return this._executeInTransaction(Pn.ACCESS_MODE_WRITE, t, e)
    }, Mn.prototype._executeInTransaction = function (e, t, r) {
        var n = this;
        return this._transactionExecutor.execute(function () {
            return n._beginTransaction(e, t)
        }, r, An.default.fromTransaction)
    }, Mn.prototype._onDatabaseNameResolved = function (e) {
        this._databaseNameResolved || (this._database = e = null != e ? e : "", this._readConnectionHolder.setDatabase(e), this._writeConnectionHolder.setDatabase(e), this._databaseNameResolved = !0)
    }, Mn.prototype._getConnectionAcquistionBookmarks = function () {
        var r;
        return vn(this, void 0, void 0, function () {
            var t;
            return mn(this, function (e) {
                switch (e.label) {
                    case 0:
                        return [4, null == (r = this._bookmarkManager) ? void 0 : r.getBookmarks()];
                    case 1:
                        return void 0 === (t = e.sent()) ? [2, this._lastBookmarks] : [2, new In.Bookmarks(On(On([], gn(this._configuredBookmarks), !1), gn(t), !1))]
                }
            })
        })
    }, Mn.prototype._updateBookmarks = function (e, t, r) {
        var n;
        null == e || e.isEmpty() || (null != (n = this._bookmarkManager) && n.updateBookmarks(null != (n = null == t ? void 0 : t.values()) ? n : [], null != (t = null == e ? void 0 : e.values()) ? t : []), this._lastBookmarks = e, this._configuredBookmarks = In.Bookmarks.empty())
    }, Mn.prototype.close = function () {
        return vn(this, void 0, void 0, function () {
            return mn(this, function (e) {
                switch (e.label) {
                    case 0:
                        return this._open ? (this._open = !1, this._results.forEach(function (e) {
                            return e._cancel()
                        }), this._transactionExecutor.close(), [4, this._readConnectionHolder.close(this._hasTx)]) : [3, 3];
                    case 1:
                        return e.sent(), [4, this._writeConnectionHolder.close(this._hasTx)];
                    case 2:
                        e.sent(), e.label = 3;
                    case 3:
                        return [2]
                }
            })
        })
    }, Mn.prototype._connectionHolderWithMode = function (e) {
        if (e === Pn.ACCESS_MODE_READ) return this._readConnectionHolder;
        if (e === Pn.ACCESS_MODE_WRITE) return this._writeConnectionHolder;
        throw(0, Sn.newError)("Unknown access mode: " + e)
    }, Mn.prototype._onCompleteCallback = function (e, t) {
        this._updateBookmarks(new In.Bookmarks(e.bookmark), t, e.db)
    }, Mn.prototype._calculateWatermaks = function () {
        return this._fetchSize === Pn.FETCH_ALL ? {
            low: Number.MAX_VALUE,
            high: Number.MAX_VALUE
        } : {low: .3 * this._fetchSize, high: .7 * this._fetchSize}
    }, Mn._validateSessionMode = function (e) {
        e = null != e ? e : Pn.ACCESS_MODE_WRITE;
        if (e !== Pn.ACCESS_MODE_READ && e !== Pn.ACCESS_MODE_WRITE) throw(0, Sn.newError)("Illegal session mode " + e);
        return e
    }, s.default = Mn;
    var _ = {}, g = {}, xn = r && r.__awaiter || function (e, u, a, s) {
            return new (a = a || Promise)(function (r, t) {
                function n(e) {
                    try {
                        i(s.next(e))
                    } catch (e) {
                        t(e)
                    }
                }

                function o(e) {
                    try {
                        i(s.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }

                function i(e) {
                    var t;
                    e.done ? r(e.value) : ((t = e.value) instanceof a ? t : new a(function (e) {
                        e(t)
                    })).then(n, o)
                }

                i((s = s.apply(e, u || [])).next())
            })
        }, Nn = r && r.__generator || function (n, o) {
            var i, u, a, s = {
                label: 0, sent: function () {
                    if (1 & a[0]) throw a[1];
                    return a[1]
                }, trys: [], ops: []
            }, c = {next: e(0), throw: e(1), return: e(2)};
            return "function" == typeof Symbol && (c[Symbol.iterator] = function () {
                return this
            }), c;

            function e(r) {
                return function (e) {
                    var t = [r, e];
                    if (i) throw new TypeError("Generator is already executing.");
                    for (; s = c && t[c = 0] ? 0 : s;) try {
                        if (i = 1, u && (a = 2 & t[0] ? u.return : t[0] ? u.throw || ((a = u.return) && a.call(u), 0) : u.next) && !(a = a.call(u, t[1])).done) return a;
                        switch (u = 0, (t = a ? [2 & t[0], a.value] : t)[0]) {
                            case 0:
                            case 1:
                                a = t;
                                break;
                            case 4:
                                return s.label++, {value: t[1], done: !1};
                            case 5:
                                s.label++, u = t[1], t = [0];
                                continue;
                            case 7:
                                t = s.ops.pop(), s.trys.pop();
                                continue;
                            default:
                                if (!(a = 0 < (a = s.trys).length && a[a.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                    s = 0;
                                    continue
                                }
                                if (3 === t[0] && (!a || t[1] > a[0] && t[1] < a[3])) {
                                    s.label = t[1];
                                    break
                                }
                                if (6 === t[0] && s.label < a[1]) {
                                    s.label = a[1], a = t;
                                    break
                                }
                                if (a && s.label < a[2]) {
                                    s.label = a[2], s.ops.push(t);
                                    break
                                }
                                a[2] && s.ops.pop(), s.trys.pop();
                                continue
                        }
                        t = o.call(n, s)
                    } catch (e) {
                        t = [6, e], u = 0
                    } finally {
                        i = a = 0
                    }
                    if (5 & t[0]) throw t[1];
                    return {value: t[0] ? t[1] : void 0, done: !0}
                }
            }
        }, Un = r && r.__values || function (e) {
            var t = "function" == typeof Symbol && Symbol.iterator, r = t && e[t], n = 0;
            if (r) return r.call(e);
            if (e && "number" == typeof e.length) return {
                next: function () {
                    return {value: (e = e && n >= e.length ? void 0 : e) && e[n++], done: !e}
                }
            };
            throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
        }, Dn = r && r.__read || function (e, t) {
            var r = "function" == typeof Symbol && e[Symbol.iterator];
            if (!r) return e;
            var n, o, i = r.call(e), u = [];
            try {
                for (; (void 0 === t || 0 < t--) && !(n = i.next()).done;) u.push(n.value)
            } catch (e) {
                o = {error: e}
            } finally {
                try {
                    n && !n.done && (r = i.return) && r.call(i)
                } finally {
                    if (o) throw o.error
                }
            }
            return u
        }, Ln = r && r.__spreadArray || function (e, t, r) {
            if (r || 2 === arguments.length) for (var n, o = 0, i = t.length; o < i; o++) !n && o in t || ((n = n || Array.prototype.slice.call(t, 0, o))[o] = t[o]);
            return e.concat(n || Array.prototype.slice.call(t))
        },
        w = (Object.defineProperty(g, "__esModule", {value: !0}), g.bookmarkManager = void 0, Bn.prototype.updateBookmarks = function (e, t) {
            return xn(this, void 0, void 0, function () {
                return Nn(this, function (e) {
                    throw new Error("Not implemented")
                })
            })
        }, Bn.prototype.getBookmarks = function () {
            return xn(this, void 0, void 0, function () {
                return Nn(this, function (e) {
                    throw new Error("Not implemented")
                })
            })
        }, Bn);

    function Bn() {
        throw new Error("Not implemented")
    }

    g.default = w, g.bookmarkManager = function (e) {
        void 0 === e && (e = {});
        var t = new Set(e.initialBookmarks);
        return new Fn(t, e.bookmarksSupplier, e.bookmarksConsumer)
    };
    Wn.prototype.updateBookmarks = function (f, p) {
        return xn(this, void 0, void 0, function () {
            var t, r, n, o, i, u, a, s, c, l;
            return Nn(this, function (e) {
                switch (e.label) {
                    case 0:
                        t = this._bookmarks;
                        try {
                            for (r = Un(f), n = r.next(); !n.done; n = r.next()) u = n.value, t.delete(u)
                        } catch (e) {
                            a = {error: e}
                        } finally {
                            try {
                                n && !n.done && (s = r.return) && s.call(r)
                            } finally {
                                if (a) throw a.error
                            }
                        }
                        try {
                            for (o = Un(p), i = o.next(); !i.done; i = o.next()) u = i.value, t.add(u)
                        } catch (e) {
                            c = {error: e}
                        } finally {
                            try {
                                i && !i.done && (l = o.return) && l.call(o)
                            } finally {
                                if (c) throw c.error
                            }
                        }
                        return "function" != typeof this._bookmarksConsumer ? [3, 2] : [4, this._bookmarksConsumer(Ln([], Dn(t), !1))];
                    case 1:
                        e.sent(), e.label = 2;
                    case 2:
                        return [2]
                }
            })
        })
    }, Wn.prototype.getBookmarks = function () {
        var s;
        return xn(this, void 0, void 0, function () {
            var t, r, n, o, i, u, a;
            return Nn(this, function (e) {
                switch (e.label) {
                    case 0:
                        return t = new Set(this._bookmarks), "function" != typeof this._bookmarksSupplier ? [3, 2] : [4, this._bookmarksSupplier()];
                    case 1:
                        r = null != (s = e.sent()) ? s : [];
                        try {
                            for (n = Un(r), o = n.next(); !o.done; o = n.next()) i = o.value, t.add(i)
                        } catch (e) {
                            u = {error: e}
                        } finally {
                            try {
                                o && !o.done && (a = n.return) && a.call(n)
                            } finally {
                                if (u) throw u.error
                            }
                        }
                        e.label = 2;
                    case 2:
                        return [2, Ln([], Dn(t), !1)]
                }
            })
        })
    };
    var Fn = Wn;

    function Wn(e, t, r) {
        this._bookmarks = e, this._bookmarksSupplier = t, this._bookmarksConsumer = r
    }

    var O = {}, zn = r && r.__awaiter || function (e, u, a, s) {
        return new (a = a || Promise)(function (r, t) {
            function n(e) {
                try {
                    i(s.next(e))
                } catch (e) {
                    t(e)
                }
            }

            function o(e) {
                try {
                    i(s.throw(e))
                } catch (e) {
                    t(e)
                }
            }

            function i(e) {
                var t;
                e.done ? r(e.value) : ((t = e.value) instanceof a ? t : new a(function (e) {
                    e(t)
                })).then(n, o)
            }

            i((s = s.apply(e, u || [])).next())
        })
    }, qn = r && r.__generator || function (n, o) {
        var i, u, a, s = {
            label: 0, sent: function () {
                if (1 & a[0]) throw a[1];
                return a[1]
            }, trys: [], ops: []
        }, c = {next: e(0), throw: e(1), return: e(2)};
        return "function" == typeof Symbol && (c[Symbol.iterator] = function () {
            return this
        }), c;

        function e(r) {
            return function (e) {
                var t = [r, e];
                if (i) throw new TypeError("Generator is already executing.");
                for (; s = c && t[c = 0] ? 0 : s;) try {
                    if (i = 1, u && (a = 2 & t[0] ? u.return : t[0] ? u.throw || ((a = u.return) && a.call(u), 0) : u.next) && !(a = a.call(u, t[1])).done) return a;
                    switch (u = 0, (t = a ? [2 & t[0], a.value] : t)[0]) {
                        case 0:
                        case 1:
                            a = t;
                            break;
                        case 4:
                            return s.label++, {value: t[1], done: !1};
                        case 5:
                            s.label++, u = t[1], t = [0];
                            continue;
                        case 7:
                            t = s.ops.pop(), s.trys.pop();
                            continue;
                        default:
                            if (!(a = 0 < (a = s.trys).length && a[a.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                s = 0;
                                continue
                            }
                            if (3 === t[0] && (!a || t[1] > a[0] && t[1] < a[3])) {
                                s.label = t[1];
                                break
                            }
                            if (6 === t[0] && s.label < a[1]) {
                                s.label = a[1], a = t;
                                break
                            }
                            if (a && s.label < a[2]) {
                                s.label = a[2], s.ops.push(t);
                                break
                            }
                            a[2] && s.ops.pop(), s.trys.pop();
                            continue
                    }
                    t = o.call(n, s)
                } catch (e) {
                    t = [6, e], u = 0
                } finally {
                    i = a = 0
                }
                if (5 & t[0]) throw t[1];
                return {value: t[0] ? t[1] : void 0, done: !0}
            }
        }
    }, yn = r && r.__importDefault || function (e) {
        return e && e.__esModule ? e : {default: e}
    }, Vn = (Object.defineProperty(O, "__esModule", {value: !0}), yn(o)), Hn = t;

    function Yn(o) {
        return zn(this, void 0, void 0, function () {
            var t, r, n;
            return qn(this, function (e) {
                switch (e.label) {
                    case 0:
                        return [4, o];
                    case 1:
                        return r = e.sent(), t = r.summary, r = r.records, [4, o.keys()];
                    case 2:
                        return n = e.sent(), [2, new Vn.default(n, r, t)]
                }
            })
        })
    }

    function Kn() {
    }

    Kn.prototype.eagerResultTransformer = function () {
        return Yn
    }, Kn.prototype.mappedResultTransformer = function (i) {
        var e = this;
        if (null == i || null == i.collect && null == i.map) throw(0, Hn.newError)("Requires a map or/and a collect functions.");
        return function (o) {
            return zn(e, void 0, void 0, function () {
                return qn(this, function (e) {
                    switch (e.label) {
                        case 0:
                            return [4, new Promise(function (t, r) {
                                var n = {records: [], keys: []};
                                o.subscribe({
                                    onKeys: function (e) {
                                        n.keys = e
                                    }, onNext: function (e) {
                                        var t;
                                        null != i.map ? void 0 !== (t = i.map(e)) && n.records.push(t) : n.records.push(e)
                                    }, onCompleted: function (e) {
                                        null != i.collect ? t(i.collect(n.records, e, n.keys)) : (e = {
                                            records: n.records,
                                            summary: e,
                                            keys: n.keys
                                        }, t(e))
                                    }, onError: function (e) {
                                        r(e)
                                    }
                                })
                            })];
                        case 1:
                            return [2, e.sent()]
                    }
                })
            })
        }
    };
    var w = new Kn, yn = (Object.freeze(w), O.default = w, {}), Gn = r && r.__awaiter || function (e, u, a, s) {
        return new (a = a || Promise)(function (r, t) {
            function n(e) {
                try {
                    i(s.next(e))
                } catch (e) {
                    t(e)
                }
            }

            function o(e) {
                try {
                    i(s.throw(e))
                } catch (e) {
                    t(e)
                }
            }

            function i(e) {
                var t;
                e.done ? r(e.value) : ((t = e.value) instanceof a ? t : new a(function (e) {
                    e(t)
                })).then(n, o)
            }

            i((s = s.apply(e, u || [])).next())
        })
    }, Zn = r && r.__generator || function (n, o) {
        var i, u, a, s = {
            label: 0, sent: function () {
                if (1 & a[0]) throw a[1];
                return a[1]
            }, trys: [], ops: []
        }, c = {next: e(0), throw: e(1), return: e(2)};
        return "function" == typeof Symbol && (c[Symbol.iterator] = function () {
            return this
        }), c;

        function e(r) {
            return function (e) {
                var t = [r, e];
                if (i) throw new TypeError("Generator is already executing.");
                for (; s = c && t[c = 0] ? 0 : s;) try {
                    if (i = 1, u && (a = 2 & t[0] ? u.return : t[0] ? u.throw || ((a = u.return) && a.call(u), 0) : u.next) && !(a = a.call(u, t[1])).done) return a;
                    switch (u = 0, (t = a ? [2 & t[0], a.value] : t)[0]) {
                        case 0:
                        case 1:
                            a = t;
                            break;
                        case 4:
                            return s.label++, {value: t[1], done: !1};
                        case 5:
                            s.label++, u = t[1], t = [0];
                            continue;
                        case 7:
                            t = s.ops.pop(), s.trys.pop();
                            continue;
                        default:
                            if (!(a = 0 < (a = s.trys).length && a[a.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                s = 0;
                                continue
                            }
                            if (3 === t[0] && (!a || t[1] > a[0] && t[1] < a[3])) {
                                s.label = t[1];
                                break
                            }
                            if (6 === t[0] && s.label < a[1]) {
                                s.label = a[1], a = t;
                                break
                            }
                            if (a && s.label < a[2]) {
                                s.label = a[2], s.ops.push(t);
                                break
                            }
                            a[2] && s.ops.pop(), s.trys.pop();
                            continue
                    }
                    t = o.call(n, s)
                } catch (e) {
                    t = [6, e], u = 0
                } finally {
                    i = a = 0
                }
                if (5 & t[0]) throw t[1];
                return {value: t[0] ? t[1] : void 0, done: !0}
            }
        }
    };

    function Qn(e) {
        this._createSession = e
    }

    Object.defineProperty(yn, "__esModule", {value: !0}), Qn.prototype.execute = function (o, i, u) {
        return Gn(this, void 0, void 0, function () {
            var t, n = this;
            return Zn(this, function (e) {
                switch (e.label) {
                    case 0:
                        t = this._createSession({
                            database: o.database,
                            bookmarkManager: o.bookmarkManager,
                            impersonatedUser: o.impersonatedUser
                        }), e.label = 1;
                    case 1:
                        return e.trys.push([1, , 3, 5]), [4, ("READERS" === o.routing ? t.executeRead : t.executeWrite).bind(t)(function (r) {
                            return Gn(n, void 0, void 0, function () {
                                var t;
                                return Zn(this, function (e) {
                                    switch (e.label) {
                                        case 0:
                                            return t = r.run(i, u), [4, o.resultTransformer(t)];
                                        case 1:
                                            return [2, e.sent()]
                                    }
                                })
                            })
                        })];
                    case 2:
                        return [2, e.sent()];
                    case 3:
                        return [4, t.close()];
                    case 4:
                        return e.sent(), [7];
                    case 5:
                        return [2]
                }
            })
        })
    }, yn.default = Qn;

    function Xn() {
        this.routing = yo.WRITERS, this.resultTransformer = void 0, this.database = "", this.impersonatedUser = void 0, this.bookmarkManager = void 0
    }

    var Jn = r && r.__awaiter || function (e, u, a, s) {
            return new (a = a || Promise)(function (r, t) {
                function n(e) {
                    try {
                        i(s.next(e))
                    } catch (e) {
                        t(e)
                    }
                }

                function o(e) {
                    try {
                        i(s.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }

                function i(e) {
                    var t;
                    e.done ? r(e.value) : ((t = e.value) instanceof a ? t : new a(function (e) {
                        e(t)
                    })).then(n, o)
                }

                i((s = s.apply(e, u || [])).next())
            })
        }, $n = r && r.__generator || function (n, o) {
            var i, u, a, s = {
                label: 0, sent: function () {
                    if (1 & a[0]) throw a[1];
                    return a[1]
                }, trys: [], ops: []
            }, c = {next: e(0), throw: e(1), return: e(2)};
            return "function" == typeof Symbol && (c[Symbol.iterator] = function () {
                return this
            }), c;

            function e(r) {
                return function (e) {
                    var t = [r, e];
                    if (i) throw new TypeError("Generator is already executing.");
                    for (; s = c && t[c = 0] ? 0 : s;) try {
                        if (i = 1, u && (a = 2 & t[0] ? u.return : t[0] ? u.throw || ((a = u.return) && a.call(u), 0) : u.next) && !(a = a.call(u, t[1])).done) return a;
                        switch (u = 0, (t = a ? [2 & t[0], a.value] : t)[0]) {
                            case 0:
                            case 1:
                                a = t;
                                break;
                            case 4:
                                return s.label++, {value: t[1], done: !1};
                            case 5:
                                s.label++, u = t[1], t = [0];
                                continue;
                            case 7:
                                t = s.ops.pop(), s.trys.pop();
                                continue;
                            default:
                                if (!(a = 0 < (a = s.trys).length && a[a.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                    s = 0;
                                    continue
                                }
                                if (3 === t[0] && (!a || t[1] > a[0] && t[1] < a[3])) {
                                    s.label = t[1];
                                    break
                                }
                                if (6 === t[0] && s.label < a[1]) {
                                    s.label = a[1], a = t;
                                    break
                                }
                                if (a && s.label < a[2]) {
                                    s.label = a[2], s.ops.push(t);
                                    break
                                }
                                a[2] && s.ops.pop(), s.trys.pop();
                                continue
                        }
                        t = o.call(n, s)
                    } catch (e) {
                        t = [6, e], u = 0
                    } finally {
                        i = a = 0
                    }
                    if (5 & t[0]) throw t[1];
                    return {value: t[0] ? t[1] : void 0, done: !0}
                }
            }
        }, w = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        },
        eo = (Object.defineProperty(_, "__esModule", {value: !0}), _.QueryConfig = _.SessionConfig = _.routing = _.WRITE = _.READ = _.Driver = void 0, v),
        to = w(Mr), ro = m, no = E, oo = w(s), io = u, uo = g, ao = w(O), so = w(yn), co = t, lo = 36e5, fo = 1e3,
        po = ro.ACCESS_MODE_READ, ho = (_.READ = po, ro.ACCESS_MODE_WRITE), bo = (_.WRITE = ho, 0),
        yo = (_.SessionConfig = function () {
            this.defaultAccessMode = ho, this.bookmarks = [], this.database = "", this.impersonatedUser = void 0, this.fetchSize = void 0, this.bookmarkManager = void 0
        }, {WRITERS: "WRITERS", READERS: "READERS"}),
        v = (_.routing = yo, Object.freeze(yo), _.QueryConfig = Xn, Object.defineProperty(_o.prototype, "defaultExecuteQueryBookmarkManager", {
            get: function () {
                return this._defaultExecuteQueryBookmarkManager
            }, enumerable: !1, configurable: !0
        }), _o.prototype.executeQuery = function (o, i, u) {
            var a, s;
            return void 0 === u && (u = {}), Jn(this, void 0, void 0, function () {
                var t, r, n;
                return $n(this, function (e) {
                    switch (e.label) {
                        case 0:
                            if (t = null === u.bookmarkManager ? void 0 : null != (a = u.bookmarkManager) ? a : this.defaultExecuteQueryBookmarkManager, r = null != (a = u.resultTransformer) ? a : ao.default.eagerResultTransformer(), (n = null != (s = u.routing) ? s : yo.WRITERS) !== yo.READERS && n !== yo.WRITERS) throw(0, co.newError)('Illegal query routing config: "'.concat(n, '"'));
                            return [4, this._queryExecutor.execute({
                                resultTransformer: r,
                                bookmarkManager: t,
                                routing: n,
                                database: u.database,
                                impersonatedUser: u.impersonatedUser
                            }, o, i)];
                        case 1:
                            return [2, e.sent()]
                    }
                })
            })
        }, _o.prototype.verifyConnectivity = function (e) {
            e = (void 0 === e ? {} : e).database, e = void 0 === e ? "" : e;
            return this._getOrCreateConnectionProvider().verifyConnectivityAndGetServerInfo({
                database: e,
                accessMode: po
            })
        }, _o.prototype.getServerInfo = function (e) {
            e = (void 0 === e ? {} : e).database, e = void 0 === e ? "" : e;
            return this._getOrCreateConnectionProvider().verifyConnectivityAndGetServerInfo({
                database: e,
                accessMode: po
            })
        }, _o.prototype.supportsMultiDb = function () {
            return this._getOrCreateConnectionProvider().supportsMultiDb()
        }, _o.prototype.supportsTransactionConfig = function () {
            return this._getOrCreateConnectionProvider().supportsTransactionConfig()
        }, _o.prototype.supportsUserImpersonation = function () {
            return this._getOrCreateConnectionProvider().supportsUserImpersonation()
        }, _o.prototype.getNegotiatedProtocolVersion = function () {
            return this._getOrCreateConnectionProvider().getNegotiatedProtocolVersion()
        }, _o.prototype.isEncrypted = function () {
            return this._isEncrypted()
        }, _o.prototype._supportsRouting = function () {
            return this._meta.routing
        }, _o.prototype._isEncrypted = function () {
            return this._config.encrypted === io.ENCRYPTION_ON || !0 === this._config.encrypted
        }, _o.prototype._getTrust = function () {
            return this._config.trust
        }, _o.prototype.session = function (e) {
            var e = void 0 === e ? {} : e, t = e.defaultAccessMode, r = e.bookmarks, n = e.database,
                o = e.impersonatedUser, i = e.fetchSize, e = e.bookmarkManager;
            return this._newSession({
                defaultAccessMode: void 0 === t ? ho : t,
                bookmarkOrBookmarks: r,
                database: void 0 === n ? "" : n,
                reactive: !1,
                impersonatedUser: o,
                fetchSize: mo(i, this._config.fetchSize),
                bookmarkManager: e
            })
        }, _o.prototype.close = function () {
            return this._log.info("Driver ".concat(this._id, " closing")), null != this._connectionProvider ? this._connectionProvider.close() : Promise.resolve()
        }, _o.prototype._afterConstruction = function () {
            this._log.info("".concat(this._meta.typename, " driver ").concat(this._id, " created for server address ").concat(this._meta.address.toString()))
        }, _o.prototype._newSession = function (e) {
            var t = e.defaultAccessMode, r = e.bookmarkOrBookmarks, n = e.database, o = e.reactive,
                i = e.impersonatedUser, u = e.fetchSize, e = e.bookmarkManager, t = oo.default._validateSessionMode(t),
                a = this._getOrCreateConnectionProvider(), r = null != r ? new eo.Bookmarks(r) : eo.Bookmarks.empty();
            return this._createSession({
                mode: t,
                database: null != n ? n : "",
                connectionProvider: a,
                bookmarks: r,
                config: this._config,
                reactive: o,
                impersonatedUser: i,
                fetchSize: u,
                bookmarkManager: e
            })
        }, _o.prototype._getOrCreateConnectionProvider = function () {
            var e;
            return null == this._connectionProvider && (this._connectionProvider = this._createConnectionProvider(this._id, this._config, this._log, (e = this._config, new to.default(e.resolver)))), this._connectionProvider
        }, _o);

    function _o(e, t, r, n, o) {
        void 0 === n && (n = function (e) {
            return new oo.default(e)
        }), void 0 === o && (o = function (e) {
            return new so.default(e)
        }), (i = t = void 0 === t ? {} : t).maxConnectionLifetime = vo(i.maxConnectionLifetime, lo), i.maxConnectionPoolSize = vo(i.maxConnectionPoolSize, ro.DEFAULT_POOL_MAX_SIZE), i.connectionAcquisitionTimeout = vo(i.connectionAcquisitionTimeout, ro.DEFAULT_POOL_ACQUISITION_TIMEOUT), i.fetchSize = mo(i.fetchSize, fo), i.connectionTimeout = function (e) {
            e = parseInt(e.connectionTimeout, 10);
            return 0 === e || !isNaN(e) && e < 0 ? null : isNaN(e) ? ro.DEFAULT_CONNECTION_TIMEOUT_MILLIS : e
        }(i);
        var i = no.Logger.create(t), u = t, a = i, s = u.resolver;
        if (null != s && "function" != typeof s) throw new TypeError("Configured resolver should be a function. Got: ".concat(typeof s));
        u.connectionAcquisitionTimeout < u.connectionTimeout && a.warn('Configuration for "connectionAcquisitionTimeout" should be greater than or equal to "connectionTimeout". Otherwise, the connection acquisition timeout will take precedence for over the connection timeout in scenarios where a new connection is created while it is acquired'), this._id = bo++, this._meta = e, this._config = t, this._log = i, this._createConnectionProvider = r, this._createSession = n, this._defaultExecuteQueryBookmarkManager = (0, uo.bookmarkManager)(), this._queryExecutor = o(this.session.bind(this)), this._connectionProvider = null, this._afterConstruction()
    }

    function vo(e, t) {
        e = parseInt(e, 10);
        return 0 < e || 0 === e ? e : e < 0 ? Number.MAX_SAFE_INTEGER : t
    }

    function mo(e, t) {
        e = parseInt(e, 10);
        if (0 < e || e === ro.FETCH_ALL) return e;
        if (0 === e || e < 0) throw new Error("The fetch size can only be a positive value or ".concat(ro.FETCH_ALL, " for ALL. However fetchSize = ").concat(e));
        return t
    }

    _.Driver = v, _.default = v;
    Mr = {};

    function go(e) {
        return null != e && "" !== e && (Object.getPrototypeOf(e) !== Object.prototype || 0 !== Object.keys(e).length)
    }

    Object.defineProperty(Mr, "__esModule", {value: !0}), Mr.default = {
        basic: function (e, t, r) {
            return null != r ? {scheme: "basic", principal: e, credentials: t, realm: r} : {
                scheme: "basic",
                principal: e,
                credentials: t
            }
        }, kerberos: function (e) {
            return {scheme: "kerberos", principal: "", credentials: e}
        }, bearer: function (e) {
            return {scheme: "bearer", credentials: e}
        }, custom: function (e, t, r, n, o) {
            n = {scheme: n, principal: e};
            return go(t) && (n.credentials = t), go(r) && (n.realm = r), go(o) && (n.parameters = o), n
        }
    };
    var Oo, wo, Eo, Po, So, To, jo, Co, Io, Ro, m = {},
        kr = (Object.defineProperty(m, "__esModule", {value: !0}), E = e, Oo = r && r.__createBinding || (Object.create ? function (e, t, r, n) {
            void 0 === n && (n = r);
            var o = Object.getOwnPropertyDescriptor(t, r);
            o && ("get" in o ? t.__esModule : !o.writable && !o.configurable) || (o = {
                enumerable: !0,
                get: function () {
                    return t[r]
                }
            }), Object.defineProperty(e, n, o)
        } : function (e, t, r, n) {
            e[n = void 0 === n ? r : n] = t[r]
        }), wo = r && r.__setModuleDefault || (Object.create ? function (e, t) {
            Object.defineProperty(e, "default", {enumerable: !0, value: t})
        } : function (e, t) {
            e.default = t
        }), u = r && r.__importStar || function (e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e) for (var r in e) "default" !== r && Object.prototype.hasOwnProperty.call(e, r) && Oo(t, e, r);
            return wo(t, e), t
        }, w = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        }, Object.defineProperty(E, "__esModule", {value: !0}), E.ManagedTransaction = E.Transaction = E.Connection = E.ConnectionProvider = E.EagerResult = E.Result = E.Stats = E.QueryStatistics = E.ProfiledPlan = E.Plan = E.Notification = E.ServerInfo = E.queryType = E.ResultSummary = E.Record = E.isPathSegment = E.PathSegment = E.isPath = E.Path = E.isUnboundRelationship = E.UnboundRelationship = E.isRelationship = E.Relationship = E.isNode = E.Node = E.Time = E.LocalTime = E.LocalDateTime = E.isTime = E.isLocalTime = E.isLocalDateTime = E.isDuration = E.isDateTime = E.isDate = E.Duration = E.DateTime = E.Date = E.Point = E.isPoint = E.internal = E.toString = E.toNumber = E.inSafeRange = E.isInt = E.int = E.Integer = E.error = E.isRetriableError = E.Neo4jError = E.newError = void 0, E.resultTransformers = E.routing = E.bookmarkManager = E.auth = E.json = E.driver = E.types = E.Driver = E.Session = E.TransactionPromise = void 0, Eo = t, Object.defineProperty(E, "newError", {
            enumerable: !0,
            get: function () {
                return Eo.newError
            }
        }), Object.defineProperty(E, "Neo4jError", {
            enumerable: !0, get: function () {
                return Eo.Neo4jError
            }
        }), Object.defineProperty(E, "isRetriableError", {
            enumerable: !0, get: function () {
                return Eo.isRetriableError
            }
        }), Po = u(n), E.Integer = Po.default, Object.defineProperty(E, "int", {
            enumerable: !0, get: function () {
                return Po.int
            }
        }), Object.defineProperty(E, "isInt", {
            enumerable: !0, get: function () {
                return Po.isInt
            }
        }), Object.defineProperty(E, "inSafeRange", {
            enumerable: !0, get: function () {
                return Po.inSafeRange
            }
        }), Object.defineProperty(E, "toNumber", {
            enumerable: !0, get: function () {
                return Po.toNumber
            }
        }), Object.defineProperty(E, "toString", {
            enumerable: !0, get: function () {
                return Po.toString
            }
        }), So = i, Object.defineProperty(E, "Date", {
            enumerable: !0, get: function () {
                return So.Date
            }
        }), Object.defineProperty(E, "DateTime", {
            enumerable: !0, get: function () {
                return So.DateTime
            }
        }), Object.defineProperty(E, "Duration", {
            enumerable: !0, get: function () {
                return So.Duration
            }
        }), Object.defineProperty(E, "isDate", {
            enumerable: !0, get: function () {
                return So.isDate
            }
        }), Object.defineProperty(E, "isDateTime", {
            enumerable: !0, get: function () {
                return So.isDateTime
            }
        }), Object.defineProperty(E, "isDuration", {
            enumerable: !0, get: function () {
                return So.isDuration
            }
        }), Object.defineProperty(E, "isLocalDateTime", {
            enumerable: !0, get: function () {
                return So.isLocalDateTime
            }
        }), Object.defineProperty(E, "isLocalTime", {
            enumerable: !0, get: function () {
                return So.isLocalTime
            }
        }), Object.defineProperty(E, "isTime", {
            enumerable: !0, get: function () {
                return So.isTime
            }
        }), Object.defineProperty(E, "LocalDateTime", {
            enumerable: !0, get: function () {
                return So.LocalDateTime
            }
        }), Object.defineProperty(E, "LocalTime", {
            enumerable: !0, get: function () {
                return So.LocalTime
            }
        }), Object.defineProperty(E, "Time", {
            enumerable: !0, get: function () {
                return So.Time
            }
        }), To = p, Object.defineProperty(E, "Node", {
            enumerable: !0, get: function () {
                return To.Node
            }
        }), Object.defineProperty(E, "isNode", {
            enumerable: !0, get: function () {
                return To.isNode
            }
        }), Object.defineProperty(E, "Relationship", {
            enumerable: !0, get: function () {
                return To.Relationship
            }
        }), Object.defineProperty(E, "isRelationship", {
            enumerable: !0, get: function () {
                return To.isRelationship
            }
        }), Object.defineProperty(E, "UnboundRelationship", {
            enumerable: !0, get: function () {
                return To.UnboundRelationship
            }
        }), Object.defineProperty(E, "isUnboundRelationship", {
            enumerable: !0, get: function () {
                return To.isUnboundRelationship
            }
        }), Object.defineProperty(E, "Path", {
            enumerable: !0, get: function () {
                return To.Path
            }
        }), Object.defineProperty(E, "isPath", {
            enumerable: !0, get: function () {
                return To.isPath
            }
        }), Object.defineProperty(E, "PathSegment", {
            enumerable: !0, get: function () {
                return To.PathSegment
            }
        }), Object.defineProperty(E, "isPathSegment", {
            enumerable: !0, get: function () {
                return To.isPathSegment
            }
        }), yn = w(h), E.Record = yn.default, jo = l, Object.defineProperty(E, "isPoint", {
            enumerable: !0,
            get: function () {
                return jo.isPoint
            }
        }), Object.defineProperty(E, "Point", {
            enumerable: !0, get: function () {
                return jo.Point
            }
        }), Co = u(b), E.ResultSummary = Co.default, Object.defineProperty(E, "queryType", {
            enumerable: !0,
            get: function () {
                return Co.queryType
            }
        }), Object.defineProperty(E, "ServerInfo", {
            enumerable: !0, get: function () {
                return Co.ServerInfo
            }
        }), Object.defineProperty(E, "Notification", {
            enumerable: !0, get: function () {
                return Co.Notification
            }
        }), Object.defineProperty(E, "Plan", {
            enumerable: !0, get: function () {
                return Co.Plan
            }
        }), Object.defineProperty(E, "ProfiledPlan", {
            enumerable: !0, get: function () {
                return Co.ProfiledPlan
            }
        }), Object.defineProperty(E, "QueryStatistics", {
            enumerable: !0, get: function () {
                return Co.QueryStatistics
            }
        }), Object.defineProperty(E, "Stats", {
            enumerable: !0, get: function () {
                return Co.Stats
            }
        }), v = w(st), E.Result = v.default, t = w(o), E.EagerResult = t.default, n = w(jr), E.ConnectionProvider = n.default, n = w(P), E.Connection = n.default, i = w(S), E.Transaction = i.default, p = w(kr), E.ManagedTransaction = p.default, h = w(lr), E.TransactionPromise = h.default, l = w(s), E.Session = l.default, b = u(_), st = b, E.Driver = b.default, E.driver = st, o = w(Mr), E.auth = o.default, Io = g, Object.defineProperty(E, "bookmarkManager", {
            enumerable: !0,
            get: function () {
                return Io.bookmarkManager
            }
        }), Ro = _, Object.defineProperty(E, "routing", {
            enumerable: !0, get: function () {
                return Ro.routing
            }
        }), jr = u(m), E.types = jr, P = u(a), E.json = P, w = w(O), E.resultTransformers = w.default, u = u(y), E.internal = u, S = {
            SERVICE_UNAVAILABLE: Eo.SERVICE_UNAVAILABLE,
            SESSION_EXPIRED: Eo.SESSION_EXPIRED,
            PROTOCOL_ERROR: Eo.PROTOCOL_ERROR
        }, E.error = S, S = {
            newError: Eo.newError,
            Neo4jError: Eo.Neo4jError,
            isRetriableError: Eo.isRetriableError,
            error: S,
            Integer: Po.default,
            int: Po.int,
            isInt: Po.isInt,
            inSafeRange: Po.inSafeRange,
            toNumber: Po.toNumber,
            toString: Po.toString,
            internal: u,
            isPoint: jo.isPoint,
            Point: jo.Point,
            Date: So.Date,
            DateTime: So.DateTime,
            Duration: So.Duration,
            isDate: So.isDate,
            isDateTime: So.isDateTime,
            isDuration: So.isDuration,
            isLocalDateTime: So.isLocalDateTime,
            isLocalTime: So.isLocalTime,
            isTime: So.isTime,
            LocalDateTime: So.LocalDateTime,
            LocalTime: So.LocalTime,
            Time: So.Time,
            Node: To.Node,
            isNode: To.isNode,
            Relationship: To.Relationship,
            isRelationship: To.isRelationship,
            UnboundRelationship: To.UnboundRelationship,
            isUnboundRelationship: To.isUnboundRelationship,
            Path: To.Path,
            isPath: To.isPath,
            PathSegment: To.PathSegment,
            isPathSegment: To.isPathSegment,
            Record: yn.default,
            ResultSummary: Co.default,
            queryType: Co.queryType,
            ServerInfo: Co.ServerInfo,
            Notification: Co.Notification,
            Plan: Co.Plan,
            ProfiledPlan: Co.ProfiledPlan,
            QueryStatistics: Co.QueryStatistics,
            Stats: Co.Stats,
            Result: v.default,
            EagerResult: t.default,
            Transaction: i.default,
            ManagedTransaction: p.default,
            TransactionPromise: h.default,
            Session: l.default,
            Driver: b.default,
            Connection: n.default,
            types: jr,
            driver: st,
            json: P,
            auth: o.default,
            bookmarkManager: Io.bookmarkManager,
            routing: Ro.routing,
            resultTransformers: w.default
        }, E.default = S, {}), lr = {}, s = {}, Mr = {}, g = {};
    Object.defineProperty(g, "__esModule", {value: !0}), g.isFunction = void 0, g.isFunction = function (e) {
        return "function" == typeof e
    };
    _ = {}, m = {}, a = {};
    Object.defineProperty(a, "__esModule", {value: !0}), a.createErrorClass = void 0, a.createErrorClass = function (e) {
        return (e = e(function (e) {
            Error.call(e), e.stack = (new Error).stack
        })).prototype = Object.create(Error.prototype), e.prototype.constructor = e
    }, Object.defineProperty(m, "__esModule", {value: !0}), m.UnsubscriptionError = void 0;
    O = a, m.UnsubscriptionError = O.createErrorClass(function (t) {
        return function (e) {
            t(this), this.message = e ? e.length + " errors occurred during unsubscription:\n" + e.map(function (e, t) {
                return t + 1 + ") " + e.toString()
            }).join("\n  ") : "", this.name = "UnsubscriptionError", this.errors = e
        }
    }), y = {};
    Object.defineProperty(y, "__esModule", {value: !0}), y.arrRemove = void 0, y.arrRemove = function (e, t) {
        e && 0 <= (t = e.indexOf(t)) && e.splice(t, 1)
    };
    var ko = r && r.__values || function (e) {
            var t = "function" == typeof Symbol && Symbol.iterator, r = t && e[t], n = 0;
            if (r) return r.call(e);
            if (e && "number" == typeof e.length) return {
                next: function () {
                    return {value: (e = e && n >= e.length ? void 0 : e) && e[n++], done: !e}
                }
            };
            throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
        }, Ao = r && r.__read || function (e, t) {
            var r = "function" == typeof Symbol && e[Symbol.iterator];
            if (!r) return e;
            var n, o, i = r.call(e), u = [];
            try {
                for (; (void 0 === t || 0 < t--) && !(n = i.next()).done;) u.push(n.value)
            } catch (e) {
                o = {error: e}
            } finally {
                try {
                    n && !n.done && (r = i.return) && r.call(i)
                } finally {
                    if (o) throw o.error
                }
            }
            return u
        }, Mo = r && r.__spreadArray || function (e, t) {
            for (var r = 0, n = t.length, o = e.length; r < n; r++, o++) e[o] = t[r];
            return e
        },
        xo = (Object.defineProperty(_, "__esModule", {value: !0}), _.isSubscription = _.EMPTY_SUBSCRIPTION = _.Subscription = void 0, g),
        No = m, Uo = y, Do = (Lo.prototype.unsubscribe = function () {
            var t, e, r;
            if (!this.closed) {
                this.closed = !0;
                var n = this._parentage;
                if (n) if (this._parentage = null, Array.isArray(n)) try {
                    for (var o = ko(n), i = o.next(); !i.done; i = o.next()) i.value.remove(this)
                } catch (e) {
                    a = {error: e}
                } finally {
                    try {
                        i && !i.done && (u = o.return) && u.call(o)
                    } finally {
                        if (a) throw a.error
                    }
                } else n.remove(this);
                var u = this.initialTeardown;
                if (xo.isFunction(u)) try {
                    u()
                } catch (e) {
                    r = e instanceof No.UnsubscriptionError ? e.errors : [e]
                }
                var a = this._finalizers;
                if (a) {
                    this._finalizers = null;
                    try {
                        for (var s = ko(a), c = s.next(); !c.done; c = s.next()) {
                            var l = c.value;
                            try {
                                Bo(l)
                            } catch (e) {
                                r = null != r ? r : [], e instanceof No.UnsubscriptionError ? r = Mo(Mo([], Ao(r)), Ao(e.errors)) : r.push(e)
                            }
                        }
                    } catch (e) {
                        t = {error: e}
                    } finally {
                        try {
                            c && !c.done && (e = s.return) && e.call(s)
                        } finally {
                            if (t) throw t.error
                        }
                    }
                }
                if (r) throw new No.UnsubscriptionError(r)
            }
        }, Lo.prototype.add = function (e) {
            var t;
            if (e && e !== this) if (this.closed) Bo(e); else {
                if (e instanceof Lo) {
                    if (e.closed || e._hasParent(this)) return;
                    e._addParent(this)
                }
                (this._finalizers = null != (t = this._finalizers) ? t : []).push(e)
            }
        }, Lo.prototype._hasParent = function (e) {
            var t = this._parentage;
            return t === e || Array.isArray(t) && t.includes(e)
        }, Lo.prototype._addParent = function (e) {
            var t = this._parentage;
            this._parentage = Array.isArray(t) ? (t.push(e), t) : t ? [t, e] : e
        }, Lo.prototype._removeParent = function (e) {
            var t = this._parentage;
            t === e ? this._parentage = null : Array.isArray(t) && Uo.arrRemove(t, e)
        }, Lo.prototype.remove = function (e) {
            var t = this._finalizers;
            t && Uo.arrRemove(t, e), e instanceof Lo && e._removeParent(this)
        }, Lo.EMPTY = ((u = new Lo).closed = !0, u), Lo);

    function Lo(e) {
        this.initialTeardown = e, this.closed = !1, this._parentage = null, this._finalizers = null
    }

    function Bo(e) {
        xo.isFunction(e) ? e() : e.unsubscribe()
    }

    _.Subscription = Do, _.EMPTY_SUBSCRIPTION = Do.EMPTY, _.isSubscription = function (e) {
        return e instanceof Do || e && "closed" in e && xo.isFunction(e.remove) && xo.isFunction(e.add) && xo.isFunction(e.unsubscribe)
    };
    var Fo, Wo, zo, yn = {},
        v = (Object.defineProperty(yn, "__esModule", {value: !0}), yn.config = void 0, yn.config = {
            onUnhandledError: null,
            onStoppedNotification: null,
            Promise: void 0,
            useDeprecatedSynchronousErrorHandling: !1,
            useDeprecatedNextContext: !1
        }, {}), t = {}, qo = (Fo = t, Wo = r && r.__read || function (e, t) {
            var r = "function" == typeof Symbol && e[Symbol.iterator];
            if (!r) return e;
            var n, o, i = r.call(e), u = [];
            try {
                for (; (void 0 === t || 0 < t--) && !(n = i.next()).done;) u.push(n.value)
            } catch (e) {
                o = {error: e}
            } finally {
                try {
                    n && !n.done && (r = i.return) && r.call(i)
                } finally {
                    if (o) throw o.error
                }
            }
            return u
        }, zo = r && r.__spreadArray || function (e, t) {
            for (var r = 0, n = t.length, o = e.length; r < n; r++, o++) e[o] = t[r];
            return e
        }, Object.defineProperty(Fo, "__esModule", {value: !0}), Fo.timeoutProvider = void 0, Fo.timeoutProvider = {
            setTimeout: function (e, t) {
                for (var r = [], n = 2; n < arguments.length; n++) r[n - 2] = arguments[n];
                var o = Fo.timeoutProvider.delegate;
                return null != o && o.setTimeout ? o.setTimeout.apply(o, zo([e, t], Wo(r))) : setTimeout.apply(void 0, zo([e, t], Wo(r)))
            }, clearTimeout: function (e) {
                var t = Fo.timeoutProvider.delegate;
                return ((null == t ? void 0 : t.clearTimeout) || clearTimeout)(e)
            }, delegate: void 0
        }, Object.defineProperty(v, "__esModule", {value: !0}), v.reportUnhandledError = void 0, yn), Vo = t;
    v.reportUnhandledError = function (t) {
        Vo.timeoutProvider.setTimeout(function () {
            var e = qo.config.onUnhandledError;
            if (!e) throw t;
            e(t)
        })
    };
    i = {};
    Object.defineProperty(i, "__esModule", {value: !0}), i.noop = void 0, i.noop = function () {
    };
    p = {};

    function Ho(e, t, r) {
        return {kind: e, value: t, error: r}
    }

    Object.defineProperty(p, "__esModule", {value: !0}), p.createNotification = p.nextNotification = p.errorNotification = p.COMPLETE_NOTIFICATION = void 0, p.COMPLETE_NOTIFICATION = Ho("C", void 0, void 0), p.errorNotification = function (e) {
        return Ho("E", void 0, e)
    }, p.nextNotification = function (e) {
        return Ho("N", e, void 0)
    }, p.createNotification = Ho;
    var Yo, Ko, Go, Zo, Qo, Xo, Jo, $o, ei, ti, ri, ni, oi, ii, h = {},
        ui = (Object.defineProperty(h, "__esModule", {value: !0}), h.captureError = h.errorContext = void 0, yn),
        ai = null;

    function si(e) {
        var t = Go.call(this) || this;
        return t.isStopped = !1, e ? (t.destination = e, Qo.isSubscription(e) && e.add(t)) : t.destination = Yo.EMPTY_OBSERVER, t
    }

    function ci(e, t) {
        return ri.call(e, t)
    }

    function li(e) {
        this.partialObserver = e
    }

    function fi(e, t, r) {
        var n = oi.call(this) || this;
        return r = Zo.isFunction(e) || !e ? {
            next: null != e ? e : void 0,
            error: null != t ? t : void 0,
            complete: null != r ? r : void 0
        } : n && Xo.config.useDeprecatedNextContext ? ((t = Object.create(e)).unsubscribe = function () {
            return n.unsubscribe()
        }, {
            next: e.next && ci(e.next, t),
            error: e.error && ci(e.error, t),
            complete: e.complete && ci(e.complete, t)
        }) : e, n.destination = new ni(r), n
    }

    function pi(e) {
        Xo.config.useDeprecatedSynchronousErrorHandling ? ti.captureError(e) : Jo.reportUnhandledError(e)
    }

    function di(e, t) {
        var r = Xo.config.onStoppedNotification;
        r && ei.timeoutProvider.setTimeout(function () {
            return r(e, t)
        })
    }

    h.errorContext = function (e) {
        if (ui.config.useDeprecatedSynchronousErrorHandling) {
            var t = !ai;
            if (t && (ai = {errorThrown: !1, error: null}), e(), t) {
                var t = ai, r = t.errorThrown, t = t.error;
                if (ai = null, r) throw t
            }
        } else e()
    }, h.captureError = function (e) {
        ui.config.useDeprecatedSynchronousErrorHandling && ai && (ai.errorThrown = !0, ai.error = e)
    }, Yo = Mr, l = r && r.__extends || (Ko = function (e, t) {
        return (Ko = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
            e.__proto__ = t
        } || function (e, t) {
            for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
        })(e, t)
    }, function (e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

        function r() {
            this.constructor = e
        }

        Ko(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
    }), Object.defineProperty(Yo, "__esModule", {value: !0}), Yo.EMPTY_OBSERVER = Yo.SafeSubscriber = Yo.Subscriber = void 0, Zo = g, Xo = yn, Jo = v, b = i, $o = p, ei = t, ti = h, Go = (Qo = _).Subscription, l(si, Go), si.create = function (e, t, r) {
        return new ii(e, t, r)
    }, si.prototype.next = function (e) {
        this.isStopped ? di($o.nextNotification(e), this) : this._next(e)
    }, si.prototype.error = function (e) {
        this.isStopped ? di($o.errorNotification(e), this) : (this.isStopped = !0, this._error(e))
    }, si.prototype.complete = function () {
        this.isStopped ? di($o.COMPLETE_NOTIFICATION, this) : (this.isStopped = !0, this._complete())
    }, si.prototype.unsubscribe = function () {
        this.closed || (this.isStopped = !0, Go.prototype.unsubscribe.call(this), this.destination = null)
    }, si.prototype._next = function (e) {
        this.destination.next(e)
    }, si.prototype._error = function (e) {
        try {
            this.destination.error(e)
        } finally {
            this.unsubscribe()
        }
    }, si.prototype._complete = function () {
        try {
            this.destination.complete()
        } finally {
            this.unsubscribe()
        }
    }, n = si, Yo.Subscriber = n, ri = Function.prototype.bind, li.prototype.next = function (e) {
        var t = this.partialObserver;
        if (t.next) try {
            t.next(e)
        } catch (e) {
            pi(e)
        }
    }, li.prototype.error = function (e) {
        var t = this.partialObserver;
        if (t.error) try {
            t.error(e)
        } catch (e) {
            pi(e)
        } else pi(e)
    }, li.prototype.complete = function () {
        var e = this.partialObserver;
        if (e.complete) try {
            e.complete()
        } catch (e) {
            pi(e)
        }
    }, ni = li, l(fi, oi = n), ii = fi, Yo.SafeSubscriber = ii, Yo.EMPTY_OBSERVER = {
        closed: !0,
        next: b.noop,
        error: function (e) {
            throw e
        },
        complete: b.noop
    };
    jr = {}, Object.defineProperty(jr, "__esModule", {value: !0}), jr.observable = void 0, jr.observable = "function" == typeof Symbol && Symbol.observable || "@@observable", st = {}, P = {};
    Object.defineProperty(P, "__esModule", {value: !0}), P.identity = void 0, P.identity = function (e) {
        return e
    }, Object.defineProperty(st, "__esModule", {value: !0}), st.pipeFromArray = st.pipe = void 0;
    var hi = P;

    function bi(t) {
        return 0 === t.length ? hi.identity : 1 === t.length ? t[0] : function (e) {
            return t.reduce(function (e, t) {
                return t(e)
            }, e)
        }
    }

    st.pipe = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        return bi(e)
    }, st.pipeFromArray = bi, Object.defineProperty(s, "__esModule", {value: !0}), s.Observable = void 0;
    var yi = Mr, _i = _, o = jr, vi = st, mi = yn, gi = g, Oi = h;

    function wi(e) {
        e && (this._subscribe = e)
    }

    function Ei(e) {
        return null != (e = null != e ? e : mi.config.Promise) ? e : Promise
    }

    wi.prototype.lift = function (e) {
        var t = new wi;
        return t.source = this, t.operator = e, t
    }, wi.prototype.subscribe = function (e, t, r) {
        var n, o = this, i = (n = e) && n instanceof yi.Subscriber || function (e) {
            return e && gi.isFunction(e.next) && gi.isFunction(e.error) && gi.isFunction(e.complete)
        }(n) && _i.isSubscription(n) ? e : new yi.SafeSubscriber(e, t, r);
        return Oi.errorContext(function () {
            var e = o.operator, t = o.source;
            i.add(e ? e.call(i, t) : t ? o._subscribe(i) : o._trySubscribe(i))
        }), i
    }, wi.prototype._trySubscribe = function (t) {
        try {
            return this._subscribe(t)
        } catch (e) {
            t.error(e)
        }
    }, wi.prototype.forEach = function (n, e) {
        var o = this;
        return new (e = Ei(e))(function (e, t) {
            var r = new yi.SafeSubscriber({
                next: function (e) {
                    try {
                        n(e)
                    } catch (e) {
                        t(e), r.unsubscribe()
                    }
                }, error: t, complete: e
            });
            o.subscribe(r)
        })
    }, wi.prototype._subscribe = function (e) {
        var t;
        return null == (t = this.source) ? void 0 : t.subscribe(e)
    }, wi.prototype[o.observable] = function () {
        return this
    }, wi.prototype.pipe = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        return vi.pipeFromArray(e)(this)
    }, wi.prototype.toPromise = function (e) {
        var n = this;
        return new (e = Ei(e))(function (e, t) {
            var r;
            n.subscribe(function (e) {
                return r = e
            }, function (e) {
                return t(e)
            }, function () {
                return e(r)
            })
        })
    }, wi.create = function (e) {
        return new wi(e)
    }, s.Observable = wi;
    var w = {}, E = {}, S = {},
        Pi = (Object.defineProperty(S, "__esModule", {value: !0}), S.operate = S.hasLift = void 0, g);

    function Si(e) {
        return Pi.isFunction(null == e ? void 0 : e.lift)
    }

    S.hasLift = Si, S.operate = function (t) {
        return function (e) {
            if (Si(e)) return e.lift(function (e) {
                try {
                    return t(e, this)
                } catch (e) {
                    this.error(e)
                }
            });
            throw new TypeError("Unable to lift unknown Observable type")
        }
    };
    var Ti, O = {}, u = r && r.__extends || (Ti = function (e, t) {
            return (Ti = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
            })(e, t)
        }, function (e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

            function r() {
                this.constructor = e
            }

            Ti(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
        }),
        p = (Object.defineProperty(O, "__esModule", {value: !0}), O.OperatorSubscriber = O.createOperatorSubscriber = void 0, Mr);
    O.createOperatorSubscriber = function (e, t, r, n, o) {
        return new Ci(e, t, r, n, o)
    };
    u(Ii, ji = p.Subscriber), Ii.prototype.unsubscribe = function () {
        var e;
        this.shouldUnsubscribe && !this.shouldUnsubscribe() || (e = this.closed, ji.prototype.unsubscribe.call(this), e || null == (e = this.onFinalize) || e.call(this))
    };
    var ji, Ci = Ii;

    function Ii(t, r, e, n, o, i) {
        var u = ji.call(this, t) || this;
        return u.onFinalize = o, u.shouldUnsubscribe = i, u._next = r ? function (e) {
            try {
                r(e)
            } catch (e) {
                t.error(e)
            }
        } : ji.prototype._next, u._error = n ? function (e) {
            try {
                n(e)
            } catch (e) {
                t.error(e)
            } finally {
                this.unsubscribe()
            }
        } : ji.prototype._error, u._complete = e ? function () {
            try {
                e()
            } catch (e) {
                t.error(e)
            } finally {
                this.unsubscribe()
            }
        } : ji.prototype._complete, u
    }

    O.OperatorSubscriber = Ci, Object.defineProperty(E, "__esModule", {value: !0}), E.refCount = void 0;
    var Ri = S, ki = O;
    E.refCount = function () {
        return Ri.operate(function (r, n) {
            var o = null, e = (r._refCount++, ki.createOperatorSubscriber(n, void 0, void 0, void 0, function () {
                var e, t;
                !r || r._refCount <= 0 || 0 < --r._refCount ? o = null : (e = r._connection, t = o, o = null, !e || t && e !== t || e.unsubscribe(), n.unsubscribe())
            }));
            r.subscribe(e), e.closed || (o = r.connect())
        })
    };
    var Ai, t = r && r.__extends || (Ai = function (e, t) {
        return (Ai = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
            e.__proto__ = t
        } || function (e, t) {
            for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
        })(e, t)
    }, function (e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

        function r() {
            this.constructor = e
        }

        Ai(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
    });
    Object.defineProperty(w, "__esModule", {value: !0}), w.ConnectableObservable = void 0;
    var Mi, xi = _, Ni = E, Ui = O, Di = S, l = (Mi = s.Observable, t(Li, Mi), Li.prototype._subscribe = function (e) {
        return this.getSubject().subscribe(e)
    }, Li.prototype.getSubject = function () {
        var e = this._subject;
        return e && !e.isStopped || (this._subject = this.subjectFactory()), this._subject
    }, Li.prototype._teardown = function () {
        this._refCount = 0;
        var e = this._connection;
        (this._subject = this._connection = null) != e && e.unsubscribe()
    }, Li.prototype.connect = function () {
        var t, r = this, e = this._connection;
        return e || (e = this._connection = new xi.Subscription, t = this.getSubject(), e.add(this.source.subscribe(Ui.createOperatorSubscriber(t, void 0, function () {
            r._teardown(), t.complete()
        }, function (e) {
            r._teardown(), t.error(e)
        }, function () {
            return r._teardown()
        }))), e.closed && (this._connection = null, e = xi.Subscription.EMPTY)), e
    }, Li.prototype.refCount = function () {
        return Ni.refCount()(this)
    }, Li);

    function Li(e, t) {
        var r = Mi.call(this) || this;
        return r.source = e, r.subjectFactory = t, r._subject = null, r._refCount = 0, r._connection = null, Di.hasLift(e) && (r.lift = e.lift), r
    }

    w.ConnectableObservable = l;
    var Bi, Fi, Wi, zi, qi, n = {}, b = {},
        o = (Bi = b, Object.defineProperty(Bi, "__esModule", {value: !0}), Bi.performanceTimestampProvider = void 0, Bi.performanceTimestampProvider = {
            now: function () {
                return (Bi.performanceTimestampProvider.delegate || performance).now()
            }, delegate: void 0
        }, {}), Vi = (Fi = o, Wi = r && r.__read || function (e, t) {
            var r = "function" == typeof Symbol && e[Symbol.iterator];
            if (!r) return e;
            var n, o, i = r.call(e), u = [];
            try {
                for (; (void 0 === t || 0 < t--) && !(n = i.next()).done;) u.push(n.value)
            } catch (e) {
                o = {error: e}
            } finally {
                try {
                    n && !n.done && (r = i.return) && r.call(i)
                } finally {
                    if (o) throw o.error
                }
            }
            return u
        }, zi = r && r.__spreadArray || function (e, t) {
            for (var r = 0, n = t.length, o = e.length; r < n; r++, o++) e[o] = t[r];
            return e
        }, Object.defineProperty(Fi, "__esModule", {value: !0}), Fi.animationFrameProvider = void 0, qi = _, Fi.animationFrameProvider = {
            schedule: function (t) {
                var e = requestAnimationFrame, r = cancelAnimationFrame, n = Fi.animationFrameProvider.delegate,
                    o = (n && (e = n.requestAnimationFrame, r = n.cancelAnimationFrame), e(function (e) {
                        r = void 0, t(e)
                    }));
                return new qi.Subscription(function () {
                    return null == r ? void 0 : r(o)
                })
            }, requestAnimationFrame: function () {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                var r = Fi.animationFrameProvider.delegate;
                return ((null == r ? void 0 : r.requestAnimationFrame) || requestAnimationFrame).apply(void 0, zi([], Wi(e)))
            }, cancelAnimationFrame: function () {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                var r = Fi.animationFrameProvider.delegate;
                return ((null == r ? void 0 : r.cancelAnimationFrame) || cancelAnimationFrame).apply(void 0, zi([], Wi(e)))
            }, delegate: void 0
        }, Object.defineProperty(n, "__esModule", {value: !0}), n.animationFrames = void 0, s), Hi = b, Yi = o;

    function Ki(a) {
        return new Vi.Observable(function (r) {
            var n = a || Hi.performanceTimestampProvider, o = n.now(), i = 0, u = function () {
                r.closed || (i = Yi.animationFrameProvider.requestAnimationFrame(function (e) {
                    i = 0;
                    var t = n.now();
                    r.next({timestamp: a ? t : e, elapsed: t - o}), u()
                }))
            };
            return u(), function () {
                i && Yi.animationFrameProvider.cancelAnimationFrame(i)
            }
        })
    }

    n.animationFrames = function (e) {
        return e ? Ki(e) : Qi
    };
    var Gi, Zi, Qi = Ki(), u = {}, p = {},
        t = (Object.defineProperty(p, "__esModule", {value: !0}), p.ObjectUnsubscribedError = void 0, a),
        l = (p.ObjectUnsubscribedError = t.createErrorClass(function (e) {
            return function () {
                e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed"
            }
        }), r && r.__extends || (Gi = function (e, t) {
            return (Gi = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
            })(e, t)
        }, function (e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

            function r() {
                this.constructor = e
            }

            Gi(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
        })), Xi = r && r.__values || function (e) {
            var t = "function" == typeof Symbol && Symbol.iterator, r = t && e[t], n = 0;
            if (r) return r.call(e);
            if (e && "number" == typeof e.length) return {
                next: function () {
                    return {value: (e = e && n >= e.length ? void 0 : e) && e[n++], done: !e}
                }
            };
            throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
        }, Ji = (Object.defineProperty(u, "__esModule", {value: !0}), u.AnonymousSubject = u.Subject = void 0, s), $i = _,
        eu = p, tu = y, ru = h, b = (Zi = Ji.Observable, l(nu, Zi), nu.prototype.lift = function (e) {
            var t = new iu(this, this);
            return t.operator = e, t
        }, nu.prototype._throwIfClosed = function () {
            if (this.closed) throw new eu.ObjectUnsubscribedError
        }, nu.prototype.next = function (o) {
            var i = this;
            ru.errorContext(function () {
                var t, e;
                if (i._throwIfClosed(), !i.isStopped) {
                    i.currentObservers || (i.currentObservers = Array.from(i.observers));
                    try {
                        for (var r = Xi(i.currentObservers), n = r.next(); !n.done; n = r.next()) n.value.next(o)
                    } catch (e) {
                        t = {error: e}
                    } finally {
                        try {
                            n && !n.done && (e = r.return) && e.call(r)
                        } finally {
                            if (t) throw t.error
                        }
                    }
                }
            })
        }, nu.prototype.error = function (t) {
            var r = this;
            ru.errorContext(function () {
                if (r._throwIfClosed(), !r.isStopped) {
                    r.hasError = r.isStopped = !0, r.thrownError = t;
                    for (var e = r.observers; e.length;) e.shift().error(t)
                }
            })
        }, nu.prototype.complete = function () {
            var t = this;
            ru.errorContext(function () {
                if (t._throwIfClosed(), !t.isStopped) {
                    t.isStopped = !0;
                    for (var e = t.observers; e.length;) e.shift().complete()
                }
            })
        }, nu.prototype.unsubscribe = function () {
            this.isStopped = this.closed = !0, this.observers = this.currentObservers = null
        }, Object.defineProperty(nu.prototype, "observed", {
            get: function () {
                var e;
                return 0 < (null == (e = this.observers) ? void 0 : e.length)
            }, enumerable: !1, configurable: !0
        }), nu.prototype._trySubscribe = function (e) {
            return this._throwIfClosed(), Zi.prototype._trySubscribe.call(this, e)
        }, nu.prototype._subscribe = function (e) {
            return this._throwIfClosed(), this._checkFinalizedStatuses(e), this._innerSubscribe(e)
        }, nu.prototype._innerSubscribe = function (e) {
            var t = this, r = this.hasError, n = this.isStopped, o = this.observers;
            return r || n ? $i.EMPTY_SUBSCRIPTION : (this.currentObservers = null, o.push(e), new $i.Subscription(function () {
                t.currentObservers = null, tu.arrRemove(o, e)
            }))
        }, nu.prototype._checkFinalizedStatuses = function (e) {
            var t = this.hasError, r = this.thrownError, n = this.isStopped;
            t ? e.error(r) : n && e.complete()
        }, nu.prototype.asObservable = function () {
            var e = new Ji.Observable;
            return e.source = this, e
        }, nu.create = function (e, t) {
            return new iu(e, t)
        }, nu);

    function nu() {
        var e = Zi.call(this) || this;
        return e.closed = !1, e.currentObservers = null, e.observers = [], e.isStopped = !1, e.hasError = !1, e.thrownError = null, e
    }

    u.Subject = b;
    l(uu, ou = b), uu.prototype.next = function (e) {
        var t, r;
        null != (r = null == (t = this.destination) ? void 0 : t.next) && r.call(t, e)
    }, uu.prototype.error = function (e) {
        var t, r;
        null != (r = null == (t = this.destination) ? void 0 : t.error) && r.call(t, e)
    }, uu.prototype.complete = function () {
        var e, t;
        null != (t = null == (e = this.destination) ? void 0 : e.complete) && t.call(e)
    }, uu.prototype._subscribe = function (e) {
        var t;
        return null != (t = null == (t = this.source) ? void 0 : t.subscribe(e)) ? t : $i.EMPTY_SUBSCRIPTION
    };
    var ou, iu = uu;

    function uu(e, t) {
        var r = ou.call(this) || this;
        return r.destination = e, r.source = t, r
    }

    u.AnonymousSubject = iu;
    var au, t = {}, h = r && r.__extends || (au = function (e, t) {
        return (au = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
            e.__proto__ = t
        } || function (e, t) {
            for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
        })(e, t)
    }, function (e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

        function r() {
            this.constructor = e
        }

        au(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
    });
    Object.defineProperty(t, "__esModule", {value: !0}), t.BehaviorSubject = void 0;
    su = u.Subject, h(cu, su), Object.defineProperty(cu.prototype, "value", {
        get: function () {
            return this.getValue()
        }, enumerable: !1, configurable: !0
    }), cu.prototype._subscribe = function (e) {
        var t = su.prototype._subscribe.call(this, e);
        return t.closed || e.next(this._value), t
    }, cu.prototype.getValue = function () {
        var e = this.hasError, t = this.thrownError, r = this._value;
        if (e) throw t;
        return this._throwIfClosed(), r
    }, cu.prototype.next = function (e) {
        su.prototype.next.call(this, this._value = e)
    };
    var su, l = cu;

    function cu(e) {
        var t = su.call(this) || this;
        return t._value = e, t
    }

    t.BehaviorSubject = l;
    var lu, fu, b = {}, h = {},
        l = (lu = h, Object.defineProperty(lu, "__esModule", {value: !0}), lu.dateTimestampProvider = void 0, lu.dateTimestampProvider = {
            now: function () {
                return (lu.dateTimestampProvider.delegate || Date).now()
            }, delegate: void 0
        }, r && r.__extends || (fu = function (e, t) {
            return (fu = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
            })(e, t)
        }, function (e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

            function r() {
                this.constructor = e
            }

            fu(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
        }));
    Object.defineProperty(b, "__esModule", {value: !0}), b.ReplaySubject = void 0;
    var pu, du = h, l = (pu = u.Subject, l(hu, pu), hu.prototype.next = function (e) {
        var t = this.isStopped, r = this._buffer, n = this._infiniteTimeWindow, o = this._timestampProvider,
            i = this._windowTime;
        t || (r.push(e), n || r.push(o.now() + i)), this._trimBuffer(), pu.prototype.next.call(this, e)
    }, hu.prototype._subscribe = function (e) {
        this._throwIfClosed(), this._trimBuffer();
        for (var t = this._innerSubscribe(e), r = this._infiniteTimeWindow, n = this._buffer.slice(), o = 0; o < n.length && !e.closed; o += r ? 1 : 2) e.next(n[o]);
        return this._checkFinalizedStatuses(e), t
    }, hu.prototype._trimBuffer = function () {
        var e = this._bufferSize, t = this._timestampProvider, r = this._buffer, n = this._infiniteTimeWindow,
            o = (n ? 1 : 2) * e;
        if (e < 1 / 0 && o < r.length && r.splice(0, r.length - o), !n) {
            for (var i = t.now(), u = 0, a = 1; a < r.length && r[a] <= i; a += 2) u = a;
            u && r.splice(0, u + 1)
        }
    }, hu);

    function hu(e, t, r) {
        void 0 === e && (e = 1 / 0), void 0 === t && (t = 1 / 0), void 0 === r && (r = du.dateTimestampProvider);
        var n = pu.call(this) || this;
        return n._bufferSize = e, n._windowTime = t, n._timestampProvider = r, n._buffer = [], n._infiniteTimeWindow = !0, n._infiniteTimeWindow = t === 1 / 0, n._bufferSize = Math.max(1, e), n._windowTime = Math.max(1, t), n
    }

    b.ReplaySubject = l;
    var bu, l = {}, yu = r && r.__extends || (bu = function (e, t) {
        return (bu = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
            e.__proto__ = t
        } || function (e, t) {
            for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
        })(e, t)
    }, function (e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

        function r() {
            this.constructor = e
        }

        bu(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
    });
    Object.defineProperty(l, "__esModule", {value: !0}), l.AsyncSubject = void 0;
    _u = u.Subject, yu(vu, _u), vu.prototype._checkFinalizedStatuses = function (e) {
        var t = this.hasError, r = this._hasValue, n = this._value, o = this.thrownError, i = this.isStopped,
            u = this._isComplete;
        t ? e.error(o) : (i || u) && (r && e.next(n), e.complete())
    }, vu.prototype.next = function (e) {
        this.isStopped || (this._value = e, this._hasValue = !0)
    }, vu.prototype.complete = function () {
        var e = this._hasValue, t = this._value;
        this._isComplete || (this._isComplete = !0, e && _u.prototype.next.call(this, t), _u.prototype.complete.call(this))
    };
    var _u, yu = vu;

    function vu() {
        var e = null !== _u && _u.apply(this, arguments) || this;
        return e._value = null, e._hasValue = !1, e._isComplete = !1, e
    }

    l.AsyncSubject = yu;
    var mu, yu = {}, T = {}, j = {}, gu = {}, Ou = r && r.__extends || (mu = function (e, t) {
        return (mu = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
            e.__proto__ = t
        } || function (e, t) {
            for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
        })(e, t)
    }, function (e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

        function r() {
            this.constructor = e
        }

        mu(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
    });
    Object.defineProperty(gu, "__esModule", {value: !0}), gu.Action = void 0;
    wu = _.Subscription, Ou(Eu, wu), Eu.prototype.schedule = function (e, t) {
        return this
    };
    var wu, Ou = Eu;

    function Eu(e, t) {
        return wu.call(this) || this
    }

    gu.Action = Ou;
    var Pu, Su, Tu, ju, Ou = {}, Cu = (Pu = Ou, Su = r && r.__read || function (e, t) {
        var r = "function" == typeof Symbol && e[Symbol.iterator];
        if (!r) return e;
        var n, o, i = r.call(e), u = [];
        try {
            for (; (void 0 === t || 0 < t--) && !(n = i.next()).done;) u.push(n.value)
        } catch (e) {
            o = {error: e}
        } finally {
            try {
                n && !n.done && (r = i.return) && r.call(i)
            } finally {
                if (o) throw o.error
            }
        }
        return u
    }, Tu = r && r.__spreadArray || function (e, t) {
        for (var r = 0, n = t.length, o = e.length; r < n; r++, o++) e[o] = t[r];
        return e
    }, Object.defineProperty(Pu, "__esModule", {value: !0}), Pu.intervalProvider = void 0, Pu.intervalProvider = {
        setInterval: function (e, t) {
            for (var r = [], n = 2; n < arguments.length; n++) r[n - 2] = arguments[n];
            var o = Pu.intervalProvider.delegate;
            return null != o && o.setInterval ? o.setInterval.apply(o, Tu([e, t], Su(r))) : setInterval.apply(void 0, Tu([e, t], Su(r)))
        }, clearInterval: function (e) {
            var t = Pu.intervalProvider.delegate;
            return ((null == t ? void 0 : t.clearInterval) || clearInterval)(e)
        }, delegate: void 0
    }, r && r.__extends || (ju = function (e, t) {
        return (ju = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
            e.__proto__ = t
        } || function (e, t) {
            for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
        })(e, t)
    }, function (e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

        function r() {
            this.constructor = e
        }

        ju(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
    }));
    Object.defineProperty(j, "__esModule", {value: !0}), j.AsyncAction = void 0;
    var Iu, Ru = Ou, ku = y, Ou = (Iu = gu.Action, Cu(Au, Iu), Au.prototype.schedule = function (e, t) {
        if (void 0 === t && (t = 0), this.closed) return this;
        this.state = e;
        var e = this.id, r = this.scheduler;
        return null != e && (this.id = this.recycleAsyncId(r, e, t)), this.pending = !0, this.delay = t, this.id = null != (e = this.id) ? e : this.requestAsyncId(r, this.id, t), this
    }, Au.prototype.requestAsyncId = function (e, t, r) {
        return void 0 === r && (r = 0), Ru.intervalProvider.setInterval(e.flush.bind(e, this), r)
    }, Au.prototype.recycleAsyncId = function (e, t, r) {
        if (null != (r = void 0 === r ? 0 : r) && this.delay === r && !1 === this.pending) return t;
        null != t && Ru.intervalProvider.clearInterval(t)
    }, Au.prototype.execute = function (e, t) {
        if (this.closed) return new Error("executing a cancelled action");
        this.pending = !1;
        e = this._execute(e, t);
        if (e) return e;
        !1 === this.pending && null != this.id && (this.id = this.recycleAsyncId(this.scheduler, this.id, null))
    }, Au.prototype._execute = function (e, t) {
        var r, n = !1;
        try {
            this.work(e)
        } catch (e) {
            n = !0, r = e || new Error("Scheduled action threw falsy error")
        }
        if (n) return this.unsubscribe(), r
    }, Au.prototype.unsubscribe = function () {
        var e, t, r;
        this.closed || (e = this.id, r = (t = this.scheduler).actions, this.work = this.state = this.scheduler = null, this.pending = !1, ku.arrRemove(r, this), null != e && (this.id = this.recycleAsyncId(t, e, null)), this.delay = null, Iu.prototype.unsubscribe.call(this))
    }, Au);

    function Au(e, t) {
        var r = Iu.call(this, e, t) || this;
        return r.scheduler = e, r.work = t, r.pending = !1, r
    }

    j.AsyncAction = Ou;
    var Mu, xu, Nu, Uu, Du, Lu, gu = {}, Cu = {},
        Bu = (Object.defineProperty(Cu, "__esModule", {value: !0}), Cu.TestTools = Cu.Immediate = void 0, 1), Fu = {};

    function Wu(e) {
        return e in Fu && (delete Fu[e], !0)
    }

    Cu.Immediate = {
        setImmediate: function (e) {
            var t = Bu++;
            return Fu[t] = !0, (Mu = Mu || Promise.resolve()).then(function () {
                return Wu(t) && e()
            }), t
        }, clearImmediate: function (e) {
            Wu(e)
        }
    }, Cu.TestTools = {
        pending: function () {
            return Object.keys(Fu).length
        }
    }, xu = gu, Nu = r && r.__read || function (e, t) {
        var r = "function" == typeof Symbol && e[Symbol.iterator];
        if (!r) return e;
        var n, o, i = r.call(e), u = [];
        try {
            for (; (void 0 === t || 0 < t--) && !(n = i.next()).done;) u.push(n.value)
        } catch (e) {
            o = {error: e}
        } finally {
            try {
                n && !n.done && (r = i.return) && r.call(i)
            } finally {
                if (o) throw o.error
            }
        }
        return u
    }, Uu = r && r.__spreadArray || function (e, t) {
        for (var r = 0, n = t.length, o = e.length; r < n; r++, o++) e[o] = t[r];
        return e
    }, Object.defineProperty(xu, "__esModule", {value: !0}), xu.immediateProvider = void 0, Du = Cu.Immediate.setImmediate, Lu = Cu.Immediate.clearImmediate, xu.immediateProvider = {
        setImmediate: function () {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            var r = xu.immediateProvider.delegate;
            return ((null == r ? void 0 : r.setImmediate) || Du).apply(void 0, Uu([], Nu(e)))
        }, clearImmediate: function (e) {
            var t = xu.immediateProvider.delegate;
            return ((null == t ? void 0 : t.clearImmediate) || Lu)(e)
        }, delegate: void 0
    };
    var zu, Ou = r && r.__extends || (zu = function (e, t) {
        return (zu = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
            e.__proto__ = t
        } || function (e, t) {
            for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
        })(e, t)
    }, function (e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

        function r() {
            this.constructor = e
        }

        zu(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
    });
    Object.defineProperty(T, "__esModule", {value: !0}), T.AsapAction = void 0;
    var qu, Vu = gu, Cu = (qu = j.AsyncAction, Ou(Hu, qu), Hu.prototype.requestAsyncId = function (e, t, r) {
        return null !== (r = void 0 === r ? 0 : r) && 0 < r ? qu.prototype.requestAsyncId.call(this, e, t, r) : (e.actions.push(this), e._scheduled || (e._scheduled = Vu.immediateProvider.setImmediate(e.flush.bind(e, void 0))))
    }, Hu.prototype.recycleAsyncId = function (e, t, r) {
        if (null != (r = void 0 === r ? 0 : r) ? 0 < r : 0 < this.delay) return qu.prototype.recycleAsyncId.call(this, e, t, r);
        var r = e.actions;
        null != t && (null == (r = r[r.length - 1]) ? void 0 : r.id) !== t && (Vu.immediateProvider.clearImmediate(t), e._scheduled = void 0)
    }, Hu);

    function Hu(e, t) {
        var r = qu.call(this, e, t) || this;
        return r.scheduler = e, r.work = t, r
    }

    T.AsapAction = Cu;
    var gu = {}, Ou = {}, Cu = {},
        Yu = (Object.defineProperty(Cu, "__esModule", {value: !0}), Cu.Scheduler = void 0, h);

    function Ku(e, t) {
        void 0 === t && (t = Ku.now), this.schedulerActionCtor = e, this.now = t
    }

    Ku.prototype.schedule = function (e, t, r) {
        return void 0 === t && (t = 0), new this.schedulerActionCtor(this, e).schedule(r, t)
    }, Ku.now = Yu.dateTimestampProvider.now, Cu.Scheduler = Ku;
    var Gu, Zu, Yu = r && r.__extends || (Gu = function (e, t) {
            return (Gu = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
            })(e, t)
        }, function (e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

            function r() {
                this.constructor = e
            }

            Gu(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
        }), Qu = (Object.defineProperty(Ou, "__esModule", {value: !0}), Ou.AsyncScheduler = void 0, Cu),
        Yu = (Zu = Qu.Scheduler, Yu(Xu, Zu), Xu.prototype.flush = function (e) {
            var t, r = this.actions;
            if (this._active) r.push(e); else {
                this._active = !0;
                do {
                    if (t = e.execute(e.state, e.delay)) break
                } while (e = r.shift());
                if (this._active = !1, t) {
                    for (; e = r.shift();) e.unsubscribe();
                    throw t
                }
            }
        }, Xu);

    function Xu(e, t) {
        void 0 === t && (t = Qu.Scheduler.now);
        e = Zu.call(this, e, t) || this;
        return e.actions = [], e._active = !1, e
    }

    Ou.AsyncScheduler = Yu;
    var Ju, Yu = r && r.__extends || (Ju = function (e, t) {
        return (Ju = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
            e.__proto__ = t
        } || function (e, t) {
            for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
        })(e, t)
    }, function (e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

        function r() {
            this.constructor = e
        }

        Ju(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
    });
    Object.defineProperty(gu, "__esModule", {value: !0}), gu.AsapScheduler = void 0;
    $u = Ou.AsyncScheduler, Yu(ea, $u), ea.prototype.flush = function (e) {
        this._active = !0;
        var t, r = this._scheduled, n = (this._scheduled = void 0, this.actions);
        e = e || n.shift();
        do {
            if (t = e.execute(e.state, e.delay)) break
        } while ((e = n[0]) && e.id === r && n.shift());
        if (this._active = !1, t) {
            for (; (e = n[0]) && e.id === r && n.shift();) e.unsubscribe();
            throw t
        }
    };
    var $u, Yu = ea;

    function ea() {
        return null !== $u && $u.apply(this, arguments) || this
    }

    gu.AsapScheduler = Yu, Yu = yu, Object.defineProperty(Yu, "__esModule", {value: !0}), Yu.asap = Yu.asapScheduler = void 0, Yu.asapScheduler = new gu.AsapScheduler(T.AsapAction), Yu.asap = Yu.asapScheduler;
    var ta, gu = {},
        Yu = (T = gu, Object.defineProperty(T, "__esModule", {value: !0}), T.async = T.asyncScheduler = void 0, T.asyncScheduler = new Ou.AsyncScheduler(j.AsyncAction), T.async = T.asyncScheduler, {}),
        T = {}, ra = r && r.__extends || (ta = function (e, t) {
            return (ta = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
            })(e, t)
        }, function (e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

            function r() {
                this.constructor = e
            }

            ta(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
        });
    Object.defineProperty(T, "__esModule", {value: !0}), T.QueueAction = void 0;
    na = j.AsyncAction, ra(oa, na), oa.prototype.schedule = function (e, t) {
        return 0 < (t = void 0 === t ? 0 : t) ? na.prototype.schedule.call(this, e, t) : (this.delay = t, this.state = e, this.scheduler.flush(this), this)
    }, oa.prototype.execute = function (e, t) {
        return 0 < t || this.closed ? na.prototype.execute.call(this, e, t) : this._execute(e, t)
    }, oa.prototype.requestAsyncId = function (e, t, r) {
        return null != (r = void 0 === r ? 0 : r) && 0 < r || null == r && 0 < this.delay ? na.prototype.requestAsyncId.call(this, e, t, r) : (e.flush(this), 0)
    };
    var na, ra = oa;

    function oa(e, t) {
        var r = na.call(this, e, t) || this;
        return r.scheduler = e, r.work = t, r
    }

    T.QueueAction = ra;
    var ia, ra = {}, ua = r && r.__extends || (ia = function (e, t) {
        return (ia = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
            e.__proto__ = t
        } || function (e, t) {
            for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
        })(e, t)
    }, function (e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

        function r() {
            this.constructor = e
        }

        ia(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
    });
    Object.defineProperty(ra, "__esModule", {value: !0}), ra.QueueScheduler = void 0;
    aa = Ou.AsyncScheduler, ua(sa, aa);
    var aa, ua = sa;

    function sa() {
        return null !== aa && aa.apply(this, arguments) || this
    }

    ra.QueueScheduler = ua, ua = Yu, Object.defineProperty(ua, "__esModule", {value: !0}), ua.queue = ua.queueScheduler = void 0, ua.queueScheduler = new ra.QueueScheduler(T.QueueAction), ua.queue = ua.queueScheduler;
    var ca, ra = {}, T = {}, ua = r && r.__extends || (ca = function (e, t) {
        return (ca = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
            e.__proto__ = t
        } || function (e, t) {
            for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
        })(e, t)
    }, function (e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

        function r() {
            this.constructor = e
        }

        ca(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
    });
    Object.defineProperty(T, "__esModule", {value: !0}), T.AnimationFrameAction = void 0;
    var la, fa = o, o = (la = j.AsyncAction, ua(pa, la), pa.prototype.requestAsyncId = function (e, t, r) {
        return null !== (r = void 0 === r ? 0 : r) && 0 < r ? la.prototype.requestAsyncId.call(this, e, t, r) : (e.actions.push(this), e._scheduled || (e._scheduled = fa.animationFrameProvider.requestAnimationFrame(function () {
            return e.flush(void 0)
        })))
    }, pa.prototype.recycleAsyncId = function (e, t, r) {
        if (null != (r = void 0 === r ? 0 : r) ? 0 < r : 0 < this.delay) return la.prototype.recycleAsyncId.call(this, e, t, r);
        var r = e.actions;
        null != t && (null == (r = r[r.length - 1]) ? void 0 : r.id) !== t && (fa.animationFrameProvider.cancelAnimationFrame(t), e._scheduled = void 0)
    }, pa);

    function pa(e, t) {
        var r = la.call(this, e, t) || this;
        return r.scheduler = e, r.work = t, r
    }

    T.AnimationFrameAction = o;
    var da, ua = {}, o = r && r.__extends || (da = function (e, t) {
        return (da = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
            e.__proto__ = t
        } || function (e, t) {
            for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
        })(e, t)
    }, function (e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

        function r() {
            this.constructor = e
        }

        da(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
    });
    Object.defineProperty(ua, "__esModule", {value: !0}), ua.AnimationFrameScheduler = void 0;
    ha = Ou.AsyncScheduler, o(ba, ha), ba.prototype.flush = function (e) {
        this._active = !0;
        var t, r = this._scheduled, n = (this._scheduled = void 0, this.actions);
        e = e || n.shift();
        do {
            if (t = e.execute(e.state, e.delay)) break
        } while ((e = n[0]) && e.id === r && n.shift());
        if (this._active = !1, t) {
            for (; (e = n[0]) && e.id === r && n.shift();) e.unsubscribe();
            throw t
        }
    };
    var ha, o = ba;

    function ba() {
        return null !== ha && ha.apply(this, arguments) || this
    }

    ua.AnimationFrameScheduler = o, o = ra, Object.defineProperty(o, "__esModule", {value: !0}), o.animationFrame = o.animationFrameScheduler = void 0, o.animationFrameScheduler = new ua.AnimationFrameScheduler(T.AnimationFrameAction), o.animationFrame = o.animationFrameScheduler;
    var ya, _a, ua = {}, T = r && r.__extends || (ya = function (e, t) {
            return (ya = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
            })(e, t)
        }, function (e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

            function r() {
                this.constructor = e
            }

            ya(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
        }),
        o = (Object.defineProperty(ua, "__esModule", {value: !0}), ua.VirtualAction = ua.VirtualTimeScheduler = void 0, j),
        va = _, j = (_a = Ou.AsyncScheduler, T(ma, _a), ma.prototype.flush = function () {
            for (var e, t, r = this.actions, n = this.maxFrames; (t = r[0]) && t.delay <= n && (r.shift(), this.frame = t.delay, !(e = t.execute(t.state, t.delay)));) ;
            if (e) {
                for (; t = r.shift();) t.unsubscribe();
                throw e
            }
        }, ma.frameTimeFactor = 10, ma);

    function ma(e, t) {
        void 0 === t && (t = 1 / 0);
        var r = _a.call(this, e = void 0 === e ? Oa : e, function () {
            return r.frame
        }) || this;
        return r.maxFrames = t, r.frame = 0, r.index = -1, r
    }

    ua.VirtualTimeScheduler = j;
    ga = o.AsyncAction, T(wa, ga), wa.prototype.schedule = function (e, t) {
        if (void 0 === t && (t = 0), Number.isFinite(t)) {
            if (!this.id) return ga.prototype.schedule.call(this, e, t);
            this.active = !1;
            var r = new wa(this.scheduler, this.work);
            return this.add(r), r.schedule(e, t)
        }
        return va.Subscription.EMPTY
    }, wa.prototype.requestAsyncId = function (e, t, r) {
        this.delay = e.frame + (r = void 0 === r ? 0 : r);
        r = e.actions;
        return r.push(this), r.sort(wa.sortActions), 1
    }, wa.prototype.recycleAsyncId = function (e, t, r) {
    }, wa.prototype._execute = function (e, t) {
        if (!0 === this.active) return ga.prototype._execute.call(this, e, t)
    }, wa.sortActions = function (e, t) {
        return e.delay === t.delay ? e.index === t.index ? 0 : e.index > t.index ? 1 : -1 : e.delay > t.delay ? 1 : -1
    };
    var ga, Oa = wa;

    function wa(e, t, r) {
        void 0 === r && (r = e.index += 1);
        var n = ga.call(this, e, t) || this;
        return n.scheduler = e, n.work = t, n.index = r, n.active = !0, n.index = e.index = r, n
    }

    ua.VirtualAction = Oa;
    var Ea, Pa, Ou = {}, j = {},
        o = (Ea = j, Object.defineProperty(Ea, "__esModule", {value: !0}), Ea.empty = Ea.EMPTY = void 0, Pa = s, Ea.EMPTY = new Pa.Observable(function (e) {
            return e.complete()
        }), Ea.empty = function (e) {
            return e ? (t = e, new Pa.Observable(function (e) {
                return t.schedule(function () {
                    return e.complete()
                })
            })) : Ea.EMPTY;
            var t
        }, {}), T = {}, Sa = {},
        Ta = (Object.defineProperty(Sa, "__esModule", {value: !0}), Sa.isScheduler = void 0, g);
    Sa.isScheduler = function (e) {
        return e && Ta.isFunction(e.schedule)
    }, Object.defineProperty(T, "__esModule", {value: !0}), T.popNumber = T.popScheduler = T.popResultSelector = void 0;
    var ja = g, Ca = Sa;

    function Ia(e) {
        return e[e.length - 1]
    }

    T.popResultSelector = function (e) {
        return ja.isFunction(Ia(e)) ? e.pop() : void 0
    }, T.popScheduler = function (e) {
        return Ca.isScheduler(Ia(e)) ? e.pop() : void 0
    }, T.popNumber = function (e, t) {
        return "number" == typeof Ia(e) ? e.pop() : t
    };
    var Ra = {}, ka = {}, Aa = {}, C = {}, Ma = {},
        xa = (Object.defineProperty(Ma, "__esModule", {value: !0}), Ma.isArrayLike = void 0, Ma.isArrayLike = function (e) {
            return e && "number" == typeof e.length && "function" != typeof e
        }, {}), Na = (Object.defineProperty(xa, "__esModule", {value: !0}), xa.isPromise = void 0, g);
    xa.isPromise = function (e) {
        return Na.isFunction(null == e ? void 0 : e.then)
    };
    var Ua = {}, Da = (Object.defineProperty(Ua, "__esModule", {value: !0}), Ua.isInteropObservable = void 0, jr),
        La = g;
    Ua.isInteropObservable = function (e) {
        return La.isFunction(e[Da.observable])
    };
    var Ba = {}, Fa = (Object.defineProperty(Ba, "__esModule", {value: !0}), Ba.isAsyncIterable = void 0, g);
    Ba.isAsyncIterable = function (e) {
        return Symbol.asyncIterator && Fa.isFunction(null == e ? void 0 : e[Symbol.asyncIterator])
    };
    var Wa = {};
    Object.defineProperty(Wa, "__esModule", {value: !0}), Wa.createInvalidObservableTypeError = void 0, Wa.createInvalidObservableTypeError = function (e) {
        return new TypeError("You provided " + (null !== e && "object" == typeof e ? "an invalid object" : "'" + e + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.")
    };
    var za = {}, qa = {};

    function Va() {
        return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator"
    }

    Object.defineProperty(qa, "__esModule", {value: !0}), qa.iterator = qa.getSymbolIterator = void 0, qa.getSymbolIterator = Va, qa.iterator = Va(), Object.defineProperty(za, "__esModule", {value: !0}), za.isIterable = void 0;
    var Ha = qa, Ya = g;
    za.isIterable = function (e) {
        return Ya.isFunction(null == e ? void 0 : e[Ha.iterator])
    };
    var Ka = {}, Ga = r && r.__generator || function (n, o) {
            var i, u, a, s = {
                label: 0, sent: function () {
                    if (1 & a[0]) throw a[1];
                    return a[1]
                }, trys: [], ops: []
            }, e = {next: t(0), throw: t(1), return: t(2)};
            return "function" == typeof Symbol && (e[Symbol.iterator] = function () {
                return this
            }), e;

            function t(r) {
                return function (e) {
                    var t = [r, e];
                    if (i) throw new TypeError("Generator is already executing.");
                    for (; s;) try {
                        if (i = 1, u && (a = 2 & t[0] ? u.return : t[0] ? u.throw || ((a = u.return) && a.call(u), 0) : u.next) && !(a = a.call(u, t[1])).done) return a;
                        switch (u = 0, (t = a ? [2 & t[0], a.value] : t)[0]) {
                            case 0:
                            case 1:
                                a = t;
                                break;
                            case 4:
                                return s.label++, {value: t[1], done: !1};
                            case 5:
                                s.label++, u = t[1], t = [0];
                                continue;
                            case 7:
                                t = s.ops.pop(), s.trys.pop();
                                continue;
                            default:
                                if (!(a = 0 < (a = s.trys).length && a[a.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                    s = 0;
                                    continue
                                }
                                if (3 === t[0] && (!a || t[1] > a[0] && t[1] < a[3])) {
                                    s.label = t[1];
                                    break
                                }
                                if (6 === t[0] && s.label < a[1]) {
                                    s.label = a[1], a = t;
                                    break
                                }
                                if (a && s.label < a[2]) {
                                    s.label = a[2], s.ops.push(t);
                                    break
                                }
                                a[2] && s.ops.pop(), s.trys.pop();
                                continue
                        }
                        t = o.call(n, s)
                    } catch (e) {
                        t = [6, e], u = 0
                    } finally {
                        i = a = 0
                    }
                    if (5 & t[0]) throw t[1];
                    return {value: t[0] ? t[1] : void 0, done: !0}
                }
            }
        }, Za = r && r.__await || function (e) {
            return this instanceof Za ? (this.v = e, this) : new Za(e)
        }, Qa = r && r.__asyncGenerator || function (e, t, r) {
            if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
            var o = r.apply(e, t || []), i = [], u = {};
            return n("next"), n("throw"), n("return"), u[Symbol.asyncIterator] = function () {
                return this
            }, u;

            function n(n) {
                o[n] && (u[n] = function (r) {
                    return new Promise(function (e, t) {
                        1 < i.push([n, r, e, t]) || a(n, r)
                    })
                })
            }

            function a(e, t) {
                try {
                    (r = o[e](t)).value instanceof Za ? Promise.resolve(r.value.v).then(s, c) : l(i[0][2], r)
                } catch (e) {
                    l(i[0][3], e)
                }
                var r
            }

            function s(e) {
                a("next", e)
            }

            function c(e) {
                a("throw", e)
            }

            function l(e, t) {
                e(t), i.shift(), i.length && a(i[0][0], i[0][1])
            }
        },
        Xa = (Object.defineProperty(Ka, "__esModule", {value: !0}), Ka.isReadableStreamLike = Ka.readableStreamLikeToAsyncGenerator = void 0, g);
    Ka.readableStreamLikeToAsyncGenerator = function (o) {
        return Qa(this, arguments, function () {
            var t, r, n;
            return Ga(this, function (e) {
                switch (e.label) {
                    case 0:
                        t = o.getReader(), e.label = 1;
                    case 1:
                        e.trys.push([1, , 9, 10]), e.label = 2;
                    case 2:
                        return [4, Za(t.read())];
                    case 3:
                        return (r = e.sent(), n = r.value, r.done) ? [4, Za(void 0)] : [3, 5];
                    case 4:
                        return [2, e.sent()];
                    case 5:
                        return [4, Za(n)];
                    case 6:
                        return [4, e.sent()];
                    case 7:
                        return e.sent(), [3, 2];
                    case 8:
                        return [3, 10];
                    case 9:
                        return t.releaseLock(), [7];
                    case 10:
                        return [2]
                }
            })
        })
    }, Ka.isReadableStreamLike = function (e) {
        return Xa.isFunction(null == e ? void 0 : e.getReader)
    };
    var Ja = r && r.__awaiter || function (e, u, a, s) {
            return new (a = a || Promise)(function (r, t) {
                function n(e) {
                    try {
                        i(s.next(e))
                    } catch (e) {
                        t(e)
                    }
                }

                function o(e) {
                    try {
                        i(s.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }

                function i(e) {
                    var t;
                    e.done ? r(e.value) : ((t = e.value) instanceof a ? t : new a(function (e) {
                        e(t)
                    })).then(n, o)
                }

                i((s = s.apply(e, u || [])).next())
            })
        }, $a = r && r.__generator || function (n, o) {
            var i, u, a, s = {
                label: 0, sent: function () {
                    if (1 & a[0]) throw a[1];
                    return a[1]
                }, trys: [], ops: []
            }, e = {next: t(0), throw: t(1), return: t(2)};
            return "function" == typeof Symbol && (e[Symbol.iterator] = function () {
                return this
            }), e;

            function t(r) {
                return function (e) {
                    var t = [r, e];
                    if (i) throw new TypeError("Generator is already executing.");
                    for (; s;) try {
                        if (i = 1, u && (a = 2 & t[0] ? u.return : t[0] ? u.throw || ((a = u.return) && a.call(u), 0) : u.next) && !(a = a.call(u, t[1])).done) return a;
                        switch (u = 0, (t = a ? [2 & t[0], a.value] : t)[0]) {
                            case 0:
                            case 1:
                                a = t;
                                break;
                            case 4:
                                return s.label++, {value: t[1], done: !1};
                            case 5:
                                s.label++, u = t[1], t = [0];
                                continue;
                            case 7:
                                t = s.ops.pop(), s.trys.pop();
                                continue;
                            default:
                                if (!(a = 0 < (a = s.trys).length && a[a.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                    s = 0;
                                    continue
                                }
                                if (3 === t[0] && (!a || t[1] > a[0] && t[1] < a[3])) {
                                    s.label = t[1];
                                    break
                                }
                                if (6 === t[0] && s.label < a[1]) {
                                    s.label = a[1], a = t;
                                    break
                                }
                                if (a && s.label < a[2]) {
                                    s.label = a[2], s.ops.push(t);
                                    break
                                }
                                a[2] && s.ops.pop(), s.trys.pop();
                                continue
                        }
                        t = o.call(n, s)
                    } catch (e) {
                        t = [6, e], u = 0
                    } finally {
                        i = a = 0
                    }
                    if (5 & t[0]) throw t[1];
                    return {value: t[0] ? t[1] : void 0, done: !0}
                }
            }
        }, es = r && r.__asyncValues || function (u) {
            if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
            var e, t = u[Symbol.asyncIterator];
            return t ? t.call(u) : (u = "function" == typeof ts ? ts(u) : u[Symbol.iterator](), e = {}, r("next"), r("throw"), r("return"), e[Symbol.asyncIterator] = function () {
                return this
            }, e);

            function r(i) {
                e[i] = u[i] && function (o) {
                    return new Promise(function (e, t) {
                        var r, n;
                        o = u[i](o), r = e, e = t, n = o.done, t = o.value, Promise.resolve(t).then(function (e) {
                            r({value: e, done: n})
                        }, e)
                    })
                }
            }
        }, ts = r && r.__values || function (e) {
            var t = "function" == typeof Symbol && Symbol.iterator, r = t && e[t], n = 0;
            if (r) return r.call(e);
            if (e && "number" == typeof e.length) return {
                next: function () {
                    return {value: (e = e && n >= e.length ? void 0 : e) && e[n++], done: !e}
                }
            };
            throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
        },
        rs = (Object.defineProperty(C, "__esModule", {value: !0}), C.fromReadableStreamLike = C.fromAsyncIterable = C.fromIterable = C.fromPromise = C.fromArrayLike = C.fromInteropObservable = C.innerFrom = void 0, Ma),
        ns = xa, os = s, is = Ua, us = Ba, as = Wa, ss = za, cs = Ka, ls = g, fs = v, ps = jr;

    function ds(r) {
        return new os.Observable(function (e) {
            var t = r[ps.observable]();
            if (ls.isFunction(t.subscribe)) return t.subscribe(e);
            throw new TypeError("Provided object does not correctly implement Symbol.observable")
        })
    }

    function hs(r) {
        return new os.Observable(function (e) {
            for (var t = 0; t < r.length && !e.closed; t++) e.next(r[t]);
            e.complete()
        })
    }

    function bs(e) {
        return new os.Observable(function (t) {
            e.then(function (e) {
                t.closed || (t.next(e), t.complete())
            }, function (e) {
                return t.error(e)
            }).then(null, fs.reportUnhandledError)
        })
    }

    function ys(u) {
        return new os.Observable(function (e) {
            var t, r;
            try {
                for (var n = ts(u), o = n.next(); !o.done; o = n.next()) {
                    var i = o.value;
                    if (e.next(i), e.closed) return
                }
            } catch (e) {
                t = {error: e}
            } finally {
                try {
                    o && !o.done && (r = n.return) && r.call(n)
                } finally {
                    if (t) throw t.error
                }
            }
            e.complete()
        })
    }

    function _s(e) {
        return new os.Observable(function (t) {
            !function (r, n) {
                var o, i, u, a;
                return Ja(this, void 0, void 0, function () {
                    var t;
                    return $a(this, function (e) {
                        switch (e.label) {
                            case 0:
                                e.trys.push([0, 5, 6, 11]), o = es(r), e.label = 1;
                            case 1:
                                return [4, o.next()];
                            case 2:
                                if ((i = e.sent()).done) return [3, 4];
                                if (t = i.value, n.next(t), n.closed) return [2];
                                e.label = 3;
                            case 3:
                                return [3, 1];
                            case 4:
                                return [3, 11];
                            case 5:
                                return t = e.sent(), u = {error: t}, [3, 11];
                            case 6:
                                return (e.trys.push([6, , 9, 10]), i && !i.done && (a = o.return)) ? [4, a.call(o)] : [3, 8];
                            case 7:
                                e.sent(), e.label = 8;
                            case 8:
                                return [3, 10];
                            case 9:
                                if (u) throw u.error;
                                return [7];
                            case 10:
                                return [7];
                            case 11:
                                return n.complete(), [2]
                        }
                    })
                })
            }(e, t).catch(function (e) {
                return t.error(e)
            })
        })
    }

    function vs(e) {
        return _s(cs.readableStreamLikeToAsyncGenerator(e))
    }

    C.innerFrom = function (e) {
        if (e instanceof os.Observable) return e;
        if (null != e) {
            if (is.isInteropObservable(e)) return ds(e);
            if (rs.isArrayLike(e)) return hs(e);
            if (ns.isPromise(e)) return bs(e);
            if (us.isAsyncIterable(e)) return _s(e);
            if (ss.isIterable(e)) return ys(e);
            if (cs.isReadableStreamLike(e)) return vs(e)
        }
        throw as.createInvalidObservableTypeError(e)
    }, C.fromInteropObservable = ds, C.fromArrayLike = hs, C.fromPromise = bs, C.fromIterable = ys, C.fromAsyncIterable = _s, C.fromReadableStreamLike = vs;
    var v = {}, ms = {};
    Object.defineProperty(ms, "__esModule", {value: !0}), ms.executeSchedule = void 0, ms.executeSchedule = function (e, t, r, n, o) {
        if (void 0 === n && (n = 0), void 0 === o && (o = !1), t = t.schedule(function () {
            r(), o ? e.add(this.schedule(null, n)) : this.unsubscribe()
        }, n), e.add(t), !o) return t
    }, Object.defineProperty(v, "__esModule", {value: !0}), v.observeOn = void 0;
    var gs = ms, Os = S, ws = O;
    v.observeOn = function (r, n) {
        return void 0 === n && (n = 0), Os.operate(function (e, t) {
            e.subscribe(ws.createOperatorSubscriber(t, function (e) {
                return gs.executeSchedule(t, r, function () {
                    return t.next(e)
                }, n)
            }, function () {
                return gs.executeSchedule(t, r, function () {
                    return t.complete()
                }, n)
            }, function (e) {
                return gs.executeSchedule(t, r, function () {
                    return t.error(e)
                }, n)
            }))
        })
    };
    var Es = {}, Ps = (Object.defineProperty(Es, "__esModule", {value: !0}), Es.subscribeOn = void 0, S);
    Es.subscribeOn = function (r, n) {
        return void 0 === n && (n = 0), Ps.operate(function (e, t) {
            t.add(r.schedule(function () {
                return e.subscribe(t)
            }, n))
        })
    }, Object.defineProperty(Aa, "__esModule", {value: !0}), Aa.scheduleObservable = void 0;
    var Ss = C, Ts = v, js = Es;
    Aa.scheduleObservable = function (e, t) {
        return Ss.innerFrom(e).pipe(js.subscribeOn(t), Ts.observeOn(t))
    };
    var Cs = {}, Is = (Object.defineProperty(Cs, "__esModule", {value: !0}), Cs.schedulePromise = void 0, C), Rs = v,
        ks = Es;
    Cs.schedulePromise = function (e, t) {
        return Is.innerFrom(e).pipe(ks.subscribeOn(t), Rs.observeOn(t))
    };
    var As = {}, Ms = (Object.defineProperty(As, "__esModule", {value: !0}), As.scheduleArray = void 0, s);
    As.scheduleArray = function (r, n) {
        return new Ms.Observable(function (e) {
            var t = 0;
            return n.schedule(function () {
                t === r.length ? e.complete() : (e.next(r[t++]), e.closed || this.schedule())
            })
        })
    };
    var xs = {}, Ns = (Object.defineProperty(xs, "__esModule", {value: !0}), xs.scheduleIterable = void 0, s), Us = qa,
        Ds = g, Ls = ms;
    xs.scheduleIterable = function (e, t) {
        return new Ns.Observable(function (n) {
            var o;
            return Ls.executeSchedule(n, t, function () {
                o = e[Us.iterator](), Ls.executeSchedule(n, t, function () {
                    var e, t, r;
                    try {
                        t = (e = o.next()).value, r = e.done
                    } catch (e) {
                        return void n.error(e)
                    }
                    r ? n.complete() : n.next(t)
                }, 0, !0)
            }), function () {
                return Ds.isFunction(null == o ? void 0 : o.return) && o.return()
            }
        })
    };
    var qa = {}, Bs = (Object.defineProperty(qa, "__esModule", {value: !0}), qa.scheduleAsyncIterable = void 0, s),
        Fs = ms;
    qa.scheduleAsyncIterable = function (r, n) {
        if (r) return new Bs.Observable(function (t) {
            Fs.executeSchedule(t, n, function () {
                var e = r[Symbol.asyncIterator]();
                Fs.executeSchedule(t, n, function () {
                    e.next().then(function (e) {
                        e.done ? t.complete() : t.next(e.value)
                    })
                }, 0, !0)
            })
        });
        throw new Error("Iterable cannot be null")
    };
    var Ws = {},
        zs = (Object.defineProperty(Ws, "__esModule", {value: !0}), Ws.scheduleReadableStreamLike = void 0, qa),
        qs = Ka;
    Ws.scheduleReadableStreamLike = function (e, t) {
        return zs.scheduleAsyncIterable(qs.readableStreamLikeToAsyncGenerator(e), t)
    }, Object.defineProperty(ka, "__esModule", {value: !0}), ka.scheduled = void 0;
    var Vs = Aa, Hs = Cs, Ys = As, Ks = xs, Gs = qa, Zs = Ua, Qs = xa, Xs = Ma, Js = za, $s = Ba, ec = Wa, tc = Ka,
        rc = Ws;
    ka.scheduled = function (e, t) {
        if (null != e) {
            if (Zs.isInteropObservable(e)) return Vs.scheduleObservable(e, t);
            if (Xs.isArrayLike(e)) return Ys.scheduleArray(e, t);
            if (Qs.isPromise(e)) return Hs.schedulePromise(e, t);
            if ($s.isAsyncIterable(e)) return Gs.scheduleAsyncIterable(e, t);
            if (Js.isIterable(e)) return Ks.scheduleIterable(e, t);
            if (tc.isReadableStreamLike(e)) return rc.scheduleReadableStreamLike(e, t)
        }
        throw ec.createInvalidObservableTypeError(e)
    }, Object.defineProperty(Ra, "__esModule", {value: !0}), Ra.from = void 0;
    var nc = ka, oc = C;
    Ra.from = function (e, t) {
        return t ? nc.scheduled(e, t) : oc.innerFrom(e)
    }, Object.defineProperty(o, "__esModule", {value: !0}), o.of = void 0;
    var ic = T, uc = Ra;
    o.of = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        var r = ic.popScheduler(e);
        return uc.from(e, r)
    };
    var ac, sc, cc, lc, Aa = {}, fc = (Object.defineProperty(Aa, "__esModule", {value: !0}), Aa.throwError = void 0, s),
        pc = g;

    function dc(e, t, r) {
        this.kind = e, this.value = t, this.error = r, this.hasValue = "N" === e
    }

    function hc(e, t) {
        var r, n = e.kind, o = e.value, e = e.error;
        if ("string" != typeof n) throw new TypeError('Invalid notification, missing "kind"');
        "N" === n ? null != (r = t.next) && r.call(t, o) : "E" === n ? null != (r = t.error) && r.call(t, e) : null != (o = t.complete) && o.call(t)
    }

    Aa.throwError = function (e, t) {
        function r(e) {
            return e.error(n())
        }

        var n = pc.isFunction(e) ? e : function () {
            return e
        };
        return new fc.Observable(t ? function (e) {
            return t.schedule(r, 0, e)
        } : r)
    }, Cs = Ou, Object.defineProperty(Cs, "__esModule", {value: !0}), Cs.observeNotification = Cs.Notification = Cs.NotificationKind = void 0, ac = j, sc = o, cc = Aa, lc = g, (As = Cs.NotificationKind || (Cs.NotificationKind = {})).NEXT = "N", As.ERROR = "E", As.COMPLETE = "C", dc.prototype.observe = function (e) {
        return hc(this, e)
    }, dc.prototype.do = function (e, t, r) {
        var n = this.kind, o = this.value, i = this.error;
        return "N" === n ? null == e ? void 0 : e(o) : "E" === n ? null == t ? void 0 : t(i) : null == r ? void 0 : r()
    }, dc.prototype.accept = function (e, t, r) {
        var n;
        return lc.isFunction(null == (n = e) ? void 0 : n.next) ? this.observe(e) : this.do(e, t, r)
    }, dc.prototype.toObservable = function () {
        var e = this.kind, t = this.value, r = this.error,
            t = "N" === e ? sc.of(t) : "E" === e ? cc.throwError(function () {
                return r
            }) : "C" === e ? ac.EMPTY : 0;
        if (t) return t;
        throw new TypeError("Unexpected notification kind " + e)
    }, dc.createNext = function (e) {
        return new dc("N", e)
    }, dc.createError = function (e) {
        return new dc("E", void 0, e)
    }, dc.createComplete = function () {
        return dc.completeNotification
    }, dc.completeNotification = new dc("C"), As = dc, Cs.Notification = As, Cs.observeNotification = hc;
    var qa = {}, bc = (Object.defineProperty(qa, "__esModule", {value: !0}), qa.isObservable = void 0, s), yc = g;
    qa.isObservable = function (e) {
        return !!e && (e instanceof bc.Observable || yc.isFunction(e.lift) && yc.isFunction(e.subscribe))
    };
    var Ua = {}, xa = {}, za = (Object.defineProperty(xa, "__esModule", {value: !0}), xa.EmptyError = void 0, a),
        _c = (xa.EmptyError = za.createErrorClass(function (e) {
            return function () {
                e(this), this.name = "EmptyError", this.message = "no elements in sequence"
            }
        }), Object.defineProperty(Ua, "__esModule", {value: !0}), Ua.lastValueFrom = void 0, xa);
    Ua.lastValueFrom = function (o, i) {
        var u = "object" == typeof i;
        return new Promise(function (e, t) {
            var r, n = !1;
            o.subscribe({
                next: function (e) {
                    r = e, n = !0
                }, error: t, complete: function () {
                    n ? e(r) : u ? e(i.defaultValue) : t(new _c.EmptyError)
                }
            })
        })
    };
    var Ba = {}, vc = (Object.defineProperty(Ba, "__esModule", {value: !0}), Ba.firstValueFrom = void 0, xa), mc = Mr;
    Ba.firstValueFrom = function (n, o) {
        var i = "object" == typeof o;
        return new Promise(function (t, e) {
            var r = new mc.SafeSubscriber({
                next: function (e) {
                    t(e), r.unsubscribe()
                }, error: e, complete: function () {
                    i ? t(o.defaultValue) : e(new vc.EmptyError)
                }
            });
            n.subscribe(r)
        })
    };
    var gc, Oc, wc, Ec, Pc, Sc, Tc, Wa = {},
        Ka = (Object.defineProperty(Wa, "__esModule", {value: !0}), Wa.ArgumentOutOfRangeError = void 0, a),
        Ws = (Wa.ArgumentOutOfRangeError = Ka.createErrorClass(function (e) {
            return function () {
                e(this), this.name = "ArgumentOutOfRangeError", this.message = "argument out of range"
            }
        }), {}), As = (Object.defineProperty(Ws, "__esModule", {value: !0}), Ws.NotFoundError = void 0, a),
        Cs = (Ws.NotFoundError = As.createErrorClass(function (t) {
            return function (e) {
                t(this), this.name = "NotFoundError", this.message = e
            }
        }), {}), za = (Object.defineProperty(Cs, "__esModule", {value: !0}), Cs.SequenceError = void 0, a),
        Ka = (Cs.SequenceError = za.createErrorClass(function (t) {
            return function (e) {
                t(this), this.name = "SequenceError", this.message = e
            }
        }), {}), As = {};

    function jc(e) {
        throw new gc.TimeoutError(e)
    }

    Object.defineProperty(As, "__esModule", {value: !0}), As.isValidDate = void 0, As.isValidDate = function (e) {
        return e instanceof Date && !isNaN(e)
    }, gc = Ka, Object.defineProperty(gc, "__esModule", {value: !0}), gc.timeout = gc.TimeoutError = void 0, Oc = gu, wc = As, Ec = S, Pc = C, Sc = O, Tc = ms, gc.TimeoutError = a.createErrorClass(function (t) {
        return function (e) {
            void 0 === e && (e = null), t(this), this.message = "Timeout has occurred", this.name = "TimeoutError", this.info = e
        }
    }), gc.timeout = function (e, t) {
        var a = (e = wc.isValidDate(e) ? {first: e} : "number" == typeof e ? {each: e} : e).first, s = e.each,
            r = e.with, c = void 0 === r ? jc : r,
            l = void 0 === (r = e.scheduler) ? null != t ? t : Oc.asyncScheduler : r,
            f = void 0 === (t = e.meta) ? null : t;
        if (null == a && null == s) throw new TypeError("No timeout provided.");
        return Ec.operate(function (e, t) {
            function r(e) {
                n = Tc.executeSchedule(t, l, function () {
                    try {
                        u.unsubscribe(), Pc.innerFrom(c({meta: f, lastValue: o, seen: i})).subscribe(t)
                    } catch (e) {
                        t.error(e)
                    }
                }, e)
            }

            var n, o = null, i = 0, u = e.subscribe(Sc.createOperatorSubscriber(t, function (e) {
                null != n && n.unsubscribe(), i++, t.next(o = e), 0 < s && r(s)
            }, void 0, void 0, function () {
                null != n && n.closed || null != n && n.unsubscribe(), o = null
            }));
            i || r(null != a ? "number" == typeof a ? a : +a - l.now() : s)
        })
    };
    var za = {}, a = {}, Cc = {}, Ic = {},
        Rc = (Object.defineProperty(Ic, "__esModule", {value: !0}), Ic.map = void 0, S), kc = O;
    Ic.map = function (n, o) {
        return Rc.operate(function (e, t) {
            var r = 0;
            e.subscribe(kc.createOperatorSubscriber(t, function (e) {
                t.next(n.call(o, e, r++))
            }))
        })
    };
    var Ac = r && r.__read || function (e, t) {
            var r = "function" == typeof Symbol && e[Symbol.iterator];
            if (!r) return e;
            var n, o, i = r.call(e), u = [];
            try {
                for (; (void 0 === t || 0 < t--) && !(n = i.next()).done;) u.push(n.value)
            } catch (e) {
                o = {error: e}
            } finally {
                try {
                    n && !n.done && (r = i.return) && r.call(i)
                } finally {
                    if (o) throw o.error
                }
            }
            return u
        }, Mc = r && r.__spreadArray || function (e, t) {
            for (var r = 0, n = t.length, o = e.length; r < n; r++, o++) e[o] = t[r];
            return e
        }, xc = (Object.defineProperty(Cc, "__esModule", {value: !0}), Cc.mapOneOrManyArgs = void 0, Ic),
        Nc = Array.isArray;
    Cc.mapOneOrManyArgs = function (r) {
        return xc.map(function (e) {
            return t = r, Nc(e = e) ? t.apply(void 0, Mc([], Ac(e))) : t(e);
            var t
        })
    };
    var Uc = r && r.__read || function (e, t) {
            var r = "function" == typeof Symbol && e[Symbol.iterator];
            if (!r) return e;
            var n, o, i = r.call(e), u = [];
            try {
                for (; (void 0 === t || 0 < t--) && !(n = i.next()).done;) u.push(n.value)
            } catch (e) {
                o = {error: e}
            } finally {
                try {
                    n && !n.done && (r = i.return) && r.call(i)
                } finally {
                    if (o) throw o.error
                }
            }
            return u
        }, Dc = r && r.__spreadArray || function (e, t) {
            for (var r = 0, n = t.length, o = e.length; r < n; r++, o++) e[o] = t[r];
            return e
        }, Lc = (Object.defineProperty(a, "__esModule", {value: !0}), a.bindCallbackInternals = void 0, Sa), Bc = s,
        Fc = Es, Wc = Cc, zc = v, qc = l;
    a.bindCallbackInternals = function r(a, s, n, o) {
        if (n) {
            if (!Lc.isScheduler(n)) return function () {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                return r(a, s, o).apply(this, e).pipe(Wc.mapOneOrManyArgs(n))
            };
            o = n
        }
        return o ? function () {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return r(a, s).apply(this, e).pipe(Fc.subscribeOn(o), zc.observeOn(o))
        } : function () {
            for (var t = this, r = [], e = 0; e < arguments.length; e++) r[e] = arguments[e];
            var i = new qc.AsyncSubject, u = !0;
            return new Bc.Observable(function (e) {
                var n, o, e = i.subscribe(e);
                return u && (n = u = !1, o = !1, s.apply(t, Dc(Dc([], Uc(r)), [function () {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    if (a) {
                        var r = e.shift();
                        if (null != r) return void i.error(r)
                    }
                    i.next(1 < e.length ? e : e[0]), o = !0, n && i.complete()
                }])), o && i.complete(), n = !0), e
            })
        }
    }, Object.defineProperty(za, "__esModule", {value: !0}), za.bindCallback = void 0;
    var Vc = a;
    za.bindCallback = function (e, t, r) {
        return Vc.bindCallbackInternals(!1, e, t, r)
    };
    var Hc = {}, Yc = (Object.defineProperty(Hc, "__esModule", {value: !0}), Hc.bindNodeCallback = void 0, a);
    Hc.bindNodeCallback = function (e, t, r) {
        return Yc.bindCallbackInternals(!0, e, t, r)
    };
    var a = {}, Kc = {},
        Gc = (Object.defineProperty(Kc, "__esModule", {value: !0}), Kc.argsArgArrayOrObject = void 0, Array.isArray),
        Zc = Object.getPrototypeOf, Qc = Object.prototype, Xc = Object.keys;
    Kc.argsArgArrayOrObject = function (e) {
        if (1 === e.length) {
            var t = e[0];
            if (Gc(t)) return {args: t, keys: null};
            if ((r = t) && "object" == typeof r && Zc(r) === Qc) return {
                args: (r = Xc(t)).map(function (e) {
                    return t[e]
                }), keys: r
            }
        }
        var r;
        return {args: e, keys: null}
    };
    var Jc = {};
    Object.defineProperty(Jc, "__esModule", {value: !0}), Jc.createObject = void 0, Jc.createObject = function (e, n) {
        return e.reduce(function (e, t, r) {
            return e[t] = n[r], e
        }, {})
    }, Object.defineProperty(a, "__esModule", {value: !0}), a.combineLatestInit = a.combineLatest = void 0;
    var $c = s, el = Kc, tl = Ra, rl = P, nl = Cc, ol = T, il = Jc, ul = O, al = ms;

    function sl(a, s, c) {
        return void 0 === c && (c = rl.identity), function (u) {
            cl(s, function () {
                for (var e = a.length, n = new Array(e), o = e, i = e, t = 0; t < e; t++) !function (r) {
                    cl(s, function () {
                        var e = tl.from(a[r], s), t = !1;
                        e.subscribe(ul.createOperatorSubscriber(u, function (e) {
                            n[r] = e, t || (t = !0, i--), i || u.next(c(n.slice()))
                        }, function () {
                            --o || u.complete()
                        }))
                    }, u)
                }(t)
            }, u)
        }
    }

    function cl(e, t, r) {
        e ? al.executeSchedule(r, e, t) : t()
    }

    a.combineLatest = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        var r = ol.popScheduler(e), n = ol.popResultSelector(e), o = el.argsArgArrayOrObject(e), i = o.args, u = o.keys;
        return 0 === i.length ? tl.from([], r) : (o = new $c.Observable(sl(i, r, u ? function (e) {
            return il.createObject(u, e)
        } : rl.identity)), n ? o.pipe(nl.mapOneOrManyArgs(n)) : o)
    }, a.combineLatestInit = sl;
    var ll = {}, fl = {}, pl = {}, dl = {}, hl = {},
        bl = (Object.defineProperty(hl, "__esModule", {value: !0}), hl.mergeInternals = void 0, C), yl = ms, _l = O;
    hl.mergeInternals = function (e, r, n, o, i, u, a, t) {
        var s = [], c = 0, l = 0, f = function () {
            s.length || c || r.complete()
        }, p = function (e) {
            return c < o ? d(e) : s.push(e)
        }, d = function (e) {
            u && r.next(e), c++;
            var t = !1;
            bl.innerFrom(n(e, l++)).subscribe(_l.createOperatorSubscriber(r, function (e) {
                null != i && i(e), u ? p(e) : r.next(e)
            }, function () {
                t = !0
            }, void 0, function () {
                if (t) try {
                    c--;
                    for (; s.length && c < o;) !function () {
                        var e = s.shift();
                        a ? yl.executeSchedule(r, a, function () {
                            return d(e)
                        }) : d(e)
                    }();
                    f()
                } catch (e) {
                    r.error(e)
                }
            }))
        };
        return e.subscribe(_l.createOperatorSubscriber(r, p, function () {
            f()
        })), function () {
            null != t && t()
        }
    }, Object.defineProperty(dl, "__esModule", {value: !0}), dl.mergeMap = void 0;
    var vl = Ic, ml = C, gl = S, Ol = hl, wl = g;
    dl.mergeMap = function e(o, i, r) {
        return void 0 === r && (r = 1 / 0), wl.isFunction(i) ? e(function (r, n) {
            return vl.map(function (e, t) {
                return i(r, e, n, t)
            })(ml.innerFrom(o(r, n)))
        }, r) : ("number" == typeof i && (r = i), gl.operate(function (e, t) {
            return Ol.mergeInternals(e, t, o, r)
        }))
    }, Object.defineProperty(pl, "__esModule", {value: !0}), pl.mergeAll = void 0;
    var El = dl, Pl = P;
    pl.mergeAll = function (e) {
        return El.mergeMap(Pl.identity, e = void 0 === e ? 1 / 0 : e)
    }, Object.defineProperty(fl, "__esModule", {value: !0}), fl.concatAll = void 0;
    var Sl = pl;
    fl.concatAll = function () {
        return Sl.mergeAll(1)
    }, Object.defineProperty(ll, "__esModule", {value: !0}), ll.concat = void 0;
    var Tl = fl, jl = T, Cl = Ra;
    ll.concat = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        return Tl.concatAll()(Cl.from(e, jl.popScheduler(e)))
    };
    var Il = {}, Rl = {}, kl = (Object.defineProperty(Rl, "__esModule", {value: !0}), Rl.defer = void 0, s), Al = C;
    Rl.defer = function (t) {
        return new kl.Observable(function (e) {
            Al.innerFrom(t()).subscribe(e)
        })
    }, Object.defineProperty(Il, "__esModule", {value: !0}), Il.connectable = void 0;
    var Ml = u, xl = s, Nl = Rl, Ul = {
        connector: function () {
            return new Ml.Subject
        }, resetOnDisconnect: !0
    };
    Il.connectable = function (e, t) {
        var r = null, n = (t = void 0 === t ? Ul : t).connector, o = void 0 === (t = t.resetOnDisconnect) || t, i = n();
        return (t = new xl.Observable(function (e) {
            return i.subscribe(e)
        })).connect = function () {
            return r && !r.closed || (r = Nl.defer(function () {
                return e
            }).subscribe(i), o && r.add(function () {
                return i = n()
            })), r
        }, t
    };
    var Dl = {}, Ll = (Object.defineProperty(Dl, "__esModule", {value: !0}), Dl.forkJoin = void 0, s), Bl = Kc, Fl = C,
        Wl = T, zl = O, ql = Cc, Vl = Jc;
    Dl.forkJoin = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        var r = Wl.popResultSelector(e), u = (n = Bl.argsArgArrayOrObject(e)).args, a = n.keys,
            n = new Ll.Observable(function (e) {
                var t = u.length;
                if (t) for (var n = new Array(t), o = t, i = t, r = 0; r < t; r++) !function (t) {
                    var r = !1;
                    Fl.innerFrom(u[t]).subscribe(zl.createOperatorSubscriber(e, function (e) {
                        r || (r = !0, i--), n[t] = e
                    }, function () {
                        return o--
                    }, void 0, function () {
                        o && r || (i || e.next(a ? Vl.createObject(a, n) : n), e.complete())
                    }))
                }(r); else e.complete()
            });
        return r ? n.pipe(ql.mapOneOrManyArgs(r)) : n
    };
    var Kc = {}, Hl = r && r.__read || function (e, t) {
            var r = "function" == typeof Symbol && e[Symbol.iterator];
            if (!r) return e;
            var n, o, i = r.call(e), u = [];
            try {
                for (; (void 0 === t || 0 < t--) && !(n = i.next()).done;) u.push(n.value)
            } catch (e) {
                o = {error: e}
            } finally {
                try {
                    n && !n.done && (r = i.return) && r.call(i)
                } finally {
                    if (o) throw o.error
                }
            }
            return u
        }, Yl = (Object.defineProperty(Kc, "__esModule", {value: !0}), Kc.fromEvent = void 0, C), Kl = s, Gl = dl, Zl = Ma,
        Ql = g, Xl = Cc, Jl = ["addListener", "removeListener"], $l = ["addEventListener", "removeEventListener"],
        ef = ["on", "off"];

    function tf(r, n) {
        return function (t) {
            return function (e) {
                return r[t](n, e)
            }
        }
    }

    Kc.fromEvent = function t(r, n, o, e) {
        if (Ql.isFunction(o) && (e = o, o = void 0), e) return t(r, n, o).pipe(Xl.mapOneOrManyArgs(e));
        var e = Hl((e = r, Ql.isFunction(e.addEventListener) && Ql.isFunction(e.removeEventListener) ? $l.map(function (t) {
                return function (e) {
                    return r[t](n, e, o)
                }
            }) : (e = r, Ql.isFunction(e.addListener) && Ql.isFunction(e.removeListener) ? Jl.map(tf(r, n)) : (e = r, Ql.isFunction(e.on) && Ql.isFunction(e.off) ? ef.map(tf(r, n)) : []))), 2),
            i = e[0], u = e[1];
        if (!i && Zl.isArrayLike(r)) return Gl.mergeMap(function (e) {
            return t(e, n, o)
        })(Yl.innerFrom(r));
        if (i) return new Kl.Observable(function (r) {
            function e() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                return r.next(1 < e.length ? e : e[0])
            }

            return i(e), function () {
                return u(e)
            }
        });
        throw new TypeError("Invalid event target")
    };
    var Jc = {}, rf = (Object.defineProperty(Jc, "__esModule", {value: !0}), Jc.fromEventPattern = void 0, s), nf = g,
        of = Cc;
    Jc.fromEventPattern = function e(n, o, t) {
        return t ? e(n, o).pipe(of.mapOneOrManyArgs(t)) : new rf.Observable(function (r) {
            function e() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                return r.next(1 === e.length ? e[0] : e)
            }

            var t = n(e);
            return nf.isFunction(o) ? function () {
                return o(e, t)
            } : void 0
        })
    };
    var Ma = {}, uf = r && r.__generator || function (n, o) {
        var i, u, a, s = {
            label: 0, sent: function () {
                if (1 & a[0]) throw a[1];
                return a[1]
            }, trys: [], ops: []
        }, e = {next: t(0), throw: t(1), return: t(2)};
        return "function" == typeof Symbol && (e[Symbol.iterator] = function () {
            return this
        }), e;

        function t(r) {
            return function (e) {
                var t = [r, e];
                if (i) throw new TypeError("Generator is already executing.");
                for (; s;) try {
                    if (i = 1, u && (a = 2 & t[0] ? u.return : t[0] ? u.throw || ((a = u.return) && a.call(u), 0) : u.next) && !(a = a.call(u, t[1])).done) return a;
                    switch (u = 0, (t = a ? [2 & t[0], a.value] : t)[0]) {
                        case 0:
                        case 1:
                            a = t;
                            break;
                        case 4:
                            return s.label++, {value: t[1], done: !1};
                        case 5:
                            s.label++, u = t[1], t = [0];
                            continue;
                        case 7:
                            t = s.ops.pop(), s.trys.pop();
                            continue;
                        default:
                            if (!(a = 0 < (a = s.trys).length && a[a.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                s = 0;
                                continue
                            }
                            if (3 === t[0] && (!a || t[1] > a[0] && t[1] < a[3])) {
                                s.label = t[1];
                                break
                            }
                            if (6 === t[0] && s.label < a[1]) {
                                s.label = a[1], a = t;
                                break
                            }
                            if (a && s.label < a[2]) {
                                s.label = a[2], s.ops.push(t);
                                break
                            }
                            a[2] && s.ops.pop(), s.trys.pop();
                            continue
                    }
                    t = o.call(n, s)
                } catch (e) {
                    t = [6, e], u = 0
                } finally {
                    i = a = 0
                }
                if (5 & t[0]) throw t[1];
                return {value: t[0] ? t[1] : void 0, done: !0}
            }
        }
    }, af = (Object.defineProperty(Ma, "__esModule", {value: !0}), Ma.generate = void 0, P), sf = Sa, cf = Rl, lf = xs;
    Ma.generate = function (e, r, n, t, o) {
        var i, u, a;

        function s() {
            var t;
            return uf(this, function (e) {
                switch (e.label) {
                    case 0:
                        t = a, e.label = 1;
                    case 1:
                        return r && !r(t) ? [3, 4] : [4, u(t)];
                    case 2:
                        e.sent(), e.label = 3;
                    case 3:
                        return t = n(t), [3, 1];
                    case 4:
                        return [2]
                }
            })
        }

        return 1 === arguments.length ? (a = e.initialState, r = e.condition, n = e.iterate, i = e.resultSelector, u = void 0 === i ? af.identity : i, o = e.scheduler) : (a = e, !t || sf.isScheduler(t) ? (u = af.identity, o = t) : u = t), cf.defer(o ? function () {
            return lf.scheduleIterable(s(), o)
        } : s)
    };
    var xs = {}, ff = (Object.defineProperty(xs, "__esModule", {value: !0}), xs.iif = void 0, Rl);
    xs.iif = function (e, t, r) {
        return ff.defer(function () {
            return e() ? t : r
        })
    };
    var pf = {}, df = {}, hf = (Object.defineProperty(df, "__esModule", {value: !0}), df.timer = void 0, s), bf = gu,
        yf = Sa, _f = As;
    df.timer = function (n, e, o) {
        void 0 === n && (n = 0), void 0 === o && (o = bf.async);
        var i = -1;
        return null != e && (yf.isScheduler(e) ? o = e : i = e), new hf.Observable(function (e) {
            var t = _f.isValidDate(n) ? +n - o.now() : n, r = 0;
            return o.schedule(function () {
                e.closed || (e.next(r++), 0 <= i ? this.schedule(void 0, i) : e.complete())
            }, t = t < 0 ? 0 : t)
        })
    }, Object.defineProperty(pf, "__esModule", {value: !0}), pf.interval = void 0;
    var vf = gu, mf = df;
    pf.interval = function (e, t) {
        return mf.timer(e = (e = void 0 === e ? 0 : e) < 0 ? 0 : e, e, t = void 0 === t ? vf.asyncScheduler : t)
    };
    var Sa = {}, gf = (Object.defineProperty(Sa, "__esModule", {value: !0}), Sa.merge = void 0, pl), Of = C, wf = j,
        Ef = T, Pf = Ra;
    Sa.merge = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        var r = Ef.popScheduler(e), n = Ef.popNumber(e, 1 / 0), o = e;
        return o.length ? 1 === o.length ? Of.innerFrom(o[0]) : gf.mergeAll(n)(Pf.from(o, r)) : wf.EMPTY
    };
    var Sf, Tf = {},
        jf = (Sf = Tf, Object.defineProperty(Sf, "__esModule", {value: !0}), Sf.never = Sf.NEVER = void 0, Sf.NEVER = new s.Observable(i.noop), Sf.never = function () {
            return Sf.NEVER
        }, {}), Cf = {},
        If = (Object.defineProperty(Cf, "__esModule", {value: !0}), Cf.argsOrArgArray = void 0, Array.isArray);
    Cf.argsOrArgArray = function (e) {
        return 1 === e.length && If(e[0]) ? e[0] : e
    }, Object.defineProperty(jf, "__esModule", {value: !0}), jf.onErrorResumeNext = void 0;
    var Rf = s, kf = Cf, Af = O, Mf = i, xf = C;
    jf.onErrorResumeNext = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        var i = kf.argsOrArgArray(e);
        return new Rf.Observable(function (r) {
            var n = 0, o = function () {
                if (n < i.length) {
                    var e = void 0;
                    try {
                        e = xf.innerFrom(i[n++])
                    } catch (e) {
                        return void o()
                    }
                    var t = new Af.OperatorSubscriber(r, void 0, Mf.noop, Mf.noop);
                    e.subscribe(t), t.add(o)
                } else r.complete()
            };
            o()
        })
    };
    var Nf = {}, Uf = (Object.defineProperty(Nf, "__esModule", {value: !0}), Nf.pairs = void 0, Ra);
    Nf.pairs = function (e, t) {
        return Uf.from(Object.entries(e), t)
    };
    var Df = {}, Lf = {};
    Object.defineProperty(Lf, "__esModule", {value: !0}), Lf.not = void 0, Lf.not = function (r, n) {
        return function (e, t) {
            return !r.call(n, e, t)
        }
    };
    var Bf = {}, Ff = (Object.defineProperty(Bf, "__esModule", {value: !0}), Bf.filter = void 0, S), Wf = O;
    Bf.filter = function (n, o) {
        return Ff.operate(function (e, t) {
            var r = 0;
            e.subscribe(Wf.createOperatorSubscriber(t, function (e) {
                return n.call(o, e, r++) && t.next(e)
            }))
        })
    }, Object.defineProperty(Df, "__esModule", {value: !0}), Df.partition = void 0;
    var zf = Lf, qf = Bf, Vf = C;
    Df.partition = function (e, t, r) {
        return [qf.filter(t, r)(Vf.innerFrom(e)), qf.filter(zf.not(t, r))(Vf.innerFrom(e))]
    };
    var Hf = {}, Yf = (Object.defineProperty(Hf, "__esModule", {value: !0}), Hf.raceInit = Hf.race = void 0, s), Kf = C,
        Gf = Cf, Zf = O;

    function Qf(t) {
        return function (n) {
            for (var o = [], e = 0; o && !n.closed && e < t.length; e++) !function (r) {
                o.push(Kf.innerFrom(t[r]).subscribe(Zf.createOperatorSubscriber(n, function (e) {
                    if (o) {
                        for (var t = 0; t < o.length; t++) t !== r && o[t].unsubscribe();
                        o = null
                    }
                    n.next(e)
                })))
            }(e)
        }
    }

    Hf.race = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        return 1 === (e = Gf.argsOrArgArray(e)).length ? Kf.innerFrom(e[0]) : new Yf.Observable(Qf(e))
    }, Hf.raceInit = Qf;
    var Xf = {}, Jf = (Object.defineProperty(Xf, "__esModule", {value: !0}), Xf.range = void 0, s), $f = j;
    Xf.range = function (r, e, n) {
        if (null == e && (e = r, r = 0), e <= 0) return $f.EMPTY;
        var o = e + r;
        return new Jf.Observable(n ? function (e) {
            var t = r;
            return n.schedule(function () {
                t < o ? (e.next(t++), this.schedule()) : e.complete()
            })
        } : function (e) {
            for (var t = r; t < o && !e.closed;) e.next(t++);
            e.complete()
        })
    };
    var ep = {}, tp = (Object.defineProperty(ep, "__esModule", {value: !0}), ep.using = void 0, s), rp = C, np = j;
    ep.using = function (n, o) {
        return new tp.Observable(function (e) {
            var t = n(), r = o(t);
            return (r ? rp.innerFrom(r) : np.EMPTY).subscribe(e), function () {
                t && t.unsubscribe()
            }
        })
    };
    var op = {}, ip = r && r.__read || function (e, t) {
            var r = "function" == typeof Symbol && e[Symbol.iterator];
            if (!r) return e;
            var n, o, i = r.call(e), u = [];
            try {
                for (; (void 0 === t || 0 < t--) && !(n = i.next()).done;) u.push(n.value)
            } catch (e) {
                o = {error: e}
            } finally {
                try {
                    n && !n.done && (r = i.return) && r.call(i)
                } finally {
                    if (o) throw o.error
                }
            }
            return u
        }, up = r && r.__spreadArray || function (e, t) {
            for (var r = 0, n = t.length, o = e.length; r < n; r++, o++) e[o] = t[r];
            return e
        }, ap = (Object.defineProperty(op, "__esModule", {value: !0}), op.zip = void 0, s), sp = C, cp = Cf, lp = j, fp = O,
        pp = T;
    op.zip = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        var i = pp.popResultSelector(e), u = cp.argsOrArgArray(e);
        return u.length ? new ap.Observable(function (r) {
            for (var n = u.map(function () {
                return []
            }), o = u.map(function () {
                return !1
            }), e = (r.add(function () {
                n = o = null
            }), 0); !r.closed && e < u.length; e++) !function (t) {
                sp.innerFrom(u[t]).subscribe(fp.createOperatorSubscriber(r, function (e) {
                    n[t].push(e), n.every(function (e) {
                        return e.length
                    }) && (e = n.map(function (e) {
                        return e.shift()
                    }), r.next(i ? i.apply(void 0, up([], ip(e))) : e), n.some(function (e, t) {
                        return !e.length && o[t]
                    }) && r.complete())
                }, function () {
                    o[t] = !0, n[t].length || r.complete()
                }))
            }(e);
            return function () {
                n = o = null
            }
        }) : lp.EMPTY
    };
    var dp = {}, hp = (Object.defineProperty(dp, "__esModule", {value: !0}), {}),
        bp = (Object.defineProperty(hp, "__esModule", {value: !0}), hp.audit = void 0, S), yp = C, _p = O;
    hp.audit = function (s) {
        return bp.operate(function (e, t) {
            function r() {
                var e;
                null != u && u.unsubscribe(), u = null, o && (o = !1, e = i, i = null, t.next(e)), a && t.complete()
            }

            function n() {
                u = null, a && t.complete()
            }

            var o = !1, i = null, u = null, a = !1;
            e.subscribe(_p.createOperatorSubscriber(t, function (e) {
                o = !0, i = e, u || yp.innerFrom(s(e)).subscribe(u = _p.createOperatorSubscriber(t, r, n))
            }, function () {
                a = !0, o && u && !u.closed || t.complete()
            }))
        })
    };
    var vp = {}, mp = (Object.defineProperty(vp, "__esModule", {value: !0}), vp.auditTime = void 0, gu), gp = hp,
        Op = df;
    vp.auditTime = function (e, t) {
        return void 0 === t && (t = mp.asyncScheduler), gp.audit(function () {
            return Op.timer(e, t)
        })
    };
    var wp = {}, Ep = (Object.defineProperty(wp, "__esModule", {value: !0}), wp.buffer = void 0, S), Pp = i, Sp = O,
        Tp = C;
    wp.buffer = function (n) {
        return Ep.operate(function (e, t) {
            var r = [];
            return e.subscribe(Sp.createOperatorSubscriber(t, function (e) {
                return r.push(e)
            }, function () {
                t.next(r), t.complete()
            })), Tp.innerFrom(n).subscribe(Sp.createOperatorSubscriber(t, function () {
                var e = r;
                r = [], t.next(e)
            }, Pp.noop)), function () {
                r = null
            }
        })
    };
    var jp = {}, Cp = r && r.__values || function (e) {
        var t = "function" == typeof Symbol && Symbol.iterator, r = t && e[t], n = 0;
        if (r) return r.call(e);
        if (e && "number" == typeof e.length) return {
            next: function () {
                return {value: (e = e && n >= e.length ? void 0 : e) && e[n++], done: !e}
            }
        };
        throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
    }, Ip = (Object.defineProperty(jp, "__esModule", {value: !0}), jp.bufferCount = void 0, S), Rp = O, kp = y;
    jp.bufferCount = function (h, b) {
        return b = null != (b = void 0 === b ? null : b) ? b : h, Ip.operate(function (e, f) {
            var p = [], d = 0;
            e.subscribe(Rp.createOperatorSubscriber(f, function (e) {
                var t, r, n, o, i = null;
                d++ % b == 0 && p.push([]);
                try {
                    for (var u = Cp(p), a = u.next(); !a.done; a = u.next()) (l = a.value).push(e), h <= l.length && (i = null != i ? i : []).push(l)
                } catch (e) {
                    t = {error: e}
                } finally {
                    try {
                        a && !a.done && (r = u.return) && r.call(u)
                    } finally {
                        if (t) throw t.error
                    }
                }
                if (i) try {
                    for (var s = Cp(i), c = s.next(); !c.done; c = s.next()) {
                        var l = c.value;
                        kp.arrRemove(p, l), f.next(l)
                    }
                } catch (e) {
                    n = {error: e}
                } finally {
                    try {
                        c && !c.done && (o = s.return) && o.call(s)
                    } finally {
                        if (n) throw n.error
                    }
                }
            }, function () {
                var t, e;
                try {
                    for (var r = Cp(p), n = r.next(); !n.done; n = r.next()) {
                        var o = n.value;
                        f.next(o)
                    }
                } catch (e) {
                    t = {error: e}
                } finally {
                    try {
                        n && !n.done && (e = r.return) && e.call(r)
                    } finally {
                        if (t) throw t.error
                    }
                }
                f.complete()
            }, void 0, function () {
                p = null
            }))
        })
    };
    var Ap = {}, Mp = r && r.__values || function (e) {
            var t = "function" == typeof Symbol && Symbol.iterator, r = t && e[t], n = 0;
            if (r) return r.call(e);
            if (e && "number" == typeof e.length) return {
                next: function () {
                    return {value: (e = e && n >= e.length ? void 0 : e) && e[n++], done: !e}
                }
            };
            throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
        }, xp = (Object.defineProperty(Ap, "__esModule", {value: !0}), Ap.bufferTime = void 0, _), Np = S, Up = O, Dp = y,
        Lp = gu, Bp = T, Fp = ms;
    Ap.bufferTime = function (i) {
        for (var e, t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
        var u = null != (e = Bp.popScheduler(t)) ? e : Lp.asyncScheduler, a = null != (e = t[0]) ? e : null,
            l = t[1] || 1 / 0;
        return Np.operate(function (e, r) {
            var s = [], n = !1, c = function (e) {
                    var t = e.buffer;
                    e.subs.unsubscribe(), Dp.arrRemove(s, e), r.next(t), n && o()
                }, o = function () {
                    var e, t;
                    s && (e = new xp.Subscription, r.add(e), s.push(t = {
                        buffer: [],
                        subs: e
                    }), Fp.executeSchedule(e, u, function () {
                        return c(t)
                    }, i))
                },
                t = (null !== a && 0 <= a ? Fp.executeSchedule(r, u, o, a, !0) : n = !0, o(), Up.createOperatorSubscriber(r, function (e) {
                    var t, r, n = s.slice();
                    try {
                        for (var o = Mp(n), i = o.next(); !i.done; i = o.next()) {
                            var u = i.value, a = u.buffer;
                            a.push(e), l <= a.length && c(u)
                        }
                    } catch (e) {
                        t = {error: e}
                    } finally {
                        try {
                            i && !i.done && (r = o.return) && r.call(o)
                        } finally {
                            if (t) throw t.error
                        }
                    }
                }, function () {
                    for (; null != s && s.length;) r.next(s.shift().buffer);
                    null != t && t.unsubscribe(), r.complete(), r.unsubscribe()
                }, void 0, function () {
                    return s = null
                }));
            e.subscribe(t)
        })
    };
    var Wp = {}, zp = r && r.__values || function (e) {
            var t = "function" == typeof Symbol && Symbol.iterator, r = t && e[t], n = 0;
            if (r) return r.call(e);
            if (e && "number" == typeof e.length) return {
                next: function () {
                    return {value: (e = e && n >= e.length ? void 0 : e) && e[n++], done: !e}
                }
            };
            throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
        }, qp = (Object.defineProperty(Wp, "__esModule", {value: !0}), Wp.bufferToggle = void 0, _), Vp = S, Hp = C, Yp = O,
        Kp = i, Gp = y;
    Wp.bufferToggle = function (t, o) {
        return Vp.operate(function (e, n) {
            var i = [];
            Hp.innerFrom(t).subscribe(Yp.createOperatorSubscriber(n, function (e) {
                var t = [], r = (i.push(t), new qp.Subscription);
                r.add(Hp.innerFrom(o(e)).subscribe(Yp.createOperatorSubscriber(n, function () {
                    Gp.arrRemove(i, t), n.next(t), r.unsubscribe()
                }, Kp.noop)))
            }, Kp.noop)), e.subscribe(Yp.createOperatorSubscriber(n, function (e) {
                var t, r;
                try {
                    for (var n = zp(i), o = n.next(); !o.done; o = n.next()) o.value.push(e)
                } catch (e) {
                    t = {error: e}
                } finally {
                    try {
                        o && !o.done && (r = n.return) && r.call(n)
                    } finally {
                        if (t) throw t.error
                    }
                }
            }, function () {
                for (; 0 < i.length;) n.next(i.shift());
                n.complete()
            }))
        })
    };
    var Zp = {}, Qp = (Object.defineProperty(Zp, "__esModule", {value: !0}), Zp.bufferWhen = void 0, S), Xp = i, Jp = O,
        $p = C;
    Zp.bufferWhen = function (i) {
        return Qp.operate(function (e, t) {
            var r = null, n = null, o = function () {
                null != n && n.unsubscribe();
                var e = r;
                r = [], e && t.next(e), $p.innerFrom(i()).subscribe(n = Jp.createOperatorSubscriber(t, o, Xp.noop))
            };
            o(), e.subscribe(Jp.createOperatorSubscriber(t, function (e) {
                return null == r ? void 0 : r.push(e)
            }, function () {
                r && t.next(r), t.complete()
            }, void 0, function () {
                return r = n = null
            }))
        })
    };
    var ed = {}, td = (Object.defineProperty(ed, "__esModule", {value: !0}), ed.catchError = void 0, C), rd = O, nd = S;
    ed.catchError = function u(a) {
        return nd.operate(function (t, r) {
            var n, o = null, i = !1, o = t.subscribe(rd.createOperatorSubscriber(r, void 0, void 0, function (e) {
                n = td.innerFrom(a(e, u(a)(t))), o ? (o.unsubscribe(), o = null, n.subscribe(r)) : i = !0
            }));
            i && (o.unsubscribe(), o = null, n.subscribe(r))
        })
    };
    var od = {}, id = {}, I = {}, ud = {}, ad = {}, sd = {},
        cd = (Object.defineProperty(sd, "__esModule", {value: !0}), sd.scanInternals = void 0, O);
    sd.scanInternals = function (u, t, a, s, c) {
        return function (e, r) {
            var n = a, o = t, i = 0;
            e.subscribe(cd.createOperatorSubscriber(r, function (e) {
                var t = i++;
                o = n ? u(o, e, t) : (n = !0, e), s && r.next(o)
            }, c && function () {
                n && r.next(o), r.complete()
            }))
        }
    }, Object.defineProperty(ad, "__esModule", {value: !0}), ad.reduce = void 0;
    var ld = sd, fd = S;
    ad.reduce = function (e, t) {
        return fd.operate(ld.scanInternals(e, t, 2 <= arguments.length, !1, !0))
    }, Object.defineProperty(ud, "__esModule", {value: !0}), ud.toArray = void 0;

    function pd(e, t) {
        return e.push(t), e
    }

    var dd = ad, hd = S;
    ud.toArray = function () {
        return hd.operate(function (e, t) {
            dd.reduce(pd, [])(e).subscribe(t)
        })
    }, Object.defineProperty(I, "__esModule", {value: !0}), I.joinAllInternals = void 0;
    var bd = P, yd = Cc, _d = st, vd = dl, md = ud;
    I.joinAllInternals = function (t, e) {
        return _d.pipe(md.toArray(), vd.mergeMap(function (e) {
            return t(e)
        }), e ? yd.mapOneOrManyArgs(e) : bd.identity)
    }, Object.defineProperty(id, "__esModule", {value: !0}), id.combineLatestAll = void 0;
    var gd = a, Od = I;
    id.combineLatestAll = function (e) {
        return Od.joinAllInternals(gd.combineLatest, e)
    }, Object.defineProperty(od, "__esModule", {value: !0}), od.combineAll = void 0;
    od.combineAll = id.combineLatestAll;
    var wd = {}, Ed = {}, Pd = r && r.__read || function (e, t) {
            var r = "function" == typeof Symbol && e[Symbol.iterator];
            if (!r) return e;
            var n, o, i = r.call(e), u = [];
            try {
                for (; (void 0 === t || 0 < t--) && !(n = i.next()).done;) u.push(n.value)
            } catch (e) {
                o = {error: e}
            } finally {
                try {
                    n && !n.done && (r = i.return) && r.call(i)
                } finally {
                    if (o) throw o.error
                }
            }
            return u
        }, Sd = r && r.__spreadArray || function (e, t) {
            for (var r = 0, n = t.length, o = e.length; r < n; r++, o++) e[o] = t[r];
            return e
        }, Td = (Object.defineProperty(Ed, "__esModule", {value: !0}), Ed.combineLatest = void 0, a), jd = S, Cd = Cf,
        Id = Cc, Rd = st, kd = T;

    function Ad() {
        for (var r = [], e = 0; e < arguments.length; e++) r[e] = arguments[e];
        var t = kd.popResultSelector(r);
        return t ? Rd.pipe(Ad.apply(void 0, Sd([], Pd(r))), Id.mapOneOrManyArgs(t)) : jd.operate(function (e, t) {
            Td.combineLatestInit(Sd([e], Pd(Cd.argsOrArgArray(r))))(t)
        })
    }

    Ed.combineLatest = Ad;
    var Md = r && r.__read || function (e, t) {
        var r = "function" == typeof Symbol && e[Symbol.iterator];
        if (!r) return e;
        var n, o, i = r.call(e), u = [];
        try {
            for (; (void 0 === t || 0 < t--) && !(n = i.next()).done;) u.push(n.value)
        } catch (e) {
            o = {error: e}
        } finally {
            try {
                n && !n.done && (r = i.return) && r.call(i)
            } finally {
                if (o) throw o.error
            }
        }
        return u
    }, xd = r && r.__spreadArray || function (e, t) {
        for (var r = 0, n = t.length, o = e.length; r < n; r++, o++) e[o] = t[r];
        return e
    }, Nd = (Object.defineProperty(wd, "__esModule", {value: !0}), wd.combineLatestWith = void 0, Ed);
    wd.combineLatestWith = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        return Nd.combineLatest.apply(void 0, xd([], Md(e)))
    };
    var Cc = {}, Ud = (Object.defineProperty(Cc, "__esModule", {value: !0}), Cc.concatMap = void 0, dl), Dd = g;
    Cc.concatMap = function (e, t) {
        return Dd.isFunction(t) ? Ud.mergeMap(e, t, 1) : Ud.mergeMap(e, 1)
    };
    var Ld = {}, Bd = (Object.defineProperty(Ld, "__esModule", {value: !0}), Ld.concatMapTo = void 0, Cc), Fd = g;
    Ld.concatMapTo = function (e, t) {
        return Fd.isFunction(t) ? Bd.concatMap(function () {
            return e
        }, t) : Bd.concatMap(function () {
            return e
        })
    };
    var Wd = {}, zd = {}, qd = r && r.__read || function (e, t) {
        var r = "function" == typeof Symbol && e[Symbol.iterator];
        if (!r) return e;
        var n, o, i = r.call(e), u = [];
        try {
            for (; (void 0 === t || 0 < t--) && !(n = i.next()).done;) u.push(n.value)
        } catch (e) {
            o = {error: e}
        } finally {
            try {
                n && !n.done && (r = i.return) && r.call(i)
            } finally {
                if (o) throw o.error
            }
        }
        return u
    }, Vd = r && r.__spreadArray || function (e, t) {
        for (var r = 0, n = t.length, o = e.length; r < n; r++, o++) e[o] = t[r];
        return e
    }, Hd = (Object.defineProperty(zd, "__esModule", {value: !0}), zd.concat = void 0, S), Yd = fl, Kd = T, Gd = Ra;
    zd.concat = function () {
        for (var r = [], e = 0; e < arguments.length; e++) r[e] = arguments[e];
        var n = Kd.popScheduler(r);
        return Hd.operate(function (e, t) {
            Yd.concatAll()(Gd.from(Vd([e], qd(r)), n)).subscribe(t)
        })
    };
    var Zd = r && r.__read || function (e, t) {
        var r = "function" == typeof Symbol && e[Symbol.iterator];
        if (!r) return e;
        var n, o, i = r.call(e), u = [];
        try {
            for (; (void 0 === t || 0 < t--) && !(n = i.next()).done;) u.push(n.value)
        } catch (e) {
            o = {error: e}
        } finally {
            try {
                n && !n.done && (r = i.return) && r.call(i)
            } finally {
                if (o) throw o.error
            }
        }
        return u
    }, Qd = r && r.__spreadArray || function (e, t) {
        for (var r = 0, n = t.length, o = e.length; r < n; r++, o++) e[o] = t[r];
        return e
    }, Xd = (Object.defineProperty(Wd, "__esModule", {value: !0}), Wd.concatWith = void 0, zd);
    Wd.concatWith = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        return Xd.concat.apply(void 0, Qd([], Zd(e)))
    };
    var Jd = {}, $d = {}, eh = (Object.defineProperty($d, "__esModule", {value: !0}), $d.fromSubscribable = void 0, s);
    $d.fromSubscribable = function (t) {
        return new eh.Observable(function (e) {
            return t.subscribe(e)
        })
    }, Object.defineProperty(Jd, "__esModule", {value: !0}), Jd.connect = void 0;
    var th = u, rh = C, nh = S, oh = $d, ih = {
        connector: function () {
            return new th.Subject
        }
    };
    Jd.connect = function (n, e) {
        var o = (e = void 0 === e ? ih : e).connector;
        return nh.operate(function (e, t) {
            var r = o();
            rh.innerFrom(n(oh.fromSubscribable(r))).subscribe(t), t.add(e.subscribe(r))
        })
    };
    var $d = {}, uh = (Object.defineProperty($d, "__esModule", {value: !0}), $d.count = void 0, ad);
    $d.count = function (n) {
        return uh.reduce(function (e, t, r) {
            return !n || n(t, r) ? e + 1 : e
        }, 0)
    };
    var ah = {}, sh = (Object.defineProperty(ah, "__esModule", {value: !0}), ah.debounce = void 0, S), ch = i, lh = O,
        fh = C;
    ah.debounce = function (u) {
        return sh.operate(function (e, t) {
            function r() {
                var e;
                null != i && i.unsubscribe(), i = null, n && (n = !1, e = o, o = null, t.next(e))
            }

            var n = !1, o = null, i = null;
            e.subscribe(lh.createOperatorSubscriber(t, function (e) {
                null != i && i.unsubscribe(), n = !0, o = e, i = lh.createOperatorSubscriber(t, r, ch.noop), fh.innerFrom(u(e)).subscribe(i)
            }, function () {
                r(), t.complete()
            }, void 0, function () {
                o = i = null
            }))
        })
    };
    var R = {}, ph = (Object.defineProperty(R, "__esModule", {value: !0}), R.debounceTime = void 0, gu), dh = S, hh = O;
    R.debounceTime = function (a, s) {
        return void 0 === s && (s = ph.asyncScheduler), dh.operate(function (e, r) {
            var n = null, t = null, o = null, i = function () {
                var e;
                n && (n.unsubscribe(), e = t, t = n = null, r.next(e))
            };

            function u() {
                var e = o + a, t = s.now();
                if (t < e) return n = this.schedule(void 0, e - t), void r.add(n);
                i()
            }

            e.subscribe(hh.createOperatorSubscriber(r, function (e) {
                t = e, o = s.now(), n || (n = s.schedule(u, a), r.add(n))
            }, function () {
                i(), r.complete()
            }, void 0, function () {
                t = n = null
            }))
        })
    };
    var bh = {}, yh = (Object.defineProperty(bh, "__esModule", {value: !0}), bh.defaultIfEmpty = void 0, S), _h = O;
    bh.defaultIfEmpty = function (n) {
        return yh.operate(function (e, t) {
            var r = !1;
            e.subscribe(_h.createOperatorSubscriber(t, function (e) {
                r = !0, t.next(e)
            }, function () {
                r || t.next(n), t.complete()
            }))
        })
    };
    var vh = {}, mh = {}, gh = {}, Oh = (Object.defineProperty(gh, "__esModule", {value: !0}), gh.take = void 0, j),
        wh = S, Eh = O;
    gh.take = function (n) {
        return n <= 0 ? function () {
            return Oh.EMPTY
        } : wh.operate(function (e, t) {
            var r = 0;
            e.subscribe(Eh.createOperatorSubscriber(t, function (e) {
                ++r <= n && (t.next(e), n <= r && t.complete())
            }))
        })
    };
    var Ph = {}, Sh = (Object.defineProperty(Ph, "__esModule", {value: !0}), Ph.ignoreElements = void 0, S), Th = O,
        jh = i;
    Ph.ignoreElements = function () {
        return Sh.operate(function (e, t) {
            e.subscribe(Th.createOperatorSubscriber(t, jh.noop))
        })
    };
    var Ch = {}, Ih = (Object.defineProperty(Ch, "__esModule", {value: !0}), Ch.mapTo = void 0, Ic);
    Ch.mapTo = function (e) {
        return Ih.map(function () {
            return e
        })
    }, Object.defineProperty(mh, "__esModule", {value: !0}), mh.delayWhen = void 0;
    var Rh = ll, kh = gh, Ah = Ph, Mh = Ch, xh = dl, Nh = C;
    mh.delayWhen = function t(r, n) {
        return n ? function (e) {
            return Rh.concat(n.pipe(kh.take(1), Ah.ignoreElements()), e.pipe(t(r)))
        } : xh.mergeMap(function (e, t) {
            return Nh.innerFrom(r(e, t)).pipe(kh.take(1), Mh.mapTo(e))
        })
    }, Object.defineProperty(vh, "__esModule", {value: !0}), vh.delay = void 0;
    var Uh = gu, Dh = mh, Lh = df;
    vh.delay = function (e, t) {
        var r = Lh.timer(e, t = void 0 === t ? Uh.asyncScheduler : t);
        return Dh.delayWhen(function () {
            return r
        })
    };
    var Bh = {}, Fh = (Object.defineProperty(Bh, "__esModule", {value: !0}), Bh.dematerialize = void 0, Ou), Wh = S,
        zh = O;
    Bh.dematerialize = function () {
        return Wh.operate(function (e, t) {
            e.subscribe(zh.createOperatorSubscriber(t, function (e) {
                return Fh.observeNotification(e, t)
            }))
        })
    };
    var qh = {}, Vh = (Object.defineProperty(qh, "__esModule", {value: !0}), qh.distinct = void 0, S), Hh = O, Yh = i,
        Kh = C;
    qh.distinct = function (o, t) {
        return Vh.operate(function (e, r) {
            var n = new Set;
            e.subscribe(Hh.createOperatorSubscriber(r, function (e) {
                var t = o ? o(e) : e;
                n.has(t) || (n.add(t), r.next(e))
            })), t && Kh.innerFrom(t).subscribe(Hh.createOperatorSubscriber(r, function () {
                return n.clear()
            }, Yh.noop))
        })
    };
    var Gh = {}, Zh = (Object.defineProperty(Gh, "__esModule", {value: !0}), Gh.distinctUntilChanged = void 0, P),
        Qh = S, Xh = O;

    function Jh(e, t) {
        return e === t
    }

    Gh.distinctUntilChanged = function (i, u) {
        return void 0 === u && (u = Zh.identity), i = null != i ? i : Jh, Qh.operate(function (e, r) {
            var n, o = !0;
            e.subscribe(Xh.createOperatorSubscriber(r, function (e) {
                var t = u(e);
                !o && i(n, t) || (o = !1, n = t, r.next(e))
            }))
        })
    };
    var $h = {}, eb = (Object.defineProperty($h, "__esModule", {value: !0}), $h.distinctUntilKeyChanged = void 0, Gh);
    $h.distinctUntilKeyChanged = function (r, n) {
        return eb.distinctUntilChanged(function (e, t) {
            return n ? n(e[r], t[r]) : e[r] === t[r]
        })
    };
    var tb = {}, rb = {}, nb = (Object.defineProperty(rb, "__esModule", {value: !0}), rb.throwIfEmpty = void 0, xa),
        ob = S, ib = O;

    function ub() {
        return new nb.EmptyError
    }

    rb.throwIfEmpty = function (n) {
        return void 0 === n && (n = ub), ob.operate(function (e, t) {
            var r = !1;
            e.subscribe(ib.createOperatorSubscriber(t, function (e) {
                r = !0, t.next(e)
            }, function () {
                return r ? t.complete() : t.error(n())
            }))
        })
    }, Object.defineProperty(tb, "__esModule", {value: !0}), tb.elementAt = void 0;
    var ab = Wa, sb = Bf, cb = rb, lb = bh, fb = gh;
    tb.elementAt = function (r, t) {
        if (r < 0) throw new ab.ArgumentOutOfRangeError;
        var n = 2 <= arguments.length;
        return function (e) {
            return e.pipe(sb.filter(function (e, t) {
                return t === r
            }), fb.take(1), n ? lb.defaultIfEmpty(t) : cb.throwIfEmpty(function () {
                return new ab.ArgumentOutOfRangeError
            }))
        }
    };
    var pb = {}, db = r && r.__read || function (e, t) {
        var r = "function" == typeof Symbol && e[Symbol.iterator];
        if (!r) return e;
        var n, o, i = r.call(e), u = [];
        try {
            for (; (void 0 === t || 0 < t--) && !(n = i.next()).done;) u.push(n.value)
        } catch (e) {
            o = {error: e}
        } finally {
            try {
                n && !n.done && (r = i.return) && r.call(i)
            } finally {
                if (o) throw o.error
            }
        }
        return u
    }, hb = r && r.__spreadArray || function (e, t) {
        for (var r = 0, n = t.length, o = e.length; r < n; r++, o++) e[o] = t[r];
        return e
    }, bb = (Object.defineProperty(pb, "__esModule", {value: !0}), pb.endWith = void 0, ll), yb = o;
    pb.endWith = function () {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        return function (e) {
            return bb.concat(e, yb.of.apply(void 0, hb([], db(t))))
        }
    };
    var _b = {}, vb = (Object.defineProperty(_b, "__esModule", {value: !0}), _b.every = void 0, S), mb = O;
    _b.every = function (o, i) {
        return vb.operate(function (t, r) {
            var n = 0;
            t.subscribe(mb.createOperatorSubscriber(r, function (e) {
                o.call(i, e, n++, t) || (r.next(!1), r.complete())
            }, function () {
                r.next(!0), r.complete()
            }))
        })
    };
    var gb = {}, Ob = {}, wb = {},
        Eb = (Object.defineProperty(wb, "__esModule", {value: !0}), wb.exhaustMap = void 0, Ic), Pb = C, Sb = S, Tb = O;
    wb.exhaustMap = function t(i, o) {
        return o ? function (e) {
            return e.pipe(t(function (r, n) {
                return Pb.innerFrom(i(r, n)).pipe(Eb.map(function (e, t) {
                    return o(r, e, n, t)
                }))
            }))
        } : Sb.operate(function (e, t) {
            var r = 0, n = null, o = !1;
            e.subscribe(Tb.createOperatorSubscriber(t, function (e) {
                n || (n = Tb.createOperatorSubscriber(t, void 0, function () {
                    n = null, o && t.complete()
                }), Pb.innerFrom(i(e, r++)).subscribe(n))
            }, function () {
                o = !0, n || t.complete()
            }))
        })
    }, Object.defineProperty(Ob, "__esModule", {value: !0}), Ob.exhaustAll = void 0;
    var jb = wb, Cb = P;
    Ob.exhaustAll = function () {
        return jb.exhaustMap(Cb.identity)
    }, Object.defineProperty(gb, "__esModule", {value: !0}), gb.exhaust = void 0;
    gb.exhaust = Ob.exhaustAll;
    var Ib = {}, Rb = (Object.defineProperty(Ib, "__esModule", {value: !0}), Ib.expand = void 0, S), kb = hl;
    Ib.expand = function (r, n, o) {
        return n = ((n = void 0 === n ? 1 / 0 : n) || 0) < 1 ? 1 / 0 : n, Rb.operate(function (e, t) {
            return kb.mergeInternals(e, t, r, n, void 0, !0, o)
        })
    };
    var k = {}, Ab = (Object.defineProperty(k, "__esModule", {value: !0}), k.finalize = void 0, S);
    k.finalize = function (r) {
        return Ab.operate(function (e, t) {
            try {
                e.subscribe(t)
            } finally {
                t.add(r)
            }
        })
    };
    var Mb = {}, xb = (Object.defineProperty(Mb, "__esModule", {value: !0}), Mb.createFind = Mb.find = void 0, S),
        Nb = O;

    function Ub(i, u, e) {
        var a = "index" === e;
        return function (r, n) {
            var o = 0;
            r.subscribe(Nb.createOperatorSubscriber(n, function (e) {
                var t = o++;
                i.call(u, e, t, r) && (n.next(a ? t : e), n.complete())
            }, function () {
                n.next(a ? -1 : void 0), n.complete()
            }))
        }
    }

    Mb.find = function (e, t) {
        return xb.operate(Ub(e, t, "value"))
    }, Mb.createFind = Ub;
    var Db = {}, Lb = (Object.defineProperty(Db, "__esModule", {value: !0}), Db.findIndex = void 0, S), Bb = Mb;
    Db.findIndex = function (e, t) {
        return Lb.operate(Bb.createFind(e, t, "index"))
    };
    var Fb = {}, Wb = (Object.defineProperty(Fb, "__esModule", {value: !0}), Fb.first = void 0, xa), zb = Bf, qb = gh,
        Vb = bh, Hb = rb, Yb = P;
    Fb.first = function (n, e) {
        var t = 2 <= arguments.length;
        return function (r) {
            return r.pipe(n ? zb.filter(function (e, t) {
                return n(e, t, r)
            }) : Yb.identity, qb.take(1), t ? Vb.defaultIfEmpty(e) : Hb.throwIfEmpty(function () {
                return new Wb.EmptyError
            }))
        }
    };
    var Kb = {}, Gb = (Object.defineProperty(Kb, "__esModule", {value: !0}), Kb.groupBy = void 0, s), Zb = C, Qb = u,
        Xb = S, Jb = O;
    Kb.groupBy = function (b, t, y, _) {
        return Xb.operate(function (e, s) {
            function c(t) {
                return r(function (e) {
                    return e.error(t)
                })
            }

            t && "function" != typeof t ? (y = t.duration, l = t.element, _ = t.connector) : l = t;
            var l, f = new Map, r = function (e) {
                f.forEach(e), e(s)
            }, p = 0, d = !1, h = new Jb.OperatorSubscriber(s, function (e) {
                try {
                    var t, r, n = b(e), o = f.get(n);
                    o || (f.set(n, o = _ ? _() : new Qb.Subject), i = n, u = o, (a = new Gb.Observable(function (e) {
                        p++;
                        var t = u.subscribe(e);
                        return function () {
                            t.unsubscribe(), 0 == --p && d && h.unsubscribe()
                        }
                    })).key = i, t = a, s.next(t), y && (r = Jb.createOperatorSubscriber(o, function () {
                        o.complete(), null != r && r.unsubscribe()
                    }, void 0, void 0, function () {
                        return f.delete(n)
                    }), h.add(Zb.innerFrom(y(t)).subscribe(r)))), o.next(l ? l(e) : e)
                } catch (e) {
                    c(e)
                }
                var i, u, a
            }, function () {
                return r(function (e) {
                    return e.complete()
                })
            }, c, function () {
                return f.clear()
            }, function () {
                return d = !0, 0 === p
            });
            e.subscribe(h)
        })
    };
    var $b = {}, ey = (Object.defineProperty($b, "__esModule", {value: !0}), $b.isEmpty = void 0, S), ty = O;
    $b.isEmpty = function () {
        return ey.operate(function (e, t) {
            e.subscribe(ty.createOperatorSubscriber(t, function () {
                t.next(!1), t.complete()
            }, function () {
                t.next(!0), t.complete()
            }))
        })
    };
    var ry = {}, ny = {}, oy = r && r.__values || function (e) {
        var t = "function" == typeof Symbol && Symbol.iterator, r = t && e[t], n = 0;
        if (r) return r.call(e);
        if (e && "number" == typeof e.length) return {
            next: function () {
                return {value: (e = e && n >= e.length ? void 0 : e) && e[n++], done: !e}
            }
        };
        throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
    }, iy = (Object.defineProperty(ny, "__esModule", {value: !0}), ny.takeLast = void 0, j), uy = S, ay = O;
    ny.takeLast = function (t) {
        return t <= 0 ? function () {
            return iy.EMPTY
        } : uy.operate(function (e, i) {
            var u = [];
            e.subscribe(ay.createOperatorSubscriber(i, function (e) {
                u.push(e), t < u.length && u.shift()
            }, function () {
                var t, e;
                try {
                    for (var r = oy(u), n = r.next(); !n.done; n = r.next()) {
                        var o = n.value;
                        i.next(o)
                    }
                } catch (e) {
                    t = {error: e}
                } finally {
                    try {
                        n && !n.done && (e = r.return) && e.call(r)
                    } finally {
                        if (t) throw t.error
                    }
                }
                i.complete()
            }, void 0, function () {
                u = null
            }))
        })
    }, Object.defineProperty(ry, "__esModule", {value: !0}), ry.last = void 0;
    var sy = xa, cy = Bf, ly = ny, fy = rb, py = bh, dy = P;
    ry.last = function (n, e) {
        var t = 2 <= arguments.length;
        return function (r) {
            return r.pipe(n ? cy.filter(function (e, t) {
                return n(e, t, r)
            }) : dy.identity, ly.takeLast(1), t ? py.defaultIfEmpty(e) : fy.throwIfEmpty(function () {
                return new sy.EmptyError
            }))
        }
    };
    var hy = {}, by = (Object.defineProperty(hy, "__esModule", {value: !0}), hy.materialize = void 0, Ou), yy = S,
        _y = O;
    hy.materialize = function () {
        return yy.operate(function (e, t) {
            e.subscribe(_y.createOperatorSubscriber(t, function (e) {
                t.next(by.Notification.createNext(e))
            }, function () {
                t.next(by.Notification.createComplete()), t.complete()
            }, function (e) {
                t.next(by.Notification.createError(e)), t.complete()
            }))
        })
    };
    var vy = {}, my = (Object.defineProperty(vy, "__esModule", {value: !0}), vy.max = void 0, ad), gy = g;
    vy.max = function (r) {
        return my.reduce(gy.isFunction(r) ? function (e, t) {
            return 0 < r(e, t) ? e : t
        } : function (e, t) {
            return t < e ? e : t
        })
    };
    var Oy = {}, wy = (Object.defineProperty(Oy, "__esModule", {value: !0}), Oy.flatMap = void 0, dl),
        wy = (Oy.flatMap = wy.mergeMap, {}),
        Ey = (Object.defineProperty(wy, "__esModule", {value: !0}), wy.mergeMapTo = void 0, dl), Py = g;
    wy.mergeMapTo = function (e, t, r) {
        return void 0 === r && (r = 1 / 0), Py.isFunction(t) ? Ey.mergeMap(function () {
            return e
        }, t, r) : Ey.mergeMap(function () {
            return e
        }, r = "number" == typeof t ? t : r)
    };
    var Sy = {}, Ty = (Object.defineProperty(Sy, "__esModule", {value: !0}), Sy.mergeScan = void 0, S), jy = hl;
    Sy.mergeScan = function (n, o, i) {
        return void 0 === i && (i = 1 / 0), Ty.operate(function (e, t) {
            var r = o;
            return jy.mergeInternals(e, t, function (e, t) {
                return n(r, e, t)
            }, i, function (e) {
                r = e
            }, !1, void 0, function () {
                return r = null
            })
        })
    };
    var hl = {}, Cy = {}, Iy = r && r.__read || function (e, t) {
            var r = "function" == typeof Symbol && e[Symbol.iterator];
            if (!r) return e;
            var n, o, i = r.call(e), u = [];
            try {
                for (; (void 0 === t || 0 < t--) && !(n = i.next()).done;) u.push(n.value)
            } catch (e) {
                o = {error: e}
            } finally {
                try {
                    n && !n.done && (r = i.return) && r.call(i)
                } finally {
                    if (o) throw o.error
                }
            }
            return u
        }, Ry = r && r.__spreadArray || function (e, t) {
            for (var r = 0, n = t.length, o = e.length; r < n; r++, o++) e[o] = t[r];
            return e
        }, ky = (Object.defineProperty(Cy, "__esModule", {value: !0}), Cy.merge = void 0, S), Ay = Cf, My = pl, xy = T,
        Ny = Ra;
    Cy.merge = function () {
        for (var r = [], e = 0; e < arguments.length; e++) r[e] = arguments[e];
        var n = xy.popScheduler(r), o = xy.popNumber(r, 1 / 0), r = Ay.argsOrArgArray(r);
        return ky.operate(function (e, t) {
            My.mergeAll(o)(Ny.from(Ry([e], Iy(r)), n)).subscribe(t)
        })
    };
    var Uy = r && r.__read || function (e, t) {
        var r = "function" == typeof Symbol && e[Symbol.iterator];
        if (!r) return e;
        var n, o, i = r.call(e), u = [];
        try {
            for (; (void 0 === t || 0 < t--) && !(n = i.next()).done;) u.push(n.value)
        } catch (e) {
            o = {error: e}
        } finally {
            try {
                n && !n.done && (r = i.return) && r.call(i)
            } finally {
                if (o) throw o.error
            }
        }
        return u
    }, Dy = r && r.__spreadArray || function (e, t) {
        for (var r = 0, n = t.length, o = e.length; r < n; r++, o++) e[o] = t[r];
        return e
    }, Ly = (Object.defineProperty(hl, "__esModule", {value: !0}), hl.mergeWith = void 0, Cy);
    hl.mergeWith = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        return Ly.merge.apply(void 0, Dy([], Uy(e)))
    };
    var By = {}, Fy = (Object.defineProperty(By, "__esModule", {value: !0}), By.min = void 0, ad), Wy = g;
    By.min = function (r) {
        return Fy.reduce(Wy.isFunction(r) ? function (e, t) {
            return r(e, t) < 0 ? e : t
        } : function (e, t) {
            return e < t ? e : t
        })
    };
    var zy = {}, qy = (Object.defineProperty(zy, "__esModule", {value: !0}), zy.multicast = void 0, w), Vy = g, Hy = Jd;
    zy.multicast = function (e, t) {
        var r = Vy.isFunction(e) ? e : function () {
            return e
        };
        return Vy.isFunction(t) ? Hy.connect(t, {connector: r}) : function (e) {
            return new qy.ConnectableObservable(e, r)
        }
    };
    var Yy = {}, Ky = r && r.__read || function (e, t) {
            var r = "function" == typeof Symbol && e[Symbol.iterator];
            if (!r) return e;
            var n, o, i = r.call(e), u = [];
            try {
                for (; (void 0 === t || 0 < t--) && !(n = i.next()).done;) u.push(n.value)
            } catch (e) {
                o = {error: e}
            } finally {
                try {
                    n && !n.done && (r = i.return) && r.call(i)
                } finally {
                    if (o) throw o.error
                }
            }
            return u
        }, Gy = r && r.__spreadArray || function (e, t) {
            for (var r = 0, n = t.length, o = e.length; r < n; r++, o++) e[o] = t[r];
            return e
        },
        Zy = (Object.defineProperty(Yy, "__esModule", {value: !0}), Yy.onErrorResumeNext = Yy.onErrorResumeNextWith = void 0, Cf),
        Qy = jf;

    function Xy() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        var r = Zy.argsOrArgArray(e);
        return function (e) {
            return Qy.onErrorResumeNext.apply(void 0, Gy([e], Ky(r)))
        }
    }

    Yy.onErrorResumeNextWith = Xy, Yy.onErrorResumeNext = Xy;
    var Jy = {}, $y = (Object.defineProperty(Jy, "__esModule", {value: !0}), Jy.pairwise = void 0, S), e_ = O;
    Jy.pairwise = function () {
        return $y.operate(function (e, r) {
            var n, o = !1;
            e.subscribe(e_.createOperatorSubscriber(r, function (e) {
                var t = n;
                n = e, o && r.next([t, e]), o = !0
            }))
        })
    };
    var t_ = {}, r_ = (Object.defineProperty(t_, "__esModule", {value: !0}), t_.pluck = void 0, Ic);
    t_.pluck = function () {
        for (var o = [], e = 0; e < arguments.length; e++) o[e] = arguments[e];
        var i = o.length;
        if (0 === i) throw new Error("list of properties cannot be empty.");
        return r_.map(function (e) {
            for (var t = e, r = 0; r < i; r++) {
                var n = null == t ? void 0 : t[o[r]];
                if (void 0 === n) return;
                t = n
            }
            return t
        })
    };
    var n_ = {}, o_ = (Object.defineProperty(n_, "__esModule", {value: !0}), n_.publish = void 0, u), i_ = zy, u_ = Jd;
    n_.publish = function (t) {
        return t ? function (e) {
            return u_.connect(t)(e)
        } : function (e) {
            return i_.multicast(new o_.Subject)(e)
        }
    };
    var a_ = {}, s_ = (Object.defineProperty(a_, "__esModule", {value: !0}), a_.publishBehavior = void 0, t), c_ = w;
    a_.publishBehavior = function (r) {
        return function (e) {
            var t = new s_.BehaviorSubject(r);
            return new c_.ConnectableObservable(e, function () {
                return t
            })
        }
    };
    var l_ = {}, f_ = (Object.defineProperty(l_, "__esModule", {value: !0}), l_.publishLast = void 0, l), p_ = w;
    l_.publishLast = function () {
        return function (e) {
            var t = new f_.AsyncSubject;
            return new p_.ConnectableObservable(e, function () {
                return t
            })
        }
    };
    var d_ = {}, h_ = (Object.defineProperty(d_, "__esModule", {value: !0}), d_.publishReplay = void 0, b), b_ = zy,
        y_ = g;
    d_.publishReplay = function (t, r, e, n) {
        e && !y_.isFunction(e) && (n = e);
        var o = y_.isFunction(e) ? e : void 0;
        return function (e) {
            return b_.multicast(new h_.ReplaySubject(t, r, n), o)(e)
        }
    };
    var __ = {}, v_ = r && r.__read || function (e, t) {
        var r = "function" == typeof Symbol && e[Symbol.iterator];
        if (!r) return e;
        var n, o, i = r.call(e), u = [];
        try {
            for (; (void 0 === t || 0 < t--) && !(n = i.next()).done;) u.push(n.value)
        } catch (e) {
            o = {error: e}
        } finally {
            try {
                n && !n.done && (r = i.return) && r.call(i)
            } finally {
                if (o) throw o.error
            }
        }
        return u
    }, m_ = r && r.__spreadArray || function (e, t) {
        for (var r = 0, n = t.length, o = e.length; r < n; r++, o++) e[o] = t[r];
        return e
    }, g_ = (Object.defineProperty(__, "__esModule", {value: !0}), __.raceWith = void 0, Hf), O_ = S, w_ = P;
    __.raceWith = function () {
        for (var r = [], e = 0; e < arguments.length; e++) r[e] = arguments[e];
        return r.length ? O_.operate(function (e, t) {
            g_.raceInit(m_([e], v_(r)))(t)
        }) : w_.identity
    };
    var E_ = {}, P_ = (Object.defineProperty(E_, "__esModule", {value: !0}), E_.repeat = void 0, j), S_ = S, T_ = O,
        j_ = C, C_ = df;
    E_.repeat = function (e) {
        var t, a, s = 1 / 0;
        return null != e && ("object" == typeof e ? (t = e.count, s = void 0 === t ? 1 / 0 : t, a = e.delay) : s = e), s <= 0 ? function () {
            return P_.EMPTY
        } : S_.operate(function (t, r) {
            function n() {
                var e = !1;
                o = t.subscribe(T_.createOperatorSubscriber(r, void 0, function () {
                    ++i < s ? o ? u() : e = !0 : r.complete()
                })), e && u()
            }

            var o, i = 0, u = function () {
                var e, t;
                null != o && o.unsubscribe(), (o = null) != a ? (e = "number" == typeof a ? C_.timer(a) : j_.innerFrom(a(i)), t = T_.createOperatorSubscriber(r, function () {
                    t.unsubscribe(), n()
                }), e.subscribe(t)) : n()
            };
            n()
        })
    };
    var I_ = {}, R_ = (Object.defineProperty(I_, "__esModule", {value: !0}), I_.repeatWhen = void 0, C), k_ = u, A_ = S,
        M_ = O;
    I_.repeatWhen = function (l) {
        return A_.operate(function (e, t) {
            var r, n, o = !1, i = !1, u = !1, a = function () {
                return u && i && (t.complete(), !0)
            }, s = function () {
                return n || (n = new k_.Subject, R_.innerFrom(l(n)).subscribe(M_.createOperatorSubscriber(t, function () {
                    r ? c() : o = !0
                }, function () {
                    i = !0, a()
                }))), n
            }, c = function () {
                u = !1, r = e.subscribe(M_.createOperatorSubscriber(t, void 0, function () {
                    u = !0, a() || s().next()
                })), o && (r.unsubscribe(), r = null, o = !1, c())
            };
            c()
        })
    };
    var x_ = {}, N_ = (Object.defineProperty(x_, "__esModule", {value: !0}), x_.retry = void 0, S), U_ = O, D_ = P,
        L_ = df, B_ = C;
    x_.retry = function (e) {
        var t = (e = (e = void 0 === e ? 1 / 0 : e) && "object" == typeof e ? e : {count: e}).count,
            c = void 0 === t ? 1 / 0 : t, l = e.delay, r = void 0 !== (t = e.resetOnSuccess) && t;
        return c <= 0 ? D_.identity : N_.operate(function (e, i) {
            var u, a = 0, s = function () {
                var o = !1;
                u = e.subscribe(U_.createOperatorSubscriber(i, function (e) {
                    r && (a = 0), i.next(e)
                }, void 0, function (e) {
                    var t, r, n;
                    a++ < c ? (t = function () {
                        u ? (u.unsubscribe(), u = null, s()) : o = !0
                    }, null != l ? (r = "number" == typeof l ? L_.timer(l) : B_.innerFrom(l(e, a)), n = U_.createOperatorSubscriber(i, function () {
                        n.unsubscribe(), t()
                    }, function () {
                        i.complete()
                    }), r.subscribe(n)) : t()) : i.error(e)
                })), o && (u.unsubscribe(), u = null, s())
            };
            s()
        })
    };
    var F_ = {}, W_ = (Object.defineProperty(F_, "__esModule", {value: !0}), F_.retryWhen = void 0, C), z_ = u, q_ = S,
        V_ = O;
    F_.retryWhen = function (u) {
        return q_.operate(function (e, t) {
            var r, n, o = !1, i = function () {
                r = e.subscribe(V_.createOperatorSubscriber(t, void 0, void 0, function (e) {
                    n || (n = new z_.Subject, W_.innerFrom(u(n)).subscribe(V_.createOperatorSubscriber(t, function () {
                        return r ? i() : o = !0
                    }))), n && n.next(e)
                })), o && (r.unsubscribe(), r = null, o = !1, i())
            };
            i()
        })
    };
    var H_ = {}, Y_ = (Object.defineProperty(H_, "__esModule", {value: !0}), H_.sample = void 0, C), K_ = S, G_ = i,
        Z_ = O;
    H_.sample = function (o) {
        return K_.operate(function (e, t) {
            var r = !1, n = null;
            e.subscribe(Z_.createOperatorSubscriber(t, function (e) {
                r = !0, n = e
            })), Y_.innerFrom(o).subscribe(Z_.createOperatorSubscriber(t, function () {
                var e;
                r && (r = !1, e = n, n = null, t.next(e))
            }, G_.noop))
        })
    };
    var Q_ = {}, X_ = (Object.defineProperty(Q_, "__esModule", {value: !0}), Q_.sampleTime = void 0, gu), J_ = H_,
        $_ = pf;
    Q_.sampleTime = function (e, t) {
        return J_.sample($_.interval(e, t = void 0 === t ? X_.asyncScheduler : t))
    };
    var ev = {}, tv = (Object.defineProperty(ev, "__esModule", {value: !0}), ev.scan = void 0, S), rv = sd;
    ev.scan = function (e, t) {
        return tv.operate(rv.scanInternals(e, t, 2 <= arguments.length, !0))
    };
    var sd = {}, nv = (Object.defineProperty(sd, "__esModule", {value: !0}), sd.sequenceEqual = void 0, S), ov = O,
        iv = C;

    function uv() {
        return {buffer: [], complete: !1}
    }

    sd.sequenceEqual = function (u, a) {
        return void 0 === a && (a = function (e, t) {
            return e === t
        }), nv.operate(function (e, t) {
            function r(n, o) {
                var r = ov.createOperatorSubscriber(t, function (e) {
                    var t = o.buffer, r = o.complete;
                    0 === t.length ? r ? i(!1) : n.buffer.push(e) : a(e, t.shift()) || i(!1)
                }, function () {
                    n.complete = !0;
                    var e = o.complete, t = o.buffer;
                    e && i(0 === t.length), null != r && r.unsubscribe()
                });
                return r
            }

            var n = uv(), o = uv(), i = function (e) {
                t.next(e), t.complete()
            };
            e.subscribe(r(n, o)), iv.innerFrom(u).subscribe(r(o, n))
        })
    };
    var av = {}, sv = r && r.__read || function (e, t) {
        var r = "function" == typeof Symbol && e[Symbol.iterator];
        if (!r) return e;
        var n, o, i = r.call(e), u = [];
        try {
            for (; (void 0 === t || 0 < t--) && !(n = i.next()).done;) u.push(n.value)
        } catch (e) {
            o = {error: e}
        } finally {
            try {
                n && !n.done && (r = i.return) && r.call(i)
            } finally {
                if (o) throw o.error
            }
        }
        return u
    }, cv = r && r.__spreadArray || function (e, t) {
        for (var r = 0, n = t.length, o = e.length; r < n; r++, o++) e[o] = t[r];
        return e
    }, lv = (Object.defineProperty(av, "__esModule", {value: !0}), av.share = void 0, C), fv = u, pv = Mr, dv = S;

    function hv(e, t) {
        for (var r, n = [], o = 2; o < arguments.length; o++) n[o - 2] = arguments[o];
        if (!0 === t) e(); else if (!1 !== t) return r = new pv.SafeSubscriber({
            next: function () {
                r.unsubscribe(), e()
            }
        }), lv.innerFrom(t.apply(void 0, cv([], sv(n)))).subscribe(r)
    }

    av.share = function (e) {
        var t = (e = void 0 === e ? {} : e).connector, p = void 0 === t ? function () {
                return new fv.Subject
            } : t, d = void 0 === (t = e.resetOnError) || t, h = void 0 === (t = e.resetOnComplete) || t,
            b = void 0 === (t = e.resetOnRefCountZero) || t;
        return function (e) {
            function n() {
                var e = o;
                f(), null != e && e.unsubscribe()
            }

            var o, i, u, a = 0, s = !1, c = !1, l = function () {
                null != i && i.unsubscribe(), i = void 0
            }, f = function () {
                l(), o = u = void 0, s = c = !1
            };
            return dv.operate(function (e, t) {
                a++, c || s || l();
                var r = u = null != u ? u : p();
                t.add(function () {
                    0 !== --a || c || s || (i = hv(n, b))
                }), r.subscribe(t), !o && 0 < a && (o = new pv.SafeSubscriber({
                    next: function (e) {
                        return r.next(e)
                    }, error: function (e) {
                        c = !0, l(), i = hv(f, d, e), r.error(e)
                    }, complete: function () {
                        s = !0, l(), i = hv(f, h), r.complete()
                    }
                }), lv.innerFrom(e).subscribe(o))
            })(e)
        }
    };
    var bv = {}, yv = (Object.defineProperty(bv, "__esModule", {value: !0}), bv.shareReplay = void 0, b), _v = av;
    bv.shareReplay = function (e, t, r) {
        var n, o, i = !1;
        return e && "object" == typeof e ? (n = e.bufferSize, o = void 0 === n ? 1 / 0 : n, n = e.windowTime, t = void 0 === n ? 1 / 0 : n, i = void 0 !== (n = e.refCount) && n, r = e.scheduler) : o = null != e ? e : 1 / 0, _v.share({
            connector: function () {
                return new yv.ReplaySubject(o, t, r)
            }, resetOnError: !0, resetOnComplete: !1, resetOnRefCountZero: i
        })
    };
    var vv = {}, mv = (Object.defineProperty(vv, "__esModule", {value: !0}), vv.single = void 0, xa), gv = Cs, Ov = Ws,
        wv = S, Ev = O;
    vv.single = function (a) {
        return wv.operate(function (t, r) {
            var n, o = !1, i = !1, u = 0;
            t.subscribe(Ev.createOperatorSubscriber(r, function (e) {
                i = !0, a && !a(e, u++, t) || (o && r.error(new gv.SequenceError("Too many matching values")), o = !0, n = e)
            }, function () {
                o ? (r.next(n), r.complete()) : r.error(i ? new Ov.NotFoundError("No matching values") : new mv.EmptyError)
            }))
        })
    };
    var Pv = {}, Sv = (Object.defineProperty(Pv, "__esModule", {value: !0}), Pv.skip = void 0, Bf);
    Pv.skip = function (r) {
        return Sv.filter(function (e, t) {
            return r <= t
        })
    };
    var Tv = {}, jv = (Object.defineProperty(Tv, "__esModule", {value: !0}), Tv.skipLast = void 0, P), Cv = S, Iv = O;
    Tv.skipLast = function (u) {
        return u <= 0 ? jv.identity : Cv.operate(function (e, n) {
            var o = new Array(u), i = 0;
            return e.subscribe(Iv.createOperatorSubscriber(n, function (e) {
                var t, r = i++;
                r < u ? o[r] = e : (t = o[r = r % u], o[r] = e, n.next(t))
            })), function () {
                o = null
            }
        })
    };
    var Rv = {}, kv = (Object.defineProperty(Rv, "__esModule", {value: !0}), Rv.skipUntil = void 0, S), Av = O, Mv = C,
        xv = i;
    Rv.skipUntil = function (o) {
        return kv.operate(function (e, t) {
            var r = !1, n = Av.createOperatorSubscriber(t, function () {
                null != n && n.unsubscribe(), r = !0
            }, xv.noop);
            Mv.innerFrom(o).subscribe(n), e.subscribe(Av.createOperatorSubscriber(t, function (e) {
                return r && t.next(e)
            }))
        })
    };
    var Nv = {}, Uv = (Object.defineProperty(Nv, "__esModule", {value: !0}), Nv.skipWhile = void 0, S), Dv = O;
    Nv.skipWhile = function (o) {
        return Uv.operate(function (e, t) {
            var r = !1, n = 0;
            e.subscribe(Dv.createOperatorSubscriber(t, function (e) {
                return (r = r || !o(e, n++)) && t.next(e)
            }))
        })
    };
    var Lv = {}, Bv = (Object.defineProperty(Lv, "__esModule", {value: !0}), Lv.startWith = void 0, ll), Fv = T, Wv = S;
    Lv.startWith = function () {
        for (var r = [], e = 0; e < arguments.length; e++) r[e] = arguments[e];
        var n = Fv.popScheduler(r);
        return Wv.operate(function (e, t) {
            (n ? Bv.concat(r, e, n) : Bv.concat(r, e)).subscribe(t)
        })
    };
    var zv = {}, qv = {}, Vv = (Object.defineProperty(qv, "__esModule", {value: !0}), qv.switchMap = void 0, C), Hv = S,
        Yv = O;
    qv.switchMap = function (s, c) {
        return Hv.operate(function (e, o) {
            function i() {
                t && !u && o.complete()
            }

            var u = null, a = 0, t = !1;
            e.subscribe(Yv.createOperatorSubscriber(o, function (t) {
                null != u && u.unsubscribe();
                var r = 0, n = a++;
                Vv.innerFrom(s(t, n)).subscribe(u = Yv.createOperatorSubscriber(o, function (e) {
                    return o.next(c ? c(t, e, n, r++) : e)
                }, function () {
                    u = null, i()
                }))
            }, function () {
                t = !0, i()
            }))
        })
    }, Object.defineProperty(zv, "__esModule", {value: !0}), zv.switchAll = void 0;
    var Kv = qv, Gv = P;
    zv.switchAll = function () {
        return Kv.switchMap(Gv.identity)
    };
    var Zv = {}, Qv = (Object.defineProperty(Zv, "__esModule", {value: !0}), Zv.switchMapTo = void 0, qv), Xv = g;
    Zv.switchMapTo = function (e, t) {
        return Xv.isFunction(t) ? Qv.switchMap(function () {
            return e
        }, t) : Qv.switchMap(function () {
            return e
        })
    };
    var Jv = {}, $v = (Object.defineProperty(Jv, "__esModule", {value: !0}), Jv.switchScan = void 0, qv), em = S;
    Jv.switchScan = function (n, o) {
        return em.operate(function (e, t) {
            var r = o;
            return $v.switchMap(function (e, t) {
                return n(r, e, t)
            }, function (e, t) {
                return r = t
            })(e).subscribe(t), function () {
                r = null
            }
        })
    };
    var tm = {}, rm = (Object.defineProperty(tm, "__esModule", {value: !0}), tm.takeUntil = void 0, S), nm = O, om = C,
        im = i;
    tm.takeUntil = function (r) {
        return rm.operate(function (e, t) {
            om.innerFrom(r).subscribe(nm.createOperatorSubscriber(t, function () {
                return t.complete()
            }, im.noop)), t.closed || e.subscribe(t)
        })
    };
    var um = {}, am = (Object.defineProperty(um, "__esModule", {value: !0}), um.takeWhile = void 0, S), sm = O;
    um.takeWhile = function (o, i) {
        return void 0 === i && (i = !1), am.operate(function (e, r) {
            var n = 0;
            e.subscribe(sm.createOperatorSubscriber(r, function (e) {
                var t = o(e, n++);
                (t || i) && r.next(e), t || r.complete()
            }))
        })
    };
    var cm = {}, lm = (Object.defineProperty(cm, "__esModule", {value: !0}), cm.tap = void 0, g), fm = S, pm = O,
        dm = P;
    cm.tap = function (e, t, r) {
        var o = lm.isFunction(e) || t || r ? {next: e, error: t, complete: r} : e;
        return o ? fm.operate(function (e, r) {
            null != (t = o.subscribe) && t.call(o);
            var t, n = !0;
            e.subscribe(pm.createOperatorSubscriber(r, function (e) {
                var t;
                null != (t = o.next) && t.call(o, e), r.next(e)
            }, function () {
                var e;
                n = !1, null != (e = o.complete) && e.call(o), r.complete()
            }, function (e) {
                var t;
                n = !1, null != (t = o.error) && t.call(o, e), r.error(e)
            }, function () {
                var e;
                n && null != (e = o.unsubscribe) && e.call(o), null != (e = o.finalize) && e.call(o)
            }))
        }) : dm.identity
    };
    var hm, bm, ym, _m, g = {},
        vm = (hm = g, Object.defineProperty(hm, "__esModule", {value: !0}), hm.throttle = hm.defaultThrottleConfig = void 0, bm = S, ym = O, _m = C, hm.defaultThrottleConfig = {
            leading: !0,
            trailing: !1
        }, hm.throttle = function (p, d) {
            return void 0 === d && (d = hm.defaultThrottleConfig), bm.operate(function (e, t) {
                function r() {
                    var e;
                    i && (i = !1, e = u, u = null, t.next(e), s || f(e))
                }

                var n = d.leading, o = d.trailing, i = !1, u = null, a = null, s = !1, c = function () {
                    null != a && a.unsubscribe(), a = null, o && (r(), s && t.complete())
                }, l = function () {
                    a = null, s && t.complete()
                }, f = function (e) {
                    return a = _m.innerFrom(p(e)).subscribe(ym.createOperatorSubscriber(t, c, l))
                };
                e.subscribe(ym.createOperatorSubscriber(t, function (e) {
                    i = !0, u = e, a && !a.closed || (n ? r() : f(e))
                }, function () {
                    s = !0, o && i && a && !a.closed || t.complete()
                }))
            })
        }, {}), mm = (Object.defineProperty(vm, "__esModule", {value: !0}), vm.throttleTime = void 0, gu), gm = g,
        Om = df;
    vm.throttleTime = function (e, t, r) {
        void 0 === r && (r = gm.defaultThrottleConfig);
        var n = Om.timer(e, t = void 0 === t ? mm.asyncScheduler : t);
        return gm.throttle(function () {
            return n
        }, r)
    };
    var wm = {},
        Em = (Object.defineProperty(wm, "__esModule", {value: !0}), wm.TimeInterval = wm.timeInterval = void 0, gu),
        Pm = S, Sm = O;
    wm.timeInterval = function (i) {
        return void 0 === i && (i = Em.asyncScheduler), Pm.operate(function (e, n) {
            var o = i.now();
            e.subscribe(Sm.createOperatorSubscriber(n, function (e) {
                var t = i.now(), r = t - o;
                o = t, n.next(new Tm(e, r))
            }))
        })
    };
    var Tm = function (e, t) {
            this.value = e, this.interval = t
        }, jm = (wm.TimeInterval = Tm, {}),
        Cm = (Object.defineProperty(jm, "__esModule", {value: !0}), jm.timeoutWith = void 0, gu), Im = As, Rm = Ka;
    jm.timeoutWith = function (e, t, r) {
        var n, o;
        if (r = null != r ? r : Cm.async, Im.isValidDate(e) ? n = e : "number" == typeof e && (o = e), !t) throw new TypeError("No observable provided to switch to");
        if (e = function () {
            return t
        }, null == n && null == o) throw new TypeError("No timeout provided.");
        return Rm.timeout({first: n, each: o, scheduler: r, with: e})
    };
    var As = {}, km = (Object.defineProperty(As, "__esModule", {value: !0}), As.timestamp = void 0, h), Am = Ic;
    As.timestamp = function (t) {
        return void 0 === t && (t = km.dateTimestampProvider), Am.map(function (e) {
            return {value: e, timestamp: t.now()}
        })
    };
    var h = {}, Mm = (Object.defineProperty(h, "__esModule", {value: !0}), h.window = void 0, u), xm = S, Nm = O,
        Um = i, Dm = C;
    h.window = function (o) {
        return xm.operate(function (e, t) {
            function r(e) {
                n.error(e), t.error(e)
            }

            var n = new Mm.Subject;
            t.next(n.asObservable());
            return e.subscribe(Nm.createOperatorSubscriber(t, function (e) {
                return null == n ? void 0 : n.next(e)
            }, function () {
                n.complete(), t.complete()
            }, r)), Dm.innerFrom(o).subscribe(Nm.createOperatorSubscriber(t, function () {
                n.complete(), t.next(n = new Mm.Subject)
            }, Um.noop, r)), function () {
                null != n && n.unsubscribe(), n = null
            }
        })
    };
    var Lm = {}, Bm = r && r.__values || function (e) {
        var t = "function" == typeof Symbol && Symbol.iterator, r = t && e[t], n = 0;
        if (r) return r.call(e);
        if (e && "number" == typeof e.length) return {
            next: function () {
                return {value: (e = e && n >= e.length ? void 0 : e) && e[n++], done: !e}
            }
        };
        throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
    }, Fm = (Object.defineProperty(Lm, "__esModule", {value: !0}), Lm.windowCount = void 0, u), Wm = S, zm = O;
    Lm.windowCount = function (s, e) {
        var c = 0 < (e = void 0 === e ? 0 : e) ? e : s;
        return Wm.operate(function (e, i) {
            var u = [new Fm.Subject], a = 0;
            i.next(u[0].asObservable()), e.subscribe(zm.createOperatorSubscriber(i, function (e) {
                try {
                    for (var t = Bm(u), r = t.next(); !r.done; r = t.next()) r.value.next(e)
                } catch (e) {
                    n = {error: e}
                } finally {
                    try {
                        r && !r.done && (o = t.return) && o.call(t)
                    } finally {
                        if (n) throw n.error
                    }
                }
                var n, o = a - s + 1;
                0 <= o && o % c == 0 && u.shift().complete(), ++a % c == 0 && (n = new Fm.Subject, u.push(n), i.next(n.asObservable()))
            }, function () {
                for (; 0 < u.length;) u.shift().complete();
                i.complete()
            }, function (e) {
                for (; 0 < u.length;) u.shift().error(e);
                i.error(e)
            }, function () {
                u = null
            }))
        })
    };
    var qm = {}, Vm = (Object.defineProperty(qm, "__esModule", {value: !0}), qm.windowTime = void 0, u), Hm = gu,
        Ym = _, Km = S, Gm = O, Zm = y, Qm = T, Xm = ms;
    qm.windowTime = function (c) {
        for (var e, t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
        var l = null != (e = Qm.popScheduler(t)) ? e : Hm.asyncScheduler, f = null != (e = t[0]) ? e : null,
            p = t[1] || 1 / 0;
        return Km.operate(function (e, n) {
            function r(t) {
                s(function (e) {
                    e = e.window;
                    return t(e)
                }), t(n), n.unsubscribe()
            }

            var o = [], i = !1, u = function (e) {
                var t = e.window, r = e.subs;
                t.complete(), r.unsubscribe(), Zm.arrRemove(o, e), i && a()
            }, a = function () {
                var e, t, r;
                o && (e = new Ym.Subscription, n.add(e), t = new Vm.Subject, o.push(r = {
                    window: t,
                    subs: e,
                    seen: 0
                }), n.next(t.asObservable()), Xm.executeSchedule(e, l, function () {
                    return u(r)
                }, c))
            }, s = (null !== f && 0 <= f ? Xm.executeSchedule(n, l, a, f, !0) : i = !0, a(), function (e) {
                return o.slice().forEach(e)
            });
            return e.subscribe(Gm.createOperatorSubscriber(n, function (t) {
                s(function (e) {
                    e.window.next(t), p <= ++e.seen && u(e)
                })
            }, function () {
                return r(function (e) {
                    return e.complete()
                })
            }, function (t) {
                return r(function (e) {
                    return e.error(t)
                })
            })), function () {
                o = null
            }
        })
    };
    var ms = {}, Jm = r && r.__values || function (e) {
            var t = "function" == typeof Symbol && Symbol.iterator, r = t && e[t], n = 0;
            if (r) return r.call(e);
            if (e && "number" == typeof e.length) return {
                next: function () {
                    return {value: (e = e && n >= e.length ? void 0 : e) && e[n++], done: !e}
                }
            };
            throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
        }, $m = (Object.defineProperty(ms, "__esModule", {value: !0}), ms.windowToggle = void 0, u), e0 = _, t0 = S, r0 = C,
        n0 = O, o0 = i, i0 = y;
    ms.windowToggle = function (t, a) {
        return t0.operate(function (e, o) {
            function i(e) {
                for (; 0 < u.length;) u.shift().error(e);
                o.error(e)
            }

            var u = [];
            r0.innerFrom(t).subscribe(n0.createOperatorSubscriber(o, function (e) {
                var t, r = new $m.Subject, n = (u.push(r), new e0.Subscription);
                try {
                    t = r0.innerFrom(a(e))
                } catch (e) {
                    return void i(e)
                }
                o.next(r.asObservable()), n.add(t.subscribe(n0.createOperatorSubscriber(o, function () {
                    i0.arrRemove(u, r), r.complete(), n.unsubscribe()
                }, o0.noop, i)))
            }, o0.noop)), e.subscribe(n0.createOperatorSubscriber(o, function (e) {
                var t, r, n = u.slice();
                try {
                    for (var o = Jm(n), i = o.next(); !i.done; i = o.next()) i.value.next(e)
                } catch (e) {
                    t = {error: e}
                } finally {
                    try {
                        i && !i.done && (r = o.return) && r.call(o)
                    } finally {
                        if (t) throw t.error
                    }
                }
            }, function () {
                for (; 0 < u.length;) u.shift().complete();
                o.complete()
            }, i, function () {
                for (; 0 < u.length;) u.shift().unsubscribe()
            }))
        })
    };
    var y = {}, u0 = (Object.defineProperty(y, "__esModule", {value: !0}), y.windowWhen = void 0, u), a0 = S, s0 = O,
        c0 = C;
    y.windowWhen = function (u) {
        return a0.operate(function (e, t) {
            var r, n, o = function (e) {
                r.error(e), t.error(e)
            }, i = function () {
                var e;
                null != n && n.unsubscribe(), null != r && r.complete(), r = new u0.Subject, t.next(r.asObservable());
                try {
                    e = c0.innerFrom(u())
                } catch (e) {
                    return void o(e)
                }
                e.subscribe(n = s0.createOperatorSubscriber(t, i, i, o))
            };
            i(), e.subscribe(s0.createOperatorSubscriber(t, function (e) {
                return r.next(e)
            }, function () {
                r.complete(), t.complete()
            }, o, function () {
                null != n && n.unsubscribe(), r = null
            }))
        })
    };
    var l0 = {}, f0 = r && r.__read || function (e, t) {
            var r = "function" == typeof Symbol && e[Symbol.iterator];
            if (!r) return e;
            var n, o, i = r.call(e), u = [];
            try {
                for (; (void 0 === t || 0 < t--) && !(n = i.next()).done;) u.push(n.value)
            } catch (e) {
                o = {error: e}
            } finally {
                try {
                    n && !n.done && (r = i.return) && r.call(i)
                } finally {
                    if (o) throw o.error
                }
            }
            return u
        }, p0 = r && r.__spreadArray || function (e, t) {
            for (var r = 0, n = t.length, o = e.length; r < n; r++, o++) e[o] = t[r];
            return e
        }, d0 = (Object.defineProperty(l0, "__esModule", {value: !0}), l0.withLatestFrom = void 0, S), h0 = O, b0 = C,
        y0 = P, _0 = i, v0 = T;
    l0.withLatestFrom = function () {
        for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
        var s = v0.popResultSelector(a);
        return d0.operate(function (e, r) {
            for (var t = a.length, n = new Array(t), o = a.map(function () {
                return !1
            }), i = !1, u = 0; u < t; u++) !function (t) {
                b0.innerFrom(a[t]).subscribe(h0.createOperatorSubscriber(r, function (e) {
                    n[t] = e, i || o[t] || (o[t] = !0, (i = o.every(y0.identity)) && (o = null))
                }, _0.noop))
            }(u);
            e.subscribe(h0.createOperatorSubscriber(r, function (e) {
                i && (e = p0([e], f0(n)), r.next(s ? s.apply(void 0, p0([], f0(e))) : e))
            }))
        })
    };
    var O = {}, m0 = (Object.defineProperty(O, "__esModule", {value: !0}), O.zipAll = void 0, op), g0 = I;
    O.zipAll = function (e) {
        return g0.joinAllInternals(m0.zip, e)
    };
    var C = {}, T = {}, O0 = r && r.__read || function (e, t) {
        var r = "function" == typeof Symbol && e[Symbol.iterator];
        if (!r) return e;
        var n, o, i = r.call(e), u = [];
        try {
            for (; (void 0 === t || 0 < t--) && !(n = i.next()).done;) u.push(n.value)
        } catch (e) {
            o = {error: e}
        } finally {
            try {
                n && !n.done && (r = i.return) && r.call(i)
            } finally {
                if (o) throw o.error
            }
        }
        return u
    }, w0 = r && r.__spreadArray || function (e, t) {
        for (var r = 0, n = t.length, o = e.length; r < n; r++, o++) e[o] = t[r];
        return e
    }, E0 = (Object.defineProperty(T, "__esModule", {value: !0}), T.zip = void 0, op), P0 = S;
    T.zip = function () {
        for (var r = [], e = 0; e < arguments.length; e++) r[e] = arguments[e];
        return P0.operate(function (e, t) {
            E0.zip.apply(void 0, w0([e], O0(r))).subscribe(t)
        })
    };
    var S0, T0, j0, C0, I0, R0, k0, A0, M0, x0, N0, U0, D0, L0, B0, F0, W0, z0, q0, V0, H0, Y0, K0, G0, Z0, Q0, X0, J0,
        $0, eg, tg, rg, ng, og, ig, ug, ag, sg, cg, lg, fg, pg, dg, hg, bg, yg, _g, vg, mg, gg, Og, wg, Eg, Pg, Sg, Tg,
        jg, Cg, Ig, Rg, kg, Ag, Mg, xg, Ng, Ug, Dg, Lg, Bg, Fg, Wg, zg, qg, Vg, Hg, Yg, Kg, Gg, Zg, Qg, Xg, Jg, $g, eO,
        tO, rO, nO, oO, iO, uO, aO, sO, cO, lO, fO, pO, dO, hO, bO, yO, _O, vO, mO, gO, OO, wO, EO, PO, SO, TO, jO, CO,
        IO, RO, kO, AO, MO, xO, NO, UO, DO, LO, BO, FO, WO, zO, qO, VO, HO, YO, KO, GO, ZO, QO, XO, JO, $O, ew, tw, rw,
        nw, ow, iw, uw, aw, sw, cw, lw, fw, pw, dw, hw, bw, yw, _w, vw, mw, gw, Ow, ww, Ew, Pw, Sw, Tw, jw, Cw, Iw, Rw,
        kw = r && r.__read || function (e, t) {
            var r = "function" == typeof Symbol && e[Symbol.iterator];
            if (!r) return e;
            var n, o, i = r.call(e), u = [];
            try {
                for (; (void 0 === t || 0 < t--) && !(n = i.next()).done;) u.push(n.value)
            } catch (e) {
                o = {error: e}
            } finally {
                try {
                    n && !n.done && (r = i.return) && r.call(i)
                } finally {
                    if (o) throw o.error
                }
            }
            return u
        }, Aw = r && r.__spreadArray || function (e, t) {
            for (var r = 0, n = t.length, o = e.length; r < n; r++, o++) e[o] = t[r];
            return e
        }, Mw = (Object.defineProperty(C, "__esModule", {value: !0}), C.zipWith = void 0, T);
    C.zipWith = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        return Mw.zip.apply(void 0, Aw([], kw(e)))
    }, I = lr, S0 = r && r.__createBinding || (Object.create ? function (e, t, r, n) {
        void 0 === n && (n = r), Object.defineProperty(e, n, {
            enumerable: !0, get: function () {
                return t[r]
            }
        })
    } : function (e, t, r, n) {
        e[n = void 0 === n ? r : n] = t[r]
    }), S = r && r.__exportStar || function (e, t) {
        for (var r in e) "default" === r || Object.prototype.hasOwnProperty.call(t, r) || S0(t, e, r)
    }, Object.defineProperty(I, "__esModule", {value: !0}), I.interval = I.iif = I.generate = I.fromEventPattern = I.fromEvent = I.from = I.forkJoin = I.empty = I.defer = I.connectable = I.concat = I.combineLatest = I.bindNodeCallback = I.bindCallback = I.UnsubscriptionError = I.TimeoutError = I.SequenceError = I.ObjectUnsubscribedError = I.NotFoundError = I.EmptyError = I.ArgumentOutOfRangeError = I.firstValueFrom = I.lastValueFrom = I.isObservable = I.identity = I.noop = I.pipe = I.NotificationKind = I.Notification = I.Subscriber = I.Subscription = I.Scheduler = I.VirtualAction = I.VirtualTimeScheduler = I.animationFrameScheduler = I.animationFrame = I.queueScheduler = I.queue = I.asyncScheduler = I.async = I.asapScheduler = I.asap = I.AsyncSubject = I.ReplaySubject = I.BehaviorSubject = I.Subject = I.animationFrames = I.observable = I.ConnectableObservable = I.Observable = void 0, I.filter = I.expand = I.exhaustMap = I.exhaustAll = I.exhaust = I.every = I.endWith = I.elementAt = I.distinctUntilKeyChanged = I.distinctUntilChanged = I.distinct = I.dematerialize = I.delayWhen = I.delay = I.defaultIfEmpty = I.debounceTime = I.debounce = I.count = I.connect = I.concatWith = I.concatMapTo = I.concatMap = I.concatAll = I.combineLatestWith = I.combineLatestAll = I.combineAll = I.catchError = I.bufferWhen = I.bufferToggle = I.bufferTime = I.bufferCount = I.buffer = I.auditTime = I.audit = I.config = I.NEVER = I.EMPTY = I.scheduled = I.zip = I.using = I.timer = I.throwError = I.range = I.race = I.partition = I.pairs = I.onErrorResumeNext = I.of = I.never = I.merge = void 0, I.switchMap = I.switchAll = I.subscribeOn = I.startWith = I.skipWhile = I.skipUntil = I.skipLast = I.skip = I.single = I.shareReplay = I.share = I.sequenceEqual = I.scan = I.sampleTime = I.sample = I.refCount = I.retryWhen = I.retry = I.repeatWhen = I.repeat = I.reduce = I.raceWith = I.publishReplay = I.publishLast = I.publishBehavior = I.publish = I.pluck = I.pairwise = I.onErrorResumeNextWith = I.observeOn = I.multicast = I.min = I.mergeWith = I.mergeScan = I.mergeMapTo = I.mergeMap = I.flatMap = I.mergeAll = I.max = I.materialize = I.mapTo = I.map = I.last = I.isEmpty = I.ignoreElements = I.groupBy = I.first = I.findIndex = I.find = I.finalize = void 0, I.zipWith = I.zipAll = I.withLatestFrom = I.windowWhen = I.windowToggle = I.windowTime = I.windowCount = I.window = I.toArray = I.timestamp = I.timeoutWith = I.timeout = I.timeInterval = I.throwIfEmpty = I.throttleTime = I.throttle = I.tap = I.takeWhile = I.takeUntil = I.takeLast = I.take = I.switchScan = I.switchMapTo = void 0, T0 = s, Object.defineProperty(I, "Observable", {
        enumerable: !0,
        get: function () {
            return T0.Observable
        }
    }), j0 = w, Object.defineProperty(I, "ConnectableObservable", {
        enumerable: !0, get: function () {
            return j0.ConnectableObservable
        }
    }), C0 = jr, Object.defineProperty(I, "observable", {
        enumerable: !0, get: function () {
            return C0.observable
        }
    }), I0 = n, Object.defineProperty(I, "animationFrames", {
        enumerable: !0, get: function () {
            return I0.animationFrames
        }
    }), R0 = u, Object.defineProperty(I, "Subject", {
        enumerable: !0, get: function () {
            return R0.Subject
        }
    }), k0 = t, Object.defineProperty(I, "BehaviorSubject", {
        enumerable: !0, get: function () {
            return k0.BehaviorSubject
        }
    }), A0 = b, Object.defineProperty(I, "ReplaySubject", {
        enumerable: !0, get: function () {
            return A0.ReplaySubject
        }
    }), M0 = l, Object.defineProperty(I, "AsyncSubject", {
        enumerable: !0, get: function () {
            return M0.AsyncSubject
        }
    }), x0 = yu, Object.defineProperty(I, "asap", {
        enumerable: !0, get: function () {
            return x0.asap
        }
    }), Object.defineProperty(I, "asapScheduler", {
        enumerable: !0, get: function () {
            return x0.asapScheduler
        }
    }), N0 = gu, Object.defineProperty(I, "async", {
        enumerable: !0, get: function () {
            return N0.async
        }
    }), Object.defineProperty(I, "asyncScheduler", {
        enumerable: !0, get: function () {
            return N0.asyncScheduler
        }
    }), U0 = Yu, Object.defineProperty(I, "queue", {
        enumerable: !0, get: function () {
            return U0.queue
        }
    }), Object.defineProperty(I, "queueScheduler", {
        enumerable: !0, get: function () {
            return U0.queueScheduler
        }
    }), D0 = ra, Object.defineProperty(I, "animationFrame", {
        enumerable: !0, get: function () {
            return D0.animationFrame
        }
    }), Object.defineProperty(I, "animationFrameScheduler", {
        enumerable: !0, get: function () {
            return D0.animationFrameScheduler
        }
    }), L0 = ua, Object.defineProperty(I, "VirtualTimeScheduler", {
        enumerable: !0, get: function () {
            return L0.VirtualTimeScheduler
        }
    }), Object.defineProperty(I, "VirtualAction", {
        enumerable: !0, get: function () {
            return L0.VirtualAction
        }
    }), B0 = Cu, Object.defineProperty(I, "Scheduler", {
        enumerable: !0, get: function () {
            return B0.Scheduler
        }
    }), F0 = _, Object.defineProperty(I, "Subscription", {
        enumerable: !0, get: function () {
            return F0.Subscription
        }
    }), W0 = Mr, Object.defineProperty(I, "Subscriber", {
        enumerable: !0, get: function () {
            return W0.Subscriber
        }
    }), z0 = Ou, Object.defineProperty(I, "Notification", {
        enumerable: !0, get: function () {
            return z0.Notification
        }
    }), Object.defineProperty(I, "NotificationKind", {
        enumerable: !0, get: function () {
            return z0.NotificationKind
        }
    }), q0 = st, Object.defineProperty(I, "pipe", {
        enumerable: !0, get: function () {
            return q0.pipe
        }
    }), V0 = i, Object.defineProperty(I, "noop", {
        enumerable: !0, get: function () {
            return V0.noop
        }
    }), H0 = P, Object.defineProperty(I, "identity", {
        enumerable: !0, get: function () {
            return H0.identity
        }
    }), Y0 = qa, Object.defineProperty(I, "isObservable", {
        enumerable: !0, get: function () {
            return Y0.isObservable
        }
    }), K0 = Ua, Object.defineProperty(I, "lastValueFrom", {
        enumerable: !0, get: function () {
            return K0.lastValueFrom
        }
    }), G0 = Ba, Object.defineProperty(I, "firstValueFrom", {
        enumerable: !0, get: function () {
            return G0.firstValueFrom
        }
    }), Z0 = Wa, Object.defineProperty(I, "ArgumentOutOfRangeError", {
        enumerable: !0, get: function () {
            return Z0.ArgumentOutOfRangeError
        }
    }), Q0 = xa, Object.defineProperty(I, "EmptyError", {
        enumerable: !0, get: function () {
            return Q0.EmptyError
        }
    }), X0 = Ws, Object.defineProperty(I, "NotFoundError", {
        enumerable: !0, get: function () {
            return X0.NotFoundError
        }
    }), J0 = p, Object.defineProperty(I, "ObjectUnsubscribedError", {
        enumerable: !0, get: function () {
            return J0.ObjectUnsubscribedError
        }
    }), $0 = Cs, Object.defineProperty(I, "SequenceError", {
        enumerable: !0, get: function () {
            return $0.SequenceError
        }
    }), eg = Ka, Object.defineProperty(I, "TimeoutError", {
        enumerable: !0, get: function () {
            return eg.TimeoutError
        }
    }), tg = m, Object.defineProperty(I, "UnsubscriptionError", {
        enumerable: !0, get: function () {
            return tg.UnsubscriptionError
        }
    }), rg = za, Object.defineProperty(I, "bindCallback", {
        enumerable: !0, get: function () {
            return rg.bindCallback
        }
    }), ng = Hc, Object.defineProperty(I, "bindNodeCallback", {
        enumerable: !0, get: function () {
            return ng.bindNodeCallback
        }
    }), og = a, Object.defineProperty(I, "combineLatest", {
        enumerable: !0, get: function () {
            return og.combineLatest
        }
    }), ig = ll, Object.defineProperty(I, "concat", {
        enumerable: !0, get: function () {
            return ig.concat
        }
    }), ug = Il, Object.defineProperty(I, "connectable", {
        enumerable: !0, get: function () {
            return ug.connectable
        }
    }), ag = Rl, Object.defineProperty(I, "defer", {
        enumerable: !0, get: function () {
            return ag.defer
        }
    }), sg = j, Object.defineProperty(I, "empty", {
        enumerable: !0, get: function () {
            return sg.empty
        }
    }), cg = Dl, Object.defineProperty(I, "forkJoin", {
        enumerable: !0, get: function () {
            return cg.forkJoin
        }
    }), lg = Ra, Object.defineProperty(I, "from", {
        enumerable: !0, get: function () {
            return lg.from
        }
    }), fg = Kc, Object.defineProperty(I, "fromEvent", {
        enumerable: !0, get: function () {
            return fg.fromEvent
        }
    }), pg = Jc, Object.defineProperty(I, "fromEventPattern", {
        enumerable: !0, get: function () {
            return pg.fromEventPattern
        }
    }), dg = Ma, Object.defineProperty(I, "generate", {
        enumerable: !0, get: function () {
            return dg.generate
        }
    }), hg = xs, Object.defineProperty(I, "iif", {
        enumerable: !0, get: function () {
            return hg.iif
        }
    }),bg = pf,Object.defineProperty(I, "interval", {
        enumerable: !0, get: function () {
            return bg.interval
        }
    }),yg = Sa,Object.defineProperty(I, "merge", {
        enumerable: !0, get: function () {
            return yg.merge
        }
    }),_g = Tf,Object.defineProperty(I, "never", {
        enumerable: !0, get: function () {
            return _g.never
        }
    }),vg = o,Object.defineProperty(I, "of", {
        enumerable: !0, get: function () {
            return vg.of
        }
    }),mg = jf,Object.defineProperty(I, "onErrorResumeNext", {
        enumerable: !0, get: function () {
            return mg.onErrorResumeNext
        }
    }),gg = Nf,Object.defineProperty(I, "pairs", {
        enumerable: !0, get: function () {
            return gg.pairs
        }
    }),Og = Df,Object.defineProperty(I, "partition", {
        enumerable: !0, get: function () {
            return Og.partition
        }
    }),wg = Hf,Object.defineProperty(I, "race", {
        enumerable: !0, get: function () {
            return wg.race
        }
    }),Eg = Xf,Object.defineProperty(I, "range", {
        enumerable: !0, get: function () {
            return Eg.range
        }
    }),Pg = Aa,Object.defineProperty(I, "throwError", {
        enumerable: !0, get: function () {
            return Pg.throwError
        }
    }),Sg = df,Object.defineProperty(I, "timer", {
        enumerable: !0, get: function () {
            return Sg.timer
        }
    }),Tg = ep,Object.defineProperty(I, "using", {
        enumerable: !0, get: function () {
            return Tg.using
        }
    }),jg = op,Object.defineProperty(I, "zip", {
        enumerable: !0, get: function () {
            return jg.zip
        }
    }),Cg = ka,Object.defineProperty(I, "scheduled", {
        enumerable: !0, get: function () {
            return Cg.scheduled
        }
    }),Ig = j,Object.defineProperty(I, "EMPTY", {
        enumerable: !0, get: function () {
            return Ig.EMPTY
        }
    }),Rg = Tf,Object.defineProperty(I, "NEVER", {
        enumerable: !0, get: function () {
            return Rg.NEVER
        }
    }),S(dp, I),kg = yn,Object.defineProperty(I, "config", {
        enumerable: !0, get: function () {
            return kg.config
        }
    }),Ag = hp,Object.defineProperty(I, "audit", {
        enumerable: !0, get: function () {
            return Ag.audit
        }
    }),Mg = vp,Object.defineProperty(I, "auditTime", {
        enumerable: !0, get: function () {
            return Mg.auditTime
        }
    }),xg = wp,Object.defineProperty(I, "buffer", {
        enumerable: !0, get: function () {
            return xg.buffer
        }
    }),Ng = jp,Object.defineProperty(I, "bufferCount", {
        enumerable: !0, get: function () {
            return Ng.bufferCount
        }
    }),Ug = Ap,Object.defineProperty(I, "bufferTime", {
        enumerable: !0, get: function () {
            return Ug.bufferTime
        }
    }),Dg = Wp,Object.defineProperty(I, "bufferToggle", {
        enumerable: !0, get: function () {
            return Dg.bufferToggle
        }
    }),Lg = Zp,Object.defineProperty(I, "bufferWhen", {
        enumerable: !0, get: function () {
            return Lg.bufferWhen
        }
    }),Bg = ed,Object.defineProperty(I, "catchError", {
        enumerable: !0, get: function () {
            return Bg.catchError
        }
    }),Fg = od,Object.defineProperty(I, "combineAll", {
        enumerable: !0, get: function () {
            return Fg.combineAll
        }
    }),Wg = id,Object.defineProperty(I, "combineLatestAll", {
        enumerable: !0, get: function () {
            return Wg.combineLatestAll
        }
    }),zg = wd,Object.defineProperty(I, "combineLatestWith", {
        enumerable: !0, get: function () {
            return zg.combineLatestWith
        }
    }),qg = fl,Object.defineProperty(I, "concatAll", {
        enumerable: !0, get: function () {
            return qg.concatAll
        }
    }),Vg = Cc,Object.defineProperty(I, "concatMap", {
        enumerable: !0, get: function () {
            return Vg.concatMap
        }
    }),Hg = Ld,Object.defineProperty(I, "concatMapTo", {
        enumerable: !0, get: function () {
            return Hg.concatMapTo
        }
    }),Yg = Wd,Object.defineProperty(I, "concatWith", {
        enumerable: !0, get: function () {
            return Yg.concatWith
        }
    }),Kg = Jd,Object.defineProperty(I, "connect", {
        enumerable: !0, get: function () {
            return Kg.connect
        }
    }),Gg = $d,Object.defineProperty(I, "count", {
        enumerable: !0, get: function () {
            return Gg.count
        }
    }),Zg = ah,Object.defineProperty(I, "debounce", {
        enumerable: !0, get: function () {
            return Zg.debounce
        }
    }),Qg = R,Object.defineProperty(I, "debounceTime", {
        enumerable: !0, get: function () {
            return Qg.debounceTime
        }
    }),Xg = bh,Object.defineProperty(I, "defaultIfEmpty", {
        enumerable: !0, get: function () {
            return Xg.defaultIfEmpty
        }
    }),Jg = vh,Object.defineProperty(I, "delay", {
        enumerable: !0, get: function () {
            return Jg.delay
        }
    }),$g = mh,Object.defineProperty(I, "delayWhen", {
        enumerable: !0, get: function () {
            return $g.delayWhen
        }
    }),eO = Bh,Object.defineProperty(I, "dematerialize", {
        enumerable: !0, get: function () {
            return eO.dematerialize
        }
    }),tO = qh,Object.defineProperty(I, "distinct", {
        enumerable: !0, get: function () {
            return tO.distinct
        }
    }),rO = Gh,Object.defineProperty(I, "distinctUntilChanged", {
        enumerable: !0, get: function () {
            return rO.distinctUntilChanged
        }
    }),nO = $h,Object.defineProperty(I, "distinctUntilKeyChanged", {
        enumerable: !0, get: function () {
            return nO.distinctUntilKeyChanged
        }
    }),oO = tb,Object.defineProperty(I, "elementAt", {
        enumerable: !0, get: function () {
            return oO.elementAt
        }
    }),iO = pb,Object.defineProperty(I, "endWith", {
        enumerable: !0, get: function () {
            return iO.endWith
        }
    }),uO = _b,Object.defineProperty(I, "every", {
        enumerable: !0, get: function () {
            return uO.every
        }
    }),aO = gb,Object.defineProperty(I, "exhaust", {
        enumerable: !0, get: function () {
            return aO.exhaust
        }
    }),sO = Ob,Object.defineProperty(I, "exhaustAll", {
        enumerable: !0, get: function () {
            return sO.exhaustAll
        }
    }),cO = wb,Object.defineProperty(I, "exhaustMap", {
        enumerable: !0, get: function () {
            return cO.exhaustMap
        }
    }),lO = Ib,Object.defineProperty(I, "expand", {
        enumerable: !0, get: function () {
            return lO.expand
        }
    }),fO = Bf,Object.defineProperty(I, "filter", {
        enumerable: !0, get: function () {
            return fO.filter
        }
    }),pO = k,Object.defineProperty(I, "finalize", {
        enumerable: !0, get: function () {
            return pO.finalize
        }
    }),dO = Mb,Object.defineProperty(I, "find", {
        enumerable: !0, get: function () {
            return dO.find
        }
    }),hO = Db,Object.defineProperty(I, "findIndex", {
        enumerable: !0, get: function () {
            return hO.findIndex
        }
    }),bO = Fb,Object.defineProperty(I, "first", {
        enumerable: !0, get: function () {
            return bO.first
        }
    }),yO = Kb,Object.defineProperty(I, "groupBy", {
        enumerable: !0, get: function () {
            return yO.groupBy
        }
    }),_O = Ph,Object.defineProperty(I, "ignoreElements", {
        enumerable: !0, get: function () {
            return _O.ignoreElements
        }
    }),vO = $b,Object.defineProperty(I, "isEmpty", {
        enumerable: !0, get: function () {
            return vO.isEmpty
        }
    }),mO = ry,Object.defineProperty(I, "last", {
        enumerable: !0, get: function () {
            return mO.last
        }
    }),gO = Ic,Object.defineProperty(I, "map", {
        enumerable: !0, get: function () {
            return gO.map
        }
    }),OO = Ch,Object.defineProperty(I, "mapTo", {
        enumerable: !0, get: function () {
            return OO.mapTo
        }
    }),wO = hy,Object.defineProperty(I, "materialize", {
        enumerable: !0, get: function () {
            return wO.materialize
        }
    }),EO = vy,Object.defineProperty(I, "max", {
        enumerable: !0, get: function () {
            return EO.max
        }
    }),PO = pl,Object.defineProperty(I, "mergeAll", {
        enumerable: !0, get: function () {
            return PO.mergeAll
        }
    }),SO = Oy,Object.defineProperty(I, "flatMap", {
        enumerable: !0, get: function () {
            return SO.flatMap
        }
    }),TO = dl,Object.defineProperty(I, "mergeMap", {
        enumerable: !0, get: function () {
            return TO.mergeMap
        }
    }),jO = wy,Object.defineProperty(I, "mergeMapTo", {
        enumerable: !0, get: function () {
            return jO.mergeMapTo
        }
    }),CO = Sy,Object.defineProperty(I, "mergeScan", {
        enumerable: !0, get: function () {
            return CO.mergeScan
        }
    }),IO = hl,Object.defineProperty(I, "mergeWith", {
        enumerable: !0, get: function () {
            return IO.mergeWith
        }
    }),RO = By,Object.defineProperty(I, "min", {
        enumerable: !0, get: function () {
            return RO.min
        }
    }),kO = zy,Object.defineProperty(I, "multicast", {
        enumerable: !0, get: function () {
            return kO.multicast
        }
    }),AO = v,Object.defineProperty(I, "observeOn", {
        enumerable: !0, get: function () {
            return AO.observeOn
        }
    }),MO = Yy,Object.defineProperty(I, "onErrorResumeNextWith", {
        enumerable: !0, get: function () {
            return MO.onErrorResumeNextWith
        }
    }),xO = Jy,Object.defineProperty(I, "pairwise", {
        enumerable: !0, get: function () {
            return xO.pairwise
        }
    }),NO = t_,Object.defineProperty(I, "pluck", {
        enumerable: !0, get: function () {
            return NO.pluck
        }
    }),UO = n_,Object.defineProperty(I, "publish", {
        enumerable: !0, get: function () {
            return UO.publish
        }
    }),DO = a_,Object.defineProperty(I, "publishBehavior", {
        enumerable: !0, get: function () {
            return DO.publishBehavior
        }
    }),LO = l_,Object.defineProperty(I, "publishLast", {
        enumerable: !0, get: function () {
            return LO.publishLast
        }
    }),BO = d_,Object.defineProperty(I, "publishReplay", {
        enumerable: !0, get: function () {
            return BO.publishReplay
        }
    }),FO = __,Object.defineProperty(I, "raceWith", {
        enumerable: !0, get: function () {
            return FO.raceWith
        }
    }),WO = ad,Object.defineProperty(I, "reduce", {
        enumerable: !0, get: function () {
            return WO.reduce
        }
    }),zO = E_,Object.defineProperty(I, "repeat", {
        enumerable: !0, get: function () {
            return zO.repeat
        }
    }),qO = I_,Object.defineProperty(I, "repeatWhen", {
        enumerable: !0, get: function () {
            return qO.repeatWhen
        }
    }),VO = x_,Object.defineProperty(I, "retry", {
        enumerable: !0, get: function () {
            return VO.retry
        }
    }),HO = F_,Object.defineProperty(I, "retryWhen", {
        enumerable: !0, get: function () {
            return HO.retryWhen
        }
    }),YO = E,Object.defineProperty(I, "refCount", {
        enumerable: !0, get: function () {
            return YO.refCount
        }
    }),KO = H_,Object.defineProperty(I, "sample", {
        enumerable: !0, get: function () {
            return KO.sample
        }
    }),GO = Q_,Object.defineProperty(I, "sampleTime", {
        enumerable: !0, get: function () {
            return GO.sampleTime
        }
    }),ZO = ev,Object.defineProperty(I, "scan", {
        enumerable: !0, get: function () {
            return ZO.scan
        }
    }),QO = sd,Object.defineProperty(I, "sequenceEqual", {
        enumerable: !0, get: function () {
            return QO.sequenceEqual
        }
    }),XO = av,Object.defineProperty(I, "share", {
        enumerable: !0, get: function () {
            return XO.share
        }
    }),JO = bv,Object.defineProperty(I, "shareReplay", {
        enumerable: !0, get: function () {
            return JO.shareReplay
        }
    }),$O = vv,Object.defineProperty(I, "single", {
        enumerable: !0, get: function () {
            return $O.single
        }
    }),ew = Pv,Object.defineProperty(I, "skip", {
        enumerable: !0, get: function () {
            return ew.skip
        }
    }),tw = Tv,Object.defineProperty(I, "skipLast", {
        enumerable: !0, get: function () {
            return tw.skipLast
        }
    }),rw = Rv,Object.defineProperty(I, "skipUntil", {
        enumerable: !0, get: function () {
            return rw.skipUntil
        }
    }),nw = Nv,Object.defineProperty(I, "skipWhile", {
        enumerable: !0, get: function () {
            return nw.skipWhile
        }
    }),ow = Lv,Object.defineProperty(I, "startWith", {
        enumerable: !0, get: function () {
            return ow.startWith
        }
    }),iw = Es,Object.defineProperty(I, "subscribeOn", {
        enumerable: !0, get: function () {
            return iw.subscribeOn
        }
    }),uw = zv,Object.defineProperty(I, "switchAll", {
        enumerable: !0, get: function () {
            return uw.switchAll
        }
    }),aw = qv,Object.defineProperty(I, "switchMap", {
        enumerable: !0, get: function () {
            return aw.switchMap
        }
    }),sw = Zv,Object.defineProperty(I, "switchMapTo", {
        enumerable: !0, get: function () {
            return sw.switchMapTo
        }
    }),cw = Jv,Object.defineProperty(I, "switchScan", {
        enumerable: !0, get: function () {
            return cw.switchScan
        }
    }),lw = gh,Object.defineProperty(I, "take", {
        enumerable: !0, get: function () {
            return lw.take
        }
    }),fw = ny,Object.defineProperty(I, "takeLast", {
        enumerable: !0, get: function () {
            return fw.takeLast
        }
    }),pw = tm,Object.defineProperty(I, "takeUntil", {
        enumerable: !0, get: function () {
            return pw.takeUntil
        }
    }),dw = um,Object.defineProperty(I, "takeWhile", {
        enumerable: !0, get: function () {
            return dw.takeWhile
        }
    }),hw = cm,Object.defineProperty(I, "tap", {
        enumerable: !0, get: function () {
            return hw.tap
        }
    }),bw = g,Object.defineProperty(I, "throttle", {
        enumerable: !0, get: function () {
            return bw.throttle
        }
    }),yw = vm,Object.defineProperty(I, "throttleTime", {
        enumerable: !0, get: function () {
            return yw.throttleTime
        }
    }),_w = rb,Object.defineProperty(I, "throwIfEmpty", {
        enumerable: !0, get: function () {
            return _w.throwIfEmpty
        }
    }),vw = wm,Object.defineProperty(I, "timeInterval", {
        enumerable: !0, get: function () {
            return vw.timeInterval
        }
    }),mw = Ka,Object.defineProperty(I, "timeout", {
        enumerable: !0, get: function () {
            return mw.timeout
        }
    }),gw = jm,Object.defineProperty(I, "timeoutWith", {
        enumerable: !0, get: function () {
            return gw.timeoutWith
        }
    }),Ow = As,Object.defineProperty(I, "timestamp", {
        enumerable: !0, get: function () {
            return Ow.timestamp
        }
    }),ww = ud,Object.defineProperty(I, "toArray", {
        enumerable: !0, get: function () {
            return ww.toArray
        }
    }),Ew = h,Object.defineProperty(I, "window", {
        enumerable: !0, get: function () {
            return Ew.window
        }
    }),Pw = Lm,Object.defineProperty(I, "windowCount", {
        enumerable: !0, get: function () {
            return Pw.windowCount
        }
    }),Sw = qm,Object.defineProperty(I, "windowTime", {
        enumerable: !0, get: function () {
            return Sw.windowTime
        }
    }),Tw = ms,Object.defineProperty(I, "windowToggle", {
        enumerable: !0, get: function () {
            return Tw.windowToggle
        }
    }),jw = y,Object.defineProperty(I, "windowWhen", {
        enumerable: !0, get: function () {
            return jw.windowWhen
        }
    }),Cw = l0,Object.defineProperty(I, "withLatestFrom", {
        enumerable: !0, get: function () {
            return Cw.withLatestFrom
        }
    }),Iw = O,Object.defineProperty(I, "zipAll", {
        enumerable: !0, get: function () {
            return Iw.zipAll
        }
    }),Rw = C,Object.defineProperty(I, "zipWith", {
        enumerable: !0, get: function () {
            return Rw.zipWith
        }
    });
    var s = {}, w = {}, xw = (Object.defineProperty(w, "__esModule", {value: !0}), w.partition = void 0, Lf), Nw = Bf;
    w.partition = function (t, r) {
        return function (e) {
            return [Nw.filter(t, r)(e), Nw.filter(xw.not(t, r))(e)]
        }
    };
    var Uw, Dw, Lw, Bw, Fw, Ww, zw, qw, Vw, Hw, Yw, Kw, Gw, Zw, Qw, Xw, Jw, $w, eE, tE, rE, nE, oE, iE, uE, aE, sE, cE,
        lE, fE, pE, dE, hE, bE, yE, _E, vE, mE, gE, OE, wE, EE, PE, SE, TE, jE, CE, IE, RE, kE, AE, ME, xE, NE, UE, DE,
        LE, BE, FE, WE, zE, qE, VE, HE, YE, KE, GE, ZE, QE, XE, JE, $E, eP, tP, rP, nP, oP, iP, uP, aP, sP, cP, lP, fP,
        pP, dP, hP, bP, yP, _P, vP, mP, gP, OP, wP, EP, PP, SP, TP, jP, CP, IP, RP, kP, AP, MP, xP, NP, UP, DP, LP, BP,
        FP, jr = {}, WP = r && r.__read || function (e, t) {
            var r = "function" == typeof Symbol && e[Symbol.iterator];
            if (!r) return e;
            var n, o, i = r.call(e), u = [];
            try {
                for (; (void 0 === t || 0 < t--) && !(n = i.next()).done;) u.push(n.value)
            } catch (e) {
                o = {error: e}
            } finally {
                try {
                    n && !n.done && (r = i.return) && r.call(i)
                } finally {
                    if (o) throw o.error
                }
            }
            return u
        }, zP = r && r.__spreadArray || function (e, t) {
            for (var r = 0, n = t.length, o = e.length; r < n; r++, o++) e[o] = t[r];
            return e
        }, qP = (Object.defineProperty(jr, "__esModule", {value: !0}), jr.race = void 0, Cf), VP = __;
    jr.race = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        return VP.raceWith.apply(void 0, zP([], WP(qP.argsOrArgArray(e))))
    }, n = s, Object.defineProperty(n, "__esModule", {value: !0}), n.mergeAll = n.merge = n.max = n.materialize = n.mapTo = n.map = n.last = n.isEmpty = n.ignoreElements = n.groupBy = n.first = n.findIndex = n.find = n.finalize = n.filter = n.expand = n.exhaustMap = n.exhaustAll = n.exhaust = n.every = n.endWith = n.elementAt = n.distinctUntilKeyChanged = n.distinctUntilChanged = n.distinct = n.dematerialize = n.delayWhen = n.delay = n.defaultIfEmpty = n.debounceTime = n.debounce = n.count = n.connect = n.concatWith = n.concatMapTo = n.concatMap = n.concatAll = n.concat = n.combineLatestWith = n.combineLatest = n.combineLatestAll = n.combineAll = n.catchError = n.bufferWhen = n.bufferToggle = n.bufferTime = n.bufferCount = n.buffer = n.auditTime = n.audit = void 0, n.timeInterval = n.throwIfEmpty = n.throttleTime = n.throttle = n.tap = n.takeWhile = n.takeUntil = n.takeLast = n.take = n.switchScan = n.switchMapTo = n.switchMap = n.switchAll = n.subscribeOn = n.startWith = n.skipWhile = n.skipUntil = n.skipLast = n.skip = n.single = n.shareReplay = n.share = n.sequenceEqual = n.scan = n.sampleTime = n.sample = n.refCount = n.retryWhen = n.retry = n.repeatWhen = n.repeat = n.reduce = n.raceWith = n.race = n.publishReplay = n.publishLast = n.publishBehavior = n.publish = n.pluck = n.partition = n.pairwise = n.onErrorResumeNext = n.observeOn = n.multicast = n.min = n.mergeWith = n.mergeScan = n.mergeMapTo = n.mergeMap = n.flatMap = void 0, n.zipWith = n.zipAll = n.zip = n.withLatestFrom = n.windowWhen = n.windowToggle = n.windowTime = n.windowCount = n.window = n.toArray = n.timestamp = n.timeoutWith = n.timeout = void 0, Uw = hp, Object.defineProperty(n, "audit", {
        enumerable: !0,
        get: function () {
            return Uw.audit
        }
    }), Dw = vp, Object.defineProperty(n, "auditTime", {
        enumerable: !0, get: function () {
            return Dw.auditTime
        }
    }), Lw = wp, Object.defineProperty(n, "buffer", {
        enumerable: !0, get: function () {
            return Lw.buffer
        }
    }), Bw = jp, Object.defineProperty(n, "bufferCount", {
        enumerable: !0, get: function () {
            return Bw.bufferCount
        }
    }), Fw = Ap, Object.defineProperty(n, "bufferTime", {
        enumerable: !0, get: function () {
            return Fw.bufferTime
        }
    }), Ww = Wp, Object.defineProperty(n, "bufferToggle", {
        enumerable: !0, get: function () {
            return Ww.bufferToggle
        }
    }), zw = Zp, Object.defineProperty(n, "bufferWhen", {
        enumerable: !0, get: function () {
            return zw.bufferWhen
        }
    }), qw = ed, Object.defineProperty(n, "catchError", {
        enumerable: !0, get: function () {
            return qw.catchError
        }
    }), Vw = od, Object.defineProperty(n, "combineAll", {
        enumerable: !0, get: function () {
            return Vw.combineAll
        }
    }), Hw = id, Object.defineProperty(n, "combineLatestAll", {
        enumerable: !0, get: function () {
            return Hw.combineLatestAll
        }
    }), Yw = Ed, Object.defineProperty(n, "combineLatest", {
        enumerable: !0, get: function () {
            return Yw.combineLatest
        }
    }), Kw = wd, Object.defineProperty(n, "combineLatestWith", {
        enumerable: !0, get: function () {
            return Kw.combineLatestWith
        }
    }), Gw = zd, Object.defineProperty(n, "concat", {
        enumerable: !0, get: function () {
            return Gw.concat
        }
    }), Zw = fl, Object.defineProperty(n, "concatAll", {
        enumerable: !0, get: function () {
            return Zw.concatAll
        }
    }), Qw = Cc, Object.defineProperty(n, "concatMap", {
        enumerable: !0, get: function () {
            return Qw.concatMap
        }
    }), Xw = Ld, Object.defineProperty(n, "concatMapTo", {
        enumerable: !0, get: function () {
            return Xw.concatMapTo
        }
    }), Jw = Wd, Object.defineProperty(n, "concatWith", {
        enumerable: !0, get: function () {
            return Jw.concatWith
        }
    }), $w = Jd, Object.defineProperty(n, "connect", {
        enumerable: !0, get: function () {
            return $w.connect
        }
    }), eE = $d, Object.defineProperty(n, "count", {
        enumerable: !0, get: function () {
            return eE.count
        }
    }), tE = ah, Object.defineProperty(n, "debounce", {
        enumerable: !0, get: function () {
            return tE.debounce
        }
    }), rE = R, Object.defineProperty(n, "debounceTime", {
        enumerable: !0, get: function () {
            return rE.debounceTime
        }
    }), nE = bh, Object.defineProperty(n, "defaultIfEmpty", {
        enumerable: !0, get: function () {
            return nE.defaultIfEmpty
        }
    }), oE = vh, Object.defineProperty(n, "delay", {
        enumerable: !0, get: function () {
            return oE.delay
        }
    }), iE = mh, Object.defineProperty(n, "delayWhen", {
        enumerable: !0, get: function () {
            return iE.delayWhen
        }
    }), uE = Bh, Object.defineProperty(n, "dematerialize", {
        enumerable: !0, get: function () {
            return uE.dematerialize
        }
    }), aE = qh, Object.defineProperty(n, "distinct", {
        enumerable: !0, get: function () {
            return aE.distinct
        }
    }), sE = Gh, Object.defineProperty(n, "distinctUntilChanged", {
        enumerable: !0, get: function () {
            return sE.distinctUntilChanged
        }
    }), cE = $h, Object.defineProperty(n, "distinctUntilKeyChanged", {
        enumerable: !0, get: function () {
            return cE.distinctUntilKeyChanged
        }
    }), lE = tb, Object.defineProperty(n, "elementAt", {
        enumerable: !0, get: function () {
            return lE.elementAt
        }
    }), fE = pb, Object.defineProperty(n, "endWith", {
        enumerable: !0, get: function () {
            return fE.endWith
        }
    }), pE = _b, Object.defineProperty(n, "every", {
        enumerable: !0, get: function () {
            return pE.every
        }
    }), dE = gb, Object.defineProperty(n, "exhaust", {
        enumerable: !0, get: function () {
            return dE.exhaust
        }
    }), hE = Ob, Object.defineProperty(n, "exhaustAll", {
        enumerable: !0, get: function () {
            return hE.exhaustAll
        }
    }), bE = wb, Object.defineProperty(n, "exhaustMap", {
        enumerable: !0, get: function () {
            return bE.exhaustMap
        }
    }), yE = Ib, Object.defineProperty(n, "expand", {
        enumerable: !0, get: function () {
            return yE.expand
        }
    }), _E = Bf, Object.defineProperty(n, "filter", {
        enumerable: !0, get: function () {
            return _E.filter
        }
    }), vE = k, Object.defineProperty(n, "finalize", {
        enumerable: !0, get: function () {
            return vE.finalize
        }
    }), mE = Mb, Object.defineProperty(n, "find", {
        enumerable: !0, get: function () {
            return mE.find
        }
    }), gE = Db, Object.defineProperty(n, "findIndex", {
        enumerable: !0, get: function () {
            return gE.findIndex
        }
    }), OE = Fb, Object.defineProperty(n, "first", {
        enumerable: !0, get: function () {
            return OE.first
        }
    }), wE = Kb, Object.defineProperty(n, "groupBy", {
        enumerable: !0, get: function () {
            return wE.groupBy
        }
    }), EE = Ph, Object.defineProperty(n, "ignoreElements", {
        enumerable: !0, get: function () {
            return EE.ignoreElements
        }
    }), PE = $b, Object.defineProperty(n, "isEmpty", {
        enumerable: !0, get: function () {
            return PE.isEmpty
        }
    }), SE = ry, Object.defineProperty(n, "last", {
        enumerable: !0, get: function () {
            return SE.last
        }
    }), TE = Ic, Object.defineProperty(n, "map", {
        enumerable: !0, get: function () {
            return TE.map
        }
    }), jE = Ch, Object.defineProperty(n, "mapTo", {
        enumerable: !0, get: function () {
            return jE.mapTo
        }
    }), CE = hy, Object.defineProperty(n, "materialize", {
        enumerable: !0, get: function () {
            return CE.materialize
        }
    }), IE = vy,Object.defineProperty(n, "max", {
        enumerable: !0, get: function () {
            return IE.max
        }
    }),RE = Cy,Object.defineProperty(n, "merge", {
        enumerable: !0, get: function () {
            return RE.merge
        }
    }),kE = pl,Object.defineProperty(n, "mergeAll", {
        enumerable: !0, get: function () {
            return kE.mergeAll
        }
    }),AE = Oy,Object.defineProperty(n, "flatMap", {
        enumerable: !0, get: function () {
            return AE.flatMap
        }
    }),ME = dl,Object.defineProperty(n, "mergeMap", {
        enumerable: !0, get: function () {
            return ME.mergeMap
        }
    }),xE = wy,Object.defineProperty(n, "mergeMapTo", {
        enumerable: !0, get: function () {
            return xE.mergeMapTo
        }
    }),NE = Sy,Object.defineProperty(n, "mergeScan", {
        enumerable: !0, get: function () {
            return NE.mergeScan
        }
    }),UE = hl,Object.defineProperty(n, "mergeWith", {
        enumerable: !0, get: function () {
            return UE.mergeWith
        }
    }),DE = By,Object.defineProperty(n, "min", {
        enumerable: !0, get: function () {
            return DE.min
        }
    }),LE = zy,Object.defineProperty(n, "multicast", {
        enumerable: !0, get: function () {
            return LE.multicast
        }
    }),BE = v,Object.defineProperty(n, "observeOn", {
        enumerable: !0, get: function () {
            return BE.observeOn
        }
    }),FE = Yy,Object.defineProperty(n, "onErrorResumeNext", {
        enumerable: !0, get: function () {
            return FE.onErrorResumeNext
        }
    }),WE = Jy,Object.defineProperty(n, "pairwise", {
        enumerable: !0, get: function () {
            return WE.pairwise
        }
    }),zE = w,Object.defineProperty(n, "partition", {
        enumerable: !0, get: function () {
            return zE.partition
        }
    }),qE = t_,Object.defineProperty(n, "pluck", {
        enumerable: !0, get: function () {
            return qE.pluck
        }
    }),VE = n_,Object.defineProperty(n, "publish", {
        enumerable: !0, get: function () {
            return VE.publish
        }
    }),HE = a_,Object.defineProperty(n, "publishBehavior", {
        enumerable: !0, get: function () {
            return HE.publishBehavior
        }
    }),YE = l_,Object.defineProperty(n, "publishLast", {
        enumerable: !0, get: function () {
            return YE.publishLast
        }
    }),KE = d_,Object.defineProperty(n, "publishReplay", {
        enumerable: !0, get: function () {
            return KE.publishReplay
        }
    }),GE = jr,Object.defineProperty(n, "race", {
        enumerable: !0, get: function () {
            return GE.race
        }
    }),ZE = __,Object.defineProperty(n, "raceWith", {
        enumerable: !0, get: function () {
            return ZE.raceWith
        }
    }),QE = ad,Object.defineProperty(n, "reduce", {
        enumerable: !0, get: function () {
            return QE.reduce
        }
    }),XE = E_,Object.defineProperty(n, "repeat", {
        enumerable: !0, get: function () {
            return XE.repeat
        }
    }),JE = I_,Object.defineProperty(n, "repeatWhen", {
        enumerable: !0, get: function () {
            return JE.repeatWhen
        }
    }),$E = x_,Object.defineProperty(n, "retry", {
        enumerable: !0, get: function () {
            return $E.retry
        }
    }),eP = F_,Object.defineProperty(n, "retryWhen", {
        enumerable: !0, get: function () {
            return eP.retryWhen
        }
    }),tP = E,Object.defineProperty(n, "refCount", {
        enumerable: !0, get: function () {
            return tP.refCount
        }
    }),rP = H_,Object.defineProperty(n, "sample", {
        enumerable: !0, get: function () {
            return rP.sample
        }
    }),nP = Q_,Object.defineProperty(n, "sampleTime", {
        enumerable: !0, get: function () {
            return nP.sampleTime
        }
    }),oP = ev,Object.defineProperty(n, "scan", {
        enumerable: !0, get: function () {
            return oP.scan
        }
    }),iP = sd,Object.defineProperty(n, "sequenceEqual", {
        enumerable: !0, get: function () {
            return iP.sequenceEqual
        }
    }),uP = av,Object.defineProperty(n, "share", {
        enumerable: !0, get: function () {
            return uP.share
        }
    }),aP = bv,Object.defineProperty(n, "shareReplay", {
        enumerable: !0, get: function () {
            return aP.shareReplay
        }
    }),sP = vv,Object.defineProperty(n, "single", {
        enumerable: !0, get: function () {
            return sP.single
        }
    }),cP = Pv,Object.defineProperty(n, "skip", {
        enumerable: !0, get: function () {
            return cP.skip
        }
    }),lP = Tv,Object.defineProperty(n, "skipLast", {
        enumerable: !0, get: function () {
            return lP.skipLast
        }
    }),fP = Rv,Object.defineProperty(n, "skipUntil", {
        enumerable: !0, get: function () {
            return fP.skipUntil
        }
    }),pP = Nv,Object.defineProperty(n, "skipWhile", {
        enumerable: !0, get: function () {
            return pP.skipWhile
        }
    }),dP = Lv,Object.defineProperty(n, "startWith", {
        enumerable: !0, get: function () {
            return dP.startWith
        }
    }),hP = Es,Object.defineProperty(n, "subscribeOn", {
        enumerable: !0, get: function () {
            return hP.subscribeOn
        }
    }),bP = zv,Object.defineProperty(n, "switchAll", {
        enumerable: !0, get: function () {
            return bP.switchAll
        }
    }),yP = qv,Object.defineProperty(n, "switchMap", {
        enumerable: !0, get: function () {
            return yP.switchMap
        }
    }),_P = Zv,Object.defineProperty(n, "switchMapTo", {
        enumerable: !0, get: function () {
            return _P.switchMapTo
        }
    }),vP = Jv,Object.defineProperty(n, "switchScan", {
        enumerable: !0, get: function () {
            return vP.switchScan
        }
    }),mP = gh,Object.defineProperty(n, "take", {
        enumerable: !0, get: function () {
            return mP.take
        }
    }),gP = ny,Object.defineProperty(n, "takeLast", {
        enumerable: !0, get: function () {
            return gP.takeLast
        }
    }),OP = tm,Object.defineProperty(n, "takeUntil", {
        enumerable: !0, get: function () {
            return OP.takeUntil
        }
    }),wP = um,Object.defineProperty(n, "takeWhile", {
        enumerable: !0, get: function () {
            return wP.takeWhile
        }
    }),EP = cm,Object.defineProperty(n, "tap", {
        enumerable: !0, get: function () {
            return EP.tap
        }
    }),PP = g,Object.defineProperty(n, "throttle", {
        enumerable: !0, get: function () {
            return PP.throttle
        }
    }),SP = vm,Object.defineProperty(n, "throttleTime", {
        enumerable: !0, get: function () {
            return SP.throttleTime
        }
    }),TP = rb,Object.defineProperty(n, "throwIfEmpty", {
        enumerable: !0, get: function () {
            return TP.throwIfEmpty
        }
    }),jP = wm,Object.defineProperty(n, "timeInterval", {
        enumerable: !0, get: function () {
            return jP.timeInterval
        }
    }),CP = Ka,Object.defineProperty(n, "timeout", {
        enumerable: !0, get: function () {
            return CP.timeout
        }
    }),IP = jm,Object.defineProperty(n, "timeoutWith", {
        enumerable: !0, get: function () {
            return IP.timeoutWith
        }
    }),RP = As,Object.defineProperty(n, "timestamp", {
        enumerable: !0, get: function () {
            return RP.timestamp
        }
    }),kP = ud,Object.defineProperty(n, "toArray", {
        enumerable: !0, get: function () {
            return kP.toArray
        }
    }),AP = h,Object.defineProperty(n, "window", {
        enumerable: !0, get: function () {
            return AP.window
        }
    }),MP = Lm,Object.defineProperty(n, "windowCount", {
        enumerable: !0, get: function () {
            return MP.windowCount
        }
    }),xP = qm,Object.defineProperty(n, "windowTime", {
        enumerable: !0, get: function () {
            return xP.windowTime
        }
    }),NP = ms,Object.defineProperty(n, "windowToggle", {
        enumerable: !0, get: function () {
            return NP.windowToggle
        }
    }),UP = y,Object.defineProperty(n, "windowWhen", {
        enumerable: !0, get: function () {
            return UP.windowWhen
        }
    }),DP = l0,Object.defineProperty(n, "withLatestFrom", {
        enumerable: !0, get: function () {
            return DP.withLatestFrom
        }
    }),LP = T,Object.defineProperty(n, "zip", {
        enumerable: !0, get: function () {
            return LP.zip
        }
    }),BP = O,Object.defineProperty(n, "zipAll", {
        enumerable: !0, get: function () {
            return BP.zipAll
        }
    }),FP = C,Object.defineProperty(n, "zipWith", {
        enumerable: !0, get: function () {
            return FP.zipWith
        }
    });
    var u = {}, HP = r && r.__awaiter || function (e, u, a, s) {
        return new (a = a || Promise)(function (r, t) {
            function n(e) {
                try {
                    i(s.next(e))
                } catch (e) {
                    t(e)
                }
            }

            function o(e) {
                try {
                    i(s.throw(e))
                } catch (e) {
                    t(e)
                }
            }

            function i(e) {
                var t;
                e.done ? r(e.value) : ((t = e.value) instanceof a ? t : new a(function (e) {
                    e(t)
                })).then(n, o)
            }

            i((s = s.apply(e, u || [])).next())
        })
    }, YP = r && r.__generator || function (n, o) {
        var i, u, a, s = {
            label: 0, sent: function () {
                if (1 & a[0]) throw a[1];
                return a[1]
            }, trys: [], ops: []
        }, c = {next: e(0), throw: e(1), return: e(2)};
        return "function" == typeof Symbol && (c[Symbol.iterator] = function () {
            return this
        }), c;

        function e(r) {
            return function (e) {
                var t = [r, e];
                if (i) throw new TypeError("Generator is already executing.");
                for (; s = c && t[c = 0] ? 0 : s;) try {
                    if (i = 1, u && (a = 2 & t[0] ? u.return : t[0] ? u.throw || ((a = u.return) && a.call(u), 0) : u.next) && !(a = a.call(u, t[1])).done) return a;
                    switch (u = 0, (t = a ? [2 & t[0], a.value] : t)[0]) {
                        case 0:
                        case 1:
                            a = t;
                            break;
                        case 4:
                            return s.label++, {value: t[1], done: !1};
                        case 5:
                            s.label++, u = t[1], t = [0];
                            continue;
                        case 7:
                            t = s.ops.pop(), s.trys.pop();
                            continue;
                        default:
                            if (!(a = 0 < (a = s.trys).length && a[a.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                s = 0;
                                continue
                            }
                            if (3 === t[0] && (!a || t[1] > a[0] && t[1] < a[3])) {
                                s.label = t[1];
                                break
                            }
                            if (6 === t[0] && s.label < a[1]) {
                                s.label = a[1], a = t;
                                break
                            }
                            if (a && s.label < a[2]) {
                                s.label = a[2], s.ops.push(t);
                                break
                            }
                            a[2] && s.ops.pop(), s.trys.pop();
                            continue
                    }
                    t = o.call(n, s)
                } catch (e) {
                    t = [6, e], u = 0
                } finally {
                    i = a = 0
                }
                if (5 & t[0]) throw t[1];
                return {value: t[0] ? t[1] : void 0, done: !0}
            }
        }
    }, KP = (Object.defineProperty(u, "__esModule", {value: !0}), e), GP = lr, ZP = s, QP = 0, XP = 1, JP = 2;

    function $P(e, t) {
        e = e.pipe((0, ZP.publishReplay)(1), (0, ZP.refCount)());
        this._result = e, this._keys = e.pipe((0, ZP.mergeMap)(function (e) {
            return (0, GP.from)(e.keys())
        }), (0, ZP.publishReplay)(1), (0, ZP.refCount)()), this._records = void 0, this._controls = new eS, this._summary = new GP.ReplaySubject, this._state = t || QP
    }

    $P.prototype.keys = function () {
        return this._keys
    }, $P.prototype.records = function () {
        var r = this, e = this._result.pipe((0, ZP.mergeMap)(function (t) {
            return new GP.Observable(function (e) {
                return r._startStreaming({result: t, recordsObserver: e})
            })
        }));
        return e.push = function () {
            return r._push()
        }, e
    }, $P.prototype.consume = function () {
        var r = this;
        return this._result.pipe((0, ZP.mergeMap)(function (t) {
            return new GP.Observable(function (e) {
                return r._startStreaming({result: t, summaryObserver: e})
            })
        }))
    }, $P.prototype.pause = function () {
        this._controls.pause()
    }, $P.prototype.resume = function () {
        return this._controls.resume()
    }, $P.prototype.push = function () {
        return this._controls.push()
    }, $P.prototype._startStreaming = function (e) {
        var e = void 0 === e ? {} : e, t = e.result, r = e.recordsObserver, r = void 0 === r ? null : r,
            e = e.summaryObserver, e = void 0 === e ? null : e, n = [];
        return e && n.push(this._summary.subscribe(e)), this._state < XP ? (this._state = XP, this._setupRecordsStream(t), r ? n.push(this._records.subscribe(r)) : t._cancel(), n.push({
            unsubscribe: function () {
                t._cancel && t._cancel()
            }
        })) : r && r.error((0, KP.newError)("Streaming has already started/consumed with a previous records or summary subscription.")), function () {
            n.forEach(function (e) {
                return e.unsubscribe()
            })
        }
    }, $P.prototype._toObservable = function () {
        var n = this;
        return new GP.Observable(function (r) {
            n._result.subscribe({
                complete: function () {
                    return r.complete()
                }, next: function (e) {
                    return r.next(new $P((t = e, new GP.Observable(function (e) {
                        e.next(t), e.complete()
                    }))), n._state);
                    var t
                }, error: function (e) {
                    return r.error(e)
                }
            })
        })
    }, $P.prototype._setupRecordsStream = function (n) {
        var t = this;
        return this._records || (this._records = function (o, i, u) {
            var e = this;
            void 0 === u && (u = new eS);
            var a = new GP.Subject, s = function (n) {
                return HP(e, void 0, void 0, function () {
                    var t, r;
                    return YP(this, function (e) {
                        switch (e.label) {
                            case 0:
                                return e.trys.push([0, 2, 3, 4]), u.pushing = !0, [4, n];
                            case 1:
                                return t = e.sent(), r = t.done, t = t.value, r ? (a.complete(), i.complete()) : (a.next(t), u.paused || s(o.next()).catch(function () {
                                })), [3, 4];
                            case 2:
                                return r = e.sent(), a.error(r), i.error(r), [3, 4];
                            case 3:
                                return u.pushing = !1, [7];
                            case 4:
                                return [2]
                        }
                    })
                })
            };

            function t(t) {
                return HP(this, void 0, void 0, function () {
                    return YP(this, function (e) {
                        switch (e.label) {
                            case 0:
                                return [4, s(o.next(t))];
                            case 1:
                                return e.sent(), [2]
                        }
                    })
                })
            }

            return (u.pusher = t)(), a
        }(n[Symbol.asyncIterator](), {
            complete: function () {
                return HP(t, void 0, void 0, function () {
                    var t, r;
                    return YP(this, function (e) {
                        switch (e.label) {
                            case 0:
                                return this._state = JP, r = (t = this._summary).next, [4, n.summary()];
                            case 1:
                                return r.apply(t, [e.sent()]), this._summary.complete(), [2]
                        }
                    })
                })
            }, error: function (e) {
                t._state = JP, t._summary.error(e)
            }
        }, this._controls), this._records)
    }, u.default = $P;
    tS.prototype.pause = function () {
        this._paused = !0
    }, Object.defineProperty(tS.prototype, "paused", {
        get: function () {
            return this._paused
        }, enumerable: !1, configurable: !0
    }), Object.defineProperty(tS.prototype, "pushing", {
        get: function () {
            return this._pushing
        }, set: function (e) {
            this._pushing = e
        }, enumerable: !1, configurable: !0
    }), tS.prototype.resume = function () {
        return HP(this, void 0, void 0, function () {
            var t;
            return YP(this, function (e) {
                switch (e.label) {
                    case 0:
                        return t = this._paused, this._paused = !1, !t || this._pushing ? [3, 2] : [4, this._push()];
                    case 1:
                        e.sent(), e.label = 2;
                    case 2:
                        return [2]
                }
            })
        })
    }, tS.prototype.push = function () {
        return HP(this, void 0, void 0, function () {
            return YP(this, function (e) {
                switch (e.label) {
                    case 0:
                        return this.pause(), [4, this._push()];
                    case 1:
                        return [2, e.sent()]
                }
            })
        })
    }, Object.defineProperty(tS.prototype, "pusher", {
        get: function () {
            return this._push
        }, set: function (e) {
            this._push = e
        }, enumerable: !1, configurable: !0
    });
    var eS = tS;

    function tS(e) {
        void 0 === e && (e = function () {
            return HP(t, void 0, void 0, function () {
                return YP(this, function (e) {
                    return [2]
                })
            })
        });
        var t = this;
        this._paused = !1, this._pushing = !1, this._push = e
    }

    var t = {}, b = r && r.__importDefault || function (e) {
        return e && e.__esModule ? e : {default: e}
    }, rS = (Object.defineProperty(t, "__esModule", {value: !0}), lr), nS = b(u);

    function oS(e) {
        this._txc = e
    }

    b(e), oS.prototype.run = function (e, r) {
        var n = this;
        return new nS.default(new rS.Observable(function (t) {
            try {
                t.next(n._txc.run(e, r)), t.complete()
            } catch (e) {
                t.error(e)
            }
            return function () {
            }
        }))
    }, oS.prototype.commit = function () {
        var e = this;
        return new rS.Observable(function (t) {
            e._txc.commit().then(function () {
                t.complete()
            }).catch(function (e) {
                return t.error(e)
            })
        })
    }, oS.prototype.rollback = function () {
        var e = this;
        return new rS.Observable(function (t) {
            e._txc.rollback().then(function () {
                t.complete()
            }).catch(function (e) {
                return t.error(e)
            })
        })
    }, oS.prototype.isOpen = function () {
        return this._txc.isOpen()
    }, oS.prototype.close = function () {
        var e = this;
        return new rS.Observable(function (t) {
            e._txc.close().then(function () {
                t.complete()
            }).catch(function (e) {
                return t.error(e)
            })
        })
    }, t.default = oS;
    var l = {}, yu = r && r.__importDefault || function (e) {
        return e && e.__esModule ? e : {default: e}
    };

    function iS(e) {
        e = e.run;
        this._run = e
    }

    Object.defineProperty(l, "__esModule", {value: !0}), yu(u), yu(t), iS.fromTransaction = function (e) {
        return new iS({run: e.run.bind(e)})
    }, iS.prototype.run = function (e, t) {
        return this._run(e, t)
    }, l.default = iS;
    var gu = {}, uS = (Object.defineProperty(gu, "__esModule", {value: !0}), e), aS = lr, sS = s,
        cS = (uS.internal.logger.Logger, uS.error.SERVICE_UNAVAILABLE);

    function lS(e) {
        var e = void 0 === e ? {} : e, t = e.maxRetryTimeout, r = e.initialDelay, r = void 0 === r ? 1e3 : r,
            n = e.delayMultiplier, n = void 0 === n ? 2 : n, o = e.delayJitter, o = void 0 === o ? .2 : o, e = e.logger,
            e = void 0 === e ? null : e;
        this._maxRetryTimeout = fS(void 0 === t ? 3e4 : t, 3e4), this._initialDelay = fS(r, 1e3), this._delayMultiplier = fS(n, 2), this._delayJitter = fS(o, .2), this._logger = e
    }

    function fS(e, t) {
        return e || 0 === e ? e : t
    }

    lS.prototype.retry = function (e) {
        var a = this;
        return e.pipe((0, sS.retryWhen)(function (e) {
            var n = [], o = Date.now(), i = 1, u = a._initialDelay;
            return e.pipe((0, sS.mergeMap)(function (e) {
                if (!(0, uS.isRetriableError)(e)) return (0, aS.throwError)(function () {
                    return e
                });
                var t;
                if (n.push(e), 2 <= i && Date.now() - o >= a._maxRetryTimeout) return (t = (0, uS.newError)("Failed after retried for ".concat(i, " times in ").concat(a._maxRetryTimeout, " ms. Make sure that your database is online and retry again."), cS)).seenErrors = n, (0, aS.throwError)(function () {
                    return t
                });
                var r = a._computeNextDelay(u);
                return u *= a._delayMultiplier, i++, a._logger && a._logger.warn("Transaction failed and will be retried in ".concat(r)), (0, aS.of)(1).pipe((0, sS.delay)(r))
            }))
        }))
    }, lS.prototype._computeNextDelay = function (e) {
        var t = e * this._delayJitter;
        return e - t + 2 * t * Math.random()
    }, gu.default = lS;
    var Yu = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        }, pS = (Object.defineProperty(kr, "__esModule", {value: !0}), lr), dS = s, hS = Yu(u), ra = e, bS = Yu(t),
        yS = Yu(l), _S = Yu(gu), ua = ra.internal.constants, vS = ua.ACCESS_MODE_READ, mS = ua.ACCESS_MODE_WRITE,
        gS = ra.internal.txConfig.TxConfig;

    function OS(e) {
        var e = void 0 === e ? {} : e, t = e.session, e = e.config;
        this._session = t, this._retryLogic = function (e) {
            e = e && e.maxTransactionRetryTime ? e.maxTransactionRetryTime : null;
            return new _S.default({maxRetryTimeout: e})
        }(e)
    }

    OS.prototype.run = function (e, r, n) {
        var o = this;
        return new hS.default(new pS.Observable(function (t) {
            try {
                t.next(o._session.run(e, r, n)), t.complete()
            } catch (e) {
                t.error(e)
            }
            return function () {
            }
        }))
    }, OS.prototype.beginTransaction = function (e) {
        return this._beginTransaction(this._session._mode, e)
    }, OS.prototype.readTransaction = function (e, t) {
        return this._runTransaction(vS, e, t)
    }, OS.prototype.writeTransaction = function (e, t) {
        return this._runTransaction(mS, e, t)
    }, OS.prototype.executeRead = function (e, t) {
        return this._executeInTransaction(vS, e, t)
    }, OS.prototype.executeWrite = function (e, t) {
        return this._executeInTransaction(mS, e, t)
    }, OS.prototype._executeInTransaction = function (e, t, r) {
        return this._runTransaction(e, t, r, function (e) {
            return new yS.default({run: e.run.bind(e)})
        })
    }, OS.prototype.close = function () {
        var e = this;
        return new pS.Observable(function (t) {
            e._session.close().then(function () {
                t.complete()
            }).catch(function (e) {
                return t.error(e)
            })
        })
    }, OS.prototype.lastBookmark = function () {
        return this.lastBookmarks()
    }, OS.prototype.lastBookmarks = function () {
        return this._session.lastBookmarks()
    }, OS.prototype._beginTransaction = function (e, t) {
        var r = this, n = gS.empty();
        return t && (n = new gS(t)), new pS.Observable(function (t) {
            try {
                r._session._beginTransaction(e, n).then(function (e) {
                    t.next(new bS.default(e)), t.complete()
                }).catch(function (e) {
                    return t.error(e)
                })
            } catch (e) {
                t.error(e)
            }
            return function () {
            }
        })
    }, OS.prototype._runTransaction = function (e, r, t, n) {
        void 0 === n && (n = function (e) {
            return e
        });
        var o = gS.empty();
        return t && (o = new gS(t)), this._retryLogic.retry(this._beginTransaction(e, o).pipe((0, dS.mergeMap)(function (t) {
            return (0, pS.defer)(function () {
                try {
                    return r(n(t))
                } catch (e) {
                    return (0, pS.throwError)(function () {
                        return e
                    })
                }
            }).pipe((0, dS.catchError)(function (e) {
                return t.rollback().pipe((0, dS.concatWith)((0, pS.throwError)(function () {
                    return e
                })))
            }), (0, dS.concatWith)(t.commit()))
        })))
    }, kr.default = OS;
    var wS, ES, Cu = r && r.__extends || (wS = function (e, t) {
            return (wS = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
            })(e, t)
        }, function (e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

            function r() {
                this.constructor = e
            }

            wS(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
        }), _ = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        }, Mr = (Object.defineProperty(F, "__esModule", {value: !0}), F.WRITE = F.READ = F.Driver = void 0, e), PS = _(kr),
        SS = Mr.internal.constants.FETCH_ALL, Ou = Mr.driver.READ, TS = Mr.driver.WRITE,
        st = (F.READ = Ou, F.WRITE = TS, Cu(jS, ES = Mr.Driver), jS.prototype.rxSession = function (e) {
            var e = void 0 === e ? {} : e, t = e.defaultAccessMode, r = e.bookmarks, n = e.database, o = e.fetchSize,
                i = e.impersonatedUser, e = e.bookmarkManager;
            return new PS.default({
                session: this._newSession({
                    defaultAccessMode: void 0 === t ? TS : t,
                    bookmarkOrBookmarks: r,
                    database: void 0 === n ? "" : n,
                    impersonatedUser: i,
                    reactive: !1,
                    fetchSize: function (e, t) {
                        e = parseInt(e, 10);
                        {
                            if (0 < e || e === SS) return e;
                            if (0 === e || e < 0) throw new Error("The fetch size can only be a positive value or ".concat(SS, " for ALL. However fetchSize = ").concat(e));
                            return t
                        }
                    }(o, this._config.fetchSize),
                    bookmarkManager: e
                }), config: this._config
            })
        }, jS);

    function jS() {
        return null !== ES && ES.apply(this, arguments) || this
    }

    F.Driver = st, F.default = st;
    i = {}, Object.defineProperty(i, "__esModule", {value: !0}), i.default = "5.6.0", P = {}, qa = {}, Ua = {};

    function CS() {
    }

    Object.defineProperty(Ua, "__esModule", {value: !0}), CS.prototype.selectReader = function (e) {
        throw new Error("Abstract function")
    }, CS.prototype.selectWriter = function (e) {
        throw new Error("Abstract function")
    }, Ua.default = CS;
    Ba = {}, Wa = {};

    function IS(e) {
        this._offset = e || 0
    }

    Object.defineProperty(Wa, "__esModule", {value: !0}), IS.prototype.next = function (e) {
        if (0 === e) return -1;
        var t = this._offset;
        return this._offset += 1, this._offset === Number.MAX_SAFE_INTEGER && (this._offset = 0), t % e
    }, Wa.default = IS;
    var RS, kS, xa = r && r.__extends || (RS = function (e, t) {
            return (RS = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
            })(e, t)
        }, function (e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

            function r() {
                this.constructor = e
            }

            RS(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
        }), Ws = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        }, AS = (Object.defineProperty(Ba, "__esModule", {value: !0}), Ws(Wa)), p = Ws(Ua),
        Cs = (kS = p.default, xa(MS, kS), MS.prototype.selectReader = function (e) {
            return this._select(e, this._readersIndex)
        }, MS.prototype.selectWriter = function (e) {
            return this._select(e, this._writersIndex)
        }, MS.prototype._select = function (e, t) {
            var r = e.length;
            if (0 === r) return null;
            var n = t.next(r), o = n, i = null, u = Number.MAX_SAFE_INTEGER;
            do {
                var a = e[o], s = this._connectionPool.activeResourceCount(a)
            } while (s < u && (i = a, u = s), o === r - 1 ? o = 0 : o++, o !== n);
            return i
        }, MS);

    function MS(e) {
        var t = kS.call(this) || this;
        return t._readersIndex = new AS.default, t._writersIndex = new AS.default, t._connectionPool = e, t
    }

    Ba.default = Cs;
    m = r && r.__importDefault || function (e) {
        return e && e.__esModule ? e : {default: e}
    }, Object.defineProperty(qa, "__esModule", {value: !0}), qa.LeastConnectedLoadBalancingStrategy = qa.LoadBalancingStrategy = void 0, za = m(Ua), qa.LoadBalancingStrategy = za.default, Hc = m(Ba), qa.LeastConnectedLoadBalancingStrategy = Hc.default, qa.default = Hc.default, a = {}, ll = {}, Il = {}, Rl = {}, Dl = {}, Ra = {}, Kc = {}, Jc = {
        byteLength: function (e) {
            var e = FS(e), t = e[0], e = e[1];
            return 3 * (t + e) / 4 - e
        }
    };
    Jc.toByteArray = function (e) {
        var t, r, n = FS(e), o = n[0], n = n[1], i = new US(function (e, t) {
            return 3 * (e + t) / 4 - t
        }(o, n)), u = 0, a = 0 < n ? o - 4 : o;
        for (r = 0; r < a; r += 4) t = NS[e.charCodeAt(r)] << 18 | NS[e.charCodeAt(r + 1)] << 12 | NS[e.charCodeAt(r + 2)] << 6 | NS[e.charCodeAt(r + 3)], i[u++] = t >> 16 & 255, i[u++] = t >> 8 & 255, i[u++] = 255 & t;
        2 === n && (t = NS[e.charCodeAt(r)] << 2 | NS[e.charCodeAt(r + 1)] >> 4, i[u++] = 255 & t);
        1 === n && (t = NS[e.charCodeAt(r)] << 10 | NS[e.charCodeAt(r + 1)] << 4 | NS[e.charCodeAt(r + 2)] >> 2, i[u++] = t >> 8 & 255, i[u++] = 255 & t);
        return i
    }, Jc.fromByteArray = function (e) {
        for (var t, r = e.length, n = r % 3, o = [], i = 0, u = r - n; i < u; i += 16383) o.push(function (e, t, r) {
            for (var n, o = [], i = t; i < r; i += 3) n = (e[i] << 16 & 16711680) + (e[i + 1] << 8 & 65280) + (255 & e[i + 2]), o.push(function (e) {
                return xS[e >> 18 & 63] + xS[e >> 12 & 63] + xS[e >> 6 & 63] + xS[63 & e]
            }(n));
            return o.join("")
        }(e, i, u < i + 16383 ? u : i + 16383));
        1 == n ? (t = e[r - 1], o.push(xS[t >> 2] + xS[t << 4 & 63] + "==")) : 2 == n && (t = (e[r - 2] << 8) + e[r - 1], o.push(xS[t >> 10] + xS[t >> 4 & 63] + xS[t << 2 & 63] + "="));
        return o.join("")
    };
    for (var xS = [], NS = [], US = "undefined" != typeof Uint8Array ? Uint8Array : Array, DS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", LS = 0, BS = DS.length; LS < BS; ++LS) xS[LS] = DS[LS], NS[DS.charCodeAt(LS)] = LS;

    function FS(e) {
        var t = e.length;
        if (0 < t % 4) throw new Error("Invalid string. Length must be a multiple of 4");
        e = e.indexOf("="), t = (e = -1 === e ? t : e) === t ? 0 : 4 - e % 4;
        return [e, t]
    }

    NS["-".charCodeAt(0)] = 62, NS["_".charCodeAt(0)] = 63;
    Ma = {
        read: function (e, t, r, n, o) {
            var i, u, a = 8 * o - n - 1, s = (1 << a) - 1, c = s >> 1, l = -7, f = r ? o - 1 : 0, p = r ? -1 : 1,
                o = e[t + f];
            for (f += p, i = o & (1 << -l) - 1, o >>= -l, l += a; 0 < l; i = 256 * i + e[t + f], f += p, l -= 8) ;
            for (u = i & (1 << -l) - 1, i >>= -l, l += n; 0 < l; u = 256 * u + e[t + f], f += p, l -= 8) ;
            if (0 === i) i = 1 - c; else {
                if (i === s) return u ? NaN : 1 / 0 * (o ? -1 : 1);
                u += Math.pow(2, n), i -= c
            }
            return (o ? -1 : 1) * u * Math.pow(2, i - n)
        }, write: function (e, t, r, n, o, i) {
            var u, a, s = 8 * i - o - 1, c = (1 << s) - 1, l = c >> 1,
                f = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0, p = n ? 0 : i - 1, d = n ? 1 : -1,
                i = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
            for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (a = isNaN(t) ? 1 : 0, u = c) : (u = Math.floor(Math.log(t) / Math.LN2), t * (n = Math.pow(2, -u)) < 1 && (u--, n *= 2), 2 <= (t += 1 <= u + l ? f / n : f * Math.pow(2, 1 - l)) * n && (u++, n /= 2), c <= u + l ? (a = 0, u = c) : 1 <= u + l ? (a = (t * n - 1) * Math.pow(2, o), u += l) : (a = t * Math.pow(2, l - 1) * Math.pow(2, o), u = 0)); 8 <= o; e[r + p] = 255 & a, p += d, a /= 256, o -= 8) ;
            for (u = u << o | a, s += o; 0 < s; e[r + p] = 255 & u, p += d, u /= 256, s -= 8) ;
            e[r + p - d] |= 128 * i
        }
    };
    {
        var WS = Kc;
        const t2 = Jc, r2 = Ma,
            n2 = (xs = "function" == typeof Symbol && "function" == typeof Symbol.for ? Symbol.for("nodejs.util.inspect.custom") : null, WS.Buffer = A, WS.SlowBuffer = function (e) {
                +e != e && (e = 0);
                return A.alloc(+e)
            }, WS.INSPECT_MAX_BYTES = 50, 2147483647);

        function zS(e) {
            if (e > n2) throw new RangeError('The value "' + e + '" is invalid for option "size"');
            e = new Uint8Array(e);
            return Object.setPrototypeOf(e, A.prototype), e
        }

        function A(e, t, r) {
            if ("number" != typeof e) return qS(e, t, r);
            if ("string" == typeof t) throw new TypeError('The "string" argument must be of type string. Received type number');
            return HS(e)
        }

        function qS(t, r, e) {
            if ("string" == typeof t) {
                var n = t;
                var o = r;
                "string" == typeof o && "" !== o || (o = "utf8");
                if (!A.isEncoding(o)) throw new TypeError("Unknown encoding: " + o);
                var i = 0 | ZS(n, o);
                let e = zS(i);
                n = e.write(n, o);
                n !== i && (e = e.slice(0, n));
                return e
            }
            if (ArrayBuffer.isView(t)) return v1(o = t, Uint8Array) ? KS((i = new Uint8Array(o)).buffer, i.byteOffset, i.byteLength) : YS(o);
            if (null == t) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t);
            if (v1(t, ArrayBuffer) || t && v1(t.buffer, ArrayBuffer)) return KS(t, r, e);
            if ("undefined" != typeof SharedArrayBuffer && (v1(t, SharedArrayBuffer) || t && v1(t.buffer, SharedArrayBuffer))) return KS(t, r, e);
            if ("number" == typeof t) throw new TypeError('The "value" argument must not be of type number. Received type number');
            n = t.valueOf && t.valueOf();
            if (null != n && n !== t) return A.from(n, r, e);
            var u = function (e) {
                {
                    var t, r;
                    if (A.isBuffer(e)) return t = 0 | GS(e.length), 0 === (r = zS(t)).length || e.copy(r, 0, 0, t), r
                }
                if (void 0 !== e.length) return "number" != typeof e.length || m1(e.length) ? zS(0) : YS(e);
                if ("Buffer" === e.type && Array.isArray(e.data)) return YS(e.data)
            }(t);
            if (u) return u;
            if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof t[Symbol.toPrimitive]) return A.from(t[Symbol.toPrimitive]("string"), r, e);
            throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t)
        }

        function VS(e) {
            if ("number" != typeof e) throw new TypeError('"size" argument must be of type number');
            if (e < 0) throw new RangeError('The value "' + e + '" is invalid for option "size"')
        }

        function HS(e) {
            return VS(e), zS(e < 0 ? 0 : 0 | GS(e))
        }

        function YS(t) {
            var r = t.length < 0 ? 0 : 0 | GS(t.length);
            const n = zS(r);
            for (let e = 0; e < r; e += 1) n[e] = 255 & t[e];
            return n
        }

        function KS(e, t, r) {
            if (t < 0 || e.byteLength < t) throw new RangeError('"offset" is outside of buffer bounds');
            if (e.byteLength < t + (r || 0)) throw new RangeError('"length" is outside of buffer bounds');
            let n;
            return n = void 0 === t && void 0 === r ? new Uint8Array(e) : void 0 === r ? new Uint8Array(e, t) : new Uint8Array(e, t, r), Object.setPrototypeOf(n, A.prototype), n
        }

        function GS(e) {
            if (e >= n2) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + n2.toString(16) + " bytes");
            return 0 | e
        }

        function ZS(e, t) {
            if (A.isBuffer(e)) return e.length;
            if (ArrayBuffer.isView(e) || v1(e, ArrayBuffer)) return e.byteLength;
            if ("string" != typeof e) throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof e);
            var r = e.length, n = 2 < arguments.length && !0 === arguments[2];
            if (!n && 0 === r) return 0;
            let o = !1;
            for (; ;) switch (t) {
                case"ascii":
                case"latin1":
                case"binary":
                    return r;
                case"utf8":
                case"utf-8":
                    return b1(e).length;
                case"ucs2":
                case"ucs-2":
                case"utf16le":
                case"utf-16le":
                    return 2 * r;
                case"hex":
                    return r >>> 1;
                case"base64":
                    return y1(e).length;
                default:
                    if (o) return n ? -1 : b1(e).length;
                    t = ("" + t).toLowerCase(), o = !0
            }
        }

        function QS(e, r, n) {
            let t = !1;
            if ((r = void 0 === r || r < 0 ? 0 : r) > this.length) return "";
            if ((n = void 0 === n || n > this.length ? this.length : n) <= 0) return "";
            if ((n >>>= 0) <= (r >>>= 0)) return "";
            for (e = e || "utf8"; ;) switch (e) {
                case"hex": {
                    var o = this;
                    var i = r;
                    var u = n;
                    var a = o.length;
                    (!i || i < 0) && (i = 0);
                    (!u || u < 0 || a < u) && (u = a);
                    let t = "";
                    for (let e = i; e < u; ++e) t += a2[o[e]];
                    return t;
                    return
                }
                case"utf8":
                case"utf-8":
                    return r1(this, r, n);
                case"ascii": {
                    var s = this;
                    a = r;
                    var c = n;
                    let t = "";
                    c = Math.min(s.length, c);
                    for (let e = a; e < c; ++e) t += String.fromCharCode(127 & s[e]);
                    return t;
                    return
                }
                case"latin1":
                case"binary": {
                    var l = this;
                    i = r;
                    var f = n;
                    let t = "";
                    f = Math.min(l.length, f);
                    for (let e = i; e < f; ++e) t += String.fromCharCode(l[e]);
                    return t;
                    return
                }
                case"base64":
                    return d = this, b = n, 0 === (h = r) && b === d.length ? t2.fromByteArray(d) : t2.fromByteArray(d.slice(h, b));
                case"ucs2":
                case"ucs-2":
                case"utf16le":
                case"utf-16le": {
                    d = this;
                    h = r;
                    b = n;
                    var p = d.slice(h, b);
                    let t = "";
                    for (let e = 0; e < p.length - 1; e += 2) t += String.fromCharCode(p[e] + 256 * p[e + 1]);
                    return t;
                    return
                }
                default:
                    if (t) throw new TypeError("Unknown encoding: " + e);
                    e = (e + "").toLowerCase(), t = !0
            }
            var d, h, b
        }

        function XS(e, t, r) {
            var n = e[t];
            e[t] = e[r], e[r] = n
        }

        function JS(e, t, r, n, o) {
            if (0 === e.length) return -1;
            if ("string" == typeof r ? (n = r, r = 0) : 2147483647 < r ? r = 2147483647 : r < -2147483648 && (r = -2147483648), (r = (r = m1(r = +r) ? o ? 0 : e.length - 1 : r) < 0 ? e.length + r : r) >= e.length) {
                if (o) return -1;
                r = e.length - 1
            } else if (r < 0) {
                if (!o) return -1;
                r = 0
            }
            if ("string" == typeof t && (t = A.from(t, n)), A.isBuffer(t)) return 0 === t.length ? -1 : $S(e, t, r, n, o);
            if ("number" == typeof t) return t &= 255, "function" == typeof Uint8Array.prototype.indexOf ? (o ? Uint8Array.prototype.indexOf : Uint8Array.prototype.lastIndexOf).call(e, t, r) : $S(e, [t], r, n, o);
            throw new TypeError("val must be string, number or Buffer")
        }

        function $S(r, n, t, e, o) {
            let i = 1, u = r.length, a = n.length;
            if (void 0 !== e && ("ucs2" === (e = String(e).toLowerCase()) || "ucs-2" === e || "utf16le" === e || "utf-16le" === e)) {
                if (r.length < 2 || n.length < 2) return -1;
                i = 2, u /= 2, a /= 2, t /= 2
            }

            function s(e, t) {
                return 1 === i ? e[t] : e.readUInt16BE(t * i)
            }

            let c;
            if (o) {
                let e = -1;
                for (c = t; c < u; c++) if (s(r, c) === s(n, -1 === e ? 0 : c - e)) {
                    if (-1 === e && (e = c), c - e + 1 === a) return e * i
                } else -1 !== e && (c -= c - e), e = -1
            } else for (t + a > u && (t = u - a), c = t; 0 <= c; c--) {
                let t = !0;
                for (let e = 0; e < a; e++) if (s(r, c + e) !== s(n, e)) {
                    t = !1;
                    break
                }
                if (t) return c
            }
            return -1
        }

        function e1(e, t, r, n) {
            return _1(function (t) {
                const r = [];
                for (let e = 0; e < t.length; ++e) r.push(255 & t.charCodeAt(e));
                return r
            }(t), e, r, n)
        }

        function t1(e, t, r, n) {
            return _1(function (t, r) {
                var n, o;
                const i = [];
                for (let e = 0; e < t.length && !((r -= 2) < 0); ++e) o = t.charCodeAt(e), n = o >> 8, o = o % 256, i.push(o), i.push(n);
                return i
            }(t, e.length - r), e, r, n)
        }

        function r1(u, e, t) {
            t = Math.min(u.length, t);
            const r = [];
            let a = e;
            for (; a < t;) {
                var s = u[a];
                let o = null, i = 239 < s ? 4 : 223 < s ? 3 : 191 < s ? 2 : 1;
                if (a + i <= t) {
                    let e, t, r, n;
                    switch (i) {
                        case 1:
                            s < 128 && (o = s);
                            break;
                        case 2:
                            128 == (192 & (e = u[a + 1])) && 127 < (n = (31 & s) << 6 | 63 & e) && (o = n);
                            break;
                        case 3:
                            e = u[a + 1], t = u[a + 2], 128 == (192 & e) && 128 == (192 & t) && 2047 < (n = (15 & s) << 12 | (63 & e) << 6 | 63 & t) && (n < 55296 || 57343 < n) && (o = n);
                            break;
                        case 4:
                            e = u[a + 1], t = u[a + 2], r = u[a + 3], 128 == (192 & e) && 128 == (192 & t) && 128 == (192 & r) && 65535 < (n = (15 & s) << 18 | (63 & e) << 12 | (63 & t) << 6 | 63 & r) && n < 1114112 && (o = n)
                    }
                }
                null === o ? (o = 65533, i = 1) : 65535 < o && (o -= 65536, r.push(o >>> 10 & 1023 | 55296), o = 56320 | 1023 & o), r.push(o), a += i
            }
            {
                var n = r, o = n.length;
                if (o <= o2) return String.fromCharCode.apply(String, n);
                let e = "", t = 0;
                for (; t < o;) e += String.fromCharCode.apply(String, n.slice(t, t += o2));
                return e
            }
        }

        WS.kMaxLength = n2, (A.TYPED_ARRAY_SUPPORT = function () {
            try {
                const t = new Uint8Array(1);
                var e = {
                    foo: function () {
                        return 42
                    }
                };
                return Object.setPrototypeOf(e, Uint8Array.prototype), Object.setPrototypeOf(t, e), 42 === t.foo()
            } catch (e) {
                return !1
            }
        }()) || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(A.prototype, "parent", {
            enumerable: !0,
            get: function () {
                if (A.isBuffer(this)) return this.buffer
            }
        }), Object.defineProperty(A.prototype, "offset", {
            enumerable: !0, get: function () {
                if (A.isBuffer(this)) return this.byteOffset
            }
        }), A.poolSize = 8192, A.from = qS, Object.setPrototypeOf(A.prototype, Uint8Array.prototype), Object.setPrototypeOf(A, Uint8Array), A.alloc = function (e, t, r) {
            return t = t, r = r, VS(e = e), !(e <= 0) && void 0 !== t ? "string" == typeof r ? zS(e).fill(t, r) : zS(e).fill(t) : zS(e)
        }, A.allocUnsafe = HS, A.allocUnsafeSlow = HS, A.isBuffer = function (e) {
            return null != e && !0 === e._isBuffer && e !== A.prototype
        }, A.compare = function (r, n) {
            if (v1(r, Uint8Array) && (r = A.from(r, r.offset, r.byteLength)), v1(n, Uint8Array) && (n = A.from(n, n.offset, n.byteLength)), !A.isBuffer(r) || !A.isBuffer(n)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
            if (r === n) return 0;
            let o = r.length, i = n.length;
            for (let e = 0, t = Math.min(o, i); e < t; ++e) if (r[e] !== n[e]) {
                o = r[e], i = n[e];
                break
            }
            return o < i ? -1 : i < o ? 1 : 0
        }, A.isEncoding = function (e) {
            switch (String(e).toLowerCase()) {
                case"hex":
                case"utf8":
                case"utf-8":
                case"ascii":
                case"latin1":
                case"binary":
                case"base64":
                case"ucs2":
                case"ucs-2":
                case"utf16le":
                case"utf-16le":
                    return !0;
                default:
                    return !1
            }
        }, A.concat = function (t, e) {
            if (!Array.isArray(t)) throw new TypeError('"list" argument must be an Array of Buffers');
            if (0 === t.length) return A.alloc(0);
            let r;
            if (void 0 === e) for (e = 0, r = 0; r < t.length; ++r) e += t[r].length;
            var n = A.allocUnsafe(e);
            let o = 0;
            for (r = 0; r < t.length; ++r) {
                let e = t[r];
                if (v1(e, Uint8Array)) o + e.length > n.length ? (e = A.isBuffer(e) ? e : A.from(e)).copy(n, o) : Uint8Array.prototype.set.call(n, e, o); else {
                    if (!A.isBuffer(e)) throw new TypeError('"list" argument must be an Array of Buffers');
                    e.copy(n, o)
                }
                o += e.length
            }
            return n
        }, A.byteLength = ZS, A.prototype._isBuffer = !0, A.prototype.swap16 = function () {
            var t = this.length;
            if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (let e = 0; e < t; e += 2) XS(this, e, e + 1);
            return this
        }, A.prototype.swap32 = function () {
            var t = this.length;
            if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (let e = 0; e < t; e += 4) XS(this, e, e + 3), XS(this, e + 1, e + 2);
            return this
        }, A.prototype.swap64 = function () {
            var t = this.length;
            if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (let e = 0; e < t; e += 8) XS(this, e, e + 7), XS(this, e + 1, e + 6), XS(this, e + 2, e + 5), XS(this, e + 3, e + 4);
            return this
        }, A.prototype.toLocaleString = A.prototype.toString = function () {
            var e = this.length;
            return 0 === e ? "" : 0 === arguments.length ? r1(this, 0, e) : QS.apply(this, arguments)
        }, A.prototype.equals = function (e) {
            if (A.isBuffer(e)) return this === e || 0 === A.compare(this, e);
            throw new TypeError("Argument must be a Buffer")
        }, A.prototype.inspect = function () {
            let e = "";
            var t = WS.INSPECT_MAX_BYTES;
            return e = this.toString("hex", 0, t).replace(/(.{2})/g, "$1 ").trim(), this.length > t && (e += " ... "), "<Buffer " + e + ">"
        }, xs && (A.prototype[xs] = A.prototype.inspect), A.prototype.compare = function (e, t, r, n, o) {
            if (v1(e, Uint8Array) && (e = A.from(e, e.offset, e.byteLength)), !A.isBuffer(e)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e);
            if (void 0 === r && (r = e ? e.length : 0), void 0 === n && (n = 0), void 0 === o && (o = this.length), (t = void 0 === t ? 0 : t) < 0 || r > e.length || n < 0 || o > this.length) throw new RangeError("out of range index");
            if (o <= n && r <= t) return 0;
            if (o <= n) return -1;
            if (r <= t) return 1;
            if (this === e) return 0;
            let i = (o >>>= 0) - (n >>>= 0), u = (r >>>= 0) - (t >>>= 0);
            var a = Math.min(i, u), s = this.slice(n, o), c = e.slice(t, r);
            for (let e = 0; e < a; ++e) if (s[e] !== c[e]) {
                i = s[e], u = c[e];
                break
            }
            return i < u ? -1 : u < i ? 1 : 0
        }, A.prototype.includes = function (e, t, r) {
            return -1 !== this.indexOf(e, t, r)
        }, A.prototype.indexOf = function (e, t, r) {
            return JS(this, e, t, r, !0)
        }, A.prototype.lastIndexOf = function (e, t, r) {
            return JS(this, e, t, r, !1)
        }, A.prototype.write = function (t, r, n, e) {
            if (void 0 === r) e = "utf8", n = this.length, r = 0; else if (void 0 === n && "string" == typeof r) e = r, n = this.length, r = 0; else {
                if (!isFinite(r)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                r >>>= 0, isFinite(n) ? (n >>>= 0, void 0 === e && (e = "utf8")) : (e = n, n = void 0)
            }
            var o, i, u, a = this.length - r;
            if ((void 0 === n || a < n) && (n = a), 0 < t.length && (n < 0 || r < 0) || r > this.length) throw new RangeError("Attempt to write outside buffer bounds");
            e = e || "utf8";
            let s = !1;
            for (; ;) switch (e) {
                case"hex": {
                    var c = this;
                    var l = t;
                    var f = r;
                    var p = n;
                    f = Number(f) || 0;
                    var d = c.length - f;
                    (!p || d < (p = Number(p))) && (p = d), (d = l.length) / 2 < p && (p = d / 2);
                    let e;
                    for (e = 0; e < p; ++e) {
                        var h = parseInt(l.substr(2 * e, 2), 16);
                        if (m1(h)) return e;
                        c[f + e] = h
                    }
                    return e;
                    return
                }
                case"utf8":
                case"utf-8":
                    return d = r, u = n, _1(b1(t, (i = this).length - d), i, d, u);
                case"ascii":
                case"latin1":
                case"binary":
                    return e1(this, t, r, n);
                case"base64":
                    return i = this, u = r, o = n, _1(y1(t), i, u, o);
                case"ucs2":
                case"ucs-2":
                case"utf16le":
                case"utf-16le":
                    return t1(this, t, r, n);
                default:
                    if (s) throw new TypeError("Unknown encoding: " + e);
                    e = ("" + e).toLowerCase(), s = !0
            }
        }, A.prototype.toJSON = function () {
            return {type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0)}
        };
        const o2 = 4096;

        function n1(e, t, r) {
            if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
            if (r < e + t) throw new RangeError("Trying to access beyond buffer length")
        }

        function o1(e, t, r, n, o, i) {
            if (!A.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
            if (o < t || t < i) throw new RangeError('"value" argument is out of bounds');
            if (r + n > e.length) throw new RangeError("Index out of range")
        }

        function i1(e, t, r, n, o) {
            p1(t, n, o, e, r, 7);
            n = Number(t & BigInt(4294967295)), e[r++] = n, e[r++] = n >>= 8, e[r++] = n >>= 8, e[r++] = n >>= 8, o = Number(t >> BigInt(32) & BigInt(4294967295));
            return e[r++] = o, e[r++] = o >>= 8, e[r++] = o >>= 8, e[r++] = o >>= 8, r
        }

        function u1(e, t, r, n, o) {
            p1(t, n, o, e, r, 7);
            n = Number(t & BigInt(4294967295)), e[r + 7] = n, e[r + 6] = n >>= 8, e[r + 5] = n >>= 8, e[r + 4] = n >>= 8, o = Number(t >> BigInt(32) & BigInt(4294967295));
            return e[r + 3] = o, e[r + 2] = o >>= 8, e[r + 1] = o >>= 8, e[r] = o >>= 8, r + 8
        }

        function a1(e, t, r, n) {
            if (r + n > e.length) throw new RangeError("Index out of range");
            if (r < 0) throw new RangeError("Index out of range")
        }

        function s1(e, t, r, n, o) {
            return t = +t, r >>>= 0, o || a1(e, 0, r, 4), r2.write(e, t, r, n, 23, 4), r + 4
        }

        function c1(e, t, r, n, o) {
            return t = +t, r >>>= 0, o || a1(e, 0, r, 8), r2.write(e, t, r, n, 52, 8), r + 8
        }

        A.prototype.slice = function (e, t) {
            var r = this.length,
                r = ((e = ~~e) < 0 ? (e += r) < 0 && (e = 0) : r < e && (e = r), (t = void 0 === t ? r : ~~t) < 0 ? (t += r) < 0 && (t = 0) : r < t && (t = r), t < e && (t = e), this.subarray(e, t));
            return Object.setPrototypeOf(r, A.prototype), r
        }, A.prototype.readUintLE = A.prototype.readUIntLE = function (e, t, r) {
            e >>>= 0, t >>>= 0, r || n1(e, t, this.length);
            let n = this[e], o = 1, i = 0;
            for (; ++i < t && (o *= 256);) n += this[e + i] * o;
            return n
        }, A.prototype.readUintBE = A.prototype.readUIntBE = function (e, t, r) {
            e >>>= 0, t >>>= 0, r || n1(e, t, this.length);
            let n = this[e + --t], o = 1;
            for (; 0 < t && (o *= 256);) n += this[e + --t] * o;
            return n
        }, A.prototype.readUint8 = A.prototype.readUInt8 = function (e, t) {
            return e >>>= 0, t || n1(e, 1, this.length), this[e]
        }, A.prototype.readUint16LE = A.prototype.readUInt16LE = function (e, t) {
            return e >>>= 0, t || n1(e, 2, this.length), this[e] | this[e + 1] << 8
        }, A.prototype.readUint16BE = A.prototype.readUInt16BE = function (e, t) {
            return e >>>= 0, t || n1(e, 2, this.length), this[e] << 8 | this[e + 1]
        }, A.prototype.readUint32LE = A.prototype.readUInt32LE = function (e, t) {
            return e >>>= 0, t || n1(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
        }, A.prototype.readUint32BE = A.prototype.readUInt32BE = function (e, t) {
            return e >>>= 0, t || n1(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
        }, A.prototype.readBigUInt64LE = g1(function (e) {
            d1(e >>>= 0, "offset");
            var t = this[e], r = this[e + 7],
                t = (void 0 !== t && void 0 !== r || h1(e, this.length - 8), t + 256 * this[++e] + 65536 * this[++e] + this[++e] * 2 ** 24),
                e = this[++e] + 256 * this[++e] + 65536 * this[++e] + r * 2 ** 24;
            return BigInt(t) + (BigInt(e) << BigInt(32))
        }), A.prototype.readBigUInt64BE = g1(function (e) {
            d1(e >>>= 0, "offset");
            var t = this[e], r = this[e + 7],
                t = (void 0 !== t && void 0 !== r || h1(e, this.length - 8), t * 2 ** 24 + 65536 * this[++e] + 256 * this[++e] + this[++e]),
                e = this[++e] * 2 ** 24 + 65536 * this[++e] + 256 * this[++e] + r;
            return (BigInt(t) << BigInt(32)) + BigInt(e)
        }), A.prototype.readIntLE = function (e, t, r) {
            e >>>= 0, t >>>= 0, r || n1(e, t, this.length);
            let n = this[e], o = 1, i = 0;
            for (; ++i < t && (o *= 256);) n += this[e + i] * o;
            return o *= 128, n >= o && (n -= Math.pow(2, 8 * t)), n
        }, A.prototype.readIntBE = function (e, t, r) {
            e >>>= 0, t >>>= 0, r || n1(e, t, this.length);
            let n = t, o = 1, i = this[e + --n];
            for (; 0 < n && (o *= 256);) i += this[e + --n] * o;
            return o *= 128, i >= o && (i -= Math.pow(2, 8 * t)), i
        }, A.prototype.readInt8 = function (e, t) {
            return e >>>= 0, t || n1(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
        }, A.prototype.readInt16LE = function (e, t) {
            e >>>= 0, t || n1(e, 2, this.length);
            t = this[e] | this[e + 1] << 8;
            return 32768 & t ? 4294901760 | t : t
        }, A.prototype.readInt16BE = function (e, t) {
            e >>>= 0, t || n1(e, 2, this.length);
            t = this[e + 1] | this[e] << 8;
            return 32768 & t ? 4294901760 | t : t
        }, A.prototype.readInt32LE = function (e, t) {
            return e >>>= 0, t || n1(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
        }, A.prototype.readInt32BE = function (e, t) {
            return e >>>= 0, t || n1(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
        }, A.prototype.readBigInt64LE = g1(function (e) {
            d1(e >>>= 0, "offset");
            var t = this[e], r = this[e + 7],
                r = (void 0 !== t && void 0 !== r || h1(e, this.length - 8), this[e + 4] + 256 * this[e + 5] + 65536 * this[e + 6] + (r << 24));
            return (BigInt(r) << BigInt(32)) + BigInt(t + 256 * this[++e] + 65536 * this[++e] + this[++e] * 2 ** 24)
        }), A.prototype.readBigInt64BE = g1(function (e) {
            d1(e >>>= 0, "offset");
            var t = this[e], r = this[e + 7],
                t = (void 0 !== t && void 0 !== r || h1(e, this.length - 8), (t << 24) + 65536 * this[++e] + 256 * this[++e] + this[++e]);
            return (BigInt(t) << BigInt(32)) + BigInt(this[++e] * 2 ** 24 + 65536 * this[++e] + 256 * this[++e] + r)
        }), A.prototype.readFloatLE = function (e, t) {
            return e >>>= 0, t || n1(e, 4, this.length), r2.read(this, e, !0, 23, 4)
        }, A.prototype.readFloatBE = function (e, t) {
            return e >>>= 0, t || n1(e, 4, this.length), r2.read(this, e, !1, 23, 4)
        }, A.prototype.readDoubleLE = function (e, t) {
            return e >>>= 0, t || n1(e, 8, this.length), r2.read(this, e, !0, 52, 8)
        }, A.prototype.readDoubleBE = function (e, t) {
            return e >>>= 0, t || n1(e, 8, this.length), r2.read(this, e, !1, 52, 8)
        }, A.prototype.writeUintLE = A.prototype.writeUIntLE = function (e, t, r, n) {
            e = +e, t >>>= 0, r >>>= 0, n || o1(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
            let o = 1, i = 0;
            for (this[t] = 255 & e; ++i < r && (o *= 256);) this[t + i] = e / o & 255;
            return t + r
        }, A.prototype.writeUintBE = A.prototype.writeUIntBE = function (e, t, r, n) {
            e = +e, t >>>= 0, r >>>= 0, n || o1(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
            let o = r - 1, i = 1;
            for (this[t + o] = 255 & e; 0 <= --o && (i *= 256);) this[t + o] = e / i & 255;
            return t + r
        }, A.prototype.writeUint8 = A.prototype.writeUInt8 = function (e, t, r) {
            return e = +e, t >>>= 0, r || o1(this, e, t, 1, 255, 0), this[t] = 255 & e, t + 1
        }, A.prototype.writeUint16LE = A.prototype.writeUInt16LE = function (e, t, r) {
            return e = +e, t >>>= 0, r || o1(this, e, t, 2, 65535, 0), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2
        }, A.prototype.writeUint16BE = A.prototype.writeUInt16BE = function (e, t, r) {
            return e = +e, t >>>= 0, r || o1(this, e, t, 2, 65535, 0), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2
        }, A.prototype.writeUint32LE = A.prototype.writeUInt32LE = function (e, t, r) {
            return e = +e, t >>>= 0, r || o1(this, e, t, 4, 4294967295, 0), this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e, t + 4
        }, A.prototype.writeUint32BE = A.prototype.writeUInt32BE = function (e, t, r) {
            return e = +e, t >>>= 0, r || o1(this, e, t, 4, 4294967295, 0), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4
        }, A.prototype.writeBigUInt64LE = g1(function (e, t = 0) {
            return i1(this, e, t, BigInt(0), BigInt("0xffffffffffffffff"))
        }), A.prototype.writeBigUInt64BE = g1(function (e, t = 0) {
            return u1(this, e, t, BigInt(0), BigInt("0xffffffffffffffff"))
        }), A.prototype.writeIntLE = function (e, t, r, n) {
            e = +e, t >>>= 0, n || o1(this, e, t, r, (n = Math.pow(2, 8 * r - 1)) - 1, -n);
            let o = 0, i = 1, u = 0;
            for (this[t] = 255 & e; ++o < r && (i *= 256);) e < 0 && 0 === u && 0 !== this[t + o - 1] && (u = 1), this[t + o] = (e / i >> 0) - u & 255;
            return t + r
        }, A.prototype.writeIntBE = function (e, t, r, n) {
            e = +e, t >>>= 0, n || o1(this, e, t, r, (n = Math.pow(2, 8 * r - 1)) - 1, -n);
            let o = r - 1, i = 1, u = 0;
            for (this[t + o] = 255 & e; 0 <= --o && (i *= 256);) e < 0 && 0 === u && 0 !== this[t + o + 1] && (u = 1), this[t + o] = (e / i >> 0) - u & 255;
            return t + r
        }, A.prototype.writeInt8 = function (e, t, r) {
            return e = +e, t >>>= 0, r || o1(this, e, t, 1, 127, -128), this[t] = 255 & (e = e < 0 ? 255 + e + 1 : e), t + 1
        }, A.prototype.writeInt16LE = function (e, t, r) {
            return e = +e, t >>>= 0, r || o1(this, e, t, 2, 32767, -32768), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2
        }, A.prototype.writeInt16BE = function (e, t, r) {
            return e = +e, t >>>= 0, r || o1(this, e, t, 2, 32767, -32768), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2
        }, A.prototype.writeInt32LE = function (e, t, r) {
            return e = +e, t >>>= 0, r || o1(this, e, t, 4, 2147483647, -2147483648), this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24, t + 4
        }, A.prototype.writeInt32BE = function (e, t, r) {
            return e = +e, t >>>= 0, r || o1(this, e, t, 4, 2147483647, -2147483648), this[t] = (e = e < 0 ? 4294967295 + e + 1 : e) >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4
        }, A.prototype.writeBigInt64LE = g1(function (e, t = 0) {
            return i1(this, e, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
        }), A.prototype.writeBigInt64BE = g1(function (e, t = 0) {
            return u1(this, e, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
        }), A.prototype.writeFloatLE = function (e, t, r) {
            return s1(this, e, t, !0, r)
        }, A.prototype.writeFloatBE = function (e, t, r) {
            return s1(this, e, t, !1, r)
        }, A.prototype.writeDoubleLE = function (e, t, r) {
            return c1(this, e, t, !0, r)
        }, A.prototype.writeDoubleBE = function (e, t, r) {
            return c1(this, e, t, !1, r)
        }, A.prototype.copy = function (e, t, r, n) {
            if (!A.isBuffer(e)) throw new TypeError("argument should be a Buffer");
            if (r = r || 0, n || 0 === n || (n = this.length), t >= e.length && (t = e.length), (n = 0 < n && n < r ? r : n) === r) return 0;
            if (0 === e.length || 0 === this.length) return 0;
            if ((t = t || 0) < 0) throw new RangeError("targetStart out of bounds");
            if (r < 0 || r >= this.length) throw new RangeError("Index out of range");
            if (n < 0) throw new RangeError("sourceEnd out of bounds");
            n > this.length && (n = this.length);
            var o = (n = e.length - t < n - r ? e.length - t + r : n) - r;
            return this === e && "function" == typeof Uint8Array.prototype.copyWithin ? this.copyWithin(t, r, n) : Uint8Array.prototype.set.call(e, this.subarray(r, n), t), o
        }, A.prototype.fill = function (e, t, r, n) {
            if ("string" == typeof e) {
                if ("string" == typeof t ? (n = t, t = 0, r = this.length) : "string" == typeof r && (n = r, r = this.length), void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");
                if ("string" == typeof n && !A.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);
                var o;
                1 === e.length && (o = e.charCodeAt(0), ("utf8" === n && o < 128 || "latin1" === n) && (e = o))
            } else "number" == typeof e ? e &= 255 : "boolean" == typeof e && (e = Number(e));
            if (t < 0 || this.length < t || this.length < r) throw new RangeError("Out of range index");
            if (r <= t) return this;
            t >>>= 0, r = void 0 === r ? this.length : r >>> 0;
            let i;
            if ("number" == typeof (e = e || 0)) for (i = t; i < r; ++i) this[i] = e; else {
                var u = A.isBuffer(e) ? e : A.from(e, n), a = u.length;
                if (0 === a) throw new TypeError('The value "' + e + '" is invalid for argument "value"');
                for (i = 0; i < r - t; ++i) this[i + t] = u[i % a]
            }
            return this
        };
        const i2 = {};

        function l1(e, t, r) {
            i2[e] = class extends r {
                constructor() {
                    super(), Object.defineProperty(this, "message", {
                        value: t.apply(this, arguments),
                        writable: !0,
                        configurable: !0
                    }), this.name = this.name + ` [${e}]`, this.stack, delete this.name
                }

                get code() {
                    return e
                }

                set code(e) {
                    Object.defineProperty(this, "code", {configurable: !0, enumerable: !0, value: e, writable: !0})
                }

                toString() {
                    return this.name + ` [${e}]: ` + this.message
                }
            }
        }

        function f1(e) {
            let t = "", r = e.length;
            for (var n = "-" === e[0] ? 1 : 0; r >= 4 + n; r -= 3) t = "_" + e.slice(r - 3, r) + t;
            return "" + e.slice(0, r) + t
        }

        function p1(t, r, n, e, o, i) {
            if (n < t || t < r) {
                var u = "bigint" == typeof r ? "n" : "";
                let e;
                throw e = 3 < i ? 0 === r || r === BigInt(0) ? `>= 0${u} and < 2${u} ** ` + 8 * (i + 1) + u : `>= -(2${u} ** ${8 * (i + 1) - 1}${u}) and < 2 ** ` + (8 * (i + 1) - 1) + u : `>= ${r}${u} and <= ` + n + u, new i2.ERR_OUT_OF_RANGE("value", e, t)
            }
            r = e, n = i, d1(u = o, "offset"), void 0 !== r[u] && void 0 !== r[u + n] || h1(u, r.length - (n + 1))
        }

        function d1(e, t) {
            if ("number" != typeof e) throw new i2.ERR_INVALID_ARG_TYPE(t, "number", e)
        }

        function h1(e, t, r) {
            if (Math.floor(e) !== e) throw d1(e, r), new i2.ERR_OUT_OF_RANGE(r || "offset", "an integer", e);
            if (t < 0) throw new i2.ERR_BUFFER_OUT_OF_BOUNDS;
            throw new i2.ERR_OUT_OF_RANGE(r || "offset", `>= ${r ? 1 : 0} and <= ` + t, e)
        }

        l1("ERR_BUFFER_OUT_OF_BOUNDS", function (e) {
            return e ? e + " is outside of buffer bounds" : "Attempt to access memory outside buffer bounds"
        }, RangeError), l1("ERR_INVALID_ARG_TYPE", function (e, t) {
            return `The "${e}" argument must be of type number. Received type ` + typeof t
        }, TypeError), l1("ERR_OUT_OF_RANGE", function (e, t, r) {
            e = `The value of "${e}" is out of range.`;
            let n = r;
            return Number.isInteger(r) && Math.abs(r) > 2 ** 32 ? n = f1(String(r)) : "bigint" == typeof r && (n = String(r), (r > BigInt(2) ** BigInt(32) || r < -(BigInt(2) ** BigInt(32))) && (n = f1(n)), n += "n"), e += ` It must be ${t}. Received ` + n
        }, RangeError);
        const u2 = /[^+/0-9A-Za-z-_]/g;

        function b1(t, r) {
            r = r || 1 / 0;
            let n;
            var o = t.length;
            let i = null;
            const u = [];
            for (let e = 0; e < o; ++e) {
                if (55295 < (n = t.charCodeAt(e)) && n < 57344) {
                    if (!i) {
                        if (56319 < n) {
                            -1 < (r -= 3) && u.push(239, 191, 189);
                            continue
                        }
                        if (e + 1 === o) {
                            -1 < (r -= 3) && u.push(239, 191, 189);
                            continue
                        }
                        i = n;
                        continue
                    }
                    if (n < 56320) {
                        -1 < (r -= 3) && u.push(239, 191, 189), i = n;
                        continue
                    }
                    n = 65536 + (i - 55296 << 10 | n - 56320)
                } else i && -1 < (r -= 3) && u.push(239, 191, 189);
                if (i = null, n < 128) {
                    if (--r < 0) break;
                    u.push(n)
                } else if (n < 2048) {
                    if ((r -= 2) < 0) break;
                    u.push(n >> 6 | 192, 63 & n | 128)
                } else if (n < 65536) {
                    if ((r -= 3) < 0) break;
                    u.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
                } else {
                    if (!(n < 1114112)) throw new Error("Invalid code point");
                    if ((r -= 4) < 0) break;
                    u.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
                }
            }
            return u
        }

        function y1(e) {
            return t2.toByteArray(function (e) {
                if ((e = (e = e.split("=")[0]).trim().replace(u2, "")).length < 2) return "";
                for (; e.length % 4 != 0;) e += "=";
                return e
            }(e))
        }

        function _1(e, t, r, n) {
            let o;
            for (o = 0; o < n && !(o + r >= t.length || o >= e.length); ++o) t[o + r] = e[o];
            return o
        }

        function v1(e, t) {
            return e instanceof t || null != e && null != e.constructor && null != e.constructor.name && e.constructor.name === t.name
        }

        function m1(e) {
            return e != e
        }

        const a2 = function () {
            var r = "0123456789abcdef";
            const n = new Array(256);
            for (let t = 0; t < 16; ++t) {
                var o = 16 * t;
                for (let e = 0; e < 16; ++e) n[o + e] = r[t] + r[e]
            }
            return n
        }();

        function g1(e) {
            return "undefined" == typeof BigInt ? O1 : e
        }

        function O1() {
            throw new Error("BigInt not supported")
        }
    }
    var w1, pf = {}, Sa = {}, o = r && r.__extends || (w1 = function (e, t) {
        return (w1 = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
            e.__proto__ = t
        } || function (e, t) {
            for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
        })(e, t)
    }, function (e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

        function r() {
            this.constructor = e
        }

        w1(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
    }), jf = (Object.defineProperty(Sa, "__esModule", {value: !0}), M.prototype.getUInt8 = function (e) {
        throw new Error("Not implemented")
    }, M.prototype.getInt8 = function (e) {
        throw new Error("Not implemented")
    }, M.prototype.getFloat64 = function (e) {
        throw new Error("Not implemented")
    }, M.prototype.putUInt8 = function (e, t) {
        throw new Error("Not implemented")
    }, M.prototype.putInt8 = function (e, t) {
        throw new Error("Not implemented")
    }, M.prototype.putFloat64 = function (e, t) {
        throw new Error("Not implemented")
    }, M.prototype.getInt16 = function (e) {
        return this.getInt8(e) << 8 | this.getUInt8(e + 1)
    }, M.prototype.getUInt16 = function (e) {
        return this.getUInt8(e) << 8 | this.getUInt8(e + 1)
    }, M.prototype.getInt32 = function (e) {
        return this.getInt8(e) << 24 | this.getUInt8(e + 1) << 16 | this.getUInt8(e + 2) << 8 | this.getUInt8(e + 3)
    }, M.prototype.getUInt32 = function (e) {
        return this.getUInt8(e) << 24 | this.getUInt8(e + 1) << 16 | this.getUInt8(e + 2) << 8 | this.getUInt8(e + 3)
    }, M.prototype.getInt64 = function (e) {
        return this.getInt8(e) << 56 | this.getUInt8(e + 1) << 48 | this.getUInt8(e + 2) << 40 | this.getUInt8(e + 3) << 32 | this.getUInt8(e + 4) << 24 | this.getUInt8(e + 5) << 16 | this.getUInt8(e + 6) << 8 | this.getUInt8(e + 7)
    }, M.prototype.getSlice = function (e, t) {
        return new P1(e, t, this)
    }, M.prototype.putInt16 = function (e, t) {
        this.putInt8(e, t >> 8), this.putUInt8(e + 1, 255 & t)
    }, M.prototype.putUInt16 = function (e, t) {
        this.putUInt8(e, t >> 8 & 255), this.putUInt8(e + 1, 255 & t)
    }, M.prototype.putInt32 = function (e, t) {
        this.putInt8(e, t >> 24), this.putUInt8(e + 1, t >> 16 & 255), this.putUInt8(e + 2, t >> 8 & 255), this.putUInt8(e + 3, 255 & t)
    }, M.prototype.putUInt32 = function (e, t) {
        this.putUInt8(e, t >> 24 & 255), this.putUInt8(e + 1, t >> 16 & 255), this.putUInt8(e + 2, t >> 8 & 255), this.putUInt8(e + 3, 255 & t)
    }, M.prototype.putInt64 = function (e, t) {
        this.putInt8(e, t >> 48), this.putUInt8(e + 1, t >> 42 & 255), this.putUInt8(e + 2, t >> 36 & 255), this.putUInt8(e + 3, t >> 30 & 255), this.putUInt8(e + 4, t >> 24 & 255), this.putUInt8(e + 5, t >> 16 & 255), this.putUInt8(e + 6, t >> 8 & 255), this.putUInt8(e + 7, 255 & t)
    }, M.prototype.putBytes = function (e, t) {
        for (var r = 0, n = t.remaining(); r < n; r++) this.putUInt8(e + r, t.readUInt8())
    }, M.prototype.readUInt8 = function () {
        return this.getUInt8(this._updatePos(1))
    }, M.prototype.readInt8 = function () {
        return this.getInt8(this._updatePos(1))
    }, M.prototype.readUInt16 = function () {
        return this.getUInt16(this._updatePos(2))
    }, M.prototype.readUInt32 = function () {
        return this.getUInt32(this._updatePos(4))
    }, M.prototype.readInt16 = function () {
        return this.getInt16(this._updatePos(2))
    }, M.prototype.readInt32 = function () {
        return this.getInt32(this._updatePos(4))
    }, M.prototype.readInt64 = function () {
        return this.getInt32(this._updatePos(8))
    }, M.prototype.readFloat64 = function () {
        return this.getFloat64(this._updatePos(8))
    }, M.prototype.writeUInt8 = function (e) {
        this.putUInt8(this._updatePos(1), e)
    }, M.prototype.writeInt8 = function (e) {
        this.putInt8(this._updatePos(1), e)
    }, M.prototype.writeInt16 = function (e) {
        this.putInt16(this._updatePos(2), e)
    }, M.prototype.writeInt32 = function (e) {
        this.putInt32(this._updatePos(4), e)
    }, M.prototype.writeUInt32 = function (e) {
        this.putUInt32(this._updatePos(4), e)
    }, M.prototype.writeInt64 = function (e) {
        this.putInt64(this._updatePos(8), e)
    }, M.prototype.writeFloat64 = function (e) {
        this.putFloat64(this._updatePos(8), e)
    }, M.prototype.writeBytes = function (e) {
        this.putBytes(this._updatePos(e.remaining()), e)
    }, M.prototype.readSlice = function (e) {
        return this.getSlice(this._updatePos(e), e)
    }, M.prototype._updatePos = function (e) {
        var t = this.position;
        return this.position += e, t
    }, M.prototype.remaining = function () {
        return this.length - this.position
    }, M.prototype.hasRemaining = function () {
        return 0 < this.remaining()
    }, M.prototype.reset = function () {
        this.position = 0
    }, M.prototype.toString = function () {
        return this.constructor.name + "( position=" + this.position + " )\n  " + this.toHex()
    }, M.prototype.toHex = function () {
        for (var e = "", t = 0; t < this.length; t++) {
            var r = this.getUInt8(t).toString(16);
            e += r = 1 === r.length ? "0" + r : r, t !== this.length - 1 && (e += " ")
        }
        return e
    }, M);

    function M(e) {
        this.position = 0, this.length = e
    }

    Sa.default = jf;
    o(S1, E1 = jf), S1.prototype.putUInt8 = function (e, t) {
        this._inner.putUInt8(this._start + e, t)
    }, S1.prototype.getUInt8 = function (e) {
        return this._inner.getUInt8(this._start + e)
    }, S1.prototype.putInt8 = function (e, t) {
        this._inner.putInt8(this._start + e, t)
    }, S1.prototype.putFloat64 = function (e, t) {
        this._inner.putFloat64(this._start + e, t)
    }, S1.prototype.getInt8 = function (e) {
        return this._inner.getInt8(this._start + e)
    }, S1.prototype.getFloat64 = function (e) {
        return this._inner.getFloat64(this._start + e)
    };
    var E1, P1 = S1;

    function S1(e, t, r) {
        t = E1.call(this, t) || this;
        return t._start = e, t._inner = r, t
    }

    var T1, j1, Nf = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        }, Df = (Object.defineProperty(pf, "__esModule", {value: !0}), pf.BaseBuffer = void 0, Nf(Sa)),
        Hf = (pf.BaseBuffer = Df.default, pf.default = Df.default, r && r.__extends || (T1 = function (e, t) {
            return (T1 = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
            })(e, t)
        }, function (e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

            function r() {
                this.constructor = e
            }

            T1(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
        })), Xf = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        }, C1 = (Object.defineProperty(Ra, "__esModule", {value: !0}), Ra.alloc = void 0, Xf(Kc)), Aa = Xf(pf),
        I1 = (j1 = Aa.default, Hf(R1, j1), R1.prototype.getUInt8 = function (e) {
            return this._buffer.readUInt8(e)
        }, R1.prototype.getInt8 = function (e) {
            return this._buffer.readInt8(e)
        }, R1.prototype.getFloat64 = function (e) {
            return this._buffer.readDoubleBE(e)
        }, R1.prototype.putUInt8 = function (e, t) {
            this._buffer.writeUInt8(t, e)
        }, R1.prototype.putInt8 = function (e, t) {
            this._buffer.writeInt8(t, e)
        }, R1.prototype.putFloat64 = function (e, t) {
            this._buffer.writeDoubleBE(t, e)
        }, R1.prototype.putBytes = function (e, t) {
            var r;
            t instanceof R1 ? (r = Math.min(t.length - t.position, this.length - e), t._buffer.copy(this._buffer, e, t.position, t.position + r), t.position += r) : j1.prototype.putBytes.call(this, e, t)
        }, R1.prototype.getSlice = function (e, t) {
            return new R1(this._buffer.slice(e, e + t))
        }, R1);

    function R1(e) {
        var t = this,
            e = (e = e) instanceof C1.default.Buffer ? e : "number" == typeof e && "function" == typeof C1.default.Buffer.alloc ? C1.default.Buffer.alloc(e) : new C1.default.Buffer(e);
        return (t = j1.call(this, e.length) || this)._buffer = e, t
    }

    Ra.default = I1, Ra.alloc = function (e) {
        return new I1(e)
    };
    var df = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        }, k1 = (Object.defineProperty(Dl, "__esModule", {value: !0}), df(Ra)), A1 = e, ep = A1.internal.util,
        M1 = ep.ENCRYPTION_OFF, x1 = ep.ENCRYPTION_ON;

    function N1(e, t, r) {
        void 0 === t && (t = U1), void 0 === r && (r = function (e) {
            return new WebSocket(e)
        });
        var n, o = this,
            t = (this._open = !0, this._pending = [], this._error = null, this._handleConnectionError = this._handleConnectionError.bind(this), this._config = e, this._receiveTimeout = null, this._receiveTimeoutStarted = !1, this._receiveTimeoutId = null, function (e, t) {
                var r = function (e) {
                    return !0 === e.encrypted || e.encrypted === x1
                }(e), n = function (e) {
                    return !1 === e.encrypted || e.encrypted === M1
                }(e), e = e.trust, t = function (e) {
                    e = "function" == typeof e ? e() : "";
                    return e && 0 <= e.toLowerCase().indexOf("https")
                }(t);
                if (function (e, t, r) {
                    null !== r && (e && !r ? console.warn("Neo4j driver is configured to use secure WebSocket on a HTTP web page. WebSockets might not work in a mixed content environment. Please consider configuring driver to not use encryption.") : t && r && console.warn("Neo4j driver is configured to use insecure WebSocket on a HTTPS web page. WebSockets might not work in a mixed content environment. Please consider configuring driver to use encryption."))
                }(r, n, t), n) return {scheme: "ws", error: null};
                if (t) return {scheme: "wss", error: null};
                if (r) return e && "TRUST_SYSTEM_CA_SIGNED_CERTIFICATES" !== e ? {
                    scheme: null,
                    error: (0, A1.newError)("The browser version of this driver only supports one trust strategy, 'TRUST_SYSTEM_CA_SIGNED_CERTIFICATES'. " + e + ' is not supported. Please either use TRUST_SYSTEM_CA_SIGNED_CERTIFICATES or disable encryption by setting `encrypted:"' + M1 + '"` in the driver configuration.')
                } : {scheme: "wss", error: null};
                return {scheme: "ws", error: null}
            }(e, t)), i = t.scheme, t = t.error;
        t ? this._error = t : (this._ws = function (t, r, n) {
            var o = t + "://" + r.asHostPort();
            try {
                return n(o)
            } catch (e) {
                if (function (e, t) {
                    return "SyntaxError" === e.name && function (e) {
                        return "[" === e.charAt(0) && -1 !== e.indexOf("]")
                    }(t.asHostPort())
                }(e, r)) return o = function (e, t) {
                    var r = t.host().replace(/:/g, "-").replace("%", "s") + ".ipv6-literal.net";
                    return "".concat(e, "://").concat(r, ":").concat(t.port())
                }(t, r), n(o);
                throw e
            }
        }(i, e.address, r), this._ws.binaryType = "arraybuffer", (n = this)._ws.onclose = function (e) {
            e && !e.wasClean && n._handleConnectionError(), n._open = !1
        }, this._ws.onopen = function () {
            n._clearConnectionTimeout();
            var e = n._pending;
            n._pending = null;
            for (var t = 0; t < e.length; t++) n.write(e[t])
        }, this._ws.onmessage = function (e) {
            o._resetTimeout(), n.onmessage && (e = new k1.default(e.data), n.onmessage(e))
        }, this._ws.onerror = this._handleConnectionError, this._connectionTimeoutFired = !1, this._connectionTimeoutId = this._setupConnectionTimeout())
    }

    function U1() {
        return "undefined" != typeof window && window.location ? window.location.protocol : null
    }

    N1.prototype._handleConnectionError = function () {
        if (this._connectionTimeoutFired) return this._error = (0, A1.newError)("Failed to establish connection in ".concat(this._config.connectionTimeout, "ms"), this._config.connectionErrorCode), void (this.onerror && this.onerror(this._error));
        this._open && !this._timedout && (this._error = (0, A1.newError)("WebSocket connection failure. Due to security constraints in your web browser, the reason for the failure is not available to this Neo4j Driver. Please use your browsers development console to determine the root cause of the failure. Common reasons include the database being unavailable, using the wrong connection URL or temporary network problems. If you have enabled encryption, ensure your browser is configured to trust the certificate Neo4j is configured to use. WebSocket `readyState` is: " + this._ws.readyState, this._config.connectionErrorCode), this.onerror && this.onerror(this._error))
    }, N1.prototype.write = function (e) {
        if (null !== this._pending) this._pending.push(e); else {
            if (!(e instanceof k1.default)) throw(0, A1.newError)("Don't know how to send buffer: " + e);
            try {
                this._ws.send(e._buffer)
            } catch (e) {
                if (1 === this._ws.readyState) throw e;
                this._handleConnectionError()
            }
        }
    }, N1.prototype.close = function () {
        var r = this;
        return new Promise(function (e, t) {
            r._ws && 3 !== r._ws.readyState ? (r._open = !1, r.stopReceiveTimeout(), r._clearConnectionTimeout(), r._ws.onclose = function () {
                return e()
            }, r._ws.close()) : e()
        })
    }, N1.prototype.setupReceiveTimeout = function (e) {
        this._receiveTimeout = e
    }, N1.prototype.stopReceiveTimeout = function () {
        null !== this._receiveTimeout && this._receiveTimeoutStarted && (this._receiveTimeoutStarted = !1, null != this._receiveTimeoutId && clearTimeout(this._receiveTimeoutId), this._receiveTimeoutId = null)
    }, N1.prototype.startReceiveTimeout = function () {
        this._open && null !== this._receiveTimeout && !this._receiveTimeoutStarted && (this._receiveTimeoutStarted = !0, this._resetTimeout())
    }, N1.prototype._resetTimeout = function () {
        var e = this;
        this._receiveTimeoutStarted && (null !== this._receiveTimeoutId && clearTimeout(this._receiveTimeoutId), this._receiveTimeoutId = setTimeout(function () {
            e._receiveTimeoutId = null, e._timedout = !0, e.stopReceiveTimeout(), e._error = (0, A1.newError)("Connection lost. Server didn't respond in ".concat(e._receiveTimeout, "ms"), e._config.connectionErrorCode), e.close(), e.onerror && e.onerror(e._error)
        }, this._receiveTimeout))
    }, N1.prototype._setupConnectionTimeout = function () {
        var e, t = this, r = this._config.connectionTimeout;
        return r ? (e = this._ws, setTimeout(function () {
            1 !== e.readyState && (t._connectionTimeoutFired = !0, e.close())
        }, r)) : null
    }, N1.prototype._clearConnectionTimeout = function () {
        var e = this._connectionTimeoutId;
        !e && 0 !== e || (this._connectionTimeoutFired = !1, this._connectionTimeoutId = null, clearTimeout(e))
    }, Dl.default = N1;
    var D1, op = {}, ka = r && r.__extends || (D1 = function (e, t) {
        return (D1 = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
            e.__proto__ = t
        } || function (e, t) {
            for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
        })(e, t)
    }, function (e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

        function r() {
            this.constructor = e
        }

        D1(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
    });
    Object.defineProperty(op, "__esModule", {value: !0});
    var L1, j = e.internal.resolver.BaseHostNameResolver, Tf = (ka(B1, L1 = j), B1.prototype.resolve = function (e) {
        return this._resolveToItself(e)
    }, B1);

    function B1() {
        return null !== L1 && L1.apply(this, arguments) || this
    }

    op.default = Tf;
    var F1, S = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        }, dp = (Object.defineProperty(Rl, "__esModule", {value: !0}), Rl.HostNameResolver = Rl.Channel = void 0, S(Dl)),
        yn = S(op), I = (Rl.Channel = dp.default, Rl.HostNameResolver = yn.default, {}), Lf = {},
        Cf = r && r.__extends || (F1 = function (e, t) {
            return (F1 = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
            })(e, t)
        }, function (e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

            function r() {
                this.constructor = e
            }

            F1(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
        });
    Object.defineProperty(Lf, "__esModule", {value: !0});
    var W1, z1 = Ra, hp = (W1 = pf.BaseBuffer, Cf(q1, W1), q1.prototype.getUInt8 = function (e) {
        for (var t = 0; t < this._buffers.length; t++) {
            var r = this._buffers[t];
            if (!(e >= r.length)) return r.getUInt8(e);
            e -= r.length
        }
    }, q1.prototype.getInt8 = function (e) {
        for (var t = 0; t < this._buffers.length; t++) {
            var r = this._buffers[t];
            if (!(e >= r.length)) return r.getInt8(e);
            e -= r.length
        }
    }, q1.prototype.getFloat64 = function (e) {
        for (var t = (0, z1.alloc)(8), r = 0; r < 8; r++) t.putUInt8(r, this.getUInt8(e + r));
        return t.getFloat64(0)
    }, q1);

    function q1(e) {
        for (var t = this, r = 0, n = 0; n < e.length; n++) r += e[n].length;
        return (t = W1.call(this, r) || this)._buffers = e, t
    }

    Lf.default = hp;
    var V1, H1, vp = r && r.__extends || (V1 = function (e, t) {
            return (V1 = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
            })(e, t)
        }, function (e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

            function r() {
                this.constructor = e
            }

            V1(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
        }), wp = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        }, jp = (Object.defineProperty(I, "__esModule", {value: !0}), I.Dechunker = I.Chunker = void 0, wp(Sa)), Y1 = Ra,
        K1 = wp(Lf), Ap = (H1 = jp.default, vp(G1, H1), G1.prototype.putUInt8 = function (e, t) {
            this._ensure(1), this._buffer.writeUInt8(t)
        }, G1.prototype.putInt8 = function (e, t) {
            this._ensure(1), this._buffer.writeInt8(t)
        }, G1.prototype.putFloat64 = function (e, t) {
            this._ensure(8), this._buffer.writeFloat64(t)
        }, G1.prototype.putBytes = function (e, t) {
            for (; 0 < t.remaining();) this._ensure(1), this._buffer.remaining() > t.remaining() ? this._buffer.writeBytes(t) : this._buffer.writeBytes(t.readSlice(this._buffer.remaining()));
            return this
        }, G1.prototype.flush = function () {
            var e;
            return 0 < this._buffer.position && (this._closeChunkIfOpen(), e = this._buffer, this._buffer = null, this._ch.write(e.getSlice(0, e.position)), this._buffer = (0, Y1.alloc)(this._bufferSize), this._chunkOpen = !1), this
        }, G1.prototype.messageBoundary = function () {
            this._closeChunkIfOpen(), this._buffer.remaining() < 2 && this.flush(), this._buffer.writeInt16(0)
        }, G1.prototype._ensure = function (e) {
            e = this._chunkOpen ? e : e + 2;
            this._buffer.remaining() < e && this.flush(), this._chunkOpen || (this._currentChunkStart = this._buffer.position, this._buffer.position = this._buffer.position + 2, this._chunkOpen = !0)
        }, G1.prototype._closeChunkIfOpen = function () {
            var e;
            this._chunkOpen && (e = this._buffer.position - (this._currentChunkStart + 2), this._buffer.putUInt16(this._currentChunkStart, e), this._chunkOpen = !1)
        }, G1);

    function G1(e, t) {
        var r = H1.call(this, 0) || this;
        return r._bufferSize = t || 1400, r._ch = e, r._buffer = (0, Y1.alloc)(r._bufferSize), r._currentChunkStart = 0, r._chunkOpen = !1, r
    }

    function Z1() {
        this._currentMessage = [], this._partialChunkHeader = 0, this._state = this.AWAITING_CHUNK
    }

    I.Chunker = Ap, Z1.prototype.AWAITING_CHUNK = function (e) {
        return 2 <= e.remaining() ? this._onHeader(e.readUInt16()) : (this._partialChunkHeader = e.readUInt8() << 8, this.IN_HEADER)
    }, Z1.prototype.IN_HEADER = function (e) {
        return this._onHeader(65535 & (this._partialChunkHeader | e.readUInt8()))
    }, Z1.prototype.IN_CHUNK = function (e) {
        return this._chunkSize <= e.remaining() ? (this._currentMessage.push(e.readSlice(this._chunkSize)), this.AWAITING_CHUNK) : (this._chunkSize -= e.remaining(), this._currentMessage.push(e.readSlice(e.remaining())), this.IN_CHUNK)
    }, Z1.prototype.CLOSED = function (e) {
    }, Z1.prototype._onHeader = function (e) {
        if (0 !== e) return this._chunkSize = e, this.IN_CHUNK;
        var t = void 0;
        switch (this._currentMessage.length) {
            case 0:
                return this.AWAITING_CHUNK;
            case 1:
                t = this._currentMessage[0];
                break;
            default:
                t = new K1.default(this._currentMessage)
        }
        return this._currentMessage = [], this.onmessage(t), this.AWAITING_CHUNK
    }, Z1.prototype.write = function (e) {
        for (; e.hasRemaining();) this._state = this._state(e)
    }, I.Dechunker = Z1;
    var Wp = {}, Q1 = (Object.defineProperty(Wp, "__esModule", {value: !0}), e), Zp = Q1.internal.util,
        ed = Zp.ENCRYPTION_OFF, od = Zp.ENCRYPTION_ON, X1 = Q1.error.SERVICE_UNAVAILABLE,
        J1 = [null, void 0, !0, !1, od, ed],
        $1 = [null, void 0, "TRUST_ALL_CERTIFICATES", "TRUST_CUSTOM_CA_SIGNED_CERTIFICATES", "TRUST_SYSTEM_CA_SIGNED_CERTIFICATES"];
    Wp.default = function (e, t, r) {
        this.address = e, this.encrypted = function (e) {
            e = e.encrypted;
            if (-1 !== J1.indexOf(e)) return e;
            throw(0, Q1.newError)("Illegal value of the encrypted setting ".concat(e, ". Expected one of ").concat(J1))
        }(t), this.trust = function (e) {
            e = e.trust;
            if (-1 !== $1.indexOf(e)) return e;
            throw(0, Q1.newError)("Illegal value of the trust setting ".concat(e, ". Expected one of ").concat($1))
        }(t), this.trustedCertificates = t.trustedCertificates || [], this.knownHostsPath = t.knownHosts || null, this.connectionErrorCode = r || X1, this.connectionTimeout = t.connectionTimeout
    };
    var eT, tT, id = {}, Ed = {}, wd = {exports: {}};

    function rT(e, t) {
        for (var r in e) t[r] = e[r]
    }

    function nT(e, t, r) {
        return tT(e, t, r)
    }

    fl = (zd = wd).exports, (tT = (eT = Kc).Buffer).from && tT.alloc && tT.allocUnsafe && tT.allocUnsafeSlow ? zd.exports = eT : (rT(eT, fl), fl.Buffer = nT), nT.prototype = Object.create(tT.prototype), rT(tT, nT), nT.from = function (e, t, r) {
        if ("number" == typeof e) throw new TypeError("Argument must not be a number");
        return tT(e, t, r)
    }, nT.alloc = function (e, t, r) {
        if ("number" != typeof e) throw new TypeError("Argument must be a number");
        e = tT(e);
        return void 0 !== t ? "string" == typeof r ? e.fill(t, r) : e.fill(t) : e.fill(0), e
    }, nT.allocUnsafe = function (e) {
        if ("number" != typeof e) throw new TypeError("Argument must be a number");
        return tT(e)
    }, nT.allocUnsafeSlow = function (e) {
        if ("number" != typeof e) throw new TypeError("Argument must be a number");
        return eT.SlowBuffer(e)
    };
    var oT = wd.exports.Buffer, iT = oT.isEncoding || function (e) {
        switch ((e = "" + e) && e.toLowerCase()) {
            case"hex":
            case"utf8":
            case"utf-8":
            case"ascii":
            case"binary":
            case"base64":
            case"ucs2":
            case"ucs-2":
            case"utf16le":
            case"utf-16le":
            case"raw":
                return !0;
            default:
                return !1
        }
    };

    function uT(e) {
        var t = function (e) {
            if (!e) return "utf8";
            for (var t; ;) switch (e) {
                case"utf8":
                case"utf-8":
                    return "utf8";
                case"ucs2":
                case"ucs-2":
                case"utf16le":
                case"utf-16le":
                    return "utf16le";
                case"latin1":
                case"binary":
                    return "latin1";
                case"base64":
                case"ascii":
                case"hex":
                    return e;
                default:
                    if (t) return;
                    e = ("" + e).toLowerCase(), t = !0
            }
        }(e);
        if ("string" == typeof t || oT.isEncoding !== iT && iT(e)) return t || e;
        throw new Error("Unknown encoding: " + e)
    }

    function aT(e) {
        var t;
        switch (this.encoding = uT(e), this.encoding) {
            case"utf16le":
                this.text = lT, this.end = fT, t = 4;
                break;
            case"utf8":
                this.fillLast = cT, t = 4;
                break;
            case"base64":
                this.text = pT, this.end = dT, t = 3;
                break;
            default:
                return this.write = hT, void (this.end = bT)
        }
        this.lastNeed = 0, this.lastTotal = 0, this.lastChar = oT.allocUnsafe(t)
    }

    function sT(e) {
        return e <= 127 ? 0 : e >> 5 == 6 ? 2 : e >> 4 == 14 ? 3 : e >> 3 == 30 ? 4 : e >> 6 == 2 ? -1 : -2
    }

    function cT(e) {
        var t, r = this.lastTotal - this.lastNeed,
            n = (t = this, 128 != (192 & (n = e)[0]) ? (t.lastNeed = 0, "�") : 1 < t.lastNeed && 1 < n.length ? 128 != (192 & n[1]) ? (t.lastNeed = 1, "�") : 2 < t.lastNeed && 2 < n.length && 128 != (192 & n[2]) ? (t.lastNeed = 2, "�") : void 0 : void 0);
        return void 0 !== n ? n : this.lastNeed <= e.length ? (e.copy(this.lastChar, r, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal)) : (e.copy(this.lastChar, r, 0, e.length), void (this.lastNeed -= e.length))
    }

    function lT(e, t) {
        if ((e.length - t) % 2 != 0) return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = e[e.length - 1], e.toString("utf16le", t, e.length - 1);
        t = e.toString("utf16le", t);
        if (t) {
            var r = t.charCodeAt(t.length - 1);
            if (55296 <= r && r <= 56319) return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = e[e.length - 2], this.lastChar[1] = e[e.length - 1], t.slice(0, -1)
        }
        return t
    }

    function fT(e) {
        var t, e = e && e.length ? this.write(e) : "";
        return this.lastNeed ? (t = this.lastTotal - this.lastNeed, e + this.lastChar.toString("utf16le", 0, t)) : e
    }

    function pT(e, t) {
        var r = (e.length - t) % 3;
        return 0 == r ? e.toString("base64", t) : (this.lastNeed = 3 - r, this.lastTotal = 3, 1 == r ? this.lastChar[0] = e[e.length - 1] : (this.lastChar[0] = e[e.length - 2], this.lastChar[1] = e[e.length - 1]), e.toString("base64", t, e.length - r))
    }

    function dT(e) {
        e = e && e.length ? this.write(e) : "";
        return this.lastNeed ? e + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : e
    }

    function hT(e) {
        return e.toString(this.encoding)
    }

    function bT(e) {
        return e && e.length ? this.write(e) : ""
    }

    (Ed.StringDecoder = aT).prototype.write = function (e) {
        if (0 === e.length) return "";
        var t, r;
        if (this.lastNeed) {
            if (void 0 === (t = this.fillLast(e))) return "";
            r = this.lastNeed, this.lastNeed = 0
        } else r = 0;
        return r < e.length ? t ? t + this.text(e, r) : this.text(e, r) : t || ""
    }, aT.prototype.end = function (e) {
        e = e && e.length ? this.write(e) : "";
        return this.lastNeed ? e + "�" : e
    }, aT.prototype.text = function (e, t) {
        var r = function (e, t, r) {
            var n = t.length - 1;
            if (n < r) return 0;
            var o = sT(t[n]);
            if (0 <= o) return 0 < o && (e.lastNeed = o - 1), o;
            if (--n < r || -2 === o) return 0;
            if (0 <= (o = sT(t[n]))) return 0 < o && (e.lastNeed = o - 2), o;
            if (--n < r || -2 === o) return 0;
            if (0 <= (o = sT(t[n]))) return 0 < o && (2 === o ? o = 0 : e.lastNeed = o - 3), o;
            return 0
        }(this, e, t);
        if (!this.lastNeed) return e.toString("utf8", t);
        this.lastTotal = r;
        r = e.length - (r - this.lastNeed);
        return e.copy(this.lastChar, 0, r), e.toString("utf8", t, r)
    }, aT.prototype.fillLast = function (e) {
        if (this.lastNeed <= e.length) return e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
        e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e.length), this.lastNeed -= e.length
    };
    var yT, _T, vT, mT, gT, Cc = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        }, OT = (Object.defineProperty(id, "__esModule", {value: !0}), Cc(Ra)), wT = e, ET = Cc(Kc),
        PT = new Ed.StringDecoder("utf8");
    id.default = {
        encode: function (e) {
            return new OT.default((e = e, "function" == typeof ET.default.Buffer.from ? ET.default.Buffer.from(e, "utf8") : new ET.default.Buffer(e, "utf8")))
        }, decode: function (e, t) {
            if (Object.prototype.hasOwnProperty.call(e, "_buffer")) return n = t, a = (r = e).position, n = a + n, r.position = Math.min(n, r.length), r._buffer.toString("utf8", a, n);
            var o, i, u, r, n, a;
            if (Object.prototype.hasOwnProperty.call(e, "_buffers")) return o = function (e) {
                return PT.write(e._buffer)
            }, r = function () {
                return PT.end()
            }, i = t, u = (a = e).position, a._updatePos(Math.min(t, a.length - u)), a._buffers.reduce(function (e, t) {
                var r, n;
                return i <= 0 ? e : u >= t.length ? (u -= t.length, "") : (t._updatePos(u - t.position), r = Math.min(t.length - u, i), n = t.readSlice(r), t._updatePos(r), i = Math.max(i - n.length, 0), u = 0, e + o(n))
            }, "") + r();
            throw(0, wT.newError)("Don't know how to decode strings from '".concat(e, "'"))
        }
    }, Ld = Il, yT = r && r.__createBinding || (Object.create ? function (e, t, r, n) {
        void 0 === n && (n = r);
        var o = Object.getOwnPropertyDescriptor(t, r);
        o && ("get" in o ? t.__esModule : !o.writable && !o.configurable) || (o = {
            enumerable: !0, get: function () {
                return t[r]
            }
        }), Object.defineProperty(e, n, o)
    } : function (e, t, r, n) {
        e[n = void 0 === n ? r : n] = t[r]
    }), Wd = r && r.__exportStar || function (e, t) {
        for (var r in e) "default" === r || Object.prototype.hasOwnProperty.call(t, r) || yT(t, e, r)
    }, _T = r && r.__importDefault || function (e) {
        return e && e.__esModule ? e : {default: e}
    }, Object.defineProperty(Ld, "__esModule", {value: !0}), Ld.utf8 = Ld.alloc = Ld.ChannelConfig = void 0, Wd(Rl, Ld), Wd(I, Ld), vT = Wp, Object.defineProperty(Ld, "ChannelConfig", {
        enumerable: !0,
        get: function () {
            return _T(vT).default
        }
    }), mT = Ra, Object.defineProperty(Ld, "alloc", {
        enumerable: !0, get: function () {
            return mT.alloc
        }
    }), gT = id, Object.defineProperty(Ld, "utf8", {
        enumerable: !0, get: function () {
            return _T(gT).default
        }
    }), Object.defineProperty(ll, "__esModule", {value: !0});
    var ST = Il, TT = e, jT = 1616949271;

    function CT(e, t) {
        return {major: e, minor: t}
    }

    function IT() {
        var e = [CT(5, 0), [CT(4, 4), CT(4, 2)], CT(4, 1), CT(3, 0)];
        if (4 < e.length) throw(0, TT.newError)("It should not have more than 4 versions of the protocol");
        var o = (0, ST.alloc)(20);
        return o.writeInt32(jT), e.forEach(function (e) {
            var t, r, n;
            e instanceof Array ? (r = (n = e[0]).major, n = n.minor, t = e[1].minor, o.writeInt32(n - t << 16 | n << 8 | r)) : (r = e.major, n = e.minor, o.writeInt32(n << 8 | r))
        }), o.reset(), o
    }

    ll.default = function (t) {
        var o = this;
        return new Promise(function (r, n) {
            function e(e) {
                n(e)
            }

            t.onerror = e.bind(o), t._error && e(t._error), t.onmessage = function (t) {
                try {
                    var e = function (e) {
                        if (72 === (e = [e.readUInt8(), e.readUInt8(), e.readUInt8(), e.readUInt8()])[0] && 84 === e[1] && 84 === e[2] && 80 === e[3]) throw(0, TT.newError)("Server responded HTTP. Make sure you are not trying to connect to the http endpoint (HTTP defaults to port 7474 whereas BOLT defaults to port 7687)");
                        return Number(e[3] + "." + e[2])
                    }(t);
                    r({
                        protocolVersion: e, consumeRemainingBuffer: function (e) {
                            t.hasRemaining() && e(t.readSlice(t.remaining()))
                        }
                    })
                } catch (e) {
                    n(e)
                }
            }, t.write(IT())
        })
    };
    var RT, Jd = {}, $d = {}, ah = {}, R = {}, bh = {}, vh = r && r.__extends || (RT = function (e, t) {
        return (RT = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
            e.__proto__ = t
        } || function (e, t) {
            for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
        })(e, t)
    }, function (e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

        function r() {
            this.constructor = e
        }

        RT(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
    }), mh = r && r.__importDefault || function (e) {
        return e && e.__esModule ? e : {default: e}
    }, Bh = (Object.defineProperty(bh, "__esModule", {value: !0}), mh(e), kT.ofRecord = function (e) {
        return null === e ? kT.ofNull() : new BT(e)
    }, kT.ofMessageResponse = function (e) {
        return null === e ? kT.ofNull() : new MT(e)
    }, kT.ofNull = function () {
        return new UT
    }, Object.defineProperty(kT.prototype, "ttl", {
        get: function () {
            throw new Error("Not implemented")
        }, enumerable: !1, configurable: !0
    }), Object.defineProperty(kT.prototype, "db", {
        get: function () {
            throw new Error("Not implemented")
        }, enumerable: !1, configurable: !0
    }), Object.defineProperty(kT.prototype, "servers", {
        get: function () {
            throw new Error("Not implemented")
        }, enumerable: !1, configurable: !0
    }), Object.defineProperty(kT.prototype, "isNull", {
        get: function () {
            throw new Error("Not implemented")
        }, enumerable: !1, configurable: !0
    }), kT);

    function kT() {
    }

    bh.default = Bh;
    vh(xT, AT = Bh), Object.defineProperty(xT.prototype, "ttl", {
        get: function () {
            return this._response.rt.ttl
        }, enumerable: !1, configurable: !0
    }), Object.defineProperty(xT.prototype, "servers", {
        get: function () {
            return this._response.rt.servers
        }, enumerable: !1, configurable: !0
    }), Object.defineProperty(xT.prototype, "db", {
        get: function () {
            return this._response.rt.db
        }, enumerable: !1, configurable: !0
    }), Object.defineProperty(xT.prototype, "isNull", {
        get: function () {
            return null === this._response
        }, enumerable: !1, configurable: !0
    });
    var AT, MT = xT;

    function xT(e) {
        var t = AT.call(this) || this;
        return t._response = e, t
    }

    vh(DT, NT = Bh), Object.defineProperty(DT.prototype, "isNull", {
        get: function () {
            return !0
        }, enumerable: !1, configurable: !0
    });
    var NT, UT = DT;

    function DT() {
        return null !== NT && NT.apply(this, arguments) || this
    }

    vh(FT, LT = Bh), Object.defineProperty(FT.prototype, "ttl", {
        get: function () {
            return this._record.get("ttl")
        }, enumerable: !1, configurable: !0
    }), Object.defineProperty(FT.prototype, "servers", {
        get: function () {
            return this._record.get("servers")
        }, enumerable: !1, configurable: !0
    }), Object.defineProperty(FT.prototype, "db", {
        get: function () {
            return this._record.has("db") ? this._record.get("db") : null
        }, enumerable: !1, configurable: !0
    }), Object.defineProperty(FT.prototype, "isNull", {
        get: function () {
            return null === this._record
        }, enumerable: !1, configurable: !0
    });
    var LT, BT = FT;

    function FT(e) {
        var t = LT.call(this) || this;
        return t._record = e, t
    }

    var WT, qh = r && r.__extends || (WT = function (e, t) {
            return (WT = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
            })(e, t)
        }, function (e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

            function r() {
                this.constructor = e
            }

            WT(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
        }), Gh = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        },
        zT = (Object.defineProperty(R, "__esModule", {value: !0}), R.ProcedureRouteObserver = R.RouteObserver = R.CompletedObserver = R.FailedObserver = R.ResetObserver = R.LoginObserver = R.ResultStreamObserver = R.StreamObserver = void 0, e),
        qT = Gh(bh), VT = zT.internal.constants.FETCH_ALL, HT = zT.error.PROTOCOL_ERROR,
        $h = (YT.prototype.onNext = function (e) {
        }, YT.prototype.onError = function (e) {
        }, YT.prototype.onCompleted = function (e) {
        }, YT);

    function YT() {
    }

    R.StreamObserver = $h;
    qh(GT, KT = $h), GT.prototype.pause = function () {
        this._paused = !0
    }, GT.prototype.resume = function () {
        this._paused = !1, this._setupAutoPull(!0), this._state.pull(this)
    }, GT.prototype.onNext = function (e) {
        var t = new zT.Record(this._fieldKeys, e, this._fieldLookup);
        this._observers.some(function (e) {
            return e.onNext
        }) ? this._observers.forEach(function (e) {
            e.onNext && e.onNext(t)
        }) : (this._queuedRecords.push(t), this._queuedRecords.length > this._highRecordWatermark && (this._autoPull = !1))
    }, GT.prototype.onCompleted = function (e) {
        this._state.onSuccess(this, e)
    }, GT.prototype.onError = function (e) {
        this._state.onError(this, e)
    }, GT.prototype.cancel = function () {
        this._discard = !0
    }, GT.prototype.prepareToHandleSingleResponse = function () {
        this._head = [], this._fieldKeys = [], this._setState(aj.STREAMING)
    }, GT.prototype.markCompleted = function () {
        this._head = [], this._fieldKeys = [], this._tail = {}, this._setState(aj.SUCCEEDED)
    }, GT.prototype.subscribe = function (e) {
        if (this._head && e.onKeys && e.onKeys(this._head), 0 < this._queuedRecords.length && e.onNext) for (var t = 0; t < this._queuedRecords.length; t++) e.onNext(this._queuedRecords[t]), this._queuedRecords.length - t - 1 <= this._lowRecordWatermark && (this._autoPull = !0, this._state === aj.READY && this._handleStreaming());
        this._tail && e.onCompleted && e.onCompleted(this._tail), this._error && e.onError(this._error), this._observers.push(e), this._state === aj.READY && this._handleStreaming()
    }, GT.prototype._handleHasMore = function (e) {
        this._setState(aj.READY), this._handleStreaming(), delete e.has_more
    }, GT.prototype._handlePullSuccess = function (e) {
        var t, r = this, n = Object.assign(this._server ? {server: this._server} : {}, this._meta, e);
        [void 0, null, "r", "w", "rw", "s"].includes(n.type) ? (this._setState(aj.SUCCEEDED), e = null, t = function () {
            r._tail = n, r._observers.some(function (e) {
                return e.onCompleted
            }) && r._observers.forEach(function (e) {
                e.onCompleted && e.onCompleted(n)
            }), r._afterComplete && r._afterComplete(n)
        }, (e = this._beforeComplete ? this._beforeComplete(n) : e) ? Promise.resolve(e).then(t) : t()) : this.onError((0, zT.newError)('Server returned invalid query type. Expected one of [undefined, null, "r", "w", "rw", "s"] but got \''.concat(n.type, "'"), HT))
    }, GT.prototype._handleRunSuccess = function (e, t) {
        var r = this;
        if (null === this._fieldKeys) {
            if (this._fieldKeys = [], this._fieldLookup = {}, e.fields && 0 < e.fields.length) {
                this._fieldKeys = e.fields;
                for (var n = 0; n < e.fields.length; n++) this._fieldLookup[e.fields[n]] = n;
                delete e.fields
            }
            null !== e.qid && void 0 !== e.qid && (this._queryId = e.qid, delete e.qid), this._storeMetadataForCompletion(e);
            var o = null, i = (this._beforeKeys && (o = this._beforeKeys(this._fieldKeys)), function () {
                r._head = r._fieldKeys, r._observers.some(function (e) {
                    return e.onKeys
                }) && r._observers.forEach(function (e) {
                    e.onKeys && e.onKeys(r._fieldKeys)
                }), r._afterKeys && r._afterKeys(r._fieldKeys), t()
            });
            o ? Promise.resolve(o).then(i) : i()
        }
    }, GT.prototype._handleError = function (t) {
        function e() {
            r._observers.some(function (e) {
                return e.onError
            }) && r._observers.forEach(function (e) {
                e.onError && e.onError(t)
            }), r._afterError && r._afterError(t)
        }

        var r = this, n = (this._setState(aj.FAILED), this._error = t, null);
        this._beforeError && (n = this._beforeError(t));
        n ? Promise.resolve(n).then(e) : e()
    }, GT.prototype._handleStreaming = function () {
        this._head && this._observers.some(function (e) {
            return e.onNext || e.onCompleted
        }) && (this._paused || !this._discard && !this._autoPull || this._more())
    }, GT.prototype._more = function () {
        this._discard ? this._discardFunction(this._queryId, this) : this._moreFunction(this._queryId, this._fetchSize, this), this._setState(aj.STREAMING)
    }, GT.prototype._storeMetadataForCompletion = function (e) {
        for (var t, r = Object.keys(e), n = r.length; n--;) t = r[n], this._meta[t] = e[t]
    }, GT.prototype._setState = function (e) {
        this._state = e
    }, GT.prototype._setupAutoPull = function () {
        this._autoPull = !0
    };
    var KT, tb = GT;

    function GT(e) {
        var e = void 0 === e ? {} : e, t = e.reactive, t = void 0 !== t && t, r = e.moreFunction, n = e.discardFunction,
            o = e.fetchSize, o = void 0 === o ? VT : o, i = e.beforeError, u = e.afterError, a = e.beforeKeys,
            s = e.afterKeys, c = e.beforeComplete, l = e.afterComplete, f = e.server, p = e.highRecordWatermark,
            p = void 0 === p ? Number.MAX_VALUE : p, e = e.lowRecordWatermark, e = void 0 === e ? Number.MAX_VALUE : e,
            d = KT.call(this) || this;
        return d._fieldKeys = null, d._fieldLookup = null, d._head = null, d._queuedRecords = [], d._tail = null, d._error = null, d._observers = [], d._meta = {}, d._server = f, d._beforeError = i, d._afterError = u, d._beforeKeys = a, d._afterKeys = s, d._beforeComplete = c, d._afterComplete = l, d._queryId = null, d._moreFunction = r, d._discardFunction = n, d._discard = !1, d._fetchSize = o, d._lowRecordWatermark = e, d._highRecordWatermark = p, d._setState(t ? aj.READY : aj.READY_STREAMING), d._setupAutoPull(), d._paused = !1, d
    }

    R.ResultStreamObserver = tb;
    qh(QT, ZT = $h), QT.prototype.onNext = function (e) {
        this.onError((0, zT.newError)("Received RECORD when initializing " + zT.json.stringify(e)))
    }, QT.prototype.onError = function (e) {
        this._onError && this._onError(e)
    }, QT.prototype.onCompleted = function (e) {
        this._onCompleted && this._onCompleted(e)
    };
    var ZT, pb = QT;

    function QT(e) {
        var e = void 0 === e ? {} : e, t = e.onError, e = e.onCompleted, r = ZT.call(this) || this;
        return r._onError = t, r._onCompleted = e, r
    }

    R.LoginObserver = pb;
    qh(JT, XT = $h), JT.prototype.onNext = function (e) {
        this.onError((0, zT.newError)("Received RECORD when resetting: received record is: " + zT.json.stringify(e), HT))
    }, JT.prototype.onError = function (e) {
        e.code === HT && this._onProtocolError && this._onProtocolError(e.message), this._onError && this._onError(e)
    }, JT.prototype.onCompleted = function (e) {
        this._onComplete && this._onComplete(e)
    };
    var XT, _b = JT;

    function JT(e) {
        var e = void 0 === e ? {} : e, t = e.onProtocolError, r = e.onError, e = e.onComplete,
            n = XT.call(this) || this;
        return n._onProtocolError = t, n._onError = r, n._onComplete = e, n
    }

    R.ResetObserver = _b;
    qh(ej, $T = tb);
    var $T, gb = ej;

    function ej(e) {
        var t = e.error, e = e.onError, e = $T.call(this, {beforeError: e}) || this;
        return e.onError(t), e
    }

    R.FailedObserver = gb;
    qh(rj, tj = tb);
    var tj, Ob = rj;

    function rj() {
        var e = tj.call(this) || this;
        return tj.prototype.markCompleted.call(e), e
    }

    R.CompletedObserver = Ob;
    qh(oj, nj = $h), oj.prototype.onNext = function (e) {
        this._records.push(e)
    }, oj.prototype.onError = function (e) {
        e.code === HT && this._onProtocolError && this._onProtocolError(e.message), this._onError && this._onError(e)
    }, oj.prototype.onCompleted = function () {
        null !== this._records && 1 !== this._records.length ? this.onError((0, zT.newError)("Illegal response from router. Received " + this._records.length + " records but expected only one.\n" + zT.json.stringify(this._records), HT)) : this._onCompleted && this._onCompleted(qT.default.ofRecord(this._records[0]))
    };
    var nj, wb = oj;

    function oj(e) {
        var t = e.resultObserver, r = e.onProtocolError, n = e.onError, e = e.onCompleted, o = nj.call(this) || this;
        return o._resultObserver = t, o._onError = n, o._onCompleted = e, o._records = [], o._onProtocolError = r, t.subscribe(o), o
    }

    R.ProcedureRouteObserver = wb;
    qh(uj, ij = $h), uj.prototype.onNext = function (e) {
        this.onError((0, zT.newError)("Received RECORD when resetting: received record is: " + zT.json.stringify(e), HT))
    }, uj.prototype.onError = function (e) {
        e.code === HT && this._onProtocolError && this._onProtocolError(e.message), this._onError && this._onError(e)
    }, uj.prototype.onCompleted = function (e) {
        this._onCompleted && this._onCompleted(qT.default.ofMessageResponse(e))
    };
    var ij, Ib = uj;

    function uj(e) {
        var e = void 0 === e ? {} : e, t = e.onProtocolError, r = e.onError, e = e.onCompleted,
            n = ij.call(this) || this;
        return n._onProtocolError = t, n._onError = r, n._onCompleted = e, n
    }

    R.RouteObserver = Ib;
    var aj = {
            READY_STREAMING: {
                onSuccess: function (e, t) {
                    e._handleRunSuccess(t, function () {
                        e._setState(aj.STREAMING)
                    })
                }, onError: function (e, t) {
                    e._handleError(t)
                }, name: function () {
                    return "READY_STREAMING"
                }, pull: function () {
                }
            }, READY: {
                onSuccess: function (e, t) {
                    e._handleRunSuccess(t, function () {
                        return e._handleStreaming()
                    })
                }, onError: function (e, t) {
                    e._handleError(t)
                }, name: function () {
                    return "READY"
                }, pull: function (e) {
                    return e._more()
                }
            }, STREAMING: {
                onSuccess: function (e, t) {
                    t.has_more ? e._handleHasMore(t) : e._handlePullSuccess(t)
                }, onError: function (e, t) {
                    e._handleError(t)
                }, name: function () {
                    return "STREAMING"
                }, pull: function () {
                }
            }, FAILED: {
                onError: function (e) {
                }, name: function () {
                    return "FAILED"
                }, pull: function () {
                }
            }, SUCCEEDED: {
                name: function () {
                    return "SUCCEEDED"
                }, pull: function () {
                }
            }
        },
        sj = (Object.defineProperty(ah, "__esModule", {value: !0}), ah.assertImpersonatedUserIsEmpty = ah.assertTxConfigIsEmpty = ah.assertDatabaseIsEmpty = void 0, e);
    ah.assertTxConfigIsEmpty = function (e, t, r) {
        if (void 0 === t && (t = function () {
        }), e && !e.isEmpty()) throw t((e = (0, sj.newError)("Driver is connected to the database that does not support transaction configuration. Please upgrade to neo4j 3.5.0 or later in order to use this functionality")).message), r.onError(e), e
    }, ah.assertDatabaseIsEmpty = function (e, t, r) {
        if (void 0 === t && (t = function () {
        }), e) throw t((e = (0, sj.newError)("Driver is connected to the database that does not support multiple databases. Please upgrade to neo4j 4.0.0 or later in order to use this functionality")).message), r.onError(e), e
    }, ah.assertImpersonatedUserIsEmpty = function (e, t, r) {
        if (void 0 === t && (t = function () {
        }), e) throw t((t = (0, sj.newError)("Driver is connected to the database that does not support user impersonation. Please upgrade to neo4j 4.4.0 or later in order to use this functionality. " + "Trying to impersonate ".concat(e, "."))).message), r.onError(t), t
    };
    Bf = {}, k = {}, Mb = {}, Db = {};
    Object.defineProperty(Db, "__esModule", {value: !0}), Db.identity = void 0, Db.identity = function (e) {
        return e
    };
    var cj = r && r.__createBinding || (Object.create ? function (e, t, r, n) {
            void 0 === n && (n = r);
            var o = Object.getOwnPropertyDescriptor(t, r);
            o && ("get" in o ? t.__esModule : !o.writable && !o.configurable) || (o = {
                enumerable: !0, get: function () {
                    return t[r]
                }
            }), Object.defineProperty(e, n, o)
        } : function (e, t, r, n) {
            e[n = void 0 === n ? r : n] = t[r]
        }), lj = r && r.__setModuleDefault || (Object.create ? function (e, t) {
            Object.defineProperty(e, "default", {enumerable: !0, value: t})
        } : function (e, t) {
            e.default = t
        }), Fb = r && r.__importStar || function (e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e) for (var r in e) "default" !== r && Object.prototype.hasOwnProperty.call(e, r) && cj(t, e, r);
            return lj(t, e), t
        }, Kb = (Object.defineProperty(Mb, "__esModule", {value: !0}), Mb.functional = void 0, Mb.functional = Fb(Db), {}),
        fj = (Object.defineProperty(Kb, "__esModule", {value: !0}), Kb.verifyStructSize = Kb.Structure = void 0, e),
        pj = fj.error.PROTOCOL_ERROR, Ph = (Object.defineProperty(dj.prototype, "size", {
            get: function () {
                return this.fields.length
            }, enumerable: !1, configurable: !0
        }), dj.prototype.toString = function () {
            for (var e = "", t = 0; t < this.fields.length; t++) 0 < t && (e += ", "), e += this.fields[t];
            return "Structure(" + this.signature + ", [" + e + "])"
        }, dj);

    function dj(e, t) {
        this.signature = e, this.fields = t
    }

    Kb.Structure = Ph, Kb.verifyStructSize = function (e, t, r) {
        if (t !== r) throw(0, fj.newError)("Wrong struct size for ".concat(e, ", expected ").concat(t, " but was ").concat(r), pj)
    }, Kb.default = Ph, Object.defineProperty(k, "__esModule", {value: !0}), k.Unpacker = k.Packer = void 0;
    var hj = Il, bj = Mb, yj = Kb, _j = e, vj = _j.error.PROTOCOL_ERROR;

    function mj(e) {
        this._ch = e, this._byteArraysSupported = !0
    }

    function gj(e, t) {
        void 0 === t && (t = !1), this._disableLosslessIntegers = e = void 0 === e ? !1 : e, this._useBigInt = t
    }

    mj.prototype.packable = function (o, i) {
        var e, u = this;
        void 0 === i && (i = bj.functional.identity);
        try {
            o = i(o)
        } catch (e) {
            return function () {
                throw e
            }
        }
        if (null === o) return function () {
            return u._ch.writeUInt8(192)
        };
        if (!0 === o) return function () {
            return u._ch.writeUInt8(195)
        };
        if (!1 === o) return function () {
            return u._ch.writeUInt8(194)
        };
        if ("number" == typeof o) return function () {
            return u.packFloat(o)
        };
        if ("string" == typeof o) return function () {
            return u.packString(o)
        };
        if ("bigint" == typeof o) return function () {
            return u.packInteger((0, _j.int)(o))
        };
        if ((0, _j.isInt)(o)) return function () {
            return u.packInteger(o)
        };
        if (o instanceof Int8Array) return function () {
            return u.packBytes(o)
        };
        if (o instanceof Array) return function () {
            u.packListHeader(o.length);
            for (var e = 0; e < o.length; e++) u.packable(void 0 === o[e] ? null : o[e], i)()
        };
        if (null != (e = o) && "function" == typeof e[Symbol.iterator]) return this.packableIterable(o, i);
        if (o instanceof yj.Structure) {
            for (var t = [], r = 0; r < o.fields.length; r++) t[r] = this.packable(o.fields[r], i);
            return function () {
                return u.packStruct(o.signature, t)
            }
        }
        return "object" == typeof o ? function () {
            for (var e = Object.keys(o), t = 0, r = 0; r < e.length; r++) void 0 !== o[e[r]] && t++;
            u.packMapHeader(t);
            for (r = 0; r < e.length; r++) {
                var n = e[r];
                void 0 !== o[n] && (u.packString(n), u.packable(o[n], i)())
            }
        } : this._nonPackableValue("Unable to pack the given value: ".concat(o))
    }, mj.prototype.packableIterable = function (t, e) {
        try {
            var r = Array.from(t);
            return this.packable(r, e)
        } catch (e) {
            throw(0, _j.newError)("Cannot pack given iterable, ".concat(e.message, ": ").concat(t))
        }
    }, mj.prototype.packStruct = function (e, t) {
        this.packStructHeader((t = t || []).length, e);
        for (var r = 0; r < t.length; r++) t[r]()
    }, mj.prototype.packInteger = function (e) {
        var t = e.high, r = e.low;
        e.greaterThanOrEqual(-16) && e.lessThan(128) ? this._ch.writeInt8(r) : e.greaterThanOrEqual(-128) && e.lessThan(-16) ? (this._ch.writeUInt8(200), this._ch.writeInt8(r)) : e.greaterThanOrEqual(-32768) && e.lessThan(32768) ? (this._ch.writeUInt8(201), this._ch.writeInt16(r)) : (e.greaterThanOrEqual(-2147483648) && e.lessThan(2147483648) ? this._ch.writeUInt8(202) : (this._ch.writeUInt8(203), this._ch.writeInt32(t)), this._ch.writeInt32(r))
    }, mj.prototype.packFloat = function (e) {
        this._ch.writeUInt8(193), this._ch.writeFloat64(e)
    }, mj.prototype.packString = function (e) {
        var e = hj.utf8.encode(e), t = e.length;
        if (t < 16) this._ch.writeUInt8(128 | t), this._ch.writeBytes(e); else if (t < 256) this._ch.writeUInt8(208), this._ch.writeUInt8(t), this._ch.writeBytes(e); else if (t < 65536) this._ch.writeUInt8(209), this._ch.writeUInt8(t / 256 >> 0), this._ch.writeUInt8(t % 256), this._ch.writeBytes(e); else {
            if (!(t < 4294967296)) throw(0, _j.newError)("UTF-8 strings of size " + t + " are not supported");
            this._ch.writeUInt8(210), this._ch.writeUInt8((t / 16777216 >> 0) % 256), this._ch.writeUInt8((t / 65536 >> 0) % 256), this._ch.writeUInt8((t / 256 >> 0) % 256), this._ch.writeUInt8(t % 256), this._ch.writeBytes(e)
        }
    }, mj.prototype.packListHeader = function (e) {
        if (e < 16) this._ch.writeUInt8(144 | e); else if (e < 256) this._ch.writeUInt8(212), this._ch.writeUInt8(e); else if (e < 65536) this._ch.writeUInt8(213), this._ch.writeUInt8((e / 256 >> 0) % 256), this._ch.writeUInt8(e % 256); else {
            if (!(e < 4294967296)) throw(0, _j.newError)("Lists of size " + e + " are not supported");
            this._ch.writeUInt8(214), this._ch.writeUInt8((e / 16777216 >> 0) % 256), this._ch.writeUInt8((e / 65536 >> 0) % 256), this._ch.writeUInt8((e / 256 >> 0) % 256), this._ch.writeUInt8(e % 256)
        }
    }, mj.prototype.packBytes = function (e) {
        if (!this._byteArraysSupported) throw(0, _j.newError)("Byte arrays are not supported by the database this driver is connected to");
        this.packBytesHeader(e.length);
        for (var t = 0; t < e.length; t++) this._ch.writeInt8(e[t])
    }, mj.prototype.packBytesHeader = function (e) {
        if (e < 256) this._ch.writeUInt8(204), this._ch.writeUInt8(e); else if (e < 65536) this._ch.writeUInt8(205), this._ch.writeUInt8((e / 256 >> 0) % 256), this._ch.writeUInt8(e % 256); else {
            if (!(e < 4294967296)) throw(0, _j.newError)("Byte arrays of size " + e + " are not supported");
            this._ch.writeUInt8(206), this._ch.writeUInt8((e / 16777216 >> 0) % 256), this._ch.writeUInt8((e / 65536 >> 0) % 256), this._ch.writeUInt8((e / 256 >> 0) % 256), this._ch.writeUInt8(e % 256)
        }
    }, mj.prototype.packMapHeader = function (e) {
        if (e < 16) this._ch.writeUInt8(160 | e); else if (e < 256) this._ch.writeUInt8(216), this._ch.writeUInt8(e); else if (e < 65536) this._ch.writeUInt8(217), this._ch.writeUInt8(e / 256 >> 0), this._ch.writeUInt8(e % 256); else {
            if (!(e < 4294967296)) throw(0, _j.newError)("Maps of size " + e + " are not supported");
            this._ch.writeUInt8(218), this._ch.writeUInt8((e / 16777216 >> 0) % 256), this._ch.writeUInt8((e / 65536 >> 0) % 256), this._ch.writeUInt8((e / 256 >> 0) % 256), this._ch.writeUInt8(e % 256)
        }
    }, mj.prototype.packStructHeader = function (e, t) {
        if (e < 16) this._ch.writeUInt8(176 | e), this._ch.writeUInt8(t); else if (e < 256) this._ch.writeUInt8(220), this._ch.writeUInt8(e), this._ch.writeUInt8(t); else {
            if (!(e < 65536)) throw(0, _j.newError)("Structures of size " + e + " are not supported");
            this._ch.writeUInt8(221), this._ch.writeUInt8(e / 256 >> 0), this._ch.writeUInt8(e % 256)
        }
    }, mj.prototype.disableByteArrays = function () {
        this._byteArraysSupported = !1
    }, mj.prototype._nonPackableValue = function (e) {
        return function () {
            throw(0, _j.newError)(e, vj)
        }
    }, k.Packer = mj, gj.prototype.unpack = function (e, t) {
        void 0 === t && (t = bj.functional.identity);
        var r = e.readUInt8(), n = 240 & r, o = 15 & r;
        if (192 === r) return null;
        var i = this._unpackBoolean(r);
        if (null !== i) return i;
        i = this._unpackNumberOrInteger(r, e);
        if (null !== i) {
            if ((0, _j.isInt)(i)) {
                if (this._useBigInt) return i.toBigInt();
                if (this._disableLosslessIntegers) return i.toNumberOrInfinity()
            }
            return i
        }
        i = this._unpackString(r, n, o, e);
        if (null !== i) return i;
        i = this._unpackList(r, n, o, e, t);
        if (null !== i) return i;
        i = this._unpackByteArray(r, e);
        if (null !== i) return i;
        i = this._unpackMap(r, n, o, e, t);
        if (null !== i) return i;
        i = this._unpackStruct(r, n, o, e, t);
        if (null !== i) return i;
        throw(0, _j.newError)("Unknown packed value with marker " + r.toString(16))
    }, gj.prototype.unpackInteger = function (e) {
        var t = e.readUInt8(), e = this._unpackInteger(t, e);
        if (null == e) throw(0, _j.newError)("Unable to unpack integer value with marker " + t.toString(16));
        return e
    }, gj.prototype._unpackBoolean = function (e) {
        return 195 === e || 194 !== e && null
    }, gj.prototype._unpackNumberOrInteger = function (e, t) {
        return 193 === e ? t.readFloat64() : this._unpackInteger(e, t)
    }, gj.prototype._unpackInteger = function (e, t) {
        var r;
        return 0 <= e && e < 128 ? (0, _j.int)(e) : 240 <= e && e < 256 ? (0, _j.int)(e - 256) : 200 === e ? (0, _j.int)(t.readInt8()) : 201 === e ? (0, _j.int)(t.readInt16()) : 202 === e ? (r = t.readInt32(), (0, _j.int)(r)) : 203 === e ? (r = t.readInt32(), e = t.readInt32(), new _j.Integer(e, r)) : null
    }, gj.prototype._unpackString = function (e, t, r, n) {
        return 128 === t ? hj.utf8.decode(n, r) : 208 === e ? hj.utf8.decode(n, n.readUInt8()) : 209 === e ? hj.utf8.decode(n, n.readUInt16()) : 210 === e ? hj.utf8.decode(n, n.readUInt32()) : null
    }, gj.prototype._unpackList = function (e, t, r, n, o) {
        return 144 === t ? this._unpackListWithSize(r, n, o) : 212 === e ? this._unpackListWithSize(n.readUInt8(), n, o) : 213 === e ? this._unpackListWithSize(n.readUInt16(), n, o) : 214 === e ? this._unpackListWithSize(n.readUInt32(), n, o) : null
    }, gj.prototype._unpackListWithSize = function (e, t, r) {
        for (var n = [], o = 0; o < e; o++) n.push(this.unpack(t, r));
        return n
    }, gj.prototype._unpackByteArray = function (e, t) {
        return 204 === e ? this._unpackByteArrayWithSize(t.readUInt8(), t) : 205 === e ? this._unpackByteArrayWithSize(t.readUInt16(), t) : 206 === e ? this._unpackByteArrayWithSize(t.readUInt32(), t) : null
    }, gj.prototype._unpackByteArrayWithSize = function (e, t) {
        for (var r = new Int8Array(e), n = 0; n < e; n++) r[n] = t.readInt8();
        return r
    }, gj.prototype._unpackMap = function (e, t, r, n, o) {
        return 160 === t ? this._unpackMapWithSize(r, n, o) : 216 === e ? this._unpackMapWithSize(n.readUInt8(), n, o) : 217 === e ? this._unpackMapWithSize(n.readUInt16(), n, o) : 218 === e ? this._unpackMapWithSize(n.readUInt32(), n, o) : null
    }, gj.prototype._unpackMapWithSize = function (e, t, r) {
        for (var n = {}, o = 0; o < e; o++) n[this.unpack(t, r)] = this.unpack(t, r);
        return n
    }, gj.prototype._unpackStruct = function (e, t, r, n, o) {
        return 176 === t ? this._unpackStructWithSize(r, n, o) : 220 === e ? this._unpackStructWithSize(n.readUInt8(), n, o) : 221 === e ? this._unpackStructWithSize(n.readUInt16(), n, o) : null
    }, gj.prototype._unpackStructWithSize = function (e, t, r) {
        for (var n = t.readUInt8(), o = new yj.Structure(n, []), i = 0; i < e; i++) o.fields.push(this.unpack(t, r));
        return r(o)
    }, k.Unpacker = gj;
    var Oj, wj, $b = {}, ry = r && r.__extends || (Oj = function (e, t) {
            return (Oj = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
            })(e, t)
        }, function (e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

            function r() {
                this.constructor = e
            }

            Oj(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
        }), Ej = r && r.__createBinding || (Object.create ? function (e, t, r, n) {
            void 0 === n && (n = r);
            var o = Object.getOwnPropertyDescriptor(t, r);
            o && ("get" in o ? t.__esModule : !o.writable && !o.configurable) || (o = {
                enumerable: !0, get: function () {
                    return t[r]
                }
            }), Object.defineProperty(e, n, o)
        } : function (e, t, r, n) {
            e[n = void 0 === n ? r : n] = t[r]
        }), Pj = r && r.__setModuleDefault || (Object.create ? function (e, t) {
            Object.defineProperty(e, "default", {enumerable: !0, value: t})
        } : function (e, t) {
            e.default = t
        }), Ic = r && r.__importStar || function (e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e) for (var r in e) "default" !== r && Object.prototype.hasOwnProperty.call(e, r) && Ej(t, e, r);
            return Pj(t, e), t
        }, Ch = (Object.defineProperty($b, "__esModule", {value: !0}), $b.Unpacker = $b.Packer = void 0, Ic(k)),
        hy = (wj = Ch.Packer, ry(Sj, wj), Sj.prototype.disableByteArrays = function () {
            throw new Error("Bolt V2 should always support byte arrays")
        }, Sj);

    function Sj() {
        return null !== wj && wj.apply(this, arguments) || this
    }

    $b.Packer = hy;
    Tj = Ch.Unpacker, ry(jj, Tj);
    var Tj, vy = jj;

    function jj(e, t) {
        return Tj.call(this, e = void 0 === e ? !1 : e, t = void 0 === t ? !1 : t) || this
    }

    $b.Unpacker = vy;
    var Cj = r && r.__createBinding || (Object.create ? function (e, t, r, n) {
            void 0 === n && (n = r);
            var o = Object.getOwnPropertyDescriptor(t, r);
            o && ("get" in o ? t.__esModule : !o.writable && !o.configurable) || (o = {
                enumerable: !0, get: function () {
                    return t[r]
                }
            }), Object.defineProperty(e, n, o)
        } : function (e, t, r, n) {
            e[n = void 0 === n ? r : n] = t[r]
        }), Ij = r && r.__setModuleDefault || (Object.create ? function (e, t) {
            Object.defineProperty(e, "default", {enumerable: !0, value: t})
        } : function (e, t) {
            e.default = t
        }), Cy = r && r.__importStar || function (e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e) for (var r in e) "default" !== r && Object.prototype.hasOwnProperty.call(e, r) && Cj(t, e, r);
            return Ij(t, e), t
        }, pl = (Object.defineProperty(Bf, "__esModule", {value: !0}), Bf.structure = Bf.v2 = Bf.v1 = void 0, Cy(k)),
        Oy = (Bf.v1 = pl, Cy($b)), dl = (Bf.v2 = Oy, Cy(Kb)), wy = (Bf.structure = dl, Bf.default = Oy, {}),
        Rj = (Object.defineProperty(wy, "__esModule", {value: !0}), e), Sy = Rj.internal.constants,
        kj = Sy.ACCESS_MODE_READ, Aj = Sy.FETCH_ALL, Mj = Rj.internal.util.assertString,
        hl = (xj.init = function (e, t) {
            return new xj(1, [e, t], function () {
                return "INIT ".concat(e, " {...}")
            })
        }, xj.run = function (e, t) {
            return new xj(16, [e, t], function () {
                return "RUN ".concat(e, " ").concat(Rj.json.stringify(t))
            })
        }, xj.pullAll = function () {
            return Dj
        }, xj.reset = function () {
            return Lj
        }, xj.hello = function (e, t, r, n) {
            void 0 === r && (r = null), void 0 === n && (n = null);
            t = Object.assign({user_agent: e}, t);
            return r && (t.routing = r), n && (t.patch_bolt = n), new xj(1, [t], function () {
                return "HELLO {user_agent: '".concat(e, "', ...}")
            })
        }, xj.begin = function (e) {
            var e = void 0 === e ? {} : e, t = Nj(e.bookmarks, e.txConfig, e.database, e.mode, e.impersonatedUser);
            return new xj(17, [t], function () {
                return "BEGIN ".concat(Rj.json.stringify(t))
            })
        }, xj.commit = function () {
            return Bj
        }, xj.rollback = function () {
            return Fj
        }, xj.runWithMetadata = function (e, t, r) {
            var r = void 0 === r ? {} : r, n = Nj(r.bookmarks, r.txConfig, r.database, r.mode, r.impersonatedUser);
            return new xj(16, [e, t, n], function () {
                return "RUN ".concat(e, " ").concat(Rj.json.stringify(t), " ").concat(Rj.json.stringify(n))
            })
        }, xj.goodbye = function () {
            return Wj
        }, xj.pull = function (e) {
            var e = void 0 === e ? {} : e, t = e.stmtId, t = void 0 === t ? -1 : t, e = e.n,
                r = Uj(null == t ? -1 : t, (void 0 === e ? Aj : e) || Aj);
            return new xj(63, [r], function () {
                return "PULL ".concat(Rj.json.stringify(r))
            })
        }, xj.discard = function (e) {
            var e = void 0 === e ? {} : e, t = e.stmtId, t = void 0 === t ? -1 : t, e = e.n,
                r = Uj(null == t ? -1 : t, (void 0 === e ? Aj : e) || Aj);
            return new xj(47, [r], function () {
                return "DISCARD ".concat(Rj.json.stringify(r))
            })
        }, xj.route = function (e, t, r) {
            return new xj(102, [e = void 0 === e ? {} : e, t = void 0 === t ? [] : t, r = void 0 === r ? null : r], function () {
                return "ROUTE ".concat(Rj.json.stringify(e), " ").concat(Rj.json.stringify(t), " ").concat(r)
            })
        }, xj.routeV4x4 = function (e, t, r) {
            void 0 === e && (e = {}), void 0 === t && (t = []);
            var n = {};
            return (r = void 0 === r ? {} : r).databaseName && (n.db = r.databaseName), r.impersonatedUser && (n.imp_user = r.impersonatedUser), new xj(102, [e, t, n], function () {
                return "ROUTE ".concat(Rj.json.stringify(e), " ").concat(Rj.json.stringify(t), " ").concat(Rj.json.stringify(n))
            })
        }, xj);

    function xj(e, t, r) {
        this.signature = e, this.fields = t, this.toString = r
    }

    function Nj(e, t, r, n, o) {
        var i = {};
        return e.isEmpty() || (i.bookmarks = e.values()), null !== t.timeout && (i.tx_timeout = t.timeout), t.metadata && (i.tx_metadata = t.metadata), r && (i.db = Mj(r, "database")), o && (i.imp_user = Mj(o, "impersonatedUser")), n === kj && (i.mode = "r"), i
    }

    function Uj(e, t) {
        t = {n: (0, Rj.int)(t)};
        return -1 !== e && (t.qid = (0, Rj.int)(e)), t
    }

    var Dj = new (wy.default = hl)(63, [], function () {
            return "PULL_ALL"
        }), Lj = new hl(15, [], function () {
            return "RESET"
        }), Bj = new hl(18, [], function () {
            return "COMMIT"
        }), Fj = new hl(19, [], function () {
            return "ROLLBACK"
        }), Wj = new hl(2, [], function () {
            return "GOODBYE"
        }), By = {}, zy = {}, zj = (Object.defineProperty(zy, "__esModule", {value: !0}), zy.TypeTransformer = void 0, Bf),
        qj = e.internal.objectUtil;

    function Vj(e) {
        this._transformers = e, this._transformersPerSignature = new Map(e.map(function (e) {
            return [e.signature, e]
        })), this.fromStructure = this.fromStructure.bind(this), this.toStructure = this.toStructure.bind(this), Object.freeze(this)
    }

    function Hj(e) {
        var t = e.signature, r = e.fromStructure, n = e.toStructure, e = e.isTypeInstance;
        this.signature = t, this.isTypeInstance = e, this.fromStructure = r, this.toStructure = n, Object.freeze(this)
    }

    Vj.prototype.fromStructure = function (e) {
        try {
            return e instanceof zj.structure.Structure && this._transformersPerSignature.has(e.signature) ? (0, this._transformersPerSignature.get(e.signature).fromStructure)(e) : e
        } catch (e) {
            return qj.createBrokenObject(e)
        }
    }, Vj.prototype.toStructure = function (t) {
        var e = this._transformers.find(function (e) {
            return (0, e.isTypeInstance)(t)
        });
        return void 0 !== e ? e.toStructure(t) : t
    }, zy.default = Vj, Hj.prototype.extendsWith = function (e) {
        var t = e.signature, r = e.fromStructure, n = e.toStructure, e = e.isTypeInstance;
        return new Hj({
            signature: t || this.signature,
            fromStructure: r || this.fromStructure,
            toStructure: n || this.toStructure,
            isTypeInstance: e || this.isTypeInstance
        })
    }, zy.TypeTransformer = Hj;
    var Yj = r && r.__read || function (e, t) {
        var r = "function" == typeof Symbol && e[Symbol.iterator];
        if (!r) return e;
        var n, o, i = r.call(e), u = [];
        try {
            for (; (void 0 === t || 0 < t--) && !(n = i.next()).done;) u.push(n.value)
        } catch (e) {
            o = {error: e}
        } finally {
            try {
                n && !n.done && (r = i.return) && r.call(i)
            } finally {
                if (o) throw o.error
            }
        }
        return u
    }, Kj = (Object.defineProperty(By, "__esModule", {value: !0}), e), Gj = Bf, Zj = zy, Qj = Kj.error.PROTOCOL_ERROR;
    By.default = {
        createNodeTransformer: function () {
            return new Zj.TypeTransformer({
                signature: 78, isTypeInstance: function (e) {
                    return e instanceof Kj.Node
                }, toStructure: function (e) {
                    throw(0, Kj.newError)("It is not allowed to pass nodes in query parameters, given: ".concat(e), Qj)
                }, fromStructure: function (e) {
                    Gj.structure.verifyStructSize("Node", 3, e.size);
                    var e = Yj(e.fields, 3), t = e[0], r = e[1], e = e[2];
                    return new Kj.Node(t, r, e)
                }
            })
        }, createRelationshipTransformer: function () {
            return new Zj.TypeTransformer({
                signature: 82, isTypeInstance: function (e) {
                    return e instanceof Kj.Relationship
                }, toStructure: function (e) {
                    throw(0, Kj.newError)("It is not allowed to pass relationships in query parameters, given: ".concat(e), Qj)
                }, fromStructure: function (e) {
                    Gj.structure.verifyStructSize("Relationship", 5, e.size);
                    var e = Yj(e.fields, 5), t = e[0], r = e[1], n = e[2], o = e[3], e = e[4];
                    return new Kj.Relationship(t, r, n, o, e)
                }
            })
        }, createUnboundRelationshipTransformer: function () {
            return new Zj.TypeTransformer({
                signature: 114, isTypeInstance: function (e) {
                    return e instanceof Kj.UnboundRelationship
                }, toStructure: function (e) {
                    throw(0, Kj.newError)("It is not allowed to pass unbound relationships in query parameters, given: ".concat(e), Qj)
                }, fromStructure: function (e) {
                    Gj.structure.verifyStructSize("UnboundRelationship", 3, e.size);
                    var e = Yj(e.fields, 3), t = e[0], r = e[1], e = e[2];
                    return new Kj.UnboundRelationship(t, r, e)
                }
            })
        }, createPathTransformer: function () {
            return new Zj.TypeTransformer({
                signature: 80, isTypeInstance: function (e) {
                    return e instanceof Kj.Path
                }, toStructure: function (e) {
                    throw(0, Kj.newError)("It is not allowed to pass paths in query parameters, given: ".concat(e), Qj)
                }, fromStructure: function (e) {
                    Gj.structure.verifyStructSize("Path", 3, e.size);
                    for (var e = Yj(e.fields, 3), t = e[0], r = e[1], n = e[2], o = [], i = t[0], u = 0; u < n.length; u += 2) {
                        var a = t[n[u + 1]], s = (0, Kj.toNumber)(n[u]), c = void 0;
                        0 < s ? (c = r[s - 1]) instanceof Kj.UnboundRelationship && (r[s - 1] = c = c.bindTo(i, a)) : (c = r[-s - 1]) instanceof Kj.UnboundRelationship && (r[-s - 1] = c = c.bindTo(a, i)), o.push(new Kj.PathSegment(i, c, a)), i = a
                    }
                    return new Kj.Path(t[0], t[t.length - 1], o)
                }
            })
        }
    };
    var v = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        }, Xj = (Object.defineProperty($d, "__esModule", {value: !0}), ah), Jj = Bf, $j = v(wy), eC = R, Yy = e, tC = v(By),
        rC = v(zy), nC = Yy.internal.bookmarks.Bookmarks, Jy = Yy.internal.constants, oC = Jy.ACCESS_MODE_WRITE,
        iC = Jy.BOLT_PROTOCOL_V1, uC = (Yy.internal.logger.Logger, Yy.internal.txConfig.TxConfig),
        w = (Object.defineProperty(aC.prototype, "transformer", {
            get: function () {
                var t = this;
                return void 0 === this._transformer && (this._transformer = new rC.default(Object.values(tC.default).map(function (e) {
                    return e(t._config, t._log)
                }))), this._transformer
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(aC.prototype, "version", {
            get: function () {
                return iC
            }, enumerable: !1, configurable: !0
        }), aC.prototype.packer = function () {
            return this._packer
        }, aC.prototype.packable = function (e) {
            return this._packer.packable(e, this.transformer.toStructure)
        }, aC.prototype.unpacker = function () {
            return this._unpacker
        }, aC.prototype.unpack = function (e) {
            return this._unpacker.unpack(e, this.transformer.fromStructure)
        }, aC.prototype.transformMetadata = function (e) {
            return e
        }, aC.prototype.initialize = function (e) {
            var t = this, e = void 0 === e ? {} : e, r = e.userAgent, n = e.authToken, o = e.onError, i = e.onComplete,
                e = new eC.LoginObserver({
                    onError: function (e) {
                        return t._onLoginError(e, o)
                    }, onCompleted: function (e) {
                        return t._onLoginCompleted(e, i)
                    }
                });
            return this.write($j.default.init(r, n), e, !0), e
        }, aC.prototype.prepareToClose = function () {
        }, aC.prototype.beginTransaction = function (e) {
            var e = void 0 === e ? {} : e, t = e.bookmarks, r = e.txConfig, n = e.database, o = e.mode,
                i = e.impersonatedUser, u = e.beforeError, a = e.afterError, s = e.beforeComplete, e = e.afterComplete;
            return this.run("BEGIN", t ? t.asBeginTransactionParameters() : {}, {
                bookmarks: t,
                txConfig: r,
                database: n,
                mode: o,
                impersonatedUser: i,
                beforeError: u,
                afterError: a,
                beforeComplete: s,
                afterComplete: e,
                flush: !1
            })
        }, aC.prototype.commitTransaction = function (e) {
            var e = void 0 === e ? {} : e, t = e.beforeError, r = e.afterError, n = e.beforeComplete,
                e = e.afterComplete;
            return this.run("COMMIT", {}, {
                bookmarks: nC.empty(),
                txConfig: uC.empty(),
                mode: oC,
                beforeError: t,
                afterError: r,
                beforeComplete: n,
                afterComplete: e
            })
        }, aC.prototype.rollbackTransaction = function (e) {
            var e = void 0 === e ? {} : e, t = e.beforeError, r = e.afterError, n = e.beforeComplete,
                e = e.afterComplete;
            return this.run("ROLLBACK", {}, {
                bookmarks: nC.empty(),
                txConfig: uC.empty(),
                mode: oC,
                beforeError: t,
                afterError: r,
                beforeComplete: n,
                afterComplete: e
            })
        }, aC.prototype.run = function (e, t, r) {
            var r = void 0 === r ? {} : r, n = (r.bookmarks, r.txConfig), o = r.database,
                i = (r.mode, r.impersonatedUser), u = r.beforeKeys, a = r.afterKeys, s = r.beforeError,
                c = r.afterError, l = r.beforeComplete, f = r.afterComplete, p = r.flush, p = void 0 === p || p,
                d = r.highRecordWatermark, d = void 0 === d ? Number.MAX_VALUE : d, r = r.lowRecordWatermark,
                r = void 0 === r ? Number.MAX_VALUE : r, u = new eC.ResultStreamObserver({
                    server: this._server,
                    beforeKeys: u,
                    afterKeys: a,
                    beforeError: s,
                    afterError: c,
                    beforeComplete: l,
                    afterComplete: f,
                    highRecordWatermark: d,
                    lowRecordWatermark: r
                });
            return (0, Xj.assertTxConfigIsEmpty)(n, this._onProtocolError, u), (0, Xj.assertDatabaseIsEmpty)(o, this._onProtocolError, u), (0, Xj.assertImpersonatedUserIsEmpty)(i, this._onProtocolError, u), this.write($j.default.run(e, t), u, !1), this.write($j.default.pullAll(), u, p), u
        }, Object.defineProperty(aC.prototype, "currentFailure", {
            get: function () {
                return this._responseHandler.currentFailure
            }, enumerable: !1, configurable: !0
        }), aC.prototype.reset = function (e) {
            var e = void 0 === e ? {} : e, t = e.onError, e = e.onComplete,
                t = new eC.ResetObserver({onProtocolError: this._onProtocolError, onError: t, onComplete: e});
            return this.write($j.default.reset(), t, !0), t
        }, aC.prototype._createPacker = function (e) {
            return new Jj.v1.Packer(e)
        }, aC.prototype._createUnpacker = function (e, t) {
            return new Jj.v1.Unpacker(e, t)
        }, aC.prototype.write = function (e, t, r) {
            this.queueObserverIfProtocolIsNotBroken(t) && (this._log.isDebugEnabled() && this._log.debug("C: ".concat(e)), this._lastMessageSignature = e.signature, t = new Jj.structure.Structure(e.signature, e.fields), this.packable(t)(), this._chunker.messageBoundary(), r && this._chunker.flush())
        }, aC.prototype.isLastMessageLogin = function () {
            return 1 === this._lastMessageSignature
        }, aC.prototype.isLastMessageReset = function () {
            return 15 === this._lastMessageSignature
        }, aC.prototype.notifyFatalError = function (e) {
            return this._fatalError = e, this._responseHandler._notifyErrorToObservers(e)
        }, aC.prototype.updateCurrentObserver = function () {
            return this._responseHandler._updateCurrentObserver()
        }, aC.prototype.hasOngoingObservableRequests = function () {
            return this._responseHandler.hasOngoingObservableRequests()
        }, aC.prototype.queueObserverIfProtocolIsNotBroken = function (e) {
            return this.isBroken() ? (this.notifyFatalErrorToObserver(e), !1) : this._responseHandler._queueObserver(e)
        }, aC.prototype.isBroken = function () {
            return !!this._fatalError
        }, aC.prototype.notifyFatalErrorToObserver = function (e) {
            e && e.onError && e.onError(this._fatalError)
        }, aC.prototype.resetFailure = function () {
            this._responseHandler._resetFailure()
        }, aC.prototype._onLoginCompleted = function (e, t) {
            var r;
            e && (r = e.server, this._server.version || (this._server.version = r)), t && t(e)
        }, aC.prototype._onLoginError = function (e, t) {
            this._onProtocolError(e.message), t && t(e)
        }, aC);

    function aC(e, t, r, n, o, i) {
        var r = void 0 === r ? {} : r, u = r.disableLosslessIntegers, r = r.useBigInt;
        void 0 === n && (n = function () {
            return null
        }), this._server = e || {}, this._chunker = t, this._packer = this._createPacker(t), this._unpacker = this._createUnpacker(u, r), this._responseHandler = n(this), this._log = o, this._onProtocolError = i, this._fatalError = null, this._lastMessageSignature = null, this._config = {
            disableLosslessIntegers: u,
            useBigInt: r
        }
    }

    $d.default = w;
    var t_ = {}, n_ = {}, a_ = {},
        sC = (Object.defineProperty(a_, "__esModule", {value: !0}), a_.epochSecondAndNanoToLocalDateTime = a_.nanoOfDayToLocalTime = a_.epochDayToDate = void 0, e),
        l_ = sC.internal.temporalUtil, cC = l_.DAYS_0000_TO_1970, lC = l_.DAYS_PER_400_YEAR_CYCLE,
        fC = l_.NANOS_PER_HOUR, pC = l_.NANOS_PER_MINUTE, dC = l_.NANOS_PER_SECOND, hC = l_.SECONDS_PER_DAY,
        bC = l_.floorDiv, yC = l_.floorMod;

    function _C(e) {
        var e = (e = (0, sC.int)(e)).add(cC).subtract(60), t = (0, sC.int)(0),
            r = (e.lessThan(0) && (t = (r = e.add(1).div(lC).subtract(1)).multiply(400), e = e.add(r.multiply(-lC))), e.multiply(400).add(591).div(lC)),
            n = e.subtract(r.multiply(365).add(r.div(4)).subtract(r.div(100)).add(r.div(400))),
            e = (n.lessThan(0) && (r = r.subtract(1), n = e.subtract(r.multiply(365).add(r.div(4)).subtract(r.div(100)).add(r.div(400)))), r = r.add(t), n),
            t = e.multiply(5).add(2).div(153), n = t.add(2).modulo(12).add(1),
            e = e.subtract(t.multiply(306).add(5).div(10)).add(1), r = r.add(t.div(10));
        return new sC.Date(r, n, e)
    }

    function vC(e) {
        var t = (e = (0, sC.int)(e)).div(fC), r = (e = e.subtract(t.multiply(fC))).div(pC),
            n = (e = e.subtract(r.multiply(pC))).div(dC), e = e.subtract(n.multiply(dC));
        return new sC.LocalTime(t, r, n, e)
    }

    a_.epochDayToDate = _C, a_.nanoOfDayToLocalTime = vC, a_.epochSecondAndNanoToLocalDateTime = function (e, t) {
        var r = bC(e, hC), e = yC(e, hC).multiply(dC).add(t), t = _C(r), r = vC(e);
        return new sC.LocalDateTime(t.year, t.month, t.day, r.hour, r.minute, r.second, r.nanosecond)
    };
    var mC = r && r.__assign || function () {
            return (mC = Object.assign || function (e) {
                for (var t, r = 1, n = arguments.length; r < n; r++) for (var o in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }).apply(this, arguments)
        }, gC = r && r.__read || function (e, t) {
            var r = "function" == typeof Symbol && e[Symbol.iterator];
            if (!r) return e;
            var n, o, i = r.call(e), u = [];
            try {
                for (; (void 0 === t || 0 < t--) && !(n = i.next()).done;) u.push(n.value)
            } catch (e) {
                o = {error: e}
            } finally {
                try {
                    n && !n.done && (r = i.return) && r.call(i)
                } finally {
                    if (o) throw o.error
                }
            }
            return u
        }, d_ = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        }, OC = (Object.defineProperty(n_, "__esModule", {value: !0}), e), wC = Bf, EC = zy, PC = a_, jr = d_(By),
        __ = OC.internal.temporalUtil, SC = __.dateToEpochDay, TC = __.localDateTimeToEpochSecond,
        jC = __.localTimeToNanoOfDay;

    function CC(e, t, r) {
        if (!t && !r) return e;
        var n, o, i, u = Object.create(Object.getPrototypeOf(e));
        for (n in e) !0 === Object.prototype.hasOwnProperty.call(e, n) && (o = e[n], u[n] = (0, OC.isInt)(o) ? (i = o, r ? i.toBigInt() : i.toNumberOrInfinity()) : o);
        return Object.freeze(u), u
    }

    n_.default = mC(mC({}, jr.default), {
        createPoint2DTransformer: function () {
            return new EC.TypeTransformer({
                signature: 88, isTypeInstance: function (e) {
                    return (0, OC.isPoint)(e) && (null === e.z || void 0 === e.z)
                }, toStructure: function (e) {
                    return new wC.structure.Structure(88, [(0, OC.int)(e.srid), e.x, e.y])
                }, fromStructure: function (e) {
                    wC.structure.verifyStructSize("Point2D", 3, e.size);
                    var e = gC(e.fields, 3), t = e[0], r = e[1], e = e[2];
                    return new OC.Point(t, r, e, void 0)
                }
            })
        }, createPoint3DTransformer: function () {
            return new EC.TypeTransformer({
                signature: 89, isTypeInstance: function (e) {
                    return (0, OC.isPoint)(e) && null !== e.z && void 0 !== e.z
                }, toStructure: function (e) {
                    return new wC.structure.Structure(89, [(0, OC.int)(e.srid), e.x, e.y, e.z])
                }, fromStructure: function (e) {
                    wC.structure.verifyStructSize("Point3D", 4, e.size);
                    var e = gC(e.fields, 4), t = e[0], r = e[1], n = e[2], e = e[3];
                    return new OC.Point(t, r, n, e)
                }
            })
        }, createDurationTransformer: function () {
            return new EC.TypeTransformer({
                signature: 69, isTypeInstance: OC.isDuration, toStructure: function (e) {
                    var t = (0, OC.int)(e.months), r = (0, OC.int)(e.days), n = (0, OC.int)(e.seconds),
                        e = (0, OC.int)(e.nanoseconds);
                    return new wC.structure.Structure(69, [t, r, n, e])
                }, fromStructure: function (e) {
                    wC.structure.verifyStructSize("Duration", 4, e.size);
                    var e = gC(e.fields, 4), t = e[0], r = e[1], n = e[2], e = e[3];
                    return new OC.Duration(t, r, n, e)
                }
            })
        }, createLocalTimeTransformer: function (e) {
            var t = e.disableLosslessIntegers, r = e.useBigInt;
            return new EC.TypeTransformer({
                signature: 116, isTypeInstance: OC.isLocalTime, toStructure: function (e) {
                    e = jC(e.hour, e.minute, e.second, e.nanosecond);
                    return new wC.structure.Structure(116, [e])
                }, fromStructure: function (e) {
                    wC.structure.verifyStructSize("LocalTime", 1, e.size);
                    e = gC(e.fields, 1)[0];
                    return CC((0, PC.nanoOfDayToLocalTime)(e), t, r)
                }
            })
        }, createTimeTransformer: function (e) {
            var r = e.disableLosslessIntegers, n = e.useBigInt;
            return new EC.TypeTransformer({
                signature: 84, isTypeInstance: OC.isTime, toStructure: function (e) {
                    var t = jC(e.hour, e.minute, e.second, e.nanosecond), e = (0, OC.int)(e.timeZoneOffsetSeconds);
                    return new wC.structure.Structure(84, [t, e])
                }, fromStructure: function (e) {
                    wC.structure.verifyStructSize("Time", 2, e.size);
                    var e = gC(e.fields, 2), t = e[0], e = e[1], t = (0, PC.nanoOfDayToLocalTime)(t);
                    return CC(new OC.Time(t.hour, t.minute, t.second, t.nanosecond, e), r, n)
                }
            })
        }, createDateTransformer: function (e) {
            var t = e.disableLosslessIntegers, r = e.useBigInt;
            return new EC.TypeTransformer({
                signature: 68, isTypeInstance: OC.isDate, toStructure: function (e) {
                    e = SC(e.year, e.month, e.day);
                    return new wC.structure.Structure(68, [e])
                }, fromStructure: function (e) {
                    wC.structure.verifyStructSize("Date", 1, e.size);
                    e = gC(e.fields, 1)[0];
                    return CC((0, PC.epochDayToDate)(e), t, r)
                }
            })
        }, createLocalDateTimeTransformer: function (e) {
            var r = e.disableLosslessIntegers, n = e.useBigInt;
            return new EC.TypeTransformer({
                signature: 100,
                isTypeInstance: OC.isLocalDateTime,
                toStructure: function (e) {
                    var t = TC(e.year, e.month, e.day, e.hour, e.minute, e.second, e.nanosecond),
                        e = (0, OC.int)(e.nanosecond);
                    return new wC.structure.Structure(100, [t, e])
                },
                fromStructure: function (e) {
                    wC.structure.verifyStructSize("LocalDateTime", 2, e.size);
                    var e = gC(e.fields, 2), t = e[0], e = e[1];
                    return CC((0, PC.epochSecondAndNanoToLocalDateTime)(t, e), r, n)
                }
            })
        }, createDateTimeWithZoneIdTransformer: function (e) {
            var n = e.disableLosslessIntegers, o = e.useBigInt;
            return new EC.TypeTransformer({
                signature: 102, isTypeInstance: function (e) {
                    return (0, OC.isDateTime)(e) && null != e.timeZoneId
                }, toStructure: function (e) {
                    var t = TC(e.year, e.month, e.day, e.hour, e.minute, e.second, e.nanosecond),
                        r = (0, OC.int)(e.nanosecond), e = e.timeZoneId;
                    return new wC.structure.Structure(102, [t, r, e])
                }, fromStructure: function (e) {
                    wC.structure.verifyStructSize("DateTimeWithZoneId", 3, e.size);
                    var e = gC(e.fields, 3), t = e[0], r = e[1], e = e[2],
                        t = (0, PC.epochSecondAndNanoToLocalDateTime)(t, r);
                    return CC(new OC.DateTime(t.year, t.month, t.day, t.hour, t.minute, t.second, t.nanosecond, null, e), n, o)
                }
            })
        }, createDateTimeWithOffsetTransformer: function (e) {
            var n = e.disableLosslessIntegers, o = e.useBigInt;
            return new EC.TypeTransformer({
                signature: 70, isTypeInstance: function (e) {
                    return (0, OC.isDateTime)(e) && null == e.timeZoneId
                }, toStructure: function (e) {
                    var t = TC(e.year, e.month, e.day, e.hour, e.minute, e.second, e.nanosecond),
                        r = (0, OC.int)(e.nanosecond), e = (0, OC.int)(e.timeZoneOffsetSeconds);
                    return new wC.structure.Structure(70, [t, r, e])
                }, fromStructure: function (e) {
                    wC.structure.verifyStructSize("DateTimeWithZoneOffset", 3, e.size);
                    var e = gC(e.fields, 3), t = e[0], r = e[1], e = e[2],
                        t = (0, PC.epochSecondAndNanoToLocalDateTime)(t, r);
                    return CC(new OC.DateTime(t.year, t.month, t.day, t.hour, t.minute, t.second, t.nanosecond, e, null), n, o)
                }
            })
        }
    });
    var IC, RC, ad = r && r.__extends || (IC = function (e, t) {
            return (IC = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
            })(e, t)
        }, function (e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

            function r() {
                this.constructor = e
            }

            IC(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
        }), E_ = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        }, I_ = (Object.defineProperty(t_, "__esModule", {value: !0}), E_($d)), kC = E_(Bf), x_ = e, AC = E_(n_),
        MC = E_(zy), xC = x_.internal.constants.BOLT_PROTOCOL_V2,
        F_ = (RC = I_.default, ad(NC, RC), NC.prototype._createPacker = function (e) {
            return new kC.default.Packer(e)
        }, NC.prototype._createUnpacker = function (e, t) {
            return new kC.default.Unpacker(e, t)
        }, Object.defineProperty(NC.prototype, "transformer", {
            get: function () {
                var t = this;
                return void 0 === this._transformer && (this._transformer = new MC.default(Object.values(AC.default).map(function (e) {
                    return e(t._config, t._log)
                }))), this._transformer
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(NC.prototype, "version", {
            get: function () {
                return xC
            }, enumerable: !1, configurable: !0
        }), NC);

    function NC() {
        return null !== RC && RC.apply(this, arguments) || this
    }

    t_.default = F_;
    var UC, DC, E = {}, H_ = {}, LC = r && r.__assign || function () {
            return (LC = Object.assign || function (e) {
                for (var t, r = 1, n = arguments.length; r < n; r++) for (var o in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }).apply(this, arguments)
        }, Q_ = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        }, ev = (Object.defineProperty(H_, "__esModule", {value: !0}), Q_(n_)),
        sd = (H_.default = LC({}, ev.default), r && r.__extends || (UC = function (e, t) {
            return (UC = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
            })(e, t)
        }, function (e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

            function r() {
                this.constructor = e
            }

            UC(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
        })), BC = r && r.__assign || function () {
            return (BC = Object.assign || function (e) {
                for (var t, r = 1, n = arguments.length; r < n; r++) for (var o in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }).apply(this, arguments)
        }, av = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        }, bv = (Object.defineProperty(E, "__esModule", {value: !0}), av(t_)), FC = av(wy), WC = ah, zC = R, qC = av(H_),
        VC = av(zy), HC = (e.internal.bookmarks.Bookmarks, e.internal.constants.BOLT_PROTOCOL_V3),
        YC = e.internal.txConfig.TxConfig, KC = "context",
        GC = "CALL dbms.cluster.routing.getRoutingTable($".concat(KC, ")"), ZC = new zC.StreamObserver,
        vv = (DC = bv.default, sd(QC, DC), Object.defineProperty(QC.prototype, "version", {
            get: function () {
                return HC
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(QC.prototype, "transformer", {
            get: function () {
                var t = this;
                return void 0 === this._transformer && (this._transformer = new VC.default(Object.values(qC.default).map(function (e) {
                    return e(t._config, t._log)
                }))), this._transformer
            }, enumerable: !1, configurable: !0
        }), QC.prototype.transformMetadata = function (e) {
            return "t_first" in e && (e.result_available_after = e.t_first, delete e.t_first), "t_last" in e && (e.result_consumed_after = e.t_last, delete e.t_last), e
        }, QC.prototype.initialize = function (e) {
            var t = this, e = void 0 === e ? {} : e, r = e.userAgent, n = e.authToken, o = e.onError, i = e.onComplete,
                e = new zC.LoginObserver({
                    onError: function (e) {
                        return t._onLoginError(e, o)
                    }, onCompleted: function (e) {
                        return t._onLoginCompleted(e, i)
                    }
                });
            return this.write(FC.default.hello(r, n), e, !0), e
        }, QC.prototype.prepareToClose = function () {
            this.write(FC.default.goodbye(), ZC, !0)
        }, QC.prototype.beginTransaction = function (e) {
            var e = void 0 === e ? {} : e, t = e.bookmarks, r = e.txConfig, n = e.database, o = e.impersonatedUser,
                i = e.mode, u = e.beforeError, a = e.afterError, s = e.beforeComplete, e = e.afterComplete,
                u = new zC.ResultStreamObserver({
                    server: this._server,
                    beforeError: u,
                    afterError: a,
                    beforeComplete: s,
                    afterComplete: e
                });
            return u.prepareToHandleSingleResponse(), (0, WC.assertDatabaseIsEmpty)(n, this._onProtocolError, u), (0, WC.assertImpersonatedUserIsEmpty)(o, this._onProtocolError, u), this.write(FC.default.begin({
                bookmarks: t,
                txConfig: r,
                mode: i
            }), u, !0), u
        }, QC.prototype.commitTransaction = function (e) {
            var e = void 0 === e ? {} : e, t = e.beforeError, r = e.afterError, n = e.beforeComplete,
                e = e.afterComplete, t = new zC.ResultStreamObserver({
                    server: this._server,
                    beforeError: t,
                    afterError: r,
                    beforeComplete: n,
                    afterComplete: e
                });
            return t.prepareToHandleSingleResponse(), this.write(FC.default.commit(), t, !0), t
        }, QC.prototype.rollbackTransaction = function (e) {
            var e = void 0 === e ? {} : e, t = e.beforeError, r = e.afterError, n = e.beforeComplete,
                e = e.afterComplete, t = new zC.ResultStreamObserver({
                    server: this._server,
                    beforeError: t,
                    afterError: r,
                    beforeComplete: n,
                    afterComplete: e
                });
            return t.prepareToHandleSingleResponse(), this.write(FC.default.rollback(), t, !0), t
        }, QC.prototype.run = function (e, t, r) {
            var r = void 0 === r ? {} : r, n = r.bookmarks, o = r.txConfig, i = r.database, u = r.impersonatedUser,
                a = r.mode, s = r.beforeKeys, c = r.afterKeys, l = r.beforeError, f = r.afterError,
                p = r.beforeComplete, d = r.afterComplete, h = r.flush, h = void 0 === h || h,
                b = r.highRecordWatermark, b = void 0 === b ? Number.MAX_VALUE : b, r = r.lowRecordWatermark,
                r = void 0 === r ? Number.MAX_VALUE : r, s = new zC.ResultStreamObserver({
                    server: this._server,
                    beforeKeys: s,
                    afterKeys: c,
                    beforeError: l,
                    afterError: f,
                    beforeComplete: p,
                    afterComplete: d,
                    highRecordWatermark: b,
                    lowRecordWatermark: r
                });
            return (0, WC.assertDatabaseIsEmpty)(i, this._onProtocolError, s), (0, WC.assertImpersonatedUserIsEmpty)(u, this._onProtocolError, s), this.write(FC.default.runWithMetadata(e, t, {
                bookmarks: n,
                txConfig: o,
                mode: a
            }), s, !1), this.write(FC.default.pullAll(), s, h), s
        }, QC.prototype.requestRoutingInformation = function (e) {
            var t, r = e.routingContext, n = e.sessionContext, n = void 0 === n ? {} : n, o = e.onError,
                e = e.onCompleted,
                r = this.run(GC, ((t = {})[KC] = void 0 === r ? {} : r, t), BC(BC({}, n), {txConfig: YC.empty()}));
            return new zC.ProcedureRouteObserver({
                resultObserver: r,
                onProtocolError: this._onProtocolError,
                onError: o,
                onCompleted: e
            })
        }, QC);

    function QC() {
        return null !== DC && DC.apply(this, arguments) || this
    }

    E.default = vv;
    var XC, JC, Pv = {}, Tv = {}, $C = r && r.__assign || function () {
            return ($C = Object.assign || function (e) {
                for (var t, r = 1, n = arguments.length; r < n; r++) for (var o in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }).apply(this, arguments)
        }, Rv = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        }, Nv = (Object.defineProperty(Tv, "__esModule", {value: !0}), Rv(H_)),
        Lv = (Tv.default = $C({}, Nv.default), r && r.__extends || (XC = function (e, t) {
            return (XC = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
            })(e, t)
        }, function (e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

            function r() {
                this.constructor = e
            }

            XC(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
        })), eI = r && r.__assign || function () {
            return (eI = Object.assign || function (e) {
                for (var t, r = 1, n = arguments.length; r < n; r++) for (var o in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }).apply(this, arguments)
        }, Es = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        }, zv = (Object.defineProperty(Pv, "__esModule", {value: !0}), Es(E)), tI = Es(wy), rI = ah, nI = R, oI = Es(Tv),
        iI = Es(zy), qv = (e.internal.bookmarks.Bookmarks, e.internal.constants), uI = qv.BOLT_PROTOCOL_V4_0,
        aI = qv.FETCH_ALL, sI = e.internal.txConfig.TxConfig, cI = "context", lI = "database",
        fI = "CALL dbms.routing.getRoutingTable($".concat(cI, ", $").concat(lI, ")"),
        Zv = (JC = zv.default, Lv(pI, JC), Object.defineProperty(pI.prototype, "version", {
            get: function () {
                return uI
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(pI.prototype, "transformer", {
            get: function () {
                var t = this;
                return void 0 === this._transformer && (this._transformer = new iI.default(Object.values(oI.default).map(function (e) {
                    return e(t._config, t._log)
                }))), this._transformer
            }, enumerable: !1, configurable: !0
        }), pI.prototype.beginTransaction = function (e) {
            var e = void 0 === e ? {} : e, t = e.bookmarks, r = e.txConfig, n = e.database, o = e.impersonatedUser,
                i = e.mode, u = e.beforeError, a = e.afterError, s = e.beforeComplete, e = e.afterComplete,
                u = new nI.ResultStreamObserver({
                    server: this._server,
                    beforeError: u,
                    afterError: a,
                    beforeComplete: s,
                    afterComplete: e
                });
            return u.prepareToHandleSingleResponse(), (0, rI.assertImpersonatedUserIsEmpty)(o, this._onProtocolError, u), this.write(tI.default.begin({
                bookmarks: t,
                txConfig: r,
                database: n,
                mode: i
            }), u, !0), u
        }, pI.prototype.run = function (e, t, r) {
            var r = void 0 === r ? {} : r, n = r.bookmarks, o = r.txConfig, i = r.database, u = r.impersonatedUser,
                a = r.mode, s = r.beforeKeys, c = r.afterKeys, l = r.beforeError, f = r.afterError,
                p = r.beforeComplete, d = r.afterComplete, h = r.flush, h = void 0 === h || h, b = r.reactive,
                b = void 0 !== b && b, y = r.fetchSize, y = void 0 === y ? aI : y, _ = r.highRecordWatermark,
                _ = void 0 === _ ? Number.MAX_VALUE : _, r = r.lowRecordWatermark,
                r = void 0 === r ? Number.MAX_VALUE : r, s = new nI.ResultStreamObserver({
                    server: this._server,
                    reactive: b,
                    fetchSize: y,
                    moreFunction: this._requestMore.bind(this),
                    discardFunction: this._requestDiscard.bind(this),
                    beforeKeys: s,
                    afterKeys: c,
                    beforeError: l,
                    afterError: f,
                    beforeComplete: p,
                    afterComplete: d,
                    highRecordWatermark: _,
                    lowRecordWatermark: r
                }), c = ((0, rI.assertImpersonatedUserIsEmpty)(u, this._onProtocolError, s), b);
            return this.write(tI.default.runWithMetadata(e, t, {
                bookmarks: n,
                txConfig: o,
                database: i,
                mode: a
            }), s, c && h), b || this.write(tI.default.pull({n: y}), s, h), s
        }, pI.prototype._requestMore = function (e, t, r) {
            this.write(tI.default.pull({stmtId: e, n: t}), r, !0)
        }, pI.prototype._requestDiscard = function (e, t) {
            this.write(tI.default.discard({stmtId: e}), t, !0)
        }, pI.prototype._noOp = function () {
        }, pI.prototype.requestRoutingInformation = function (e) {
            var t, r = e.routingContext, n = e.databaseName, n = void 0 === n ? null : n, o = e.sessionContext,
                o = void 0 === o ? {} : o, i = e.onError, e = e.onCompleted,
                r = this.run(fI, ((t = {})[cI] = void 0 === r ? {} : r, t[lI] = n, t), eI(eI({}, o), {txConfig: sI.empty()}));
            return new nI.ProcedureRouteObserver({
                resultObserver: r,
                onProtocolError: this._onProtocolError,
                onError: i,
                onCompleted: e
            })
        }, pI);

    function pI() {
        return null !== JC && JC.apply(this, arguments) || this
    }

    Pv.default = Zv;
    var dI, hI, Jv = {}, gh = {}, bI = r && r.__assign || function () {
            return (bI = Object.assign || function (e) {
                for (var t, r = 1, n = arguments.length; r < n; r++) for (var o in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }).apply(this, arguments)
        }, ny = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        }, tm = (Object.defineProperty(gh, "__esModule", {value: !0}), ny(Tv)),
        um = (gh.default = bI({}, tm.default), r && r.__extends || (dI = function (e, t) {
            return (dI = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
            })(e, t)
        }, function (e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

            function r() {
                this.constructor = e
            }

            dI(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
        })), cm = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        }, g = (Object.defineProperty(Jv, "__esModule", {value: !0}), cm(Pv)), yI = cm(wy), _I = R, vm = e, vI = cm(gh),
        mI = cm(zy), gI = vm.internal.constants.BOLT_PROTOCOL_V4_1,
        rb = (hI = g.default, um(OI, hI), Object.defineProperty(OI.prototype, "version", {
            get: function () {
                return gI
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(OI.prototype, "transformer", {
            get: function () {
                var t = this;
                return void 0 === this._transformer && (this._transformer = new mI.default(Object.values(vI.default).map(function (e) {
                    return e(t._config, t._log)
                }))), this._transformer
            }, enumerable: !1, configurable: !0
        }), OI.prototype.initialize = function (e) {
            var t = this, e = void 0 === e ? {} : e, r = e.userAgent, n = e.authToken, o = e.onError, i = e.onComplete,
                e = new _I.LoginObserver({
                    onError: function (e) {
                        return t._onLoginError(e, o)
                    }, onCompleted: function (e) {
                        return t._onLoginCompleted(e, i)
                    }
                });
            return this.write(yI.default.hello(r, n, this._serversideRouting), e, !0), e
        }, OI);

    function OI(e, t, r, n, o, i, u) {
        e = hI.call(this, e, t, r, n = void 0 === n ? function () {
            return null
        } : n, o, i) || this;
        return e._serversideRouting = u, e
    }

    Jv.default = rb;
    var wI, EI, wm = {}, Ka = {}, PI = r && r.__assign || function () {
            return (PI = Object.assign || function (e) {
                for (var t, r = 1, n = arguments.length; r < n; r++) for (var o in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }).apply(this, arguments)
        }, jm = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        }, As = (Object.defineProperty(Ka, "__esModule", {value: !0}), jm(gh)),
        ud = (Ka.default = PI({}, As.default), r && r.__extends || (wI = function (e, t) {
            return (wI = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
            })(e, t)
        }, function (e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

            function r() {
                this.constructor = e
            }

            wI(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
        })), h = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        }, Lm = (Object.defineProperty(wm, "__esModule", {value: !0}), h(Jv)), qm = e, SI = h(Ka), TI = h(zy),
        jI = qm.internal.constants.BOLT_PROTOCOL_V4_2,
        ms = (EI = Lm.default, ud(CI, EI), Object.defineProperty(CI.prototype, "version", {
            get: function () {
                return jI
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(CI.prototype, "transformer", {
            get: function () {
                var t = this;
                return void 0 === this._transformer && (this._transformer = new TI.default(Object.values(SI.default).map(function (e) {
                    return e(t._config, t._log)
                }))), this._transformer
            }, enumerable: !1, configurable: !0
        }), CI);

    function CI() {
        return null !== EI && EI.apply(this, arguments) || this
    }

    wm.default = ms;
    var y = {}, l0 = {}, II = r && r.__assign || function () {
            return (II = Object.assign || function (e) {
                for (var t, r = 1, n = arguments.length; r < n; r++) for (var o in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }).apply(this, arguments)
        }, T = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        }, O = (Object.defineProperty(l0, "__esModule", {value: !0}), T(Ka)), C = (l0.default = II({}, O.default), {}),
        n = {}, RI = r && r.__assign || function () {
            return (RI = Object.assign || function (e) {
                for (var t, r = 1, n = arguments.length; r < n; r++) for (var o in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }).apply(this, arguments)
        }, b = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        }, yu = (Object.defineProperty(n, "__esModule", {value: !0}), b(l0)),
        kI = (n.default = RI({}, yu.default), r && r.__read || function (e, t) {
            var r = "function" == typeof Symbol && e[Symbol.iterator];
            if (!r) return e;
            var n, o, i = r.call(e), u = [];
            try {
                for (; (void 0 === t || 0 < t--) && !(n = i.next()).done;) u.push(n.value)
            } catch (e) {
                o = {error: e}
            } finally {
                try {
                    n && !n.done && (r = i.return) && r.call(i)
                } finally {
                    if (o) throw o.error
                }
            }
            return u
        }), lr = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        }, AI = (Object.defineProperty(C, "__esModule", {value: !0}), Bf), MI = e, xI = lr(n), NI = a_, UI = Db,
        DI = MI.internal.temporalUtil.localDateTimeToEpochSecond;

    function LI(e, t, r) {
        e = new Intl.DateTimeFormat("en-US", {
            timeZone: e,
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: !1,
            era: "narrow"
        }), r = (0, MI.int)(t).multiply(1e3).add((0, MI.int)(r).div(1e6)).toNumber(), e = e.formatToParts(r).reduce(function (e, t) {
            return "era" === t.type ? e.adjustEra = "B" === t.value.toUpperCase() ? function (e) {
                return e.subtract(1).negate()
            } : UI.identity : "literal" !== t.type && (e[t.type] = (0, MI.int)(t.value)), e
        }, {}), e.year = e.adjustEra(e.year), r = DI(e.year, e.month, e.day, e.hour, e.minute, e.second, e.nanosecond);
        return e.timeZoneOffsetSeconds = r.subtract(t), e.hour = e.hour.modulo(24), e
    }

    function BI(e, t, r) {
        if (!t && !r) return e;
        var n, o, i, u = Object.create(Object.getPrototypeOf(e));
        for (n in e) !0 === Object.prototype.hasOwnProperty.call(e, n) && (o = e[n], u[n] = (0, MI.isInt)(o) ? (i = o, r ? i.toBigInt() : i.toNumberOrInfinity()) : o);
        return Object.freeze(u), u
    }

    C.default = {
        createDateTimeWithZoneIdTransformer: function (e, u) {
            var n = e.disableLosslessIntegers, o = e.useBigInt;
            return xI.default.createDateTimeWithZoneIdTransformer(e).extendsWith({
                signature: 105,
                fromStructure: function (e) {
                    AI.structure.verifyStructSize("DateTimeWithZoneId", 3, e.size);
                    var e = kI(e.fields, 3), t = e[0], r = e[1], e = e[2], t = LI(e, t, r);
                    return BI(new MI.DateTime(t.year, t.month, t.day, t.hour, t.minute, t.second, (0, MI.int)(r), t.timeZoneOffsetSeconds, e), n, o)
                },
                toStructure: function (e) {
                    var t = DI(e.year, e.month, e.day, e.hour, e.minute, e.second, e.nanosecond),
                        r = null != e.timeZoneOffsetSeconds ? e.timeZoneOffsetSeconds : (r = e.timeZoneId, i = t, o = e.nanosecond, n = LI(r, i, o), n = DI(n.year, n.month, n.day, n.hour, n.minute, n.second, o).subtract(i), i = i.subtract(n), n = LI(r, i, o), DI(n.year, n.month, n.day, n.hour, n.minute, n.second, o).subtract(i)),
                        n = (null == e.timeZoneOffsetSeconds && u.warn('DateTime objects without "timeZoneOffsetSeconds" property are prune to bugs related to ambiguous times. For instance, 2022-10-30T2:30:00[Europe/Berlin] could be GMT+1 or GMT+2.'), t.subtract(r)),
                        o = (0, MI.int)(e.nanosecond), i = e.timeZoneId;
                    return new AI.structure.Structure(105, [n, o, i])
                }
            })
        }, createDateTimeWithOffsetTransformer: function (e) {
            var n = e.disableLosslessIntegers, o = e.useBigInt;
            return xI.default.createDateTimeWithOffsetTransformer(e).extendsWith({
                signature: 73,
                toStructure: function (e) {
                    var t = DI(e.year, e.month, e.day, e.hour, e.minute, e.second, e.nanosecond),
                        r = (0, MI.int)(e.nanosecond), e = (0, MI.int)(e.timeZoneOffsetSeconds), t = t.subtract(e);
                    return new AI.structure.Structure(73, [t, r, e])
                },
                fromStructure: function (e) {
                    AI.structure.verifyStructSize("DateTimeWithZoneOffset", 3, e.size);
                    var e = kI(e.fields, 3), t = e[0], r = e[1], e = e[2], t = (0, MI.int)(t).add(e),
                        t = (0, NI.epochSecondAndNanoToLocalDateTime)(t, r);
                    return BI(new MI.DateTime(t.year, t.month, t.day, t.hour, t.minute, t.second, t.nanosecond, e, null), n, o)
                }
            })
        }
    };
    var FI, WI, s = r && r.__extends || (FI = function (e, t) {
            return (FI = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
            })(e, t)
        }, function (e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

            function r() {
                this.constructor = e
            }

            FI(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
        }), zI = r && r.__assign || function () {
            return (zI = Object.assign || function (e) {
                for (var t, r = 1, n = arguments.length; r < n; r++) for (var o in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }).apply(this, arguments)
        }, Yu = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        }, gu = (Object.defineProperty(y, "__esModule", {value: !0}), Yu(wm)), qI = Yu(wy), VI = R, HI = Yu(l0), YI = Yu(C),
        KI = Yu(zy), GI = e.internal.bookmarks.Bookmarks, ZI = e.internal.constants.BOLT_PROTOCOL_V4_3,
        ua = (WI = gu.default, s(QI, WI), Object.defineProperty(QI.prototype, "version", {
            get: function () {
                return ZI
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(QI.prototype, "transformer", {
            get: function () {
                var t = this;
                return void 0 === this._transformer && (this._transformer = new KI.default(Object.values(HI.default).map(function (e) {
                    return e(t._config, t._log)
                }))), this._transformer
            }, enumerable: !1, configurable: !0
        }), QI.prototype.requestRoutingInformation = function (e) {
            var t = e.routingContext, t = void 0 === t ? {} : t, r = e.databaseName, r = void 0 === r ? null : r,
                n = e.sessionContext, n = void 0 === n ? {} : n, o = e.onError, e = e.onCompleted,
                o = new VI.RouteObserver({onProtocolError: this._onProtocolError, onError: o, onCompleted: e}),
                e = n.bookmarks || GI.empty();
            return this.write(qI.default.route(t, e.values(), r), o, !0), o
        }, QI.prototype.initialize = function (e) {
            var t = this, e = void 0 === e ? {} : e, r = e.userAgent, n = e.authToken, o = e.onError, i = e.onComplete,
                e = new VI.LoginObserver({
                    onError: function (e) {
                        return t._onLoginError(e, o)
                    }, onCompleted: function (e) {
                        return void 0 !== e.patch_bolt && t._applyPatches(e.patch_bolt), t._onLoginCompleted(e, i)
                    }
                });
            return this.write(qI.default.hello(r, n, this._serversideRouting, ["utc"]), e, !0), e
        }, QI.prototype._applyPatches = function (e) {
            e.includes("utc") && this._applyUtcPatch()
        }, QI.prototype._applyUtcPatch = function () {
            var t = this;
            this._transformer = new KI.default(Object.values(zI(zI({}, HI.default), YI.default)).map(function (e) {
                return e(t._config, t._log)
            }))
        }, QI);

    function QI() {
        return null !== WI && WI.apply(this, arguments) || this
    }

    y.default = ua;
    var XI, JI, ra = {}, _ = r && r.__extends || (XI = function (e, t) {
            return (XI = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
            })(e, t)
        }, function (e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

            function r() {
                this.constructor = e
            }

            XI(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
        }), $I = r && r.__assign || function () {
            return ($I = Object.assign || function (e) {
                for (var t, r = 1, n = arguments.length; r < n; r++) for (var o in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }).apply(this, arguments)
        }, Ou = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        }, Cu = (Object.defineProperty(ra, "__esModule", {value: !0}), Ou(y)), Mr = e, eR = Ou(wy), tR = R, rR = Ou(n),
        nR = Ou(C), oR = Ou(zy), st = Mr.internal.constants, iR = st.BOLT_PROTOCOL_V4_4, uR = st.FETCH_ALL,
        aR = Mr.internal.bookmarks.Bookmarks,
        Wa = (JI = Cu.default, _(sR, JI), Object.defineProperty(sR.prototype, "version", {
            get: function () {
                return iR
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(sR.prototype, "transformer", {
            get: function () {
                var t = this;
                return void 0 === this._transformer && (this._transformer = new oR.default(Object.values(rR.default).map(function (e) {
                    return e(t._config, t._log)
                }))), this._transformer
            }, enumerable: !1, configurable: !0
        }), sR.prototype.requestRoutingInformation = function (e) {
            var t = e.routingContext, t = void 0 === t ? {} : t, r = e.databaseName, r = void 0 === r ? null : r,
                n = e.impersonatedUser, n = void 0 === n ? null : n, o = e.sessionContext, o = void 0 === o ? {} : o,
                i = e.onError, e = e.onCompleted,
                i = new tR.RouteObserver({onProtocolError: this._onProtocolError, onError: i, onCompleted: e}),
                e = o.bookmarks || aR.empty();
            return this.write(eR.default.routeV4x4(t, e.values(), {databaseName: r, impersonatedUser: n}), i, !0), i
        }, sR.prototype.run = function (e, t, r) {
            var r = void 0 === r ? {} : r, n = r.bookmarks, o = r.txConfig, i = r.database, u = r.mode,
                a = r.impersonatedUser, s = r.beforeKeys, c = r.afterKeys, l = r.beforeError, f = r.afterError,
                p = r.beforeComplete, d = r.afterComplete, h = r.flush, h = void 0 === h || h, b = r.reactive,
                b = void 0 !== b && b, y = r.fetchSize, y = void 0 === y ? uR : y, _ = r.highRecordWatermark,
                _ = void 0 === _ ? Number.MAX_VALUE : _, r = r.lowRecordWatermark,
                r = void 0 === r ? Number.MAX_VALUE : r, s = new tR.ResultStreamObserver({
                    server: this._server,
                    reactive: b,
                    fetchSize: y,
                    moreFunction: this._requestMore.bind(this),
                    discardFunction: this._requestDiscard.bind(this),
                    beforeKeys: s,
                    afterKeys: c,
                    beforeError: l,
                    afterError: f,
                    beforeComplete: p,
                    afterComplete: d,
                    highRecordWatermark: _,
                    lowRecordWatermark: r
                }), c = b;
            return this.write(eR.default.runWithMetadata(e, t, {
                bookmarks: n,
                txConfig: o,
                database: i,
                mode: u,
                impersonatedUser: a
            }), s, c && h), b || this.write(eR.default.pull({n: y}), s, h), s
        }, sR.prototype.beginTransaction = function (e) {
            var e = void 0 === e ? {} : e, t = e.bookmarks, r = e.txConfig, n = e.database, o = e.mode,
                i = e.impersonatedUser, u = e.beforeError, a = e.afterError, s = e.beforeComplete, e = e.afterComplete,
                u = new tR.ResultStreamObserver({
                    server: this._server,
                    beforeError: u,
                    afterError: a,
                    beforeComplete: s,
                    afterComplete: e
                });
            return u.prepareToHandleSingleResponse(), this.write(eR.default.begin({
                bookmarks: t,
                txConfig: r,
                database: n,
                mode: o,
                impersonatedUser: i
            }), u, !0), u
        }, sR.prototype._applyUtcPatch = function () {
            var t = this;
            this._transformer = new oR.default(Object.values($I($I({}, rR.default), nR.default)).map(function (e) {
                return e(t._config, t._log)
            }))
        }, sR);

    function sR() {
        return null !== JI && JI.apply(this, arguments) || this
    }

    ra.default = Wa;
    var Ws = {}, p = {}, cR = r && r.__assign || function () {
        return (cR = Object.assign || function (e) {
            for (var t, r = 1, n = arguments.length; r < n; r++) for (var o in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e
        }).apply(this, arguments)
    }, lR = r && r.__read || function (e, t) {
        var r = "function" == typeof Symbol && e[Symbol.iterator];
        if (!r) return e;
        var n, o, i = r.call(e), u = [];
        try {
            for (; (void 0 === t || 0 < t--) && !(n = i.next()).done;) u.push(n.value)
        } catch (e) {
            o = {error: e}
        } finally {
            try {
                n && !n.done && (r = i.return) && r.call(i)
            } finally {
                if (o) throw o.error
            }
        }
        return u
    }, xa = r && r.__importDefault || function (e) {
        return e && e.__esModule ? e : {default: e}
    }, fR = (Object.defineProperty(p, "__esModule", {value: !0}), Bf), pR = e, dR = xa(n), Cs = xa(C);
    p.default = cR(cR(cR({}, dR.default), Cs.default), {
        createNodeTransformer: function (e) {
            return dR.default.createNodeTransformer(e).extendsWith({
                fromStructure: function (e) {
                    fR.structure.verifyStructSize("Node", 4, e.size);
                    var e = lR(e.fields, 4), t = e[0], r = e[1], n = e[2], e = e[3];
                    return new pR.Node(t, r, n, e)
                }
            })
        }, createRelationshipTransformer: function (e) {
            return dR.default.createRelationshipTransformer(e).extendsWith({
                fromStructure: function (e) {
                    fR.structure.verifyStructSize("Relationship", 8, e.size);
                    var e = lR(e.fields, 8), t = e[0], r = e[1], n = e[2], o = e[3], i = e[4], u = e[5], a = e[6],
                        e = e[7];
                    return new pR.Relationship(t, r, n, o, i, u, a, e)
                }
            })
        }, createUnboundRelationshipTransformer: function (e) {
            return dR.default.createUnboundRelationshipTransformer(e).extendsWith({
                fromStructure: function (e) {
                    fR.structure.verifyStructSize("UnboundRelationship", 4, e.size);
                    var e = lR(e.fields, 4), t = e[0], r = e[1], n = e[2], e = e[3];
                    return new pR.UnboundRelationship(t, r, n, e)
                }
            })
        }
    });
    var hR, bR, Ua = r && r.__extends || (hR = function (e, t) {
            return (hR = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
            })(e, t)
        }, function (e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

            function r() {
                this.constructor = e
            }

            hR(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
        }), za = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        }, m = (Object.defineProperty(Ws, "__esModule", {value: !0}), za(ra)), yR = za(p), _R = za(zy), vR = za(wy), mR = R,
        gR = e.internal.constants.BOLT_PROTOCOL_V5_0,
        Ba = (bR = m.default, Ua(OR, bR), Object.defineProperty(OR.prototype, "version", {
            get: function () {
                return gR
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(OR.prototype, "transformer", {
            get: function () {
                var t = this;
                return void 0 === this._transformer && (this._transformer = new _R.default(Object.values(yR.default).map(function (e) {
                    return e(t._config, t._log)
                }))), this._transformer
            }, enumerable: !1, configurable: !0
        }), OR.prototype.initialize = function (e) {
            var t = this, e = void 0 === e ? {} : e, r = e.userAgent, n = e.authToken, o = e.onError, i = e.onComplete,
                e = new mR.LoginObserver({
                    onError: function (e) {
                        return t._onLoginError(e, o)
                    }, onCompleted: function (e) {
                        return t._onLoginCompleted(e, i)
                    }
                });
            return this.write(vR.default.hello(r, n, this._serversideRouting), e, !0), e
        }, OR);

    function OR() {
        return null !== bR && bR.apply(this, arguments) || this
    }

    Ws.default = Ba;
    var Hc = {}, wR = (Object.defineProperty(Hc, "__esModule", {value: !0}), e);

    function ER() {
    }

    function PR(e) {
        return e
    }

    var SR = {onNext: ER, onCompleted: ER, onError: ER};

    function TR(e) {
        var e = void 0 === e ? {} : e, t = e.transformMetadata, r = e.log, e = e.observer;
        this._pendingObservers = [], this._log = r, this._transformMetadata = t || PR, this._observer = Object.assign({
            onPendingObserversChange: ER,
            onError: ER,
            onFailure: ER,
            onErrorApplyTransformation: PR
        }, e)
    }

    Object.defineProperty(TR.prototype, "currentFailure", {
        get: function () {
            return this._currentFailure
        }, enumerable: !1, configurable: !0
    }), TR.prototype.handleResponse = function (e) {
        var t = e.fields[0];
        switch (e.signature) {
            case 113:
                this._log.isDebugEnabled() && this._log.debug("S: RECORD ".concat(wR.json.stringify(e))), this._currentObserver.onNext(t);
                break;
            case 112:
                this._log.isDebugEnabled() && this._log.debug("S: SUCCESS ".concat(wR.json.stringify(e)));
                try {
                    var r = this._transformMetadata(t);
                    this._currentObserver.onCompleted(r)
                } finally {
                    this._updateCurrentObserver()
                }
                break;
            case 127:
                this._log.isDebugEnabled() && this._log.debug("S: FAILURE ".concat(wR.json.stringify(e)));
                try {
                    var n = function (e) {
                        {
                            if ("Neo.TransientError.Transaction.Terminated" === e) return "Neo.ClientError.Transaction.Terminated";
                            if ("Neo.TransientError.Transaction.LockClientStopped" === e) return "Neo.ClientError.Transaction.LockClientStopped"
                        }
                        return e
                    }(t.code), o = (0, wR.newError)(t.message, n);
                    this._currentFailure = this._observer.onErrorApplyTransformation(o), this._currentObserver.onError(this._currentFailure)
                } finally {
                    this._updateCurrentObserver(), this._observer.onFailure(this._currentFailure)
                }
                break;
            case 126:
                this._log.isDebugEnabled() && this._log.debug("S: IGNORED ".concat(wR.json.stringify(e)));
                try {
                    this._currentFailure && this._currentObserver.onError ? this._currentObserver.onError(this._currentFailure) : this._currentObserver.onError && this._currentObserver.onError((0, wR.newError)("Ignored either because of an error or RESET"))
                } finally {
                    this._updateCurrentObserver()
                }
                break;
            default:
                this._observer.onError((0, wR.newError)("Unknown Bolt protocol message: " + e))
        }
    }, TR.prototype._updateCurrentObserver = function () {
        this._currentObserver = this._pendingObservers.shift(), this._observer.onPendingObserversChange(this._pendingObservers.length)
    }, TR.prototype._queueObserver = function (e) {
        return (e = e || SR).onCompleted = e.onCompleted || ER, e.onError = e.onError || ER, e.onNext = e.onNext || ER, void 0 === this._currentObserver ? this._currentObserver = e : this._pendingObservers.push(e), this._observer.onPendingObserversChange(this._pendingObservers.length), !0
    }, TR.prototype._notifyErrorToObservers = function (e) {
        for (this._currentObserver && this._currentObserver.onError && this._currentObserver.onError(e); 0 < this._pendingObservers.length;) {
            var t = this._pendingObservers.shift();
            t && t.onError && t.onError(e)
        }
    }, TR.prototype.hasOngoingObservableRequests = function () {
        return null != this._currentObserver || 0 < this._pendingObservers.length
    }, TR.prototype._resetFailure = function () {
        this._currentFailure = null
    }, Hc.default = TR;
    var jR, Jc = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        }, CR = (Object.defineProperty(Jd, "__esModule", {value: !0}), e), IR = Jc($d), RR = Jc(t_), kR = Jc(E),
        AR = Jc(Pv), MR = Jc(Jv), xR = Jc(wm), NR = Jc(y), UR = Jc(ra), DR = Jc(Ws), LR = Jc(Hc);
    Jd.default = function (e) {
        var t = (e = void 0 === e ? {} : e).version, r = e.chunker, n = e.dechunker, o = e.channel,
            i = e.disableLosslessIntegers, u = e.useBigInt, a = e.serversideRouting, s = e.server, c = e.log,
            l = e.observer, f = t, p = s, d = r, h = {disableLosslessIntegers: i, useBigInt: u}, b = a,
            y = function (t) {
                var r = new LR.default({transformMetadata: t.transformMetadata.bind(t), log: c, observer: l});
                return o.onerror = l.onError.bind(l), o.onmessage = function (e) {
                    return n.write(e)
                }, n.onmessage = function (e) {
                    try {
                        r.handleResponse(t.unpack(e))
                    } catch (e) {
                        return l.onError(e)
                    }
                }, r
            }, _ = l.onProtocolError.bind(l), v = c;
        switch (f) {
            case 1:
                return new IR.default(p, d, h, y, v, _);
            case 2:
                return new RR.default(p, d, h, y, v, _);
            case 3:
                return new kR.default(p, d, h, y, v, _);
            case 4:
                return new AR.default(p, d, h, y, v, _);
            case 4.1:
                return new MR.default(p, d, h, y, v, _, b);
            case 4.2:
                return new xR.default(p, d, h, y, v, _, b);
            case 4.3:
                return new NR.default(p, d, h, y, v, _, b);
            case 4.4:
                return new UR.default(p, d, h, y, v, _, b);
            case 5:
                return new DR.default(p, d, h, y, v, _, b);
            default:
                throw(0, CR.newError)("Unknown Bolt protocol version: " + f)
        }
    }, Ma = a, jR = r && r.__createBinding || (Object.create ? function (e, t, r, n) {
        void 0 === n && (n = r);
        var o = Object.getOwnPropertyDescriptor(t, r);
        o && ("get" in o ? t.__esModule : !o.writable && !o.configurable) || (o = {
            enumerable: !0, get: function () {
                return t[r]
            }
        }), Object.defineProperty(e, n, o)
    } : function (e, t, r, n) {
        e[n = void 0 === n ? r : n] = t[r]
    }), xs = r && r.__exportStar || function (e, t) {
        for (var r in e) "default" === r || Object.prototype.hasOwnProperty.call(t, r) || jR(t, e, r)
    }, o = r && r.__importDefault || function (e) {
        return e && e.__esModule ? e : {default: e}
    }, Object.defineProperty(Ma, "__esModule", {value: !0}), Ma.RawRoutingTable = Ma.BoltProtocol = void 0, jf = o(ll), Nf = o(Jd), Df = o(y), o = o(bh), xs(R, Ma), Ma.BoltProtocol = Df.default, Ma.RawRoutingTable = o.default, Ma.default = {
        handshake: jf.default,
        create: Nf.default
    };
    Xf = {}, Aa = {}, Object.defineProperty(Aa, "__esModule", {value: !0}), Aa.DEFAULT_ACQUISITION_TIMEOUT = Aa.DEFAULT_MAX_SIZE = void 0, Aa.DEFAULT_MAX_SIZE = 100, Aa.DEFAULT_ACQUISITION_TIMEOUT = 6e4, BR.defaultConfig = function () {
        return new BR(100, 6e4)
    }, BR.fromDriverConfig = function (e) {
        return new BR(WR(e.maxConnectionPoolSize) ? e.maxConnectionPoolSize : 100, WR(e.connectionAcquisitionTimeout) ? e.connectionAcquisitionTimeout : 6e4)
    }, Hf = BR;

    function BR(e, t) {
        this.maxSize = FR(e, 100), this.acquisitionTimeout = FR(t, 6e4)
    }

    function FR(e, t) {
        return 0 === e || e ? e : t
    }

    function WR(e) {
        return 0 === e || e
    }

    Aa.default = Hf;
    var df = {}, zR = r && r.__awaiter || function (e, u, a, s) {
            return new (a = a || Promise)(function (r, t) {
                function n(e) {
                    try {
                        i(s.next(e))
                    } catch (e) {
                        t(e)
                    }
                }

                function o(e) {
                    try {
                        i(s.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }

                function i(e) {
                    var t;
                    e.done ? r(e.value) : ((t = e.value) instanceof a ? t : new a(function (e) {
                        e(t)
                    })).then(n, o)
                }

                i((s = s.apply(e, u || [])).next())
            })
        }, qR = r && r.__generator || function (n, o) {
            var i, u, a, s = {
                label: 0, sent: function () {
                    if (1 & a[0]) throw a[1];
                    return a[1]
                }, trys: [], ops: []
            }, c = {next: e(0), throw: e(1), return: e(2)};
            return "function" == typeof Symbol && (c[Symbol.iterator] = function () {
                return this
            }), c;

            function e(r) {
                return function (e) {
                    var t = [r, e];
                    if (i) throw new TypeError("Generator is already executing.");
                    for (; s = c && t[c = 0] ? 0 : s;) try {
                        if (i = 1, u && (a = 2 & t[0] ? u.return : t[0] ? u.throw || ((a = u.return) && a.call(u), 0) : u.next) && !(a = a.call(u, t[1])).done) return a;
                        switch (u = 0, (t = a ? [2 & t[0], a.value] : t)[0]) {
                            case 0:
                            case 1:
                                a = t;
                                break;
                            case 4:
                                return s.label++, {value: t[1], done: !1};
                            case 5:
                                s.label++, u = t[1], t = [0];
                                continue;
                            case 7:
                                t = s.ops.pop(), s.trys.pop();
                                continue;
                            default:
                                if (!(a = 0 < (a = s.trys).length && a[a.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                    s = 0;
                                    continue
                                }
                                if (3 === t[0] && (!a || t[1] > a[0] && t[1] < a[3])) {
                                    s.label = t[1];
                                    break
                                }
                                if (6 === t[0] && s.label < a[1]) {
                                    s.label = a[1], a = t;
                                    break
                                }
                                if (a && s.label < a[2]) {
                                    s.label = a[2], s.ops.push(t);
                                    break
                                }
                                a[2] && s.ops.pop(), s.trys.pop();
                                continue
                        }
                        t = o.call(n, s)
                    } catch (e) {
                        t = [6, e], u = 0
                    } finally {
                        i = a = 0
                    }
                    if (5 & t[0]) throw t[1];
                    return {value: t[0] ? t[1] : void 0, done: !0}
                }
            }
        }, ep = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        }, VR = (Object.defineProperty(df, "__esModule", {value: !0}), ep(Aa)), HR = e, YR = HR.internal.logger.Logger,
        ka = (KR.prototype.acquire = function (o) {
            var i = this, u = o.asKey(), a = this._acquireRequests;
            return a[u] || (a[u] = []), new Promise(function (e, t) {
                var r = null, n = setTimeout(function () {
                    var e, t = a[u];
                    t && (a[u] = t.filter(function (e) {
                        return e !== r
                    })), r.isCompleted() || (t = i.activeResourceCount(o), e = i.has(o) ? i._pools[u].length : 0, r.reject((0, HR.newError)("Connection acquisition timed out in ".concat(i._acquisitionTimeout, " ms. Pool status: Active conn count = ").concat(t, ", Idle conn count = ").concat(e, "."))))
                }, i._acquisitionTimeout), r = new ZR(u, e, t, n, i._log);
                a[u].push(r), i._processPendingAcquireRequests(o)
            })
        }, KR.prototype.purge = function (e) {
            return this._purgeKey(e.asKey())
        }, KR.prototype.close = function () {
            return zR(this, void 0, void 0, function () {
                var t = this;
                return qR(this, function (e) {
                    switch (e.label) {
                        case 0:
                            return this._closed = !0, [4, Promise.all(Object.keys(this._pools).map(function (e) {
                                return t._purgeKey(e)
                            }))];
                        case 1:
                            return [2, e.sent()]
                    }
                })
            })
        }, KR.prototype.keepAll = function (e) {
            var t = this, r = e.map(function (e) {
                return e.asKey()
            }), e = Object.keys(this._pools).filter(function (e) {
                return -1 === r.indexOf(e)
            });
            return Promise.all(e.map(function (e) {
                return t._purgeKey(e)
            }))
        }, KR.prototype.has = function (e) {
            return e.asKey() in this._pools
        }, KR.prototype.activeResourceCount = function (e) {
            return this._activeResourceCounts[e.asKey()] || 0
        }, KR.prototype._getOrInitializePoolFor = function (e) {
            var t = this._pools[e];
            return t || (t = new ek, this._pools[e] = t, this._pendingCreates[e] = 0), t
        }, KR.prototype._acquire = function (u) {
            return zR(this, void 0, void 0, function () {
                var t, r, n, o, i = this;
                return qR(this, function (e) {
                    switch (e.label) {
                        case 0:
                            if (this._closed) throw(0, HR.newError)("Pool is closed, it is no more able to serve requests.");
                            t = u.asKey(), r = this._getOrInitializePoolFor(t), e.label = 1;
                        case 1:
                            return r.length ? (n = r.pop(), this._validate(n) ? (this._removeIdleObserver && this._removeIdleObserver(n), GR(t, this._activeResourceCounts), this._log.isDebugEnabled() && this._log.debug("".concat(n, " acquired from the pool ").concat(t)), [2, {
                                resource: n,
                                pool: r
                            }]) : [3, 2]) : [3, 5];
                        case 2:
                            return [4, this._destroy(n)];
                        case 3:
                            e.sent(), e.label = 4;
                        case 4:
                            return [3, 1];
                        case 5:
                            if (0 < this._maxSize && this.activeResourceCount(u) + this._pendingCreates[t] >= this._maxSize) return [2, {
                                resource: null,
                                pool: r
                            }];
                            this._pendingCreates[t] = this._pendingCreates[t] + 1, e.label = 6;
                        case 6:
                            return e.trys.push([6, , 8, 9]), [4, this._create(u, function (e, t) {
                                return i._release(e, t, r)
                            })];
                        case 7:
                            return o = e.sent(), GR(t, this._activeResourceCounts), this._log.isDebugEnabled() && this._log.debug("".concat(o, " created for the pool ").concat(t)), [3, 9];
                        case 8:
                            return this._pendingCreates[t] = this._pendingCreates[t] - 1, [7];
                        case 9:
                            return [2, {resource: o, pool: r}]
                    }
                })
            })
        }, KR.prototype._release = function (u, a, s) {
            return zR(this, void 0, void 0, function () {
                var o, i = this;
                return qR(this, function (e) {
                    switch (e.label) {
                        case 0:
                            return (o = u.asKey(), s.isActive()) ? this._validate(a) ? [3, 2] : (this._log.isDebugEnabled() && this._log.debug("".concat(a, " destroyed and can't be released to the pool ").concat(o, " because it is not functional")), [4, this._destroy(a)]) : [3, 4];
                        case 1:
                            return e.sent(), [3, 3];
                        case 2:
                            this._installIdleObserver && this._installIdleObserver(a, {
                                onError: function (e) {
                                    i._log.debug("Idle connection ".concat(a, " destroyed because of error: ").concat(e));
                                    e = i._pools[o];
                                    e && (i._pools[o] = e.filter(function (e) {
                                        return e !== a
                                    })), i._destroy(a).catch(function () {
                                    })
                                }
                            }), s.push(a), this._log.isDebugEnabled() && this._log.debug("".concat(a, " released to the pool ").concat(o)), e.label = 3;
                        case 3:
                            return [3, 6];
                        case 4:
                            return this._log.isDebugEnabled() && this._log.debug("".concat(a, " destroyed and can't be released to the pool ").concat(o, " because pool has been purged")), [4, this._destroy(a)];
                        case 5:
                            e.sent(), e.label = 6;
                        case 6:
                            return t = o, r = this._activeResourceCounts, 0 < (n = (r[t] || 0) - 1) ? r[t] = n : delete r[t], this._processPendingAcquireRequests(u), [2]
                    }
                    var t, r, n
                })
            })
        }, KR.prototype._purgeKey = function (o) {
            return zR(this, void 0, void 0, function () {
                var t, r, n;
                return qR(this, function (e) {
                    switch (e.label) {
                        case 0:
                            if (t = this._pools[o], r = [], !t) return [3, 2];
                            for (; t.length;) n = t.pop(), this._removeIdleObserver && this._removeIdleObserver(n), r.push(this._destroy(n));
                            return t.close(), delete this._pools[o], [4, Promise.all(r)];
                        case 1:
                            e.sent(), e.label = 2;
                        case 2:
                            return [2]
                    }
                })
            })
        }, KR.prototype._processPendingAcquireRequests = function (r) {
            var n, o = this, i = r.asKey(), e = this._acquireRequests[i];
            e && ((n = e.shift()) ? this._acquire(r).catch(function (e) {
                return n.reject(e), {resource: null}
            }).then(function (e) {
                var t = e.resource, e = e.pool;
                t ? n.isCompleted() ? o._release(r, t, e) : n.resolve(t) : n.isCompleted() || (o._acquireRequests[i] || (o._acquireRequests[i] = []), o._acquireRequests[i].unshift(n))
            }) : delete this._acquireRequests[i])
        }, KR);

    function KR(e) {
        var e = void 0 === e ? {} : e, t = e.create, t = void 0 === t ? function (e, t) {
                return Promise.resolve()
            } : t, r = e.destroy, r = void 0 === r ? function (e) {
                return Promise.resolve()
            } : r, n = e.validate, n = void 0 === n ? function (e) {
                return !0
            } : n, o = e.installIdleObserver, o = void 0 === o ? function (e, t) {
            } : o, i = e.removeIdleObserver, i = void 0 === i ? function (e) {
            } : i, u = e.config, u = void 0 === u ? VR.default.defaultConfig() : u, e = e.log,
            e = void 0 === e ? YR.noOp() : e;
        this._create = t, this._destroy = r, this._validate = n, this._installIdleObserver = o, this._removeIdleObserver = i, this._maxSize = u.maxSize, this._acquisitionTimeout = u.acquisitionTimeout, this._pools = {}, this._pendingCreates = {}, this._acquireRequests = {}, this._activeResourceCounts = {}, this._release = this._release.bind(this), this._log = e, this._closed = !1
    }

    function GR(e, t) {
        var r = t[e] || 0;
        t[e] = r + 1
    }

    QR.prototype.isCompleted = function () {
        return this._completed
    }, QR.prototype.resolve = function (e) {
        this._completed || (this._completed = !0, clearTimeout(this._timeoutId), this._log.isDebugEnabled() && this._log.debug("".concat(e, " acquired from the pool ").concat(this._key)), this._resolve(e))
    }, QR.prototype.reject = function (e) {
        this._completed || (this._completed = !0, clearTimeout(this._timeoutId), this._reject(e))
    };
    var ZR = QR;

    function QR(e, t, r, n, o) {
        this._key = e, this._resolve = t, this._reject = r, this._timeoutId = n, this._log = o, this._completed = !1
    }

    tk.prototype.isActive = function () {
        return this._active
    }, tk.prototype.close = function () {
        this._active = !1
    }, tk.prototype.filter = function (e) {
        return this._elements = this._elements.filter(e), this
    }, Object.defineProperty(tk.prototype, "length", {
        get: function () {
            return this._elements.length
        }, enumerable: !1, configurable: !0
    }), tk.prototype.pop = function () {
        return this._elements.pop()
    }, tk.prototype.push = function (e) {
        return this._elements.push(e)
    };
    var XR, JR, $R, ek = tk;

    function tk() {
        this._active = !0, this._elements = []
    }

    df.default = ka, j = Xf, XR = r && r.__createBinding || (Object.create ? function (e, t, r, n) {
        void 0 === n && (n = r);
        var o = Object.getOwnPropertyDescriptor(t, r);
        o && ("get" in o ? t.__esModule : !o.writable && !o.configurable) || (o = {
            enumerable: !0, get: function () {
                return t[r]
            }
        }), Object.defineProperty(e, n, o)
    } : function (e, t, r, n) {
        e[n = void 0 === n ? r : n] = t[r]
    }), JR = r && r.__setModuleDefault || (Object.create ? function (e, t) {
        Object.defineProperty(e, "default", {enumerable: !0, value: t})
    } : function (e, t) {
        e.default = t
    }), Tf = r && r.__importStar || function (e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) "default" !== r && Object.prototype.hasOwnProperty.call(e, r) && XR(t, e, r);
        return JR(t, e), t
    }, Dl = r && r.__importDefault || function (e) {
        return e && e.__esModule ? e : {default: e}
    }, Object.defineProperty(j, "__esModule", {value: !0}), j.DEFAULT_MAX_SIZE = j.DEFAULT_ACQUISITION_TIMEOUT = j.PoolConfig = j.Pool = void 0, $R = Tf(Aa), j.PoolConfig = $R.default, Object.defineProperty(j, "DEFAULT_ACQUISITION_TIMEOUT", {
        enumerable: !0,
        get: function () {
            return $R.DEFAULT_ACQUISITION_TIMEOUT
        }
    }), Object.defineProperty(j, "DEFAULT_MAX_SIZE", {
        enumerable: !0, get: function () {
            return $R.DEFAULT_MAX_SIZE
        }
    }), Tf = Dl(df), j.Pool = Tf.default, j.default = Tf.default;
    var rk, S = {}, op = {}, dp = r && r.__extends || (rk = function (e, t) {
        return (rk = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
            e.__proto__ = t
        } || function (e, t) {
            for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
        })(e, t)
    }, function (e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

        function r() {
            this.constructor = e
        }

        rk(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
    });
    Object.defineProperty(op, "__esModule", {value: !0});
    dp(ok, nk = e.ConnectionProvider), ok.prototype.acquireConnection = function (e) {
        e = void 0 === e ? {} : e, e.accessMode, e.database, e.bookmarks, e = this._connection;
        return this._connection = null, Promise.resolve(e)
    };
    var nk, yn = ok;

    function ok(e) {
        var t = nk.call(this) || this;
        return t._connection = e, t
    }

    op.default = yn;
    Cf = {}, hp = {}, Sa = {};

    function ik(e) {
        this._errorHandler = e
    }

    Object.defineProperty(Sa, "__esModule", {value: !0}), Object.defineProperty(ik.prototype, "id", {
        get: function () {
            throw new Error("not implemented")
        }, enumerable: !1, configurable: !0
    }), Object.defineProperty(ik.prototype, "databaseId", {
        get: function () {
            throw new Error("not implemented")
        }, set: function (e) {
            throw new Error("not implemented")
        }, enumerable: !1, configurable: !0
    }), ik.prototype.isOpen = function () {
        throw new Error("not implemented")
    }, ik.prototype.protocol = function () {
        throw new Error("not implemented")
    }, Object.defineProperty(ik.prototype, "address", {
        get: function () {
            throw new Error("not implemented")
        }, enumerable: !1, configurable: !0
    }), Object.defineProperty(ik.prototype, "version", {
        get: function () {
            throw new Error("not implemented")
        }, set: function (e) {
            throw new Error("not implemented")
        }, enumerable: !1, configurable: !0
    }), Object.defineProperty(ik.prototype, "server", {
        get: function () {
            throw new Error("not implemented")
        }, enumerable: !1, configurable: !0
    }), ik.prototype.connect = function (e, t) {
        throw new Error("not implemented")
    }, ik.prototype.write = function (e, t, r) {
        throw new Error("not implemented")
    }, ik.prototype.resetAndFlush = function () {
        throw new Error("not implemented")
    }, ik.prototype.hasOngoingObservableRequests = function () {
        throw new Error("not implemented")
    }, ik.prototype.close = function () {
        throw new Error("not implemented")
    }, ik.prototype.handleAndTransformError = function (e, t) {
        return this._errorHandler ? this._errorHandler.handleAndTransformError(e, t) : e
    }, Sa.default = ik;
    var uk, wp = {}, Lf = r && r.__extends || (uk = function (e, t) {
            return (uk = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
            })(e, t)
        }, function (e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

            function r() {
                this.constructor = e
            }

            uk(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
        }), ak = r && r.__awaiter || function (e, u, a, s) {
            return new (a = a || Promise)(function (r, t) {
                function n(e) {
                    try {
                        i(s.next(e))
                    } catch (e) {
                        t(e)
                    }
                }

                function o(e) {
                    try {
                        i(s.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }

                function i(e) {
                    var t;
                    e.done ? r(e.value) : ((t = e.value) instanceof a ? t : new a(function (e) {
                        e(t)
                    })).then(n, o)
                }

                i((s = s.apply(e, u || [])).next())
            })
        }, sk = r && r.__generator || function (n, o) {
            var i, u, a, s = {
                label: 0, sent: function () {
                    if (1 & a[0]) throw a[1];
                    return a[1]
                }, trys: [], ops: []
            }, c = {next: e(0), throw: e(1), return: e(2)};
            return "function" == typeof Symbol && (c[Symbol.iterator] = function () {
                return this
            }), c;

            function e(r) {
                return function (e) {
                    var t = [r, e];
                    if (i) throw new TypeError("Generator is already executing.");
                    for (; s = c && t[c = 0] ? 0 : s;) try {
                        if (i = 1, u && (a = 2 & t[0] ? u.return : t[0] ? u.throw || ((a = u.return) && a.call(u), 0) : u.next) && !(a = a.call(u, t[1])).done) return a;
                        switch (u = 0, (t = a ? [2 & t[0], a.value] : t)[0]) {
                            case 0:
                            case 1:
                                a = t;
                                break;
                            case 4:
                                return s.label++, {value: t[1], done: !1};
                            case 5:
                                s.label++, u = t[1], t = [0];
                                continue;
                            case 7:
                                t = s.ops.pop(), s.trys.pop();
                                continue;
                            default:
                                if (!(a = 0 < (a = s.trys).length && a[a.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                    s = 0;
                                    continue
                                }
                                if (3 === t[0] && (!a || t[1] > a[0] && t[1] < a[3])) {
                                    s.label = t[1];
                                    break
                                }
                                if (6 === t[0] && s.label < a[1]) {
                                    s.label = a[1], a = t;
                                    break
                                }
                                if (a && s.label < a[2]) {
                                    s.label = a[2], s.ops.push(t);
                                    break
                                }
                                a[2] && s.ops.pop(), s.trys.pop();
                                continue
                        }
                        t = o.call(n, s)
                    } catch (e) {
                        t = [6, e], u = 0
                    } finally {
                        i = a = 0
                    }
                    if (5 & t[0]) throw t[1];
                    return {value: t[0] ? t[1] : void 0, done: !0}
                }
            }
        }, jp = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        }, ck = (Object.defineProperty(wp, "__esModule", {value: !0}), wp.createChannelConnection = void 0, Il), lk = e,
        vp = jp(Sa), fk = jp(a), pk = lk.error.PROTOCOL_ERROR, dk = lk.internal.logger.Logger, hk = 0;
    wp.createChannelConnection = function (i, u, a, s, c, e) {
        void 0 === c && (c = null);
        var l = (e = void 0 === e ? function (e) {
            return new ck.Channel(e)
        } : e)(new ck.ChannelConfig(i, u, a.errorCode()));
        return fk.default.handshake(l).then(function (e) {
            var r = e.protocolVersion, e = e.consumeRemainingBuffer, n = new ck.Chunker(l), o = new ck.Dechunker,
                t = new yk(l, a, i, s, u.disableLosslessIntegers, c, n, function (t) {
                    return fk.default.create({
                        version: r,
                        channel: l,
                        chunker: n,
                        dechunker: o,
                        disableLosslessIntegers: u.disableLosslessIntegers,
                        useBigInt: u.useBigInt,
                        serversideRouting: c,
                        server: t.server,
                        log: t.logger,
                        observer: {
                            onPendingObserversChange: t._handleOngoingRequestsNumberChange.bind(t),
                            onError: t._handleFatalError.bind(t),
                            onFailure: t._resetOnFailure.bind(t),
                            onProtocolError: t._handleProtocolError.bind(t),
                            onErrorApplyTransformation: function (e) {
                                return t.handleAndTransformError(e, t._address)
                            }
                        }
                    })
                });
            return e(function (e) {
                return o.write(e)
            }), t
        }).catch(function (e) {
            return l.close().then(function () {
                throw e
            })
        })
    };
    bk = vp.default, Lf(_k, bk), Object.defineProperty(_k.prototype, "id", {
        get: function () {
            return this._id
        }, enumerable: !1, configurable: !0
    }), Object.defineProperty(_k.prototype, "databaseId", {
        get: function () {
            return this._dbConnectionId
        }, set: function (e) {
            this._dbConnectionId = e
        }, enumerable: !1, configurable: !0
    }), _k.prototype.connect = function (e, t) {
        return this._initialize(e, t)
    }, _k.prototype._initialize = function (e, n) {
        var o = this, i = this;
        return new Promise(function (r, t) {
            o._protocol.initialize({
                userAgent: e, authToken: n, onError: function (e) {
                    return t(e)
                }, onComplete: function (e) {
                    var t;
                    e && (t = e.server, o.version && !t || (o.version = t), t = e.connection_id, o.databaseId || (o.databaseId = t), e.hints && null != (t = e.hints["connection.recv_timeout_seconds"]) && (e = (0, lk.toNumber)(t), Number.isInteger(e) && 0 < e ? o._ch.setupReceiveTimeout(1e3 * e) : o._log.info("Server located at ".concat(o._address, " supplied an invalid connection receive timeout value (").concat(e, "). ") + "Please, verify the server configuration and status because this can be the symptom of a bigger issue."))), r(i)
                }
            })
        })
    }, _k.prototype.protocol = function () {
        return this._protocol
    }, Object.defineProperty(_k.prototype, "address", {
        get: function () {
            return this._address
        }, enumerable: !1, configurable: !0
    }), Object.defineProperty(_k.prototype, "version", {
        get: function () {
            return this._server.version
        }, set: function (e) {
            this._server.version = e
        }, enumerable: !1, configurable: !0
    }), Object.defineProperty(_k.prototype, "server", {
        get: function () {
            return this._server
        }, enumerable: !1, configurable: !0
    }), Object.defineProperty(_k.prototype, "logger", {
        get: function () {
            return this._log
        }, enumerable: !1, configurable: !0
    }), _k.prototype._handleFatalError = function (e) {
        this._isBroken = !0, this._error = this.handleAndTransformError(this._protocol.currentFailure || e, this._address), this._log.isErrorEnabled() && this._log.error("experienced a fatal error caused by ".concat(this._error, " (").concat(lk.json.stringify(this._error), ")")), this._protocol.notifyFatalError(this._error)
    }, _k.prototype._queueObserver = function (e) {
        return this._protocol.queueObserverIfProtocolIsNotBroken(e)
    }, _k.prototype.hasOngoingObservableRequests = function () {
        return this._protocol.hasOngoingObservableRequests()
    }, _k.prototype.resetAndFlush = function () {
        var r = this;
        return new Promise(function (e, t) {
            r._reset({
                onError: function (e) {
                    r._isBroken ? t(e) : (e = r._handleProtocolError("Received FAILURE as a response for RESET: " + e), t(e))
                }, onComplete: function () {
                    e()
                }
            })
        })
    }, _k.prototype._resetOnFailure = function () {
        var e = this;
        this.isOpen() && this._reset({
            onError: function () {
                e._protocol.resetFailure()
            }, onComplete: function () {
                e._protocol.resetFailure()
            }
        })
    }, _k.prototype._reset = function (t) {
        var e, r = this;
        this._reseting ? this._protocol.isLastMessageReset() ? this._resetObservers.push(t) : this._protocol.reset({
            onError: function (e) {
                t.onError(e)
            }, onComplete: function () {
                t.onComplete()
            }
        }) : (this._resetObservers.push(t), this._reseting = !0, e = function (e) {
            r._reseting = !1;
            var t = r._resetObservers;
            r._resetObservers = [], t.forEach(e)
        }, this._protocol.reset({
            onError: function (t) {
                e(function (e) {
                    return e.onError(t)
                })
            }, onComplete: function () {
                e(function (e) {
                    return e.onComplete()
                })
            }
        }))
    }, _k.prototype._updateCurrentObserver = function () {
        this._protocol.updateCurrentObserver()
    }, _k.prototype.isOpen = function () {
        return !this._isBroken && this._ch._open
    }, _k.prototype._handleOngoingRequestsNumberChange = function (e) {
        0 === e ? this._ch.stopReceiveTimeout() : this._ch.startReceiveTimeout()
    }, _k.prototype.close = function () {
        return ak(this, void 0, void 0, function () {
            return sk(this, function (e) {
                switch (e.label) {
                    case 0:
                        return this._log.isDebugEnabled() && this._log.debug("closing"), this._protocol && this.isOpen() && this._protocol.prepareToClose(), [4, this._ch.close()];
                    case 1:
                        return e.sent(), this._log.isDebugEnabled() && this._log.debug("closed"), [2]
                }
            })
        })
    }, _k.prototype.toString = function () {
        return "Connection [".concat(this.id, "][").concat(this.databaseId || "", "]")
    }, _k.prototype._handleProtocolError = function (e) {
        this._protocol.resetFailure(), this._updateCurrentObserver();
        e = (0, lk.newError)(e, pk);
        return this._handleFatalError(e), e
    };
    var bk, yk = _k;

    function _k(e, t, r, n, o, i, u, a) {
        void 0 === o && (o = !1), void 0 === i && (i = null);
        var s, c, t = bk.call(this, t) || this;
        return t._reseting = !1, t._resetObservers = [], t._id = hk++, t._address = r, t._server = {address: r.asHostPort()}, t.creationTimestamp = Date.now(), t._disableLosslessIntegers = o, t._ch = e, t._chunker = u, t._log = (s = t, new dk((c = n)._level, function (e, t) {
            return c._loggerFunction(e, "".concat(s, " ").concat(t))
        })), t._serversideRouting = i, t._dbConnectionId = null, t._protocol = a(t), t._isBroken = !1, t._log.isDebugEnabled() && t._log.debug("created towards ".concat(r)), t
    }

    wp.default = yk;
    var vk, mk, Ap = {}, Zp = r && r.__extends || (vk = function (e, t) {
            return (vk = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
            })(e, t)
        }, function (e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

            function r() {
                this.constructor = e
            }

            vk(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
        }), od = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        }, ed = (Object.defineProperty(Ap, "__esModule", {value: !0}), od(Sa)),
        zd = (mk = ed.default, Zp(gk, mk), Object.defineProperty(gk.prototype, "id", {
            get: function () {
                return this._delegate.id
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(gk.prototype, "databaseId", {
            get: function () {
                return this._delegate.databaseId
            }, set: function (e) {
                this._delegate.databaseId = e
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(gk.prototype, "server", {
            get: function () {
                return this._delegate.server
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(gk.prototype, "address", {
            get: function () {
                return this._delegate.address
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(gk.prototype, "version", {
            get: function () {
                return this._delegate.version
            }, set: function (e) {
                this._delegate.version = e
            }, enumerable: !1, configurable: !0
        }), gk.prototype.isOpen = function () {
            return this._delegate.isOpen()
        }, gk.prototype.protocol = function () {
            return this._delegate.protocol()
        }, gk.prototype.connect = function (e, t) {
            return this._delegate.connect(e, t)
        }, gk.prototype.write = function (e, t, r) {
            return this._delegate.write(e, t, r)
        }, gk.prototype.resetAndFlush = function () {
            return this._delegate.resetAndFlush()
        }, gk.prototype.hasOngoingObservableRequests = function () {
            return this._delegate.hasOngoingObservableRequests()
        }, gk.prototype.close = function () {
            return this._delegate.close()
        }, gk.prototype._release = function () {
            return this._originalErrorHandler && (this._delegate._errorHandler = this._originalErrorHandler), this._delegate._release()
        }, gk);

    function gk(e, t) {
        var r = mk.call(this, t) || this;
        return t && (r._originalErrorHandler = e._errorHandler, e._errorHandler = r._errorHandler), r._delegate = e, r
    }

    Ap.default = zd;
    fl = {};
    Object.defineProperty(fl, "__esModule", {value: !0});
    var Ok, wk, Ek, Pk = e.error.SERVICE_UNAVAILABLE, Sk = e.error.SESSION_EXPIRED;

    function Tk(e, t, r, n) {
        this._errorCode = e, this._handleUnavailability = t || jk, this._handleWriteFailure = r || jk, this._handleAuthorizationExpired = n || jk
    }

    function jk(e) {
        return e
    }

    Tk.create = function (e) {
        return new Tk(e.errorCode, e.handleUnavailability, e.handleWriteFailure, e.handleAuthorizationExpired)
    }, Tk.prototype.errorCode = function () {
        return this._errorCode
    }, Tk.prototype.handleAndTransformError = function (e, t) {
        return !(r = e) || "Neo.ClientError.Security.AuthorizationExpired" !== r.code && "Neo.ClientError.Security.TokenExpired" !== r.code ? function (e) {
            if (e) return e.code === Sk || e.code === Pk || "Neo.TransientError.General.DatabaseUnavailable" === e.code;
            return
        }(e) ? this._handleUnavailability(e, t) : function (e) {
            if (e) return "Neo.ClientError.Cluster.NotALeader" === e.code || "Neo.ClientError.General.ForbiddenOnReadOnlyDatabase" === e.code;
            return
        }(e) ? this._handleWriteFailure(e, t) : e : this._handleAuthorizationExpired(e, t);
        var r
    }, fl.default = Tk, wd = hp, Ok = r && r.__createBinding || (Object.create ? function (e, t, r, n) {
        void 0 === n && (n = r);
        var o = Object.getOwnPropertyDescriptor(t, r);
        o && ("get" in o ? t.__esModule : !o.writable && !o.configurable) || (o = {
            enumerable: !0, get: function () {
                return t[r]
            }
        }), Object.defineProperty(e, n, o)
    } : function (e, t, r, n) {
        e[n = void 0 === n ? r : n] = t[r]
    }), wk = r && r.__setModuleDefault || (Object.create ? function (e, t) {
        Object.defineProperty(e, "default", {enumerable: !0, value: t})
    } : function (e, t) {
        e.default = t
    }), Cc = r && r.__importStar || function (e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) "default" !== r && Object.prototype.hasOwnProperty.call(e, r) && Ok(t, e, r);
        return wk(t, e), t
    }, Kc = r && r.__importDefault || function (e) {
        return e && e.__esModule ? e : {default: e}
    }, Object.defineProperty(wd, "__esModule", {value: !0}), wd.createChannelConnection = wd.ConnectionErrorHandler = wd.DelegateConnection = wd.ChannelConnection = wd.Connection = void 0, Ed = Kc(Sa), wd.Connection = Ed.default, Ek = Cc(wp), wd.ChannelConnection = Ek.default, Object.defineProperty(wd, "createChannelConnection", {
        enumerable: !0,
        get: function () {
            return Ek.createChannelConnection
        }
    }), Cc = Kc(Ap), wd.DelegateConnection = Cc.default, Cc = Kc(fl), wd.ConnectionErrorHandler = Cc.default, wd.default = Ed.default;
    var Ck, Ik, Rl = r && r.__extends || (Ck = function (e, t) {
            return (Ck = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
            })(e, t)
        }, function (e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

            function r() {
                this.constructor = e
            }

            Ck(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
        }), Rk = r && r.__createBinding || (Object.create ? function (e, t, r, n) {
            void 0 === n && (n = r);
            var o = Object.getOwnPropertyDescriptor(t, r);
            o && ("get" in o ? t.__esModule : !o.writable && !o.configurable) || (o = {
                enumerable: !0, get: function () {
                    return t[r]
                }
            }), Object.defineProperty(e, n, o)
        } : function (e, t, r, n) {
            e[n = void 0 === n ? r : n] = t[r]
        }), kk = r && r.__setModuleDefault || (Object.create ? function (e, t) {
            Object.defineProperty(e, "default", {enumerable: !0, value: t})
        } : function (e, t) {
            e.default = t
        }), Wd = r && r.__importStar || function (e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e) for (var r in e) "default" !== r && Object.prototype.hasOwnProperty.call(e, r) && Rk(t, e, r);
            return kk(t, e), t
        }, Ak = r && r.__awaiter || function (e, u, a, s) {
            return new (a = a || Promise)(function (r, t) {
                function n(e) {
                    try {
                        i(s.next(e))
                    } catch (e) {
                        t(e)
                    }
                }

                function o(e) {
                    try {
                        i(s.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }

                function i(e) {
                    var t;
                    e.done ? r(e.value) : ((t = e.value) instanceof a ? t : new a(function (e) {
                        e(t)
                    })).then(n, o)
                }

                i((s = s.apply(e, u || [])).next())
            })
        }, Mk = r && r.__generator || function (n, o) {
            var i, u, a, s = {
                label: 0, sent: function () {
                    if (1 & a[0]) throw a[1];
                    return a[1]
                }, trys: [], ops: []
            }, c = {next: e(0), throw: e(1), return: e(2)};
            return "function" == typeof Symbol && (c[Symbol.iterator] = function () {
                return this
            }), c;

            function e(r) {
                return function (e) {
                    var t = [r, e];
                    if (i) throw new TypeError("Generator is already executing.");
                    for (; s = c && t[c = 0] ? 0 : s;) try {
                        if (i = 1, u && (a = 2 & t[0] ? u.return : t[0] ? u.throw || ((a = u.return) && a.call(u), 0) : u.next) && !(a = a.call(u, t[1])).done) return a;
                        switch (u = 0, (t = a ? [2 & t[0], a.value] : t)[0]) {
                            case 0:
                            case 1:
                                a = t;
                                break;
                            case 4:
                                return s.label++, {value: t[1], done: !1};
                            case 5:
                                s.label++, u = t[1], t = [0];
                                continue;
                            case 7:
                                t = s.ops.pop(), s.trys.pop();
                                continue;
                            default:
                                if (!(a = 0 < (a = s.trys).length && a[a.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                    s = 0;
                                    continue
                                }
                                if (3 === t[0] && (!a || t[1] > a[0] && t[1] < a[3])) {
                                    s.label = t[1];
                                    break
                                }
                                if (6 === t[0] && s.label < a[1]) {
                                    s.label = a[1], a = t;
                                    break
                                }
                                if (a && s.label < a[2]) {
                                    s.label = a[2], s.ops.push(t);
                                    break
                                }
                                a[2] && s.ops.pop(), s.trys.pop();
                                continue
                        }
                        t = o.call(n, s)
                    } catch (e) {
                        t = [6, e], u = 0
                    } finally {
                        i = a = 0
                    }
                    if (5 & t[0]) throw t[1];
                    return {value: t[0] ? t[1] : void 0, done: !0}
                }
            }
        }, xk = (Object.defineProperty(Cf, "__esModule", {value: !0}), hp), Nk = Wd(Xf), Uk = e,
        Dk = Uk.error.SERVICE_UNAVAILABLE,
        I = (Ik = Uk.ConnectionProvider, Rl(Lk, Ik), Lk.prototype._createConnectionErrorHandler = function () {
            return new xk.ConnectionErrorHandler(Dk)
        }, Lk.prototype._createConnection = function (e, r) {
            var n = this;
            return this._createChannelConnection(e).then(function (t) {
                return t._release = function () {
                    return r(e, t)
                }, (n._openConnections[t.id] = t).connect(n._userAgent, n._authToken).catch(function (e) {
                    throw n._destroyConnection(t), e
                })
            })
        }, Lk.prototype._validateConnection = function (e) {
            if (!e.isOpen()) return !1;
            var t = this._config.maxConnectionLifetime;
            return Date.now() - e.creationTimestamp <= t
        }, Lk.prototype._destroyConnection = function (e) {
            return delete this._openConnections[e.id], e.close()
        }, Lk.prototype._verifyConnectivityAndGetServerVersion = function (e) {
            var n = e.address;
            return Ak(this, void 0, void 0, function () {
                var t, r;
                return Mk(this, function (e) {
                    switch (e.label) {
                        case 0:
                            return [4, this._connectionPool.acquire(n)];
                        case 1:
                            t = e.sent(), r = new Uk.ServerInfo(t.server, t.protocol().version), e.label = 2;
                        case 2:
                            return e.trys.push([2, , 5, 7]), t.protocol().isLastMessageLogin() ? [3, 4] : [4, t.resetAndFlush()];
                        case 3:
                            e.sent(), e.label = 4;
                        case 4:
                            return [3, 7];
                        case 5:
                            return [4, t._release()];
                        case 6:
                            return e.sent(), [7];
                        case 7:
                            return [2, r]
                    }
                })
            })
        }, Lk.prototype.close = function () {
            return Ak(this, void 0, void 0, function () {
                return Mk(this, function (e) {
                    switch (e.label) {
                        case 0:
                            return [4, this._connectionPool.close()];
                        case 1:
                            return e.sent(), [4, Promise.all(Object.values(this._openConnections).map(function (e) {
                                return e.close()
                            }))];
                        case 2:
                            return e.sent(), [2]
                    }
                })
            })
        }, Lk._installIdleObserverOnConnection = function (e, t) {
            e._queueObserver(t)
        }, Lk._removeIdleObserverOnConnection = function (e) {
            e._updateCurrentObserver()
        }, Lk);

    function Lk(e, t) {
        var r = e.id, n = e.config, o = e.log, i = e.userAgent, e = e.authToken,
            u = (void 0 === t && (t = null), Ik.call(this) || this);
        return u._id = r, u._config = n, u._log = o, u._userAgent = i, u._authToken = e, u._createChannelConnection = t || function (e) {
            return (0, xk.createChannelConnection)(e, u._config, u._createConnectionErrorHandler(), u._log)
        }, u._connectionPool = new Nk.default({
            create: u._createConnection.bind(u),
            destroy: u._destroyConnection.bind(u),
            validate: u._validateConnection.bind(u),
            installIdleObserver: Lk._installIdleObserverOnConnection.bind(u),
            removeIdleObserver: Lk._removeIdleObserverOnConnection.bind(u),
            config: Nk.PoolConfig.fromDriverConfig(n),
            log: u._log
        }), u._openConnections = {}, u
    }

    Cf.default = I;
    var Bk, Fk, Wp = {}, Ra = r && r.__extends || (Bk = function (e, t) {
            return (Bk = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
            })(e, t)
        }, function (e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

            function r() {
                this.constructor = e
            }

            Bk(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
        }), Wk = r && r.__awaiter || function (e, u, a, s) {
            return new (a = a || Promise)(function (r, t) {
                function n(e) {
                    try {
                        i(s.next(e))
                    } catch (e) {
                        t(e)
                    }
                }

                function o(e) {
                    try {
                        i(s.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }

                function i(e) {
                    var t;
                    e.done ? r(e.value) : ((t = e.value) instanceof a ? t : new a(function (e) {
                        e(t)
                    })).then(n, o)
                }

                i((s = s.apply(e, u || [])).next())
            })
        }, zk = r && r.__generator || function (n, o) {
            var i, u, a, s = {
                label: 0, sent: function () {
                    if (1 & a[0]) throw a[1];
                    return a[1]
                }, trys: [], ops: []
            }, c = {next: e(0), throw: e(1), return: e(2)};
            return "function" == typeof Symbol && (c[Symbol.iterator] = function () {
                return this
            }), c;

            function e(r) {
                return function (e) {
                    var t = [r, e];
                    if (i) throw new TypeError("Generator is already executing.");
                    for (; s = c && t[c = 0] ? 0 : s;) try {
                        if (i = 1, u && (a = 2 & t[0] ? u.return : t[0] ? u.throw || ((a = u.return) && a.call(u), 0) : u.next) && !(a = a.call(u, t[1])).done) return a;
                        switch (u = 0, (t = a ? [2 & t[0], a.value] : t)[0]) {
                            case 0:
                            case 1:
                                a = t;
                                break;
                            case 4:
                                return s.label++, {value: t[1], done: !1};
                            case 5:
                                s.label++, u = t[1], t = [0];
                                continue;
                            case 7:
                                t = s.ops.pop(), s.trys.pop();
                                continue;
                            default:
                                if (!(a = 0 < (a = s.trys).length && a[a.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                    s = 0;
                                    continue
                                }
                                if (3 === t[0] && (!a || t[1] > a[0] && t[1] < a[3])) {
                                    s.label = t[1];
                                    break
                                }
                                if (6 === t[0] && s.label < a[1]) {
                                    s.label = a[1], a = t;
                                    break
                                }
                                if (a && s.label < a[2]) {
                                    s.label = a[2], s.ops.push(t);
                                    break
                                }
                                a[2] && s.ops.pop(), s.trys.pop();
                                continue
                        }
                        t = o.call(n, s)
                    } catch (e) {
                        t = [6, e], u = 0
                    } finally {
                        i = a = 0
                    }
                    if (5 & t[0]) throw t[1];
                    return {value: t[0] ? t[1] : void 0, done: !0}
                }
            }
        }, id = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        }, Ld = (Object.defineProperty(Wp, "__esModule", {value: !0}), id(Cf)), qk = hp, mh = e.internal.constants,
        Vk = mh.BOLT_PROTOCOL_V3, Hk = mh.BOLT_PROTOCOL_V4_0, Yk = mh.BOLT_PROTOCOL_V4_4,
        Kk = e.error.SERVICE_UNAVAILABLE,
        vh = (Fk = Ld.default, Ra(Gk, Fk), Gk.prototype.acquireConnection = function (e) {
            var r = this, e = void 0 === e ? {} : e, n = (e.accessMode, e.database),
                t = (e.bookmarks, qk.ConnectionErrorHandler.create({
                    errorCode: Kk,
                    handleAuthorizationExpired: function (e, t) {
                        return r._handleAuthorizationExpired(e, t, n)
                    }
                }));
            return this._connectionPool.acquire(this._address).then(function (e) {
                return new qk.DelegateConnection(e, t)
            })
        }, Gk.prototype._handleAuthorizationExpired = function (e, t, r) {
            return this._log.warn("Direct driver ".concat(this._id, " will close connection to ").concat(t, " for database '").concat(r, "' because of an error ").concat(e.code, " '").concat(e.message, "'")), this._connectionPool.purge(t).catch(function () {
            }), e
        }, Gk.prototype._hasProtocolVersion = function (n) {
            return Wk(this, void 0, void 0, function () {
                var t, r;
                return zk(this, function (e) {
                    switch (e.label) {
                        case 0:
                            return [4, (0, qk.createChannelConnection)(this._address, this._config, this._createConnectionErrorHandler(), this._log)];
                        case 1:
                            return t = e.sent(), r = t.protocol() ? t.protocol().version : null, [4, t.close()];
                        case 2:
                            return e.sent(), r ? [2, n(r)] : [2, !1]
                    }
                })
            })
        }, Gk.prototype.supportsMultiDb = function () {
            return Wk(this, void 0, void 0, function () {
                return zk(this, function (e) {
                    switch (e.label) {
                        case 0:
                            return [4, this._hasProtocolVersion(function (e) {
                                return Hk <= e
                            })];
                        case 1:
                            return [2, e.sent()]
                    }
                })
            })
        }, Gk.prototype.getNegotiatedProtocolVersion = function () {
            var r = this;
            return new Promise(function (e, t) {
                r._hasProtocolVersion(e).catch(t)
            })
        }, Gk.prototype.supportsTransactionConfig = function () {
            return Wk(this, void 0, void 0, function () {
                return zk(this, function (e) {
                    switch (e.label) {
                        case 0:
                            return [4, this._hasProtocolVersion(function (e) {
                                return Vk <= e
                            })];
                        case 1:
                            return [2, e.sent()]
                    }
                })
            })
        }, Gk.prototype.supportsUserImpersonation = function () {
            return Wk(this, void 0, void 0, function () {
                return zk(this, function (e) {
                    switch (e.label) {
                        case 0:
                            return [4, this._hasProtocolVersion(function (e) {
                                return Yk <= e
                            })];
                        case 1:
                            return [2, e.sent()]
                    }
                })
            })
        }, Gk.prototype.verifyConnectivityAndGetServerInfo = function () {
            return Wk(this, void 0, void 0, function () {
                return zk(this, function (e) {
                    switch (e.label) {
                        case 0:
                            return [4, this._verifyConnectivityAndGetServerVersion({address: this._address})];
                        case 1:
                            return [2, e.sent()]
                    }
                })
            })
        }, Gk);

    function Gk(e) {
        var t = e.id, r = e.config, n = e.log, o = e.address, i = e.userAgent, e = e.authToken,
            t = Fk.call(this, {id: t, config: r, log: n, userAgent: i, authToken: e}) || this;
        return t._address = o, t
    }

    Wp.default = vh;
    var Bh = {}, Gh = {}, pb = {}, _b = {}, Zk = r && r.__read || function (e, t) {
            var r = "function" == typeof Symbol && e[Symbol.iterator];
            if (!r) return e;
            var n, o, i = r.call(e), u = [];
            try {
                for (; (void 0 === t || 0 < t--) && !(n = i.next()).done;) u.push(n.value)
            } catch (e) {
                o = {error: e}
            } finally {
                try {
                    n && !n.done && (r = i.return) && r.call(i)
                } finally {
                    if (o) throw o.error
                }
            }
            return u
        }, Qk = r && r.__spreadArray || function (e, t, r) {
            if (r || 2 === arguments.length) for (var n, o = 0, i = t.length; o < i; o++) !n && o in t || ((n = n || Array.prototype.slice.call(t, 0, o))[o] = t[o]);
            return e.concat(n || Array.prototype.slice.call(t))
        }, Xk = (Object.defineProperty(_b, "__esModule", {value: !0}), _b.createValidRoutingTable = void 0, e),
        gb = Xk.internal.constants, Jk = gb.ACCESS_MODE_WRITE, $k = gb.ACCESS_MODE_READ,
        eA = Xk.internal.serverAddress.ServerAddress, tA = Xk.error.PROTOCOL_ERROR,
        rA = (nA.fromRawRoutingTable = iA, nA.prototype.forget = function (e) {
            this.readers = oA(this.readers, e), this.writers = oA(this.writers, e)
        }, nA.prototype.forgetRouter = function (e) {
            this.routers = oA(this.routers, e)
        }, nA.prototype.forgetWriter = function (e) {
            this.writers = oA(this.writers, e)
        }, nA.prototype.isStaleFor = function (e) {
            return this.expirationTime.lessThan(Date.now()) || this.routers.length < 1 || e === $k && 0 === this.readers.length || e === Jk && 0 === this.writers.length
        }, nA.prototype.isExpiredFor = function (e) {
            return this.expirationTime.add(e).lessThan(Date.now())
        }, nA.prototype.allServers = function () {
            return Qk(Qk(Qk([], Zk(this.routers), !1), Zk(this.readers), !1), Zk(this.writers), !1)
        }, nA.prototype.toString = function () {
            return "RoutingTable[" + "database=".concat(this.databaseName, ", ") + "expirationTime=".concat(this.expirationTime, ", ") + "currentTime=".concat(Date.now(), ", ") + "routers=[".concat(this.routers, "], ") + "readers=[".concat(this.readers, "], ") + "writers=[".concat(this.writers, "]]")
        }, nA);

    function nA(e) {
        var e = void 0 === e ? {} : e, t = e.database, r = e.routers, n = e.readers, o = e.writers,
            i = e.expirationTime, e = e.ttl;
        this.database = t || null, this.databaseName = t || "default database", this.routers = r || [], this.readers = n || [], this.writers = o || [], this.expirationTime = i || (0, Xk.int)(0), this.ttl = e
    }

    function oA(e, t) {
        return e.filter(function (e) {
            return e.asKey() !== t.asKey()
        })
    }

    function iA(e, t, r) {
        var n = r.ttl, o = function (t, r) {
            try {
                var e = (0, Xk.int)(Date.now()), n = (0, Xk.int)(t.ttl).multiply(1e3).add(e);
                return n.lessThan(e) ? Xk.Integer.MAX_VALUE : n
            } catch (e) {
                throw(0, Xk.newError)("Unable to parse TTL entry from router ".concat(r, " from raw routing table:\n").concat(Xk.json.stringify(t), "\nError message: ").concat(e.message), tA)
            }
        }(r, t), i = function (t, r) {
            try {
                var n = [], o = [], i = [];
                return t.servers.forEach(function (e) {
                    var t = e.role, e = e.addresses;
                    "ROUTE" === t ? n = aA(e).map(function (e) {
                        return eA.fromUrl(e)
                    }) : "WRITE" === t ? i = aA(e).map(function (e) {
                        return eA.fromUrl(e)
                    }) : "READ" === t && (o = aA(e).map(function (e) {
                        return eA.fromUrl(e)
                    }))
                }), {routers: n, readers: o, writers: i}
            } catch (e) {
                throw(0, Xk.newError)("Unable to parse servers entry from router ".concat(r, " from addresses:\n").concat(Xk.json.stringify(t.servers), "\nError message: ").concat(e.message), tA)
            }
        }(r, t), u = i.routers, a = i.readers, i = i.writers;
        return uA(u, "routers", t), uA(a, "readers", t), new rA({
            database: e || r.db,
            routers: u,
            readers: a,
            writers: i,
            expirationTime: o,
            ttl: n
        })
    }

    function uA(e, t, r) {
        if (0 === e.length) throw(0, Xk.newError)("Received no " + t + " from router " + r, tA)
    }

    function aA(e) {
        if (Array.isArray(e)) return Array.from(e);
        throw new TypeError("Array expected but got: " + e)
    }

    _b.default = rA, _b.createValidRoutingTable = iA;
    var tb = r && r.__importDefault || function (e) {
        return e && e.__esModule ? e : {default: e}
    }, sA = (Object.defineProperty(pb, "__esModule", {value: !0}), tb(_b));

    function cA(e) {
        this._routingContext = e
    }

    cA.prototype.lookupRoutingTableOnRouter = function (t, r, n, o) {
        var i = this;
        return t._acquireConnection(function (e) {
            return i._requestRawRoutingTable(e, t, r, n, o).then(function (e) {
                return e.isNull ? null : sA.default.fromRawRoutingTable(r, n, e)
            })
        })
    }, cA.prototype._requestRawRoutingTable = function (r, n, o, e, i) {
        var u = this;
        return new Promise(function (e, t) {
            r.protocol().requestRoutingInformation({
                routingContext: u._routingContext,
                databaseName: o,
                impersonatedUser: i,
                sessionContext: {
                    bookmarks: n._lastBookmarks,
                    mode: n._mode,
                    database: n._database,
                    afterComplete: n._onComplete
                },
                onCompleted: e,
                onError: t
            })
        })
    }, pb.default = cA;
    var lA, fA, Ob = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        }, wb = (Object.defineProperty(Gh, "__esModule", {value: !0}), Gh.RoutingTable = Gh.Rediscovery = void 0, Ob(pb)),
        qh = (Gh.Rediscovery = wb.default, Ob(_b)),
        $h = (Gh.RoutingTable = qh.default, Gh.default = wb.default, r && r.__extends || (lA = function (e, t) {
            return (lA = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
            })(e, t)
        }, function (e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

            function r() {
                this.constructor = e
            }

            lA(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
        })), pA = r && r.__assign || function () {
            return (pA = Object.assign || function (e) {
                for (var t, r = 1, n = arguments.length; r < n; r++) for (var o in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }).apply(this, arguments)
        }, dA = r && r.__createBinding || (Object.create ? function (e, t, r, n) {
            void 0 === n && (n = r);
            var o = Object.getOwnPropertyDescriptor(t, r);
            o && ("get" in o ? t.__esModule : !o.writable && !o.configurable) || (o = {
                enumerable: !0, get: function () {
                    return t[r]
                }
            }), Object.defineProperty(e, n, o)
        } : function (e, t, r, n) {
            e[n = void 0 === n ? r : n] = t[r]
        }), hA = r && r.__setModuleDefault || (Object.create ? function (e, t) {
            Object.defineProperty(e, "default", {enumerable: !0, value: t})
        } : function (e, t) {
            e.default = t
        }), Ib = r && r.__importStar || function (e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e) for (var r in e) "default" !== r && Object.prototype.hasOwnProperty.call(e, r) && dA(t, e, r);
            return hA(t, e), t
        }, bA = r && r.__awaiter || function (e, u, a, s) {
            return new (a = a || Promise)(function (r, t) {
                function n(e) {
                    try {
                        i(s.next(e))
                    } catch (e) {
                        t(e)
                    }
                }

                function o(e) {
                    try {
                        i(s.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }

                function i(e) {
                    var t;
                    e.done ? r(e.value) : ((t = e.value) instanceof a ? t : new a(function (e) {
                        e(t)
                    })).then(n, o)
                }

                i((s = s.apply(e, u || [])).next())
            })
        }, yA = r && r.__generator || function (n, o) {
            var i, u, a, s = {
                label: 0, sent: function () {
                    if (1 & a[0]) throw a[1];
                    return a[1]
                }, trys: [], ops: []
            }, c = {next: e(0), throw: e(1), return: e(2)};
            return "function" == typeof Symbol && (c[Symbol.iterator] = function () {
                return this
            }), c;

            function e(r) {
                return function (e) {
                    var t = [r, e];
                    if (i) throw new TypeError("Generator is already executing.");
                    for (; s = c && t[c = 0] ? 0 : s;) try {
                        if (i = 1, u && (a = 2 & t[0] ? u.return : t[0] ? u.throw || ((a = u.return) && a.call(u), 0) : u.next) && !(a = a.call(u, t[1])).done) return a;
                        switch (u = 0, (t = a ? [2 & t[0], a.value] : t)[0]) {
                            case 0:
                            case 1:
                                a = t;
                                break;
                            case 4:
                                return s.label++, {value: t[1], done: !1};
                            case 5:
                                s.label++, u = t[1], t = [0];
                                continue;
                            case 7:
                                t = s.ops.pop(), s.trys.pop();
                                continue;
                            default:
                                if (!(a = 0 < (a = s.trys).length && a[a.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                    s = 0;
                                    continue
                                }
                                if (3 === t[0] && (!a || t[1] > a[0] && t[1] < a[3])) {
                                    s.label = t[1];
                                    break
                                }
                                if (6 === t[0] && s.label < a[1]) {
                                    s.label = a[1], a = t;
                                    break
                                }
                                if (a && s.label < a[2]) {
                                    s.label = a[2], s.ops.push(t);
                                    break
                                }
                                a[2] && s.ops.pop(), s.trys.pop();
                                continue
                        }
                        t = o.call(n, s)
                    } catch (e) {
                        t = [6, e], u = 0
                    } finally {
                        i = a = 0
                    }
                    if (5 & t[0]) throw t[1];
                    return {value: t[0] ? t[1] : void 0, done: !0}
                }
            }
        }, _A = r && r.__values || function (e) {
            var t = "function" == typeof Symbol && Symbol.iterator, r = t && e[t], n = 0;
            if (r) return r.call(e);
            if (e && "number" == typeof e.length) return {
                next: function () {
                    return {value: (e = e && n >= e.length ? void 0 : e) && e[n++], done: !e}
                }
            };
            throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
        }, vA = r && r.__read || function (e, t) {
            var r = "function" == typeof Symbol && e[Symbol.iterator];
            if (!r) return e;
            var n, o, i = r.call(e), u = [];
            try {
                for (; (void 0 === t || 0 < t--) && !(n = i.next()).done;) u.push(n.value)
            } catch (e) {
                o = {error: e}
            } finally {
                try {
                    n && !n.done && (r = i.return) && r.call(i)
                } finally {
                    if (o) throw o.error
                }
            }
            return u
        }, Fb = r && r.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        }, mA = (Object.defineProperty(Bh, "__esModule", {value: !0}), e), gA = Ib(Gh), OA = Il, wA = Fb(op), Ph = Fb(Cf),
        EA = qa, PA = hp, SA = mA.error.SERVICE_UNAVAILABLE, TA = mA.error.SESSION_EXPIRED,
        jA = mA.internal.bookmarks.Bookmarks, Mb = mA.internal.constants, CA = Mb.ACCESS_MODE_READ,
        IA = Mb.ACCESS_MODE_WRITE, RA = Mb.BOLT_PROTOCOL_V3, kA = Mb.BOLT_PROTOCOL_V4_0, AA = Mb.BOLT_PROTOCOL_V4_4,
        MA = (0, mA.int)(3e4),
        Ic = (fA = Ph.default, $h(x, fA), x.prototype._createConnectionErrorHandler = function () {
            return new PA.ConnectionErrorHandler(TA)
        }, x.prototype._handleUnavailability = function (e, t, r) {
            return this._log.warn("Routing driver ".concat(this._id, " will forget ").concat(t, " for database '").concat(r, "' because of an error ").concat(e.code, " '").concat(e.message, "'")), this.forget(t, r || null), e
        }, x.prototype._handleAuthorizationExpired = function (e, t, r) {
            return this._log.warn("Routing driver ".concat(this._id, " will close connections to ").concat(t, " for database '").concat(r, "' because of an error ").concat(e.code, " '").concat(e.message, "'")), this._connectionPool.purge(t).catch(function () {
            }), e
        }, x.prototype._handleWriteFailure = function (e, t, r) {
            return this._log.warn("Routing driver ".concat(this._id, " will forget writer ").concat(t, " for database '").concat(r, "' because of an error ").concat(e.code, " '").concat(e.message, "'")), this.forgetWriter(t, r || null), (0, mA.newError)("No longer possible to write to server at " + t, TA, e)
        }, x.prototype.acquireConnection = function (e) {
            var e = void 0 === e ? {} : e, s = e.accessMode, c = e.database, l = e.bookmarks, f = e.impersonatedUser,
                p = e.onDatabaseNameResolved;
            return bA(this, void 0, void 0, function () {
                var t, r, n, o, i, u, a = this;
                return yA(this, function (e) {
                    switch (e.label) {
                        case 0:
                            return n = {database: c || null}, o = new PA.ConnectionErrorHandler(TA, function (e, t) {
                                return a._handleUnavailability(e, t, n.database)
                            }, function (e, t) {
                                return a._handleWriteFailure(e, t, n.database)
                            }, function (e, t) {
                                return a._handleAuthorizationExpired(e, t, n.database)
                            }), [4, this._freshRoutingTable({
                                accessMode: s,
                                database: n.database,
                                bookmarks: l,
                                impersonatedUser: f,
                                onDatabaseNameResolved: function (e) {
                                    n.database = n.database || e, p && p(e)
                                }
                            })];
                        case 1:
                            if (i = e.sent(), s === CA) r = this._loadBalancingStrategy.selectReader(i.readers), t = "read"; else {
                                if (s !== IA) throw(0, mA.newError)("Illegal mode " + s);
                                r = this._loadBalancingStrategy.selectWriter(i.writers), t = "write"
                            }
                            if (!r) throw(0, mA.newError)("Failed to obtain connection towards ".concat(t, " server. Known routing table is: ").concat(i), TA);
                            e.label = 2;
                        case 2:
                            return e.trys.push([2, 4, , 5]), [4, this._acquireConnectionToServer(r, t, i)];
                        case 3:
                            return u = e.sent(), [2, new PA.DelegateConnection(u, o)];
                        case 4:
                            throw u = e.sent(), o.handleAndTransformError(u, r);
                        case 5:
                            return [2]
                    }
                })
            })
        }, x.prototype._hasProtocolVersion = function (u) {
            return bA(this, void 0, void 0, function () {
                var t, r, n, o, i;
                return yA(this, function (e) {
                    switch (e.label) {
                        case 0:
                            return [4, this._resolveSeedRouter(this._seedRouter)];
                        case 1:
                            t = e.sent(), n = 0, e.label = 2;
                        case 2:
                            if (!(n < t.length)) return [3, 8];
                            e.label = 3;
                        case 3:
                            return e.trys.push([3, 6, , 7]), [4, (0, PA.createChannelConnection)(t[n], this._config, this._createConnectionErrorHandler(), this._log)];
                        case 4:
                            return i = e.sent(), o = i.protocol() ? i.protocol().version : null, [4, i.close()];
                        case 5:
                            return e.sent(), o ? [2, u(o)] : [2, !1];
                        case 6:
                            return i = e.sent(), r = i, [3, 7];
                        case 7:
                            return n++, [3, 2];
                        case 8:
                            if (r) throw r;
                            return [2, !1]
                    }
                })
            })
        }, x.prototype.supportsMultiDb = function () {
            return bA(this, void 0, void 0, function () {
                return yA(this, function (e) {
                    switch (e.label) {
                        case 0:
                            return [4, this._hasProtocolVersion(function (e) {
                                return kA <= e
                            })];
                        case 1:
                            return [2, e.sent()]
                    }
                })
            })
        }, x.prototype.supportsTransactionConfig = function () {
            return bA(this, void 0, void 0, function () {
                return yA(this, function (e) {
                    switch (e.label) {
                        case 0:
                            return [4, this._hasProtocolVersion(function (e) {
                                return RA <= e
                            })];
                        case 1:
                            return [2, e.sent()]
                    }
                })
            })
        }, x.prototype.supportsUserImpersonation = function () {
            return bA(this, void 0, void 0, function () {
                return yA(this, function (e) {
                    switch (e.label) {
                        case 0:
                            return [4, this._hasProtocolVersion(function (e) {
                                return AA <= e
                            })];
                        case 1:
                            return [2, e.sent()]
                    }
                })
            })
        }, x.prototype.getNegotiatedProtocolVersion = function () {
            var r = this;
            return new Promise(function (e, t) {
                r._hasProtocolVersion(e).catch(t)
            })
        }, x.prototype.verifyConnectivityAndGetServerInfo = function (e) {
            var l = e.database, f = e.accessMode;
            return bA(this, void 0, void 0, function () {
                var t, r, n, o, i, u, a, s, c;
                return yA(this, function (e) {
                    switch (e.label) {
                        case 0:
                            return t = {database: l || null}, [4, this._freshRoutingTable({
                                accessMode: f,
                                database: t.database,
                                onDatabaseNameResolved: function (e) {
                                    t.database = t.database || e
                                }
                            })];
                        case 1:
                            r = e.sent(), r = f === IA ? r.writers : r.readers, n = (0, mA.newError)("No servers available for database '".concat(t.database, "' with access mode '").concat(f, "'"), SA), e.label = 2;
                        case 2:
                            e.trys.push([2, 9, 10, 11]), o = _A(r), i = o.next(), e.label = 3;
                        case 3:
                            if (i.done) return [3, 8];
                            u = i.value, e.label = 4;
                        case 4:
                            return e.trys.push([4, 6, , 7]), [4, this._verifyConnectivityAndGetServerVersion({address: u})];
                        case 5:
                            return [2, e.sent()];
                        case 6:
                            return a = e.sent(), n = a, [3, 7];
                        case 7:
                            return i = o.next(), [3, 3];
                        case 8:
                            return [3, 11];
                        case 9:
                            return a = e.sent(), s = {error: a}, [3, 11];
                        case 10:
                            try {
                                i && !i.done && (c = o.return) && c.call(o)
                            } finally {
                                if (s) throw s.error
                            }
                            return [7];
                        case 11:
                            throw n
                    }
                })
            })
        }, x.prototype.forget = function (t, e) {
            this._routingTableRegistry.apply(e, {
                applyWhenExists: function (e) {
                    return e.forget(t)
                }
            }), this._connectionPool.purge(t).catch(function () {
            })
        }, x.prototype.forgetWriter = function (t, e) {
            this._routingTableRegistry.apply(e, {
                applyWhenExists: function (e) {
                    return e.forgetWriter(t)
                }
            })
        }, x.prototype._acquireConnectionToServer = function (e, t, r) {
            return this._connectionPool.acquire(e)
        }, x.prototype._freshRoutingTable = function (e) {
            var e = void 0 === e ? {} : e, t = e.accessMode, r = e.database, n = e.bookmarks, o = e.impersonatedUser,
                e = e.onDatabaseNameResolved, i = this._routingTableRegistry.get(r, function () {
                    return new gA.RoutingTable({database: r})
                });
            return i.isStaleFor(t) ? (this._log.info('Routing table is stale for database: "'.concat(r, '" and access mode: "').concat(t, '": ').concat(i)), this._refreshRoutingTable(i, n, o, e)) : i
        }, x.prototype._refreshRoutingTable = function (e, t, r, n) {
            var o = e.routers;
            return this._useSeedRouter ? this._fetchRoutingTableFromSeedRouterFallbackToKnownRouters(o, e, t, r, n) : this._fetchRoutingTableFromKnownRoutersFallbackToSeedRouter(o, e, t, r, n)
        }, x.prototype._fetchRoutingTableFromSeedRouterFallbackToKnownRouters = function (u, a, s, c, l) {
            return bA(this, void 0, void 0, function () {
                var t, r, n, o, i;
                return yA(this, function (e) {
                    switch (e.label) {
                        case 0:
                            return t = [], [4, this._fetchRoutingTableUsingSeedRouter(t, this._seedRouter, a, s, c)];
                        case 1:
                            return (t = vA.apply(void 0, [e.sent(), 2]), r = t[0], n = t[1], r) ? (this._useSeedRouter = !1, [3, 4]) : [3, 2];
                        case 2:
                            return [4, this._fetchRoutingTableUsingKnownRouters(u, a, s, c)];
                        case 3:
                            i = vA.apply(void 0, [e.sent(), 2]), o = i[0], i = i[1], r = o, n = i || n, e.label = 4;
                        case 4:
                            return [4, this._applyRoutingTableIfPossible(a, r, l, n)];
                        case 5:
                            return [2, e.sent()]
                    }
                })
            })
        }, x.prototype._fetchRoutingTableFromKnownRoutersFallbackToSeedRouter = function (o, i, u, a, s) {
            return bA(this, void 0, void 0, function () {
                var t, r, n;
                return yA(this, function (e) {
                    switch (e.label) {
                        case 0:
                            return [4, this._fetchRoutingTableUsingKnownRouters(o, i, u, a)];
                        case 1:
                            return r = vA.apply(void 0, [e.sent(), 2]), t = r[0], r = r[1], t ? [3, 3] : [4, this._fetchRoutingTableUsingSeedRouter(o, this._seedRouter, i, u, a)];
                        case 2:
                            n = vA.apply(void 0, [e.sent(), 2]), t = n[0], r = n[1], e.label = 3;
                        case 3:
                            return [4, this._applyRoutingTableIfPossible(i, t, s, r)];
                        case 4:
                            return [2, e.sent()]
                    }
                })
            })
        }, x.prototype._fetchRoutingTableUsingKnownRouters = function (n, o, i, u) {
            return bA(this, void 0, void 0, function () {
                var t, r;
                return yA(this, function (e) {
                    switch (e.label) {
                        case 0:
                            return [4, this._fetchRoutingTable(n, o, i, u)];
                        case 1:
                            return (t = vA.apply(void 0, [e.sent(), 2]), r = t[0], t = t[1], r) ? [2, [r, null]] : (r = n.length - 1, x._forgetRouter(o, n, r), [2, [null, t]])
                    }
                })
            })
        }, x.prototype._fetchRoutingTableUsingSeedRouter = function (r, n, o, i, u) {
            return bA(this, void 0, void 0, function () {
                var t;
                return yA(this, function (e) {
                    switch (e.label) {
                        case 0:
                            return [4, this._resolveSeedRouter(n)];
                        case 1:
                            return t = e.sent(), t = t.filter(function (e) {
                                return r.indexOf(e) < 0
                            }), [4, this._fetchRoutingTable(t, o, i, u)];
                        case 2:
                            return [2, e.sent()]
                    }
                })
            })
        }, x.prototype._resolveSeedRouter = function (n) {
            return bA(this, void 0, void 0, function () {
                var t, r = this;
                return yA(this, function (e) {
                    switch (e.label) {
                        case 0:
                            return [4, this._hostNameResolver.resolve(n)];
                        case 1:
                            return t = e.sent(), [4, Promise.all(t.map(function (e) {
                                return r._dnsResolver.resolve(e)
                            }))];
                        case 2:
                            return t = e.sent(), [2, [].concat.apply([], t)]
                    }
                })
            })
        }, x.prototype._fetchRoutingTable = function (s, c, l, f) {
            return bA(this, void 0, void 0, function () {
                var t = this;
                return yA(this, function (e) {
                    return [2, s.reduce(function (i, u, a) {
                        return bA(t, void 0, void 0, function () {
                            var t, r, n, o;
                            return yA(this, function (e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, i];
                                    case 1:
                                        return (t = vA.apply(void 0, [e.sent(), 1]), t = t[0]) ? [2, [t, null]] : (x._forgetRouter(c, s, a - 1), [4, this._createSessionForRediscovery(u, l, f)]);
                                    case 2:
                                        if (t = vA.apply(void 0, [e.sent(), 2]), r = t[0], n = t[1], !r) return [3, 8];
                                        e.label = 3;
                                    case 3:
                                        return e.trys.push([3, 5, 6, 7]), [4, this._rediscovery.lookupRoutingTableOnRouter(r, c.database, u, f)];
                                    case 4:
                                        return [2, [e.sent(), null]];
                                    case 5:
                                        return o = e.sent(), [2, this._handleRediscoveryError(o, u)];
                                    case 6:
                                        return r.close(), [7];
                                    case 7:
                                        return [3, 9];
                                    case 8:
                                        return [2, [null, n]];
                                    case 9:
                                        return [2]
                                }
                            })
                        })
                    }, Promise.resolve([null, null]))]
                })
            })
        }, x.prototype._createSessionForRediscovery = function (o, i, u) {
            return bA(this, void 0, void 0, function () {
                var t, r, n = this;
                return yA(this, function (e) {
                    switch (e.label) {
                        case 0:
                            return e.trys.push([0, 2, , 3]), [4, this._connectionPool.acquire(o)];
                        case 1:
                            return r = e.sent(), t = PA.ConnectionErrorHandler.create({
                                errorCode: TA,
                                handleAuthorizationExpired: function (e, t) {
                                    return n._handleAuthorizationExpired(e, t)
                                }
                            }), t = new wA.default(new PA.DelegateConnection(r, t)), r.protocol().version < 4 ? [2, [new mA.Session({
                                mode: IA,
                                bookmarks: jA.empty(),
                                connectionProvider: t
                            }), null]] : [2, [new mA.Session({
                                mode: CA,
                                database: "system",
                                bookmarks: i,
                                connectionProvider: t,
                                impersonatedUser: u
                            }), null]];
                        case 2:
                            return r = e.sent(), [2, this._handleRediscoveryError(r, o)];
                        case 3:
                            return [2]
                    }
                })
            })
        }, x.prototype._handleRediscoveryError = function (e, t) {
            if (["Neo.ClientError.Database.DatabaseNotFound", "Neo.ClientError.Transaction.InvalidBookmark", "Neo.ClientError.Transaction.InvalidBookmarkMixture", "Neo.ClientError.Statement.ArgumentError", "Neo.ClientError.Request.Invalid", "Neo.ClientError.Statement.TypeError"].includes(e.code) || (r = e).code.startsWith("Neo.ClientError.Security.") && !["Neo.ClientError.Security.AuthorizationExpired"].includes(r.code)) throw e;
            if ("Neo.ClientError.Procedure.ProcedureNotFound" === e.code) throw(0, mA.newError)("Server at ".concat(t.asHostPort(), " can't perform routing. Make sure you are connecting to a causal cluster"), SA, e);
            var r;
            return this._log.warn("unable to fetch routing table because of an error ".concat(e)), [null, e]
        }, x.prototype._applyRoutingTableIfPossible = function (t, r, n, o) {
            return bA(this, void 0, void 0, function () {
                return yA(this, function (e) {
                    switch (e.label) {
                        case 0:
                            if (r) return 0 === r.writers.length && (this._useSeedRouter = !0), [4, this._updateRoutingTable(r, n)];
                            throw(0, mA.newError)("Could not perform discovery. No routing servers available. Known routing table: ".concat(t), SA, o);
                        case 1:
                            return e.sent(), [2, r]
                    }
                })
            })
        }, x.prototype._updateRoutingTable = function (t, r) {
            return bA(this, void 0, void 0, function () {
                return yA(this, function (e) {
                    switch (e.label) {
                        case 0:
                            return [4, this._connectionPool.keepAll(t.allServers())];
                        case 1:
                            return e.sent(), this._routingTableRegistry.removeExpired(), this._routingTableRegistry.register(t), r(t.database), this._log.info("Updated routing table ".concat(t)), [2]
                    }
                })
            })
        }, x._forgetRouter = function (e, t, r) {
            t = t[r];
            e && t && e.forgetRouter(t)
        }, x);

    function x(e) {
        var t = e.id, r = e.address, n = e.routingContext, o = e.hostNameResolver, i = e.config, u = e.log,
            a = e.userAgent, s = e.authToken, e = e.routingTablePurgeDelay,
            c = fA.call(this, {id: t, config: i, log: u, userAgent: a, authToken: s}, function (e) {
                return (0, PA.createChannelConnection)(e, c._config, c._createConnectionErrorHandler(), c._log, c._routingContext)
            }) || this;
        return c._routingContext = pA(pA({}, n), {address: r.toString()}), c._seedRouter = r, c._rediscovery = new gA.default(c._routingContext), c._loadBalancingStrategy = new EA.LeastConnectedLoadBalancingStrategy(c._connectionPool), c._hostNameResolver = o, c._dnsResolver = new OA.HostNameResolver, c._log = u, c._useSeedRouter = !0, c._routingTableRegistry = new XA(e ? (0, mA.int)(e) : MA), c
    }

    Bh.default = Ic;
    JA.prototype.register = function (e) {
        return this._tables.set(e.database, e), this
    }, JA.prototype.apply = function (e, t) {
        var t = void 0 === t ? {} : t, r = t.applyWhenExists, t = t.applyWhenDontExists,
            t = void 0 === t ? function () {
            } : t;
        return this._tables.has(e) ? r(this._tables.get(e)) : "string" == typeof e || null === e ? t() : this._forEach(r), this
    }, JA.prototype.get = function (e, t) {
        return this._tables.has(e) ? this._tables.get(e) : "function" == typeof t ? t() : t
    }, JA.prototype.removeExpired = function () {
        var t = this;
        return this._removeIf(function (e) {
            return e.isExpiredFor(t._routingTablePurgeDelay)
        })
    }, JA.prototype._forEach = function (e) {
        var t, r;
        try {
            for (var n = _A(this._tables), o = n.next(); !o.done; o = n.next()) e(vA(o.value, 2)[1])
        } catch (e) {
            t = {error: e}
        } finally {
            try {
                o && !o.done && (r = n.return) && r.call(n)
            } finally {
                if (t) throw t.error
            }
        }
        return this
    }, JA.prototype._remove = function (e) {
        return this._tables.delete(e), this
    }, JA.prototype._removeIf = function (e) {
        var t, r;
        try {
            for (var n = _A(this._tables), o = n.next(); !o.done; o = n.next()) {
                var i = vA(o.value, 2), u = i[0];
                e(i[1]) && this._remove(u)
            }
        } catch (e) {
            t = {error: e}
        } finally {
            try {
                o && !o.done && (r = n.return) && r.call(n)
            } finally {
                if (t) throw t.error
            }
        }
        return this
    };
    var xA, NA, UA, DA, LA, BA, FA, WA, zA, qA, N, VA, HA, YA, KA, GA, ZA, QA, XA = JA;

    function JA(e) {
        this._tables = new Map, this._routingTablePurgeDelay = e
    }

    function $A(e, o, t) {
        void 0 === t && (t = {}), YA(e, "Bolt URL");
        var r, i = ZA.parseDatabaseUrl(e), n = !1, u = !1;
        switch (i.scheme) {
            case"bolt":
                break;
            case"bolt+s":
                u = !0, r = "TRUST_SYSTEM_CA_SIGNED_CERTIFICATES";
                break;
            case"bolt+ssc":
                u = !0, r = "TRUST_ALL_CERTIFICATES";
                break;
            case"neo4j":
                n = !0;
                break;
            case"neo4j+s":
                r = "TRUST_SYSTEM_CA_SIGNED_CERTIFICATES", n = u = !0;
                break;
            case"neo4j+ssc":
                r = "TRUST_ALL_CERTIFICATES", n = u = !0;
                break;
            default:
                throw new Error("Unknown scheme: ".concat(i.scheme))
        }
        if (u) {
            if ("encrypted" in t || "trust" in t) throw new Error("Encryption/trust can only be configured either through URL or config, not both");
            t.encrypted = HA, t.trust = r
        }
        (o = o || {}).scheme = o.scheme || "none", t.userAgent = t.userAgent || QA;
        var a = GA.fromUrl(i.hostAndPort), s = {address: a, typename: n ? "Routing" : "Direct", routing: n};
        return new qA.Driver(s, t, function () {
            {
                if (n) return function (e, t, r, n) {
                    return new VA.RoutingConnectionProvider({
                        id: e,
                        config: t,
                        log: r,
                        hostNameResolver: n,
                        authToken: o,
                        address: a,
                        userAgent: t.userAgent,
                        routingContext: i.query
                    })
                };
                if (KA(i.query)) return function (e, t, r) {
                    return new VA.DirectConnectionProvider({
                        id: e,
                        config: t,
                        log: r,
                        authToken: o,
                        address: a,
                        userAgent: t.userAgent
                    })
                };
                throw new Error("Parameters are not supported with none routed scheme. Given URL: '".concat(e, "'"))
            }
        }())
    }

    function e2(r, n) {
        return WA(this, void 0, void 0, function () {
            var t;
            return zA(this, function (e) {
                switch (e.label) {
                    case 0:
                        t = $A(r, {scheme: "none", principal: "", credentials: ""}, n), e.label = 1;
                    case 1:
                        return e.trys.push([1, , 3, 5]), [4, t.getNegotiatedProtocolVersion()];
                    case 2:
                        return e.sent(), [2, !0];
                    case 3:
                        return [4, t.close()];
                    case 4:
                        return e.sent(), [7];
                    case 5:
                        return [2]
                }
            })
        })
    }

    return hy = S, xA = r && r.__importDefault || function (e) {
        return e && e.__esModule ? e : {default: e}
    }, Object.defineProperty(hy, "__esModule", {value: !0}), hy.RoutingConnectionProvider = hy.DirectConnectionProvider = hy.PooledConnectionProvider = hy.SingleConnectionProvider = void 0, NA = op, Object.defineProperty(hy, "SingleConnectionProvider", {
        enumerable: !0,
        get: function () {
            return xA(NA).default
        }
    }), UA = Cf, Object.defineProperty(hy, "PooledConnectionProvider", {
        enumerable: !0, get: function () {
            return xA(UA).default
        }
    }), DA = Wp, Object.defineProperty(hy, "DirectConnectionProvider", {
        enumerable: !0, get: function () {
            return xA(DA).default
        }
    }), LA = Bh, Object.defineProperty(hy, "RoutingConnectionProvider", {
        enumerable: !0, get: function () {
            return xA(LA).default
        }
    }), Ch = P, BA = r && r.__createBinding || (Object.create ? function (e, t, r, n) {
        void 0 === n && (n = r);
        var o = Object.getOwnPropertyDescriptor(t, r);
        o && ("get" in o ? t.__esModule : !o.writable && !o.configurable) || (o = {
            enumerable: !0, get: function () {
                return t[r]
            }
        }), Object.defineProperty(e, n, o)
    } : function (e, t, r, n) {
        e[n = void 0 === n ? r : n] = t[r]
    }), FA = r && r.__setModuleDefault || (Object.create ? function (e, t) {
        Object.defineProperty(e, "default", {enumerable: !0, value: t})
    } : function (e, t) {
        e.default = t
    }), ry = r && r.__importStar || function (e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var r in e) "default" !== r && Object.prototype.hasOwnProperty.call(e, r) && BA(t, e, r);
        return FA(t, e), t
    }, vy = r && r.__exportStar || function (e, t) {
        for (var r in e) "default" === r || Object.prototype.hasOwnProperty.call(t, r) || BA(t, e, r)
    }, Object.defineProperty(Ch, "__esModule", {value: !0}), Ch.pool = Ch.packstream = Ch.channel = Ch.buf = Ch.bolt = Ch.loadBalancing = void 0, Ch.loadBalancing = ry(qa), Ch.bolt = ry(a), Ch.buf = ry(pf), Ch.channel = ry(Il), Ch.packstream = ry(Bf), Ch.pool = ry(Xf), vy(S, Ch), k = B, WA = r && r.__awaiter || function (e, u, a, s) {
        return new (a = a || Promise)(function (r, t) {
            function n(e) {
                try {
                    i(s.next(e))
                } catch (e) {
                    t(e)
                }
            }

            function o(e) {
                try {
                    i(s.throw(e))
                } catch (e) {
                    t(e)
                }
            }

            function i(e) {
                var t;
                e.done ? r(e.value) : ((t = e.value) instanceof a ? t : new a(function (e) {
                    e(t)
                })).then(n, o)
            }

            i((s = s.apply(e, u || [])).next())
        })
    }, zA = r && r.__generator || function (n, o) {
        var i, u, a, s = {
            label: 0, sent: function () {
                if (1 & a[0]) throw a[1];
                return a[1]
            }, trys: [], ops: []
        }, c = {next: e(0), throw: e(1), return: e(2)};
        return "function" == typeof Symbol && (c[Symbol.iterator] = function () {
            return this
        }), c;

        function e(r) {
            return function (e) {
                var t = [r, e];
                if (i) throw new TypeError("Generator is already executing.");
                for (; s = c && t[c = 0] ? 0 : s;) try {
                    if (i = 1, u && (a = 2 & t[0] ? u.return : t[0] ? u.throw || ((a = u.return) && a.call(u), 0) : u.next) && !(a = a.call(u, t[1])).done) return a;
                    switch (u = 0, (t = a ? [2 & t[0], a.value] : t)[0]) {
                        case 0:
                        case 1:
                            a = t;
                            break;
                        case 4:
                            return s.label++, {value: t[1], done: !1};
                        case 5:
                            s.label++, u = t[1], t = [0];
                            continue;
                        case 7:
                            t = s.ops.pop(), s.trys.pop();
                            continue;
                        default:
                            if (!(a = 0 < (a = s.trys).length && a[a.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                s = 0;
                                continue
                            }
                            if (3 === t[0] && (!a || t[1] > a[0] && t[1] < a[3])) {
                                s.label = t[1];
                                break
                            }
                            if (6 === t[0] && s.label < a[1]) {
                                s.label = a[1], a = t;
                                break
                            }
                            if (a && s.label < a[2]) {
                                s.label = a[2], s.ops.push(t);
                                break
                            }
                            a[2] && s.ops.pop(), s.trys.pop();
                            continue
                    }
                    t = o.call(n, s)
                } catch (e) {
                    t = [6, e], u = 0
                } finally {
                    i = a = 0
                }
                if (5 & t[0]) throw t[1];
                return {value: t[0] ? t[1] : void 0, done: !0}
            }
        }
    }, pl = r && r.__importDefault || function (e) {
        return e && e.__esModule ? e : {default: e}
    }, Object.defineProperty(k, "__esModule", {value: !0}), k.PathSegment = k.Path = k.UnboundRelationship = k.Relationship = k.Node = k.Record = k.ServerInfo = k.Notification = k.QueryStatistics = k.ProfiledPlan = k.Plan = k.ResultSummary = k.RxResult = k.RxManagedTransaction = k.RxTransaction = k.RxSession = k.EagerResult = k.Result = k.ManagedTransaction = k.Transaction = k.Session = k.Driver = k.temporal = k.spatial = k.graph = k.error = k.routing = k.session = k.types = k.logging = k.auth = k.isRetryableError = k.Neo4jError = k.integer = k.isUnboundRelationship = k.isRelationship = k.isPathSegment = k.isPath = k.isNode = k.isDateTime = k.isLocalDateTime = k.isDate = k.isTime = k.isLocalTime = k.isDuration = k.isPoint = k.isInt = k.int = k.hasReachableServer = k.driver = void 0, k.resultTransformers = k.bookmarkManager = k.DateTime = k.LocalDateTime = k.Date = k.Time = k.LocalTime = k.Duration = k.Integer = k.Point = void 0, qA = F, Object.defineProperty(k, "Driver", {
        enumerable: !0,
        get: function () {
            return qA.Driver
        }
    }), $b = pl(i), N = e, Object.defineProperty(k, "Neo4jError", {
        enumerable: !0, get: function () {
            return N.Neo4jError
        }
    }), Object.defineProperty(k, "isRetryableError", {
        enumerable: !0, get: function () {
            return N.isRetryableError
        }
    }), Object.defineProperty(k, "error", {
        enumerable: !0, get: function () {
            return N.error
        }
    }), Object.defineProperty(k, "Integer", {
        enumerable: !0, get: function () {
            return N.Integer
        }
    }), Object.defineProperty(k, "int", {
        enumerable: !0, get: function () {
            return N.int
        }
    }), Object.defineProperty(k, "isInt", {
        enumerable: !0, get: function () {
            return N.isInt
        }
    }), Object.defineProperty(k, "isPoint", {
        enumerable: !0, get: function () {
            return N.isPoint
        }
    }), Object.defineProperty(k, "Point", {
        enumerable: !0, get: function () {
            return N.Point
        }
    }), Object.defineProperty(k, "Date", {
        enumerable: !0, get: function () {
            return N.Date
        }
    }), Object.defineProperty(k, "DateTime", {
        enumerable: !0, get: function () {
            return N.DateTime
        }
    }), Object.defineProperty(k, "Duration", {
        enumerable: !0, get: function () {
            return N.Duration
        }
    }), Object.defineProperty(k, "isDate", {
        enumerable: !0, get: function () {
            return N.isDate
        }
    }), Object.defineProperty(k, "isDateTime", {
        enumerable: !0, get: function () {
            return N.isDateTime
        }
    }), Object.defineProperty(k, "isDuration", {
        enumerable: !0, get: function () {
            return N.isDuration
        }
    }), Object.defineProperty(k, "isLocalDateTime", {
        enumerable: !0, get: function () {
            return N.isLocalDateTime
        }
    }), Object.defineProperty(k, "isLocalTime", {
        enumerable: !0, get: function () {
            return N.isLocalTime
        }
    }), Object.defineProperty(k, "isNode", {
        enumerable: !0, get: function () {
            return N.isNode
        }
    }), Object.defineProperty(k, "isPath", {
        enumerable: !0, get: function () {
            return N.isPath
        }
    }), Object.defineProperty(k, "isPathSegment", {
        enumerable: !0, get: function () {
            return N.isPathSegment
        }
    }), Object.defineProperty(k, "isRelationship", {
        enumerable: !0, get: function () {
            return N.isRelationship
        }
    }), Object.defineProperty(k, "isTime", {
        enumerable: !0, get: function () {
            return N.isTime
        }
    }), Object.defineProperty(k, "isUnboundRelationship", {
        enumerable: !0, get: function () {
            return N.isUnboundRelationship
        }
    }), Object.defineProperty(k, "LocalDateTime", {
        enumerable: !0, get: function () {
            return N.LocalDateTime
        }
    }), Object.defineProperty(k, "LocalTime", {
        enumerable: !0, get: function () {
            return N.LocalTime
        }
    }), Object.defineProperty(k, "Time", {
        enumerable: !0, get: function () {
            return N.Time
        }
    }), Object.defineProperty(k, "Node", {
        enumerable: !0, get: function () {
            return N.Node
        }
    }), Object.defineProperty(k, "Path", {
        enumerable: !0, get: function () {
            return N.Path
        }
    }), Object.defineProperty(k, "PathSegment", {
        enumerable: !0, get: function () {
            return N.PathSegment
        }
    }), Object.defineProperty(k, "Relationship", {
        enumerable: !0, get: function () {
            return N.Relationship
        }
    }), Object.defineProperty(k, "UnboundRelationship", {
        enumerable: !0, get: function () {
            return N.UnboundRelationship
        }
    }), Object.defineProperty(k, "Record", {
        enumerable: !0, get: function () {
            return N.Record
        }
    }), Object.defineProperty(k, "ResultSummary", {
        enumerable: !0, get: function () {
            return N.ResultSummary
        }
    }), Object.defineProperty(k, "Plan", {
        enumerable: !0, get: function () {
            return N.Plan
        }
    }), Object.defineProperty(k, "ProfiledPlan", {
        enumerable: !0, get: function () {
            return N.ProfiledPlan
        }
    }), Object.defineProperty(k, "QueryStatistics", {
        enumerable: !0, get: function () {
            return N.QueryStatistics
        }
    }), Object.defineProperty(k, "Notification", {
        enumerable: !0, get: function () {
            return N.Notification
        }
    }), Object.defineProperty(k, "ServerInfo", {
        enumerable: !0, get: function () {
            return N.ServerInfo
        }
    }), Object.defineProperty(k, "Result", {
        enumerable: !0, get: function () {
            return N.Result
        }
    }), Object.defineProperty(k, "EagerResult", {
        enumerable: !0, get: function () {
            return N.EagerResult
        }
    }), Object.defineProperty(k, "auth", {
        enumerable: !0, get: function () {
            return N.auth
        }
    }), Object.defineProperty(k, "Session", {
        enumerable: !0, get: function () {
            return N.Session
        }
    }), Object.defineProperty(k, "Transaction", {
        enumerable: !0, get: function () {
            return N.Transaction
        }
    }), Object.defineProperty(k, "ManagedTransaction", {
        enumerable: !0, get: function () {
            return N.ManagedTransaction
        }
    }), Object.defineProperty(k, "bookmarkManager", {
        enumerable: !0, get: function () {
            return N.bookmarkManager
        }
    }), Object.defineProperty(k, "routing", {
        enumerable: !0, get: function () {
            return N.routing
        }
    }), Object.defineProperty(k, "resultTransformers", {
        enumerable: !0, get: function () {
            return N.resultTransformers
        }
    }), VA = P, Cy = pl(kr), k.RxSession = Cy.default, Kb = pl(t), k.RxTransaction = Kb.default, dl = pl(l), k.RxManagedTransaction = dl.default, pl = pl(u), k.RxResult = pl.default, Oy = N.internal.util, HA = Oy.ENCRYPTION_ON, YA = Oy.assertString, KA = Oy.isEmptyObjectOrNull, GA = N.internal.serverAddress.ServerAddress, ZA = N.internal.urlUtil, k.driver = $A, k.hasReachableServer = e2, QA = "neo4j-javascript/" + $b.default,Oy = {
        console: function (e) {
            return {
                level: e, logger: function (e, t) {
                    return console.log("".concat(r.Date.now(), " ").concat(e.toUpperCase(), " ").concat(t))
                }
            }
        }
    },k.logging = Oy,$b = {
        Node: N.Node,
        Relationship: N.Relationship,
        UnboundRelationship: N.UnboundRelationship,
        PathSegment: N.PathSegment,
        Path: N.Path,
        Result: N.Result,
        EagerResult: N.EagerResult,
        ResultSummary: N.ResultSummary,
        Record: N.Record,
        Point: N.Point,
        Date: N.Date,
        DateTime: N.DateTime,
        Duration: N.Duration,
        LocalDateTime: N.LocalDateTime,
        LocalTime: N.LocalTime,
        Time: N.Time,
        Integer: N.Integer
    },k.types = $b,Sy = {READ: qA.READ, WRITE: qA.WRITE},k.session = Sy,hl = {
        toNumber: N.toNumber,
        toString: N.toString,
        inSafeRange: N.inSafeRange
    },k.integer = hl,v = {isPoint: N.isPoint},k.spatial = v,Jy = {
        isDuration: N.isDuration,
        isLocalTime: N.isLocalTime,
        isTime: N.isTime,
        isDate: N.isDate,
        isLocalDateTime: N.isLocalDateTime,
        isDateTime: N.isDateTime
    },k.temporal = Jy,Yy = {
        isNode: N.isNode,
        isPath: N.isPath,
        isPathSegment: N.isPathSegment,
        isRelationship: N.isRelationship,
        isUnboundRelationship: N.isUnboundRelationship
    },k.graph = Yy,hl = {
        driver: $A,
        hasReachableServer: e2,
        int: N.int,
        isInt: N.isInt,
        isPoint: N.isPoint,
        isDuration: N.isDuration,
        isLocalTime: N.isLocalTime,
        isTime: N.isTime,
        isDate: N.isDate,
        isLocalDateTime: N.isLocalDateTime,
        isDateTime: N.isDateTime,
        isNode: N.isNode,
        isPath: N.isPath,
        isPathSegment: N.isPathSegment,
        isRelationship: N.isRelationship,
        isUnboundRelationship: N.isUnboundRelationship,
        integer: hl,
        Neo4jError: N.Neo4jError,
        isRetryableError: N.isRetryableError,
        auth: N.auth,
        logging: Oy,
        types: $b,
        session: Sy,
        routing: N.routing,
        error: N.error,
        graph: Yy,
        spatial: v,
        temporal: Jy,
        Driver: qA.Driver,
        Session: N.Session,
        Transaction: N.Transaction,
        ManagedTransaction: N.ManagedTransaction,
        Result: N.Result,
        EagerResult: N.EagerResult,
        RxSession: Cy.default,
        RxTransaction: Kb.default,
        RxManagedTransaction: dl.default,
        RxResult: pl.default,
        ResultSummary: N.ResultSummary,
        Plan: N.Plan,
        ProfiledPlan: N.ProfiledPlan,
        QueryStatistics: N.QueryStatistics,
        Notification: N.Notification,
        ServerInfo: N.ServerInfo,
        Record: N.Record,
        Node: N.Node,
        Relationship: N.Relationship,
        UnboundRelationship: N.UnboundRelationship,
        Path: N.Path,
        PathSegment: N.PathSegment,
        Point: N.Point,
        Integer: N.Integer,
        Duration: N.Duration,
        LocalTime: N.LocalTime,
        Time: N.Time,
        Date: N.Date,
        LocalDateTime: N.LocalDateTime,
        DateTime: N.DateTime,
        bookmarkManager: N.bookmarkManager,
        resultTransformers: N.resultTransformers
    },k.default = hl,U(B)
});