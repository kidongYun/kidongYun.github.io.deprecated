$(document).ready(function() {
  setHoverListenerOnEditorial();
});

function setHoverListenerOnEditorial() {
  $("#andotadao").mouseenter(function() {
    $("#andotadao .hover_effect").attr('style', 'visibility:visible');
    $("#andotadao .hover_effect img").animate({ opacity: 1 }, 250);
  });
  $("#andotadao").mouseleave(function() {
    $("#andotadao .hover_effect").attr('style', 'visibility:hidden');
    $("#andotadao .hover_effect img").animate({ opacity: 0 }, 250);
  });

  $("#jeju").mouseenter(function() {
    $("#jeju .hover_effect").attr('style', 'visibility:visible');
    $("#jeju .hover_effect img").animate({ opacity: 1 }, 250);
  });
  $("#jeju").mouseleave(function() {
    $("#jeju .hover_effect").attr('style', 'visibility:hidden');
    $("#jeju .hover_effect img").animate({ opacity: 0 }, 250);
  });

  $("#moon").mouseenter(function() {
    $("#moon .hover_effect").attr('style', 'visibility:visible');
    $("#moon .hover_effect img").animate({ opacity: 1 }, 250);
  });
  $("#moon").mouseleave(function() {
    $("#moon .hover_effect").attr('style', 'visibility:hidden');
    $("#moon .hover_effect img").animate({ opacity: 0 }, 250);
  });

  $("#mzone").mouseenter(function() {
    $("#mzone .hover_effect").attr('style', 'visibility:visible');
    $("#mzone .hover_effect img").animate({ opacity: 1 }, 250);
  });
  $("#mzone").mouseleave(function() {
    $("#mzone .hover_effect").attr('style', 'visibility:hidden');
    $("#mzone .hover_effect img").animate({ opacity: 0 }, 250);
  });

  $("#drunk").mouseenter(function() {
    $("#drunk .hover_effect").attr('style', 'visibility:visible');
    $("#drunk .hover_effect img").animate({ opacity: 1 }, 250);
  });
  $("#drunk").mouseleave(function() {
    $("#drunk .hover_effect").attr('style', 'visibility:hidden');
    $("#drunk .hover_effect img").animate({ opacity: 0 }, 250);
  });
}
