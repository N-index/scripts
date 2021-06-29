function LinkedList() {
  var length = 0;
  var head = null;

  var Node = function(element){
    this.element = element;
    this.next = null;
  };

  this.size = function(){
    return length;
  };

  this.head = function(){
    return head;
  };

  this.add = function(element){
    var node = new Node(element);
    if(head === null){
        head = node;
    } else {
      var currentNode = head;

      while(currentNode.next){
        currentNode  = currentNode.next;
      }

      currentNode.next = node;
    }

    length++;
  };

  this.remove = function(element){
    // Only change code below this line
    // 链表为空
    if(head===null) return false;
    // 链表第一位
    if(head.element===element){
      head = head.next;
      length--;
      return
    }
    // 两个变量用来迭代节点
    let previousNode = head;
    let currentNode = null;
    while(previousNode.next){
      // 当前元素
      currentNode = previousNode.next;
      // 找到元素
      if(currentNode.element === element){
        // 删除当前元素
          previousNode.next = currentNode.next;
          length--;
          break;
      }
      // 交接元素
      previousNode = currentNode;
    }    
  };
}
