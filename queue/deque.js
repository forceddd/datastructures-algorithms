/*
 * @Description:双端队列
 * @Author: forceddd
 * @Date: 2020-11-26 19:58:38
 * @LastEditors: forceddd
 * @LastEditTime: 2020-11-26 20:59:46
 */
class Deque {
    #count = 0;
    #items = {};
    #lowestCount = 0;
    isEmpty() {
        return !this.#count;
    }
    size() {
        return this.#count;
    }
    clear() {
        this.#count = 0;
        this.#items = {};
        this.#lowestCount = 0;
    }
    toString() {
        return this.isEmpty() ? ''
            : Object.values(this.#items).reduce((init, item, i) => `${init}${i ? ',' : ''}${item}`, '')
    }
    //在双端队列后端添加元素
    addBack(...eles) {
        eles.forEach(item => {
            this.#items[this.#count++] = item;
        })
        return this.#count;
    }
    //从后端取出元素
    removeBack() {
        const res = this.#items[this.#count + this.#lowestCount - 1];
        delete this.#items[this.#count + this.#lowestCount - 1]
        this.#count--;
        return res
    }
    //在前端加入元素 三种情况空队列 lowest为0的队列 lowest不为0的队列
    addFront(...eles) {
        for (let i = 0; i < eles.length; i++) {
            if (this.isEmpty()) {
                this.#items[this.#count] = eles[i];

            } else if (this.#lowestCount > 0) {
                this.#items[--this.#lowestCount] = eles[i];
            } else {
                for (let i = this.#count; i > 0; i--) {
                    this.#items[i] = this.#items[i - 1];
                }
                this.#items[0] = eles[i];

            }
            this.#count++;
        }
        return this.#count;
    }
    removeFront() {
        const res = this.#items[this.#lowestCount];
        delete this.#items[this.#lowestCount++];
        this.#count--;
        return res
    }
    peekFront() {
        return this.#items[this.#lowestCount];
    }
    peekBack() {
        return this.#items[this.#count + this.#lowestCount - 1];
    }

}