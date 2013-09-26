/******** Project - Fianl *********************************
	Authors: Eric Wooley, Tandra Felly, Lauryn Laudermilk
	Description: Javascript automita engine.
**********************************************************/
// function contains because I don't like indexOf
String.prototype.contains = function(it) { return this.indexOf(it) != -1; };
function aut(){
	var aut = {};
	var nodes = [];
	var starting_node;
	// Add node returns a node and adds it to the automita network of nodes.
	aut.add_node = function(obj){
		obj = obj || {};
		var node = obj;
		node.accepting = null;
		var accepting = obj.accepting || false;
		var starting = obj.starting || false;
		if(nodes.length < 1) starting = true;
		if (starting) starting_node = node;

		// L is the language, destination_node is the node(s) that L sends it too.
		node.add_transition = function(l, destination_node){
			this[l] = destination_node;
		};

		node.add_event = function(event_name, func){
			node[event_name] = func;
		};

		node.make_accepting = function(){
			accepting = true;
		};
		node.is_accepting = function(){
			return accepting;
		};
		// 
		node.find_destination = function(c){
			// returns an array of all nodes this node transitions to on input c.
			var ret = [];
			for(var key in nodes){
				if(key.contains(c)){
					ret.push(nodes[key]);
				}
			}
			// If ret is greater then 0, return ret, if not return false.
			if(ret.length > 0) return ret 
			else return false;
		};
		// save this node.
		nodes.push(node);
		return node;
	};
	// Run through the automiton
	aut.run = function(input){
		// check if there are any nodes.
		if(nodes.length < 1) return false;
		// the node we start at.
		var node = starting_node;
		// loop throught the language.
		for(var i = 0; i < input.length; i++){
			var next = node.find_destination(input[i]);
			if(next){
				if(node.on_exit) node.on_exit();
				node = next;
				if(node.on_enter) node.on_enter();
			}
		}
		return node.is_accepting();
	};
	return aut;
}