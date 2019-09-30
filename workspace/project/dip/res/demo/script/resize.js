function onResize() {
  $('.resizable').resizable();
}

function onResizable() {
  $('.resizable').resizable({
    stop : setResizableValue
  });
}

function setResizableValue(event, ui) {
  var width = ui.size.width;
  var height = ui.size.height;

  var eventId = $(this).attr('id');

  dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(eventId).getData().setWidth(width);
  dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(eventId).getData().setHeight(height);

  dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().setXYByPositionAllComponent();
}
