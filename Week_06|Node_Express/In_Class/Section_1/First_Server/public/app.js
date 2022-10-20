window.addEventListener("load",() => {
  fetch("/classes")
  .then(resp => resp.json())
  .then(data => {
    console.log(data);
  })
})
