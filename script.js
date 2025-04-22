// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Update active link based on scroll position
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Smooth scrolling for navigation links
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 60,
                behavior: 'smooth'
            });
            
            // Close mobile menu after clicking a link
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// Genre Selection
const genreCards = document.querySelectorAll('.genre-card');
const videoWrapper = document.querySelector('.video-wrapper');
const genreSelect = document.getElementById('genre');

// Genre-specific styles
const genreStyles = {
    pop: {
        background: 'linear-gradient(45deg, #ff6b6b, #ff8e8e)',
        overlay: 'linear-gradient(45deg, rgba(255, 107, 107, 0.8), rgba(255, 142, 142, 0.8))',
        textColor: '#ffffff',
        accentColor: '#ff6b6b',
        bgImage: 'url("https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
        animation: 'pop-animation',
        particles: 'circles'
    },
    edm: {
        background: 'linear-gradient(45deg, #6c5ce7, #a29bfe)',
        overlay: 'linear-gradient(45deg, rgba(108, 92, 231, 0.8), rgba(162, 155, 254, 0.8))',
        textColor: '#ffffff',
        accentColor: '#6c5ce7',
        bgImage: 'url("https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
        animation: 'edm-animation',
        particles: 'squares'
    },
    rock: {
        background: 'linear-gradient(45deg, #2d3436, #636e72)',
        overlay: 'linear-gradient(45deg, rgba(45, 52, 54, 0.8), rgba(99, 110, 114, 0.8))',
        textColor: '#ffffff',
        accentColor: '#d63031',
        bgImage: 'url("https://images.unsplash.com/photo-1508973379184-7517410fb0bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
        animation: 'rock-animation',
        particles: 'triangles'
    },
    lofi: {
        background: 'linear-gradient(45deg, #00b894, #00cec9)',
        overlay: 'linear-gradient(45deg, rgba(0, 184, 148, 0.8), rgba(0, 206, 201, 0.8))',
        textColor: '#ffffff',
        accentColor: '#00b894',
        bgImage: 'url("https://images.unsplash.com/photo-1482855549413-c0d85a5de549?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
        animation: 'lofi-animation',
        particles: 'dots'
    },
    hiphop: {
        background: 'linear-gradient(45deg, #e84393, #fd79a8)',
        overlay: 'linear-gradient(45deg, rgba(232, 67, 147, 0.8), rgba(253, 121, 168, 0.8))',
        textColor: '#ffffff',
        accentColor: '#e84393',
        bgImage: 'url("https://images.unsplash.com/photo-1547707981-eeb6c52fce31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
        animation: 'hiphop-animation',
        particles: 'waves'
    },
    classical: {
        background: 'linear-gradient(45deg, #3c6382, #60a3bc)',
        overlay: 'linear-gradient(45deg, rgba(60, 99, 130, 0.8), rgba(96, 163, 188, 0.8))',
        textColor: '#ffffff',
        accentColor: '#3c6382',
        bgImage: 'url("https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
        animation: 'classical-animation',
        particles: 'lines'
    }
};

// Apply genre-specific styles
function applyGenreStyles(genre) {
    if (!genre || !genreStyles[genre]) return;
    
    const styles = genreStyles[genre];
    
    // Apply styles to document root
    document.documentElement.style.setProperty('--accent-color', styles.accentColor);
    
    // Update hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        // Update background
        const heroBackground = heroSection.querySelector('.hero-background');
        if (heroBackground) {
            // If there's a video, add class to fade it out
            const video = heroBackground.querySelector('video');
            if (video) {
                video.classList.add('faded');
            }
            
            // Add a background image
            heroBackground.style.backgroundImage = styles.bgImage;
            heroBackground.style.backgroundSize = 'cover';
            heroBackground.style.backgroundPosition = 'center';
        }
        
        // Update overlay gradient
        const overlay = heroSection.querySelector('.overlay');
        if (overlay) {
            overlay.style.background = styles.overlay;
        }
    }
    
    // Update video wrapper styles
    const videoWrapper = document.querySelector('.video-wrapper');
    if (videoWrapper) {
        videoWrapper.style.background = styles.background;
    }
    
    // Update video overlay styles
    const videoOverlay = document.querySelector('.video-overlay');
    if (videoOverlay) {
        videoOverlay.style.background = styles.overlay;
    }
    
    // Update text colors
    const videoTitle = document.querySelector('.video-title h3');
    const videoSubtitle = document.querySelector('.video-subtitle');
    if (videoTitle) videoTitle.style.color = styles.textColor;
    if (videoSubtitle) videoSubtitle.style.color = styles.textColor;
    
    // Add particle animation
    createParticleAnimation(genre, styles.particles);
    
    // Add genre-specific animation to buttons and cards
    applyGenreAnimations(genre);
}

// Create dynamic particle animation based on genre
function createParticleAnimation(genre, type) {
    // Remove any existing particle container
    const existingContainer = document.getElementById('particle-container');
    if (existingContainer) {
        existingContainer.remove();
    }
    
    // Create new particle container
    const particleContainer = document.createElement('div');
    particleContainer.id = 'particle-container';
    particleContainer.className = `particles ${type}`;
    
    // Add to hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.appendChild(particleContainer);
        
        // Generate particles based on type
        const particleCount = type === 'dots' ? 50 : 
                             type === 'lines' ? 20 :
                             type === 'waves' ? 10 : 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = `particle ${type}-particle`;
            
            // Random positioning and animation delay
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particle.style.animationDuration = `${5 + Math.random() * 10}s`;
            
            if (type === 'waves') {
                particle.style.width = `${30 + Math.random() * 100}px`;
                particle.style.height = `${5 + Math.random() * 10}px`;
                particle.style.opacity = `${0.1 + Math.random() * 0.2}`;
            } else if (type === 'lines') {
                particle.style.width = `${1 + Math.random() * 2}px`;
                particle.style.height = `${20 + Math.random() * 100}px`;
                particle.style.transform = `rotate(${Math.random() * 360}deg)`;
            }
            
            particleContainer.appendChild(particle);
        }
    }
}

// Apply animations to UI elements based on genre
function applyGenreAnimations(genre) {
    // Remove existing animation classes
    const animatedElements = document.querySelectorAll('.feature-card, .cta-button, .genre-card');
    animatedElements.forEach(el => {
        el.classList.remove('pop-animation', 'edm-animation', 'rock-animation', 'lofi-animation', 'hiphop-animation', 'classical-animation');
    });
    
    // Add new animation class
    const animationClass = genreStyles[genre].animation;
    animatedElements.forEach(el => {
        el.classList.add(animationClass);
    });
    
    // Update button hover styles
    const styleElement = document.getElementById('genre-dynamic-styles');
    if (!styleElement) {
        const newStyleElement = document.createElement('style');
        newStyleElement.id = 'genre-dynamic-styles';
        document.head.appendChild(newStyleElement);
    }
    
    const accentColor = genreStyles[genre].accentColor;
    const dynamicStyles = `
        .cta-button:hover,
        .sync-btn:hover,
        .feature-card:hover .feature-icon {
            background-color: ${accentColor} !important;
        }
        .feature-hover, 
        a:hover,
        .nav-links a:hover,
        .nav-links a.active {
            color: ${accentColor} !important;
        }
        .nav-links a::after,
        .nav-links a.active::after {
            background-color: ${accentColor} !important;
        }
        .progress-bar::before, 
        .seek-progress {
            background: ${accentColor} !important;
        }
    `;
    
    document.getElementById('genre-dynamic-styles').innerHTML = dynamicStyles;
}

// Handle genre card selection
genreCards.forEach(card => {
    card.addEventListener('click', () => {
        // Remove selected class from all cards
        genreCards.forEach(c => c.classList.remove('selected'));
        
        // Add selected class to clicked card
        card.classList.add('selected');
        
        // Get selected genre
        const genre = card.dataset.genre;
        
        // Update genre select dropdown
        genreSelect.value = genre;
        
        // Apply genre styles
        applyGenreStyles(genre);
    });
});

// Handle genre select dropdown change
genreSelect.addEventListener('change', (e) => {
    const genre = e.target.value;
    
    // Remove selected class from all cards
    genreCards.forEach(card => card.classList.remove('selected'));
    
    // Add selected class to matching card
    const selectedCard = document.querySelector(`.genre-card[data-genre="${genre}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }
    
    // Apply genre styles
    applyGenreStyles(genre);
});

// Initialize with default genre if selected
if (genreSelect.value) {
    applyGenreStyles(genreSelect.value);
    const selectedCard = document.querySelector(`.genre-card[data-genre="${genreSelect.value}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }
}

// Lyrics Sync Editor
class LyricsSyncEditor {
    constructor() {
        // Audio elements
        this.audio = new Audio();
        this.isPlaying = false;
        
        // Lyrics data
        this.lyrics = [];
        this.currentLineIndex = -1;
        this.syncMode = 'manual'; // 'manual' or 'auto'
        
        // DOM Elements
        this.initElements();
        this.attachEventListeners();
    }
    
    initElements() {
        // Upload elements
        this.lyricsFileInput = document.getElementById('lyrics-file-input');
        this.audioFileInput = document.getElementById('audio-file-input');
        this.fileNameDisplay = document.getElementById('file-name');
        this.audioFileNameDisplay = document.getElementById('audio-file-name');
        this.uploadButtons = document.querySelectorAll('.upload-btn');
        
        // Player controls
        this.playButton = document.getElementById('play-btn');
        this.seekBar = document.getElementById('seek-bar');
        this.seekProgress = document.getElementById('seek-progress');
        this.currentTimeDisplay = document.getElementById('current-time');
        this.durationDisplay = document.getElementById('duration');
        this.syncModeButton = document.getElementById('sync-mode-btn');
        
        // Editor elements
        this.modeToggle = document.getElementById('mode-toggle');
        this.modeLabel = document.getElementById('mode-label');
        this.lyricsList = document.getElementById('lyrics-list');
        this.addTimestampBtn = document.getElementById('add-timestamp-btn');
        this.syncAllBtn = document.getElementById('sync-all-btn');
        this.exportBtn = document.getElementById('export-btn');
        
        // Preview
        this.previewContainer = document.getElementById('preview-container');
    }
    
    attachEventListeners() {
        // File upload listeners
        this.uploadButtons[0].addEventListener('click', () => this.lyricsFileInput.click());
        this.uploadButtons[1].addEventListener('click', () => this.audioFileInput.click());
        this.lyricsFileInput.addEventListener('change', (e) => this.handleLyricsFileUpload(e));
        this.audioFileInput.addEventListener('change', (e) => this.handleAudioFileUpload(e));
        
        // Player control listeners
        this.playButton.addEventListener('click', () => this.togglePlay());
        this.seekBar.addEventListener('click', (e) => this.handleSeek(e));
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('loadedmetadata', () => this.handleAudioLoaded());
        this.audio.addEventListener('ended', () => this.handleAudioEnded());
        
        // Editor listeners
        this.modeToggle.addEventListener('change', () => this.toggleSyncMode());
        this.addTimestampBtn.addEventListener('click', () => this.addTimestamp());
        this.syncAllBtn.addEventListener('click', () => this.autoSyncAll());
        this.exportBtn.addEventListener('click', () => this.exportLRC());
    }
    
    // File handling methods
    handleLyricsFileUpload(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        this.fileNameDisplay.textContent = file.name;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            this.parseLyrics(content);
        };
        reader.readAsText(file);
    }
    
    handleAudioFileUpload(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        this.audioFileNameDisplay.textContent = file.name;
        
        const fileURL = URL.createObjectURL(file);
        this.audio.src = fileURL;
        this.audio.load();
    }
    
    parseLyrics(content) {
        const lines = content.split('\n');
        this.lyrics = lines
            .filter(line => line.trim())
            .map((line, index) => ({
                index,
                text: line.trim(),
                time: null,
                formattedTime: '--:--'
            }));
            
        this.renderLyrics();
    }
    
    // Audio control methods
    togglePlay() {
        if (this.isPlaying) {
            this.audio.pause();
        } else {
            if (this.audio.src) {
                this.audio.play();
            }
        }
        
        this.isPlaying = !this.isPlaying;
        this.updatePlayButton();
    }
    
    updatePlayButton() {
        const icon = this.playButton.querySelector('i');
        icon.className = this.isPlaying ? 'fas fa-pause' : 'fas fa-play';
    }
    
    handleSeek(e) {
        if (!this.audio.duration) return;
        
        const rect = this.seekBar.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        this.audio.currentTime = pos * this.audio.duration;
    }
    
    updateProgress() {
        if (!this.audio.duration) return;
        
        const progress = (this.audio.currentTime / this.audio.duration) * 100;
        this.seekProgress.style.width = `${progress}%`;
        
        this.currentTimeDisplay.textContent = this.formatTime(this.audio.currentTime);
        
        // Update active line
        this.updateActiveLine();
        
        // Auto-sync if in auto mode
        if (this.syncMode === 'auto' && this.isPlaying) {
            this.checkAutoSync();
        }
    }
    
    handleAudioLoaded() {
        this.durationDisplay.textContent = this.formatTime(this.audio.duration);
    }
    
    handleAudioEnded() {
        this.isPlaying = false;
        this.updatePlayButton();
        this.seekProgress.style.width = '0%';
        this.currentTimeDisplay.textContent = '0:00';
        this.audio.currentTime = 0;
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    // Sync methods
    toggleSyncMode() {
        this.syncMode = this.modeToggle.checked ? 'auto' : 'manual';
        this.modeLabel.textContent = this.syncMode === 'auto' ? 'Auto Mode' : 'Manual Mode';
    }
    
    addTimestamp() {
        if (!this.audio.duration) return;
        
        // Find the first unsynchronized line or the current playing line
        let lineIndex = this.lyrics.findIndex(line => line.time === null);
        if (lineIndex === -1) return;
        
        // Add timestamp
        this.syncLine(lineIndex, this.audio.currentTime);
    }
    
    syncLine(index, time) {
        if (index < 0 || index >= this.lyrics.length) return;
        
        this.lyrics[index].time = time;
        this.lyrics[index].formattedTime = this.formatTime(time);
        
        // Update in the UI
        const lineElement = this.lyricsList.querySelector(`.lyric-item[data-index="${index}"]`);
        if (lineElement) {
            const badge = lineElement.querySelector('.timestamp-badge');
            if (badge) {
                badge.textContent = this.lyrics[index].formattedTime;
            }
        }
    }
    
    checkAutoSync() {
        if (this.currentLineIndex < this.lyrics.length - 1) {
            // Check if we need to sync the next line
            const nextIndex = this.currentLineIndex + 1;
            if (this.lyrics[nextIndex].time === null) {
                this.syncLine(nextIndex, this.audio.currentTime);
            }
        }
    }
    
    autoSyncAll() {
        if (!this.audio.duration || this.lyrics.length === 0) return;
        
        // Calculate even distribution of lines across the audio duration
        const interval = this.audio.duration / this.lyrics.length;
        
        this.lyrics.forEach((line, index) => {
            const time = interval * index;
            this.syncLine(index, time);
        });
    }
    
    updateActiveLine() {
        const currentTime = this.audio.currentTime;
        let activeIndex = -1;
        
        // Find the current line based on timestamps
        for (let i = 0; i < this.lyrics.length; i++) {
            if (this.lyrics[i].time !== null && this.lyrics[i].time <= currentTime) {
                activeIndex = i;
            } else if (this.lyrics[i].time !== null) {
                break;
            }
        }
        
        // Update UI if active line changed
        if (activeIndex !== this.currentLineIndex && activeIndex !== -1) {
            this.currentLineIndex = activeIndex;
            
            // Update lyric items
            const items = this.lyricsList.querySelectorAll('.lyric-item');
            items.forEach(item => item.classList.remove('active'));
            
            const activeItem = this.lyricsList.querySelector(`.lyric-item[data-index="${activeIndex}"]`);
            if (activeItem) {
                activeItem.classList.add('active');
                activeItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
            // Update preview
            this.updatePreview(activeIndex);
        }
    }
    
    // UI Rendering
    renderLyrics() {
        // Clear the lyrics list and empty state
        this.lyricsList.innerHTML = '';
        
        if (this.lyrics.length === 0) {
            const emptyState = document.createElement('div');
            emptyState.className = 'empty-state';
            emptyState.innerHTML = `
                <i class="fas fa-file-import"></i>
                <p>Upload a lyrics file to get started</p>
            `;
            this.lyricsList.appendChild(emptyState);
            return;
        }
        
        // Create lyrics items
        this.lyrics.forEach((line, index) => {
            const item = document.createElement('div');
            item.className = 'lyric-item';
            item.dataset.index = index;
            item.innerHTML = `
                <div class="lyric-number">${index + 1}</div>
                <div class="lyric-text">${line.text}</div>
                <div class="timestamp-badge">${line.formattedTime}</div>
            `;
            
            // Add click handler to sync current line
            item.addEventListener('click', () => {
                if (this.isPlaying && this.syncMode === 'manual') {
                    this.syncLine(index, this.audio.currentTime);
                }
            });
            
            this.lyricsList.appendChild(item);
        });
    }
    
    updatePreview(index) {
        if (index < 0 || index >= this.lyrics.length) return;
        
        this.previewContainer.innerHTML = '';
        const lyricElement = document.createElement('div');
        lyricElement.className = 'current-lyric';
        lyricElement.textContent = this.lyrics[index].text;
        this.previewContainer.appendChild(lyricElement);
    }
    
    // Export functions
    exportLRC() {
        if (this.lyrics.length === 0) return;
        
        let lrcContent = '';
        
        // Add metadata
        lrcContent += '[ti:Untitled]\n';
        lrcContent += '[ar:Unknown Artist]\n';
        lrcContent += '[al:Unknown Album]\n';
        lrcContent += '[by:LyricVision Editor]\n\n';
        
        // Add synced lyrics
        this.lyrics.forEach(line => {
            if (line.time !== null) {
                const mins = Math.floor(line.time / 60);
                const secs = Math.floor(line.time % 60);
                const ms = Math.floor((line.time % 1) * 100);
                
                const timeString = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
                lrcContent += `[${timeString}]${line.text}\n`;
            } else {
                // For unsynced lines, add comment
                lrcContent += `# ${line.text}\n`;
            }
        });
        
        // Create download link
        const blob = new Blob([lrcContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'lyrics.lrc';
        a.click();
        
        // Clean up
        URL.revokeObjectURL(url);
    }
}

// Initialize lyrics sync editor when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize existing functionality
    
    // Initialize lyrics sync editor
    const lyricsSyncEditor = new LyricsSyncEditor();
});

// Video Output Simulator
class VideoSimulator {
    constructor() {
        // Initialize properties
        this.lyrics = [];
        this.currentLineIndex = -1;
        this.audio = new Audio();
        this.isPlaying = false;
        this.activeLyric = null;
        this.currentProgress = 0;
        this.selectedGenre = 'pop';
        
        // DOM elements
        this.initializeElements();
        this.attachEventListeners();
        
        // Initialize simulation
        this.updateGenreDisplay();
        this.setTextSizeClass('medium');
        this.setTextPositionClass('middle');
    }
    
    initializeElements() {
        // Video container
        this.videoSimulator = document.querySelector('.video-simulator');
        this.bgAnimation = document.querySelector('.bg-animation');
        this.bgOverlay = document.querySelector('.bg-overlay');
        
        // Lyrics display
        this.karaokeContainer = document.getElementById('karaoke-lyrics');
        
        // Controls
        this.playButton = document.getElementById('video-play-btn');
        this.progressBar = document.getElementById('video-progress');
        this.progressIndicator = document.getElementById('video-progress-bar');
        this.currentTimeDisplay = document.getElementById('video-current-time');
        this.durationDisplay = document.getElementById('video-duration');
        this.downloadButton = document.getElementById('download-mock-video');
        this.genreDisplay = document.getElementById('current-genre');
        
        // Options
        this.effectIntensity = document.getElementById('effect-intensity');
        this.textSizeButtons = document.querySelectorAll('.text-size-buttons button');
        this.textPosition = document.getElementById('text-position');
        this.boldToggle = document.getElementById('bold-toggle');
        this.shadowToggle = document.getElementById('shadow-toggle');
        this.outlineToggle = document.getElementById('outline-toggle');
        
        // Effects
        this.effects = document.querySelectorAll('.effect');
    }
    
    attachEventListeners() {
        // Video playback controls
        this.playButton.addEventListener('click', () => this.togglePlay());
        this.progressBar.addEventListener('click', (e) => this.seek(e));
        this.downloadButton.addEventListener('click', () => this.downloadMockVideo());
        
        // Options
        this.effectIntensity.addEventListener('input', () => this.updateEffectIntensity());
        this.textPosition.addEventListener('change', () => this.updateTextPosition());
        
        // Style buttons
        this.textSizeButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.setTextSizeClass(button.dataset.size);
                this.updateButtonStates();
            });
        });
        
        this.boldToggle.addEventListener('click', () => {
            this.toggleTextStyle(this.boldToggle, 'style-bold');
        });
        
        this.shadowToggle.addEventListener('click', () => {
            this.toggleTextStyle(this.shadowToggle, 'style-shadow');
        });
        
        this.outlineToggle.addEventListener('click', () => {
            this.toggleTextStyle(this.outlineToggle, 'style-outline');
        });
        
        // Audio events
        this.audio.addEventListener('timeupdate', () => this.updateVideoProgress());
        this.audio.addEventListener('ended', () => this.handleVideoEnd());
        this.audio.addEventListener('loadedmetadata', () => {
            this.durationDisplay.textContent = this.formatTime(this.audio.duration);
        });
        
        // Listen for lyrics from sync editor
        document.addEventListener('lyricsUpdated', (e) => {
            if (e.detail && e.detail.lyrics) {
                this.setLyrics(e.detail.lyrics);
            }
        });
        
        // Listen for genre changes
        document.addEventListener('genreChanged', (e) => {
            if (e.detail && e.detail.genre) {
                this.updateGenre(e.detail.genre);
            }
        });
    }
    
    // Event handlers
    togglePlay() {
        if (!this.audio.src && this.lyrics.length === 0) {
            this.loadDemoContent();
            return;
        }
        
        if (this.isPlaying) {
            this.audio.pause();
        } else {
            this.audio.play();
        }
        
        this.isPlaying = !this.isPlaying;
        this.updatePlayButton();
    }
    
    updatePlayButton() {
        const icon = this.playButton.querySelector('i');
        icon.className = this.isPlaying ? 'fas fa-pause' : 'fas fa-play';
    }
    
    seek(e) {
        if (!this.audio.duration) return;
        
        const rect = this.progressBar.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        this.audio.currentTime = pos * this.audio.duration;
    }
    
    updateVideoProgress() {
        if (!this.audio.duration) return;
        
        const progress = (this.audio.currentTime / this.audio.duration) * 100;
        this.progressIndicator.style.width = `${progress}%`;
        this.currentTimeDisplay.textContent = this.formatTime(this.audio.currentTime);
        this.currentProgress = progress;
        
        // Update active lyric
        this.updateActiveLyric();
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    handleVideoEnd() {
        this.isPlaying = false;
        this.updatePlayButton();
        this.audio.currentTime = 0;
        this.progressIndicator.style.width = '0%';
        this.currentTimeDisplay.textContent = '0:00';
    }
    
    // Lyrics handling
    setLyrics(lyrics) {
        this.lyrics = lyrics;
        this.renderLyrics();
    }
    
    renderLyrics() {
        // Clear existing lyrics
        this.karaokeContainer.innerHTML = '';
        
        if (!this.lyrics || this.lyrics.length === 0) {
            const emptyState = document.createElement('div');
            emptyState.className = 'empty-lyrics';
            emptyState.innerHTML = `
                <i class="fas fa-music"></i>
                <p>Sync your lyrics to preview karaoke-style video</p>
            `;
            this.karaokeContainer.appendChild(emptyState);
            return;
        }
        
        // Add each lyric line
        this.lyrics.forEach((lyric, index) => {
            const line = document.createElement('div');
            line.className = 'lyric-line';
            line.dataset.index = index;
            
            // Split into words for word-by-word highlighting (simplified)
            const words = lyric.text.split(' ');
            words.forEach(word => {
                const wordSpan = document.createElement('span');
                wordSpan.className = 'lyric-word';
                
                // Create base text
                const baseText = document.createElement('span');
                baseText.className = 'base';
                baseText.textContent = word + ' ';
                
                // Create highlight text (same content, different color)
                const highlightText = document.createElement('span');
                highlightText.className = 'highlight';
                highlightText.textContent = word + ' ';
                
                wordSpan.appendChild(baseText);
                wordSpan.appendChild(highlightText);
                line.appendChild(wordSpan);
            });
            
            this.karaokeContainer.appendChild(line);
        });
    }
    
    updateActiveLyric() {
        const currentTime = this.audio.currentTime;
        let activeIndex = -1;
        
        // Find the current line based on timestamps
        for (let i = 0; i < this.lyrics.length; i++) {
            if (this.lyrics[i].time !== null && this.lyrics[i].time <= currentTime) {
                activeIndex = i;
            } else if (this.lyrics[i].time !== null) {
                break;
            }
        }
        
        // Update UI if active line changed
        if (activeIndex !== this.currentLineIndex && activeIndex !== -1) {
            this.currentLineIndex = activeIndex;
            
            // Remove active class from all lines
            const lines = this.karaokeContainer.querySelectorAll('.lyric-line');
            lines.forEach(line => line.classList.remove('active'));
            
            // Add active class to current line
            const activeLine = this.karaokeContainer.querySelector(`.lyric-line[data-index="${activeIndex}"]`);
            if (activeLine) {
                activeLine.classList.add('active');
                this.activeLyric = activeLine;
                
                // Simulate word-by-word highlighting
                this.simulateWordHighlighting(activeLine, activeIndex);
            }
        }
    }
    
    simulateWordHighlighting(lineElement, lineIndex) {
        // Get all words in this line
        const words = lineElement.querySelectorAll('.lyric-word');
        if (!words.length) return;
        
        // Get timing information
        const currentLine = this.lyrics[lineIndex];
        let nextLineTime;
        
        // Find the next line with a timestamp
        for (let i = lineIndex + 1; i < this.lyrics.length; i++) {
            if (this.lyrics[i].time !== null) {
                nextLineTime = this.lyrics[i].time;
                break;
            }
        }
        
        // If this is the last line, use audio duration
        if (!nextLineTime) {
            nextLineTime = this.audio.duration;
        }
        
        // Calculate total line duration
        const lineDuration = nextLineTime - currentLine.time;
        if (lineDuration <= 0) return;
        
        // Calculate progress within this line
        const lineProgress = (this.audio.currentTime - currentLine.time) / lineDuration;
        
        // Apply highlighting to words based on line progress
        const wordCount = words.length;
        const wordsToHighlight = Math.ceil(lineProgress * wordCount);
        
        words.forEach((word, wordIdx) => {
            const highlight = word.querySelector('.highlight');
            
            if (wordIdx < wordsToHighlight) {
                // Words that should be fully highlighted
                highlight.style.width = '100%';
            } else if (wordIdx === wordsToHighlight) {
                // Partially highlight the current word
                const partialProgress = (lineProgress * wordCount) % 1;
                highlight.style.width = `${partialProgress * 100}%`;
            } else {
                // Words not yet reached
                highlight.style.width = '0%';
            }
        });
    }
    
    // Video style and effects functions
    updateGenre(genre) {
        if (!genreStyles[genre]) return;
        
        this.selectedGenre = genre;
        const styles = genreStyles[genre];
        
        // Update background
        this.bgAnimation.style.background = styles.background;
        this.bgOverlay.style.background = styles.overlay;
        
        // Update effects
        this.effects.forEach(effect => {
            effect.style.background = `hsl(${Math.random() * 360}, 70%, 50%)`;
        });
        
        // Update display
        this.updateGenreDisplay();
    }
    
    updateGenreDisplay() {
        this.genreDisplay.textContent = this.selectedGenre.charAt(0).toUpperCase() + 
                                       this.selectedGenre.slice(1);
    }
    
    updateEffectIntensity() {
        const intensity = this.effectIntensity.value;
        
        // Update blur and opacity based on intensity
        this.effects.forEach(effect => {
            const blur = 10 + (intensity / 2);
            const opacity = 0.1 + (intensity / 200);
            
            effect.style.filter = `blur(${blur}px)`;
            effect.style.opacity = opacity;
        });
        
        // Adjust animation speed
        const animationDuration = 30 - (intensity / 5);
        this.bgAnimation.style.animationDuration = `${animationDuration}s`;
    }
    
    updateTextPosition() {
        const position = this.textPosition.value;
        this.setTextPositionClass(position);
    }
    
    setTextSizeClass(size) {
        this.karaokeContainer.classList.remove('text-small', 'text-medium', 'text-large');
        this.karaokeContainer.classList.add(`text-${size}`);
        
        // Update buttons
        this.textSizeButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.size === size);
        });
    }
    
    setTextPositionClass(position) {
        this.karaokeContainer.classList.remove('position-top', 'position-middle', 'position-bottom');
        this.karaokeContainer.classList.add(`position-${position}`);
    }
    
    toggleTextStyle(button, styleClass) {
        const hasClass = this.karaokeContainer.classList.toggle(styleClass);
        button.classList.toggle('active', hasClass);
    }
    
    updateButtonStates() {
        // Update size buttons
        this.textSizeButtons.forEach(button => {
            const isActive = this.karaokeContainer.classList.contains(`text-${button.dataset.size}`);
            button.classList.toggle('active', isActive);
        });
    }
    
    // Load demo content
    loadDemoContent() {
        // Demo lyrics
        const demoLyrics = [
            { index: 0, text: "Welcome to LyricVision", time: 0, formattedTime: "0:00" },
            { index: 1, text: "Turn your lyrics into amazing videos", time: 4, formattedTime: "0:04" },
            { index: 2, text: "Sync perfectly with the music", time: 8, formattedTime: "0:08" },
            { index: 3, text: "Choose from different visual styles", time: 12, formattedTime: "0:12" },
            { index: 4, text: "And share with the world", time: 16, formattedTime: "0:16" }
        ];
        
        this.setLyrics(demoLyrics);
        
        // Demo audio
        this.audio.src = "https://soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
        this.audio.load();
        
        // Start playing when loaded
        this.audio.addEventListener('canplaythrough', () => {
            this.togglePlay();
        }, { once: true });
    }
    
    // Download mock video
    downloadMockVideo() {
        // Create a simple text file with lyrics and timestamps
        if (!this.lyrics || this.lyrics.length === 0) {
            alert("Please sync some lyrics first!");
            return;
        }
        
        let content = "LyricVision Mock Video\n\n";
        content += `Genre: ${this.selectedGenre}\n\n`;
        content += "LYRICS:\n\n";
        
        this.lyrics.forEach(lyric => {
            if (lyric.time !== null) {
                content += `[${lyric.formattedTime}] ${lyric.text}\n`;
            } else {
                content += `${lyric.text}\n`;
            }
        });
        
        // Create and download the file
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `lyricvision_${this.selectedGenre}_video.txt`;
        a.click();
        
        // Clean up
        URL.revokeObjectURL(url);
    }
}

