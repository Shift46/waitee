module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(13);
/******/ 	};
/******/ 	// initialize runtime
/******/ 	runtime(__webpack_require__);
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 13:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.until = exports.timer = exports.for = void 0;
const helpers_1 = __webpack_require__(685);
Object.defineProperty(exports, "for", { enumerable: true, get: function () { return helpers_1.sleep; } });
Object.defineProperty(exports, "timer", { enumerable: true, get: function () { return helpers_1.timer; } });
const until_1 = __webpack_require__(579);
const until = (param1, param2) => {
    if (param1 instanceof Function) {
        return new until_1.Until(param2 || null).condition(param1);
    }
    else {
        return new until_1.Until(param1);
    }
};
exports.until = until;


/***/ }),

/***/ 141:
/***/ (function(__unusedmodule, exports) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

var HAS_WEAKSET_SUPPORT = typeof WeakSet === 'function';
var keys = Object.keys;
/**
 * @function addToCache
 *
 * add object to cache if an object
 *
 * @param value the value to potentially add to cache
 * @param cache the cache to add to
 */
function addToCache(value, cache) {
    if (value && typeof value === 'object') {
        cache.add(value);
    }
}
/**
 * @function hasPair
 *
 * @description
 * does the `pairToMatch` exist in the list of `pairs` provided based on the
 * `isEqual` check
 *
 * @param pairs the pairs to compare against
 * @param pairToMatch the pair to match
 * @param isEqual the equality comparator used
 * @param meta the meta provided
 * @returns does the pair exist in the pairs provided
 */
function hasPair(pairs, pairToMatch, isEqual, meta) {
    var length = pairs.length;
    var pair;
    for (var index = 0; index < length; index++) {
        pair = pairs[index];
        if (isEqual(pair[0], pairToMatch[0], meta) &&
            isEqual(pair[1], pairToMatch[1], meta)) {
            return true;
        }
    }
    return false;
}
/**
 * @function hasValue
 *
 * @description
 * does the `valueToMatch` exist in the list of `values` provided based on the
 * `isEqual` check
 *
 * @param values the values to compare against
 * @param valueToMatch the value to match
 * @param isEqual the equality comparator used
 * @param meta the meta provided
 * @returns does the value exist in the values provided
 */
function hasValue(values, valueToMatch, isEqual, meta) {
    var length = values.length;
    for (var index = 0; index < length; index++) {
        if (isEqual(values[index], valueToMatch, meta)) {
            return true;
        }
    }
    return false;
}
/**
 * @function sameValueZeroEqual
 *
 * @description
 * are the values passed strictly equal or both NaN
 *
 * @param a the value to compare against
 * @param b the value to test
 * @returns are the values equal by the SameValueZero principle
 */
function sameValueZeroEqual(a, b) {
    return a === b || (a !== a && b !== b);
}
/**
 * @function isPlainObject
 *
 * @description
 * is the value a plain object
 *
 * @param value the value to test
 * @returns is the value a plain object
 */
function isPlainObject(value) {
    return value.constructor === Object || value.constructor == null;
}
/**
 * @function isPromiseLike
 *
 * @description
 * is the value promise-like (meaning it is thenable)
 *
 * @param value the value to test
 * @returns is the value promise-like
 */
function isPromiseLike(value) {
    return !!value && typeof value.then === 'function';
}
/**
 * @function isReactElement
 *
 * @description
 * is the value passed a react element
 *
 * @param value the value to test
 * @returns is the value a react element
 */
function isReactElement(value) {
    return !!(value && value.$$typeof);
}
/**
 * @function getNewCacheFallback
 *
 * @description
 * in cases where WeakSet is not supported, creates a new custom
 * object that mimics the necessary API aspects for cache purposes
 *
 * @returns the new cache object
 */
function getNewCacheFallback() {
    return Object.create({
        _values: [],
        add: function (value) {
            this._values.push(value);
        },
        has: function (value) {
            return this._values.indexOf(value) !== -1;
        },
    });
}
/**
 * @function getNewCache
 *
 * @description
 * get a new cache object to prevent circular references
 *
 * @returns the new cache object
 */
var getNewCache = (function (canUseWeakMap) {
    if (canUseWeakMap) {
        return function _getNewCache() {
            return new WeakSet();
        };
    }
    return getNewCacheFallback;
})(HAS_WEAKSET_SUPPORT);
/**
 * @function createCircularEqualCreator
 *
 * @description
 * create a custom isEqual handler specific to circular objects
 *
 * @param [isEqual] the isEqual comparator to use instead of isDeepEqual
 * @returns the method to create the `isEqual` function
 */
function createCircularEqualCreator(isEqual) {
    return function createCircularEqual(comparator) {
        var _comparator = isEqual || comparator;
        return function circularEqual(a, b, cache) {
            if (cache === void 0) { cache = getNewCache(); }
            var hasA = cache.has(a);
            var hasB = cache.has(b);
            if (hasA || hasB) {
                return hasA && hasB;
            }
            addToCache(a, cache);
            addToCache(b, cache);
            return _comparator(a, b, cache);
        };
    };
}
/**
 * @function toPairs
 *
 * @description
 * convert the map passed into pairs (meaning an array of [key, value] tuples)
 *
 * @param map the map to convert to [key, value] pairs (entries)
 * @returns the [key, value] pairs
 */
function toPairs(map) {
    var pairs = new Array(map.size);
    var index = 0;
    map.forEach(function (value, key) {
        pairs[index++] = [key, value];
    });
    return pairs;
}
/**
 * @function toValues
 *
 * @description
 * convert the set passed into values
 *
 * @param set the set to convert to values
 * @returns the values
 */
function toValues(set) {
    var values = new Array(set.size);
    var index = 0;
    set.forEach(function (value) {
        values[index++] = value;
    });
    return values;
}
/**
 * @function areArraysEqual
 *
 * @description
 * are the arrays equal in value
 *
 * @param a the array to test
 * @param b the array to test against
 * @param isEqual the comparator to determine equality
 * @param meta the meta object to pass through
 * @returns are the arrays equal
 */
function areArraysEqual(a, b, isEqual, meta) {
    var length = a.length;
    if (b.length !== length) {
        return false;
    }
    for (var index = 0; index < length; index++) {
        if (!isEqual(a[index], b[index], meta)) {
            return false;
        }
    }
    return true;
}
/**
 * @function areMapsEqual
 *
 * @description
 * are the maps equal in value
 *
 * @param a the map to test
 * @param b the map to test against
 * @param isEqual the comparator to determine equality
 * @param meta the meta map to pass through
 * @returns are the maps equal
 */
function areMapsEqual(a, b, isEqual, meta) {
    if (a.size !== b.size) {
        return false;
    }
    var pairsA = toPairs(a);
    var pairsB = toPairs(b);
    var length = pairsA.length;
    for (var index = 0; index < length; index++) {
        if (!hasPair(pairsB, pairsA[index], isEqual, meta) ||
            !hasPair(pairsA, pairsB[index], isEqual, meta)) {
            return false;
        }
    }
    return true;
}
var OWNER = '_owner';
var hasOwnProperty = Function.prototype.bind.call(Function.prototype.call, Object.prototype.hasOwnProperty);
/**
 * @function areObjectsEqual
 *
 * @description
 * are the objects equal in value
 *
 * @param a the object to test
 * @param b the object to test against
 * @param isEqual the comparator to determine equality
 * @param meta the meta object to pass through
 * @returns are the objects equal
 */
function areObjectsEqual(a, b, isEqual, meta) {
    var keysA = keys(a);
    var length = keysA.length;
    if (keys(b).length !== length) {
        return false;
    }
    var key;
    for (var index = 0; index < length; index++) {
        key = keysA[index];
        if (!hasOwnProperty(b, key)) {
            return false;
        }
        if (key === OWNER && isReactElement(a)) {
            if (!isReactElement(b)) {
                return false;
            }
        }
        else if (!isEqual(a[key], b[key], meta)) {
            return false;
        }
    }
    return true;
}
/**
 * @function areRegExpsEqual
 *
 * @description
 * are the regExps equal in value
 *
 * @param a the regExp to test
 * @param b the regExp to test agains
 * @returns are the regExps equal
 */
function areRegExpsEqual(a, b) {
    return (a.source === b.source &&
        a.global === b.global &&
        a.ignoreCase === b.ignoreCase &&
        a.multiline === b.multiline &&
        a.unicode === b.unicode &&
        a.sticky === b.sticky &&
        a.lastIndex === b.lastIndex);
}
/**
 * @function areSetsEqual
 *
 * @description
 * are the sets equal in value
 *
 * @param a the set to test
 * @param b the set to test against
 * @param isEqual the comparator to determine equality
 * @param meta the meta set to pass through
 * @returns are the sets equal
 */
function areSetsEqual(a, b, isEqual, meta) {
    if (a.size !== b.size) {
        return false;
    }
    var valuesA = toValues(a);
    var valuesB = toValues(b);
    var length = valuesA.length;
    for (var index = 0; index < length; index++) {
        if (!hasValue(valuesB, valuesA[index], isEqual, meta) ||
            !hasValue(valuesA, valuesB[index], isEqual, meta)) {
            return false;
        }
    }
    return true;
}

var isArray = Array.isArray;
var HAS_MAP_SUPPORT = typeof Map === 'function';
var HAS_SET_SUPPORT = typeof Set === 'function';
var OBJECT_TYPEOF = 'object';
function createComparator(createIsEqual) {
    var isEqual = 
    /* eslint-disable no-use-before-define */
    typeof createIsEqual === 'function'
        ? createIsEqual(comparator)
        : comparator;
    /* eslint-enable */
    /**
     * @function comparator
     *
     * @description
     * compare the value of the two objects and return true if they are equivalent in values
     *
     * @param a the value to test against
     * @param b the value to test
     * @param [meta] an optional meta object that is passed through to all equality test calls
     * @returns are a and b equivalent in value
     */
    function comparator(a, b, meta) {
        if (sameValueZeroEqual(a, b)) {
            return true;
        }
        if (a && b && typeof a === OBJECT_TYPEOF && typeof b === OBJECT_TYPEOF) {
            if (isPlainObject(a) && isPlainObject(b)) {
                return areObjectsEqual(a, b, isEqual, meta);
            }
            var arrayA = isArray(a);
            var arrayB = isArray(b);
            if (arrayA || arrayB) {
                return arrayA === arrayB && areArraysEqual(a, b, isEqual, meta);
            }
            var aDate = a instanceof Date;
            var bDate = b instanceof Date;
            if (aDate || bDate) {
                return aDate === bDate && sameValueZeroEqual(a.getTime(), b.getTime());
            }
            var aRegExp = a instanceof RegExp;
            var bRegExp = b instanceof RegExp;
            if (aRegExp || bRegExp) {
                return aRegExp === bRegExp && areRegExpsEqual(a, b);
            }
            if (isPromiseLike(a) || isPromiseLike(b)) {
                return a === b;
            }
            if (HAS_MAP_SUPPORT) {
                var aMap = a instanceof Map;
                var bMap = b instanceof Map;
                if (aMap || bMap) {
                    return aMap === bMap && areMapsEqual(a, b, isEqual, meta);
                }
            }
            if (HAS_SET_SUPPORT) {
                var aSet = a instanceof Set;
                var bSet = b instanceof Set;
                if (aSet || bSet) {
                    return aSet === bSet && areSetsEqual(a, b, isEqual, meta);
                }
            }
            return areObjectsEqual(a, b, isEqual, meta);
        }
        return false;
    }
    return comparator;
}

// comparator
var deepEqual = createComparator();
var shallowEqual = createComparator(function () { return sameValueZeroEqual; });
var circularDeepEqual = createComparator(createCircularEqualCreator());
var circularShallowEqual = createComparator(createCircularEqualCreator(sameValueZeroEqual));

exports.circularDeepEqual = circularDeepEqual;
exports.circularShallowEqual = circularShallowEqual;
exports.createCustomEqual = createComparator;
exports.deepEqual = deepEqual;
exports.sameValueZeroEqual = sameValueZeroEqual;
exports.shallowEqual = shallowEqual;
//# sourceMappingURL=fast-equals.cjs.js.map


/***/ }),

