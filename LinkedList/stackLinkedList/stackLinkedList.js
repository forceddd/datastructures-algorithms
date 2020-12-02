/*
 * @Description:
 * @Author: forceddd
 * @Date: 2020-11-29 11:08:12
 * @LastEditors: forceddd
 * @LastEditTime: 2020-11-29 11:36:56
 */
import DoublyLinkedList from '../doublyLinkedList/doublyLinkedList.js'
//使用双向链表来作为存储数据的结构 可以方便的获取tail元素
export default class StackLinkedList {
    constructor() {
        this.items = new DoublyLinkedList();
    }
    push(ele) {
        return this.items.push(ele)
    }
    pop() {
        return this.isEmpty() ? undefined : this.items.removeAt(this.size() - 1);
    }
    isEmpty() {
        return this.items.isEmpty();
    }
    size() {
        return this.items.size()
    }
    clear() {
        this.items.clear()
    }
    toString() {
        return this.items.toString();
    }
    peek() {
        //返回节点 node.element为存储的元素 以便于区分元素也为undefined的情况
        return this.isEmpty() ? undefined : this.items.getElementAt(this.size() - 1);
    }
}