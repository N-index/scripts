const { performance } = require('perf_hooks');

// 二分查找
const binary_search = (array, item) => {
  let low = 0,
    high = array.length - 1;
  let middle;
  while (low <= high) {
    middle = Math.floor((low + high) / 2);

    if (item === array[middle]) return middle;
    if (item > array[middle]) {
      low = middle + 1;
    }
    if (item < array[middle]) {
      high = middle - 1;
    }
  }
  return -1;
};

// 线性查找
const linear_search = (array, item) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === item) return i;
    if (array[i] > item) return -1;
  }
  return -1;
};


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// 随机数列-有序
function generateFakeList(number, min, max) {
  const origin = [];
  for (let i = 0; i < number; i++) {
    origin.push(getRandomInt(min, max));
  }
  origin.sort((a, b) => a - b);
  return origin;
}

function main() {
  const origin = generateFakeList(200000, 20000, 220000);
  const target = getRandomInt(120000, 180000);
  //   console.log(`Origin: ${origin}`);
  console.log(`Target:${target}`);

  // 二分查找的性能
  const binary_search_start = performance.now();
  const binary_search_result = binary_search(origin, target);
  const binary_search_end = performance.now();
  console.log(
    `二分查找的结果是${binary_search_result}, 共用时${
      binary_search_end - binary_search_start
    } milliseconds.`
  );

  // indexOf的性能
  const indexOf_search_start = performance.now();
  const indexOf_search_result = origin.indexOf(target);
  const indexOf_search_end = performance.now();
  console.log(
    `indexOf的结果是${indexOf_search_result}, 共用时${
      indexOf_search_end - indexOf_search_start
    } milliseconds.`
  );

  // 线性查找的性能
  const linear_search_start = performance.now();
  const linear_search_result = linear_search(origin, target);
  const linear_search_end = performance.now();
  console.log(
    `线性查找索引的结果是${linear_search_result}, 共用时${
      linear_search_end - linear_search_start
    } milliseconds.`
  );
}

main();
