/*
 * @Description:
 * @Author: forceddd
 * @Date: 2020-12-22 22:16:52
 * @LastEditors: forceddd
 * @LastEditTime: 2020-12-22 23:11:41
 */
/* 
假如S1的最后一个元素 与 S2的最后一个元素相等，那么S1和S2的LCS就等于 {S1减去最后一个元素} 与 {S2减去最后一个元素} 的 LCS  再加上 S1和S2相等的最后一个元素。
假如S1的最后一个元素 与 S2的最后一个元素不等（本例子就是属于这种情况），那么S1和S2的LCS就等于 ： {S1减去最后一个元素} 与 S2 的LCS， {S2减去最后一个元素} 与 S1 的LCS 中的最大的那个序列。
*/
export const lcs = (string1, string2) => {
    const x = string1.length, y = string2.length;
    const res = [];
    for (let i = 0; i <= x; i++) res[i] = [];
    for (let i = 0; i <= x; i++) {
        for (let j = 0; j <= y; j++) {
            if (i === 0 || j === 0) res[i][j] = {};
            //比较i位 和j位的字符是否相等
            else if (string1[i - 1] === string2[j - 1]) {
                res[i][j] = { ...res[i - 1][j - 1], [i - 1]: string1[i - 1] }
            } else {
                const a = res[i - 1][j], b = res[i][j - 1];
                res[i][j] = Object.keys(a).length > Object.keys(b).length ? a : b;
            }
        }
    }
    return {
        res: res[x][y],
        length: Object.keys(res[x][y]).length
    }
}
