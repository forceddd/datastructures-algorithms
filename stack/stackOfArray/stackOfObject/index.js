/*
 * @Description:
 * @Author: forceddd
 * @Date: 2020-11-25 19:44:14
 * @LastEditors: forceddd
 * @LastEditTime: 2020-11-25 20:30:29
 */
class Stack {
    #count = 0;
    #items = {};
    push(...elements) {
        for (let i = 0; i < elements.length; i++) {
            // this.#items[this.#count++] = elements[i]
            // console.log(this.#count);
            this.#items[this.#count] = elements[i];
            this.#count++;
        }

        return this.#count;
    }
    isEmpty() {
        return !this.#count;
    }
    size() {
        return this.#count;
    }
    pop() {
        if (!this.isEmpty()) {
            this.#count--;
            const result = this.#items[this.#count];
            delete this.#items[this.#count];
            return result;
        }
    }
    peek() {
        if (!this.isEmpty()) return this.#items[this.#count - 1]
    }
    clear() {
        this.#items = {};
        this.#count = 0;
    }
    toString() {
        if (this.isEmpty()) return '';
        return Object.values(this.#items).reduce((resString, item, i) => `${resString}${i != 0 ? ',' : ''}${item}`, '')
    }
}