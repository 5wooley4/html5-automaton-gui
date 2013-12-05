/******** Project - Final *********************************
Authors: Eric Wooley, Tandra Felly, Lauryn Loudermilk
Description: Javascript automata engine.
**********************************************************/
// Start Automiton engine
var aut = new DFA();
// TODO: Hookup DFA STFF HERE
// Adds an html5 canvas to container
var stage = new Kinetic.Stage({
  container: 'canvas_container',
  width:$("#canvas_container").width(),
  height: $("#canvas_container").height()
});
// index, with the keys formatted as stateFromId-stateToId
// ex: if a state goes from state with id 1, to a state with id 3
// the index would be savedTransitions["1-3"]
var savedTransitions = {};

// Layer to preview gestuers on.
var gesture_preview = new Kinetic.Layer();

// Layer to have touch events on.
var touch_layer = new Kinetic.Layer();

// Layer to draw our shapes
var dfa_layer = new Kinetic.Layer();
stage.add(dfa_layer);

var tooltip_layer = new Kinetic.Layer();
stage.add(tooltip_layer);
// an empty stage does not emit mouse-events
// so fill the stage with a background rectangle
// that can emit mouse-events
var whiteboard = new Kinetic.Rect({
  x: 0,
  y: 0,
  width: stage.getWidth(),
  height: stage.getHeight(),
    stroke: 'black',
    strokeWidth: 1,
  });

// an array of all the states.
var states = [];
// these are the gesture events. when we get a circle call this event, etc...
var events = {
  circle: function(e){
    var circle = new Kinetic.Circle({
      x: e.center.x,
      y: e.center.y,
      radius: e.radius,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 4,
      draggable: true
    });
    circle.on('click', function(){
      console.log("you clicked the circle!");
      if (document.getElementById("move").checked){
        console.log('move is active')
        move();
      }
      else{
        remove();
      }
      circle.on('dragstart', function() {
        console.log('dragstart');

      });
      circle.on('dragend', function() {
        console.log('dragend');

      });
    })
    // This adds a node to circle for the engine to work with.
    console.log()
    var state = {
      geo: circle,
      node: aut.add_node({
        deleteTransition: function(l, node1, node2){
          var t = savedTransitions[node1.getId()+"-"+node2.getId()];
          if(t){
            var new_label = node1.getTransitionAsString(node2).replace(l, '');
            if(new_label && new_label.length > 0){
              t.text.setText(new_label);
              tooltip_layer.draw();
            } else {
              t.removeSelf();
              delete savedTransitions[node1.getId()+"-"+node2.getId()];
            }
          }
        } 
      })
    };
    dfa_layer.add(circle);
    dfa_layer.draw(); //called to draw the layer after changes
    states.push(state);

  },

  // This function is fired when there is a line drawn between two circles.
  // This funciton can be found in lib/transition.js
  line: function(e){
    transition(e);
  }
};

// Call the canvas gestures library.
gesturesController = canvas_gestures({
  whiteboard: whiteboard,
  stage: stage,
  preview: gesture_preview,
  events: events,
  onClick:function(loc){
    console.log(JSON.stringify(loc))
    $.each(states, function(index, state){
      if(state.geo.intersects(loc)){
        return state.geo.fire("click");
      }
    });
  }
}); 
gesturesController.enableGestures();
// to disable gestures controller:
// gesturesController.disableGestures();
touch_layer.add(whiteboard);
touch_layer.draw();

stage.add(touch_layer);
stage.add(gesture_preview);