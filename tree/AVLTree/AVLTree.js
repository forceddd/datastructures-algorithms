import BinarySearchTree from '../BinarySearchTree/binarySearchTree.js'
import { defaultCompare } from '../../LinkedList/util.js'
import { Node } from '../node'
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
        tmpNode.right = node;
        node.left = tmpNode.right;
        return tmpNode;
    }
    //RR：向左的单旋转
    rotationRR(node) {
        const tmp = node.right;
        tmp.left = node;
        node.right = tmp.left;
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

}