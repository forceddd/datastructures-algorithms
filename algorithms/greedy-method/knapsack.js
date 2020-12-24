//背包问题 分数版本
//从goods中每一份重量最大的开始逐次遍历 value/weight 
export const knapsack=(capacity,goods)=>{
    const {length}=goods;
    const res={};
    let currentWeight=0,currentValue=0;
    // 根据价值/重量比 对goods进行排序 降序
    goods.sort((a, b) => b.value / b.weight - a.value / a.weight);
    for (let i = 0; i < length && currentWeight < capacity;i++){
        const {weight,value}=goods[i];
        //r>=1 该物品还能完整的放入背包中 r<1 要使用分数
        const r = (capacity - currentWeight) / weight;
        if (r>=1){
            currentValue+=value;
            currentWeight += weight;
        }else{
            currentValue+=r*value;
            currentWeight+=r*weight
        }
        res[i] = { stuff: goods[i], r: r>=1?1:r }
    }
    return {goods:res,maxValue:currentValue}
}