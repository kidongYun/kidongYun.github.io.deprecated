// Author 윤기동

function saveHtmlFile() {
  dip.getProject()[dip.getIndexById(dip.getCurProjectId())].saveHtml();
  console.log(dip.getProject()[dip.getIndexById(dip.getCurProjectId())].getHtml());
}
