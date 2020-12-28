/*
 * @Description:
 * @Author: forceddd
 * @Date: 2020-12-28 16:30:31
 * @LastEditors: forceddd
 * @LastEditTime: 2020-12-28 20:19:14
 */
//迷宫老鼠 回溯算法
const ratInAMaze = maze => {
    const solution = [];//结果矩阵，二维数组，初始值全部为0，找到正确的路径，将其设为
    maze.forEach((m, i) => solution[i] = new Array(m.length).fill(0));
    console.log('solution', solution);
    //
    return findPath(maze, solution) ? solution : 'NO MATCH PATH'
}
//findPath  根据传入的解 和当前的坐标 来判断是否可以继续前进
const findPath = (maze, solution, x = 0, y = 0) => {
    const { length } = maze;
    //判断x y值是否合法，判断此位置在迷宫是墙还是路
    if (x >= length || x < 0 || y >= length || y < 0 || maze[x][y] === 0) return false;
    //如果走到了终点，将当期x y 设为合法值1 返回true
    if (x === length - 1 && y === length - 1) return solution[x][y] = 1;
    //如果不是终点，继续走
    //先向右走一步，判断右边是否可以通行
    if (findPath(maze, solution, x + 1, y)) return solution[x][y] = 1;
    //如果不能通行，返回原始值，向下走一步，判断是否可以通行
    if (findPath(maze, solution, x, y + 1)) return solution[x][y] = 1;
    //如果都不能通行 说明x y不合法 返回false solution[x][y]默认即为初始值0
    return false;


}
// const findPath = (maze, solution, x = 0, y = 0) => {
//     const { length } = maze;
//     console.log(x, y);
//     if (x === length - 1 && y === length - 1) {
//         solution[x][y] = 1;
//         return true;
//     }
//     //判断x y值是否合法，判断此位置在迷宫是墙还是路
//     if (x < length && x >= 0 && y < length && y >= 0 && maze[x][y] != 0) {
//         solution[x][y] = 1;

//         //先向右走一步，判断右边是否可以通行
//         if (findPath(maze, solution, x + 1, y)) return true;
//         //如果不能通行，返回原始值，向下走一步，判断是否可以通行
//         if (findPath(maze, solution, x, y + 1)) return true;
//         solution[x][y] = 0;
//     }
//     //如果都不能通行 说明x y处不能通过 
//     return false;


// }
export default ratInAMaze
