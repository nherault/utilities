export var addListener = function (elOrQuerySelector, eventType, callback) {
    var el = typeof elOrQuerySelector === 'string' ? document.querySelector(elOrQuerySelector) : elOrQuerySelector;
    if (el) {
        el.addEventListener(eventType, callback);
    }
};
// Logs
// export const logErr = (value: string) => process.env.NODE_ENV !== 'production' ? console.error(value) : undefined;
// export const logWarn = (value: string) => process.env.NODE_ENV !== 'production' ? console.warn(value) : undefined;
// export const logDebug = (value: string) => process.env.NODE_ENV !== 'production' ? console.debug(value) : undefined;
export var copy = function (value) { return JSON.parse(JSON.stringify(value)); };
export var featureFlag = function (flag, featureFn) { return flag ? featureFn() : undefined; };
export var getOrDefault = function (value, defaultValue) { return value === undefined ? defaultValue : value; };
export var randomNumber = function (number) { return Math.random() * number; };
export var randomMinMax = function (_a) {
    var min = _a.min, max = _a.max;
    return min + Math.random() * (max - min);
};
export var randomArray = function (array) { return array[Math.floor(Math.random() * array.length)]; };
export var objectOrDefault = function (value, objectFunction, defaultFunction) {
    return typeof value === 'object' ? objectFunction(value) : defaultFunction(value);
};
export var arrayOrDefault = function (value, arrayFunction, defaultFunction) {
    return Array.isArray(value) ? arrayFunction(value) : defaultFunction(value);
};
export var identity = function (value) { return value; };
export var safeBoolean = function (value) {
    return value === undefined || (typeof value === 'function' ? value() : value);
};
export var safeCompute = function (computeFunction) {
    if (computeFunction) {
        computeFunction();
    }
};
export var computeOrDefault = function (value, computeFunction, defaultValue) { return value === undefined ? defaultValue : computeFunction(value); };
export var radToDeg = function (value) { return value * 180 / Math.PI; };
export var degToRad = function (value) { return value * Math.PI / 180; };
export var sortWithOrder = function (obj1, obj2) {
    if (obj1 === undefined || obj1.order === undefined) {
        return -1;
    }
    else if (obj2 === undefined || obj2.order === undefined) {
        return 1;
    }
    else {
        return obj1.order - obj2.order;
    }
};
export var compose = function () {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return fns.reduce(function (f, g) { return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return f(g.apply(void 0, args));
    }; });
};
export var curry = function (fn) {
    var arity = fn.length;
    return (function resolver() {
        var memory = Array.prototype.slice.call(arguments);
        return function () {
            var local = memory.slice();
            var next;
            Array.prototype.push.apply(local, arguments);
            next = local.length >= arity ? fn : resolver;
            return next.apply(null, local);
        };
    }());
};
//# sourceMappingURL=../../src/src/utils/utils.js.map