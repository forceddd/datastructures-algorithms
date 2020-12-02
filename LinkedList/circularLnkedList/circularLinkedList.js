/*
 * @Description: 
 * @Author: forceddd
 * @Date: 2020-11-28 14:54:17
 * @LastEditors: forceddd
 * @LastEditTime: 2020-11-28 17:10:16
 */
import { defaultEquals } from '../util.js'
import LinkedList from '../linkedList/linkedList.js'
import { Node } from '../linkedListModels.js'
//循环链表相对于链表不需要额外的属性 将尾部元素的next指向头部元素
export default class CircularLinkedList extends LinkedList {
    constructor(equals = defaultEquals) {
        super(equals);
    }
    //重写insert方法
    insert(ele, index) {
        if (index >= 0 && index <= this.count) {
            const node = new Node(ele);
            let current = this.head;
            if (index === 0) {
                if (current == null) {
                    this.head = node;
                    node.next = this.head;//将最后一个元素的next指向头部元素
                } else {
                    node.next = current;
                    this.head = node;
                    //从this.head处开始遍历
                    current = this.getElementAt(this.size());
                    current.next = node;
                }
            } else {
                const previous = this.getElementAt(index - 1);
                node.next = previous.next;
                previous.next = node;
            }
            return ++this.count;
        }
    }
    removeAt(index) {
        if (index >= 0 && index < this.count) {
            let current = this.head;
            if (index === 0) {
                if (this.count === 1) {
                    this.head = undefined;
                } else {
                    const tail = this.getElementAt(this.count - 1);
                    this.head = this.head.next;
                    tail.next = this.head;
                }
            } /* else if (index === this.count - 1) {
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                previous.next = this.head;
            } */
            else {
                //不需要修改尾部元素
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                previous.next = current.next;
            }
            this.count--;
            return current
        }
    }
    push(ele) {
        const node = new Node(ele);
        let tail;
        if (this.head == null) {
            this.head = node;
        } else {
            tail = this.getElementAt(this.count - 1);
            tail.next = node;
        }
        node.next = this.head;
        return ++this.count
    }
}