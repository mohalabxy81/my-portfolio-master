//! loading screen script
window.addEventListener('load', () => {
    const loadingScreen = $("#loading");
    loadingScreen.fadeOut("250", () => {
        $("body").css("overflow", "auto");
    });
});

//! NavBar Script
const navToggleBtn = document.querySelector(".navbar-toggler");
const navLinks = document.querySelectorAll(".nav-link");
const navbar = document.querySelector("nav");

navToggleBtn?.addEventListener('click', () => {
    const navToggleIcon = document.getElementById("navToggleIcon");
    if (navToggleIcon.classList.contains("fa-bars")) {
        navToggleIcon.classList.replace("fa-bars", "fa-times");
    } else {
        navToggleIcon.classList.replace("fa-times", "fa-bars");
    }
});

// Close menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        navLinks.forEach(l => l.classList.remove("active"));
        e.target.classList.add("active");
        
        // Close mobile menu
        const collapseBtn = document.querySelector('.navbar-collapse');
        if (collapseBtn.classList.contains('show')) {
            navToggleBtn.click();
        }
    });
});

//! Scroll Events
let scrollTimer;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    
    const scrollPosition = window.scrollY;
    const aboutSection = document.getElementById("about");
    
    // Sticky navbar
    if (scrollPosition > 150) {
        navbar.classList.add("navbar-sticky");
    } else {
        navbar.classList.remove("navbar-sticky");
    }
    
    // Skills animation
    scrollTimer = setTimeout(() => {
        if (scrollPosition > aboutSection?.offsetTop - 300) {
            animateSkills();
        }
    }, 50);
});

// Animate skills once
let skillsAnimated = false;
function animateSkills() {
    if (skillsAnimated) return;
    
    const skills = {
        'HTML': 90,
        'CSS': 85,
        'SCSS': 80,
        'BS': 95,
        'JS': 75,
        'NG': 70
    };
    
    Object.entries(skills).forEach(([skill, percentage]) => {
        const element = document.querySelector(`.percentage.${skill}`);
        if (element) {
            element.style.width = `${percentage}%`;
        }
    });
    
    skillsAnimated = true;
}

//! Typed.js Script
const typed = new Typed('#typed', {
    strings: [
        "Full Stack Developer",
        "Civil Engineer",
        "Web Developer",
        "Creative Problem Solver"
    ],
    typeSpeed: 60,
    backSpeed: 40,
    backDelay: 1500,
    loop: true,
    showCursor: true,
    cursorChar: '|'
});

//! Slick slider initialization
$('.slider').slick({
    dots: true,
    infinite: true,
    arrows: false,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1400,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: true,
                centerPadding: '60px',
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: false
            }
        }
    ]
});

//! Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
        }
    });
});
