/*
 * @Description: 
 * @Author: forceddd
 * @Date: 2020-11-29 10:26:41
 * @LastEditors: forceddd
 * @LastEditTime: 2020-11-29 10:55:16
 */
import LinkedList from '../linkedList/linkedList.js'
import { Compare, defaultEquals, defaultCompare } from '../util.js'
//有序链表相对于链表只是插入的元素应当是有顺序的 要重写insert和push方法
export default class SortedLinkedList extends LinkedList {
    constructor(equals = defaultEquals, compare = defaultCompare) {
        super(equals);
        this.compare = compare;
    }
    //查找应当插入的index 
    getIndexNextSortedElement(ele) {
        let current = this.head,
            i = 0;
        for (; i < this.count; i++) {
            //此时ele小于current.element
            if (this.compare(ele, current.element) === Compare.LESS_THAN) return i;
            current = current.next;
        }
        //链表遍历完 没有找到index 应当插在末尾
        return i;
    }
    //不希望在任意位置插入元素 不接收index参数
    insert(ele) {
        if (this.isEmpty()) {
            return super.insert(ele, 0)
        } else {
            return super.insert(ele, this.getIndexNextSortedElement(ele))
        }
    }
    push(ele) {
        this.insert(ele);
        return this.count;
    }
}