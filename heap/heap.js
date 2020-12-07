import { defaultCompare, Compare, swap } from '../LinkedList/util.js';

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
    findMin() {
        return this.isEmpty() ? undefined : this.heap[0];
    }

}
