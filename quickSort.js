// https://www.freecodecamp.org/learn/coding-interview-prep/algorithms/implement-quick-sort
function quickSort(array) {
  // base case of an empty or single-item array
  if(array.length<=1){
    return array;
  }

  // 支点
  let pivot = array[0];
  const left_sub =[],right_sub = [];
  for(let i=1;i<array.length;i++){
    const current = array[i];
    if(current<pivot){
      left_sub.push(current);
    }else{
      right_sub.push(current);
    }
  }
  const res = [...quickSort(left_sub),pivot,...quickSort(right_sub)];

  return res;
}
