const logoutBtn = document.querySelector(".logout-btn");
const loggingButton = document.getElementById("logging");
const loggingDivInfo = document.querySelector(".logging").parentNode;

try {
	logoutBtn.addEventListener("click", () => {
		localStorage.setItem("nick/JTS", "");
		localStorage.setItem("nameTable/JTS", "");
		localStorage.setItem("result5/JTS", 0);
		localStorage.setItem("result6/JTS", 0);
		localStorage.setItem("result7/JTS", 0);
		localStorage.setItem("result8/JTS", 0);
		localStorage.setItem("result9/JTS", 0);
		console.log("Wyczyszczono dane !!!");

		loggingButton.innerHTML = `
			<i class="fas fa-sign-in-alt" dropdown></i>
			Logowanie <div class="dropdown-note" dropdown>(rejestracja)</div>
		`;

		loggingDivInfo.innerHTML = `<div class="logging" logging>
				<label class="dropdown-login" logging>Nazwa (login):
				    <input type="text" name="nick" placeholder="" logging></label>
				<label class="dropdown-password" logging>Hasło:
				    <input type="password" name="password" placeholder="" logging></label>
				<div id="lower">
				    <button class="normal reg-log-btn register-btn">Rejestruj</button>
				    <button class="normal reg-log-btn login-btn">Zaloguj</button>
				</div>
			</div>`;

		$.getScript("app/login.js").done(function () {
			console.log("inicjacja login.js");
		});
		$.getScript("app/register.js").done(function () {
			console.log("inicjacja register.js");
		});
	});
} catch (e) {
	if (e instanceof ReferenceError) {
		console.log("logoutBtn - nie jest zdefiniowany.");
	}
}
