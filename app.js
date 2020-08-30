const overlay = document.getElementById("overlay");
const qwerty = document.getElementById("qwerty");
let phrase = document.getElementById("phrase");
let correct = 0;
let missed = 0;
const startButton = document.querySelector("a.btn__reset");
const phrases = [ 'bean burrito','tarntula', 'jumping spider', 'brown bear', 'salmon', 'bald eagle'];
let letters = 0;
const buttons = document.querySelectorAll("BUTTON");
const hearts = document.querySelectorAll("li.tries");


//      Select and create phrase        //

function addPhrasetoDisplay (n) {
    function getRandomPhrasesAsArray(arr) {
    let chosenPhrase = arr[Math.floor(Math.random() * arr.length)];
    return chosenPhrase;
    };
    var Chosenphrase = getRandomPhrasesAsArray(n);
    var characters = Chosenphrase.split("");
    for ( let i = 0; i < characters.length; i ++){
        const li = document.createElement("LI");
        const ul = document.getElementById("phrase").firstElementChild;
        ul.appendChild(li);
        li.innerHTML = characters[i];
        if (characters[i] === " ") {
            li.classList.add("space");
        } else {
            li.classList.add("letter");
        }  
    }
};

//      start/reset button      //
startButton.addEventListener("click", () => {
    const ul = document.getElementById("phrase").firstElementChild;
    overlay.style.display = "none";
    for(var i = 0; i < hearts.length; i++){
        hearts[i].style.visibility = "visible";
    }
    for(var i = 0; i < buttons.length; i++){
        buttons[i].disabled = false;
    }
    correct = 0;
    missed = 0;
    ul.innerHTML = "";
    addPhrasetoDisplay(phrases);
    letters = document.querySelectorAll("li.letter");
});

//      check letter        //
function checkLetter(n) {
    let guess = 0;
    for ( let i = 0; i < letters.length; i ++) {
        if (letters[i].textContent == n) {
            letters[i].classList.add("show");
            guess = true;
            correct += 1;
        } 
    } 
    if ( guess == true) {
        return true;
    } else {
        return null;
    }
};

//      Button click and Win/Lose functions     //
qwerty.addEventListener("click", () => {
    if( event.target.tagName == "BUTTON" ) {
        let button = event.target;
        let clickedLetter = event.target.textContent;
        let check = checkLetter(clickedLetter);
        if (check == null) {
            hearts[missed].style.visibility = "hidden";
            missed += 1;
        }  
        if( correct == letters.length ) {
        document.getElementById("overlay").className = "win";
        document.getElementById("overlay").style.display = "flex";
        } else if (missed == 5) {
        document.getElementById("overlay").className = "lose";
        document.getElementById("overlay").style.display = "flex";
        }
        button.disabled = true; 
    } 
} );




