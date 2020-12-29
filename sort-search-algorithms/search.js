/*
 * @Description: 
 * @Author: forceddd
 * @Date: 2020-12-19 14:34:25
 * @LastEditors: forceddd
 * @LastEditTime: 2020-12-29 22:07:04
 */
/*
 * @Description:
 * @Author: forceddd
 * @Date: 2020-12-19 14:34:25
 * @LastEditors: forceddd
 * @LastEditTime: 2020-12-19 16:14:01
 */
import { defaultCompare, Compare, defaultEquals, defaultDiff, swap } from '../util.js'
const DO_NOT_EXIST = -1;
// 顺序搜索 线性搜索 最低效
export const sequentialSearch = (arr, value, equals = defaultEquals) => {
    for (let i = 0; i < arr.length; i++) {
        if (equals(arr[i], value)) return i;
    }
    return DO_NOT_EXIST;
}

//二分搜索法 要求数组必须有序
export const binarySearch = (arr, value, compare = defaultCompare) => {
    let low = 0, high = arr.length - 1;
    //low>high时 表示找不到
    while (low <= high) {
        const middle = Math.floor((low + high) / 2),
            diff = compare(arr[middle], value);
        if (diff === Compare.LESS_THAN) low = middle + 1
        else if (diff === Compare.BIGGER_THAN) high = middle - 1
        else return middle;
    }
    return DO_NOT_EXIST
}

//内插搜索 改良版二分搜索法 通过计算value 在low~high区间的比例  来尽量的使计算的position靠近value
//而不是始终以middle值来查找
export const interpolationSearch = (arr, value, compare = defaultCompare, diff = defaultDiff) => {
    let low = 0, high = arr.length - 1, delta = -1;
    while (low <= high) {
        delta = diff(value, arr[low]) / diff(arr[high], arr[low]);
        //根据比例系数delta 找出靠近value的position
        const position = low + Math.floor((high - low) * delta),
            element = arr[position],
            difference = compare(element, value);
        if (difference === Compare.EQUALS) {
            return position;
        }
        else if (difference === Compare.LESS_THAN) low = position + 1;
        else high = position - 1;
    }
    return DO_NOT_EXIST;
}

//随机算法 
export const shuffle = arr => {
    for (let i = arr.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        console.log('i: ', i, 'random: ', randomIndex);
        swap(i, randomIndex, arr);
    }
    return arr;
}
