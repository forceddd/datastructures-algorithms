import { Compare } from "../LinkedList/util";

/*
 * @Description: 
 * @Author: forceddd
 * @Date: 2020-12-06 14:45:19
 * @LastEditors: forceddd
 * @LastEditTime: 2020-12-06 18:11:54
 */
export class Node {
    constructor(key) {
        this.key = key;
        this.left = null;//左指针
        this.right = null;//右指针
    }
}
export const Colors = {
    RED: 'red',
    Black: 'black'
}
export class RedBlackNode extends Node {
    constructor(key) {
        super(key);
        this.parent = null;
        this.color = Colors.RED;
    }
    isRed() {
        return this.color === Colors.RED;
    }
}
