window.addEventListener('load', loadData);

function loadData() {
    console.log('hello');



    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        console.log('this is data');
        console.log(data);
    })
}
