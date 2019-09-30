// Author 윤기동

// static 변수
// var projectId = 0;

var Dip = function() {
  this.project = new Array();
  this.projectId = 0;
  this.projectIndex = 0;
  this.curProjectId = this.projectId;
  this.name = "untitled DIP";

  this.LEFT_FIX_FLAG = true;
  this.RIGHT_FIX_FLAG = true;
  this.LEFT_STATE_FLAG = true;
  this.RIGHT_STATE_FLAG = true;
}

Dip.prototype = {
  getProject : function() { return this.project; },
  setProject : function(project) { this.project = project; return this; },

  getCurProjectId : function() { return this.curProjectId; },
  setCurProjectId : function(curProjectId) { this.curProjectId = curProjectId; return this; },

  getProjectIndex : function() { return this.projectIndex; },
  setProjectIndex : function(projectIndex) { this.projectIndex = projectIndex; return this; },

  getName : function() { return this.name; },
  setName : function(name) { this.name = name; return this; },

  getProjectId : function() { return this.projectId; },
  setProjectId : function(projectId) { this.projectId = projectId; return this; },
  autoIncresement :function() { this.projectId++; return this; },

  getLeftFixFlag : function() { return this.LEFT_FIX_FLAG; },
  setLeftFixFlag : function(flag) { this.LEFT_FIX_FLAG = flag; return this; },

  getRightFixFlag : function() { return this.RIGHT_FIX_FLAG; },
  setRightFixFlag : function(flag) { this.RIGHT_FIX_FLAG = flag; return this; },

  getLeftStateFlag : function() { return this.LEFT_STATE_FLAG; },
  setLeftStateFlag : function(flag) { this.LEFT_STATE_FLAG = flag; return this; },

  getRightStateFlag : function() { return this.RIGHT_STATE_FLAG; },
  setRightStateFlag : function(flag) { this.RIGHT_STATE_FLAG = flag; return this; },

  getIndexById : function(id) {
    for(var i=0; i<this.getProject().length; i++) {
      if(this.getProject()[i].getId() == id) {
        return i;
      }
    }

    return -1;
  },

  setComponentInnerHTMLForTools : function(component) {
    var splitComponent = component.split("_");

    if(component == "box") {
      return "<img src='./img/box.png' />";
    } else if(component =="circle") {
      return "<img src='./img/circle.png' />";
    } else if(component == "textNormal") {
      return "<img src='./img/text_normal.png' />";
    } else if(component == "textHeader") {
      return "<img src='./img/text_header.png' />";
    } else if(component == "image") {

    } else if(splitComponent[1] == "image") {
      return "<img src='./img/sample/" + splitComponent[0] + ".png' />";
    }
    return "<p></p>";
  },

  setComponentInnerHTMLForWorkspace : function(component, id) {
    console.log("dip.js -> setComponentInnerHTMLForWorkspace -> component : " + component);
    var splitComponent = component.split("_");

    if(component == "textNormal") {
      return "<textarea>" + dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().getText() + "</textarea>";
    } else if(component == "textHeader") {
      return "<textarea>" + dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().getText() + "</textarea>";
    } else if(component == "button") {
      return "<button>BUTTON</button>";
    } else if(component == "image") {
      return "<img src='./img/sample/" + dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().getSrc() + ".png' />";
    } else if(splitComponent[1] == "image") {
      return "<img src='./img/sample/" + splitComponent[0] + ".png' />";
    }

    return "";
  },

  createNewComponent : function(component) {
    var newComponent = document.createElement('div');
    var id = dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNodeId();

    newComponent.id = id;
    dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().addNewNode(Hierarchy.ROOT_NODE, this.createNodeByComponentType(component));
    newComponent.className = dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().getDipClassify();
    newComponent.innerHTML = this.setComponentInnerHTMLForWorkspace(component, id);

    document.getElementById("content" + dip.getCurProjectId()).appendChild(newComponent);
    $('<div class="clearFloat"></div>').insertBefore($("#" + id));

    dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().applyComponentAttrs();
    dip.getProject()[dip.getIndexById(dip.getCurProjectId())].addCell(dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getRoot().getMatrix(), id, Hierarchy.ROOT_NODE);

    return id;
  },

  createNewComponentInWorkspace : function(id, targetId, layout) {
    var newComponent = document.createElement('div');

    newComponent.id = id;
    newComponent.className = dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().getDipClassify();
    newComponent.innerHTML = this.setComponentInnerHTMLForWorkspace(dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().getMainDipClassify(), id);
    if(layout != Dip.NESTED_LAYOUT) {
      $(newComponent).insertAfter($("#" + targetId));
    } else {
      var targetComponent = document.getElementById(targetId);
      targetComponent.appendChild(newComponent);
      $('<div class="clearFloat"></div>').insertBefore(newComponent);
    }

    dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().applyComponentAttrs();

    for(var i=0; i<dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getChildren().length; i++) {
      console.log("it already has a child nodes id : " + dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getChildren()[i].getId());
      this.createNewComponentInWorkspace(dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getChildren()[i].getId(), id, Dip.NESTED_LAYOUT);
    }

    return id;
  },

  removeComponent : function(id) {
    // 1. Hierarchy 에서 제거
    var targetNode = dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id);
    var parentNode = dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(targetNode.getParentId());

    for(var i=0; i<parentNode.getChildren().length; i++) {
      if(parentNode.getChildren()[i].getId() == id) {
        console.log("i : " + i);
        parentNode.getChildren().splice(i, 1);
      }
    }

    // 2. Matrix 에서 제거
    var matrixValues = dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getMatrixValuesById(id);
    var matrix = matrixValues.get('matrix');
    var x = matrixValues.get('x');
    var y = matrixValues.get('y');

    matrix[y].splice(x, 1);
    if(matrix[y].length == 0) {
      matrix.splice(y, 1);
    }

    // 3. html에서 제거.
    var component = document.getElementById(id);

    if(component.previousSibling.className == "clearFloat") {
      component.previousSibling.outerHTML = "";
    }
    component.outerHTML="";
  },

  createNodeByComponentType : function(component) {
    var splitComponent = component.split("_");

    if(component == "box") {
      var dipClassify = "box";
      return new Box(dipClassify);

    } else if(component == "circle") {
      var dipClassify = "circle";
      return new Circle(dipClassify);

    } else if(component == "textNormal") {
      var dipClassify = "textNormal";
      var fontSize = 12;
      var fontStyle = "normal";

      return new Text(dipClassify, fontSize, fontStyle);

    } else if(component == "textHeader") {
      var dipClassify = "textHeader";
      var fontSize = 25;
      var fontStyle = "bold";

      return new Text(dipClassify, fontSize, fontStyle);

    } else if(component == "table") {
      var dipClassify = "table";
      return new Table(dipClassify);

    } else if(component == "button") {
      var dipClassify = "button";
      return new Button(dipClassify);

    } else if(splitComponent[1] == "image") {
      var dipClassify = "image";
      var srcName = splitComponent[0];
      return new Image(dipClassify, srcName);
    }
    return new Div();
  },

  getJson : function() {
    var dipJson = new DipJson();

    dipJson.push('DIPNAME', dip.getName());
    return dipJson.getJson();
  }
}

var DipJson = function() {
  this.key = new Array();
  this.value = new Array();
}

DipJson.prototype = {
  getKey : function() { return this.key; },
  setKey : function(key) { this.key = key; return this; },

  getValue : function() { return this.value; },
  setValue : function(value) { this.value = value; return this; },

  push : function(key, value) {
    this.getKey().push(key);
    this.getValue().push(value);
  },

  getJson : function() {
    var jsonStringify = '{';
    for(var i=0; i<this.getKey().length; i++) {
      if(i != 0) {
        jsonStringify += ",";
      }
      jsonStringify += "\"" + this.getKey()[i] + "\":";
      jsonStringify += "\"" + this.getValue()[i] + "\"";
    }
    jsonStringify += '}';

    var json = JSON.parse(jsonStringify);

    return json;
  }
}
