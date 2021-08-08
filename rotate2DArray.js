// 旋转输出 m x n 的二维数组。

function getNumberBetween(from, to) {
  return Math.floor(Math.random() * (to - from)) + from;
}

function generate2DArray(m, n) {
  const arr = [];
  for (let i = 0; i < m; i++) {
    const inner = [];
    for (let j = 0; j < n; j++) {
      inner.push(getNumberBetween(-20, 100));
    }
    arr.push(inner);
  }

  console.log(arr);
  return arr;
}


function getItemOf2DArray(array, row, column) {
  if (row >= array.length || column >= array[0].length) {
    throw Error('Error: index is wrong when getting item from 2D-array');
  }
  return array[row][column];
}

function getRotateItemFrom2DArray(array) {
  const res = [];
  const allRowCount = array.length, allColumnCount = array[0].length;


  // 常量
  const direction = {
    RIGHT: 0,
    DOWN: 1,
    LEFT: 2,
    UP: 3
  };


  // 初始个数、初始方向、初始坐标、初始边界
  let count = 0;
  let currentDirection = direction.RIGHT;
  const cursor = {
    row: 0,
    column: -1
  };
  const bound = {
    topWall: -1,
    bottomWall: allRowCount,
    leftWall: -1,
    rightWall: allColumnCount
  };

  while (count < allRowCount * allColumnCount) {

    switch (currentDirection) {
      case direction.RIGHT: {
        if (cursor.column >= bound.rightWall - 1) {
          currentDirection = direction.DOWN;
          bound.topWall++;
          continue;
        }
        cursor.column++;
        break;
      }
      case direction.DOWN: {
        if (cursor.row >= bound.bottomWall - 1) {
          currentDirection = direction.LEFT;
          bound.rightWall--;
          continue;
        }
        cursor.row++;
        break;
      }

      case direction.LEFT: {
        if (cursor.column <= bound.leftWall + 1) {
          currentDirection = direction.UP;
          bound.bottomWall--;
          continue;
        }
        cursor.column--;
        break;

      }
      case direction.UP: {
        if (cursor.row <= bound.topWall + 1) {
          currentDirection = direction.RIGHT;
          bound.leftWall++;
          continue;
        }
        cursor.row--;
        break;
      }
      default:
        throw Error('Wrong direction!');
    }
    res.push(getItemOf2DArray(array, cursor.row, cursor.column));
    count++;
  }
  return res;
}


function main() {
  const arr = generate2DArray(7, 5);
  const res = getRotateItemFrom2DArray(arr);
  console.log(res.join(' '));
}

main();
