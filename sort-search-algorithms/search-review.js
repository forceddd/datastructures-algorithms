import {defaultCompare,Compare} from '../util.js'

export const binarySearch=(arr,value,compare=defaultCompare)=>{
    return binary(arr,value,compare)
}
const  binary = (arr, value,compare, low = 0, high = arr.length - 1) => {
    if(low<=high){
        let mid = Math.floor((low + high) / 2);
        const element = arr[mid],
            diff = compare(value, element);
        if (diff === Compare.EQUALS) return mid;
        else if (diff === Compare.BIGGER_THAN) return binary(arr, value, compare, mid + 1, high);
        else return binary(arr, value, compare, low, mid - 1)
    }
    return -1;
}

//