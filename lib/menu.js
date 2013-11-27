function changeCursor(id){
	var elem = document.getElementById("main");
	switch(id)
	{
		case "move":
			elem.style.cursor = "move";
			addState();
			break;
		case "newState":
			elem.style.cursor = "crosshair";
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