let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('.search-bar-container');
let formBtn = document.getElementById('login-btn');
let cartBtn = document.getElementById('cart-btn')
let cartForm = document.querySelector('.cart-item')
let cartList = document.querySelector('.cart-container')
let cartClose = document.querySelector('#cart-close')
let cartContent = document.querySelector('.cart-content')
let cartInfoUser = document.querySelector(".cart-info")
let loginForm = document.querySelector('.login-form-container');
let formClose = document.querySelector('#form-close');
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let videoBtn = document.querySelectorAll('.vid-btn');
let next = document.getElementById('next')
let prev = document.getElementById('prev')
let slides = document.querySelectorAll('.home-container')
let cartCountInfo = document.getElementById('cart-count-info')
let cartTotalVule = document.getElementById('cart-total-value')
let getinforBtn = document.getElementById('btn--info')
let icon = document.querySelector('.icons')
let btnOder = document.querySelector('.btn--order')
let index = 0
let productList = document.querySelector(".box-tour")
let cartItemID = 1;


function eventListener(){
window.addEventListener("DOMContentLoaded", function(){
  getTours()
  loadCart()
})
  window.onscroll = () =>{
    searchBtn.classList.remove('fa-times');
    searchBar.classList.remove('active');
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    // loginForm.classList.remove('active');
}

window.onload = () =>{
  return localStorage.getItem('current-user') ? getUserLogin() : []
  
}
cartBtn.addEventListener("click", () =>{
  cartForm.classList.add("active")
  document.querySelector('html').style.overflowY= "hidden"
})
cartClose.addEventListener("click", () =>{
  cartForm.classList.remove("active")
  document.querySelector('html').style.overflowY= "scroll"

})
cartList.addEventListener("click", deleteItem)
btnOder.addEventListener("click", handelOder)

// logout.addEventListener("click", logoutUser)


menu.addEventListener('click', () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

searchBtn.addEventListener('click', () =>{
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');
});


// formClose.addEventListener('click', () =>{
//     loginForm.classList.remove('active');
// });
productList.addEventListener('click', purchaseProduct)


getinforBtn.addEventListener('click', handleInfor)

videoBtn.forEach(btn =>{
    btn.addEventListener('click', ()=>{
        document.querySelector('.controls .active').classList.remove('active');
        btn.classList.add('active');
        let src = btn.getAttribute('data-src');
        document.querySelector('#video-slider').src = src;
    });
});

next.addEventListener('click',function next(){
  slides[index].classList.remove('active');
  index = (index + 1) % slides.length
  console.log(index)
  slides[index].classList.add('active')
  
} )
prev.addEventListener('click', function prev(){
  slides[index].classList.remove('active');
  index = (index - 1 + slides.length) % slides.length
  console.log(index)
  slides[index].classList.add('active')
  
})

}
eventListener()





var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    loop:true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    breakpoints: {
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
    },
});

var swiper = new Swiper(".brand-slider", {
    spaceBetween: 20,
    loop:true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        450: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        991: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 5,
        },
      },
});

function updateCartInfo(){
  let cartInfo = findCartInfo();
  cartCountInfo.textContent = cartInfo.productCount

  cartTotalVule.textContent = cartInfo.total;
  

}

function handleInfor(){
  let fullName = document.querySelector('input[name ="full-name"]').value
  let phoneNumber = document.querySelector('input[name ="phone-number"]').value
  let arrivals = document.querySelector('input[name ="arrivals"]').value
  let leaving = document.querySelector('input[name ="leaving"]').value
  
  let formData = {
    fullName: fullName,
    phoneNumber: phoneNumber,
    arrivals: arrivals,
    leaving: leaving

  }
  postInfoUser(formData)
}
function postInfoUser(data){
  const cartHear = document.createElement('div')
  cartHear.classList.add('cart-info');
  cartHear.innerHTML =`
  <p class="cart-info-name">Full Name: ${data.fullName}</p>
  <p class="cart-info-phone">Number: ${data.phoneNumber}</p>
  <p class="cart-info-arrivals">Arrivals: ${data.arrivals}</p>
  <p class="cart-info-leaving">Leaving: ${data.leaving}</p>
  `;
  cartContent.appendChild(cartHear)
}

let tourAPI = "https://serverjson123.herokuapp.com/tour"

