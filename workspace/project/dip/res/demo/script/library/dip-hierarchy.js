var Hierarchy = function() {
  this.nodeId = 0;
  this.root = new Node(this.nodeId, this.nodeId++, new Div());
}

Hierarchy.ROOT_NODE = 0;

Hierarchy.prototype = {
  getRoot : function() { return this.root; },
  setRoot : function(root) { this.root = root; },

  getNodeId : function() { return this.nodeId; },

  addNewNode : function(parentId, data) {
    this.getRoot().getChildren().push(new Node(parentId, this.nodeId++, data));
  },

  addNode : function(parentId, childNode) {
    var parentNode = this.getNode(parentId);

    parentNode.getChildren().push(childNode);
  },

  removeNode : function(nodeId) {
    var node = this.searchNodeById(this.getRoot(), nodeId);
    var parentNode = this.getNode(node.getParentId());

    for(var i=0; i<parentNode.getChildren().length; i++) {
      if(parentNode.getChildren()[i].getId() == nodeId) {
        parentNode.getChildren().splice(i, 1);
      }
    }
  },

  getNode : function(nodeId) {
    // 재귀 탐색 구조구현해야한다.
    return this.searchNodeById(this.getRoot(), nodeId);
  },

  getLength : function() {
    var length = 0;
    length = this.recursiveLength(this.getRoot(), length);

    return length;
  },

  recursiveLength : function(node, length) {
    for(var i=0; i<node.getChildren().length; i++) {
      if(node.getChildren()[i].length != 0) {
        length = this.recursiveLength(node.getChildren()[i], length);
      }
      length++;
    }

    return length;
  },

  setXYByPositionAllComponent : function() {
    for(var i=1; i <= this.getLength(); i++) {
      this.getNode(i).getData().setXYByPosition();
    }
  },

  changeNodePosition : function(parentId, id) {
    var copyNode = this.getNode(id);
    this.removeNode(id);
    this.addNode(parentId, copyNode);
    this.getNode(id).setParentId(parentId);
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

  getCss : function() {
    var rootNode = this.getRoot();
    var css = "";

    css = this.recursiveCss(rootNode, css);

    return css;
  },

  recursiveCss : function(node, css) {

    for(var i=0; i<node.getChildren().length; i++) {
      css += node.getChildren()[i].getData().getCss();

      if(node.getChildren()[i].getChildren().length > 0) {
        css = this.recursiveCss(node.getChildren()[i], css);
      }
    }

    return css;
  },

  getHtml : function() {
    var rootNode = this.getRoot();
    var html = "";

    html = this.recursiveHtml(rootNode, html);

    return html;
  },

  recursiveHtml : function(node, html){

    for(var i=0; i<node.getChildren().length; i++) {
      html += node.getChildren()[i].getData().getOpenTagHtml();

      if(node.getChildren()[i].getChildren().length > 0) {
        html = this.recursiveHtml(node.getChildren()[i], html);
      }

      html += node.getChildren()[i].getData().getCloseTagHtml();
    }

    return html;
  },

  getDirectory : function() {
    var rootNode = this.getRoot();
    var html = "";
    var indentIndex = 1;

    html = this.recursiveDirectory(rootNode, html, indentIndex);

    return html;
  },

  recursiveDirectory : function(node, html, indentIndex) {
    for(var i=0; i<node.getChildren().length; i++) {
      html += "<div class='node_wrap'>";
      html +=     this.getIndent(indentIndex);
      html +=     "<div class='node'>";
      html +=         "<div class='typeImg'>";
      html +=             this.getImageType(node.getChildren()[i].getData().getDataType());
      html +=         "</div>";
      html +=         "<div class='classify'>";
      html +=             node.getChildren()[i].getData().getClassify();
      html +=         "</div>";
      html +=     "</div>";
      html += "</div>";

      if(node.getChildren()[i].getChildren().length > 0) {
        indentIndex++;
        html = this.recursiveDirectory(node.getChildren()[i], html, indentIndex);
        indentIndex--;
      }
    }

    return html;
  },

  getIndent : function(indentIndex) {
    var indentHtml = "";

    for(var i=0; i<indentIndex; i++) {
      indentHtml += "<div class='indent'></div>";
    }

    return indentHtml;
  },

  getImageType : function(dataType) {
    var html = "";
    if(dataType == 'box') {
      html += "<img src='./img/directory/box.png'>";
    }

    if(dataType == 'circle') {
      html += "<img src='./img/directory/circle.png'>";
    }

    if(dataType == 'text') {
      html += "<img src='./img/directory/text.png'>";
    }

    return html;
  }
}

var Node = function(parentId, nodeId, data) {
  this.id = nodeId;
  this.data = data;
  this.parentId = parentId;
  this.children = new Array();

  this.getData().setDipId(this.getId());
  this.getData().setClassify(this.getData().getDipClassify() + this.getData().getDipId());
  this.getData().addDipClassify("draggable_workspace");
  this.getData().addDipClassify("resizable");
}

Node.prototype = {
  getId : function() { return this.id; },

  getData : function() { return this.data; },
  setData : function(data) { this.data = data; },

  getParentId : function() { return this.parentId; },
  setParentId : function(parentId) { this.parentId = parentId; },

  getChildren : function() { return this.children; },
  setChildren : function(children) { this.children = children; }
}
