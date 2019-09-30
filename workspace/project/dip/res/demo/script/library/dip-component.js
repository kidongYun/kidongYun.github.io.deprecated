var Div = function() {
  this.tagName = "div";

  this.dipId = null;
  this.dipClassify = null;

  this.id = "";
  this.classify = "";

  this.width = 150;
  this.height = 150;
  this.backgroundColor = "#ffffff";
  this.float = "left";

  this.marginTop = "0px";
  this.marginBottom = "0px";
  this.marginLeft = "0px";
  this.marginRight = "0px";

  this.paddingTop = "0px";
  this.paddingBottom = "0px";
  this.paddingLeft = "0px";
  this.paddingRight = "0px";

  this.borderTop = "solid 0px #000000";
  this.borderBottom = "solid 0px #000000";
  this.borderLeft = "solid 0px #000000";
  this.borderRight = "solid 0px #000000";

  this.position = null;
  this.zIndex = null;

  this.x = null;
  this.y = null;
}

Div.prototype = {
  getTagName : function() { return this.tagName; },
  setTagName : function(tagName) { this.tagName = tagName; },

  getDipId : function() { return this.dipId; },
  setDipId : function(dipId) { this.dipId = dipId; },

  getDipClassify : function() { return this.dipClassify },
  setDipClassify : function(dipClassify) { this.dipClassify = dipClassify; },
  addDipClassify : function(addDipClassify) {
    this.dipClassify += " " + addDipClassify;
    $('#' + this.getDipId()).addClass(addDipClassify);
  },

  getMainDipClassify : function() {
    return this.getDipClassify().split(" ")[0];
  },

  getId : function() { return this.id; },
  setId : function(id) { this.id = id; return this; },

  getClassify : function() { return this.classify; },
  setClassify : function(classify) { this.classify = classify; return this; },

  getWidth : function() { return this.width; },
  setWidth : function(width) { this.width = width; return this; },

  getHeight : function() { return this.height; },
  setHeight : function(height) { this.height = height; return this; },

  getBackgroundColor : function() { return this.backgroundColor; },
  setBackgroundColor : function(backgroundColor) { this.backgroundColor = backgroundColor; return this; },

  getFloat : function() { return this.float; },
  setFloat : function(float) { this.float = float; return this; },

  getMarginTop : function() { return this.marginTop; },
  setMarginTop : function(marginTop) { this.marginTop = marginTop; return this; },

  getMarginBottom : function() { return this.marginBottom; },
  setMarginBottom : function(marginBottom) { this.marginBottom = marginBottom; return this; },

  getMarginLeft : function() { return this.marginLeft; },
  setMarginleft : function(marginLeft) { this.marginLeft = marginLeft; return this; },

  getMarginRight : function() { return this.marginRight; },
  setMarginRight : function(marginRight) { this.marginRight = marginRight; return this; },

  getPaddingTop : function() { return this.paddingTop; },
  setPaddingTop : function(paddingTop) { this.paddingTop = paddingTop; return this; },

  getPaddingBottom : function() { return this.paddingBottom; },
  setPaddingBottom : function(paddingBottom) { this.paddingBottom = paddingBottom; return this; },

  getPaddingLeft : function() { return this.paddingLeft; },
  setPaddingLeft : function(paddingLeft) { this.paddingLeft = paddingLeft; return this; },

  getPaddingRight : function() { return this.paddingRight; },
  setPaddingRight : function(paddingRight) { this.paddingRight = paddingRight; return this; },

  getBorderTop : function() { return this.borderTop; },
  setBorderTop : function(borderTop) { this.borderTop = borderTop; return this; },

  getBorderBottom : function() { return this.borderBottom; },
  setBorderBottom : function(borderBottom) { this.borderBottom = borderBottom; return this; },

  getBorderLeft : function() { return this.borderLeft; },
  setBorderLeft : function(borderLeft) { this.borderLeft = borderLeft; return this; },

  getBorderRight : function() { return this.borderRight; },
  setBorderRight : function(borderRight) { this.borderRight = borderRight; return this; },

  setBorder : function(border) {
    this.setBorderTop(border);
    this.setBorderBottom(border);
    this.setBorderLeft(border);
    this.setBorderRight(border);

    return this;
  },

  getPosition : function() { return this.position; },
  setPosition : function(position) { this.position = position; return this; },

  getZIndex : function() { return this.zIndex; },
  setZIndex : function(zIndex) { this.zIndex = zIndex; return this; },

  getX : function() { return this.x; },
  setX : function(x) { this.x = x; return this; },
  setXByPosition : function() {
    var target = $('#' + this.getDipId());
    var left = target.offset().left;
    var right = left + target.width();
    var x = (left + right) / 2;

    this.x = x;

    return this;
  },

  getY : function() { return this.y; },
  setY : function(y) { this.y = y; },

  setYByPosition : function() {
    var target = $('#' + this.getDipId());
    var top = target.offset().top;
    var bottom = top + target.height();
    var y = (top + bottom) / 2;

    this.y = y;

    return this;
  },

  setXYByPosition : function() {
    this.setXByPosition();
    this.setYByPosition();

    return this;
  },

  getWidthMax : function() {
    var parent = document.getElementById(this.getDipId()).parentNode;
    var parentId = parent.id;

    return $('#' + parentId).width() * 1;
  },
  getHeightMax : function() {
    var parent = document.getElementById(this.getDipId()).parentNode;
    var parentId = parent.id;

    return $('#' + parentId).height() * 1;
  },


  getDataType : function() { return "div"; },

  getOpenTagHtml : function() {
    var html = "<div class=\"" + this.getClassify() + "\">";

    return html;
  },

  getCloseTagHtml : function() {
    var html = "</div>";

    return html;
  },

  getCss : function() {
    var selector = "." + this.getClassify();
    var componentAttrs = this.getAttrsForCss();
    var css = selector + " {";

    for(var [key, value] of componentAttrs) {
      if(key == "float") {
        var prevComponentClass = document.getElementById(this.getDipId()).previousSibling.className;
        var firstNodeId = dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getRoot().getChildren()[0].getId();

        if(prevComponentClass == "clearFloat" && this.getDipId() != firstNodeId) {
          console.log("clearFloat!!!");
          css += key + ": ";
          css += "none; ";
        }
      } else {
        css += key + ": ";
        css += value + "; ";
      }
    }

    css += "}";

    return css;
  },

  applyComponentAttrs : function() {
    $("#" + this.getDipId()).css({"width" : this.getWidth()});
    $("#" + this.getDipId()).css({"height" : this.getHeight()});
    $("#" + this.getDipId()).css({"background-color" : this.getBackgroundColor()});
    $("#" + this.getDipId()).css({"float" : this.getFloat()});
    $("#" + this.getDipId()).css({"marginTop" : this.getMarginTop()});
    $("#" + this.getDipId()).css({"marginBottom" : this.getMarginBottom()});
    $("#" + this.getDipId()).css({"marginLeft" : this.getMarginLeft()});
    $("#" + this.getDipId()).css({"marginRight" : this.getMarginRight()});
    $("#" + this.getDipId()).css({"paddingTop" : this.getPaddingTop()});
    $("#" + this.getDipId()).css({"paddingBottom" : this.getPaddingBottom()});
    $("#" + this.getDipId()).css({"paddingLeft" : this.getPaddingLeft()});
    $("#" + this.getDipId()).css({"paddingRight" : this.getPaddingRight()});
    $("#" + this.getDipId()).css({"borderTop" : this.getBorderTop()});
    $("#" + this.getDipId()).css({"borderBottom" : this.getBorderBottom()});
    $("#" + this.getDipId()).css({"borderLeft" : this.getBorderLeft()});
    $("#" + this.getDipId()).css({"borderRight" : this.getBorderRight()});
    $("#" + this.getDipId()).css({"zIndex" : this.getZIndex()});
  },

  getAttrs : function() {
    var attrs = new Map();
    attrs.set("classify", this.getClassify());
    attrs.set("width", this.getWidth());
    attrs.set("height", this.getHeight());
    attrs.set("backgroundColor", this.getBackgroundColor());
    attrs.set("float", this.getFloat());
    attrs.set("marginTop", this.getMarginTop());
    attrs.set("marginBottom", this.getMarginBottom());
    attrs.set("marginLeft", this.getMarginLeft());
    attrs.set("marginRight", this.getMarginRight());
    attrs.set("paddingTop", this.getPaddingTop());
    attrs.set("paddingBottom", this.getPaddingBottom());
    attrs.set("paddingLeft", this.getPaddingLeft());
    attrs.set("paddingRight", this.getPaddingRight());
    attrs.set("borderTop", this.getBorderTop());
    attrs.set("borderBottom", this.getBorderBottom());
    attrs.set("borderLeft", this.getBorderLeft());
    attrs.set("borderRight", this.getBorderRight());
    attrs.set("zIndex", this.getZIndex());

    return attrs;
  },

  getAttrsForCss : function() {
    var attrs = new Map();
    attrs.set("width", this.getWidth());
    attrs.set("height", this.getHeight());
    attrs.set("background-color", this.getBackgroundColor());
    attrs.set("float", this.getFloat());
    attrs.set("margin-top", this.getMarginTop());
    attrs.set("margin-bottom", this.getMarginBottom());
    attrs.set("margin-left", this.getMarginLeft());
    attrs.set("margin-right", this.getMarginRight());
    attrs.set("padding-top", this.getPaddingTop());
    attrs.set("padding-bottom", this.getPaddingBottom());
    attrs.set("padding-left", this.getPaddingLeft());
    attrs.set("padding-right", this.getPaddingRight());
    attrs.set("border-top", this.getBorderTop());
    attrs.set("border-bottom", this.getBorderBottom());
    attrs.set("border-left", this.getBorderLeft());
    attrs.set("border-right", this.getBorderRight());
    attrs.set("z-index", this.getZIndex());

    return attrs;
  }
}