/***/ 157:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* module decorator */ module = __webpack_require__.nmd(module);

var windowOrGlobal = Function('return this')();
(function (root) {
    /* istanbul ignore next */
    if (true) {
        /* istanbul ignore next */
        if ( true && module && module.exports) {
            exports = module.exports = clone;
        }
        exports.clone = clone;
    }
    else {}
    function clone(value) {
        var type = typeof value;
        switch (type) {
            case 'object':
                // null and undefined
                if (value == null) {
                    return value;
                }
                var result = void 0;
                if (value instanceof Date) {
                    result = new Date();
                    result.setTime(value.getTime());
                    return result;
                }
                else if (value instanceof RegExp) {
                    result = newRegExp(value);
                    return result;
                }
                result = JSON.parse(JSON.stringify(value));
                fixTypes(value, result);
                return result;
            default:
                return value;
        }
    }
    function fixPropertyValue(original, copy, key) {
        var originalValue = original[key];
        var originalType = typeof originalValue;
        switch (originalType) {
            case 'object':
                if (originalValue instanceof Date) {
                    var newValue = new Date();
                    newValue.setTime(originalValue.getTime());
                    copy[key] = newValue;
                }
                else if (originalValue instanceof RegExp) {
                    copy[key] = newRegExp(originalValue);
                }
                else if (originalValue == null) {
                    copy[key] = originalValue;
                }
                else {
                    fixTypes(originalValue, copy[key]);
                }
                break;
            case 'number':
                if (isNaN(originalValue)) {
                    copy[key] = NaN;
                }
                else if (originalValue == Infinity) {
                    copy[key] = Infinity;
                }
                break;
            default:
                break;
        }
    }
    function fixTypes(original, copy) {
        if (original instanceof Array) {
            for (var index = 0; index < original.length; index++) {
                fixPropertyValue(original, copy, index);
            }
        }
        else {
            var keys = Object.getOwnPropertyNames(original);
            keys.forEach(function (key) {
                fixPropertyValue(original, copy, key);
            });
        }
    }
    function newRegExp(value) {
        var regexpText = String(value);
        var slashIndex = regexpText.lastIndexOf('/');
        return new RegExp(regexpText.slice(1, slashIndex), regexpText.slice(slashIndex + 1));
    }
})(windowOrGlobal);


