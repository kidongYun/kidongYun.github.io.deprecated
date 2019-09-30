$(document).ready(function () {
  var mql = window.matchMedia("screen and (max-width: 768px)");
  if(mql.matches) {
    $(".hover_effect").attr('style', 'visibility:visible');
    $(".hover_effect img").animate({ opacity: 1 }, 250);
  }
});
