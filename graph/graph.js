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
//深度优先遍历 
const depthFirstSearchVisit = (vertex, color, adjList, graph, cb) => {
    color[vertex] = Colors.GRAY;
    cb && cb(vertex, adjList, graph);
    const neighbors = adjList.get(vertex);
    neighbors.forEach(v => {
        if (color[v] === Colors.WHITE) {
            depthFirstSearchVisit(v, color, adjList, graph, cb);//对每一个邻接点递归调用访问函数  利用函数执行栈实现深度遍历
        }
    })
    color[vertex] = Colors.BLACK;
}
export const depthFirstSearch = (graph, cb) => {
    const vertices = graph.getVertices(),
        adjList = graph.getAdjList(),
        color = initializeColor(vertices);
    vertices.forEach(v => color[v] === Colors.WHITE && depthFirstSearchVisit(v, color, adjList, graph, cb))
}
const DFSVisit = (v, color, d, f, p, time, adjList) => {
    color[v] = Colors.GRAY;
    d[v] = ++time.count;//发现时间
    const neighbors = adjList.get(v);
    neighbors.forEach(n => {
        if (color[n] === Colors.WHITE) {
            p[n] = v;
            DFSVisit(n, color, d, f, p, time, adjList);
        }
    })

    color[v] = Colors.BLACK;
    f[v] = ++time.count;//完全探索时间
}
export const DFS = graph => {
    const vertices = graph.getVertices(),
        adjList = graph.getAdjList(),
        color = initializeColor(vertices),
        discoveried = {},
        finished = {},
        predecessor = {},
        time = { count: 0 };
    //初始化发现时间 完全探索时间和前置点
    vertices.forEach(v => {
        discoveried[v] = 0;
        finished[v] = 0;
        predecessor[v] = null;
    })
    vertices.forEach(v => color[v] === Colors.WHITE && DFSVisit(v, color, discoveried, finished, predecessor, time, adjList));
    return {
        discoveried,
        finished,
        predecessor
    }
}
// dijkstra 算法
const INF = Number.MAX_SAFE_INTEGER;
//搜索distance数组中的最小值
const minDistance = (distance, visited) => {
    let min = INF,
        minIndex = 0;
    distance.forEach((d, vertex) => {
        if (!visited[vertex] && d < min) {
            min = d;
            minIndex = vertex;
        }
    })
    return minIndex;
}
export const dijkstra = (graph, startVertex) => {
    const distance = [],
        visited = [];
    graph.forEach((neighbors, vertex) => {
        distance[vertex] = INF;
        visited[vertex] = false;
    });
    //初始点距离设为0 其他点都是INF
    distance[startVertex] = 0;
    for (let i = 0; i < graph.length - 1; i++) {
        const v = minDistance(distance, visited);
        //设置已经访问
        visited[v] = true;
        graph.forEach((neighbors, vertex) => {
            if (!visited[vertex] && graph[v][vertex] !== 0 && distance[v] != INF && distance[v] + graph[v][vertex] < distance[vertex]) {
                distance[vertex] = distance[v] + graph[v][vertex]
            }
        })
    }
    return distance;
}
//弗洛伊德算法
export const floydwarshell = graph => {
    const distance = [],
        { length } = graph;
    //初始化distance数组
    for (let i = 0; i < length; i++) {
        distance[i] = [];
        for (let j = 0; j < length; j++) {
            //将两点之间的distance初始化为二者边长 同一个点为0 不相通为INF
            i === j ? distance[i][j] = 0
                : graph[i][j] === 0 ? distance[i][j] = INF
                    : distance[i][j] = graph[i][j]
        }

    }
    //将每一个点作为中间点k 如果i->k->j 比i->j更小 就更新distance
    for (let k = 0; k < length; k++) {
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length; j++) {
                // if (distance[i][k] + distance[k][j] < distance[i][j]) distance[i][j] = distance[i][k] + distance[k][j]
                distance[i][k] + distance[k][j] < distance[i][j] && (distance[i][j] = distance[i][k] + distance[k][j])
            }
        }
    }
    return distance
}

//最小生成树 MST 普利姆算法
export const prim = graph => {
    const { length } = graph,
        parent = [],//存储前一个节点
        keys = new Array(length).fill(INF),//存储路径最小权值
        visited = new Array(length).fill(false);
    keys[0] = 0;
    parent[0] = -1;
    for (let ne = 0; ne < length - 1; ne++) {
        //找出距离上一个父节点，最近的节点u,并从u节点向下查找其他节点
        const u = minDistance(keys, visited);
        visited[u] = true;//设置已经访问
        //找出顶点u到其他顶点v最近的边
        graph[u].forEach((key, v) => {
            if (key && keys[u] !== INF && !visited[v] && key < keys[v]) {
                keys[v] = key;
                //链接顶点u和v 形成一条边
                parent[v] = u;
            }
        })
    }
    return {
        parent, keys
    }
}
//kruskal 算法
const initializeCost = arr => JSON.parse(JSON.stringify(arr));
//找到该顶点的最顶层父节点
const find = (i, parent) => {
    while (parent[i]) {
        i = parent[i];
    }
    return i;
}
//判断两个顶点的父节点是否相同 如果不相同就可以建立连接
const union = (i, j, a, b, parent) => {
    if (i !== j) {
        parent[b] = a;
        return true;
    }
    return false;
}
export const kruskal = graph => {
    const { length } = graph,
        parent = [],
        cost = initializeCost(graph);
    let ne = 0, a, b, u, v;
    //ne 已经建立的边的数量
    while (ne <= length - 1) {
        //两个循环找出最小权值的边
        for (let i = 0, min = INF; i < length; i++) {
            for (let j = 0; j < length; j++) {
                if (cost[i][j] && cost[i][j] < min) {
                    min = cost[i][j];
                    a = u = i;
                    b = v = j;
                }
            }
        }
        //得到最小权值边的两个顶点各自的父节点
        u = find(u, parent);
        v = find(v, parent);
        //比较父节点是否相同，如不相同，建立链接 发现了一条边
        union(u, v, a, b, parent) && ne++;
        //将该边权值设为0 避免重复访问
        cost[a][b] = 0;
    }
    return parent;
}