// Initialize simulator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize other components
    
    // Initialize video simulator
    const videoSimulator = new VideoSimulator();
    
    // Connect the sync editor with the video simulator
    const lyricsEditor = document.querySelector('#lyrics-sync');
    const syncAllBtn = document.getElementById('sync-all-btn');
    
    if (syncAllBtn) {
        syncAllBtn.addEventListener('click', () => {
            const lyricsSyncEditor = window.lyricsSyncEditor;
            if (lyricsSyncEditor && lyricsSyncEditor.lyrics) {
                // Dispatch event for lyrics update
                document.dispatchEvent(new CustomEvent('lyricsUpdated', {
                    detail: { lyrics: lyricsSyncEditor.lyrics }
                }));
            }
        });
    }
    
    // Connect genre selection to video simulator
    const genreCards = document.querySelectorAll('.genre-card');
    genreCards.forEach(card => {
        card.addEventListener('click', () => {
            const genre = card.dataset.genre;
            document.dispatchEvent(new CustomEvent('genreChanged', {
                detail: { genre }
            }));
        });
    });
});

// Insights Section Animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate insights when scrolled into view
    const insightsSection = document.querySelector('.insights');
    if (!insightsSection) return; // Exit if section doesn't exist
    
    const insightCards = document.querySelectorAll('.insight-card');
    const chartContainers = document.querySelectorAll('.chart-container');
    
    // Set bar chart data
    const barData = [
        { label: 'User Growth', value: 80 },
        { label: 'Video Quality', value: 65 },
        { label: 'Processing Speed', value: 75 },
        { label: 'User Satisfaction', value: 90 }
    ];
    
    // Counter animation function
    function animateCounter(element, target, duration = 1500) {
        let start = 0;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            const currentValue = Math.floor(progress * target);
            element.textContent = target > 1000 ? 
                (currentValue/1000).toFixed(1) + 'K' : 
                currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                // Add the plus sign or percentage after completion
                if (element.dataset.suffix) {
                    element.textContent += element.dataset.suffix;
                }
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // Create and animate bar charts
    function createBarChart(container) {
        const chart = container.querySelector('.bar-chart');
        if (!chart) return;
        
        // Clear existing content
        chart.innerHTML = '';
        
        // Create bars based on data
        barData.forEach((item, index) => {
            const barContainer = document.createElement('div');
            barContainer.className = 'bar-container';
            
            const barLabel = document.createElement('div');
            barLabel.className = 'bar-label';
            barLabel.textContent = item.label;
            
            const barOuter = document.createElement('div');
            barOuter.className = 'bar-outer';
            
            const barFill = document.createElement('div');
            barFill.className = 'bar-fill';
            barFill.style.width = '0%';
            
            const barValue = document.createElement('div');
            barValue.className = 'bar-value';
            barValue.textContent = item.value + '%';
            
            barOuter.appendChild(barFill);
            barContainer.appendChild(barLabel);
            barContainer.appendChild(barOuter);
            barContainer.appendChild(barValue);
            chart.appendChild(barContainer);
            
            // Animate with delay based on index
            setTimeout(() => {
                barFill.style.width = item.value + '%';
            }, 300 + (index * 150));
        });
    }
    
    // Create and animate line chart
    function createLineChart(container) {
        const chart = container.querySelector('.line-chart');
        if (!chart) return;
        
        // Sample data points
        const data = [15, 30, 25, 60, 45, 85, 70];
        const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
        
        // Create SVG element
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.setAttribute("viewBox", "0 0 1000 300");
        
        // Create gradient
        const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
        gradient.setAttribute("id", "line-gradient");
        gradient.setAttribute("x1", "0%");
        gradient.setAttribute("y1", "0%");
        gradient.setAttribute("x2", "100%");
        gradient.setAttribute("y2", "0%");
        
        const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        stop1.setAttribute("offset", "0%");
        stop1.setAttribute("stop-color", "var(--primary-color)");
        
        const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        stop2.setAttribute("offset", "100%");
        stop2.setAttribute("stop-color", "var(--accent-color)");
        
        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        defs.appendChild(gradient);
        svg.appendChild(defs);
        
        // Calculate positions
        const maxValue = Math.max(...data);
        const xGap = 1000 / (data.length - 1);
        const points = data.map((value, index) => {
            return {
                x: index * xGap,
                y: 300 - (value / maxValue * 250) - 25 // Leave margin at top and bottom
            };
        });
        
        // Draw line
        let pathD = `M ${points[0].x},${points[0].y}`;
        points.slice(1).forEach(point => {
            pathD += ` L ${point.x},${point.y}`;
        });
        
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", pathD);
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", "url(#line-gradient)");
        path.setAttribute("stroke-width", "3");
        path.setAttribute("stroke-linecap", "round");
        
        // Draw points
        const pointsGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        points.forEach((point, index) => {
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", point.x);
            circle.setAttribute("cy", point.y);
            circle.setAttribute("r", "6");
            circle.setAttribute("fill", "var(--bg-color)");
            circle.setAttribute("stroke", "var(--primary-color)");
            circle.setAttribute("stroke-width", "2");
            circle.setAttribute("opacity", "0");
            
            // Animation delay for points
            setTimeout(() => {
                circle.setAttribute("opacity", "1");
            }, 1500 + (index * 150));
            
            pointsGroup.appendChild(circle);
            
            // Add labels
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", point.x);
            text.setAttribute("y", "290");
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("font-size", "12");
            text.setAttribute("fill", "var(--text-color)");
            text.textContent = labels[index];
            svg.appendChild(text);
        });
        
        // Animate path
        svg.appendChild(path);
        svg.appendChild(pointsGroup);
        chart.appendChild(svg);
        
        const pathLength = path.getTotalLength();
        path.style.strokeDasharray = pathLength;
        path.style.strokeDashoffset = pathLength;
        
        setTimeout(() => {
            path.style.transition = "stroke-dashoffset 1.5s ease-in-out";
            path.style.strokeDashoffset = "0";
        }, 300);
    }
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Handle animation when scrolled into view
    function handleInsightsAnimation() {
        if (isInViewport(insightsSection)) {
            // Animate cards with fade-in and slide-up
            insightCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate');
                    
                    // Animate counter in the card
                    const counter = card.querySelector('.insight-number');
                    if (counter) {
                        const targetValue = parseInt(counter.dataset.value) || 0;
                        animateCounter(counter, targetValue);
                    }
                }, index * 200);
            });
            
            // Create and animate charts
            chartContainers.forEach((container, index) => {
                setTimeout(() => {
                    container.classList.add('animate');
                    
                    if (container.classList.contains('bar-chart-container')) {
                        createBarChart(container);
                    } else if (container.classList.contains('line-chart-container')) {
                        createLineChart(container);
                    }
                }, 500 + (index * 300));
            });
            
            // Remove scroll listener once animated
            window.removeEventListener('scroll', handleInsightsAnimation);
        }
    }
    
    // Add scroll listener and check initial position
    window.addEventListener('scroll', handleInsightsAnimation);
    // Wait for page to be fully loaded then check if the section is already visible
    setTimeout(handleInsightsAnimation, 500);
});

// AI Features Section Animations
document.addEventListener('DOMContentLoaded', function() {
    // Function to animate AI features when scrolled into view
    const animateAIFeatures = () => {
        const aiFeatureCards = document.querySelectorAll('.ai-feature-card');
        
        aiFeatureCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight * 0.85) {
                setTimeout(() => {
                    card.classList.add('animated');
                }, 150 * index); // Stagger animation
            }
        });
    };
    
    // Initial check
    animateAIFeatures();
    
    // Check on scroll
    window.addEventListener('scroll', animateAIFeatures);
    
    // Add hover effects for feature details
    document.querySelectorAll('.feature-details li').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.color = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.color = '';
        });
    });
    
    // Initialize Lottie Animations
    try {
        // Upload success animations
        const audioUploadAnimation = lottie.loadAnimation({
            container: document.getElementById('audio-upload-animation'),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: 'assets/animations/upload_success.json'
        });
        
        const lyricsUploadAnimation = lottie.loadAnimation({
            container: document.getElementById('lyrics-upload-animation'),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: 'assets/animations/upload_success.json'
        });
        
        const syncLyricsAnimation = lottie.loadAnimation({
            container: document.getElementById('sync-lyrics-animation'),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: 'assets/animations/upload_success.json'
        });
        
        const syncAudioAnimation = lottie.loadAnimation({
            container: document.getElementById('sync-audio-animation'),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: 'assets/animations/upload_success.json'
        });
        
        // Sync process animation
        const syncProcessAnimation = lottie.loadAnimation({
            container: document.getElementById('sync-process-animation'),
            renderer: 'svg',
            loop: true,
            autoplay: false,
            path: 'assets/animations/syncing.json'
        });
        
        // Attach event listeners to file inputs
        const audioFileInput = document.getElementById('audio-file');
        const lyricsFileInput = document.getElementById('lyrics-file');
        const syncLyricsInput = document.getElementById('lyrics-file-input');
        const syncAudioInput = document.getElementById('audio-file-input');
        const syncAllBtn = document.getElementById('sync-all-btn');
        
        if (audioFileInput) {
            audioFileInput.addEventListener('change', function(e) {
                if (e.target.files.length > 0) {
                    document.getElementById('audio-upload-animation').classList.add('active');
                    audioUploadAnimation.goToAndPlay(0, true);
                    
                    // Display file info
                    const fileInfo = document.getElementById('audio-info');
                    if (fileInfo) {
                        fileInfo.textContent = e.target.files[0].name;
                        fileInfo.classList.add('active');
                    }
                }
            });
        
            // Also handle drag and drop
            const audioUploadBox = document.getElementById('audio-upload');
            if (audioUploadBox) {
                audioUploadBox.addEventListener('dragover', function(e) {
                    e.preventDefault();
                    audioUploadBox.classList.add('dragover');
                });
                
                audioUploadBox.addEventListener('dragleave', function() {
                    audioUploadBox.classList.remove('dragover');
                });
                
                audioUploadBox.addEventListener('drop', function(e) {
                    e.preventDefault();
                    audioUploadBox.classList.remove('dragover');
                    if (e.dataTransfer.files.length > 0) {
                        audioFileInput.files = e.dataTransfer.files;
                        
                        document.getElementById('audio-upload-animation').classList.add('active');
                        audioUploadAnimation.goToAndPlay(0, true);
                        
                        // Display file info
                        const fileInfo = document.getElementById('audio-info');
                        if (fileInfo) {
                            fileInfo.textContent = e.dataTransfer.files[0].name;
                            fileInfo.classList.add('active');
                        }
                    }
                });
                
                audioUploadBox.addEventListener('click', function() {
                    audioFileInput.click();
                });
            }
        }
        
        if (lyricsFileInput) {
            lyricsFileInput.addEventListener('change', function(e) {
                if (e.target.files.length > 0) {
                    document.getElementById('lyrics-upload-animation').classList.add('active');
                    lyricsUploadAnimation.goToAndPlay(0, true);
                    
                    // Display file info
                    const fileInfo = document.getElementById('lyrics-info');
                    if (fileInfo) {
                        fileInfo.textContent = e.target.files[0].name;
                        fileInfo.classList.add('active');
                    }
                }
            });
        
            // Also handle drag and drop
            const lyricsUploadBox = document.getElementById('lyrics-upload');
            if (lyricsUploadBox) {
                lyricsUploadBox.addEventListener('dragover', function(e) {
                    e.preventDefault();
                    lyricsUploadBox.classList.add('dragover');
                });
                
                lyricsUploadBox.addEventListener('dragleave', function() {
                    lyricsUploadBox.classList.remove('dragover');
                });
                
                lyricsUploadBox.addEventListener('drop', function(e) {
                    e.preventDefault();
                    lyricsUploadBox.classList.remove('dragover');
                    if (e.dataTransfer.files.length > 0) {
                        lyricsFileInput.files = e.dataTransfer.files;
                        
                        document.getElementById('lyrics-upload-animation').classList.add('active');
                        lyricsUploadAnimation.goToAndPlay(0, true);
                        
                        // Display file info
                        const fileInfo = document.getElementById('lyrics-info');
                        if (fileInfo) {
                            fileInfo.textContent = e.dataTransfer.files[0].name;
                            fileInfo.classList.add('active');
                        }
                    }
                });
                
                lyricsUploadBox.addEventListener('click', function() {
                    lyricsFileInput.click();
                });
            }
        }
        
        // Sync editor file inputs
        if (syncLyricsInput) {
            syncLyricsInput.addEventListener('change', function(e) {
                if (e.target.files.length > 0) {
                    document.getElementById('sync-lyrics-animation').classList.add('active');
                    syncLyricsAnimation.goToAndPlay(0, true);
                    
                    // Update file name display
                    const fileNameDisplay = document.getElementById('file-name');
                    if (fileNameDisplay) {
                        fileNameDisplay.textContent = e.target.files[0].name;
                    }
                }
            });
            
            // Attach click event to button
            const lyricsUploadBtn = document.querySelector('.file-upload-box .upload-btn');
            if (lyricsUploadBtn) {
                lyricsUploadBtn.addEventListener('click', function() {
                    syncLyricsInput.click();
                });
            }
        }
        
        if (syncAudioInput) {
            syncAudioInput.addEventListener('change', function(e) {
                if (e.target.files.length > 0) {
                    document.getElementById('sync-audio-animation').classList.add('active');
                    syncAudioAnimation.goToAndPlay(0, true);
                    
                    // Update file name display
                    const fileNameDisplay = document.getElementById('audio-file-name');
                    if (fileNameDisplay) {
                        fileNameDisplay.textContent = e.target.files[0].name;
                    }
                }
            });
            
            // Attach click event to button
            const audioUploadBtn = document.querySelector('.audio-upload-box .upload-btn');
            if (audioUploadBtn) {
                audioUploadBtn.addEventListener('click', function() {
                    syncAudioInput.click();
                });
            }
        }
        
        // Auto-sync all button
        if (syncAllBtn) {
            syncAllBtn.addEventListener('click', function() {
                const animationContainer = document.getElementById('sync-process-animation');
                if (animationContainer) {
                    animationContainer.classList.add('active');
                    syncProcessAnimation.play();
                    
                    // Simulate syncing process
                    setTimeout(function() {
                        animationContainer.classList.remove('active');
                        syncProcessAnimation.stop();
                        
                        // Here you would normally update UI with synced lyrics
                        alert('Lyrics synchronized successfully!');
                    }, 3000);
                }
            });
        }
        
        // Reset animations on complete
        [audioUploadAnimation, lyricsUploadAnimation, syncLyricsAnimation, syncAudioAnimation].forEach(animation => {
            animation.addEventListener('complete', function() {
                setTimeout(() => {
                    document.querySelectorAll('.lottie-upload-animation.active').forEach(container => {
                        container.classList.remove('active');
                    });
                }, 1000);
            });
        });
    } catch (err) {
        console.error('Error initializing Lottie animations:', err);
    }
});

// AI Mood Detection functionality
function detectMoodFromLyrics(lyrics) {
    // Mood categories with associated keywords
    const moodKeywords = {
        Romantic: ['love', 'heart', 'kiss', 'hold', 'embrace', 'forever', 'beautiful', 'sweet', 'passion', 'devotion'],
        Happy: ['happy', 'joy', 'smile', 'laugh', 'fun', 'bright', 'sunny', 'dancing', 'celebration', 'cheerful'],
        Sad: ['sad', 'cry', 'tear', 'pain', 'hurt', 'alone', 'lonely', 'sorry', 'missing', 'regret'],
        Angry: ['anger', 'fight', 'hate', 'rage', 'scream', 'break', 'war', 'battle', 'fire', 'burn'],
        Melancholic: ['rain', 'grey', 'cloud', 'autumn', 'memory', 'nostalgia', 'goodbye', 'past', 'remember', 'forgotten'],
        Hopeful: ['hope', 'dream', 'future', 'believe', 'faith', 'rise', 'overcome', 'strength', 'tomorrow', 'possibility'],
        Anxious: ['fear', 'worry', 'doubt', 'nervous', 'stress', 'scared', 'afraid', 'unknown', 'dark', 'anxiety'],
        Peaceful: ['peace', 'calm', 'silence', 'quiet', 'gentle', 'breeze', 'flow', 'harmony', 'balance', 'tranquil']
    };
    
    // Convert lyrics to lowercase for case-insensitive matching
    const lowerLyrics = lyrics.toLowerCase();
    
    // Count occurrences of keywords for each mood
    const moodCounts = {};
    
    for (const [mood, keywords] of Object.entries(moodKeywords)) {
        moodCounts[mood] = 0;
        
        for (const keyword of keywords) {
            // Use word boundary to match whole words only
            const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
            const matches = lowerLyrics.match(regex);
            
            if (matches) {
                moodCounts[mood] += matches.length;
            }
        }
    }
    
    // Find the dominant mood (highest count)
    let dominantMood = 'Neutral';
    let highestCount = 0;
    
    for (const [mood, count] of Object.entries(moodCounts)) {
        if (count > highestCount) {
            highestCount = count;
            dominantMood = mood;
        }
    }
    
    // If no mood keywords found, return Neutral
    if (highestCount === 0) {
        return {
            mood: 'Neutral',
            strength: 0,
            counts: moodCounts
        };
    }
    
    // Calculate mood strength (0-100)
    // This is a simple calculation based on the number of matches
    // Can be adjusted based on total word count if needed
    const strength = Math.min(100, Math.round((highestCount / 3) * 100));
    
    // Get secondary moods (>= 50% of dominant mood's count)
    const secondaryMoods = [];
    const threshold = highestCount * 0.5;
    
    for (const [mood, count] of Object.entries(moodCounts)) {
        if (mood !== dominantMood && count >= threshold && count > 0) {
            secondaryMoods.push(mood);
        }
    }
    
    return {
        mood: dominantMood,
        strength: strength,
        secondary: secondaryMoods,
        counts: moodCounts
    };
}

// Function to visualize the mood in the UI
function displayMoodTag(moodResult, containerElement) {
    if (!containerElement) return;
    
    // Clear previous mood displays
    const existingMoodDisplay = containerElement.querySelector('.mood-tag-container');
    if (existingMoodDisplay) {
        existingMoodDisplay.remove();
    }
    
    // Create mood display container
    const moodContainer = document.createElement('div');
    moodContainer.className = 'mood-tag-container';
    
    // Create primary mood tag
    const moodTag = document.createElement('div');
    moodTag.className = `mood-tag mood-${moodResult.mood.toLowerCase()}`;
    
    // Mood icon based on type
    let moodIcon = '';
    switch (moodResult.mood) {
        case 'Romantic':
            moodIcon = 'fa-heart';
            break;
        case 'Happy':
            moodIcon = 'fa-smile';
            break;
        case 'Sad':
            moodIcon = 'fa-sad-tear';
            break;
        case 'Angry':
            moodIcon = 'fa-fire';
            break;
        case 'Melancholic':
            moodIcon = 'fa-cloud-rain';
            break;
        case 'Hopeful':
            moodIcon = 'fa-star';
            break;
        case 'Anxious':
            moodIcon = 'fa-bolt';
            break;
        case 'Peaceful':
            moodIcon = 'fa-dove';
            break;
        default:
            moodIcon = 'fa-question';
    }
    
    moodTag.innerHTML = `
        <i class="fas ${moodIcon}"></i>
        <span class="mood-name">${moodResult.mood}</span>
        <span class="mood-strength">${moodResult.strength}%</span>
    `;
    
    moodContainer.appendChild(moodTag);
    
    // Add secondary moods if present
    if (moodResult.secondary && moodResult.secondary.length > 0) {
        const secondaryContainer = document.createElement('div');
        secondaryContainer.className = 'secondary-moods';
        
        moodResult.secondary.forEach(mood => {
            const secondaryTag = document.createElement('span');
            secondaryTag.className = `secondary-mood-tag mood-${mood.toLowerCase()}`;
            secondaryTag.textContent = mood;
            secondaryContainer.appendChild(secondaryTag);
        });
        
        moodContainer.appendChild(secondaryContainer);
    }
    
    // Add mood details for hover
    const moodDetails = document.createElement('div');
    moodDetails.className = 'mood-details';
    moodDetails.innerHTML = '<h4>Mood Analysis</h4>';
    
    const moodList = document.createElement('ul');
    for (const [mood, count] of Object.entries(moodResult.counts)) {
        if (count > 0) {
            const moodItem = document.createElement('li');
            moodItem.innerHTML = `<span>${mood}</span>: <span>${count}</span>`;
            moodList.appendChild(moodItem);
        }
    }
    
    moodDetails.appendChild(moodList);
    moodContainer.appendChild(moodDetails);
    
    // Add to container
    containerElement.appendChild(moodContainer);
    
    // Return container in case additional processing is needed
    return moodContainer;
}

// Hook the mood detection to the lyrics file upload
document.addEventListener('DOMContentLoaded', function() {
    // Find the lyrics file input elements
    const lyricsFileInput = document.getElementById('lyrics-file');
    const syncLyricsInput = document.getElementById('lyrics-file-input');
    
    // Function to handle file reading and mood detection
    function processLyricsFile(fileInput, displayContainer) {
        if (!fileInput || !fileInput.files || fileInput.files.length === 0) return;
        
        const file = fileInput.files[0];
        if (file.type !== 'text/plain') {
            alert('Please upload a text file for lyrics analysis.');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const lyrics = e.target.result;
            const moodResult = detectMoodFromLyrics(lyrics);
            
            // Display mood in the appropriate container
            if (displayContainer) {
                displayMoodTag(moodResult, displayContainer);
            }
            
            // Store the mood result for later use in the video generation
            if (fileInput.id === 'lyrics-file') {
                // For main upload section
                fileInput.dataset.moodResult = JSON.stringify(moodResult);
            } else {
                // For sync editor section
                fileInput.dataset.moodResult = JSON.stringify(moodResult);
            }
        };
        
        reader.readAsText(file);
    }
    
    // Main upload section
    if (lyricsFileInput) {
        lyricsFileInput.addEventListener('change', function() {
            const fileInfoContainer = document.getElementById('lyrics-info');
            processLyricsFile(this, fileInfoContainer);
        });
        
        // Also handle the drop event
        const lyricsUploadBox = document.getElementById('lyrics-upload');
        if (lyricsUploadBox) {
            lyricsUploadBox.addEventListener('drop', function(e) {
                e.preventDefault();
                if (e.dataTransfer.files.length > 0) {
                    lyricsFileInput.files = e.dataTransfer.files;
                    const fileInfoContainer = document.getElementById('lyrics-info');
                    processLyricsFile(lyricsFileInput, fileInfoContainer);
                }
            });
        }
    }
    
    // Lyrics sync editor section
    if (syncLyricsInput) {
        syncLyricsInput.addEventListener('change', function() {
            const previewContainer = document.getElementById('preview-container');
            processLyricsFile(this, previewContainer);
        });
    }
});

