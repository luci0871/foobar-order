const endPoint = "https://foobar32.herokuapp.com/";

window.addEventListener("load", init);

function init() {
  fetch(endPoint)
    .then((res) => res.json())
    .then(buildDOM);
}

/* setInterval(() => {
  //document.querySelector("#taps").innerHTML = "";
  fetch(endPoint)
    .then((res) => res.json())
    .then(updateDOM);
}, 4000); */

function buildDOM(data) {
  //console.log(data);
  buildTaps(data.storage);
}

/* function updateDOM(data) {
  updateTaps(data.storage);
} */
/* function updateTaps(beers) {
  beers.forEach((beer) => {
    const element = document.querySelector(`.beer[data-beername='${beer.name}']`);
     element.querySelector(
      "p"
    ).textContent = `${tap.level} out of ${tap.capacity}`;
    //console.log(element);
    element.querySelector(".inner").style.width =
      (tap.level / tap.capacity) * 100 + "%"; 
  });
} */

function buildTaps(beers) {
  //console.log(taps);
  //grab the template
  const template = document.querySelector("template").content;
  //loop through the taps
  beers.forEach((beer) => {
    //console.log(tap);
    //3 clone the taps
    const myBeer = template.cloneNode(true);
    myBeer.querySelector(".shop-item-title").textContent = beer.name;
    //4 popultate
    /* myBeer.querySelector("h2").textContent = beer.name;*/
    const toLowerCase = beer.name.toLowerCase();

myBeer.querySelector("img").setAttribute("src", "images/" + toLowerCase + ".png");
    /* myBeer.querySelector("img").setAttribute("src", "images/" + beer.name + ".png") */
    /* myTap.querySelector(
      "p"
    ).textContent = `${tap.level} out of ${tap.capacity}`;
    //5 append to DOM
    myTap.querySelector(".inner").style.width =
      (tap.level / tap.capacity) * 100 + "%";  */
    document.querySelector(".shop-items").appendChild(myBeer);
  });

  ready()
} 

/* if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
} */
function showform(){
  document.querySelector(".wrapper").classList.remove("hidden")
  document.querySelector(".beerlist").classList.add("hidden")
}

function ready() {
  const paybtn = document.querySelector(".btn2")
  paybtn.addEventListener('click', showform)

 let removeCartItemButtons = document.getElementsByClassName('btn-danger')
  for (let i = 0; i < removeCartItemButtons.length; i++) {
      let button = removeCartItemButtons[i]
      button.addEventListener('click', removeCartItem)
  }

  let quantityInputs = document.getElementsByClassName('cart-quantity-input')
  for (let i = 0; i < quantityInputs.length; i++) {
      let input = quantityInputs[i]
      input.addEventListener('change', quantityChanged)
  }

  let addToCartButtons = document.getElementsByClassName('shop-item-button')
  for (let i = 0; i < addToCartButtons.length; i++) {
      let button = addToCartButtons[i]
      button.addEventListener('click', addToCartClicked)
  }

  document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
  alert('Thank you for your purchase')
  let cartItems = document.getElementsByClassName('cart-items')[0]
  while (cartItems.hasChildNodes()) {
      cartItems.removeChild(cartItems.firstChild)
  }
  updateCartTotal()
} 

function removeCartItem(event) {
  let buttonClicked = event.target
  buttonClicked.parentElement.parentElement.remove()
  updateCartTotal()
}

function quantityChanged(event) {
  let input = event.target
  if (isNaN(input.value) || input.value <= 0) {
      input.value = 1
  }
  updateCartTotal()
}

function addToCartClicked(event) {
  let button = event.target
  let shopItem = button.parentElement.parentElement
  let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
  let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
  let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
  addItemToCart(title, price, imageSrc)
  updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
  let cartRow = document.createElement('div')
  cartRow.classList.add('cart-row')
  let cartItems = document.getElementsByClassName('cart-items')[0]
  let cartItemNames = cartItems.getElementsByClassName('cart-item-title')
  for (let i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText == title) {
          alert('This item is already added to the cart')
          return
      }
  }
  let cartRowContents = `
      <div class="cart-item cart-column">
          <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
          <span class="cart-item-title">${title}</span>
      </div>
      <span class="cart-price cart-column">${price}</span>
      <div class="cart-quantity cart-column">
          <input class="cart-quantity-input" type="number" value="1">
          <button class="btn btn-danger" type="button">REMOVE</button>
      </div>`
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
  let cartItemContainer = document.getElementsByClassName('cart-items')[0]
  let cartRows = cartItemContainer.getElementsByClassName('cart-row')
  let total = 0
  for (let i = 0; i < cartRows.length; i++) {
      let cartRow = cartRows[i]
      let priceElement = cartRow.getElementsByClassName('cart-price')[0]
      let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
      let price = parseFloat(priceElement.innerText.replace('DKK', ''))
      let quantity = quantityElement.value
      total = total + (price * quantity)
  }
  total = Math.round(total * 100) / 100
  document.getElementsByClassName('cart-total-price')[0].innerText = 'DKK' + total
}