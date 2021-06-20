// https://www.freecodecamp.org/learn/coding-interview-prep/data-structures/typed-arrays
function mergeSort(array) {
    // base case —— single-item, nuturally sorted
    if(array.length === 1){
        return array;
    }
    // 分支
    const half = Math.floor(array.length/2);
    const from_left = mergeSort(array.slice(0,half));
    const from_right = mergeSort(array.slice(half));

    // 归并
    const merged = [];
    while(from_left.length || from_right.length){

        // 取左边首位：右边为空，或者左边首位小于右边首位，
        // note: <= 号中的 =号很重要，使得 if 至少在比大小上互补。        （我需要找一个办法去判断多个if中的条件组合是否覆盖所有的情况）
        if(!from_right.length || from_left[0] <= from_right[0]){
            merged.push(from_left.shift());
            // 刚开始忘了这个continue，导致 while 中的两个 if 可能同时触发。
            continue;
        }

        // 取右边首位：左边为空，或者右边首位小于左边首位，
        if(!from_left.length || from_right[0] < from_left[0]){
            merged.push(from_right.shift());
        }

    }

    return merged;
}

const res =mergeSort([1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]);
console.log(res);
