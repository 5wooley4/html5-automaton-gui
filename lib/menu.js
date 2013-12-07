/******** Project - Final *********************************
Authors: Eric Wooley, Tandra Felly, Lauryn Loudermilk
Description: Javascript automata engine.
**********************************************************/
var tool = "drawIcon";
function changeCursor(id){
	var elem = document.getElementById("main");
	elem.className = "";
	switch(id)
	{
		case "draw":
			elem.style.cursor = "";
			elem.className = "drawIcon";
			touch_layer.show();
			break;
		case "accepting":
			elem.style.cursor = "pointer";
			touch_layer.hide();
			break;
		case "initial":
			elem.style.cursor = "e-resize";

			touch_layer.hide();
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
			break;
		default:
			alert("this button has no purpose");
	}
}
function clearscreen(){
	var answer = confirm("Are you sure you want to clear the screen?")
	if (answer){
		location.reload()
	}
	else{
        return;
	}
}

function saveimage(){
	stage.toDataURL({
		callback: function(dataUrl) {
		window.open(dataUrl);
		}
	});
}