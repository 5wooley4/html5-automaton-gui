/******** Project - Final *********************************
Authors: Eric Wooley, Tandra Felly, Lauryn Loudermilk
Description: Javascript automata engine.
**********************************************************/
function transition(e){
  //console.log("Line Event");
  // find the closest circle to where the line started.
  var nearest_state = closest_object(e.start, states);
  var nearest_end_state = closest_object(e.end, states);
  if(!(nearest_state && nearest_end_state)){
    alert("transitions must start and end in a state");
    return;
  }
  // check if the line started in a circle.
  if(nearest_state.geo.intersects(e.start)){
    // get the position of the nearest circle.
    
    // check if the end of the line ends withit a cirlce
    //for(var i =0; i < states.length; i++){
    // look if we are inside this circle.
    if(nearest_end_state.geo.intersects(e.end)){
      transitionPrompt({
        onOk: function(labelText){
          var start = nearest_state.geo.getPosition();
          var end = nearest_end_state.geo.getPosition();
          
          var transitions = labelText.split("");
          var transitionResult = null;
          var needToAddTransition = false;
          for(var i = 0; i < transitions.length; i++){
            transitionResult = nearest_state.node.add_transition(transitions[i], nearest_end_state.node);
          }
          var sid = nearest_state.node.getId();
          var eid = nearest_end_state.node.getId();
          // draw an arc between the two cirlces.
          if(typeof savedTransitions[sid + "-" + eid] === 'undefined'){
            var arcWithLabel = new transitionRep(nearest_state, nearest_end_state, transitionResult.transitionLabel);
            savedTransitions[sid + "-" + eid] = arcWithLabel;
          } else {
            var t = savedTransitions[sid + "-" + eid];
            t.text.setText(transitionResult.transitionLabel);
            tooltip_layer.draw();
          }
        }
      });
    }
  }
}
function transitionRep(newStartParent, newEndParent, lt){
  // if(!this.endParent) this.endParent = newEndParent;
  // if(!this.startParent) this.startParent = newStartParent;
  var that = this;
  this.setParent = function(sp, ep){
    // if we have an old parents remove their outgoing transition if its different
    this.startParent = sp;
    this.endParent = ep
    sp.outgoingTransitions[ep.node.getId()] = that;
    console.log("outgoing transitions");
    $.each(sp.outgoingTransitions, function(index, val){
      console.log("\t "+index);
    });
    ep.incomingTransitions[sp.node.getId()] = that;
    
  };

  // if the difference between the x's is greater than the difference between the y's
  this.draw = function(){
    this.clear();
    var start = this.startParent.geo.getPosition();
    var end = this.endParent.geo.getPosition();
    var labelText = this.lt;
    this.arc_distance = calculate_distance(start, end) / 3; 
    if(Math.abs(start.x - end.x) < Math.abs(start.y - end.y)){
      this.yminus = 0;
      this.xminus = this.arc_distance;
    } else {
      this.yminus = this.arc_distance;
      this.xminus = 0;
    }
    // if were going right to left
    if(start.x <= end.x){
      this.pointer_direction = 'right';
    } else { // if were going left to right
      this.pointer_direction = 'left';
      this.yminus = 0 - this.yminus;
      this.xminus = 0 - this.xminus;
    }
    // the location of the label
    this.label_loc = {x: (start.x + end.x) / 2 + this.xminus, y: (start.y + end.y) /2 - this.yminus};
    this.rotation = points_angle(start, end);
    if(this.pointer_direction == 'left')
      this.rotation += 180;

    this.tooltip = new Kinetic.Label({
          x: this.label_loc.x - this.xminus/2,
          y: this.label_loc.y + this.yminus/2,
          opacity: 1,
          rotationDeg: this.rotation
        });
    if(this.tag); // TODO: remove old tag
    this.tag = new Kinetic.Tag({
          fill: 'black',
          pointerDirection: this.pointer_direction,
          pointerWidth: 10,
          pointerHeight: 10,
          lineJoin: 'round',
        });
    this.tooltip.add(this.tag);

    this.text = new Kinetic.Text({
          text: labelText,
          fontFamily: 'Calibri',
          fontSize: 14,
          padding: 2,
          fill: 'white'
        });
        this.tooltip.add(this.text);

        tooltip_layer.add(this.tooltip);
        // tooltip_layer.add(simpleText);
        tooltip_layer.draw();
    this.arc = new Kinetic.Shape({
      drawFunc: function(context) {
        context.strokeStyle = 'red';
        // Begin drawing path
        context.beginPath();
        // start the path at (x, y)
        context.moveTo(start.x, start.y);
        // This effects the bending of the line

        
        // draw the arc to the other circle
        context.quadraticCurveTo(that.label_loc.x, that.label_loc.y, end.x, end.y);
        context.lineWidth = 20;
        context.stroke();
      }
    });
    transition_layer.add(this.arc);
    transition_layer.draw();
  };
  this.clear = function(deleteReferences){
    if(typeof deleteReferences =='undefined') deleteReferences = false;
    if(deleteReferences){
      delete this.startParent.outgoingTransitions[this.endParent.node.getId()];
      delete this.endParent.incomingTransitions[this.startParent.node.getId()];
    }
    if(this.tooltip){
      if(this.text){
        this.text.remove();
        this.text = null;
      }
      if(this.tag){
        this.tag.remove();
        this.tag = null;
      }
      this.tooltip.remove();
      this.tooltip = null;
    }
    if(this.arc){
      this.arc.remove();
      this.arc = null
    }
    tooltip_layer.draw();
    dfa_layer.draw();
  };

  if(!this.lt && !lt)
    throw new Error("a label must be included");
  this.lt = lt; 
  if(!newStartParent && !newEndParent)
    throw new Error("Parents must be set");
  this.setParent(newStartParent, newEndParent);
  this.draw(this.startParent.geo.getPosition(), this.endParent.geo.getPosition(), this.lt);
  return this;
}
function transitionPrompt(options){
  options.modal = "#transitionOptions";
  prompt(options);
};