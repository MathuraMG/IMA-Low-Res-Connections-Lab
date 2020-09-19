// jQuery Example
//	(1) Select for the item
//	in jQuery, use the '$' followed by the selector inside parantheses

//	(2) Attach event listener
//	use the dot syntax to sepcify the type of event listener
//	in this case, it is a 'click'

//	(3) Define the callback function
//	define an 'anonymous function' to be called when the event listener occurs
//	in javascript, this is referred to as a 'callback' function
//	callback functions are functions that will occur at a later point in time
//	in this case, the callback function will run when a click occurs

// 	the 'evt' argument will provide us with additional data about the event
//  this includes specific information about the element that was clicked

//Select for all of the buttons and attach an event listener to all of them
$(".nav-button").click(function(evt){
    $(".content").hide();
    let itemID = evt.target.id;
    let contentID = "#content-" + itemID;
    $(contentID).show();
});