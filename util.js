/*
 * @Description: 
 * @Author: forceddd
 * @Date: 2020-11-27 20:58:48
 * @LastEditors: forceddd
 * @LastEditTime: 2020-11-29 15:32:13
 */
export const defaultEquals = (a, b) => a === b;
export const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
}
export const defaultCompare = (a, b) => {
    if (a === b) return 0;
    return a > b ? Compare.BIGGER_THAN : Compare.LESS_THAN;
}
export const defaultToString = item => {
    if (item === null) {
        return 'NULL'
    } else if (item === undefined) {
        return 'UNDEFINED'
    } else if (typeof item === 'string' || item instanceof String) {
        return `${item}string`
    } else if (typeof item === 'object') {
        return JSON.stringify(item)//将对象转成字符串返回 否则默认是[object Object] 不友好
    } else {
        return item + typeof item
    }
}

export const swap = (child, parent, heap) => [heap[parent], heap[child]] = [heap[child], heap[parent]];