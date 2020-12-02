import { Node } from '../linkedListModels.js'
import { defaultEquals } from '../util.js'
export default class LinkedList {
    constructor(equals = defaultEquals) {
        this.count = 0;//存储链表元素数量
        this.head = undefined;//链表头部元素
        this.equals = equals;//判断链表中两个元素是否相等的方法
    }
    //向链表尾部添加元素
    push(ele) {
        const node = new Node(ele);
        let current;
        if (this.head == null) {
            this.head = node;
        } else {
            current = this.head;
            while (current.next != null) {
                current = current.next;
            };
            current.next = node;
        }
        this.count++;
    }
    //移除指定位置的元素
    // removeAt(index) {
    //     //检查index是否越界
    //     if (index >= 0 && index < this.count) {
    //         let current = this.head;
    //         //移除第一个元素
    //         if (index === 0) {
    //             this.head = current.next;
    //         } else {
    //             //需要先从头部迭代到index处 
    //             let previous;//index-1处的元素
    //             for (let i = 0; i < index; i++) {
    //                 previous = current;
    //                 current = current.next;
    //             }
    //             //current为index处的元素
    //             previous.next = current.next;
    //         }
    //     }
    //     this.count--;
    //     return current.element;
    // }
    //重构removeAt
    removeAt(index) {
        //检查index是否越界
        if (index >= 0 && index < this.count) {
            let current = this.head;
            //移除第一个元素
            if (index === 0) {
                this.head = current.next;
            } else {
                //需要先从头部迭代到index处 
                let previous = this.getElementAt(index - 1);
                current = previous.next;
                //current为index处的元素
                previous.next = current.next;
            }
            this.count--;
            return current;
        }

    }
    //获取index处的元素
    getElementAt(index) {
        //检查index是否越界
        if (index >= 0 && index <= this.count) {
            let current = this.head;
            for (let i = 0; i < index && current != null; i++) {
                current = current.next;
            }
            return current;
        }
    }
    //在index处添加元素
    insert(ele, index) {
        //校验index
        if (index == null) {
            this.push(ele);
            return ++this.count;
        } else {
            if (index >= 0 && index <= this.count) {
                const current = new Node(ele);
                if (index === 0) {
                    current.next = this.head;
                    this.head = current;
                } else {
                    let previous = this.getElementAt(index - 1),
                        old = previous.next;
                    previous.next = current;
                    current.next = old;

                }
                return ++this.count;
            }
        }
    }
    //获取元素的index
    indexOf(ele) {
        let current = this.head;
        for (let i = 0; i < this.count; i++) {
            if (this.equals(current.element, ele)) return i;
            current = current.next;
        }
        return -1;
    }
    //删除元素
    remove(ele) {
        const index = this.indexOf(ele);
        return this.removeAt(index)
    }
    size() {
        return this.count;
    }
    isEmpty() {
        return !this.count;
    }
    getHead() {
        return this.head;
    }
    toString() {
        if (this.isEmpty()) return '';
        let res = `${this.head.element}`;
        let current = this.head.next;
        for (let i = 1; i < this.count && current; i++) {
            res = `${res},${current.element}`;
            current = current.next;
        }
        return res;
    }
}