/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
    heapSort(nums);
    return nums;
};

function swap(arr,i,j){
    [arr[i], arr[j]] = [arr[j], arr[i]];
}

function heapify(arr, i, n){
    if(i >= n) return;
    // i代表要heapify的下标
    // n代表堆的元素个数，因为heapSort是in-place算法，所以需要n来约束最终迭代的边界
    const c1 = i * 2 + 1;
    const c2 = i * 2 + 2;

    let max = i;
    if(c1 < n && arr[c1] > arr[max])    max = c1;
    if(c2 < n && arr[c2] > arr[max])    max = c2;
    if( max !== i){
        swap(arr, max, i);
        heapify(arr, max, n);
    }
}
function buildHeap(arr){
    const lastNode = arr.length - 1;
    const lastParent = Math.floor((lastNode - 1) / 2);

    for(let i = lastParent; i >= 0; i--){
        heapify(arr, i, arr.length);
    }
}
function heapSort(arr){
    buildHeap(arr);

    for(let i = arr.length - 1; i>=0;i--){
        swap(arr, 0, i);
        // i 代表树的界限
        heapify(arr, 0, i);
    }

}