/***/ }),

/***/ 499:
/***/ (function(__unusedmodule, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Options = void 0;
class Options {
    constructor() {
        this._for = Infinity;
        this._attempts = Infinity;
        this._interval = 100;
        this._a = null;
        this._b = null;
        this._throwError = true;
    }
    get for() {
        return this._for;
    }
    set for(value) {
        this._for = value || Infinity;
    }
    get attempts() {
        return this._attempts;
    }
    set attempts(value) {
        this._attempts = value || Infinity;
    }
    get interval() {
        return this._interval;
    }
    set interval(value) {
        this._interval = value;
    }
    get a() {
        return this._a;
    }
    set a(value) {
        this._a = value;
    }
    get b() {
        return this._b;
    }
    set b(value) {
        this._b = value;
    }
    get throwError() {
        return this._throwError;
    }
    set throwError(value) {
        this._throwError = value;
    }
    setDefaults() {
        this._for = Infinity;
        this._attempts = Infinity;
        this._interval = 100;
        this._a = null;
        this._b = null;
        this._throwError = true;
    }
    parse(opts) {
        this._for = opts.for || Infinity;
        this._attempts = opts.attempts || Infinity;
        this._interval = opts.interval || 100;
        this._a = opts.a || null;
        this._b = opts.b || null;
        this._throwError = opts.throwError || true;
    }
}
exports.Options = Options;


/***/ }),

