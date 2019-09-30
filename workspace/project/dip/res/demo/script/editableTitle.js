// Author : 이성연


var editor = createEditor(save);

function save(obj){
    // alert(setName.firstChild);
}



function createEditor(callback){
    var editor = new Editor();
    editor.callback = callback;

    try{
        document.addEventListener('dblclick',clickEventHandler,false);

    }catch(e){
        document.attachEvent('onclick',clickEventHandler);

    }
    return editor;
}


function clickEventHandler(e){
    var evt = e || window.event;
    var target;

    if(evt.target){
        target = evt.target;
    }else{
        target = evt.srcElement;
    }

    if(target.className.search('tabLink') > -1){
        editor.editing(target);
    }
}

function Editor(){
    this.autosave = false;
    this.source = null;
    this.callback = null;
    this.container = null;
    this.isChanged = false;
    this.frm = document.createElement('INPUT');
    this.frm.className = 'editor';
    this.frm.model = this;

    this.frm.onchange = function () {
      this.model.isChanged = true;

    }


    this.frm.onkeydown = function(e){
        var evt = e || window.event;

        if(evt.keyCode == 13){
            try{
                evt.preventDefault();
            }catch(ex){
                evt.returnValue = false;
            }

            this.model.complete();
        }
    }

    this.frm.onblur = function(e){
        if(this.model.autosave == true){
            this.model.complete();
        }else{
            this.model.cancel();
        }
    }
}

Editor.prototype.editing = function(obj){
    try{
        this.container = obj;

        if(obj.hasChildNodes() == false){
            obj.appendChild(document.createTextNode(''));
        }

        this.source = obj.firstChild;
        this.frm.value = this.source.nodeValue;

        if(this.container.style.textAlign != undefined && this.container.style.textAlign != ''){
            this.frm.style.textAlign = this.container.style.textAlign;
        }else if(this.container.align != undefined && this.container.align != ''){
            this.frm.style.textAlign = this.container.align;
        }else{
            this.frm.style.textAlign = 'left';
        }

        this.container.replaceChild(this.frm,this.source);
        this.frm.focus();
        this.frm.value += '';
    }catch(e){
        alert(e.description);
    }
}

Editor.prototype.cancel = function(){
    this.finish();
}

Editor.prototype.complete = function(){
    if(this.value != this.frm.value){
        this.save();
    }

    this.hide();

    if(this.callback instanceof Function && this.isChanged == true){
        this.callback(this);
    }else{
        //alert('callback is not a Function');
    }
}

Editor.prototype.finish = function(){
    this.container.replaceChild(this.source,this.frm);
}

Editor.prototype.hide = function(){
	this.isShow = false;
	try{
    	this.container.replaceChild(this.source,this.frm);
	}catch(e){
	}
}

Editor.prototype.save = function(){
  this.value = this.frm.value;
  this.source = document.createTextNode(this.value);
  this.isChanged = true;

  dip.getProject()[dip.getIndexById(dip.getCurProjectId())].setName(this.value);
}
