// https://www.freecodecamp.org/learn/coding-interview-prep/algorithms/no-repeats-please
function permAlone(str) {
  const allCombinations = getAllCombinations(str);
  let count = 0;

  allCombinations.forEach(e => {
    if (isNoRepeat(e)) {
      count += 1;
    }
  });
  return count;
}

// 获取一串字符的所有组合，已经用Python实现，现改为JS。需要复习
function getAllCombinations(str) {
  if (str.length === 1) {
    return [str];
  }
  let allCombinations = [];
  for (let i = 0; i < str.length; i++) {

    const firstChar = str[i];

    const restCombinations = getAllCombinations(
      str.slice(0, i) + str.slice(i + 1)
    );

    const currentFirstCharCombinations = [];
    restCombinations.forEach(e => {
      currentFirstCharCombinations.push(firstChar + e);
    });

    allCombinations = allCombinations.concat(currentFirstCharCombinations);
  }

  return allCombinations;
}

// 判断一串字符是否有连续的字符出现，这个简单。
function isNoRepeat(str) {
  let prev = '';
  for (let current of str) {
    if (current === prev) {
      return false;
    }
    prev = current;
  }
  return true;
}

// console.log(permAlone('abc'));
permAlone("abcde")
