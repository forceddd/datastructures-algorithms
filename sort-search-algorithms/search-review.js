import { defaultCompare, Compare, swap } from '../util.js'

export const binarySearch = (arr, value, compare = defaultCompare) => {
    return binary(arr, value, compare)
}
const binary = (arr, value, compare, low = 0, high = arr.length - 1) => {
    if (low <= high) {
        let mid = Math.floor((low + high) / 2);
        const element = arr[mid],
            diff = compare(value, element);
        if (diff === Compare.EQUALS) return mid;
        else if (diff === Compare.BIGGER_THAN) return binary(arr, value, compare, mid + 1, high);
        else return binary(arr, value, compare, low, mid - 1)
    }
    return -1;
}

export const interpolationSearch = (arr, value, compare = defaultCompare) => {
    return interpolation(arr, value, compare)
}
const interpolation = (arr, value, compare, low = 0, high = arr.length - 1) => {
    if (low <= high) {
        let del = (value - arr[low]) / (arr[high] - arr[low]),
            position = low + Math.floor(del * (high - low));

        const diff = compare(value, arr[position]);
        console.log(del, diff);
        if (diff === Compare.EQUALS) return position;
        else if (diff === Compare.BIGGER_THAN) return interpolation(arr, value, compare, position + 1, high);
        else return interpolation(arr, value, compare, low, position - 1);

    }
    return -1;
}

export const shuffle = arr => {
    for (let i = arr.length - 1; i >= 1; i--) {
        //i=0时 只有一个元素 没必要再随机
        const random = Math.floor(Math.random() * (i + 1)) //  0<=random<=i
        swap(i, random, arr);
    }
    return arr;
}