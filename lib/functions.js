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
	var ret;
	var nearest;
    $.each(objects, function(index, val){
        if(!nearest || !ret){
            nearest = calculate_distance(loc, val.geo.getPosition());
            ret = val;
        }
        var challenger = calculate_distance(loc, val.geo.getPosition());
        if(challenger < nearest){
            ret = val;
            nearest = challenger;
        }
    });
	return ret;
};


function points_angle(P1, P2){
    var deltaY = P2.y - P1.y;
    var deltaX = P2.x - P1.x;
    return Math.atan2(deltaY, deltaX) * 180 / Math.PI
}

function prompt(options){
    options = options || {};
    if(!options.modal) options.modal = "#transitionOptions";
    $("#prompt_input").val(options.defaultText || '');
    $("#prompt_input").attr("placeholder", options.placeholder || '');
    $( options.modal ).dialog({
        autoOpen: false,
        width: 400,
        title: options.title || "Prompt",
        buttons: [
            {
                text: "Ok",
                click: function() {
                    var prompt = $(options.modal).find("#prompt_input");
                    if(options.onOk) options.onOk(prompt.val());
                    $( this ).dialog( "close" );    
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
    $(options.modal ).dialog( "open" );
};
function moveStartingMarker(state){
    startingState = state;
    var newLoc = state.geo.getPosition();
    var halfMarkerWidth = state.geo.getRadius() / 2;
    startingMarker.setPosition(newLoc.x - halfMarkerWidth - state.geo.getRadius()/2, newLoc.y);
    state.stateShapes.add(startingMarker);
    dfa_layer.draw();
};
function setDraggable(draggable){
    $.each(states, function(index, s){
        s.setDraggable(draggable);
    });

}
function objectCount(obj){
    var c= 0;
    for(var p in obj)
        if(obj.hasOwnProperty(p))
            ++c;
    return c;
}
function firstInObject(obj){
    for(var p in obj)
        return obj[p]
}
//there is no right click event, so we have to override the context menu
//to perform functions on right click
window.oncontextmenu = function ()
{
    showCustomMenu(); // show your context menu
    return false;     // cancel default menu
}
