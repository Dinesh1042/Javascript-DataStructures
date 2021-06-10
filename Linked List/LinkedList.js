class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.position = 0;
  }
}

class LinkedList {
  constructor(value) {
    this.head = null;
    this.tail = null;
    this.length = 0;
    this.initialize(value);
  }

  // Initializing linkedList
  initialize(value) {
    if (value) this.head = this.tail = new Node(value);
    this.length++;
  }

  append(value) {
    if (!value)
      throw new Error(
        `Object.prepend requires at least 1 argument, but only 0 were passed`
      );

    const newNode = new Node(value);

    if (this.tail) {
      this.tail.next = newNode;
      newNode.position = this.tail.position + 1;
    }

    this.tail = newNode;

    if (!this.head) this.head = newNode;

    this.updatePosition();
  }

  prepend(value) {
    if (!value)
      throw new Error(
        `Object.prepend requires at least 1 argument, but only 0 were passed`
      );

    const newNode = new Node(value);

    if (!this.head) this.head = this.tail = newNode;
    else {
      newNode.next = this.head;
      this.head = newNode;
    }

    this.updatePosition();
  }

  insertAfter(value, afterValue) {
    if (!this.head) throw new Error(`Linkedlist is Empty!`);

    let currentNode = this.find(afterValue);

    if (currentNode) {
      const newNode = new Node(value);
      newNode.next = currentNode.next;
      currentNode.next = newNode;
      this.updatePosition();
    }
  }

  remove(value) {
    if (!this.head) throw new Error(`Linkedlist is Empty!`);
    if (!value)
      throw new Error(
        `Object.prepend requires at least 1 argument, but only 0 were passed`
      );

    while (this.head && this.head.value === value) this.head = this.head.next;

    let currentNode = this.head;
    while (currentNode.next) {
      if (currentNode.next.value === value)
        currentNode.next = currentNode.next.next;
      else currentNode = currentNode.next;
    }
    this.updatePosition();
  }

  pop() {
    if (!this.head) throw new Error(`Linkedlist is Empty!`);
    if (this.head === this.tail) this.clear();

    let currentNode = this.head;

    while (currentNode) {
      if (!currentNode.next.next) currentNode.next = null;
      this.tail = currentNode;
      currentNode = currentNode.next;
    }
    return undefined;
  }

  shift() {
    if (!this.head) throw new Error(`Linkedlist is Empty!`);
    if (this.head === this.tail) this.clear();

    this.head = this.head.next;
    this.updatePosition();
  }

  reverse() {
    if (!this.head) throw new Error(`Linkedlist is Empty!`);

    let currentNode = this.head;
    this.head = this.tail;
    this.tail = currentNode;

    let prev = null;
    let next = currentNode.next;

    while (next) {
      next = currentNode.next;
      currentNode.next = prev;
      prev = currentNode;
      currentNode = next;
    }
    this.updatePosition();
  }

  find(value) {
    if (!this.head) throw new Error(`Linkedlist is Empty!`);

    let currentNode = this.head;

    while (currentNode) {
      if (currentNode.value === value) return currentNode;

      currentNode = currentNode.next;
    }
    return undefined;
  }

  set(curretValue, newValue) {
    let currentNode = this.find(curretValue);
    if (currentNode) currentNode.value = newValue;
    else return undefined;
  }

  includes(value) {
    if (!value)
      throw new Error(
        `Object.prepend requires at least 1 argument, but only 0 were passed`
      );
    return this.find(value) ? true : false;
  }

  updatePosition() {
    let initialPosition = 0;
    let currentNode = this.head;
    while (currentNode) {
      currentNode.position = initialPosition;
      initialPosition++;
      currentNode = currentNode.next;
    }
    this.length = this.tail.position + 1;
  }

  toArray() {
    if (!this.head) throw new Error("LinkedList is Empty!");

    const elements = [];

    let currentNode = this.head;

    while (currentNode) {
      const obj = {
        value: currentNode.value,
        next: currentNode.next,
        position: currentNode.position,
      };
      elements.push(obj);
      currentNode = currentNode.next;
    }
    return elements;
  }

  values() {
    if (!this.head) throw new Error("LinkedList is Empty!");
    return this.toArray().map((i) => i.value);
  }

  clear() {
    this.head = this.tail = null;
    this.length = 0;
  }
}

const linkedList = new LinkedList("Hello, There");

linkedList.append(1);
linkedList.append(2);
linkedList.append(3);
linkedList.prepend("Dinesh");
linkedList.prepend("Hello");
linkedList.insertAfter("Is this Works!", "Hello");
linkedList.reverse();
linkedList.pop();
linkedList.shift();
linkedList.set(2, "great");
console.log(linkedList);

console.log(linkedList.toArray());
