import { knapsack } from "./knapsack.js";
import minCoinChange from "./minCoinChange.js";

const value=36;
const coins=[1,5,10,25];
const coins2=[10,25,5,1];
const goods = [
    { weight: 2, value: 3 },
    { weight: 3, value: 4 },
    { weight: 4, value: 5 }
]
// console.log(minCoinChange(value,coins2));
console.log(knapsack(6,goods))