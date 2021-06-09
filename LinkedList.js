// LinkedList

// A linked list is a linear collection of data elements whose order is not given by their physical placement in memory. Instead, each element points to the next. It is a data structure consisting of a collection of nodes which together represent a sequence.

// -------------------------------------------

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.position = 0;
  }
}

class LinkedList {
  constructor(value = null) {
    this.head = null;
    this.tail = null;
    this.length = 0;
    this.initialize(value);
  }

  initialize(value) {
    if (value) this.head = this.tail = new Node(value);
    if (value) this.length++;
  }

  append(value) {
    const newNode = new Node(value);
    if (this.tail) {
      this.tail.next = newNode;
      newNode.position = this.tail.position + 1;
    }
    this.tail = newNode;
    if (!this.head) this.head = newNode;
    this.length++;
  }

  prepend(value) {
    if (!value)
      throw new Error(
        `Object.prepend requires at least 1 argument, but only 0 were passed`
      );

    const newNode = new Node(value);
    if (!this.tail && !this.head) return (this.tail = this.head = newNode);

    newNode.next = this.head;
    this.head = newNode;
    this.length++;
    this.updatePosition();
  }

  insertAfter(value, afterValue) {
    if (!this.head || !afterValue) return null;

    const existingNode = this.find(afterValue);
    if (existingNode) {
      const newNode = new Node(value);
      newNode.next = existingNode.next;
      existingNode.next = newNode;
      this.length++;
      this.updatePosition();
    }
  }

  delete(value) {
    if (!this.head) throw new Error(`Linked list is Empty!`);
    if (!this.find(value))
      throw new Error(`Cannot find the ${value} in linkedlist`);

    while (this.head && this.head.value === value) this.head = this.head.next;

    let currentNode = this.head;
    while (currentNode.next)
      if (currentNode.next.value === value)
        currentNode.next = currentNode.next.next;
      else currentNode = currentNode.next;

    this.length--;
    this.updatePosition();
  }

  pop() {
    if (!this.head) throw new Error(`Linked list is Empty!`);

    let currentNode = this.head;

    if (this.head === this.tail) {
      this.head = this.tail = null;
      this.length--;
      return;
    }
    while (currentNode) {
      if (!currentNode.next.next) {
        currentNode.next = null;
        this.tail = currentNode;
        this.length--;
      }
      currentNode = currentNode.next;
    }
  }

  shift() {
    if (!this.head) throw new Error(`Linked list is Empty!`);

    if (this.head === this.tail) {
      this.head = this.tail = null;
      this.length--;
      return;
    }

    this.head = this.head.next;
    this.updatePosition();
    this.length--;
  }

  set(currentValue, newValue) {
    if (!this.head) throw new Error(`Linked list is Empty!`);

    let currentEl = this.find(currentValue);

    if (currentEl) currentEl.value = newValue;
  }

  reverse() {
    if (!this.head) throw new Error(`Linked list is Empty!`);

    let temp = this.head;
    this.head = this.tail;
    this.tail = temp;
    let prev = null;
    let next = temp.next;

    while (next) {
      next = temp.next;
      temp.next = prev;
      prev = temp;
      temp = next;
    }
    this.updatePosition();
  }

  fill(value, startValue = null, endValue = null) {
    let currentNode = this.head;
    let isLoopStared = false;
    let isStartThere = this.find(startValue);
    let isEndThere = this.find(endValue);
    while (currentNode) {
      if (!startValue && !endValue) currentNode.value = value;
      else if (startValue && endValue) {
        if (currentNode.value === startValue && isStartThere && isEndThere)
          isLoopStared = true;
        if (currentNode.value === endValue) isLoopStared = false;
        if (isLoopStared) currentNode.value = value;
      }
      currentNode = currentNode.next;
    }
  }

  includes(value) {
    return this.find(value) ? true : false;
  }

  find(value) {
    if (!this.head) throw new Error(`Linked list is Empty!`);

    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.value === value) return currentNode;
      currentNode = currentNode.next;
    }
    return undefined;
  }

  indexAt(index) {
    if (!this.head) throw new Error(`Linked list is Empty!`);
    return this.toArray().find((i) => i.position === index);
  }

  updatePosition() {
    let currentNode = this.head;
    let initialPosition = 0;
    while (currentNode) {
      currentNode.position = initialPosition;
      initialPosition++;
      currentNode = currentNode.next;
    }
  }

  values() {
    if (!this.head) return [];
    return this.toArray().map((i) => i.name);
  }

  toArray() {
    const element = [];
    let currentNode = this.head;

    while (currentNode) {
      const obj = {
        name: currentNode.value,
        position: currentNode.position,
        next: currentNode.next,
      };
      element.push(obj);
      currentNode = currentNode.next;
    }
    return element;
  }
}

const linkedlist = new LinkedList(`2`);
linkedlist.append(1);
linkedlist.append(2);
linkedlist.append(3);
linkedlist.append(4);
linkedlist.append(5);
linkedlist.prepend("Hello, There");
linkedlist.set(5, "Is that working?");
linkedlist.delete(4);
linkedlist.fill("JavaScript", "2", 2);
linkedlist.includes("JavaScript");
linkedlist.find("Is that working?");
linkedlist.indexAt(2);
linkedlist.pop();
linkedlist.shift();
linkedlist.reverse();
linkedlist.prepend("Hello, There");
linkedlist.toArray();

Array.from({ length: 55 }, (_, i) => String.fromCharCode(65 + i)).forEach(
  (item) => linkedlist.append(item)
);
