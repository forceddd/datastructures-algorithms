/*
 * @Description: 
 * @Author: forceddd
 * @Date: 2020-12-28 16:08:02
 * @LastEditors: forceddd
 * @LastEditTime: 2021-01-03 12:07:34
 */
// import { knapsack } from "./knapsack.js";
// import minCoinChange from "./minCoinChange.js";
import { minCoinChange, knapsack } from './review.js';
const value = 36;
const coins = [1, 5, 10, 25];
const coins2 = [10, 25, 5, 1];
const goods = [
    { weight: 2, value: 3 },
    { weight: 3, value: 4 },
    { weight: 4, value: 5 }
]
console.log(minCoinChange(coins2, value));
console.log(knapsack(6, goods))