// Integrate mood detection with uploaded files
document.addEventListener('DOMContentLoaded', () => {
    // Find upload elements
    const lyricsFileInput = document.getElementById('lyrics-file');
    const audioFileInput = document.getElementById('audio-file');
    const generateBtn = document.querySelector('.generate-btn');
    
    if (lyricsFileInput) {
        lyricsFileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                const file = e.target.files[0];
                const reader = new FileReader();
                
                reader.onload = (event) => {
                    const lyricsContent = event.target.result;
                    // Perform mood detection
                    const moodResult = detectMoodFromLyrics(lyricsContent);
                    
                    // Display mood tags
                    const moodContainer = document.getElementById('lyrics-info');
                    if (moodContainer) {
                        displayMoodTag(moodResult, moodContainer);
                        
                        // Update genre suggestion based on mood
                        suggestGenreBasedOnMood(moodResult.mood);
                    }
                };
                
                reader.readAsText(file);
            }
        });
    }
    
    // Suggest genre based on detected mood
    function suggestGenreBasedOnMood(mood) {
        const genreSelect = document.getElementById('genre');
        if (!genreSelect) return;
        
        // Mood to genre mapping
        const moodGenreMap = {
            'Romantic': 'pop',
            'Happy': 'pop',
            'Sad': 'lofi',
            'Angry': 'rock',
            'Melancholic': 'classical',
            'Hopeful': 'edm',
            'Anxious': 'rock',
            'Peaceful': 'lofi',
            'Neutral': 'pop'
        };
        
        const suggestedGenre = moodGenreMap[mood] || 'pop';
        
        // Set the genre dropdown value
        genreSelect.value = suggestedGenre;
        
        // Update genre card selection
        const genreCards = document.querySelectorAll('.genre-card');
        genreCards.forEach(card => {
            card.classList.remove('selected');
            if (card.dataset.genre === suggestedGenre) {
                card.classList.add('selected');
            }
        });
        
        // Apply the genre styles
        if (typeof applyGenreStyles === 'function') {
            applyGenreStyles(suggestedGenre);
        }
        
        // Show suggestion message
        const genreContainer = document.querySelector('.genre-selection');
        if (genreContainer) {
            const existingMsg = genreContainer.querySelector('.genre-suggestion');
            if (existingMsg) existingMsg.remove();
            
            const suggestionMsg = document.createElement('div');
            suggestionMsg.className = 'genre-suggestion';
            suggestionMsg.innerHTML = `<i class="fas fa-magic"></i> Based on the ${mood.toLowerCase()} mood of your lyrics, we suggest ${suggestedGenre.toUpperCase()} style`;
            genreContainer.prepend(suggestionMsg);
            
            // Fade out message after 5 seconds
            setTimeout(() => {
                suggestionMsg.style.opacity = '0';
                setTimeout(() => suggestionMsg.remove(), 1000);
            }, 5000);
        }
    }
    
    // Connect mood detection with video preview
    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            const lyricsInput = document.getElementById('lyrics-file');
            const audioInput = document.getElementById('audio-file');
            
            if (!lyricsInput.files.length || !audioInput.files.length) {
                alert('Please upload both audio and lyrics files');
                return;
            }
            
            // Display loading state
            generateBtn.classList.add('loading');
            
            // Simulate processing (would be replaced by actual backend processing)
            setTimeout(() => {
                generateBtn.classList.remove('loading');
                
                // Get mood data if available
                let moodData = null;
                try {
                    moodData = JSON.parse(lyricsInput.dataset.moodResult);
                } catch (e) {
                    // If no mood data available, try to detect it again
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const lyrics = event.target.result;
                        moodData = detectMoodFromLyrics(lyrics);
                        
                        // Scroll to preview section with mood data
                        scrollToPreviewWithMoodData(moodData);
                    };
                    reader.readAsText(lyricsInput.files[0]);
                    return;
                }
                
                // Scroll to preview section
                scrollToPreviewWithMoodData(moodData);
            }, 2000);
        });
    }
    
    function scrollToPreviewWithMoodData(moodData) {
        // Scroll to preview section
        const previewSection = document.getElementById('preview');
        if (previewSection) {
            previewSection.scrollIntoView({ behavior: 'smooth' });
            
            // Update preview with mood data
            const previewContainer = document.querySelector('.video-simulator');
            if (previewContainer && moodData) {
                // Add mood tag to preview
                const moodDisplay = document.createElement('div');
                moodDisplay.className = 'preview-mood';
                displayMoodTag(moodData, moodDisplay);
                
                // Add to preview container
                const existingMood = previewContainer.querySelector('.preview-mood');
                if (existingMood) existingMood.remove();
                
                previewContainer.appendChild(moodDisplay);
                
                // Apply visual effects based on mood
                applyMoodVisuals(moodData.mood, previewContainer);
            }
        }
    }
    
    // Apply mood-based visual effects to preview
    function applyMoodVisuals(mood, container) {
        if (!container) return;
        
        // Remove existing mood classes
        container.classList.remove(
            'mood-romantic', 'mood-happy', 'mood-sad', 'mood-angry', 
            'mood-melancholic', 'mood-hopeful', 'mood-anxious', 'mood-peaceful'
        );
        
        // Add specific mood class
        container.classList.add(`mood-${mood.toLowerCase()}`);
        
        // Apply mood-specific overlay effect
        const overlay = container.querySelector('.bg-overlay');
        if (overlay) {
            // Set different overlay gradients based on mood
            const moodOverlays = {
                'Romantic': 'linear-gradient(45deg, rgba(255, 0, 128, 0.3), rgba(255, 0, 255, 0.3))',
                'Happy': 'linear-gradient(45deg, rgba(255, 165, 0, 0.3), rgba(255, 255, 0, 0.3))',
                'Sad': 'linear-gradient(45deg, rgba(0, 0, 128, 0.4), rgba(0, 0, 255, 0.3))',
                'Angry': 'linear-gradient(45deg, rgba(255, 0, 0, 0.4), rgba(128, 0, 0, 0.4))',
                'Melancholic': 'linear-gradient(45deg, rgba(47, 79, 79, 0.4), rgba(72, 61, 139, 0.4))',
                'Hopeful': 'linear-gradient(45deg, rgba(135, 206, 250, 0.3), rgba(100, 149, 237, 0.3))',
// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Update active link based on scroll position
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Smooth scrolling for navigation links
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 60,
                behavior: 'smooth'
            });
            
            // Close mobile menu after clicking a link
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// Genre Selection
const genreCards = document.querySelectorAll('.genre-card');
const videoWrapper = document.querySelector('.video-wrapper');
const genreSelect = document.getElementById('genre');

// Genre-specific styles
const genreStyles = {
    pop: {
        background: 'linear-gradient(45deg, #ff6b6b, #ff8e8e)',
        overlay: 'linear-gradient(45deg, rgba(255, 107, 107, 0.8), rgba(255, 142, 142, 0.8))',
        textColor: '#ffffff',
        accentColor: '#ff6b6b',
        bgImage: 'url("https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
        animation: 'pop-animation',
        particles: 'circles'
    },
    edm: {
        background: 'linear-gradient(45deg, #6c5ce7, #a29bfe)',
        overlay: 'linear-gradient(45deg, rgba(108, 92, 231, 0.8), rgba(162, 155, 254, 0.8))',
        textColor: '#ffffff',
        accentColor: '#6c5ce7',
        bgImage: 'url("https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
        animation: 'edm-animation',
        particles: 'squares'
    },
    rock: {
        background: 'linear-gradient(45deg, #2d3436, #636e72)',
        overlay: 'linear-gradient(45deg, rgba(45, 52, 54, 0.8), rgba(99, 110, 114, 0.8))',
        textColor: '#ffffff',
        accentColor: '#d63031',
        bgImage: 'url("https://images.unsplash.com/photo-1508973379184-7517410fb0bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
        animation: 'rock-animation',
        particles: 'triangles'
    },
    lofi: {
        background: 'linear-gradient(45deg, #00b894, #00cec9)',
        overlay: 'linear-gradient(45deg, rgba(0, 184, 148, 0.8), rgba(0, 206, 201, 0.8))',
        textColor: '#ffffff',
        accentColor: '#00b894',
        bgImage: 'url("https://images.unsplash.com/photo-1482855549413-c0d85a5de549?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
        animation: 'lofi-animation',
        particles: 'dots'
    },
    hiphop: {
        background: 'linear-gradient(45deg, #e84393, #fd79a8)',
        overlay: 'linear-gradient(45deg, rgba(232, 67, 147, 0.8), rgba(253, 121, 168, 0.8))',
        textColor: '#ffffff',
        accentColor: '#e84393',
        bgImage: 'url("https://images.unsplash.com/photo-1547707981-eeb6c52fce31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
        animation: 'hiphop-animation',
        particles: 'waves'
    },
    classical: {
        background: 'linear-gradient(45deg, #3c6382, #60a3bc)',
        overlay: 'linear-gradient(45deg, rgba(60, 99, 130, 0.8), rgba(96, 163, 188, 0.8))',
        textColor: '#ffffff',
        accentColor: '#3c6382',
        bgImage: 'url("https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
        animation: 'classical-animation',
        particles: 'lines'
    }
};

// Apply genre-specific styles
function applyGenreStyles(genre) {
    if (!genre || !genreStyles[genre]) return;
    
    const styles = genreStyles[genre];
    
    // Apply styles to document root
    document.documentElement.style.setProperty('--accent-color', styles.accentColor);
    
    // Update hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        // Update background
        const heroBackground = heroSection.querySelector('.hero-background');
        if (heroBackground) {
            // If there's a video, add class to fade it out
            const video = heroBackground.querySelector('video');
            if (video) {
                video.classList.add('faded');
            }
            
            // Add a background image
            heroBackground.style.backgroundImage = styles.bgImage;
            heroBackground.style.backgroundSize = 'cover';
            heroBackground.style.backgroundPosition = 'center';
        }
        
        // Update overlay gradient
        const overlay = heroSection.querySelector('.overlay');
        if (overlay) {
            overlay.style.background = styles.overlay;
        }
    }
    
    // Update video wrapper styles
    const videoWrapper = document.querySelector('.video-wrapper');
    if (videoWrapper) {
        videoWrapper.style.background = styles.background;
    }
    
    // Update video overlay styles
    const videoOverlay = document.querySelector('.video-overlay');
    if (videoOverlay) {
        videoOverlay.style.background = styles.overlay;
    }
    
    // Update text colors
    const videoTitle = document.querySelector('.video-title h3');
    const videoSubtitle = document.querySelector('.video-subtitle');
    if (videoTitle) videoTitle.style.color = styles.textColor;
    if (videoSubtitle) videoSubtitle.style.color = styles.textColor;
    
    // Add particle animation
    createParticleAnimation(genre, styles.particles);
    
    // Add genre-specific animation to buttons and cards
    applyGenreAnimations(genre);
}

// Create dynamic particle animation based on genre
function createParticleAnimation(genre, type) {
    // Remove any existing particle container
    const existingContainer = document.getElementById('particle-container');
    if (existingContainer) {
        existingContainer.remove();
    }
    
    // Create new particle container
    const particleContainer = document.createElement('div');
    particleContainer.id = 'particle-container';
    particleContainer.className = `particles ${type}`;
    
    // Add to hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.appendChild(particleContainer);
        
        // Generate particles based on type
        const particleCount = type === 'dots' ? 50 : 
                             type === 'lines' ? 20 :
                             type === 'waves' ? 10 : 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = `particle ${type}-particle`;
            
            // Random positioning and animation delay
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particle.style.animationDuration = `${5 + Math.random() * 10}s`;
            
            if (type === 'waves') {
                particle.style.width = `${30 + Math.random() * 100}px`;
                particle.style.height = `${5 + Math.random() * 10}px`;
                particle.style.opacity = `${0.1 + Math.random() * 0.2}`;
            } else if (type === 'lines') {
                particle.style.width = `${1 + Math.random() * 2}px`;
                particle.style.height = `${20 + Math.random() * 100}px`;
                particle.style.transform = `rotate(${Math.random() * 360}deg)`;
            }
            
            particleContainer.appendChild(particle);
        }
    }
}

// Apply animations to UI elements based on genre
function applyGenreAnimations(genre) {
    // Remove existing animation classes
    const animatedElements = document.querySelectorAll('.feature-card, .cta-button, .genre-card');
    animatedElements.forEach(el => {
        el.classList.remove('pop-animation', 'edm-animation', 'rock-animation', 'lofi-animation', 'hiphop-animation', 'classical-animation');
    });
    
    // Add new animation class
    const animationClass = genreStyles[genre].animation;
    animatedElements.forEach(el => {
        el.classList.add(animationClass);
    });
    
    // Update button hover styles
    const styleElement = document.getElementById('genre-dynamic-styles');
    if (!styleElement) {
        const newStyleElement = document.createElement('style');
        newStyleElement.id = 'genre-dynamic-styles';
        document.head.appendChild(newStyleElement);
    }
    
    const accentColor = genreStyles[genre].accentColor;
    const dynamicStyles = `
        .cta-button:hover,
        .sync-btn:hover,
        .feature-card:hover .feature-icon {
            background-color: ${accentColor} !important;
        }
        .feature-hover, 
        a:hover,
        .nav-links a:hover,
        .nav-links a.active {
            color: ${accentColor} !important;
        }
        .nav-links a::after,
        .nav-links a.active::after {
            background-color: ${accentColor} !important;
        }
        .progress-bar::before, 
        .seek-progress {
            background: ${accentColor} !important;
        }
    `;
    
    document.getElementById('genre-dynamic-styles').innerHTML = dynamicStyles;
}

// Handle genre card selection
genreCards.forEach(card => {
    card.addEventListener('click', () => {
        // Remove selected class from all cards
        genreCards.forEach(c => c.classList.remove('selected'));
        
        // Add selected class to clicked card
        card.classList.add('selected');
        
        // Get selected genre
        const genre = card.dataset.genre;
        
        // Update genre select dropdown
        genreSelect.value = genre;
        
        // Apply genre styles
        applyGenreStyles(genre);
    });
});

// Handle genre select dropdown change
genreSelect.addEventListener('change', (e) => {
    const genre = e.target.value;
    
    // Remove selected class from all cards
    genreCards.forEach(card => card.classList.remove('selected'));
    
    // Add selected class to matching card
    const selectedCard = document.querySelector(`.genre-card[data-genre="${genre}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }
    
    // Apply genre styles
    applyGenreStyles(genre);
});

// Initialize with default genre if selected
if (genreSelect.value) {
    applyGenreStyles(genreSelect.value);
    const selectedCard = document.querySelector(`.genre-card[data-genre="${genreSelect.value}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }
}

// Lyrics Sync Editor
class LyricsSyncEditor {
    constructor() {
        // Audio elements
        this.audio = new Audio();
        this.isPlaying = false;
        
        // Lyrics data
        this.lyrics = [];
        this.currentLineIndex = -1;
        this.syncMode = 'manual'; // 'manual' or 'auto'
        
        // DOM Elements
        this.initElements();
        this.attachEventListeners();
    }
    
    initElements() {
        // Upload elements
        this.lyricsFileInput = document.getElementById('lyrics-file-input');
        this.audioFileInput = document.getElementById('audio-file-input');
        this.fileNameDisplay = document.getElementById('file-name');
        this.audioFileNameDisplay = document.getElementById('audio-file-name');
        this.uploadButtons = document.querySelectorAll('.upload-btn');
        
        // Player controls
        this.playButton = document.getElementById('play-btn');
        this.seekBar = document.getElementById('seek-bar');
        this.seekProgress = document.getElementById('seek-progress');
        this.currentTimeDisplay = document.getElementById('current-time');
        this.durationDisplay = document.getElementById('duration');
        this.syncModeButton = document.getElementById('sync-mode-btn');
        
        // Editor elements
        this.modeToggle = document.getElementById('mode-toggle');
        this.modeLabel = document.getElementById('mode-label');
        this.lyricsList = document.getElementById('lyrics-list');
        this.addTimestampBtn = document.getElementById('add-timestamp-btn');
        this.syncAllBtn = document.getElementById('sync-all-btn');
        this.exportBtn = document.getElementById('export-btn');
        
        // Preview
        this.previewContainer = document.getElementById('preview-container');
    }
    
    attachEventListeners() {
        // File upload listeners
        this.uploadButtons[0].addEventListener('click', () => this.lyricsFileInput.click());
        this.uploadButtons[1].addEventListener('click', () => this.audioFileInput.click());
        this.lyricsFileInput.addEventListener('change', (e) => this.handleLyricsFileUpload(e));
        this.audioFileInput.addEventListener('change', (e) => this.handleAudioFileUpload(e));
        
        // Player control listeners
        this.playButton.addEventListener('click', () => this.togglePlay());
        this.seekBar.addEventListener('click', (e) => this.handleSeek(e));
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('loadedmetadata', () => this.handleAudioLoaded());
        this.audio.addEventListener('ended', () => this.handleAudioEnded());
        
        // Editor listeners
        this.modeToggle.addEventListener('change', () => this.toggleSyncMode());
        this.addTimestampBtn.addEventListener('click', () => this.addTimestamp());
        this.syncAllBtn.addEventListener('click', () => this.autoSyncAll());
        this.exportBtn.addEventListener('click', () => this.exportLRC());
    }
    
    // File handling methods
    handleLyricsFileUpload(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        this.fileNameDisplay.textContent = file.name;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            this.parseLyrics(content);
        };
        reader.readAsText(file);
    }
    
    handleAudioFileUpload(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        this.audioFileNameDisplay.textContent = file.name;
        
        const fileURL = URL.createObjectURL(file);
        this.audio.src = fileURL;
        this.audio.load();
    }
    
    parseLyrics(content) {
        const lines = content.split('\n');
        this.lyrics = lines
            .filter(line => line.trim())
            .map((line, index) => ({
                index,
                text: line.trim(),
                time: null,
                formattedTime: '--:--'
            }));
            
        this.renderLyrics();
    }
    
    // Audio control methods
    togglePlay() {
        if (this.isPlaying) {
            this.audio.pause();
        } else {
            if (this.audio.src) {
                this.audio.play();
            }
        }
        
        this.isPlaying = !this.isPlaying;
        this.updatePlayButton();
    }
    
    updatePlayButton() {
        const icon = this.playButton.querySelector('i');
        icon.className = this.isPlaying ? 'fas fa-pause' : 'fas fa-play';
    }
    
    handleSeek(e) {
        if (!this.audio.duration) return;
        
        const rect = this.seekBar.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        this.audio.currentTime = pos * this.audio.duration;
    }
    
    updateProgress() {
        if (!this.audio.duration) return;
        
        const progress = (this.audio.currentTime / this.audio.duration) * 100;
        this.seekProgress.style.width = `${progress}%`;
        
        this.currentTimeDisplay.textContent = this.formatTime(this.audio.currentTime);
        
        // Update active line
        this.updateActiveLine();
        
        // Auto-sync if in auto mode
        if (this.syncMode === 'auto' && this.isPlaying) {
            this.checkAutoSync();
        }
    }
    
    handleAudioLoaded() {
        this.durationDisplay.textContent = this.formatTime(this.audio.duration);
    }
    
    handleAudioEnded() {
        this.isPlaying = false;
        this.updatePlayButton();
        this.seekProgress.style.width = '0%';
        this.currentTimeDisplay.textContent = '0:00';
        this.audio.currentTime = 0;
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    // Sync methods
    toggleSyncMode() {
        this.syncMode = this.modeToggle.checked ? 'auto' : 'manual';
        this.modeLabel.textContent = this.syncMode === 'auto' ? 'Auto Mode' : 'Manual Mode';
    }
    
    addTimestamp() {
        if (!this.audio.duration) return;
        
        // Find the first unsynchronized line or the current playing line
        let lineIndex = this.lyrics.findIndex(line => line.time === null);
        if (lineIndex === -1) return;
        
        // Add timestamp
        this.syncLine(lineIndex, this.audio.currentTime);
    }
    
    syncLine(index, time) {
        if (index < 0 || index >= this.lyrics.length) return;
        
        this.lyrics[index].time = time;
        this.lyrics[index].formattedTime = this.formatTime(time);
        
        // Update in the UI
        const lineElement = this.lyricsList.querySelector(`.lyric-item[data-index="${index}"]`);
        if (lineElement) {
            const badge = lineElement.querySelector('.timestamp-badge');
            if (badge) {
                badge.textContent = this.lyrics[index].formattedTime;
            }
        }
    }
    
    checkAutoSync() {
        if (this.currentLineIndex < this.lyrics.length - 1) {
            // Check if we need to sync the next line
            const nextIndex = this.currentLineIndex + 1;
            if (this.lyrics[nextIndex].time === null) {
                this.syncLine(nextIndex, this.audio.currentTime);
            }
        }
    }
    
    autoSyncAll() {
        if (!this.audio.duration || this.lyrics.length === 0) return;
        
        // Calculate even distribution of lines across the audio duration
        const interval = this.audio.duration / this.lyrics.length;
        
        this.lyrics.forEach((line, index) => {
            const time = interval * index;
            this.syncLine(index, time);
        });
    }
    
    updateActiveLine() {
        const currentTime = this.audio.currentTime;
        let activeIndex = -1;
        
        // Find the current line based on timestamps
        for (let i = 0; i < this.lyrics.length; i++) {
            if (this.lyrics[i].time !== null && this.lyrics[i].time <= currentTime) {
                activeIndex = i;
            } else if (this.lyrics[i].time !== null) {
                break;
            }
        }
        
        // Update UI if active line changed
        if (activeIndex !== this.currentLineIndex && activeIndex !== -1) {
            this.currentLineIndex = activeIndex;
            
            // Update lyric items
            const items = this.lyricsList.querySelectorAll('.lyric-item');
            items.forEach(item => item.classList.remove('active'));
            
            const activeItem = this.lyricsList.querySelector(`.lyric-item[data-index="${activeIndex}"]`);
            if (activeItem) {
                activeItem.classList.add('active');
                activeItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
            // Update preview
            this.updatePreview(activeIndex);
        }
    }
    
    // UI Rendering
    renderLyrics() {
        // Clear the lyrics list and empty state
        this.lyricsList.innerHTML = '';
        
        if (this.lyrics.length === 0) {
            const emptyState = document.createElement('div');
            emptyState.className = 'empty-state';
            emptyState.innerHTML = `
                <i class="fas fa-file-import"></i>
                <p>Upload a lyrics file to get started</p>
            `;
            this.lyricsList.appendChild(emptyState);
            return;
        }
        
        // Create lyrics items
        this.lyrics.forEach((line, index) => {
            const item = document.createElement('div');
            item.className = 'lyric-item';
            item.dataset.index = index;
            item.innerHTML = `
                <div class="lyric-number">${index + 1}</div>
                <div class="lyric-text">${line.text}</div>
                <div class="timestamp-badge">${line.formattedTime}</div>
            `;
            
            // Add click handler to sync current line
            item.addEventListener('click', () => {
                if (this.isPlaying && this.syncMode === 'manual') {
                    this.syncLine(index, this.audio.currentTime);
                }
            });
            
            this.lyricsList.appendChild(item);
        });
    }
    
    updatePreview(index) {
        if (index < 0 || index >= this.lyrics.length) return;
        
        this.previewContainer.innerHTML = '';
        const lyricElement = document.createElement('div');
        lyricElement.className = 'current-lyric';
        lyricElement.textContent = this.lyrics[index].text;
        this.previewContainer.appendChild(lyricElement);
    }
    
    // Export functions
    exportLRC() {
        if (this.lyrics.length === 0) return;
        
        let lrcContent = '';
        
        // Add metadata
        lrcContent += '[ti:Untitled]\n';
        lrcContent += '[ar:Unknown Artist]\n';
        lrcContent += '[al:Unknown Album]\n';
        lrcContent += '[by:LyricVision Editor]\n\n';
        
        // Add synced lyrics
        this.lyrics.forEach(line => {
            if (line.time !== null) {
                const mins = Math.floor(line.time / 60);
                const secs = Math.floor(line.time % 60);
                const ms = Math.floor((line.time % 1) * 100);
                
                const timeString = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
                lrcContent += `[${timeString}]${line.text}\n`;
            } else {
                // For unsynced lines, add comment
                lrcContent += `# ${line.text}\n`;
            }
        });
        
        // Create download link
        const blob = new Blob([lrcContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'lyrics.lrc';
        a.click();
        
        // Clean up
        URL.revokeObjectURL(url);
    }
}

// Initialize lyrics sync editor when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize existing functionality
    
    // Initialize lyrics sync editor
    const lyricsSyncEditor = new LyricsSyncEditor();
});

// Video Output Simulator
class VideoSimulator {
    constructor() {
        // Initialize properties
        this.lyrics = [];
        this.currentLineIndex = -1;
        this.audio = new Audio();
        this.isPlaying = false;
        this.activeLyric = null;
        this.currentProgress = 0;
        this.selectedGenre = 'pop';
        
        // DOM elements
        this.initializeElements();
        this.attachEventListeners();
        
        // Initialize simulation
        this.updateGenreDisplay();
        this.setTextSizeClass('medium');
        this.setTextPositionClass('middle');
    }
    
    initializeElements() {
        // Video container
        this.videoSimulator = document.querySelector('.video-simulator');
        this.bgAnimation = document.querySelector('.bg-animation');
        this.bgOverlay = document.querySelector('.bg-overlay');
        
        // Lyrics display
        this.karaokeContainer = document.getElementById('karaoke-lyrics');
        
        // Controls
        this.playButton = document.getElementById('video-play-btn');
        this.progressBar = document.getElementById('video-progress');
        this.progressIndicator = document.getElementById('video-progress-bar');
        this.currentTimeDisplay = document.getElementById('video-current-time');
        this.durationDisplay = document.getElementById('video-duration');
        this.downloadButton = document.getElementById('download-mock-video');
        this.genreDisplay = document.getElementById('current-genre');
        
        // Options
        this.effectIntensity = document.getElementById('effect-intensity');
        this.textSizeButtons = document.querySelectorAll('.text-size-buttons button');
        this.textPosition = document.getElementById('text-position');
        this.boldToggle = document.getElementById('bold-toggle');
        this.shadowToggle = document.getElementById('shadow-toggle');
        this.outlineToggle = document.getElementById('outline-toggle');
        
        // Effects
        this.effects = document.querySelectorAll('.effect');
    }
    
    attachEventListeners() {
        // Video playback controls
        this.playButton.addEventListener('click', () => this.togglePlay());
        this.progressBar.addEventListener('click', (e) => this.seek(e));
        this.downloadButton.addEventListener('click', () => this.downloadMockVideo());
        
        // Options
        this.effectIntensity.addEventListener('input', () => this.updateEffectIntensity());
        this.textPosition.addEventListener('change', () => this.updateTextPosition());
        
        // Style buttons
        this.textSizeButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.setTextSizeClass(button.dataset.size);
                this.updateButtonStates();
            });
        });
        
        this.boldToggle.addEventListener('click', () => {
            this.toggleTextStyle(this.boldToggle, 'style-bold');
        });
        
        this.shadowToggle.addEventListener('click', () => {
            this.toggleTextStyle(this.shadowToggle, 'style-shadow');
        });
        
        this.outlineToggle.addEventListener('click', () => {
            this.toggleTextStyle(this.outlineToggle, 'style-outline');
        });
        
        // Audio events
        this.audio.addEventListener('timeupdate', () => this.updateVideoProgress());
        this.audio.addEventListener('ended', () => this.handleVideoEnd());
        this.audio.addEventListener('loadedmetadata', () => {
            this.durationDisplay.textContent = this.formatTime(this.audio.duration);
        });
        
        // Listen for lyrics from sync editor
        document.addEventListener('lyricsUpdated', (e) => {
            if (e.detail && e.detail.lyrics) {
                this.setLyrics(e.detail.lyrics);
            }
        });
        
        // Listen for genre changes
        document.addEventListener('genreChanged', (e) => {
            if (e.detail && e.detail.genre) {
                this.updateGenre(e.detail.genre);
            }
        });
    }
    
    // Event handlers
    togglePlay() {
        if (!this.audio.src && this.lyrics.length === 0) {
            this.loadDemoContent();
            return;
        }
        
        if (this.isPlaying) {
            this.audio.pause();
        } else {
            this.audio.play();
        }
        
        this.isPlaying = !this.isPlaying;
        this.updatePlayButton();
    }
    
    updatePlayButton() {
        const icon = this.playButton.querySelector('i');
        icon.className = this.isPlaying ? 'fas fa-pause' : 'fas fa-play';
    }
    
    seek(e) {
        if (!this.audio.duration) return;
        
        const rect = this.progressBar.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        this.audio.currentTime = pos * this.audio.duration;
    }
    
    updateVideoProgress() {
        if (!this.audio.duration) return;
        
        const progress = (this.audio.currentTime / this.audio.duration) * 100;
        this.progressIndicator.style.width = `${progress}%`;
        this.currentTimeDisplay.textContent = this.formatTime(this.audio.currentTime);
        this.currentProgress = progress;
        
        // Update active lyric
        this.updateActiveLyric();
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    handleVideoEnd() {
        this.isPlaying = false;
        this.updatePlayButton();
        this.audio.currentTime = 0;
        this.progressIndicator.style.width = '0%';
        this.currentTimeDisplay.textContent = '0:00';
    }
    
    // Lyrics handling
    setLyrics(lyrics) {
        this.lyrics = lyrics;
        this.renderLyrics();
    }
    
    renderLyrics() {
        // Clear existing lyrics
        this.karaokeContainer.innerHTML = '';
        
        if (!this.lyrics || this.lyrics.length === 0) {
            const emptyState = document.createElement('div');
            emptyState.className = 'empty-lyrics';
            emptyState.innerHTML = `
                <i class="fas fa-music"></i>
                <p>Sync your lyrics to preview karaoke-style video</p>
            `;
            this.karaokeContainer.appendChild(emptyState);
            return;
        }
        
        // Add each lyric line
        this.lyrics.forEach((lyric, index) => {
            const line = document.createElement('div');
            line.className = 'lyric-line';
            line.dataset.index = index;
            
            // Split into words for word-by-word highlighting (simplified)
            const words = lyric.text.split(' ');
            words.forEach(word => {
                const wordSpan = document.createElement('span');
                wordSpan.className = 'lyric-word';
                
                // Create base text
                const baseText = document.createElement('span');
                baseText.className = 'base';
                baseText.textContent = word + ' ';
                
                // Create highlight text (same content, different color)
                const highlightText = document.createElement('span');
                highlightText.className = 'highlight';
                highlightText.textContent = word + ' ';
                
                wordSpan.appendChild(baseText);
                wordSpan.appendChild(highlightText);
                line.appendChild(wordSpan);
            });
            
            this.karaokeContainer.appendChild(line);
        });
    }
    
    updateActiveLyric() {
        const currentTime = this.audio.currentTime;
        let activeIndex = -1;
        
        // Find the current line based on timestamps
        for (let i = 0; i < this.lyrics.length; i++) {
            if (this.lyrics[i].time !== null && this.lyrics[i].time <= currentTime) {
                activeIndex = i;
            } else if (this.lyrics[i].time !== null) {
                break;
            }
        }
        
        // Update UI if active line changed
        if (activeIndex !== this.currentLineIndex && activeIndex !== -1) {
            this.currentLineIndex = activeIndex;
            
            // Remove active class from all lines
            const lines = this.karaokeContainer.querySelectorAll('.lyric-line');
            lines.forEach(line => line.classList.remove('active'));
            
            // Add active class to current line
            const activeLine = this.karaokeContainer.querySelector(`.lyric-line[data-index="${activeIndex}"]`);
            if (activeLine) {
                activeLine.classList.add('active');
                this.activeLyric = activeLine;
                
                // Simulate word-by-word highlighting
                this.simulateWordHighlighting(activeLine, activeIndex);
            }
        }
    }
    
    simulateWordHighlighting(lineElement, lineIndex) {
        // Get all words in this line
        const words = lineElement.querySelectorAll('.lyric-word');
        if (!words.length) return;
        
        // Get timing information
        const currentLine = this.lyrics[lineIndex];
        let nextLineTime;
        
        // Find the next line with a timestamp
        for (let i = lineIndex + 1; i < this.lyrics.length; i++) {
            if (this.lyrics[i].time !== null) {
                nextLineTime = this.lyrics[i].time;
                break;
            }
        }
        
        // If this is the last line, use audio duration
        if (!nextLineTime) {
            nextLineTime = this.audio.duration;
        }
        
        // Calculate total line duration
        const lineDuration = nextLineTime - currentLine.time;
        if (lineDuration <= 0) return;
        
        // Calculate progress within this line
        const lineProgress = (this.audio.currentTime - currentLine.time) / lineDuration;
        
        // Apply highlighting to words based on line progress
        const wordCount = words.length;
        const wordsToHighlight = Math.ceil(lineProgress * wordCount);
        
        words.forEach((word, wordIdx) => {
            const highlight = word.querySelector('.highlight');
            
            if (wordIdx < wordsToHighlight) {
                // Words that should be fully highlighted
                highlight.style.width = '100%';
            } else if (wordIdx === wordsToHighlight) {
                // Partially highlight the current word
                const partialProgress = (lineProgress * wordCount) % 1;
                highlight.style.width = `${partialProgress * 100}%`;
            } else {
                // Words not yet reached
                highlight.style.width = '0%';
            }
        });
    }
    
    // Video style and effects functions
    updateGenre(genre) {
        if (!genreStyles[genre]) return;
        
        this.selectedGenre = genre;
        const styles = genreStyles[genre];
        
        // Update background
        this.bgAnimation.style.background = styles.background;
        this.bgOverlay.style.background = styles.overlay;
        
        // Update effects
        this.effects.forEach(effect => {
            effect.style.background = `hsl(${Math.random() * 360}, 70%, 50%)`;
        });
        
        // Update display
        this.updateGenreDisplay();
    }
    
    updateGenreDisplay() {
        this.genreDisplay.textContent = this.selectedGenre.charAt(0).toUpperCase() + 
                                       this.selectedGenre.slice(1);
    }
    
    updateEffectIntensity() {
        const intensity = this.effectIntensity.value;
        
        // Update blur and opacity based on intensity
        this.effects.forEach(effect => {
            const blur = 10 + (intensity / 2);
            const opacity = 0.1 + (intensity / 200);
            
            effect.style.filter = `blur(${blur}px)`;
            effect.style.opacity = opacity;
        });
        
        // Adjust animation speed
        const animationDuration = 30 - (intensity / 5);
        this.bgAnimation.style.animationDuration = `${animationDuration}s`;
    }
    
    updateTextPosition() {
        const position = this.textPosition.value;
        this.setTextPositionClass(position);
    }
    
    setTextSizeClass(size) {
        this.karaokeContainer.classList.remove('text-small', 'text-medium', 'text-large');
        this.karaokeContainer.classList.add(`text-${size}`);
        
        // Update buttons
        this.textSizeButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.size === size);
        });
    }
    
    setTextPositionClass(position) {
        this.karaokeContainer.classList.remove('position-top', 'position-middle', 'position-bottom');
        this.karaokeContainer.classList.add(`position-${position}`);
    }
    
    toggleTextStyle(button, styleClass) {
        const hasClass = this.karaokeContainer.classList.toggle(styleClass);
        button.classList.toggle('active', hasClass);
    }
    
    updateButtonStates() {
        // Update size buttons
        this.textSizeButtons.forEach(button => {
            const isActive = this.karaokeContainer.classList.contains(`text-${button.dataset.size}`);
            button.classList.toggle('active', isActive);
        });
    }
    
    // Load demo content
    loadDemoContent() {
        // Demo lyrics
        const demoLyrics = [
            { index: 0, text: "Welcome to LyricVision", time: 0, formattedTime: "0:00" },
            { index: 1, text: "Turn your lyrics into amazing videos", time: 4, formattedTime: "0:04" },
            { index: 2, text: "Sync perfectly with the music", time: 8, formattedTime: "0:08" },
            { index: 3, text: "Choose from different visual styles", time: 12, formattedTime: "0:12" },
            { index: 4, text: "And share with the world", time: 16, formattedTime: "0:16" }
        ];
        
        this.setLyrics(demoLyrics);
        
        // Demo audio
        this.audio.src = "https://soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
        this.audio.load();
        
        // Start playing when loaded
        this.audio.addEventListener('canplaythrough', () => {
            this.togglePlay();
        }, { once: true });
    }
    
    // Download mock video
    downloadMockVideo() {
        // Create a simple text file with lyrics and timestamps
        if (!this.lyrics || this.lyrics.length === 0) {
            alert("Please sync some lyrics first!");
            return;
        }
        
        let content = "LyricVision Mock Video\n\n";
        content += `Genre: ${this.selectedGenre}\n\n`;
        content += "LYRICS:\n\n";
        
        this.lyrics.forEach(lyric => {
            if (lyric.time !== null) {
                content += `[${lyric.formattedTime}] ${lyric.text}\n`;
            } else {
                content += `${lyric.text}\n`;
            }
        });
        
        // Create and download the file
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `lyricvision_${this.selectedGenre}_video.txt`;
        a.click();
        
        // Clean up
        URL.revokeObjectURL(url);
    }
}

