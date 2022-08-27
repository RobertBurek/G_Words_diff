$.post(
    "./php/readResultsPlayerWithBaseSQL.php",
    { nameTable: localStorage.getItem('nameTable/JTS')},
    function (dataSQL) {
      console.log('jestem w readScores.js');
      console.log(dataSQL);
      localStorage.setItem("result5/JTS", dataSQL.result5);
      localStorage.setItem("result6/JTS", dataSQL.result6);
      localStorage.setItem("result7/JTS", dataSQL.result7);
      localStorage.setItem("result8/JTS", dataSQL.result8);
      localStorage.setItem("result9/JTS", dataSQL.result9);
    },
    "json"
  ).fail(function (data) {
    console.log('nie udało się odczyta wyników gracza');
  });