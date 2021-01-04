export class Queue {
    constructor() {
        this.count = 0;//队列最后一个元素的下标+1
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
    clear() {
        this.items = {};
        this.count = 0;
        this.lowestCount = 0;

    }
}
export class Deque extends Queue {
    constructor() {
        super();
    }
    addBack(item) {
        return this.enqueue(item);
    }
    removeFront() {
        return this.dequeue();
    }
    addFront(item) {
        if (this.isEmpty()) {
            return this.enqueue(item)
        } else if (this.lowestCount > 0) {
            this.lowestCount--;
            this.items[this.lowestCount] = item;
        } else {
            //首元素下标为0 将所有元素往后移
            for (let i = this.count; i > 0; i--) {
                this.items[i] = this.items[i - 1];
            }
            this.items[0] = item;
            this.count++;
        }
    }
    removeBack() {
        const item = this.items[this.count - 1];
        delete this.items[this.count - 1];
        this.count--;
        return item;
    }
    peekFront() {
        return this.peek();
    }
    peekBack() {
        return this.items[this.count - 1];
    }
}