// Initialize simulator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize other components
    
    // Initialize video simulator
    const videoSimulator = new VideoSimulator();
    
    // Connect the sync editor with the video simulator
    const lyricsEditor = document.querySelector('#lyrics-sync');
    const syncAllBtn = document.getElementById('sync-all-btn');
    
    if (syncAllBtn) {
        syncAllBtn.addEventListener('click', () => {
            const lyricsSyncEditor = window.lyricsSyncEditor;
            if (lyricsSyncEditor && lyricsSyncEditor.lyrics) {
                // Dispatch event for lyrics update
                document.dispatchEvent(new CustomEvent('lyricsUpdated', {
                    detail: { lyrics: lyricsSyncEditor.lyrics }
                }));
            }
        });
    }
    
    // Connect genre selection to video simulator
    const genreCards = document.querySelectorAll('.genre-card');
    genreCards.forEach(card => {
        card.addEventListener('click', () => {
            const genre = card.dataset.genre;
            document.dispatchEvent(new CustomEvent('genreChanged', {
                detail: { genre }
            }));
        });
    });
});

// Insights Section Animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate insights when scrolled into view
    const insightsSection = document.querySelector('.insights');
    if (!insightsSection) return; // Exit if section doesn't exist
    
    const insightCards = document.querySelectorAll('.insight-card');
    const chartContainers = document.querySelectorAll('.chart-container');
    
    // Set bar chart data
    const barData = [
        { label: 'User Growth', value: 80 },
        { label: 'Video Quality', value: 65 },
        { label: 'Processing Speed', value: 75 },
        { label: 'User Satisfaction', value: 90 }
    ];
    
    // Counter animation function
    function animateCounter(element, target, duration = 1500) {
        let start = 0;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            const currentValue = Math.floor(progress * target);
            element.textContent = target > 1000 ? 
                (currentValue/1000).toFixed(1) + 'K' : 
                currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                // Add the plus sign or percentage after completion
                if (element.dataset.suffix) {
                    element.textContent += element.dataset.suffix;
                }
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // Create and animate bar charts
    function createBarChart(container) {
        const chart = container.querySelector('.bar-chart');
        if (!chart) return;
        
        // Clear existing content
        chart.innerHTML = '';
        
        // Create bars based on data
        barData.forEach((item, index) => {
            const barContainer = document.createElement('div');
            barContainer.className = 'bar-container';
            
            const barLabel = document.createElement('div');
            barLabel.className = 'bar-label';
            barLabel.textContent = item.label;
            
            const barOuter = document.createElement('div');
            barOuter.className = 'bar-outer';
            
            const barFill = document.createElement('div');
            barFill.className = 'bar-fill';
            barFill.style.width = '0%';
            
            const barValue = document.createElement('div');
            barValue.className = 'bar-value';
            barValue.textContent = item.value + '%';
            
            barOuter.appendChild(barFill);
            barContainer.appendChild(barLabel);
            barContainer.appendChild(barOuter);
            barContainer.appendChild(barValue);
            chart.appendChild(barContainer);
            
            // Animate with delay based on index
            setTimeout(() => {
                barFill.style.width = item.value + '%';
            }, 300 + (index * 150));
        });
    }
    
    // Create and animate line chart
    function createLineChart(container) {
        const chart = container.querySelector('.line-chart');
        if (!chart) return;
        
        // Sample data points
        const data = [15, 30, 25, 60, 45, 85, 70];
        const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
        
        // Create SVG element
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.setAttribute("viewBox", "0 0 1000 300");
        
        // Create gradient
        const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
        gradient.setAttribute("id", "line-gradient");
        gradient.setAttribute("x1", "0%");
        gradient.setAttribute("y1", "0%");
        gradient.setAttribute("x2", "100%");
        gradient.setAttribute("y2", "0%");
        
        const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        stop1.setAttribute("offset", "0%");
        stop1.setAttribute("stop-color", "var(--primary-color)");
        
        const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        stop2.setAttribute("offset", "100%");
        stop2.setAttribute("stop-color", "var(--accent-color)");
        
        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        defs.appendChild(gradient);
        svg.appendChild(defs);
        
        // Calculate positions
        const maxValue = Math.max(...data);
        const xGap = 1000 / (data.length - 1);
        const points = data.map((value, index) => {
            return {
                x: index * xGap,
                y: 300 - (value / maxValue * 250) - 25 // Leave margin at top and bottom
            };
        });
        
        // Draw line
        let pathD = `M ${points[0].x},${points[0].y}`;
        points.slice(1).forEach(point => {
            pathD += ` L ${point.x},${point.y}`;
        });
        
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", pathD);
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", "url(#line-gradient)");
        path.setAttribute("stroke-width", "3");
        path.setAttribute("stroke-linecap", "round");
        
        // Draw points
        const pointsGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        points.forEach((point, index) => {
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", point.x);
            circle.setAttribute("cy", point.y);
            circle.setAttribute("r", "6");
            circle.setAttribute("fill", "var(--bg-color)");
            circle.setAttribute("stroke", "var(--primary-color)");
            circle.setAttribute("stroke-width", "2");
            circle.setAttribute("opacity", "0");
            
            // Animation delay for points
            setTimeout(() => {
                circle.setAttribute("opacity", "1");
            }, 1500 + (index * 150));
            
            pointsGroup.appendChild(circle);
            
            // Add labels
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", point.x);
            text.setAttribute("y", "290");
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("font-size", "12");
            text.setAttribute("fill", "var(--text-color)");
            text.textContent = labels[index];
            svg.appendChild(text);
        });
        
        // Animate path
        svg.appendChild(path);
        svg.appendChild(pointsGroup);
        chart.appendChild(svg);
        
        const pathLength = path.getTotalLength();
        path.style.strokeDasharray = pathLength;
        path.style.strokeDashoffset = pathLength;
        
        setTimeout(() => {
            path.style.transition = "stroke-dashoffset 1.5s ease-in-out";
            path.style.strokeDashoffset = "0";
        }, 300);
    }
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Handle animation when scrolled into view
    function handleInsightsAnimation() {
        if (isInViewport(insightsSection)) {
            // Animate cards with fade-in and slide-up
            insightCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate');
                    
                    // Animate counter in the card
                    const counter = card.querySelector('.insight-number');
                    if (counter) {
                        const targetValue = parseInt(counter.dataset.value) || 0;
                        animateCounter(counter, targetValue);
                    }
                }, index * 200);
            });
            
            // Create and animate charts
            chartContainers.forEach((container, index) => {
                setTimeout(() => {
                    container.classList.add('animate');
                    
                    if (container.classList.contains('bar-chart-container')) {
                        createBarChart(container);
                    } else if (container.classList.contains('line-chart-container')) {
                        createLineChart(container);
                    }
                }, 500 + (index * 300));
            });
            
            // Remove scroll listener once animated
            window.removeEventListener('scroll', handleInsightsAnimation);
        }
    }
    
    // Add scroll listener and check initial position
    window.addEventListener('scroll', handleInsightsAnimation);
    // Wait for page to be fully loaded then check if the section is already visible
    setTimeout(handleInsightsAnimation, 500);
});

// AI Features Section Animations
document.addEventListener('DOMContentLoaded', function() {
    // Function to animate AI features when scrolled into view
    const animateAIFeatures = () => {
        const aiFeatureCards = document.querySelectorAll('.ai-feature-card');
        
        aiFeatureCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight * 0.85) {
                setTimeout(() => {
                    card.classList.add('animated');
                }, 150 * index); // Stagger animation
            }
        });
    };
    
    // Initial check
    animateAIFeatures();
    
    // Check on scroll
    window.addEventListener('scroll', animateAIFeatures);
    
    // Add hover effects for feature details
    document.querySelectorAll('.feature-details li').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.color = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.color = '';
        });
    });
    
    // Initialize Lottie Animations
    try {
        // Upload success animations
        const audioUploadAnimation = lottie.loadAnimation({
            container: document.getElementById('audio-upload-animation'),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: 'assets/animations/upload_success.json'
        });
        
        const lyricsUploadAnimation = lottie.loadAnimation({
            container: document.getElementById('lyrics-upload-animation'),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: 'assets/animations/upload_success.json'
        });
        
        const syncLyricsAnimation = lottie.loadAnimation({
            container: document.getElementById('sync-lyrics-animation'),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: 'assets/animations/upload_success.json'
        });
        
        const syncAudioAnimation = lottie.loadAnimation({
            container: document.getElementById('sync-audio-animation'),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: 'assets/animations/upload_success.json'
        });
        
        // Sync process animation
        const syncProcessAnimation = lottie.loadAnimation({
            container: document.getElementById('sync-process-animation'),
            renderer: 'svg',
            loop: true,
            autoplay: false,
            path: 'assets/animations/syncing.json'
        });
        
        // Attach event listeners to file inputs
        const audioFileInput = document.getElementById('audio-file');
        const lyricsFileInput = document.getElementById('lyrics-file');
        const syncLyricsInput = document.getElementById('lyrics-file-input');
        const syncAudioInput = document.getElementById('audio-file-input');
        const syncAllBtn = document.getElementById('sync-all-btn');
        
        if (audioFileInput) {
            audioFileInput.addEventListener('change', function(e) {
                if (e.target.files.length > 0) {
                    document.getElementById('audio-upload-animation').classList.add('active');
                    audioUploadAnimation.goToAndPlay(0, true);
                    
                    // Display file info
                    const fileInfo = document.getElementById('audio-info');
                    if (fileInfo) {
                        fileInfo.textContent = e.target.files[0].name;
                        fileInfo.classList.add('active');
                    }
                }
            });
        
            // Also handle drag and drop
            const audioUploadBox = document.getElementById('audio-upload');
            if (audioUploadBox) {
                audioUploadBox.addEventListener('dragover', function(e) {
                    e.preventDefault();
                    audioUploadBox.classList.add('dragover');
                });
                
                audioUploadBox.addEventListener('dragleave', function() {
                    audioUploadBox.classList.remove('dragover');
                });
                
                audioUploadBox.addEventListener('drop', function(e) {
                    e.preventDefault();
                    audioUploadBox.classList.remove('dragover');
                    if (e.dataTransfer.files.length > 0) {
                        audioFileInput.files = e.dataTransfer.files;
                        
                        document.getElementById('audio-upload-animation').classList.add('active');
                        audioUploadAnimation.goToAndPlay(0, true);
                        
                        // Display file info
                        const fileInfo = document.getElementById('audio-info');
                        if (fileInfo) {
                            fileInfo.textContent = e.dataTransfer.files[0].name;
                            fileInfo.classList.add('active');
                        }
                    }
                });
                
                audioUploadBox.addEventListener('click', function() {
                    audioFileInput.click();
                });
            }
        }
        
        if (lyricsFileInput) {
            lyricsFileInput.addEventListener('change', function(e) {
                if (e.target.files.length > 0) {
                    document.getElementById('lyrics-upload-animation').classList.add('active');
                    lyricsUploadAnimation.goToAndPlay(0, true);
                    
                    // Display file info
                    const fileInfo = document.getElementById('lyrics-info');
                    if (fileInfo) {
                        fileInfo.textContent = e.target.files[0].name;
                        fileInfo.classList.add('active');
                    }
                }
            });
        
            // Also handle drag and drop
            const lyricsUploadBox = document.getElementById('lyrics-upload');
            if (lyricsUploadBox) {
                lyricsUploadBox.addEventListener('dragover', function(e) {
                    e.preventDefault();
                    lyricsUploadBox.classList.add('dragover');
                });
                
                lyricsUploadBox.addEventListener('dragleave', function() {
                    lyricsUploadBox.classList.remove('dragover');
                });
                
                lyricsUploadBox.addEventListener('drop', function(e) {
                    e.preventDefault();
                    lyricsUploadBox.classList.remove('dragover');
                    if (e.dataTransfer.files.length > 0) {
                        lyricsFileInput.files = e.dataTransfer.files;
                        
                        document.getElementById('lyrics-upload-animation').classList.add('active');
                        lyricsUploadAnimation.goToAndPlay(0, true);
                        
                        // Display file info
                        const fileInfo = document.getElementById('lyrics-info');
                        if (fileInfo) {
                            fileInfo.textContent = e.dataTransfer.files[0].name;
                            fileInfo.classList.add('active');
                        }
                    }
                });
                
                lyricsUploadBox.addEventListener('click', function() {
                    lyricsFileInput.click();
                });
            }
        }
        
        // Sync editor file inputs
        if (syncLyricsInput) {
            syncLyricsInput.addEventListener('change', function(e) {
                if (e.target.files.length > 0) {
                    document.getElementById('sync-lyrics-animation').classList.add('active');
                    syncLyricsAnimation.goToAndPlay(0, true);
                    
                    // Update file name display
                    const fileNameDisplay = document.getElementById('file-name');
                    if (fileNameDisplay) {
                        fileNameDisplay.textContent = e.target.files[0].name;
                    }
                }
            });
            
            // Attach click event to button
            const lyricsUploadBtn = document.querySelector('.file-upload-box .upload-btn');
            if (lyricsUploadBtn) {
                lyricsUploadBtn.addEventListener('click', function() {
                    syncLyricsInput.click();
                });
            }
        }
        
        if (syncAudioInput) {
            syncAudioInput.addEventListener('change', function(e) {
                if (e.target.files.length > 0) {
                    document.getElementById('sync-audio-animation').classList.add('active');
                    syncAudioAnimation.goToAndPlay(0, true);
                    
                    // Update file name display
                    const fileNameDisplay = document.getElementById('audio-file-name');
                    if (fileNameDisplay) {
                        fileNameDisplay.textContent = e.target.files[0].name;
                    }
                }
            });
            
            // Attach click event to button
            const audioUploadBtn = document.querySelector('.audio-upload-box .upload-btn');
            if (audioUploadBtn) {
                audioUploadBtn.addEventListener('click', function() {
                    syncAudioInput.click();
                });
            }
        }
        
        // Auto-sync all button
        if (syncAllBtn) {
            syncAllBtn.addEventListener('click', function() {
                const animationContainer = document.getElementById('sync-process-animation');
                if (animationContainer) {
                    animationContainer.classList.add('active');
                    syncProcessAnimation.play();
                    
                    // Simulate syncing process
                    setTimeout(function() {
                        animationContainer.classList.remove('active');
                        syncProcessAnimation.stop();
                        
                        // Here you would normally update UI with synced lyrics
                        alert('Lyrics synchronized successfully!');
                    }, 3000);
                }
            });
        }
        
        // Reset animations on complete
        [audioUploadAnimation, lyricsUploadAnimation, syncLyricsAnimation, syncAudioAnimation].forEach(animation => {
            animation.addEventListener('complete', function() {
                setTimeout(() => {
                    document.querySelectorAll('.lottie-upload-animation.active').forEach(container => {
                        container.classList.remove('active');
                    });
                }, 1000);
            });
        });
    } catch (err) {
        console.error('Error initializing Lottie animations:', err);
    }
});

// AI Mood Detection functionality
function detectMoodFromLyrics(lyrics) {
    // Mood categories with associated keywords
    const moodKeywords = {
        Romantic: ['love', 'heart', 'kiss', 'hold', 'embrace', 'forever', 'beautiful', 'sweet', 'passion', 'devotion'],
        Happy: ['happy', 'joy', 'smile', 'laugh', 'fun', 'bright', 'sunny', 'dancing', 'celebration', 'cheerful'],
        Sad: ['sad', 'cry', 'tear', 'pain', 'hurt', 'alone', 'lonely', 'sorry', 'missing', 'regret'],
        Angry: ['anger', 'fight', 'hate', 'rage', 'scream', 'break', 'war', 'battle', 'fire', 'burn'],
        Melancholic: ['rain', 'grey', 'cloud', 'autumn', 'memory', 'nostalgia', 'goodbye', 'past', 'remember', 'forgotten'],
        Hopeful: ['hope', 'dream', 'future', 'believe', 'faith', 'rise', 'overcome', 'strength', 'tomorrow', 'possibility'],
        Anxious: ['fear', 'worry', 'doubt', 'nervous', 'stress', 'scared', 'afraid', 'unknown', 'dark', 'anxiety'],
        Peaceful: ['peace', 'calm', 'silence', 'quiet', 'gentle', 'breeze', 'flow', 'harmony', 'balance', 'tranquil']
    };
    
    // Convert lyrics to lowercase for case-insensitive matching
    const lowerLyrics = lyrics.toLowerCase();
    
    // Count occurrences of keywords for each mood
    const moodCounts = {};
    
    for (const [mood, keywords] of Object.entries(moodKeywords)) {
        moodCounts[mood] = 0;
        
        for (const keyword of keywords) {
            // Use word boundary to match whole words only
            const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
            const matches = lowerLyrics.match(regex);
            
            if (matches) {
                moodCounts[mood] += matches.length;
            }
        }
    }
    
    // Find the dominant mood (highest count)
    let dominantMood = 'Neutral';
    let highestCount = 0;
    
    for (const [mood, count] of Object.entries(moodCounts)) {
        if (count > highestCount) {
            highestCount = count;
            dominantMood = mood;
        }
    }
    
    // If no mood keywords found, return Neutral
    if (highestCount === 0) {
        return {
            mood: 'Neutral',
            strength: 0,
            counts: moodCounts
        };
    }
    
    // Calculate mood strength (0-100)
    // This is a simple calculation based on the number of matches
    // Can be adjusted based on total word count if needed
    const strength = Math.min(100, Math.round((highestCount / 3) * 100));
    
    // Get secondary moods (>= 50% of dominant mood's count)
    const secondaryMoods = [];
    const threshold = highestCount * 0.5;
    
    for (const [mood, count] of Object.entries(moodCounts)) {
        if (mood !== dominantMood && count >= threshold && count > 0) {
            secondaryMoods.push(mood);
        }
    }
    
    return {
        mood: dominantMood,
        strength: strength,
        secondary: secondaryMoods,
        counts: moodCounts
    };
}

// Function to visualize the mood in the UI
function displayMoodTag(moodResult, containerElement) {
    if (!containerElement) return;
    
    // Clear previous mood displays
    const existingMoodDisplay = containerElement.querySelector('.mood-tag-container');
    if (existingMoodDisplay) {
        existingMoodDisplay.remove();
    }
    
    // Create mood display container
    const moodContainer = document.createElement('div');
    moodContainer.className = 'mood-tag-container';
    
    // Create primary mood tag
    const moodTag = document.createElement('div');
    moodTag.className = `mood-tag mood-${moodResult.mood.toLowerCase()}`;
    
    // Mood icon based on type
    let moodIcon = '';
    switch (moodResult.mood) {
        case 'Romantic':
            moodIcon = 'fa-heart';
            break;
        case 'Happy':
            moodIcon = 'fa-smile';
            break;
        case 'Sad':
            moodIcon = 'fa-sad-tear';
            break;
        case 'Angry':
            moodIcon = 'fa-fire';
            break;
        case 'Melancholic':
            moodIcon = 'fa-cloud-rain';
            break;
        case 'Hopeful':
            moodIcon = 'fa-star';
            break;
        case 'Anxious':
            moodIcon = 'fa-bolt';
            break;
        case 'Peaceful':
            moodIcon = 'fa-dove';
            break;
        default:
            moodIcon = 'fa-question';
    }
    
    moodTag.innerHTML = `
        <i class="fas ${moodIcon}"></i>
        <span class="mood-name">${moodResult.mood}</span>
        <span class="mood-strength">${moodResult.strength}%</span>
    `;
    
    moodContainer.appendChild(moodTag);
    
    // Add secondary moods if present
    if (moodResult.secondary && moodResult.secondary.length > 0) {
        const secondaryContainer = document.createElement('div');
        secondaryContainer.className = 'secondary-moods';
        
        moodResult.secondary.forEach(mood => {
            const secondaryTag = document.createElement('span');
            secondaryTag.className = `secondary-mood-tag mood-${mood.toLowerCase()}`;
            secondaryTag.textContent = mood;
            secondaryContainer.appendChild(secondaryTag);
        });
        
        moodContainer.appendChild(secondaryContainer);
    }
    
    // Add mood details for hover
    const moodDetails = document.createElement('div');
    moodDetails.className = 'mood-details';
    moodDetails.innerHTML = '<h4>Mood Analysis</h4>';
    
    const moodList = document.createElement('ul');
    for (const [mood, count] of Object.entries(moodResult.counts)) {
        if (count > 0) {
            const moodItem = document.createElement('li');
            moodItem.innerHTML = `<span>${mood}</span>: <span>${count}</span>`;
            moodList.appendChild(moodItem);
        }
    }
    
    moodDetails.appendChild(moodList);
    moodContainer.appendChild(moodDetails);
    
    // Add to container
    containerElement.appendChild(moodContainer);
    
    // Return container in case additional processing is needed
    return moodContainer;
}

// Hook the mood detection to the lyrics file upload
document.addEventListener('DOMContentLoaded', function() {
    // Find the lyrics file input elements
    const lyricsFileInput = document.getElementById('lyrics-file');
    const syncLyricsInput = document.getElementById('lyrics-file-input');
    
    // Function to handle file reading and mood detection
    function processLyricsFile(fileInput, displayContainer) {
        if (!fileInput || !fileInput.files || fileInput.files.length === 0) return;
        
        const file = fileInput.files[0];
        if (file.type !== 'text/plain') {
            alert('Please upload a text file for lyrics analysis.');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const lyrics = e.target.result;
            const moodResult = detectMoodFromLyrics(lyrics);
            
            // Display mood in the appropriate container
            if (displayContainer) {
                displayMoodTag(moodResult, displayContainer);
            }
            
            // Store the mood result for later use in the video generation
            if (fileInput.id === 'lyrics-file') {
                // For main upload section
                fileInput.dataset.moodResult = JSON.stringify(moodResult);
            } else {
                // For sync editor section
                fileInput.dataset.moodResult = JSON.stringify(moodResult);
            }
        };
        
        reader.readAsText(file);
    }
    
    // Main upload section
    if (lyricsFileInput) {
        lyricsFileInput.addEventListener('change', function() {
            const fileInfoContainer = document.getElementById('lyrics-info');
            processLyricsFile(this, fileInfoContainer);
        });
        
        // Also handle the drop event
        const lyricsUploadBox = document.getElementById('lyrics-upload');
        if (lyricsUploadBox) {
            lyricsUploadBox.addEventListener('drop', function(e) {
                e.preventDefault();
                if (e.dataTransfer.files.length > 0) {
                    lyricsFileInput.files = e.dataTransfer.files;
                    const fileInfoContainer = document.getElementById('lyrics-info');
                    processLyricsFile(lyricsFileInput, fileInfoContainer);
                }
            });
        }
    }
    
    // Lyrics sync editor section
    if (syncLyricsInput) {
        syncLyricsInput.addEventListener('change', function() {
            const previewContainer = document.getElementById('preview-container');
            processLyricsFile(this, previewContainer);
        });
    }
});

// Integrate mood detection with uploaded files
document.addEventListener('DOMContentLoaded', () => {
    // Find upload elements
    const lyricsFileInput = document.getElementById('lyrics-file');
    const audioFileInput = document.getElementById('audio-file');
    const generateBtn = document.querySelector('.generate-btn');
    
    if (lyricsFileInput) {
        lyricsFileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                const file = e.target.files[0];
                const reader = new FileReader();
                
                reader.onload = (event) => {
                    const lyricsContent = event.target.result;
                    // Perform mood detection
                    const moodResult = detectMoodFromLyrics(lyricsContent);
                    
                    // Display mood tags
                    const moodContainer = document.getElementById('lyrics-info');
                    if (moodContainer) {
                        displayMoodTag(moodResult, moodContainer);
                        
                        // Update genre suggestion based on mood
                        suggestGenreBasedOnMood(moodResult.mood);
                    }
                };
                
                reader.readAsText(file);
            }
        });
    }
    
    // Suggest genre based on detected mood
    function suggestGenreBasedOnMood(mood) {
        const genreSelect = document.getElementById('genre');
        if (!genreSelect) return;
        
        // Mood to genre mapping
        const moodGenreMap = {
            'Romantic': 'pop',
            'Happy': 'pop',
            'Sad': 'lofi',
            'Angry': 'rock',
            'Melancholic': 'classical',
            'Hopeful': 'edm',
            'Anxious': 'rock',
            'Peaceful': 'lofi',
            'Neutral': 'pop'
        };
        
        const suggestedGenre = moodGenreMap[mood] || 'pop';
        
        // Set the genre dropdown value
        genreSelect.value = suggestedGenre;
        
        // Update genre card selection
        const genreCards = document.querySelectorAll('.genre-card');
        genreCards.forEach(card => {
            card.classList.remove('selected');
            if (card.dataset.genre === suggestedGenre) {
                card.classList.add('selected');
            }
        });
        
        // Apply the genre styles
        if (typeof applyGenreStyles === 'function') {
            applyGenreStyles(suggestedGenre);
        }
        
        // Show suggestion message
        const genreContainer = document.querySelector('.genre-selection');
        if (genreContainer) {
            const existingMsg = genreContainer.querySelector('.genre-suggestion');
            if (existingMsg) existingMsg.remove();
            
            const suggestionMsg = document.createElement('div');
            suggestionMsg.className = 'genre-suggestion';
            suggestionMsg.innerHTML = `<i class="fas fa-magic"></i> Based on the ${mood.toLowerCase()} mood of your lyrics, we suggest ${suggestedGenre.toUpperCase()} style`;
            genreContainer.prepend(suggestionMsg);
            
            // Fade out message after 5 seconds
            setTimeout(() => {
                suggestionMsg.style.opacity = '0';
                setTimeout(() => suggestionMsg.remove(), 1000);
            }, 5000);
        }
    }
    
    // Connect mood detection with video preview
    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            const lyricsInput = document.getElementById('lyrics-file');
            const audioInput = document.getElementById('audio-file');
            
            if (!lyricsInput.files.length || !audioInput.files.length) {
                alert('Please upload both audio and lyrics files');
                return;
            }
            
            // Display loading state
            generateBtn.classList.add('loading');
            
            // Simulate processing (would be replaced by actual backend processing)
            setTimeout(() => {
                generateBtn.classList.remove('loading');
                
                // Get mood data if available
                let moodData = null;
                try {
                    moodData = JSON.parse(lyricsInput.dataset.moodResult);
                } catch (e) {
                    // If no mood data available, try to detect it again
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const lyrics = event.target.result;
                        moodData = detectMoodFromLyrics(lyrics);
                        
                        // Scroll to preview section with mood data
                        scrollToPreviewWithMoodData(moodData);
                    };
                    reader.readAsText(lyricsInput.files[0]);
                    return;
                }
                
                // Scroll to preview section
                scrollToPreviewWithMoodData(moodData);
            }, 2000);
        });
    }
    
    function scrollToPreviewWithMoodData(moodData) {
        // Scroll to preview section
        const previewSection = document.getElementById('preview');
        if (previewSection) {
            previewSection.scrollIntoView({ behavior: 'smooth' });
            
            // Update preview with mood data
            const previewContainer = document.querySelector('.video-simulator');
            if (previewContainer && moodData) {
                // Add mood tag to preview
                const moodDisplay = document.createElement('div');
                moodDisplay.className = 'preview-mood';
                displayMoodTag(moodData, moodDisplay);
                
                // Add to preview container
                const existingMood = previewContainer.querySelector('.preview-mood');
                if (existingMood) existingMood.remove();
                
                previewContainer.appendChild(moodDisplay);
                
                // Apply visual effects based on mood
                applyMoodVisuals(moodData.mood, previewContainer);
            }
        }
    }
    
    // Apply mood-based visual effects to preview
    function applyMoodVisuals(mood, container) {
        if (!container) return;
        
        // Remove existing mood classes
        container.classList.remove(
            'mood-romantic', 'mood-happy', 'mood-sad', 'mood-angry', 
            'mood-melancholic', 'mood-hopeful', 'mood-anxious', 'mood-peaceful'
        );
        
        // Add specific mood class
        container.classList.add(`mood-${mood.toLowerCase()}`);
        
        // Apply mood-specific overlay effect
        const overlay = container.querySelector('.bg-overlay');
        if (overlay) {
            // Set different overlay gradients based on mood
            const moodOverlays = {
                'Romantic': 'linear-gradient(45deg, rgba(255, 0, 128, 0.3), rgba(255, 0, 255, 0.3))',
                'Happy': 'linear-gradient(45deg, rgba(255, 165, 0, 0.3), rgba(255, 255, 0, 0.3))',
                'Sad': 'linear-gradient(45deg, rgba(0, 0, 128, 0.4), rgba(0, 0, 255, 0.3))',
                'Angry': 'linear-gradient(45deg, rgba(255, 0, 0, 0.4), rgba(128, 0, 0, 0.4))',
                'Melancholic': 'linear-gradient(45deg, rgba(47, 79, 79, 0.4), rgba(72, 61, 139, 0.4))',
                'Hopeful': 'linear-gradient(45deg, rgba(135, 206, 250, 0.3), rgba(100, 149, 237, 0.3))',
                'Anxious': 'linear-gradient(45deg, rgba(255, 140, 0, 0.4), rgba(255, 69, 0, 0.4))',
                'Peaceful': 'linear-gradient(45deg, rgba(32, 178, 170, 0.3), rgba(0, 139, 139, 0.3))'
            };
            
            overlay.style.background = moodOverlays[mood] || 'rgba(0, 0, 0, 0.3)';
        }
        
        // Apply mood-specific animation
        const animation = container.querySelector('.bg-animation');
        if (animation) {
            // Set different animation speeds and effects based on mood
            const moodAnimations = {
                'Romantic': 'slow-pulse 8s infinite',
                'Happy': 'bounce 3s infinite',
                'Sad': 'gentle-wave 15s infinite',
                'Angry': 'vibrate 0.5s infinite',
                'Melancholic': 'fade-pulse 10s infinite',
                'Hopeful': 'rise 6s infinite',
                'Anxious': 'quick-pulse 3s infinite',
                'Peaceful': 'float 10s infinite'
            };
            
            animation.style.animation = moodAnimations[mood] || '';
        }
    }
});

