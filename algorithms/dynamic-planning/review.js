
export const knapsack = (capacity, goods)=>{
    const res=[];//所有结果数组
    const {length}=goods;
    for(let i=0;i<=length;i++) res[i]=[];
    //填充结果数组
    //第一轮循环是控制放入的物品
    for(let i=0;i<=length;i++){
        //第二轮循环控制背包的容量
        for(let w=0;w<=capacity;w++){
            //没有物品可放入，或者没有容量时
            if(i===0||w===0){
                res[i][w]={};
            }
            //如果当前物品可以放入背包中，比较放入背包中之后，和放入i物品之前的价值大小
            else if (goods[i - 1].weight<=w){
                res[i][w] = { ...res[i-1][w - goods[i - 1].weight],[i]:goods[i-1]};
                if (Object.values(res[i][w]).reduce((v, stuff) => v + stuff.value, 0) < Object.values(res[i-1][w]).reduce((v, stuff) => v + stuff.value, 0)){
                    res[i][w]=res[i-1][w];
                }
            }else{
                //如果不能放入i物品,仍是放入i之前的最优解
                res[i][w]=res[i-1][w];
            }
        }
    }
    return {
        goods:res[length][capacity],
        value: Object.values(res[length][capacity]).reduce((v, stuff) => v + stuff.value, 0)
    }
}