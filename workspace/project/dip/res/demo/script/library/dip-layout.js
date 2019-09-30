Dip.CREATE_COMPONENT_LAYOUT = 13;

Dip.DEFALUT_LAYOUT = 0;
Dip.HORIZON_LAYOUT = 10;
Dip.VERTICALITY_LAYOUT = 11;
Dip.NESTED_LAYOUT = 12;

Dip.NOT_MOVE_LAYOUT = 4;
Dip.HORIZON_TO_VERTICALITY_LAYOUT = 1;
Dip.VERTICALITY_TO_HORIZON_LAYOUT = 2;
Dip.HORIZON_TO_HORIZON_LAYOUT = 3;
Dip.NESTED_LAYOUT = 5;

var Cell = function(id, parentCellId) {
  this.id = id;
  this.matrix = new Array();
  this.parentCellId = parentCellId;
}

Cell.prototype = {
  getId : function() { return this.id; },
  setId : function(id) { this.id = id; return this; },

  getMatrix : function() { return this.matrix; },
  setMatrix : function(matrix) { this.matrix = matrix; return this; },

  getParentCellId : function() { return this.parentCellId; },
  setParentCellId : function(parentCellId) { this.parentCellId = parentCellId; },
}

Project.prototype.applyLayout = function(id, mainLeft, mainRight, mainTop, mainBottom) {
  var matrix = this.getMatrixById(id).get('matrix');
  var result = this.calculateLayout(id, mainLeft, mainRight, mainTop, mainBottom, matrix);

  if(result.get('resultLayout') == Dip.HORIZON_TO_VERTICALITY_LAYOUT) {
    this.setHorizonToVerticalityLayout(id, result.get('resultTargetIndexX'), result.get('resultTargetIndexY'), matrix);
  } else if(result.get('resultLayout') == Dip.VERTICALITY_TO_HORIZON_LAYOUT) {
    this.setVerticalityToHorizonLayout(id, result.get('resultTargetIndexX'), result.get('resultTargetIndexY'), matrix);
  } else if(result.get('resultLayout') == Dip.NOT_MOVE_LAYOUT) {
    this.setNotMoveLayout(id);
  } else if(result.get('resultLayout') == Dip.HORIZON_TO_HORIZON_LAYOUT) {
    this.setHorizonToHorizonLayout(id, result.get('resultTargetIndexX'), result.get('resultTargetIndexY'), matrix);
  } else if(result.get('resultLayout') == Dip.NESTED_LAYOUT) {
    this.setNestedLayout(id, result.get('resultTargetIndexX'), result.get('resultTargetIndexY'), matrix);
  }

  return id;
}

Project.prototype.setHorizonToVerticalityLayout = function(mainId, targetIndexX, targetIndexY, matrix) {
  var mainIndex, targetId;

  mainIndex = this.getIndexById(mainId);
  document.getElementById(mainId).outerHTML = "";
  matrix[mainIndex.get('y')].splice(mainIndex.get('x'), 1);

  targetId = matrix[targetIndexY][matrix[targetIndexY].length - 1].getId();

  matrix.push(new Array());
  matrix[matrix.length-1].push(new Cell((mainId*=1)));

  dip.createNewComponentInWorkspace(mainId, targetId, Dip.HORIZON_TO_VERTICALITY_LAYOUT);
  $('<div class="clearFloat"></div>').insertBefore($("#" + mainId));

  this.getHierarchy().getNode(mainId).getData().setXYByPosition();
}

Project.prototype.setVerticalityToHorizonLayout = function(mainId, targetIndexX, targetIndexY, matrix) {
  var mainIndex, targetId;

  if(document.getElementById(mainId).previousSibling.className == 'clearFloat') {
    document.getElementById(mainId).previousSibling.outerHTML = "";
  }

  mainIndex = this.getIndexById(mainId);
  document.getElementById(mainId).outerHTML = "";
  matrix[mainIndex.get('y')].splice(mainIndex.get('x'), 1);

  matrix.splice(mainIndex.get('y'), 1);
  if(mainIndex.get('y') > targetIndexY) {
    targetId = matrix[targetIndexY][matrix[targetIndexY].length - 1].getId();
    matrix[targetIndexY].push(new Cell((mainId*=1)));
  } else {
    targetId = matrix[targetIndexY - 1][matrix[targetIndexY - 1].length - 1].getId();
    matrix[targetIndexY - 1].push(new Cell((mainId*=1)));
  }

  dip.createNewComponentInWorkspace(mainId, targetId, Dip.VERTICALITY_TO_HORIZON_LAYOUT);
  this.getHierarchy().getNode(mainId).getData().setXYByPosition();
}