/***/ 568:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actions = void 0;
const fast_equals_1 = __webpack_require__(141);
const options_1 = __webpack_require__(499);
const until_1 = __webpack_require__(579);
class Actions {
    constructor(opts) {
        this.opts = new options_1.Options();
        this.opts = opts;
    }
    greater() {
        return () => __awaiter(this, void 0, void 0, function* () { return (yield until_1.Until.calculate(this.opts.a)) > (yield until_1.Until.calculate(this.opts.b)); });
    }
    greaterOrEqual() {
        return () => __awaiter(this, void 0, void 0, function* () { return (yield until_1.Until.calculate(this.opts.a)) >= (yield until_1.Until.calculate(this.opts.b)); });
    }
    less() {
        return () => __awaiter(this, void 0, void 0, function* () { return (yield until_1.Until.calculate(this.opts.a)) < (yield until_1.Until.calculate(this.opts.b)); });
    }
    lessOrEqual() {
        return () => __awaiter(this, void 0, void 0, function* () { return (yield until_1.Until.calculate(this.opts.a)) <= (yield until_1.Until.calculate(this.opts.b)); });
    }
    equals() {
        return () => __awaiter(this, void 0, void 0, function* () { return fast_equals_1.deepEqual(yield until_1.Until.calculate(this.opts.a), yield until_1.Until.calculate(this.opts.b)); });
    }
    error() {
        return () => __awaiter(this, void 0, void 0, function* () { return yield until_1.Until.calculate(this.opts.a).then(() => false).catch(() => true); });
    }
    noError() {
        return () => __awaiter(this, void 0, void 0, function* () { return yield until_1.Until.calculate(this.opts.a).then(() => true).catch(() => false); });
    }
    isTrue() {
        return () => __awaiter(this, void 0, void 0, function* () { return (yield until_1.Until.calculate(this.opts.a)) === true; });
    }
    isFalse() {
        return () => __awaiter(this, void 0, void 0, function* () { return (yield until_1.Until.calculate(this.opts.a)) === false; });
    }
}
exports.Actions = Actions;


