
// -------------------------------------------------------------
// Mobile Dropdown Menu Handler
// -------------------------------------------------------------
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if(!menuToggle || !mobileMenu) return;

    let isMenuOpen = false;

    menuToggle.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        const line1 = menuToggle.querySelector('.line-1');
        const line2 = menuToggle.querySelector('.line-2');

        if(isMenuOpen) {
            mobileMenu.classList.remove('hidden');
            // Allow display:flex block to compute before animating opacity
            setTimeout(() => {
                mobileMenu.classList.add('flex', 'opacity-100', 'translate-y-0');
                mobileMenu.classList.remove('opacity-0', 'translate-y-[-20px]');
            }, 10);
            
            // X transform
            if(line1) line1.style.transform = 'rotate(-45deg) translateY(4px)';
            if(line2) {
                line2.style.transform = 'rotate(45deg) translateY(-4px)';
                line2.style.width = '100%';
            }
            document.body.style.overflow = 'hidden'; // Prevent scroll when menu is open
        } else {
            mobileMenu.classList.remove('opacity-100', 'translate-y-0');
            mobileMenu.classList.add('opacity-0', 'translate-y-[-20px]');
            
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
            }, 300); // Wait for transition
            
            // Revert hamburger
            if(line1) line1.style.transform = 'rotate(0deg) translateY(0)';
            if(line2) {
                line2.style.transform = 'rotate(0deg) translateY(0)';
                line2.style.width = '66.666667%';
            }
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if(isMenuOpen && !menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
            menuToggle.click();
        }
    });
}

/* 
   Code_RIR | Omni-Central Masterpiece Engine
   Hyper Performance, 3D Tilt, Massive Expansion
*/

gsap.registerPlugin(ScrollTrigger);

/* --- ELITE SMOOTH SCROLL (Lenis) --- */
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

/* --- ELITE BUTTER-SMOOTH CURSOR ENGINE --- */

/* --- FLOATING BADGE SCROLL ENGINE --- */
function initFloatingBadgeScroll() {
    const badgeSvg = document.getElementById('floating-badge-svg');
    if (!badgeSvg) return;
    
    // Constant rotation timeline
    const spinTimeline = gsap.to(badgeSvg, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
    });

    // Intense rotation completely bound to the scroll wheel
    gsap.to(badgeSvg, {
        rotation: 1440, // Spins multiple times across the total height
        ease: "none",
        scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1
        }
    });
}

function initCursor() {
    const cursor = document.getElementById('cursor');
    if (!cursor) return;

    // Detect touch device
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) {
        cursor.style.display = 'none';
        return;
    }

    // GSAP quickTo for zero-lag native performance
    let xTo = gsap.quickTo(cursor, "x", {duration: 0.15, ease: "power3"});
    let yTo = gsap.quickTo(cursor, "y", {duration: 0.15, ease: "power3"});

    window.addEventListener("mousemove", e => {
        xTo(e.clientX);
        yTo(e.clientY);
    });

    // Extreme Hover Scale interactions
    document.querySelectorAll('a, button, .cursor-pointer, .hover-trigger').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '100px';
            cursor.style.height = '100px';
            cursor.style.backgroundColor = 'rgba(0, 242, 255, 0.05)';
            cursor.style.border = '1px solid rgba(0, 242, 255, 0.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '12px';
            cursor.style.height = '12px';
            cursor.style.backgroundColor = '#00f2ff';
            cursor.style.border = 'none';
        });
    });
}

/* --- EXTREME GSAP REVEALS --- */
function initReveals() {
    // Header trigger
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (header) {
            window.scrollY > 50 ? header.classList.add('scrolled') : header.classList.remove('scrolled');
        }
    });

    // Hero Monolithic Text Stagger
    gsap.to('.gs-reveal', {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        duration: 1.4,
        ease: "power4.out",
        delay: 0.2
    });

    // Section Reveals (Massive upward scale)
    document.querySelectorAll('.reveal').forEach(el => {
        gsap.fromTo(el, 
            { opacity: 0, y: 100, scale: 0.95, filter: "blur(10px)" }, 
            { scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" }, 
              opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "power4.out" }
        );
    });

    // Active Link Highlighting Logic
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link, #mobile-menu a, .fixed a').forEach(link => {
        if(link.getAttribute('href') === currentPath) {
            link.classList.add('text-accentCyan');
            link.classList.remove('text-gray-400', 'text-white');
        }
    });

    // Horizontal Scroll Typography Path
    const scrollText = document.querySelector('.gs-scroll-text');
    if(scrollText) {
        gsap.to(scrollText, {
            xPercent: -50,
            ease: "none",
            scrollTrigger: {
                trigger: scrollText.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });
    }

    // Refresh ScrollTrigger on large window changes
    window.addEventListener('resize', () => {
        ScrollTrigger.refresh();
    });
}

