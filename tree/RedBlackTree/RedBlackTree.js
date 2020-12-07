/*
 * @Description:
 * @Author: forceddd
 * @Date: 2020-12-06 17:37:43
 * @LastEditors: forceddd
 * @LastEditTime: 2020-12-07 19:43:07
 */
import BinarySearchTree from '../BinarySearchTree/binarySearchTree.js';
import { defaultCompare, Compare } from '../../LinkedList/util.js';
import { RedBlackNode, Colors } from '../node.js'
export default class RedBlackTree extends BinarySearchTree {
    constructor(compare = defaultCompare) {
        super(compare);

    }
    //旋转操作 需要重写 增加父节点引用
    rotationLL(node) {
        const tmp = node.left;
        node.left = tmp.right;
        if (tmp.right && tmp.right.key) tmp.right.parent = node;//改变孙子节点的父引用
        tmp.parent = node.parent;//改变孩子节点的父引用
        if (!node.parent) {
            //node为根节点
            this.root = tmp;//改变根节点引用
        } else {
            if (node === node.parent.left) {
                node.parent.left = tmp;
            } else {
                node.parent.right = tmp;
            }
        }
        tmp.right = node;
        node.parent = tmp;//改变节点自身的父引用
    }
    rotationRR(node) {
        const tmp = node.right;
        node.right = tmp.left;
        if (tmp.left && tmp.left.key) tmp.left.parent = node;
        tmp.parent = node.parent;
        if (!node.parent) {
            this.root = tmp;
        } else {
            if (node === node.parent.left) {
                node.parent.left = tmp;
            } else {
                node.parent.right = tmp;
            }
        }
        tmp.left = node;
        node.parent = tmp;
    }
    insert(key) {
        if (this.root == null) {
            this.root = new RedBlackNode(key);
            this.root.color = Colors.Black;
        } else {
            const newNode = this.insertNode(this.root, key);
            this.fixTreeProperties(newNode);
        }
    }
    insertNode(node, key) {
        if (this.compare(key, node.key) === Compare.LESS_THAN) {
            if (node.left == null) {
                node.left = new RedBlackNode(key);
                node.left.parent = node;//增加父引用
                return node.left
            }
            return this.insertNode(node.left, key)
        } else if (node.right == null) {
            node.right = new RedBlackNode(key);
            node.right.parent = node;
            return node.right;
        } else {
            return this.insertNode(node.right, key)
        }

    }
    fixTreeProperties(node) {
        while (node && node.parent && node.parent.isRed() && node.isRed()) {
            let parent = node.parent;
            const grandparent = parent.parent;
            //情形A 父节点是左侧子节点
            if (grandparent && grandparent.left === parent) {
                const uncle = grandparent.right;
                //情形A-1 叔叔也是红色 重新填色 不i会造成树失衡
                if (uncle && uncle.isRed()) {
                    grandparent.color = Colors.RED;
                    parent.color = Colors.Black;
                    uncle.color = Colors.Black;
                    node = grandparent//改变node指向 继续循环
                } else {
                    //情形A-2 node节点是右侧子节点
                    if (node === parent.right) {
                        this.rotationRR(parent)//对parent进行一次左旋转 变成case A-3 在对grand进行一次左旋转
                        //改变node指向 继续循环
                        node = parent;
                        parent = node.parent
                    }
                    //情形A-3 node节点是左侧子节点
                    this.rotationLL(grandparent);
                    //改变颜色
                    parent.color = Colors.Black;
                    grandparent.color = Colors.RED;
                    //改变引用 
                    node = parent;
                }


            } else {
                //情形B 父节点是右侧子节点
                const uncle = grandparent.left;
                //case B-1 叔叔节点是红色
                if (uncle && uncle.isRed()) {
                    grandparent.color = Colors.RED;
                    parent.color = Colors.Black;
                    uncle.color = Colors.Black;
                    node = grandparent//改变node指向 继续循环
                } else {
                    if (node === parent.left) {
                        //case B-2 节点是左侧子节点 右旋转 进入到case B-3
                        this.rotationLL(parent);
                        node = parent;
                        parent = node.parent;
                    }
                    //case B-3 节点是右侧子节点 对grand左旋转
                    this.rotationRR(grandparent);
                    parent.color = Colors.Black;
                    grandparent.color = Colors.RED;
                    node = parent
                }
            }
        }
    }
}