Project.prototype.setNotMoveLayout = function(mainId) {
  $('<div id="swap"></div>').insertAfter($("#" + mainId));
  document.getElementById(mainId).outerHTML = "";
  dip.createNewComponentInWorkspace(mainId, "swap", Dip.NOT_MOVE_LAYOUT);
  document.getElementById(mainId).previousSibling.outerHTML = "";
}

Project.prototype.setHorizonToHorizonLayout = function(mainId, targetIndexX, targetIndexY, matrix) {
  var mainIndex, targetId;

  mainIndex = this.getIndexById(mainId);
  document.getElementById(mainId).outerHTML = "";
  matrix[mainIndex.get('y')].splice(mainIndex.get('x'), 1);

  targetId = matrix[targetIndexY][matrix[targetIndexY].length - 1].getId();
  matrix[targetIndexY].push(new Cell((mainId*=1)));

  dip.createNewComponentInWorkspace(mainId, targetId, Dip.HORIZON_TO_HORIZON_LAYOUT);
  this.getHierarchy().getNode(mainId).getData().setXYByPosition();
}

Project.prototype.setNestedLayout = function(mainId, targetIndexX, targetIndexY, matrix) {
  var mainIndex, targetId;

  this.addCell(matrix[targetIndexY][targetIndexX].getMatrix(), mainId, matrix[targetIndexY][targetIndexX].getId());
  targetId = matrix[targetIndexY][targetIndexX].getId();

  mainIndex = this.getIndexById(mainId);
  document.getElementById(mainId).outerHTML = "";
  matrix[mainIndex.get('y')].splice(mainIndex.get('x'), 1);

  if(matrix[mainIndex.get('y')].length == 0) {
    matrix.splice(mainIndex.get('y'), 1);
  }

  console.log("targetIndexX : " + targetIndexX + "targetIndexY : " + targetIndexY);

  dip.createNewComponentInWorkspace(mainId, targetId, Dip.NESTED_LAYOUT);
  dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().changeNodePosition(targetId, mainId);
}

