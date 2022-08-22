const loggingButton = document.getElementById("logging");
const loggingDivInfo = document.querySelector(".logging").parentNode;

console.log(localStorage.getItem('nick/JTS'));

if ((localStorage.getItem('nick/JTS') != '')&&(localStorage.getItem('nick/JTS'))) {
    loggingButton.innerHTML = 
        `<i class="fas fa-sign-in-alt" dropdown></i>
        Witaj ${localStorage.getItem('nick/JTS')} ! <div class="dropdown-note" dropdown> (twoje wyniki) </div>`;

    loggingDivInfo.innerHTML = 
        `<div class="result-letter">0 odgadniętych 5-lit. słów </div>
         <div class="result-letter">0 odgadniętych 6-lit. słów </div>
         <div class="result-letter">0 odgadniętych 7-lit. słów </div>
         <div class="result-letter">0 odgadniętych 8-lit. słów </div>
         <div class="result-letter">0 odgadniętych 9-lit. słów </div>
         <div class="logging" logging>
            <div id="lower">
                <button class="normal reg-log-btn logout-btn">Wyloguj</button>
            </div>
         </div>`;
    $.getScript("app/logout.js")
    .done(function () {
        console.log("inicjacja logout");
    // })
    // .fail(function () {
    // 	console.log("coś poszło nie tak w autoLogin");
    });
    console.log("jest jakiś nick");
} else {

}

console.log("jestem w autoLoginie.js");