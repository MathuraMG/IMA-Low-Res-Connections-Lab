console.log("Document is ready!");

//Create an SVG
let svg = d3.select('#container')
            .append("svg")
            .attr("width", 600)
            .attr("height", 200);

//Append Circles
let totalCircles = 10;
let centerX = 80;
for (let i = 0; i < totalCircles; i++){
    svg.append('circle')
    .attr("cx", centerX)
    .attr("cy", 100)
    .attr("r", 20)
    .attr("fill", "blue");
    centerX += 80;
}