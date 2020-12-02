/*
 * @Description:
 * @Author: forceddd
 * @Date: 2020-11-29 15:20:15
 * @LastEditors: forceddd
 * @LastEditTime: 2020-11-29 16:42:19
 */
import { defaultToString } from '../../LinkedList/util.js'
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
export default class Dictionary {
    constructor(toString = defaultToString) {
        this.table = {};
        this.toString = toString;
    }
    hasKey(key) {
        return Object.keys(this.table).includes(this.toString(key))
    }
    set(key, value) {
        const tableKey = this.toString(key);
        this.table[tableKey] = new ValuePair(key, value);
        return true;
    }
    remove(key) {
        if (this.hasKey(key)) {
            delete this.table[this.toString(key)];
            return true
        }
        return false;
    }
    get(key) {
        const valuePair = this.table[this.toString(key)];
        return valuePair ? valuePair.value : undefined;
    }
    //获取所有的valuePair
    keyValues() {
        return Object.values(this.table)
    }
    keys() {
        return this.keyValues().map(valuePair => valuePair.key)
    }
    values() {
        return this.keyValues().map(valuePair => valuePair.value)
    }
    forEach(cb) {
        const valuePairs = this.keyValues();
        for (let i = 0; i < valuePairs.length; i++) {
            cb(valuePairs[i].key, valuePairs[i].value)
        }
    }
    size() {
        return Object.keys(this.table).length;
    }
    isEmpty() {
        return !this.size();
    }
    clear() {
        this.table = {}
    }
    dictionaryToString() {
        if (this.isEmpty()) return '';
        const valuePairs = this.keyValues();
        let res = `${valuePairs[0].toString()}`;
        for (let i = 1; i < valuePairs.length; i++) {
            res = `${res},${valuePairs[i].toString()}`;
        }
        return res
    }
}
