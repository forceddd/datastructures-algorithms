/*
 * @Description:
 * @Author: forceddd
 * @Date: 2020-11-29 16:26:07
 * @LastEditors: forceddd
 * @LastEditTime: 2020-11-29 16:47:29
 */
import { defaultToString } from '../../LinkedList/util.js';
//该类用于保存原始的key 和value 
class ValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value
    }
    toString() {
        return `[#${JSON.stringify(this.key)} => ${this.value}]`
    }
}
export default class HashTable {
    constructor(toString = defaultToString) {
        this.stringify = defaultToString;
        this.table = {}
    }
    //散列函数 lose lose
    loseloseHashCode(key) {
        if (typeof key === 'number') return key;
        let hash = 0;
        const tableKey = this.stringify(key);
        for (let char of tableKey) {
            hash += char.charCodeAt();
        }
        return hash % 37

    }
    hashCode(key) {
        return this.loseloseHashCode(key);
    }
    put(key, value) {
        const position = this.hashCode(key);
        this.table[position] = new ValuePair(key, value);
        return true;
    }
    get(key) {
        const valuePair = this.table[this.hashCode(key)];
        return valuePair ? valuePair.value : undefined;
    }
    remove(key) {
        const position = this.hashCode(key);
        if (this.table[position]) {
            return delete this.table[position]
        }
        return false;
    }
}