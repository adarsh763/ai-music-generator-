/**
 * LyricVision - Application Initializer
 * This file provides a unified initialization for all application modules
 */

document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

/**
 * Main application initialization function
 * This unifies all the individual module initializations
 */
function initApp() {
    console.log('Initializing LyricVision application...');
    
    // Initialize theme
    initTheme();
    
    // Core UI initializations
    initCoreUI();
    
    // Feature-specific initializations
    initFeatures();
    
    // Initialize insights if they exist
    initInsights();
    
    // Set up all file upload interactions
    initFileUploads();
    
    console.log('Application initialization complete');
}

/**
 * Initialize theme preferences
 */
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        // Check if updateThemeIcon exists in the global scope
        if (typeof updateThemeIcon === 'function') {
            updateThemeIcon(savedTheme);
        }
    }
    
    // Set up theme toggle
    const themeToggler = document.querySelector('.theme-toggle');
    if (themeToggler) {
        themeToggler.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Check if updateThemeIcon exists in the global scope
            if (typeof updateThemeIcon === 'function') {
                updateThemeIcon(newTheme);
            }
        });
    }
}

/**
 * Initialize core UI components
 */
function initCoreUI() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navbarLinks = document.querySelector('.navbar-links');
    
    if (mobileMenuToggle && navbarLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navbarLinks.classList.toggle('active');
        });
    }
    
    // Initialize smooth scrolling
    if (typeof initSmoothScrolling === 'function') {
        initSmoothScrolling();
    }
    
    // Set up additional scroll controls
    if (typeof setupAdditionalScrollControls === 'function') {
        setupAdditionalScrollControls();
    }
    
    // Initialize scroll animations
    if (typeof initScrollAnimations === 'function') {
        initScrollAnimations();
    }
    
    // Initialize scroll progress bar
    if (typeof initScrollProgressBar === 'function') {
        initScrollProgressBar();
    } else {
        // Fallback implementation if the function doesn't exist
        const progressBar = document.getElementById('scrollProgressBar');
        if (progressBar) {
            window.addEventListener('scroll', function() {
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (winScroll / height) * 100;
                progressBar.style.width = scrolled + '%';
            });
        }
    }
}

/**
 * Initialize feature-specific modules
 */
function initFeatures() {
    // Initialize AI features section if it exists
    if (document.querySelector('.ai-features')) {
        if (typeof createAIParticles === 'function' && typeof animateAIFeatureCards === 'function') {
            const container = document.querySelector('.ai-features');
            if (container) {
                createAIParticles(container);
                animateAIFeatureCards();
            }
        }
    }
    
    // Initialize community hub if it exists
    if (document.querySelector('.community-hub') && typeof initCommunityHub === 'function') {
        initCommunityHub();
    }
    
    // Initialize stem separation if it exists
    if (document.querySelector('#stem-separation') && typeof initStemSeparation === 'function') {
        initStemSeparation();
    }
    
    // Initialize team collaboration if it exists
    if (document.querySelector('.team-collaboration')) {
        initTeamCollaboration();
    }
    
    // Initialize license modal if it exists
    if (document.getElementById('licenseModal')) {
        initLicenseModal();
    }
    
    // Initialize music generator if it exists
    const musicGeneratorForm = document.querySelector('.music-generator-form');
    if (musicGeneratorForm && typeof startGeneration === 'function') {
        musicGeneratorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            startGeneration();
        });
    }
    
    // Initialize floating player if it exists
    if (document.querySelector('.floating-player') && typeof initFloatingPlayer === 'function') {
        initFloatingPlayer();
    }
}

/**
 * Initialize insights section
 */
function initInsights() {
    if (document.querySelector('#insights') && typeof handleInsightsAnimation === 'function') {
        handleInsightsAnimation();
        window.addEventListener('scroll', handleInsightsAnimation);
    }
}

/**
 * Initialize file uploads
 */
function initFileUploads() {
    const fileInputs = document.querySelectorAll('input[type="file"]');
    if (fileInputs.length && typeof setupFileUpload === 'function') {
        fileInputs.forEach(input => {
            const previewElement = document.querySelector(`[data-for="${input.id}"]`);
            if (previewElement) {
                setupFileUpload(input.id, previewElement);
            }
        });
    }
}

/**
 * Initialize team collaboration section
 */
function initTeamCollaboration() {
    // Team collaboration tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length && tabContents.length) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const target = this.getAttribute('data-tab');
                
                // Update active tab button
                tabButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Show the selected tab content
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.getAttribute('id') === target) {
                        content.classList.add('active');
                    }
                });
            });
        });
    }
    
    // Initialize comment form if it exists
    const commentForm = document.querySelector('.comment-form');
    if (commentForm && typeof addComment === 'function') {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const commentInput = this.querySelector('textarea');
            if (commentInput && commentInput.value.trim()) {
                addComment(commentInput.value);
                commentInput.value = '';
            }
        });
    }
}

/**
 * Initialize license modal
 */
function initLicenseModal() {
    const licenseModal = document.getElementById('licenseModal');
    if (!licenseModal) return;
    
    const openLicenseBtn = document.querySelector('.open-license-modal');
    const closeLicenseBtn = licenseModal.querySelector('.close-modal');
    
    if (openLicenseBtn && typeof openModal === 'function') {
        openLicenseBtn.addEventListener('click', openModal);
    }
    
    if (closeLicenseBtn && typeof closeModal === 'function') {
        closeLicenseBtn.addEventListener('click', closeModal);
    }
    
    const generateBtn = licenseModal.querySelector('#generateLicenseBtn');
    if (generateBtn && typeof generateLicense === 'function') {
        generateBtn.addEventListener('click', generateLicense);
    }
    
    const licensePeriodInputs = licenseModal.querySelectorAll('input[name="licensePeriod"]');
    if (licensePeriodInputs.length && typeof updateLicenseTerms === 'function') {
        licensePeriodInputs.forEach(input => {
            input.addEventListener('change', function() {
                updateLicenseTerms(this.value);
            });
        });
    }
} 