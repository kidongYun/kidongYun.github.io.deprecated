function showDirectory() {
  directoryInnerHTML();
}

function directoryInnerHTML() {
  var hierarchy = dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHierarchy();
  var directory = document.getElementById("directory");
  var html = "";

  //Dip 이름
  html += "<div class='projectName'>"
  html +=     dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getName();
  html += "</div>"

  //Hierarchy
  html += "<div class='hierarchy'>"
  html +=     hierarchy.getDirectory();
  html += "</div>"

  directory.innerHTML = html;
}
