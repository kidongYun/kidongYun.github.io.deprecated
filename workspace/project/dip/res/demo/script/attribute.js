
function showAttrs(componentId) {
  attributeInnerHTML(componentId);
  if(Dip.RIGHT_STATE_FLAG == false) {
    openRight();
  }
  return componentId;
}

function attributeInnerHTML(componentId) {
  var componentAttrs = dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(componentId).getData().getAttrs();
  var attribute = document.getElementById("attribute");
  var innerhtml = "";

  for(var [key, value] of componentAttrs) {
    innerhtml += "<div class=\"attribute_div\">";
    innerhtml +=    "<span class=\"attribute_name\">" + key + "</span>";

    if(key == ("width")){
      innerhtml +=    "<div class=\"attribute_blank\"></div>"
      innerhtml +=    "<div id=\"slider_width\"></div>";
      innerhtml +=    "<input type=\"text\" id=\"amount_width\" marginLeft=\"20px\" readonly style=\"border:0; color:#f6931f; font-weight:bold;\" >";
      innerhtml +=    "<input class=\"input_area\" id=\"input" + key + "\" type=\"text\" value=\"" + value + "\">";
      innerhtml +=    "<input class=\"input_btn\" type=\"button\" value=\"설정\" onclick=\"clickFunc(" + componentId + ", '" + key + "', input" + key + ".value);\">";
    }
    else if(key ==("height")){
      innerhtml +=    "<div class=\"attribute_blank\"></div>"
      innerhtml +=    "<div id=\"slider_height\"></div>";
      innerhtml +=    "<input type=\"text\" id=\"amount_height\" marginLeft=\"20px\" readonly style=\"border:0; color:#f6931f; font-weight:bold;\" >";
      innerhtml +=    "<input class=\"input_area\" id=\"input" + key + "\" type=\"text\" value=\"" + value + "\">";
      innerhtml +=    "<input class=\"input_btn\" type=\"button\" value=\"설정\" onclick=\"clickFunc(" + componentId + ", '" + key + "', input" + key + ".value);\">";
    }
    else if(key ==("textSize")){
      innerhtml +=    "<div class=\"attribute_blank\"></div>"
      innerhtml +=    "<div id=\"slider_textSize\"></div>";
      innerhtml +=    "<input type=\"text\" id=\"amount_textSize\" marginLeft=\"20px\" readonly style=\"border:0; color:#f6931f; font-weight:bold;\" >";
      innerhtml +=    "<input class=\"input_area\" id=\"input" + key + "\" type=\"text\" value=\"" + value + "\">";
      innerhtml +=    "<input class=\"input_btn\" type=\"button\" value=\"설정\" onclick=\"clickFunc(" + componentId + ", '" + key + "', input" + key + ".value);\">";

    }
    else if(key ==("backgroundColor")){
      innerhtml +=    "<input class=\"jscolor\" id=\"input" + key + "\" value=\"ffffff\">";
      innerhtml +=    "<input class=\"input_btn\" type=\"button\" value=\"설정\" onclick=\"clickFunc(" + componentId + ", '" + key + "', input" + key + ".value);\">";
    }
    else if(key ==("textColor")){
      innerhtml +=    "<input class=\"jscolor\" value=\"ffffff\">";
      innerhtml +=    "<input class=\"input_btn\" type=\"button\" value=\"설정\" onclick=\"clickFunc(" + componentId + ", '" + key + "', input" + key + ".value);\">";
    }

    else{
    innerhtml +=    "<input class=\"input_area\" id=\"input" + key + "\" type=\"text\" value=\"" + value + "\">";
    innerhtml +=    "<input class=\"input_btn\" type=\"button\" value=\"설정\" onclick=\"clickFunc(" + componentId + ", '" + key + "', input" + key + ".value);\">";
  }

  innerhtml += "</div>";
}

  attribute.innerHTML = innerhtml;

  setWidthSlider(componentId);
  setHeightSlider(componentId);
  //setTextSizeSlider(componentId);


  jscolor.installByClassName('jscolor',componentId);


}

function clickFunc(id, key, value) {
  console.log(key + ", " + value);

  switch (key) {
    case "classify":
      dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().setClassify(value);
      break;
    case "width":
      dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().setWidth(value);
      dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().setXYByPosition();
      $('#slider_width').slider('value', value);
      $('#amount_width').val(parsePercentFromPixel(value, dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().getWidthMax()) + "%");
      break;
    case "height":
      dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().setHeight(value);
      dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().setXYByPosition();
      $('#slider_height').slider('value', value);
      $('#amount_height').val(parsePercentFromPixel(value, dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().getHeightMax()) + "%");
      break;
    case "backgroundColor":
      dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().setBackgroundColor("#" + value);
      break;
    case "float":
      dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().setFloat(value);
      break;
    case "margin":
      dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().setMargin(value);
      break;
    case "padding":
      dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().setPadding(value);
      break;
    case "border":
      dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().setBorder(value);
      break;
    case "borderRadius":
      dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().setBorderRadius(value);
      break;
    case "borderTopLeftRadius":
      dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().setBorderTopLeftRadius(value);
      break;
    case "borderTopRightRadius":
      dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().setBorderTopRightRadius(value);
      break;
    case "borderBottomLeftRadius":
      dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().setBorderBottomLeftRadius(value);
      break;
    case "borderBottomRightRadius":
      dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().setBorderBottomRightRadius(value);
      break;
    case "text":
      dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().setText(value);
      break;
    case "textStyle":
      dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().setTextStyle(value);
      break;
    case "textSize":
      dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().setTextSize(value);
      $('#slider_textSize').slider('value', value);
      $('#amount_textSize').val(parsePercentFromPixel(value, dip.getTextSize()) + "%");
      break;
    case "textColor":
      dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().setTextColor(value);
      break;
    case "zIndex":
      dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().setZIndex(value);
      break;
  }
  dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().applyComponentAttrs();
}