// AI Features Enhanced Animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize enhanced animations for AI Features section
    const aiFeaturesSection = document.querySelector('.ai-features');
    const aiFeatureCards = document.querySelectorAll('.ai-feature-card');
    
    if (aiFeaturesSection && aiFeatureCards.length) {
        // Create particle backgrounds for AI features section
        createAIParticles(aiFeaturesSection);
        
        // Initialize observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateAIFeatureCards();
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        // Observe the AI features section
        observer.observe(aiFeaturesSection);
        
        // Add mouse movement effect to cards
        aiFeatureCards.forEach(card => {
            card.addEventListener('mousemove', handleCardMouseMove);
            card.addEventListener('mouseleave', handleCardMouseLeave);
            
            // Add click event for mobile devices
            card.addEventListener('click', function() {
                // Toggle active class for mobile
                if (window.innerWidth <= 768) {
                    aiFeatureCards.forEach(c => {
                        if (c !== card) c.classList.remove('mobile-active');
                    });
                    card.classList.toggle('mobile-active');
                }
            });
        });
    }
    
    // Function to animate AI feature cards
    function animateAIFeatureCards() {
        aiFeatureCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animated');
                
                // Animate details list items one by one
                const details = card.querySelectorAll('.feature-details li');
                details.forEach((item, i) => {
                    setTimeout(() => {
                        item.classList.add('animated');
                    }, 300 + (i * 150));
                });
                
                // Animate learn more button
                const learnMore = card.querySelector('.feature-learn-more');
                if (learnMore) {
                    setTimeout(() => {
                        learnMore.classList.add('animated');
                    }, 600 + (details.length * 150));
                }
            }, 150 * index);
        });
    }
    
    // Handle mouse movement on cards
    function handleCardMouseMove(e) {
        const card = this;
        const cardRect = card.getBoundingClientRect();
        
        // Calculate mouse position relative to card center
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;
        const mouseX = e.clientX - cardCenterX;
        const mouseY = e.clientY - cardCenterY;
        
        // Calculate rotation angle (max 5 degrees)
        const rotateX = -mouseY / 20;
        const rotateY = mouseX / 20;
        
        // Apply transform to card
        card.style.transform = `
            translateY(-15px)
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
        `;
        
        // Move icon with mouse
        const icon = card.querySelector('.ai-feature-icon');
        if (icon) {
            icon.style.transform = `
                translate(${mouseX / 15}px, ${mouseY / 15}px)
                rotate(${mouseX / 40}deg)
                scale(1.1)
            `;
        }
        
        // Add shine effect
        addShineEffect(card, e);
    }
    
    // Handle mouse leave event on cards
    function handleCardMouseLeave() {
        const card = this;
        
        // Reset card transform
        card.style.transform = '';
        
        // Reset icon
        const icon = card.querySelector('.ai-feature-icon');
        if (icon) {
            icon.style.transform = '';
        }
        
        // Remove shine effect
        const shine = card.querySelector('.card-shine');
        if (shine) {
            shine.remove();
        }
    }
    
    // Create particle background for AI features section
    function createAIParticles(container) {
        const particleCount = 30;
        const particleContainer = document.createElement('div');
        particleContainer.className = 'ai-particles';
        
        // Create particles
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'ai-particle';
            
            // Random particle properties
            const size = 2 + Math.random() * 3;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = 15 + Math.random() * 20;
            const blur = 1 + Math.random() * 2;
            
            // Set particle styles
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.filter = `blur(${blur}px)`;
            
            // Add particle to container
            particleContainer.appendChild(particle);
        }
        
        // Add particle container to AI features section
        container.appendChild(particleContainer);
    }
    
    // Add shine effect to card on mouse move
    function addShineEffect(card, e) {
        // Get mouse position relative to card
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Remove existing shine effect
        const existingShine = card.querySelector('.card-shine');
        if (existingShine) {
            existingShine.remove();
        }
        
        // Create shine element
        const shine = document.createElement('div');
        shine.className = 'card-shine';
        
        // Set shine position
        shine.style.background = `radial-gradient(
            circle at ${x}px ${y}px,
            rgba(255, 255, 255, 0.3) 0%,
            rgba(255, 255, 255, 0) 60%
        )`;
        
        // Add shine to card
        card.appendChild(shine);
    }
    
    // Check if elements are in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0 &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
            rect.right >= 0
        );
    }
    
    // Check if AI Features section is in viewport on scroll
    window.addEventListener('scroll', function() {
        if (aiFeaturesSection && isInViewport(aiFeaturesSection)) {
            aiFeatureCards.forEach((card, index) => {
                if (!card.classList.contains('animated')) {
                    setTimeout(() => {
                        card.classList.add('animated');
                    }, 150 * index);
                }
            });
        }
    });
});

// Input Methods Tab Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all tab buttons and content areas
    const tabButtons = document.querySelectorAll('.input-tab-btn');
    const contentAreas = document.querySelectorAll('.input-content');
    
    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and content areas
            tabButtons.forEach(btn => btn.classList.remove('active'));
            contentAreas.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(`${tabId}-content`).classList.add('active');
        });
    });
    
    // Handle mood button selection
    const moodButtons = document.querySelectorAll('.mood-btn');
    moodButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Toggle active class on clicked button
            moodButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
    
    // File upload handling
    const setupFileUpload = (inputId, previewElement) => {
        const fileInput = document.getElementById(inputId);
        if (!fileInput) return;
        
        // Trigger file input when button or drag area is clicked
        const triggerElement = fileInput.closest('.dropzone') || 
                              fileInput.previousElementSibling;
        
        if (triggerElement) {
            triggerElement.addEventListener('click', () => {
                fileInput.click();
            });
        }
        
        // Display file name when selected
        fileInput.addEventListener('change', () => {
            if (fileInput.files.length > 0) {
                const fileName = fileInput.files[0].name;
                const fileSize = formatFileSize(fileInput.files[0].size);
                
                // Update UI with file info
                if (previewElement) {
                    if (previewElement.tagName === 'P') {
                        previewElement.textContent = `${fileName} (${fileSize})`;
                    } else {
                        previewElement.innerHTML = `
                            <div class="file-preview">
                                <i class="fas fa-file-audio"></i>
                                <div class="file-info-preview">
                                    <p class="file-name-preview">${fileName}</p>
                                    <p class="file-size-preview">${fileSize}</p>
                                </div>
                                <button class="remove-file" title="Remove file">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        `;
                        
                        // Add remove file functionality
                        const removeButton = previewElement.querySelector('.remove-file');
                        if (removeButton) {
                            removeButton.addEventListener('click', (e) => {
                                e.stopPropagation();
                                fileInput.value = '';
                                resetPreview(previewElement);
                            });
                        }
                    }
                }
            }
        });
        
        // Handle drag and drop for dropzones
        if (fileInput.closest('.dropzone')) {
            const dropzone = fileInput.closest('.dropzone');
            
            ['dragenter', 'dragover'].forEach(eventName => {
                dropzone.addEventListener(eventName, (e) => {
                    e.preventDefault();
                    dropzone.classList.add('dragover');
                });
            });
            
            ['dragleave', 'drop'].forEach(eventName => {
                dropzone.addEventListener(eventName, (e) => {
                    e.preventDefault();
                    dropzone.classList.remove('dragover');
                    
                    if (eventName === 'drop') {
                        fileInput.files = e.dataTransfer.files;
                        // Trigger change event
                        const event = new Event('change');
                        fileInput.dispatchEvent(event);
                    }
                });
            });
        }
    };
    
    // Format file size
    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };
    
    // Reset preview element
    const resetPreview = (element) => {
        if (element.tagName === 'P') {
            element.textContent = 'No file selected';
        } else if (element.classList.contains('upload-preview')) {
            element.innerHTML = `
                <i class="fas fa-image"></i>
                <p>Preview will appear here</p>
            `;
        } else {
            element.innerHTML = '';
        }
    };
    
    // Setup file uploads for each input type
    setupFileUpload('audio-sample-input', document.querySelector('.dropzone-content'));
    setupFileUpload('image-upload-input', document.querySelector('.upload-preview'));
    setupFileUpload('lyrics-file-input', document.getElementById('lyrics-filename'));
    
    // Image preview functionality
    const imageInput = document.getElementById('image-upload-input');
    if (imageInput) {
        imageInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                const preview = document.querySelector('.upload-preview');
                
                reader.onload = function(e) {
                    preview.innerHTML = `
                        <img src="${e.target.result}" alt="Image preview" class="preview-image">
                        <button class="remove-image" title="Remove image">
                            <i class="fas fa-times"></i>
                        </button>
                    `;
                    
                    // Add remove image functionality
                    const removeButton = preview.querySelector('.remove-image');
                    if (removeButton) {
                        removeButton.addEventListener('click', (e) => {
                            e.stopPropagation();
                            imageInput.value = '';
                            resetPreview(preview);
                        });
                    }
                };
                
                reader.readAsDataURL(this.files[0]);
            }
        });
    }
    
    // Form submission handling
    const forms = document.querySelectorAll('.input-form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitButton = form.querySelector('.generate-btn');
            const originalButtonText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = `
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>Processing...</span>
            `;
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Reset button state
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
                
                // Scroll to preview section
                const previewSection = document.getElementById('preview');
                if (previewSection) {
                    previewSection.scrollIntoView({ behavior: 'smooth' });
                }
                
                // Show success message (could be implemented as a toast or notification)
                console.log('Form submitted successfully');
            }, 2000);
        });
    });
});

// Music Generator Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Music Generator Elements
    const musicForm = document.getElementById('music-generator-form');
    const musicPrompt = document.getElementById('music-prompt');
    const musicGenre = document.getElementById('music-genre');
    const musicMood = document.getElementById('music-mood');
    const musicTempo = document.getElementById('music-tempo');
    const musicDuration = document.getElementById('music-duration');
    const advancedToggle = document.getElementById('advanced-toggle');
    const advancedOptions = document.getElementById('advanced-options');
    const generateButton = document.getElementById('generate-music-btn');
    const statusMessage = document.getElementById('generation-status');
    const musicResult = document.getElementById('music-result');
    const instrumentCheckboxes = document.querySelectorAll('.instrument-checkbox');
    const tempoValue = document.getElementById('tempo-value');
    const durationValue = document.getElementById('duration-value');
    
    // Vocal synthesis options
    const vocalEmotion = document.getElementById('vocal-emotion');
    const vocalLanguage = document.getElementById('vocal-language');
    const vocalGender = document.getElementById('vocal-gender');
    const aiVocals = document.getElementById('ai-vocals');
    
    // Initialize form elements if they exist
    if (musicTempo) {
        musicTempo.addEventListener('input', function() {
            tempoValue.textContent = `${this.value} BPM`;
        });
    }
    
    if (musicDuration) {
        musicDuration.addEventListener('input', function() {
            const minutes = Math.floor(this.value / 60);
            const seconds = this.value % 60;
            durationValue.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        });
    }
    
    if (advancedToggle) {
        advancedToggle.addEventListener('change', function() {
            if (this.checked) {
                advancedOptions.classList.add('show');
            } else {
                advancedOptions.classList.remove('show');
            }
        });
    }
    
    // AI Vocals toggle effects
    if (aiVocals) {
        aiVocals.addEventListener('change', function() {
            // Enable/disable vocal options based on AI vocals checkbox
            const vocalOptions = [vocalEmotion, vocalLanguage, vocalGender];
            vocalOptions.forEach(option => {
                if (option) {
                    option.disabled = !this.checked;
                    option.parentElement.classList.toggle('disabled', !this.checked);
                }
            });
            
            // Show message about AI vocals
            const message = this.checked ? 
                'AI will generate vocals based on your lyrics and selected options' : 
                'AI vocals disabled - instrumental track will be generated';
                
            // Find or create the message element
            let messageEl = document.getElementById('ai-vocals-message');
            if (!messageEl) {
                messageEl = document.createElement('p');
                messageEl.id = 'ai-vocals-message';
                messageEl.className = 'vocal-message';
                this.parentElement.parentElement.appendChild(messageEl);
            }
            
            messageEl.textContent = message;
            messageEl.className = this.checked ? 'vocal-message active' : 'vocal-message';
        });
    }
    
    // Handle instrument selection with max selection limit
    const maxInstruments = 4;
    let selectedInstruments = 0;
    
    instrumentCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                selectedInstruments++;
                // If max reached, disable unchecked checkboxes
                if (selectedInstruments >= maxInstruments) {
                    instrumentCheckboxes.forEach(cb => {
                        if (!cb.checked) {
                            cb.disabled = true;
                        }
                    });
                }
            } else {
                selectedInstruments--;
                // If below max, enable all checkboxes
                if (selectedInstruments < maxInstruments) {
                    instrumentCheckboxes.forEach(cb => {
                        cb.disabled = false;
                    });
                }
            }
            
            // Update counter text
            const counterElement = document.getElementById('instrument-counter');
            if (counterElement) {
                counterElement.textContent = `${selectedInstruments}/${maxInstruments} selected`;
            }
        });
    });
    
    // Form submission
    if (musicForm) {
        musicForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!musicPrompt.value.trim()) {
                showError('Please enter a music prompt');
                musicPrompt.focus();
                return;
            }
            
            // Start generation process
            startGeneration();
            
            // Simulate AI music generation (in a real app, this would call an API)
            simulateGeneration();
        });
    }
    
    // Start generation process UI updates
    function startGeneration() {
        // Update button state
        generateButton.disabled = true;
        generateButton.innerHTML = `
            <span class="spinner"></span>
            <span>Generating...</span>
        `;
        
        // Show status message
        showStatus('Starting generation process...', 'info');
        
        // Scroll to status area
        statusMessage.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Simulate the generation process
    function simulateGeneration() {
        // Base generation steps
        const baseSteps = [
            { message: 'Analyzing prompt...', delay: 1500 },
            { message: 'Determining musical structure...', delay: 2000 },
            { message: 'Composing melody...', delay: 3000 },
            { message: 'Adding instruments...', delay: 2500 },
            { message: 'Applying selected genre style...', delay: 2000 }
        ];
        
        // Add vocal synthesis steps if enabled
        let steps = [...baseSteps];
        if (aiVocals && aiVocals.checked) {
            steps.push(
                { message: 'Generating vocal patterns...', delay: 2500 },
                { message: `Processing ${vocalEmotion.value} emotion for vocals...`, delay: 1800 },
                { message: `Synthesizing ${vocalGender.value} vocals in ${vocalLanguage.value}...`, delay: 3000 }
            );
        }
        
        // Add final steps
        steps = steps.concat([
            { message: 'Adjusting for mood...', delay: 1500 },
            { message: 'Finalizing composition...', delay: 2500 },
            { message: 'Music generated successfully!', delay: 1000, type: 'success' }
        ]);
        
        let currentStep = 0;
        
        // Process each step with delays
        function processStep() {
            if (currentStep < steps.length) {
                const step = steps[currentStep];
                showStatus(step.message, step.type || 'info');
                
                currentStep++;
                setTimeout(processStep, step.delay);
            } else {
                // All steps complete
                completeGeneration();
            }
        }
        
        // Start processing steps
        processStep();
    }
    
    // Complete generation and show results
    function completeGeneration() {
        // Update button state
        generateButton.disabled = false;
        generateButton.innerHTML = 'Generate Music';
        
        // Show the result section
        if (musicResult) {
            musicResult.classList.add('show');
            
            // Determine if vocals were generated
            const hasVocals = aiVocals && aiVocals.checked;
            
            // Get vocal details if vocals were generated
            let vocalDetails = '';
            if (hasVocals) {
                vocalDetails = `• ${vocalGender.value.charAt(0).toUpperCase() + vocalGender.value.slice(1)} Vocals (${vocalEmotion.value}, ${vocalLanguage.value})`;
            }
            
            // Create a sample result (in a real app, this would be the actual generated music)
            musicResult.innerHTML = `
                <div class="music-player">
                    <div class="result-info">
                        <h3>${musicPrompt.value.substring(0, 30)}${musicPrompt.value.length > 30 ? '...' : ''}</h3>
                        <p>${musicGenre.value} • ${musicMood.value} • ${musicTempo.value} BPM ${hasVocals ? vocalDetails : '• Instrumental'}</p>
                    </div>
                    
                    <div class="player-controls">
                        <button class="play-btn">
                            <i class="fas fa-play"></i>
                        </button>
                        <div class="progress-container">
                            <div class="progress-bar">
                                <div class="progress-fill"></div>
                            </div>
                            <div class="time-display">
                                <span>0:00</span> / <span>${durationValue.textContent}</span>
                            </div>
                        </div>
                        <div class="audio-controls">
                            <button title="Download">
                                <i class="fas fa-download"></i>
                            </button>
                            <button title="Share">
                                <i class="fas fa-share-alt"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="waveform-display">
                        <div class="waveform-bars">
                            ${generateWaveformBars(hasVocals)}
                        </div>
                    </div>
                </div>
                
                <div class="generation-details">
                    <h4>Generation Details</h4>
                    <ul>
                        <li><strong>Prompt:</strong> ${musicPrompt.value}</li>
                        <li><strong>Genre:</strong> ${musicGenre.value}</li>
                        <li><strong>Mood:</strong> ${musicMood.value}</li>
                        <li><strong>Tempo:</strong> ${musicTempo.value} BPM</li>
                        <li><strong>Duration:</strong> ${durationValue.textContent}</li>
                        <li><strong>Instruments:</strong> ${getSelectedInstruments()}</li>
                        ${hasVocals ? `<li><strong>Vocals:</strong> ${vocalGender.value}, ${vocalEmotion.value} emotion, ${vocalLanguage.value}</li>` : ''}
                    </ul>
                    <div class="action-buttons">
                        <button class="secondary-btn">Edit & Regenerate</button>
                        <button class="primary-btn">Use This Track</button>
                    </div>
                </div>
            `;
            
            // Add simulated audio player functionality
            simulateAudioPlayer();
            
            // Scroll to result
            musicResult.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Get names of selected instruments
    function getSelectedInstruments() {
        const selected = [];
        instrumentCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selected.push(checkbox.value);
            }
        });
        return selected.join(', ');
    }
    
    // Generate random waveform bars for visualization
    function generateWaveformBars(hasVocals = false) {
        let bars = '';
        const barCount = 100;
        
        for (let i = 0; i < barCount; i++) {
            // Create randomized heights with patterns
            let height;
            
            // Create different patterns based on if vocals are present
            if (hasVocals) {
                // Vocal patterns have more peaks and variation
                if (i % 6 === 0) {
                    height = 60 + Math.random() * 40; // Big peak (vocals)
                } else if (i % 3 === 0) {
                    height = 40 + Math.random() * 30; // Secondary peak
                } else {
                    height = 10 + Math.random() * 30; // Regular
                }
            } else {
                // Instrumental patterns are more evenly distributed
                if (i % 8 === 0) {
                    height = 30 + Math.random() * 50; // Peak
                } else if (i % 4 === 0) {
                    height = 20 + Math.random() * 40; // Secondary peak
                } else {
                    height = 10 + Math.random() * 20; // Regular
                }
            }
            
            // Add a class for vocal peaks
            const isVocalPeak = hasVocals && (i % 6 === 0);
            
            bars += `<div class="waveform-bar${isVocalPeak ? ' vocal-peak' : ''}" style="height: ${height}%"></div>`;
        }
        
        return bars;
    }
    
    // Simulate audio player controls
    function simulateAudioPlayer() {
        const playButton = musicResult.querySelector('.play-btn');
        const progressFill = musicResult.querySelector('.progress-fill');
        const waveformBars = musicResult.querySelectorAll('.waveform-bar');
        const timeDisplay = musicResult.querySelector('.time-display span:first-child');
        
        let isPlaying = false;
        let progress = 0;
        let interval;
        
        // Duration in seconds from the slider
        const duration = parseInt(musicDuration.value);
        
        playButton.addEventListener('click', function() {
            isPlaying = !isPlaying;
            
            if (isPlaying) {
                // Start playing simulation
                playButton.innerHTML = '<i class="fas fa-pause"></i>';
                
                // Update progress every 100ms
                interval = setInterval(() => {
                    progress += 0.1 / duration;
                    
                    if (progress >= 1) {
                        progress = 0;
                        isPlaying = false;
                        playButton.innerHTML = '<i class="fas fa-play"></i>';
                        clearInterval(interval);
                    }
                    
                    // Update UI
                    updatePlayerUI(progress);
                }, 100);
            } else {
                // Pause simulation
                playButton.innerHTML = '<i class="fas fa-play"></i>';
                clearInterval(interval);
            }
        });
        
        // Function to update player UI based on progress
        function updatePlayerUI(progressValue) {
            // Update progress bar
            progressFill.style.width = `${progressValue * 100}%`;
            
            // Update time display
            const currentSeconds = Math.floor(progressValue * duration);
            const minutes = Math.floor(currentSeconds / 60);
            const seconds = currentSeconds % 60;
            timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            
            // Animate waveform bars
            waveformBars.forEach((bar, index) => {
                // Calculate if this bar has been "played" based on progress
                if (index / waveformBars.length < progressValue) {
                    bar.classList.add('played');
                } else {
                    bar.classList.remove('played');
                }
                
                // Add pulsing effect to current playing position
                if (Math.abs(index / waveformBars.length - progressValue) < 0.01) {
                    bar.classList.add('current');
                } else {
                    bar.classList.remove('current');
                }
            });
        }
    }
    
    // Helper function to show status messages
    function showStatus(message, type = 'info') {
        if (statusMessage) {
            statusMessage.innerHTML = `
                <div class="status ${type}">
                    ${type === 'info' ? '<span class="spinner"></span>' : ''}
                    <span class="message">${message}</span>
                </div>
            `;
            statusMessage.classList.add('show');
        }
    }
    
    // Helper function to show errors
    function showError(message) {
        if (statusMessage) {
            statusMessage.innerHTML = `
                <div class="status error">
                    <i class="fas fa-exclamation-circle"></i>
                    <span class="message">${message}</span>
                </div>
            `;
            statusMessage.classList.add('show');
        }
    }
});

