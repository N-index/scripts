// base roman-numeral map
const table = {
  1: 'I',
  5: 'V',
  10: 'X',
  50: 'L',
  100: 'C',
  500: 'D',
  1000: 'M',
};

const tableEntity = Object.fromEntries([
  [0, Object.values(table).slice(0, 3)],
  [1, Object.values(table).slice(2, 5)],
  [2, Object.values(table).slice(4)],
]);

function getRomaOfDigit(digit, level) {
  // hack
  if (level === 3) return 'M'.repeat(digit);

  const [low, middle, high] = [...tableEntity[level]];
  switch (true) {
    case digit === 9:
      return low + high;
    case digit >= 5:
      return middle + low.repeat(digit - 5);
    case digit === 4:
      return low + middle;
    case digit >= 1:
      return low.repeat(digit - 1);
    default:
      return '';
  }
}

function convertToRoman(num) {
  let res = '',
    currentLevel = 4,
    rest = num;

  while (currentLevel > 0) {
    currentLevel--;
    base = Math.pow(10, currentLevel);
    const digit = Math.floor(rest / base);
    res += getRomaOfDigit(digit, currentLevel);
    rest = num % base;
  }

  return res;
}

const res = convertToRoman(44);
console.log(res);
