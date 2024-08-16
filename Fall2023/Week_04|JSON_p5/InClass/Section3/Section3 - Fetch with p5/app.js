console.log("Loading...");

window.addEventListener('load', function(){
    console.log("Loaded!");

    //Use fetch() to get the data into the app and on the page
    /*
    Steps to Fetch the JSON Data
        1. request the data
        2. receive a response
        3. get the json file
        4. get the data
    */
    
    fetch("data.json")
        .then(response => response.json())
        .then(function(data){
            console.log(data);

            //Use a 'for in' loop to iterate through the properties of an object
            for (prop in data){
              
                // console.log(prop);
                // console.log(data[prop]);
                let houseOption = document.createElement("option");
                houseOption.innerHTML = prop;
                houseOption.value = prop;
                let houseDropdown = document.getElementById("house-select");
                houseDropdown.appendChild(houseOption);
            }

            let houseDropdown = document.getElementById("house-select");
            houseDropdown.addEventListener("change", function(evt){
                //console.log(evt);
                let curHouseValue = evt.target.value;
                //console.log(curHouseValue);

                curHouses = data[curHouseValue];
                //console.log(curHouses);
                houseSelected = true;
            });
        })
});

let curHouses;
let houseSelected = false;

/*------- p5 code --------*/

function setup(){
    createCanvas(window.innerWidth,window.innerHeight);
    background(230, 100, 25);
}

function draw(){
   // ellipse(mouseX, mouseY, 50,50);
   if (houseSelected){
        background(230,100,25);
        for (let i = 0; i < curHouses.length; i++){
            fill(220,200,100);
            ellipse(random(window.innerWidth), random(window.innerHeight), 80,80);
        }
        houseSelected = false;
    }
}

function windowResized(){
    resizeCanvas(window.innerWidth,window.innerHeight);
    background(230,100,25);
}