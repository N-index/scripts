// https://www.mathsisfun.com/roman-numerals.html
function convertToRoman(num) {
  let res = '';

  const thousands = Math.floor(num / 1000);
  if (thousands) {
    res += 'M'.repeat(thousands);
  }

  let rest = num % 1000;
  const hundreds = Math.floor(rest / 100);
  switch (hundreds) {
    case 9:
      res += 'CM';
      break;
    case 8:
      res += 'DCCC';
      break;
    case 7:
      res += 'DCC';
      break;
    case 6:
      res += 'DC';
      break;
    case 5:
      res += 'D';
      break;
    case 4:
      res += 'CD';
      break;
    case 3:
      res += 'CCC';
      break;
    case 2:
      res += 'CC';
      break;
    case 1:
      res += 'C';
      break;
  }

  rest = num % 100;
  const ten = Math.floor(rest/10);
  switch (ten) {
    case 9:
      res += 'XC';
      break;
    case 8:
      res += 'LXXX';
      break;
    case 7:
      res += 'LXX';
      break;
    case 6:
      res += 'LX';
      break;
    case 5:
      res += 'L';
      break;
    case 4:
      res += 'XL';
      break;
    case 3:
      res += 'XXX';
      break;
    case 2:
      res += 'XX';
      break;
    case 1:
      res += 'X';
      break;
  }

  rest = num % 10;
  const single = Math.floor(rest);
  switch (single) {
    case 9:
      res += 'IX';
      break;
    case 8:
      res += 'VIII';
      break;
    case 7:
      res += 'VII';
      break;
    case 6:
      res += 'VI';
      break;
    case 5:
      res += 'V';
      break;
    case 4:
      res += 'IV';
      break;
    case 3:
      res += 'III';
      break;
    case 2:
      res += 'II';
      break;
    case 1:
      res += 'I';
      break;
  }

  return res;
}

const res = convertToRoman(4);
console.log(res);

