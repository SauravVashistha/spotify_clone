/* ============================================
   SPOTIFY CLONE - UI RENDERING
   ============================================ */

/**
 * Render all playlists on library page
 */
function renderAllPlaylists() {
    // Recently Played
    const recentGrid = document.getElementById("recentlyPlayedGrid");
    recentGrid.innerHTML = playlists.recentlyPlayed
        .map((track, idx) => renderTrackCard(track, tracks.indexOf(track) >= 0 ? tracks.indexOf(track) : idx))
        .join('');
    
    // Chill Vibes
    const chillGrid = document.getElementById("chillVibesGrid");
    chillGrid.innerHTML = playlists.chillVibes
        .map((track, idx) => renderTrackCard(track, tracks.indexOf(track) >= 0 ? tracks.indexOf(track) : idx))
        .join('');
    
    // Workout Mix
    const workoutGrid = document.getElementById("workoutGrid");
    workoutGrid.innerHTML = playlists.workout
        .map((track, idx) => renderTrackCard(track, tracks.indexOf(track) >= 0 ? tracks.indexOf(track) : idx))
        .join('');
    
    // Study Focus
    const studyGrid = document.getElementById("studyGrid");
    studyGrid.innerHTML = playlists.study
        .map((track, idx) => renderTrackCard(track, tracks.indexOf(track) >= 0 ? tracks.indexOf(track) : idx))
        .join('');
}

/**
 * Render bento grid for discover/home page
 */
function renderBentoGrid() {
    const bentoGrid = document.getElementById("bentoGrid");
    let bentoHTML = '';
    
    const playlistsArray = [
        { title: "Recently Played", image: "assets/images/recently.jpg", tracks: playlists.recentlyPlayed, isLarge: true, key: 'recentlyPlayed' },
        { title: "Chill Vibes", image: "assets/images/chill.jpg", tracks: playlists.chillVibes, isLarge: false, key: 'chillVibes' },
        { title: "Workout Mix", image: "assets/images/workout.jpg", tracks: playlists.workout, isLarge: false, key: 'workout' },
        { title: "Study Focus", image: "assets/images/study.jpg", tracks: playlists.study, isLarge: false, key: 'study' }
    ];
    
    playlistsArray.forEach((playlist, idx) => {
        const firstTrack = playlist.tracks[0];
        const trackIndex = tracks.indexOf(firstTrack) >= 0 ? tracks.indexOf(firstTrack) : 0;
        const largeClass = playlist.isLarge ? 'bento-item-large' : '';
        const imageUrl = `url('${playlist.image}')`;
        
        bentoHTML += `
            <div class="bento-item ${largeClass}" style="background-image: ${imageUrl};" onclick="viewPlaylist('${playlist.key}', event)">
                <div class="bento-item-content">
                    <div class="bento-item-title">${playlist.title}</div>
                    <div class="bento-item-count">${playlist.tracks.length} songs</div>
                    <div class="bento-item-play" onclick="playTrack(${trackIndex}); event.stopPropagation();">▶️</div>
                </div>
            </div>
        `;
    });
    
    bentoGrid.innerHTML = bentoHTML;
}

/**
 * Switch between Home and Library pages
 */
function switchPage(page) {
    const homePage = document.getElementById('homePage');
    const libraryPage = document.getElementById('libraryPage');
    
    if (page === 'home') {
        homePage.classList.remove('hidden');
        libraryPage.classList.remove('active');
        document.getElementById('playlistMenu').classList.remove('active');
        renderBentoGrid();
    } else if (page === 'library') {
        homePage.classList.add('hidden');
        libraryPage.classList.add('active');
        document.getElementById('playlistMenu').classList.add('active');
        renderAllPlaylists();
        showAllPlaylists();
    }
}

/**
 * View a specific playlist from bento grid
 */
function viewPlaylist(playlistKey, event) {
    event.stopPropagation();
    
    // Switch to library page
    const homePage = document.getElementById('homePage');
    const libraryPage = document.getElementById('libraryPage');
    const playlistMenu = document.getElementById('playlistMenu');
    const navItems = document.querySelectorAll('.nav-item');
    const playlistItems = document.querySelectorAll('.playlist-item');
    
    homePage.classList.add('hidden');
    libraryPage.classList.add('active');
    playlistMenu.classList.add('active');
    
    // Filter to specific playlist
    showPlaylist(playlistKey);
    
    // Update sidebar active state
    navItems.forEach(item => item.classList.remove('active'));
    document.querySelector('[data-page="library"]').classList.add('active');
    
    // Update playlist menu active state
    playlistItems.forEach(item => item.classList.remove('active'));
    document.querySelector(`[data-playlist="${playlistKey}"]`).classList.add('active');
}

/**
 * Initialize search functionality with global dropdown
 */
function initializeSearch() {
    const searchInput = document.getElementById('globalSearch');
    const searchResults = document.getElementById('searchResults');
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length === 0) {
            searchResults.classList.remove('active');
            searchResults.innerHTML = '';
            return;
        }
        
        // Search across all tracks globally
        const results = tracks.filter(track => {
            const title = track.title.toLowerCase();
            const artist = track.artist.toLowerCase();
            return title.includes(query) || artist.includes(query);
        });
        
        // Render results in dropdown
        if (results.length > 0) {
            let html = '';
            results.forEach((track, idx) => {
                const trackIndex = tracks.indexOf(track);
                html += `
                    <div class="search-result-item" onclick="playSearchResult(${trackIndex})">
                        <div class="search-result-cover"></div>
                        <div class="search-result-info">
                            <div class="search-result-title">${track.title}</div>
                            <div class="search-result-artist">${track.artist}</div>
                        </div>
                        <div class="search-result-play">▶️</div>
                    </div>
                `;
            });
            searchResults.innerHTML = html;
            searchResults.classList.add('active');
        } else {
            searchResults.innerHTML = '<div class="search-result-empty">No results found</div>';
            searchResults.classList.add('active');
        }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-bar-wrapper')) {
            searchResults.classList.remove('active');
        }
    });
    
    // Keep dropdown open when searching
    searchInput.addEventListener('focus', () => {
        if (searchInput.value.trim().length > 0) {
            searchResults.classList.add('active');
        }
    });
}

/**
 * Play a song from search results
 */
function playSearchResult(index) {
    playTrack(index);
    document.getElementById('globalSearch').value = '';
    document.getElementById('searchResults').classList.remove('active');
}

/**
 * Initialize sidebar navigation
 */
function initializeSidebar() {
    const navItems = document.querySelectorAll('.nav-item');
    const playlistMenu = document.getElementById('playlistMenu');
    const playlistItems = document.querySelectorAll('.playlist-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            const page = item.getAttribute('data-page');
            if (page === 'library') {
                playlistMenu.classList.add('active');
            } else {
                playlistMenu.classList.remove('active');
            }
            
            switchPage(page);
        });
    });
    
    playlistItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            
            playlistItems.forEach(pl => pl.classList.remove('active'));
            item.classList.add('active');
            
            const playlist = item.getAttribute('data-playlist');
            showPlaylist(playlist);
        });
    });
}
