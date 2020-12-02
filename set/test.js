/*
 * @Description:
 * @Author: forceddd
 * @Date: 2020-11-29 12:52:38
 * @LastEditors: forceddd
 * @LastEditTime: 2020-11-29 14:36:45
 */
import Set from './set.js'
const set = new Set(7, 8, 9);
const s = new Set('hello');
set.add(1)
set.add(2)
set.add(2)
set.add(1)
set.add('1')
set.add('1')
console.log(set);
console.log(Object.values(set.items));
console.log(set.items['1number']);
set.delete(1)
console.log(set);
// console.log([...set.ite]);
const union = Set.union(set, s, new Set('world'))
console.log(union);
console.log(Set.intersection(new Set(7, 8)));
console.log(Set.intersection(set, new Set(7, 8), new Set(7)));
console.log(Set.difference(new Set(7, 8), new Set(7)));