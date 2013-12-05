/******** Project - Final *********************************
Authors: Eric Wooley, Tandra Felly, Lauryn Loudermilk
Description: Javascript automata engine.
**********************************************************/

function changeCursor(id){
	var elem = document.getElementById("main");
	switch(id)
	{
		case "move":
			elem.style.cursor = "move";
			break;
		case "delete":
			elem.style.cursor = "not-allowed";
			break;
		case "rename":
			elem.style.cursor = "text";
			break;
		case "clear":
			clearscreen();
			break;
		default:
			alert("this button has no purpose");
	}
}

function moveState(){
	//ondragstart or ondrag
	alert("i made it")
	whiteboard.on('dblclick', function (e) {
		alert("here")
        var mousePos = stage.getMousePosition();
        var x = mousePos.x;
        var y = mousePos.y;
    });
}

function removeObject(){

	
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