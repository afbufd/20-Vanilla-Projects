const video = document.getElementById('video');
const play = document.getElementById('play');
const stopEvent = document.getElementById('stop');
const progress = document.getElementById('progress')
const timestamp = document.getElementById('timestamp');

let isScrubbing = false;

function formatTime(time) {
    const mins = String(Math.floor(time/60)).padStart(2,'0');
    const secs = String(Math.floor(time%60)).padStart(2,'0');
    return `${mins}:${secs}`;
}

// Play & Pause video
function toggleVideoStatus() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// Update play/pause icon
function updatePlayIcon() {
    play.innerHTML = video.paused ?
        '<i class="fa fa-play fa-2x"></i>' :
        '<i class="fa fa-pause fa-2x"></i>';
}

// Update progress & timestamp
function updateProgress() {
    if (isScrubbing) return;
    progress.value = video.currentTime;
    timestamp.innerHTML = formatTime(video.currentTime);
}

video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('loadedmetadata', () => {
    // To drag input to the end
    progress.max = video.duration;
});

play.addEventListener('click', toggleVideoStatus);

progress.addEventListener('input', () => {
    isScrubbing = true;
    video.currentTime = progress.value;
    timestamp.innerHTML = formatTime(progress.value);
})

progress.addEventListener('change', () => {
    isScrubbing = false;
});

