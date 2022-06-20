const registerBtn = document.querySelector('.register-btn');
const inputNick = document.querySelector("[name='nick']");

registerBtn.addEventListener('click', ()=>{
    // console.log(loginBtn);
    // console.log(inputNick.value);
    // console.log(inputPassword.value);
    const dataLogin = {Nick: inputNick.value}
    $.post( "./php/register.php", dataLogin
    , function(data) {
        // alert( "OK - odczyt / zapis do bazy" );
        // console.log(data.name);
        console.log('Wylogowano: ' + data.nick);
    }, "json")
    .fail(function() {
        alert( "Błąd reakcji z register.php" );
    }
);
})