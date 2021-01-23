const endPoint = "https://foobar32.herokuapp.com/";

window.addEventListener("load", init);

function init() {
  fetch(endPoint)
    .then((res) => res.json())
    .then(buildDOM);
}

setInterval(() => {
  //document.querySelector("#taps").innerHTML = "";
  fetch(endPoint)
    .then((res) => res.json())
    .then(updateDOM);
}, 4000);

function buildDOM(data) {
  //console.log(data);
  buildTaps(data.storage);
}

function updateDOM(data) {
  updateTaps(data.storage);
}
function updateTaps(beers) {
  beers.forEach((beer) => {
    const element = document.querySelector(`.beer[data-beername='${beer.name}']`);
   /*  element.querySelector(
      "p"
    ).textContent = `${tap.level} out of ${tap.capacity}`;
    //console.log(element);
    element.querySelector(".inner").style.width =
      (tap.level / tap.capacity) * 100 + "%"; */
  });
}
function buildTaps(beers) {
  //console.log(taps);
  //grab the template
  const template = document.querySelector("#storageTemp").content;
  //loop through the taps
  beers.forEach((beer) => {
    //console.log(tap);
    //3 clone the taps
    const myBeer = template.cloneNode(true);
    myBeer.querySelector("article").dataset.beername = beer.name;
    //4 popultate
    myBeer.querySelector("h2").textContent = beer.name;
    myBeer.querySelector("img").setAttribute("src", "Images" + beer.image + "-sm.png")
    /* myTap.querySelector(
      "p"
    ).textContent = `${tap.level} out of ${tap.capacity}`;
    //5 append to DOM
    myTap.querySelector(".inner").style.width =
      (tap.level / tap.capacity) * 100 + "%"; */
    document.querySelector("#beers").appendChild(myBeer);
  });
}

copy.querySelector("img").setAttribute("src", "imgs/small/" + dish.image + "-sm.jpg");