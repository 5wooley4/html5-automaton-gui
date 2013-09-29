  // Start Automiton engine
  var aut = aut();
      // Adds an html5 canvas to container
      var stage = new Kinetic.Stage({
        container: 'canvas_container',
        width:$("#canvas_container").width(),
        height: $("#canvas_container").height()
      });

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
          //fill: 'green',
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
            strokeWidth: 4
          });
          // This adds a node to circle for the engine to work with.
          var state = {geo: circle, node: aut.add_node()};
          dfa_layer.add(circle);
          dfa_layer.draw();
          states.push(state);

        },

        // This function is fired when there is a line drawn between two circles.
        line: function(e){
          // find the closest circle to where the line started.
          var nearest_state = closest_object(e.start, states);
          // check if the line started in a circle.
          if(nearest_state.geo.intersects(e.start)){
            // get the position of the nearest circle.
            var start = nearest_state.geo.getPosition();
            // check if the end of the line ends withit a cirlce
            for(var i =0; i < states.length; i++){
              // look if we are inside this circle.
              if(states[i].geo.intersects(e.end)){
                var end = states[i].geo.getPosition();
                var label_loc;
                // draw an arc between the two cirlces.
                var arc = new Kinetic.Shape({
                  drawFunc: function(context) {
                    context.strokeStyle = 'red';
                    context.beginPath();
                    context.moveTo(start.x, start.y);
                    var yminus, xminus;
                    if(Math.abs(start.x - end.x) < Math.abs(start.y - end.y)){
                      yminus = 0;
                      xminus = 100;
                    } else {
                      yminus = 100;
                      xminus = 0;
                    }
                    label_loc={x: (start.x + end.x) / 2 + xminus, y: (start.y + end.y) /2 - yminus};
                    context.quadraticCurveTo(label_loc.x, label_loc.y, end.x, end.y);
                    context.lineWidth = 20;
                    context.stroke();

                    // determine direction
                    var pointer_direction, rotation;
                    if(start.x < label_loc.x){
                      pointer_direction = 'right';
                      rotation = points_angle(start, label_loc);
                    } else {
                      pointer_direction = 'left';
                      rotation = points_angle(start, label_loc) + 180;
                    }


                    var tooltip = new Kinetic.Label({
                      x: start.x,
                      y: start.y,
                      opacity: 0.75,
                      rotationDeg: rotation
                    });

                    tooltip.add(new Kinetic.Tag({
                      fill: 'black',
                      pointerDirection: pointer_direction,
                      pointerWidth: 10,
                      pointerHeight: 10,
                      lineJoin: 'round',
                    }));

                    tooltip.add(new Kinetic.Text({
                      text: 'Tooltip pointing down',
                      fontFamily: 'Calibri',
                      fontSize: 14,
                      padding: 2,
                      fill: 'white'
                    }));

                    tooltip_layer.add(tooltip);
                    // tooltip_layer.add(simpleText);
                    tooltip_layer.draw();
                  }
                });
                dfa_layer.add(arc);
                dfa_layer.draw();
                return;
              }
            }

            
          }
        }
      };

      // Call the canvas gestures library.
      canvas_gestures({
        whiteboard: whiteboard,
        stage: stage,
        preview: gesture_preview,
        events: events
      }); 





      touch_layer.add(whiteboard);
      touch_layer.draw();

// This this keyboard is pretty cooddd


stage.add(touch_layer);
stage.add(gesture_preview);