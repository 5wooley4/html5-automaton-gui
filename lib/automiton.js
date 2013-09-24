/******** Project - Fianl *********************************
	Authors: Eric Wooley, Tandra Felly, Lauryn Laudermilk
	Description: Javascript automita engine.
**********************************************************/
console.log("File Loaded");

function aut(){
	var aut = {};
	aut.test = function(){
		console.log("Test function");
		return this;
	}

	return aut;
}