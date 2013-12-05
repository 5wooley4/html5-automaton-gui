/******** Project - Final *********************************
Authors: Eric Wooley, Tandra Felly, Lauryn Loudermilk
Description: Javascript automata engine.
**********************************************************/

function changeCursor(id){
	var elem = document.getElementById("main");
	switch(id)
	{
		case "draw":
			elem.style.cursor = "default";
			touch_layer.show();
			break;
		case "move":
			elem.style.cursor = "move";
			touch_layer.hide();
			break;
		case "remove":
			touch_layer.hide();
			elem.style.cursor = "not-allowed";
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
	console.log("in the move function");
}

function remove(){
	var answer = confirm("Would you like to delete this object?")
    if (answer){
    	node.remove();
    	dfa_layer.draw();
    }
    else{
    	return;
    }
}

function rename(){


}

function clearscreen(){

	var answer = confirm("Are you sure you want to clear the screen?")
	if (answer){
       // This will remove the states and transition lines on the dfa layer
       dfa_layer.destroyChildren();
       // This will remove the labels on the transitions that are put on the tooltip layer
       tooltip_layer.destroyChildren();
<<<<<<< HEAD
       dfa_layer.draw();
       tooltip_layer.draw();
=======
       dfa_layer.draw()
       tooltip_layer.draw()
>>>>>>> 88b6388f7f0170aca15f4726894dbfebc09878fb
	}
	else{
        return;
	}
<<<<<<< HEAD
=======

>>>>>>> 88b6388f7f0170aca15f4726894dbfebc09878fb
}