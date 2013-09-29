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
          console.log(JSON.stringify(e));
          states.push(state);

        },
        line: function(e){
          var nearest_state = closest_object(e.start, states);
          if(nearest_state.geo.intersects(e.start)){
            var start = nearest_state.geo.getPosition();
            for(var i =0; i < states.length; i++){
              if(states[i].geo.intersects(e.end)){
                var end = states[i].geo.getPosition();
                // var line = new Kinetic.Line({
                //   points: [start, end],
                //   stroke: 'red',
                //   strokeWidth: 5,
                //   lineCap: 'round',
                //   lineJoin: 'round'
                // });
                // dfa_layer.add(line);

                // try an arc instead of a line
                var arc = new Kinetic.Shape({
                  x: 5,
                  y: 10,
                  fill: 'red',
                  strokeWidth: 4,
                  // a Kinetic.Canvas renderer is passed into the drawFunc function
                  drawFunc: function(context) {
                    context.strokeStyle = 'red';
                    
                    context.beginPath();
                    context.moveTo(start.x, start.y);
                    context.quadraticCurveTo((start.x + end.x) / 2, (start.y + end.y) /2 - 100, end.x, end.y);
                    context.lineWidth = 20;

                    // line color
                    context.stroke();

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