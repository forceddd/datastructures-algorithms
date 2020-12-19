/*
 * @Description: 
 * @Author: forceddd
 * @Date: 2020-12-18 21:18:08
 * @LastEditors: forceddd
 * @LastEditTime: 2020-12-19 14:20:59
 */
import { swap, defaultCompare, Compare } from '../util.js';

//1. bubbleSort O(n**2)
export const bubbleSort = (arr, compare = defaultCompare) => {
    const { length } = arr;
    for (let i = 0; i < length - 1; i++) {
        for (let j = 0; j < length - 1 - i; j++) {
            compare(arr[j], arr[j + 1]) === Compare.BIGGER_THAN && swap(j, j + 1, arr);
        }
    }
    return arr;
}

//2. insertionSort
//假设第一项已经是有序的，从第二项开始，和前一项比较大小，确定应该插入的位置,直到找到合适位置或者到达数组起始点
// export const insertionSort=(arr,compare=defaultCompare)=>{
//     for(let i=1;i<arr.length;i++){
//         let j=i;
//         while(j>0&&compare(arr[j],arr[j-1])===Compare.LESS_THAN){
//             swap(j,j-1,arr);
//             j--;
//         }
//         count++;
//     }
//     return arr
// }
//没有必要每次交换 j 和 j-1 只需要再找到正确位置后 给j赋值  就可以了
export const insertionSort = (arr, compare = defaultCompare) => {
    for (let i = 1; i < arr.length; i++) {
        const temp = arr[i];//暂存当前要插入的值 在找到合适位置后插入
        let j = i;
        //因为在while只将arr[i]设为了arr[j-1],没有改变 j-1的值 所以要使用temp来比较，不能向上面一样直接 j 和j-1比较
        while (j > 0 && compare(temp, arr[j - 1]) === Compare.LESS_THAN) {
            arr[j] = arr[j - 1];
            j--;
        }
        //找到合适位置后 赋值一次就可以了
        arr[j] = temp;
    }
}

//3. selectionSort O(n**2)
//先从第一位开始，选择出数组中的最小值，然后将最小值和第一位交换位置 ，接着从第二位开始查找最小值
export const selectionSort = (arr, compare = defaultCompare) => {
    //和冒泡排序相同，外层循环控制迭代次数，当迭代i=length-2，j=length -1
    const { length } = arr;
    for (let i = 0; i < length - 1; i++) {
        let minIndex = i;
        //内层循环j 从i+1处开始
        for (let j = i + 1; j < length; j++) {
            if (compare(arr[minIndex], arr[j]) === Compare.BIGGER_THAN) minIndex = j;
        }
        i != minIndex && swap(i, minIndex, arr)
    }
    return arr;
}

//quickSort 
const partition = (left, right, arr, compare) => {
    const pivot = arr[Math.floor((left + right) / 2)];
    let i = left, j = right;
    while (i < j) {
        while (compare(arr[i], pivot) === Compare.LESS_THAN) i++;
        while (compare(arr[j], pivot) === Compare.BIGGER_THAN) j--;
        if (i <= j) {
            i < j && swap(i, j, arr);
            i++;
            j--;
        }
    }
    return i;
}
const quick = (left, right, arr, compare) => {
    // if (arr.length < 2) return arr;
    let partIndex = partition(left, right, arr, compare);
    left < partIndex - 1 && quick(left, partIndex - 1, arr, compare);
    partIndex < right && quick(partIndex, right, arr, compare);
    return arr;
}
export const quickSort = (arr, compare = defaultCompare) => {
    return quick(0, arr.length - 1, arr, compare);
}

//mergeSort 归并排序
//现在mergeSort中递归分割数组，直至只有一个元素，然后将left数组和right数组通过merge函数进行合并
//将传入的两个排好序的数组 按顺序合并起来
const merge = (left, right, compare) => {
    // let i = j = 0; //j not defined
    let i = 0, j = 0;
    const mergeArray = [];
    while (i < left.length && j < right.length) {
        mergeArray.push(compare(left[i], right[j]) === Compare.LESS_THAN ? left[i++] : right[j++]);
    }
    return mergeArray.concat(i < left.length ? left.slice(i) : right.slice(j));
}
export const mergeSort = (arr, compare = defaultCompare) => {
    if (arr.length > 1) {
        const { length } = arr;
        // if (length < 2) return arr;
        const partitionIndex = Math.floor(length / 2);
        const left = mergeSort(arr.slice(0, partitionIndex), compare),
            right = mergeSort(arr.slice(partitionIndex), compare);
        arr = merge(left, right, compare);
    }
    return arr
}

//countingSort 基数排序 用于整数数组排序 O(n+k);
//将原数组中的元素作为 计数数组的下标 将原数组相同项的个数 作为计数数组的值，然后依次取出
export const countingSort = arr => {
    if (arr.length < 2) return arr;
    //找出待排序数组中的最大值，用于计算counts数组的长度
    const max = Math.max(...arr),
        counts = new Array(max + 1);
    // sortedArray = [];
    arr.forEach(element => {
        !counts[element] && (counts[element] = 0);
        counts[element]++;
    })
    // counts.forEach((count, i) => {
    //     while (count--) {
    //         sortedArray.push(i)
    //     }
    // })
    // return sortedArray;
    //不用sortedArray 直接更改原数组 需要一个辅助下标
    let sortedIndex = 0;
    counts.forEach((count, i) => {
        while (count--) {
            //每次赋值之后 都要给sortedIndex 累加
            arr[sortedIndex++] = i;
        }
    })
    return arr;
}

//桶排序 O(n+k);
export const bucketSort = (arr, bucketSize = 5) => {
    if (arr.length < 2) return arr;
    const buckets = createBuckets(arr, bucketSize);
    return sortBuckets(buckets)
}
const createBuckets = (arr, bucketSize) => {
    const min = Math.min(...arr),
        max = Math.max(...arr),
        length = Math.floor((max - min) / 2) + 1,
        buckets = new Array(length);
    for (let i = 0; i < length; i++) buckets[i] = [];
    //将数组中的值 放到对应桶中
    arr.forEach(element => {
        let index = Math.floor((element - min) / 2);
        buckets[index].push(element);
    })
    return buckets;
}
//对每个bucket中的元素 进行排序 然后合并 这里使用的是插入排序
const sortBuckets = buckets => {
    const sortedArray = [];
    buckets.forEach(bucket => {
        bucket.length && insertionSort(bucket);
        sortedArray.push(...bucket);
    })
    return sortedArray;
}

//radixSort O(nk);
//对数组元素的每一位根据进制基数radix 创建桶
export const radixSort = (arr, radix = 10) => {
    //从个位开始
    let significantDigit = 1;
    const max = Math.max(...arr);//数组最大值决定排序几轮
    while (max / significantDigit >= 1) {
        arr = sortForRadix(arr, significantDigit, radix);
        significantDigit *= radix;
    }
    return arr
}

const sortForRadix = (arr, significantDigit, radix) => {
    const buckets = new Array(radix);
    const sortedArray = [];
    // for (let i = 0; i < radix; i++) buckets[i] = [];
    arr.forEach(element => {
        let index = Math.floor(element / significantDigit) % radix;
        !buckets[index] && (buckets[index] = [])
        buckets[index].push(element);
    })
    buckets.forEach(bucket => {
        sortedArray.push(...bucket)
    })
    return sortedArray
}