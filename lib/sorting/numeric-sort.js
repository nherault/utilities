"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function merge(left, right) {
    var result = [];
    while (left.length > 0 && right.length > 0) {
        if (left[0] < right[0]) {
            result.push(left.shift());
        }
        else {
            result.push(right.shift());
        }
    }
    return result.concat(left).concat(right);
}
exports.merge = merge;
;
function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    var middle = Math.floor(arr.length / 2);
    var left = arr.slice(0, middle);
    var right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}
exports.mergeSort = mergeSort;
;
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    var pivot = arr.splice(Math.floor(arr.length / 2), 1)[0];
    var left = [];
    var right = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        }
        else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([pivot], quickSort(right));
}
exports.quickSort = quickSort;
;
function bubbleSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    for (var i = arr.length - 1; i > 0; i--) {
        for (var j = i - 1; j >= 0; j--) {
            if (arr[j] < arr[j - 1]) {
                var tmp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = tmp;
            }
        }
    }
    return arr;
}
exports.bubbleSort = bubbleSort;
;
function selectSort(arr) {
    var min, tmp;
    for (var i = 0; i < arr.length; i++) {
        min = i;
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[min] > arr[j]) {
                min = j;
            }
        }
        if (min != i) {
            tmp = arr[i];
            arr[i] = arr[min];
            arr[min] = tmp;
        }
    }
    return arr;
}
exports.selectSort = selectSort;
;
function insertSort(arr) {
    for (var i = 1; i < arr.length; i++) {
        var tmp = arr[i], j = i;
        while (arr[j - 1] > tmp) {
            arr[j] = arr[j - 1];
            --j;
        }
        arr[j] = tmp;
    }
    return arr;
}
exports.insertSort = insertSort;
;
//# sourceMappingURL=../../src/src/sorting/numeric-sort.js.map