var UBR = function() {
  // UBR : Using Border Radius로 Border-Radius 속성을 사용하는 객체들의 묶음을 의미한다.
  // Box, Image, Table이 포함된다.
  Div.apply(this);

  this.borderTopRightRadius = "0px";
  this.borderBottomRightRadius = "0px";
  this.borderTopLeftRadius = "0px";
  this.borderBottomLeftRadius = "0px";
}

UBR.prototype = Object.create(Div.prototype);

UBR.prototype.getBorderTopLeftRadius = function() { return this.borderTopLeftRadius; }
UBR.prototype.setBorderTopLeftRadius = function(borderTopLeftRadius) { this.borderTopLeftRadius = borderTopLeftRadius; return this; }
UBR.prototype.getBorderTopRightRadius = function() { return this.borderTopRightRadius; }
UBR.prototype.setBorderTopRightRadius = function(borderTopRightRadius) { this.borderTopRightRadius = borderTopRightRadius; return this; }
UBR.prototype.getBorderBottomLeftRadius = function() { return this.borderBottomLeftRadius; }
UBR.prototype.setBorderBottomLeftRadius = function(borderBottomLeftRadius) { this.borderBottomLeftRadius = borderBottomLeftRadius; return this; }
UBR.prototype.getBorderBottomRightRadius = function() { return this.borderBottomRightRadius; }
UBR.prototype.setBorderBottomRightRadius = function(borderBottomRightRadius) { this.borderBottomRightRadius = borderBottomRightRadius; return this; }

