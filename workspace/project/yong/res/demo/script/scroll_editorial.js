var ando_flag = true;
var jeju_flag = false;
var moon_flag = false;
var mzone_flag = false;
var drunk_flag = false;

const ando_threshold = 0;
const jeju_threshold = 18;
const moon_threshold = 45;
const mzone_threshold = 70;
const drunk_threshold = 90;


$(document).ready(function () {
  var mql = window.matchMedia("screen and (max-width: 768px)");
  if(mql.matches) {
    effectFunc(ando_flag, jeju_flag, moon_flag, mzone_flag, drunk_flag);
  }
});

window.addEventListener('scroll', function() {
  var mql = window.matchMedia("screen and (max-width: 768px)");
  if(mql.matches) {
    var scrollTop = $(window).scrollTop();
    var docHeight = $(document).height();
    var winHeight = $(window).height();
    var scrollPercent = Math.round(((scrollTop) / (docHeight - winHeight)) * 100);

    console.log(ando_flag + ", " + jeju_flag + ", " + moon_flag + ", " + mzone_flag + ", " + drunk_flag + ", " + scrollPercent);

    if(scrollPercent >= drunk_threshold && !drunk_flag) {
      console.log("drunk!!");
      effectFunc(false, false, false, false, true);
    } else if(scrollPercent >= mzone_threshold && scrollPercent < drunk_threshold && !mzone_flag) {
      console.log("mzone!!");
      effectFunc(false, false, false, true, false);
    } else if(scrollPercent >= moon_threshold && scrollPercent < mzone_threshold && !moon_flag) {
      console.log("moon!!");
      effectFunc(false, false, true, false, false);
    } else if(scrollPercent >= jeju_threshold && scrollPercent < moon_threshold && !jeju_flag) {
      console.log("jeju!!");
      effectFunc(false, true, false, false, false);
    } else if(scrollPercent >= ando_threshold && scrollPercent < jeju_threshold && !ando_flag) {
      console.log("ando!!");
      effectFunc(true, false, false, false, false);
    }  
  }
});

function effectFunc(ando, jeju, moon, mzone, drunk) {
  $(".hover_effect").attr('style', 'visibility:hidden');
  $(".hover_effect img").css('opacity', 0);

  if(ando) {
    $("#andotadao .hover_effect").attr('style', 'visibility:visible');
    $("#andotadao .hover_effect img").animate({ opacity: 1 }, 250);
  } else if(jeju) {
    $("#jeju .hover_effect").attr('style', 'visibility:visible');
    $("#jeju .hover_effect img").animate({ opacity: 1 }, 250);
  } else if(moon) {
    $("#moon .hover_effect").attr('style', 'visibility:visible');
    $("#moon .hover_effect img").animate({ opacity: 1 }, 250);
  } else if(mzone) {
    $("#mzone .hover_effect").attr('style', 'visibility:visible');
    $("#mzone .hover_effect img").animate({ opacity: 1 }, 250);
  } else if(drunk) {
    $("#drunk .hover_effect").attr('style', 'visibility:visible');
    $("#drunk .hover_effect img").animate({ opacity: 1 }, 250);
  }

  ando_flag = ando;
  jeju_flag = jeju;
  moon_flag = moon;
  mzone_flag = mzone;
  drunk_flag = drunk;
}
