// ============================================
// CYBERSHIELD - ADVANCED JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Trigger fade-in animation on page load
    document.body.classList.add('visible');
    
    // ============================================
    // 1. PAGE LOAD ANIMATIONS
    // ============================================
    createParticleEffect();

    // ============================================
    // 2. HERO BUTTON - SMOOTH SCROLL OR NAVIGATE
    // ============================================
    const learnBtn = document.getElementById('learn-btn');
    if (learnBtn) {
        learnBtn.addEventListener('click', function(e) {
            // if it's an anchor linking to another page, let the default navigation occur
            if (learnBtn.tagName.toLowerCase() === 'a' && learnBtn.href) {
                // add ripple effect for visual feedback then allow navigation
                createRipple(e, learnBtn);
                return;
            }

            e.preventDefault();
            const amenazasSection = document.getElementById('amenazas');
            if (amenazasSection) {
                amenazasSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            
            // Add ripple effect
            createRipple(e, learnBtn);
        });
    }

    // ============================================
    // 3. ADVANCED SCAN BUTTON
    // ============================================
    const scanBtn = document.getElementById('scan-btn');
    const scanResult = document.getElementById('scan-result');

    if (scanBtn) {
        scanBtn.addEventListener('click', function() {
            if (scanBtn.disabled) return;
            
            scanBtn.disabled = true;
            scanBtn.style.opacity = '0.5';
            scanBtn.style.cursor = 'not-allowed';

            // Show scanning state
            scanResult.innerHTML = '<p>🔄 Escaneando amenazas...</p>';
            scanResult.classList.remove('success');
            scanResult.classList.add('scanning');

            // Simulate progressive scanning
            let progress = 0;
            const scanInterval = setInterval(() => {
                progress += Math.random() * 35;
                if (progress >= 100) {
                    clearInterval(scanInterval);
                    completeScanning();
                }
            }, 300);

            function completeScanning() {
                const messages = [
                    '✅ Sistema seguro - Escaneo completado',
                    '🛡️ Protección activa - Amenazas: 0',
                    '✓ Base de datos: Actualizada'
                ];
                const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                
                scanResult.innerHTML = `<p>${randomMessage}</p>`;
                scanResult.classList.remove('scanning');
                scanResult.classList.add('success');

                setTimeout(() => {
                    scanBtn.disabled = false;
                    scanBtn.style.opacity = '1';
                    scanBtn.style.cursor = 'pointer';
                }, 2000);
            }
        });
    }

    // ============================================
    // 4. THREAT CARDS - ADVANCED HOVER EFFECTS
    // ============================================
    const threatCards = document.querySelectorAll('.amenaza-card');
    threatCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.addEventListener('mouseenter', function() {
            createGlowEffect(this);
        });

        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });

    // ============================================
    // 5. PROTECTION TIPS - STAGGER ANIMATION
    // ============================================
    const tipsItems = document.querySelectorAll('.consejo-item');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeInUp 0.6s ease forwards`;
                entry.target.style.animationDelay = `${index * 0.1}s`;
            }
        });
    }, observerOptions);

    tipsItems.forEach(item => observer.observe(item));

    // ============================================
    // 6. NAVIGATION - ACTIVE LINK HIGHLIGHT
    // ============================================
    const navLinks = document.querySelectorAll('.nav-link');
    const navLinkHandler = (link) => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    };

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinkHandler(this);
        });
    });

    // ============================================
    // 7. SCROLL-BASED SECTION HIGHLIGHTING
    // ============================================
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const scrollPos = window.pageYOffset + 150;

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                const sectionId = section.getAttribute('id');
                const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (correspondingLink) {
                    navLinkHandler(correspondingLink);
                }
            }
        });
    });

    // ============================================
    // 8. KEYBOARD SHORTCUTS
    // ============================================
    document.addEventListener('keydown', function(event) {
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') return;

        // Press 'S' to start scan
        if ((event.key === 's' || event.key === 'S') && scanBtn && !scanBtn.disabled) {
            scanBtn.click();
            console.log('⌨️ Escaneo iniciado por atajo (S)');
        }

        // Press 'H' to scroll to hero
        if (event.key === 'h' || event.key === 'H') {
            document.getElementById('inicio').scrollIntoView({ behavior: 'smooth' });
        }
    });

    // ============================================
    // 9. MOUSE TRACKING FOR HERO DECORATION
    // ============================================
    const heroDecoration = document.querySelector('.hero-decoration');
    if (heroDecoration) {
        document.addEventListener('mousemove', function(e) {
            const rect = heroDecoration.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const rotateX = (y - rect.height / 2) / 10;
                const rotateY = -(x - rect.width / 2) / 10;
                heroDecoration.style.perspective = '1000px';
                heroDecoration.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });

        document.addEventListener('mouseleave', function() {
            heroDecoration.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
    }

    // ============================================
    // 10. FOOTER OBSERVER
    // ============================================
    const footer = document.querySelector('.footer');
    if (footer) {
        const footerObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('🔐 Footer visible - Seguridad garantizada');
                }
            });
        }, { threshold: 0.5 });

        footerObserver.observe(footer);
    }

    // ============================================
    // 11. BROWSER CONSOLE MESSAGE
    // ============================================
    logWelcomeMessage();

    // ============================================
    // 12. INITIALIZE NEW INTERACTIVE FEATURES
    // ============================================
    initPasswordStrengthChecker();
    initPasswordGenerator();
    initCybersecurityQuiz();
    initSecurityChecklist();
    initSecurityScan();

    // ============================================
    // 13. LOADING SCREEN ANIMATION
    // ============================================
    initLoadingScreen();

});

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Create ripple effect on button click
 */
function createRipple(event, element) {
    const rect = element.getBoundingClientRect();
    const ripple = document.createElement('span');
    
    ripple.style.position = 'absolute';
    ripple.style.left = (event.clientX - rect.left) + 'px';
    ripple.style.top = (event.clientY - rect.top) + 'px';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    ripple.style.borderRadius = '50%';
    ripple.style.animation = 'rippleEffect 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

/**
 * Create glow effect for threat cards
 */
function createGlowEffect(element) {
    const glowColor = getComputedStyle(element).borderColor;
    element.style.boxShadow = `0 0 50px ${glowColor}, 0 0 100px ${glowColor}`;
}

/**
 * Create particle effect background
 */
function createParticleEffect() {
    if (!document.querySelector('.particles-container')) {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
        `;
        
        document.body.prepend(particlesContainer);

        // Create floating particles
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(0, 255, 136, 0.5);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float-particle ${5 + Math.random() * 10}s infinite;
            `;
            particlesContainer.appendChild(particle);
        }
    }

    // Add animation to style
    if (!document.getElementById('particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes float-particle {
                0%, 100% {
                    transform: translateY(0) translateX(0);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                    opacity: 0;
                }
            }

            @keyframes rippleEffect {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                100% {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Log welcome message to browser console
 */
function logWelcomeMessage() {
    const styles = {
        title: 'color: #00ff88; font-size: 18px; font-weight: bold; text-shadow: 0 0 10px #00ff88;',
        subtitle: 'color: #00d4ff; font-size: 14px;',
        status: 'color: #00ff88; font-weight: bold; background: rgba(0, 255, 136, 0.1); padding: 5px 10px;'
    };

    console.log('%c🛡️ ¡Bienvenido a CyberShield! 🛡️', styles.title);
    console.log('%cSeguridad Digital Avanzada', styles.subtitle);
    console.log('%cPressiona "S" para iniciar escaneo rápido', styles.subtitle);
    console.log('%cPresiona "H" para ir al inicio', styles.subtitle);
    console.log('%c[SISTEMA SEGURO]', styles.status);
    console.log('%c╔════════════════════════════════════╗', styles.subtitle);
    console.log('%c║  Protegiendo tu mundo digital     ║', styles.subtitle);
    console.log('%c╚════════════════════════════════════╝', styles.subtitle);
}

/**
 * Check security status
 */
function getSecurityStatus() {
    return {
        protocol: location.protocol === 'https:' ? 'HTTPS ✓' : 'HTTP',
        timestamp: new Date().toLocaleTimeString(),
        status: 'ACTIVE',
        threats: 0
    };
}

/**
 * Intersection Observer for fade-in animations
 */
function observeElements() {
    const elements = document.querySelectorAll('[data-animate]');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elements.forEach(element => observer.observe(element));
}

/**
 * ============================================
 * PASSWORD STRENGTH CHECKER - SECURITY LAB
 * ============================================
 */
function initPasswordStrengthChecker() {
    const passwordInput = document.getElementById('passwordInput');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');

    if (!passwordInput) return; // Exit if not on security-lab page

    // Password visibility toggle
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.textContent = type === 'password' ? '👁️' : '🙈';
        });
    }

    // Real-time password strength analysis
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        analyzePasswordStrength(password, strengthFill, strengthText);
        updateCriteria(password);
    });

    // Clear on focus to ensure user starts fresh
    passwordInput.addEventListener('focus', function() {
        // Optional: you can clear placeholder text or just focus
    });
}

/**
 * Analyze password strength based on criteria
 */
function analyzePasswordStrength(password, strengthFill, strengthText) {
    let strength = 0;
    let strengthLevel = 'Muy Débil';
    let strengthClass = 'very-weak';

    if (password.length === 0) {
        strengthText.textContent = 'Escribe una contraseña para ver su fortaleza';
        strengthText.className = 'strength-text';
        strengthFill.style.width = '0%';
        return;
    }

    // Criteria evaluation
    const hasLength12 = password.length >= 12;
    const hasLength16 = password.length >= 16;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    // Calculate strength points
    if (hasLength12) strength += 15;
    if (hasLength16) strength += 10;
    if (hasUppercase) strength += 15;
    if (hasLowercase) strength += 15;
    if (hasNumbers) strength += 15;
    if (hasSpecialChars) strength += 20;

    // Bonus for length beyond 16
    if (password.length > 16) {
        strength += Math.min((password.length - 16) * 2, 20);
    }

    // Determine strength level and styling
    if (strength < 15) {
        strengthLevel = 'Muy Débil';
        strengthClass = 'very-weak';
    } else if (strength < 30) {
        strengthLevel = 'Débil';
        strengthClass = 'weak';
    } else if (strength < 50) {
        strengthLevel = 'Moderada';
        strengthClass = 'moderate';
    } else if (strength < 75) {
        strengthLevel = 'Fuerte';
        strengthClass = 'strong';
    } else {
        strengthLevel = 'Muy Fuerte';
        strengthClass = 'very-strong';
    }

    // Update UI
    const clampedStrength = Math.min(strength, 100);
    strengthFill.style.width = clampedStrength + '%';
    
    strengthText.classList.remove('very-weak', 'weak', 'moderate', 'strong', 'very-strong');
    strengthText.classList.add(strengthClass);
    strengthText.textContent = `Fortaleza: ${strengthLevel} (${clampedStrength}%)`;
}

/**
 * Update criteria checklist
 */
function updateCriteria(password) {
    const criteria = {
        'criterion-length': password.length >= 12,
        'criterion-uppercase': /[A-Z]/.test(password),
        'criterion-lowercase': /[a-z]/.test(password),
        'criterion-numbers': /\d/.test(password),
        'criterion-special': /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };

    for (const [id, isMet] of Object.entries(criteria)) {
        const element = document.getElementById(id);
        const icon = element.querySelector('.criterion-icon');
        
        if (isMet) {
            element.classList.add('met');
            icon.textContent = '✓';
        } else {
            element.classList.remove('met');
            icon.textContent = '○';
        }
    }
}

/**
 * ============================================
 * PASSWORD GENERATOR - SECURITY LAB
 * ============================================
 */
function initPasswordGenerator() {
    const lengthSlider = document.getElementById('passwordLength');
    const lengthDisplay = document.getElementById('lengthValue');
    const generateBtn = document.getElementById('generatePassword');
    const generatedPasswordInput = document.getElementById('generatedPassword');
    const copyBtn = document.getElementById('copyPassword');
    const copyFeedback = document.getElementById('copyFeedback');

    if (!lengthSlider) return; // Exit if not on security-lab page

    // Update length display
    lengthSlider.addEventListener('input', function() {
        lengthDisplay.textContent = this.value;
    });

    // Generate password
    generateBtn.addEventListener('click', function() {
        const length = parseInt(lengthSlider.value);
        const includeUppercase = document.getElementById('includeUppercase').checked;
        const includeLowercase = document.getElementById('includeLowercase').checked;
        const includeNumbers = document.getElementById('includeNumbers').checked;
        const includeSymbols = document.getElementById('includeSymbols').checked;

        const password = generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
        generatedPasswordInput.value = password;
    });

    // Copy to clipboard
    copyBtn.addEventListener('click', function() {
        const password = generatedPasswordInput.value;
        if (password) {
            navigator.clipboard.writeText(password).then(function() {
                copyFeedback.classList.add('show');
                setTimeout(() => copyFeedback.classList.remove('show'), 2000);
            });
        }
    });
}

function generatePassword(length, uppercase, lowercase, numbers, symbols) {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let charset = '';
    if (uppercase) charset += uppercaseChars;
    if (lowercase) charset += lowercaseChars;
    if (numbers) charset += numberChars;
    if (symbols) charset += symbolChars;

    if (charset === '') return 'Selecciona al menos una opción';

    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    return password;
}


function showFeedback(isCorrect, message) {
    const feedbackSection = document.getElementById('feedback-section');
    const feedbackContent = document.getElementById('feedback-content');
    const feedbackIcon = document.getElementById('feedback-icon');
    const feedbackTitle = document.getElementById('feedback-title');
    const feedbackText = document.getElementById('feedback-text');

    feedbackSection.classList.remove('hidden');

    if (isCorrect) {
        feedbackIcon.textContent = '✅';
        feedbackTitle.textContent = 'Correct!';
        feedbackContent.style.borderColor = '#00ff41';
    } else {
        feedbackIcon.textContent = '❌';
        feedbackTitle.textContent = 'Incorrect';
        feedbackContent.style.borderColor = '#ff6464';
    }

    feedbackText.textContent = message;
}

/**
 * ============================================
 * CYBERSECURITY QUIZ - SECURITY LAB
 * ============================================
 */
function initCybersecurityQuiz() {
    const quizContainer = document.getElementById('question-container');
    const resultContainer = document.getElementById('result-container');
    const nextBtn = document.getElementById('nextQuestionBtn');
    const currentQuestionSpan = document.getElementById('currentQuestion');
    const totalQuestionsSpan = document.getElementById('totalQuestions');
    const scoreSpan = document.getElementById('score');
    const maxScoreSpan = document.getElementById('maxScore');
    const resultIcon = document.getElementById('result-icon');
    const resultTitle = document.getElementById('result-title');
    const resultExplanation = document.getElementById('result-explanation');
    const restartBtn = document.getElementById('restartQuiz');

    if (!quizContainer) return; // Exit if not on security-lab page

    let currentQuestion = 0;
    let score = 0;

    const questions = [
        {
            question: "¿Qué es el phishing?",
            options: [
                "A) Un tipo de firewall",
                "B) Un intento malicioso de robar información personal",
                "C) Un tipo de antivirus"
            ],
            correct: 1,
            explanation: "El phishing es un ataque donde los ciberdelincuentes intentan obtener información sensible haciéndose pasar por entidades confiables."
        },
        {
            question: "¿Cuál es la contraseña más segura?",
            options: [
                "A) password123",
                "B) MiNombre1990",
                "C) Tr!pL3C0mpl3j0#2024!"
            ],
            correct: 2,
            explanation: "Una contraseña fuerte combina mayúsculas, minúsculas, números y símbolos, y es lo suficientemente larga."
        },
        {
            question: "¿Qué debería hacer si recibe un email sospechoso?",
            options: [
                "A) Hacer clic en el enlace para verificar",
                "B) Responder pidiendo más información",
                "C) Eliminar el email y reportarlo"
            ],
            correct: 2,
            explanation: "Nunca interactúe con emails sospechosos. Elimínelos y repórtelos a su administrador de seguridad."
        }
    ];

    function showQuestion() {
        const question = questions[currentQuestion];
        quizContainer.innerHTML = `
            <h3 class="question-text">${question.question}</h3>
            <div class="options-container">
                ${question.options.map((option, index) => `
                    <button class="option-btn" data-index="${index}">${option}</button>
                `).join('')}
            </div>
        `;

        currentQuestionSpan.textContent = currentQuestion + 1;
        totalQuestionsSpan.textContent = questions.length;
        scoreSpan.textContent = score;
        maxScoreSpan.textContent = questions.length;

        // Add event listeners to options
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', selectAnswer);
        });
    }

    function selectAnswer(e) {
        const selectedIndex = parseInt(e.target.dataset.index);
        const question = questions[currentQuestion];

        // Mark correct/incorrect
        document.querySelectorAll('.option-btn').forEach((btn, index) => {
            if (index === question.correct) {
                btn.classList.add('correct');
            } else if (index === selectedIndex && index !== question.correct) {
                btn.classList.add('incorrect');
            }
        });

        if (selectedIndex === question.correct) {
            score++;
            resultIcon.textContent = '✅';
            resultTitle.textContent = '¡Correcto!';
        } else {
            resultIcon.textContent = '❌';
            resultTitle.textContent = 'Incorrecto';
        }

        resultExplanation.textContent = question.explanation;
        scoreSpan.textContent = score;

        // Show result container
        quizContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');
    }

    nextBtn.addEventListener('click', function() {
        currentQuestion++;
        quizContainer.classList.remove('hidden');
        resultContainer.classList.add('hidden');

        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showFinalResults();
        }
    });

    restartBtn.addEventListener('click', function() {
        currentQuestion = 0;
        score = 0;
        quizContainer.classList.remove('hidden');
        resultContainer.classList.add('hidden');
        showQuestion();
    });

    function showFinalResults() {
        const percentage = Math.round((score / questions.length) * 100);
        let finalMessage, finalIcon;

        if (percentage >= 80) {
            finalMessage = `¡Excelente! Has demostrado un gran conocimiento en ciberseguridad. Puntuación: ${score}/${questions.length} (${percentage}%)`;
            finalIcon = '🏆';
        } else if (percentage >= 60) {
            finalMessage = `Buen trabajo, pero hay áreas para mejorar. Puntuación: ${score}/${questions.length} (${percentage}%)`;
            finalIcon = '👍';
        } else {
            finalMessage = `Te recomendamos estudiar más sobre ciberseguridad. Puntuación: ${score}/${questions.length} (${percentage}%)`;
            finalIcon = '📚';
        }

        resultIcon.textContent = finalIcon;
        resultTitle.textContent = 'Quiz Completado';
        resultExplanation.textContent = finalMessage;
        nextBtn.textContent = 'Reiniciar Quiz';
        nextBtn.addEventListener('click', function() {
            restartBtn.click();
        }, { once: true });
    }

    // Start quiz
    showQuestion();
}

/**
 * ============================================
 * SECURITY CHECKLIST - PROTECTION PAGE
 * ============================================
 */
function initSecurityChecklist() {
    const checkboxes = document.querySelectorAll('.security-checkbox');
    const levelFill = document.getElementById('levelFill');
    const levelPercentage = document.getElementById('levelPercentage');
    const levelLabel = document.getElementById('levelLabel');
    const levelDescription = document.getElementById('levelDescription');

    if (!checkboxes.length) return; // Exit if not on protection page

    const securityLevels = [
        { min: 0, max: 20, label: 'Crítico', desc: 'Tu seguridad está en grave riesgo. Implementa estas medidas inmediatamente.' },
        { min: 21, max: 40, label: 'Alto Riesgo', desc: 'Tienes vulnerabilidades importantes. Prioriza las medidas de seguridad básicas.' },
        { min: 41, max: 60, label: 'Moderado', desc: 'Estás en el camino correcto, pero aún necesitas mejorar varias áreas.' },
        { min: 61, max: 80, label: 'Bueno', desc: 'Tienes una buena base de seguridad. Continúa fortaleciendo tus hábitos.' },
        { min: 81, max: 100, label: 'Excelente', desc: '¡Felicitaciones! Mantienes excelentes prácticas de ciberseguridad.' }
    ];

    function updateSecurityLevel() {
        const checkedCount = document.querySelectorAll('.security-checkbox:checked').length;
        const totalCount = checkboxes.length;
        const percentage = Math.round((checkedCount / totalCount) * 100);

        levelFill.style.width = percentage + '%';
        levelPercentage.textContent = percentage + '%';

        const currentLevel = securityLevels.find(level => percentage >= level.min && percentage <= level.max);
        if (currentLevel) {
            levelLabel.textContent = currentLevel.label;
            levelDescription.textContent = currentLevel.desc;

            // Update color based on level
            if (percentage <= 20) {
                levelFill.style.background = 'linear-gradient(90deg, #ff4444, #ff6666)';
            } else if (percentage <= 40) {
                levelFill.style.background = 'linear-gradient(90deg, #ffaa00, #ffcc00)';
            } else if (percentage <= 60) {
                levelFill.style.background = 'linear-gradient(90deg, #ffaa00, #00ff41)';
            } else if (percentage <= 80) {
                levelFill.style.background = 'linear-gradient(90deg, #00ff41, #00cc44)';
            } else {
                levelFill.style.background = 'linear-gradient(90deg, #00ff41, #00ff88)';
            }
        }
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateSecurityLevel);
    });

    // Initial calculation
    updateSecurityLevel();
}

/**
 * ============================================
 * SECURITY SCAN SIMULATION - INDEX PAGE
 * ============================================
 */
function initSecurityScan() {
    const scanBtn = document.getElementById('runScanBtn');
    const consoleOutput = document.getElementById('consoleOutput');
    const scanResults = document.getElementById('scanResults');
    const scanStatus = document.getElementById('scanStatus');

    if (!scanBtn) return; // Exit if not on index page

    scanBtn.addEventListener('click', function() {
        if (scanBtn.disabled) return;

        scanBtn.disabled = true;
        scanBtn.textContent = 'ESCANEANDO...';
        scanStatus.textContent = 'Escaneando sistema...';

        consoleOutput.innerHTML = '';
        scanResults.classList.add('hidden');

        const scanSteps = [
            'Iniciando escaneo de seguridad...',
            'Verificando conexiones de red...',
            'Analizando procesos activos...',
            'Comprobando actualizaciones de software...',
            'Escaneando puertos abiertos...',
            'Verificando certificados SSL...',
            'Analizando archivos del sistema...',
            'Comprobando firewall...',
            'Verificando antivirus...',
            'Generando reporte final...'
        ];

        let stepIndex = 0;
        const scanInterval = setInterval(() => {
            if (stepIndex < scanSteps.length) {
                addConsoleLine(scanSteps[stepIndex], stepIndex === scanSteps.length - 1);
                stepIndex++;
            } else {
                clearInterval(scanInterval);
                showScanResults();
            }
        }, 800);
    });

    function addConsoleLine(text, isScanning = false) {
        const line = document.createElement('div');
        line.className = `console-line${isScanning ? ' scanning' : ''}`;
        line.textContent = `> ${text}`;
        consoleOutput.appendChild(line);
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }

    function showScanResults() {
        scanResults.classList.remove('hidden');
        scanStatus.textContent = 'Escaneo completado';

        // Simulate some results
        const results = [
            { type: 'success', icon: '🛡️', text: 'Firewall activo y configurado correctamente' },
            { type: 'success', icon: '🔒', text: 'Conexión HTTPS segura detectada' },
            { type: 'info', icon: '📦', text: '3 actualizaciones de software pendientes' },
            { type: 'success', icon: '🦠', text: 'Antivirus actualizado y funcionando' },
            { type: 'info', icon: '🔍', text: 'Se recomienda cambiar contraseña cada 90 días' }
        ];

        const resultsContainer = document.getElementById('resultsList');
        if (resultsContainer) {
            resultsContainer.innerHTML = results.map(result => `
                <div class="result-item ${result.type}">
                    <span class="result-icon">${result.icon}</span>
                    <span class="result-text">${result.text}</span>
                </div>
            `).join('');
        }

        const threatCount = results.filter(r => r.type === 'info').length;
        const threatCountElement = document.getElementById('threatCount');
        if (threatCountElement) {
            threatCountElement.textContent = threatCount;
        }

        // Reset button
        scanBtn.disabled = false;
        scanBtn.textContent = 'INICIAR ESCANEO DE SEGURIDAD';
    }
}

/**
 * ============================================
 * LOADING SCREEN ANIMATION
 * ============================================
 */
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingText = document.getElementById('loading-text');

    if (!loadingScreen) return; // Exit if not on home page


    const bootLines = [
        'Initializing CyberShield System...',
        'Loading security modules...',
        'Checking firewall configuration...',
        'Establishing secure connection...',
        'Running security protocols...',
        'Scanning for vulnerabilities...',
        'Updating threat database...',
        '',
        'ACCESS GRANTED'
    ];

    let currentLine = 0;
    let currentChar = 0;
    let isTyping = true;

    function typeWriter() {
        if (!isTyping) return;

        const currentText = bootLines[currentLine];

        if (currentChar < currentText.length) {
            loadingText.textContent += currentText.charAt(currentChar);
            currentChar++;
            setTimeout(typeWriter, 50); // Typing speed
        } else {
            // Line completed
            loadingText.textContent += '\n';
            currentLine++;
            currentChar = 0;

            if (currentLine < bootLines.length) {
                setTimeout(typeWriter, 300); // Delay between lines
            } else {
                // All lines completed, wait then fade out
                setTimeout(() => {
                    loadingScreen.classList.add('fade-out');
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                        document.body.classList.add('loaded');
                        // Show introduction message if not already seen this session
                        initIntro();
                    }, 800);
                }, 1000);
            }
        }
    }

    // Start the typing animation after a brief delay
    setTimeout(() => {
        typeWriter();
    }, 500);
}

// ============================================
// INTRODUCTION SCREEN HANDLING
// ============================================
function initIntro() {
    const intro = document.getElementById('intro-screen');
    if (!intro) return;

    // Only show intro the first time the visitor opens the site in this browser
    if (localStorage.getItem('introSeen') || sessionStorage.getItem('introSeen')) {
        intro.style.display = 'none';
        return;
    }

    intro.style.display = 'flex';
    const btn = document.getElementById('intro-btn');
    if (btn) {
        btn.addEventListener('click', function() {
            localStorage.setItem('introSeen', 'true');
            sessionStorage.setItem('introSeen', 'true');
            intro.classList.add('fade-out');
            setTimeout(() => {
                intro.style.display = 'none';
            }, 800);
        });
    }
}
