/*
 * @Description: 
 * @Author: forceddd
 * @Date: 2020-12-07 19:49:04
 * @LastEditors: forceddd
 * @LastEditTime: 2020-12-07 20:57:29
 */
import { defaultCompare, Compare, swap } from '../util.js';

//最小堆类
export class MinHeap {
    constructor(compare = defaultCompare) {
        this.compare = compare;
        this.heap = [];//使用数组来存储数据
    }
    getLeftChildIndex(index) {
        return 2 * index + 1;
    }
    getRightChildIndex(index) {
        return 2 * index + 2;
    }
    getParentIndex(index) {
        return index === 0 ? undefined : Math.floor((index - 1) / 2);
    }
    insert(value) {
        if (value != null) {
            //1.将value插入到数组末尾
            this.heap.push(value);
            //2.将value与其父节点比较 进行上移
            this.shiftUp(this.heap.length - 1);
            return true;
        }
        return false;
    }
    //比较节点和父节点值的大小 判断是否需要互换位置
    shiftUp(index) {
        let parent = this.getParentIndex(index);
        while (index > 0
            &&
            this.compare(this.heap[parent], this.heap[index]) === Compare.BIGGER_THAN) {
            //parent的值大于index的值 互换位置
            swap(index, parent, this.heap);
            //改变条件 继续向上循环
            index = parent;
            parent = this.getParentIndex(parent)
        }
    }
    size() {
        return this.heap.length;
    }
    isEmpty() {
        return this.size() === 0;
    }
    getRoot() {
        return this.isEmpty() ? undefined : this.heap[0];
    }
    //移除堆中的root
    extract() {
        if (this.isEmpty()) return undefined;
        const length = this.size();
        if (length === 1) return this.heap.shift();
        const remove = this.heap[0];
        //将最后一个元素 放在头部 然后重新排列堆
        this.heap[0] = this.heap.pop();
        this.shiftDown(0);
        return remove;
    }
    shiftDown(index) {
        let element = index;
        const left = this.getLeftChildIndex(element),
            right = this.getRightChildIndex(element),
            length = this.size();
        if (left < length && this.compare(this.heap[element], this.heap[left]) === Compare.BIGGER_THAN) {
            element = left;
        }
        if (right < length && this.compare(this.heap[element], this.heap[right]) === Compare.BIGGER_THAN) {
            element = right;
        }
        //从左孩子 右孩子中找出较小的 互换位置
        if (index !== element) {
            swap(index, element, this.heap);
            this.shiftDown(element)
        }
    }
}
//将比较函数改变 最大堆可以继承最小堆的所有方法
const reverseCompare = (a, b) => defaultCompare(b, a);
export class MaxHeap extends MinHeap {
    constructor(compare = reverseCompare) {
        super(compare)
    }
}

//堆排序算法 利用堆的逻辑 进行排序 此处选择的是最大堆
//没有直接使用堆 所以要另外构建函数
//下移函数
const shiftDown = (index, array, heapSize, compare = defaultCompare) => {
    let element = index;
    const left = 2 * index + 1,
        right = 2 * index + 2;
    console.log(index)
    if (left < heapSize && compare(array[element], array[left]) === Compare.LESS_THAN) {
        element = left;
    }
    if (right < heapSize && compare(array[element], array[right]) === Compare.LESS_THAN) {
        element = right;
    }
    if (index !== element) {
        swap(element, index, array);
        shiftDown(element, array, heapSize, compare);
    }
}
//根据传入的数组 构建最大堆
const buildMaxHeap = (array, compare = defaultCompare) => {
    //根据堆的特性 从 i=Math.foor(length/2) 逐次向上排序
    const length = array.length;
    for (let i = Math.floor(length / 2); i >= 0; i -= 1) {
        shiftDown(i, array, length, compare)
    }
    console.log(array)
    return array
}

export const heapSort = (array, compare = defaultCompare) => {
    let heapSize = array.length;
    if (heapSize <= 1) return array;
    //将数组转换成最大堆结构
    buildMaxHeap(array, compare);
    while (heapSize > 1) {
        //将数组的最大值 放在数组末尾
        swap(0, --heapSize, array);
        //重新转换数组 使其符合最大堆结构 
        //此时数组末尾已经是最大值 不在进行转换
        shiftDown(0, array, heapSize, compare);
    }
    return array;
}