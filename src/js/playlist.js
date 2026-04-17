/* ============================================
   SPOTIFY CLONE - PLAYLIST MANAGEMENT
   ============================================ */

const playlists = {
    recentlyPlayed: [],
    chillVibes: [],
    workout: [],
    study: []
};

let currentPlaylist = null;

/**
 * Initialize playlists with random tracks and cached history
 */
function initializePlaylists() {
    // Load recently played from cache
    const history = getPlayHistory();
    playlists.recentlyPlayed = history.length > 0 ? history : getRandomTracks(8);
    
    // Randomly assign 8 songs to each playlist
    playlists.chillVibes = getRandomTracks(8);
    playlists.workout = getRandomTracks(8);
    playlists.study = getRandomTracks(8);
}

/**
 * Show specific playlist in library or all
 */
function showPlaylist(playlistName) {
    const recentGrid = document.getElementById('recentlyPlayedGrid');
    const chillGrid = document.getElementById('chillVibesGrid');
    const workoutGrid = document.getElementById('workoutGrid');
    const studyGrid = document.getElementById('studyGrid');
    
    // Hide all grids
    recentGrid.parentElement.style.display = 'none';
    chillGrid.parentElement.style.display = 'none';
    workoutGrid.parentElement.style.display = 'none';
    studyGrid.parentElement.style.display = 'none';
    
    // Show selected playlist
    switch(playlistName) {
        case 'recentlyPlayed':
            recentGrid.parentElement.style.display = 'block';
            break;
        case 'chillVibes':
            chillGrid.parentElement.style.display = 'block';
            break;
        case 'workout':
            workoutGrid.parentElement.style.display = 'block';
            break;
        case 'study':
            studyGrid.parentElement.style.display = 'block';
            break;
    }
    
    currentPlaylist = playlistName;
}

/**
 * Show all playlists in library
 */
function showAllPlaylists() {
    const recentGrid = document.getElementById('recentlyPlayedGrid');
    const chillGrid = document.getElementById('chillVibesGrid');
    const workoutGrid = document.getElementById('workoutGrid');
    const studyGrid = document.getElementById('studyGrid');
    
    // Show all grids
    recentGrid.parentElement.style.display = 'block';
    chillGrid.parentElement.style.display = 'block';
    workoutGrid.parentElement.style.display = 'block';
    studyGrid.parentElement.style.display = 'block';
    
    // Remove active from all playlist items
    const playlistItems = document.querySelectorAll('.playlist-item');
    playlistItems.forEach(pl => pl.classList.remove('active'));
    
    currentPlaylist = null;
}
