const soundList = [
    "tyrtumpyrtum.mp3", "monalisa.mp3", "berlin.mp3", "wino.mp3",
    "wozy.mp3", "malpa.mp3", "pilka.mp3", "cztery.mp3",
    "tadek.mp3", "drzyz.mp3", "kaczki.mp3", "enter.mp3",
    "budzik.mp3", "ufo.mp3", "jasiu.mp3", "rymcymcym.mp3",
    "emeryt.mp3", "audi.mp3", "stach.mp3", "wagoniki.mp3",
    "pierdolamento.mp3", "bratanki.mp3", "faza.mp3", "jagiello.mp3",
    "waldek.mp3", "heweliusz.mp3", "dziewczyny.mp3", "hlup.mp3",
    "rymcim.mp3", "umciaumcia.mp3", "wiwacik.mp3", "bumcykcyk.mp3",
    "maluszek.mp3", "faza.mp3"
];

let score = 0;
let playing = false;
let playedSounds = [];
let currentSound = null;

const playRandomButton = document.getElementById('playRandom');
const scoreElement = document.getElementById('score');
const promilLabel = document.getElementById('promilLabel');
const playIcon = document.getElementById('playIcon');

playRandomButton.addEventListener('click', playRandomSound);

function playRandomSound() {
    if (playing) {
        return;
    }

    playing = true;

    if (playedSounds.length === 0) {
        playedSounds = shuffleArray([...soundList]);
    }

    const soundFileName = playedSounds.pop();
    currentSound = new Audio('sounds/' + soundFileName); 

    playIcon.style.display = 'inline';

    currentSound.volume = volumeSlider.value;
    currentSound.play();
    currentSound.onended = function () {
        playing = false;
        playIcon.style.display = 'none';
        currentSound = null; 
    };
    score++;
    scoreElement.textContent = score;
    updatePromilLabel(score);
}


function updatePromilLabel(score) {
    if (score <= 5) {
        promilLabel.textContent = "Stan: Trzeźwy";
    } else if (score <= 10) {
        promilLabel.textContent = "Stan: Trzeba skoczyć po drugą flaszkę";
    } else if (score <= 15) {
        promilLabel.textContent = "Stan: Pijany";
    } else if (score <= 25) {
        promilLabel.textContent = "Stan: Urwany film";
    } else if (score === 26) {
        promilLabel.textContent = "Stan: Zamów Ubera";
    } else {
        promilLabel.textContent = "Stan: Wytrzeźwiałka";
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const volumeSlider = document.getElementById('volumeSlider');

volumeSlider.addEventListener('input', adjustVolume);
volumeSlider.addEventListener('touchmove', adjustVolume);

function adjustVolume() {
    if (currentSound) {
        currentSound.volume = volumeSlider.value;
    }
}