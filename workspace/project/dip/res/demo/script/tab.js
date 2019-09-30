// Author : 김성준

var TAB_COLOR_SELECTED = "#ff6600";
var TAB_COLOR_NO_SELECTED = "#fff";

var STATUS_OPEN = 10;
var STATUS_CLOSE = 11;
var STATUS_ADD = 12;

var STATUS = STATUS_OPEN;

function openTab(evt, id, status) {
  var i, tabContent, tabLink;
  tabId = "tab" + id;
  contentId = "content" + id;

  if(STATUS == STATUS_OPEN || STATUS == STATUS_ADD) {
    initTabsAfterSwitch(id);
  } else if(STATUS_CLOSE) {
    initTabsAfterClose(id);
  }


  tabContent = document.getElementsByClassName("tabContent");

  for (i=0; i<tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  tabLink = document.getElementsByClassName("tabLink");

  for (i=0; i<tabLink.length; i++) {
    tabLink[i].className = tabLink[i].className.replace(" active", "");
  }

  changeTabColor(id);

  document.getElementById(contentId).style.display = "block";
  evt.currentTarget.className += " active";

  STATUS = STATUS_OPEN;
}

function changeTabColor(id) {
  for(var i=0; i<dip.getProject().length; i++) {
    if(dip.getProject()[i].getId() != id) {
      $('#tab' + dip.getProject()[i].getId()).css('background', TAB_COLOR_NO_SELECTED);
    } else {
      $('#tab' + id).css('background', TAB_COLOR_SELECTED);
    }
  }
}

function closeTab(evt, id) {
    tabId = "tab" + id;
    contentId = "content" + id;
    var closeId = "close" + id;
    document.getElementById(tabId).remove();
    document.getElementById(contentId).remove();
    document.getElementById(closeId).remove();
    tabCount -= 1;

    index = dip.getIndexById(id);

    for(var i=0; i<dip.getProject().length; i++) {
      if(dip.getProject()[i].getId() == id) {
        dip.getProject().splice(i, 1);
      }
    }

    if(dip.getProjectId() > 1) {
      if(dip.getProject()[index-1] == undefined) {
        if(dip.getProject()[index] == undefined) {
          console.log("no project!!!");
          return;
        } else {
          dip.setCurProjectId(dip.getProject()[index].getId());
        }
      } else {
        dip.setCurProjectId(dip.getProject()[index - 1].getId());
      }

      STATUS = STATUS_CLOSE;
      var curTab = "tab" + dip.getCurProjectId();
      document.getElementById(curTab).click();
    }
}

function addTab() {
  dip.getProject().push(new Project());

  tabCount = dip.getProject().length - 1;
  var id = dip.getProject()[tabCount].getId();
  var tabName = dip.getProject()[tabCount].getName();


  var tabTemplate = "<div class='tabLink'  onclick='openTab(event, " + id + ")' id='" + "tab" + id + "' >" + tabName + " </div><div class='tabClose' onclick='closeTab(event, " + id + ")' id='" + "close" + id + "'>X</div>";
  var contentTemplate = "<div class='tabContent' id='" + "content" + id + "'></div>";


  $('.tabAdd').before(tabTemplate);

  $(".contentAdd").before(contentTemplate);

  STATUS = STATUS_ADD;
  var curTab = "tab" + (dip.getProjectId());
  document.getElementById(curTab).click();
}

function initTabsAfterSwitch(id) {

  if(dip.getProject().length > 1) {
    for(var i=1; i<=dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getLength(); i++) {
      dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(i).getData().setDipId("none_" + dip.getCurProjectId() + "_" + dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(i).getData().getDipId());
      document.getElementById(i).id = dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(i).getData().getDipId();

    }
  }

  dip.setCurProjectId(id);

  for(var i=1; i<=dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getLength(); i++) {
    dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(i).getData().setDipId(i);
    document.getElementById("none_" + dip.getCurProjectId() + "_" + i).id = dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(i).getData().getDipId();
  }
}

function initTabsAfterClose(id) {
  // dip.setCurProjectId(id);

  for(var i=1; i<=dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getLength(); i++) {
    dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(i).getData().setDipId(i);
    if(document.getElementById("none_" + dip.getCurProjectId() + "_" + i) != null) {
      document.getElementById("none_" + dip.getCurProjectId() + "_" + i).id = dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(i).getData().getDipId();
    } else {
      document.getElementById(i).id = dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy().getNode(i).getData().getDipId();
    }
  }
}
