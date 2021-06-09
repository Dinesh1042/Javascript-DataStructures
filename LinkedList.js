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

// ------------------------------------ //
//           LinkedList 2 Way           //
// ------------------------------------ //

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.position = 0;
  }
}

class LinkedList2 {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value) {
    const newNode = new Node(value);
    if (this.tail) {
      this.tail.next = newNode;
      this.tail.next.position = this.tail.position + 1;
    }
    this.tail = newNode;
    if (!this.head) this.head = newNode;
    this.length++;
  }

  prepend(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }
    newNode.next = this.head;
    this.head = newNode;
    this.updatePosition();
    this.length++;
  }

  insertAfter(value, afterValue) {
    let element = this.find(afterValue);

    if (element) {
      let newNode = new Node(value);
      newNode.next = element.next;
      element.next = newNode;
      this.updatePosition();
    }
  }

  delete(value) {
    if (!this.head) throw new Error("LinkedList is Empty!");

    while (this.head && this.head.value === value) {
      this.head = this.head.next;
    }

    let currentEl = this.head;

    while (currentEl.next) {
      if (currentEl.next.value === value) {
        currentEl.next = currentEl.next.next;

        this.length--;
      } else currentEl = currentEl.next;
    }
    this.updatePosition();
  }

  pop() {
    if (!this.head) return;

    if (this.tail === this.head) {
      this.tail = null;
      this.head = null;
    }

    let currentNode = this.head;

    while (currentNode) {
      if (!currentNode.next.next) {
        currentNode.next = null;
        this.tail = currentNode;
      }

      currentNode = currentNode.next;
    }
    this.length--;
  }

  shift() {
    if (!this.head) return null;
    this.head = this.head.next;
    this.length--;
  }

  updatePosition() {
    let initialPosition = 0;
    let currentNode = this.head;
    while (currentNode) {
      currentNode.position = initialPosition;
      initialPosition++;
      currentNode = currentNode.next;
    }
  }

  count() {
    const element = [];

    let currentNode = this.head;
    while (currentNode) {
      let obj = {
        name: currentNode.value,
        position: currentNode.position,
        next: currentNode.next,
      };
      element.push(obj);
      currentNode = currentNode.next;
    }
    return element;
  }

  get(value) {
    if (value < 0 || value >= this.length) return null;

    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.position === value) return currentNode;

      currentNode = currentNode.next;
    }
    return element;
  }

  set(currentValue, newValue) {
    if (!this.head) return null;

    let currentNode = this.head;

    while (currentNode) {
      if (currentNode.value === currentValue) currentNode.value = newValue;

      currentNode = currentNode.next;
    }
    return false;
  }

  includes(value) {
    if (!this.head) return false;

    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.value === value) return true;
      currentNode = currentNode.next;
    }
    return false;
  }

  reverse() {
    if (!this.head) return false;

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

  find(value) {
    if (!this.head) return null;

    let element = null;
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.value === value) return (element = currentNode);

      currentNode = currentNode.next;
    }
    return null;
  }

  fill(value, startValue = null, endValue = null) {
    if (!this.head) return null;

    let isStarted = false;

    let currentNode = this.head;
    while (currentNode) {
      if (!startValue && !endValue) currentNode.value = value;
      else if (startValue && endValue) {
        let startIsThere = this.find(startValue);
        let isEndThere = this.find(endValue);

        if (currentNode.value === startValue && startIsThere && isEndThere)
          isStarted = true;
        if (currentNode.value === endValue) isStarted = false;
        if (isStarted) currentNode.value = value;
      }
      currentNode = currentNode.next;
    }
    return null;
  }

  values() {
    if (!this.head) return null;

    let element = [];
    let currentNode = this.head;
    while (currentNode) {
      element.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return element;
  }
}

const linkedlist2 = new LinkedList2();

linkedlist2.append("great");
linkedlist2.append(2);
linkedlist2.append(2);
linkedlist2.append(2);
linkedlist2.append(2);
linkedlist2.append(1);
linkedlist2.prepend("Hey Man");
linkedlist2.append("hello");
linkedlist2.set("hello", "wow");
linkedlist2.fill("JavaScript", "great", 1);

console.log(linkedlist2);
