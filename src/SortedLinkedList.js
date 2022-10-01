const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
};
function defaultCompare(a, b) { 
  if (a === b) {
    return 0;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}
class SortedLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals, compareFn = defaultCompare) {
  super(equalsFn);
    this.compareFn = compareFn;
    this.equalsFn = equalsFn;
  }
  push(element){
    if(this.isEmpty()){
      super.push(element);
    } else {
      const index = this.getIndexNextSortedElement(element);
      super.insert(element, index);
    }
  }
  insert(element, index = 0) { 
    if (this.isEmpty()) {
      return super.insert(element, 0); 
    }
    const pos = this.getIndexNextSortedElement(element); 
    return super.insert(element, pos); 
  }
  getIndexNextSortedElement(element) {
    let current = this.head;
    let i = 0;
    for (; i < this.size() && current; i++) {
      const comp = this.compareFn(element, current.element); 
      if (comp === Compare.LESS_THAN) {  
        return i;
      }
      current = current.next;
    }
    return i; 
  }
}

let ordely = new SortedLinkedList();


ordely.insert(1);

ordely.insert(2);

ordely.insert(3);

ordely.insert(4);

console.log(ordely);