import { Queue } from './queue.js'

const q = new Queue();
q.enqueue(1)
q.enqueue(2)
q.enqueue(3);
console.log(q.size())
console.log(q);
console.log(q.peek())
console.log(q.toString())
console.log(q.dequeue())