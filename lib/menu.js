function changeCursor(id){
	var elem = document.getElementById("main");
	switch(id)
	{
		case "move":
			elem.style.cursor = "move";
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
		default:
			alert("nothing was pressed");
	}
}