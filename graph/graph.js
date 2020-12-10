import Dictionary from '../dictionary/dictionary/dictionary.js';
import Queue from '../queue/queue.js'
export default class Graph {
    constructor(isDirected = false) {
        this.isDirected = isDirected;//图是否有向 默认无向
        this.vertices = [];//存储顶点名字的数组
        this.adjList = new Dictionary();//邻接表 使用顶点名作为键 相邻顶点列表作为值
    }
    //增加一个顶点
    addVertex(vertex) {
        if (!this.vertices.includes(vertex)) {
            this.vertices.push(vertex);
            //添加邻接点列表
            this.adjList.set(vertex, []);
        }
    }
    //给顶点增加边
    addEdge(v, w) {
        //如果 v w不存在图中 就添加进去
        if (!this.adjList.get(v)) {
            this.addVertex(v)
        }
        if (!this.adjList.get(w)) {
            this.addVertex(w)
        }
        //再次获取邻接点列表
        this.adjList.get(v).push(w);
        if (!this.isDirected) {
            //无向列表
            this.adjList.get(w).push(v);
        }
    }
    getVertices() {
        return this.vertices
    }
    getAdjList() {
        return this.adjList;
    }
    toString() {
        let s = '';
        this.vertices.forEach(vertex => {
            const neighbors = this.adjList.get(vertex);
            s = `${s}${vertex}->  `;
            neighbors.forEach(n => s = `${s}${n} `);
            s += '\n';
        })
        return s;
    }

}
//在广度优先和深度优先算法中 标记顶点
const Colors = {
    WHITE: 0,//未被访问过
    GRAY: 1,//已被访问过，但未被探索过
    BLACK: 2//已被访问过，并且被完全探索过
}
//存储节点是否被访问过的辅助对象
const initializeColor = vertices => {
    const color = {};
    vertices.forEach(vertex => color[vertex] = Colors.WHITE);
    return color;
}

export const breadthFirstSearch = (graph, startVertex, cb) => {
    const vertices = graph.getVertices();
    if (!vertices.includes(startVertex)) return cb && cb();
    const adjList = graph.getAdjList();
    const queue = new Queue();
    const color = initializeColor(vertices);
    queue.enqueue(startVertex);
    color[startVertex] = Colors.GRAY;
    while (!queue.isEmpty()) {
        const v = queue.dequeue(),
            neighbors = adjList.get(v);
        neighbors && neighbors.length && neighbors.forEach(vertex => {
            if (color[vertex] === Colors.WHITE) {
                queue.enqueue(vertex);
                color[vertex] = Colors.GRAY;
            }
        })
        color[v] = Colors.BLACK;
        cb && cb(v, neighbors, graph);
    }
}
//广度优先查找最短路径
export const BFS = (graph, startVertex) => {
    const vertices = graph.getVertices();
    if (!vertices.includes(startVertex)) return undefined;
    const adjList = graph.getAdjList(),
        queue = new Queue(),
        color = initializeColor(vertices),
        distance = {},//存储路径长短
        predecessor = {};//存储前置点
    //初始化 distance predecessor
    vertices.forEach(v => {
        distance[v] = 0;
        predecessor[v] = null;
    })
    queue.enqueue(startVertex);
    color[startVertex] = Colors.GRAY;
    while (!queue.isEmpty()) {
        const vertex = queue.dequeue(),
            neighbors = adjList.get(vertex);
        neighbors.forEach(v => {
            if (color[v] === Colors.WHITE) {
                queue.enqueue(v);
                color[v] = Colors.GRAY;
                distance[v] = distance[vertex] + 1;
                predecessor[v] = vertex;
            }
        })
        color[vertex] = Colors.BLACK;

    }
    return {
        distance,
        predecessor
    }
}