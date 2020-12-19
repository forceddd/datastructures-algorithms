/*
 * @Description: 
 * @Author: forceddd
 * @Date: 2020-12-16 20:47:15
 * @LastEditors: forceddd
 * @LastEditTime: 2020-12-19 11:13:07
 */
import { swap, defaultCompare, Compare } from '../util.js';

//冒泡排序 bubbleSort O(n**2)
export const bubbleSort = (arr, compare = defaultCompare) => {
    const { length } = arr;
    //外循环控制迭代次数，迭代次数比数组长度少一次，因为在迭代了leng-2次之后，arr[0]已经在之前和其他项都比较过了，不需要再与其他项比较
    for (let i = 0; i < length - 1; i++) {
        //内循环比较当前项和下一项的大小
        for (let j = 0; j < length - 1 - i; j++) {
            //如果当前项大于下一项，二者交换位置
            compare(arr[j], arr[j + 1]) === Compare.BIGGER_THAN && swap(j, j + 1, arr);
        }
    }
    return arr;
}

//选择排序 selectionSort O(n**2)
export const selectionSort = (arr, compare = defaultCompare) => {
    const { length } = arr;
    let minIndex;//最小值的下标
    //外循环控制迭代轮次 length-1次
    for (let i = 0; i < length - 1; i++) {
        minIndex = i;//假设迭代起始位置为最小值
        //内循环用来找出本轮真正的最小值 从i处开始迭代 i之前的已经排好序
        for (let j = i + 1; j < length; j++) {
            if (compare(arr[minIndex], arr[j]) === Compare.BIGGER_THAN) minIndex = j;
        }
        //比较之后 如果找到了更小的值，将二者互换位置
        i !== minIndex && swap(i, minIndex, arr);
    }
    return arr;
}
//插入排序 insertionSort
export const insertionSort = (arr, compare = defaultCompare) => {
    const { length } = arr;
    let temp;//用于数组交换位置的中间值
    //外循环控制迭代 假设第一项已经有序，从第二项开始迭代
    for (let i = 1; i < length; i++) {
        let j = i;//用j存当前的i值 因为之后需要循环可能改变下标
        temp = arr[j];//存储当前迭代项的值
        //将当前项 和前一项进行比较 看应该插入到左边还是右边
        while (j > 0 && compare(arr[j - 1], temp) === Compare.BIGGER_THAN) {
            //当左侧的值大于当前项的值时，将左侧的值移到当前项位置，然后继续比较
            arr[j] = arr[j - 1];
            // 将j递减 继续比较更前一项 以找到合适的插入位置 
            j--;
        }
        //当j=0时说明到了数组第一位，再往前已经没有元素，直接插入即可；当前一项的值小于temp时，说明找到了合适位置
        arr[j] = temp;
    }
    return arr;
}

//快速排序 O(n*log(n))

export const partition = (arr, left = 0, right = arr.length - 1, compare = defaultCompare) => {
    let pivotIndex = Math.floor((left + right) / 2);
    const pivot = arr[pivotIndex];
    let i = left, j = right;
    while (i < j) {
        //从左向右找不比主元小的值,如果找到就暂停
        while (compare(arr[i], pivot) === Compare.LESS_THAN) {
            i++;
        }
        //接着 从右向左找不比主元大的值 如果找到 就暂停
        while (compare(arr[j], pivot) === Compare.BIGGER_THAN) {
            j--;
        }
        //比较左指针和右指针大小 交换大值和小值位置，这样左边就变成小值，右边就变成大值
        //最终在下标i左侧的元素都是小值 i及i右侧的元素都是大值
        //i == j 时必须继续 i++ j-- 可以不交换值
        if (i <= j) {
            i < j && swap(i, j, arr);
            i++;
            j--;
        }
    }
    //将i作为分界点 i左边的数都是小于i右边的数的
    return i;
}
const quick = (left = 0, right = arr.length - 1, arr, compare = defaultCompare) => {
    //只有一个元素时 一定是有序的
    if (arr.length > 1) {
        let pivotIndex = partition(arr, left, right, compare);
        //当left不小于pivotIndex-1时 说明左侧起点和临界点之间没有元素了 不需要再排序
        left < pivotIndex - 1 && quick(left, pivotIndex - 1, arr, compare);
        //同理 对较大数数组arr[pivotIndex]--arr[right]排序
        pivotIndex < right && quick(pivotIndex, right, arr, compare)
    }
    return arr;
}
export const quickSort = (arr, compare = defaultCompare) => quick(0, arr.length - 1, arr, compare);
//归并排序 O(n *log(n))
//归并排序合并函数 将两个排好序的数组合并到一起
export const merge = (left, right, compare) => {
    let i = 0,
        j = 0;//创建两个下标，用来依次比较left元素和right元素的大小
    const result = [];//储存结果的数组
    //比较两个数组，按照大小逐次添加到结果数组中，最终left或者right会有一方全部被添加到result
    while (i < left.length && j < right.length) {
        result.push(compare(left[i], right[j]) === Compare.LESS_THAN ? left[i++] : right[j++]);
    }
    //把另一方剩余的元素添加到结果数组中
    return result.concat(i < left.length ? left.slice(i) : right.slice(j));
}
export const mergeSort = (arr, compare = defaultCompare) => {
    //将数组切成单个元素数组
    const { length } = arr;
    if (length > 1) {
        const middle = Math.floor(length / 2);
        const left = mergeSort(arr.slice(0, middle), compare)
        const right = mergeSort(arr.slice(middle), compare);
        //将拆分后的数组排序合并
        arr = merge(left, right, compare)
    }
    return arr
}

