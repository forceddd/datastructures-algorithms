//背包问题 0-1版本
//capacity 是背包的容量 goods是物品数组 元素是物品对象 n是物品个数
/* 
const goods=[
    {weight:2,value:3},
    {weight:3,value:4},
    {weight:4,value:5}
]
*/
export const knapsack=(capacity,goods,n=goods.length)=>{
    //创建一个二维数组 来存
    const ks=[];
    for(let i=0;i<=n;i++) ks[i]=[];
    //填充数组 i是物品的序号 w是0-capacity的所有值 代表背包的容量 
    for(let i=0;i<=n;i++){
        for(let w=0;w<=capacity;w++ ){
            //当没有物品 或者背包的容量为0时 不能放入物品
            if (i === 0 || w === 0) ks[i][w] = {};
            //goods[i-1].weight 是标签为i 的物品重量
            //此时可以将物品i 放入背包中
            else if(goods[i-1].weight<=w){
                //放入i物品之前的容量为w的最优解值
                const prev = ks[i - 1][w]
                //放入物品之后的值 
                // 先找到在添加i物品之前 并且减去i物品重量的最优解 ks[i - 1][w - goods[i - 1].weight]
                // 再将i物品添加当前解中 因为之前已经减去了i的重量 所以这时候添加不会超重
                const now = { ...ks[i - 1][w - goods[i - 1].weight],[i]:goods[i-1]};
                //比较当前解 和不添加i物品时，容量为w的最优解  哪个总价值更大 就将其作为当前物品为i 容量为w的最优解
                ks[i][w] = Object.values(now).reduce((value, g) => value + g.value, 0) 
                    > Object.values(prev).reduce((value, g) => value + g.value, 0)
                ? now:prev;
            }else{
                //此时goods[i-1].weight 超出了背包容量 不能放入背包 所以此处的值应当与放入之前标签（i-1）相同
                ks[i][w] = ks[i - 1][w];
            }
        }
    }
    //返回最终结果 物品i 容量capacity 的最优解
    return ks[n][capacity];
}