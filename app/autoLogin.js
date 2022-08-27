const loggingButton = document.getElementById("logging");
// const loggingDivInfo = document.querySelector(".logging").parentNode;

console.log(localStorage.getItem('nick/JTS'));

$.getScript("app/readScores.js")
.done(function () {
    console.log("Odczyt wyników gracza  readScores.js");
});

if ((localStorage.getItem('nick/JTS') != '')&&(localStorage.getItem('nick/JTS'))) {
    loggingButton.innerHTML = 
        `<i class="fas fa-sign-in-alt" dropdown></i>
        Witaj ${localStorage.getItem('nick/JTS')} ! <div class="dropdown-note" dropdown> (twoje wyniki) </div>`;

    // loggingDivInfo.innerHTML = `
    // <div class="result-letter">` + localStorage.getItem('result5/JTS') + ` odgadniętych 5-lit. słów </div>
    // <div class="result-letter">` + localStorage.getItem('result6/JTS') + ` odgadniętych 6-lit. słów </div>
    // <div class="result-letter">` + localStorage.getItem('result7/JTS') + ` odgadniętych 7-lit. słów </div>
    // <div class="result-letter">` + localStorage.getItem('result8/JTS') + ` odgadniętych 8-lit. słów </div>
    // <div class="result-letter">` + localStorage.getItem('result9/JTS') + ` odgadniętych 9-lit. słów </div>
    //      <div class="logging" logging>
    //         <div id="lower">
    //             <button class="normal reg-log-btn logout-btn">Wyloguj</button>
    //         </div>
    //      </div>`;
    // $.getScript("app/logout.js")
    // .done(function () {
    //     console.log("inicjacja logout");
    // // })
    // // .fail(function () {
    // // 	console.log("coś poszło nie tak w autoLogin");
    // });

    $.getScript("app/displayScores.js")
    .done(function (data) {
        console.log("Wyświetlanie wyników gracza  displayScores.js");
        console.log(data);
    });


    console.log("jest jakiś nick");
} else {

}

console.log("jestem w autoLoginie.js");