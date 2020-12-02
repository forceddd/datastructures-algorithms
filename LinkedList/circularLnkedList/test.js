/*
 * @Description: 
 * @Author: forceddd
 * @Date: 2020-11-28 15:48:37
 * @LastEditors: forceddd
 * @LastEditTime: 2020-11-28 17:12:36
 */
import CircularLinkedList from './circularLinkedList.js'
const c = new CircularLinkedList()
c.insert('node1', 0);
c.insert('node2', 0);
c.insert('node3', 0);
c.insert('node4', 0);
c.insert('nodehhh', 3);
console.log(c);
console.log(c.removeAt(0));
