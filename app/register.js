const registerBtn = document.querySelector(".register-btn");
const inputNick = document.querySelector("[name='nick']");
const inputPassword = document.querySelector("[name='password']");
// console.log(registerBtn);

try {
	// typeof registerBtn === "undefined";
	registerBtn.addEventListener("click", () => {
		// console.log(loginBtn);
		// console.log(inputNick.value);
		// console.log(inputPassword.value);
		const dataRegister = { Nick: inputNick.value,  Password: inputPassword.value };
		$.post(
			"./php/register.php",
			dataRegister,
			function (data) {
				// alert( "OK - odczyt / zapis do bazy" );
				// console.log(data.name);
				console.log("Zarejestrowano nowego gracza: " + data.nick);
				console.log("Zarejestrowano nowego gracza: " + data.date);
				console.log("Zarejestrowano nowego gracza: " + data.nameTable);
			},
			"json"
		).fail(function () {
			alert("Błąd reakcji z register.php");
		});
	});
} catch (e) {
	if (e instanceof ReferenceError) {
		console.log("registerBtn - is not defined");
	}
}

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
