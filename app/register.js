const registerBtn = document.querySelector(".register-btn");
const inputNick = document.querySelector("[name='nick']");
const inputPassword = document.querySelector("[name='password']");
const loggingButton = document.getElementById("logging");
const loggingDivInfo = document.querySelector(".logging").parentNode;
// console.log(loggingDivInfo);
// localStorage.removeItem('nick');

try {
	registerBtn.addEventListener("click", () => {
		// console.log(loginBtn);
		// console.log(inputNick.value);
		// console.log(inputPassword.value);
		const dataRegister = {
			Nick: inputNick.value,
			Password: inputPassword.value,
		};
		$.post(
			"./php/register.php",
			dataRegister,
			function (data) {
				// alert( "OK - odczyt / zapis do bazy" );
				if (!data.error) {
					console.log("dane z rejestracji: ", data);
					console.log("Zarejestrowano nowego gracza: " + data.nick);
					localStorage.setItem("nick/JTS", data.nick);
					// console.log("Zarejestrowano nowego gracza: " + data.date);
					console.log("Zarejestrowano nowego gracza: " + data.nameTable);
					localStorage.setItem("nameTable/JTS", data.nameTable);

					loggingButton.innerHTML = `<i class="fas fa-sign-in-alt" dropdown></i>
                    Witaj ${data.nick} ! <div class="dropdown-note" dropdown> (twoje wyniki) </div>`;

					loggingDivInfo.innerHTML = `
                    <div class="result-letter">` + localStorage.getItem('result5/JTS') + ` odgadniętych 5-lit. słów </div>
                    <div class="result-letter">` + localStorage.getItem('result6/JTS') + ` odgadniętych 6-lit. słów </div>
                    <div class="result-letter">` + localStorage.getItem('result7/JTS') + ` odgadniętych 7-lit. słów </div>
                    <div class="result-letter">` + localStorage.getItem('result8/JTS') + ` odgadniętych 8-lit. słów </div>
                    <div class="result-letter">` + localStorage.getItem('result9/JTS') + ` odgadniętych 9-lit. słów </div>
                     <div class="logging" logging>
                        <div id="lower">
                            <button class="normal reg-log-btn logout-btn">Wyloguj</button>
                        </div>
                     </div>`;

					$.getScript("app/logout.js")
						.done(function () {
							console.log("inicjacja logout.js");
						// })
						// .fail(function () {
						// 	console.log("coś poszło nie tak w autoLogin");
						});
				} else {
					console.log(data.error + " -> " + data.nick);
					loggingDivInfo.classList.add("dropdown-active");
					loggingButton.innerHTML =
						// `<i class="fas fa-digital-tachograph" dropdown></i>
						// Wypełnianie <div class="dropdown-note" dropdown>${titleButtonFilling}</div>`;

						`<i class="fas fa-sign-in-alt" dropdown></i>
                    Logowanie <div class="dropdown-note" dropdown style="color:red;"> (${data.error})</div>`;
				}
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
