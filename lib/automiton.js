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
	var that = this;
	
	// var aut = {};
	this.nodes = [];
	this.starting_node;
	// Add node returns a node and adds it to the DFA network of nodes.
	this.add_node = function(obj){
		// Makes sure obj is not null.
		this.obj = obj || {};
		var node = new Node(this.obj, this.nodes.length);
		if(node.starting) this.starting_node = node;
		this.nodes.push(node);
		return node;
	};
	this.setStartingNode = function(node){
		this.starting_node = node;
	};
	// Run through the thisomiton
	this.run = function(input){
		if(!this.starting_node){
			if(this.debug) console.warn("no starting node was set");
			return false;
		}
		// check if there are any nodes.
		if(this.nodes.length < 1) return false;
		// the node we start at.
		var node = this.starting_node;
		console.log("starting with node: " + node.getId());
		// loop throught the language.
		for(var i = 0; i < input.length; i++){
			node = this.step(input[i], node);
			if(!node) return false;
		}
		if(this.debug && node.lbl) console.log("Ending on node: " + node.lbl);
		return node.is_accepting();
	};
	this.step = function(c, node){
		if(!(node instanceof Node)) throw new Error("invalid node");
		if(this.debug && node.lbl) console.log("    "+node.lbl + " -------------------------------");
		var next = node.find_destination(c);
		if(next){
			if(node.on_exit) node.on_exit();
			if(next.on_enter) next.on_enter();
			return next;
			
		} else {
			if(this.debug) console.log("        no transition for " + c);
			return false;
		}
	};
	this.deleteNode = function(node){
		$.each(this.nodes, function(index, otherNode){
			if(that.debug) console.log("claaring references of " + node.getId() + " to " + otherNode.getId());
			otherNode.clearTransitionsToState(node);
		});
		delete that.nodes[node.getId()];
	};
	function Node(obj, id){
		this.id = id;
		var n = this;
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
		if(that.debug) console.log("creating node: " + this.lbl + "\n\tstarting: " + this.starting +"\n\taccepting: "+ this.accepting);
		// L is the language, destination_node is the node(s) that L sends it too.
		this.add_transition = function(l, destination_node){

			if(!(destination_node instanceof Node))
				throw new Error("destination_node must be a node object not: " + typeof destination_node);
			var newTransition = true;
			
			if(n.transitions[l] && n.transitions[l] !== destination_node){
				if(this.options.deleteTransition){

					this.options.deleteTransition(l, this, n.transitions[l]);
				}
				delete n.transitions[l];
			}
			n.transitions[l] = destination_node;
			
			return {
				transitionLabel: this.getTransitionAsString(destination_node),
				newTransition: newTransition
			};
			
		};
		this.getTransitionAsString = function(destination_node){
			var return_label = "";
			for(var key in n.transitions){
				//console.log("checking: " + key);
				//console.log(this.transitions[key].getId() + " - " + destination_node.getId())
				
				if(n.transitions[key] && n.transitions[key].getId() === destination_node.getId() ){
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
		this.changeAccepting = function(isAccepting){
			this.accepting = isAccepting;
		}
		this.is_accepting = function(){
			if(that.debug) console.log("        checking accepting status: " + this.accepting);
			return this.accepting;
		};
		this.clearTransitionsToState = function(otherNode){
			var otherNodeId = otherNode.getId();
			$.each(n.transitions, function(index, t){
				if(t.getId() === otherNodeId){
					n.transitions[index] = null;
					delete n.transitions[index];
				}
			});
		}
		this.find_destination = function(c){
			// returns an array of all nodes this node transitions to on input c.
			var ret = [];
			for(var key in n.transitions){
				if(that.debug) console.log("      checking for "+ c + " in " + key);
				if(key.contains(c)){
					//ret.push(nodes[key]);
					if(that.debug) console.log("      moving to node: "+n.transitions[key].lbl);
					return n.transitions[key];
				}
				else {
					if(that.debug) console.log("       does not exist");
				}
			}
			return false;
		};
		return this;
	};
	return this;
}