class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor(value = "") {
    this.top = null;

    if (value.toString().trim()) this.top = new Node(value);
  }

  push(value = "") {
    if (!value.toString().trim()) throw new Error("Invalid Value");

    const newNode = new Node(value);

    if (!this.top) return (this.top = newNode);

    newNode.next = this.top;
    this.top = newNode;
  }

  pop() {
    if (!this.top) throw new Error("Stack is Empty!");

    this.top = this.top.next;
  }

  peek() {
    if (!this.top) throw new Error("Stack is Empty!");
    return this.top;
  }

  toArray() {
    const elements = [];
    let currentNode = this.top;
    while (currentNode) {
      elements.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return elements;
  }

  get length() {
    return this.toArray().length;
  }
}

const stack = new Stack(1);
stack.push(2);
stack.push(3);
stack.push(4);
stack.push(5);
stack.peek();
stack.length;

// Testing Stack
Array.from({ length: 50 }, (_, i) => i + 6).forEach((v) => stack.push(v));

stack.pop();
console.log(stack);
