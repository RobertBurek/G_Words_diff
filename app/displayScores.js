const loggingDivInfo = document.querySelector(".logging").parentNode;


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
    console.log("inicjacja logout");
// })
// .fail(function () {
// 	console.log("coś poszło nie tak w autoLogin");
});