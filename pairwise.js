// https://www.freecodecamp.org/learn/coding-interview-prep/algorithms/pairwise

function pairwise(arr, arg) {
  
  const already_paired_index = [];
  for(let i=0;i<arr.length;i++){
    // 只能用一次
    if(already_paired_index.includes(i)){
        continue;
    }

    const expect = arg - arr[i];
    for(let j=i+1; j<arr.length; j++){
      // 只能用一次
      if(already_paired_index.includes(j)){
        continue;
      }
      if(arr[j]===expect){
        already_paired_index.push(i,j);
        break;
      }
    }
  }

  return already_paired_index.reduce((a,b)=>a+b,0);
}

console.log(pairwise([1,4,2,3,0,5], 7))
