/*
 * @Description: 
 * @Author: forceddd
 * @Date: 2020-12-16 20:47:15
 * @LastEditors: forceddd
 * @LastEditTime: 2020-12-16 21:37:36
 */
import { swap, defaultCompare, Compare } from '../util.js';

//冒泡排序 bubbleSort O(n**2)
export const bubbleSort = (arr, compare = defaultCompare) => {
    const { length } = arr;
    //外循环从数组第一位迭代到最后一位
    for (let i = 0; i < length; i++) {
        //内循环比较当前项和下一项的大小
        for (let j = 0; j < length - 1 - i; j++) {
            //如果当前项大于下一项，二者交换位置
            compare(arr[j], arr[j + 1]) === Compare.BIGGER_THAN && swap(j, j + 1, arr);
        }
    }
    return arr;
}

//选择排序 selectionSort O(n**2)
export const selectionSort = (arr, compare = defaultCompare) => {
    const { length } = arr;
    let minIndex;//最小值的下标
    //外循环控制迭代轮次 length-1次
    for (let i = 0; i < length - 1; i++) {
        minIndex = i;//假设迭代起始位置为最小值
        //内循环用来找出本轮真正的最小值 从i处开始迭代 i之前的已经排好序
        for (let j = i; j < length; j++) {
            if (compare(arr[minIndex], arr[j]) === Compare.BIGGER_THAN) minIndex = j;
        }
        //比较之后 如果找到了更小的值，将二者互换位置
        i !== minIndex && swap(i, minIndex, arr);
    }
    return arr;
}
//插入排序 insertionSort
export const insertionSort = (arr, compare = defaultCompare) => {
    const { length } = arr;
    let temp;//用于数组交换位置的中间值
    //外循环控制迭代 假设第一项已经有序，从第二项开始迭代
    for (let i = 1; i < length; i++) {
        let j = i;
        temp = arr[j];//存储当前迭代项的值
        //将当前项 和前一项进行比较 看应该插入到左边还是右边
        while (j > 0 && compare(arr[j - 1], temp) === Compare.BIGGER_THAN) {
            //当左侧的值大于当前项的值时，将左侧的值移到当前项位置，然后继续比较
            arr[j] = arr[j - 1];
            // 将j递减 继续比较更前一项 以找到合适的插入位置 
            j--;
        }
        //当j=0时说明到了数组第一位，再往前已经没有元素，直接插入即可；当前一项的值小于temp时，说明找到了合适位置
        arr[j] = temp;

    }
    return arr;
}
//归并排序 O(n *log(n))
//归并排序合并函数
export const merge = (left, right, compare) => {
    let i = 0,
        j = 0;//创建两个下标，用来依次比较left元素和right元素的大小
    const result = [];//储存结果的数组
    //比较两个数组，按照大小逐次添加到结果数组中，最终left或者right会有一方全部被添加到result
    while (i < left.length && j < right.length) {
        result.push(compare(left[i], right[j]) === Compare.LESS_THAN ? left[i++] : right[j++]);
    }
    //把另一方剩余的元素添加到结果数组中
    return result.concat(i < left.length ? left.slice(i) : right.slice(j));
}
export const mergeSort = (arr, compare = defaultCompare) => {
    //将数组切成单个元素数组
    const { length } = arr;
    if (length > 1) {
        const middle = Math.floor(length / 2);
        const left = mergeSort(arr.slice(0, middle), compare)
        const right = mergeSort(arr.slice(middle), compare);
        //将拆分后的数组排序合并
        arr = merge(left, right, compare)
    }
    return arr
}