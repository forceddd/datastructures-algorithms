import { Node } from '../node.js'
import { Compare, defaultCompare } from '../../LinkedList/util.js'
export default class BinarySearchTree {
    constructor(compare = defaultCompare) {
        this.compare = compare;
        this.root = null;//根节点指针
    }
    //出入一个新的键
    insert(key) {
        if (this.root == null) {
            this.root = new Node(key);
        } else {
            this.insertNode(this.root, key)
        }
    }
    //将节点插入到根节点以外
    insertNode(node, key) {
        if (this.compare(key, node.key) === Compare.LESS_THAN) {
            //此时要插入的key小于当前节点node的key 向左查询
            if (node.left == null) {
                node.left = new Node(key);
            } else {
                this.insertNode(node.left, key);
            }
        } else {
            //此时key>=node.key  向右查询
            if (node.right == null) {
                node.right = new Node(key);
            } else {
                this.insertNode(node.right, key);
            }
        }
    }
    //查找树中是否包含key的节点 true/false
    search(key) {
        return this.searchNode(this.root, key);
    }
    searchNode(node, key) {
        if (node != null) {
            if (this.compare(key, node.key) === Compare.LESS_THAN) {
                return this.searchNode(node.left, key)
            } else if (this.compare(key, node.key) === Compare.BIGGER_THAN) {
                return this.searchNode(node.right, key)
            } else {
                return node
            }
        }
        return undefined
    }
    // 搜索最小值
    min() {
        return this.findMinNode(this.root)
    }
    //从node节点开始 查找最小值
    findMinNode(node) {
        let current = node;
        while (current != null && current.left != null) {
            current = current.left;
        }
        return current;
    }
    max() {
        return this.findMaxNode(this.root);
    }
    findMaxNode(node) {
        let current = node;
        while (current != null && current.right != null) {
            current = current.right;
        }
        return current;
    }
    //中序遍历
    inOrderTraverse(cb) {
        this.inOrderTraverseNode(this.root, cb)
    }
    //以node节点开始 中序遍历
    inOrderTraverseNode(node, cb) {
        if (node != null) {
            this.inOrderTraverseNode(node.left, cb);
            cb(node.key);
            this.inOrderTraverseNode(node.right, cb);
        }
    }
    //先序遍历
    preOrderTraverse(cb) {
        this.preOrderTraverseNode(this.root, cb)
    }
    preOrderTraverseNode(node, cb) {
        if (node != null) {
            cb(node.key);
            this.preOrderTraverseNode(node.left, cb);
            this.preOrderTraverseNode(node.right, cb);
        }
    }
    //后序遍历
    postOrderTraverse(cb) {
        this.postOrderTraverseNode(this.root, cb)
    }
    postOrderTraverseNode(node, cb) {
        if (node != null) {
            this.postOrderTraverseNode(node.left, cb);
            this.postOrderTraverseNode(node.right, cb);
            cb(node.key);
        }
    }
    remove(key) {
        // this.root = this.removeNode(this.root, key);
        //返回值为this.root
        this.root = this.removeNode(this.root, key);
    }
    //最终返回传入node节点
    removeNode(node, key) {
        if (node == null) return null;
        if (this.compare(key, node.key) === Compare.LESS_THAN) {
            node.left = this.removeNode(node.left, key);
            // return node;
        } else if (this.compare(key, node.key) === Compare.BIGGER_THAN) {
            node.right = this.removeNode(node.right, key);
            // return node
        } else {
            if (node.left == null && node.right == null) {
                node = null;
                //返回值用于更新父节点指针
                // return node;
            } else if (node.left == null) {
                node = node.right;
                // return node
            } else if (node.right == null) {
                node = node.left;
                // return node
            } else {
                //从node右侧子树出找到最小键节点
                const min = this.findMinNode(node.right);
                //将当前节点的key改为min的key
                node.key = min.key;
                //删除min节点 相当于用min'节点替换了node节点
                node.right = this.removeNode(node.right, min.key);
            }
        }
        return node;
    }
}