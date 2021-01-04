export class Queue {
    constructor() {
        this.count = 0;//队列最后一个元素的下标
        this.lowestCount = 0;//队列首元素下标
        this.items = {}//队列元素
    }
    //向队列尾部添加一个项
    enqueue(item) {
        if (item != null) {
            this.items[this.count] = item;
            this.count++;
            return this.count;
        }
        return -1;
    }
    //移除队列的第一项
    dequeue() {
        if (this.isEmpty()) return undefined;
        const item = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return item;
    }
    //返回队列中的第一个元素
    peek() {
        return this.items[this.lowestCount]
    }
    //判断队列是否为空
    isEmpty() {
        return !this.size()
    }
    size() {
        return this.count - this.lowestCount
    }
    toString() {
        if (this.isEmpty()) return '';
        let str = '';
        Object.values(this.items).forEach(item => {
            str += (item + ',')
        })
        return str.slice(0, -1);
    }
}