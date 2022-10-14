const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    let newNode = new Node(data);

    function addNewNode(node, newNode) {
      if (newNode.data < node.data) {
          node.left === null ?
          node.left = newNode :
          addNewNode(node.left, newNode);
      } else {
        node.right === null ?
        node.right = newNode :
        addNewNode(node.right, newNode);
      }
    }

    this.root() === null ? this.rootNode = newNode : addNewNode(this.rootNode, newNode);
  }

  has(data) {
    return this.find(data) ? true : false
  }

  find(data, node = this.rootNode) {
    if (node === null) {
      return null;
    } else if (data < node.data) {
      return this.find(data, node.left);
    } else if (data > node.data) {
      return this.find(data, node.right)
    } else {
      return node
    }
  }

  remove(data) {

    function findMinFromCurrentNode(node) {
      if (node.left === null)
        return node;
      else
        return findMinFromCurrentNode(node.left);
    }

    function removeNode(node, value) {
      if (node === null) return null;
      else if (value < node.data) {
        node.left = removeNode(node.left, value);
        return node;
      } else if (value > node.data) {
          node.right = removeNode(node.right, value);
          return node;
      } else {
          if (node.left === null && node.right === null) {
            node = null;
            return node;
          } else if (node.left === null) {
              node = node.right;
              return node;
          } else if (node.right === null) {
              node = node.left;
              return node;
          } else {
            let minNodeOfRightSubtree = findMinFromCurrentNode(node.right);
            node.data = minNodeOfRightSubtree.data;
            node.right = removeNode(node.right, minNodeOfRightSubtree.data);
            return node;
          }
      }
    }

    this.rootNode = removeNode(this.rootNode, data);
  }

  allValues() {
    const arrayOfValues = [];
    function addValue(node) {
      node ? arrayOfValues.push(node.data) : '';
      if (node.left) {
        addValue(node.left)
      }
      if (node.right) {
        addValue(node.right)
      }
    }
    addValue(this.root());
    return arrayOfValues
  }

  min() {
    return this.root() ? Math.min(...this.allValues()) : null;
  }

  max() {
    return this.root() ? Math.max(...this.allValues()) : null;
  }
}

module.exports = {
  BinarySearchTree
};
