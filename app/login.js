const loginBtn = document.querySelector('.login-btn');
const inputNick = document.querySelector("[name='nick']");
const inputPassword = document.querySelector("[name='password']");
// console.log(loginBtn);

loginBtn.addEventListener('click', ()=>{
    // console.log(loginBtn);
    // console.log(inputNick.value);
    // console.log(inputPassword.value);
    const dataLogin = {Nick: inputNick.value, Password: inputPassword.value}
    $.post( "./php/login.php", dataLogin
    , function(data) {
        // alert( "OK - odczyt / zapis do bazy" );
        // console.log(data.name);
        console.log(data.result);
    }, "json")
    .fail(function() {
        alert( "Błąd odczytu z bazy" );
    }
);
})

// $.post( "./php/logout.php", function(data) {
//     // alert( "OK - odczyt / zapis do bazy" );
//     // console.log(data.name);
//     // console.log(data);
//     // let element = data.querySelector("a");
//     console.log(data);
//     $( ".result" ).html( "STRONA:  \n"+data );
// })
// .fail(function() {
//     alert( "Błąd odczytu z bazy" );
// }
// );

