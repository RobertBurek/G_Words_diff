const registerBtn = document.querySelector(".register-btn");
const inputNick = document.querySelector("[name='nick']");
const inputPassword = document.querySelector("[name='password']");
const loggingButton = document.getElementById("logging");
const loggingDivInfo = document.querySelector(".logging").parentNode;
console.log(loggingDivInfo);
// const parentLoggingButton = loggingButton.parentNode;
// const nextSiblingLoggingButton = parentLoggingButton.nextSibling;
// console.log(parentLoggingButton);
// console.log(nextSiblingLoggingButton);

try {
	registerBtn.addEventListener("click", () => {
		// console.log(loginBtn);
		// console.log(inputNick.value);
		// console.log(inputPassword.value);
		const dataRegister = { Nick: inputNick.value,  Password: inputPassword.value };
		$.post(
			"./php/register.php",
			dataRegister,
			function (data) {
				// alert( "OK - odczyt / zapis do bazy" );
                if (!data.error) { 
				console.log('dane z rejestracji: ', data);
				console.log("Zarejestrowano nowego gracza: " + data.nick);
                localStorage.setItem('nick/JTS',data.nick);
				// console.log("Zarejestrowano nowego gracza: " + data.date);
				console.log("Zarejestrowano nowego gracza: " + data.nameTable);
                localStorage.setItem('nameTable/JTS',data.nameTable);

                loggingButton.innerHTML = 
                    `<i class="fas fa-sign-in-alt" dropdown></i>
                    Witaj ${data.nick} ! <div class="dropdown-note" dropdown> (twoje wyniki) </div>`;

                } else {
                    console.log(data.error +" -> " + data.nick); 
                    loggingDivInfo.classList.add('dropdown-active');
                    loggingButton.innerHTML = 
                    // `<i class="fas fa-digital-tachograph" dropdown></i> 
                    // Wypełnianie <div class="dropdown-note" dropdown>${titleButtonFilling}</div>`;
                
                    `<i class="fas fa-sign-in-alt" dropdown></i>
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
		console.log("registerBtn - is not defined");
	}
}

// registerBtn.addEventListener('click', ()=>{
//     // console.log(loginBtn);
//     // console.log(inputNick.value);
//     // console.log(inputPassword.value);
//     const dataLogin = {Nick: inputNick.value}
//     $.post( "./php/register.php", dataLogin
//     , function(data) {
//         // alert( "OK - odczyt / zapis do bazy" );
//         // console.log(data.name);
//         console.log('Wylogowano: ' + data.nick);
//     }, "json")
//     .fail(function() {
//         alert( "Błąd reakcji z register.php" );
//     }
// );
// })
