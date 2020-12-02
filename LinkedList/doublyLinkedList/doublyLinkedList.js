/*
 * @Description:
 * @Author: forceddd
 * @Date: 2020-11-28 13:36:58
 * @LastEditors: forceddd
 * @LastEditTime: 2020-11-28 17:51:16
 */
import { DoublyNode } from '../linkedListModels.js';
import { defaultEquals } from '../util.js'
import LinkedList from '../linkedList/linkedList.js'
//双向链表增加一个尾部元素指针
export default class DoublyLinkedList extends LinkedList {
    constructor(equals = defaultEquals) {
        super(equals);
        this.tail = undefined;
    }
    //重写 insert方法
    insert(ele, index) {
        if (index >= 0 && index <= this.count) {
            const node = new DoublyNode(ele);//创建双向节点
            let current = this.head;//取到头部元素
            if (index === 0) {
                //链表是空链表时
                if (current == null) {
                    this.head = node;
                    this.tail = node;
                } else {
                    node.next = current;
                    // current.prev = node;
                    // this.head = node;
                    this.head = current.prev = node;
                }
            } else if (index === this.count) {
                current = this.tail;//获取尾部元素
                node.prev = current;
                // current.next = node;
                // 
                this.tail = current.next = node;
            } else {
                const previous = this.getElementAt(index - 1);//取到前一个元素
                current = previous.next//当前index处元素
                previous.next = node;
                node.next = current;
                current.prev = node;
                node.prev = previous
            }
            this.count++;
            return this.count;
        }
    }
    removeAt(index) {
        if (index >= 0 && index < this.count) {
            let current = this.head;
            if (index === 0) {
                this.head = current.next;//更新头部指针
                if (this.count === 1) {
                    //只有一项 删除后为空链表 更新tail
                    this.tail = undefined;
                } else {
                    this.head.prev = undefined;
                }

            } else if (index === this.count - 1) {
                current = this.tail;
                this.tail = current.prev;
                this.tail.next = undefined;
            } else {
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                previous.next = current.next;
                current.next.prev = previous;
            }
            this.count--;
            return current;
        }
    }
    push(ele) {
        const node = new DoublyNode(ele);

        if (this.head == null) {
            this.head = this.tail = node;
        } else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
        return ++this.count
    }
    getTail() {
        return this.tail;
    }
    clear() {
        super.clear();
        this.tail = undefined;
    }
    toString() {
        if (this.head == null) return '';
        let res = `${this.head.element}`,
            next = this.head.next;
        while (next != null) {
            res = `${res},${next.element}`;
            next = next.next;
        }
        return res
    }
    inverseToString() {
        if (this.tail == null) return '';
        let res = `${this.tail.element}`,
            previous = this.tail.prev;
        while (previous != null) {
            res = `${res},${previous.element}`;
            previous = previous.prev;
        }
        return res
    }
}
