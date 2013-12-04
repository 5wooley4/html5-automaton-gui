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
    var start = nearest_state.geo.getPosition();
    // check if the end of the line ends withit a cirlce
    //for(var i =0; i < states.length; i++){
      // look if we are inside this circle.
      if(nearest_end_state.geo.intersects(e.end)){
        prompt({
          onOk: function(message){
            console.log(message);
            var end = nearest_end_state.geo.getPosition();
            var label_loc;
            // draw an arc between the two cirlces.
            var arc = new Kinetic.Shape({
              drawFunc: function(context) {
                context.strokeStyle = 'red';
                // Begin drawing path
                context.beginPath();
                // start the path at (x, y)
                context.moveTo(start.x, start.y);
                // This effects the bending of the line
                var yminus, xminus;
                // if the difference between the x's is greater than the difference between the y's
                var arc_distance = calculate_distance(start, end) / 3; 
                if(Math.abs(start.x - end.x) < Math.abs(start.y - end.y)){
                  yminus = 0;
                  xminus = arc_distance;
                } else {
                  yminus = arc_distance;
                  xminus = 0;
                }
                // if were going right to left
                if(start.x < end.x){
                  pointer_direction = 'right';
                } else { // if were going left to right
                  pointer_direction = 'left';
                  yminus = 0 - yminus;
                  xminus = 0 - xminus;
                }


                // the location of the label
                label_loc={x: (start.x + end.x) / 2 + xminus, y: (start.y + end.y) /2 - yminus};
                rotation = points_angle(start, end);
                if(pointer_direction == 'left')
                  rotation += 180;
                
                // draw the arc to the other circle
                context.quadraticCurveTo(label_loc.x, label_loc.y, end.x, end.y);
                context.lineWidth = 20;
                context.stroke();

                // determine direction
                var pointer_direction, rotation;

                var tooltip = new Kinetic.Label({
                  x: label_loc.x + xminus/2,
                  y: label_loc.y + yminus/2,
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
                  text: message,
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
          }
        }) 
        
        return;
      }
    //}
  }
}