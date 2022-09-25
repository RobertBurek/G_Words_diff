<!DOCTYPE html>
<html lang="pl">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>G_Words diff</title>
    <script src="https://kit.fontawesome.com/1085229b76.js" crossorigin="anonymous"></script>
    <script>
        document.write('<link rel="stylesheet" href="css/style.css?ver=' + Math.floor(Math.random() * 1000) + '"\>');
    </script>
</head>

<body>
    <section id="gWords" class="g-words">
        <div id="titleGame" class="title-game">
            <h1 class="hide">JAKIE TO SŁOWO?</h1>
            <div class="title-letter half-success letter-transform-1">J</div>
            <div class="title-letter success letter-transform-2">A</div>
            <div class="title-letter not-char letter-transform-3">K</div>
            <div class="title-letter half-success letter-transform-4">I</div>
            <div class="title-letter success letter-transform-5">E</div>
            <div class="title-letter-space"></div>
            <div class="title-letter not-char letter-transform-6">T</div>
            <div class="title-letter success letter-transform-7">O</div>
            <div class="title-letter-space"></div>
            <div class="title-letter half-success letter-transform-8">S</div>
            <div class="title-letter not-char letter-transform-9">Ł</div>
            <div class="title-letter half-success letter-transform-10">O</div>
            <div class="title-letter success letter-transform-11">W</div>
            <div class="title-letter half-success letter-transform-12">O</div>
        </div>
        <div id="description" class="description">
            <p class="discription">Odgadnij słowo, w którym:
            <div class="title-div success"></div> - litera na właściwym miejscu,
            <div class="title-div half-success"></div> - litera występuje na innym miejscu,
            <div class="title-div not-char"></div> - litera nie występuje.</p>
        </div>
        <div id="wordGame" class="word-game">
            <div class="line current-round">
                <div class="one-letter current-letter"></div>
                <div class="one-letter"></div>
                <div class="one-letter"></div>
                <div class="one-letter"></div>
                <div class="one-letter"></div>
            </div>
            <div class="line">
                <div class="one-letter"></div>
                <div class="one-letter"></div>
                <div class="one-letter"></div>
                <div class="one-letter"></div>
                <div class="one-letter"></div>
            </div>
            <div class="line">
                <div class="one-letter"></div>
                <div class="one-letter"></div>
                <div class="one-letter"></div>
                <div class="one-letter"></div>
                <div class="one-letter"></div>
            </div>
            <div class="line">
                <div class="one-letter"></div>
                <div class="one-letter"></div>
                <div class="one-letter"></div>
                <div class="one-letter"></div>
                <div class="one-letter"></div>
            </div>
            <div class="line">
                <div class="one-letter"></div>
                <div class="one-letter"></div>
                <div class="one-letter"></div>
                <div class="one-letter"></div>
                <div class="one-letter"></div>
            </div>
            <div class="line">
                <div class="one-letter"></div>
                <div class="one-letter"></div>
                <div class="one-letter"></div>
                <div class="one-letter"></div>
                <div class="one-letter"></div>
            </div>
        </div>
        <div id="resultWord"></div>
        <div id="category" class="category">
            <p>KATEGORIA: ?</p>
            <div class="not-word hide">
                <p>Nie ma takiego słowa</p>
            </div>
        </div>
        <div class="what-category hide">
            <div class="what-category-btn" category>OSOBA</div>
            <div class="what-category-btn" category>RZECZ</div>
            <div class="what-category-btn" category>ROŚLINY</div>
            <div class="what-category-btn" category>MIEJSCE</div>
            <div class="what-category-btn" category>POJĘCIA</div>
            <div class="what-category-btn" category>ZWIERZĘTA</div>
            <div class="what-category-btn" category>ZJAWISKA</div>
            <div class="what-category-btn" category>CZYNNOŚCI</div>
        </div>
        <div id="letters" class="letters">
            <div class="above only-words">
                <p>Tylko istniejące słowa</p>
            </div>
            <div id="onceAgain" class="above once-again hide">
                <div>Jeszcze raz?</div>
            </div>
            <div id="saveScore" class="above save-score hide">
                <div logging>Zapisz wynik</div>
            </div>
            <div id="keyboard1" class="keyboard1">
                <button class="normal">A</button><button class="normal">Ą</button><button class="normal">B</button><button class="normal">C</button><button class="normal">Ć</button><button class="normal">D</button><button class="normal">E</button><button class="normal">Ę</button><button class="normal">F</button><button class="normal">G</button>
            </div>
            <div id="keyboard2" class="keyboard2">
                <button class="normal">H</button><button class="normal">I</button><button class="normal">J</button><button class="normal">K</button><button class="normal">L</button><button class="normal">Ł</button><button class="normal">M</button><button class="normal">N</button><button class="normal">Ń</button>
            </div>
            <div id="keyboard3" class="keyboard3">
                <div id="keyboardScheme" class="keyboard-scheme"><i class="fas fa-keyboard" aria-hidden="true"></i>
                </div><button class="normal">O</button><button class="normal">Ó</button><button class="normal">P</button><button class="normal">Q</button><button class="normal">R</button><button class="normal">S</button><button class="normal">Ś</button>
                <div class="back-space"><i class="fas fa-long-arrow-alt-left" aria-hidden="true"></i></div>
            </div>
            <div id="keyboard4" class="keyboard4"><button class="normal">T</button><button class="normal">U</button><button class="normal">V</button><button class="normal">W</button><button class="normal">X</button><button class="normal">Y</button><button class="normal">Z</button><button class="normal">Ź</button><button class="normal">Ż</button>
            </div>
        </div>

        <div class="dropdown">
            <div class="dropdown-option">
                <div class="dropdown-box">
                    <button id='longWord' class="dropdown-btn">
                        <i class="fas fa-sort-amount-down-alt" dropdown></i>
                        Długość słowa <div class="dropdown-note" dropdown>(5-literowe)</div>
                    </button>
                    <div class="dropdown-info">
                        <div id="5letters" class="setting-letter">5-literowe</div>
                        <div id="6letters" class="setting-letter">6-literowe</div>
                        <div id="7letters" class="setting-letter">7-literowe</div>
                        <div id="8letters" class="setting-letter">8-literowe</div>
                        <div id="9letters" class="setting-letter">9-literowe</div>
                    </div>
                </div>
                <div class="dropdown-box">
                    <button id='filling' class="dropdown-btn">
                        <i class="fas fa-digital-tachograph" dropdown></i>
                        Wypełnianie<div class="dropdown-note" dropdown>(tylko istniejące słowa)</div>
                    </button>
                    <div class="dropdown-info">
                        <div id="onlyWords" class="setting-letter">tylko istniejące słowa</div>
                        <div id="stringChars" class="setting-letter">dowolny ciąg liter</div>
                    </div>
                </div>
                <div class="dropdown-box">
                    <button id="logging" class="dropdown-btn">
                        <i class="fas fa-sign-in-alt" dropdown></i>
                        Logowanie <div class="dropdown-note" dropdown>(rejestracja)</div>
                    </button>
                    <div class="dropdown-info">
                        <div class="logging" name="contacts" logging>
                            <label class="dropdown-login" logging>Nazwa (login):
                                <input type="text" name="nick" placeholder="" logging></label>
                            <label class="dropdown-password" logging>Hasło:
                                <input type="password" name="password" placeholder="" logging></label>
                            <div id="lower">
                                <button class="normal reg-log-btn register-btn">Rejestruj</button>
                                <button class="normal reg-log-btn login-btn">Zaloguj</button>
                            </div>
                        </div>
                        <div class="logging hide" name="results" logging>
                            <div class="results">
                            <div class="result-letter">5-literowych słów: <strong> 0 </strong></div>
                            <div class="result-letter">6-literowych słów: <strong> 0 </strong></div>
                            <div class="result-letter">7-literowych słów: <strong> 0 </strong></div>
                            <div class="result-letter">8-literowych słów: <strong> 0 </strong></div>
                            <div class="result-letter">9-literowych słów: <strong> 0 </strong></div>
                            </div>
                            <div class="logging" logging>
                                <div id="lower">
                                    <button class="normal reg-log-btn logout-btn">Wyloguj</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="dropdown-box">
                    <button class="dropdown-btn">
                        <i class="fas fa-chalkboard-teacher" dropdown></i>
                        Zasady gry <div class="dropdown-note" dropdown>(instrukcja)</div>
                    </button>
                    <div class="dropdown-info">
                        <p>Gra polega na odgadnięciu kilkuliterowego słowa (np. 5-literowego). Gracz dostaje sześć
                            szans, a za każdą nieudaną próbą gra informuje,
                            czy użyte w danym podejściu litery:</p>
                        <p> - znajdują się w odgadywanym słowie w odpowiednim miejscu (kolor zielony);</p>
                        <p> - znajdują się w odgadywanym słowie, ale w innym miejscu (kolor żółty);</p>
                        <p> - nie znajdują się w odgadywanym słowie (kolor szary).</p>
                        <p> Gracz może zmienić długość odgadywanego słowa.
                            Poza tym może wybrać, czy wpisywać będzie tylko istniejące słowa, czy dowolny ciąg liter.
                        </p>
                    </div>
                </div>
                <div class="result"></div>
            </div>
        </div>
    </section>
    <section class='implementation'>
        <p>Subiektywna implementacja gry WORDLE</p>
    </section>
    <footer id="footer" class="footer-section">
        <div class="footer-text">
            <a href="http://robertburek.pl" target="_blank" rel="noopener noreferrer">
                <p>&copy; 2022 Robert Burek</p>
            </a>
        </div>
    </footer>

    <script src="./app/jquery.min.js"></script>
    <script>
        document.write('<script src="./app/appGame.js?ver=' + Math.floor(Math.random() * 10000) + '" type="module"\><\/script>');
    </script>
    <script>
        document.write('<script src="./app/dropdown.js?ver=' + Math.floor(Math.random() * 10000) + '" type="module"\><\/script>');
    </script>
</body>

</html>