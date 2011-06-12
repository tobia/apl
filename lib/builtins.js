(function() {
  var BTM, BTMLFT, BTMRGT, LFT, RGT, TOP, TOPLFT, TOPRGT, ambivalent, arrayValueOf, booleanValueOf, builtins, catenate, compressOrReplicate, cps, cpsify, depthOf, dyadic, format, format0, hpad, infixOperator, isSimple, match, monadic, numericValueOf, outerProduct, pervasive, postfixOperator, prefixOperator, prod, reduce, repeat, reverse, shapeOf, sum, vpad, withShape, _ref, _ref2;
  var __slice = Array.prototype.slice, __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  };
  _ref = require('./helpers'), cps = _ref.cps, cpsify = _ref.cpsify;
  sum = function(xs) {
    var r, x, _i, _len;
    r = 0;
    for (_i = 0, _len = xs.length; _i < _len; _i++) {
      x = xs[_i];
      r += x;
    }
    return r;
  };
  prod = function(xs) {
    var r, x, _i, _len;
    r = 1;
    for (_i = 0, _len = xs.length; _i < _len; _i++) {
      x = xs[_i];
      r *= x;
    }
    return r;
  };
  repeat = function(s, n) {
    var r, _i;
    r = '';
    for (_i = 0; 0 <= n ? _i < n : _i > n; 0 <= n ? _i++ : _i--) {
      r += s;
    }
    return r;
  };
  shapeOf = function(a) {
    return a.shape || (a.length != null ? [a.length] : []);
  };
  withShape = function(shape, a) {
    if ((shape != null) && shape.length !== 1) {
      a.shape = shape;
    }
    return a;
  };
  isSimple = function(x) {
    return typeof x === 'number' || typeof x === 'string';
  };
  arrayValueOf = function(x) {
    if (isSimple(x)) {
      return [x];
    } else {
      return x;
    }
  };
  numericValueOf = function(x) {
    if (x.length != null) {
      if (x.length !== 1) {
        throw Error('Numeric scalar or singleton expected');
      }
      x = x[0];
    }
    if (typeof x !== 'number') {
      throw Error('Numeric scalar or singleton expected');
    }
    return x;
  };
  booleanValueOf = function(x) {
    x = numericValueOf(x);
    if (x !== 0 && x !== 1) {
      throw Error('Boolean values must be either 0 or 1');
    }
    return x;
  };
  format = function(a) {
    return format0(a).join('\n');
  };
  format0 = function(a) {
    var bigWidth, box, boxes, c, h, i, nc, nr, r, result, s, sa, w, _ref2;
    if (typeof a === 'undefined') {
      return ['<<UNDEFINED>>'];
    } else if (a === null) {
      return ['<<NULL>>'];
    } else if (typeof a === 'string') {
      return [a];
    } else if (typeof a === 'number') {
      return [a < 0 ? '¯' + (-a) : '' + a];
    } else if (isSimple(a)) {
      return ['' + a];
    } else {
      if (a.length === 0) {
        return [',-.', '| |', "`-'"];
      }
      sa = shapeOf(a);
      nc = sa.length === 0 ? 1 : sa[sa.length - 1];
      nr = a.length / nc;
      h = (function() {
        var _i, _results;
        _results = [];
        for (_i = 0; 0 <= nr ? _i < nr : _i > nr; 0 <= nr ? _i++ : _i--) {
          _results.push(0);
        }
        return _results;
      })();
      w = (function() {
        var _i, _results;
        _results = [];
        for (_i = 0; 0 <= nc ? _i < nc : _i > nc; 0 <= nc ? _i++ : _i--) {
          _results.push(0);
        }
        return _results;
      })();
      boxes = (function() {
        var _results;
        _results = [];
        for (r = 0; 0 <= nr ? r < nr : r > nr; 0 <= nr ? r++ : r--) {
          _results.push((function() {
            var _results2;
            _results2 = [];
            for (c = 0; 0 <= nc ? c < nc : c > nc; 0 <= nc ? c++ : c--) {
              box = format0(a[r * nc + c]);
              h[r] = Math.max(h[r], box.length);
              w[c] = Math.max(w[c], box[0].length);
              _results2.push(box);
            }
            return _results2;
          })());
        }
        return _results;
      })();
      bigWidth = nc - 1 + sum(w);
      result = [TOPLFT + repeat(TOP, bigWidth) + TOPRGT];
      for (r = 0; 0 <= nr ? r < nr : r > nr; 0 <= nr ? r++ : r--) {
        for (c = 0; 0 <= nc ? c < nc : c > nc; 0 <= nc ? c++ : c--) {
          vpad(boxes[r][c], h[r]);
          hpad(boxes[r][c], w[c]);
        }
        for (i = 0, _ref2 = h[r]; 0 <= _ref2 ? i < _ref2 : i > _ref2; 0 <= _ref2 ? i++ : i--) {
          s = '';
          for (c = 0; 0 <= nc ? c < nc : c > nc; 0 <= nc ? c++ : c--) {
            s += ' ' + boxes[r][c][i];
          }
          result.push(LFT + s.slice(1) + RGT);
        }
      }
      result.push(BTMLFT + repeat(BTM, bigWidth) + BTMRGT);
      return result;
    }
  };
  hpad = function(box, width) {
    var i, padding, _ref2;
    if (box[0].length < width) {
      padding = repeat(' ', width - box[0].length);
      for (i = 0, _ref2 = box.length; 0 <= _ref2 ? i < _ref2 : i > _ref2; 0 <= _ref2 ? i++ : i--) {
        box[i] += padding;
      }
      return 0;
    }
  };
  vpad = function(box, height) {
    var i, padding, _ref2;
    if (box.length < height) {
      padding = repeat(' ', box[0].length);
      for (i = _ref2 = box.length; _ref2 <= height ? i < height : i > height; _ref2 <= height ? i++ : i--) {
        box.push(padding);
      }
      return 0;
    }
  };
  _ref2 = "──││┌┐└┘", TOP = _ref2[0], BTM = _ref2[1], LFT = _ref2[2], RGT = _ref2[3], TOPLFT = _ref2[4], TOPRGT = _ref2[5], BTMLFT = _ref2[6], BTMRGT = _ref2[7];
  pervasive = function(f) {
    return function(a, b) {
      var F, i, k, sa, sb, x, _ref3;
      F = arguments.callee;
      if (b != null) {
        if (isSimple(a) && isSimple(b)) {
          return f(a, b);
        } else if (isSimple(a)) {
          return withShape(b.shape, (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = b.length; _i < _len; _i++) {
              x = b[_i];
              _results.push(F(a, x));
            }
            return _results;
          })());
        } else if (isSimple(b)) {
          return withShape(a.shape, (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = a.length; _i < _len; _i++) {
              x = a[_i];
              _results.push(F(x, b));
            }
            return _results;
          })());
        } else {
          sa = shapeOf(a);
          sb = shapeOf(b);
          for (i = 0, _ref3 = Math.min(sa.length, sb.length); 0 <= _ref3 ? i < _ref3 : i > _ref3; 0 <= _ref3 ? i++ : i--) {
            if (sa[i] !== sb[i]) {
              throw Error('Length error');
            }
          }
          if (sa.length > sb.length) {
            k = prod(sa.slice(sb.length));
            return withShape(sa, (function() {
              var _ref4, _results;
              _results = [];
              for (i = 0, _ref4 = a.length; 0 <= _ref4 ? i < _ref4 : i > _ref4; 0 <= _ref4 ? i++ : i--) {
                _results.push(F(a[i], b[Math.floor(i / k)]));
              }
              return _results;
            })());
          } else if (sa.length < sb.length) {
            k = prod(sb.slice(sa.length));
            return withShape(sb, (function() {
              var _ref4, _results;
              _results = [];
              for (i = 0, _ref4 = b.length; 0 <= _ref4 ? i < _ref4 : i > _ref4; 0 <= _ref4 ? i++ : i--) {
                _results.push(F(a[Math.floor(i / k)], b[i]));
              }
              return _results;
            })());
          } else {
            return withShape(sa, (function() {
              var _ref4, _results;
              _results = [];
              for (i = 0, _ref4 = a.length; 0 <= _ref4 ? i < _ref4 : i > _ref4; 0 <= _ref4 ? i++ : i--) {
                _results.push(F(a[i], b[i]));
              }
              return _results;
            })());
          }
        }
      } else {
        if (isSimple(a)) {
          return f(a);
        } else {
          return withShape(a.shape, (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = a.length; _i < _len; _i++) {
              x = a[_i];
              _results.push(F(x));
            }
            return _results;
          })());
        }
      }
    };
  };
  exports.builtins = builtins = {};
  prefixOperator = function(symbol, f) {
    f.isPrefixOperator = true;
    f.aplName = symbol;
    return builtins[symbol] = f;
  };
  postfixOperator = function(symbol, f) {
    f.isPostfixOperator = true;
    f.aplName = symbol;
    return builtins[symbol] = f;
  };
  infixOperator = function(symbol, f) {
    f.isInfixOperator = true;
    f.aplName = symbol;
    return builtins[symbol] = f;
  };
  ambivalent = function(f1, f2) {
    var f;
    f = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (args[1] != null ? f2 : f1).apply(null, args);
    };
    f.aplName = f1.aplName || f2.aplName;
    return f;
  };
  monadic = function(symbol, f) {
    var g;
        if (f != null) {
      f;
    } else {
      f = function() {
        throw Error("Monadic function " + symbol + " is not available.");
      };
    };
    if ((g = builtins[symbol])) {
      f = ambivalent(f, g);
    }
    f.aplName = symbol;
    return builtins[symbol] = f;
  };
  dyadic = function(symbol, f) {
    var g;
        if (f != null) {
      f;
    } else {
      f = function() {
        throw Error("Dyadic function " + symbol + " is not available.");
      };
    };
    if ((g = builtins[symbol])) {
      f = ambivalent(g, f);
    }
    f.aplName = symbol;
    return builtins[symbol] = f;
  };
  monadic('+', function(a) {
    return a;
  });
  dyadic('+', pervasive(function(x, y) {
    return x + y;
  }));
  monadic('−', pervasive(function(x) {
    return -x;
  }));
  dyadic('−', pervasive(function(x, y) {
    return x - y;
  }));
  monadic('×', pervasive(function(x) {
    if (x < 0) {
      return -1;
    } else if (x > 0) {
      return 1;
    } else {
      return 0;
    }
  }));
  dyadic('×', pervasive(function(x, y) {
    return x * y;
  }));
  monadic('÷', pervasive(function(x) {
    return 1 / x;
  }));
  dyadic('÷', pervasive(function(x, y) {
    return x / y;
  }));
  monadic('⌈', pervasive(function(x) {
    return Math.ceil(x);
  }));
  dyadic('⌈', pervasive(function(x, y) {
    return Math.max(x, y);
  }));
  monadic('⌊', pervasive(function(x) {
    return Math.floor(x);
  }));
  dyadic('⌊', pervasive(function(x, y) {
    return Math.min(x, y);
  }));
  monadic('∣', pervasive(function(x) {
    return Math.abs(x);
  }));
  dyadic('∣', pervasive(function(x, y) {
    return y % x;
  }));
  monadic('⍳', function(a) {
    var _i, _ref3, _results;
    return (function() {
      _results = [];
      for (var _i = 0, _ref3 = Math.floor(numericValueOf(a)); 0 <= _ref3 ? _i < _ref3 : _i > _ref3; 0 <= _ref3 ? _i++ : _i--){ _results.push(_i); }
      return _results;
    }).apply(this, arguments);
  });
  dyadic('⍳', function() {
    throw Error('Not implemented');
  });
  monadic('?', pervasive(function(x) {
    return Math.floor(Math.random() * Math.max(0, Math.floor(numericValueOf(x))));
  }));
  dyadic('?', function(x, y) {
    var available, _i, _j, _results, _results2;
    x = Math.max(0, Math.floor(numericValueOf(x)));
    y = Math.max(0, Math.floor(numericValueOf(y)));
    if (x > y) {
      throw Error('Domain error: left argument of ? must not be greater than its right argument.');
    }
    available = (function() {
      _results = [];
      for (var _i = 0; 0 <= y ? _i < y : _i > y; 0 <= y ? _i++ : _i--){ _results.push(_i); }
      return _results;
    }).apply(this, arguments);
    _results2 = [];
    for (_j = 0; 0 <= x ? _j < x : _j > x; 0 <= x ? _j++ : _j--) {
      _results2.push(available.splice(Math.floor(available.length * Math.random()), 1)[0]);
    }
    return _results2;
  });
  monadic('⋆', pervasive(function(x) {
    return Math.exp(numericValueOf(x));
  }));
  dyadic('⋆', pervasive(function(x, y) {
    return Math.pow(numericValueOf(x), numericValueOf(y));
  }));
  monadic('⍟', pervasive(function(x) {
    return Math.log(x);
  }));
  dyadic('⍟', pervasive(function(x, y) {
    return Math.log(y) / Math.log(x);
  }));
  monadic('○', pervasive(function(x) {
    return Math.PI * x;
  }));
  dyadic('○', pervasive(function(i, x) {
    var ex;
    switch (i) {
      case 0:
        return Math.sqrt(1 - x * x);
      case 1:
        return Math.sin(x);
      case 2:
        return Math.cos(x);
      case 3:
        return Math.tan(x);
      case 4:
        return Math.sqrt(1 + x * x);
      case 5:
        return (Math.exp(2 * x) - 1) / 2;
      case 6:
        return (Math.exp(2 * x) + 1) / 2;
      case 7:
        ex = Math.exp(2 * x);
        return (ex - 1) / (ex + 1);
      case -1:
        return Math.asin(x);
      case -2:
        return Math.acos(x);
      case -3:
        return Math.atan(x);
      case -4:
        return Math.sqrt(x * x - 1);
      case -5:
        return Math.log(x + Math.sqrt(x * x + 1));
      case -6:
        return Math.log(x + Math.sqrt(x * x - 1));
      case -7:
        return Math.log((1 + x) / (1 - x)) / 2;
      default:
        throw Error('Unknown circular or hyperbolic function ' + i);
    }
  }));
  monadic('!', pervasive(function(a) {
    var i, n, r;
    n = a = Math.floor(numericValueOf(a));
    r = 1;
    if (n > 1) {
      for (i = 2; 2 <= n ? i <= n : i >= n; 2 <= n ? i++ : i--) {
        r *= i;
      }
    }
    return r;
  }));
  dyadic('!', pervasive(function(a, b) {
    var i, k, n, r;
    k = a = Math.floor(numericValueOf(a));
    n = b = Math.floor(numericValueOf(b));
    if (!((0 <= k && k <= n))) {
      return 0;
    }
    if (2 * k > n) {
      k = n - k;
    }
    r = 1;
    if (k > 0) {
      for (i = 1; 1 <= k ? i <= k : i >= k; 1 <= k ? i++ : i--) {
        r = r * (n - k + i) / i;
      }
    }
    return r;
  }));
  monadic('⌹');
  dyadic('⌹');
  dyadic('<', pervasive(function(x, y) {
    return +(x < y);
  }));
  dyadic('≤', pervasive(function(x, y) {
    return +(x <= y);
  }));
  dyadic('=', pervasive(function(x, y) {
    return +(x === y);
  }));
  dyadic('≥', pervasive(function(x, y) {
    return +(x >= y);
  }));
  dyadic('>', pervasive(function(x, y) {
    return +(x > y);
  }));
  dyadic('≠', pervasive(function(x, y) {
    return +(x !== y);
  }));
  monadic('≡', depthOf = function(a) {
    var r, x, _i, _len;
    if (isSimple(a)) {
      return 0;
    }
    r = 0;
    for (_i = 0, _len = a.length; _i < _len; _i++) {
      x = a[_i];
      r = Math.max(r, depthOf(x));
    }
    return r + 1;
  });
  dyadic('≡', match = function(a, b) {
    var i, sa, sb, _ref3, _ref4;
    if (isSimple(a) && isSimple(b)) {
      return +(a === b);
    }
    if (isSimple(a) !== isSimple(b)) {
      return 0;
    }
    sa = shapeOf(a);
    sb = shapeOf(b);
    if (sa.length !== sb.length) {
      return 0;
    }
    for (i = 0, _ref3 = sa.length; 0 <= _ref3 ? i < _ref3 : i > _ref3; 0 <= _ref3 ? i++ : i--) {
      if (sa[i] !== sb[i]) {
        return 0;
      }
    }
    if (a.length !== b.length) {
      return 0;
    }
    for (i = 0, _ref4 = a.length; 0 <= _ref4 ? i < _ref4 : i > _ref4; 0 <= _ref4 ? i++ : i--) {
      if (!match(a[i], b[i])) {
        return 0;
      }
    }
    return 1;
  });
  dyadic('≢', function(a, b) {
    return +!match(a, b);
  });
  monadic('∈', function(a) {
    var r, rec;
    r = [];
    rec = function(x) {
      var y, _i, _len;
      if (isSimple(x)) {
        r.push(x);
      } else {
        for (_i = 0, _len = x.length; _i < _len; _i++) {
          y = x[_i];
          rec(y);
        }
      }
      return r;
    };
    return rec(a);
  });
  dyadic('∈', function(a, b) {
    var x;
    a = arrayValueOf(a);
    b = arrayValueOf(b);
    return withShape(a.shape, (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = a.length; _i < _len; _i++) {
        x = a[_i];
        _results.push(+(__indexOf.call(b, x) >= 0));
      }
      return _results;
    })());
  });
  dyadic('⍷');
  monadic('∪');
  dyadic('∪');
  dyadic('∩');
  monadic('∼', pervasive(function(x) {
    return +!booleanValueOf(x);
  }));
  dyadic('∼');
  dyadic('∨', pervasive(function(x, y) {
    return +(booleanValueOf(x) || booleanValueOf(y));
  }));
  dyadic('∧', pervasive(function(x, y) {
    return +(booleanValueOf(x) && booleanValueOf(y));
  }));
  dyadic('⍱', pervasive(function(x, y) {
    return +!(booleanValueOf(x) || booleanValueOf(y));
  }));
  dyadic('⍲', pervasive(function(x, y) {
    return +!(booleanValueOf(x) && booleanValueOf(y));
  }));
  monadic('⍴', shapeOf);
  dyadic('⍴', function(a, b) {
    var i, x;
    if (isSimple(a)) {
      a = [a];
    }
    if (isSimple(b)) {
      b = [b];
    }
    a = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = a.length; _i < _len; _i++) {
        x = a[_i];
        if (!typeof x === 'number') {
          throw Error('Domain error: Left argument to ⍴ must be a numeric scalar or vector.');
        }
        _results.push(Math.max(0, Math.floor(x)));
      }
      return _results;
    })();
    return withShape(a, (function() {
      var _ref3, _results;
      _results = [];
      for (i = 0, _ref3 = prod(a); 0 <= _ref3 ? i < _ref3 : i > _ref3; 0 <= _ref3 ? i++ : i--) {
        _results.push(b[i % b.length]);
      }
      return _results;
    })());
  });
  monadic(',', function(a) {
    return arrayValueOf(a).slice(0);
  });
  catenate = function(a, b, axis) {
    var i, j, k, ni, nja, njb, nk, r, sa, sb, sr, x, _ref3;
    if (axis == null) {
      axis = -1;
    }
    sa = shapeOf(a);
    if (sa.length === 0) {
      sa = [1];
      a = [a];
    }
    sb = shapeOf(b);
    if (sb.length === 0) {
      sb = [1];
      b = [b];
    }
    if (sa.length !== sb.length) {
      throw Error('Length error: Cannot catenate arrays of different ranks');
    }
    if (axis < 0) {
      axis += sa.length;
    }
    for (i = 0, _ref3 = sa.length; 0 <= _ref3 ? i < _ref3 : i > _ref3; 0 <= _ref3 ? i++ : i--) {
      if (sa[i] !== sb[i] && i !== axis) {
        throw Error('Length error: Catenated arrays must match at all axes exept the one to catenate on');
      }
    }
    ni = prod(sa.slice(0, axis));
    nja = sa[axis];
    njb = sb[axis];
    nk = prod(sa.slice(axis + 1));
    r = [];
    for (i = 0; 0 <= ni ? i < ni : i > ni; 0 <= ni ? i++ : i--) {
      for (j = 0; 0 <= nja ? j < nja : j > nja; 0 <= nja ? j++ : j--) {
        for (k = 0; 0 <= nk ? k < nk : k > nk; 0 <= nk ? k++ : k--) {
          r.push(a[k + nk * (j + nja * i)]);
        }
      }
      for (j = 0; 0 <= njb ? j < njb : j > njb; 0 <= njb ? j++ : j--) {
        for (k = 0; 0 <= nk ? k < nk : k > nk; 0 <= nk ? k++ : k--) {
          r.push(b[k + nk * (j + njb * i)]);
        }
      }
    }
    sr = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = sa.length; _i < _len; _i++) {
        x = sa[_i];
        _results.push(x);
      }
      return _results;
    })();
    sr[axis] += sb[axis];
    return withShape(sr, r);
  };
  dyadic(',', catenate);
  dyadic('⍪', function(a, b) {
    return catenate(a, b, 0);
  });
  monadic('⌽', reverse = function(a, _, axis) {
    var i, j, k, ni, nj, nk, r, sa, _ref3;
    if (axis == null) {
      axis = -1;
    }
    sa = shapeOf(a);
    if (sa.length === 0) {
      return a;
    }
    if (axis < 0) {
      axis += sa.length;
    }
    if (!((0 <= axis && axis < sa.length))) {
      throw Error('Axis out of bounds');
    }
    ni = prod(sa.slice(0, axis));
    nj = sa[axis];
    nk = prod(sa.slice(axis + 1));
    r = [];
    for (i = 0; 0 <= ni ? i < ni : i > ni; 0 <= ni ? i++ : i--) {
      for (j = _ref3 = nj - 1; _ref3 <= 0 ? j <= 0 : j >= 0; j += -1) {
        for (k = 0; 0 <= nk ? k < nk : k > nk; 0 <= nk ? k++ : k--) {
          r.push(a[k + nk * (j + nj * i)]);
        }
      }
    }
    return withShape(sa, r);
  });
  dyadic('⌽', function(a, b) {
    var i, n, sb;
    a = numericValueOf(a);
    if (a === 0 || isSimple(b) || (b.length <= 1)) {
      return b;
    }
    sb = shapeOf(b);
    n = sb[sb.length - 1];
    a %= n;
    if (a < 0) {
      a += n;
    }
    return withShape(sb, (function() {
      var _ref3, _results;
      _results = [];
      for (i = 0, _ref3 = b.length; 0 <= _ref3 ? i < _ref3 : i > _ref3; 0 <= _ref3 ? i++ : i--) {
        _results.push(b[i - (i % n) + ((i % n) + a) % n]);
      }
      return _results;
    })());
  });
  monadic('⊖', function(a, _, axis) {
    if (axis == null) {
      axis = 0;
    }
    return reverse(a, void 0, axis);
  });
  dyadic('⊖', function(a, b) {
    var i, k, n, sb;
    a = numericValueOf(a);
    if (a === 0 || isSimple(b) || (b.length <= 1)) {
      return b;
    }
    sb = shapeOf(b);
    n = sb[0];
    k = b.length / n;
    a %= n;
    if (a < 0) {
      a += n;
    }
    return withShape(sb, (function() {
      var _ref3, _results;
      _results = [];
      for (i = 0, _ref3 = b.length; 0 <= _ref3 ? i < _ref3 : i > _ref3; 0 <= _ref3 ? i++ : i--) {
        _results.push(b[((Math.floor(i / k) + a) % n) * k + (i % k)]);
      }
      return _results;
    })());
  });
  monadic('⍉', function(a) {
    var i, psr, r, rec, sa, sr, _ref3;
    sa = shapeOf(a);
    if (sa.length <= 1) {
      return a;
    }
    sr = sa.slice(0).reverse();
    psr = [1];
    for (i = 0, _ref3 = sa.length - 1; 0 <= _ref3 ? i < _ref3 : i > _ref3; 0 <= _ref3 ? i++ : i--) {
      psr.push(psr[i] * sr[i]);
    }
    r = [];
    rec = function(d, i) {
      var j, _ref4;
      if (d >= sa.length) {
        r.push(a[i]);
      } else {
        for (j = 0, _ref4 = sr[d]; 0 <= _ref4 ? j < _ref4 : j > _ref4; 0 <= _ref4 ? j++ : j--) {
          rec(d + 1, i + j * psr[d]);
        }
      }
      return 0;
    };
    rec(0, 0);
    return withShape(sr, r);
  });
  monadic('↑', function(a) {
    a = arrayValueOf(a);
    if (a.length) {
      return a[0];
    } else {
      return 0;
    }
  });
  dyadic('↑', function(a, b) {
    var i, pa, r, rec, sb, x, _i, _len;
    if (isSimple(a)) {
      a = [a];
    }
    for (_i = 0, _len = a.length; _i < _len; _i++) {
      x = a[_i];
      if (!typeof x === 'number') {
        throw Error('Domain error: Left argument to ↑ must be a numeric scalar or vector.');
      }
    }
    if (isSimple(b) && a.length === 1) {
      b = [b];
    }
    sb = shapeOf(b);
    if (a.length !== sb.length) {
      throw Error('Length error: Left argument to ↑ must have as many elements as is the rank of its right argument.');
    }
    r = [];
    pa = (function() {
      var _j, _ref3, _results;
      _results = [];
      for (_j = 0, _ref3 = a.length; 0 <= _ref3 ? _j < _ref3 : _j > _ref3; 0 <= _ref3 ? _j++ : _j--) {
        _results.push(0);
      }
      return _results;
    })();
    pa[a.length - 1] = 1;
    i = a.length - 2;
    while (i >= 0) {
      pa[i] = pa[i + 1] * a[i + 1];
      i--;
    }
    rec = function(d, i, k) {
      var j, _j, _k, _ref3, _ref4, _ref5, _ref6, _ref7;
      if (d >= sb.length) {
        r.push(b[i]);
      } else {
        k /= sb[d];
        if (a[d] >= 0) {
          for (j = 0, _ref3 = Math.min(a[d], sb[d]); 0 <= _ref3 ? j < _ref3 : j > _ref3; 0 <= _ref3 ? j++ : j--) {
            rec(d + 1, i + j * k, k);
          }
          if (sb[d] < a[d]) {
            for (_j = 0, _ref4 = (a[d] - sb[d]) * pa[d]; 0 <= _ref4 ? _j < _ref4 : _j > _ref4; 0 <= _ref4 ? _j++ : _j--) {
              r.push(0);
            }
          }
        } else {
          if (sb[d] + a[d] < 0) {
            for (_k = 0, _ref5 = -(sb[d] + a[d]) * pa[d]; 0 <= _ref5 ? _k < _ref5 : _k > _ref5; 0 <= _ref5 ? _k++ : _k--) {
              r.push(0);
            }
          }
          for (j = _ref6 = Math.max(0, sb[d] + a[d]), _ref7 = sb[d]; _ref6 <= _ref7 ? j < _ref7 : j > _ref7; _ref6 <= _ref7 ? j++ : j--) {
            rec(d + 1, i + j * k, k);
          }
        }
      }
      return r;
    };
    return withShape(a, rec(0, 0, b.length));
  });
  dyadic('↓', function(a, b) {
    var hi, i, lims, lo, r, rec, sb, sr, x, _i, _j, _len, _ref3, _ref4;
    if (isSimple(a)) {
      a = [a];
    }
    for (_i = 0, _len = a.length; _i < _len; _i++) {
      x = a[_i];
      if (typeof x !== 'number' || x !== Math.floor(x)) {
        throw Error('Left argument to ↓ must be an integer or a vector of integers.');
      }
    }
    if (isSimple(b)) {
      b = withShape((function() {
        var _j, _ref3, _results;
        _results = [];
        for (_j = 0, _ref3 = a.length; 0 <= _ref3 ? _j < _ref3 : _j > _ref3; 0 <= _ref3 ? _j++ : _j--) {
          _results.push(1);
        }
        return _results;
      })(), b);
    }
    sb = shapeOf(b);
    if (a.length > sb.length) {
      throw Error('The left argument to ↓ must have length less than or equal to the rank of its right argument.');
    }
    for (_j = _ref3 = a.length, _ref4 = sb.length; _ref3 <= _ref4 ? _j < _ref4 : _j > _ref4; _ref3 <= _ref4 ? _j++ : _j--) {
      a.push(0);
    }
    lims = (function() {
      var _ref5, _results;
      _results = [];
      for (i = 0, _ref5 = a.length; 0 <= _ref5 ? i < _ref5 : i > _ref5; 0 <= _ref5 ? i++ : i--) {
        _results.push(a[i] >= 0 ? [Math.min(a[i], sb[i]), sb[i]] : [0, Math.max(0, sb[i] + a[i])]);
      }
      return _results;
    })();
    r = [];
    rec = function(d, i, n) {
      var j, _ref5, _ref6;
      if (d >= sb.length) {
        r.push(b[i]);
      } else {
        n /= sb[d];
        for (j = _ref5 = lims[d][0], _ref6 = lims[d][1]; _ref5 <= _ref6 ? j < _ref6 : j > _ref6; _ref5 <= _ref6 ? j++ : j--) {
          rec(d + 1, i + j * n, n);
        }
      }
      return 0;
    };
    rec(0, 0, b.length);
    sr = (function() {
      var _k, _len2, _ref5, _results;
      _results = [];
      for (_k = 0, _len2 = lims.length; _k < _len2; _k++) {
        _ref5 = lims[_k], lo = _ref5[0], hi = _ref5[1];
        _results.push(hi - lo);
      }
      return _results;
    })();
    return withShape(sr, r);
  });
  monadic('⊂', function(a) {
    if (isSimple(a)) {
      return a;
    } else {
      return withShape([], [a]);
    }
  });
  dyadic('⊂');
  monadic('⊃', function(a) {
    var i, r, rec, sa, sr, sr1, sx, x, _i, _j, _len, _len2, _ref3, _ref4;
    if (isSimple(a)) {
      return a;
    }
    sa = shapeOf(a);
    if (sa.length === 0) {
      return a[0];
    }
    sr1 = shapeOf(a[0]);
    _ref3 = a.slice(1);
    for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
      x = _ref3[_i];
      sx = shapeOf(x);
      if (sx.length !== sr1.length) {
        throw Error('The argument of ⊃ must contain elements of the same rank.');
      }
      for (i = 0, _ref4 = sr1.length; 0 <= _ref4 ? i < _ref4 : i > _ref4; 0 <= _ref4 ? i++ : i--) {
        sr1[i] = Math.max(sr1[i], sx[i]);
      }
    }
    sr = shapeOf(a).concat(sr1);
    r = [];
    for (_j = 0, _len2 = a.length; _j < _len2; _j++) {
      x = a[_j];
      sx = shapeOf(x);
      rec = function(d, i, n, N) {
        var j, _k, _ref5, _ref6, _results;
        if (d >= sr1.length) {
          return r.push(x[i]);
        } else {
          n /= sx[d];
          N /= sr1[d];
          for (j = 0, _ref5 = sx[d]; 0 <= _ref5 ? j < _ref5 : j > _ref5; 0 <= _ref5 ? j++ : j--) {
            rec(d + 1, i + j * n, n, N);
          }
          _results = [];
          for (_k = 0, _ref6 = N * (sr1[d] - sx[d]); 0 <= _ref6 ? _k < _ref6 : _k > _ref6; 0 <= _ref6 ? _k++ : _k--) {
            _results.push(r.push(0));
          }
          return _results;
        }
      };
      rec(0, 0, x.length, prod(sr1));
    }
    return withShape(sr, r);
  });
  dyadic('⊃');
  dyadic('⌷', function(a, b) {
    var d, r, rec, sb, sr, x, y, _i, _j, _k, _len, _len2, _len3, _len4, _len5;
    if (isSimple(a)) {
      a = [a];
    }
    if (a.shape && a.shape.length > 1) {
      throw Error('Indices must be a scalar or a vector, not a higher-dimensional array.');
    }
    sb = shapeOf(b);
    if (a.length !== sb.length) {
      throw Error('The number of indices must be equal to the rank of the indexable.');
    }
    a = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = a.length; _i < _len; _i++) {
        x = a[_i];
        _results.push((isSimple(x) ? withShape([], [x]) : x));
      }
      return _results;
    })();
    for (d = 0, _len = a.length; d < _len; d++) {
      x = a[d];
      for (_i = 0, _len2 = x.length; _i < _len2; _i++) {
        y = x[_i];
        if (!(typeof y === 'number' && y === Math.floor(y))) {
          throw Error('Indices must be integers');
        }
      }
    }
    for (d = 0, _len3 = a.length; d < _len3; d++) {
      x = a[d];
      for (_j = 0, _len4 = x.length; _j < _len4; _j++) {
        y = x[_j];
        if (!((0 <= y && y < sb[d]))) {
          throw Error('Index out of bounds');
        }
      }
    }
    sr = [];
    for (_k = 0, _len5 = a.length; _k < _len5; _k++) {
      x = a[_k];
      sr = sr.concat(shapeOf(x));
    }
    r = [];
    rec = function(d, i, n) {
      var x, _l, _len6, _ref3;
      if (d >= a.length) {
        r.push(b[i]);
      } else {
        _ref3 = a[d];
        for (_l = 0, _len6 = _ref3.length; _l < _len6; _l++) {
          x = _ref3[_l];
          rec(d + 1, i + (x * n / sb[d]), n / sb[d]);
        }
      }
      return 0;
    };
    rec(0, 0, b.length);
    if (sr.length === 0) {
      return r[0];
    } else {
      return withShape(sr, r);
    }
  });
  monadic('⍋');
  monadic('⍒');
  monadic('⊤');
  monadic('⊥');
  monadic('⍕');
  dyadic('⍕');
  monadic('⍎');
  monadic('⊣');
  dyadic('⊣');
  monadic('⊢');
  dyadic('⊢');
  reduce = function(f, _, axis) {
    if (axis == null) {
      axis = -1;
    }
    return function(a, b) {
      var i, invokedAsMonadic, isBackwards, items, j, k, n, r, sItem, sb, x, _ref3;
      invokedAsMonadic = !(b != null);
      if (invokedAsMonadic) {
        b = a;
        a = 0;
      }
      a = Math.floor(numericValueOf(a));
      isBackwards = a < 0;
      if (isBackwards) {
        a = -a;
      }
      b = arrayValueOf(b);
      sb = shapeOf(b);
      if (axis < 0) {
        axis += sb.length;
      }
      n = sb[axis];
      if (a === 0) {
        a = n;
      }
      if (sb.length === 1) {
        items = b;
      } else {
        sItem = sb.slice(0, axis).concat(sb.slice(axis + 1));
        k = prod(sb.slice(axis + 1));
        items = (function() {
          var _i, _results;
          _results = [];
          for (_i = 0; 0 <= n ? _i < n : _i > n; 0 <= n ? _i++ : _i--) {
            _results.push(withShape(sItem, []));
          }
          return _results;
        })();
        for (i = 0, _ref3 = b.length; 0 <= _ref3 ? i < _ref3 : i > _ref3; 0 <= _ref3 ? i++ : i--) {
          items[Math.floor(i / k) % n].push(b[i]);
        }
      }
      r = (function() {
        var _ref4, _ref5, _ref6, _ref7, _ref8, _ref9, _results, _results2;
        if (isBackwards) {
          _results = [];
          for (i = 0, _ref4 = n - a + 1; 0 <= _ref4 ? i < _ref4 : i > _ref4; 0 <= _ref4 ? i++ : i--) {
            x = items[i + a - 1];
            for (j = _ref5 = i + a - 2, _ref6 = i - 1; _ref5 <= _ref6 ? j < _ref6 : j > _ref6; j += -1) {
              x = f(x, items[j]);
            }
            _results.push(x);
          }
          return _results;
        } else {
          _results2 = [];
          for (i = 0, _ref7 = n - a + 1; 0 <= _ref7 ? i < _ref7 : i > _ref7; 0 <= _ref7 ? i++ : i--) {
            x = items[i];
            for (j = _ref8 = i + 1, _ref9 = i + a; _ref8 <= _ref9 ? j < _ref9 : j > _ref9; j += 1) {
              x = f(x, items[j]);
            }
            _results2.push(x);
          }
          return _results2;
        }
      })();
      if (invokedAsMonadic) {
        return r[0];
      } else {
        return r;
      }
    };
  };
  compressOrReplicate = function(a, b, axis) {
    var i, isExpansive, isExtensive, isHyperexpansive, j, k, nNonNegative, ni, nj, nk, r, sb, sr, x, _i, _j, _k, _l, _len, _len2, _ref3;
    if (axis == null) {
      axis = -1;
    }
    sb = shapeOf(b);
    if (axis < 0) {
      axis += sb.length;
    }
    if (!((0 <= axis && axis < sb.length))) {
      throw Error('Axis out of bounds');
    }
    sr = sb.slice(0);
    sr[axis] = 0;
    if (shapeOf(a).length > 1) {
      throw Error('Left argument to / must be an integer or a vector of integers');
    }
    if (!a.length) {
      a = (function() {
        var _i, _ref3, _results;
        _results = [];
        for (_i = 0, _ref3 = sb[axis]; 0 <= _ref3 ? _i < _ref3 : _i > _ref3; 0 <= _ref3 ? _i++ : _i--) {
          _results.push(a);
        }
        return _results;
      })();
    }
    nNonNegative = 0;
    for (_i = 0, _len = a.length; _i < _len; _i++) {
      x = a[_i];
      if (typeof x !== 'number' || x !== Math.floor(x)) {
        throw Error('Left argument to / must be an integer or a vector of integers');
      }
      sr[axis] += Math.abs(x);
      nNonNegative += x >= 0;
    }
    isExtensive = true;
    isExpansive = isHyperexpansive = false;
    if (sb[axis] !== 1) {
      isExtensive = false;
      isExpansive = a.length === sb[axis];
      isHyperexpansive = !isExpansive;
      if (isHyperexpansive && (nNonNegative !== sb[axis])) {
        throw Error('For A/B, the length of B along the selected axis ' + 'must be equal either to one, ' + 'or the length of A, ' + 'or to the number of non-negative elements in A.');
      }
    }
    r = [];
    ni = prod(sb.slice(0, axis));
    nj = sb[axis];
    nk = prod(sb.slice(axis + 1));
    for (i = 0; 0 <= ni ? i < ni : i > ni; 0 <= ni ? i++ : i--) {
      j = 0;
      for (_j = 0, _len2 = a.length; _j < _len2; _j++) {
        x = a[_j];
        if (x > 0) {
          for (_k = 0; 0 <= x ? _k < x : _k > x; 0 <= x ? _k++ : _k--) {
            for (k = 0; 0 <= nk ? k < nk : k > nk; 0 <= nk ? k++ : k--) {
              r.push(b[k + nk * (j + nj * i)]);
            }
          }
          j += isExpansive || isHyperexpansive;
        } else {
          for (_l = 0, _ref3 = -a[j] * nk; 0 <= _ref3 ? _l < _ref3 : _l > _ref3; 0 <= _ref3 ? _l++ : _l--) {
            r.push(0);
          }
          j += isExpansive;
        }
      }
    }
    return withShape(sr, r);
  };
  postfixOperator('/', function(a, b, axis) {
    if (axis == null) {
      axis = -1;
    }
    if (typeof a === 'function') {
      return reduce(a, void 0, axis);
    } else {
      return compressOrReplicate(a, b, axis);
    }
  });
  postfixOperator('⌿', function(a, b, axis) {
    if (axis == null) {
      axis = 0;
    }
    if (typeof a === 'function') {
      return reduce(a, void 0, axis);
    } else {
      return compressOrReplicate(a, b, axis);
    }
  });
  postfixOperator('¨', function(f) {
    return function(a, b) {
      var i, x, _i, _j, _k, _l, _len, _len2, _len3, _len4, _ref3, _ref4, _ref5, _results, _results2, _results3, _results4, _results5;
      if (!(b != null)) {
        _ref3 = arrayValueOf(a);
        _results = [];
        for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
          x = _ref3[_i];
          _results.push(f(x));
        }
        return _results;
      }
      if (isSimple(a)) {
        _ref4 = arrayValueOf(b);
        _results2 = [];
        for (_j = 0, _len2 = _ref4.length; _j < _len2; _j++) {
          x = _ref4[_j];
          _results2.push(f(a, x));
        }
        return _results2;
      }
      if (a.length === b.length) {
        _results3 = [];
        for (i = 0, _ref5 = a.length; 0 <= _ref5 ? i < _ref5 : i > _ref5; 0 <= _ref5 ? i++ : i--) {
          _results3.push(f(a[i], b[i]));
        }
        return _results3;
      }
      if (a.length === 1) {
        _results4 = [];
        for (_k = 0, _len3 = b.length; _k < _len3; _k++) {
          x = b[_k];
          _results4.push(f(a[0], x));
        }
        return _results4;
      }
      if (b.length === 1) {
        _results5 = [];
        for (_l = 0, _len4 = a.length; _l < _len4; _l++) {
          x = a[_l];
          _results5.push(f(x, b[0]));
        }
        return _results5;
      }
      throw Error('Length error');
    };
  });
  prefixOperator('∘.', outerProduct = function(f) {
    return function(a, b) {
      var r, x, y, _i, _j, _len, _len2;
      if (!(b != null)) {
        throw Error('Operator ∘. (Outer product) works only with dyadic functions');
      }
      a = arrayValueOf(a);
      b = arrayValueOf(b);
      r = [];
      for (_i = 0, _len = a.length; _i < _len; _i++) {
        x = a[_i];
        for (_j = 0, _len2 = b.length; _j < _len2; _j++) {
          y = b[_j];
          r.push(f(x, y));
        }
      }
      return withShape((shapeOf(a)).concat(shapeOf(b)), r);
    };
  });
  infixOperator('.', function(f, g) {
    var F, G;
    F = reduce(f);
    G = outerProduct(g);
    return function(a, b) {
      if (shapeOf(a).length > 1 || shapeOf(b).length > 1) {
        throw Error('Inner product operator (.) is implemented only for arrays of rank no more than 1.');
      }
      return F(g(a, b));
    };
  });
  postfixOperator('⍣', cps(function(f, _, _, callback) {
    if (typeof f !== 'function') {
      return function() {
        return callback0(Error('Left argument to ⍣ must be a function.'));
      };
    }
    f = cpsify(f);
    return function() {
      return callback(null, cps(function(n, _, _, callback1) {
        if (typeof n !== 'number' || n < 0 || n !== Math.floor(n)) {
          return function() {
            return callback(Error('Right argument to ⍣ must be a non-negative integer.'));
          };
        }
        return function() {
          return callback1(null, cps(function(a, _, _, callback2) {
            var F, i;
            i = 0;
            return F = function() {
              if (i < n) {
                return f(a, null, null, function(err, r) {
                  if (err) {
                    return function() {
                      return callback2(err);
                    };
                  }
                  a = r;
                  i++;
                  return F;
                });
              } else {
                return function() {
                  return callback2(null, a);
                };
              }
            };
          }));
        };
      }));
    };
  }));
  builtins['get_⍬'] = function() {
    return [];
  };
  builtins['get_⎕'] = function() {
    throw Error('Getter for ⎕ ("Evaluated input") not implemented');
  };
  builtins['set_⎕'] = function(x) {
    return process.stdout.write(format(x) + '\n');
  };
  builtins['get_⍞'] = function() {
    throw Error('Getter for ⍞ ("Raw input") not implemented');
  };
  builtins['set_⍞'] = function(x) {
    return process.stdout.write(format(x));
  };
}).call(this);