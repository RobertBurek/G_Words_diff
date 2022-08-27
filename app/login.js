const loginBtn = document.querySelector(".login-btn");
const inputNick = document.querySelector("[name='nick']");
const inputPassword = document.querySelector("[name='password']");
const loggingButton = document.getElementById("logging");

try {
	loginBtn.addEventListener("click", () => {
		const dataLogin = { Nick: inputNick.value, Password: inputPassword.value };
		$.post(
			"./php/login.php",
			dataLogin,
			function (data) {
				if (!data.error) {
					console.log("Zalogowano gracza: " + data.nick);
					localStorage.setItem("nick/JTS", data.nick);
					localStorage.setItem("nameTable/JTS", data.nameTable);
					loggingButton.innerHTML = `<i class="fas fa-sign-in-alt" dropdown></i>
                    Witaj ${data.nick} ! <div class="dropdown-note" dropdown> (twoje wyniki) </div>`;

					$.getScript("app/readScores.js").done(function () {
						console.log(
							`Odczyt wyników gracza: ${localStorage.getItem(
								"nick/JTS"
							)}   - readScores.js`
						);
					});
				} else {
					console.log(`Błąd logowania: ${data.error}`);
				}
			},
			"json"
		).fail(function () {
			alert("Błąd logowania gracza!!!");
		});
	});
} catch (e) {
	if (e instanceof ReferenceError) {
		console.log("loginBtn - nie jest zdefiniowany.");
	}
}
