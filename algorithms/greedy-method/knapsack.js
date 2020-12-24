//背包问题 分数版本
//从每一分重量最大的开始逐次遍历 value/weight
export const knapsack=(capacity,goods)=>{
    const {length}=goods;
    let currentWeight=0,currentValue=0;
    // 根据价值/重量比 对goods进行排序 降序
    goods.sort((a, b) => b.value / b.weight - a.value / a.weight);
    for (let i = 0; i < length && currentWeight < capacity;i++){
        //该物品还能完整的放入背包中
        const {weight,value}=goods[i];
        if (weight <= capacity - currentWeight){
            currentValue+=value;
            currentWeight += weight
        }else{
            const r=(capacity-currentWeight)/weight;
            currentValue+=r*value;
            currentWeight+=r*weight
        }
    }
    return currentValue
}