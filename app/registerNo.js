const registerBtn = document.querySelector(".register-btn");
const inputNick = document.querySelector("[name='nick']");
const inputPassword = document.querySelector("[name='password']");
const loggingButton = document.getElementById("logging");
const loggingDivInfo = document.querySelector(".logging").parentNode;

try {
	registerBtn.addEventListener("click", () => {
		const dataRegister = {
			Nick: inputNick.value,
			Password: inputPassword.value,
		};
		$.post(
			"./php/register.php",
			dataRegister,
			function (data) {
				if (!data.error) {
					console.log("Zarejestrowano nowego gracza: " + data.nick);
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
					loggingDivInfo.classList.add("dropdown-active");
					loggingButton.innerHTML = `<i class="fas fa-sign-in-alt" dropdown></i>
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
		console.log("registerBtn - nie jest zdefiniowany.");
	}
}
