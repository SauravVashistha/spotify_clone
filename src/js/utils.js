/* ============================================
   SPOTIFY CLONE - UTILITY FUNCTIONS
   ============================================ */

/**
 * Format time in seconds to MM:SS format
 */
function formatTime(sec) {
    if (!sec) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
}

/**
 * Get random songs from tracks array
 */
function getRandomTracks(count) {
    const shuffled = [...tracks].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

/**
 * Render a track card HTML
 */
function renderTrackCard(track, index) {
    const hasImageClass = track.image ? 'has-image' : '';
    const imageStyle = track.image ? 
        `background-image: url('${track.image}'); background-size: cover; background-position: center;` : 
        `background: ${track.cover}`;
    
    return `
        <div class="track-card" onclick="playTrack(${index})">
            <div class="track-cover ${hasImageClass}" style="${imageStyle}">
                <button class="play-btn">▶️</button>
            </div>
            <div class="track-info">
                <h3>${track.title}</h3>
                <p>${track.artist}</p>
            </div>
        </div>
    `;
}
