const loggingButton = document.getElementById("logging");

if (
	localStorage.getItem("nick/JTS") != "" &&
	localStorage.getItem("nick/JTS")
) {
	loggingButton.innerHTML = `<i class="fas fa-sign-in-alt" dropdown></i>
        Witaj ${localStorage.getItem(
					"nick/JTS"
				)} ! <div class="dropdown-note" dropdown> (twoje wyniki) </div>`;

	$.getScript("app/readScores.js").done(function () {
		console.log("Odczyt wyników gracza - readScores.js");
	});
}