UBR.prototype.setBorderRadius = function(borderRadius) {
  this.setBorderTopLeftRadius(borderRadius);
  this.setBorderTopRightRadius(borderRadius);
  this.setBorderBottomLeftRadius(borderRadius);
  this.setBorderBottomRightRadius(borderRadius);

  return this;
}

UBR.prototype.applyComponentAttrs = function() {
  Div.prototype.applyComponentAttrs.call(this);
  $("#" + this.getDipId()).css({"border-top-left-radius" : this.getBorderTopLeftRadius()});
  $("#" + this.getDipId()).css({"border-top-right-radius" : this.getBorderTopRightRadius()});
  $("#" + this.getDipId()).css({"border-bottom-left-radius" : this.getBorderBottomLeftRadius()});
  $("#" + this.getDipId()).css({"border-bottom-right-radius" : this.getBorderBottomRightRadius()});
}

UBR.prototype.getAttrs = function() {
  var attrs = Div.prototype.getAttrs.call(this);
  attrs.set("borderTopLeftRadius", this.getBorderTopLeftRadius());
  attrs.set("borderTopRightRadius", this.getBorderTopRightRadius());
  attrs.set("borderBottomLeftRadius", this.getBorderBottomLeftRadius());
  attrs.set("borderBottomRightRadius", this.getBorderBottomRightRadius());

  return attrs;
}

