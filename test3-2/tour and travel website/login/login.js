
	
   
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



	


let sigupemailErr = document.getElementById('singupEmailErr')
let singuppasswordErr = document.getElementById('singuppasswordErr')
let confirmpasswordErr = document.getElementById('confirmpasswordErr')
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

	let email = document.getElementById("email");
	console.log(email.value)
	let p1 = document.getElementById("password");
	console.log(p1.value)
	let p2 = document.getElementById("password--confirm");

	formSignUp.onsubmit = (e) =>{
		e.preventDefault()
		sigupEmail()
		siguppassWord()
		confirmPassWord()
		if(sigupEmail() && siguppassWord()){
			handelsingUp()
		} 
		
		



			}
	function handelsingUp(){
		let formUserLogin ={
			email : email.value,
			passWord : p2.value
		}
		creatUser(formUserLogin)
		alert('Bạn đã đăng kí thành công ')
		window.location ='./login.html'
	}
	function sigupEmail(){
		if(email.value === ""){
			sigupemailErr.innerHTML = "Bạn chưa nhập Email"
			return false
		} else{
			return true
		}
	}
	function siguppassWord(){
		if(p1.value ===""){
			singuppasswordErr.innerHTML = "Bạn chưa nhập Mật khẩu"
		return false

		} else{
			return true
		}
	}
	function confirmPassWord(){
		if(p1.value != p2.value){
			confirmpasswordErr.innerHTML = "Mật khẩu chưa trùng khớp"
		}
	}