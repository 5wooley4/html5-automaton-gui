/******** Project - Fianl *********************************
	Authors: Eric Wooley, Tandra Felly, Lauryn Laudermilk
	Description: Javascript automita engine.
**********************************************************/

function aut(){
	var aut = {};
	var nodes = [];
	aut.add_node = function(extras){
		var node = {extra: extras};
		node.add_transition = function(l, destination_node){
			this[l] = destination_node;
		};
		// save this node.
		nodes.push(node);
		return node;
	};

	return aut;
}