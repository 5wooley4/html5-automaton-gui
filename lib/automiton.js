/******** Project - Final *********************************
Authors: Eric Wooley, Tandra Felly, Lauryn Loudermilk
Description: Javascript automata engine.
**********************************************************/
// function contains because I don't like indexOf
String.prototype.contains = function(it) { return this.indexOf(it) != -1; };
/**
 * Constructor for the DFA
 * @param  {Object} options options for DFA
 * @class DFA
 * @return {DFA}
 */
function DFA(options){
	var options = options || {};
	var debug = options.debug || false;
	options = _.defaults(options, {
		debug: false,
	});
	
	// var aut = {};
	var nodes = [];
	var starting_node;
	// Add node returns a node and adds it to the DFA network of nodes.
	this.add_node = function(obj){
		// Makes sure obj is not null.
		obj = obj || {};
		var node = new Node(obj, nodes.length);
		nodes.push(node);
		return node;
	};
	// Run through the thisomiton
	this.run = function(input){
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
	function Node(obj, id){
		// Node is now the obj, so that anything passed in is now part of the object.
		$.each(obj, function(index, val){
			this[index] = val;
		});
		var accepting = obj.accepting || false;
		var starting = obj.starting || false;
		if(nodes.length < 1) starting = true;
		if (starting) starting_node = this;
		this.transitions = {}
		if(debug) console.log("creating node: " + this.lbl + " accepting: "+ accepting);
		// L is the language, destination_node is the node(s) that L sends it too.
		this.add_transition = function(l, destination_node){
			var newTransition = true;
			var return_label = "";
			this.transitions[l] = destination_node;
			for(var key in this.transitions){
				if(this.transitions[key] === destination_node ){
					return_label += key;
					if(key != l)
						newTransition = false;
				} else {
					if(key == l){
						if(this.deleteTransition) this.deleteTransition(l, id, this.transitions[key].id);
						delete this.transitions[key];
					}
				}
			}
			
			return {transitionLabel: return_label, newTransition: newTransition};
			
		};

		// Each node should have an id.
		this.getId = function(){
			return id;
		};

		this.add_event = function(event_name, func){
			node[event_name] = func;
		};

		this.make_accepting = function(){
			accepting = true;
		};
		this.is_accepting = function(){
			if(debug) console.log("        checking accepting status: + " + accepting);
			return accepting;
		};
		this.find_destination = function(c){
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

		return this;
	};
	return this;
}