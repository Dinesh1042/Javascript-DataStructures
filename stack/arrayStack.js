// Array Stack

const _stack = new WeakMap();

class Stack {
  constructor(...arr) {
    _stack.set(this, arr);
  }

  push(...val) {
    const stack = _stack.get(this);
    if (!val || !val.toString().trim()) throw new Error(`Invalid value`);
    stack.push(...val);
    _stack.set(this, stack);
  }

  pop() {
    const stack = _stack.get(this);
    if (!stack.length) throw new Error(`Stack is Empty`);
    stack.pop();
    _stack.set(this, stack);
  }

  peek() {
    const stack = _stack.get(this);
    if (!stack.length) throw new Error(`Stack is Empty`);
    return stack[stack.length - 1];
  }

  get length() {
    return _stack.get(this).length;
  }
}

const stack = new Stack();
stack.push(1, 2, 1);
stack.pop();
stack.peek();
stack.length;

console.log(stack);
