// 하나의 프로젝트를 의미하는 객체
var Project = function() {
  this.id = dip.autoIncresement().getProjectId();
  this.tabId = 0;
  this.name = "";
  this.location = null;
  this.saveFlag = false;
  this.selectedComponent = null;
  this.hierarchy = new Hierarchy();
  this.devHtml = "";
  this.html = "";
  this.root = new Cell(0, 0);

  this.setName("untitled" + this.getId());
}

Project.prototype = {
  getId : function() { return this.id; },
  setId : function(id) { this.id = id; return this; },

  getTabId : function() { return this.tabId; },
  setTabId : function(tabId) { this.tabId = tabId; return this; },

  // 프로젝트의 이름
  // 탭에 표시되는 이름과 동일
  getName : function() { return this.name; },
  setName : function(name) { this.name = name; },

  // 프로젝트 저장 위치
  // 후에 클라우드 서버에 저장될 위치 정보 저장
  getLocation : function() { return this.location; },
  setLocation : function(location) { this.location = location; },

  // 프로젝트 저장 상태 여부
  // 프로젝트가 수정되어 클라우드 서버에 저장된 파일과 다를 때에 대한 상태를 표시
  getSaveFlag : function() { return this.saveFlag; },
  setSaveFlag : function(saveFlag) { this.saveFlag = saveFlag; },

  // 프로젝트 선택된 요소
  // 프로젝트 제작 중에 마우스 클릭 등으로 선택되어진 요소
  getSelectedComponent : function() { return this.selectedComponent; },
  setSelectedComponent : function(selectedComponent) {

    // 선택된 컴포넌트의 아이디 저장
    this.selectedComponent = selectedComponent;

    var nodeNum = this.getHierarchy().getNodeId() - 1;

    for(var i=1; i <= nodeNum; i++) {
      if(this.getSelectedComponent() == i) {
        $('#' + i).css('border', 'dotted 1px #ff6600');
      } else {
        $('#' + i).css('border', 'dotted 0px #ff6600');
      }
    }
  },

  // 프로젝트 hierarchy 소스
  // 프로젝트의 구조를 트리형태로 가지고 있는 객체
  getHierarchy : function() { return this.hierarchy; },
  setHierarchy : function(hierarchy) { this.hierarchy = hierarchy; },

  getDevHtml : function() { return document.getElementById('content' + this.getId()).innerHTML; },

  getHtml : function() { return this.html; },
  setHtml : function(html) { this.html = html; },

  getRoot : function() { return this.root; },
  setRoot : function(root) { this.root = root; },

  getCell : function(id) { return this.searchCellById(this.getRoot(), id); },
  setCell : function(cell) { this.cell = cell; },

  addCell : function(matrix, id, parentMatrixId) {
    matrix.push(new Array());
    matrix[matrix.length - 1].push(new Cell(id *= 1, parentMatrixId));

  },

  searchCellById : function(cell, id) {
    if(cell.getId() == id) {
      return cell;
    } else {
      for(var i=0; i< cell.getMatrix().length; i++) {
        var searchedCell = this.searchCellById(cell.getMatrix()[i], id);

        if(typeof(searchedCell) == 'object') {
          return searchedCell;
        }
      }
    }
  },

  searchNodeById : function(node, id) {
    if(node.getId() == id) {
      return node;
    } else {
      for(var i=0; i< node.getChildren().length; i++) {
        var searchedNode = this.searchNodeById(node.getChildren()[i], id);

        if(typeof(searchedNode) == 'object') {
          return searchedNode;
        }
      }
    }
  },

  // 최종적으로 만들어진 html소스를 얻어내는 함수
  saveHtml : function() {
    var html = "";
    var nodeId = 0;

    html += "<html>";
    html +=     "<head>";
    html +=         "<title>";
    html +=             this.getName();
    html +=         "</title>";
    html +=         "<style>";
    html +=             this.getHierarchy().getCss();
    html +=         "</style>";
    html +=     "</head>";
    html +=     "<body>";
    html +=         this.getHierarchy().getHtml();
    html +=     "</body>";
    html += "</html>";
    // input : hierarchy
    // html 소스를 기반으로 현 프로젝트 html소스의 계층구조를 반환하는 함수.

    this.setHtml(html);
    // output : html 소스
  },

  getMatrixById : function(id) {
    var values = this.getMatrixValuesById(id);
    var matrix = new Map();
    matrix.set('matrix', values.get('matrix'));

    return matrix;
  },

  getIndexById : function(id) {
    var values = this.getMatrixValuesById(id);
    var index = new Map();
    index.set('x', values.get('x'));
    index.set('y', values.get('y'));

    return index;
  },

  getMatrixValuesById : function(id) {
    var values = new Map();
    var x, y, matrix;

    var recursiveIndex = 0;

    this.recursiveSearch(id, values, dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getRoot().getMatrix());

    return values;
  },

  getLayout : function(id) {
    var mainIndex = this.getIndexById(id);

    if(mainIndex.get('x') > 0) {
      return Dip.HORIZON_LAYOUT;
    } else {
      return Dip.VERTICALITY_LAYOUT;
    }
  },

  recursiveSearch : function(id, values, matrix) {
    for(var i=0; i<matrix.length; i++) {
      for(var j=0; j<matrix[i].length; j++) {
        if(matrix[i][j].getId() == id) {
          values.set('x', j);
          values.set('y', i);
          values.set('matrix', matrix);

          break;
        }

        this.recursiveSearch(id, values, matrix[i][j].getMatrix());
      }
    }
  }
};
