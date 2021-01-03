/*
 * @Description:
 * @Author: forceddd
 * @Date: 2021-01-03 11:25:15
 * @LastEditors: forceddd
 * @LastEditTime: 2021-01-03 12:09:47
 */
import { insertionSort } from '../../sort-search-algorithms/sort.js'
//最少硬币找零
export const minCoinChange = (coins, amount) => {
    insertionSort(coins);
    let total = 0;
    const change = []
    for (let i = coins.length - 1; i >= 0; i--) {
        while (total + coins[i] <= amount) {
            change.push(coins[i]);
            total += coins[i];
        }
    }
    return change;
}

//背包问题分数版本
export const knapsack = (capacity, goods) => {
    //先根据goods中物品的每一份比重大小排序
    goods.sort((a, b) => b.value / b.weight - a.value / a.weight);
    let currentWeight = 0, currentValue = 0;
    const stuffs = {};
    goods.forEach((g, i) => {
        const { weight, value } = g;
        let r = (capacity - currentWeight) / weight;
        if (r === 0) return { ...stuffs, totalValue: currentValue };
        if (r > 1) r = 1;
        currentWeight += weight * r;
        currentValue += value * r
        stuffs[i] = { r, ...g }

    })
    return { ...stuffs, totalValue: currentValue }
}