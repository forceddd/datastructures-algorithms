import Graph, { breadthFirstSearch, BFS, depthFirstSearch, DFS, dijkstra, floydwarshell } from './graph.js';
import Queue from '../queue/queue.js';

const graph = new Graph(true);
const vertices = ['A', 'B', 'C', 'D', 'E', 'F'];
vertices.forEach(v => graph.addVertex(v))
// graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('A', 'D')
graph.addEdge('B', 'D')
graph.addEdge('B', 'E')
graph.addEdge('C', 'F')
graph.addEdge('F', 'E')
// graph.addEdge('C', 'B')
// console.log(graph.toString())
// breadthFirstSearch(graph, 'A', v => console.log(v))
// breadthFirstSearch(graph, 'C', v => console.log(v))
// // console.log(BFS(graph, 'A'))
// depthFirstSearch(graph, v => console.log(v))
// console.log(graph.toString())
const { finished } = DFS(graph);
let s = '';
vertices.forEach(v => {
    let max = 0,
        maxName = null;
    vertices.forEach(vertex => {
        if (finished[vertex] > max) {
            max = finished[vertex];
            maxName = vertex;
        }
    })
    s += ' - ' + maxName;
    delete finished[maxName]
})
// console.log(s)
const g = [
    [0, 2, 4, 0, 0, 0],
    [0, 0, 2, 4, 2, 0],
    [0, 0, 0, 0, 3, 0],
    [0, 0, 0, 0, 0, 2],
    [0, 0, 0, 3, 0, 2],
    [0, 0, 0, 0, 0, 0]
]
console.log(dijkstra(g, 5))
console.log(floydwarshell(g))

