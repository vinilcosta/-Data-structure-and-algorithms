class StackLinkedList {
  constructor() {
    this.items = new DoublyLinkedList(); 
  }
  push(element) {
    this.items.push(element); 
  }
  pop() {
    if (this.items.isEmpty()) {
      return undefined;
    }
    const result = this.items.removeAt(this.size() - 1); 
    return result
  }
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.getElementAt(this.size() - 1).element;
  }
  isEmpty() {
    return this.items.isEmpty();
  }
  size() {
    return this.items.size();
  }
  clear() {
    this.items.clear();
  }
  toString() {
    return this.items.toString();
  }
}

let stack = new StackLinkedList();

stack.push(1);

stack.push(2);

stack.push(3)

console.log(stack)