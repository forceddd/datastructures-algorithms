/*
 * @Description:
 * @Author: forceddd
 * @Date: 2020-11-26 19:33:56
 * @LastEditors: forceddd
 * @LastEditTime: 2020-11-26 21:14:01
 */
export default class Queue {
    #count = 0;
    #lowestCount = 0;
    #items = {};
    enqueue(...eles) {
        eles.forEach(item => {
            this.#items[this.#count + this.#lowestCount] = item;
            this.#count++;
        })
    }
    dequeue() {
        if (this.isEmpty()) return undefined;
        const res = this.#items[this.#lowestCount];
        delete this.#items[this.#lowestCount++];
        this.#count--;
        return res;
    }
    peek() {
        return this.isEmpty() ? undefined : this.#items[this.#lowestCount];
    }
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
}