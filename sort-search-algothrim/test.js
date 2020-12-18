/*
 * @Description: 
 * @Author: forceddd
 * @Date: 2020-12-16 20:47:15
 * @LastEditors: forceddd
 * @LastEditTime: 2020-12-16 21:31:18
 */
import { defaultCompare } from "../util.js";
import { bubbleSort, insertionSort, merge, mergeSort, selectionSort, countingSort} from "./sort.js";

const arr = [5, 3, 4,3, 2, 1, 0,0];
// bubbleSort(arr)
// selectionSort(arr)
// insertionSort(arr)
countingSort(arr)
// console.log(mergeSort(arr));
console.log(arr)
// console.log('final:', merge([1, 8, 10], [2, 9], defaultCompare));
