/*
 * @Description: 
 * @Author: forceddd
 * @Date: 2020-12-16 20:47:15
 * @LastEditors: forceddd
 * @LastEditTime: 2020-12-19 15:46:03
 */
import { defaultCompare } from "../util.js";
import { binarySearch, interpolationSearch } from "./search.js";
import { bubbleSort, bucketSort, countingSort, insertionSort, mergeSort, quickSort, radixSort, selectionSort } from "./sort-review.js";
// import { insertionSort, mergeSort } from "./sort.js";

const arr = [5, 4, 3, 2, 1, 20, 50, 48, 47, 49];
// const arr2 = [5, 4, 3, 2, 6, 1, 7, 10, 9, 8];
const arr3 = [93, 43, 55, 4, 101]
// bubbleSort(arr);
// insertionSort(arr);
// selectionSort(arr);
quickSort(arr);
console.log(arr);
// mergeSort(arr);
// console.log(radixSort(arr3))
// selectionSort(arr)
// insertionSort(arr)
// countingSort(arr)
// const a= radixSort(arr3)
// console.log(bucketSort(arr2,3))
// console.log(mergeSort(arr));
// console.log(a)
// console.log(arr3)
// console.log('final:', merge([1, 8, 10], [2, 9], defaultCompare));
console.log('index:', interpolationSearch(arr, 5));
console.log('b-index:', binarySearch(arr, 5));