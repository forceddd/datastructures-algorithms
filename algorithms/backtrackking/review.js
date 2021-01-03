
//迷宫老鼠问题
export const ratInAMaze = maze => {
    //答案数组
    const solution = [];
    for (let i = 0; i < maze.length; i++) {
        solution[i] = new Array(maze[i].length).fill(0);
    }
    return solve(0, 0, solution, maze) ? solution : '没有正确路径';
}

const solve = (x, y, solution, maze) => {
    //判断x y是否是合法值
    if (x < 0 || y < 0 || x >= maze[0].length || y >= maze.length || maze[x][y] === 0) return false;
    solution[x][y] = 1;

    //判断是否已经到达终点
    if (x === maze[0].length - 1 && y === maze.length - 1) return true;
    if (solve(x + 1, y, solution, maze)) {
        return true;
    }
    if (solve(x, y + 1, solution, maze)) {
        return true;
    }
    return solution[x][y] = 0;
}

//数独解题器
export const sudokuSolver = matrix => solveSudoku(matrix) ? matrix : '该矩阵无解';

const solveSudoku = matrix => {
    const { length } = matrix.length;
    let x, y, existBlankSpace = false;//找出尚未填值的空白位置
    for (let row = 0; row < length; row++) {
        for (let col = 0; col < length; col++) {
            if (matrix[row][col] === 0) {
                existBlankSpace = true;
                x = row;
                y = col;
                break
            }
        }
        if (existBlankSpace) break;
    }
    //没有空白格子 返回true
    if (!existBlankSpace) return true
    //对挑选出的空白处填值
    for (let i = 1; i <= 9; i++) {
        //判断此时填入的值 i 是否合法
        if (isLegal(x, y, matrix, i)) {
            matrix[x][y] = i;
            //继续判断后续是否合法
            if (solveSudoku(matrix)) return true
        }
    }
    //没有合法值，将该位置重设为0 返回false
    return matrix[x][y] = 0;
}
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