UBR.prototype.getAttrsForCss = function() {
  var attrs = Div.prototype.getAttrsForCss.call(this);
  attrs.set("border-top-left-radius", this.getBorderTopLeftRadius());
  attrs.set("border-top-right-radius", this.getBorderTopRightRadius());
  attrs.set("border-bottom-left-radius", this.getBorderBottomLeftRadius());
  attrs.set("border-bottom-right-radius", this.getBorderBottomRightRadius());

  return attrs;
}

var Box = function(dipClassify) {
  UBR.apply(this);

  this.tagName = "Box";
  this.setDipClassify(dipClassify);
}

Box.prototype = Object.create(UBR.prototype);
Box.prototype.getDataType = function() { return "box"; }

var Circle = function(dipClassify) {
  Div.apply(this);

  this.tagName = "Circle";
  this.setDipClassify(dipClassify);
}

Circle.prototype = Object.create(Div.prototype);
Circle.prototype.getDataType = function() { return "circle"; }
Circle.prototype.getAttrsForCss = function() {
  var attrs = Div.prototype.getAttrsForCss.call(this);
  attrs.set("border-radius", "50%");

  return attrs;
}

var Text = function(dipClassify, fontSize, fontStyle) {
  Div.apply(this);

  this.tagName = "Text";

  this.text = "insert text here";
  this.textStyle = fontStyle;
  this.textSize = fontSize;
  this.textColor = "";

  this.setDipClassify(dipClassify);

  this.setWidth(100);
  this.setHeight(100);
  this.setBackgroundColor("rgba(255, 255, 255, 0)");
  this.setBorder("solid 0px #ffffff");
}

Text.prototype = Object.create(Div.prototype);
Text.prototype.getDataType = function() { return "text"; }

Text.prototype.getText = function() { return this.text; }
Text.prototype.setText = function(text) { this.text = text; return this; }

Text.prototype.getTextStyle = function() { return this.textStyle; }
Text.prototype.setTextStyle = function(textStyle) { this.textStyle = textStyle; return this; }

Text.prototype.getTextSize = function() { return this.textSize; }
Text.prototype.setTextSize = function(textSize) { this.textSize = textSize; return this; }

Text.prototype.getTextColor = function() { return this.textColor; }
Text.prototype.setTextColor = function(textColor) { this.textColor = textColor; return this; }

Text.prototype.applyComponentAttrs = function() {
  Div.prototype.applyComponentAttrs.call(this);
  $("#" + this.getDipId() + " textarea").text(this.getText());
  $("#" + this.getDipId() + " textarea").css("font-style", this.getTextStyle());
  $("#" + this.getDipId() + " textarea").css("font-size", this.getTextSize());
  $("#" + this.getDipId() + " textarea").css("color", this.getTextColor());
}

Text.prototype.getAttrs = function() {
  var attrs = Div.prototype.getAttrs.call(this);
  attrs.set("text", this.getText());
  attrs.set("textStyle", this.getTextStyle());
  attrs.set("textSize", this.getTextSize());
  attrs.set("textColor", this.getTextColor());

  return attrs;
}

Text.prototype.getAttrsForCss = function() {
  var attrs = Div.prototype.getAttrsForCss.call(this);
  attrs.set("font-weight", this.getTextStyle());
  attrs.set("font-size", this.getTextSize());
  attrs.set("color", this.getTextColor());
}


var Table = function(dipClassify) {
  Div.apply(this);

  this.tagName = "Table";
  this.setDipClassify(dipClassify);

  this.cols = 0;
  this.rows = 0;

}

Table.prototype = Object.create(Div.prototype);

Table.prototype.getCols = function() { return this.cols; }
Table.prototype.setCols = function(cols) { this.cols = cols; return this; }

Table.prototype.getRows = function() { return this.rows; }
Table.prototype.setRows = function(rows) { this.rows = rows; return this; }

Table.prototype.getDataType = function() { return "table"; }

var Button = function(dipClassify) {
  UBR.apply(this);
}

Button.prototype = Object.create(UBR.prototype);

Button.prototype = function() { return "button"; }

var Image = function(dipClassify, srcName) {
  UBR.apply(this);

  this.tagName = "Image";
  this.src = srcName;
  this.setDipClassify(dipClassify);
}

Image.prototype = Object.create(UBR.prototype);

Image.prototype.getDataType = function() { return "image"; }

Image.prototype.getSrc = function() { return this.src; }
Image.prototype.setSrc = function(src) { this.src = src; }
