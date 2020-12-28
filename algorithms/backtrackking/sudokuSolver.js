/*
 * @Description:
 * @Author: forceddd
 * @Date: 2020-12-28 20:20:18
 * @LastEditors: forceddd
 * @LastEditTime: 2020-12-28 21:09:10
 */
const sudokuSolver = matrix => solveSudoku(matrix) ? matrix : 'no answer';
//判断填入的num 在x轴（行）y轴（列）以及九宫格中是否合法
const isLegal = (matrix, x, y, num) => !usedInRow(matrix, x, num) && !usedInCol(matrix, y, num) && !usedInBox(matrix, x - (x % 3), y - y % 3, num)

const usedInRow = (matrix, row, num) => matrix[row].some(n => n === num);
const usedInCol = (matrix, col, num) => {
    for (let row = 0; row < matrix.length; row++) {
        if (matrix[row][col] === num) return true;
    }
    return false
}
const usedInBox = (matrix, row, col, num) => {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (matrix[i + row][j + col] === num) return true;
        }
    }
    return false;
}
//先遍历矩阵 查找是否有没有填写（值为0）的项，如果有，就填写值，如果没有说明数独格子已经被填完了
const solveSudoku = matrix => {
    let row, col, existBlankSpace = false;//r c 用来存储当前遍历元素的位置
    for (row = 0; row < matrix.length; row++) {
        for (col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] === 0) {
                existBlankSpace = true;
                break;//跳出内循环
            }
        }
        //跳出外循环
        if (existBlankSpace) break;
    }
    //全部填写完成
    if (!existBlankSpace) return true;
    //从1-9 填写该空白处，并验证是否合法
    for (let n = 1; n <= 9; n++) {
        if (isLegal(matrix, row, col, n)) {
            //如果当前空白值合法，继续递归，查找下一个空白处
            matrix[row][col] = n;
            //如果之后的所有值都合法，返回true
            if (solveSudoku(matrix)) return true;
            //如果之后的值 存在不合法 则此时填入的值也不合法 要从继续1-9的循环,继续填值
        }
    }
    //全部值都不合法，说明无解，将该处的值重新设为0（在for循环中 改变了该处的值） 并返回false
    return matrix[row][col] = 0
        ;

}



export default sudokuSolver;