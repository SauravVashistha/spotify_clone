/* ================= MUSIC CACHE MANAGEMENT ================= */

const CACHE_KEYS = {
    LAST_PLAYED_TRACK: 'lastPlayedTrack',
    PLAY_HISTORY: 'playHistory',
    PLAYBACK_STATE: 'playbackState'
};

/**
 * Save the currently playing track to cache
 */
function saveLastPlayedTrack(trackIndex, track) {
    const trackData = {
        index: trackIndex,
        title: track.title,
        artist: track.artist,
        src: track.src,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem(CACHE_KEYS.LAST_PLAYED_TRACK, JSON.stringify(trackData));
}

/**
 * Load the last played track from cache
 */
function getLastPlayedTrack() {
    const cached = localStorage.getItem(CACHE_KEYS.LAST_PLAYED_TRACK);
    return cached ? JSON.parse(cached) : null;
}

/**
 * Save complete playback state (track + time + position)
 */
function savePlaybackState(trackIndex, currentTime, isPlaying) {
    const state = {
        trackIndex: trackIndex,
        currentTime: currentTime,
        isPlaying: isPlaying,
        savedAt: new Date().toISOString()
    };
    localStorage.setItem(CACHE_KEYS.PLAYBACK_STATE, JSON.stringify(state));
}

/**
 * Get saved playback state
 */
function getPlaybackState() {
    const cached = localStorage.getItem(CACHE_KEYS.PLAYBACK_STATE);
    return cached ? JSON.parse(cached) : null;
}

/**
 * Add a track to play history (keep last 5 songs)
 */
function addToPlayHistory(trackIndex, track) {
    let history = [];
    const cached = localStorage.getItem(CACHE_KEYS.PLAY_HISTORY);
    
    if (cached) {
        history = JSON.parse(cached);
    }

    const historyItem = {
        index: trackIndex,
        title: track.title,
        artist: track.artist,
        src: track.src,
        cover: track.cover,
        duration: track.duration,
        playedAt: new Date().toISOString()
    };

    history.push(historyItem);
    
    // Keep only last 5 tracks
    if (history.length > 5) {
        history = history.slice(-5);
    }

    localStorage.setItem(CACHE_KEYS.PLAY_HISTORY, JSON.stringify(history));
}

/**
 * Get play history
 */
function getPlayHistory() {
    const cached = localStorage.getItem(CACHE_KEYS.PLAY_HISTORY);
    return cached ? JSON.parse(cached) : [];
}

/**
 * Clear all cache
 */
function clearCache() {
    localStorage.removeItem(CACHE_KEYS.LAST_PLAYED_TRACK);
    localStorage.removeItem(CACHE_KEYS.PLAY_HISTORY);
    localStorage.removeItem(CACHE_KEYS.PLAYBACK_STATE);
    console.log('Cache cleared');
}

/**
 * Get cache info (for debugging)
 */
function getCacheInfo() {
    return {
        lastPlayed: getLastPlayedTrack(),
        history: getPlayHistory(),
        playbackState: getPlaybackState()
    };
}