/* --- MASSIVE CONTENT GENERATOR (For portfolio.html) --- */
function generateMassiveArchive() {
    const grid = document.getElementById('massive-grid');
    if (!grid) return;

    const colorClasses = [
        { border: 'hover:border-accentCyan', bgGlow: 'from-accentCyan/20', bgAmbient: 'from-accentCyan/5', text: 'text-accentCyan', borderFade: 'border-accentCyan/50', shadow: 'shadow-glow-cyan' },
        { border: 'hover:border-accentPink', bgGlow: 'from-accentPink/20', bgAmbient: 'from-accentPink/5', text: 'text-accentPink', borderFade: 'border-accentPink/50', shadow: 'shadow-glow-pink' },
        { border: 'hover:border-accentYellow', bgGlow: 'from-accentYellow/20', bgAmbient: 'from-accentYellow/5', text: 'text-accentYellow', borderFade: 'border-accentYellow/50', shadow: 'shadow-glow-purple' },
        { border: 'hover:border-accentPurple', bgGlow: 'from-accentPurple/20', bgAmbient: 'from-accentPurple/5', text: 'text-accentPurple', borderFade: 'border-accentPurple/50', shadow: 'shadow-glow-purple' }
    ];
    const titles = ['Core Node', 'Alpha Protocol', 'Quantum Ledger', 'Nexus Array', 'Cyber Mesh', 'Prism Engine'];

    const fragment = document.createDocumentFragment();

    for (let i = 1; i <= 18; i++) {
        const color = colorClasses[i % colorClasses.length];
        const title = titles[i % titles.length];
        
        const card = document.createElement('div');
        // Setting up inline hover glow and Vanilla Tilt data attributes (Optimized for performance: No Glare)
        card.className = `glass-card p-12 rounded-[30px] border border-white/10 relative overflow-hidden group cursor-pointer transition-all duration-500 ${color.border} bg-gradient-to-br ${color.bgAmbient} to-primary ${color.shadow}`;
        card.setAttribute('data-tilt', '');
        card.setAttribute('data-tilt-max', '8');
        card.setAttribute('data-tilt-speed', '400');

        card.innerHTML = `
            <div class="absolute inset-0 bg-gradient-to-br ${color.bgGlow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span class="${color.text} text-[10px] font-black uppercase tracking-widest block mb-6">Archive 0${i}</span>
            <h3 class="text-4xl font-black mb-8 group-hover:scale-105 transition-transform duration-500 origin-left relative z-10">${title} ${i}</h3>
            <p class="text-sm font-bold uppercase text-gray-500 mb-8 relative z-10">System Deployed</p>
            <div class="w-12 h-12 rounded-full border ${color.borderFade} flex items-center justify-center ${color.text} opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500 relative z-10">
                <i class="fas fa-arrow-right"></i>
            </div>
        `;
        fragment.appendChild(card);
    }
    
    // Append all precisely once to prevent Tailwind CDN from bottlenecking
    grid.appendChild(fragment);
}

/* --- TECHNICAL GRID GENERATOR (For index.html) --- */
function generateTechnicalGrid() {
    const grid = document.getElementById('tech-grid');
    if (!grid) return;

    const skills = ['React', 'Node.js', 'Python', 'Docker', 'Prisma', 'Ethereum', 'AWS', 'GSAP', 'Next.js', 'Vercel', 'WebGL', 'Solidity'];
    const fragment = document.createDocumentFragment();
    
    skills.forEach((skill, i) => {
        const delays = [0, 100, 200, 300, 400, 500];
        const card = document.createElement('div');
        card.className = `glass-card hover-glow p-10 text-center rounded-[30px] border border-white/5 cursor-pointer transform transition-all duration-500 hover:scale-110 hover:-translate-y-4 hover:border-accentCyan`;
        card.setAttribute('data-tilt', '');
        card.setAttribute('data-tilt-max', '15');
        card.setAttribute('data-tilt-speed', '400');
        
        card.innerHTML = `
            <div class="w-16 h-16 mx-auto bg-white/5 rounded-full mb-6 flex items-center justify-center text-accentCyan">
                <i class="fas fa-code text-2xl"></i>
            </div>
            <h4 class="text-sm font-black uppercase tracking-widest text-gray-300 group-hover:text-white transition-colors">${skill}</h4>
        `;
        fragment.appendChild(card);
    });
    
    grid.appendChild(fragment);
}

    // Advanced Crack Preloader Logic
function initCrackPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return null;

    const bar = document.getElementById('crack-bar');
    const pct = document.getElementById('crack-pct');
    const logs = document.getElementById('terminal-logs');
    const status = document.getElementById('crack-status');
    
    if(!bar || !pct || !logs || !status) return null;

    const messages = [
        "Resolving master nodes...",
        "Bypassing quantum firewalls...",
        "Injecting syntax exploit...",
        "Overriding system protocols...",
        "Uploading cyber-architecture...",
        "Decrypting payload... OK",
        "Welcome to Code_RIR"
    ];

    let progress = 0;
    let msgIndex = 0;
    let isWindowLoaded = false;
    let isFakeLoadComplete = false;
    let animationFrameId;
    let startTime = null;

    const completeRoutine = () => {
        const el = document.createElement('div');
        el.className = "text-accentCyan font-black text-sm opacity-0 transition-opacity duration-1000 mt-4";
        el.innerText = `> ${messages[messages.length - 1]}`;
        logs.appendChild(el);
        
        setTimeout(() => el.classList.remove('opacity-0'), 100);

        status.innerText = 'SYSTEM ONLINE. NODE SECURED.';
        status.className = "text-accentCyan shadow-glow-cyan transition-colors duration-1000";
        
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 1000); 
        }, 1200); 
    };

    function updateLoader(currentTime) {
        if (!startTime) startTime = currentTime;
        let elapsed = currentTime - startTime;

        // Force perfectly smooth linear loading across exactly 2.5 seconds. No stopping, no jumps.
        progress = (elapsed / 2500) * 100;

        if (progress >= 100) {
            progress = 100;
            isFakeLoadComplete = true;
            
            bar.style.width = '100%';
            pct.innerText = '100.00%';
            
            if (isWindowLoaded) {
                completeRoutine();
            }
            return; // Exit animation loop
        } 
        
        bar.style.width = progress + '%';
        pct.innerText = progress.toFixed(2) + '%';
        
        // Predictably output exactly one message evenly across the timeline
        let expectedMsgIndex = Math.floor((progress / 100) * (messages.length - 1));
        if (expectedMsgIndex > msgIndex) {
            msgIndex = expectedMsgIndex;
            const el = document.createElement('div');
            el.innerText = `> ${messages[msgIndex]}`;
            el.className = "opacity-0 transition-opacity duration-500 mb-1";
            logs.appendChild(el);
            
            void el.offsetWidth;
            el.classList.remove('opacity-0');
            el.classList.add('opacity-70');
        }
        
        animationFrameId = requestAnimationFrame(updateLoader);
    }

    animationFrameId = requestAnimationFrame(updateLoader);

    return { 
        notifyWindowLoaded: () => {
            isWindowLoaded = true;
            if (isFakeLoadComplete) {
                completeRoutine();
            }
        }
    };
}

const preloaderData = initCrackPreloader();

// Wait for all assets (CSS, Images, Fonts) to load to completely eliminate lag
window.addEventListener("load", () => {
    // 1. Initialize all heavy scripts FIRST so their lag happens completely hidden
    initMobileMenu();
    initFloatingBadgeScroll();
    initCursor();
    generateMassiveArchive();
    generateTechnicalGrid();
    initReveals();
    
    // Initialize VanillaTilt if present
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
            max: 25,
            speed: 400,
            glare: false,
            "max-glare": 0.5,
            gyroscope: false, // Turn off mobile gyroscope tilt to prevent "drunk" UI
            mobile: false     // Explicitly disable tilt on mobile for performance
        });
    }

    // 2. Notify the incredibly smooth preloader logic that external loading is done
    if (preloaderData) {
        preloaderData.notifyWindowLoaded();
    }
});


/* --- INLINE VIDEO PLAYER ENGINE --- */
function playMotivationVideo() {
    // Highly copyrighted Official Music Videos (like Linkin Park) explicitly block external iframe embedding.
    // YouTube's DRM will force a 'Video Unavailable' error if embedded in an iframe.
    // The ultimate solution to ensure it never fails is securely blasting it into a new cinematic tab.
    
    const originalUrl = 'https://www.youtube.com/watch?v=eVTXPUF4Oz4&list=RDeVTXPUF4Oz4&start_radio=1';
    
    // Launch securely
    window.open(originalUrl, '_blank');
}
