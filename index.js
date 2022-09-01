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