/***/ }),

/***/ 579:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Until = void 0;
const clone = __webpack_require__(157);
const fast_equals_1 = __webpack_require__(141);
const options_1 = __webpack_require__(499);
const helpers_1 = __webpack_require__(685);
const actions_1 = __webpack_require__(568);
class Until {
    constructor(param) {
        this.opts = new options_1.Options();
        this.actions = new actions_1.Actions(this.opts);
        if (param) {
            this.opts.parse(param);
        }
    }
    static calculate(a) {
        return __awaiter(this, void 0, void 0, function* () {
            return typeof a === 'function' ? (a.constructor.name === "AsyncFunction" ? yield a() : a()) : a;
        });
    }
    ;
    checker(f) {
        return __awaiter(this, void 0, void 0, function* () {
            let i = 0;
            let end = Date.now() + this.opts.for;
            while (i++ < this.opts.attempts && Date.now() < end) {
                if (yield f()) {
                    return true;
                }
                yield helpers_1.sleep(this.opts.interval);
            }
            if (this.opts.throwError) {
                throw new Error('Too long to wait');
            }
            else {
                return false;
            }
        });
    }
    ;
    defineVariables(a, b, needOne = false) {
        if (typeof a !== "undefined" && typeof b !== "undefined") {
            this.opts.a = a;
            this.opts.b = b;
        }
        else if (typeof a !== "undefined" && !helpers_1.exists(this.opts.a)) {
            this.opts.a = a;
        }
        else if (typeof a !== "undefined" && !helpers_1.exists(this.opts.b) && !needOne) {
            this.opts.b = a;
        }
        if (!helpers_1.exists(this.opts.b) && !needOne) {
            return (fn) => {
                return {
                    b: (b) => {
                        this.opts.b = b;
                        return fn();
                    }
                };
            };
        }
    }
    for(time) {
        this.opts.for = time;
        return this;
    }
    attempts(times) {
        this.opts.attempts = times;
        return this;
    }
    interval(interval) {
        this.opts.interval = interval;
        return this;
    }
    throwError(value) {
        this.opts.throwError = value;
        return this;
    }
    a(param) {
        this.opts.a = param;
        return this;
    }
    b(param) {
        this.opts.b = param;
        return this;
    }
    update(a) {
        return __awaiter(this, void 0, void 0, function* () {
            this.opts.a = this.opts.a || a;
            this.opts.b = clone(yield Until.calculate(this.opts.a));
            return this.checker(() => __awaiter(this, void 0, void 0, function* () { return !fast_equals_1.deepEqual(this.opts.b, yield Until.calculate(this.opts.a)); }));
        });
    }
    condition(param) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.checker(() => __awaiter(this, void 0, void 0, function* () { return yield Until.calculate(param); }));
        });
    }
    greater(a, b) {
        let bRequest = this.defineVariables(a, b);
        const fn = () => this.checker(this.actions.greater());
        if (bRequest) {
            return bRequest(fn);
        }
        if (!helpers_1.exists(this.opts.a) || !helpers_1.exists(this.opts.b)) {
            throw new Error('You need to define variables');
        }
        return fn();
    }
    gt(a, b) {
        return this.greater(a, b);
    }
    greaterOrEqual(a, b) {
        let bRequest = this.defineVariables(a, b);
        const fn = () => this.checker(this.actions.greaterOrEqual());
        if (bRequest) {
            return bRequest(fn);
        }
        if (!helpers_1.exists(this.opts.a) || !helpers_1.exists(this.opts.b)) {
            throw new Error('You need to define variables');
        }
        return fn();
    }
    gte(a, b) {
        return this.greater(a, b);
    }
    less(a, b) {
        let bRequest = this.defineVariables(a, b);
        const fn = () => this.checker(this.actions.less());
        if (bRequest) {
            return bRequest(fn);
        }
        if (!helpers_1.exists(this.opts.a) || !helpers_1.exists(this.opts.b)) {
            throw new Error('You need to define variables');
        }
        return fn();
    }
    lt(a, b) {
        return this.greater(a, b);
    }
    lessOrEqual(a, b) {
        let bRequest = this.defineVariables(a, b);
        const fn = () => this.checker(this.actions.lessOrEqual());
        if (bRequest) {
            return bRequest(fn);
        }
        if (!helpers_1.exists(this.opts.a) || !helpers_1.exists(this.opts.b)) {
            throw new Error('You need to define variables');
        }
        return fn();
    }
    lte(a, b) {
        return this.greater(a, b);
    }
    equals(a, b) {
        let bRequest = this.defineVariables(a, b);
        const fn = () => this.checker(this.actions.equals());
        if (bRequest) {
            return bRequest(fn);
        }
        if (!helpers_1.exists(this.opts.a) || !helpers_1.exists(this.opts.b)) {
            throw new Error('You need to define variables');
        }
        return fn();
    }
    eq(a, b) {
        return this.greater(a, b);
    }
    error(a) {
        this.defineVariables(a, null, true);
        if (!helpers_1.exists(this.opts.a)) {
            throw new Error('You need to define variable');
        }
        return this.checker(this.actions.error());
    }
    noError(a) {
        this.defineVariables(a, null, true);
        if (!helpers_1.exists(this.opts.a)) {
            throw new Error('You need to define variable');
        }
        return this.checker(this.actions.noError());
    }
    date(a) {
        this.defineVariables(a, null, true);
        if (!helpers_1.exists(this.opts.a)) {
            throw new Error('You need to define variable');
        }
        let time = this.opts.a instanceof Date ? this.opts.a.getTime() : this.opts.a;
        return helpers_1.sleep(Date.now() - time);
    }
    isTrue(a) {
        this.defineVariables(a, null, true);
        if (!helpers_1.exists(this.opts.a)) {
            throw new Error('You need to define variable');
        }
        return this.checker(this.actions.isTrue());
    }
    isFalse(a) {
        this.defineVariables(a, null, true);
        if (!helpers_1.exists(this.opts.a)) {
            throw new Error('You need to define variable');
        }
        return this.checker(this.actions.isFalse());
    }
}
exports.Until = Until;


/***/ }),

/***/ 685:
/***/ (function(__unusedmodule, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.exists = exports.timer = exports.sleep = void 0;
const sleep = (time) => new Promise(r => setTimeout(r, time));
exports.sleep = sleep;
const timer = (instantStart = true) => {
    let start_time;
    const start = () => {
        start_time = Date.now();
    };
    const stop = () => {
        return Date.now() - start_time;
    };
    if (instantStart) {
        start();
        return {
            stop
        };
    }
    else {
        return {
            start,
            stop
        };
    }
};
exports.timer = timer;
const exists = (a) => a !== undefined && a !== null;
exports.exists = exists;


/***/ })

/******/ },
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	!function() {
/******/ 		__webpack_require__.nmd = function(module) {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'loaded', {
/******/ 				enumerable: true,
/******/ 				get: function() { return module.l; }
/******/ 			});
/******/ 			Object.defineProperty(module, 'id', {
/******/ 				enumerable: true,
/******/ 				get: function() { return module.i; }
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ }
);