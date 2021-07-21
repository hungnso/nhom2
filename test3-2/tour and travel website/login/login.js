
	
   
	let formLogin = document.getElementById('form__login');
	// formLogin.addEventListener('submit', getUrl )
	let formSignUp = document.getElementById('form-sing-up')

	let inputEmail_login =document.getElementById('email__login');
	// console.log(inputEmail_login.value)
	let inputPassword_login  = document.getElementById('pw__login');
	let emailErr = document.getElementById('emailErr')
	let passwordErr = document.getElementById('passwordErr')
	
	

	
	formLogin.onsubmit = (e) =>{
		e.preventDefault()
		checkEmail()
		checkpassWord()
		if(checkEmail() && checkpassWord()){
			handelLogin()
		}
	
	   
	 }
async function handelLogin(){
	let emailValue = inputEmail_login.value;
	let passwordValue = inputPassword_login.value
	const url = 'https://serverjson123.herokuapp.com/login';
	const response = await fetch(url);
	const accounts = await response.json()
	if (
		accounts.some((account) =>
			account.email === emailValue &&
			account.passWord === passwordValue)) {
			console.log(accounts)
		let loginUser = accounts.find((account) =>
			account.email === emailValue &&
			account.passWord === passwordValue)
		console.log(loginUser);

		localStorage.setItem('current-user', JSON.stringify(accounts))
		alert("Đăng nhập thành công")
		window.location = "../index.html"
	} else {
		alert("Tên tài khoản hoặc mật khẩu không chính xác");
	}
	
}
function checkEmail(){
		 if(inputEmail_login.value === ""){
			 emailErr.innerHTML = "Hãy nhập email"
			 return false


		 } else{
			 return true
		 }
		 
}
function checkpassWord(){
		 if(inputPassword_login.value === ""){
			 passwordErr.innerHTML = "Hãy nhập mật khẩu"
			 return false

		 } else{
			 return true
		 }
}
function check(){
		 if(inputPassword_login.value === "" && inputEmail_login.value ===""){
			 alert('Hãy nhập email và mật khẩu')
			 return false


		 } else{
			 return true
		 }
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

			let formUserLogin ={
				email : email,
				passWord : p2
			}
			creatUser(formUserLogin)
			// localStorage.setItem('singUp',JSON.stringify(formUserLogin))
			


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


	