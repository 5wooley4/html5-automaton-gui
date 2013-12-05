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
	this.options = options || {};
	this.debug = this.options.debug || false;
	options = _.defaults(this.options, {
		debug: false,
	});
	
	// var aut = {};
	this.nodes = [];
	this.starting_node;
	// Add node returns a node and adds it to the DFA network of nodes.
	this.add_node = function(obj){
		// Makes sure obj is not null.
		this.obj = obj || {};
		var node = new Node(this.obj, this.nodes.length);
		console.log(node.starting);
		if(node.starting) starting_node = node;
		this.nodes.push(node);
		return node;
	};
	// Run through the thisomiton
	this.run = function(input){
		// check if there are any nodes.
		if(this.nodes.length < 1) return false;
		// the node we start at.
		var node = starting_node;
		console.log("starting in node: " + starting_node.lbl);
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
		this.id = id;
		this.options = _.defaults(obj, {
			deleteTransition: function(l, id, id2){
				console.warn(l+" - "+id+ " - "+id2);
			},
		});
		this.lbl = obj.lbl || "q" + this.id;
		// Node is now the obj, so that anything passed in is now part of the object.
		$.each(obj, function(index, val){
			this[index] = val;
		});
		this.accepting = obj.accepting || false;
		this.starting = obj.starting || false;
		this.transitions = {}
		if(this.debug) console.log("creating node: " + this.lbl + "\n\tstarting: " + this.starting +"\n\taccepting: "+ this.accepting);
		// L is the language, destination_node is the node(s) that L sends it too.
		this.add_transition = function(l, destination_node){

			if(!(destination_node instanceof Node))
				throw new Error("destination_node must be a node object not: " + typeof destination_node);
			var newTransition = true;
			
			if(this.transitions[l] && this.transitions[l] !== destination_node){
				if(this.options.deleteTransition){

					this.options.deleteTransition(l, this, this.transitions[l]);
				}
				delete this.transitions[l];
			}
			this.transitions[l] = destination_node;
			
			return {
				transitionLabel: this.getTransitionAsString(destination_node),
				newTransition: newTransition
			};
			
		};
		this.getTransitionAsString = function(destination_node){
			var return_label = "";
			for(var key in this.transitions){
				//console.log("checking: " + key);
				//console.log(this.transitions[key].getId() + " - " + destination_node.getId())
				if(this.transitions[key].getId() === destination_node.getId() ){
					return_label += key;
				} 
			}
			return return_label;
		}
		// Each node should have an id.
		this.getId = function(){
			return this.id;
		};

		this.add_event = function(event_name, func){
			this.node[event_name] = func;
		};

		this.make_accepting = function(){
			this.accepting = true;
		};
		this.is_accepting = function(){
			if(debug) console.log("        checking accepting status: + " + this.accepting);
			return this.accepting;
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