// Vocal Remover Functionality
function initVocalRemover() {
    // Elements
    const dropzone = document.getElementById('vocal-remover-dropzone');
    const fileInput = document.getElementById('vocal-file-input');
    const fileInfo = document.getElementById('vocal-file-info');
    const removeBtn = document.getElementById('remove-vocal-file');
    const processBtn = document.getElementById('process-vocal-btn');
    const settingsBtn = document.getElementById('vocal-settings-btn');
    const statusEl = document.getElementById('vocal-process-status');
    const progressBar = document.getElementById('vocal-progress-bar');
    const progressIndicator = document.getElementById('vocal-progress-indicator');
    const resultsContainer = document.getElementById('vocal-results');
    
    // Initialize
    if (dropzone) {
        // File upload via dropzone click
        dropzone.addEventListener('click', () => {
            fileInput.click();
        });
        
        // File upload via input change
        fileInput.addEventListener('change', (e) => {
            if (fileInput.files.length > 0) {
                handleFileUpload(fileInput.files[0]);
            }
        });
        
        // Drag and drop functionality
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropzone.addEventListener(eventName, preventDefaults, false);
        });
        
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        ['dragenter', 'dragover'].forEach(eventName => {
            dropzone.addEventListener(eventName, highlight, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            dropzone.addEventListener(eventName, unhighlight, false);
        });
        
        function highlight() {
            dropzone.classList.add('dragover');
        }
        
        function unhighlight() {
            dropzone.classList.remove('dragover');
        }
        
        // Handle file drop
        dropzone.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFileUpload(files[0]);
            }
        });
    }
    
    // Remove file button
    if (removeBtn) {
        removeBtn.addEventListener('click', () => {
            fileInput.value = '';
            fileInfo.innerHTML = '<p>No file selected</p>';
            removeBtn.style.display = 'none';
            processBtn.disabled = true;
            resultsContainer.innerHTML = '';
            dropzone.classList.remove('has-file');
        });
    }
    
    // Process button
    if (processBtn) {
        processBtn.addEventListener('click', () => {
            if (fileInput.files.length > 0) {
                processAudio();
            } else {
                showToast('Please select an audio file first', 'error');
            }
        });
    }
    
    // Settings button
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            // Toggle settings panel (to be implemented)
            showToast('Settings panel will be added in a future update', 'info');
        });
    }
    
    // Handle file upload
    function handleFileUpload(file) {
        // Check if file is audio
        if (!file.type.match('audio.*')) {
            showToast('Please upload an audio file (MP3, WAV, etc.)', 'error');
            return;
        }
        
        // Update UI
        updateFileInfo(file);
        dropzone.classList.add('has-file');
        removeBtn.style.display = 'inline-flex';
        processBtn.disabled = false;
    }
    
    // Update file info display
    function updateFileInfo(file) {
        const fileName = file.name;
        const fileSize = formatFileSize(file.size);
        
        fileInfo.innerHTML = `
            <div class="file-details">
                <i class="fas fa-music"></i>
                <div class="file-text">
                    <p class="file-name">${fileName}</p>
                    <p class="file-size">${fileSize}</p>
                </div>
            </div>
        `;
    }
    
    // Format file size
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    // Process audio
    function processAudio() {
        // Show processing state
        statusEl.innerHTML = 'Processing audio...';
        statusEl.style.display = 'block';
        progressBar.style.display = 'block';
        progressIndicator.style.width = '0%';
        processBtn.disabled = true;
        
        // Simulate processing with progress updates
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 5;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                // Simulate processing completion
                setTimeout(() => {
                    statusEl.innerHTML = 'Processing complete!';
                    progressIndicator.style.width = '100%';
                    processBtn.disabled = false;
                    
                    // Show results
                    showResults();
                }, 500);
            }
            
            // Update progress
            progressIndicator.style.width = `${progress}%`;
            
            // Update status messages based on progress
            if (progress < 25) {
                statusEl.innerHTML = 'Analyzing audio structure...';
            } else if (progress < 50) {
                statusEl.innerHTML = 'Separating frequency bands...';
            } else if (progress < 75) {
                statusEl.innerHTML = 'Isolating vocal components...';
            } else if (progress < 90) {
                statusEl.innerHTML = 'Applying neural network filtering...';
            } else if (progress < 100) {
                statusEl.innerHTML = 'Finalizing tracks...';
            }
        }, 200);
    }
    
    // Show results after processing
    function showResults() {
        resultsContainer.innerHTML = `
            <div class="results-heading">
                <h3>Separated Tracks</h3>
                <p>Your audio has been split into instrumental and vocals</p>
            </div>
            
            <div class="result-tracks">
                <div class="result-track">
                    <div class="track-info">
                        <h4>Instrumental Track</h4>
                        <p>Background music without vocals</p>
                    </div>
                    <div class="track-waveform" id="instrumental-waveform"></div>
                    <div class="track-controls">
                        <button class="track-play-btn"><i class="fas fa-play"></i></button>
                        <div class="track-timeline"></div>
                        <button class="track-download-btn"><i class="fas fa-download"></i> Download</button>
                    </div>
                </div>
                
                <div class="result-track">
                    <div class="track-info">
                        <h4>Vocal Track</h4>
                        <p>Isolated vocals from original audio</p>
                    </div>
                    <div class="track-waveform" id="vocal-waveform"></div>
                    <div class="track-controls">
                        <button class="track-play-btn"><i class="fas fa-play"></i></button>
                        <div class="track-timeline"></div>
                        <button class="track-download-btn"><i class="fas fa-download"></i> Download</button>
                    </div>
                </div>
            </div>
        `;
        
        // Create waveforms
        createWaveform(document.getElementById('instrumental-waveform'));
        createWaveform(document.getElementById('vocal-waveform'));
        
        // Add play/pause functionality
        const playButtons = document.querySelectorAll('.track-play-btn');
        playButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const icon = this.querySelector('i');
                if (icon.classList.contains('fa-play')) {
                    // Stop any other playing tracks
                    document.querySelectorAll('.track-play-btn i.fa-pause').forEach(i => {
                        i.classList.replace('fa-pause', 'fa-play');
                    });
                    
                    icon.classList.replace('fa-play', 'fa-pause');
                } else {
                    icon.classList.replace('fa-pause', 'fa-play');
                }
            });
        });
        
        // Add download functionality
        const downloadButtons = document.querySelectorAll('.track-download-btn');
        downloadButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const trackType = this.closest('.result-track').querySelector('h4').textContent;
                showToast(`Downloading ${trackType}...`, 'success');
                
                // Simulate download (in real app, would create download link)
                setTimeout(() => {
                    showToast(`${trackType} downloaded successfully!`, 'success');
                }, 1500);
            });
        });
    }
    
    // Create a waveform visualization
    function createWaveform(container) {
        if (!container) return;
        
        const width = container.clientWidth;
        const height = container.clientHeight || 80;
        
        // Create SVG element
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
        svg.style.display = "block";
        
        // Generate random waveform data (would be real data in production)
        const barCount = 50; // Number of bars
        const barWidth = width / barCount;
        const centerY = height / 2;
        
        for (let i = 0; i < barCount; i++) {
            // Generate random bar height (higher in the middle for realistic waveform)
            const distanceFromCenter = Math.abs((barCount / 2) - i) / (barCount / 2);
            const maxHeight = height * 0.8;
            const randomFactor = 0.5 + (Math.random() * 0.5); // Add some randomness
            const barHeight = maxHeight * (1 - distanceFromCenter * 0.7) * randomFactor;
            
            // Create top bar
            const topBar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            topBar.setAttribute("x", i * barWidth);
            topBar.setAttribute("y", centerY - barHeight / 2);
            topBar.setAttribute("width", barWidth - 1);
            topBar.setAttribute("height", barHeight / 2);
            topBar.setAttribute("fill", "var(--primary-color)");
            topBar.setAttribute("opacity", "0.8");
            
            // Create bottom bar (mirror of top)
            const bottomBar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            bottomBar.setAttribute("x", i * barWidth);
            bottomBar.setAttribute("y", centerY);
            bottomBar.setAttribute("width", barWidth - 1);
            bottomBar.setAttribute("height", barHeight / 2);
            bottomBar.setAttribute("fill", "var(--primary-color)");
            bottomBar.setAttribute("opacity", "0.6");
            
            svg.appendChild(topBar);
            svg.appendChild(bottomBar);
        }
        
        container.appendChild(svg);
    }
    
    // Toast notification helper
    function showToast(message, type = 'info') {
        // Remove any existing toasts
        const existingToast = document.querySelector('.toast-notification');
        if (existingToast) {
            existingToast.remove();
        }
        
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast-notification toast-${type}`;
        
        // Icon based on type
        let icon = 'fa-info-circle';
        if (type === 'success') icon = 'fa-check-circle';
        if (type === 'error') icon = 'fa-exclamation-circle';
        if (type === 'warning') icon = 'fa-exclamation-triangle';
        
        toast.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
        
        // Add to document
        document.body.appendChild(toast);
        
        // Show toast with animation
        setTimeout(() => toast.classList.add('show'), 10);
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// Initialize vocal remover on document load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize other components
    
    // Initialize vocal remover
    initVocalRemover();
});

// Song Structure - Drag and Drop Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if song structure elements exist
    if (!document.querySelector('.song-structure-container')) return;
    
    const songPartItems = document.querySelectorAll('.song-part-item');
    const timelineContainer = document.querySelector('.timeline-container');
    const timelinePlaceholder = document.querySelector('.timeline-placeholder');
    const clearBtn = document.querySelector('.clear-btn');
    const timelineDuration = document.querySelector('.timeline-duration');
    const settingsPanel = document.querySelector('.part-settings-panel');
    const applySettingsBtn = document.querySelector('.apply-btn');
    
    let draggedItem = null;
    let selectedTimelineItem = null;
    let totalDuration = 0;
    
    // Initialize song structure data
    let songStructure = [];
    
    // Event listeners for draggable items
    songPartItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
    });
    
    // Timeline container events
    timelineContainer.addEventListener('dragover', handleDragOver);
    timelineContainer.addEventListener('dragenter', handleDragEnter);
    timelineContainer.addEventListener('dragleave', handleDragLeave);
    timelineContainer.addEventListener('drop', handleDrop);
    
    // Clear button event
    if (clearBtn) {
        clearBtn.addEventListener('click', clearTimeline);
    }
    
    // Apply settings event
    if (applySettingsBtn) {
        applySettingsBtn.addEventListener('click', applySettings);
    }
    
    // Drag event handlers
    function handleDragStart(e) {
        draggedItem = this;
        setTimeout(() => {
            this.classList.add('song-part-ghost');
        }, 0);
        
        // Set data for dragging
        e.dataTransfer.setData('text/plain', this.getAttribute('data-part-type'));
        e.dataTransfer.effectAllowed = 'copy';
    }
    
    function handleDragEnd() {
        draggedItem = null;
        this.classList.remove('song-part-ghost');
    }
    
    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'copy';
        return false;
    }
    
    function handleDragEnter() {
        this.classList.add('drag-over');
    }
    
    function handleDragLeave() {
        this.classList.remove('drag-over');
    }
    
    function handleDrop(e) {
        e.preventDefault();
        this.classList.remove('drag-over');
        
        // Get the part type
        const partType = e.dataTransfer.getData('text/plain');
        
        // If there was a dragged item or valid part type
        if (draggedItem || partType) {
            // Create new timeline item
            const newPart = createTimelineItem(partType);
            timelineContainer.appendChild(newPart);
            
            // Update data structure
            const partData = {
                id: 'part_' + Date.now(),
                type: partType,
                duration: 30, // Default duration in seconds
                intensity: 5,  // Default intensity level (1-10)
                variation: 3   // Default variation level (1-10)
            };
            songStructure.push(partData);
            
            // Update UI
            updateTimelineState();
            
            // Add event listeners to the new item
            addTimelineItemEventListeners(newPart, partData.id);
        }
        
        return false;
    }
    
    // Helper Functions
    function createTimelineItem(partType) {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.draggable = true;
        item.setAttribute('data-part-type', partType);
        item.setAttribute('data-part-id', 'part_' + Date.now());
        
        // Add gradient based on part type
        item.style.background = getPartGradient(partType);
        
        // Part label
        const partLabel = document.createElement('span');
        partLabel.className = 'part-label';
        partLabel.textContent = capitalizeFirstLetter(partType);
        
        // Duration badge
        const partDuration = document.createElement('span');
        partDuration.className = 'part-duration';
        partDuration.textContent = '30s';
        
        // Remove button
        const removeBtn = document.createElement('div');
        removeBtn.className = 'remove-part';
        removeBtn.innerHTML = '<i class="fas fa-times"></i>';
        
        // Append elements
        item.appendChild(partLabel);
        item.appendChild(partDuration);
        item.appendChild(removeBtn);
        
        return item;
    }
    
    function getPartGradient(partType) {
        const gradients = {
            'intro': 'linear-gradient(45deg, #3a7bd5, #00d2ff)',
            'verse': 'linear-gradient(45deg, #6a11cb, #2575fc)',
            'chorus': 'linear-gradient(45deg, #f83600, #fe8c00)',
            'bridge': 'linear-gradient(45deg, #4facfe, #00f2fe)',
            'outro': 'linear-gradient(45deg, #b721ff, #21d4fd)'
        };
        
        return gradients[partType] || 'linear-gradient(45deg, #8E2DE2, #4A00E0)';
    }
    
    function addTimelineItemEventListeners(item, id) {
        // Drag events for reordering
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', id);
            setTimeout(() => {
                item.classList.add('song-part-ghost');
            }, 0);
        });
        
        item.addEventListener('dragend', () => {
            item.classList.remove('song-part-ghost');
        });
        
        // Click event for selecting
        item.addEventListener('click', (e) => {
            // Don't select if clicking the remove button
            if (e.target.closest('.remove-part')) return;
            
            // Deselect previous item
            if (selectedTimelineItem) {
                selectedTimelineItem.style.outline = 'none';
            }
            
            // Select this item
            selectedTimelineItem = item;
            item.style.outline = '2px solid white';
            
            // Show settings panel with this item's data
            showSettingsPanel(id);
        });
        
        // Remove button event
        const removeBtn = item.querySelector('.remove-part');
        removeBtn.addEventListener('click', () => {
            removeTimelineItem(id, item);
        });
    }
    
    function showSettingsPanel(id) {
        // Find the part data
        const partData = songStructure.find(part => part.id === id);
        if (!partData) return;
        
        // Set values in settings panel
        const durationInput = document.getElementById('part-duration');
        const intensityInput = document.getElementById('part-intensity');
        const variationInput = document.getElementById('part-variation');
        
        if (durationInput) durationInput.value = partData.duration;
        if (intensityInput) intensityInput.value = partData.intensity;
        if (variationInput) variationInput.value = partData.variation;
        
        // Update the part type label
        const settingsTitle = settingsPanel.querySelector('h5');
        if (settingsTitle) {
            settingsTitle.textContent = `${capitalizeFirstLetter(partData.type)} Settings`;
        }
        
        // Show the panel
        settingsPanel.classList.add('active');
        settingsPanel.setAttribute('data-editing-part', id);
    }
    
    function applySettings() {
        const partId = settingsPanel.getAttribute('data-editing-part');
        if (!partId) return;
        
        // Get input values
        const durationInput = document.getElementById('part-duration');
        const intensityInput = document.getElementById('part-intensity');
        const variationInput = document.getElementById('part-variation');
        
        // Find the part in the data structure
        const partIndex = songStructure.findIndex(part => part.id === partId);
        if (partIndex === -1) return;
        
        // Update part data
        if (durationInput) songStructure[partIndex].duration = parseInt(durationInput.value, 10) || 30;
        if (intensityInput) songStructure[partIndex].intensity = parseInt(intensityInput.value, 10) || 5;
        if (variationInput) songStructure[partIndex].variation = parseInt(variationInput.value, 10) || 3;
        
        // Update the UI
        const timelineItem = document.querySelector(`[data-part-id="${partId}"]`);
        if (timelineItem) {
            const durationBadge = timelineItem.querySelector('.part-duration');
            if (durationBadge && durationInput) {
                durationBadge.textContent = `${durationInput.value}s`;
            }
        }
        
        // Update total duration
        updateTimelineState();
        
        // Flash feedback
        settingsPanel.classList.add('updated');
        setTimeout(() => {
            settingsPanel.classList.remove('updated');
        }, 300);
    }
    
    function removeTimelineItem(id, item) {
        // Remove from data structure
        songStructure = songStructure.filter(part => part.id !== id);
        
        // Remove from DOM
        item.remove();
        
        // Hide settings panel if this was the selected item
        if (selectedTimelineItem === item) {
            selectedTimelineItem = null;
            settingsPanel.classList.remove('active');
        }
        
        // Update UI
        updateTimelineState();
    }
    
    function clearTimeline() {
        // Clear data structure
        songStructure = [];
        
        // Clear the timeline
        const timelineItems = timelineContainer.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => item.remove());
        
        // Hide settings panel
        settingsPanel.classList.remove('active');
        selectedTimelineItem = null;
        
        // Update UI
        updateTimelineState();
    }
    
    function updateTimelineState() {
        // Show/hide placeholder
        if (songStructure.length === 0) {
            timelinePlaceholder.style.display = 'flex';
        } else {
            timelinePlaceholder.style.display = 'none';
        }
        
        // Calculate total duration
        totalDuration = songStructure.reduce((total, part) => total + part.duration, 0);
        
        // Format duration as mm:ss
        const minutes = Math.floor(totalDuration / 60);
        const seconds = totalDuration % 60;
        const formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        // Update duration display
        timelineDuration.textContent = `Total: ${formattedDuration}`;
    }
    
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});

// License Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const openModalBtn = document.getElementById('open-license-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const licenseModal = document.getElementById('license-modal');
    const modalOverlay = document.getElementById('license-overlay');
    const generateLicenseBtn = document.getElementById('generate-license');
    const downloadLicenseBtn = document.getElementById('download-license');
    const licenseForm = document.querySelector('.license-form');
    const licensePreview = document.getElementById('license-preview');
    
    // Form Elements
    const trackNameInput = document.getElementById('track-name');
    const userNameInput = document.getElementById('user-name');
    const licenseTypeSelect = document.getElementById('license-type');
    
    // Certificate Elements
    const certTrackName = document.getElementById('cert-track-name');
    const certUserName = document.getElementById('cert-user-name');
    const certLicenseType = document.getElementById('cert-license-type');
    const certDate = document.getElementById('cert-date');
    const licenseId = document.getElementById('license-id');
    const licenseTermsList = document.getElementById('license-terms-list');
    
    // Open modal
    if (openModalBtn) {
        openModalBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    }
    
    // Close modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }
    
    // Generate license
    if (generateLicenseBtn) {
        generateLicenseBtn.addEventListener('click', generateLicense);
    }
    
    // Download license
    if (downloadLicenseBtn) {
        downloadLicenseBtn.addEventListener('click', downloadLicense);
    }
    
    // Open modal function
    function openModal() {
        if (licenseModal && modalOverlay) {
            // Reset form
            if (licenseForm) {
                licenseForm.style.display = 'block';
            }
            if (licensePreview) {
                licensePreview.style.display = 'none';
                licensePreview.classList.remove('active');
            }
            
            modalOverlay.classList.add('active');
            licenseModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
        }
    }
    
    // Close modal function
    function closeModal() {
        if (licenseModal && modalOverlay) {
            modalOverlay.classList.remove('active');
            licenseModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
            
            // Reset after modal is closed
            setTimeout(() => {
                if (licenseForm) {
                    licenseForm.style.display = 'block';
                }
                if (licensePreview) {
                    licensePreview.classList.remove('active');
                }
                
                // Reset form values
                if (trackNameInput) trackNameInput.value = '';
                if (userNameInput) userNameInput.value = '';
                if (licenseTypeSelect) licenseTypeSelect.selectedIndex = 0;
            }, 300);
        }
    }
    
    // Generate license function
    function generateLicense() {
        if (!trackNameInput || !userNameInput || !licenseTypeSelect) return;
        
        const trackName = trackNameInput.value.trim();
        const userName = userNameInput.value.trim();
        const licenseType = licenseTypeSelect.options[licenseTypeSelect.selectedIndex].text;
        
        // Validate inputs
        if (!trackName || !userName) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Update certificate
        if (certTrackName) certTrackName.textContent = trackName;
        if (certUserName) certUserName.textContent = userName;
        if (certLicenseType) certLicenseType.textContent = licenseType.split('-')[0].trim();
        
        // Set current date
        if (certDate) {
            const now = new Date();
            const formattedDate = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
            certDate.textContent = formattedDate;
        }
        
        // Generate unique license ID
        if (licenseId) {
            const uniqueId = generateUniqueId();
            licenseId.textContent = `LV-${uniqueId}`;
        }
        
        // Update license terms based on license type
        updateLicenseTerms(licenseTypeSelect.value);
        
        // Show preview, hide form
        if (licenseForm) licenseForm.style.display = 'none';
        if (licensePreview) licensePreview.classList.add('active');
    }
    
    // Update license terms based on selected license type
    function updateLicenseTerms(licenseType) {
        if (!licenseTermsList) return;
        
        // Clear existing terms
        licenseTermsList.innerHTML = '';
        
        // Base terms for all license types
        const baseTerms = [
            'Videos generated using our visual elements are free from copyright claims',
            'Original audio rights still belong to the original copyright holders',
            'This license is non-transferable and applies only to the named individual/entity'
        ];
        
        // Add type-specific terms
        let additionalTerms = [];
        
        switch(licenseType) {
            case 'standard':
                additionalTerms = [
                    'For personal use only',
                    'Not for commercial or revenue-generating use'
                ];
                break;
            case 'commercial':
                additionalTerms = [
                    'May be used in commercial projects',
                    'Usage allowed on social media and streaming platforms',
                    'Allows monetization of content'
                ];
                break;
            case 'extended':
                additionalTerms = [
                    'Includes all commercial license benefits',
                    'Includes access to source files for customization',
                    'Priority technical support',
                    'Right to modify the visual elements'
                ];
                break;
        }
        
        // Combine terms and add to DOM
        const allTerms = [...baseTerms, ...additionalTerms];
        allTerms.forEach(term => {
            const li = document.createElement('li');
            li.textContent = term;
            licenseTermsList.appendChild(li);
        });
    }
    
    // Generate a unique ID for the license
    function generateUniqueId() {
        const timestamp = new Date().getTime().toString().slice(-8);
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return timestamp + random;
    }
    
    // Simulate downloading the license certificate
    function downloadLicense() {
        // In a real app, this would generate a PDF or image file
        // For this demo, we'll just show a success message
        
        // Apply a "downloading" visual effect
        const downloadBtn = downloadLicenseBtn;
        if (downloadBtn) {
            const originalText = downloadBtn.innerHTML;
            downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            downloadBtn.disabled = true;
            
            setTimeout(() => {
                // Simulate download complete
                downloadBtn.innerHTML = '<i class="fas fa-check"></i> Downloaded';
                
                // Reset after a delay
                setTimeout(() => {
                    downloadBtn.innerHTML = originalText;
                    downloadBtn.disabled = false;
                    
                    // Show success message
                    alert('License certificate downloaded successfully!');
                }, 1500);
            }, 2000);
        }
    }
});

// Stem Separation Functionality
document.addEventListener('DOMContentLoaded', function() {
    initStemSeparation();
});

function initStemSeparation() {
    // DOM Elements
    const stemUploadBox = document.getElementById('stem-upload-box');
    const stemFileInput = document.getElementById('stem-file-input');
    const stemFileInfo = document.getElementById('stem-file-info');
    const stemFileName = document.getElementById('stem-file-name');
    const stemFileSize = document.getElementById('stem-file-size');
    const stemRemoveBtn = document.getElementById('stem-remove-btn');
    const stemControlsContainer = document.getElementById('stem-controls');
    const stemPlayBtn = document.getElementById('stem-play-btn');
    const stemCurrentTime = document.getElementById('stem-current-time');
    const stemTotalTime = document.getElementById('stem-total-time');
    const processBtn = document.getElementById('process-stems-btn');
    const processStatus = document.getElementById('process-status');
    const progressFill = document.getElementById('progress-fill');
    const progressPercentage = document.getElementById('progress-percentage');
    const statusMessage = document.getElementById('status-message');
    const downloadStemsBtn = document.getElementById('download-stems-btn');
    
    if (!stemUploadBox || !stemFileInput) return;

    // Stem Sliders
    const stemSliders = {
        vocals: document.getElementById('vocals-slider'),
        drums: document.getElementById('drums-slider'),
        bass: document.getElementById('bass-slider'),
        instruments: document.getElementById('instruments-slider')
    };
    
    // Stem Values
    const stemValues = {
        vocals: document.getElementById('vocals-value'),
        drums: document.getElementById('drums-value'),
        bass: document.getElementById('bass-value'),
        instruments: document.getElementById('instruments-value')
    };
    
    // Mute Buttons
    const muteBtns = document.querySelectorAll('.stem-mute-btn');
    
    // Solo Buttons
    const soloBtns = document.querySelectorAll('.stem-solo-btn');
    
    // Audio Context and nodes
    let audioContext;
    let audioSource;
    let gainNodes = {};
    let audioBuffer;
    let isPlaying = false;
    let startTime = 0;
    let pausedAt = 0;
    let stemWaveform;
    
    // State variables
    let audioFile = null;
    let stemSeparated = false;
    let stemBuffers = {};
    
    // File Upload
    stemUploadBox.addEventListener('click', () => {
        stemFileInput.click();
    });
    
    stemFileInput.addEventListener('change', handleFileSelect);
    
    stemUploadBox.addEventListener('dragover', (e) => {
        e.preventDefault();
        stemUploadBox.classList.add('dragover');
    });
    
    stemUploadBox.addEventListener('dragleave', () => {
        stemUploadBox.classList.remove('dragover');
    });
    
    stemUploadBox.addEventListener('drop', (e) => {
        e.preventDefault();
        stemUploadBox.classList.remove('dragover');
        
        if (e.dataTransfer.files.length) {
            handleFile(e.dataTransfer.files[0]);
        }
    });
    
    // Remove file
    if (stemRemoveBtn) {
        stemRemoveBtn.addEventListener('click', () => {
            resetStemSeparation();
        });
    }
    
    // Process button
    if (processBtn) {
        processBtn.addEventListener('click', () => {
            processStemSeparation();
        });
    }
    
    // Download stems button
    if (downloadStemsBtn) {
        downloadStemsBtn.addEventListener('click', () => {
            downloadStems();
        });
    }
    
    // Play button
    if (stemPlayBtn) {
        stemPlayBtn.addEventListener('click', () => {
            togglePlay();
        });
    }
    
    // Setup stem sliders
    Object.keys(stemSliders).forEach(stem => {
        if (stemSliders[stem]) {
            stemSliders[stem].addEventListener('input', () => {
                updateStemGain(stem);
            });
        }
    });
    
    // Setup mute buttons
    muteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleMute(btn.getAttribute('data-stem'));
        });
    });
    
    // Setup solo buttons
    soloBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleSolo(btn.getAttribute('data-stem'));
        });
    });
    
    // File Selection Handler
    function handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) handleFile(file);
    }
    
    // Handle File
    function handleFile(file) {
        // Check if it's an audio file
        if (!file.type.match('audio.*')) {
            alert('Please select an audio file (MP3 or WAV).');
            return;
        }
        
        // Check file size (max 20MB)
        if (file.size > 20 * 1024 * 1024) {
            alert('File size too large. Maximum allowed size is 20MB.');
            return;
        }
        
        audioFile = file;
        
        // Update file info
        stemFileName.textContent = file.name;
        stemFileSize.textContent = formatFileSize(file.size);
        stemFileInfo.classList.add('active');
        
        // Load audio file
        loadAudioFile(file);
    }
    
    // Load Audio File
    function loadAudioFile(file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const arrayBuffer = e.target.result;
            
            // Initialize audio context if not already done
            if (!audioContext) {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            
            // Decode audio data
            audioContext.decodeAudioData(arrayBuffer, (buffer) => {
                audioBuffer = buffer;
                
                // Initialize the waveform
                initWaveform(buffer);
                
                // Show controls
                stemControlsContainer.classList.add('active');
                
                // Update total time
                stemTotalTime.textContent = formatTime(buffer.duration);
                
            }, (error) => {
                console.error('Error decoding audio data:', error);
                alert('Error loading audio file. Please try another file.');
            });
        };
        
        reader.onerror = function(error) {
            console.error('Error reading file:', error);
            alert('Error reading file. Please try again.');
        };
        
        reader.readAsArrayBuffer(file);
    }
    
    // Initialize Waveform
    function initWaveform(buffer) {
        // In a real implementation, you would use a library like wavesurfer.js
        // For this demo, we'll simulate a waveform with simple bars
        
        const waveformContainer = document.getElementById('stem-waveform');
        if (!waveformContainer) return;
        
        waveformContainer.innerHTML = '';
        
        const numBars = 100; // Number of bars in the waveform
        const channelData = buffer.getChannelData(0); // Get the first channel
        const blockSize = Math.floor(channelData.length / numBars);
        
        for (let i = 0; i < numBars; i++) {
            // Calculate the average amplitude for this block
            let sum = 0;
            for (let j = 0; j < blockSize; j++) {
                sum += Math.abs(channelData[i * blockSize + j]);
            }
            const average = sum / blockSize;
            
            // Create a bar with height based on amplitude
            const bar = document.createElement('div');
            bar.className = 'waveform-bar';
            bar.style.height = `${Math.max(3, average * 100)}%`;
            waveformContainer.appendChild(bar);
        }
        
        // Store reference to waveform
        stemWaveform = waveformContainer;
    }
    
    // Toggle Play/Pause
    function togglePlay() {
        if (!audioBuffer) return;
        
        if (isPlaying) {
            pauseAudio();
        } else {
            playAudio();
        }
    }
    
    // Play Audio
    function playAudio() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        // If context is suspended (browser autoplay policy), resume it
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
        
        // Stop current playback if already playing
        if (audioSource) {
            audioSource.stop();
        }
        
        // Create a new audio source
        audioSource = audioContext.createBufferSource();
        audioSource.buffer = audioBuffer;
        
        // Create gain nodes for each stem if not already done
        if (stemSeparated) {
            // If stems have been separated, we would connect multiple sources
            // Through gain nodes to mix them together
            // This is a simplified simulation
        } else {
            // For regular audio (not yet separated), just use a master gain node
            const masterGain = audioContext.createGain();
            masterGain.gain.value = 1.0;
            
            audioSource.connect(masterGain);
            masterGain.connect(audioContext.destination);
            
            // Store for later control
            gainNodes.master = masterGain;
        }
        
        // Set up playback
        const offset = pausedAt;
        audioSource.start(0, offset);
        startTime = audioContext.currentTime - offset;
        pausedAt = 0;
        isPlaying = true;
        
        // Update UI
        stemPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
        
        // Start progress update
        requestAnimationFrame(updateProgress);
        
        // Listen for when playback ends
        audioSource.onended = function() {
            isPlaying = false;
            stemPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
            pausedAt = 0;
        };
    }
    
    // Pause Audio
    function pauseAudio() {
        if (!audioSource) return;
        
        // Calculate current position
        pausedAt = audioContext.currentTime - startTime;
        
        // Stop playback
        audioSource.stop();
        audioSource = null;
        isPlaying = false;
        
        // Update UI
        stemPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
    
    // Update Progress
    function updateProgress() {
        if (!isPlaying || !audioBuffer) return;
        
        // Calculate current time
        const currentTime = audioContext.currentTime - startTime;
        
        // Update current time display
        stemCurrentTime.textContent = formatTime(currentTime);
        
        // Update waveform progress indicator (in a real implementation)
        // Here we're just highlighting bars based on current progress
        if (stemWaveform) {
            const progress = currentTime / audioBuffer.duration;
            const bars = stemWaveform.querySelectorAll('.waveform-bar');
            
            const activeBarIndex = Math.floor(progress * bars.length);
            
            bars.forEach((bar, index) => {
                if (index <= activeBarIndex) {
                    bar.classList.add('active');
                } else {
                    bar.classList.remove('active');
                }
            });
        }
        
        // Continue updating if still playing
        if (isPlaying) {
            requestAnimationFrame(updateProgress);
        }
    }
    
    // Update Stem Gain
    function updateStemGain(stem) {
        if (!stemSliders[stem] || !stemValues[stem]) return;
        
        const value = stemSliders[stem].value;
        stemValues[stem].textContent = `${value}%`;
        
        // Update gain if available
        if (gainNodes[stem]) {
            gainNodes[stem].gain.value = value / 100;
        }
    }
    
    // Toggle Mute for a stem
    function toggleMute(stem) {
        const muteBtn = document.querySelector(`.stem-mute-btn[data-stem="${stem}"]`);
        if (!muteBtn) return;
        
        const isMuted = muteBtn.classList.toggle('muted');
        
        // Update button icon
        muteBtn.innerHTML = isMuted ? 
            '<i class="fas fa-volume-mute"></i>' : 
            '<i class="fas fa-volume-up"></i>';
        
        // Set gain to 0 if muted, or back to slider value if unmuted
        if (gainNodes[stem]) {
            const sliderValue = stemSliders[stem] ? stemSliders[stem].value : 100;
            gainNodes[stem].gain.value = isMuted ? 0 : sliderValue / 100;
        }
    }
    
    // Toggle Solo for a stem
    function toggleSolo(stem) {
        const soloBtn = document.querySelector(`.stem-solo-btn[data-stem="${stem}"]`);
        if (!soloBtn) return;
        
        const isSolo = soloBtn.classList.toggle('active');
        
        // Turn off all other solo buttons if this one is activated
        if (isSolo) {
            document.querySelectorAll('.stem-solo-btn').forEach(btn => {
                if (btn !== soloBtn) {
                    btn.classList.remove('active');
                }
            });
        }
        
        // Adjust gains for all stems based on solo state
        if (stemSeparated) {
            if (isSolo) {
                // Solo this stem, mute all others
                Object.keys(stemSliders).forEach(s => {
                    if (gainNodes[s]) {
                        gainNodes[s].gain.value = (s === stem) ? stemSliders[s].value / 100 : 0;
                    }
                });
            } else {
                // No stem is soloed, restore all to their slider values
                Object.keys(stemSliders).forEach(s => {
                    if (gainNodes[s]) {
                        const muteBtn = document.querySelector(`.stem-mute-btn[data-stem="${s}"]`);
                        const isMuted = muteBtn ? muteBtn.classList.contains('muted') : false;
                        gainNodes[s].gain.value = isMuted ? 0 : stemSliders[s].value / 100;
                    }
                });
            }
        }
    }
    
    // Process Stem Separation - Simulate the AI processing
    function processStemSeparation() {
        if (!audioFile) return;
        
        // Show progress container
        processStatus.classList.add('active');
        processBtn.style.display = 'none';
        
        // Simulate progress
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 1;
            progressFill.style.width = `${progress}%`;
            progressPercentage.textContent = `${progress}%`;
            
            // Update status message based on progress
            if (progress < 20) {
                statusMessage.textContent = 'Analyzing audio file...';
            } else if (progress < 40) {
                statusMessage.textContent = 'Identifying stems...';
            } else if (progress < 60) {
                statusMessage.textContent = 'Separating vocals...';
            } else if (progress < 80) {
                statusMessage.textContent = 'Separating instruments...';
            } else {
                statusMessage.textContent = 'Finalizing stems...';
            }
            
            // Complete
            if (progress >= 100) {
                clearInterval(progressInterval);
                stemSeparationComplete();
            }
        }, 100); // Adjust for faster/slower simulation
    }
    
    // Completion of stem separation
    function stemSeparationComplete() {
        stemSeparated = true;
        statusMessage.textContent = 'Stem separation complete!';
        
        // Show download button after a short delay
        setTimeout(() => {
            downloadStemsBtn.classList.add('active');
        }, 1000);
        
        // In a real implementation, we would now have separate audio buffers for each stem
        // For this simulation, we'll just set up gain nodes to control the mix
        
        // Reset the existing audio source if playing
        if (isPlaying) {
            pauseAudio();
        }
        
        // Initialize gain nodes for each stem
        Object.keys(stemSliders).forEach(stem => {
            gainNodes[stem] = audioContext.createGain();
            gainNodes[stem].gain.value = stemSliders[stem].value / 100;
        });
        
        // Create a visual representation of separated stems
        createStemWaveforms();
    }
    
    // Create visual representation of separated stems
    function createStemWaveforms() {
        // In a real implementation, you'd create separate waveforms for each stem
        // Here we'll just update the UI to simulate it
        
        const waveformContainer = document.getElementById('stem-waveform');
        if (!waveformContainer) return;
        
        const bars = waveformContainer.querySelectorAll('.waveform-bar');
        
        // Add stem classes to waveform bars based on position
        // This is just a visual effect for the demo
        bars.forEach((bar, index) => {
            // Clear previous stem classes
            bar.classList.remove('vocals-stem', 'drums-stem', 'bass-stem', 'instruments-stem');
            
            // Simplified visualization - divide waveform into regions
            // In reality, stems would overlap and be more complex
            if (index % 4 === 0) {
                bar.classList.add('vocals-stem');
            } else if (index % 4 === 1) {
                bar.classList.add('drums-stem');
            } else if (index % 4 === 2) {
                bar.classList.add('bass-stem');
            } else {
                bar.classList.add('instruments-stem');
            }
        });
        
        // Add styles for these classes
        addStemWaveformStyles();
    }
    
    // Add styles for stem waveforms
    function addStemWaveformStyles() {
        // Add style element if it doesn't exist
        let styleEl = document.getElementById('stem-waveform-styles');
        if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = 'stem-waveform-styles';
            document.head.appendChild(styleEl);
        }
        
        // Add CSS rules
        styleEl.innerHTML = `
            .waveform-bar.vocals-stem { background-color: #ff4d4d; }
            .waveform-bar.drums-stem { background-color: #ffb84d; }
            .waveform-bar.bass-stem { background-color: #4dffb8; }
            .waveform-bar.instruments-stem { background-color: #4d4dff; }
            .waveform-bar.active { opacity: 1; }
            .waveform-bar { opacity: 0.6; transition: opacity 0.2s ease; }
        `;
    }
    
    // Download stems
    function downloadStems() {
        // In a real implementation, you would generate and download actual audio files
        // For this demo, we'll just show a success message
        
        // Update button to show downloading state
        downloadStemsBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
        downloadStemsBtn.disabled = true;
        
        // Simulate download process
        setTimeout(() => {
            // Show success
            downloadStemsBtn.innerHTML = '<i class="fas fa-check"></i> Downloaded';
            
            // Reset after a delay
            setTimeout(() => {
                downloadStemsBtn.innerHTML = '<i class="fas fa-download"></i><span>Download Stems</span>';
                downloadStemsBtn.disabled = false;
                
                // Show success message
                alert('Stems downloaded successfully!\n\nIn a real implementation, you would get 4 separate audio files: vocals.wav, drums.wav, bass.wav, and instruments.wav');
            }, 1500);
        }, 2000);
    }
    
    // Reset stem separation
    function resetStemSeparation() {
        // Stop audio if playing
        if (isPlaying) {
            pauseAudio();
        }
        
        // Reset file info
        audioFile = null;
        audioBuffer = null;
        stemSeparated = false;
        stemFileInfo.classList.remove('active');
        stemControlsContainer.classList.remove('active');
        
        // Reset audio nodes
        audioSource = null;
        gainNodes = {};
        
        // Reset UI elements
        processStatus.classList.remove('active');
        downloadStemsBtn.classList.remove('active');
        processBtn.style.display = 'flex';
        stemCurrentTime.textContent = '0:00';
        stemTotalTime.textContent = '0:00';
        
        // Reset sliders
        Object.keys(stemSliders).forEach(stem => {
            if (stemSliders[stem]) {
                stemSliders[stem].value = 100;
                if (stemValues[stem]) stemValues[stem].textContent = '100%';
            }
        });
        
        // Reset mute buttons
        muteBtns.forEach(btn => {
            btn.classList.remove('muted');
            btn.innerHTML = '<i class="fas fa-volume-up"></i>';
        });
        
        // Reset solo buttons
        soloBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Clear file input
        if (stemFileInput) stemFileInput.value = '';
        
        // Clear waveform
        if (stemWaveform) stemWaveform.innerHTML = '';
    }
    
    // Format file size
    function formatFileSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }
    
    // Format time in MM:SS
    function formatTime(seconds) {
        seconds = Math.max(0, seconds);
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
}

// Team Collaboration Functionality
document.addEventListener('DOMContentLoaded', function() {
    initCollaboration();
});

function initCollaboration() {
    // Get DOM elements
    const collabTabs = document.querySelectorAll('.collab-tab');
    const collabContents = document.querySelectorAll('.collab-tab-content');
    const inviteBtn = document.querySelector('#invite-collaborator');
    const modalOverlay = document.querySelector('#invite-modal-overlay');
    const modalCancel = document.querySelector('#modal-cancel');
    const modalSubmit = document.querySelector('#modal-submit');
    const inviteForm = document.querySelector('#invite-form');
    const actionBtns = document.querySelectorAll('.action-btn');
    const resendBtns = document.querySelectorAll('.resend-btn');
    const cancelBtns = document.querySelectorAll('.cancel-btn');
    const commentForm = document.querySelector('#comment-form');
    const commentTools = document.querySelectorAll('.comment-tool-btn');
    const replyBtns = document.querySelectorAll('.comment-reply-btn');
    const reactBtns = document.querySelectorAll('.comment-react-btn');

    // Tab switching
    if (collabTabs) {
        collabTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and contents
                collabTabs.forEach(t => t.classList.remove('active'));
                collabContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                tab.classList.add('active');
                const target = tab.getAttribute('data-tab');
                document.querySelector(`#${target}`).classList.add('active');
            });
        });
    }

    // Invite modal
    if (inviteBtn && modalOverlay) {
        inviteBtn.addEventListener('click', () => {
            modalOverlay.classList.add('active');
        });

        modalCancel.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
            inviteForm.reset();
        });

        // Close modal when clicking outside
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
                inviteForm.reset();
            }
        });

        // Submit invitation
        modalSubmit.addEventListener('click', (e) => {
            e.preventDefault();
            const emailInput = document.querySelector('#invite-email');
            const roleSelect = document.querySelector('#invite-role');
            const messageInput = document.querySelector('#invite-message');

            if (emailInput.value.trim() === '') {
                showNotification('Please enter an email address', 'error');
                return;
            }

            // Simulate sending invitation
            modalSubmit.disabled = true;
            modalSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            setTimeout(() => {
                // Add to pending list
                addPendingInvitation(emailInput.value, roleSelect.value);
                
                // Hide modal and reset form
                modalOverlay.classList.remove('active');
                inviteForm.reset();
                modalSubmit.disabled = false;
                modalSubmit.innerHTML = '<i class="fas fa-paper-plane"></i> Send Invitation';
                
                showNotification('Invitation sent successfully!', 'success');
            }, 1500);
        });
    }

    // Action buttons (three dots menu)
    if (actionBtns.length > 0) {
        actionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                
                // Simulate dropdown menu
                showNotification('Collaborator options coming soon', 'info');
            });
        });
    }

    // Resend invitation
    if (resendBtns.length > 0) {
        resendBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const pendingItem = btn.closest('.pending-invitation');
                const email = pendingItem.querySelector('.pending-email').textContent;
                
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                btn.disabled = true;
                
                setTimeout(() => {
                    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Resend';
                    btn.disabled = false;
                    
                    // Update pending time
                    const timeElement = pendingItem.querySelector('.pending-time');
                    timeElement.textContent = 'just now';
                    
                    showNotification(`Invitation resent to ${email}`, 'success');
                }, 1500);
            });
        });
    }

    // Cancel invitation
    if (cancelBtns.length > 0) {
        cancelBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const pendingItem = btn.closest('.pending-invitation');
                const email = pendingItem.querySelector('.pending-email').textContent;
                
                pendingItem.style.opacity = '0.5';
                
                setTimeout(() => {
                    pendingItem.remove();
                    showNotification(`Invitation to ${email} canceled`, 'info');
                }, 500);
            });
        });
    }

    // Comment tools
    if (commentTools.length > 0) {
        commentTools.forEach(tool => {
            tool.addEventListener('click', () => {
                const type = tool.getAttribute('data-tool');
                const commentInput = document.querySelector('#comment-input');
                
                switch(type) {
                    case 'timestamp':
                        // Add timestamp to comment
                        commentInput.value += ' [2:34] ';
                        break;
                    case 'file':
                        // Simulate file attachment
                        showNotification('File attachment coming soon', 'info');
                        break;
                    case 'emoji':
                        // Simulate emoji picker
                        showNotification('Emoji picker coming soon', 'info');
                        break;
                }
                
                commentInput.focus();
            });
        });
    }

    // Submit comment
    if (commentForm) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const commentInput = document.querySelector('#comment-input');
            const commentText = commentInput.value.trim();
            
            if (commentText === '') {
                return;
            }
            
            // Add comment to DOM
            addComment(commentText);
            
            // Clear input
            commentInput.value = '';
        });
    }

    // Reply to comment
    if (replyBtns.length > 0) {
        replyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const comment = btn.closest('.comment');
                const author = comment.querySelector('.comment-author').textContent;
                const commentInput = document.querySelector('#comment-input');
                
                commentInput.value = `@${author} `;
                commentInput.focus();
                
                // Scroll to comment form
                commentForm.scrollIntoView({ behavior: 'smooth' });
            });
        });
    }

    // React to comment
    if (reactBtns.length > 0) {
        reactBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.toggle('active');
                
                const count = btn.querySelector('span');
                let currentCount = parseInt(count.textContent);
                
                if (btn.classList.contains('active')) {
                    count.textContent = currentCount + 1;
                } else {
                    count.textContent = Math.max(0, currentCount - 1);
                }
            });
        });
    }
}

