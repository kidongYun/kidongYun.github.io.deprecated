$(document).ready(function() {
  setHoverListenerOnBranding();
});

function setHoverListenerOnBranding() {
  $(".content_wrap").mouseenter(function() {
    $(".hover_effect").attr('style', 'visibility:visible');
    $(".hover_effect img").animate({ opacity: 1 }, 250);
  });

  $(".content_wrap").mouseleave(function() {
    $(".hover_effect").attr('style', 'visibility:hidden');
    $(".hover_effect img").animate({ opacity: 0 }, 250);
  });
}
