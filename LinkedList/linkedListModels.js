/*
 * @Description: 
 * @Author: forceddd
 * @Date: 2020-11-27 20:58:48
 * @LastEditors: forceddd
 * @LastEditTime: 2020-11-28 13:35:58
 */
export class Node {
    constructor(ele) {
        this.element = ele;//要加入链表的元素
        this.next = undefined;//指向下一个元素的指针
    }
}
//双向链表的节点 增加一个prev属性指向前一个节点
export class DoublyNode extends Node {
    constructor(ele) {
        super(ele);
        this.prev = undefined;//
    }
}