import Graph, { breadthFirstSearch, BFS } from './graph.js';
import Queue from '../queue/queue.js';

const graph = new Graph();
const vertices = ['A', 'B', 'C', 'D', 'E'];
vertices.forEach(v => graph.addVertex(v))
// graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('A', 'D')
graph.addEdge('B', 'D')
graph.addEdge('C', 'E')
graph.addEdge('C', 'D')
// graph.addEdge('C', 'B')
console.log(graph.toString())
breadthFirstSearch(graph, 'A', v => console.log(v))
breadthFirstSearch(graph, 'C', v => console.log(v))
console.log(BFS(graph, 'A'))
