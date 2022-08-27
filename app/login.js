const loginBtn = document.querySelector(".login-btn");
const inputNick = document.querySelector("[name='nick']");
const inputPassword = document.querySelector("[name='password']");
// console.log(loginBtn);
const loggingButton = document.getElementById("logging");
// const loggingDivInfo = document.querySelector(".logging").parentNode;

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
				if (!data.error) {
					console.log("dane z logowania: ", data);
					console.log("Zalogowano nowego gracza: " + data.nick);
					localStorage.setItem("nick/JTS", data.nick);
					// console.log("Zarejestrowano nowego gracza: " + data.date);
					console.log("Zalogowanego tabela: " + data.nameTable);
					localStorage.setItem("nameTable/JTS", data.nameTable);

					loggingButton.innerHTML = `<i class="fas fa-sign-in-alt" dropdown></i>
                    Witaj ${data.nick} ! <div class="dropdown-note" dropdown> (twoje wyniki) </div>`;

					// loggingDivInfo.innerHTML = `
					//     <div class="result-letter">` + localStorage.getItem('result5/JTS') + ` odgadniętych 5-lit. słów </div>
					//     <div class="result-letter">` + localStorage.getItem('result6/JTS') + ` odgadniętych 6-lit. słów </div>
					//     <div class="result-letter">` + localStorage.getItem('result7/JTS') + ` odgadniętych 7-lit. słów </div>
					//     <div class="result-letter">` + localStorage.getItem('result8/JTS') + ` odgadniętych 8-lit. słów </div>
					//     <div class="result-letter">` + localStorage.getItem('result9/JTS') + ` odgadniętych 9-lit. słów </div>
					//     <div class="logging" logging>
					//         <div id="lower">
					//             <button class="normal reg-log-btn logout-btn">Wyloguj</button>
					//         </div>
					//     </div>`;

					// $.getScript("app/logout.js")
					// 	.done(function () {
					// 		console.log("inicjacja logout.js");
					// 	// })
					// 	// .fail(function () {
					// 	// 	console.log("coś poszło nie tak w autoLogin");
					// 	});

					// const readScoresPlayer = new Promise((resolve, reject) => {
						$.getScript("app/readScores.js").done(function () {
							console.log("Odczyt wyników gracza  readScores.js");
							// resolve();
						});
					// });
					// readScoresPlayer.then(() => {
					// 	$.getScript("app/displayScores.js").done(function () {
					// 		console.log("Wyświetlanie wyników gracza  displayScores.js");
					// 	});
					// });
					// $.getScript("app/displayScores.js").done(function () {
					//     console.log("Wyświetlanie wyników gracza  displayScores.js");
					// });

					// $.getScript("app/displayScores.js").done(function () {
					// 	console.log("Wyświetlanie wyników gracza  displayScores.js");
					// });
				} else {
					console.log("Błąd logowania: ", data.error);
				}

				// alert( "OK - odczyt z bazy" );
				// console.log(data.name);
				// console.log(data.date);
				// console.log('dane z logowania: ', data);
				// localStorage.setItem('nick/JTS', data.nick);
				// localStorage.setItem('nameTable/JTS', data.nameTable);
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
