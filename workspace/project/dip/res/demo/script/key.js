var KEY_CTRL = 17;
var KEY_DELETE = 46;
var KEY_ESC = 27;

$(document).ready(function() {
  setKeyListener();
});

function setKeyListener() {
  $(document).keydown(function(event) {
    if(event.keyCode == KEY_DELETE) {
      deleteKey();
    }

    if(event.keyCode == KEY_ESC) {
      noSelectComponent();
    }
  });
}

function deleteKey() {
  dip.removeComponent(dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getSelectedComponent());
}

function noSelectComponent() {
  console.log("no select!!");
}
