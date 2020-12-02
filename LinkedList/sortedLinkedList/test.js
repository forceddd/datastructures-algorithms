/*
 * @Description:
 * @Author: forceddd
 * @Date: 2020-11-29 10:57:15
 * @LastEditors: forceddd
 * @LastEditTime: 2020-11-29 12:03:21
 */
import SortedLinkedList from './sortedLinkedList.js'
const s = new SortedLinkedList();
s.push(1);
s.push(6);
s.push(4);
s.insert(3, 0)
s.push('a')
console.log(s);