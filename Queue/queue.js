// Queue

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor(value = "") {
    this.first = null;
    this.last = null;

    if (value.toString().trim()) this.first = this.last = new Node(value);
  }

  enqueue(value = "") {
    if (!value.toString().trim()) throw new Error("Invalid Value!");

    const newNode = new Node(value);

    if (!this.first) return (this.first = this.last = newNode);
    //   O(1)
    this.last.next = newNode;
    this.last = newNode;
  }

  dequeue() {
    if (!this.first) throw new Error("Queue is Empty!");

    if (this.first === this.last) return (this.first = this.last = null);
    // O(1)
    this.first = this.first.next;
  }

  toArray() {
    let elements = [];

    let currentNode = this.first;
    // O(n)
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

const queue = new Queue();

queue.enqueue(2);
console.log(queue);
