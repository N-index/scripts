// get more test cases at https://www.freecodecamp.org/learn/coding-interview-prep/algorithms/inventory-update

function updateInventory(arr1, arr2) {
  // assume that arr1 is in order
  const compareFn = (a, b) => {
    if (a[1] < b[1]) {
      return -1;
    }
    if (a[1] > b[1]) {
      return 1;
    }
    if (a[1] === b[1]) {
      return 0;
    }
  };
  if (!arr1.length) {
    return arr2.sort(compareFn);
  }

  arr2.forEach(newItem => {
    const existItems = curInv.map(e => e[1]);
    const indexOfNewItem = existItems.indexOf(newItem[1]);
    if (indexOfNewItem >= 0) {
      arr1[indexOfNewItem][0] += newItem[0];
    } else {
      arr1.push(newItem);
    }
  });

  return arr1.sort(compareFn);
}

// Example inventory lists
var curInv = [
  [21, 'Bowling Ball'],
  [2, 'Dirty Sock'],
  [1, 'Hair Pin'],
  [5, 'Microphone'],
];

var newInv = [
  [2, 'Hair Pin'],
  [3, 'Half-Eaten Apple'],
  [67, 'Bowling Ball'],
  [7, 'Toothpaste'],
];

console.log(
  updateInventory(
    [],
    [
      [2, 'Hair Pin'],
      [3, 'Half-Eaten Apple'],
      [67, 'Bowling Ball'],
      [7, 'Toothpaste'],
    ]
  )
);
