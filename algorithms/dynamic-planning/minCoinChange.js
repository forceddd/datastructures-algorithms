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
            //递归
            if (newAmount >= 0) newMin = makeChange(newAmount);
            if (newAmount >= 0
                && (newMin.length < min.length - 1 || !min.length)) {
                    //当value-1 即amount的最优解 +coin 之后 其长度 仍小于上一次循环得到的value最优解时 说明需要更新value最优解
                    //当min的长度为空数组时，说明之前循环时没有改value的最优解，需要对min数组赋值
                min = [coin].concat(newMin);
            }
        }
        return (cache[value] = min);
    }
    return makeChange(value);
}