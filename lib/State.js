function State(e){
	var that = this;
	e = _.defaults(e, {
		onEnter: function(charToTested){
			//that.color = that.geo.getFill();
			// /that.geo.setFill("orange");
			//dfa_layer.draw();
			var pos = that.getPosition();
			
			ph.animateTo(pos.x, pos.y);
		},
		onExit: function(charTested){
			//that.geo.setFill(that.color);
			//dfa_layer.draw();
			console.log(" Setting Marker: " +charTested);
			ph.setChar(charTested);
		}
	});
	this.node = aut.add_node({
		onEnter: e.onEnter,
		onExit: e.onExit,
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
	this.starting = false;
	this.accepting = false;
	this.setupCompleted = false;
	this.stateShapes = new Kinetic.Group({
		draggable: false
	});
	this.geo = new Kinetic.Circle({
      x: e.center.x,
      y: e.center.y,
      radius: e.radius,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 4,
      //draggable: true
    });
    this.label = new Kinetic.Label({
	  x: e.center.x,
	  y: e.center.y + this.geo.getRadius() - 20
	});

	// add a tag to the label
	this.label.add(new Kinetic.Tag({
	  fill: '#bbb',
	  stroke: '#333',
	  shadowColor: 'black',
	  shadowBlur: 10,
	  shadowOffset: [10, 10],
	  shadowOpacity: 0.2,
	  lineJoin: 'round',
	  pointerDirection: 'up',
	  pointerWidth: 20,
	  pointerHeight: 20,
	  cornerRadius: 5
	}));
	this.labelText = new Kinetic.Text({
	  text: e.labelText || "q"+this.node.getId(),
	  fontSize: 12,
	  lineHeight: 1.2,
	  padding: 5,
	  fill: 'green'
	});
	
	this.stateShapes.add(this.geo);
	this.label.add(this.labelText);
	this.stateShapes.add(this.label);
	dfa_layer.add(this.stateShapes);
    this.outgoingTransitions = {};
	this.incomingTransitions = {};
	
	this.getId = function(){
		return this.node.getId();
	};
	this.setLabelText = function(newText){
		this.labelText.setText(newText);
		dfa_layer.draw();
	}
	this.getLabelText = function(){
		return this.labelText.getText();
	}
	this.toggleAccepting = function(){
		this.accepting = !this.accepting;
		this.node.changeAccepting(this.accepting);
		if(this.accepting) this.geo.setFill("green");
		else this.geo.setFill("red");
	};
	this.getPosition = function(){
		var position = this.geo.getAbsolutePosition();
		return position;
	};
	this.printTransitions = function(){
		$.each(this.outgoingTransitions, function(index, val){
			console.log(index);
		});
		$.each(this.incomingTransitions, function(index, val){
			console.log(index);
		});
	};
	this.setDraggable = function(draggable){
		 this.stateShapes.setDraggable(draggable);

	}	
	this.on = function(event, response){
		that.stateShapes.on(event, response);
	};
	this.redrawTransitions = function(){
		that.forAllTransitions(function(t){
			t.draw();
		});
	}
	this.setFill = function(color){
		this.geo.setFill(color);
	};
	this.setStartingState = function(s){
		this.starting = s;
	}
	this.forAllTransitions = function(func){
		$.each(this.outgoingTransitions, function(index, val){
			func(val);
		});
		$.each(this.incomingTransitions, function(index, val){
			func(val);
		});
	}
	this.remove = function(){
		this.stateShapes.remove();
		aut.deleteNode(that.node);
		this.forAllTransitions(function(transition){
			transition.clear(true);
		});
		

	}
}