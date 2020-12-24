//矩阵链相乘最优顺序
//p是一个数组 第i个矩阵的规模为 p[i-1] x p[i]
//p=[10,100,5,50,1] ABCD A=10x100 B=100x5...
export const matrixChainOrder=p=>{
    const n=p.length-1;//矩阵链总长度
    const m=[];//m是一个二维数组，用来存储m[i][j] 第i个矩阵开始 第j个矩阵结束的最优结果
    const s=[];//存储括号位置
    //初始化m数组
    for(let i=1;i<=n;i++){
        s[i]=[];
        m[i]=[];
        m[i][i]=0;//i
    }
    //l是当前循环的矩阵连的长度
    for(let l=2;l<=n;l++){
        //l一定时 i可以达到最大 i是起始矩阵 j是结束矩阵 j<=n => i<=n-l+1
        for(let i=1;i<=n-l+1;i++){
            const j=i+l-1;//j是结束矩阵 j<=n =>
            m[i][j]=Number.MAX_SAFE_INTEGER;
            //以k为分界点，找出m[i][k] m[k+1][j]的最小值
            for(let k=i;k<=j-1;k++){
                const temp=m[i][k]+m[k+1][j]+p[i-1]*p[k]*p[j];
                if(temp<m[i][j]) {
                    m[i][j] = temp;
                   s[i][j]=k;
                }
            }
        }
    }
    return {m,s}
}

export const printOptimalOrder=(i,j,s)=>{
    if(i===j){
        console.log(`A[${i}]`);
    }else{
        //不相等时 s[i][j]是最佳切分点
        console.log('(')
        printOptimalOrder(i,s[i][j],s)
        printOptimalOrder(s[i][j]+1, j, s)
        console.log(')')
    }
}