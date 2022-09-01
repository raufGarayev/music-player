const title = document.getElementById('title')
const artist = document.getElementById('artist')
const music = document.querySelector('audio')

const playBtn = document.getElementById('play')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')

const durationEl = document.getElementById('duration')
const current = document.getElementById('current')
const progress = document.getElementById('progress')
const progressCont = document.getElementById('progress-cont')

const menubtn = document.getElementById('menubtn');
const sideBar = document.getElementById('mySidenav')

let currentlyPlaying


const songs = [
    {
        name: 'Biri var',
        displayName: 'Biri var',
        artist: 'Hiss'
    },
    {
        name: 'İstəmirəm',
        displayName: 'İstəmirəm',
        artist: 'Hiss'
    },
    {
        name: 'Sayıram',
        displayName: 'Sayıram',
        artist: 'Hiss'
    }
]

let isPlaying = false


function playSong() {
    isPlaying = true

    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>'

    music.play()
}

function pauseSong() {
    isPlaying = false

    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>'

    music.pause()
}

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()))
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)


function loadSong(song) {

    title.textContent = song.displayName
    artist.textContent = song.artist
    music.src = `music/${song.name}.mp3`

    currentlyPlaying = song.displayName
}

let songIndex = 0

function prevSong() {
    songIndex--

    if(songIndex<0) {
        songIndex = songs.length -1
    }

    loadSong(songs[songIndex])
    playSong()
}

function nextSong() {
    songIndex++

    if(songIndex == songs.length) {
        songIndex = 0
    }

    loadSong(songs[songIndex])
    playSong()
}

loadSong(songs[songIndex])

music.addEventListener('ended', nextSong)

function updateProgress(e) {
    if(isPlaying) {

        const {duration, currentTime} = e.srcElement

        const progressPercent = (currentTime/duration)*100
        progress.style.width = `${progressPercent}%`

        //calculate display

        const durationMins = Math.floor(duration/60)
        let durationSecs =  Math.floor(duration%60)

        if(durationSecs<10) {
            durationSecs = `0${durationSecs}`
        }

        if(durationSecs) {
            durationEl.textContent = `${durationMins}:${durationSecs}`
        }

        const currentMinutes = Math.floor(currentTime/60)
        let currentSecs = Math.floor(currentTime%60)

        if(currentSecs<10) {
            currentSecs = `0${currentSecs}`
        }

        current.textContent = `${currentMinutes}:${currentSecs}`
    }
}

function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX

    const {duration} = music

    music.currentTime = (clickX/width) * duration
}

music.addEventListener('timeupdate', updateProgress)
progressCont.addEventListener('click', setProgress)

menubtn.addEventListener('click', animateSidebar)
let opened = false


function animateSidebar() {
    if(opened) {
        closeNav()
    } else {
        openNav()
    }
}

function openNav(e) {
    opened = true
    sideBar.style.width = "250px";
    
    sideBar.innerHTML = '<a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>'

    for(i=0; i<songs.length; i++) {
        sideBar.innerHTML += `<p id="${[i]}" class="songsbtn">${songs[i].artist} - ${songs[i].displayName}</p><div class="hrt"></div>`
    }

    const menusongs = document.querySelectorAll('.songsbtn')
    menusongs.forEach(btn => {
        btn.addEventListener('click', something)
    });

    if(isPlaying) {
        console.log(currentlyPlaying)
    }
}


function something(e) {
    const clickedEl = e.target

    loadSong(songs[clickedEl.id])
    playSong()
    
    const menusongs = document.querySelectorAll('.songsbtn')

    for (let index = 0; index < menusongs.length; index++) {
        menusongs[index].style.color = "#fff"
    }

    clickedEl.style.color = "green"
}
function closeNav() {
    opened = false
    sideBar.style.width = "0";

    sideBar.innerHTML = ""
}