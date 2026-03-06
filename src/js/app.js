/* ============================================
   SPOTIFY CLONE - MAIN APPLICATION
   ============================================ */

/**
 * Initialize the entire application
 */
function initializeApp() {
    console.log('🎵 Initializing Spotify Clone...');
    
    // Initialize playlists
    initializePlaylists();
    
    // Render both pages
    renderBentoGrid();
    renderAllPlaylists();
    showAllPlaylists();
    
    // Initialize UI components
    initializePlayer();
    initializeSidebar();
    initializeSearch();
    
    // Restore previous playback state
    restorePlaybackState();
    
    console.log('✅ Spotify Clone initialized successfully!');
}

// Start app when DOM is loaded
window.addEventListener('load', initializeApp);
