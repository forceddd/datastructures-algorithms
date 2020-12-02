/*
 * @Description:
 * @Author: forceddd
 * @Date: 2020-11-29 12:10:31
 * @LastEditors: forceddd
 * @LastEditTime: 2020-11-29 14:56:41
 */
//{element:element}
export default class Set {
    constructor(...eles) {
        // console.log('eles', eles);
        this.items = {}
        if (eles && eles.length) {
            eles.forEach(ele => this.add(ele))
        }

    }
    has(ele) {
        // return ele in this.items //in 检查对象及其原型链上有没有该属性
        // return Object.prototype.hasOwnProperty.call(this.items, ele);//防止this.items上的hasOWnProperty被覆盖重写过
        return Object.values(this.items).includes(ele)
    }
    size() {
        return Object.keys(this.items).length;
    }
    add(ele) {
        if (!this.has(ele)) {
            this.items[ele + typeof ele] = ele;
            return true;
        }
        return false
    }
    delete(ele) {
        if (this.has(ele)) {
            delete this.items[ele + (typeof ele)];
            return true;
        }
        return false;
    }
    clear() {
        this.items = {}
    }
    values() {
        return Object.values(this.items);
    }
    //集合运算
    //ES6 中Set实现并集 交集 差集
    // const union=new Set([...setInterval,...setB])
    // const intersection=new Set([...setA].filter(value=>setB.has(value)))
    // const difference=new Set([...setA].filter(value=>!setB.has(value)))
    // const isSubset=[...setA].every(v=>setB.has(v))
    //并集
    static union(...sets) {
        const unionSet = new Set();
        sets.forEach(set => set.values().forEach(item => unionSet.add(item)));
        return unionSet;
    }

    //交集
    static intersection(...sets) {
        if (sets.length === 0) return new Set();
        if (sets.length === 1) return new Set(...sets[0].values())
        const intersectionSet = new Set();
        const shortest = sets.reduce((prev, set) => Math.min(prev, set.size()), sets[0].size());
        const shortestSet = sets.find(set => set.size() === shortest);
        let flag = true;//全部集合都包含该元素
        shortestSet.values().forEach(value => {
            for (let i = 0; i < sets.length; i++) {
                if (sets[i].size() !== shortest) {
                    if (!sets[i].has(value)) {
                        flag = false;
                        break;
                    }
                }
            }
            flag && intersectionSet.add(value);
        })
        // console.log(shortest);
        return intersectionSet;
    }
    //差集
    static difference(set, anotherSet) {
        const differenceSet = new Set();
        set.values().forEach(value => !anotherSet.has(value) && differenceSet.add(value))
        return differenceSet
    }
    //子集
    isSubsetOf(parentSet) {
        if (this.size() > parentSet.size()) return false;
        let isSubset = true;
        this.values().every(value => {
            if (!parentSet.has(value)) {
                isSubset = false;
                return false
            }
            return true;
        })
        return isSubset;
    }
}