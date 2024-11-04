console.log("Document is ready!");

let spaceURL = "http://api.open-notify.org/astros.json";
let spaceData;

fetch(spaceURL)
.then(response => response.json())
.then(data =>{
    console.log(data);
    spaceData = data.people;
    createD3(spaceData);
})

function createD3(dataArray){

    //Create & Append SVG
    let svg = d3.select('#container')
                .append('svg')
                .attr("width", 600)
                .attr("height", 400);

    let astroDiv = document.getElementById('astronaut');

    let centerX = 50;
    svg.selectAll('circle')
        .data(dataArray)
        .enter()
        .append('circle')
        .attr('cx', (d,i) =>{
            console.log(d);
            console.log(i);
            return centerX + (i * 75)
        })
        .attr('cy', 200)
        .attr('r', 20)
        .attr('fill', 'blue')
        .on('mouseover', (evt, d)=>{
            d3.select(evt.currentTarget)
            .transition()
            .attr("fill", "red")
            .attr("r", 40)
            .duration(1000)

            let curName = d.name;
            astroDiv.innerHTML = curName;
        })
        .on('mouseout', (evt, d) =>{
            d3.select(evt.currentTarget)
            .transition()
            .attr("fill", "blue")
            .attr("r", 20)
            .duration(1000)  
            
            astroDiv.innerHTML = '';
        })
}

// //Create & Append SVG
// let svg = d3.select('#container')
//             .append('svg')
//             .attr("width", 600)
//             .attr("height", 400);

// let centerX = 50; 
// for (let i=0; i < 10; i++){
//     svg.append('circle')
//         .attr('cx', centerX)
//         .attr('cy', 200)
//         .attr('r', 20)
//         .attr('fill', 'blue');

//     centerX += 75;
// }