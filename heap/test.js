/*
 * @Description: 
 * @Author: forceddd
 * @Date: 2020-12-07 19:49:04
 * @LastEditors: forceddd
 * @LastEditTime: 2020-12-07 20:57:57
 */
import { MinHeap, MaxHeap } from './heap.js';

const min = new MaxHeap();
min.insert(6)
min.insert(8)
min.insert(1)
min.insert(2)
min.insert(3)
min.insert(4)
min.insert(5)
min.insert(6)
min.insert(7)
min.insert(9)
min.insert(10)
min.insert(20)
console.log(min);
min.extract()
console.log(min);