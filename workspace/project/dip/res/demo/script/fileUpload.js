$(document).ready(function() {
  fileUrlOnChange();
});

function fileUrlOnChange() {
  $("#imgUpload").on('change', function(event) {

    var url = getSampleUrl(this.files[0].name);
    console.log(this.files[0].name);
    var name = this.files[0].name;
    var splitName = name.split(".")[0] + "_image";
    addImagesList(url, splitName);
  });
}

function addImagesList(url, name) {
  var imageList = document.getElementById('imageList');
  var innerhtml = "";

  console.log("addImageList -> url : " + url);

  innerhtml +=  "<div class='draggable_tools' id='" + name + "'>";
  innerhtml +=      "<img src='" + url + "'/>";
  innerhtml +=  "</div>";

  newComponent = document.createElement('div');
  newComponent.className = "imageWrap";
  newComponent.id = name + "Wrap";

  newComponent.innerHTML = innerhtml;

  imageList.appendChild(newComponent);

  onDragAndDropComponentInTools();
}

function getSampleUrl(name) {
  return "./img/sample/" + name;
}
