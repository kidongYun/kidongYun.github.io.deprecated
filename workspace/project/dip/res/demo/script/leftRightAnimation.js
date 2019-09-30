// Author : 윤기동
/*
$(document).ready(function() {
  initLeftRight();

  $("#left").mousemove(function(event) {
    var x = event.pageX;
    if(x == 0 && !dip.getLeftStateFlag() && !dip.getLeftFixFlag()) {
      openLeft();
    }
  });

  $("#left").mouseleave(function(event) {
    var x = event.pageX;
    if(x >= 10 && !dip.getLeftFixFlag()) {
      closeLeft();
    }
  });

  $("#right").mousemove(function(event) {
    var x = event.pageX;
    var maxX = $(window).width();
    if(x >= (maxX-5) && !dip.getRightStateFlag() && !dip.getRightFixFlag()) {
      openRight();
    }
  });

  $("#right").mouseleave(function(event) {
    var x = event.pageX;
    var maxX = $(window).width();
    if(x <= (maxX - 10) && !dip.getRightFixFlag()) {
      closeRight();
    }
  });
});

function initLeftRight() {
  controlLeftRight();
}

function controlLeftRight() {

  if(dip.getLeftFixFlag() && dip.getRightFixFlag()) {
    // 왼쪽 오른쪽 모두 고정
    both();
  } else if(dip.getLeftFixFlag() && !dip.getRightFixFlag()){
    // 왼쪽만 고정
    if(dip.getRightStateFlag()) {
      both();
    } else {
      left();
    }
  } else if(!dip.getLeftFixFlag() && dip.getRightFixFlag()) {
    // 오른쪽만 고정
    if(dip.getLeftStateFlag()) {
      both();
    } else {
      right();
    }
  } else {
    // 고정이 없음
    if(dip.getLeftStateFlag() && dip.getRightStateFlag()) {
      // impossible state
    } else if(dip.getLeftStateFlag() && !dip.getRightStateFlag()){
      // 왼쪽이 열렸을 때
      left();
    } else if(!dip.getLeftStateFlag() && dip.getRightStateFlag()) {
      // 오른쪽이 열렸을 때
      right();
    } else {
      // 아무것도 없음
      none();
    }
  }
}

function openLeft() {
  dip.setLeftStateFlag(true);
  controlLeftRight();
}

function openRight() {
  dip.setRightStateFlag(true);
  controlLeftRight();
}

function closeLeft() {
  dip.setLeftStateFlag(false);
  controlLeftRight();
}

function closeRight() {
  dip.setRightStateFlag(false);
  controlLeftRight();
}

function none() {
  $("#left").animate({ width: "1%" });
  $("#right").animate({ width: "1%" });
  $(".center").animate({ width: "98%" });
}

function left() {
  $("#left").animate({ width: "20%" });
  $("#right").animate({ width: "1%"});
  $(".center").animate({ width: "79%" });
}

function right() {
  $("#left").animate({ width: "1%" });
  $("#right").animate({ width: "20%" });
  $(".center").animate({ width: "79%" });
}

function both() {
  $("#left").animate({ width: "20%" });
  $("#right").animate({ width: "20%" });
  $(".center").animate({ width: "60%" });


}

function leftFixFlag() {
  if (dip.getLeftFixFlag()) {
    dip.setLeftFixFlag(false);
  }
  else {
    dip.setLeftFixFlag(true);
  }
}

function rightFixFlag() {
  if (dip.getRightFixFlag()) {
    dip.setRightFixFlag(false);
  }
  else {
    dip.setRightFixFlag(true);
  }
}
*/