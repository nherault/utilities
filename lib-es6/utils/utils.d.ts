import { MinMax } from "../types/commons.types";
export declare const addListener: (elOrQuerySelector: string | HTMLElement, eventType: string, callback: EventListenerOrEventListenerObject) => void;
export declare const copy: (value: any) => any;
export declare const featureFlag: (flag: boolean, featureFn: Function) => any;
export declare const getOrDefault: (value: any, defaultValue: any) => any;
export declare const randomNumber: (number: number) => number;
export declare const randomMinMax: ({ min, max }: MinMax) => number;
export declare const randomArray: (array: any[]) => any;
export declare const objectOrDefault: (value: any, objectFunction: (value: any) => any, defaultFunction: (value: any) => any) => any;
export declare const arrayOrDefault: (value: any, arrayFunction: (value: any) => any, defaultFunction: (value: any) => any) => any;
export declare const identity: (value: any) => any;
export declare const safeBoolean: (value: any) => any;
export declare const safeCompute: (computeFunction: Function) => void;
export declare const computeOrDefault: (value: any, computeFunction: Function, defaultValue: any) => any;
export declare const radToDeg: (value: number) => number;
export declare const degToRad: (value: number) => number;
export declare const sortWithOrder: (obj1: {
    order?: number | undefined;
}, obj2: {
    order?: number | undefined;
}) => number;
export declare const compose: (...fns: Function[]) => Function;
export declare const curry: (fn: Function) => () => any;
