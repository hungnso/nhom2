const reviewList = document.querySelector('.review-content')
const headerList = document.querySelector(".title-text")

let title = localStorage.getItem('title')

// window.addEventListener("DOMContentLoaded", function(){
//   // getheaderList()

//   getReview()
// })


function getheaderList(){
 headerList.innerHTML = `${title}`
}
const reviewAPI = 'https://serverjson123.herokuapp.com/reviews'

function getReview(){

  fetch(reviewAPI)
   .then((response) =>{
     return response.json()
    //  console.log(response.json)
   })
   .then((data) =>{
    let htmlz= ''
    data.forEach((content) =>{
      htmlz += `
    <div class="col l-12 c-12 m-12">
    <div class="room-wrap">
      <div class="row">
        <div class="col l-6 c-12 m-12">
          <div class="room-img" style="background-image: url(${content.image});"></div>
        </div>
        <div class="col l-6 c-12 m-12">
          <div class="desc">
            <span class="day-tour">Day ${content.day}</span>
            <h2>${title}</h2>
            <p>${content.content}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
    `
   })
   reviewList.innerHTML = htmlz
    
   })
}
getheaderList()
getReview()
