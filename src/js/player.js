/* ============================================
   SPOTIFY CLONE - PLAYER FUNCTIONALITY
   ============================================ */

// Player elements
const audio = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");
const currentSong = document.getElementById("currentSong");
const currentArtist = document.getElementById("currentArtist");
const progressFill = document.getElementById("progressFill");
const volumeFill = document.getElementById("volumeFill");
const currentTimeEl = document.getElementById("currentTime");
const totalTimeEl = document.getElementById("totalTime");
const progressBar = document.getElementById("progressBar");
const volumeBar = document.getElementById("volumeBar");

let currentTrackIndex = 0;

/**
 * Play a track by index
 */
function playTrack(index) {
    currentTrackIndex = index;
    const track = tracks[index];

    audio.src = track.src;
    audio.play();

    currentSong.textContent = track.title;
    currentArtist.textContent = track.artist;
    playPauseBtn.textContent = "⏸️";
    
    // Save to cache
    saveLastPlayedTrack(index, track);
    savePlaybackState(index, 0, true);
    addToPlayHistory(index, track);
    
    // Add playing animation
    document.querySelectorAll('.track-card').forEach((card, idx) => {
        if (idx === index) {
            card.classList.add('playing');
        } else {
            card.classList.remove('playing');
        }
    });
    
    // Update total time
    totalTimeEl.textContent = formatTime(audio.duration);
}

/**
 * Play next track
 */
function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    playTrack(currentTrackIndex);
}

/**
 * Play previous track
 */
function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    playTrack(currentTrackIndex);
}

/**
 * Initialize player controls
 */
function initializePlayer() {
    // Play/Pause button
    playPauseBtn.onclick = () => {
        if (!audio.src) return;
        if (audio.paused) {
            audio.play();
            playPauseBtn.textContent = "⏸️";
            savePlaybackState(currentTrackIndex, audio.currentTime, true);
        } else {
            audio.pause();
            playPauseBtn.textContent = "▶️";
            savePlaybackState(currentTrackIndex, audio.currentTime, false);
        }
    };

    // Next/Previous buttons
    document.getElementById('nextBtn').addEventListener('click', nextTrack);
    document.getElementById('prevBtn').addEventListener('click', prevTrack);

    // Shuffle button
    document.getElementById('shuffleBtn').addEventListener('click', (e) => {
        e.target.style.color = e.target.style.color === 'rgb(29, 185, 84)' ? 'white' : '#1db954';
    });

    // Repeat button
    document.getElementById('repeatBtn').addEventListener('click', (e) => {
        e.target.style.color = e.target.style.color === 'rgb(29, 185, 84)' ? 'white' : '#1db954';
    });

    // Progress bar update
    audio.addEventListener("timeupdate", () => {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = percent + "%";
        currentTimeEl.textContent = formatTime(audio.currentTime);
        totalTimeEl.textContent = formatTime(audio.duration);
        
        // Save playback state every second
        if (Math.floor(audio.currentTime) % 1 === 0) {
            savePlaybackState(currentTrackIndex, audio.currentTime, !audio.paused);
        }
    });

    // Progress bar click to seek
    progressBar.onclick = e => {
        const bar = e.currentTarget;
        audio.currentTime = (e.offsetX / bar.clientWidth) * audio.duration;
        savePlaybackState(currentTrackIndex, audio.currentTime, !audio.paused);
    };

    // Volume bar
    volumeBar.onclick = e => {
        const bar = e.currentTarget;
        const vol = e.offsetX / bar.clientWidth;
        audio.volume = vol;
        volumeFill.style.width = vol * 100 + "%";
    };

    // Auto play next track when current ends
    audio.addEventListener("ended", nextTrack);

    // Save state before page unload
    window.addEventListener('beforeunload', () => {
        if (audio.src) {
            savePlaybackState(currentTrackIndex, audio.currentTime, !audio.paused);
        }
    });
}

/**
 * Restore playback state on app load
 */
function restorePlaybackState() {
    const savedState = getPlaybackState();
    
    if (savedState && savedState.trackIndex >= 0 && savedState.trackIndex < tracks.length) {
        const track = tracks[savedState.trackIndex];
        currentTrackIndex = savedState.trackIndex;
        
        currentSong.textContent = track.title;
        currentArtist.textContent = track.artist;
        audio.src = track.src;
        audio.currentTime = savedState.currentTime;
        
        if (savedState.isPlaying) {
            playPauseBtn.textContent = "⏸️";
        } else {
            playPauseBtn.textContent = "▶️";
        }
        
        console.log('✅ Restored last played track:', track.title, `(${formatTime(savedState.currentTime)} / ${track.duration})`);
    } else {
        const lastPlayed = getLastPlayedTrack();
        if (lastPlayed) {
            console.log('📚 Last played track cached:', lastPlayed.title);
            currentSong.textContent = lastPlayed.title;
            currentArtist.textContent = lastPlayed.artist;
        }
    }
}
