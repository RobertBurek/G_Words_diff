if (
	localStorage.getItem("nick/JTS") != "" &&
	localStorage.getItem("nick/JTS")
) {
	$.post(
		"./php/readResultsPlayerWithBaseSQL.php",
		{ nameTable: localStorage.getItem("nameTable/JTS") },
		function (dataSQL) {
			localStorage.setItem("result5/JTS", dataSQL.result5);
			localStorage.setItem("result6/JTS", dataSQL.result6);
			localStorage.setItem("result7/JTS", dataSQL.result7);
			localStorage.setItem("result8/JTS", dataSQL.result8);
			localStorage.setItem("result9/JTS", dataSQL.result9);
			$.getScript("app/displayScores.js").done(function () {
				console.log(
					`Wyświetlanie wyników gracza: ${localStorage.getItem(
						"nick/JTS"
					)}   - displayScores.js`
				);
			});
		},
		"json"
	).fail(function () {
		localStorage.setItem("result5/JTS", "0");
		localStorage.setItem("result6/JTS", "0");
		localStorage.setItem("result7/JTS", "0");
		localStorage.setItem("result8/JTS", "0");
		localStorage.setItem("result9/JTS", "0");
		localStorage.setItem("info/JTS", '<div class="result-letter info">Błąd odczytu danych z bazy !!!</div>');
		// localStorage.setItem("info/JTS", 'Błąd odczytu danych z bazy !!!');
		$.getScript("app/displayScores.js").done(function () {
			console.log(
				`Błąd odczytu wyników gracza: ${localStorage.getItem(
					"nick/JTS"
				)}   - displayScores.js`
			);
		});
		// console.log("Nie udało się odczytać wyników gracza.");
		// console.log(data.error);
	});
}
