class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
    this.position = 0;
  }
}

class DoublyLinkedList {
  constructor(value) {
    this.head = null;
    this.tail = null;
    this.length = 0;
    this.initialize(value);
  }

  initialize(value) {
    if (value) this.head = this.tail = new Node(value);
    this.length++;
  }

  append(value) {
    if (!value.toString().trim(""))
      throw new Error(
        `Object.append requires at least 1 argument, but only 0 were passed`
      );

    let newNode = new Node(value);

    if (this.tail) {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      newNode.position = this.tail.position + 1;
    }

    this.tail = newNode;

    if (!this.head) this.head = newNode;
  }

  prepend(value) {
    if (!value.toString().trim(""))
      throw new Error(
        `Object.prepend requires at least 1 argument, but only 0 were passed`
      );

    if (!this.head) return (this.head = this.tail = newNode);

    const newNode = new Node(value);
    newNode.next = this.head;
    this.head.prev = newNode;
    this.head = newNode;
    this.updatePosition();
  }

  insertAfter(value, currentValue) {
    const currentNode = this.find(currentValue);

    if (currentNode) {
      const newNode = new Node(value);
      newNode.next = currentNode.next;
      currentNode.next = newNode;
      newNode.prev = currentNode;
    } else return undefined;
  }

  remove(value) {
    if (!this.head) throw new Error(`DoublyLinkedList is Empty!`);
    if (!value)
      throw new Error(
        `Object.remove requires at least 1 argument, but only 0 were passed`
      );

    while (this.head && this.head.value === value) {
      this.head = this.head.next;
      this.head.prev = null;
    }

    let currentNode = this.head;
    while (currentNode.next) {
      if (currentNode.next.value === value) {
        currentNode.next = currentNode.next.next;
        currentNode.next.prev = currentNode;
      } else currentNode = currentNode.next;
    }
    this.updatePosition();
  }

  set(newValue, currentValue) {
    let currentNode = this.find(currentValue);

    if (currentNode) {
      currentNode.value = newValue;
      currentNode = this.find(currentValue);
      if (currentNode) this.set(newValue, currentValue);
    } else return undefined;
  }

  fill(value, startValue = null, endValue = null) {
    let currentNode = this.head;

    let isLoopStarted = false;
    let isStartValueInList = null;
    let isEndValueInList = null;
    if (startValue && endValue) {
      isStartValueInList = this.find(startValue);
      isEndValueInList = this.find(endValue);
    }

    while (currentNode) {
      if (!startValue && !endValue && value) currentNode.value = value;
      else if (isStartValueInList && isEndValueInList) {
        if (currentNode.value === startValue) isLoopStarted = true;
        if (currentNode.value === endValue) isLoopStarted = false;
        if (isLoopStarted) currentNode.value = value;
      }
      currentNode = currentNode.next;
    }
  }

  reverse() {
    if (!this.head) throw new Error(`DoublyLinkedList is Empty!`);

    let currentNode = this.head;
    this.head = this.tail;
    this.tail = currentNode;
    let prev = null;
    let next = currentNode.next;

    while (next) {
      next = currentNode.next;
      currentNode.next = prev;
      currentNode.prev = next;
      prev = currentNode;
      currentNode = next;
    }
    this.updatePosition();
  }

  indexAt(index) {
    return this.toArray().find((i) => i.position == index);
  }

  pop() {
    if (!this.head) throw new Error(`DoublyLinkedList is Empty!`);

    if (this.tail === this.head) return this.clear();
    this.tail = this.tail.prev;
    this.tail.next = null;
  }

  shift() {
    if (!this.head) throw new Error(`DoublyLinkedList is Empty!`);

    if (this.tail === this.head) return this.clear();

    this.head = this.head.next;
    this.head.prev = null;
    this.updatePosition();
  }

  find(value) {
    if (!value.toString().trim(""))
      throw new Error(
        `Object.find requires at least 1 argument, but only 0 were passed`
      );

    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.value === value) return currentNode;
      currentNode = currentNode.next;
    }
    return undefined;
  }

  values() {
    return this.toArray().map((i) => i.value);
  }

  includes(value) {
    return this.find(value) ? true : false;
  }

  toArray() {
    const elements = [];

    let currentNode = this.head;
    while (currentNode) {
      const obj = {
        value: currentNode.value,
        prev: currentNode.prev,
        next: currentNode.next,
        position: currentNode.position,
      };
      elements.push(obj);
      currentNode = currentNode.next;
    }
    return elements;
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

  clear() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
}

const doublyLinkedList = new DoublyLinkedList();

doublyLinkedList.append(1);
doublyLinkedList.prepend(0);

Array.from({ length: 5 }, (_, i) => doublyLinkedList.append(i));

doublyLinkedList.pop();
doublyLinkedList.shift();
doublyLinkedList.set("Dinesh", 1);
doublyLinkedList.find("Dinesh");
doublyLinkedList.includes(1);
doublyLinkedList.insertAfter("Hello", 2);
doublyLinkedList.reverse();
doublyLinkedList.remove(2);

console.log(doublyLinkedList.toArray());