//计数排序 整数排序算法 O(n+k) k是临时计数数组的大小  分布式排序算法
export const countingSort = arr => {
    //如果数组为空 或者只有一个元素 不需要排序
    if (arr.length < 2) return arr;
    //找出整数数组中的最大值，用于确认创建辅助数组的大小
    const maxValue = Math.max(...arr),
        //创建辅助数组 
        counts = new Array(maxValue + 1);
    //将arr 的value作为index，value出现的次数作为值 填充counts
    arr.forEach(item => {
        //如果之前该value没有出现过 就将次数初始为0
        if (!counts[item]) counts[item] = 0;
        counts[item]++;
    });
    //用于将counts数组转换为排序数组的辅助下标
    let sortedIndex = 0
    counts.forEach((count, value) => {
        //当次数不为空时 将值按顺序插入数组中 如果count是undfined 不会执行回调函数
        while (count > 0) {
            arr[sortedIndex++] = value;
            count--;
        }
    })
    return arr;
}

//桶排序/箱排序 分布式排序 最好情况O(n)
//将数组分成较小的数组 然后对较小数组使用简单的排序方法 再将排序好之后的数组合并
//创建桶
const createBuckets = (arr, bucketSize) => {
    //根据数组的最大值和最小值来确定创建多少个桶  根据数组每项和最小值的差值 来确定应把该项放在哪个桶中
    //Math.floor((max-min)/bucketSize) 是最大值在桶中的下标 所以总长是该值+1
    const min = Math.min(...arr),
        max = Math.max(...arr),
        bucketCount = Math.floor((max - min) / bucketSize) + 1,
        //buckets是一个二维数组，每一项是一个桶，桶中是划分来的数组元素
        //初始化buckets 不能使用.fill([]) 这样是将同一个[] 给赋值 
        buckets = new Array(bucketCount);
    for (let i = 0; i < bucketCount; i++) buckets[i] = [];
    //计算每一项应该在buckets中的下标
    arr.forEach(item => {
        const bucketIndex = Math.floor((item - min) / bucketSize);
        buckets[bucketIndex].push(item);
    })
    return buckets;
}
//对桶数组中的每个桶进行插入排序，然后将排序后的所有桶连接起来
const sortBuckets = buckets => {
    const sortedArray = [];
    buckets.forEach(bucket => {
        insertionSort(bucket);
        sortedArray.push(...bucket)
    })
    return sortedArray
}

export const bucketSort = (arr, bucketSize = 5) => {
    if (arr.length < 2) return arr;
    const buckets = createBuckets(arr, bucketSize);
    return sortBuckets(buckets);
}

//基数排序 分布式排序
const sortForRadix = (arr, sidnificantDifit, radix) => {
    const sortedArray = [];
    //根据传入的禁制初始化桶
    const buckets = new Array(radix);
    for (let i = 0; i < radix; i++) {
        buckets[i] = [];
    }
    arr.forEach(item => {
        let bucketIndex = Math.floor(item / sidnificantDifit) % 10;
        buckets[bucketIndex].push(item);
    })
    buckets.forEach(bucket => void bucket.length && sortedArray.push(...bucket))
    return sortedArray
}
export const radixSort = (arr, radix = 10) => {
    let significantDigit = 1;//有效位 个位
    const max = Math.max(...arr);
    let aux = JSON.parse(JSON.stringify(arr));//用于存储排序后的数组 给原数组赋值
    while (max / significantDigit >= 1) {
        aux = sortForRadix(aux, significantDigit, radix);
        significantDigit *= 10;
    }
    aux.forEach((a, i) => void (arr[i] = a))
    return arr;
}