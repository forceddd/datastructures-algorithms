import AVLTree from './AVLTree.js'
// import AVLTree from '../../../javascript-datastructures-algorithms/src/js/data-structures/avl-tree.js'
import Tree from '../BinarySearchTree/binarySearchTree.js'
const tree = new AVLTree();
const t2 = new AVLTree();
const bTree = new Tree();





tree.insert(11);
tree.insert(8);
tree.insert(12);
tree.insert(7);
tree.insert(13);
tree.insert(9);
tree.insert(10);
tree.remove(13)

console.log(tree)
// console.log(bTree)
// console.log(t2)