function State(e){
	var that = this;

	this.setup = function(){
		this.geo = new Kinetic.Circle({
	      x: e.center.x,
	      y: e.center.y,
	      radius: e.radius,
	      fill: 'red',
	      stroke: 'black',
	      strokeWidth: 4,
	      draggable: true
	    });
	    this.outgoingTransitions = {};
		this.incomingTransitions = {};
	    dfa_layer.add(this.geo);
	    dfa_layer.draw(); //called to draw the layer after changes	
	}
	this.node = aut.add_node({
		deleteTransition: function(l, node1, node2){
		  var t = savedTransitions[node1.getId()+"-"+node2.getId()];
		  if(t){
		    var new_label = node1.getTransitionAsString(node2).replace(l, '');
		    if(new_label && new_label.length > 0){
		      t.text.setText(new_label);
		      tooltip_layer.draw();
		    } else {
		    	t.clear(true);
		    }
		  }
		} 
	});
	this.getId = function(){
		return this.node.getId();
	};
	this.getPosition = function(){
		this.geo.getPosition();
	};
	this.printTransitions = function(){
		$.each(this.outgoingTransitions, function(index, val){
			console.log(index);
		});
		$.each(this.incomingTransitions, function(index, val){
			console.log(index);
		});
	};
	
	this.on = function(event, response){
		that.geo.on(event, response);
	};
	this.redrawTransitions = function(){
		this.forAllTransitions(function(t){
			t.draw();
		});
	}
	this.setup();
	this.forAllTransitions = function(func){
		$.each(this.outgoingTransitions, function(index, val){
			func(val);
		});
		$.each(this.incomingTransitions, function(index, val){
			func(val);
		});
	}
	this.remove = function(){
		this.geo.remove();
		this.forAllTransitions(function(transition){
			transition.clear(true);
		});
		return this.id();
	}
}