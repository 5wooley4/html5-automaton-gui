/******** Project - Final *********************************
Authors: Eric Wooley, Tandra Felly, Lauryn Loudermilk
Description: Javascript automata engine.
**********************************************************/

function changeCursor(id){
	var elem = document.getElementById("main");
	switch(id)
	{
		case "draw":
			elem.style.cursor = "move";
			touch_layer.show();
			dfa_layer.setDraggable(false);
			draw();
			break;
		case "move":
			elem.style.cursor = "move";
			touch_layer.hide();
			dfa_layer.setDraggable(true);
			move();
			break;
		case "remove":
			touch_layer.hide();
			elem.style.cursor = "not-allowed";
			remove();
			break;
		case "rename":
			touch_layer.hide();
			elem.style.cursor = "text";
			rename();
			break;
		case "clear":
			clearscreen();
			getElementById("draw").
			break;
		default:
			alert("this button has no purpose");
	}
}

function move(){
	//ondragstart or ondrag
	alert("i made it")
	whiteboard.on('dblclick', function (e) {
		alert("here")
        var mousePos = stage.getMousePosition();
        var x = mousePos.x;
        var y = mousePos.y;
    });
}

function delete(){

	
}

function rename(){


}

function clearscreen(){

	var answer = confirm("Are you sure you want to clear the screen?")
	if (answer){
      
       // This will remove the states and transition lines on the dfa layer
       dfa_layer.destroyChildren() 

       // This will remove the labels on the transitions that are put on the tooltip layer
       tooltip_layer.destroyChildren() 
	}
	else{
        return 
	}

}