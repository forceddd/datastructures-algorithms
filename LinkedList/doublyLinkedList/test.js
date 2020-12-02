/*
 * @Description:
 * @Author: forceddd
 * @Date: 2020-11-28 14:08:26
 * @LastEditors: forceddd
 * @LastEditTime: 2020-11-28 14:44:41
 */
import DoublyLinkedList from './doublyLinkedList.js';
const doubly = new DoublyLinkedList();
doubly.insert('node1', 0)
doubly.insert('node2', 1)
doubly.insert('node3', 2)
console.log(doubly);
console.log(doubly.removeAt(1));