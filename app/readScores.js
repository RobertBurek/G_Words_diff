$.post(
    "./php/readResultsPlayerWithBaseSQL.php",
    { nameTable: localStorage.getItem('nameTable/JTS')},
    function (dataSQL) {
      console.log('jestem w readScores.js');
      console.log(dataSQL);
    },
    "json"
  ).fail(function (data) {
    console.log('nie udało się odczyta wyników gracza');
  });