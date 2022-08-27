const logoutBtn = document.querySelector(".logout-btn");
// const inputNick = document.querySelector("[name='nick']");
// console.log(registerBtn);
const loggingButton = document.getElementById("logging");
const loggingDivInfo = document.querySelector(".logging").parentNode;



try {
	logoutBtn.addEventListener("click", () => {
		localStorage.setItem("nick/JTS", "");
		// localStorage.setItem("nameTable/JTS", "");
		// localStorage.setItem("result5/JTS", 0);
		// localStorage.setItem("result6/JTS", 0);
		// localStorage.setItem("result7/JTS", 0);
		// localStorage.setItem("result8/JTS", 0);
		// localStorage.setItem("result9/JTS", 0);
		console.log("Wyczysciłem localStorage !!!");

		loggingButton.innerHTML =
		`
			<i class="fas fa-sign-in-alt" dropdown></i>
			Logowanie <div class="dropdown-note" dropdown>(rejestracja)</div>
		`;

		loggingDivInfo.innerHTML = 
			`<div class="logging" logging>
				<label class="dropdown-login" logging>Nazwa (login):
				    <input type="text" name="nick" placeholder="" logging></label>
				<label class="dropdown-password" logging>Hasło:
				    <input type="password" name="password" placeholder="" logging></label>
				<div id="lower">
				    <button class="normal reg-log-btn register-btn">Rejestruj</button>
				    <button class="normal reg-log-btn login-btn">Zaloguj</button>
				</div>
			</div>`;

		$.getScript("app/login.js")
		.done(function () {
			console.log("inicjacja login.js");
		// })
		// .fail(function () {
		// 	console.log("coś poszło nie tak w autoLogin");
		});
		$.getScript("app/register.js")
		.done(function () {
			console.log("inicjacja register.js");
		// })
		// .fail(function () {
		// 	console.log("coś poszło nie tak w autoLogin");
		});
	});
} catch (e) {
	if (e instanceof ReferenceError) {
		console.log("logoutBtn - is not defined");
	}
}

// -------------------------------------------------------------

// try {
// 	// typeof registerBtn === "undefined";
// 	logoutBtn.addEventListener("click", () => {
// 		// console.log(loginBtn);
// 		// console.log(inputNick.value);
// 		// console.log(inputPassword.value);
// 		const dataLogin = { Nick: '' };
// 		$.post(
// 			"./php/logout.php",
// 			dataLogin,
// 			function (data) {
// 				// alert( "OK - odczyt / zapis do bazy" );
// 				// console.log(data.name);
// 				console.log("Wylogowano: " + data.nick);
// 				localStorage.setItem('nick/JTS','');
// 			},
// 			"json"
// 		).fail(function () {
// 			alert("Błąd reakcji z logout.php");
// 		});
// 	});
// } catch (e) {
// 	if (e instanceof ReferenceError) {
// 		console.log("logoutBtn - is not defined");
// 	}
// }

// --------------------------------------------------------------

// registerBtn.addEventListener('click', ()=>{
//     // console.log(loginBtn);
//     // console.log(inputNick.value);
//     // console.log(inputPassword.value);
//     const dataLogin = {Nick: inputNick.value}
//     $.post( "./php/register.php", dataLogin
//     , function(data) {
//         // alert( "OK - odczyt / zapis do bazy" );
//         // console.log(data.name);
//         console.log('Wylogowano: ' + data.nick);
//     }, "json")
//     .fail(function() {
//         alert( "Błąd reakcji z register.php" );
//     }
// );
// })
