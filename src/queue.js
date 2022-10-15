const { NotImplementedError } = require('../extensions/index.js');

const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {

  constructor() {
    this.queue = new ListNode();
  }

  getUnderlyingList() {
    let head = this.queue;
    while (head.next.value !== undefined) {
      head = head.next;
    }

    head.next = null;
    return this.queue;
  }

  enqueue(value) {
    let head = this.queue;

    if (head.next === null) {
      head.value = value;
      head.next = new ListNode();
    } else {

      while (head.next !== null) {
        head = head.next;
      }

      head.value = value;
      head.next = new ListNode()
    }
  }

  dequeue() {
    let head = this.queue;
    const arr = [];

    while (head.next !== null) {
      arr.push(head.value);
      head = head.next;
    }

    let dequeueItem = arr.shift(0);
    this.queue = new ListNode();
    arr.forEach(item => this.enqueue(item))
    return dequeueItem;
  }
}

module.exports = {
  Queue
};
