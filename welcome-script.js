document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const enterAppButton = document.getElementById('enterApp');
    const learnMoreButton = document.getElementById('learnMore');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const pyneLogo = document.getElementById('pyneLogo');
    const appName = document.getElementById('appName');
    const appTagline = document.getElementById('appTagline');

    // Animation state
    let isTransitioning = false;

    // Typewriter effect for app name
    function typewriterEffect(element, text, speed = 100) {
        element.textContent = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Logo interaction effects
    function addLogoInteractions() {
        if (pyneLogo) {
            // Mouse enter effect
            pyneLogo.addEventListener('mouseenter', () => {
                pyneLogo.style.animation = 'none';
                pyneLogo.style.transform = 'scale(1.1) rotate(5deg)';
                pyneLogo.style.filter = 'drop-shadow(0 16px 64px rgba(255, 107, 53, 0.6)) brightness(1.2)';
            });

            // Mouse leave effect
            pyneLogo.addEventListener('mouseleave', () => {
                pyneLogo.style.animation = 'logoFloat 3s ease-in-out infinite';
                pyneLogo.style.transform = 'scale(1) rotate(0deg)';
                pyneLogo.style.filter = 'drop-shadow(0 8px 32px rgba(255, 107, 53, 0.3))';
            });

            // Click effect
            pyneLogo.addEventListener('click', () => {
                pyneLogo.style.animation = 'logoClick 0.6s ease-out';
                setTimeout(() => {
                    pyneLogo.style.animation = 'logoFloat 3s ease-in-out infinite';
                }, 600);
            });
        }
    }

    // Add click animation keyframes dynamically
    function addClickAnimation() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes logoClick {
                0% { transform: scale(1) rotate(0deg); }
                25% { transform: scale(0.95) rotate(-2deg); }
                50% { transform: scale(1.05) rotate(2deg); }
                75% { transform: scale(0.98) rotate(-1deg); }
                100% { transform: scale(1) rotate(0deg); }
            }
            
            @keyframes logoSpin {
                0% { transform: rotate(0deg) scale(1); }
                50% { transform: rotate(180deg) scale(1.1); }
                100% { transform: rotate(360deg) scale(1); }
            }
            
            @keyframes logoBounce {
                0%, 100% { transform: translateY(0) scale(1); }
                25% { transform: translateY(-20px) scale(1.05); }
                50% { transform: translateY(-10px) scale(1.1); }
                75% { transform: translateY(-15px) scale(1.05); }
            }
        `;
        document.head.appendChild(style);
    }

    // Particle system enhancement
    function enhanceParticles() {
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            // Add random size variation
            const size = Math.random() * 3 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Add random color variation
            const colors = ['#ff6b35', '#f7931e', '#ffd23f', '#ffffff'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.background = randomColor;
            
            // Add random opacity
            particle.style.opacity = Math.random() * 0.6 + 0.2;
            
            // Add click interaction
            particle.addEventListener('click', () => {
                particle.style.animation = 'none';
                particle.style.transform = 'scale(2)';
                particle.style.opacity = '0';
                setTimeout(() => {
                    particle.style.animation = 'float 20s infinite linear';
                    particle.style.transform = 'scale(1)';
                    particle.style.opacity = Math.random() * 0.6 + 0.2;
                }, 1000);
            });
        });
    }

    // Feature card interactions
    function addFeatureInteractions() {
        const featureCards = document.querySelectorAll('.feature-card');
        
        featureCards.forEach((card, index) => {
            // Staggered entrance animation
            card.style.animationDelay = `${1.2 + (index * 0.2)}s`;
            
            // Enhanced hover effects
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) scale(1.02)';
                card.style.boxShadow = '0 20px 60px rgba(255, 107, 53, 0.2)';
                
                // Animate icon
                const icon = card.querySelector('.feature-icon');
                if (icon) {
                    icon.style.animation = 'iconBounce 0.6s ease-in-out';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = 'none';
                
                // Reset icon animation
                const icon = card.querySelector('.feature-icon');
                if (icon) {
                    icon.style.animation = 'iconBounce 2s ease-in-out infinite';
                }
            });
            
            // Click effect
            card.addEventListener('click', () => {
                card.style.animation = 'none';
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.animation = 'cardFadeIn 0.8s ease-out forwards';
                    card.style.transform = 'scale(1)';
                }, 150);
            });
        });
    }

    // Button interactions
    function addButtonInteractions() {
        // Enter App button
        if (enterAppButton) {
            enterAppButton.addEventListener('click', () => {
                if (isTransitioning) return;
                isTransitioning = true;
                
                // Show loading
                loadingIndicator.classList.remove('hidden');
                loadingIndicator.style.opacity = '1';
                
                // Animate button
                enterAppButton.style.transform = 'scale(0.95)';
                enterAppButton.style.background = 'linear-gradient(135deg, #e55a2b, #d67e1a)';
                
                // Simulate loading time
                setTimeout(() => {
                // Redirect to main app
                window.location.href = 'fireplace.html';
                }, 2000);
            });
            
            // Hover effects
            enterAppButton.addEventListener('mouseenter', () => {
                enterAppButton.style.transform = 'translateY(-3px) scale(1.02)';
            });
            
            enterAppButton.addEventListener('mouseleave', () => {
                if (!isTransitioning) {
                    enterAppButton.style.transform = 'translateY(0) scale(1)';
                }
            });
        }
        
        // Learn More button
        if (learnMoreButton) {
            learnMoreButton.addEventListener('click', () => {
                // Show modal or scroll to features
                const featuresGrid = document.querySelector('.features-grid');
                if (featuresGrid) {
                    featuresGrid.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'center'
                    });
                    
                    // Highlight features
                    const cards = document.querySelectorAll('.feature-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.animation = 'none';
                            card.style.transform = 'scale(1.05)';
                            card.style.boxShadow = '0 20px 60px rgba(255, 107, 53, 0.3)';
                            setTimeout(() => {
                                card.style.animation = 'cardFadeIn 0.8s ease-out forwards';
                                card.style.transform = 'scale(1)';
                                card.style.boxShadow = 'none';
                            }, 500);
                        }, index * 100);
                    });
                }
            });
        }
    }

    // Keyboard shortcuts
    function addKeyboardShortcuts() {
        document.addEventListener('keydown', (event) => {
            switch (event.key.toLowerCase()) {
                case 'enter':
                case ' ':
                    event.preventDefault();
                    if (enterAppButton && !isTransitioning) {
                        enterAppButton.click();
                    }
                    break;
                case 'l':
                    event.preventDefault();
                    if (learnMoreButton) {
                        learnMoreButton.click();
                    }
                    break;
                case 'h':
                    event.preventDefault();
                    showHelpModal();
                    break;
            }
        });
    }

    // Help modal
    function showHelpModal() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        modal.innerHTML = `
            <div style="
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 16px;
                padding: 40px;
                max-width: 500px;
                text-align: center;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            ">
                <h2 style="margin-bottom: 20px; color: #ff6b35;">Keyboard Shortcuts</h2>
                <div style="text-align: left; line-height: 2;">
                    <p><strong>Enter/Space:</strong> Enter FireplaceTV</p>
                    <p><strong>L:</strong> Learn More (scroll to features)</p>
                    <p><strong>H:</strong> Show this help</p>
                    <p><strong>Click Logo:</strong> Fun animation!</p>
                    <p><strong>Click Particles:</strong> Interactive effects</p>
                    <p><strong>30+ Videos:</strong> Including 6 fireplace options!</p>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    margin-top: 20px;
                    padding: 10px 20px;
                    background: #ff6b35;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                ">Close</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Animate in
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.querySelector('div').style.transform = 'scale(1)';
        }, 10);
        
        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Parallax effect for background
    function addParallaxEffect() {
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.animated-background');
            
            if (parallax) {
                const speed = scrolled * 0.5;
                parallax.style.transform = `translateY(${speed}px)`;
            }
            
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick);
    }

    // Initialize all features
    function initializeWelcomePage() {
        // Start typewriter effect after a delay
        setTimeout(() => {
            if (appName) {
                typewriterEffect(appName, 'Pyne App', 150);
            }
        }, 1000);
        
        // Initialize all interactions
        addClickAnimation();
        addLogoInteractions();
        enhanceParticles();
        addFeatureInteractions();
        addButtonInteractions();
        addKeyboardShortcuts();
        addParallaxEffect();
        
        // Show welcome message
        setTimeout(() => {
            console.log('🎉 Welcome to FireplaceTV! Press H for keyboard shortcuts.');
        }, 2000);
    }

    // Start the welcome experience
    initializeWelcomePage();
    
    // Add some random logo animations
    setInterval(() => {
        if (pyneLogo && Math.random() < 0.1) { // 10% chance every interval
            const animations = ['logoSpin', 'logoBounce'];
            const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
            pyneLogo.style.animation = `${randomAnimation} 1s ease-in-out`;
            setTimeout(() => {
                pyneLogo.style.animation = 'logoFloat 3s ease-in-out infinite';
            }, 1000);
        }
    }, 5000);
});