// Helper to add a pending invitation to the list
function addPendingInvitation(email, role) {
    const pendingList = document.querySelector('#pending-list');
    if (!pendingList) return;
    
    const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);
    const roleClass = role.toLowerCase();
    
    const pendingItem = document.createElement('div');
    pendingItem.className = 'pending-invitation';
    pendingItem.innerHTML = `
        <div class="pending-avatar">
            <i class="fas fa-envelope"></i>
        </div>
        <div class="pending-info">
            <div class="pending-email">${email}</div>
            <div class="pending-status">
                Invitation sent <span class="pending-time">just now</span>
            </div>
        </div>
        <div class="pending-actions">
            <button class="resend-btn">
                <i class="fas fa-paper-plane"></i> Resend
            </button>
            <button class="cancel-btn">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    pendingList.appendChild(pendingItem);
    
    // Add event listeners to new buttons
    const resendBtn = pendingItem.querySelector('.resend-btn');
    const cancelBtn = pendingItem.querySelector('.cancel-btn');
    
    resendBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        resendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        resendBtn.disabled = true;
        
        setTimeout(() => {
            resendBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Resend';
            resendBtn.disabled = false;
            
            // Update pending time
            const timeElement = pendingItem.querySelector('.pending-time');
            timeElement.textContent = 'just now';
            
            showNotification(`Invitation resent to ${email}`, 'success');
        }, 1500);
    });
    
    cancelBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        pendingItem.style.opacity = '0.5';
        
        setTimeout(() => {
            pendingItem.remove();
            showNotification(`Invitation to ${email} canceled`, 'info');
        }, 500);
    });
    
    // Update collaborator count
    const pendingCount = document.querySelector('#pending-count');
    if (pendingCount) {
        pendingCount.textContent = pendingList.children.length;
    }
    
    // Add to activity
    addActivity('invite', `You invited ${email} to collaborate as ${roleLabel.toLowerCase()}`);
}

// Helper to add a new comment
function addComment(text) {
    const commentsContainer = document.querySelector('.comments-container');
    if (!commentsContainer) return;
    
    const comment = document.createElement('div');
    comment.className = 'comment';
    
    // Check if comment includes a timestamp
    const hasTimestamp = text.includes('[') && text.includes(']');
    const timestampHTML = hasTimestamp ? 
        `<div class="comment-timestamp">
            <i class="fas fa-play-circle"></i> 2:34
        </div>` : '';
    
    comment.innerHTML = `
        <div class="comment-avatar">
            <img src="assets/images/user-avatar.jpg" alt="User">
        </div>
        <div class="comment-content">
            <div class="comment-header">
                <div class="comment-author">You</div>
                <div class="comment-time">Just now</div>
            </div>
            <div class="comment-text">${text}</div>
            ${timestampHTML}
            <div class="comment-actions">
                <button class="comment-reply-btn">Reply</button>
                <button class="comment-react-btn">
                    <i class="far fa-thumbs-up"></i> <span>0</span>
                </button>
            </div>
        </div>
    `;
    
    commentsContainer.appendChild(comment);
    
    // Add event listeners
    const replyBtn = comment.querySelector('.comment-reply-btn');
    const reactBtn = comment.querySelector('.comment-react-btn');
    
    replyBtn.addEventListener('click', () => {
        const author = comment.querySelector('.comment-author').textContent;
        const commentInput = document.querySelector('#comment-input');
        
        commentInput.value = `@${author} `;
        commentInput.focus();
    });
    
    reactBtn.addEventListener('click', () => {
        reactBtn.classList.toggle('active');
        
        const count = reactBtn.querySelector('span');
        let currentCount = parseInt(count.textContent);
        
        if (reactBtn.classList.contains('active')) {
            count.textContent = currentCount + 1;
        } else {
            count.textContent = Math.max(0, currentCount - 1);
        }
    });
    
    // Update comment count
    const commentCount = document.querySelector('#comment-count');
    if (commentCount) {
        const totalComments = commentsContainer.querySelectorAll('.comment').length;
        commentCount.textContent = totalComments;
    }
    
    // Add to activity
    addActivity('comment', 'You added a new comment');
    
    // Scroll to new comment
    comment.scrollIntoView({ behavior: 'smooth' });
}

// Helper to add activity
function addActivity(type, text) {
    const activityList = document.querySelector('.activity-list');
    if (!activityList) return;
    
    const activity = document.createElement('div');
    activity.className = 'activity-item';
    
    let iconClass = '';
    switch(type) {
        case 'edit': iconClass = 'fas fa-edit'; break;
        case 'comment': iconClass = 'fas fa-comment'; break;
        case 'transform': iconClass = 'fas fa-magic'; break;
        case 'reply': iconClass = 'fas fa-reply'; break;
        case 'upload': iconClass = 'fas fa-upload'; break;
        case 'invite': iconClass = 'fas fa-user-plus'; break;
        case 'join': iconClass = 'fas fa-user-check'; break;
        default: iconClass = 'fas fa-bell';
    }
    
    activity.innerHTML = `
        <div class="activity-icon ${type}">
            <i class="${iconClass}"></i>
        </div>
        <div class="activity-content">
            <div class="activity-text">${text}</div>
            <div class="activity-time">Just now</div>
        </div>
    `;
    
    // Add to the beginning of the list
    activityList.insertBefore(activity, activityList.firstChild);
}

// Floating Music Player Functionality
function initFloatingPlayer() {
    // DOM Elements
    const floatingPlayer = document.getElementById('floatingPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevTrackBtn = document.getElementById('prevTrackBtn');
    const nextTrackBtn = document.getElementById('nextTrackBtn');
    const minimizeBtn = document.getElementById('minimizePlayerBtn');
    const expandBtn = document.getElementById('expandPlayerBtn');
    const miniPlayBtn = document.getElementById('miniPlayBtn');
    const regenerateBtn = document.getElementById('regenerateBtn');
    const progressBar = floatingPlayer.querySelector('.progress-bar');
    const progressFill = floatingPlayer.querySelector('.progress-fill');
    const progressHandle = floatingPlayer.querySelector('.progress-handle');
    const currentTimeEl = floatingPlayer.querySelector('.current-time');
    const totalTimeEl = floatingPlayer.querySelector('.total-time');
    const trackTitle = floatingPlayer.querySelector('.track-title');
    const trackArtist = floatingPlayer.querySelector('.track-artist');
    const miniTitle = floatingPlayer.querySelector('.mini-title');

    // Audio element
    const audio = new Audio();
    let audioContext = null;
    let analyser = null;
    let isPlaying = false;
    let currentTrack = null;
    let playlist = [];
    let isDragging = false;

    // Initialize player state
    function init() {
        // Default player state
        floatingPlayer.classList.add('minimized');
        
        // Add event listeners
        playPauseBtn.addEventListener('click', togglePlay);
        miniPlayBtn.addEventListener('click', togglePlay);
        minimizeBtn.addEventListener('click', minimizePlayer);
        expandBtn.addEventListener('click', expandPlayer);
        prevTrackBtn.addEventListener('click', playPreviousTrack);
        nextTrackBtn.addEventListener('click', playNextTrack);
        regenerateBtn.addEventListener('click', regenerateTrack);
        progressBar.addEventListener('click', seekAudio);
        progressBar.addEventListener('mousedown', startDrag);
        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('mousemove', dragProgress);
        
        // Add audio events
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('ended', handleTrackEnd);
        audio.addEventListener('play', updatePlayButton);
        audio.addEventListener('pause', updatePlayButton);
        
        // Set up custom event listeners for adding tracks
        document.addEventListener('addTrackToPlayer', handleAddTrack);
        document.addEventListener('generatedMusicReady', handleGeneratedMusic);
    }

    // Toggle play/pause
    function togglePlay() {
        if (!currentTrack) return;
        
        if (isPlaying) {
            audio.pause();
        } else {
            initAudioContext();
            audio.play().catch(e => {
                console.error('Error playing audio:', e);
                showNotification('Error playing audio. Please try again.', 'error');
            });
        }
        
        isPlaying = !isPlaying;
        updatePlayButton();
    }

    // Update play/pause button UI
    function updatePlayButton() {
        const playIcon = isPlaying ? 'fa-pause' : 'fa-play';
        playPauseBtn.querySelector('i').className = `fas ${playIcon}`;
        miniPlayBtn.querySelector('i').className = `fas ${playIcon}`;
        
        if (isPlaying) {
            playPauseBtn.classList.add('playing');
            miniPlayBtn.classList.add('playing');
        } else {
            playPauseBtn.classList.remove('playing');
            miniPlayBtn.classList.remove('playing');
        }
    }

    // Initialize Web Audio API context
    function initAudioContext() {
        if (audioContext) return;
        
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            const source = audioContext.createMediaElementSource(audio);
            source.connect(analyser);
            analyser.connect(audioContext.destination);
            
            // Set up analyser
            analyser.fftSize = 256;
            analyser.smoothingTimeConstant = 0.8;
        } catch (e) {
            console.error('Web Audio API not supported:', e);
        }
    }

    // Update track duration
    function updateDuration() {
        totalTimeEl.textContent = formatTime(audio.duration);
    }

    // Update progress bar
    function updateProgress() {
        if (isDragging) return;
        
        const progress = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = `${progress}%`;
        progressHandle.style.left = `${progress}%`;
        currentTimeEl.textContent = formatTime(audio.currentTime);
        
        // Update visualizer if available
        if (analyser && isPlaying) {
            // This would connect to a visualizer if implemented
        }
    }

    // Format time in MM:SS
    function formatTime(seconds) {
        if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
        
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // Seek audio to position
    function seekAudio(e) {
        if (!currentTrack) return;
        
        const rect = progressBar.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        audio.currentTime = pos * audio.duration;
        
        progressFill.style.width = `${pos * 100}%`;
        progressHandle.style.left = `${pos * 100}%`;
    }

    // Start dragging progress handle
    function startDrag(e) {
        if (!currentTrack) return;
        
        isDragging = true;
        document.body.style.userSelect = 'none';
        seekAudio(e);
    }

    // Stop dragging progress handle
    function stopDrag() {
        if (isDragging) {
            isDragging = false;
            document.body.style.userSelect = '';
        }
    }

    // Drag progress handle
    function dragProgress(e) {
        if (isDragging && currentTrack) {
            seekAudio(e);
        }
    }

    // Handle track end
    function handleTrackEnd() {
        // Auto play next track if available
        if (playlist.length > 0 && playlist.indexOf(currentTrack) < playlist.length - 1) {
            playNextTrack();
        } else {
            isPlaying = false;
            updatePlayButton();
        }
    }

    // Play previous track
    function playPreviousTrack() {
        if (playlist.length === 0) return;
        
        const currentIndex = playlist.indexOf(currentTrack);
        if (currentIndex > 0) {
            loadTrack(playlist[currentIndex - 1]);
        } else {
            // Restart current track if it's the first one
            audio.currentTime = 0;
        }
    }

    // Play next track
    function playNextTrack() {
        if (playlist.length === 0) return;
        
        const currentIndex = playlist.indexOf(currentTrack);
        if (currentIndex < playlist.length - 1) {
            loadTrack(playlist[currentIndex + 1]);
        }
    }

    // Regenerate track
    function regenerateTrack() {
        if (!currentTrack || !currentTrack.isGenerated) return;
        
        // Dispatch event to notify the music generator
        const event = new CustomEvent('regenerateTrack', {
            detail: { trackId: currentTrack.id }
        });
        document.dispatchEvent(event);
        
        // Visual feedback
        regenerateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Regenerating...</span>';
        regenerateBtn.disabled = true;
        
        // Reset after a timeout (normally, a new track would be received)
        setTimeout(() => {
            regenerateBtn.innerHTML = '<i class="fas fa-sync-alt"></i><span>Regenerate</span>';
            regenerateBtn.disabled = false;
            
            // Show a notification for demo purposes
            showNotification('Track regeneration requested!', 'info');
        }, 2000);
    }

    // Add track to player
    function handleAddTrack(e) {
        const track = e.detail;
        
        // Add to playlist if not already included
        if (!playlist.some(t => t.id === track.id)) {
            playlist.push(track);
        }
        
        // Load the track
        loadTrack(track);
        
        // Expand player
        expandPlayer();
    }

    // Handle generated music
    function handleGeneratedMusic(e) {
        const generatedTrack = e.detail;
        
        // Create a track object
        const track = {
            id: generatedTrack.id || `generated-${Date.now()}`,
            title: generatedTrack.title || 'Generated Track',
            artist: generatedTrack.artist || 'AI Composer',
            url: generatedTrack.url,
            isGenerated: true
        };
        
        // Add to player
        const event = new CustomEvent('addTrackToPlayer', { detail: track });
        document.dispatchEvent(event);
        
        // Enable regenerate button
        regenerateBtn.disabled = false;
    }

    // Load track into player
    function loadTrack(track) {
        currentTrack = track;
        
        // Update player UI
        trackTitle.textContent = track.title;
        trackArtist.textContent = track.artist;
        miniTitle.textContent = track.title;
        
        // Update audio source
        audio.src = track.url;
        audio.load();
        
        // Enable controls
        playPauseBtn.disabled = false;
        
        // Update navigation buttons
        const currentIndex = playlist.indexOf(track);
        prevTrackBtn.disabled = currentIndex === 0;
        nextTrackBtn.disabled = currentIndex === playlist.length - 1;
        
        // Enable regenerate button if appropriate
        regenerateBtn.disabled = !track.isGenerated;
        
        // Auto play
        audio.play().then(() => {
            isPlaying = true;
            updatePlayButton();
        }).catch(e => {
            console.error('Error playing track:', e);
            isPlaying = false;
            updatePlayButton();
        });
    }

    // Minimize player
    function minimizePlayer() {
        floatingPlayer.classList.add('minimized');
    }

    // Expand player
    function expandPlayer() {
        floatingPlayer.classList.remove('minimized');
    }

    // Mock function to add a demo track (for testing)
    window.addDemoTrack = function() {
        const demoTrack = {
            id: `demo-${Date.now()}`,
            title: 'Demo Track',
            artist: 'Demo Artist',
            url: 'https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3',
            isGenerated: false
        };
        
        const event = new CustomEvent('addTrackToPlayer', { detail: demoTrack });
        document.dispatchEvent(event);
    };

    // Mock function to add a generated track (for testing)
    window.addGeneratedTrack = function() {
        const generatedTrack = {
            id: `generated-${Date.now()}`,
            title: 'AI Generated Music',
            artist: 'LyricVision AI',
            url: 'https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3',
            isGenerated: true
        };
        
        const event = new CustomEvent('generatedMusicReady', { detail: generatedTrack });
        document.dispatchEvent(event);
    };

    // Connect the player with music generator and upload sections
    function connectWithExistingFunctionality() {
        // Find existing music generation buttons
        const generateButtons = document.querySelectorAll('.generate-btn');
        if (generateButtons.length > 0) {
            generateButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // This would normally be triggered when music is actually generated
                    setTimeout(() => {
                        window.addGeneratedTrack();
                    }, 3000); // Simulate generation time
                });
            });
        }
        
        // Connect with music upload functionality
        const audioUploadInputs = document.querySelectorAll('input[type="file"][accept*="audio"]');
        if (audioUploadInputs.length > 0) {
            audioUploadInputs.forEach(input => {
                input.addEventListener('change', (e) => {
                    if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        
                        // Create a track from the uploaded file
                        const track = {
                            id: `upload-${Date.now()}`,
                            title: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
                            artist: 'Uploaded Music',
                            url: URL.createObjectURL(file),
                            isGenerated: false
                        };
                        
                        // Add to player
                        const event = new CustomEvent('addTrackToPlayer', { detail: track });
                        document.dispatchEvent(event);
                    }
                });
            });
        }
    }

    // Initialize player
    init();
    
    // Connect with existing functionality
    window.addEventListener('load', connectWithExistingFunctionality);
    
    // Add a test button to demonstrate functionality if needed
    if (window.location.search.includes('debug=true')) {
        const testButton = document.createElement('button');
        testButton.textContent = 'Add Demo Track';
        testButton.style.position = 'fixed';
        testButton.style.top = '10px';
        testButton.style.right = '10px';
        testButton.style.zIndex = '9999';
        testButton.addEventListener('click', window.addDemoTrack);
        document.body.appendChild(testButton);
        
        const testButton2 = document.createElement('button');
        testButton2.textContent = 'Add Generated Track';
        testButton2.style.position = 'fixed';
        testButton2.style.top = '40px';
        testButton2.style.right = '10px';
        testButton2.style.zIndex = '9999';
        testButton2.addEventListener('click', window.addGeneratedTrack);
        document.body.appendChild(testButton2);
    }
}

// Initialize the floating player
document.addEventListener('DOMContentLoaded', function() {
    initFloatingPlayer();
});

// AI Lyric Writer Functionality
function initLyricWriter() {
    // DOM Elements
    const lyricForm = document.getElementById('lyric-form');
    const themeInput = document.getElementById('lyric-theme');
    const genreSelect = document.getElementById('lyric-genre');
    const rhymeSelect = document.getElementById('lyric-rhyme');
    const metaphorsCheckbox = document.getElementById('lyric-metaphors');
    const moodButtons = document.querySelectorAll('.mood-btn');
    const generateBtn = document.querySelector('.lyric-generate-btn');
    const copyBtn = document.querySelector('.copy-btn');
    const regenerateBtn = document.querySelector('.regenerate-btn');
    const verseOutput = document.getElementById('verse-output');
    const chorusOutput = document.getElementById('chorus-output');
    const lyricPlaceholder = document.querySelector('.lyric-placeholder');
    const lyricResult = document.querySelector('.lyric-result');
    const lyricLoading = document.querySelector('.lyric-loading');

    // State
    let selectedMood = '';
    let lastGeneratedParams = null;

    // Initialize
    function init() {
        // Add event listeners
        if (lyricForm) {
            lyricForm.addEventListener('submit', handleFormSubmit);
        }

        if (moodButtons && moodButtons.length) {
            moodButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Toggle mood selection
                    moodButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    selectedMood = btn.getAttribute('data-mood');
                });
            });
        }

        if (copyBtn) {
            copyBtn.addEventListener('click', copyLyrics);
        }

        if (regenerateBtn) {
            regenerateBtn.addEventListener('click', regenerateLyrics);
        }
    }

    // Handle form submission
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Validate form
        if (!themeInput || !themeInput.value.trim()) {
            showNotification('Please enter a theme or topic', 'error');
            return;
        }
        
        // Save params for regeneration
        lastGeneratedParams = {
            theme: themeInput.value.trim(),
            genre: genreSelect.value,
            rhyme: rhymeSelect.value,
            mood: selectedMood,
            useMetaphors: metaphorsCheckbox.checked
        };
        
        // Generate lyrics
        generateLyrics(lastGeneratedParams);
    }

    // Generate lyrics with given parameters
    function generateLyrics(params) {
        // Show loading state
        showLoadingState();
        
        // In a real app, this would be an API call
        // For this demo, we'll simulate a response
        setTimeout(() => {
            const generatedLyrics = generateFakeLyrics(params);
            displayLyrics(generatedLyrics);
            hideLoadingState();
            
            // Enable action buttons
            copyBtn.disabled = false;
            regenerateBtn.disabled = false;
            
            // Show notification
            showNotification('Lyrics generated successfully!', 'success');
        }, 2000);
    }

    // Regenerate lyrics with same parameters
    function regenerateLyrics() {
        if (!lastGeneratedParams) return;
        
        // Disable regenerate button during generation
        regenerateBtn.disabled = true;
        regenerateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Regenerating...';
        
        // Generate new lyrics with same parameters
        setTimeout(() => {
            const generatedLyrics = generateFakeLyrics(lastGeneratedParams);
            displayLyrics(generatedLyrics);
            
            // Reset button
            regenerateBtn.disabled = false;
            regenerateBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Regenerate';
            
            // Show notification
            showNotification('Lyrics regenerated!', 'success');
        }, 1500);
    }

    // Copy lyrics to clipboard
    function copyLyrics() {
        if (!verseOutput || !chorusOutput) return;
        
        const verse = Array.from(verseOutput.querySelectorAll('.lyric-line'))
            .map(line => line.textContent)
            .join('\n');
            
        const chorus = Array.from(chorusOutput.querySelectorAll('.lyric-line'))
            .map(line => line.textContent)
            .join('\n');
            
        const fullLyrics = `Verse:\n${verse}\n\nChorus:\n${chorus}`;
        
        // Copy to clipboard
        navigator.clipboard.writeText(fullLyrics)
            .then(() => {
                // Show success notification
                showNotification('Lyrics copied to clipboard!', 'success');
                
                // Visual feedback
                copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
                }, 2000);
            })
            .catch(err => {
                console.error('Error copying text: ', err);
                showNotification('Failed to copy lyrics', 'error');
            });
    }

    // Display generated lyrics
    function displayLyrics(lyrics) {
        if (!verseOutput || !chorusOutput) return;
        
        // Clear previous lyrics
        verseOutput.innerHTML = '';
        chorusOutput.innerHTML = '';
        
        // Add verse lines
        lyrics.verse.forEach(line => {
            const lineEl = document.createElement('div');
            lineEl.className = 'lyric-line';
            lineEl.textContent = line;
            verseOutput.appendChild(lineEl);
        });
        
        // Add chorus lines
        lyrics.chorus.forEach(line => {
            const lineEl = document.createElement('div');
            lineEl.className = 'lyric-line';
            lineEl.textContent = line;
            chorusOutput.appendChild(lineEl);
        });
        
        // Show result
        lyricPlaceholder.style.display = 'none';
        lyricResult.style.display = 'block';
    }

    // Show loading state
    function showLoadingState() {
        lyricLoading.style.display = 'flex';
        lyricPlaceholder.style.display = 'none';
        lyricResult.style.display = 'none';
    }

    // Hide loading state
    function hideLoadingState() {
        lyricLoading.style.display = 'none';
    }

    // Generate fake lyrics based on parameters
    function generateFakeLyrics(params) {
        // This is a demo function that generates fake lyrics
        // In a real app, this would be replaced with an API call to an AI model
        
        let verseLines = [];
        let chorusLines = [];
        
        // Sample lines for different genres
        const genreVerseTemplates = {
            'pop': [
                'Walking down the street with my head held high',
                'Feeling like the world is on my side',
                'Every moment seems to glitter gold',
                'This story that we have is yet untold'
            ],
            'rock': [
                'Screaming at the walls that hold me back',
                'Breaking through the chains that kept me trapped',
                'Power surging through my very veins',
                'Nothing left of all those burning chains'
            ],
            'hiphop': [
                'Flow like water through the urban stream',
                'Living out the hustle, chasing dreams',
                'Stories from the streets I call my own',
                'Building up a legacy set in stone'
            ],
            'edm': [
                'Lights flash bright in rhythm with my heart',
                'Bass drops deep as we tear the night apart',
                'Hands in the air, we're losing track of time',
                'Electric energy, sublime design'
            ],
            'country': [
                'Dusty roads and fields of golden grain',
                'Memories of home through sunshine and rain',
                'Pickup trucks and fireflies at night',
                'Simple truths that somehow feel just right'
            ],
            'rnb': [
                'Smooth as honey, sweet as summer wine',
                'Your love's got me feeling so divine',
                'Whispers in the dark, bodies intertwined',
                'Soul to soul connection, hearts aligned'
            ],
            'folk': [
                'Stories handed down through time and space',
                'Echoes of the past we can't erase',
                'Wooden strings and voices pure and clear',
                'Ancient wisdom that we hold so dear'
            ],
            'indie': [
                'Vintage cameras capture fading light',
                'Chasing sunsets into endless night',
                'Whispered conversations, deep and true',
                'Finding meaning in all that we do'
            ]
        };
        
        const genreChorusTemplates = {
            'pop': [
                'And we rise, rise, rise like never before',
                'Shining bright, bright, bright forevermore',
                'This is our time, our moment to soar',
                'Love's taking us higher than ever before'
            ],
            'rock': [
                'We will fight! We will rise!',
                'Breaking free from their lies!',
                'Can't hold back what's inside!',
                'This is our battle cry!'
            ],
            'hiphop': [
                'Keep grinding, keep shining, no stopping this flow',
                'From nothing to something, that's how we grow',
                'Real recognize real, that's all that I know',
                'From the bottom to the top, watch me go'
            ],
            'edm': [
                'Feel the rhythm, feel the beat',
                'Lose yourself in sound complete',
                'This moment is all that we need',
                'Music flows through you and me'
            ],
            'country': [
                'Back to the places that raised me right',
                'Under those stars on a summer night',
                'Where my roots run deep and my heart feels light',
                'That's where I belong, that's my guiding light'
            ],
            'rnb': [
                'Baby, it's you, only you',
                'Everything I do, I do for you',
                'No one else can make me feel this way',
                'In your arms is where I want to stay'
            ],
            'folk': [
                'Sing with me, remember who we are',
                'Bound together near and far',
                'Centuries of wisdom in our song',
                'To this heritage, we all belong'
            ],
            'indie': [
                'We are the dreamers of impossible dreams',
                'Nothing is ever quite what it seems',
                'Between the lines of reality',
                'We find our own originality'
            ]
        };
        
        // Apply mood modifiers
        const moodAdjectives = {
            'happy': ['joyful', 'bright', 'smiling', 'gleaming', 'cheerful'],
            'sad': ['broken', 'lost', 'fading', 'tears', 'lonely'],
            'energetic': ['racing', 'pulsing', 'electric', 'fierce', 'intense'],
            'romantic': ['tender', 'loving', 'passionate', 'intimate', 'yearning'],
            'reflective': ['pondering', 'wondering', 'searching', 'thinking', 'remembering']
        };
        
        // Get template based on genre
        const genre = params.genre || 'pop';
        const verseTemplate = genreVerseTemplates[genre];
        const chorusTemplate = genreChorusTemplates[genre];
        
        // Apply theme and mood modifiers
        verseLines = verseTemplate.map(line => {
            if (params.useMetaphors) {
                return addMetaphorToLine(line, params.theme, params.mood);
            }
            return line;
        });
        
        chorusLines = chorusTemplate.map(line => line);
        
        // Apply rhyme scheme adjustments if needed
        if (params.rhyme === 'abab') {
            // Adjust for ABAB rhyme scheme
            // This is a simplified example
            if (verseLines.length >= 4) {
                let temp = verseLines[1];
                verseLines[1] = verseLines[2];
                verseLines[2] = temp;
            }
        }
        
        return {
            verse: verseLines,
            chorus: chorusLines
        };
    }

    // Add metaphor to line based on theme and mood
    function addMetaphorToLine(line, theme, mood) {
        // Sample metaphors for different themes
        const themeMetaphors = {
            'love': [
                'like a rose in full bloom',
                'an ocean of emotions',
                'a fire burning bright',
                'two stars colliding in the night'
            ],
            'heartbreak': [
                'shattered like glass on the floor',
                'a wilting flower in frost',
                'a ship lost in stormy seas',
                'shadows where light once existed'
            ],
            'summer': [
                'golden rays dancing on water',
                'fields of dreams ripening',
                'time suspended in amber light',
                'freedom flowing like a gentle breeze'
            ],
            'dreams': [
                'castles built in clouds',
                'doorways to other worlds',
                'seeds of tomorrow planted today',
                'threads weaving our destiny'
            ]
        };
        
        // Get metaphor based on theme or default to generic
        const theme_lower = theme.toLowerCase();
        let metaphorList = [];
        
        // Check if theme is in our template list
        for (const key in themeMetaphors) {
            if (theme_lower.includes(key)) {
                metaphorList = themeMetaphors[key];
                break;
            }
        }
        
        // If no specific theme found, use generic metaphors
        if (metaphorList.length === 0) {
            metaphorList = [
                'like chapters in life\'s story',
                'a journey through mountains and valleys',
                'reflections in life\'s mirror',
                'echoes of what could be'
            ];
        }
        
        // Randomly decide whether to add metaphor
        if (Math.random() > 0.5) {
            const randomMetaphor = metaphorList[Math.floor(Math.random() * metaphorList.length)];
            // Add metaphor to end or middle of line
            if (Math.random() > 0.5 && line.includes(',')) {
                return line.replace(',', `, ${randomMetaphor},`);
            } else {
                return `${line}, ${randomMetaphor}`;
            }
        }
        
        return line;
    }

    // Initialize
    init();
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    initLyricWriter();
});

// Community Hub Functionality
document.addEventListener('DOMContentLoaded', function() {
    initCommunityHub();
});

function initCommunityHub() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const communityCards = document.querySelectorAll('.community-card');
    const searchInput = document.querySelector('.community-search input');
    const paginationButtons = document.querySelectorAll('.page-btn');
    const playButtons = document.querySelectorAll('.play-icon');
    const followButtons = document.querySelectorAll('.follow-btn');
    
    // Filter functionality
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Filter the cards
                communityCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                    } else {
                        if (card.getAttribute('data-type') === filter) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            communityCards.forEach(card => {
                const title = card.querySelector('.card-title').textContent.toLowerCase();
                const artist = card.querySelector('.card-artist span') ? 
                    card.querySelector('.card-artist span').textContent.toLowerCase() : '';
                
                if (title.includes(searchTerm) || artist.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Pagination functionality
    if (paginationButtons.length > 0) {
        paginationButtons.forEach(button => {
            button.addEventListener('click', function() {
                if (this.classList.contains('active') || this.classList.contains('disabled')) {
                    return;
                }
                
                // Remove active class from all buttons
                paginationButtons.forEach(btn => {
                    if (!btn.classList.contains('prev') && !btn.classList.contains('next')) {
                        btn.classList.remove('active');
                    }
                });
                
                // Add active class to clicked button
                if (!this.classList.contains('prev') && !this.classList.contains('next')) {
                    this.classList.add('active');
                }
                
                // Simulate page change (in a real app, this would fetch new data)
                simulatePageChange(this);
            });
        });
    }
    
    // Play button functionality
    if (playButtons.length > 0) {
        playButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const card = this.closest('.community-card');
                const trackId = card.getAttribute('data-id');
                const trackTitle = card.querySelector('.card-title').textContent;
                
                // Simulate playing the track
                simulatePlayTrack(trackId, trackTitle);
            });
        });
    }
    
    // Follow button functionality
    if (followButtons.length > 0) {
        followButtons.forEach(button => {
            button.addEventListener('click', function() {
                const card = this.closest('.community-card');
                const creatorId = card.getAttribute('data-id');
                const creatorName = card.querySelector('.creator-name').textContent;
                
                if (this.classList.contains('following')) {
                    this.classList.remove('following');
                    this.textContent = 'Follow';
                    this.style.background = 'var(--primary)';
                    
                    // Update stat count
                    const followerCount = card.querySelector('.stat-value[data-stat="followers"]');
                    if (followerCount) {
                        const currentCount = parseInt(followerCount.textContent);
                        followerCount.textContent = currentCount - 1;
                    }
                    
                    showToast(`Unfollowed ${creatorName}`);
                } else {
                    this.classList.add('following');
                    this.textContent = 'Following';
                    this.style.background = 'var(--success)';
                    
                    // Update stat count
                    const followerCount = card.querySelector('.stat-value[data-stat="followers"]');
                    if (followerCount) {
                        const currentCount = parseInt(followerCount.textContent);
                        followerCount.textContent = currentCount + 1;
                    }
                    
                    showToast(`Now following ${creatorName}`);
                }
            });
        });
    }
    
    // Initialize featured content
    initFeaturedContent();
}

function simulatePageChange(button) {
    // Show loading state
    const communityContent = document.querySelector('.community-content');
    if (communityContent) {
        communityContent.style.opacity = '0.5';
        communityContent.style.pointerEvents = 'none';
    }
    
    // In a real app, you would fetch new data here
    // For demo purposes, we'll just simulate a delay
    setTimeout(() => {
        if (communityContent) {
            communityContent.style.opacity = '1';
            communityContent.style.pointerEvents = 'auto';
        }
        
        // Update the URL if this was a real single page app
        const pageNumber = button.textContent;
        showToast(`Navigated to page ${pageNumber}`);
    }, 800);
}

function simulatePlayTrack(trackId, trackTitle) {
    // In a real app, this would play the track
    // For demo purposes, we'll just show a toast
    showToast(`Now playing: ${trackTitle}`);
    
    // If using with the existing audio player:
    const audioPlayer = document.querySelector('.audio-player');
    if (audioPlayer) {
        // Update track info
        const trackInfoElement = audioPlayer.querySelector('.track-info');
        if (trackInfoElement) {
            trackInfoElement.querySelector('h3').textContent = trackTitle;
            trackInfoElement.querySelector('p').textContent = 'From Community';
        }
        
        // Show the player
        audioPlayer.classList.add('visible');
    }
}

function initFeaturedContent() {
    const featuredAction = document.querySelector('.featured-action .btn-primary');
    if (featuredAction) {
        featuredAction.addEventListener('click', function(e) {
            e.preventDefault();
            
            const featuredTitle = document.querySelector('.featured-title').textContent;
            simulatePlayTrack('featured-001', featuredTitle);
        });
    }
}

function showToast(message) {
    // Check if we already have a toast container
    let toastContainer = document.querySelector('.toast-container');
    
    if (!toastContainer) {
        // Create a new toast container
        toastContainer = document.createElement('div');
        toastContainer.classList.add('toast-container');
        document.body.appendChild(toastContainer);
    }
    
    // Create the toast element
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = message;
    
    // Add the toast to the container
    toastContainer.appendChild(toast);
    
    // Trigger the animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Remove the toast after animation completes
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
} 

// Smooth Scrolling & Scroll Animations
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScrolling();
    initScrollAnimations();
    
    // Add event listeners for CTA buttons and scroll indicator
    setupAdditionalScrollControls();
    
    // Initialize the scroll progress bar
    initScrollProgressBar();
});

// Initialize the scroll progress bar
function initScrollProgressBar() {
    const progressBar = document.getElementById('scrollProgressBar');
    
    if (progressBar) {
        // Update on scroll
        window.addEventListener('scroll', function() {
            updateScrollProgressBar(progressBar);
        });
        
        // Update on page load and resize (in case page height changes)
        window.addEventListener('load', function() {
            updateScrollProgressBar(progressBar);
        });
        
        window.addEventListener('resize', function() {
            updateScrollProgressBar(progressBar);
        });
        
        // Initial update
        updateScrollProgressBar(progressBar);
    }
}

// Update the scroll progress bar width based on scroll position
function updateScrollProgressBar(progressBar) {
    // Calculate how much the user has scrolled
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Convert scroll position to a percentage
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    
    // Update the width of the progress bar
    progressBar.style.width = scrollPercentage + '%';
}

// Setup additional scroll controls beyond nav links
function setupAdditionalScrollControls() {
    // CTA buttons in hero section
    const createVideoBtn = document.querySelector('.hero-cta .cta-button.primary');
    if (createVideoBtn) {
        createVideoBtn.addEventListener('click', function() {
            const target = document.querySelector('#upload-anchor');
            if (target) smoothScrollTo(target);
        });
    }
    
    const learnMoreBtn = document.querySelector('.hero-cta .cta-button.secondary');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            const target = document.querySelector('#features-anchor');
            if (target) smoothScrollTo(target);
        });
    }
    
    // Scroll indicator in hero section
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const target = document.querySelector('#features-anchor');
            if (target) smoothScrollTo(target);
        });
    }
}

// Helper function for smooth scrolling
function smoothScrollTo(target) {
    // Get navbar height for offset
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    
    const yOffset = -navbarHeight - 20; // Extra 20px buffer
    const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
    
    window.scrollTo({
        top: y,
        behavior: 'smooth'
    });
    
    // Update active nav link in the navigation
    const targetId = target.id;
    const baseId = targetId.replace('-anchor', '');
    document.querySelectorAll('.nav-links a').forEach(navLink => {
        navLink.classList.remove('active');
        if (navLink.getAttribute('href') === `#${targetId}` || navLink.getAttribute('href') === `#${baseId}`) {
            navLink.classList.add('active');
        }
    });
}

