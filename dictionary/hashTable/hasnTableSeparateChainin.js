import { defaultToString } from '../../LinkedList/util.js';
import HashTable from './hashTable.js'
import LinkedList from '../../LinkedList/linkedList/linkedList.js'
//该类用于保存原始的key 和value 
class ValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value
    }
    toString() {
        return `[#${JSON.stringify(this.key)} => ${this.value}]`
    }
}
export class HashTableSeparateChaining extends HashTable {
    constructor(stringify = defaultToString) {
        super(stringify);

    }
    put(key, value) {
        if (key != null && value != null) {
            const position = this.hashCode(key);
            if (this.table[position] == null) this.table[position] = new LinkedList();
            this.table[position].push(new ValuePair(key, value))
            return true;
        }
        return false;
    }
    get(key) {
        if (key != null) {
            const position = this.hashCode(key);
            //该处可能是空或者是空链表
            const linkedList = this.table[position]
            if (linkedList != null && !linkedList.isEmpty()) {
                let current = linkedList.head;
                while (current != null) {
                    if (current.element.key === key) {
                        return current.element.value
                    }
                    current = current.next;
                }
            }
            return undefined
        }
    }
    remove(key) {
        if (key != null) {
            const position = this.hashCode(key);
            const linkedList = this.table[position]
            if (linkedList.isEmpty()) return delete this.table[position];
            if (linkedList != null) {
                let current = linkedList.head;
                while (current != null) {
                    if (current.element.key === key) {
                        linkedList.remove(key);
                        if (linkedList.isEmpty()) delete this.table[position];
                        return true;
                    }
                    current = current.next;
                }
            }
        }
        return false
    }
}

export class HashTableLinearProbing extends HashTable {
    constructor(stringify = defaultToString) {
        super(stringify);
    }
    put(key, value) {
        if (key != null && value != null) {
            const hash = this.hashCode(key);
            if (this.table[hash] == null) this.table[hash] = new ValuePair(key, value);
            let position = hash + 1;
            while (this.table[position] != null) {
                position++;
            }
            this.table[position] = new ValuePair(key, value);
            return true;
        }
        return false
    }
    get(key) {
        if (key != null) {
            const hash = this.hashCode(key);
            if (this.table[hash] != null) {
                if (this.table[hash].key === key) return this.table[hash].value;
                let position = hash + 1;
                while (this.table[position].key !== key && this.table[position] != null) {
                    position++;
                }
                //退出循环 找到了key 或者this.table[position]==null
                if (this.table[position] != null) return this.table[position].value;
            }
            return undefined;
        }
    }
    remove(key) {
        const hash = this.hashCode(key);
        if (this.table[hash] != null) {
            if (this.table[hash].key === key) {
                delete this.table[hash];
                this.verifyRemovedSideEffect(hash, hash);
                return true
            }
            let position = hash + 1;
            while (this.table[position].key !== key && this.table[position] != null) {
                position++;
            }
            if (this.table[position] != null) {
                delete this.table[position];
                this.verifyRemovedSideEffect(hash, position);
                return true
            }

        }
        return false;
    }
    //检查删除元素之后 有没有副作用 
    verifyRemovedSideEffect(hash, removedPosition) {
        let position = removedPosition + 1;
        while (this.table[position] != null) {
            const posHash = this.hashCode(this.table[position].key);
            if (posHash <= hash || posHash <= removedPosition) {
                this.table[removedPosition] = this.table[position];
                delete this.table[position]
                removedPosition = position;
            }
            position++;
        }
    }
}