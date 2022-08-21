const loginBtn = document.querySelector(".login-btn");
const inputNick = document.querySelector("[name='nick']");
const inputPassword = document.querySelector("[name='password']");
// console.log(loginBtn);

try {
	// typeof loginBtn === "undefined";
	loginBtn.addEventListener("click", () => {
		// console.log(loginBtn);
		// console.log(inputNick.value);
		// console.log(inputPassword.value);
		const dataLogin = { Nick: inputNick.value, Password: inputPassword.value };
		$.post(
			"./php/login.php",
			dataLogin,
			function (data) {
				alert( "OK - odczyt z bazy" );
				// console.log(data.name);
				console.log(data.result);
				// console.log('dane z logowania: ', data);
                localStorage.setItem('nick/JTS', data.nick);
                localStorage.setItem('nameTable/JTS', data.nameTable);
			},
			"json"
		).fail(function () {
			alert("Błąd logowania gracza!!!");
		});
	});
} catch (e) {
	if (e instanceof ReferenceError) {
		console.log("loginBtn - is not defined");
	}
}


// $.post( "./php/logout.php", function(data) {
//     // alert( "OK - odczyt / zapis do bazy" );
//     // console.log(data.name);
//     // console.log(data);
//     // let element = data.querySelector("a");
//     console.log(data);
//     $( ".result" ).html( "STRONA:  \n"+data );
// })
// .fail(function() {
//     alert( "Błąd odczytu z bazy" );
// }
// );