Project.prototype.calculateLayout = function(id, mainLeft, mainRight, mainTop, mainBottom, matrix) {
  var mainCenterX = this.getHierarchy().getNode(id).getData().getX();
  var mainCenterY = this.getHierarchy().getNode(id).getData().getY();

  var mainLayout = this.getLayout(id);

  var nodeNum = this.getHierarchy().getNodeId() - 1;

  var targetCenterX, targetCenterY;
  var targetWidth, targetHeight;
  var targetLeft, targetRight, targetTop, targetBottom;

  var result = new Map();

  var resultTargetIndexX = 0;
  var resultTargetIndexY = 0;

  var resultLayout = Dip.DEFALUT_LAYOUT;
  var resultPriorityForHoriToVerti = 10000;
  var resultPriorityForVertiToHori = 0;

  var IS_ALONE_FLAG = true;

  for(var i=0; i < matrix.length; i++) {
    for(var j=0; j < matrix[i].length; j++) {
      if(matrix[i][j].getId() != id) {
        IS_ALONE_FLAG = false;

        targetCenterX = this.getHierarchy().getNode(matrix[i][j].getId()).getData().getX();
        targetCenterY = this.getHierarchy().getNode(matrix[i][j].getId()).getData().getY();

        targetWidth = this.getHierarchy().getNode(matrix[i][j].getId()).getData().getWidth();
        targetHeight = this.getHierarchy().getNode(matrix[i][j].getId()).getData().getHeight();

        targetLeft = targetCenterX - (targetWidth / 2);
        targetRight = targetCenterX + (targetWidth / 2);
        targetTop = targetCenterY - (targetHeight / 2);
        targetBottom = targetCenterY + (targetHeight / 2);

        var resultLayoutEngine = this.layoutEngine(mainCenterX, mainCenterY, mainLeft, mainRight, mainTop, mainBottom, mainLayout, targetLeft, targetRight, targetTop, targetBottom);

        if(resultLayoutEngine.get('layout') == Dip.HORIZON_TO_VERTICALITY_LAYOUT) {
          if(resultPriorityForHoriToVerti > resultLayoutEngine.get('priority')) {
            resultPriorityForHoriToVerti = resultLayoutEngine.get('priority');
            resultLayout = resultLayoutEngine.get('layout');
            resultTargetIndexX = j;
            resultTargetIndexY = i;
          }
        } else if(resultLayoutEngine.get('layout') == Dip.VERTICALITY_TO_HORIZON_LAYOUT) {
          if(resultPriorityForVertiToHori < resultLayoutEngine.get('priority')) {
            resultPriorityForVertiToHori = resultLayoutEngine.get('priority');
            resultLayout = resultLayoutEngine.get('layout');
            resultTargetIndexX = j;
            resultTargetIndexY = i;
          }
        } else if(resultLayoutEngine.get('layout') == Dip.HORIZON_TO_HORIZON_LAYOUT) {
            resultLayout = resultLayoutEngine.get('layout');
            resultTargetIndexX = j;
            resultTargetIndexY = i;
        } else if(resultLayoutEngine.get('layout') == Dip.NOT_MOVE_LAYOUT) {
            resultLayout = resultLayoutEngine.get('layout');
        } else if(resultLayoutEngine.get('layout') == Dip.NESTED_LAYOUT) {
            resultLayout = resultLayoutEngine.get('layout');
            resultTargetIndexX = j;
            resultTargetIndexY = i;
        }
      }
    }
  }

  if(IS_ALONE_FLAG) {
    resultLayout = Dip.NOT_MOVE_LAYOUT;
  }

  result.set('resultTargetIndexX', resultTargetIndexX);
  result.set('resultTargetIndexY', resultTargetIndexY);
  result.set('resultLayout', resultLayout);

  return result;
}

Project.prototype.layoutEngine = function(mainCenterX, mainCenterY, mainLeft, mainRight, mainTop, mainBottom, mainLayout, targetLeft, targetRight, targetTop, targetBottom) {
  var result = new Map();
  // console.log("layoutEngine -> mainCenterX : " + mainCenterX
  //             + ", mainCenterY : " + mainCenterY
  //             + ", mainLeft : " + mainLeft
  //             + ", mainRight : " + mainRight
  //             + ", mainTop : " + mainTop
  //             + ", mainBottom : " + mainBottom
  //             + ", mainLayout : " + mainLayout
  //             + ", targetLeft : " + targetLeft
  //             + ", targetRight : " + targetRight
  //             + ", targetTop : " + targetTop
  //             + ", targetBottom : " + targetBottom);

  if(mainCenterX > mainLeft && mainCenterX < mainRight && mainCenterY > mainTop && mainCenterY < mainBottom) {
    result.set('layout', Dip.NOT_MOVE_LAYOUT);
    return result;
  }

  if(mainCenterX > targetLeft && mainCenterX < targetRight && mainCenterY > targetTop && mainCenterY < targetBottom) {
    result.set('layout', Dip.NESTED_LAYOUT);
    return result;
  }

  if(mainCenterY > targetBottom) {

    if(mainLayout == Dip.VERTICALITY_LAYOUT) {
      result.set('layout', Dip.NOT_MOVE_LAYOUT);
      return result;

    } else if(mainLayout == Dip.HORIZON_LAYOUT) {
      var gap = mainCenterY - targetBottom;

      result.set('layout', Dip.HORIZON_TO_VERTICALITY_LAYOUT);
      result.set('priority', gap);

      return result;
    }
  }

  if(mainCenterY > targetTop && mainCenterY < targetBottom) {
    if(mainLayout == Dip.HORIZON_LAYOUT) {
      result.set('layout', Dip.HORIZON_TO_HORIZON_LAYOUT);

    } else if(mainLayout == Dip.VERTICALITY_LAYOUT) {
      result.set('layout', Dip.VERTICALITY_TO_HORIZON_LAYOUT);
      result.set('priority', targetLeft);
    }

    return result;
  }

  result.set('layout', Dip.DEFALUT_LAYOUT);
  return result;
}
