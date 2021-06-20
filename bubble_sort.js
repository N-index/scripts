function bubbleSort(array) {
  // Only change code below this line
  const arr = [...array];

  for(let i=0; i<arr.length-1; i++){
    for(let j=0; j<arr.length-i-1; j++){
      if(arr[j] > arr[j+1]){
        [arr[j],arr[j+1]] =  [arr[j+1],arr[j]];
      }
    }
  }
  return arr;
  // Only change code above this line
}

bubbleSort([1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]);
