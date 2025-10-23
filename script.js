document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const video = document.getElementById('myVideo');
    const fullscreenButton = document.getElementById('fullscreenButton');
    const videoSelector = document.getElementById('videoSelector');
    const muteButton = document.getElementById('muteButton');
    const muteIcon = document.getElementById('muteIcon');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const toggleMusicButton = document.getElementById('toggleMusic');
    const musicPlayerOverlay = document.querySelector('.music-player-overlay');
    const musicContent = document.querySelector('.music-content');
    const applePlayer = document.getElementById('applePlayer');
    const deezerPlayer = document.getElementById('deezerPlayer');
    const spotifyPlayer = document.getElementById('spotifyPlayer');
    const youtubePlayer = document.getElementById('youtubePlayer');
    const musicPlayerError = document.getElementById('musicPlayerError');
    const retryMusicPlayer = document.getElementById('retryMusicPlayer');
    const musicTabs = document.querySelectorAll('.music-tab');
    const settingsButton = document.getElementById('settingsButton');
    const homeButton = document.getElementById('homeButton');
    const randomButton = document.getElementById('randomButton');

    // State management
    let isVideoMuted = true;
    let isMusicVisible = true;
    let isVideoLoading = false;

    // Video sources with metadata
    const videoSources = {
        // Fireplace Collection
        'fire.mp4': { 
            path: 'fire.mp4', 
            name: 'Classic Fireplace',
            emoji: '🔥',
            category: 'fireplace',
            description: 'A warm, crackling fireplace perfect for cozy evenings'
        },
        'fireplace2.mp4': { 
            path: 'fireplace2.mp4', 
            name: 'Cozy Fireplace',
            emoji: '🔥',
            category: 'fireplace',
            description: 'A gentle, cozy fire for relaxation'
        },
        'fireplace3.mp4': { 
            path: 'fireplace3.mp4', 
            name: 'Warm Fireplace',
            emoji: '🔥',
            category: 'fireplace',
            description: 'Warm flames dancing in the hearth'
        },
        'fireplace4.mp4': { 
            path: 'fireplace4.mp4', 
            name: 'Crackling Fire',
            emoji: '🔥',
            category: 'fireplace',
            description: 'Intense crackling fire with glowing embers'
        },
        'fireplace5.mp4': { 
            path: 'fireplace5.mp4', 
            name: 'Hearth Fire',
            emoji: '🔥',
            category: 'fireplace',
            description: 'Traditional hearth fire with dancing flames'
        },
        'fireplace6.mp4': { 
            path: 'fireplace6.mp4', 
            name: 'Log Fire',
            emoji: '🔥',
            category: 'fireplace',
            description: 'Wood log fire with natural crackling sounds'
        },
        
        // Nature & Water
        'ocean.mp4': { 
            path: 'ocean.mp4', 
            name: 'Ocean Waves',
            emoji: '🌊',
            category: 'nature',
            description: 'Gentle ocean waves lapping the shore'
        },
        'beach.mp4': { 
            path: 'beach.mp4', 
            name: 'Beach Sunset',
            emoji: '🏖️',
            category: 'nature',
            description: 'Beautiful beach sunset with golden light'
        },
        'rainforest.mp4': { 
            path: 'https://github.com/Royce-Tinofara/FPTV/blob/main/rainforest.mp4', 
            name: 'Rainforest',
            emoji: '🌿',
            category: 'nature',
            description: 'Lush rainforest with gentle mist'
        },
        'waterfall.mp4': { 
            path: 'waterfall.mp4', 
            name: 'Waterfall',
            emoji: '💧',
            category: 'nature',
            description: 'Cascading waterfall in a serene forest'
        },
        'river.mp4': { 
            path: 'river.mp4', 
            name: 'Flowing River',
            emoji: '🏞️',
            category: 'nature',
            description: 'Peaceful river flowing through nature'
        },
        'lake.mp4': { 
            path: 'lake.mp4', 
            name: 'Mountain Lake',
            emoji: '🏔️',
            category: 'nature',
            description: 'Crystal clear mountain lake reflection'
        },
        
        // Sky & Weather
        'incoming.mp4': { 
            path: 'incoming.mp4', 
            name: 'Golden Hour',
            emoji: '🌅',
            category: 'sky',
            description: 'Beautiful golden hour lighting'
        },
        'clouds.mp4': { 
            path: 'clouds.mp4', 
            name: 'Flowing Clouds',
            emoji: '☁️',
            category: 'sky',
            description: 'Peaceful clouds drifting across the sky'
        },
        'storm.mp4': { 
            path: 'storm.mp4', 
            name: 'Gentle Storm',
            emoji: '⛈️',
            category: 'sky',
            description: 'Gentle storm with rolling thunder'
        },
        'aurora.mp4': { 
            path: 'aurora.mp4', 
            name: 'Northern Lights',
            emoji: '🌌',
            category: 'sky',
            description: 'Mesmerizing aurora borealis display'
        },
        'stars.mp4': { 
            path: 'stars.mp4', 
            name: 'Starry Night',
            emoji: '⭐',
            category: 'sky',
            description: 'Clear night sky filled with twinkling stars'
        },
        'sunset.mp4': { 
            path: 'sunset.mp4', 
            name: 'Sunset',
            emoji: '🌇',
            category: 'sky',
            description: 'Breathtaking sunset with warm colors'
        },
        
        // Abstract & Colors
        'purple.mp4': { 
            path: 'https://github.com/Royce-Tinofara/FPTV/blob/main/purple.mp4', 
            name: 'Purple Dreams',
            emoji: '💜',
            category: 'abstract',
            description: 'Flowing purple abstract patterns'
        },
        'purple2.mp4': { 
            path: 'purple2.mp4', 
            name: 'Purple Waves',
            emoji: '💜',
            category: 'abstract',
            description: 'Wavy purple color transitions'
        },
        'purple3.mp4': { 
            path: 'purple3.mp4', 
            name: 'Purple Flow',
            emoji: '💜',
            category: 'abstract',
            description: 'Smooth purple flowing effects'
        },
        'blue.mp4': { 
            path: 'blue.mp4', 
            name: 'Blue Serenity',
            emoji: '💙',
            category: 'abstract',
            description: 'Calming blue abstract visuals'
        },
        'green.mp4': { 
            path: 'green.mp4', 
            name: 'Green Harmony',
            emoji: '💚',
            category: 'abstract',
            description: 'Harmonious green color patterns'
        },
        'orange.mp4': { 
            path: 'orange.mp4', 
            name: 'Orange Glow',
            emoji: '🧡',
            category: 'abstract',
            description: 'Warm orange glowing effects'
        },
        
        // Special & Events
        'award.mp4': { 
            path: 'https://github.com/Royce-Tinofara/FPTV/blob/main/award.mp4', 
            name: 'Award Ceremony',
            emoji: '🏆',
            category: 'celebration',
            description: 'Elegant award ceremony atmosphere'
        },
        'party.mp4': { 
            path: 'https://github.com/Royce-Tinofara/FPTV/blob/main/party.mp4', 
            name: 'Celebration',
            emoji: '🎉',
            category: 'celebration',
            description: 'Festive party celebration vibes'
        },
        'holiday.mp4': { 
            path: 'holiday.mp4', 
            name: 'Holiday Cheer',
            emoji: '🎄',
            category: 'celebration',
            description: 'Warm holiday atmosphere with festive lights'
        },
        'birthday.mp4': { 
            path: 'birthday.mp4', 
            name: 'Birthday Party',
            emoji: '🎂',
            category: 'celebration',
            description: 'Joyful birthday celebration ambiance'
        },
        'wedding.mp4': { 
            path: 'wedding.mp4', 
            name: 'Wedding Bliss',
            emoji: '💒',
            category: 'celebration',
            description: 'Romantic wedding celebration atmosphere'
        }
    };

    // Utility functions
    function showLoading() {
        if (loadingIndicator) {
            loadingIndicator.style.display = 'flex';
            isVideoLoading = true;
        }
    }

    function hideLoading() {
        if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
            isVideoLoading = false;
        }
    }

    function updateMuteButton() {
        if (muteIcon) {
            if (isVideoMuted) {
                muteIcon.innerHTML = `
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                `;
                muteButton.title = 'Unmute Video';
            } else {
                muteIcon.innerHTML = `
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <line x1="23" y1="9" x2="17" y2="15"></line>
                    <line x1="17" y1="9" x2="23" y2="15"></line>
                `;
                muteButton.title = 'Mute Video';
            }
        }
    }

    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            background: var(--background-dark);
            color: var(--text-primary);
            padding: 16px 20px;
            border-radius: var(--border-radius);
            backdrop-filter: var(--blur);
            box-shadow: var(--shadow-heavy);
            border: 1px solid rgba(255, 255, 255, 0.1);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
    }

    // Video management functions
    function changeVideo(videoFileName) {
        const videoData = videoSources[videoFileName];
        if (!videoData) {
            console.error("Video file not found:", videoFileName);
            showNotification('Video not found', 'error');
            return;
        }

        showLoading();
        
        // Stop current video
            video.pause();

        // Clear existing sources
            while (video.firstChild) {
                video.removeChild(video.firstChild);
            }

        // Create new source
            const source = document.createElement('source');
        source.src = videoData.path;
        source.type = 'video/mp4';
            video.appendChild(source);

        // Set video properties
        video.muted = isVideoMuted;
        
        // Load and play
        video.load();
        
        video.addEventListener('canplaythrough', () => {
            hideLoading();
            video.play().catch(error => {
                console.error("Video autoplay failed:", error);
                showNotification('Video autoplay blocked. Click to play.', 'warning');
            });
        }, { once: true });
        
        video.addEventListener('error', () => {
            hideLoading();
            showNotification('Failed to load video', 'error');
        }, { once: true });
        
        // Show success notification with description
        const description = videoData.description ? ` - ${videoData.description}` : '';
        showNotification(`Switched to ${videoData.emoji} ${videoData.name}${description}`, 'success');
    }

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            const element = video.requestFullscreen ? video : document.documentElement;
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
            showNotification('Entered fullscreen mode', 'info');
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            showNotification('Exited fullscreen mode', 'info');
        }
    }

    function toggleMute() {
        isVideoMuted = !isVideoMuted;
        video.muted = isVideoMuted;
        updateMuteButton();
        showNotification(isVideoMuted ? 'Video muted' : 'Video unmuted', 'info');
    }

    function toggleMusicPlayer() {
        isMusicVisible = !isMusicVisible;
        if (isMusicVisible) {
            musicContent.style.display = 'block';
            musicPlayerOverlay.style.height = 'auto';
            showNotification('Music player shown', 'info');
            // Try to reload the music player when showing
            loadMusicPlayer();
        } else {
            musicContent.style.display = 'none';
            musicPlayerOverlay.style.height = '60px';
            showNotification('Music player hidden', 'info');
        }
    }

    function loadMusicPlayer() {
        if (!audiomackPlayer) return;
        
        // Show loading state
        showMusicLoading();
        
        // Set a timeout to check if the iframe loads
        const loadTimeout = setTimeout(() => {
            showMusicError();
        }, 10000); // 10 second timeout
        
        // Listen for iframe load events
        audiomackPlayer.addEventListener('load', () => {
            clearTimeout(loadTimeout);
            hideMusicLoading();
            hideMusicError();
        });
        
        audiomackPlayer.addEventListener('error', () => {
            clearTimeout(loadTimeout);
            showMusicError();
        });
        
        // Try to reload the iframe
        const currentSrc = audiomackPlayer.src;
        audiomackPlayer.src = '';
        setTimeout(() => {
            audiomackPlayer.src = currentSrc;
        }, 100);
    }

    function showMusicLoading() {
        if (!musicContent) return;
        
        // Create loading indicator if it doesn't exist
        let loadingIndicator = musicContent.querySelector('.music-loading');
        if (!loadingIndicator) {
            loadingIndicator = document.createElement('div');
            loadingIndicator.className = 'music-loading';
            loadingIndicator.innerHTML = `
                <div class="loading-spinner"></div>
                <p>Loading music player...</p>
            `;
            musicContent.appendChild(loadingIndicator);
        }
        loadingIndicator.style.display = 'flex';
    }

    function hideMusicLoading() {
        const loadingIndicator = musicContent?.querySelector('.music-loading');
        if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
        }
    }

    function showMusicError() {
        hideMusicLoading();
        if (musicPlayerError) {
            musicPlayerError.style.display = 'flex';
        }
        if (audiomackPlayer) {
            audiomackPlayer.style.display = 'none';
        }
    }

    function hideMusicError() {
        if (musicPlayerError) {
            musicPlayerError.style.display = 'none';
        }
        if (audiomackPlayer) {
            audiomackPlayer.style.display = 'block';
        }
    }

    function retryMusicPlayerLoad() {
        hideMusicError();
        showMusicLoading();
        loadMusicPlayer();
        showNotification('Retrying music player...', 'info');
    }

    function switchMusicTab(tabName) {
        // Remove active class from all tabs and players
        musicTabs.forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.music-player').forEach(player => player.classList.remove('active'));
        
        // Pause all iframes to stop audio/video from other players
        pauseAllMusicPlayers();
        
        // Add active class to selected tab and player
        const selectedTab = document.querySelector(`[data-tab="${tabName}"]`);
        const selectedPlayer = document.getElementById(`${tabName}Player`);
        
        if (selectedTab && selectedPlayer) {
            selectedTab.classList.add('active');
            selectedPlayer.classList.add('active');
            
            // Get display name for notification
            const displayNames = {
                'apple': 'Apple Music',
                'deezer': 'Deezer',
                'spotify': 'Spotify',
                'youtube': 'YouTube'
            };
            
            showNotification(`Switched to ${displayNames[tabName] || tabName} music player`, 'info');
        }
    }

    function pauseAllMusicPlayers() {
        // Get all iframes in music players
        const allIframes = document.querySelectorAll('.music-player iframe');
        
        allIframes.forEach(iframe => {
            try {
                // For YouTube videos, we can try to pause them
                if (iframe.src.includes('youtube.com')) {
                    // YouTube iframe API would be needed for proper pause control
                    // For now, we'll just hide the iframe
                    iframe.style.display = 'none';
                    setTimeout(() => {
                        if (iframe.closest('.music-player').classList.contains('active')) {
                            iframe.style.display = 'block';
                        }
                    }, 100);
                }
                // For other players, we can't directly control them, but switching tabs will hide them
            } catch (error) {
                console.log('Could not pause iframe:', error);
            }
        });
    }

    function playRandomVideo() {
        const videoKeys = Object.keys(videoSources);
        const randomKey = videoKeys[Math.floor(Math.random() * videoKeys.length)];
        
        // Update the selector to match the random video
        videoSelector.value = randomKey;
        
        // Change to the random video
        changeVideo(randomKey);
        
        showNotification('🎲 Playing random video!', 'info');
    }

    // Keyboard shortcuts
    function handleKeyboardShortcuts(event) {
        // Don't trigger shortcuts when typing in inputs
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'SELECT') {
            return;
        }

        switch (event.key.toLowerCase()) {
            case 'f':
                event.preventDefault();
                toggleFullscreen();
                break;
            case 'm':
                event.preventDefault();
                toggleMute();
                break;
            case ' ':
                event.preventDefault();
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
                break;
            case 'arrowup':
                event.preventDefault();
                const currentIndex = videoSelector.selectedIndex;
                if (currentIndex > 0) {
                    videoSelector.selectedIndex = currentIndex - 1;
                    changeVideo(videoSelector.value);
                }
                break;
            case 'arrowdown':
                event.preventDefault();
                const currentIndexDown = videoSelector.selectedIndex;
                if (currentIndexDown < videoSelector.options.length - 1) {
                    videoSelector.selectedIndex = currentIndexDown + 1;
                    changeVideo(videoSelector.value);
                }
                break;
            case 'escape':
                if (document.fullscreenElement) {
                    toggleFullscreen();
                }
                break;
            case 'r':
                event.preventDefault();
                playRandomVideo();
                break;
            case 'h':
                event.preventDefault();
                showNotification('Keyboard shortcuts: F (fullscreen), M (mute), Space (play/pause), ↑↓ (change video), R (random), T (toggle music), 1-5 (switch music player), Home (welcome page), H (help)', 'info');
                break;
            case 't':
                event.preventDefault();
                toggleMusicPlayer();
                break;
            case '1':
                event.preventDefault();
                switchMusicTab('apple');
                break;
            case '2':
                event.preventDefault();
                switchMusicTab('deezer');
                break;
            case '3':
                event.preventDefault();
                switchMusicTab('spotify');
                break;
            case '4':
                event.preventDefault();
                switchMusicTab('youtube');
                break;
            case 'home':
                event.preventDefault();
                if (homeButton) {
                    homeButton.click();
                }
                break;
        }
    }

    // Event listeners
    fullscreenButton.addEventListener('click', toggleFullscreen);
    muteButton.addEventListener('click', toggleMute);
    randomButton.addEventListener('click', playRandomVideo);
    toggleMusicButton.addEventListener('click', toggleMusicPlayer);
    
    // Music player event listeners
    if (retryMusicPlayer) {
        retryMusicPlayer.addEventListener('click', retryMusicPlayerLoad);
    }
    
    // Music tab event listeners
    musicTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            switchMusicTab(tabName);
        });
    });

    videoSelector.addEventListener('change', (event) => {
        changeVideo(event.target.value);
    });

    // Keyboard event listener
    document.addEventListener('keydown', handleKeyboardShortcuts);

    // Fullscreen change detection
    document.addEventListener('fullscreenchange', () => {
        const isFullscreen = !!document.fullscreenElement;
        fullscreenButton.innerHTML = isFullscreen ? 
            `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
            </svg>Exit Fullscreen` :
            `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
            </svg>Fullscreen`;
    });

    // Video event listeners
    video.addEventListener('loadstart', showLoading);
    video.addEventListener('canplay', hideLoading);
    video.addEventListener('error', () => {
        hideLoading();
        showNotification('Error loading video', 'error');
    });

    // Settings button functionality
    if (settingsButton) {
        settingsButton.addEventListener('click', () => {
            showNotification('Settings panel coming soon!', 'info');
        });
    }

    // Home button functionality
    if (homeButton) {
        homeButton.addEventListener('click', () => {
            showNotification('Returning to welcome page...', 'info');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        });
    }

    // Initialize
    updateMuteButton();
    changeVideo(videoSelector.value);
    
    // Initialize music player
    if (isMusicVisible) {
        loadMusicPlayer();
    }

    // Show welcome message
    setTimeout(() => {
        showNotification('Welcome to FireplaceTV! Press H for keyboard shortcuts.', 'info');
    }, 1000);

    // Auto-hide controls after inactivity (optional)
    let controlsTimeout;
    function resetControlsTimeout() {
        clearTimeout(controlsTimeout);
        document.querySelector('.controls-overlay').style.opacity = '1';
        document.querySelector('.music-player-overlay').style.opacity = '1';
        
        controlsTimeout = setTimeout(() => {
            document.querySelector('.controls-overlay').style.opacity = '0.3';
            document.querySelector('.music-player-overlay').style.opacity = '0.3';
        }, 5000);
    }

    // Reset timeout on user interaction
    document.addEventListener('mousemove', resetControlsTimeout);
    document.addEventListener('keydown', resetControlsTimeout);
    resetControlsTimeout();

    // Expose functions globally for debugging
    window.FireplaceTV = {
        changeVideo,
        toggleFullscreen,
        toggleMute,
        toggleMusicPlayer,
        loadMusicPlayer,
        retryMusicPlayerLoad,
        switchMusicTab,
        showNotification,
        videoSources
    };
});
