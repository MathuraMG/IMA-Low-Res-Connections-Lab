window.addEventListener('load', ()=> {
  document.getElementById('button').addEventListener('click', () => {
    console.log(document.getElementById('input').value);
    fetch('http://localhost:8000/activity', {
      method:'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({data: document.getElementById('input').value})
    })
    .then(resp => resp.json())
    .then(data => {console.log(data)});
  })
  document.getElementById('get-button').addEventListener('click', () => {
    console.log(document.getElementById('input').value);
    fetch('http://localhost:8000/activities')
    .then(resp => resp.json())
    .then(data => {
      console.log(data);
      document.getElementById('activities').innerHTML = "";
      for(let i = 0;i<data.activities.length;i++) {
        document.getElementById('activities').innerHTML += data.activities[i];
      }

    });
  })
})
