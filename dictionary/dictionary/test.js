/*
 * @Description: 
 * @Author: forceddd
 * @Date: 2020-11-29 16:01:55
 * @LastEditors: forceddd
 * @LastEditTime: 2020-11-29 16:11:29
 */
import Dictionary from './dictionary.js';
const d = new Dictionary();
d.set(1, null);
d.set(2, undefined);
d.set('1', 'hello');
d.set({ name: '1' }, 'world');
console.log(d);
console.log(d.dictionaryToString());
console.log(d.size());
console.log(d.values());
console.log(d.keys());
console.log(d.keyValues());
console.log(d.size());
console.log(d.hasKey(1));
