// https://www.freecodecamp.org/learn/coding-interview-prep/algorithms/find-the-symmetric-difference
function sym() {
  const reducer = (accumulator, currentValue) => {
    const currentSet = new Set(currentValue);
    const differenceSet  = new Set();
    accumulator.forEach(e=>{
      if(!currentSet.has(e)){
        differenceSet.add(e);
      }
    });
    currentSet.forEach(e=>{
      if(!accumulator.has(e)){
        differenceSet.add(e);
      }
    });
    return differenceSet;
  };
  const inputArrays = Object.values(arguments);
  const resultSet = inputArrays.reduce(reducer, new Set());
  // unsorted array.
  return [...resultSet];
}

console.log(sym([1, 2, 3], [5, 2, 1, 4]));
console.log(sym([1, 2, 3, 3], [5, 2, 1, 4]));


