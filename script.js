let x = 0, bomb = 0, boneSum = 0, game = 0;
var bgm = document.getElementById("bgm");
var playerData = [];

window.onload = loadPlayerData();
bomb = Math.floor(Math.random() * (boneSum*4));

function toggleSound() {
    console.log("TOGGLE SOUND");
    console.log(x);

    if (x == 0) {
        x = 1;
        console.log(x);
        document.getElementById("speaker").src="asset/speaker_mute.png";
        bgm.pause();

    } else if (x == 1) {
        x = 0;
        console.log(x);
        document.getElementById("speaker").src="asset/speaker_unmute.png";
        bgm.play();
    }
}

function loadPlayerData() {
    var playerDataTemp = localStorage.getItem("playerData");
    playerData = JSON.parse(playerDataTemp);

    console.log("[INFO] Successfully loaded playerData from index page!");
    console.log(playerData);
    document.getElementById("playAgain").style.visibility="hidden";
    document.getElementById("backTohome").style.visibility="hidden";
    document.getElementById("tutorial").style.visibility="hidden";
    
    boneCount();
    countdown();
}

function countdown() {
    var seconds = 10;
    function tick() {
        var counter = document.getElementById("counter");
        seconds--;
        console.log(seconds);

        if (game == 1) {
            clearTimeout(tick);
        }

        if (parseInt(seconds) == 5) {
            document.getElementById("tutorial").style.visibility = "visible";
            if (game != 1) {
                document.getElementById("tutorial").innerHTML = "Hurry up! <br> Time's almost up!";
            } 
        }
        
        counter.innerHTML = "0:" + (seconds < 10 ? "0" : "") + String(seconds);
        
        if (seconds > 0) {
            setTimeout(tick, 1000);
        } else {
            document.getElementById("dog-sleep").src = "/asset/dog_title.png";
            document.getElementById("dog-sleep").style.animation="zoom-in-zoom-out 2s infinite";
            document.getElementById("playAgain").style.visibility = "visible";
            document.getElementById("backTohome").style.visibility = "visible";
            document.getElementById("tutorial").style.visibility = "visible";
            document.getElementById("counter").style.visibility = "hidden";
            document.getElementById("turns").style.visibility = "hidden";

            if(parseInt(game) != 1) {
                document.getElementById("tutorial").innerHTML = "Steal Spike's Bones, <br> but don't wake him up!";
            }

            document.getElementById("left-bone-grid").style.visibility = "hidden";
            document.getElementById("right-bone-grid").style.visibility = "hidden";
            document.getElementById("upper-bone-grid").style.visibility = "hidden";
            document.getElementById("bottom-bone-grid").style.visibility = "hidden";
        }
    }
    tick();
}

function playHover() {
    const music = new Audio('/asset/mixkit-positive-interface-beep-221.wav');
    music.play();
}
function playAgain() {
    window.location.reload();
}

function backToHome() {
    window.location.href = "index.html";
}

function back() {
    window.location.href = "index.html";  
}

function boneCount() {
    var divLeft = document.getElementById("left-bone-grid");
    var divRight = document.getElementById("right-bone-grid");
    var divUpper = document.getElementById("upper-bone-grid");
    var divBottom = document.getElementById("bottom-bone-grid");    

    document.getElementById("left-bone-grid").style.visibility = "show";
    document.getElementById("right-bone-grid").style.visibility = "show";
    document.getElementById("upper-bone-grid").style.visibility = "show";
    document.getElementById("bottom-bone-grid").style.visibility = "show";
    document.getElementById("counter").style.visibility = "show";
    document.getElementById("turns").style.visibility = "show";

    if (playerData.length == 2) {
        boneSum = 4;
    } else if (playerData.length == 3) {
        boneSum = 5;
    } else if (playerData.length == 4) {
        boneSum = 6;
    }

    for (let i=0; i<boneSum; i++)  {
        var boneButton = document.createElement("button");
        boneButton.className = "bone";
        boneButton.id = i;
        boneButton.innerHTML = "<img src='/asset/bonee.png' width='60px' onmouseover='playHover(this)'>";
        boneButton.setAttribute("onClick", "bombCheck(this.id)");
        divLeft.appendChild(boneButton);

        var boneButton = document.createElement("button");
        boneButton.className = "bone";
        boneButton.id = boneSum + i;
        boneButton.innerHTML = "<img src='/asset/bonee.png' width='60px' onmouseover='playHover(this)'>";
        boneButton.setAttribute("onClick", "bombCheck(this.id)");
        divRight.appendChild(boneButton);

        var boneButton = document.createElement("button");
        boneButton.className = "bone-y";
        boneButton.id = boneSum*2 + i;
        boneButton.innerHTML = "<img src='/asset/bonee.png' width='60px' onmouseover='playHover(this)'>";
        boneButton.setAttribute("onClick", "bombCheck(this.id)");
        divBottom.appendChild(boneButton);

        var boneButton = document.createElement("button");
        boneButton.className = "bone-y";
        boneButton.id = boneSum*3 + i;
        boneButton.innerHTML = "<img src='/asset/bonee.png' width='60px' onmouseover='playHover(this)'>";
        boneButton.setAttribute("onClick", "bombCheck(this.id)");
        divUpper.appendChild(boneButton);
    }
}

function bombCheck(clicked) {
    if (bomb == clicked) {
        document.getElementById("dog-sleep").src = "/asset/dog_title.png";
        document.getElementById("dog-sleep").style.animation="zoom-in-zoom-out 2s infinite";
        document.getElementById("playAgain").style.visibility = "visible";
        document.getElementById("backTohome").style.visibility = "visible";
        document.getElementById("tutorial").style.visibility = "visible";
        document.getElementById("tutorial").innerHTML = "Oh no! You wake him up";
        game = 1;
        document.getElementById("counter").style.visibility = "hidden";
        document.getElementById("turns").style.visibility = "hidden";
        document.getElementById("left-bone-grid").style.visibility = "hidden";
        document.getElementById("right-bone-grid").style.visibility = "hidden";
        document.getElementById("upper-bone-grid").style.visibility = "hidden";
        document.getElementById("bottom-bone-grid").style.visibility = "hidden";
    } else {
        document.getElementById(clicked).style.visibility = "hidden";   
    }
}

var bgm = document.getElementById("bgm");

window.onload = function(){
    document.getElementById("bgm").play();
    document.getElementById("bgm").volume = 0.1;
}

