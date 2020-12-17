import { swap, defaultCompare, Compare } from '../util.js';

//冒泡排序 bubbleSort O(n**2)
export const bubbleSort = (arr, compare = defaultCompare) => {
    const { length } = arr;
    //外循环从数组第一位迭代到最后一位
    for (let i = 0; i < length; i++) {
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
        for (let j = i; j < length; j++) {
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
        let j = i;
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
export const quickSort2 = (arr, left = 0, right = arr.length - 1, compare = defaultCompare) => {
    let pivotIndex = Math.floor((left + right) / 2);//作为比较标准的主元值
    const pivot = arr[pivotIndex];
    let i = left, j = right;//用于遍历数组的左右指针
    //从左向右找出比piovt大的值
    while (i < j && compare(arr[i], pivot) === Compare.LESS_THAN) {
        i++;
    }
    if (i < j) {
        arr[pivotIndex] = arr[left];
        left++;
    }


}
export const partition = (arr, left = 0, right = arr.length - 1, compare = defaultCompare) => {
    let pivotIndex = Math.floor((left + right) / 2);
    const pivot = arr[pivotIndex];
    let i = left, j = right;
    while (i <= j) {
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
        if (i <= j) {
            swap(i, j, arr);
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