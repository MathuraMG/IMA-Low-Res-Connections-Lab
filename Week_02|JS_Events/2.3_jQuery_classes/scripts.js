//Select for all of the buttons
let navButtons = document.getElementsByClassName('nav-button');
console.log(navButtons);

//Attach an event listener to all of the buttons
for (let i = 0; i < navButtons.length; i++){
	navButtons[i].addEventListener('click', function(evt){
		
		console.log("A button was clicked!");
		console.log(evt.target.id);

		// Hide all of the content
		let allContent = document.getElementsByClassName('content');
		for (let j = 0; j < allContent.length; j++){
			allContent[j].style.display = "none";
		}

		//Create the specific content ID
		let contentID = "content-" + evt.target.id;
		
		//Show the specific content
		let contentToShow = document.getElementById(contentID);
		contentToShow.style.display = "block";
	});
}