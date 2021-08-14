let isDragging = false;

// 事件委托
document.addEventListener('mousedown', function(event) {

  // 从内往外寻找第一个可以拖动的元素。
  let dragElement = event.target.closest('.draggable');
  // 没有元素
  if (!dragElement) return;

  // 阻止事件继续传播，阻止当前事件与ondrag事件冲突。
  event.preventDefault();
  dragElement.ondragstart = function() {
      return false;
  };

  // 初始化坐标，及偏移量。
  let coords, shiftX, shiftY;


  startDrag(dragElement, event.clientX, event.clientY);

  function onMouseUp(event) {
    finishDrag();
  };

  function onMouseMove(event) {
    moveAt(event.clientX, event.clientY);
  }

  // 在拖动开始时：
  //   记住初始的移位
  //   将元素设置为 position:fixed，并将此元素移动到作为 body 的直接子元素
  function startDrag(element, clientX, clientY) {
    // 容错处理：isDragging 这个变量主要是控制流程的状态转换。
    if(isDragging) {
      return;
    }
    
    // 开始拖动！
    isDragging = true;

    // 全局的mousemove事件
    document.addEventListener('mousemove', onMouseMove);
    element.addEventListener('mouseup', onMouseUp);

    // 修改全局的 shift 变量
    shiftX = clientX - element.getBoundingClientRect().left;
    shiftY = clientY - element.getBoundingClientRect().top;

    // 先fixed固定元素（基于窗口：client），最后转换absolute (基于文档：page)。
    element.style.position = 'fixed';

    // 处理正常情况和边缘情况，移动元素
    moveAt(clientX, clientY);
  };

  // 在最后，转换到绝对（absolute）坐标，以将元素固定在文档中
  function finishDrag() {
    if(!isDragging) {
      return;
    }

    isDragging = false;

    dragElement.style.top = parseInt(dragElement.style.top) + window.pageYOffset + 'px';
    dragElement.style.position = 'absolute';

    document.removeEventListener('mousemove', onMouseMove);
    dragElement.removeEventListener('mouseup', onMouseUp);
  }

  function moveAt(clientX, clientY) {
    // 新的窗口相对坐标
    let newX = clientX - shiftX;
    let newY = clientY - shiftY;

    // 检查新坐标是否在底部窗口边缘以下
    let newBottom = newY + dragElement.offsetHeight; // new bottom

    // 在窗口边缘以下？让我们滚动此页面
    if (newBottom > document.documentElement.clientHeight) {
      // 文档末端的窗口相对坐标
      let docBottom = document.documentElement.getBoundingClientRect().bottom;

      // 将文档向下滚动 10px 有一个问题
      // 它可以滚动到文档末尾之后
      // Math.min(how much left to the end, 10)
      let scrollY = Math.min(docBottom - newBottom, 10);

      // 计算是不精确的，可能会有舍入误差导致页面向上滚动
      // 这是不应该出现，我们在这儿解决它
      if (scrollY < 0) scrollY = 0;

      window.scrollBy(0, scrollY);

      // 快速移动鼠标将指针移至文档末端的外面
      // 如果发生这种情况 ——
      //  使用最大的可能距离来限制 newY（就是文档末端到顶端的距离）
      newY = Math.min(newY, document.documentElement.clientHeight - dragElement.offsetHeight);
    }

    // 检查新坐标是否在顶部窗口边缘上方（类似的逻辑）
    if (newY < 0) {
      // scroll up
      let scrollY = Math.min(-newY, 10);
      if (scrollY < 0) scrollY = 0; // 检查精度损失

      window.scrollBy(0, -scrollY);
      // 快速移动鼠标可以使指针超出文档的顶端
      newY = Math.max(newY, 0); // newY 不得小于 0
    }


    // 将 newX 限制在窗口范围内
    // 这里没有滚动，所以它很简单
    if (newX < 0) newX = 0;
    if (newX > document.documentElement.clientWidth - dragElement.offsetWidth) {
      newX = document.documentElement.clientWidth - dragElement.offsetWidth;
    }

    dragElement.style.left = newX + 'px';
    dragElement.style.top = newY + 'px';
  }

});


