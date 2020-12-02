/*
 * @Description:
 * @Author: forceddd
 * @Date: 2020-11-25 19:28:46
 * @LastEditors: forceddd
 * @LastEditTime: 2020-11-25 19:52:57
 */
//@ts-check
class Stack {
    #items = [];
    push(...elements) {
        return this.#items.push(...elements)
    }
    pop() {
        return this.#items.pop();
    }
    peek() {
        return this.#items[this.#items.length - 1];
    }
    isEmpty() {
        return !this.#items.length
    }
    clear() {
        this.#items = []
    }
    size() {
        return this.#items.length
    }
}