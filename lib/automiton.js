/******** Project - Fianl *********************************
	Authors: Eric Wooley, Tandra Felly, Lauryn Laudermilk
	Description: Javascript automita engine.
**********************************************************/

function aut(){
	var aut = {};
	var nodes = [];
	aut.add_node = function(extras){
		var node = {extra: extras};

		// L is the language, destination_node is the node(s) that L sends it too.
		node.add_transition = function(l, destination_node){
			this[l] = destination_node;
		};
		node.find_destination = function(){
				
		};
		// save this node.
		nodes.push(node);
		return node;
	};

	return aut;
}