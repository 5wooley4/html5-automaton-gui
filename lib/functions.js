/******** Project - Final *********************************
Authors: Eric Wooley, Tandra Felly, Lauryn Loudermilk
Description: Javascript automata engine.
**********************************************************/
function calculate_distance(point1, point2){
	var xs = 0;
	var ys = 0;

	xs = point2.x - point1.x;
	xs = xs * xs;

	ys = point2.y - point1.y;
	ys = ys * ys;

	return Math.sqrt( xs + ys );
};

function closest_object(loc, objects){
	if(objects.length < 1) return false;
	var ret = objects[0];
	var nearest = calculate_distance(loc, objects[0].geo.getPosition());
	for(var i = 1; i < objects.length; i++){
		var challenger = calculate_distance(loc, objects[i].geo.getPosition());
		if(challenger < nearest){
			ret = objects[i];
			nearest = challenger;
		}
	}
	return ret;
};


function points_angle(P1, P2){
    var deltaY = P2.y - P1.y;
    var deltaX = P2.x - P1.x;
    return Math.atan2(deltaY, deltaX) * 180 / Math.PI
}

function prompt(options){
    options = options || {};
    $( "#dialog" ).dialog({
        autoOpen: false,
        width: 400,
        title: "Enter Transitions",
        buttons: [
            {
                text: "Ok",
                click: function() {
                    if($("#prompt_input").val().length > 0){
                        if(options.onOk) options.onOk($("#prompt_input").val());
                        $( this ).dialog( "close" );    
                    } else {
                        alert("transitions cannot be empty");
                    }
                    
                }
            },
            {
                text: "Cancel",
                click: function() {
                    if(options.onCancel) options.onCancel();
                    $( this ).dialog( "close" );
                }
            }
        ]
    });
    $( "#dialog" ).dialog( "open" );
};

//there is no right click event, so we have to override the context menu
//to perform functions on right click
window.oncontextmenu = function ()
{
    showCustomMenu(); // show your context menu
    return false;     // cancel default menu
}
