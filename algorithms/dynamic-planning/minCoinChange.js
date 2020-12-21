/*
 * @Description: 
 * @Author: forceddd
 * @Date: 2020-12-21 20:50:57
 * @LastEditors: forceddd
 * @LastEditTime: 2020-12-21 21:35:58
 */

export const minCoinChange = (coins, value) => {
    const cache = {};
    const makeChange = value => {
        if (!value) return [];
        if (cache[value]) return cache[value];
        let min = [];
        let newMin = [], newAmount;
        for (let coin of coins) {
            newAmount = value - coin;
            if (newAmount >= 0) newMin = makeChange(newAmount);
            if (newAmount >= 0
                && (newMin.length < min.length - 1 || !min.length)) {
                min = [coin].concat(newMin);
            }
        }
        return (cache[value] = min);
    }
    return makeChange(value);
}