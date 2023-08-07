console.log("Document is ready!");

//Fetch Space Data
let peopleData;
let spaceURL = "http://api.open-notify.org/astros.json";
fetch(spaceURL)
.then(response => response.json())
.then(data => {
     //do something
    console.log(data);
    peopleData = data.people;
    addSVG(data.people);
})

//Append Space Data
function addSVG(dataArray){

    //Select for element to update astronaut names
    let nameEl = document.getElementById("astro-name");

    let centerX = 80;
    let centerY = 100;

    //Create an SVG
    let svg = d3.select('#container')
        .append("svg")
        .attr("width", 600)
        .attr("height", 200);

    //Create rectangles
	svg.selectAll("circle")
    .data(dataArray)
    .enter()
    .append("circle")
    .attr("cx", (d, i) => {
        console.log(d);
        console.log(i);
        return centerX + (i * centerX)
    })
    .attr("cy", centerY)
    .attr("r", 20)
    .attr("fill", "blue")
    .on('mouseover', (evt, d) => {
        console.log(d);
        d3.select(evt.currentTarget)
        .transition()
        .attr("fill", "red")
        .attr("r", "40")
        nameEl.innerHTML = d.name;
    })
    .on('mouseout', (evt, d) =>{
        nameEl.innerHTML = "";
        d3.select(evt.currentTarget)
        .transition()
        .attr("fill", "blue")
        .attr("r", "20")
    })
}