function initSmoothScrolling() {
    // Get all links that navigate to sections (href starts with #)
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only if it's not just a # (empty anchor)
            if(this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Get navbar height for offset
                    const navbar = document.querySelector('.navbar');
                    const navbarHeight = navbar ? navbar.offsetHeight : 0;
                    
                    const yOffset = -navbarHeight - 20; // Extra 20px buffer
                    const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    
                    window.scrollTo({
                        top: y,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    document.querySelectorAll('.nav-links a').forEach(navLink => {
                        navLink.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            }
        });
    });
}

function initScrollAnimations() {
    // Elements that should animate on scroll
    const animatedElements = [
        {
            selector: '.section-header',
            animation: 'fadeInUp',
            threshold: 0.2
        },
        {
            selector: '.feature-card',
            animation: 'fadeInUp',
            threshold: 0.1,
            delay: true // Add staggered delay
        },
        {
            selector: '.ai-feature-card',
            animation: 'fadeInUp',
            threshold: 0.1,
            delay: true
        },
        {
            selector: '.upload-form',
            animation: 'fadeIn',
            threshold: 0.2
        },
        {
            selector: '.preview-container',
            animation: 'fadeIn',
            threshold: 0.2
        },
        {
            selector: '.insight-card',
            animation: 'fadeInUp',
            threshold: 0.1,
            delay: true
        },
        {
            selector: '.chart-card',
            animation: 'fadeIn',
            threshold: 0.2
        },
        {
            selector: '.music-generator-header',
            animation: 'fadeInUp',
            threshold: 0.2
        },
        {
            selector: '.music-generator-form',
            animation: 'fadeIn',
            threshold: 0.15
        },
        {
            selector: '.collaboration-card',
            animation: 'fadeIn',
            threshold: 0.2
        },
        {
            selector: '.vocal-remover-card',
            animation: 'fadeIn',
            threshold: 0.2
        },
        {
            selector: '.style-transfer-card',
            animation: 'fadeIn',
            threshold: 0.2
        },
        {
            selector: '.stem-controls-container',
            animation: 'fadeIn',
            threshold: 0.2
        },
        {
            selector: '.community-controls',
            animation: 'fadeInUp',
            threshold: 0.2
        },
        {
            selector: '.featured-content',
            animation: 'fadeIn',
            threshold: 0.2
        },
        {
            selector: '.community-card',
            animation: 'fadeInUp',
            threshold: 0.1,
            delay: true
        }
    ];
    
    // Setup Intersection Observer for each group of elements
    animatedElements.forEach(group => {
        const elements = document.querySelectorAll(group.selector);
        
        if (elements.length === 0) return;
        
        const options = {
            root: null, // Use viewport as root
            rootMargin: '0px',
            threshold: group.threshold || 0.2
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add animation class
                    if (group.delay) {
                        // Add staggered delay for groups of elements
                        setTimeout(() => {
                            entry.target.classList.add(group.animation);
                            entry.target.style.opacity = '1';
                        }, index * 100); // 100ms staggered delay
                    } else {
                        entry.target.classList.add(group.animation);
                        entry.target.style.opacity = '1';
                    }
                    
                    // Stop observing once animated
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        // Set initial opacity to 0 and observe all elements
        elements.forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });
    });
    
    // Update active nav link on scroll
    updateActiveNavOnScroll();
}

function updateActiveNavOnScroll() {
    // Collect all sections linked in the navigation
    const sections = [];
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
        const targetId = link.getAttribute('href');
        if (targetId !== '#') {
            const section = document.querySelector(targetId);
            if (section) {
                sections.push({
                    id: targetId,
                    element: section,
                    navLink: link
                });
            }
        }
    });
    
    // If we have sections, observe them
    if (sections.length) {
        // Create a throttle function to limit how often scroll is processed
        const throttle = (func, limit) => {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        };
        
        // Get navbar height for offset calculation
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        
        // Check which section is in view on scroll
        const handleScroll = throttle(() => {
            const scrollPosition = window.scrollY + navbarHeight + 50; // Add buffer
            
            let currentSection = null;
            
            // Find the section that's currently in view
            sections.forEach(section => {
                const sectionTop = section.element.offsetTop;
                const sectionHeight = section.element.offsetHeight;
                
                if (scrollPosition >= sectionTop && 
                    scrollPosition < sectionTop + sectionHeight) {
                    currentSection = section;
                }
            });
            
            // Update active class on nav links
            if (currentSection) {
                sections.forEach(section => {
                    section.navLink.classList.remove('active');
                });
                currentSection.navLink.classList.add('active');
            }
        }, 100); // Throttle to once every 100ms
        
        // Listen for scroll events
        window.addEventListener('scroll', handleScroll);
        
        // Call once on load to set initial state
        setTimeout(handleScroll, 100);
    }
} 

// Create and manage loading skeletons
function createTrackSkeleton() {
    const skeleton = document.createElement('div');
    skeleton.className = 'track-skeleton';
    skeleton.innerHTML = `
        <div class="track-thumbnail-skeleton skeleton-loader"></div>
        <div class="track-details-skeleton">
            <div class="track-title-skeleton skeleton-loader"></div>
            <div class="track-artist-skeleton skeleton-loader"></div>
        </div>
        <div class="track-waveform-skeleton skeleton-loader"></div>
    `;
    return skeleton;
}

function createVideoPreviewSkeleton() {
    const skeleton = document.createElement('div');
    skeleton.className = 'video-preview-skeleton-container';
    skeleton.innerHTML = `
        <div class="video-preview-skeleton skeleton-loader"></div>
        <div class="video-controls-skeleton">
            <div class="video-progress-skeleton skeleton-loader"></div>
            <div class="video-buttons-skeleton">
                <div class="video-button-skeleton skeleton-loader"></div>
                <div class="video-button-skeleton skeleton-loader"></div>
                <div class="video-button-skeleton skeleton-loader"></div>
            </div>
        </div>
    `;
    return skeleton;
}

function createSyncEditorSkeleton() {
    const skeleton = document.createElement('div');
    skeleton.className = 'sync-editor-skeleton';
    skeleton.innerHTML = `
        <div class="sync-header-skeleton skeleton-loader"></div>
        <div class="audio-waveform-skeleton skeleton-loader"></div>
        <div class="lyrics-skeleton">
            <div class="lyric-line-skeleton skeleton-loader"></div>
            <div class="lyric-line-skeleton skeleton-loader"></div>
            <div class="lyric-line-skeleton skeleton-loader"></div>
            <div class="lyric-line-skeleton skeleton-loader"></div>
            <div class="lyric-line-skeleton skeleton-loader"></div>
        </div>
    `;
    return skeleton;
}

// Enhanced generation functions with skeleton loaders

// Replace this function in the existing code or modify as needed
function startGeneration() {
    // Hide result container if visible from previous generation
    const resultContainer = document.querySelector('.music-result');
    if (resultContainer) {
        resultContainer.classList.remove('show');
    }
    
    // Show generation status
    const statusContainer = document.querySelector('.generation-status');
    if (statusContainer) {
        statusContainer.classList.add('show');
    }
    
    // Show loading skeleton in the music result area
    const musicResultArea = document.querySelector('.music-result');
    if (musicResultArea) {
        // Clear previous content
        musicResultArea.innerHTML = '';
        
        // Add skeleton loader
        const trackSkeleton = createTrackSkeleton();
        musicResultArea.appendChild(trackSkeleton);
        musicResultArea.classList.add('show');
    }
    
    // Run the simulation
    simulateGeneration();
}

// Enhanced video preview loading
function loadVideoPreview(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Clear previous content
    container.innerHTML = '';
    
    // Add skeleton loader
    const previewSkeleton = createVideoPreviewSkeleton();
    container.appendChild(previewSkeleton);
    
    // Simulate loading delay
    setTimeout(() => {
        // Remove skeleton
        container.removeChild(previewSkeleton);
        
        // Add actual video preview content
        const videoPreview = document.createElement('div');
        videoPreview.className = 'video-wrapper';
        videoPreview.innerHTML = `
            <video id="previewVideo" poster="https://via.placeholder.com/1280x720/3a8eff/ffffff?text=Your+Video+Preview" controls>
                <source src="https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-changing-lights-1240-large.mp4" type="video/mp4">
            </video>
            <div class="video-overlay">
                <div class="video-title">
                    <h3 id="videoTitle">Your Generated Video</h3>
                </div>
                <div class="video-subtitle" id="videoSubtitle">Generated with selected genre and style</div>
            </div>
        `;
        
        container.appendChild(videoPreview);
        
        // Add video controls
        addVideoControls(container);
        
        // Trigger any animations or transitions
        setTimeout(() => {
            container.classList.add('loaded');
        }, 100);
    }, 2500); // Simulate network delay
}

// Enhanced sync editor loading
function initLyricsSyncEditor(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Clear previous content
    container.innerHTML = '';
    
    // Add skeleton loader
    const syncSkeleton = createSyncEditorSkeleton();
    container.appendChild(syncSkeleton);
    
    // Simulate loading delay
    setTimeout(() => {
        // Remove skeleton
        container.removeChild(syncSkeleton);
        
        // Initialize the actual sync editor
        const syncEditor = new LyricsSyncEditor();
        syncEditor.init(container);
        
        // Trigger any animations or transitions
        setTimeout(() => {
            container.classList.add('loaded');
        }, 100);
    }, 2000); // Simulate loading time
}

// Modify the relevant existing functions to use these skeleton loaders:

// Update the simulateGeneration function to use the skeleton loaders
function simulateGeneration() {
    // Original function logic here...
    
    // Example integration with existing code:
    let progress = 0;
    const progressFill = document.querySelector('.generation-status .progress-fill');
    const progressPercent = document.querySelector('.generation-status .progress-percentage');
    const statusMessage = document.querySelector('.generation-status .status-message');
    
    const steps = [
        { message: "Analyzing audio characteristics...", duration: 800 },
        { message: "Processing lyrics and timing...", duration: 1000 },
        { message: "Generating melodies and harmonies...", duration: 1200 },
        { message: "Applying selected instruments...", duration: 900 },
        { message: "Mixing tracks and mastering...", duration: 1100 }
    ];
    
    let currentStep = 0;
    
    function processStep() {
        if (currentStep < steps.length) {
            const step = steps[currentStep];
            statusMessage.textContent = step.message;
            
            setTimeout(() => {
                progress += 100 / steps.length;
                progressFill.style.width = progress + '%';
                progressPercent.textContent = Math.round(progress) + '%';
                
                currentStep++;
                processStep();
            }, step.duration);
        } else {
            // Hide the skeleton loader
            const musicResultArea = document.querySelector('.music-result');
            if (musicResultArea) {
                // Clear skeleton content
                musicResultArea.innerHTML = '';
            }
            
            // Complete the generation
            completeGeneration();
        }
    }
    
    // Start processing steps
    processStep();
}