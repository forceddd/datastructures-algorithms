import { Compare, defaultCompare, DO_NOT_EXIST } from "../../util.js"

const binarySearchCursive=(low,high,arr,value,compare)=>{
    if(low<=high){
        const middle = Math.floor((low + high) / 2),
            element = arr[middle],
            difference = compare(element, value);
        if (difference === Compare.EQUALS) return middle;
        else if (difference === Compare.LESS_THAN) return binarySearchCursive(middle + 1, high, arr, value, compare);
        else return binarySearchCursive(low, middle - 1, arr, value, compare);
    }
    return DO_NOT_EXIST;
}

export const binarySearch=(arr,value,compare=defaultCompare)=>{
    const low=0,high=arr.length-1;
    return binarySearchCursive(low,high,arr,value,compare)
}
