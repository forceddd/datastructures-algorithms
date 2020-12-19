/*
 * @Description: 
 * @Author: forceddd
 * @Date: 2020-12-18 21:18:08
 * @LastEditors: forceddd
 * @LastEditTime: 2020-12-19 11:15:03
 */
import { swap, defaultCompare, Compare } from '../util.js';

//1. bubbleSort O(n**2)
export const bubbleSort = (arr, compare = defaultCompare) => {
    const { length } = arr;
    for (let i = 0; i < length - 1; i++) {
        for (let j = 0; j < length - 1 - i; j++) {
            compare(arr[j], arr[j + 1]) === Compare.BIGGER_THAN && swap(j, j + 1, arr);
        }
    }
    return arr;
}

//2. insertionSort
//假设第一项已经是有序的，从第二项开始，和前一项比较大小，确定应该插入的位置,直到找到合适位置或者到达数组起始点
// export const insertionSort=(arr,compare=defaultCompare)=>{
//     for(let i=1;i<arr.length;i++){
//         let j=i;
//         while(j>0&&compare(arr[j],arr[j-1])===Compare.LESS_THAN){
//             swap(j,j-1,arr);
//             j--;
//         }
//         count++;
//     }
//     return arr
// }
//没有必要每次交换 j 和 j-1 只需要再找到正确位置后 给j赋值  就可以了
export const insertionSort = (arr, compare = defaultCompare) => {
    for (let i = 1; i < arr.length; i++) {
        const temp = arr[i];//暂存当前要插入的值 在找到合适位置后插入
        let j = i;
        //因为在while只将arr[i]设为了arr[j-1],没有改变 j-1的值 所以要使用temp来比较，不能向上面一样直接 j 和j-1比较
        while (j > 0 && compare(temp, arr[j - 1]) === Compare.LESS_THAN) {
            arr[j] = arr[j - 1];
            j--;
        }
        //找到合适位置后 赋值一次就可以了
        arr[j] = temp;
    }
}

//3. selectionSort O(n**2)
//先从第一位开始，选择出数组中的最小值，然后将最小值和第一位交换位置 ，接着从第二位开始查找最小值
export const selectionSort = (arr, compare = defaultCompare) => {
    //和冒泡排序相同，外层循环控制迭代次数，当迭代i=length-2，j=length -1
    const { length } = arr;
    for (let i = 0; i < length - 1; i++) {
        let minIndex = i;
        //内层循环j 从i+1处开始
        for (let j = i + 1; j < length; j++) {
            if (compare(arr[minIndex], arr[j]) === Compare.BIGGER_THAN) minIndex = j;
        }
        i != minIndex && swap(i, minIndex, arr)
    }
    return arr;
}

//quickSort 
const partition = (left, right, arr, compare) => {
    const pivot = arr[Math.floor((left + right) / 2)];
    let i = left, j = right;
    while (i < j) {
        while (compare(arr[i], pivot) === Compare.LESS_THAN) i++;
        while (compare(arr[j], pivot) === Compare.BIGGER_THAN) j--;
        if (i <= j) {
            i < j && swap(i, j, arr);
            i++;
            j--;
        }
    }
    return i;
}
const quick = (left, right, arr, compare) => {
    // if (arr.length < 2) return arr;
    let partIndex = partition(left, right, arr, compare);
    left < partIndex - 1 && quick(left, partIndex - 1, arr, compare);
    partIndex < right && quick(partIndex, right, arr, compare);
    return arr;
}
export const quickSort = (arr, compare = defaultCompare) => {
    return quick(0, arr.length - 1, arr, compare);
}

//mergeSort 归并排序
//现在mergeSort中递归分割数组，直至只有一个元素，然后将left数组和right数组通过merge函数进行合并
//将传入的两个排好序的数组 按顺序合并起来
const merge = (left, right, compare) => {
    // let i = j = 0; //j not defined
    let i = 0, j = 0;
    const mergeArray = [];
    while (i < left.length && j < right.length) {
        mergeArray.push(compare(left[i], right[j]) === Compare.LESS_THAN ? left[i++] : right[j++]);
    }
    return mergeArray.concat(i < left.length ? left.slice(i) : right.slice(j));
}
export const mergeSort = (arr, compare = defaultCompare) => {
    if (arr.length > 1) {
        const { length } = arr;
        // if (length < 2) return arr;
        const partitionIndex = Math.floor(length / 2);
        const left = mergeSort(arr.slice(0, partitionIndex), compare),
            right = mergeSort(arr.slice(partitionIndex), compare);
        arr = merge(left, right, compare);
    }
    return arr
}