let streetData;
function getData() {
    console.log('page is loaded');
   fetch('http://data.melbourne.vic.gov.au/resource/b2ak-trbp.json')
   .then(response => response.json())
   .then(data => {
        //do something
       console.log(data);
       streetData = data;

       for(let i=0;i<data.length;i++) {
        //    console.log(data[i].sensor_name);
       }
   })
   .catch(error => {
       console.log("Error!!! : " + error);
   })

}

function setup() {
    createCanvas(500,500);
    getData();
}

function draw() {
    if(streetData){
        ellipse(0,0,streetData[0].hourly_counts, streetData[0].hourly_counts);
    } else {
        //animation
    }
    
}



