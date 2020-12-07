import BinarySearchTree from '../BinarySearchTree/binarySearchTree.js'
import { Compare, defaultCompare } from '../../LinkedList/util.js'
import { Node } from '../node.js'
//处理平衡因子的常量
const BalanceFactor = {
    UNBALANCED_RIGHT: 1,
    SLIGHTLY_UNBLANCED_RIGHT: 2,
    BANLANCED: 3,
    UNBANLANCED_LEFT: 4,
    SLIGHTLY_UNBLANCED_LEFT: 5
}
export default class AVLTree extends BinarySearchTree {
    constructor(compare = defaultCompare) {
        super(defaultCompare);
    }
    //获取node的高度
    getNodeHeight(node) {
        if (node == null) return -1;
        return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1
    }
    //计算节点的平衡因子
    getBanlanceFactor(node) {
        const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
        switch (heightDifference) {
            case -2://右子树更重
                return BalanceFactor.UNBALANCED_RIGHT;
            case -1://右子树重 但是处于平衡
                return BalanceFactor.SLIGHTLY_UNBLANCED_RIGHT;
            case 2:
                return BalanceFactor.UNBANLANCED_LEFT;
            case 1:
                return BalanceFactor.SLIGHTLY_UNBLANCED_LEFT;
            default://0
                return BalanceFactor.BANLANCED;
        }
    }
    //旋转操作 LL: 向右的单旋转 左侧失衡 并且node.left也是平衡或者左侧更重
    //传入一个node 返回值是node.left 并且应当更新node指针 node=rotationLL(node)
    rotationLL(node) {
        const tmpNode = node.left;
        node.left = tmpNode.right;
        tmpNode.right = node;
        return tmpNode;
    }
    //RR：向左的单旋转
    rotationRR(node) {
        const tmp = node.right;
        node.right = tmp.left;
        tmp.left = node;
        return tmp;
    }
    //LR: 向右的双旋转 适用于左侧子节点高度大于右侧子节点 但是左侧子节点的右侧更重
    //先对左侧子节点做一次向左的单旋转(RR) 再对node做一次向右的单旋转(LL)
    rotationLR(node) {
        node.left = this.rotationRR(node.left);
        return this.rotationLL(node);
    }
    //RL: 向左的双旋转
    rotationRL(node) {
        node.right = this.rotationLL(node.right);
        return this.rotationRR(node);
    }
    insert(key) {
        this.root = this.insertNode(this.root, key)
    }
    insertNode(node, key) {
        if (node == null) return new Node(key);
        if (this.compare(key, node.key) === Compare.LESS_THAN) {
            node.left = this.insertNode(node.left, key);
        } else if (this.compare(key, node.key) === Compare.BIGGER_THAN) {
            node.right = this.insertNode(node.right, key);
        } else {
            return node;
        }
        // return node;//每一种情况node 都需要返回
        // 判断插入结点之后 是否需要自平衡 对每一个节点都要进行判断
        const balanceFactor = this.getBanlanceFactor(node);
        if (balanceFactor === BalanceFactor.UNBANLANCED_LEFT) {
            //节点左侧失衡 判断是左节点的左侧更重 还是左节点的右侧更重
            //根据节点插入的位置判断
            if (this.compare(key, node.left.key) === Compare.LESS_THAN) {
                node = this.rotationLL(node);
            } else {
                node = this.rotationLR(node)
            }
        } else if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
            if (this.compare(key, node.right.key) === Compare.BIGGER_THAN) {
                node = this.rotationRR(node);
            } else {
                node = this.rotationRL(node)
            }
        }
        return node
    }
    // remove(key) {
    //     this.root = this.removeNode(this.root, key)
    // }
    //重写removeNode方法
    removeNode(node, key) {
        node = super.removeNode(node, key); //先使用二叉搜索树的原生方法删除节点 再判断需不需要自平衡
        if (node == null) return node;//此时 该节点为空 不需要平衡
        const balanceFactor = this.getBanlanceFactor(node);
        if (balanceFactor === BalanceFactor.UNBANLANCED_LEFT) {
            //该节点左侧失衡 key节点已经删除 无法通过key来进行判断要怎么旋转了 通过左侧子节点的平衡因子来判断
            const balanceFactorLeft = this.getBanlanceFactor(node.left);
            //如果左侧子节点的右侧更重 则需要LR旋转
            if (balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBLANCED_RIGHT) {
                node = this.rotationLR(node);
            } else {
                node = this.rotationLL(node)
            }
        } else if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
            const banlanceFactorRight = this.getBanlanceFactor(node.right);
            if (banlanceFactorRight === BalanceFactor.SLIGHTLY_UNBLANCED_LEFT) {
                return this.rotationRL(node);
            } else {
                return this.rotationRR(node);
            }
        }
        return node;
    }
}