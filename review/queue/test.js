import { Deque, Queue } from './queue.js'

const q = new Queue();
const dq = new Deque();
dq.enqueue(1)
dq.enqueue(2)
dq.enqueue(3);
console.log(dq);
console.log(dq.removeBack());
console.log(dq.isEmpty())
console.log(dq.addFront(8))
console.log(dq.removeFront())
console.log(dq)
console.log(dq.addFront(999))
console.log(dq)
