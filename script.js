console.log("Lets write Javascript")
let currentSongs = new Audio()
let songs;
let currFolder;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}
async function getsongs(folder) {
    currFolder = folder;
    let a = await fetch(`http://127.0.0.1:5500/${folder}/`)
    let responce = await a.text()
    let div = document.createElement("div")
    div.innerHTML = responce;
    let as = div.getElementsByTagName("a")
    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1])
        }
    }
    // Show all the songs in the playlist
    let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    songul.innerHTML = ""
    for (const song of songs) {
        songul.innerHTML = songul.innerHTML + `<li><img class="invert" src="music.svg" alt="">
                        <div class="info">
                            <div>${song.replaceAll("%20", " ")} </div>
                            <div>SST</div>
                        </div>
                        <div class="playnow">
                            <span>Play now</span>
                            <img class="invert" src="play.svg" alt="">
                        </div>
                        </li>`
    }

    // Attach an event listner to each song
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim())

        })
    })
    return songs
}

const playmusic = (track, pause = false) => {
    // let audio = new Audio("/songs/" + track)
    currentSongs.src = `/${currFolder}/` + track
    if (!pause) {
        currentSongs.play()
        play.src = "pause.svg"
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"


}

async function displayalbum() {
    let a = await fetch(`http://127.0.0.1:5500/songs/`)
    let responce = await a.text()
    let div = document.createElement("div")
    div.innerHTML = responce;
    let anchors = div.getElementsByTagName("a")
    Array.from(anchors).forEach(e => {
        if (e.href.includes("/songs")) {

        }
    })
}

async function main() {
    // Get the list of all songs
    await getsongs("songs/ncs")
    playmusic(songs[0], true)

    // Display all the album on the page
    displayalbum()

    // Attach an event listener to play, next and previous
    play.addEventListener("click", () => {
        if (currentSongs.paused) {
            currentSongs.play()
            play.src = "pause.svg"
        }
        else {
            currentSongs.pause()
            play.src = "play.svg"
        }
    })

    // Listen for timeupdate event
    currentSongs.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSongs.currentTime)} / ${secondsToMinutesSeconds(currentSongs.duration)}`
        document.querySelector(".circle").style.left = (currentSongs.currentTime / currentSongs.duration) * 100 + "%"
    })

    // Add event listner to seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
        document.querySelector(".circle").style.left = percent + "%"
        currentSongs.currentTime = ((currentSongs.duration) * percent) / 100
    })

    // Add an event listener for hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0"
    })

    // Add an event listener for close button
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%"
    })

    // Add an event listner to previous
    previous.addEventListener("click", () => {
        let index = songs.indexOf(currentSongs.src.split("/").slice(-1)[0])
        if ((index - 1) >= 0) {
            playmusic(songs[index - 1])
        }
    })

    // Add an event listner to next
    next.addEventListener("click", () => {
        let index = songs.indexOf(currentSongs.src.split("/").slice(-1)[0])
        if ((index + 1) > length) {
            playmusic(songs[index + 1])
        }
    })

    // Add an event to volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        currentSongs.volume = parseInt(e.target.value) / 100
    })

    // Load the playlist whenver the card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            songs = await getsongs(`songs/${item.currentTarget.dataset.folder}`)
            playmusic(songs[0])
        })
    })

    // dark mode
    var content = document.getElementsByClassName('right')[0];
    var darkMode = document.getElementById('dark-change');
    darkMode.addEventListener('click', function () {
        darkMode.classList.toggle('active');
        content.classList.toggle('night');
    })
    var content1 = document.getElementsByClassName('home')[0];
    var darkMode1 = document.getElementById('dark-change');
    darkMode1.addEventListener('click', function () {
        darkMode1.classList.toggle('active1');
        content1.classList.toggle('night1');
    })
    var content2 = document.getElementsByClassName('header')[0];
    var darkMode2 = document.getElementById('dark-change');
    darkMode1.addEventListener('click', function () {
        darkMode2.classList.toggle('active2');
        content2.classList.toggle('night2');
    })
    var content3 = document.getElementsByClassName('library')[0];
    var darkMode3 = document.getElementById('dark-change');
    darkMode3.addEventListener('click', function () {
        darkMode3.classList.toggle('active3');
        content3.classList.toggle('night3');
    })
    var content4 = document.getElementsByClassName('white')[0];
    var darkMode4 = document.getElementById('dark-change');
    darkMode4.addEventListener('click', function () {
        darkMode4.classList.toggle('active4');
        content4.classList.toggle('night4');
    })
    var content5 = document.getElementsByClassName('logo')[0];
    var darkMode5 = document.getElementById('dark-change');
    darkMode5.addEventListener('click', function () {
        darkMode5.classList.toggle('active5');
        content5.classList.toggle('night5');
    })
    var content6 = document.getElementsByClassName('black')[0];
    var darkMode6 = document.getElementById('dark-change');
    darkMode6.addEventListener('click', function () {
        darkMode6.classList.toggle('active6');
        content6.classList.toggle('night6');
    })
    var content7 = document.getElementsByClassName('green')[0];
    var darkMode7 = document.getElementById('dark-change');
    darkMode7.addEventListener('click', function () {
        darkMode7.classList.toggle('active7');
        content7.classList.toggle('night7');
    })
    var content8 = document.getElementsByClassName('yellow')[0];
    var darkMode8 = document.getElementById('dark-change');
    darkMode8.addEventListener('click', function () {
        darkMode8.classList.toggle('active8');
        content8.classList.toggle('night8');
    })

    // For social media icons
    document.getElementById('fb-share-button').onclick = function () {
        let url = window.location.href;  // Get the current page URL
        let fbShareUrl = "https://www.facebook.com/profile.php?id=100071950524975" + encodeURIComponent(url);  // Create the Facebook share URL
        window.open(fbShareUrl, 'facebook-share-dialog');  // Open the share dialog in a new window
        return false;  // Prevent the default link click behavior
    };

    document.getElementById('twitter-share-button').onclick = function() {
        let url = window.location.href;  // Get the current page URL
        let text = "Check out this awesome song!";  // The text for the tweet
        let twitterShareUrl = "https://twitter.com/TreasuryTu2714" + encodeURIComponent(text) + "&url=" + encodeURIComponent(url);  // Create the Twitter share URL
        window.open(twitterShareUrl, 'twitter-share-dialog');  // Open the share dialog in a new window
        return false;  // Prevent the default link click behavior
    };
    

    document.getElementById('instagram-share-button').onclick = function() {
        let url = window.location.href;  // Get the current page URL
        let text = "Check out this awesome song!";  // The text for the LinkedIn post
        let instagramShareUrl = "https://www.instagram.com/tune.treasury/" + encodeURIComponent(url);  // Create the Instagram share URL
        window.open(instagramShareUrl, 'instagram-share-dialog');  // Open the share dialog in a new window
        return false;  // Prevent the default link click behavior
    };

    // Add event listner to mute the track
    document.querySelector(".volume>img").addEventListener("click", e => {
        if (e.target.src.includes("volume.svg")) {
            e.target.src = e.target.src.replace("volume.svg", "mute.svg")
            currentSongs.volume = 0
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
        }
        else {
            e.target.src = e.target.src.replace("mute.svg", "volume.svg")
            currentSongs.volume = .10
            document.querySelector(".range").getElementsByTagName("input")[0].value = 50;
        }
    })
}

main()