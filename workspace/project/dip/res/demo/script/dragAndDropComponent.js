// Author : 윤기동

const ROOT_NODE = 1;

$(document).ready(function () {
  onDragAndDropComponentInTools();
});

// componentBox -> workspace
function onDragAndDropComponentInTools() {
  $(".draggable_tools").draggable({
    // 드래그 시작할 때
    start: function(event, ui) {
      if(dip.getProject().length) {
        $(this).removeClass("draggable_tools").addClass("dragging_tools");

      } else {
        alert("please create a new project");
      }
    },

    // 드래그가 끝났을 때
    stop: function(event, ui) {
      if(dip.getProject().length) {
        var eventId = $(this).attr('id');
        var idIndex = 1;

        // var eventId = $(this).attr('id');
        var newDraggable = document.createElement('div');
        newDraggable.className = "draggable_tools";
        newDraggable.id = eventId;
        newDraggable.innerHTML = dip.setComponentInnerHTMLForTools(eventId);
        document.getElementById(eventId + "Wrap").appendChild(newDraggable);

        onDragAndDropComponentInTools();

        document.getElementById(eventId).outerHTML = "";
        var id = setClickListener(showAttrs(dip.createNewComponent(eventId)));
        dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().setXYByPosition();
        showDirectory();
        onResizable();

        onDragAndDropComponentInWorkspace();
      }
    }
  });
}

function onDragAndDropComponentInWorkspace() {
  $(".draggable_workspace").draggable({
    start: function(event, ui) {
    },

    stop: function(event, ui) {
      var eventId = $(this).attr('id');
      if(dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(eventId).getData().getMainDipClassify() == 'text') {
        var textValue = $('#' + eventId + " textarea").val();
        dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(eventId).getData().setText(textValue);
      }
      initComponentEvent(eventId);
    }
  });
}

function initComponentEvent(id) {
  var mainCenterX = dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().getX();
  var mainCenterY = dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().getY();
  var mainWidth = dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().getWidth();
  var mainHeight = dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(id).getData().getHeight();

  var mainLeft = mainCenterX - (mainWidth / 2);
  var mainRight = mainCenterX + (mainWidth / 2);
  var mainTop = mainCenterY - (mainHeight / 2);
  var mainBottom = mainCenterY + (mainHeight / 2);

  dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().setXYByPositionAllComponent();
  setClickListener(showAttrs(dip.getProject()[dip.getIndexById(dip.getCurProjectId())].applyLayout(id, mainLeft, mainRight, mainTop, mainBottom)));
  showDirectory();
  onResizable();

  dip.getProject()[dip.getIndexById(dip.getCurProjectId())].setSelectedComponent(id);

  onDragAndDropComponentInWorkspace();
}
