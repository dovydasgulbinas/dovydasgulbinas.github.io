/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function cr(t) {
  const e = /* @__PURE__ */ Object.create(null);
  for (const n of t.split(",")) e[n] = 1;
  return (n) => n in e;
}
const X = {}, _e = [], Ft = () => {
}, Wi = () => !1, rn = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // uppercase letter
(t.charCodeAt(2) > 122 || t.charCodeAt(2) < 97), ur = (t) => t.startsWith("onUpdate:"), it = Object.assign, fr = (t, e) => {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}, Gi = Object.prototype.hasOwnProperty, J = (t, e) => Gi.call(t, e), K = Array.isArray, xe = (t) => sn(t) === "[object Map]", Ji = (t) => sn(t) === "[object Set]", $ = (t) => typeof t == "function", ot = (t) => typeof t == "string", ve = (t) => typeof t == "symbol", st = (t) => t !== null && typeof t == "object", Hs = (t) => (st(t) || $(t)) && $(t.then) && $(t.catch), Yi = Object.prototype.toString, sn = (t) => Yi.call(t), Qi = (t) => sn(t).slice(8, -1), ar = (t) => sn(t) === "[object Object]", dr = (t) => ot(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, Pe = /* @__PURE__ */ cr(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), on = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (n) => e[n] || (e[n] = t(n));
}, Zi = /-(\w)/g, Rt = on(
  (t) => t.replace(Zi, (e, n) => n ? n.toUpperCase() : "")
), Xi = /\B([A-Z])/g, Et = on(
  (t) => t.replace(Xi, "-$1").toLowerCase()
), js = on((t) => t.charAt(0).toUpperCase() + t.slice(1)), gn = on(
  (t) => t ? `on${js(t)}` : ""
), Xt = (t, e) => !Object.is(t, e), We = (t, ...e) => {
  for (let n = 0; n < t.length; n++)
    t[n](...e);
}, qs = (t, e, n, r = !1) => {
  Object.defineProperty(t, e, {
    configurable: !0,
    enumerable: !1,
    writable: r,
    value: n
  });
}, Jn = (t) => {
  const e = parseFloat(t);
  return isNaN(e) ? t : e;
}, Nr = (t) => {
  const e = ot(t) ? Number(t) : NaN;
  return isNaN(e) ? t : e;
};
let Br;
const ln = () => Br || (Br = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function hr(t) {
  if (K(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const r = t[n], s = ot(r) ? ro(r) : hr(r);
      if (s)
        for (const i in s)
          e[i] = s[i];
    }
    return e;
  } else if (ot(t) || st(t))
    return t;
}
const to = /;(?![^(]*\))/g, eo = /:([^]+)/, no = /\/\*[^]*?\*\//g;
function ro(t) {
  const e = {};
  return t.replace(no, "").split(to).forEach((n) => {
    if (n) {
      const r = n.split(eo);
      r.length > 1 && (e[r[0].trim()] = r[1].trim());
    }
  }), e;
}
function gr(t) {
  let e = "";
  if (ot(t))
    e = t;
  else if (K(t))
    for (let n = 0; n < t.length; n++) {
      const r = gr(t[n]);
      r && (e += r + " ");
    }
  else if (st(t))
    for (const n in t)
      t[n] && (e += n + " ");
  return e.trim();
}
const so = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", io = /* @__PURE__ */ cr(so);
function Ks(t) {
  return !!t || t === "";
}
/**
* @vue/reactivity v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let wt;
class oo {
  constructor(e = !1) {
    this.detached = e, this._active = !0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = wt, !e && wt && (this.index = (wt.scopes || (wt.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let e, n;
      if (this.scopes)
        for (e = 0, n = this.scopes.length; e < n; e++)
          this.scopes[e].pause();
      for (e = 0, n = this.effects.length; e < n; e++)
        this.effects[e].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let e, n;
      if (this.scopes)
        for (e = 0, n = this.scopes.length; e < n; e++)
          this.scopes[e].resume();
      for (e = 0, n = this.effects.length; e < n; e++)
        this.effects[e].resume();
    }
  }
  run(e) {
    if (this._active) {
      const n = wt;
      try {
        return wt = this, e();
      } finally {
        wt = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    wt = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    wt = this.parent;
  }
  stop(e) {
    if (this._active) {
      this._active = !1;
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++)
        this.effects[n].stop();
      for (this.effects.length = 0, n = 0, r = this.cleanups.length; n < r; n++)
        this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        for (n = 0, r = this.scopes.length; n < r; n++)
          this.scopes[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !e) {
        const s = this.parent.scopes.pop();
        s && s !== this && (this.parent.scopes[this.index] = s, s.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function lo() {
  return wt;
}
let et;
const pn = /* @__PURE__ */ new WeakSet();
class $s {
  constructor(e) {
    this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, wt && wt.active && wt.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, pn.has(this) && (pn.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || zs(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Dr(this), Ws(this);
    const e = et, n = At;
    et = this, At = !0;
    try {
      return this.fn();
    } finally {
      Gs(this), et = e, At = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let e = this.deps; e; e = e.nextDep)
        _r(e);
      this.deps = this.depsTail = void 0, Dr(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? pn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Yn(this) && this.run();
  }
  get dirty() {
    return Yn(this);
  }
}
let ks = 0, Ie, Me;
function zs(t, e = !1) {
  if (t.flags |= 8, e) {
    t.next = Me, Me = t;
    return;
  }
  t.next = Ie, Ie = t;
}
function pr() {
  ks++;
}
function mr() {
  if (--ks > 0)
    return;
  if (Me) {
    let e = Me;
    for (Me = void 0; e; ) {
      const n = e.next;
      e.next = void 0, e.flags &= -9, e = n;
    }
  }
  let t;
  for (; Ie; ) {
    let e = Ie;
    for (Ie = void 0; e; ) {
      const n = e.next;
      if (e.next = void 0, e.flags &= -9, e.flags & 1)
        try {
          e.trigger();
        } catch (r) {
          t || (t = r);
        }
      e = n;
    }
  }
  if (t) throw t;
}
function Ws(t) {
  for (let e = t.deps; e; e = e.nextDep)
    e.version = -1, e.prevActiveLink = e.dep.activeLink, e.dep.activeLink = e;
}
function Gs(t) {
  let e, n = t.depsTail, r = n;
  for (; r; ) {
    const s = r.prevDep;
    r.version === -1 ? (r === n && (n = s), _r(r), co(r)) : e = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = s;
  }
  t.deps = e, t.depsTail = n;
}
function Yn(t) {
  for (let e = t.deps; e; e = e.nextDep)
    if (e.dep.version !== e.version || e.dep.computed && (Js(e.dep.computed) || e.dep.version !== e.version))
      return !0;
  return !!t._dirty;
}
function Js(t) {
  if (t.flags & 4 && !(t.flags & 16) || (t.flags &= -17, t.globalVersion === Oe))
    return;
  t.globalVersion = Oe;
  const e = t.dep;
  if (t.flags |= 2, e.version > 0 && !t.isSSR && t.deps && !Yn(t)) {
    t.flags &= -3;
    return;
  }
  const n = et, r = At;
  et = t, At = !0;
  try {
    Ws(t);
    const s = t.fn(t._value);
    (e.version === 0 || Xt(s, t._value)) && (t._value = s, e.version++);
  } catch (s) {
    throw e.version++, s;
  } finally {
    et = n, At = r, Gs(t), t.flags &= -3;
  }
}
function _r(t, e = !1) {
  const { dep: n, prevSub: r, nextSub: s } = t;
  if (r && (r.nextSub = s, t.prevSub = void 0), s && (s.prevSub = r, t.nextSub = void 0), n.subs === t && (n.subs = r, !r && n.computed)) {
    n.computed.flags &= -5;
    for (let i = n.computed.deps; i; i = i.nextDep)
      _r(i, !0);
  }
  !e && !--n.sc && n.map && n.map.delete(n.key);
}
function co(t) {
  const { prevDep: e, nextDep: n } = t;
  e && (e.nextDep = n, t.prevDep = void 0), n && (n.prevDep = e, t.nextDep = void 0);
}
let At = !0;
const Ys = [];
function te() {
  Ys.push(At), At = !1;
}
function ee() {
  const t = Ys.pop();
  At = t === void 0 ? !0 : t;
}
function Dr(t) {
  const { cleanup: e } = t;
  if (t.cleanup = void 0, e) {
    const n = et;
    et = void 0;
    try {
      e();
    } finally {
      et = n;
    }
  }
}
let Oe = 0;
class uo {
  constructor(e, n) {
    this.sub = e, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class br {
  constructor(e) {
    this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0;
  }
  track(e) {
    if (!et || !At || et === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== et)
      n = this.activeLink = new uo(et, this), et.deps ? (n.prevDep = et.depsTail, et.depsTail.nextDep = n, et.depsTail = n) : et.deps = et.depsTail = n, Qs(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const r = n.nextDep;
      r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = et.depsTail, n.nextDep = void 0, et.depsTail.nextDep = n, et.depsTail = n, et.deps === n && (et.deps = r);
    }
    return n;
  }
  trigger(e) {
    this.version++, Oe++, this.notify(e);
  }
  notify(e) {
    pr();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      mr();
    }
  }
}
function Qs(t) {
  if (t.dep.sc++, t.sub.flags & 4) {
    const e = t.dep.computed;
    if (e && !t.dep.subs) {
      e.flags |= 20;
      for (let r = e.deps; r; r = r.nextDep)
        Qs(r);
    }
    const n = t.dep.subs;
    n !== t && (t.prevSub = n, n && (n.nextSub = t)), t.dep.subs = t;
  }
}
const Qn = /* @__PURE__ */ new WeakMap(), le = Symbol(
  ""
), Zn = Symbol(
  ""
), Fe = Symbol(
  ""
);
function lt(t, e, n) {
  if (At && et) {
    let r = Qn.get(t);
    r || Qn.set(t, r = /* @__PURE__ */ new Map());
    let s = r.get(n);
    s || (r.set(n, s = new br()), s.map = r, s.key = n), s.track();
  }
}
function kt(t, e, n, r, s, i) {
  const o = Qn.get(t);
  if (!o) {
    Oe++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if (pr(), e === "clear")
    o.forEach(l);
  else {
    const c = K(t), u = c && dr(n);
    if (c && n === "length") {
      const a = Number(r);
      o.forEach((h, m) => {
        (m === "length" || m === Fe || !ve(m) && m >= a) && l(h);
      });
    } else
      switch ((n !== void 0 || o.has(void 0)) && l(o.get(n)), u && l(o.get(Fe)), e) {
        case "add":
          c ? u && l(o.get("length")) : (l(o.get(le)), xe(t) && l(o.get(Zn)));
          break;
        case "delete":
          c || (l(o.get(le)), xe(t) && l(o.get(Zn)));
          break;
        case "set":
          xe(t) && l(o.get(le));
          break;
      }
  }
  mr();
}
function he(t) {
  const e = Y(t);
  return e === t ? e : (lt(e, "iterate", Fe), xt(t) ? e : e.map(ft));
}
function yr(t) {
  return lt(t = Y(t), "iterate", Fe), t;
}
const fo = {
  __proto__: null,
  [Symbol.iterator]() {
    return mn(this, Symbol.iterator, ft);
  },
  concat(...t) {
    return he(this).concat(
      ...t.map((e) => K(e) ? he(e) : e)
    );
  },
  entries() {
    return mn(this, "entries", (t) => (t[1] = ft(t[1]), t));
  },
  every(t, e) {
    return Kt(this, "every", t, e, void 0, arguments);
  },
  filter(t, e) {
    return Kt(this, "filter", t, e, (n) => n.map(ft), arguments);
  },
  find(t, e) {
    return Kt(this, "find", t, e, ft, arguments);
  },
  findIndex(t, e) {
    return Kt(this, "findIndex", t, e, void 0, arguments);
  },
  findLast(t, e) {
    return Kt(this, "findLast", t, e, ft, arguments);
  },
  findLastIndex(t, e) {
    return Kt(this, "findLastIndex", t, e, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(t, e) {
    return Kt(this, "forEach", t, e, void 0, arguments);
  },
  includes(...t) {
    return _n(this, "includes", t);
  },
  indexOf(...t) {
    return _n(this, "indexOf", t);
  },
  join(t) {
    return he(this).join(t);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...t) {
    return _n(this, "lastIndexOf", t);
  },
  map(t, e) {
    return Kt(this, "map", t, e, void 0, arguments);
  },
  pop() {
    return Se(this, "pop");
  },
  push(...t) {
    return Se(this, "push", t);
  },
  reduce(t, ...e) {
    return Lr(this, "reduce", t, e);
  },
  reduceRight(t, ...e) {
    return Lr(this, "reduceRight", t, e);
  },
  shift() {
    return Se(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(t, e) {
    return Kt(this, "some", t, e, void 0, arguments);
  },
  splice(...t) {
    return Se(this, "splice", t);
  },
  toReversed() {
    return he(this).toReversed();
  },
  toSorted(t) {
    return he(this).toSorted(t);
  },
  toSpliced(...t) {
    return he(this).toSpliced(...t);
  },
  unshift(...t) {
    return Se(this, "unshift", t);
  },
  values() {
    return mn(this, "values", ft);
  }
};
function mn(t, e, n) {
  const r = yr(t), s = r[e]();
  return r !== t && !xt(t) && (s._next = s.next, s.next = () => {
    const i = s._next();
    return i.value && (i.value = n(i.value)), i;
  }), s;
}
const ao = Array.prototype;
function Kt(t, e, n, r, s, i) {
  const o = yr(t), l = o !== t && !xt(t), c = o[e];
  if (c !== ao[e]) {
    const h = c.apply(t, i);
    return l ? ft(h) : h;
  }
  let u = n;
  o !== t && (l ? u = function(h, m) {
    return n.call(this, ft(h), m, t);
  } : n.length > 2 && (u = function(h, m) {
    return n.call(this, h, m, t);
  }));
  const a = c.call(o, u, r);
  return l && s ? s(a) : a;
}
function Lr(t, e, n, r) {
  const s = yr(t);
  let i = n;
  return s !== t && (xt(t) ? n.length > 3 && (i = function(o, l, c) {
    return n.call(this, o, l, c, t);
  }) : i = function(o, l, c) {
    return n.call(this, o, ft(l), c, t);
  }), s[e](i, ...r);
}
function _n(t, e, n) {
  const r = Y(t);
  lt(r, "iterate", Fe);
  const s = r[e](...n);
  return (s === -1 || s === !1) && Er(n[0]) ? (n[0] = Y(n[0]), r[e](...n)) : s;
}
function Se(t, e, n = []) {
  te(), pr();
  const r = Y(t)[e].apply(t, n);
  return mr(), ee(), r;
}
const ho = /* @__PURE__ */ cr("__proto__,__v_isRef,__isVue"), Zs = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(ve)
);
function go(t) {
  ve(t) || (t = String(t));
  const e = Y(this);
  return lt(e, "has", t), e.hasOwnProperty(t);
}
class Xs {
  constructor(e = !1, n = !1) {
    this._isReadonly = e, this._isShallow = n;
  }
  get(e, n, r) {
    if (n === "__v_skip") return e.__v_skip;
    const s = this._isReadonly, i = this._isShallow;
    if (n === "__v_isReactive")
      return !s;
    if (n === "__v_isReadonly")
      return s;
    if (n === "__v_isShallow")
      return i;
    if (n === "__v_raw")
      return r === (s ? i ? So : ri : i ? ni : ei).get(e) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(e) === Object.getPrototypeOf(r) ? e : void 0;
    const o = K(e);
    if (!s) {
      let c;
      if (o && (c = fo[n]))
        return c;
      if (n === "hasOwnProperty")
        return go;
    }
    const l = Reflect.get(
      e,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      ct(e) ? e : r
    );
    return (ve(n) ? Zs.has(n) : ho(n)) || (s || lt(e, "get", n), i) ? l : ct(l) ? o && dr(n) ? l : l.value : st(l) ? s ? si(l) : vr(l) : l;
  }
}
class ti extends Xs {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, n, r, s) {
    let i = e[n];
    if (!this._isShallow) {
      const c = ce(i);
      if (!xt(r) && !ce(r) && (i = Y(i), r = Y(r)), !K(e) && ct(i) && !ct(r))
        return c ? !1 : (i.value = r, !0);
    }
    const o = K(e) && dr(n) ? Number(n) < e.length : J(e, n), l = Reflect.set(
      e,
      n,
      r,
      ct(e) ? e : s
    );
    return e === Y(s) && (o ? Xt(r, i) && kt(e, "set", n, r) : kt(e, "add", n, r)), l;
  }
  deleteProperty(e, n) {
    const r = J(e, n);
    e[n];
    const s = Reflect.deleteProperty(e, n);
    return s && r && kt(e, "delete", n, void 0), s;
  }
  has(e, n) {
    const r = Reflect.has(e, n);
    return (!ve(n) || !Zs.has(n)) && lt(e, "has", n), r;
  }
  ownKeys(e) {
    return lt(
      e,
      "iterate",
      K(e) ? "length" : le
    ), Reflect.ownKeys(e);
  }
}
class po extends Xs {
  constructor(e = !1) {
    super(!0, e);
  }
  set(e, n) {
    return !0;
  }
  deleteProperty(e, n) {
    return !0;
  }
}
const mo = /* @__PURE__ */ new ti(), _o = /* @__PURE__ */ new po(), bo = /* @__PURE__ */ new ti(!0);
const Xn = (t) => t, Ke = (t) => Reflect.getPrototypeOf(t);
function yo(t, e, n) {
  return function(...r) {
    const s = this.__v_raw, i = Y(s), o = xe(i), l = t === "entries" || t === Symbol.iterator && o, c = t === "keys" && o, u = s[t](...r), a = n ? Xn : e ? tr : ft;
    return !e && lt(
      i,
      "iterate",
      c ? Zn : le
    ), {
      // iterator protocol
      next() {
        const { value: h, done: m } = u.next();
        return m ? { value: h, done: m } : {
          value: l ? [a(h[0]), a(h[1])] : a(h),
          done: m
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function $e(t) {
  return function(...e) {
    return t === "delete" ? !1 : t === "clear" ? void 0 : this;
  };
}
function wo(t, e) {
  const n = {
    get(s) {
      const i = this.__v_raw, o = Y(i), l = Y(s);
      t || (Xt(s, l) && lt(o, "get", s), lt(o, "get", l));
      const { has: c } = Ke(o), u = e ? Xn : t ? tr : ft;
      if (c.call(o, s))
        return u(i.get(s));
      if (c.call(o, l))
        return u(i.get(l));
      i !== o && i.get(s);
    },
    get size() {
      const s = this.__v_raw;
      return !t && lt(Y(s), "iterate", le), Reflect.get(s, "size", s);
    },
    has(s) {
      const i = this.__v_raw, o = Y(i), l = Y(s);
      return t || (Xt(s, l) && lt(o, "has", s), lt(o, "has", l)), s === l ? i.has(s) : i.has(s) || i.has(l);
    },
    forEach(s, i) {
      const o = this, l = o.__v_raw, c = Y(l), u = e ? Xn : t ? tr : ft;
      return !t && lt(c, "iterate", le), l.forEach((a, h) => s.call(i, u(a), u(h), o));
    }
  };
  return it(
    n,
    t ? {
      add: $e("add"),
      set: $e("set"),
      delete: $e("delete"),
      clear: $e("clear")
    } : {
      add(s) {
        !e && !xt(s) && !ce(s) && (s = Y(s));
        const i = Y(this);
        return Ke(i).has.call(i, s) || (i.add(s), kt(i, "add", s, s)), this;
      },
      set(s, i) {
        !e && !xt(i) && !ce(i) && (i = Y(i));
        const o = Y(this), { has: l, get: c } = Ke(o);
        let u = l.call(o, s);
        u || (s = Y(s), u = l.call(o, s));
        const a = c.call(o, s);
        return o.set(s, i), u ? Xt(i, a) && kt(o, "set", s, i) : kt(o, "add", s, i), this;
      },
      delete(s) {
        const i = Y(this), { has: o, get: l } = Ke(i);
        let c = o.call(i, s);
        c || (s = Y(s), c = o.call(i, s)), l && l.call(i, s);
        const u = i.delete(s);
        return c && kt(i, "delete", s, void 0), u;
      },
      clear() {
        const s = Y(this), i = s.size !== 0, o = s.clear();
        return i && kt(
          s,
          "clear",
          void 0,
          void 0
        ), o;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((s) => {
    n[s] = yo(s, t, e);
  }), n;
}
function wr(t, e) {
  const n = wo(t, e);
  return (r, s, i) => s === "__v_isReactive" ? !t : s === "__v_isReadonly" ? t : s === "__v_raw" ? r : Reflect.get(
    J(n, s) && s in r ? n : r,
    s,
    i
  );
}
const vo = {
  get: /* @__PURE__ */ wr(!1, !1)
}, Co = {
  get: /* @__PURE__ */ wr(!1, !0)
}, Eo = {
  get: /* @__PURE__ */ wr(!0, !1)
};
const ei = /* @__PURE__ */ new WeakMap(), ni = /* @__PURE__ */ new WeakMap(), ri = /* @__PURE__ */ new WeakMap(), So = /* @__PURE__ */ new WeakMap();
function To(t) {
  switch (t) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Ro(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : To(Qi(t));
}
function vr(t) {
  return ce(t) ? t : Cr(
    t,
    !1,
    mo,
    vo,
    ei
  );
}
function Ao(t) {
  return Cr(
    t,
    !1,
    bo,
    Co,
    ni
  );
}
function si(t) {
  return Cr(
    t,
    !0,
    _o,
    Eo,
    ri
  );
}
function Cr(t, e, n, r, s) {
  if (!st(t) || t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const i = s.get(t);
  if (i)
    return i;
  const o = Ro(t);
  if (o === 0)
    return t;
  const l = new Proxy(
    t,
    o === 2 ? r : n
  );
  return s.set(t, l), l;
}
function Ne(t) {
  return ce(t) ? Ne(t.__v_raw) : !!(t && t.__v_isReactive);
}
function ce(t) {
  return !!(t && t.__v_isReadonly);
}
function xt(t) {
  return !!(t && t.__v_isShallow);
}
function Er(t) {
  return t ? !!t.__v_raw : !1;
}
function Y(t) {
  const e = t && t.__v_raw;
  return e ? Y(e) : t;
}
function xo(t) {
  return !J(t, "__v_skip") && Object.isExtensible(t) && qs(t, "__v_skip", !0), t;
}
const ft = (t) => st(t) ? vr(t) : t, tr = (t) => st(t) ? si(t) : t;
function ct(t) {
  return t ? t.__v_isRef === !0 : !1;
}
function bn(t) {
  return Po(t, !1);
}
function Po(t, e) {
  return ct(t) ? t : new Io(t, e);
}
class Io {
  constructor(e, n) {
    this.dep = new br(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? e : Y(e), this._value = n ? e : ft(e), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e) {
    const n = this._rawValue, r = this.__v_isShallow || xt(e) || ce(e);
    e = r ? e : Y(e), Xt(e, n) && (this._rawValue = e, this._value = r ? e : ft(e), this.dep.trigger());
  }
}
function ii(t) {
  return ct(t) ? t.value : t;
}
const Mo = {
  get: (t, e, n) => e === "__v_raw" ? t : ii(Reflect.get(t, e, n)),
  set: (t, e, n, r) => {
    const s = t[e];
    return ct(s) && !ct(n) ? (s.value = n, !0) : Reflect.set(t, e, n, r);
  }
};
function oi(t) {
  return Ne(t) ? t : new Proxy(t, Mo);
}
class No {
  constructor(e, n, r) {
    this.fn = e, this.setter = n, this._value = void 0, this.dep = new br(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Oe - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    et !== this)
      return zs(this, !0), !0;
  }
  get value() {
    const e = this.dep.track();
    return Js(this), e && (e.version = this.dep.version), this._value;
  }
  set value(e) {
    this.setter && this.setter(e);
  }
}
function Bo(t, e, n = !1) {
  let r, s;
  return $(t) ? r = t : (r = t.get, s = t.set), new No(r, s, n);
}
const ke = {}, Qe = /* @__PURE__ */ new WeakMap();
let oe;
function Do(t, e = !1, n = oe) {
  if (n) {
    let r = Qe.get(n);
    r || Qe.set(n, r = []), r.push(t);
  }
}
function Lo(t, e, n = X) {
  const { immediate: r, deep: s, once: i, scheduler: o, augmentJob: l, call: c } = n, u = (v) => s ? v : xt(v) || s === !1 || s === 0 ? zt(v, 1) : zt(v);
  let a, h, m, p, T = !1, R = !1;
  if (ct(t) ? (h = () => t.value, T = xt(t)) : Ne(t) ? (h = () => u(t), T = !0) : K(t) ? (R = !0, T = t.some((v) => Ne(v) || xt(v)), h = () => t.map((v) => {
    if (ct(v))
      return v.value;
    if (Ne(v))
      return u(v);
    if ($(v))
      return c ? c(v, 2) : v();
  })) : $(t) ? e ? h = c ? () => c(t, 2) : t : h = () => {
    if (m) {
      te();
      try {
        m();
      } finally {
        ee();
      }
    }
    const v = oe;
    oe = a;
    try {
      return c ? c(t, 3, [p]) : t(p);
    } finally {
      oe = v;
    }
  } : h = Ft, e && s) {
    const v = h, k = s === !0 ? 1 / 0 : s;
    h = () => zt(v(), k);
  }
  const z = lo(), A = () => {
    a.stop(), z && z.active && fr(z.effects, a);
  };
  if (i && e) {
    const v = e;
    e = (...k) => {
      v(...k), A();
    };
  }
  let N = R ? new Array(t.length).fill(ke) : ke;
  const P = (v) => {
    if (!(!(a.flags & 1) || !a.dirty && !v))
      if (e) {
        const k = a.run();
        if (s || T || (R ? k.some((I, B) => Xt(I, N[B])) : Xt(k, N))) {
          m && m();
          const I = oe;
          oe = a;
          try {
            const B = [
              k,
              // pass undefined as the old value when it's changed for the first time
              N === ke ? void 0 : R && N[0] === ke ? [] : N,
              p
            ];
            c ? c(e, 3, B) : (
              // @ts-expect-error
              e(...B)
            ), N = k;
          } finally {
            oe = I;
          }
        }
      } else
        a.run();
  };
  return l && l(P), a = new $s(h), a.scheduler = o ? () => o(P, !1) : P, p = (v) => Do(v, !1, a), m = a.onStop = () => {
    const v = Qe.get(a);
    if (v) {
      if (c)
        c(v, 4);
      else
        for (const k of v) k();
      Qe.delete(a);
    }
  }, e ? r ? P(!0) : N = a.run() : o ? o(P.bind(null, !0), !0) : a.run(), A.pause = a.pause.bind(a), A.resume = a.resume.bind(a), A.stop = A, A;
}
function zt(t, e = 1 / 0, n) {
  if (e <= 0 || !st(t) || t.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(t)))
    return t;
  if (n.add(t), e--, ct(t))
    zt(t.value, e, n);
  else if (K(t))
    for (let r = 0; r < t.length; r++)
      zt(t[r], e, n);
  else if (Ji(t) || xe(t))
    t.forEach((r) => {
      zt(r, e, n);
    });
  else if (ar(t)) {
    for (const r in t)
      zt(t[r], e, n);
    for (const r of Object.getOwnPropertySymbols(t))
      Object.prototype.propertyIsEnumerable.call(t, r) && zt(t[r], e, n);
  }
  return t;
}
/**
* @vue/runtime-core v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function je(t, e, n, r) {
  try {
    return r ? t(...r) : t();
  } catch (s) {
    cn(s, e, n);
  }
}
function Vt(t, e, n, r) {
  if ($(t)) {
    const s = je(t, e, n, r);
    return s && Hs(s) && s.catch((i) => {
      cn(i, e, n);
    }), s;
  }
  if (K(t)) {
    const s = [];
    for (let i = 0; i < t.length; i++)
      s.push(Vt(t[i], e, n, r));
    return s;
  }
}
function cn(t, e, n, r = !0) {
  const s = e ? e.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: o } = e && e.appContext.config || X;
  if (e) {
    let l = e.parent;
    const c = e.proxy, u = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const a = l.ec;
      if (a) {
        for (let h = 0; h < a.length; h++)
          if (a[h](t, c, u) === !1)
            return;
      }
      l = l.parent;
    }
    if (i) {
      te(), je(i, null, 10, [
        t,
        c,
        u
      ]), ee();
      return;
    }
  }
  Oo(t, n, s, r, o);
}
function Oo(t, e, n, r = !0, s = !1) {
  if (s)
    throw t;
  console.error(t);
}
const at = [];
let Dt = -1;
const be = [];
let Qt = null, pe = 0;
const li = /* @__PURE__ */ Promise.resolve();
let Ze = null;
function ci(t) {
  const e = Ze || li;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function Fo(t) {
  let e = Dt + 1, n = at.length;
  for (; e < n; ) {
    const r = e + n >>> 1, s = at[r], i = Ue(s);
    i < t || i === t && s.flags & 2 ? e = r + 1 : n = r;
  }
  return e;
}
function Sr(t) {
  if (!(t.flags & 1)) {
    const e = Ue(t), n = at[at.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(t.flags & 2) && e >= Ue(n) ? at.push(t) : at.splice(Fo(e), 0, t), t.flags |= 1, ui();
  }
}
function ui() {
  Ze || (Ze = li.then(ai));
}
function Uo(t) {
  K(t) ? be.push(...t) : Qt && t.id === -1 ? Qt.splice(pe + 1, 0, t) : t.flags & 1 || (be.push(t), t.flags |= 1), ui();
}
function Or(t, e, n = Dt + 1) {
  for (; n < at.length; n++) {
    const r = at[n];
    if (r && r.flags & 2) {
      if (t && r.id !== t.uid)
        continue;
      at.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function fi(t) {
  if (be.length) {
    const e = [...new Set(be)].sort(
      (n, r) => Ue(n) - Ue(r)
    );
    if (be.length = 0, Qt) {
      Qt.push(...e);
      return;
    }
    for (Qt = e, pe = 0; pe < Qt.length; pe++) {
      const n = Qt[pe];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    Qt = null, pe = 0;
  }
}
const Ue = (t) => t.id == null ? t.flags & 2 ? -1 : 1 / 0 : t.id;
function ai(t) {
  try {
    for (Dt = 0; Dt < at.length; Dt++) {
      const e = at[Dt];
      e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), je(
        e,
        e.i,
        e.i ? 15 : 14
      ), e.flags & 4 || (e.flags &= -2));
    }
  } finally {
    for (; Dt < at.length; Dt++) {
      const e = at[Dt];
      e && (e.flags &= -2);
    }
    Dt = -1, at.length = 0, fi(), Ze = null, (at.length || be.length) && ai();
  }
}
let St = null, di = null;
function Xe(t) {
  const e = St;
  return St = t, di = t && t.type.__scopeId || null, e;
}
function Vo(t, e = St, n) {
  if (!e || t._n)
    return t;
  const r = (...s) => {
    r._d && kr(-1);
    const i = Xe(e);
    let o;
    try {
      o = t(...s);
    } finally {
      Xe(i), r._d && kr(1);
    }
    return o;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function ne(t, e) {
  if (St === null)
    return t;
  const n = dn(St), r = t.dirs || (t.dirs = []);
  for (let s = 0; s < e.length; s++) {
    let [i, o, l, c = X] = e[s];
    i && ($(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && zt(o), r.push({
      dir: i,
      instance: n,
      value: o,
      oldValue: void 0,
      arg: l,
      modifiers: c
    }));
  }
  return t;
}
function re(t, e, n, r) {
  const s = t.dirs, i = e && e.dirs;
  for (let o = 0; o < s.length; o++) {
    const l = s[o];
    i && (l.oldValue = i[o].value);
    let c = l.dir[r];
    c && (te(), Vt(c, n, 8, [
      t.el,
      l,
      t,
      e
    ]), ee());
  }
}
const Ho = Symbol("_vte"), jo = (t) => t.__isTeleport;
function Tr(t, e) {
  t.shapeFlag & 6 && t.component ? (t.transition = e, Tr(t.component.subTree, e)) : t.shapeFlag & 128 ? (t.ssContent.transition = e.clone(t.ssContent), t.ssFallback.transition = e.clone(t.ssFallback)) : t.transition = e;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function hi(t, e) {
  return $(t) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    it({ name: t.name }, e, { setup: t })
  ) : t;
}
function gi(t) {
  t.ids = [t.ids[0] + t.ids[2]++ + "-", 0, 0];
}
function tn(t, e, n, r, s = !1) {
  if (K(t)) {
    t.forEach(
      (T, R) => tn(
        T,
        e && (K(e) ? e[R] : e),
        n,
        r,
        s
      )
    );
    return;
  }
  if (Be(r) && !s) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && tn(t, e, n, r.component.subTree);
    return;
  }
  const i = r.shapeFlag & 4 ? dn(r.component) : r.el, o = s ? null : i, { i: l, r: c } = t, u = e && e.r, a = l.refs === X ? l.refs = {} : l.refs, h = l.setupState, m = Y(h), p = h === X ? () => !1 : (T) => J(m, T);
  if (u != null && u !== c && (ot(u) ? (a[u] = null, p(u) && (h[u] = null)) : ct(u) && (u.value = null)), $(c))
    je(c, l, 12, [o, a]);
  else {
    const T = ot(c), R = ct(c);
    if (T || R) {
      const z = () => {
        if (t.f) {
          const A = T ? p(c) ? h[c] : a[c] : c.value;
          s ? K(A) && fr(A, i) : K(A) ? A.includes(i) || A.push(i) : T ? (a[c] = [i], p(c) && (h[c] = a[c])) : (c.value = [i], t.k && (a[t.k] = c.value));
        } else T ? (a[c] = o, p(c) && (h[c] = o)) : R && (c.value = o, t.k && (a[t.k] = o));
      };
      o ? (z.id = -1, yt(z, n)) : z();
    }
  }
}
ln().requestIdleCallback;
ln().cancelIdleCallback;
const Be = (t) => !!t.type.__asyncLoader, pi = (t) => t.type.__isKeepAlive;
function qo(t, e) {
  mi(t, "a", e);
}
function Ko(t, e) {
  mi(t, "da", e);
}
function mi(t, e, n = dt) {
  const r = t.__wdc || (t.__wdc = () => {
    let s = n;
    for (; s; ) {
      if (s.isDeactivated)
        return;
      s = s.parent;
    }
    return t();
  });
  if (un(e, r, n), n) {
    let s = n.parent;
    for (; s && s.parent; )
      pi(s.parent.vnode) && $o(r, e, n, s), s = s.parent;
  }
}
function $o(t, e, n, r) {
  const s = un(
    e,
    t,
    r,
    !0
    /* prepend */
  );
  _i(() => {
    fr(r[e], s);
  }, n);
}
function un(t, e, n = dt, r = !1) {
  if (n) {
    const s = n[t] || (n[t] = []), i = e.__weh || (e.__weh = (...o) => {
      te();
      const l = qe(n), c = Vt(e, n, t, o);
      return l(), ee(), c;
    });
    return r ? s.unshift(i) : s.push(i), i;
  }
}
const Wt = (t) => (e, n = dt) => {
  (!He || t === "sp") && un(t, (...r) => e(...r), n);
}, ko = Wt("bm"), zo = Wt("m"), Wo = Wt(
  "bu"
), Go = Wt("u"), Jo = Wt(
  "bum"
), _i = Wt("um"), Yo = Wt(
  "sp"
), Qo = Wt("rtg"), Zo = Wt("rtc");
function Xo(t, e = dt) {
  un("ec", t, e);
}
const tl = Symbol.for("v-ndc"), er = (t) => t ? Vi(t) ? dn(t) : er(t.parent) : null, De = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ it(/* @__PURE__ */ Object.create(null), {
    $: (t) => t,
    $el: (t) => t.vnode.el,
    $data: (t) => t.data,
    $props: (t) => t.props,
    $attrs: (t) => t.attrs,
    $slots: (t) => t.slots,
    $refs: (t) => t.refs,
    $parent: (t) => er(t.parent),
    $root: (t) => er(t.root),
    $host: (t) => t.ce,
    $emit: (t) => t.emit,
    $options: (t) => yi(t),
    $forceUpdate: (t) => t.f || (t.f = () => {
      Sr(t.update);
    }),
    $nextTick: (t) => t.n || (t.n = ci.bind(t.proxy)),
    $watch: (t) => Cl.bind(t)
  })
), yn = (t, e) => t !== X && !t.__isScriptSetup && J(t, e), el = {
  get({ _: t }, e) {
    if (e === "__v_skip")
      return !0;
    const { ctx: n, setupState: r, data: s, props: i, accessCache: o, type: l, appContext: c } = t;
    let u;
    if (e[0] !== "$") {
      const p = o[e];
      if (p !== void 0)
        switch (p) {
          case 1:
            return r[e];
          case 2:
            return s[e];
          case 4:
            return n[e];
          case 3:
            return i[e];
        }
      else {
        if (yn(r, e))
          return o[e] = 1, r[e];
        if (s !== X && J(s, e))
          return o[e] = 2, s[e];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = t.propsOptions[0]) && J(u, e)
        )
          return o[e] = 3, i[e];
        if (n !== X && J(n, e))
          return o[e] = 4, n[e];
        nr && (o[e] = 0);
      }
    }
    const a = De[e];
    let h, m;
    if (a)
      return e === "$attrs" && lt(t.attrs, "get", ""), a(t);
    if (
      // css module (injected by vue-loader)
      (h = l.__cssModules) && (h = h[e])
    )
      return h;
    if (n !== X && J(n, e))
      return o[e] = 4, n[e];
    if (
      // global properties
      m = c.config.globalProperties, J(m, e)
    )
      return m[e];
  },
  set({ _: t }, e, n) {
    const { data: r, setupState: s, ctx: i } = t;
    return yn(s, e) ? (s[e] = n, !0) : r !== X && J(r, e) ? (r[e] = n, !0) : J(t.props, e) || e[0] === "$" && e.slice(1) in t ? !1 : (i[e] = n, !0);
  },
  has({
    _: { data: t, setupState: e, accessCache: n, ctx: r, appContext: s, propsOptions: i }
  }, o) {
    let l;
    return !!n[o] || t !== X && J(t, o) || yn(e, o) || (l = i[0]) && J(l, o) || J(r, o) || J(De, o) || J(s.config.globalProperties, o);
  },
  defineProperty(t, e, n) {
    return n.get != null ? t._.accessCache[e] = 0 : J(n, "value") && this.set(t, e, n.value, null), Reflect.defineProperty(t, e, n);
  }
};
function Fr(t) {
  return K(t) ? t.reduce(
    (e, n) => (e[n] = null, e),
    {}
  ) : t;
}
let nr = !0;
function nl(t) {
  const e = yi(t), n = t.proxy, r = t.ctx;
  nr = !1, e.beforeCreate && Ur(e.beforeCreate, t, "bc");
  const {
    // state
    data: s,
    computed: i,
    methods: o,
    watch: l,
    provide: c,
    inject: u,
    // lifecycle
    created: a,
    beforeMount: h,
    mounted: m,
    beforeUpdate: p,
    updated: T,
    activated: R,
    deactivated: z,
    beforeDestroy: A,
    beforeUnmount: N,
    destroyed: P,
    unmounted: v,
    render: k,
    renderTracked: I,
    renderTriggered: B,
    errorCaptured: D,
    serverPrefetch: M,
    // public API
    expose: F,
    inheritAttrs: L,
    // assets
    components: U,
    directives: O,
    filters: q
  } = e;
  if (u && rl(u, r, null), o)
    for (const nt in o) {
      const Q = o[nt];
      $(Q) && (r[nt] = Q.bind(n));
    }
  if (s) {
    const nt = s.call(n, n);
    st(nt) && (t.data = vr(nt));
  }
  if (nr = !0, i)
    for (const nt in i) {
      const Q = i[nt], Ht = $(Q) ? Q.bind(n, n) : $(Q.get) ? Q.get.bind(n, n) : Ft, Gt = !$(Q) && $(Q.set) ? Q.set.bind(n) : Ft, Ct = kl({
        get: Ht,
        set: Gt
      });
      Object.defineProperty(r, nt, {
        enumerable: !0,
        configurable: !0,
        get: () => Ct.value,
        set: (pt) => Ct.value = pt
      });
    }
  if (l)
    for (const nt in l)
      bi(l[nt], r, n, nt);
  if (c) {
    const nt = $(c) ? c.call(n) : c;
    Reflect.ownKeys(nt).forEach((Q) => {
      ul(Q, nt[Q]);
    });
  }
  a && Ur(a, t, "c");
  function rt(nt, Q) {
    K(Q) ? Q.forEach((Ht) => nt(Ht.bind(n))) : Q && nt(Q.bind(n));
  }
  if (rt(ko, h), rt(zo, m), rt(Wo, p), rt(Go, T), rt(qo, R), rt(Ko, z), rt(Xo, D), rt(Zo, I), rt(Qo, B), rt(Jo, N), rt(_i, v), rt(Yo, M), K(F))
    if (F.length) {
      const nt = t.exposed || (t.exposed = {});
      F.forEach((Q) => {
        Object.defineProperty(nt, Q, {
          get: () => n[Q],
          set: (Ht) => n[Q] = Ht
        });
      });
    } else t.exposed || (t.exposed = {});
  k && t.render === Ft && (t.render = k), L != null && (t.inheritAttrs = L), U && (t.components = U), O && (t.directives = O), M && gi(t);
}
function rl(t, e, n = Ft) {
  K(t) && (t = rr(t));
  for (const r in t) {
    const s = t[r];
    let i;
    st(s) ? "default" in s ? i = Ge(
      s.from || r,
      s.default,
      !0
    ) : i = Ge(s.from || r) : i = Ge(s), ct(i) ? Object.defineProperty(e, r, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (o) => i.value = o
    }) : e[r] = i;
  }
}
function Ur(t, e, n) {
  Vt(
    K(t) ? t.map((r) => r.bind(e.proxy)) : t.bind(e.proxy),
    e,
    n
  );
}
function bi(t, e, n, r) {
  let s = r.includes(".") ? Bi(n, r) : () => n[r];
  if (ot(t)) {
    const i = e[t];
    $(i) && vn(s, i);
  } else if ($(t))
    vn(s, t.bind(n));
  else if (st(t))
    if (K(t))
      t.forEach((i) => bi(i, e, n, r));
    else {
      const i = $(t.handler) ? t.handler.bind(n) : e[t.handler];
      $(i) && vn(s, i, t);
    }
}
function yi(t) {
  const e = t.type, { mixins: n, extends: r } = e, {
    mixins: s,
    optionsCache: i,
    config: { optionMergeStrategies: o }
  } = t.appContext, l = i.get(e);
  let c;
  return l ? c = l : !s.length && !n && !r ? c = e : (c = {}, s.length && s.forEach(
    (u) => en(c, u, o, !0)
  ), en(c, e, o)), st(e) && i.set(e, c), c;
}
function en(t, e, n, r = !1) {
  const { mixins: s, extends: i } = e;
  i && en(t, i, n, !0), s && s.forEach(
    (o) => en(t, o, n, !0)
  );
  for (const o in e)
    if (!(r && o === "expose")) {
      const l = sl[o] || n && n[o];
      t[o] = l ? l(t[o], e[o]) : e[o];
    }
  return t;
}
const sl = {
  data: Vr,
  props: Hr,
  emits: Hr,
  // objects
  methods: Ae,
  computed: Ae,
  // lifecycle
  beforeCreate: ut,
  created: ut,
  beforeMount: ut,
  mounted: ut,
  beforeUpdate: ut,
  updated: ut,
  beforeDestroy: ut,
  beforeUnmount: ut,
  destroyed: ut,
  unmounted: ut,
  activated: ut,
  deactivated: ut,
  errorCaptured: ut,
  serverPrefetch: ut,
  // assets
  components: Ae,
  directives: Ae,
  // watch
  watch: ol,
  // provide / inject
  provide: Vr,
  inject: il
};
function Vr(t, e) {
  return e ? t ? function() {
    return it(
      $(t) ? t.call(this, this) : t,
      $(e) ? e.call(this, this) : e
    );
  } : e : t;
}
function il(t, e) {
  return Ae(rr(t), rr(e));
}
function rr(t) {
  if (K(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++)
      e[t[n]] = t[n];
    return e;
  }
  return t;
}
function ut(t, e) {
  return t ? [...new Set([].concat(t, e))] : e;
}
function Ae(t, e) {
  return t ? it(/* @__PURE__ */ Object.create(null), t, e) : e;
}
function Hr(t, e) {
  return t ? K(t) && K(e) ? [.../* @__PURE__ */ new Set([...t, ...e])] : it(
    /* @__PURE__ */ Object.create(null),
    Fr(t),
    Fr(e ?? {})
  ) : e;
}
function ol(t, e) {
  if (!t) return e;
  if (!e) return t;
  const n = it(/* @__PURE__ */ Object.create(null), t);
  for (const r in e)
    n[r] = ut(t[r], e[r]);
  return n;
}
function wi() {
  return {
    app: null,
    config: {
      isNativeTag: Wi,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let ll = 0;
function cl(t, e) {
  return function(r, s = null) {
    $(r) || (r = it({}, r)), s != null && !st(s) && (s = null);
    const i = wi(), o = /* @__PURE__ */ new WeakSet(), l = [];
    let c = !1;
    const u = i.app = {
      _uid: ll++,
      _component: r,
      _props: s,
      _container: null,
      _context: i,
      _instance: null,
      version: zl,
      get config() {
        return i.config;
      },
      set config(a) {
      },
      use(a, ...h) {
        return o.has(a) || (a && $(a.install) ? (o.add(a), a.install(u, ...h)) : $(a) && (o.add(a), a(u, ...h))), u;
      },
      mixin(a) {
        return i.mixins.includes(a) || i.mixins.push(a), u;
      },
      component(a, h) {
        return h ? (i.components[a] = h, u) : i.components[a];
      },
      directive(a, h) {
        return h ? (i.directives[a] = h, u) : i.directives[a];
      },
      mount(a, h, m) {
        if (!c) {
          const p = u._ceVNode || Ut(r, s);
          return p.appContext = i, m === !0 ? m = "svg" : m === !1 && (m = void 0), t(p, a, m), c = !0, u._container = a, a.__vue_app__ = u, dn(p.component);
        }
      },
      onUnmount(a) {
        l.push(a);
      },
      unmount() {
        c && (Vt(
          l,
          u._instance,
          16
        ), t(null, u._container), delete u._container.__vue_app__);
      },
      provide(a, h) {
        return i.provides[a] = h, u;
      },
      runWithContext(a) {
        const h = ye;
        ye = u;
        try {
          return a();
        } finally {
          ye = h;
        }
      }
    };
    return u;
  };
}
let ye = null;
function ul(t, e) {
  if (dt) {
    let n = dt.provides;
    const r = dt.parent && dt.parent.provides;
    r === n && (n = dt.provides = Object.create(r)), n[t] = e;
  }
}
function Ge(t, e, n = !1) {
  const r = dt || St;
  if (r || ye) {
    const s = ye ? ye._context.provides : r ? r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (s && t in s)
      return s[t];
    if (arguments.length > 1)
      return n && $(e) ? e.call(r && r.proxy) : e;
  }
}
const vi = {}, Ci = () => Object.create(vi), Ei = (t) => Object.getPrototypeOf(t) === vi;
function fl(t, e, n, r = !1) {
  const s = {}, i = Ci();
  t.propsDefaults = /* @__PURE__ */ Object.create(null), Si(t, e, s, i);
  for (const o in t.propsOptions[0])
    o in s || (s[o] = void 0);
  n ? t.props = r ? s : Ao(s) : t.type.props ? t.props = s : t.props = i, t.attrs = i;
}
function al(t, e, n, r) {
  const {
    props: s,
    attrs: i,
    vnode: { patchFlag: o }
  } = t, l = Y(s), [c] = t.propsOptions;
  let u = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (r || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const a = t.vnode.dynamicProps;
      for (let h = 0; h < a.length; h++) {
        let m = a[h];
        if (fn(t.emitsOptions, m))
          continue;
        const p = e[m];
        if (c)
          if (J(i, m))
            p !== i[m] && (i[m] = p, u = !0);
          else {
            const T = Rt(m);
            s[T] = sr(
              c,
              l,
              T,
              p,
              t,
              !1
            );
          }
        else
          p !== i[m] && (i[m] = p, u = !0);
      }
    }
  } else {
    Si(t, e, s, i) && (u = !0);
    let a;
    for (const h in l)
      (!e || // for camelCase
      !J(e, h) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((a = Et(h)) === h || !J(e, a))) && (c ? n && // for camelCase
      (n[h] !== void 0 || // for kebab-case
      n[a] !== void 0) && (s[h] = sr(
        c,
        l,
        h,
        void 0,
        t,
        !0
      )) : delete s[h]);
    if (i !== l)
      for (const h in i)
        (!e || !J(e, h)) && (delete i[h], u = !0);
  }
  u && kt(t.attrs, "set", "");
}
function Si(t, e, n, r) {
  const [s, i] = t.propsOptions;
  let o = !1, l;
  if (e)
    for (let c in e) {
      if (Pe(c))
        continue;
      const u = e[c];
      let a;
      s && J(s, a = Rt(c)) ? !i || !i.includes(a) ? n[a] = u : (l || (l = {}))[a] = u : fn(t.emitsOptions, c) || (!(c in r) || u !== r[c]) && (r[c] = u, o = !0);
    }
  if (i) {
    const c = Y(n), u = l || X;
    for (let a = 0; a < i.length; a++) {
      const h = i[a];
      n[h] = sr(
        s,
        c,
        h,
        u[h],
        t,
        !J(u, h)
      );
    }
  }
  return o;
}
function sr(t, e, n, r, s, i) {
  const o = t[n];
  if (o != null) {
    const l = J(o, "default");
    if (l && r === void 0) {
      const c = o.default;
      if (o.type !== Function && !o.skipFactory && $(c)) {
        const { propsDefaults: u } = s;
        if (n in u)
          r = u[n];
        else {
          const a = qe(s);
          r = u[n] = c.call(
            null,
            e
          ), a();
        }
      } else
        r = c;
      s.ce && s.ce._setProp(n, r);
    }
    o[
      0
      /* shouldCast */
    ] && (i && !l ? r = !1 : o[
      1
      /* shouldCastTrue */
    ] && (r === "" || r === Et(n)) && (r = !0));
  }
  return r;
}
const dl = /* @__PURE__ */ new WeakMap();
function Ti(t, e, n = !1) {
  const r = n ? dl : e.propsCache, s = r.get(t);
  if (s)
    return s;
  const i = t.props, o = {}, l = [];
  let c = !1;
  if (!$(t)) {
    const a = (h) => {
      c = !0;
      const [m, p] = Ti(h, e, !0);
      it(o, m), p && l.push(...p);
    };
    !n && e.mixins.length && e.mixins.forEach(a), t.extends && a(t.extends), t.mixins && t.mixins.forEach(a);
  }
  if (!i && !c)
    return st(t) && r.set(t, _e), _e;
  if (K(i))
    for (let a = 0; a < i.length; a++) {
      const h = Rt(i[a]);
      jr(h) && (o[h] = X);
    }
  else if (i)
    for (const a in i) {
      const h = Rt(a);
      if (jr(h)) {
        const m = i[a], p = o[h] = K(m) || $(m) ? { type: m } : it({}, m), T = p.type;
        let R = !1, z = !0;
        if (K(T))
          for (let A = 0; A < T.length; ++A) {
            const N = T[A], P = $(N) && N.name;
            if (P === "Boolean") {
              R = !0;
              break;
            } else P === "String" && (z = !1);
          }
        else
          R = $(T) && T.name === "Boolean";
        p[
          0
          /* shouldCast */
        ] = R, p[
          1
          /* shouldCastTrue */
        ] = z, (R || J(p, "default")) && l.push(h);
      }
    }
  const u = [o, l];
  return st(t) && r.set(t, u), u;
}
function jr(t) {
  return t[0] !== "$" && !Pe(t);
}
const Ri = (t) => t[0] === "_" || t === "$stable", Rr = (t) => K(t) ? t.map(Ot) : [Ot(t)], hl = (t, e, n) => {
  if (e._n)
    return e;
  const r = Vo((...s) => Rr(e(...s)), n);
  return r._c = !1, r;
}, Ai = (t, e, n) => {
  const r = t._ctx;
  for (const s in t) {
    if (Ri(s)) continue;
    const i = t[s];
    if ($(i))
      e[s] = hl(s, i, r);
    else if (i != null) {
      const o = Rr(i);
      e[s] = () => o;
    }
  }
}, xi = (t, e) => {
  const n = Rr(e);
  t.slots.default = () => n;
}, Pi = (t, e, n) => {
  for (const r in e)
    (n || r !== "_") && (t[r] = e[r]);
}, gl = (t, e, n) => {
  const r = t.slots = Ci();
  if (t.vnode.shapeFlag & 32) {
    const s = e._;
    s ? (Pi(r, e, n), n && qs(r, "_", s, !0)) : Ai(e, r);
  } else e && xi(t, e);
}, pl = (t, e, n) => {
  const { vnode: r, slots: s } = t;
  let i = !0, o = X;
  if (r.shapeFlag & 32) {
    const l = e._;
    l ? n && l === 1 ? i = !1 : Pi(s, e, n) : (i = !e.$stable, Ai(e, s)), o = e;
  } else e && (xi(t, e), o = { default: 1 });
  if (i)
    for (const l in s)
      !Ri(l) && o[l] == null && delete s[l];
}, yt = Pl;
function ml(t) {
  return _l(t);
}
function _l(t, e) {
  const n = ln();
  n.__VUE__ = !0;
  const {
    insert: r,
    remove: s,
    patchProp: i,
    createElement: o,
    createText: l,
    createComment: c,
    setText: u,
    setElementText: a,
    parentNode: h,
    nextSibling: m,
    setScopeId: p = Ft,
    insertStaticContent: T
  } = t, R = (f, d, g, y = null, _ = null, b = null, S = void 0, E = null, C = !!d.dynamicChildren) => {
    if (f === d)
      return;
    f && !Te(f, d) && (y = ht(f), pt(f, _, b, !0), f = null), d.patchFlag === -2 && (C = !1, d.dynamicChildren = null);
    const { type: w, ref: H, shapeFlag: x } = d;
    switch (w) {
      case an:
        z(f, d, g, y);
        break;
      case ue:
        A(f, d, g, y);
        break;
      case Cn:
        f == null && N(d, g, y, S);
        break;
      case Lt:
        U(
          f,
          d,
          g,
          y,
          _,
          b,
          S,
          E,
          C
        );
        break;
      default:
        x & 1 ? k(
          f,
          d,
          g,
          y,
          _,
          b,
          S,
          E,
          C
        ) : x & 6 ? O(
          f,
          d,
          g,
          y,
          _,
          b,
          S,
          E,
          C
        ) : (x & 64 || x & 128) && w.process(
          f,
          d,
          g,
          y,
          _,
          b,
          S,
          E,
          C,
          qt
        );
    }
    H != null && _ && tn(H, f && f.ref, b, d || f, !d);
  }, z = (f, d, g, y) => {
    if (f == null)
      r(
        d.el = l(d.children),
        g,
        y
      );
    else {
      const _ = d.el = f.el;
      d.children !== f.children && u(_, d.children);
    }
  }, A = (f, d, g, y) => {
    f == null ? r(
      d.el = c(d.children || ""),
      g,
      y
    ) : d.el = f.el;
  }, N = (f, d, g, y) => {
    [f.el, f.anchor] = T(
      f.children,
      d,
      g,
      y,
      f.el,
      f.anchor
    );
  }, P = ({ el: f, anchor: d }, g, y) => {
    let _;
    for (; f && f !== d; )
      _ = m(f), r(f, g, y), f = _;
    r(d, g, y);
  }, v = ({ el: f, anchor: d }) => {
    let g;
    for (; f && f !== d; )
      g = m(f), s(f), f = g;
    s(d);
  }, k = (f, d, g, y, _, b, S, E, C) => {
    d.type === "svg" ? S = "svg" : d.type === "math" && (S = "mathml"), f == null ? I(
      d,
      g,
      y,
      _,
      b,
      S,
      E,
      C
    ) : M(
      f,
      d,
      _,
      b,
      S,
      E,
      C
    );
  }, I = (f, d, g, y, _, b, S, E) => {
    let C, w;
    const { props: H, shapeFlag: x, transition: V, dirs: j } = f;
    if (C = f.el = o(
      f.type,
      b,
      H && H.is,
      H
    ), x & 8 ? a(C, f.children) : x & 16 && D(
      f.children,
      C,
      null,
      y,
      _,
      wn(f, b),
      S,
      E
    ), j && re(f, null, y, "created"), B(C, f, f.scopeId, S, y), H) {
      for (const tt in H)
        tt !== "value" && !Pe(tt) && i(C, tt, null, H[tt], b, y);
      "value" in H && i(C, "value", null, H.value, b), (w = H.onVnodeBeforeMount) && Nt(w, y, f);
    }
    j && re(f, null, y, "beforeMount");
    const W = bl(_, V);
    W && V.beforeEnter(C), r(C, d, g), ((w = H && H.onVnodeMounted) || W || j) && yt(() => {
      w && Nt(w, y, f), W && V.enter(C), j && re(f, null, y, "mounted");
    }, _);
  }, B = (f, d, g, y, _) => {
    if (g && p(f, g), y)
      for (let b = 0; b < y.length; b++)
        p(f, y[b]);
    if (_) {
      let b = _.subTree;
      if (d === b || Li(b.type) && (b.ssContent === d || b.ssFallback === d)) {
        const S = _.vnode;
        B(
          f,
          S,
          S.scopeId,
          S.slotScopeIds,
          _.parent
        );
      }
    }
  }, D = (f, d, g, y, _, b, S, E, C = 0) => {
    for (let w = C; w < f.length; w++) {
      const H = f[w] = E ? Zt(f[w]) : Ot(f[w]);
      R(
        null,
        H,
        d,
        g,
        y,
        _,
        b,
        S,
        E
      );
    }
  }, M = (f, d, g, y, _, b, S) => {
    const E = d.el = f.el;
    let { patchFlag: C, dynamicChildren: w, dirs: H } = d;
    C |= f.patchFlag & 16;
    const x = f.props || X, V = d.props || X;
    let j;
    if (g && se(g, !1), (j = V.onVnodeBeforeUpdate) && Nt(j, g, d, f), H && re(d, f, g, "beforeUpdate"), g && se(g, !0), (x.innerHTML && V.innerHTML == null || x.textContent && V.textContent == null) && a(E, ""), w ? F(
      f.dynamicChildren,
      w,
      E,
      g,
      y,
      wn(d, _),
      b
    ) : S || Q(
      f,
      d,
      E,
      null,
      g,
      y,
      wn(d, _),
      b,
      !1
    ), C > 0) {
      if (C & 16)
        L(E, x, V, g, _);
      else if (C & 2 && x.class !== V.class && i(E, "class", null, V.class, _), C & 4 && i(E, "style", x.style, V.style, _), C & 8) {
        const W = d.dynamicProps;
        for (let tt = 0; tt < W.length; tt++) {
          const Z = W[tt], _t = x[Z], gt = V[Z];
          (gt !== _t || Z === "value") && i(E, Z, _t, gt, _, g);
        }
      }
      C & 1 && f.children !== d.children && a(E, d.children);
    } else !S && w == null && L(E, x, V, g, _);
    ((j = V.onVnodeUpdated) || H) && yt(() => {
      j && Nt(j, g, d, f), H && re(d, f, g, "updated");
    }, y);
  }, F = (f, d, g, y, _, b, S) => {
    for (let E = 0; E < d.length; E++) {
      const C = f[E], w = d[E], H = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        C.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (C.type === Lt || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Te(C, w) || // - In the case of a component, it could contain anything.
        C.shapeFlag & 70) ? h(C.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          g
        )
      );
      R(
        C,
        w,
        H,
        null,
        y,
        _,
        b,
        S,
        !0
      );
    }
  }, L = (f, d, g, y, _) => {
    if (d !== g) {
      if (d !== X)
        for (const b in d)
          !Pe(b) && !(b in g) && i(
            f,
            b,
            d[b],
            null,
            _,
            y
          );
      for (const b in g) {
        if (Pe(b)) continue;
        const S = g[b], E = d[b];
        S !== E && b !== "value" && i(f, b, E, S, _, y);
      }
      "value" in g && i(f, "value", d.value, g.value, _);
    }
  }, U = (f, d, g, y, _, b, S, E, C) => {
    const w = d.el = f ? f.el : l(""), H = d.anchor = f ? f.anchor : l("");
    let { patchFlag: x, dynamicChildren: V, slotScopeIds: j } = d;
    j && (E = E ? E.concat(j) : j), f == null ? (r(w, g, y), r(H, g, y), D(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      d.children || [],
      g,
      H,
      _,
      b,
      S,
      E,
      C
    )) : x > 0 && x & 64 && V && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    f.dynamicChildren ? (F(
      f.dynamicChildren,
      V,
      g,
      _,
      b,
      S,
      E
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (d.key != null || _ && d === _.subTree) && Ii(
      f,
      d,
      !0
      /* shallow */
    )) : Q(
      f,
      d,
      g,
      H,
      _,
      b,
      S,
      E,
      C
    );
  }, O = (f, d, g, y, _, b, S, E, C) => {
    d.slotScopeIds = E, f == null ? d.shapeFlag & 512 ? _.ctx.activate(
      d,
      g,
      y,
      S,
      C
    ) : q(
      d,
      g,
      y,
      _,
      b,
      S,
      C
    ) : Tt(f, d, C);
  }, q = (f, d, g, y, _, b, S) => {
    const E = f.component = Vl(
      f,
      y,
      _
    );
    if (pi(f) && (E.ctx.renderer = qt), Hl(E, !1, S), E.asyncDep) {
      if (_ && _.registerDep(E, rt, S), !f.el) {
        const C = E.subTree = Ut(ue);
        A(null, C, d, g);
      }
    } else
      rt(
        E,
        f,
        d,
        g,
        _,
        b,
        S
      );
  }, Tt = (f, d, g) => {
    const y = d.component = f.component;
    if (Al(f, d, g))
      if (y.asyncDep && !y.asyncResolved) {
        nt(y, d, g);
        return;
      } else
        y.next = d, y.update();
    else
      d.el = f.el, y.vnode = d;
  }, rt = (f, d, g, y, _, b, S) => {
    const E = () => {
      if (f.isMounted) {
        let { next: x, bu: V, u: j, parent: W, vnode: tt } = f;
        {
          const It = Mi(f);
          if (It) {
            x && (x.el = tt.el, nt(f, x, S)), It.asyncDep.then(() => {
              f.isUnmounted || E();
            });
            return;
          }
        }
        let Z = x, _t;
        se(f, !1), x ? (x.el = tt.el, nt(f, x, S)) : x = tt, V && We(V), (_t = x.props && x.props.onVnodeBeforeUpdate) && Nt(_t, W, x, tt), se(f, !0);
        const gt = Kr(f), Pt = f.subTree;
        f.subTree = gt, R(
          Pt,
          gt,
          // parent may have changed if it's in a teleport
          h(Pt.el),
          // anchor may have changed if it's in a fragment
          ht(Pt),
          f,
          _,
          b
        ), x.el = gt.el, Z === null && xl(f, gt.el), j && yt(j, _), (_t = x.props && x.props.onVnodeUpdated) && yt(
          () => Nt(_t, W, x, tt),
          _
        );
      } else {
        let x;
        const { el: V, props: j } = d, { bm: W, m: tt, parent: Z, root: _t, type: gt } = f, Pt = Be(d);
        se(f, !1), W && We(W), !Pt && (x = j && j.onVnodeBeforeMount) && Nt(x, Z, d), se(f, !0);
        {
          _t.ce && _t.ce._injectChildStyle(gt);
          const It = f.subTree = Kr(f);
          R(
            null,
            It,
            g,
            y,
            f,
            _,
            b
          ), d.el = It.el;
        }
        if (tt && yt(tt, _), !Pt && (x = j && j.onVnodeMounted)) {
          const It = d;
          yt(
            () => Nt(x, Z, It),
            _
          );
        }
        (d.shapeFlag & 256 || Z && Be(Z.vnode) && Z.vnode.shapeFlag & 256) && f.a && yt(f.a, _), f.isMounted = !0, d = g = y = null;
      }
    };
    f.scope.on();
    const C = f.effect = new $s(E);
    f.scope.off();
    const w = f.update = C.run.bind(C), H = f.job = C.runIfDirty.bind(C);
    H.i = f, H.id = f.uid, C.scheduler = () => Sr(H), se(f, !0), w();
  }, nt = (f, d, g) => {
    d.component = f;
    const y = f.vnode.props;
    f.vnode = d, f.next = null, al(f, d.props, y, g), pl(f, d.children, g), te(), Or(f), ee();
  }, Q = (f, d, g, y, _, b, S, E, C = !1) => {
    const w = f && f.children, H = f ? f.shapeFlag : 0, x = d.children, { patchFlag: V, shapeFlag: j } = d;
    if (V > 0) {
      if (V & 128) {
        Gt(
          w,
          x,
          g,
          y,
          _,
          b,
          S,
          E,
          C
        );
        return;
      } else if (V & 256) {
        Ht(
          w,
          x,
          g,
          y,
          _,
          b,
          S,
          E,
          C
        );
        return;
      }
    }
    j & 8 ? (H & 16 && Jt(w, _, b), x !== w && a(g, x)) : H & 16 ? j & 16 ? Gt(
      w,
      x,
      g,
      y,
      _,
      b,
      S,
      E,
      C
    ) : Jt(w, _, b, !0) : (H & 8 && a(g, ""), j & 16 && D(
      x,
      g,
      y,
      _,
      b,
      S,
      E,
      C
    ));
  }, Ht = (f, d, g, y, _, b, S, E, C) => {
    f = f || _e, d = d || _e;
    const w = f.length, H = d.length, x = Math.min(w, H);
    let V;
    for (V = 0; V < x; V++) {
      const j = d[V] = C ? Zt(d[V]) : Ot(d[V]);
      R(
        f[V],
        j,
        g,
        null,
        _,
        b,
        S,
        E,
        C
      );
    }
    w > H ? Jt(
      f,
      _,
      b,
      !0,
      !1,
      x
    ) : D(
      d,
      g,
      y,
      _,
      b,
      S,
      E,
      C,
      x
    );
  }, Gt = (f, d, g, y, _, b, S, E, C) => {
    let w = 0;
    const H = d.length;
    let x = f.length - 1, V = H - 1;
    for (; w <= x && w <= V; ) {
      const j = f[w], W = d[w] = C ? Zt(d[w]) : Ot(d[w]);
      if (Te(j, W))
        R(
          j,
          W,
          g,
          null,
          _,
          b,
          S,
          E,
          C
        );
      else
        break;
      w++;
    }
    for (; w <= x && w <= V; ) {
      const j = f[x], W = d[V] = C ? Zt(d[V]) : Ot(d[V]);
      if (Te(j, W))
        R(
          j,
          W,
          g,
          null,
          _,
          b,
          S,
          E,
          C
        );
      else
        break;
      x--, V--;
    }
    if (w > x) {
      if (w <= V) {
        const j = V + 1, W = j < H ? d[j].el : y;
        for (; w <= V; )
          R(
            null,
            d[w] = C ? Zt(d[w]) : Ot(d[w]),
            g,
            W,
            _,
            b,
            S,
            E,
            C
          ), w++;
      }
    } else if (w > V)
      for (; w <= x; )
        pt(f[w], _, b, !0), w++;
    else {
      const j = w, W = w, tt = /* @__PURE__ */ new Map();
      for (w = W; w <= V; w++) {
        const bt = d[w] = C ? Zt(d[w]) : Ot(d[w]);
        bt.key != null && tt.set(bt.key, w);
      }
      let Z, _t = 0;
      const gt = V - W + 1;
      let Pt = !1, It = 0;
      const Ee = new Array(gt);
      for (w = 0; w < gt; w++) Ee[w] = 0;
      for (w = j; w <= x; w++) {
        const bt = f[w];
        if (_t >= gt) {
          pt(bt, _, b, !0);
          continue;
        }
        let Mt;
        if (bt.key != null)
          Mt = tt.get(bt.key);
        else
          for (Z = W; Z <= V; Z++)
            if (Ee[Z - W] === 0 && Te(bt, d[Z])) {
              Mt = Z;
              break;
            }
        Mt === void 0 ? pt(bt, _, b, !0) : (Ee[Mt - W] = w + 1, Mt >= It ? It = Mt : Pt = !0, R(
          bt,
          d[Mt],
          g,
          null,
          _,
          b,
          S,
          E,
          C
        ), _t++);
      }
      const Ir = Pt ? yl(Ee) : _e;
      for (Z = Ir.length - 1, w = gt - 1; w >= 0; w--) {
        const bt = W + w, Mt = d[bt], Mr = bt + 1 < H ? d[bt + 1].el : y;
        Ee[w] === 0 ? R(
          null,
          Mt,
          g,
          Mr,
          _,
          b,
          S,
          E,
          C
        ) : Pt && (Z < 0 || w !== Ir[Z] ? Ct(Mt, g, Mr, 2) : Z--);
      }
    }
  }, Ct = (f, d, g, y, _ = null) => {
    const { el: b, type: S, transition: E, children: C, shapeFlag: w } = f;
    if (w & 6) {
      Ct(f.component.subTree, d, g, y);
      return;
    }
    if (w & 128) {
      f.suspense.move(d, g, y);
      return;
    }
    if (w & 64) {
      S.move(f, d, g, qt);
      return;
    }
    if (S === Lt) {
      r(b, d, g);
      for (let x = 0; x < C.length; x++)
        Ct(C[x], d, g, y);
      r(f.anchor, d, g);
      return;
    }
    if (S === Cn) {
      P(f, d, g);
      return;
    }
    if (y !== 2 && w & 1 && E)
      if (y === 0)
        E.beforeEnter(b), r(b, d, g), yt(() => E.enter(b), _);
      else {
        const { leave: x, delayLeave: V, afterLeave: j } = E, W = () => r(b, d, g), tt = () => {
          x(b, () => {
            W(), j && j();
          });
        };
        V ? V(b, W, tt) : tt();
      }
    else
      r(b, d, g);
  }, pt = (f, d, g, y = !1, _ = !1) => {
    const {
      type: b,
      props: S,
      ref: E,
      children: C,
      dynamicChildren: w,
      shapeFlag: H,
      patchFlag: x,
      dirs: V,
      cacheIndex: j
    } = f;
    if (x === -2 && (_ = !1), E != null && tn(E, null, g, f, !0), j != null && (d.renderCache[j] = void 0), H & 256) {
      d.ctx.deactivate(f);
      return;
    }
    const W = H & 1 && V, tt = !Be(f);
    let Z;
    if (tt && (Z = S && S.onVnodeBeforeUnmount) && Nt(Z, d, f), H & 6)
      Ce(f.component, g, y);
    else {
      if (H & 128) {
        f.suspense.unmount(g, y);
        return;
      }
      W && re(f, null, d, "beforeUnmount"), H & 64 ? f.type.remove(
        f,
        d,
        g,
        qt,
        y
      ) : w && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !w.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (b !== Lt || x > 0 && x & 64) ? Jt(
        w,
        d,
        g,
        !1,
        !0
      ) : (b === Lt && x & 384 || !_ && H & 16) && Jt(C, d, g), y && de(f);
    }
    (tt && (Z = S && S.onVnodeUnmounted) || W) && yt(() => {
      Z && Nt(Z, d, f), W && re(f, null, d, "unmounted");
    }, g);
  }, de = (f) => {
    const { type: d, el: g, anchor: y, transition: _ } = f;
    if (d === Lt) {
      hn(g, y);
      return;
    }
    if (d === Cn) {
      v(f);
      return;
    }
    const b = () => {
      s(g), _ && !_.persisted && _.afterLeave && _.afterLeave();
    };
    if (f.shapeFlag & 1 && _ && !_.persisted) {
      const { leave: S, delayLeave: E } = _, C = () => S(g, b);
      E ? E(f.el, b, C) : C();
    } else
      b();
  }, hn = (f, d) => {
    let g;
    for (; f !== d; )
      g = m(f), s(f), f = g;
    s(d);
  }, Ce = (f, d, g) => {
    const { bum: y, scope: _, job: b, subTree: S, um: E, m: C, a: w } = f;
    qr(C), qr(w), y && We(y), _.stop(), b && (b.flags |= 8, pt(S, f, d, g)), E && yt(E, d), yt(() => {
      f.isUnmounted = !0;
    }, d), d && d.pendingBranch && !d.isUnmounted && f.asyncDep && !f.asyncResolved && f.suspenseId === d.pendingId && (d.deps--, d.deps === 0 && d.resolve());
  }, Jt = (f, d, g, y = !1, _ = !1, b = 0) => {
    for (let S = b; S < f.length; S++)
      pt(f[S], d, g, y, _);
  }, ht = (f) => {
    if (f.shapeFlag & 6)
      return ht(f.component.subTree);
    if (f.shapeFlag & 128)
      return f.suspense.next();
    const d = m(f.anchor || f.el), g = d && d[Ho];
    return g ? m(g) : d;
  };
  let mt = !1;
  const jt = (f, d, g) => {
    f == null ? d._vnode && pt(d._vnode, null, null, !0) : R(
      d._vnode || null,
      f,
      d,
      null,
      null,
      null,
      g
    ), d._vnode = f, mt || (mt = !0, Or(), fi(), mt = !1);
  }, qt = {
    p: R,
    um: pt,
    m: Ct,
    r: de,
    mt: q,
    mc: D,
    pc: Q,
    pbc: F,
    n: ht,
    o: t
  };
  return {
    render: jt,
    hydrate: void 0,
    createApp: cl(jt)
  };
}
function wn({ type: t, props: e }, n) {
  return n === "svg" && t === "foreignObject" || n === "mathml" && t === "annotation-xml" && e && e.encoding && e.encoding.includes("html") ? void 0 : n;
}
function se({ effect: t, job: e }, n) {
  n ? (t.flags |= 32, e.flags |= 4) : (t.flags &= -33, e.flags &= -5);
}
function bl(t, e) {
  return (!t || t && !t.pendingBranch) && e && !e.persisted;
}
function Ii(t, e, n = !1) {
  const r = t.children, s = e.children;
  if (K(r) && K(s))
    for (let i = 0; i < r.length; i++) {
      const o = r[i];
      let l = s[i];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = s[i] = Zt(s[i]), l.el = o.el), !n && l.patchFlag !== -2 && Ii(o, l)), l.type === an && (l.el = o.el);
    }
}
function yl(t) {
  const e = t.slice(), n = [0];
  let r, s, i, o, l;
  const c = t.length;
  for (r = 0; r < c; r++) {
    const u = t[r];
    if (u !== 0) {
      if (s = n[n.length - 1], t[s] < u) {
        e[r] = s, n.push(r);
        continue;
      }
      for (i = 0, o = n.length - 1; i < o; )
        l = i + o >> 1, t[n[l]] < u ? i = l + 1 : o = l;
      u < t[n[i]] && (i > 0 && (e[r] = n[i - 1]), n[i] = r);
    }
  }
  for (i = n.length, o = n[i - 1]; i-- > 0; )
    n[i] = o, o = e[o];
  return n;
}
function Mi(t) {
  const e = t.subTree.component;
  if (e)
    return e.asyncDep && !e.asyncResolved ? e : Mi(e);
}
function qr(t) {
  if (t)
    for (let e = 0; e < t.length; e++)
      t[e].flags |= 8;
}
const wl = Symbol.for("v-scx"), vl = () => Ge(wl);
function vn(t, e, n) {
  return Ni(t, e, n);
}
function Ni(t, e, n = X) {
  const { immediate: r, deep: s, flush: i, once: o } = n, l = it({}, n), c = e && r || !e && i !== "post";
  let u;
  if (He) {
    if (i === "sync") {
      const p = vl();
      u = p.__watcherHandles || (p.__watcherHandles = []);
    } else if (!c) {
      const p = () => {
      };
      return p.stop = Ft, p.resume = Ft, p.pause = Ft, p;
    }
  }
  const a = dt;
  l.call = (p, T, R) => Vt(p, a, T, R);
  let h = !1;
  i === "post" ? l.scheduler = (p) => {
    yt(p, a && a.suspense);
  } : i !== "sync" && (h = !0, l.scheduler = (p, T) => {
    T ? p() : Sr(p);
  }), l.augmentJob = (p) => {
    e && (p.flags |= 4), h && (p.flags |= 2, a && (p.id = a.uid, p.i = a));
  };
  const m = Lo(t, e, l);
  return He && (u ? u.push(m) : c && m()), m;
}
function Cl(t, e, n) {
  const r = this.proxy, s = ot(t) ? t.includes(".") ? Bi(r, t) : () => r[t] : t.bind(r, r);
  let i;
  $(e) ? i = e : (i = e.handler, n = e);
  const o = qe(this), l = Ni(s, i.bind(r), n);
  return o(), l;
}
function Bi(t, e) {
  const n = e.split(".");
  return () => {
    let r = t;
    for (let s = 0; s < n.length && r; s++)
      r = r[n[s]];
    return r;
  };
}
const El = (t, e) => e === "modelValue" || e === "model-value" ? t.modelModifiers : t[`${e}Modifiers`] || t[`${Rt(e)}Modifiers`] || t[`${Et(e)}Modifiers`];
function Sl(t, e, ...n) {
  if (t.isUnmounted) return;
  const r = t.vnode.props || X;
  let s = n;
  const i = e.startsWith("update:"), o = i && El(r, e.slice(7));
  o && (o.trim && (s = n.map((a) => ot(a) ? a.trim() : a)), o.number && (s = n.map(Jn)));
  let l, c = r[l = gn(e)] || // also try camelCase event handler (#2249)
  r[l = gn(Rt(e))];
  !c && i && (c = r[l = gn(Et(e))]), c && Vt(
    c,
    t,
    6,
    s
  );
  const u = r[l + "Once"];
  if (u) {
    if (!t.emitted)
      t.emitted = {};
    else if (t.emitted[l])
      return;
    t.emitted[l] = !0, Vt(
      u,
      t,
      6,
      s
    );
  }
}
function Di(t, e, n = !1) {
  const r = e.emitsCache, s = r.get(t);
  if (s !== void 0)
    return s;
  const i = t.emits;
  let o = {}, l = !1;
  if (!$(t)) {
    const c = (u) => {
      const a = Di(u, e, !0);
      a && (l = !0, it(o, a));
    };
    !n && e.mixins.length && e.mixins.forEach(c), t.extends && c(t.extends), t.mixins && t.mixins.forEach(c);
  }
  return !i && !l ? (st(t) && r.set(t, null), null) : (K(i) ? i.forEach((c) => o[c] = null) : it(o, i), st(t) && r.set(t, o), o);
}
function fn(t, e) {
  return !t || !rn(e) ? !1 : (e = e.slice(2).replace(/Once$/, ""), J(t, e[0].toLowerCase() + e.slice(1)) || J(t, Et(e)) || J(t, e));
}
function Kr(t) {
  const {
    type: e,
    vnode: n,
    proxy: r,
    withProxy: s,
    propsOptions: [i],
    slots: o,
    attrs: l,
    emit: c,
    render: u,
    renderCache: a,
    props: h,
    data: m,
    setupState: p,
    ctx: T,
    inheritAttrs: R
  } = t, z = Xe(t);
  let A, N;
  try {
    if (n.shapeFlag & 4) {
      const v = s || r, k = v;
      A = Ot(
        u.call(
          k,
          v,
          a,
          h,
          p,
          m,
          T
        )
      ), N = l;
    } else {
      const v = e;
      A = Ot(
        v.length > 1 ? v(
          h,
          { attrs: l, slots: o, emit: c }
        ) : v(
          h,
          null
        )
      ), N = e.props ? l : Tl(l);
    }
  } catch (v) {
    Le.length = 0, cn(v, t, 1), A = Ut(ue);
  }
  let P = A;
  if (N && R !== !1) {
    const v = Object.keys(N), { shapeFlag: k } = P;
    v.length && k & 7 && (i && v.some(ur) && (N = Rl(
      N,
      i
    )), P = we(P, N, !1, !0));
  }
  return n.dirs && (P = we(P, null, !1, !0), P.dirs = P.dirs ? P.dirs.concat(n.dirs) : n.dirs), n.transition && Tr(P, n.transition), A = P, Xe(z), A;
}
const Tl = (t) => {
  let e;
  for (const n in t)
    (n === "class" || n === "style" || rn(n)) && ((e || (e = {}))[n] = t[n]);
  return e;
}, Rl = (t, e) => {
  const n = {};
  for (const r in t)
    (!ur(r) || !(r.slice(9) in e)) && (n[r] = t[r]);
  return n;
};
function Al(t, e, n) {
  const { props: r, children: s, component: i } = t, { props: o, children: l, patchFlag: c } = e, u = i.emitsOptions;
  if (e.dirs || e.transition)
    return !0;
  if (n && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return r ? $r(r, o, u) : !!o;
    if (c & 8) {
      const a = e.dynamicProps;
      for (let h = 0; h < a.length; h++) {
        const m = a[h];
        if (o[m] !== r[m] && !fn(u, m))
          return !0;
      }
    }
  } else
    return (s || l) && (!l || !l.$stable) ? !0 : r === o ? !1 : r ? o ? $r(r, o, u) : !0 : !!o;
  return !1;
}
function $r(t, e, n) {
  const r = Object.keys(e);
  if (r.length !== Object.keys(t).length)
    return !0;
  for (let s = 0; s < r.length; s++) {
    const i = r[s];
    if (e[i] !== t[i] && !fn(n, i))
      return !0;
  }
  return !1;
}
function xl({ vnode: t, parent: e }, n) {
  for (; e; ) {
    const r = e.subTree;
    if (r.suspense && r.suspense.activeBranch === t && (r.el = t.el), r === t)
      (t = e.vnode).el = n, e = e.parent;
    else
      break;
  }
}
const Li = (t) => t.__isSuspense;
function Pl(t, e) {
  e && e.pendingBranch ? K(t) ? e.effects.push(...t) : e.effects.push(t) : Uo(t);
}
const Lt = Symbol.for("v-fgt"), an = Symbol.for("v-txt"), ue = Symbol.for("v-cmt"), Cn = Symbol.for("v-stc"), Le = [];
let vt = null;
function ir(t = !1) {
  Le.push(vt = t ? null : []);
}
function Il() {
  Le.pop(), vt = Le[Le.length - 1] || null;
}
let Ve = 1;
function kr(t, e = !1) {
  Ve += t, t < 0 && vt && e && (vt.hasOnce = !0);
}
function Oi(t) {
  return t.dynamicChildren = Ve > 0 ? vt || _e : null, Il(), Ve > 0 && vt && vt.push(t), t;
}
function zr(t, e, n, r, s, i) {
  return Oi(
    G(
      t,
      e,
      n,
      r,
      s,
      i,
      !0
    )
  );
}
function Ml(t, e, n, r, s) {
  return Oi(
    Ut(
      t,
      e,
      n,
      r,
      s,
      !0
    )
  );
}
function Fi(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
function Te(t, e) {
  return t.type === e.type && t.key === e.key;
}
const Ui = ({ key: t }) => t ?? null, Je = ({
  ref: t,
  ref_key: e,
  ref_for: n
}) => (typeof t == "number" && (t = "" + t), t != null ? ot(t) || ct(t) || $(t) ? { i: St, r: t, k: e, f: !!n } : t : null);
function G(t, e = null, n = null, r = 0, s = null, i = t === Lt ? 0 : 1, o = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && Ui(e),
    ref: e && Je(e),
    scopeId: di,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: St
  };
  return l ? (Ar(c, n), i & 128 && t.normalize(c)) : n && (c.shapeFlag |= ot(n) ? 8 : 16), Ve > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  vt && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && vt.push(c), c;
}
const Ut = Nl;
function Nl(t, e = null, n = null, r = 0, s = null, i = !1) {
  if ((!t || t === tl) && (t = ue), Fi(t)) {
    const l = we(
      t,
      e,
      !0
      /* mergeRef: true */
    );
    return n && Ar(l, n), Ve > 0 && !i && vt && (l.shapeFlag & 6 ? vt[vt.indexOf(t)] = l : vt.push(l)), l.patchFlag = -2, l;
  }
  if ($l(t) && (t = t.__vccOpts), e) {
    e = Bl(e);
    let { class: l, style: c } = e;
    l && !ot(l) && (e.class = gr(l)), st(c) && (Er(c) && !K(c) && (c = it({}, c)), e.style = hr(c));
  }
  const o = ot(t) ? 1 : Li(t) ? 128 : jo(t) ? 64 : st(t) ? 4 : $(t) ? 2 : 0;
  return G(
    t,
    e,
    n,
    r,
    s,
    o,
    i,
    !0
  );
}
function Bl(t) {
  return t ? Er(t) || Ei(t) ? it({}, t) : t : null;
}
function we(t, e, n = !1, r = !1) {
  const { props: s, ref: i, patchFlag: o, children: l, transition: c } = t, u = e ? Ol(s || {}, e) : s, a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: u,
    key: u && Ui(u),
    ref: e && e.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? K(i) ? i.concat(Je(e)) : [i, Je(e)] : Je(e)
    ) : i,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: l,
    target: t.target,
    targetStart: t.targetStart,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: e && t.type !== Lt ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: t.dynamicProps,
    dynamicChildren: t.dynamicChildren,
    appContext: t.appContext,
    dirs: t.dirs,
    transition: c,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: t.component,
    suspense: t.suspense,
    ssContent: t.ssContent && we(t.ssContent),
    ssFallback: t.ssFallback && we(t.ssFallback),
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx,
    ce: t.ce
  };
  return c && r && Tr(
    a,
    c.clone(a)
  ), a;
}
function Dl(t = " ", e = 0) {
  return Ut(an, null, t, e);
}
function Ll(t = "", e = !1) {
  return e ? (ir(), Ml(ue, null, t)) : Ut(ue, null, t);
}
function Ot(t) {
  return t == null || typeof t == "boolean" ? Ut(ue) : K(t) ? Ut(
    Lt,
    null,
    // #3666, avoid reference pollution when reusing vnode
    t.slice()
  ) : Fi(t) ? Zt(t) : Ut(an, null, String(t));
}
function Zt(t) {
  return t.el === null && t.patchFlag !== -1 || t.memo ? t : we(t);
}
function Ar(t, e) {
  let n = 0;
  const { shapeFlag: r } = t;
  if (e == null)
    e = null;
  else if (K(e))
    n = 16;
  else if (typeof e == "object")
    if (r & 65) {
      const s = e.default;
      s && (s._c && (s._d = !1), Ar(t, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = e._;
      !s && !Ei(e) ? e._ctx = St : s === 3 && St && (St.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else $(e) ? (e = { default: e, _ctx: St }, n = 32) : (e = String(e), r & 64 ? (n = 16, e = [Dl(e)]) : n = 8);
  t.children = e, t.shapeFlag |= n;
}
function Ol(...t) {
  const e = {};
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    for (const s in r)
      if (s === "class")
        e.class !== r.class && (e.class = gr([e.class, r.class]));
      else if (s === "style")
        e.style = hr([e.style, r.style]);
      else if (rn(s)) {
        const i = e[s], o = r[s];
        o && i !== o && !(K(i) && i.includes(o)) && (e[s] = i ? [].concat(i, o) : o);
      } else s !== "" && (e[s] = r[s]);
  }
  return e;
}
function Nt(t, e, n, r = null) {
  Vt(t, e, 7, [
    n,
    r
  ]);
}
const Fl = wi();
let Ul = 0;
function Vl(t, e, n) {
  const r = t.type, s = (e ? e.appContext : t.appContext) || Fl, i = {
    uid: Ul++,
    vnode: t,
    type: r,
    parent: e,
    appContext: s,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new oo(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: e ? e.provides : Object.create(s.provides),
    ids: e ? e.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Ti(r, s),
    emitsOptions: Di(r, s),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: X,
    // inheritAttrs
    inheritAttrs: r.inheritAttrs,
    // state
    ctx: X,
    data: X,
    props: X,
    attrs: X,
    slots: X,
    refs: X,
    setupState: X,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return i.ctx = { _: i }, i.root = e ? e.root : i, i.emit = Sl.bind(null, i), t.ce && t.ce(i), i;
}
let dt = null, nn, or;
{
  const t = ln(), e = (n, r) => {
    let s;
    return (s = t[n]) || (s = t[n] = []), s.push(r), (i) => {
      s.length > 1 ? s.forEach((o) => o(i)) : s[0](i);
    };
  };
  nn = e(
    "__VUE_INSTANCE_SETTERS__",
    (n) => dt = n
  ), or = e(
    "__VUE_SSR_SETTERS__",
    (n) => He = n
  );
}
const qe = (t) => {
  const e = dt;
  return nn(t), t.scope.on(), () => {
    t.scope.off(), nn(e);
  };
}, Wr = () => {
  dt && dt.scope.off(), nn(null);
};
function Vi(t) {
  return t.vnode.shapeFlag & 4;
}
let He = !1;
function Hl(t, e = !1, n = !1) {
  e && or(e);
  const { props: r, children: s } = t.vnode, i = Vi(t);
  fl(t, r, i, e), gl(t, s, n);
  const o = i ? jl(t, e) : void 0;
  return e && or(!1), o;
}
function jl(t, e) {
  const n = t.type;
  t.accessCache = /* @__PURE__ */ Object.create(null), t.proxy = new Proxy(t.ctx, el);
  const { setup: r } = n;
  if (r) {
    te();
    const s = t.setupContext = r.length > 1 ? Kl(t) : null, i = qe(t), o = je(
      r,
      t,
      0,
      [
        t.props,
        s
      ]
    ), l = Hs(o);
    if (ee(), i(), (l || t.sp) && !Be(t) && gi(t), l) {
      if (o.then(Wr, Wr), e)
        return o.then((c) => {
          Gr(t, c);
        }).catch((c) => {
          cn(c, t, 0);
        });
      t.asyncDep = o;
    } else
      Gr(t, o);
  } else
    Hi(t);
}
function Gr(t, e, n) {
  $(e) ? t.type.__ssrInlineRender ? t.ssrRender = e : t.render = e : st(e) && (t.setupState = oi(e)), Hi(t);
}
function Hi(t, e, n) {
  const r = t.type;
  t.render || (t.render = r.render || Ft);
  {
    const s = qe(t);
    te();
    try {
      nl(t);
    } finally {
      ee(), s();
    }
  }
}
const ql = {
  get(t, e) {
    return lt(t, "get", ""), t[e];
  }
};
function Kl(t) {
  const e = (n) => {
    t.exposed = n || {};
  };
  return {
    attrs: new Proxy(t.attrs, ql),
    slots: t.slots,
    emit: t.emit,
    expose: e
  };
}
function dn(t) {
  return t.exposed ? t.exposeProxy || (t.exposeProxy = new Proxy(oi(xo(t.exposed)), {
    get(e, n) {
      if (n in e)
        return e[n];
      if (n in De)
        return De[n](t);
    },
    has(e, n) {
      return n in e || n in De;
    }
  })) : t.proxy;
}
function $l(t) {
  return $(t) && "__vccOpts" in t;
}
const kl = (t, e) => Bo(t, e, He), zl = "3.5.13";
/**
* @vue/runtime-dom v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let lr;
const Jr = typeof window < "u" && window.trustedTypes;
if (Jr)
  try {
    lr = /* @__PURE__ */ Jr.createPolicy("vue", {
      createHTML: (t) => t
    });
  } catch {
  }
const ji = lr ? (t) => lr.createHTML(t) : (t) => t, Wl = "http://www.w3.org/2000/svg", Gl = "http://www.w3.org/1998/Math/MathML", $t = typeof document < "u" ? document : null, Yr = $t && /* @__PURE__ */ $t.createElement("template"), Jl = {
  insert: (t, e, n) => {
    e.insertBefore(t, n || null);
  },
  remove: (t) => {
    const e = t.parentNode;
    e && e.removeChild(t);
  },
  createElement: (t, e, n, r) => {
    const s = e === "svg" ? $t.createElementNS(Wl, t) : e === "mathml" ? $t.createElementNS(Gl, t) : n ? $t.createElement(t, { is: n }) : $t.createElement(t);
    return t === "select" && r && r.multiple != null && s.setAttribute("multiple", r.multiple), s;
  },
  createText: (t) => $t.createTextNode(t),
  createComment: (t) => $t.createComment(t),
  setText: (t, e) => {
    t.nodeValue = e;
  },
  setElementText: (t, e) => {
    t.textContent = e;
  },
  parentNode: (t) => t.parentNode,
  nextSibling: (t) => t.nextSibling,
  querySelector: (t) => $t.querySelector(t),
  setScopeId(t, e) {
    t.setAttribute(e, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(t, e, n, r, s, i) {
    const o = n ? n.previousSibling : e.lastChild;
    if (s && (s === i || s.nextSibling))
      for (; e.insertBefore(s.cloneNode(!0), n), !(s === i || !(s = s.nextSibling)); )
        ;
    else {
      Yr.innerHTML = ji(
        r === "svg" ? `<svg>${t}</svg>` : r === "mathml" ? `<math>${t}</math>` : t
      );
      const l = Yr.content;
      if (r === "svg" || r === "mathml") {
        const c = l.firstChild;
        for (; c.firstChild; )
          l.appendChild(c.firstChild);
        l.removeChild(c);
      }
      e.insertBefore(l, n);
    }
    return [
      // first
      o ? o.nextSibling : e.firstChild,
      // last
      n ? n.previousSibling : e.lastChild
    ];
  }
}, Yl = Symbol("_vtc");
function Ql(t, e, n) {
  const r = t[Yl];
  r && (e = (e ? [e, ...r] : [...r]).join(" ")), e == null ? t.removeAttribute("class") : n ? t.setAttribute("class", e) : t.className = e;
}
const Qr = Symbol("_vod"), Zl = Symbol("_vsh"), Xl = Symbol(""), tc = /(^|;)\s*display\s*:/;
function ec(t, e, n) {
  const r = t.style, s = ot(n);
  let i = !1;
  if (n && !s) {
    if (e)
      if (ot(e))
        for (const o of e.split(";")) {
          const l = o.slice(0, o.indexOf(":")).trim();
          n[l] == null && Ye(r, l, "");
        }
      else
        for (const o in e)
          n[o] == null && Ye(r, o, "");
    for (const o in n)
      o === "display" && (i = !0), Ye(r, o, n[o]);
  } else if (s) {
    if (e !== n) {
      const o = r[Xl];
      o && (n += ";" + o), r.cssText = n, i = tc.test(n);
    }
  } else e && t.removeAttribute("style");
  Qr in t && (t[Qr] = i ? r.display : "", t[Zl] && (r.display = "none"));
}
const Zr = /\s*!important$/;
function Ye(t, e, n) {
  if (K(n))
    n.forEach((r) => Ye(t, e, r));
  else if (n == null && (n = ""), e.startsWith("--"))
    t.setProperty(e, n);
  else {
    const r = nc(t, e);
    Zr.test(n) ? t.setProperty(
      Et(r),
      n.replace(Zr, ""),
      "important"
    ) : t[r] = n;
  }
}
const Xr = ["Webkit", "Moz", "ms"], En = {};
function nc(t, e) {
  const n = En[e];
  if (n)
    return n;
  let r = Rt(e);
  if (r !== "filter" && r in t)
    return En[e] = r;
  r = js(r);
  for (let s = 0; s < Xr.length; s++) {
    const i = Xr[s] + r;
    if (i in t)
      return En[e] = i;
  }
  return e;
}
const ts = "http://www.w3.org/1999/xlink";
function es(t, e, n, r, s, i = io(e)) {
  r && e.startsWith("xlink:") ? n == null ? t.removeAttributeNS(ts, e.slice(6, e.length)) : t.setAttributeNS(ts, e, n) : n == null || i && !Ks(n) ? t.removeAttribute(e) : t.setAttribute(
    e,
    i ? "" : ve(n) ? String(n) : n
  );
}
function ns(t, e, n, r, s) {
  if (e === "innerHTML" || e === "textContent") {
    n != null && (t[e] = e === "innerHTML" ? ji(n) : n);
    return;
  }
  const i = t.tagName;
  if (e === "value" && i !== "PROGRESS" && // custom elements may use _value internally
  !i.includes("-")) {
    const l = i === "OPTION" ? t.getAttribute("value") || "" : t.value, c = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      t.type === "checkbox" ? "on" : ""
    ) : String(n);
    (l !== c || !("_value" in t)) && (t.value = c), n == null && t.removeAttribute(e), t._value = n;
    return;
  }
  let o = !1;
  if (n === "" || n == null) {
    const l = typeof t[e];
    l === "boolean" ? n = Ks(n) : n == null && l === "string" ? (n = "", o = !0) : l === "number" && (n = 0, o = !0);
  }
  try {
    t[e] = n;
  } catch {
  }
  o && t.removeAttribute(s || e);
}
function me(t, e, n, r) {
  t.addEventListener(e, n, r);
}
function rc(t, e, n, r) {
  t.removeEventListener(e, n, r);
}
const rs = Symbol("_vei");
function sc(t, e, n, r, s = null) {
  const i = t[rs] || (t[rs] = {}), o = i[e];
  if (r && o)
    o.value = r;
  else {
    const [l, c] = ic(e);
    if (r) {
      const u = i[e] = cc(
        r,
        s
      );
      me(t, l, u, c);
    } else o && (rc(t, l, o, c), i[e] = void 0);
  }
}
const ss = /(?:Once|Passive|Capture)$/;
function ic(t) {
  let e;
  if (ss.test(t)) {
    e = {};
    let r;
    for (; r = t.match(ss); )
      t = t.slice(0, t.length - r[0].length), e[r[0].toLowerCase()] = !0;
  }
  return [t[2] === ":" ? t.slice(3) : Et(t.slice(2)), e];
}
let Sn = 0;
const oc = /* @__PURE__ */ Promise.resolve(), lc = () => Sn || (oc.then(() => Sn = 0), Sn = Date.now());
function cc(t, e) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    Vt(
      uc(r, n.value),
      e,
      5,
      [r]
    );
  };
  return n.value = t, n.attached = lc(), n;
}
function uc(t, e) {
  if (K(e)) {
    const n = t.stopImmediatePropagation;
    return t.stopImmediatePropagation = () => {
      n.call(t), t._stopped = !0;
    }, e.map(
      (r) => (s) => !s._stopped && r && r(s)
    );
  } else
    return e;
}
const is = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // lowercase letter
t.charCodeAt(2) > 96 && t.charCodeAt(2) < 123, fc = (t, e, n, r, s, i) => {
  const o = s === "svg";
  e === "class" ? Ql(t, r, o) : e === "style" ? ec(t, n, r) : rn(e) ? ur(e) || sc(t, e, n, r, i) : (e[0] === "." ? (e = e.slice(1), !0) : e[0] === "^" ? (e = e.slice(1), !1) : ac(t, e, r, o)) ? (ns(t, e, r), !t.tagName.includes("-") && (e === "value" || e === "checked" || e === "selected") && es(t, e, r, o, i, e !== "value")) : /* #11081 force set props for possible async custom element */ t._isVueCE && (/[A-Z]/.test(e) || !ot(r)) ? ns(t, Rt(e), r, i, e) : (e === "true-value" ? t._trueValue = r : e === "false-value" && (t._falseValue = r), es(t, e, r, o));
};
function ac(t, e, n, r) {
  if (r)
    return !!(e === "innerHTML" || e === "textContent" || e in t && is(e) && $(n));
  if (e === "spellcheck" || e === "draggable" || e === "translate" || e === "form" || e === "list" && t.tagName === "INPUT" || e === "type" && t.tagName === "TEXTAREA")
    return !1;
  if (e === "width" || e === "height") {
    const s = t.tagName;
    if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE")
      return !1;
  }
  return is(e) && ot(n) ? !1 : e in t;
}
const os = {};
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function dc(t, e, n) {
  const r = /* @__PURE__ */ hi(t, e);
  ar(r) && it(r, e);
  class s extends xr {
    constructor(o) {
      super(r, o, n);
    }
  }
  return s.def = r, s;
}
const hc = typeof HTMLElement < "u" ? HTMLElement : class {
};
class xr extends hc {
  constructor(e, n = {}, r = fs) {
    super(), this._def = e, this._props = n, this._createApp = r, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._ob = null, this.shadowRoot && r !== fs ? this._root = this.shadowRoot : e.shadowRoot !== !1 ? (this.attachShadow({ mode: "open" }), this._root = this.shadowRoot) : this._root = this, this._def.__asyncLoader || this._resolveProps(this._def);
  }
  connectedCallback() {
    if (!this.isConnected) return;
    this.shadowRoot || this._parseSlots(), this._connected = !0;
    let e = this;
    for (; e = e && (e.parentNode || e.host); )
      if (e instanceof xr) {
        this._parent = e;
        break;
      }
    this._instance || (this._resolved ? (this._setParent(), this._update()) : e && e._pendingResolve ? this._pendingResolve = e._pendingResolve.then(() => {
      this._pendingResolve = void 0, this._resolveDef();
    }) : this._resolveDef());
  }
  _setParent(e = this._parent) {
    e && (this._instance.parent = e._instance, this._instance.provides = e._instance.provides);
  }
  disconnectedCallback() {
    this._connected = !1, ci(() => {
      this._connected || (this._ob && (this._ob.disconnect(), this._ob = null), this._app && this._app.unmount(), this._instance && (this._instance.ce = void 0), this._app = this._instance = null);
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    if (this._pendingResolve)
      return;
    for (let r = 0; r < this.attributes.length; r++)
      this._setAttr(this.attributes[r].name);
    this._ob = new MutationObserver((r) => {
      for (const s of r)
        this._setAttr(s.attributeName);
    }), this._ob.observe(this, { attributes: !0 });
    const e = (r, s = !1) => {
      this._resolved = !0, this._pendingResolve = void 0;
      const { props: i, styles: o } = r;
      let l;
      if (i && !K(i))
        for (const c in i) {
          const u = i[c];
          (u === Number || u && u.type === Number) && (c in this._props && (this._props[c] = Nr(this._props[c])), (l || (l = /* @__PURE__ */ Object.create(null)))[Rt(c)] = !0);
        }
      this._numberProps = l, s && this._resolveProps(r), this.shadowRoot && this._applyStyles(o), this._mount(r);
    }, n = this._def.__asyncLoader;
    n ? this._pendingResolve = n().then(
      (r) => e(this._def = r, !0)
    ) : e(this._def);
  }
  _mount(e) {
    this._app = this._createApp(e), e.configureApp && e.configureApp(this._app), this._app._ceVNode = this._createVNode(), this._app.mount(this._root);
    const n = this._instance && this._instance.exposed;
    if (n)
      for (const r in n)
        J(this, r) || Object.defineProperty(this, r, {
          // unwrap ref to be consistent with public instance behavior
          get: () => ii(n[r])
        });
  }
  _resolveProps(e) {
    const { props: n } = e, r = K(n) ? n : Object.keys(n || {});
    for (const s of Object.keys(this))
      s[0] !== "_" && r.includes(s) && this._setProp(s, this[s]);
    for (const s of r.map(Rt))
      Object.defineProperty(this, s, {
        get() {
          return this._getProp(s);
        },
        set(i) {
          this._setProp(s, i, !0, !0);
        }
      });
  }
  _setAttr(e) {
    if (e.startsWith("data-v-")) return;
    const n = this.hasAttribute(e);
    let r = n ? this.getAttribute(e) : os;
    const s = Rt(e);
    n && this._numberProps && this._numberProps[s] && (r = Nr(r)), this._setProp(s, r, !1, !0);
  }
  /**
   * @internal
   */
  _getProp(e) {
    return this._props[e];
  }
  /**
   * @internal
   */
  _setProp(e, n, r = !0, s = !1) {
    if (n !== this._props[e] && (n === os ? delete this._props[e] : (this._props[e] = n, e === "key" && this._app && (this._app._ceVNode.key = n)), s && this._instance && this._update(), r)) {
      const i = this._ob;
      i && i.disconnect(), n === !0 ? this.setAttribute(Et(e), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(Et(e), n + "") : n || this.removeAttribute(Et(e)), i && i.observe(this, { attributes: !0 });
    }
  }
  _update() {
    yc(this._createVNode(), this._root);
  }
  _createVNode() {
    const e = {};
    this.shadowRoot || (e.onVnodeMounted = e.onVnodeUpdated = this._renderSlots.bind(this));
    const n = Ut(this._def, it(e, this._props));
    return this._instance || (n.ce = (r) => {
      this._instance = r, r.ce = this, r.isCE = !0;
      const s = (i, o) => {
        this.dispatchEvent(
          new CustomEvent(
            i,
            ar(o[0]) ? it({ detail: o }, o[0]) : { detail: o }
          )
        );
      };
      r.emit = (i, ...o) => {
        s(i, o), Et(i) !== i && s(Et(i), o);
      }, this._setParent();
    }), n;
  }
  _applyStyles(e, n) {
    if (!e) return;
    if (n) {
      if (n === this._def || this._styleChildren.has(n))
        return;
      this._styleChildren.add(n);
    }
    const r = this._nonce;
    for (let s = e.length - 1; s >= 0; s--) {
      const i = document.createElement("style");
      r && i.setAttribute("nonce", r), i.textContent = e[s], this.shadowRoot.prepend(i);
    }
  }
  /**
   * Only called when shadowRoot is false
   */
  _parseSlots() {
    const e = this._slots = {};
    let n;
    for (; n = this.firstChild; ) {
      const r = n.nodeType === 1 && n.getAttribute("slot") || "default";
      (e[r] || (e[r] = [])).push(n), this.removeChild(n);
    }
  }
  /**
   * Only called when shadowRoot is false
   */
  _renderSlots() {
    const e = (this._teleportTarget || this).querySelectorAll("slot"), n = this._instance.type.__scopeId;
    for (let r = 0; r < e.length; r++) {
      const s = e[r], i = s.getAttribute("name") || "default", o = this._slots[i], l = s.parentNode;
      if (o)
        for (const c of o) {
          if (n && c.nodeType === 1) {
            const u = n + "-s", a = document.createTreeWalker(c, 1);
            c.setAttribute(u, "");
            let h;
            for (; h = a.nextNode(); )
              h.setAttribute(u, "");
          }
          l.insertBefore(c, s);
        }
      else
        for (; s.firstChild; ) l.insertBefore(s.firstChild, s);
      l.removeChild(s);
    }
  }
  /**
   * @internal
   */
  _injectChildStyle(e) {
    this._applyStyles(e.styles, e);
  }
  /**
   * @internal
   */
  _removeChildStyle(e) {
  }
}
const ls = (t) => {
  const e = t.props["onUpdate:modelValue"] || !1;
  return K(e) ? (n) => We(e, n) : e;
};
function gc(t) {
  t.target.composing = !0;
}
function cs(t) {
  const e = t.target;
  e.composing && (e.composing = !1, e.dispatchEvent(new Event("input")));
}
const Tn = Symbol("_assign"), ie = {
  created(t, { modifiers: { lazy: e, trim: n, number: r } }, s) {
    t[Tn] = ls(s);
    const i = r || s.props && s.props.type === "number";
    me(t, e ? "change" : "input", (o) => {
      if (o.target.composing) return;
      let l = t.value;
      n && (l = l.trim()), i && (l = Jn(l)), t[Tn](l);
    }), n && me(t, "change", () => {
      t.value = t.value.trim();
    }), e || (me(t, "compositionstart", gc), me(t, "compositionend", cs), me(t, "change", cs));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(t, { value: e }) {
    t.value = e ?? "";
  },
  beforeUpdate(t, { value: e, oldValue: n, modifiers: { lazy: r, trim: s, number: i } }, o) {
    if (t[Tn] = ls(o), t.composing) return;
    const l = (i || t.type === "number") && !/^0\d/.test(t.value) ? Jn(t.value) : t.value, c = e ?? "";
    l !== c && (document.activeElement === t && t.type !== "range" && (r && e === n || s && t.value.trim() === c) || (t.value = c));
  }
}, pc = ["ctrl", "shift", "alt", "meta"], mc = {
  stop: (t) => t.stopPropagation(),
  prevent: (t) => t.preventDefault(),
  self: (t) => t.target !== t.currentTarget,
  ctrl: (t) => !t.ctrlKey,
  shift: (t) => !t.shiftKey,
  alt: (t) => !t.altKey,
  meta: (t) => !t.metaKey,
  left: (t) => "button" in t && t.button !== 0,
  middle: (t) => "button" in t && t.button !== 1,
  right: (t) => "button" in t && t.button !== 2,
  exact: (t, e) => pc.some((n) => t[`${n}Key`] && !e.includes(n))
}, _c = (t, e) => {
  const n = t._withMods || (t._withMods = {}), r = e.join(".");
  return n[r] || (n[r] = (s, ...i) => {
    for (let o = 0; o < e.length; o++) {
      const l = mc[e[o]];
      if (l && l(s, e)) return;
    }
    return t(s, ...i);
  });
}, bc = /* @__PURE__ */ it({ patchProp: fc }, Jl);
let us;
function qi() {
  return us || (us = ml(bc));
}
const yc = (...t) => {
  qi().render(...t);
}, fs = (...t) => {
  const e = qi().createApp(...t), { mount: n } = e;
  return e.mount = (r) => {
    const s = vc(r);
    if (!s) return;
    const i = e._component;
    !$(i) && !i.render && !i.template && (i.template = s.innerHTML), s.nodeType === 1 && (s.textContent = "");
    const o = n(s, !1, wc(s));
    return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), o;
  }, e;
};
function wc(t) {
  if (t instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && t instanceof MathMLElement)
    return "mathml";
}
function vc(t) {
  return ot(t) ? document.querySelector(t) : t;
}
function Cc(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var ge = {}, Rn, as;
function Ec() {
  return as || (as = 1, Rn = function() {
    return typeof Promise == "function" && Promise.prototype && Promise.prototype.then;
  }), Rn;
}
var An = {}, Yt = {}, ds;
function fe() {
  if (ds) return Yt;
  ds = 1;
  let t;
  const e = [
    0,
    // Not used
    26,
    44,
    70,
    100,
    134,
    172,
    196,
    242,
    292,
    346,
    404,
    466,
    532,
    581,
    655,
    733,
    815,
    901,
    991,
    1085,
    1156,
    1258,
    1364,
    1474,
    1588,
    1706,
    1828,
    1921,
    2051,
    2185,
    2323,
    2465,
    2611,
    2761,
    2876,
    3034,
    3196,
    3362,
    3532,
    3706
  ];
  return Yt.getSymbolSize = function(r) {
    if (!r) throw new Error('"version" cannot be null or undefined');
    if (r < 1 || r > 40) throw new Error('"version" should be in range from 1 to 40');
    return r * 4 + 17;
  }, Yt.getSymbolTotalCodewords = function(r) {
    return e[r];
  }, Yt.getBCHDigit = function(n) {
    let r = 0;
    for (; n !== 0; )
      r++, n >>>= 1;
    return r;
  }, Yt.setToSJISFunction = function(r) {
    if (typeof r != "function")
      throw new Error('"toSJISFunc" is not a valid function.');
    t = r;
  }, Yt.isKanjiModeEnabled = function() {
    return typeof t < "u";
  }, Yt.toSJIS = function(r) {
    return t(r);
  }, Yt;
}
var xn = {}, hs;
function Pr() {
  return hs || (hs = 1, function(t) {
    t.L = { bit: 1 }, t.M = { bit: 0 }, t.Q = { bit: 3 }, t.H = { bit: 2 };
    function e(n) {
      if (typeof n != "string")
        throw new Error("Param is not a string");
      switch (n.toLowerCase()) {
        case "l":
        case "low":
          return t.L;
        case "m":
        case "medium":
          return t.M;
        case "q":
        case "quartile":
          return t.Q;
        case "h":
        case "high":
          return t.H;
        default:
          throw new Error("Unknown EC Level: " + n);
      }
    }
    t.isValid = function(r) {
      return r && typeof r.bit < "u" && r.bit >= 0 && r.bit < 4;
    }, t.from = function(r, s) {
      if (t.isValid(r))
        return r;
      try {
        return e(r);
      } catch {
        return s;
      }
    };
  }(xn)), xn;
}
var Pn, gs;
function Sc() {
  if (gs) return Pn;
  gs = 1;
  function t() {
    this.buffer = [], this.length = 0;
  }
  return t.prototype = {
    get: function(e) {
      const n = Math.floor(e / 8);
      return (this.buffer[n] >>> 7 - e % 8 & 1) === 1;
    },
    put: function(e, n) {
      for (let r = 0; r < n; r++)
        this.putBit((e >>> n - r - 1 & 1) === 1);
    },
    getLengthInBits: function() {
      return this.length;
    },
    putBit: function(e) {
      const n = Math.floor(this.length / 8);
      this.buffer.length <= n && this.buffer.push(0), e && (this.buffer[n] |= 128 >>> this.length % 8), this.length++;
    }
  }, Pn = t, Pn;
}
var In, ps;
function Tc() {
  if (ps) return In;
  ps = 1;
  function t(e) {
    if (!e || e < 1)
      throw new Error("BitMatrix size must be defined and greater than 0");
    this.size = e, this.data = new Uint8Array(e * e), this.reservedBit = new Uint8Array(e * e);
  }
  return t.prototype.set = function(e, n, r, s) {
    const i = e * this.size + n;
    this.data[i] = r, s && (this.reservedBit[i] = !0);
  }, t.prototype.get = function(e, n) {
    return this.data[e * this.size + n];
  }, t.prototype.xor = function(e, n, r) {
    this.data[e * this.size + n] ^= r;
  }, t.prototype.isReserved = function(e, n) {
    return this.reservedBit[e * this.size + n];
  }, In = t, In;
}
var Mn = {}, ms;
function Rc() {
  return ms || (ms = 1, function(t) {
    const e = fe().getSymbolSize;
    t.getRowColCoords = function(r) {
      if (r === 1) return [];
      const s = Math.floor(r / 7) + 2, i = e(r), o = i === 145 ? 26 : Math.ceil((i - 13) / (2 * s - 2)) * 2, l = [i - 7];
      for (let c = 1; c < s - 1; c++)
        l[c] = l[c - 1] - o;
      return l.push(6), l.reverse();
    }, t.getPositions = function(r) {
      const s = [], i = t.getRowColCoords(r), o = i.length;
      for (let l = 0; l < o; l++)
        for (let c = 0; c < o; c++)
          l === 0 && c === 0 || // top-left
          l === 0 && c === o - 1 || // bottom-left
          l === o - 1 && c === 0 || s.push([i[l], i[c]]);
      return s;
    };
  }(Mn)), Mn;
}
var Nn = {}, _s;
function Ac() {
  if (_s) return Nn;
  _s = 1;
  const t = fe().getSymbolSize, e = 7;
  return Nn.getPositions = function(r) {
    const s = t(r);
    return [
      // top-left
      [0, 0],
      // top-right
      [s - e, 0],
      // bottom-left
      [0, s - e]
    ];
  }, Nn;
}
var Bn = {}, bs;
function xc() {
  return bs || (bs = 1, function(t) {
    t.Patterns = {
      PATTERN000: 0,
      PATTERN001: 1,
      PATTERN010: 2,
      PATTERN011: 3,
      PATTERN100: 4,
      PATTERN101: 5,
      PATTERN110: 6,
      PATTERN111: 7
    };
    const e = {
      N1: 3,
      N2: 3,
      N3: 40,
      N4: 10
    };
    t.isValid = function(s) {
      return s != null && s !== "" && !isNaN(s) && s >= 0 && s <= 7;
    }, t.from = function(s) {
      return t.isValid(s) ? parseInt(s, 10) : void 0;
    }, t.getPenaltyN1 = function(s) {
      const i = s.size;
      let o = 0, l = 0, c = 0, u = null, a = null;
      for (let h = 0; h < i; h++) {
        l = c = 0, u = a = null;
        for (let m = 0; m < i; m++) {
          let p = s.get(h, m);
          p === u ? l++ : (l >= 5 && (o += e.N1 + (l - 5)), u = p, l = 1), p = s.get(m, h), p === a ? c++ : (c >= 5 && (o += e.N1 + (c - 5)), a = p, c = 1);
        }
        l >= 5 && (o += e.N1 + (l - 5)), c >= 5 && (o += e.N1 + (c - 5));
      }
      return o;
    }, t.getPenaltyN2 = function(s) {
      const i = s.size;
      let o = 0;
      for (let l = 0; l < i - 1; l++)
        for (let c = 0; c < i - 1; c++) {
          const u = s.get(l, c) + s.get(l, c + 1) + s.get(l + 1, c) + s.get(l + 1, c + 1);
          (u === 4 || u === 0) && o++;
        }
      return o * e.N2;
    }, t.getPenaltyN3 = function(s) {
      const i = s.size;
      let o = 0, l = 0, c = 0;
      for (let u = 0; u < i; u++) {
        l = c = 0;
        for (let a = 0; a < i; a++)
          l = l << 1 & 2047 | s.get(u, a), a >= 10 && (l === 1488 || l === 93) && o++, c = c << 1 & 2047 | s.get(a, u), a >= 10 && (c === 1488 || c === 93) && o++;
      }
      return o * e.N3;
    }, t.getPenaltyN4 = function(s) {
      let i = 0;
      const o = s.data.length;
      for (let c = 0; c < o; c++) i += s.data[c];
      return Math.abs(Math.ceil(i * 100 / o / 5) - 10) * e.N4;
    };
    function n(r, s, i) {
      switch (r) {
        case t.Patterns.PATTERN000:
          return (s + i) % 2 === 0;
        case t.Patterns.PATTERN001:
          return s % 2 === 0;
        case t.Patterns.PATTERN010:
          return i % 3 === 0;
        case t.Patterns.PATTERN011:
          return (s + i) % 3 === 0;
        case t.Patterns.PATTERN100:
          return (Math.floor(s / 2) + Math.floor(i / 3)) % 2 === 0;
        case t.Patterns.PATTERN101:
          return s * i % 2 + s * i % 3 === 0;
        case t.Patterns.PATTERN110:
          return (s * i % 2 + s * i % 3) % 2 === 0;
        case t.Patterns.PATTERN111:
          return (s * i % 3 + (s + i) % 2) % 2 === 0;
        default:
          throw new Error("bad maskPattern:" + r);
      }
    }
    t.applyMask = function(s, i) {
      const o = i.size;
      for (let l = 0; l < o; l++)
        for (let c = 0; c < o; c++)
          i.isReserved(c, l) || i.xor(c, l, n(s, c, l));
    }, t.getBestMask = function(s, i) {
      const o = Object.keys(t.Patterns).length;
      let l = 0, c = 1 / 0;
      for (let u = 0; u < o; u++) {
        i(u), t.applyMask(u, s);
        const a = t.getPenaltyN1(s) + t.getPenaltyN2(s) + t.getPenaltyN3(s) + t.getPenaltyN4(s);
        t.applyMask(u, s), a < c && (c = a, l = u);
      }
      return l;
    };
  }(Bn)), Bn;
}
var ze = {}, ys;
function Ki() {
  if (ys) return ze;
  ys = 1;
  const t = Pr(), e = [
    // L  M  Q  H
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    2,
    2,
    1,
    2,
    2,
    4,
    1,
    2,
    4,
    4,
    2,
    4,
    4,
    4,
    2,
    4,
    6,
    5,
    2,
    4,
    6,
    6,
    2,
    5,
    8,
    8,
    4,
    5,
    8,
    8,
    4,
    5,
    8,
    11,
    4,
    8,
    10,
    11,
    4,
    9,
    12,
    16,
    4,
    9,
    16,
    16,
    6,
    10,
    12,
    18,
    6,
    10,
    17,
    16,
    6,
    11,
    16,
    19,
    6,
    13,
    18,
    21,
    7,
    14,
    21,
    25,
    8,
    16,
    20,
    25,
    8,
    17,
    23,
    25,
    9,
    17,
    23,
    34,
    9,
    18,
    25,
    30,
    10,
    20,
    27,
    32,
    12,
    21,
    29,
    35,
    12,
    23,
    34,
    37,
    12,
    25,
    34,
    40,
    13,
    26,
    35,
    42,
    14,
    28,
    38,
    45,
    15,
    29,
    40,
    48,
    16,
    31,
    43,
    51,
    17,
    33,
    45,
    54,
    18,
    35,
    48,
    57,
    19,
    37,
    51,
    60,
    19,
    38,
    53,
    63,
    20,
    40,
    56,
    66,
    21,
    43,
    59,
    70,
    22,
    45,
    62,
    74,
    24,
    47,
    65,
    77,
    25,
    49,
    68,
    81
  ], n = [
    // L  M  Q  H
    7,
    10,
    13,
    17,
    10,
    16,
    22,
    28,
    15,
    26,
    36,
    44,
    20,
    36,
    52,
    64,
    26,
    48,
    72,
    88,
    36,
    64,
    96,
    112,
    40,
    72,
    108,
    130,
    48,
    88,
    132,
    156,
    60,
    110,
    160,
    192,
    72,
    130,
    192,
    224,
    80,
    150,
    224,
    264,
    96,
    176,
    260,
    308,
    104,
    198,
    288,
    352,
    120,
    216,
    320,
    384,
    132,
    240,
    360,
    432,
    144,
    280,
    408,
    480,
    168,
    308,
    448,
    532,
    180,
    338,
    504,
    588,
    196,
    364,
    546,
    650,
    224,
    416,
    600,
    700,
    224,
    442,
    644,
    750,
    252,
    476,
    690,
    816,
    270,
    504,
    750,
    900,
    300,
    560,
    810,
    960,
    312,
    588,
    870,
    1050,
    336,
    644,
    952,
    1110,
    360,
    700,
    1020,
    1200,
    390,
    728,
    1050,
    1260,
    420,
    784,
    1140,
    1350,
    450,
    812,
    1200,
    1440,
    480,
    868,
    1290,
    1530,
    510,
    924,
    1350,
    1620,
    540,
    980,
    1440,
    1710,
    570,
    1036,
    1530,
    1800,
    570,
    1064,
    1590,
    1890,
    600,
    1120,
    1680,
    1980,
    630,
    1204,
    1770,
    2100,
    660,
    1260,
    1860,
    2220,
    720,
    1316,
    1950,
    2310,
    750,
    1372,
    2040,
    2430
  ];
  return ze.getBlocksCount = function(s, i) {
    switch (i) {
      case t.L:
        return e[(s - 1) * 4 + 0];
      case t.M:
        return e[(s - 1) * 4 + 1];
      case t.Q:
        return e[(s - 1) * 4 + 2];
      case t.H:
        return e[(s - 1) * 4 + 3];
      default:
        return;
    }
  }, ze.getTotalCodewordsCount = function(s, i) {
    switch (i) {
      case t.L:
        return n[(s - 1) * 4 + 0];
      case t.M:
        return n[(s - 1) * 4 + 1];
      case t.Q:
        return n[(s - 1) * 4 + 2];
      case t.H:
        return n[(s - 1) * 4 + 3];
      default:
        return;
    }
  }, ze;
}
var Dn = {}, Re = {}, ws;
function Pc() {
  if (ws) return Re;
  ws = 1;
  const t = new Uint8Array(512), e = new Uint8Array(256);
  return function() {
    let r = 1;
    for (let s = 0; s < 255; s++)
      t[s] = r, e[r] = s, r <<= 1, r & 256 && (r ^= 285);
    for (let s = 255; s < 512; s++)
      t[s] = t[s - 255];
  }(), Re.log = function(r) {
    if (r < 1) throw new Error("log(" + r + ")");
    return e[r];
  }, Re.exp = function(r) {
    return t[r];
  }, Re.mul = function(r, s) {
    return r === 0 || s === 0 ? 0 : t[e[r] + e[s]];
  }, Re;
}
var vs;
function Ic() {
  return vs || (vs = 1, function(t) {
    const e = Pc();
    t.mul = function(r, s) {
      const i = new Uint8Array(r.length + s.length - 1);
      for (let o = 0; o < r.length; o++)
        for (let l = 0; l < s.length; l++)
          i[o + l] ^= e.mul(r[o], s[l]);
      return i;
    }, t.mod = function(r, s) {
      let i = new Uint8Array(r);
      for (; i.length - s.length >= 0; ) {
        const o = i[0];
        for (let c = 0; c < s.length; c++)
          i[c] ^= e.mul(s[c], o);
        let l = 0;
        for (; l < i.length && i[l] === 0; ) l++;
        i = i.slice(l);
      }
      return i;
    }, t.generateECPolynomial = function(r) {
      let s = new Uint8Array([1]);
      for (let i = 0; i < r; i++)
        s = t.mul(s, new Uint8Array([1, e.exp(i)]));
      return s;
    };
  }(Dn)), Dn;
}
var Ln, Cs;
function Mc() {
  if (Cs) return Ln;
  Cs = 1;
  const t = Ic();
  function e(n) {
    this.genPoly = void 0, this.degree = n, this.degree && this.initialize(this.degree);
  }
  return e.prototype.initialize = function(r) {
    this.degree = r, this.genPoly = t.generateECPolynomial(this.degree);
  }, e.prototype.encode = function(r) {
    if (!this.genPoly)
      throw new Error("Encoder not initialized");
    const s = new Uint8Array(r.length + this.degree);
    s.set(r);
    const i = t.mod(s, this.genPoly), o = this.degree - i.length;
    if (o > 0) {
      const l = new Uint8Array(this.degree);
      return l.set(i, o), l;
    }
    return i;
  }, Ln = e, Ln;
}
var On = {}, Fn = {}, Un = {}, Es;
function $i() {
  return Es || (Es = 1, Un.isValid = function(e) {
    return !isNaN(e) && e >= 1 && e <= 40;
  }), Un;
}
var Bt = {}, Ss;
function ki() {
  if (Ss) return Bt;
  Ss = 1;
  const t = "[0-9]+", e = "[A-Z $%*+\\-./:]+";
  let n = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
  n = n.replace(/u/g, "\\u");
  const r = "(?:(?![A-Z0-9 $%*+\\-./:]|" + n + `)(?:.|[\r
]))+`;
  Bt.KANJI = new RegExp(n, "g"), Bt.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g"), Bt.BYTE = new RegExp(r, "g"), Bt.NUMERIC = new RegExp(t, "g"), Bt.ALPHANUMERIC = new RegExp(e, "g");
  const s = new RegExp("^" + n + "$"), i = new RegExp("^" + t + "$"), o = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
  return Bt.testKanji = function(c) {
    return s.test(c);
  }, Bt.testNumeric = function(c) {
    return i.test(c);
  }, Bt.testAlphanumeric = function(c) {
    return o.test(c);
  }, Bt;
}
var Ts;
function ae() {
  return Ts || (Ts = 1, function(t) {
    const e = $i(), n = ki();
    t.NUMERIC = {
      id: "Numeric",
      bit: 1,
      ccBits: [10, 12, 14]
    }, t.ALPHANUMERIC = {
      id: "Alphanumeric",
      bit: 2,
      ccBits: [9, 11, 13]
    }, t.BYTE = {
      id: "Byte",
      bit: 4,
      ccBits: [8, 16, 16]
    }, t.KANJI = {
      id: "Kanji",
      bit: 8,
      ccBits: [8, 10, 12]
    }, t.MIXED = {
      bit: -1
    }, t.getCharCountIndicator = function(i, o) {
      if (!i.ccBits) throw new Error("Invalid mode: " + i);
      if (!e.isValid(o))
        throw new Error("Invalid version: " + o);
      return o >= 1 && o < 10 ? i.ccBits[0] : o < 27 ? i.ccBits[1] : i.ccBits[2];
    }, t.getBestModeForData = function(i) {
      return n.testNumeric(i) ? t.NUMERIC : n.testAlphanumeric(i) ? t.ALPHANUMERIC : n.testKanji(i) ? t.KANJI : t.BYTE;
    }, t.toString = function(i) {
      if (i && i.id) return i.id;
      throw new Error("Invalid mode");
    }, t.isValid = function(i) {
      return i && i.bit && i.ccBits;
    };
    function r(s) {
      if (typeof s != "string")
        throw new Error("Param is not a string");
      switch (s.toLowerCase()) {
        case "numeric":
          return t.NUMERIC;
        case "alphanumeric":
          return t.ALPHANUMERIC;
        case "kanji":
          return t.KANJI;
        case "byte":
          return t.BYTE;
        default:
          throw new Error("Unknown mode: " + s);
      }
    }
    t.from = function(i, o) {
      if (t.isValid(i))
        return i;
      try {
        return r(i);
      } catch {
        return o;
      }
    };
  }(Fn)), Fn;
}
var Rs;
function Nc() {
  return Rs || (Rs = 1, function(t) {
    const e = fe(), n = Ki(), r = Pr(), s = ae(), i = $i(), o = 7973, l = e.getBCHDigit(o);
    function c(m, p, T) {
      for (let R = 1; R <= 40; R++)
        if (p <= t.getCapacity(R, T, m))
          return R;
    }
    function u(m, p) {
      return s.getCharCountIndicator(m, p) + 4;
    }
    function a(m, p) {
      let T = 0;
      return m.forEach(function(R) {
        const z = u(R.mode, p);
        T += z + R.getBitsLength();
      }), T;
    }
    function h(m, p) {
      for (let T = 1; T <= 40; T++)
        if (a(m, T) <= t.getCapacity(T, p, s.MIXED))
          return T;
    }
    t.from = function(p, T) {
      return i.isValid(p) ? parseInt(p, 10) : T;
    }, t.getCapacity = function(p, T, R) {
      if (!i.isValid(p))
        throw new Error("Invalid QR Code version");
      typeof R > "u" && (R = s.BYTE);
      const z = e.getSymbolTotalCodewords(p), A = n.getTotalCodewordsCount(p, T), N = (z - A) * 8;
      if (R === s.MIXED) return N;
      const P = N - u(R, p);
      switch (R) {
        case s.NUMERIC:
          return Math.floor(P / 10 * 3);
        case s.ALPHANUMERIC:
          return Math.floor(P / 11 * 2);
        case s.KANJI:
          return Math.floor(P / 13);
        case s.BYTE:
        default:
          return Math.floor(P / 8);
      }
    }, t.getBestVersionForData = function(p, T) {
      let R;
      const z = r.from(T, r.M);
      if (Array.isArray(p)) {
        if (p.length > 1)
          return h(p, z);
        if (p.length === 0)
          return 1;
        R = p[0];
      } else
        R = p;
      return c(R.mode, R.getLength(), z);
    }, t.getEncodedBits = function(p) {
      if (!i.isValid(p) || p < 7)
        throw new Error("Invalid QR Code version");
      let T = p << 12;
      for (; e.getBCHDigit(T) - l >= 0; )
        T ^= o << e.getBCHDigit(T) - l;
      return p << 12 | T;
    };
  }(On)), On;
}
var Vn = {}, As;
function Bc() {
  if (As) return Vn;
  As = 1;
  const t = fe(), e = 1335, n = 21522, r = t.getBCHDigit(e);
  return Vn.getEncodedBits = function(i, o) {
    const l = i.bit << 3 | o;
    let c = l << 10;
    for (; t.getBCHDigit(c) - r >= 0; )
      c ^= e << t.getBCHDigit(c) - r;
    return (l << 10 | c) ^ n;
  }, Vn;
}
var Hn = {}, jn, xs;
function Dc() {
  if (xs) return jn;
  xs = 1;
  const t = ae();
  function e(n) {
    this.mode = t.NUMERIC, this.data = n.toString();
  }
  return e.getBitsLength = function(r) {
    return 10 * Math.floor(r / 3) + (r % 3 ? r % 3 * 3 + 1 : 0);
  }, e.prototype.getLength = function() {
    return this.data.length;
  }, e.prototype.getBitsLength = function() {
    return e.getBitsLength(this.data.length);
  }, e.prototype.write = function(r) {
    let s, i, o;
    for (s = 0; s + 3 <= this.data.length; s += 3)
      i = this.data.substr(s, 3), o = parseInt(i, 10), r.put(o, 10);
    const l = this.data.length - s;
    l > 0 && (i = this.data.substr(s), o = parseInt(i, 10), r.put(o, l * 3 + 1));
  }, jn = e, jn;
}
var qn, Ps;
function Lc() {
  if (Ps) return qn;
  Ps = 1;
  const t = ae(), e = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    " ",
    "$",
    "%",
    "*",
    "+",
    "-",
    ".",
    "/",
    ":"
  ];
  function n(r) {
    this.mode = t.ALPHANUMERIC, this.data = r;
  }
  return n.getBitsLength = function(s) {
    return 11 * Math.floor(s / 2) + 6 * (s % 2);
  }, n.prototype.getLength = function() {
    return this.data.length;
  }, n.prototype.getBitsLength = function() {
    return n.getBitsLength(this.data.length);
  }, n.prototype.write = function(s) {
    let i;
    for (i = 0; i + 2 <= this.data.length; i += 2) {
      let o = e.indexOf(this.data[i]) * 45;
      o += e.indexOf(this.data[i + 1]), s.put(o, 11);
    }
    this.data.length % 2 && s.put(e.indexOf(this.data[i]), 6);
  }, qn = n, qn;
}
var Kn, Is;
function Oc() {
  if (Is) return Kn;
  Is = 1;
  const t = ae();
  function e(n) {
    this.mode = t.BYTE, typeof n == "string" ? this.data = new TextEncoder().encode(n) : this.data = new Uint8Array(n);
  }
  return e.getBitsLength = function(r) {
    return r * 8;
  }, e.prototype.getLength = function() {
    return this.data.length;
  }, e.prototype.getBitsLength = function() {
    return e.getBitsLength(this.data.length);
  }, e.prototype.write = function(n) {
    for (let r = 0, s = this.data.length; r < s; r++)
      n.put(this.data[r], 8);
  }, Kn = e, Kn;
}
var $n, Ms;
function Fc() {
  if (Ms) return $n;
  Ms = 1;
  const t = ae(), e = fe();
  function n(r) {
    this.mode = t.KANJI, this.data = r;
  }
  return n.getBitsLength = function(s) {
    return s * 13;
  }, n.prototype.getLength = function() {
    return this.data.length;
  }, n.prototype.getBitsLength = function() {
    return n.getBitsLength(this.data.length);
  }, n.prototype.write = function(r) {
    let s;
    for (s = 0; s < this.data.length; s++) {
      let i = e.toSJIS(this.data[s]);
      if (i >= 33088 && i <= 40956)
        i -= 33088;
      else if (i >= 57408 && i <= 60351)
        i -= 49472;
      else
        throw new Error(
          "Invalid SJIS character: " + this.data[s] + `
Make sure your charset is UTF-8`
        );
      i = (i >>> 8 & 255) * 192 + (i & 255), r.put(i, 13);
    }
  }, $n = n, $n;
}
var kn = { exports: {} }, Ns;
function Uc() {
  return Ns || (Ns = 1, function(t) {
    var e = {
      single_source_shortest_paths: function(n, r, s) {
        var i = {}, o = {};
        o[r] = 0;
        var l = e.PriorityQueue.make();
        l.push(r, 0);
        for (var c, u, a, h, m, p, T, R, z; !l.empty(); ) {
          c = l.pop(), u = c.value, h = c.cost, m = n[u] || {};
          for (a in m)
            m.hasOwnProperty(a) && (p = m[a], T = h + p, R = o[a], z = typeof o[a] > "u", (z || R > T) && (o[a] = T, l.push(a, T), i[a] = u));
        }
        if (typeof s < "u" && typeof o[s] > "u") {
          var A = ["Could not find a path from ", r, " to ", s, "."].join("");
          throw new Error(A);
        }
        return i;
      },
      extract_shortest_path_from_predecessor_list: function(n, r) {
        for (var s = [], i = r; i; )
          s.push(i), n[i], i = n[i];
        return s.reverse(), s;
      },
      find_path: function(n, r, s) {
        var i = e.single_source_shortest_paths(n, r, s);
        return e.extract_shortest_path_from_predecessor_list(
          i,
          s
        );
      },
      /**
       * A very naive priority queue implementation.
       */
      PriorityQueue: {
        make: function(n) {
          var r = e.PriorityQueue, s = {}, i;
          n = n || {};
          for (i in r)
            r.hasOwnProperty(i) && (s[i] = r[i]);
          return s.queue = [], s.sorter = n.sorter || r.default_sorter, s;
        },
        default_sorter: function(n, r) {
          return n.cost - r.cost;
        },
        /**
         * Add a new item to the queue and ensure the highest priority element
         * is at the front of the queue.
         */
        push: function(n, r) {
          var s = { value: n, cost: r };
          this.queue.push(s), this.queue.sort(this.sorter);
        },
        /**
         * Return the highest priority element in the queue.
         */
        pop: function() {
          return this.queue.shift();
        },
        empty: function() {
          return this.queue.length === 0;
        }
      }
    };
    t.exports = e;
  }(kn)), kn.exports;
}
var Bs;
function Vc() {
  return Bs || (Bs = 1, function(t) {
    const e = ae(), n = Dc(), r = Lc(), s = Oc(), i = Fc(), o = ki(), l = fe(), c = Uc();
    function u(A) {
      return unescape(encodeURIComponent(A)).length;
    }
    function a(A, N, P) {
      const v = [];
      let k;
      for (; (k = A.exec(P)) !== null; )
        v.push({
          data: k[0],
          index: k.index,
          mode: N,
          length: k[0].length
        });
      return v;
    }
    function h(A) {
      const N = a(o.NUMERIC, e.NUMERIC, A), P = a(o.ALPHANUMERIC, e.ALPHANUMERIC, A);
      let v, k;
      return l.isKanjiModeEnabled() ? (v = a(o.BYTE, e.BYTE, A), k = a(o.KANJI, e.KANJI, A)) : (v = a(o.BYTE_KANJI, e.BYTE, A), k = []), N.concat(P, v, k).sort(function(B, D) {
        return B.index - D.index;
      }).map(function(B) {
        return {
          data: B.data,
          mode: B.mode,
          length: B.length
        };
      });
    }
    function m(A, N) {
      switch (N) {
        case e.NUMERIC:
          return n.getBitsLength(A);
        case e.ALPHANUMERIC:
          return r.getBitsLength(A);
        case e.KANJI:
          return i.getBitsLength(A);
        case e.BYTE:
          return s.getBitsLength(A);
      }
    }
    function p(A) {
      return A.reduce(function(N, P) {
        const v = N.length - 1 >= 0 ? N[N.length - 1] : null;
        return v && v.mode === P.mode ? (N[N.length - 1].data += P.data, N) : (N.push(P), N);
      }, []);
    }
    function T(A) {
      const N = [];
      for (let P = 0; P < A.length; P++) {
        const v = A[P];
        switch (v.mode) {
          case e.NUMERIC:
            N.push([
              v,
              { data: v.data, mode: e.ALPHANUMERIC, length: v.length },
              { data: v.data, mode: e.BYTE, length: v.length }
            ]);
            break;
          case e.ALPHANUMERIC:
            N.push([
              v,
              { data: v.data, mode: e.BYTE, length: v.length }
            ]);
            break;
          case e.KANJI:
            N.push([
              v,
              { data: v.data, mode: e.BYTE, length: u(v.data) }
            ]);
            break;
          case e.BYTE:
            N.push([
              { data: v.data, mode: e.BYTE, length: u(v.data) }
            ]);
        }
      }
      return N;
    }
    function R(A, N) {
      const P = {}, v = { start: {} };
      let k = ["start"];
      for (let I = 0; I < A.length; I++) {
        const B = A[I], D = [];
        for (let M = 0; M < B.length; M++) {
          const F = B[M], L = "" + I + M;
          D.push(L), P[L] = { node: F, lastCount: 0 }, v[L] = {};
          for (let U = 0; U < k.length; U++) {
            const O = k[U];
            P[O] && P[O].node.mode === F.mode ? (v[O][L] = m(P[O].lastCount + F.length, F.mode) - m(P[O].lastCount, F.mode), P[O].lastCount += F.length) : (P[O] && (P[O].lastCount = F.length), v[O][L] = m(F.length, F.mode) + 4 + e.getCharCountIndicator(F.mode, N));
          }
        }
        k = D;
      }
      for (let I = 0; I < k.length; I++)
        v[k[I]].end = 0;
      return { map: v, table: P };
    }
    function z(A, N) {
      let P;
      const v = e.getBestModeForData(A);
      if (P = e.from(N, v), P !== e.BYTE && P.bit < v.bit)
        throw new Error('"' + A + '" cannot be encoded with mode ' + e.toString(P) + `.
 Suggested mode is: ` + e.toString(v));
      switch (P === e.KANJI && !l.isKanjiModeEnabled() && (P = e.BYTE), P) {
        case e.NUMERIC:
          return new n(A);
        case e.ALPHANUMERIC:
          return new r(A);
        case e.KANJI:
          return new i(A);
        case e.BYTE:
          return new s(A);
      }
    }
    t.fromArray = function(N) {
      return N.reduce(function(P, v) {
        return typeof v == "string" ? P.push(z(v, null)) : v.data && P.push(z(v.data, v.mode)), P;
      }, []);
    }, t.fromString = function(N, P) {
      const v = h(N, l.isKanjiModeEnabled()), k = T(v), I = R(k, P), B = c.find_path(I.map, "start", "end"), D = [];
      for (let M = 1; M < B.length - 1; M++)
        D.push(I.table[B[M]].node);
      return t.fromArray(p(D));
    }, t.rawSplit = function(N) {
      return t.fromArray(
        h(N, l.isKanjiModeEnabled())
      );
    };
  }(Hn)), Hn;
}
var Ds;
function Hc() {
  if (Ds) return An;
  Ds = 1;
  const t = fe(), e = Pr(), n = Sc(), r = Tc(), s = Rc(), i = Ac(), o = xc(), l = Ki(), c = Mc(), u = Nc(), a = Bc(), h = ae(), m = Vc();
  function p(I, B) {
    const D = I.size, M = i.getPositions(B);
    for (let F = 0; F < M.length; F++) {
      const L = M[F][0], U = M[F][1];
      for (let O = -1; O <= 7; O++)
        if (!(L + O <= -1 || D <= L + O))
          for (let q = -1; q <= 7; q++)
            U + q <= -1 || D <= U + q || (O >= 0 && O <= 6 && (q === 0 || q === 6) || q >= 0 && q <= 6 && (O === 0 || O === 6) || O >= 2 && O <= 4 && q >= 2 && q <= 4 ? I.set(L + O, U + q, !0, !0) : I.set(L + O, U + q, !1, !0));
    }
  }
  function T(I) {
    const B = I.size;
    for (let D = 8; D < B - 8; D++) {
      const M = D % 2 === 0;
      I.set(D, 6, M, !0), I.set(6, D, M, !0);
    }
  }
  function R(I, B) {
    const D = s.getPositions(B);
    for (let M = 0; M < D.length; M++) {
      const F = D[M][0], L = D[M][1];
      for (let U = -2; U <= 2; U++)
        for (let O = -2; O <= 2; O++)
          U === -2 || U === 2 || O === -2 || O === 2 || U === 0 && O === 0 ? I.set(F + U, L + O, !0, !0) : I.set(F + U, L + O, !1, !0);
    }
  }
  function z(I, B) {
    const D = I.size, M = u.getEncodedBits(B);
    let F, L, U;
    for (let O = 0; O < 18; O++)
      F = Math.floor(O / 3), L = O % 3 + D - 8 - 3, U = (M >> O & 1) === 1, I.set(F, L, U, !0), I.set(L, F, U, !0);
  }
  function A(I, B, D) {
    const M = I.size, F = a.getEncodedBits(B, D);
    let L, U;
    for (L = 0; L < 15; L++)
      U = (F >> L & 1) === 1, L < 6 ? I.set(L, 8, U, !0) : L < 8 ? I.set(L + 1, 8, U, !0) : I.set(M - 15 + L, 8, U, !0), L < 8 ? I.set(8, M - L - 1, U, !0) : L < 9 ? I.set(8, 15 - L - 1 + 1, U, !0) : I.set(8, 15 - L - 1, U, !0);
    I.set(M - 8, 8, 1, !0);
  }
  function N(I, B) {
    const D = I.size;
    let M = -1, F = D - 1, L = 7, U = 0;
    for (let O = D - 1; O > 0; O -= 2)
      for (O === 6 && O--; ; ) {
        for (let q = 0; q < 2; q++)
          if (!I.isReserved(F, O - q)) {
            let Tt = !1;
            U < B.length && (Tt = (B[U] >>> L & 1) === 1), I.set(F, O - q, Tt), L--, L === -1 && (U++, L = 7);
          }
        if (F += M, F < 0 || D <= F) {
          F -= M, M = -M;
          break;
        }
      }
  }
  function P(I, B, D) {
    const M = new n();
    D.forEach(function(q) {
      M.put(q.mode.bit, 4), M.put(q.getLength(), h.getCharCountIndicator(q.mode, I)), q.write(M);
    });
    const F = t.getSymbolTotalCodewords(I), L = l.getTotalCodewordsCount(I, B), U = (F - L) * 8;
    for (M.getLengthInBits() + 4 <= U && M.put(0, 4); M.getLengthInBits() % 8 !== 0; )
      M.putBit(0);
    const O = (U - M.getLengthInBits()) / 8;
    for (let q = 0; q < O; q++)
      M.put(q % 2 ? 17 : 236, 8);
    return v(M, I, B);
  }
  function v(I, B, D) {
    const M = t.getSymbolTotalCodewords(B), F = l.getTotalCodewordsCount(B, D), L = M - F, U = l.getBlocksCount(B, D), O = M % U, q = U - O, Tt = Math.floor(M / U), rt = Math.floor(L / U), nt = rt + 1, Q = Tt - rt, Ht = new c(Q);
    let Gt = 0;
    const Ct = new Array(U), pt = new Array(U);
    let de = 0;
    const hn = new Uint8Array(I.buffer);
    for (let jt = 0; jt < U; jt++) {
      const qt = jt < q ? rt : nt;
      Ct[jt] = hn.slice(Gt, Gt + qt), pt[jt] = Ht.encode(Ct[jt]), Gt += qt, de = Math.max(de, qt);
    }
    const Ce = new Uint8Array(M);
    let Jt = 0, ht, mt;
    for (ht = 0; ht < de; ht++)
      for (mt = 0; mt < U; mt++)
        ht < Ct[mt].length && (Ce[Jt++] = Ct[mt][ht]);
    for (ht = 0; ht < Q; ht++)
      for (mt = 0; mt < U; mt++)
        Ce[Jt++] = pt[mt][ht];
    return Ce;
  }
  function k(I, B, D, M) {
    let F;
    if (Array.isArray(I))
      F = m.fromArray(I);
    else if (typeof I == "string") {
      let Tt = B;
      if (!Tt) {
        const rt = m.rawSplit(I);
        Tt = u.getBestVersionForData(rt, D);
      }
      F = m.fromString(I, Tt || 40);
    } else
      throw new Error("Invalid data");
    const L = u.getBestVersionForData(F, D);
    if (!L)
      throw new Error("The amount of data is too big to be stored in a QR Code");
    if (!B)
      B = L;
    else if (B < L)
      throw new Error(
        `
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: ` + L + `.
`
      );
    const U = P(B, D, F), O = t.getSymbolSize(B), q = new r(O);
    return p(q, B), T(q), R(q, B), A(q, D, 0), B >= 7 && z(q, B), N(q, U), isNaN(M) && (M = o.getBestMask(
      q,
      A.bind(null, q, D)
    )), o.applyMask(M, q), A(q, D, M), {
      modules: q,
      version: B,
      errorCorrectionLevel: D,
      maskPattern: M,
      segments: F
    };
  }
  return An.create = function(B, D) {
    if (typeof B > "u" || B === "")
      throw new Error("No input text");
    let M = e.M, F, L;
    return typeof D < "u" && (M = e.from(D.errorCorrectionLevel, e.M), F = u.from(D.version), L = o.from(D.maskPattern), D.toSJISFunc && t.setToSJISFunction(D.toSJISFunc)), k(B, F, M, L);
  }, An;
}
var zn = {}, Wn = {}, Ls;
function zi() {
  return Ls || (Ls = 1, function(t) {
    function e(n) {
      if (typeof n == "number" && (n = n.toString()), typeof n != "string")
        throw new Error("Color should be defined as hex string");
      let r = n.slice().replace("#", "").split("");
      if (r.length < 3 || r.length === 5 || r.length > 8)
        throw new Error("Invalid hex color: " + n);
      (r.length === 3 || r.length === 4) && (r = Array.prototype.concat.apply([], r.map(function(i) {
        return [i, i];
      }))), r.length === 6 && r.push("F", "F");
      const s = parseInt(r.join(""), 16);
      return {
        r: s >> 24 & 255,
        g: s >> 16 & 255,
        b: s >> 8 & 255,
        a: s & 255,
        hex: "#" + r.slice(0, 6).join("")
      };
    }
    t.getOptions = function(r) {
      r || (r = {}), r.color || (r.color = {});
      const s = typeof r.margin > "u" || r.margin === null || r.margin < 0 ? 4 : r.margin, i = r.width && r.width >= 21 ? r.width : void 0, o = r.scale || 4;
      return {
        width: i,
        scale: i ? 4 : o,
        margin: s,
        color: {
          dark: e(r.color.dark || "#000000ff"),
          light: e(r.color.light || "#ffffffff")
        },
        type: r.type,
        rendererOpts: r.rendererOpts || {}
      };
    }, t.getScale = function(r, s) {
      return s.width && s.width >= r + s.margin * 2 ? s.width / (r + s.margin * 2) : s.scale;
    }, t.getImageWidth = function(r, s) {
      const i = t.getScale(r, s);
      return Math.floor((r + s.margin * 2) * i);
    }, t.qrToImageData = function(r, s, i) {
      const o = s.modules.size, l = s.modules.data, c = t.getScale(o, i), u = Math.floor((o + i.margin * 2) * c), a = i.margin * c, h = [i.color.light, i.color.dark];
      for (let m = 0; m < u; m++)
        for (let p = 0; p < u; p++) {
          let T = (m * u + p) * 4, R = i.color.light;
          if (m >= a && p >= a && m < u - a && p < u - a) {
            const z = Math.floor((m - a) / c), A = Math.floor((p - a) / c);
            R = h[l[z * o + A] ? 1 : 0];
          }
          r[T++] = R.r, r[T++] = R.g, r[T++] = R.b, r[T] = R.a;
        }
    };
  }(Wn)), Wn;
}
var Os;
function jc() {
  return Os || (Os = 1, function(t) {
    const e = zi();
    function n(s, i, o) {
      s.clearRect(0, 0, i.width, i.height), i.style || (i.style = {}), i.height = o, i.width = o, i.style.height = o + "px", i.style.width = o + "px";
    }
    function r() {
      try {
        return document.createElement("canvas");
      } catch {
        throw new Error("You need to specify a canvas element");
      }
    }
    t.render = function(i, o, l) {
      let c = l, u = o;
      typeof c > "u" && (!o || !o.getContext) && (c = o, o = void 0), o || (u = r()), c = e.getOptions(c);
      const a = e.getImageWidth(i.modules.size, c), h = u.getContext("2d"), m = h.createImageData(a, a);
      return e.qrToImageData(m.data, i, c), n(h, u, a), h.putImageData(m, 0, 0), u;
    }, t.renderToDataURL = function(i, o, l) {
      let c = l;
      typeof c > "u" && (!o || !o.getContext) && (c = o, o = void 0), c || (c = {});
      const u = t.render(i, o, c), a = c.type || "image/png", h = c.rendererOpts || {};
      return u.toDataURL(a, h.quality);
    };
  }(zn)), zn;
}
var Gn = {}, Fs;
function qc() {
  if (Fs) return Gn;
  Fs = 1;
  const t = zi();
  function e(s, i) {
    const o = s.a / 255, l = i + '="' + s.hex + '"';
    return o < 1 ? l + " " + i + '-opacity="' + o.toFixed(2).slice(1) + '"' : l;
  }
  function n(s, i, o) {
    let l = s + i;
    return typeof o < "u" && (l += " " + o), l;
  }
  function r(s, i, o) {
    let l = "", c = 0, u = !1, a = 0;
    for (let h = 0; h < s.length; h++) {
      const m = Math.floor(h % i), p = Math.floor(h / i);
      !m && !u && (u = !0), s[h] ? (a++, h > 0 && m > 0 && s[h - 1] || (l += u ? n("M", m + o, 0.5 + p + o) : n("m", c, 0), c = 0, u = !1), m + 1 < i && s[h + 1] || (l += n("h", a), a = 0)) : c++;
    }
    return l;
  }
  return Gn.render = function(i, o, l) {
    const c = t.getOptions(o), u = i.modules.size, a = i.modules.data, h = u + c.margin * 2, m = c.color.light.a ? "<path " + e(c.color.light, "fill") + ' d="M0 0h' + h + "v" + h + 'H0z"/>' : "", p = "<path " + e(c.color.dark, "stroke") + ' d="' + r(a, u, c.margin) + '"/>', T = 'viewBox="0 0 ' + h + " " + h + '"', z = '<svg xmlns="http://www.w3.org/2000/svg" ' + (c.width ? 'width="' + c.width + '" height="' + c.width + '" ' : "") + T + ' shape-rendering="crispEdges">' + m + p + `</svg>
`;
    return typeof l == "function" && l(null, z), z;
  }, Gn;
}
var Us;
function Kc() {
  if (Us) return ge;
  Us = 1;
  const t = Ec(), e = Hc(), n = jc(), r = qc();
  function s(i, o, l, c, u) {
    const a = [].slice.call(arguments, 1), h = a.length, m = typeof a[h - 1] == "function";
    if (!m && !t())
      throw new Error("Callback required as last argument");
    if (m) {
      if (h < 2)
        throw new Error("Too few arguments provided");
      h === 2 ? (u = l, l = o, o = c = void 0) : h === 3 && (o.getContext && typeof u > "u" ? (u = c, c = void 0) : (u = c, c = l, l = o, o = void 0));
    } else {
      if (h < 1)
        throw new Error("Too few arguments provided");
      return h === 1 ? (l = o, o = c = void 0) : h === 2 && !o.getContext && (c = l, l = o, o = void 0), new Promise(function(p, T) {
        try {
          const R = e.create(l, c);
          p(i(R, o, c));
        } catch (R) {
          T(R);
        }
      });
    }
    try {
      const p = e.create(l, c);
      u(null, i(p, o, c));
    } catch (p) {
      u(p);
    }
  }
  return ge.create = e.create, ge.toCanvas = s.bind(null, n.render), ge.toDataURL = s.bind(null, n.renderToDataURL), ge.toString = s.bind(null, function(i, o, l) {
    return r.render(i, l);
  }), ge;
}
var $c = Kc();
const Vs = /* @__PURE__ */ Cc($c), kc = { class: "flex flex-col items-center" }, zc = { class: "flex flex-col items-center" }, Wc = { class: "flex flex-col items-center" }, Gc = { class: "flex flex-col items-center" }, Jc = { class: "flex flex-col items-center" }, Yc = { class: "flex flex-col items-center" }, Qc = { class: "flex flex-col items-center" }, Zc = {
  key: 0,
  class: "flex flex-col items-center space-y-2"
}, Xc = ["src"], tu = /* @__PURE__ */ hi({
  __name: "QrForm",
  setup(t) {
    const e = bn({
      fullName: "",
      organization: "",
      title: "",
      phone: "",
      email: "",
      url: "",
      address: ""
    }), n = bn(""), r = bn(""), s = (c) => c.toLowerCase().replace(/\s+/g, "-").replace(/['""''']/g, "").replace(/[^a-z0-9.-]/g, "").replace(/-+/g, "-").replace(/^-+|-+$/g, ""), i = async () => {
      const c = `BEGIN:VCARD
VERSION:3.0
FN:${e.value.fullName}
ORG:${e.value.organization}
TITLE:${e.value.title}
TEL:${e.value.phone}
EMAIL:${e.value.email}
URL:${e.value.url}
ADR:;;${e.value.address}
END:VCARD`;
      try {
        n.value = await Vs.toDataURL(c), r.value = await Vs.toString(c, { type: "svg" });
      } catch (u) {
        console.error(u);
      }
    }, o = () => {
      if (!n.value) {
        alert("No QR code available to download.");
        return;
      }
      const c = document.createElement("a");
      c.href = n.value, c.download = s(`${e.value.organization} - ${e.value.fullName}.png`), c.click();
    }, l = () => {
      if (!r.value) {
        alert("No SVG content available to download.");
        return;
      }
      const c = new Blob([r.value], { type: "image/svg+xml" }), u = document.createElement("a");
      u.href = URL.createObjectURL(c), u.download = s(`${e.value.organization} - ${e.value.fullName}.svg`), u.click(), URL.revokeObjectURL(u.href);
    };
    return (c, u) => (ir(), zr(Lt, null, [
      u[16] || (u[16] = G("h1", { class: "text-lg font-bold flex flex-col items-center mb-4" }, "Kontakto kortelės QR generatorius", -1)),
      G("form", {
        id: "qr-form",
        class: "space-y-4",
        onSubmit: _c(i, ["prevent"])
      }, [
        G("div", kc, [
          u[7] || (u[7] = G("label", { for: "fullName" }, "Vardas ir pavardė:", -1)),
          ne(G("input", {
            id: "fullName",
            "onUpdate:modelValue": u[0] || (u[0] = (a) => e.value.fullName = a),
            required: ""
          }, null, 512), [
            [ie, e.value.fullName]
          ])
        ]),
        G("div", zc, [
          u[8] || (u[8] = G("label", { for: "organization" }, "Įmonė:", -1)),
          ne(G("input", {
            id: "organization",
            "onUpdate:modelValue": u[1] || (u[1] = (a) => e.value.organization = a),
            required: ""
          }, null, 512), [
            [ie, e.value.organization]
          ])
        ]),
        G("div", Wc, [
          u[9] || (u[9] = G("label", { for: "title" }, "Pareigos:", -1)),
          ne(G("input", {
            id: "title",
            "onUpdate:modelValue": u[2] || (u[2] = (a) => e.value.title = a),
            required: ""
          }, null, 512), [
            [ie, e.value.title]
          ])
        ]),
        G("div", Gc, [
          u[10] || (u[10] = G("label", { for: "phone" }, "Telefonas:", -1)),
          ne(G("input", {
            id: "phone",
            "onUpdate:modelValue": u[3] || (u[3] = (a) => e.value.phone = a),
            required: ""
          }, null, 512), [
            [ie, e.value.phone]
          ])
        ]),
        G("div", Jc, [
          u[11] || (u[11] = G("label", { for: "email" }, "El. paštas:", -1)),
          ne(G("input", {
            id: "email",
            "onUpdate:modelValue": u[4] || (u[4] = (a) => e.value.email = a),
            required: ""
          }, null, 512), [
            [ie, e.value.email]
          ])
        ]),
        G("div", Yc, [
          u[12] || (u[12] = G("label", { for: "url" }, "Interneto puslapis:", -1)),
          ne(G("input", {
            id: "url",
            "onUpdate:modelValue": u[5] || (u[5] = (a) => e.value.url = a),
            required: ""
          }, null, 512), [
            [ie, e.value.url]
          ])
        ]),
        G("div", Qc, [
          u[13] || (u[13] = G("label", { for: "address" }, "Fizinis adresas:", -1)),
          ne(G("input", {
            id: "address",
            "onUpdate:modelValue": u[6] || (u[6] = (a) => e.value.address = a),
            required: ""
          }, null, 512), [
            [ie, e.value.address]
          ])
        ]),
        u[14] || (u[14] = G("div", { class: "flex justify-center" }, [
          G("button", {
            class: "w-1/4 bg-green-500 text-white font-semibold py-2 px-4 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50",
            type: "submit"
          }, " Generuoti QR ")
        ], -1))
      ], 32),
      n.value ? (ir(), zr("div", Zc, [
        G("img", {
          class: "mt-2",
          src: n.value,
          alt: "VCF QR Code"
        }, null, 8, Xc),
        u[15] || (u[15] = G("br", null, null, -1)),
        G("button", {
          class: "bg-blue-500 text-white text-sm p-1 mx-2 hover:bg-blue-600 focus-outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
          onClick: o
        }, "Atsisiųsti PNG"),
        G("button", {
          class: "bg-blue-500 text-white text-sm p-1 mx-2 hover:bg-blue-600 focus-outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
          onClick: l
        }, "Atsisiųsti SVG (spaudai)")
      ])) : Ll("", !0)
    ], 64));
  }
}), eu = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [r, s] of e)
    n[r] = s;
  return n;
}, nu = /* @__PURE__ */ eu(tu, [["__scopeId", "data-v-3fd433e8"]]), ru = /* @__PURE__ */ dc(nu);
customElements.define("qr-form", ru);
