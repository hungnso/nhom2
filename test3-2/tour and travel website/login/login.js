let data = [
	{
		email:"",
		password: "",
	}
];
// function validate() {
// 	let email = document.getElementById("email").value;
// 	console.log(email)
// 	let p1 = document.getElementById("password").value;
// 	let p2 = document.getElementById("password--confirm").value;
	 
	// if(email== "") {
	// alert("Vui lòng nhập email!");
	// return false;
	// }
	// else if(p1 == "") {
	// alert("Vui lòng nhập mật khẩu!");
	// return false;
	// }
	// else if(p2 !== p1) {
	// alert("Mật khẩu nhập không trùng khớp!");
	// return false;
	// }
	// alert("Đăng ký thành công")
	// return true;
	// }

	// window.addEventListener("DOMContentLoaded", function(){
	//     getUrl()
	//   })
	
   
	let formLogin = document.getElementById('form__login');
	// formLogin.addEventListener('submit', getUrl )
	let formSignUp = document.getElementById('form-sing-up')

	let inputEmail_login =document.getElementById('email__login');
	// console.log(inputEmail_login.value)
	let inputPassword_login  = document.getElementById('pw__login');
	// console.log(inputPassword_login.value)
	// let logIn = document.getElementById('submit__login')
	// logIn.setAttribute('href', 'https://www.google.com')
	// logIn.addEventListener('click',function(){
	//        alert('hung')
	//    })

	


	// let confirm = document.getElementById('submit__login')
	// confirm.location.href("http://www.w3schools.com")

	// const url = 'http://localhost:3000/login'
	// function getUrl(){
	  
	//     let emailValue = inputEmail_login.value;
	//     console.log(emailValue)
	//     let passwordValue = inputPassword_login.value

	//     fetch(url)
	//         .then((response) =>{
	//             return response.json()
	//         })
	//         .then ((data) =>{
	//             data.forEach((value) =>{
	//                 console.log(value.email)
	//             })
	//         })
	//     }
	
	formLogin.onsubmit = async(e) =>{
		e.preventDefault()
		let emailValue = inputEmail_login.value;
		let passwordValue = inputPassword_login.value

		const url = `https://serverjson123.herokuapp.com/login?email=${emailValue}`;
		const response = await fetch(url);
		const account = await response.json()
		account.forEach((value)=>{
		if(value.passWord === passwordValue) {
			localStorage.setItem('current-user', JSON.stringify(account))
				alert('Bạn đã đăng nhập thành công')
				window.location = "../index.html"
				// await updateUser()

			} 
			else{
				alert('Mật khẩu không chính xác ')
			}
		})
		

	   
	}

	let userAPI = "https://serverjson123.herokuapp.com/login"
	function creatUser(data,cb){
			let option = {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
					// 'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: JSON.stringify(data)
			};
			fetch(userAPI,option)
				.then(function(response){
					response.json()
				})
				.then(cb)
	}

	formSignUp.onsubmit = async(e) =>{
		e.preventDefault()
			let email = document.getElementById("email").value;
			console.log(email)
			let p1 = document.getElementById("password").value;
			let p2 = document.getElementById("password--confirm").value;


			


			if(email== "") {
				alert("Vui lòng nhập email!");
				return false;
				}
				else if(p1 == "") {
				alert("Vui lòng nhập mật khẩu!");
				return false;
				}
				else if(p2 !== p1) {
				alert("Mật khẩu nhập không trùng khớp!");
				return false;
				} else{
				alert("Đăng ký thành công")
				let formUser = {
					email: email,
					passWord: p2
				}
				creatUser(formUser)
				window.location = "login.html"

				}

				



			}

	// if (formLogin.attachEvent) {
	//     formLogin.attachEvent ('submit', onFormSubmit);
	// } else {
	//     formLogin.addEventListener('submit', onFormSubmit);
	// }function onFormSubmit(e) {
	//     let email = inputEmail_login.value;
	//     let password = inputPassword_login.value;

	//     if (email.value == 1 && password.value == 1) {
	//         alert('Dang nhap thanh cong');
	//     } else {
	//         alert('That bai');
	//     }
	// }


	