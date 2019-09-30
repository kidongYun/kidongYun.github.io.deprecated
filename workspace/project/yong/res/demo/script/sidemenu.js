var SIDEMENU_TIMER = 400;
const WIDTH_ANIM_TIMER = 350;
const HOVER_ANIM_TOMER = 250;
var TOGGLE_SWITCH = false;

var HOME_HOVER_FLAG = false;
var WEB_HOVER_FLAG = false;
var MOBILE_HOVER_FLAG = false;
var EDITORIAL_HOVER_FLAG = false;
var BRANDING_HOVER_FLAG = false;

$(document).ready(function() {
  setBreadMenuClickListener();
  setHoverListenerOnNav();
});

function setBreadMenuClickListener() {
  $("#breadBtn").click(function() {
    if(TOGGLE_SWITCH) {
      TOGGLE_SWITCH = false;
      $(".nav_wrap").stop();
      $("#sideMenu").css('width', '0%');
      $("nav").css('visibility', 'hidden');

      $(".nav_wrap").css('width', '50%');
    } else {
      TOGGLE_SWITCH = true;

      var mql = window.matchMedia("screen and (max-width: 768px)");
      if(mql.matches)
        $("#sideMenu").css('width', '75%');
      else
        $("#sideMenu").css('width', '23%');
      $("nav").css('visibility', 'visible');
      runAnimOnNav();
    }
  });

  $("section").click(function() {
    if(TOGGLE_SWITCH) {
      TOGGLE_SWITCH = false;
      $(".nav_wrap").stop();
      $("#sideMenu").css('width', '0%');
      $("nav").css('visibility', 'hidden');

      $(".nav_wrap").css('width', '50%');
    }
  });
}

function setHoverListenerOnNav() {
  $(".home").mouseenter(function() { $(".home font").stop().animate({ color: "#fff", }, HOVER_ANIM_TOMER); });
  $(".home").mouseleave(function() { $(".home font").stop().animate({ color: "#bbb", }, HOVER_ANIM_TOMER); });

  $(".web").mouseenter(function() { $(".web font").stop().animate({ color: "#fff", }, HOVER_ANIM_TOMER); });
  $(".web").mouseleave(function() { $(".web font").stop().animate({ color: "#bbb", }, HOVER_ANIM_TOMER); });

  $(".mobile").mouseenter(function() { $(".mobile font").stop().animate({ color: "#fff", }, HOVER_ANIM_TOMER); });
  $(".mobile").mouseleave(function() { $(".mobile font").stop().animate({ color: "#bbb", }, HOVER_ANIM_TOMER); });

  $(".editorial").mouseenter(function() { $(".editorial font").stop().animate({ color: "#fff", }, HOVER_ANIM_TOMER); });
  $(".editorial").mouseleave(function() { $(".editorial font").stop().animate({ color: "#bbb", }, HOVER_ANIM_TOMER); });

  $(".branding").mouseenter(function() { $(".branding font").stop().animate({ color: "#fff", }, HOVER_ANIM_TOMER); });
  $(".branding").mouseleave(function() { $(".branding font").stop().animate({ color: "#bbb", }, HOVER_ANIM_TOMER); });
}

function runAnimOnNav() {
  $("#home").animate({
    width: '100%'
  }, WIDTH_ANIM_TIMER, function() {
    $("#web").animate({
      width: '100%'
    }, WIDTH_ANIM_TIMER, function() {
      $("#mobile").animate({
        width: '100%'
      }, WIDTH_ANIM_TIMER, function() {
        $("#editorial").animate({
          width: '100%'
        }, WIDTH_ANIM_TIMER, function() {
          $("#branding").animate({
            width: '100%'
          }, WIDTH_ANIM_TIMER, function() {
            if(!TOGGLE_SWITCH) {
              $(".nav_wrap").css('width', '50%');
            }
          });
        });
      });
    });
  });
}
