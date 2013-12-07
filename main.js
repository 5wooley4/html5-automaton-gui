/******** Project - Final *********************************
Authors: Eric Wooley, Tandra Felly, Lauryn Loudermilk
Description: Javascript automata engine.
**********************************************************/
// Start Automiton engine
var aut = new DFA({debug: true});
// TODO: Hookup DFA STFF HERE
// Adds an html5 canvas to container
var stage = new Kinetic.Stage({
  container: 'canvas_container',
  width:$("#canvas_container").width(),
  height: $("#canvas_container").height()
});
$("#testStringButton").on('click', function(){
  alert(aut.run($("#testString").val()));
})
// index, with the keys formatted as stateFromId-stateToId
// ex: if a state goes from state with id 1, to a state with id 3
// the index would be savedTransitions["1-3"]
var savedTransitions = {};

// Layer to preview gestuers on.
var gesture_preview = new Kinetic.Layer();

// Layer to have touch events on.
var touch_layer = new Kinetic.Layer();


// We want to mark the first state as starting, this will be set to false upon drawing a state.
var firstState = true;
// Layer to draw our shapes
var dfa_layer = new Kinetic.Layer();
stage.add(dfa_layer);

// layer for arcs
var transition_layer = new Kinetic.Layer();
stage.add(transition_layer);

var tooltip_layer = new Kinetic.Layer();
stage.add(tooltip_layer);

markerLayer = new Kinetic.Layer();
var startingState;
var startingMarker = new Kinetic.Wedge({
  radius: 40,
  angleDeg: 60,
  stroke: 'black',
  fill: "white",
  strokeWidth: 3,
  rotationDeg: 150
});
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
var states = {};
// these are the gesture events. when we get a circle call this event, etc...
var events = {
  circle: function(e){
    var state = new State(e);  
    state.on('dragstart', function() {
      state.setFill("grey");
      dfa_layer.draw();
    });
    state.on('dragmove', state.redrawTransitions);
    state.on('dragend', function() {
      state.setFill("red");
      state.redrawTransitions();
      transition_layer.draw();
      dfa_layer.draw();
    });
    state.on('click', function(){
      if (document.getElementById("move").checked){
      }
      else if (document.getElementById("initial").checked){
        aut.setStartingNode(state.node);
        moveStartingMarker(state);
        markerLayer.draw();
        aut.setStartingNode(state.node);

      }
      else if (document.getElementById("accepting").checked){
        state.toggleAccepting(true);
        dfa_layer.draw();
      }
      else if (document.getElementById("rename").checked){
        prompt({onOk:function(message){state.setLabelText(message)}});
      }
      else{
        var answer = confirm("Would you like to delete this object?")
        if (answer){
          state.remove();
          dfa_layer.draw();
        }
        else{
          return;
        }
      }
    });
    if(firstState){
      firstState = false;
      moveStartingMarker(state);
      markerLayer.draw();
      aut.setStartingNode(state.node);
    }
    states[state.getId()] = state;
    dfa_layer.draw();

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
  // onClick:function(loc){
  //   console.log(JSON.stringify(loc))
  //   $.each(states, function(index, state){
  //     if(state.geo.intersects(loc)){
  //       return state.geo.fire("click");
  //     }
  //   });
  // }
}); 
gesturesController.enableGestures();
// to disable gestures controller:
// gesturesController.disableGestures();
touch_layer.add(whiteboard);
touch_layer.draw();

stage.add(touch_layer);
stage.add(gesture_preview);