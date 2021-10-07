const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const apiKey = config.SECRET_API_KEY;

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
    function tellMe(joke) {
        console.log('tell me:', joke);
        VoiceRSS.speech({
            key: apiKey,
            src: joke,
            hl: 'en-us',
            r: 0,
            c: 'mp3',
            f: '44khz_16bit_stereo',
            ssml: false
        });
    }
// Get Jokes from Joke API
async function getJokes() { 
    let joke = '';
    const apiURL = 'https://v2.jokeapi.dev/joke/Programming,Spooky?blacklistFlags=nsfw,religious,political,racist,sexist,explicit'
    try{
        const response = await fetch(apiURL);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text-to-Speech
        tellMe(joke);
        //Disable button
        toggleButton();
    } catch (err) {
        // Catch Errors Here
        console.log('Oops!', err);
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);