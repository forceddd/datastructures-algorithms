/*
 * @Description: 

 * @Author: forceddd
 * @Date: 2021-01-02 11:24:25
 * @LastEditors: forceddd
 * @LastEditTime: 2021-01-02 13:47:23
 */

export const knapsack = (capacity, goods) => {
    const res = [];//所有结果数组
    const { length } = goods;
    for (let i = 0; i <= length; i++) res[i] = [];
    //填充结果数组
    //第一轮循环是控制放入的物品
    for (let i = 0; i <= length; i++) {
        //第二轮循环控制背包的容量
        for (let w = 0; w <= capacity; w++) {
            //没有物品可放入，或者没有容量时
            if (i === 0 || w === 0) {
                res[i][w] = {};
            }
            //如果当前物品可以放入背包中，比较放入背包中之后，和放入i物品之前的价值大小
            else if (goods[i - 1].weight <= w) {
                res[i][w] = { ...res[i - 1][w - goods[i - 1].weight], [i]: goods[i - 1] };
                if (Object.values(res[i][w]).reduce((v, stuff) => v + stuff.value, 0) < Object.values(res[i - 1][w]).reduce((v, stuff) => v + stuff.value, 0)) {
                    res[i][w] = res[i - 1][w];
                }
            } else {
                //如果不能放入i物品,仍是放入i之前的最优解
                res[i][w] = res[i - 1][w];
            }
        }
    }
    return {
        goods: res[length][capacity],
        value: Object.values(res[length][capacity]).reduce((v, stuff) => v + stuff.value, 0)
    }
}
//最少硬币找零  需要找到每一个x<amount的最优解
//一直拆分，直到解决最基本的硬币
export const minCoinChange = (coins, amount) => {
    const cache = {};//缓存x<n的每个解
    const makeChange = value => {
        //如果要求的value是0 或者不存在，结果是空数组
        if (!value) return [];
        //如果有已经缓存的最优解，返回该值得最优解
        if (cache[value]) return cache[value];
        //计算value的最优解
        let min = [];
        coins.forEach(coin => {
            let newAmount = value - coin, newMin = [];
            //如果newAmount符合条件，得到此值的最优解
            if (newAmount >= 0) {
                newMin = makeChange(newAmount);
                //比较min 和 newMin.concat(coin) 哪个更优
                //当第一次循环时。min为[],此时应该对min赋值 
                //当min有值时，应该讲min设为二者中的最优解
                if (!min.length || newMin.length < min.length - 1) {
                    min = newMin.concat(coin);
                }
            }
        })
        //缓存该最优解，并将min作为函数返回值
        return cache[amount] = min;
    }
    return makeChange(amount)
}

//最长公共子序列
export const lcs = (str1, str2) => {
    const res = []//结果数组 ，下标代表str的长度，res[1][1] 表示str1 str2都只有一个字符的最长公共子序列
    for (let i = 0; i <= str1.length; i++) res[i] = [];
    for (let i = 0; i <= str1.length; i++) {
        for (let j = 0; j <= str2.length; j++) {
            if (i === 0 || j === 0) res[i][j] = [];
            //当此时，两个字符串的最后一个字符相等时
            else if (str1[i - 1] === str2[j - 1]) res[i][j] = res[i - 1][j - 1].concat(str1[i - 1]);
            else res[i][j] = res[i - 1][j].length > res[i][j - 1].length ? res[i - 1][j] : res[i][j - 1];
        }
    }
    return res[str1.length][str2.length]
}
//最长公共子序列 递归版
export const lcsCursive = (string1, string2) => {
    const cache = [];
    for (let i = 0; i <= string1.length; i++) {
        cache[i] = [];
    }
    const lcs = (str1, str2) => {
        const length1 = str1.length, length2 = str2.length;
        if (!length1 || !length2) return [];
        if (cache[length1][length2]) return cache[length1][length2];
        if (str1[length1 - 1] === str2[length2 - 1]) return cache[length1][length2] = lcs(str1.slice(0, -1), str2.slice(0, -1)).concat(str2.slice(-1));
        else return cache[length1][length2] = lcs(str1, str2.slice(0, -1)).length > lcs(str1.slice(0, -1), str2).length ? lcs(str1, str2.slice(0, -1)) : lcs(str1.slice(0, -1), str2);
    }
    return lcs(string1, string2)
}



