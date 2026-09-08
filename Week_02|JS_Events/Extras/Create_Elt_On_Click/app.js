window.addEventListener('click', (e) => {
    console.log('you have clicked here, ' + e.x + ',' + e.y);
    let img = document.createElement('img');
    img.src = "https://picsum.photos/100/100";
    img.style.position = "absolute";
    img.style.top = e.y + "px";
    img.style.left = e.x + "px";
    document.getElementById('element-container').appendChild(img);
});
