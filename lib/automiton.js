/******** Project - Fianl *********************************
	Authors: Eric Wooley, Tandra Felly, Lauryn Laudermilk
	Description: Javascript automita engine.
**********************************************************/
// function contains because I don't like indexOf
String.prototype.contains = function(it) { return this.indexOf(it) != -1; };
function aut(options){
	var options = options || {};
	var debug = options.debug || false;
	var aut = {};
	var nodes = [];
	var starting_node;
	// Add node returns a node and adds it to the automita network of nodes.
	aut.add_node = function(obj){
		// Makes sure obj is not null.
		obj = obj || {};
		// Node is now the obj, so that anything passed in is now part of the object.
		var node = obj;
		var accepting = obj.accepting || false;
		var starting = obj.starting || false;
		var id = nodes.length;
		if(nodes.length < 1) starting = true;
		if (starting) starting_node = node;
		node.transitions = {}
		if(debug) console.log("creating node: " + node.lbl + " accepting: "+ accepting);

		// L is the language, destination_node is the node(s) that L sends it too.
		node.add_transition = function(l, destination_node){
			for(var key in this.transitions){
				if(key.contains(l)){
					var node = this.transitions[key];
					delete this.transitions[key];
					this.transitions[key + l] = node;
					return false;
				}
			}
			this.transitions[l] = destination_node;
			return true;
		};

		// Each node should have an id.
		node.getId = function(){
			return id;
		};

		node.add_event = function(event_name, func){
			node[event_name] = func;
		};

		node.make_accepting = function(){
			accepting = true;
		};
		node.is_accepting = function(){
			if(debug) console.log("        checking accepting status: + " + accepting);
			return accepting;
		};
		node.find_destination = function(c){
			// returns an array of all nodes this node transitions to on input c.
			var ret = [];
			for(var key in this.transitions){
				if(debug) console.log("      checking for "+ c + " in " + key);
				if(key.contains(c)){
					//ret.push(nodes[key]);
					if(debug) console.log("      moving to node: "+this.transitions[key].lbl);
					return this.transitions[key];
				}
				else {
					if(debug) console.log("       does not exist");
				}
			}
			// If ret is greater then 0, return ret, if not return false.
			if(ret.length > 0) return ret;
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
			if(debug && node.lbl) console.log("    "+node.lbl + " -------------------------------");
			var next = node.find_destination(input[i]);
			if(next){
				if(node.on_exit) node.on_exit();
				node = next;
				if(node.on_enter) node.on_enter();
			} else {
				if(debug) console.log("        no transition for " + input[i]);
				return false;
			}
		}
		if(debug && node.lbl) console.log("Ending on node: " + node.lbl);
		return node.is_accepting();
	};
	return aut;
}