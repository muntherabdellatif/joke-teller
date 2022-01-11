const Btn = document.getElementById("button");
const audioElement =document.getElementById("audio");
const voiceRssApiKey ="6286993225644797b4f6fa39d46dd15c";
let jokeURL = "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit"

// passing the joke to VoiceRSS Api

function tellMyJoke (joke){
    VoiceRSS.speech({
        key:voiceRssApiKey,
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// get joke from joke Api
async function getJoke() {
    toggleButton();
    let joke="";
    try{
        let responce = await fetch(jokeURL);
        let data =await responce.json();
        if (data.setup) {
            joke =`${data.setup} .... ${data.delivery}`;
        }
        else {
            joke = data.joke ;
        }
        tellMyJoke(joke);
    }catch (error) {
        console.log(error)
    }
}

function toggleButton () {
    Btn.disabled = !(Btn.disabled)
}

Btn.addEventListener("click",getJoke);
audioElement.addEventListener("ended",toggleButton);
