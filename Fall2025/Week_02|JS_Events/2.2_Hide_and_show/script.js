console.log('hello!');

//The Red Square
let redButton = document.getElementById("red_button");

redButton.addEventListener('click', () => {
	//select for the red square using its id
	let red_square = document.getElementById("red_square");

	//now that we have the element we want to keep, we need to select for all of the squares using their class
	let all_squares = document.getElementsByClassName("squares");

	//use a for loop to go through all of the square elements
	for (let i = 0; i < all_squares.length; i++) {
		all_squares[i].style.visibility = 'hidden';
	}
	//so now that we are "hiding" all the squares, show only the square we want
	red_square.style.visibility = 'visible';
});

//The Blue Square
let blueButton = document.getElementById("blue_button");

blueButton.addEventListener('click', () => {
	//select for the red square using its id
	let blue_square = document.getElementById("blue_square");

	//now that we have the element we want to keep, we need to select for all of the squares using their class
	let all_squares = document.getElementsByClassName("squares");

	//use a for loop to go through all of the square elements
	for (let i = 0; i < all_squares.length; i++) {
		all_squares[i].style.visibility = 'hidden';
	}
	//so now that we are "hiding" all the squares, show only the square we want
	blue_square.style.visibility = 'visible';
});


//Show All Squares
let showButton = document.getElementById("show_button");

showButton.addEventListener('click', () => {

	//select for all of the squares using their class
	let all_squares = document.getElementsByClassName("squares");

	//use a for loop to go through all of the square elements and show them
	for (let i = 0; i < all_squares.length; i++) {
		all_squares[i].style.visibility = 'visible';
	}
});


//Show All Squares
let hideButton = document.getElementById("hide_button");

hideButton.addEventListener('click', () => {
	//select for all of the squares using their class
	let all_squares = document.getElementsByClassName("squares");

	//use a for loop to go through all of the square elements and hide them
	for (let i = 0; i < all_squares.length; i++) {
		all_squares[i].style.visibility = 'hidden';
	}
});
