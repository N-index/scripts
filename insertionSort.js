// https://www.freecodecamp.org/learn/coding-interview-prep/algorithms/implement-insertion-sort

function insertionSort(array) {
  // Only change code below this line
  let sorted_length = 1;

  // 从第二位开始
  for(let i=sorted_length;i<array.length;i++){

    const need_insert = array[i];
    let insert_index = 0;
    
    // 在有序列表中寻找坑位
    for(let j=0;j<=sorted_length;j++){
      if(need_insert < array[j]){
        break;
      }else{
        insert_index = j+1;
      }
    }
    // 插入有序列表，修改有序列表的长度
    array.splice(insert_index,0,need_insert);
    sorted_length += 1;
    // 移除无序列表中的元素
    array.splice(i+1,1);
   
  }
  return array;
  // Only change code above this line
}

insertionSort([1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]);
