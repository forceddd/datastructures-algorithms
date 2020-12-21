const cache = {};
const makeChange = (coins,value) => {
    if (!value) return [];
    if (cache[value]) return cache[value];
    let min = [];
    let newMin, newAmount;
    for (let coin of coins) {
        newAmount = value - coin;
        if (newAmount >= 0) newMin = makeChange(coins,newAmount);
        console.log('--------------')
        console.log('coin:',coin,'amount:',newAmount)
        console.log('newMin:',newMin,'min:',min)
        console.log('cache:',cache)
        console.log('---', newAmount >= 0
            && (newMin.length < min.length - 1 || !min.length)
            && (newMin.length || !newAmount))
        if (newAmount >= 0
            && (newMin.length < min.length - 1 || !min.length)
            && (newMin.length || !newAmount)) {
            min = [coin].concat(newMin);
        }
        console.log('min:',min)
        console.log('----------------')
    }
    return (cache[value] = min);
}
export const minCoinChange=(coins,value)=>{
    return makeChange(coins,value);
}