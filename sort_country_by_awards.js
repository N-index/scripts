const inputNum = 5;
const inputScore = `China 32 28 34
England 12 34 22
France 23 33 2
Japan 12 34 25
Rusia 23 43 0
`;
// interview question

const scoreDict = {};
for (let i = 0; i < inputNum; i++) {
  const items = inputScore.split('\n')[i].split(' ');
  const countryName = items[0];
  const [gold, sliver, brown] = [...items.slice(1)].map(v => parseInt(v));
  scoreDict[countryName] = [gold, sliver, brown];
}

let res = [];
const scoreArr = Object.entries(scoreDict);
let compareTypeIndex = 0;

while (scoreArr.length) {
  let maxIndex = 0;
  if (compareTypeIndex < 3) {
    scoreArr.forEach((item, index, arr) => {
      if (item[1][compareTypeIndex] > arr[maxIndex][1][compareTypeIndex]) {
        maxIndex = index;
      }
    });
  } else {
    maxIndex = 0;
  }
  res.push(...scoreArr.splice(maxIndex, 1));
  compareTypeIndex++;
}
res = res.map(v => v[0]);
console.log(res);
