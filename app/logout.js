const logoutBtn = document.querySelector(".logout-btn");
// const inputNick = document.querySelector("[name='nick']");
// console.log(registerBtn);

try {
	// typeof registerBtn === "undefined";
	logoutBtn.addEventListener("click", () => {
		// console.log(loginBtn);
		// console.log(inputNick.value);
		// console.log(inputPassword.value);
		const dataLogin = { Nick: '' };
		$.post(
			"./php/logout.php",
			dataLogin,
			function (data) {
				// alert( "OK - odczyt / zapis do bazy" );
				// console.log(data.name);
				console.log("Wylogowano: " + data.nick);
			},
			"json"
		).fail(function () {
			alert("Błąd reakcji z logout.php");
		});
	});
} catch (e) {
	if (e instanceof ReferenceError) {
		console.log("logoutBtn - is not defined");
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
