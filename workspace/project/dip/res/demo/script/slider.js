
function setWidthSlider(id) {
 $( "#slider_width" ).slider({
    range: "min",
    value: dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().getWidth(),
    min: 1,
    max: dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().getWidthMax(),
  slide: function( event, ui ) {
     $("#amount_width").val(parsePercentFromPixel(ui.value, dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().getWidthMax()) + "%");
      $("#inputwidth").val(dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().getWidth());
      dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().setWidth(ui.value).applyComponentAttrs();
    }
  });
  var pixel = $( "#slider_width" ).slider( "value" );
  $( "#amount_width" ).val(parsePercentFromPixel(pixel, dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().getWidthMax()) + "%");
}

function setHeightSlider(id) {
  $( "#slider_height" ).slider({
    range: "min",
    value: dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().getHeight(),
    min: 1,
    max: dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().getHeightMax(),
    slide: function( event, ui ) {
      $("#amount_height").val(parsePercentFromPixel(ui.value, dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().getHeightMax()) + "%");
      $("#inputheight").val(dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().getHeight());
      dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().setHeight(ui.value).applyComponentAttrs();
    }
  });

  var pixel = $( "#slider_height" ).slider( "value" );
  $( "#amount_height" ).val(parsePercentFromPixel(pixel, dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().getHeightMax())+ "%");
}



function parsePercentFromPixel(pixel, max) {
  return ((pixel / max) * 100).toFixed(0);
}

function parsePixelFromPercent(percent, max) {
  return max * (percent / 100);
}

function updateMax(id) {
  $('#slider_width').slider("option", "max", dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().getWidthMax());
  $('#slider_height').slider("option", "max", dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().getHeightMax());
}
