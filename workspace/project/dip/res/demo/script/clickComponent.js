function setClickListener(nodeId) {
  $("#" + nodeId).click(function(event) {
    event.stopPropagation();
    // console.log("click id : " + nodeId);
    var eventId = $(this).attr('id');

    showAttrs(nodeId);
    dip.getProject()[dip.getIndexById(dip.getCurProjectId())].setSelectedComponent(nodeId *= 1);
  });

  return nodeId;
}
