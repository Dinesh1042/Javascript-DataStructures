// LinkedList

// A linked list is a linear data structure, in which the elements are not stored at contiguous memory locations.

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(value) {
    const newNode = { value, next: null, position: 0 };
    if (this.tail) {
      this.tail.next = newNode;
      this.tail.next.position = this.tail.position + 1;
    }

    this.tail = newNode;

    if (!this.head) this.head = newNode;
  }

  prepend(value) {
    const newNode = { value, next: this.head, position: 0 };

    this.head = newNode;

    if (!this.tail) this.tail = newNode;

    this.updatePosition();
  }

  delete(value) {
    if (!this.head) throw new Error("LinkedList is Empty!");

    while (this.head && this.head.value === value) {
      this.head = this.head.next;
    }

    let currentEl = this.head;

    while (currentEl.next) {
      if (currentEl.next.value === value) currentEl.next = currentEl.next.next;
      else currentEl = currentEl.next;
    }

    if (this.tail.value === value) this.tail = currentEl;

    this.updatePosition();
  }

  count() {
    let countElements = [];

    let currentEl = this.head;

    while (currentEl) {
      let isThere = countElements.find((item) => item.name === currentEl.value);

      if (!isThere) {
        let newEl = {
          name: currentEl.value,
          position: [currentEl.position],
          count: 1,
        };
        countElements.push(newEl);
      } else {
        isThere.count++;
        isThere.position.push(currentEl.position);
      }

      currentEl = currentEl.next;
    }
    return countElements;
  }

  countItem() {
    const elements = {};

    let currentEl = this.head;

    while (currentEl) {
      if (!elements[currentEl.value]) elements[currentEl.value] = 1;
      else elements[currentEl.value] += 1;
      currentEl = currentEl.next;
    }
    return elements;
  }

  updatePosition() {
    let initialPosition = 0;
    let currentEl = this.head;

    while (currentEl) {
      currentEl.position = initialPosition;
      initialPosition++;
      currentEl = currentEl.next;
    }
  }

  insertAfter(value, afterValue) {
    let existingNode = this.find(afterValue);

    if (existingNode) {
      const newNode = {
        value,
        next: existingNode.next,
        position: existingNode.position + 1,
      };
      existingNode.next = newNode;
      this.updatePosition();
    }
  }

  insertBefore(value, beforeValue) {
    if (!this.head) return null;
    let existingNode = this.findBefore(beforeValue);

    if (existingNode) {
      const newNode = {
        value,
        next: existingNode.next,
        position: 0,
      };
      existingNode.next = newNode;
      this.updatePosition();
    }
  }

  getPosition(value) {
    let elements = this.count().find((val) => val.name === value);

    return elements ? elements.position : null;
  }

  get values() {
    if (!this.head) return null;

    const elements = [];
    let currentEl = this.head;

    while (currentEl) {
      elements.push(currentEl.value);

      currentEl = currentEl.next;
    }
    return elements;
  }

  get length() {
    let elements = this.values;
    return elements ? elements.length : null;
  }

  findBefore(value) {
    if (!this.head) return null;
    let currentEl = this.head;
    while (currentEl) {
      if (currentEl.next.value == value) return currentEl;
      currentEl = currentEl.next;
    }
  }

  find(value) {
    if (!this.head) return null;

    let currentEl = this.head;

    while (currentEl) {
      if (currentEl.value === value) return currentEl;
      currentEl = currentEl.next;
    }
    return null;
  }

  toArray() {
    const elements = [];

    let currentEl = this.head;

    while (currentEl) {
      elements.push(currentEl);
      currentEl = currentEl.next;
    }

    return elements;
  }
}

const linkedlist = new LinkedList();

linkedlist.append(1);
linkedlist.append(8);
linkedlist.append(8);
linkedlist.append(8);
linkedlist.append(8);
linkedlist.prepend("wow");
linkedlist.append(2);
linkedlist.append(2);
linkedlist.append(2);
linkedlist.prepend("wow");
linkedlist.append("Hello");
linkedlist.delete("Hello");
linkedlist.insertAfter("great", 2);
linkedlist.insertBefore("LinkedList", 2);
linkedlist.find(4);
linkedlist.findBefore(1);
linkedlist.getPosition("Hello");
