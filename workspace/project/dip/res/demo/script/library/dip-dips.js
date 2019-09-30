var Dips = function() {
  this.dips = new Array();
  this.dipId = 0;
}

Dips.prototype = {
  getDip : function() { return this.dips; },
  addDip : function(dip) { this.dips.push(dip); return this; }, // dips 배열에 project 객체 추가
  getDipId : function() { return this.dipId; },
  setDipId : function(dipId) { this.dipId = dipId; return this; },
  getProject : function(projectId) {  // projectId 값이 dips 배열 i번째 project 객체의 id값과 같으면 dips배열 반환
    for (var i=0; i<this.dips.length; i++) {
      if(projectId == this.dips[i].getProjectIndex()) {
        return this.dips[i];
      }
    }
  }

}
