/*
 * @Description: 
 * @Author: forceddd
 * @Date: 2020-12-21 20:50:57
 * @LastEditors: forceddd
 * @LastEditTime: 2020-12-21 21:16:13
 */
import { knapsack } from './knapsack.js'
import { minCoinChange } from './minCoinChange.js'

// console.log(minCoinChange([1,3,4],6));
// console.log(minCoinChange([1, 5, 10, 25], 36));
const goods=[
    {weight:2,value:3},
    {weight:3,value:4},
    {weight:4,value:5}
]
// console.log(knapsack(5,goods))