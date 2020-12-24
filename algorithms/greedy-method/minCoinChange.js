//从coins中的最大值开始，找到尽可能多的最大coin 以使coin的数量最少 
//要求coins 是升序排列的 对传入的coins使用插入排序 insertionSort
// 贪心算法并不总是得到最优解
import {insertionSort} from '../../sort-search-algorithms/sort.js'
// const insertionSort=arr=>{
//     for(let i=1;i<arr.length;i++){
//         const temp=arr[i];
//         let j=i;
//         while(arr[j-1]>temp&&j>0){
//             arr[j]=arr[j-1];
//             j--;
//         }
//         arr[j]=temp;
//     }
//     return arr
// }
const  minCoinChange=(value,coins)=>{
    insertionSort(coins)
    const change=[];
    let total=0;
    for(let i=coins.length-1;i>=0;i--){
        const coin=coins[i];
        while(total+coin<=value){
            total+=coin;
            change.push(coin);
        }
    }
    return change;
}
export default minCoinChange