function getTours(){
  fetch(tourAPI)
    .then(function(response){
      return response.json()
    })
    .then(function(data){
      console.log(data)
      let html = ''
      data.forEach(function(product){
        html += `
        <div class="box">
          <a href="./review/review.html" class="box-link">
            <img src="${product.image}" alt="">
            <div class="content">
              <h3> <i class="fas fa-map-marker-alt"></i> ${product.title} </h3>
              <p>${product.desc}</p>
              <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="far fa-star"></i>
              </div>
              <div class="price"> <p>$${product.price}</p> <span>$120.00</span> </div>
            </div>
          </a>
          <button type ="button" class="btn btn--tour">book now</button>
  
        </div>
        `;
      });
    productList.innerHTML = html

    })

}



function purchaseProduct(e){
  if(e.target.classList.contains("btn--tour")){
    let product = e.target.parentElement
    getProductInfo(product)
    console.log(product)
  } else{
    let product = e.target.parentElement
    getTitle(product)
   

  }
}

function getTitle(data){
  let title = data.querySelector('.content h3').textContent
  localStorage.setItem("title", title)
}

function getProductInfo(data){
  let productInfo = {
    id: cartItemID,
    imgSrc: data.querySelector('.box-link img').src,
    title: data.querySelector('.content h3').textContent,
    desc: data.querySelector('.content p').textContent,
    price: data.querySelector('.price p').textContent

  }
  console.log(productInfo)
  cartItemID++
  addToCartList(productInfo)
  saveProductInStorage(productInfo)
}

function addToCartList(data){
  const cartItem = document.createElement('div')
  cartItem.classList.add('cart-book');

  cartItem.setAttribute('data-id', `${data.id}`)


  cartItem.innerHTML = `
  <img src="${data.imgSrc}" alt="" class="cart-img">
  <div class="cart-tour">
    <h3 class="cart-tour-name">${data.title}</h3>
    <div class="cart-tour-start">
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
    </div>
    <p class="cart-tour-price">${data.price}</p>
  </div>
    <button type="button" class="cart-item-del-btn">
      <i class="fas fa-times close-item"></i>
    </button>
  
  `;
  cartContent.appendChild(cartItem)
  
}
function saveProductInStorage(item){
  let products = getProductFromStorage();
  console.log(products)
  products.push(item);
  localStorage.setItem('products', JSON.stringify(products));
  updateCartInfo();
}
function getProductFromStorage(){
  return localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
  
}
function getUserLogin(){
  formBtn.innerHTML = `
  <p class="logout-title">Logout</p>
  `;
  formBtn.addEventListener('click', function(e){
    e.preventDefault()
    window.location ="./index.html"
    localStorage.removeItem('current-user')
    localStorage.removeItem('products')
    formBtn.innerHTML = `
			<i class="fas fa-user" ></i>
      `;
    window.location ="./index.html"
    
  })
  // const logout = document.createElement('div')
  // logout.classList.add('logout')
  // logout.innerHTML = `
	// <p class="logout-link">LogOut</p>
  // `;
  
  // icon.appendChild(logout)
  
}
function loadCart(){
  let products = getProductFromStorage();
  console.log(products)
  if(products.length < 1){
      cartItemID = 1; 
  } else {
      cartItemID = products[products.length - 1].id;
      cartItemID++;
      
  }
  
  products.forEach(product => addToCartList(product));
 
  updateCartInfo();
}


function findCartInfo(){
  let products = getProductFromStorage();
  console.log(products)

  let total = products.reduce((acc, product) => {
      let price = parseFloat(product.price.substr(1)); 
      return acc += price;
  }, 0); 

  return{
      total: total.toFixed(2),
      productCount: products.length
  }
}



function deleteItem(e){
  let cartItem
  if(e.target.classList.contains("cart-item-del-btn")){
    cartItem = e.target.parentElement
    console.log(cartItem)
    cartItem.remove()
  } else if (e.target.classList.contains("close-item")){
    cartItem = e.target.parentElement.parentElement
    cartItem.remove()

  }
  let products = getProductFromStorage();
    let updatedProducts = products.filter(product => {
        return product.id !== parseInt(cartItem.dataset.id);
    });
    localStorage.setItem('products', JSON.stringify(updatedProducts)); 
    updateCartInfo();

}

function handelOder(){
  if(localStorage.getItem('current-user')){
    alert('Thành công')
    localStorage.removeItem('products')
    window.location = "./index.html"
  } else{
    alert('Bạn cần đăng nhập để tiếp tục')
    window.location = "./login/login.html"
    
  }
}