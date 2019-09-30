function cursorMove() {
  var len = document.member.tel_2.value.length;
  if(len == 4) {
    document.member.tel_3.focus();
  }
}
function checkId() {
  document.getElementById("id_2").value = 0;
  var id = document.getElementById("id_1").value;
  if(id == "") {
    alert("빈칸에 입력해주세요.");
    exit;
  }
  var pattern = /([^a-zA-Z0-9-_])/;
  if(pattern.test(id)) {
    alert("아이디는 영문, 숫자만 사용할 수 있습니다.");
    return false;
  }
  ifrm.location.href = "./check_id.php?id=" + id;
}
$(document).ready(function() {
  $("#man").focus(function() {
    $("#man_checked").css("border", "1px solid #ff6600");
    $("#man_lb").css("color", "#4c4c4c");
    $("#man_lb").css("font-weight", "bold");
    $("#woman_lb").css("font-weight", "normal");
    $("#woman_lb").css("color", "#8e8e8e");
    $("#woman_checked").css("border", "0px solid #000");
  });
  $("#woman").focus(function() {
    $("#woman_checked").css("border", "1px solid #ff6600");
    $("#woman_lb").css("color", "#4c4c4c");
    $("#woman_lb").css("font-weight", "bold");
    $("#man_lb").css("font-weight", "normal");
    $("#man_lb").css("color", "#8e8e8e");
    $("#man_checked").css("border", "0px solid #000");
  });

  $('#email_select').change(function() {
    $("#email_select option:selected").each(function() {
    if($(this).val()== '1') {
    $("#email_text").val('');
    $("#email_text").attr("disabled", false);
  }
  else {
    $("#email_text").val($(this).text());
    $("#email_text").attr("disabled", true);
  }
  });
});
});
