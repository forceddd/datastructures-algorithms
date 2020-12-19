/*
 * @Description: 
 * @Author: forceddd
 * @Date: 2020-12-16 20:47:15
 * @LastEditors: forceddd
 * @LastEditTime: 2020-12-19 11:14:14
 */
import { defaultCompare } from "../util.js";
import { bubbleSort, insertionSort, mergeSort, quickSort, selectionSort } from "./sort-review.js";
// import { insertionSort, mergeSort } from "./sort.js";

const arr = [5, 4, 3, 2, 1];
// const arr2 = [5, 4, 3, 2, 6, 1, 7, 10, 9, 8];
// const arr3 = [93, 43, 55, 4, 101]
// bubbleSort(arr);
// insertionSort(arr);
// selectionSort(arr);
// quickSort(arr2);
mergeSort(arr);
console.log(mergeSort(arr))
// selectionSort(arr)
// insertionSort(arr)
// countingSort(arr)
// const a= radixSort(arr3)
// console.log(bucketSort(arr2,3))
// console.log(mergeSort(arr));
// console.log(a)
// console.log(arr3)
// console.log('final:', merge([1, 8, 10], [2, 9], defaultCompare));
