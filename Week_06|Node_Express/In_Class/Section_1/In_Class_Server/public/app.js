async function getPrices() {
  let response = await fetch("/prices");
  let data = await response.json();
  console.log(data);
}

async function getComputerInformation() {
  let response = await fetch("/test");
  let data = await response.json();
  document.getElementById("info").innerHTML = data.data;
  console.log(data.data)
}

document.getElementById("getprices").addEventListener("click", ()=> {
    getPrices();
})
document.getElementById("getcomputer").addEventListener("click", ()=> {
    getComputerInformation();
})