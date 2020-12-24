/*
 * @Description: 
 * @Author: forceddd
 * @Date: 2020-12-21 20:50:57
 * @LastEditors: forceddd
 * @LastEditTime: 2020-12-22 23:09:48
 */
import { knapsack } from './knapsack.js'
import { minCoinChange } from './minCoinChange.js'
import { lcs } from './lcs.js'
import { matrixChainOrder ,printOptimalOrder} from './matrixChainOrder.js'
// console.log(minCoinChange([1,3,4],6));
// console.log(minCoinChange([1, 5, 10, 25], 36));
const goods = [
    { weight: 2, value: 3 },
    { weight: 3, value: 4 },
    { weight: 4, value: 5 }
]

// console.log(knapsack(5,goods))
// console.log(lcs('acbaed', 'acadf'));
const matrix = matrixChainOrder([10, 100, 5, 50, 1])
console.log(matrix);
// console.log(matrix.m[1][4], matrix.s[1][4])
printOptimalOrder(1,4,matrix.s)