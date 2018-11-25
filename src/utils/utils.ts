import { MinMax } from "../types/commons.types";

export const addListener = (elOrQuerySelector: string|HTMLElement, eventType: string, callback: EventListenerOrEventListenerObject) => {
    let el: HTMLElement|null = typeof elOrQuerySelector === 'string' ? document.querySelector(elOrQuerySelector) : elOrQuerySelector;
    if (el) {
        el.addEventListener(eventType, callback);
    }
};

// Logs
// export const logErr = (value: string) => process.env.NODE_ENV !== 'production' ? console.error(value) : undefined;
// export const logWarn = (value: string) => process.env.NODE_ENV !== 'production' ? console.warn(value) : undefined;
// export const logDebug = (value: string) => process.env.NODE_ENV !== 'production' ? console.debug(value) : undefined;

export const copy = (value: any) => JSON.parse(JSON.stringify(value));
export const featureFlag = (flag: boolean, featureFn: Function) => flag ? featureFn() : undefined;
export const getOrDefault = (value: any, defaultValue: any) => value === undefined ? defaultValue : value;
export const randomNumber = (number: number) => Math.random()*number;
export const randomMinMax = ({min, max}: MinMax) => min + Math.random()*(max - min);
export const randomArray = (array: any[]) => array[Math.floor(Math.random()*array.length)];
export const objectOrDefault = (value: Object|any, objectFunction: (value: any) => any, defaultFunction: (value: any) => any) =>
    typeof value === 'object' ? objectFunction(value) : defaultFunction(value);
export const arrayOrDefault = (value: any[]|any, arrayFunction: (value: any) => any, defaultFunction: (value: any) => any) =>
    Array.isArray(value) ? arrayFunction(value) : defaultFunction(value);
export const identity = (value: any): any => value;
export const safeBoolean = (value: any) => {
    return value === undefined || (typeof value === 'function' ? value() : value);
};
export const safeCompute = (computeFunction: Function) => {
    if (computeFunction) {
        computeFunction();
    }
};
export const computeOrDefault = (value: any, computeFunction: Function, defaultValue: any): any => value === undefined ? defaultValue : computeFunction(value);
export const radToDeg = (value: number) => value*180/Math.PI;
export const degToRad = (value: number) => value*Math.PI/180;
export const sortWithOrder = (obj1: {order?: number}, obj2: {order?: number}) => {
    if (obj1 === undefined || obj1.order === undefined) {
        return -1;
    } else if (obj2 === undefined || obj2.order === undefined) {
        return 1;
    } else {
        return obj1.order - obj2.order;
    }
};

export const compose = (...fns: Function[]) => fns.reduce((f, g) => (...args: any) => f(g(...args)));

export const curry = ( fn: Function ) => {
    const arity = fn.length;
    return (function resolver() {
        const memory = Array.prototype.slice.call( arguments );
      return function(): any {
        const local = memory.slice();
        let next;
        Array.prototype.push.apply( local, arguments );
        next = local.length >= arity ? fn : resolver;
        return next.apply( null, local );
      };
    }());
  }