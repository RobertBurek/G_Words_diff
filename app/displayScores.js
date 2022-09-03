const loggingDivInfo = document.querySelector(".logging").parentNode;


loggingDivInfo.innerHTML = `
${localStorage.getItem("info/JTS")}
<div class="result-letter">5-literowych słów: <strong> ${localStorage.getItem('result5/JTS')} </strong></div> 
<div class="result-letter">6-literowych słów: <strong> ${localStorage.getItem('result6/JTS')} </strong></div> 
<div class="result-letter">7-literowych słów: <strong> ${localStorage.getItem('result7/JTS')} </strong></div> 
<div class="result-letter">8-literowych słów: <strong> ${localStorage.getItem('result8/JTS')} </strong></div> 
<div class="result-letter">9-literowych słów: <strong> ${localStorage.getItem('result9/JTS')} </strong></div> 
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

// localStorage.removeItem("info/JTS");
localStorage.setItem("info/JTS", "");