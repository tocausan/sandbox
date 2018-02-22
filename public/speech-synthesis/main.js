// hands in the dirt
var container = document.getElementsByClassName('container')[0],
    pauseBtn = document.getElementsByClassName('pauseBtn')[0],
    resumeBtn = document.getElementsByClassName('resumeBtn')[0],
    stopBtn = document.getElementsByClassName('stopBtn')[0],
    list = document.getElementsByClassName('list')[0],
    items = [
        { text: "hi" },
        { text: "hello" },
        { text: "good morning" },
        { text: "how are you ?" },
        { text: "fine" },
        { text: "and you ?" },
        { text: "very well" },
        { text: "what is your name ?" },
        { text: "my name is" },
        { text: "tomas" },
        { text: "interesting" },
        { text: "no" },
        { text: "yes" },
        { text: "absolutely" },
        { text: "very" },
        { text: "anyway" },
        { text: "whatever" },
        { text: "i like" },
        { text: "flowers" },
        { text: "trees" },
        { text: "clouds" },
        { text: "sun" },
        { text: "nice to meet you" },
        { text: "me too" },
        { text: "excellent" },
        { text: "i love the smell of napalm in the morning" },
    ],
    speechPause = function() { window.speechSynthesis.pause(); },
    speechStop = function() { window.speechSynthesis.stop(); },
    speechResume = function() { window.speechSynthesis.resume(); },
    speechCancel = function() { window.speechSynthesis.cancel(); },
    speechMe = function(elem) {
        elem.style.backgroundColor = "rgba(100,100,100,.1)";    //style

        var text = elem.innerHTML,
            msg = new SpeechSynthesisUtterance(),
            voices = window.speechSynthesis.getVoices();
        msg.voice = voices[0]; // Note: some voices don't support altering params
        msg.voiceURI = 'native';
        msg.volume = 2; // 0 to 1
        msg.rate = .1; // 0.1 to 10
        msg.pitch = 2; //0 to 2
        msg.text = text;
        msg.lang = 'en-US';
        msg.onend = function(e) {
            elem.style.backgroundColor = "rgba(100,100,100,0)";
        };
        speechSynthesis.speak(msg);
    };

// constructor
(function() {
    // browser support
    !'speechSynthesis' in window ?
        container.innerHTML = "Your browser doesn't support SpeechSinthesis !" : null;

    // cancel any previous speechSynthesis
    speechCancel();

    // add items to list
    for(i in items) {
        var elem = document.createElement("div");
        elem.setAttribute("class", "speech");
        elem.setAttribute("onclick", "speechMe(this)");
        elem.innerHTML = items[i].text;
        list.appendChild(elem);

    }
})()