// 使用reduce实现array的map和filter
function myMap(fn) {
  const res = this.reduce((acc, cur, index, array) => {
    acc.push(fn(cur, index, array));
    return acc;
  }, []);
  return res;
}

function myFilter(fn) {
  const res = this.reduce((acc, cur, index, array) => {
    if (fn(cur, index, array)) acc.push(cur);
    return acc;
  }, []);
  return res;
}
Array.prototype.myMap = myMap;
Array.prototype.myFilter = myFilter;

const arr = [1, 2, 3, 4, 6, 7, 8, 33, -4, 10, 20];
const res = arr.myFilter((e, i, arr) => e > 5 && i % 2);
console.log(res);

const arr1 = [1,2,3,4,5]
const res1 = arr1.myMap(e=>e+1);
console.log(res1);
