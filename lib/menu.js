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
		case "newState":
			elem.style.cursor = "crosshair";
			addState();
			break;
		case "delete":
			elem.style.cursor = "not-allowed";
			break;
		case "rename":
			elem.style.cursor = "text";
			break;
		case "transition":
			elem.style.cursor = "e-resize";
			break;
		case "clear":
			clearscreen();
		default:
			alert("this button has no purpose");
	}
}

function moveState(){
	//ondragstart or ondrag

}

function addState(){
	var elem = document.getElementById("main");

	elem.addEventListener('click', makeCircle, false);

	function makeCircle() {
	  var circle = new Kinetic.Circle({
          x: e.center.x,
          y: e.center.y,
          radius: e.radius,
          fill: 'red',
          stroke: 'black',
          strokeWidth: 4
        });
	  // This adds a node to circle for the engine to work with.
        var state = {geo: circle, node: aut.add_node()};
        dfa_layer.add(circle);
        dfa_layer.draw(); //called to draw the layer after changes
        states.push(state);
	}
}

function addTransition(){


}

function removeObject(){

	
}

function rename(){


}

function clearscreen(){

	var answer = confirm("Are you sure you want to clear the screen?")
	if (answer){
       // eventually this will clear the screen 
	}
	else{
        // eventually this will exit 
	}

}