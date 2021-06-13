// Binary Search Tree

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.count = 0;
  }
}

class BinarySearchTree {
  constructor(value = "") {
    this.root = null;
    if (value.toString().trim()) this.root = new Node(value);
  }

  insert(value) {
    const newNode = new Node(value);
    if (!this.root) return (this.root = newNode);

    let currentNode = this.root;
    // O(n)
    while (currentNode) {
      if (value <= currentNode.value) {
        if (currentNode.value === value) return currentNode.count++;
        if (!currentNode.left) return (currentNode.left = newNode);
        currentNode = currentNode.left;
      } else {
        if (currentNode.value === value) return currentNode.count++;
        if (!currentNode.right) return (currentNode.right = newNode);
        currentNode = currentNode.right;
      }
    }
  }

  insertArray(array) {
    //   O(n)
    array.forEach((value) => this.insert(value));
  }

  findMin() {
    let currentNode = this.root;
    //   O(n)
    while (currentNode) {
      if (currentNode.left === null) return currentNode.value;
      currentNode = currentNode.left;
    }
  }

  findMax() {
    let currentNode = this.root;
    //   O(n)
    while (currentNode) {
      if (currentNode.right === null) return currentNode.value;
      currentNode = currentNode.right;
    }
  }

  contains(value) {
    let currentNode = this.root;
    // O(n)
    while (currentNode) {
      if (value <= currentNode.value) {
        if (value === currentNode.value) return true;
        currentNode = currentNode.left;
      } else {
        if (value === currentNode.value) return true;
        currentNode = currentNode.right;
      }
    }
    return false;
  }
}

const binarysearchTree = new BinarySearchTree(10);
binarysearchTree.insert(5);
binarysearchTree.insertArray([3, 55, 2, 3]);
binarysearchTree.contains(1);

console.log(binarysearchTree);
