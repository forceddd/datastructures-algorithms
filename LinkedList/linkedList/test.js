/*
 * @Description: 
 * @Author: forceddd
 * @Date: 2020-11-27 20:58:48
 * @LastEditors: forceddd
 * @LastEditTime: 2020-11-28 15:40:22
 */
import LinkedList from './linkedList.js'

const link = new LinkedList();
console.log(link)
link.push('node1')
link.push('node2')
link.push('node3')
link.push('node4')
// link.push(undefined)
console.log(link.getElementAt(0))
console.log(link.getElementAt(1))
console.log(link.getElementAt(2))
console.log(link.getElementAt(3))
console.log(link.getElementAt(4))
